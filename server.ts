import 'dotenv/config';
import express from 'express';
import path from 'path';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';
import { connectToDatabase, isMongoConnected } from './src/server/db/connection';
import {
  checkRateLimit,
  createSession,
  getSession,
  deleteSession,
} from './src/server/auth';
import {
  resolveInstitutionId,
  StoredIncidentReport,
  getReportsForInstitution,
  getReportByCaseNumber,
  saveNewReport,
  updateReportStatus,
  sanitizeReportForIcc,
  sanitizeReportForTracker,
  findIccAccountByEmail,
  verifyIccPassword,
  getAllInstitutions,
} from './src/server/store';
import {
  storeEvidenceFile,
  getEvidenceFileBuffer,
  ALLOWED_MIME_TYPES,
  MAX_FILE_SIZE_BYTES,
  sanitizeFilename,
} from './src/server/evidenceStorage';

async function startServer() {
  const app = express();
  const PORT = Number(process.env.PORT) || 3000;

  // Initialize MongoDB connection
  await connectToDatabase();

  // JSON Body Parser with 25MB limit for attachments
  app.use(express.json({ limit: '25mb' }));

  // Request logger
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) {
      console.log(`[API] ${req.method} ${req.path}`);
    }
    next();
  });

  // ==========================================
  // 1. HEALTH & INSTITUTIONS METADATA
  // ==========================================
  app.get('/api/health', (req, res) => {
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      platform: 'SafeReport',
      database: isMongoConnected() ? 'MongoDB (Connected)' : 'Active Memory Fallback',
    });
  });

  app.get('/api/institutions', async (req, res) => {
    const list = await getAllInstitutions();
    res.json({ success: true, institutions: list });
  });

  // ==========================================
  // 2. ICC OFFICER AUTHENTICATION (DEMO: EMAIL + PASSWORD ONLY)
  // ==========================================
  app.post('/api/icc/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Rate-limiting login attempts
    if (!checkRateLimit(`icc_login_${normalizedEmail}`, 10, 5 * 60 * 1000)) {
      return res.status(429).json({ error: 'Too many authentication attempts. Please try again in 5 minutes.' });
    }

    // Find ICC Account
    const account = await findIccAccountByEmail(normalizedEmail);
    if (!account || !account.active) {
      return res.status(401).json({
        error: 'Authentication failed. Please verify your official institutional credentials.',
      });
    }

    // Verify Password against server-side authorization logic
    const isPasswordValid = verifyIccPassword(account, String(password));
    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Authentication failed. Invalid password supplied for this ICC officer account.',
      });
    }

    // Issue authenticated ICC session token (Valid for 24 hours) - NO OTP/2FA
    const token = createSession(
      {
        userId: account.id,
        email: account.email,
        role: account.role,
        institutionId: account.institutionId,
        institutionName: account.institutionName,
        name: account.name,
      },
      24
    );

    return res.json({
      success: true,
      token,
      user: {
        id: account.id,
        email: account.email,
        name: account.name,
        role: account.role,
        institutionId: account.institutionId,
        institutionName: account.institutionName,
      },
    });
  });

  app.get('/api/icc/me', (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Unauthorized: Missing Authorization header.' });
    }

    const session = getSession(authHeader);
    if (!session || (session.role !== 'ICC_ADMIN' && session.role !== 'SUPER_ADMIN')) {
      return res.status(401).json({ error: 'Unauthorized or expired ICC session.' });
    }

    return res.json({
      success: true,
      user: {
        id: session.userId,
        email: session.email,
        name: session.name,
        role: session.role,
        institutionId: session.institutionId,
        institutionName: session.institutionName,
      },
    });
  });

  app.post('/api/icc/logout', (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      deleteSession(authHeader);
    }
    return res.json({ success: true, message: 'Logged out successfully.' });
  });

  // ==========================================
  // 4. ICC CASES & MULTI-TENANCY ISOLATION
  // ==========================================
  app.get('/api/icc/cases', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Unauthorized: Missing Authorization header.' });
    }

    const session = getSession(authHeader);
    if (!session || (session.role !== 'ICC_ADMIN' && session.role !== 'SUPER_ADMIN')) {
      return res.status(401).json({ error: 'Unauthorized or expired ICC session.' });
    }

    // STRICT INSTITUTION ISOLATION:
    // Derives institution strictly from session token (never from client request parameters)
    const institutionId = session.institutionId;
    const rawReports = await getReportsForInstitution(institutionId);

    // Apply strict privacy sanitization per statutory mode
    const sanitized = rawReports.map(sanitizeReportForIcc);

    return res.json({
      success: true,
      reports: sanitized,
      institution: {
        id: session.institutionId,
        name: session.institutionName,
      },
      officer: {
        name: session.name,
        role: session.role,
      },
    });
  });

  app.get('/api/icc/cases/:caseNumber', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Unauthorized.' });
    }

    const session = getSession(authHeader);
    if (!session || (session.role !== 'ICC_ADMIN' && session.role !== 'SUPER_ADMIN')) {
      return res.status(401).json({ error: 'Unauthorized or expired ICC session.' });
    }

    const caseNumber = req.params.caseNumber;
    const report = await getReportByCaseNumber(caseNumber);

    if (!report) {
      return res.status(404).json({ error: `Case ${caseNumber} not found.` });
    }

    // Multi-tenant check
    if (session.role !== 'SUPER_ADMIN' && report.institutionId !== session.institutionId) {
      return res.status(403).json({
        error: 'Forbidden: You are not authorized to view cases from other institutions.',
      });
    }

    return res.json({
      success: true,
      report: sanitizeReportForIcc(report),
    });
  });

  app.patch('/api/icc/cases/:caseNumber/status', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Unauthorized.' });
    }

    const session = getSession(authHeader);
    if (!session || (session.role !== 'ICC_ADMIN' && session.role !== 'SUPER_ADMIN')) {
      return res.status(401).json({ error: 'Unauthorized or expired ICC session.' });
    }

    const caseNumber = req.params.caseNumber;
    const { status, reviewerNote } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'New status is required.' });
    }

    const existing = await getReportByCaseNumber(caseNumber);
    if (!existing) {
      return res.status(404).json({ error: `Case ${caseNumber} not found.` });
    }

    // Multi-tenant check
    if (session.role !== 'SUPER_ADMIN' && existing.institutionId !== session.institutionId) {
      return res.status(403).json({
        error: 'Forbidden: You cannot modify cases belonging to another institution.',
      });
    }

    const now = new Date();
    const timelineEntry = {
      id: `tm-${Date.now()}`,
      timestamp: now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      title: `Status Updated to: ${status.replace(/_/g, ' ').toUpperCase()}`,
      description: reviewerNote || `Investigation milestone updated by ${session.name} (${session.institutionName}).`,
      actor: 'authorized_reviewer' as const,
      badgeType: (status === 'closed' ? 'success' : status === 'escalated_external' ? 'alert' : 'info') as 'success' | 'alert' | 'info',
    };

    const reviewerNoteObj = {
      author: `${session.name} (${session.role})`,
      timestamp: now.toISOString(),
      content: reviewerNote || `Status changed to ${status}`,
      confidential: true,
    };

    const updated = await updateReportStatus(caseNumber, status, timelineEntry, reviewerNoteObj);
    if (!updated) {
      return res.status(500).json({ error: 'Failed to update case record.' });
    }

    return res.json({
      success: true,
      report: sanitizeReportForIcc(updated),
    });
  });

  // ==========================================
  // 5. EVIDENCE HANDLING & PERSISTENT STORAGE
  // ==========================================
  app.post('/api/evidence/upload', async (req, res) => {
    // Requires verified survivor session or ICC session
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Unauthorized: Session token required for evidence upload.' });
    }

    const session = getSession(authHeader);
    if (!session) {
      return res.status(401).json({ error: 'Invalid or expired session.' });
    }

    const { fileName, mimeType, fileData } = req.body;
    if (!fileName || !fileData) {
      return res.status(400).json({ error: 'fileName and fileData (base64) are required.' });
    }

    const safeMime = mimeType || 'application/octet-stream';
    if (!ALLOWED_MIME_TYPES.has(safeMime)) {
      return res.status(400).json({
        error: `Unsupported file format (${safeMime}). Allowed types: Images, Audio, PDF, and Documents.`,
      });
    }

    try {
      // Decode base64 data
      const base64Clean = fileData.replace(/^data:([A-Za-z-+/]+);base64,/, '');
      const buffer = Buffer.from(base64Clean, 'base64');
      console.log(`[Evidence] Upload received ${fileName} (${safeMime}), bytes=${buffer.length}.`);
      if (buffer.length === 0) {
        return res.status(400).json({ error: 'Evidence file is empty.' });
      }

      if (buffer.length > MAX_FILE_SIZE_BYTES) {
        return res.status(400).json({ error: 'File size exceeds maximum allowed limit of 25MB.' });
      }

      const evidenceId = `ev-${Date.now()}-${crypto.randomBytes(4).toString('hex')}`;
      const saved = await storeEvidenceFile(evidenceId, fileName, safeMime, buffer);

      return res.status(201).json({
        success: true,
        evidence: {
          id: saved.id,
          fileName: saved.fileName,
          fileType: safeMime.startsWith('image/') ? 'image' : safeMime.startsWith('audio/') ? 'audio' : 'document',
          fileSize: saved.fileSize,
          uploadedAt: new Date().toISOString(),
          metadataStripped: true,
          encryptedHash: saved.encryptedHash,
          mimeType: saved.mimeType,
          storageKey: saved.storageKey,
        },
      });
    } catch (err: any) {
      console.error('[Evidence Upload Error]', err);
      return res.status(500).json({ error: err.message || 'Evidence storage failed.' });
    }
  });

  app.get('/api/icc/cases/:caseNumber/evidence/:evidenceId', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Unauthorized.' });
    }

    const session = getSession(authHeader);
    if (!session || (session.role !== 'ICC_ADMIN' && session.role !== 'SUPER_ADMIN')) {
      return res.status(401).json({ error: 'Unauthorized or expired ICC session.' });
    }

    const { caseNumber, evidenceId } = req.params;
    const report = await getReportByCaseNumber(caseNumber);
    if (!report) {
      return res.status(404).json({ error: `Case ${caseNumber} not found.` });
    }

    // Multi-tenant check
    if (session.role !== 'SUPER_ADMIN' && report.institutionId !== session.institutionId) {
      return res.status(403).json({
        error: 'Forbidden: You are not authorized to view evidence from other institutions.',
      });
    }

    const evidence = (report.evidenceList || []).find((e) => e.id === evidenceId);
    if (!evidence) {
      return res.status(404).json({ error: `Evidence ${evidenceId} not found on case ${caseNumber}.` });
    }

    return res.json({
      success: true,
      evidence: {
        id: evidence.id,
        fileName: evidence.fileName,
        fileType: evidence.fileType,
        fileSize: evidence.fileSize,
        uploadedAt: evidence.uploadedAt,
        metadataStripped: evidence.metadataStripped,
        encryptedHash: evidence.encryptedHash,
        mimeType: evidence.mimeType,
        description: evidence.description,
        dataUrl: evidence.dataUrl,
        previewUrl: `/api/icc/cases/${caseNumber}/evidence/${evidenceId}/download`,
      },
    });
  });

  app.get('/api/icc/cases/:caseNumber/evidence/:evidenceId/download', async (req, res) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).json({ error: 'Unauthorized.' });
    }

    const session = getSession(authHeader);
    if (!session || (session.role !== 'ICC_ADMIN' && session.role !== 'SUPER_ADMIN')) {
      return res.status(401).json({ error: 'Unauthorized.' });
    }

    const { caseNumber, evidenceId } = req.params;
    const report = await getReportByCaseNumber(caseNumber);
    if (!report) {
      return res.status(404).json({ error: `Case ${caseNumber} not found.` });
    }

    // Multi-tenant check
    if (session.role !== 'SUPER_ADMIN' && report.institutionId !== session.institutionId) {
      return res.status(403).json({
        error: 'Forbidden: Cross-institution access prohibited.',
      });
    }

    const evidence = (report.evidenceList || []).find((e) => e.id === evidenceId);
    if (!evidence) {
      return res.status(404).json({ error: 'Evidence item not found.' });
    }

    // Retrieve file from disk storage or fallback to base64 dataUrl
    const storageKey = (evidence as any).storageKey || evidence.id;
    const buffer = await getEvidenceFileBuffer(storageKey);
    const contentDisposition = req.query.download === '1' ? 'attachment' : 'inline';

    if (buffer) {
      res.setHeader('Content-Type', evidence.mimeType || 'application/octet-stream');
      res.setHeader('Content-Disposition', `${contentDisposition}; filename="${sanitizeFilename(evidence.fileName)}"`);
      res.setHeader('Content-Length', buffer.length.toString());
      res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      return res.send(buffer);
    }

    if (evidence.dataUrl) {
      const base64Clean = evidence.dataUrl.replace(/^data:([A-Za-z-+/]+);base64,/, '');
      const buf = Buffer.from(base64Clean, 'base64');
      console.log(`[Evidence] Read legacy embedded evidence ${evidence.id}, bytes=${buf.length}.`);
      res.setHeader('Content-Type', evidence.mimeType || 'application/octet-stream');
      res.setHeader('Content-Disposition', `${contentDisposition}; filename="${sanitizeFilename(evidence.fileName)}"`);
      res.setHeader('Content-Length', buf.length.toString());
      return res.send(buf);
    }

    return res.status(404).json({ error: 'Evidence binary file not found on storage vault.' });
  });

  // ==========================================
  // 5. SURVIVOR REPORT SUBMISSION
  // ==========================================
  app.post('/api/reports', async (req, res) => {
    const payload = req.body;
    const reporterEmail = typeof payload.email === 'string' ? payload.email.trim() : '';
    console.log('[Reports] Received report submission request.');
    if (!payload.narrative || !payload.category || !reporterEmail) {
      return res.status(400).json({ error: 'Email, category, and narrative details are required to submit an incident report.' });
    }

    // Determine Institution strictly through resolution
    const orgTarget = payload.organizationName || payload.organizationType || 'Crestview Institute of Technology';
    const resolvedInstitution = resolveInstitutionId(orgTarget);

    // Process attached evidence items to ensure physical persistence
    const processedEvidence: any[] = [];
    if (payload.evidenceList && Array.isArray(payload.evidenceList)) {
      for (const ev of payload.evidenceList) {
        if (ev.dataUrl) {
          try {
            const base64Clean = ev.dataUrl.replace(/^data:([A-Za-z-+/]+);base64,/, '');
            const buffer = Buffer.from(base64Clean, 'base64');
            console.log(`[Evidence] Report evidence received ${ev.fileName} (${ev.mimeType || 'application/octet-stream'}), bytes=${buffer.length}.`);
            if (buffer.length === 0) {
              throw new Error('Evidence file is empty before storage.');
            }
            const saved = await storeEvidenceFile(ev.id || `ev-${Date.now()}`, ev.fileName, ev.mimeType || 'application/octet-stream', buffer);
            processedEvidence.push({
              id: saved.id,
              fileName: saved.fileName,
              fileType: ev.fileType || 'document',
              fileSize: saved.fileSize,
              uploadedAt: ev.uploadedAt || new Date().toISOString(),
              metadataStripped: true,
              encryptedHash: saved.encryptedHash,
              mimeType: saved.mimeType,
              storageKey: saved.storageKey,
              description: ev.description,
            });
          } catch (storageErr) {
            console.error('[Evidence storage warning]', storageErr);
            throw storageErr;
          }
        } else {
          processedEvidence.push(ev);
        }
      }
    }

    // Generate unique Case Number: e.g. R-4821
    const randomCaseNum = `R-${Math.floor(1000 + Math.random() * 9000)}`;
    const randomPasskey = `PASS-${crypto.randomBytes(3).toString('hex').toUpperCase()}-${crypto.randomBytes(2).toString('hex').toUpperCase()}`;

    const newReport: StoredIncidentReport = {
      id: `rep-${Date.now()}`,
      caseNumber: randomCaseNum,
      passkey: randomPasskey,
      mode: payload.mode || 'ANONYMOUS',
      organizationType: payload.organizationType || 'college',
      organizationName: resolvedInstitution.name,
      institutionId: resolvedInstitution.id,
      isVerifiedInstitutionalUser: false,
      institutionDomain: undefined,
      reporterEmail,
      reporterName: payload.reporterName,
      reporterPhone: payload.reporterPhone,
      reporterContactEncrypted:
        payload.mode === 'IDENTIFIED'
          ? `${payload.reporterName || 'Identified'} (${reporterEmail}${payload.reporterPhone ? `, ${payload.reporterPhone}` : ''})`
          : payload.mode === 'CONFIDENTIAL'
          ? 'Escrow Sealed (PoSH Statutory Protection)'
          : undefined,
      category: payload.category,
      incidentDate: payload.incidentDate || new Date().toISOString().split('T')[0],
      incidentTime: payload.incidentTime,
      department: payload.department || 'General Campus / Workplace',
      location: payload.location || 'Main Building',
      specificRoomOrSpot: payload.specificRoomOrSpot || 'Unspecified Location',
      isRecurring: Boolean(payload.isRecurring),
      estimatedOccurrences: payload.estimatedOccurrences || 1,
      narrative: payload.narrative,
      personDescription: payload.personDescription || {},
      structuredSummary: payload.structuredSummary,
      evidenceList: processedEvidence,
      retaliationShieldEnabled: Boolean(payload.retaliationShieldEnabled),
      checkInFrequency: payload.checkInFrequency || 'weekly',
      checkIns: payload.retaliationShieldEnabled
        ? [
            {
              id: `chk-${Date.now()}`,
              date: new Date().toISOString().split('T')[0],
              status: 'pending',
            },
          ]
        : [],
      status: 'submitted',
      neutralEscalationRequested: Boolean(payload.neutralEscalationRequested),
      neutralEscalationTarget: payload.neutralEscalationTarget,
      timeline: [
        {
          id: `tm-${Date.now()}-1`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          title: `Report Submitted (${payload.mode || 'ANONYMOUS'})`,
          description: `Cryptographic passkey generated.`,
          actor: 'reporter',
          badgeType: 'info',
        },
        {
          id: `tm-${Date.now()}-2`,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          title: 'Evidence Locked into Safe Vault',
          description: `${processedEvidence.length} attachment(s) encrypted with zero metadata.`,
          actor: 'system',
          badgeType: 'success',
        },
      ],
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Save report to database
    await saveNewReport(newReport);
    console.log(`[REPORT] Real report registered: ${newReport.caseNumber} for institution ${newReport.institutionId}`);

    return res.status(201).json({
      success: true,
      message: 'Report submitted securely and registered in encrypted vault.',
      report: sanitizeReportForIcc(newReport),
    });
  });

  // ==========================================
  // 7. SURVIVOR PUBLIC CASE TRACKING
  // ==========================================
  app.get('/api/cases/track/:caseNumber', async (req, res) => {
    const caseNumber = req.params.caseNumber;
    if (!caseNumber) {
      return res.status(400).json({ error: 'Case ID is required.' });
    }

    const report = await getReportByCaseNumber(caseNumber);
    if (!report) {
      return res.status(404).json({ error: `No active record found for Case ID "${caseNumber}".` });
    }

    return res.json({
      success: true,
      caseData: sanitizeReportForTracker(report),
    });
  });

  // ==========================================
  // 8. VITE MIDDLEWARE (Development) or STATIC (Production)
  // ==========================================
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`[SafeReport Server] Running on http://localhost:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('[Server Startup Error]', err);
});
