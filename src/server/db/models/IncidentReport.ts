import mongoose, { Schema } from 'mongoose';
import { TimelineEventSubSchema } from './TimelineEvent';

export interface IIncidentReportDoc {
  id: string;
  caseNumber: string;
  passkey: string;
  mode: 'ANONYMOUS' | 'CONFIDENTIAL' | 'IDENTIFIED';
  organizationType: 'college' | 'company';
  organizationName?: string;
  institutionId: string;
  isVerifiedInstitutionalUser: boolean;
  institutionDomain?: string;
  reporterEmail: string;
  reporterName?: string;
  reporterPhone?: string;
  reporterContactEncrypted?: string;
  category: string;
  incidentDate: string;
  incidentTime?: string;
  department: string;
  location: string;
  specificRoomOrSpot: string;
  isRecurring: boolean;
  estimatedOccurrences?: number;
  narrative: string;
  personDescription: {
    roleOrTitle?: string;
    aliasOrName?: string;
    department?: string;
    identifyingDetails?: string;
  };
  structuredSummary?: {
    keyIncidentPoints: string[];
    extractedLocations: string[];
    involvedRoleCategories: string[];
    sentimentIndex?: string;
    riskSignalsDetected: string[];
  };
  evidenceList: Array<{
    id: string;
    fileName: string;
    fileType: string;
    fileSize: string;
    uploadedAt: string;
    metadataStripped: boolean;
    encryptedHash: string;
    previewUrl?: string;
    dataUrl?: string;
    mimeType?: string;
    description?: string;
  }>;
  retaliationShieldEnabled: boolean;
  checkInFrequency: 'weekly' | 'biweekly' | 'on_status_change' | 'none';
  checkIns: Array<{
    id: string;
    date: string;
    status: 'pending' | 'completed' | 'skipped';
    response?: string;
    notes?: string;
    responseTimestamp?: string;
  }>;
  status: 'submitted' | 'evidence_locked' | 'pattern_alert_triggered' | 'under_investigation' | 'escalated_external' | 'action_taken' | 'closed';
  neutralEscalationRequested: boolean;
  neutralEscalationTarget?: string;
  assignedReviewerRole?: string;
  severity?: 'critical' | 'high' | 'medium' | 'low';
  patternFlagged?: boolean;
  timeline: Array<{
    id: string;
    timestamp: string;
    title: string;
    description: string;
    actor: string;
    badgeType?: string;
  }>;
  reviewerNotes?: Array<{
    author: string;
    timestamp: string;
    content: string;
    confidential: boolean;
  }>;
  createdAt: string;
  updatedAt: string;
}

const EvidenceItemSchema = new Schema(
  {
    id: { type: String, required: true },
    fileName: { type: String, required: true },
    fileType: { type: String, required: true },
    fileSize: { type: String, required: true },
    uploadedAt: { type: String, required: true },
    metadataStripped: { type: Boolean, default: true },
    encryptedHash: { type: String, required: true },
    previewUrl: { type: String },
    dataUrl: { type: String },
    mimeType: { type: String },
    description: { type: String },
  },
  { _id: false }
);

const CheckInSchema = new Schema(
  {
    id: { type: String, required: true },
    date: { type: String, required: true },
    status: { type: String, enum: ['pending', 'completed', 'skipped'], default: 'pending' },
    response: { type: String },
    notes: { type: String },
    responseTimestamp: { type: String },
  },
  { _id: false }
);

const ReviewerNoteSchema = new Schema(
  {
    author: { type: String, required: true },
    timestamp: { type: String, required: true },
    content: { type: String, required: true },
    confidential: { type: Boolean, default: true },
  },
  { _id: false }
);

const IncidentReportSchema = new Schema<IIncidentReportDoc>(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    caseNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
      index: true,
    },
    passkey: {
      type: String,
      required: true,
      index: true,
    },
    mode: {
      type: String,
      enum: ['ANONYMOUS', 'CONFIDENTIAL', 'IDENTIFIED'],
      required: true,
      index: true,
    },
    organizationType: {
      type: String,
      enum: ['college', 'company'],
      default: 'college',
    },
    organizationName: {
      type: String,
      trim: true,
    },
    institutionId: {
      type: String,
      required: true,
      index: true,
    },
    isVerifiedInstitutionalUser: {
      type: Boolean,
      default: true,
    },
    institutionDomain: {
      type: String,
      trim: true,
    },
    reporterEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    reporterName: {
      type: String,
      trim: true,
    },
    reporterPhone: {
      type: String,
      trim: true,
    },
    reporterContactEncrypted: {
      type: String,
    },
    category: {
      type: String,
      required: true,
      index: true,
    },
    incidentDate: {
      type: String,
      required: true,
    },
    incidentTime: {
      type: String,
      default: '12:00',
    },
    department: {
      type: String,
      required: true,
      index: true,
    },
    location: {
      type: String,
      required: true,
    },
    specificRoomOrSpot: {
      type: String,
      default: '',
    },
    isRecurring: {
      type: Boolean,
      default: false,
    },
    estimatedOccurrences: {
      type: Number,
      default: 1,
    },
    narrative: {
      type: String,
      required: true,
    },
    personDescription: {
      roleOrTitle: { type: String, default: 'Not specified' },
      aliasOrName: { type: String, default: 'Not specified' },
      department: { type: String, default: '' },
      identifyingDetails: { type: String },
    },
    structuredSummary: {
      keyIncidentPoints: [{ type: String }],
      extractedLocations: [{ type: String }],
      involvedRoleCategories: [{ type: String }],
      sentimentIndex: { type: String },
      riskSignalsDetected: [{ type: String }],
    },
    evidenceList: [EvidenceItemSchema],
    retaliationShieldEnabled: {
      type: Boolean,
      default: false,
    },
    checkInFrequency: {
      type: String,
      enum: ['weekly', 'biweekly', 'on_status_change', 'none'],
      default: 'weekly',
    },
    checkIns: [CheckInSchema],
    status: {
      type: String,
      enum: [
        'submitted',
        'evidence_locked',
        'pattern_alert_triggered',
        'under_investigation',
        'escalated_external',
        'action_taken',
        'closed',
      ],
      default: 'submitted',
      index: true,
    },
    neutralEscalationRequested: {
      type: Boolean,
      default: false,
    },
    neutralEscalationTarget: {
      type: String,
    },
    assignedReviewerRole: {
      type: String,
    },
    severity: {
      type: String,
      enum: ['critical', 'high', 'medium', 'low'],
      default: 'medium',
    },
    patternFlagged: {
      type: Boolean,
      default: false,
    },
    timeline: [TimelineEventSubSchema],
    reviewerNotes: [ReviewerNoteSchema],
    createdAt: {
      type: String,
      default: () => new Date().toISOString(),
    },
    updatedAt: {
      type: String,
      default: () => new Date().toISOString(),
    },
  },
  {
    timestamps: false, // Managed manually with ISO strings for exact consistency with schema
  }
);

// Compound indexes for fast institution and status queries
IncidentReportSchema.index({ institutionId: 1, createdAt: -1 });
IncidentReportSchema.index({ caseNumber: 1, passkey: 1 });

export const IncidentReportModel =
  (mongoose.models.IncidentReport as mongoose.Model<IIncidentReportDoc>) ||
  mongoose.model<IIncidentReportDoc>('IncidentReport', IncidentReportSchema);

