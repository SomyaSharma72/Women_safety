import mongoose, { Schema } from 'mongoose';

export interface IIccUser {
  userId: string;
  email: string;
  passwordHash: string;
  name: string;
  role: 'ICC_ADMIN' | 'SUPER_ADMIN';
  institutionId: string;
  institutionName: string;
  active: boolean;
  lastLoginAt?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}

const IccUserSchema = new Schema<IIccUser>(
  {
    userId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
      index: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    role: {
      type: String,
      enum: ['ICC_ADMIN', 'SUPER_ADMIN'],
      default: 'ICC_ADMIN',
    },
    institutionId: {
      type: String,
      required: true,
      index: true,
    },
    institutionName: {
      type: String,
      required: true,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
    lastLoginAt: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

export const IccUserModel =
  (mongoose.models.IccUser as mongoose.Model<IIccUser>) ||
  mongoose.model<IIccUser>('IccUser', IccUserSchema);

