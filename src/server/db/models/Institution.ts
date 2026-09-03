import mongoose, { Schema } from 'mongoose';

export interface IInstitution {
  institutionId: string;
  name: string;
  shortCode: string;
  domain: string;
  type: 'college' | 'company';
  active: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const InstitutionSchema = new Schema<IInstitution>(
  {
    institutionId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      index: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    shortCode: {
      type: String,
      required: true,
      uppercase: true,
      trim: true,
    },
    domain: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['college', 'company'],
      required: true,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const InstitutionModel =
  (mongoose.models.Institution as mongoose.Model<IInstitution>) ||
  mongoose.model<IInstitution>('Institution', InstitutionSchema);

