import mongoose, { Schema } from 'mongoose';

export interface ITimelineEvent {
  caseNumber: string;
  timestamp: string;
  title: string;
  description: string;
  actor: 'reporter' | 'system' | 'ai_pattern_radar' | 'authorized_reviewer' | 'external_ombudsman';
  badgeType?: 'info' | 'warning' | 'success' | 'alert';
  metadata?: Record<string, any>;
  createdAt?: Date;
}

export const TimelineEventSubSchema = new Schema(
  {
    id: {
      type: String,
      required: true,
      default: () => `tm-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    },
    timestamp: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    actor: {
      type: String,
      enum: ['reporter', 'system', 'ai_pattern_radar', 'authorized_reviewer', 'external_ombudsman'],
      required: true,
    },
    badgeType: {
      type: String,
      enum: ['info', 'warning', 'success', 'alert'],
      default: 'info',
    },
    metadata: {
      type: Schema.Types.Mixed,
    },
  },
  { _id: false }
);

const TimelineEventSchema = new Schema<ITimelineEvent>(
  {
    caseNumber: {
      type: String,
      required: true,
      index: true,
    },
    timestamp: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    actor: {
      type: String,
      enum: ['reporter', 'system', 'ai_pattern_radar', 'authorized_reviewer', 'external_ombudsman'],
      required: true,
    },
    badgeType: {
      type: String,
      enum: ['info', 'warning', 'success', 'alert'],
      default: 'info',
    },
    metadata: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: { createdAt: true, updatedAt: false },
  }
);

export const TimelineEventModel =
  (mongoose.models.TimelineEvent as mongoose.Model<ITimelineEvent>) ||
  mongoose.model<ITimelineEvent>('TimelineEvent', TimelineEventSchema);

