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

export interface EvidenceItem {
  id: string;
  fileName: string;
  fileType: 'image' | 'document' | 'audio' | 'chat_export' | 'other';
  fileSize: string;
  uploadedAt: string;
  metadataStripped: boolean;
  encryptedHash: string;
  previewUrl?: string;
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
  isVerifiedInstitutionalUser: boolean;
  institutionDomain?: string; // e.g. "@campus.edu" (verified at system level, hidden from reviewer in Anonymous mode)
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
  confidenceScore: number; // 0 - 100 percentage of correlation
  locationCluster: string;
  department: string;
  timeSpan: string;
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

export interface QuickStats {
  totalProtectedReports: number;
  anonymousRatio: number;
  patternsIdentified: number;
  averageResolutionDays: number;
  retaliationCheckInRate: number;
}
