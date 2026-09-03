/**
 * SafeReport Core Types
 */

export type ReportingMode = 'ANONYMOUS' | 'CONFIDENTIAL' | 'IDENTIFIED';

export type IncidentCategory =
  | 'verbal_harassment'
  | 'stalking'
  | 'digital_cyber'
  | 'physical_unwanted_touch'
  | 'intimidation_abuse_of_power'
  | 'academic_retaliation'
  | 'workplace_coercion'
  | 'other';

export type CaseStatus =
  | 'submitted'
  | 'evidence_locked'
  | 'pattern_alert_triggered'
  | 'under_investigation'
  | 'escalated_external'
  | 'action_taken'
  | 'closed';

export type OrganizationType = 'college' | 'company';

export interface EvidenceItem {
  id: string;
  fileName: string;
  fileType: 'image' | 'document' | 'audio' | 'chat_export' | 'other';
  fileSize: string;
  uploadedAt: string;
  metadataStripped: boolean;
  encryptedHash: string;
  storageKey?: string;
  previewUrl?: string;
  dataUrl?: string;
  mimeType?: string;
  description?: string;
}

export interface TimelineEvent {
  id: string;
  timestamp: string;
  title: string;
  description: string;
  actor: 'reporter' | 'system' | 'ai_pattern_radar' | 'authorized_reviewer' | 'external_ombudsman';
  badgeType?: 'info' | 'warning' | 'success' | 'alert';
}

export interface RetaliationCheckIn {
  id: string;
  date: string;
  status: 'pending' | 'completed' | 'skipped';
  response?: 'all_ok' | 'new_incident' | 'feeling_unsafe' | 'request_escalation';
  notes?: string;
  responseTimestamp?: string;
}

export interface IncidentReport {
  id: string;
  caseNumber: string; // e.g. "R-2841"
  passkey: string; // Private key to check status without login
  createdAt: string;
  updatedAt: string;
  
  // Privacy configuration
  mode: ReportingMode;
  organizationType: OrganizationType; // 'college' | 'company'
  organizationName?: string; // e.g. "Crestview University" or "NovaTech Solutions"
  isVerifiedInstitutionalUser: boolean;
  institutionDomain?: string;
  reporterEmail?: string;
  reporterContactEncrypted?: string; // Only decipherable under formal subpoena / legal committee in Confidential mode

  // Incident specifics
  category: IncidentCategory;
  incidentDate: string;
  incidentTime?: string;
  department: string;
  location: string;
  specificRoomOrSpot: string;
  isRecurring: boolean;
  estimatedOccurrences?: number;

  // Narrative & structured signals
  narrative: string;
  personDescription: {
    roleOrTitle?: string;
    aliasOrName?: string;
    department?: string;
    identifyingDetails?: string;
  };

  // AI Structured extraction (Assists reviewers, does NOT judge guilt)
  structuredSummary?: {
    keyIncidentPoints: string[];
    extractedLocations: string[];
    involvedRoleCategories: string[];
    sentimentIndex?: string;
    riskSignalsDetected: string[];
  };

  // Evidence
  evidenceList: EvidenceItem[];

  // Retaliation shield
  retaliationShieldEnabled: boolean;
  checkInFrequency: 'weekly' | 'biweekly' | 'on_status_change' | 'none';
  checkIns: RetaliationCheckIn[];

  // Escalation & Status
  status: CaseStatus;
  neutralEscalationRequested: boolean;
  neutralEscalationTarget?: 'state_human_rights' | 'external_ombudsman' | 'independent_legal_counsel';
  
  assignedReviewerRole?: string;
  severity?: 'critical' | 'high' | 'medium' | 'low';
  patternFlagged?: boolean;
  timeline: TimelineEvent[];
  reviewerNotes?: {
    author: string;
    timestamp: string;
    content: string;
    confidential: boolean;
  }[];
}

export interface PatternSignal {
  id: string;
  title: string;
  organizationType?: OrganizationType; // 'college' | 'company'
  confidenceScore: number; // 0 - 100 percentage of correlation
  locationCluster: string;
  department: string;
  timeSpan: string;
  dateRange?: string;
  reportCount?: number;
  summary?: string;
  correlatedReportIds?: string[];
  matchedReports: {
    caseNumber: string;
    date: string;
    location: string;
    category: string;
    mode: ReportingMode;
    keyOverlap: string;
  }[];
  signals: {
    personMatch: boolean;
    personSnippet: string;
    locationMatch: boolean;
    locationSnippet: string;
    timingMatch: boolean;
    timingSnippet: string;
    modusOperandiMatch: boolean;
    modusOperandiSnippet: string;
  };
  aiDisclaimer: string;
  status: 'active_pattern' | 'under_human_inquiry' | 'corroborated' | 'dismissed_with_reason';
  createdAt: string;
}

export interface InstitutionItem {
  id: string;
  name: string;
  shortCode: string;
  type: 'University' | 'College' | 'Polytechnic' | 'Medical / Health' | 'Corporate Campus' | 'Research Institute';
  location: string;
  iccStatus: 'Active Statutory ICC' | 'Independent Panel' | '24/7 Intake Board' | 'Compliance Certified';
  activeCasesCount: number;
  resolvedCasesCount: number;
  designatedContact: {
    name: string;
    title: string;
    role: string;
    emailDomain: string;
  };
  reportingAvailability: {
    anonymousAllowed: boolean;
    passkeyVault: boolean;
    retaliationShield: boolean;
    neutralOmbudsman: boolean;
  };
  status: 'Verified SafeCampus' | 'Tier-1 Monitored' | 'Accredited Partner';
  departmentsCount: number;
  establishedDate: string;
  description: string;
  policyLinkText?: string;
}

export interface QuickStats {
  totalProtectedReports: number;
  anonymousRatio: number;
  patternsIdentified: number;
  averageResolutionDays: number;
  retaliationCheckInRate: number;
}

export interface IccUser {
  id: string;
  email: string;
  name: string;
  role: 'ICC_ADMIN' | 'SUPER_ADMIN';
  institutionId: string;
  institutionName: string;
}

export interface AuthSession {
  token: string;
  user: IccUser;
}

export interface SurvivorVerificationSession {
  email: string;
  verificationToken: string;
}

