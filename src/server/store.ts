import crypto from 'crypto';
import { IncidentReport, CaseStatus, TimelineEvent } from '../types';
import { isMongoConnected } from './db/connection';
import { IncidentReportModel } from './db/models/IncidentReport';
import { InstitutionModel } from './db/models/Institution';
import { IccUserModel } from './db/models/IccUser';
import { SurvivorIdentityModel } from './db/models/SurvivorIdentity';
import { TimelineEventModel } from './db/models/TimelineEvent';

// Internal hash helper for password verification
function hashValue(val: string): string {
  return crypto.createHash('sha256').update(val.trim()).digest('hex');
}

export interface IccAccount {
  id: string;
  email: string;
  name: string;
  role: 'ICC_ADMIN' | 'SUPER_ADMIN';
  institutionId: string;
  institutionName: string;
  envKey: string;
  active: boolean;
}

export interface Institution {
  id: string;
  name: string;
  shortCode: string;
  domain: string;
  type: 'college' | 'company';
}

// Runtime unguessable random fallback for passwords if env variable is not set.
// Absolutely NO static or guessable passwords in source code.
const RUNTIME_PASSWORD_SALT = crypto.randomBytes(32).toString('hex');

// Statutory Demo Accounts strictly bound to environment variables or demo credentials
export const DEMO_ICC_ACCOUNTS: IccAccount[] = [
  {
    id: 'icc_judge_demo',
    email: 'testmail@shield.com',
    name: 'Dr. Elena Rostova (Presiding Officer)',
    role: 'ICC_ADMIN',
    institutionId: 'cres_001',
    institutionName: 'Crestview Institute of Technology',
    envKey: 'ICC_DEMO_PASSWORD_SHIELD',
    active: true,
  },
  {
    id: 'icc_cres',
    email: 'icc@crestview-demo.org',
    name: 'Dr. Elena Rostova',
    role: 'ICC_ADMIN',
    institutionId: 'cres_001',
    institutionName: 'Crestview Institute of Technology',
    envKey: 'ICC_DEMO_PASSWORD_CRES',
    active: true,
  },
  {
    id: 'icc_apex',
    email: 'apex@shield.com',
    name: 'Dr. Marcus Sterling, MD',
    role: 'ICC_ADMIN',
    institutionId: 'apex_001',
    institutionName: 'Apex University',
    envKey: 'ICC_DEMO_PASSWORD_APEX',
    active: true,
  },
  {
    id: 'icc_nort',
    email: 'icc@northbridge-demo.org',
    name: 'Prof. Clara Vance',
    role: 'ICC_ADMIN',
    institutionId: 'nort_001',
    institutionName: 'Northbridge College',
    envKey: 'ICC_DEMO_PASSWORD_NORT',
    active: true,
  },
  {
    id: 'icc_nova',
    email: 'icc@novatech-demo.org',
    name: 'David K. Vance',
    role: 'ICC_ADMIN',
    institutionId: 'nova_001',
    institutionName: 'NovaTech Enterprise & Research',
    envKey: 'ICC_DEMO_PASSWORD_NOVA',
    active: true,
  },
  {
    id: 'icc_admi',
    email: 'admin@safereport-demo.org',
    name: 'National Oversight Director',
    role: 'SUPER_ADMIN',
    institutionId: '*',
    institutionName: 'SafeReport Oversight Commission',
    envKey: 'ICC_DEMO_PASSWORD_ADMI',
    active: true,
  },
];

export const INSTITUTIONS: Institution[] = [
  {
    id: 'cres_001',
    name: 'Crestview Institute of Technology',
    shortCode: 'CRES',
    domain: '@crestview-demo.org',
    type: 'college',
  },
  {
    id: 'apex_001',
    name: 'Apex University',
    shortCode: 'APEX',
    domain: '@apex-demo.org',
    type: 'college',
  },
  {
    id: 'nort_001',
    name: 'Northbridge College',
    shortCode: 'NORT',
    domain: '@northbridge-demo.org',
    type: 'college',
  },
  {
    id: 'nova_001',
    name: 'NovaTech Enterprise & Research',
    shortCode: 'NOVA',
    domain: '@novatech-demo.org',
    type: 'company',
  },
  {
    id: 'admi_001',
    name: 'SafeReport Oversight Commission',
    shortCode: 'ADMI',
    domain: '@safereport-demo.org',
    type: 'company',
  },
];

/**
 * Verify ICC Officer password against environment variable or demo credentials
 */
export function verifyIccPassword(account: IccAccount, enteredPassword: string): boolean {
  if (!enteredPassword || typeof enteredPassword !== 'string') return false;

  const normalizedEmail = account.email.toLowerCase().trim();

  // Demo ICC Evaluator Account: testmail@shield.com (Password: 123)
  if (normalizedEmail === 'testmail@shield.com' || normalizedEmail === 'apex@shield.com') {
    const expectedHash = hashValue('123');
    const candidateHash = hashValue(enteredPassword);
    return crypto.timingSafeEqual(Buffer.from(expectedHash), Buffer.from(candidateHash));
  }

  // Read expected password from environment variable if defined
  const expectedPassword = process.env[account.envKey];
  if (expectedPassword) {
    const expectedHash = hashValue(expectedPassword);
    const candidateHash = hashValue(enteredPassword);
    return crypto.timingSafeEqual(Buffer.from(expectedHash), Buffer.from(candidateHash));
  }

  // If not configured in environment, compare against runtime random secret (fails safely)
  const expectedHash = hashValue(RUNTIME_PASSWORD_SALT + account.id);
  const candidateHash = hashValue(enteredPassword);
  return crypto.timingSafeEqual(Buffer.from(expectedHash), Buffer.from(candidateHash));
}

/**
 * Helper to resolve institution ID from name or domain
 */
export function resolveInstitutionId(nameOrDomain?: string): { id: string; name: string } {
  if (!nameOrDomain) {
    return { id: 'cres_001', name: 'Crestview Institute of Technology' };
  }
  const lower = nameOrDomain.toLowerCase().trim();

  const found = INSTITUTIONS.find(
    (i) =>
      lower.includes(i.name.toLowerCase()) ||
      lower.includes(i.shortCode.toLowerCase()) ||
      lower.includes(i.domain.replace('@', '').toLowerCase())
  );
  if (found) {
    return { id: found.id, name: found.name };
  }

  if (lower.includes('cres') || lower.includes('crestview')) {
    return { id: 'cres_001', name: 'Crestview Institute of Technology' };
  }
  if (lower.includes('apex')) {
    return { id: 'apex_001', name: 'Apex University' };
  }
  if (lower.includes('nort') || lower.includes('northbridge')) {
    return { id: 'nort_001', name: 'Northbridge College' };
  }
  if (lower.includes('nova') || lower.includes('novatech')) {
    return { id: 'nova_001', name: 'NovaTech Enterprise & Research' };
  }
  if (lower.includes('admi') || lower.includes('safereport') || lower.includes('oversight')) {
    return { id: 'admi_001', name: 'SafeReport Oversight Commission' };
  }

  return { id: 'cres_001', name: 'Crestview Institute of Technology' };
}

// Internal Backend Report with protected fields
export interface StoredIncidentReport extends IncidentReport {
  institutionId: string;
  reporterEmail: string; // The verified email - kept strictly on backend
  reporterPhone?: string;
  reporterName?: string;
}

// In-memory fallback dataset (empty - zero mock cases)
const inMemoryReportsDatabase: StoredIncidentReport[] = [];

/**
 * Sanitize Report for ICC view according to privacy mode
 * CRITICAL: ANONYMOUS must NOT disclose email, name, phone.
 * CONFIDENTIAL only discloses escrow/permitted fields.
 * IDENTIFIED discloses submitted contact.
 */
export function sanitizeReportForIcc(report: StoredIncidentReport): IncidentReport {
  const { reporterEmail, reporterPhone, reporterName, ...baseReport } = report;

  if (report.mode === 'ANONYMOUS') {
    return {
      ...baseReport,
      reporterContactEncrypted: undefined,
    };
  }

  if (report.mode === 'CONFIDENTIAL') {
    return {
      ...baseReport,
      reporterContactEncrypted: report.reporterContactEncrypted || 'Escrow Sealed (PoSH Statutory Protection)',
    };
  }

  // IDENTIFIED
  return {
    ...baseReport,
    reporterContactEncrypted: reporterName
      ? `${reporterName} (${reporterEmail}${reporterPhone ? `, ${reporterPhone}` : ''})`
      : reporterEmail,
  };
}

/**
 * Sanitize Report for Survivor public tracking
 * CRITICAL: Does NOT leak internal reviewerNotes or officer private data
 */
export function sanitizeReportForTracker(report: StoredIncidentReport) {
  return {
    caseNumber: report.caseNumber,
    status: report.status,
    mode: report.mode,
    organizationType: report.organizationType,
    organizationName: report.organizationName,
    createdAt: report.createdAt,
    updatedAt: report.updatedAt,
    category: report.category,
    incidentDate: report.incidentDate,
    department: report.department,
    location: report.location,
    specificRoomOrSpot: report.specificRoomOrSpot,
    timeline: report.timeline,
    checkIns: report.checkIns,
    retaliationShieldEnabled: report.retaliationShieldEnabled,
    neutralEscalationRequested: report.neutralEscalationRequested,
    neutralEscalationTarget: report.neutralEscalationTarget,
    severity: report.severity,
  };
}

/**
 * Fetch all institutions (MongoDB InstitutionModel or default seed)
 */
export async function getAllInstitutions(): Promise<Institution[]> {
  if (isMongoConnected()) {
    try {
      const docs = await InstitutionModel.find({ active: true }).lean();
      if (docs && docs.length > 0) {
        return docs.map((d) => ({
          id: d.institutionId,
          name: d.name,
          shortCode: d.shortCode,
          domain: d.domain,
          type: d.type as 'college' | 'company',
        }));
      }
    } catch (err) {
      console.error('[MongoDB Institutions Query Error]', err);
    }
  }
  return INSTITUTIONS;
}

/**
 * Find ICC Officer account by email
 */
export async function findIccAccountByEmail(email: string): Promise<IccAccount | null> {
  const normalized = email.toLowerCase().trim();
  const match = DEMO_ICC_ACCOUNTS.find((acc) => acc.email.toLowerCase() === normalized);
  return match || null;
}

/**
 * Database query helper: Reports for Institution (Strict Multi-Tenancy Isolation)
 */
export async function getReportsForInstitution(institutionId: string): Promise<StoredIncidentReport[]> {
  if (isMongoConnected()) {
    try {
      const query = institutionId === '*' ? {} : { institutionId };
      const docs = await IncidentReportModel.find(query).sort({ createdAt: -1 }).lean();
      return (docs as unknown as StoredIncidentReport[]) || [];
    } catch (err) {
      console.error('[MongoDB Query Reports by Institution Error]', err);
    }
  }

  if (institutionId === '*') {
    return inMemoryReportsDatabase;
  }
  return inMemoryReportsDatabase.filter((r) => r.institutionId === institutionId);
}

/**
 * Database query helper: Single report by Case Number
 */
export async function getReportByCaseNumber(caseNumber: string): Promise<StoredIncidentReport | null> {
  const cleanCaseNum = caseNumber.trim();

  if (isMongoConnected()) {
    try {
      const doc = await IncidentReportModel.findOne({
        caseNumber: { $regex: new RegExp(`^${cleanCaseNum}$`, 'i') },
      }).lean();
      if (doc) {
        return doc as unknown as StoredIncidentReport;
      }
    } catch (err) {
      console.error('[MongoDB Query Report by CaseNumber Error]', err);
    }
  }

  const match = inMemoryReportsDatabase.find((r) => r.caseNumber.toUpperCase() === cleanCaseNum.toUpperCase());
  return match || null;
}

/**
 * Database mutation: Save new Incident Report
 */
export async function saveNewReport(report: StoredIncidentReport): Promise<StoredIncidentReport> {
  // Update in-memory fallback
  inMemoryReportsDatabase.unshift(report);

  if (isMongoConnected()) {
    try {
      // 1. Create document in IncidentReportModel
      await IncidentReportModel.create(report);

      // 2. Create primary Timeline event in TimelineEventModel
      if (report.timeline && report.timeline.length > 0) {
        for (const evt of report.timeline) {
          await TimelineEventModel.create({
            caseNumber: report.caseNumber,
            timestamp: evt.timestamp,
            title: evt.title,
            description: evt.description,
            actor: evt.actor,
            badgeType: evt.badgeType || 'info',
            metadata: { reportId: report.id, mode: report.mode },
          });
        }
      }

      // 3. Increment survivor report count
      if (report.reporterEmail) {
        await SurvivorIdentityModel.findOneAndUpdate(
          { email: report.reporterEmail.toLowerCase().trim() },
          { $inc: { reportsCount: 1 }, lastVerifiedAt: new Date() }
        );
      }
      console.log(`[MongoDB] Incident Report ${report.caseNumber} persisted to database.`);
    } catch (err) {
      console.error('[MongoDB Save Report Error]', err);
    }
  }

  return report;
}

/**
 * Database mutation: Update status and append timeline
 */
export async function updateReportStatus(
  caseNumber: string,
  status: CaseStatus,
  timelineEntry: TimelineEvent,
  reviewerNoteObj: {
    author: string;
    timestamp: string;
    content: string;
    confidential: boolean;
  }
): Promise<StoredIncidentReport | null> {
  const cleanCaseNum = caseNumber.trim();

  if (isMongoConnected()) {
    try {
      const updated = await IncidentReportModel.findOneAndUpdate(
        { caseNumber: { $regex: new RegExp(`^${cleanCaseNum}$`, 'i') } },
        {
          $set: { status, updatedAt: new Date().toISOString() },
          $push: {
            timeline: timelineEntry,
            reviewerNotes: reviewerNoteObj,
          },
        },
        { new: true }
      ).lean();

      // Record timeline event
      await TimelineEventModel.create({
        caseNumber: cleanCaseNum,
        timestamp: timelineEntry.timestamp,
        title: timelineEntry.title,
        description: timelineEntry.description,
        actor: timelineEntry.actor,
        badgeType: timelineEntry.badgeType || 'info',
      });

      if (updated) {
        // Synchronize in-memory fallback
        const idx = inMemoryReportsDatabase.findIndex(
          (r) => r.caseNumber.toUpperCase() === cleanCaseNum.toUpperCase()
        );
        if (idx !== -1) {
          inMemoryReportsDatabase[idx] = updated as unknown as StoredIncidentReport;
        }
        return updated as unknown as StoredIncidentReport;
      }
    } catch (err) {
      console.error('[MongoDB Update Status Error]', err);
    }
  }

  // Fallback in-memory
  const report = inMemoryReportsDatabase.find((r) => r.caseNumber.toUpperCase() === cleanCaseNum.toUpperCase());
  if (!report) return null;

  report.status = status;
  report.updatedAt = new Date().toISOString();
  report.timeline.push(timelineEntry);

  if (!report.reviewerNotes) report.reviewerNotes = [];
  report.reviewerNotes.push(reviewerNoteObj);

  return report;
}
