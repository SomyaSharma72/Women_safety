import mongoose, { Schema } from 'mongoose';

export interface ISurvivorIdentity {
  email: string;
  emailHash: string;
  verificationStatus: 'verified' | 'pending' | 'revoked';
  lastVerifiedAt: Date;
  reportsCount: number;
  institutionDomain?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const SurvivorIdentitySchema = new Schema<ISurvivorIdentity>(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    emailHash: {
      type: String,
      required: true,
      index: true,
    },
    verificationStatus: {
      type: String,
      enum: ['verified', 'pending', 'revoked'],
      default: 'verified',
    },
    lastVerifiedAt: {
      type: Date,
      default: Date.now,
    },
    reportsCount: {
      type: Number,
      default: 0,
    },
    institutionDomain: {
      type: String,
      trim: true,
    },
  },
  {
    timestamps: true,
  }
);

export const SurvivorIdentityModel =
  (mongoose.models.SurvivorIdentity as mongoose.Model<ISurvivorIdentity>) ||
  mongoose.model<ISurvivorIdentity>('SurvivorIdentity', SurvivorIdentitySchema);

