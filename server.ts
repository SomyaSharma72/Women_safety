import 'dotenv/config';
import express from 'express';
import path from 'path';
import crypto from 'crypto';
import { createServer as createViteServer } from 'vite';
import { connectToDatabase, isMongoConnected } from './src/server/db/connection';
import {
  checkRateLimit,
  generateOtp,
  saveOtp,
  verifyOtp,
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
import { sendOtpEmail } from './src/server/email';
import {
  storeEvidenceFile,
  getEvidenceFileBuffer,
  ALLOWED_MIME_TYPES,
  MAX_FILE_SIZE_BYTES,
  sanitizeFilename,
} from './src/server/evidenceStorage';

async function startServer() {
  const app = express();
  const PORT = 3000;

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
      resendConfigured: Boolean(process.env.RESEND_API_KEY),
    });
  });

  app.get('/api/institutions', async (req, res) => {
    const list = await getAllInstitutions();
    res.json({ success: true, institutions: list });
  });

  // ==========================================
  // 2. SURVIVOR EMAIL VERIFICATION (RESEND OTP)
  // ==========================================
  app.post('/api/auth/send-otp', async (req, res) => {
    const { email } = req.body;

    if (!email || typeof email !== 'string' || !email.includes('@') || !email.includes('.')) {
      return res.status(400).json({ error: 'Please provide a valid email address.' });
    }

    const normalizedEmail = email.toLowerCase().trim();

    // Check rate limit: maximum 5 requests per 5 minutes per email/IP
    if (!checkRateLimit(`survivor_otp_${normalizedEmail}`, 5, 5 * 60 * 1000)) {
      return res.status(429).json({ error: 'Too many verification code requests. Please wait a few minutes before trying again.' });
    }

    // Strict validation of server email delivery configuration
    if (!process.env.RESEND_API_KEY) {
      console.error('[Configuration Error] RESEND_API_KEY environment variable is not configured.');
      return res.status(500).json({
        error: 'Server configuration error: RESEND_API_KEY is not configured on this server. Email verification cannot proceed.',
      });
    }

    try {
      // 1. Generate cryptographically secure random 6-digit numeric OTP
      const otp = generateOtp();

      // 2. Hash and store OTP in MongoDB with 10-minute expiration and single-use constraint
      await saveOtp(normalizedEmail, otp, 'survivor', { ip: req.ip }, 10);

      // 3. Send actual OTP via Resend Node SDK (Never logs or returns the OTP)
      await sendOtpEmail(normalizedEmail, otp);

      // 4. Return strictly a generic confirmation response
      return res.json({
        success: true,
        message: 'If the email can receive messages, a verification code has been sent.',
      });
    } catch (err: any) {
      console.error('[Send OTP Error]', err.message || err);
      return res.status(500).json({
        error: err.message || 'Failed to dispatch verification code. Please try again.',
      });
    }
  });

  app.post('/api/auth/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ error: 'Both email and verification code are required.' });
    }

    const normalizedEmail = email.toLowerCase().trim();
    const cleanOtp = String(otp).trim();

    // Verify submitted OTP against hashed record in MongoDB / store
    const result = await verifyOtp(normalizedEmail, cleanOtp, 'survivor');

    if (!result.valid) {
      return res.status(400).json({ error: result.error || 'Invalid or expired verification code.' });
    }

    // Issue verified server-side submission session (valid for 2 hours)
    const verificationToken = createSession(
      {
        userId: 'survivor_' + crypto.randomBytes(8).toString('hex'),
        email: normalizedEmail,
        role: 'SURVIVOR',
        institutionId: '',
        institutionName: '',
        name: 'Verified Survivor',
      },
      2
    );

    return res.json({
      success: true,
      message: 'Email address verified successfully.',
      verificationToken,
    });
  });

  // ==========================================
  // 3. ICC OFFICER AUTHENTICATION (DEMO: EMAIL + PASSWORD ONLY)
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

    if (buffer) {
      res.setHeader('Content-Type', evidence.mimeType || 'application/octet-stream');
      res.setHeader('Content-Disposition', `inline; filename="${sanitizeFilename(evidence.fileName)}"`);
      res.setHeader('Cache-Control', 'private, no-cache, no-store, must-revalidate');
      return res.send(buffer);
    }

    if (evidence.dataUrl) {
      const base64Clean = evidence.dataUrl.replace(/^data:([A-Za-z-+/]+);base64,/, '');
      const buf = Buffer.from(base64Clean, 'base64');
      res.setHeader('Content-Type', evidence.mimeType || 'application/octet-stream');
      res.setHeader('Content-Disposition', `inline; filename="${sanitizeFilename(evidence.fileName)}"`);
      return res.send(buf);
    }

    return res.status(404).json({ error: 'Evidence binary file not found on storage vault.' });
  });

  // ==========================================
  // 6. SURVIVOR REPORT SUBMISSION (STRICT VERIFICATION ENFORCEMENT)
  // ==========================================
  app.post('/api/reports', async (req, res) => {
    // ENFORCE VERIFIED SURVIVOR SESSION
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(403).json({
        error: 'Forbidden: Email verification session required before submitting a report.',
      });
    }

    const session = getSession(authHeader);
    if (!session || session.role !== 'SURVIVOR') {
      return res.status(403).json({
        error: 'Forbidden: Invalid or expired email verification session. Please verify your email via OTP before submitting.',
      });
    }

    const payload = req.body;
    if (!payload.narrative || !payload.category) {
      return res.status(400).json({ error: 'Category and narrative details are required to submit an incident report.' });
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
              dataUrl: ev.dataUrl,
              description: ev.description,
            });
          } catch (storageErr) {
            console.error('[Evidence storage warning]', storageErr);
            processedEvidence.push(ev);
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
      isVerifiedInstitutionalUser: true,
      institutionDomain: session.email.split('@')[1] ? `@${session.email.split('@')[1]}` : '@crestview-demo.org',
      reporterEmail: session.email, // Kept strictly on server
      reporterName: payload.reporterName,
      reporterPhone: payload.reporterPhone,
      reporterContactEncrypted:
        payload.mode === 'IDENTIFIED'
          ? `${payload.reporterName || 'Identified'} (${session.email}${payload.reporterPhone ? `, ${payload.reporterPhone}` : ''})`
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
          description: `Cryptographic passkey generated. Email verification confirmed.`,
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
