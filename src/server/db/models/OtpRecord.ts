import mongoose, { Schema } from 'mongoose';

export interface IOtpRecord {
  email: string;
  otpHash: string;
  type: 'survivor' | 'icc';
  expiresAt: Date;
  attempts: number;
  verified: boolean;
  metadata?: Record<string, any>;
  createdAt?: Date;
  updatedAt?: Date;
}

const OtpRecordSchema = new Schema<IOtpRecord>(
  {
    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    otpHash: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['survivor', 'icc'],
      required: true,
      index: true,
    },
    expiresAt: {
      type: Date,
      required: true,
      index: { expires: 0 }, // MongoDB automatic TTL index cleanup
    },
    attempts: {
      type: Number,
      default: 0,
    },
    verified: {
      type: Boolean,
      default: false,
    },
    metadata: {
      type: Schema.Types.Mixed,
    },
  },
  {
    timestamps: true,
  }
);

// Compound index for efficient lookup
OtpRecordSchema.index({ email: 1, type: 1 });

export const OtpRecordModel =
  (mongoose.models.OtpRecord as mongoose.Model<IOtpRecord>) ||
  mongoose.model<IOtpRecord>('OtpRecord', OtpRecordSchema);

