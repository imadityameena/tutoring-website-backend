import mongoose, { Schema, Document } from 'mongoose';

export interface IStudentProfile extends Document {
  _id: string;
  userId: string;
  goals: string[];
  selectedSubjects: string[];
  onboardingCompleted: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const studentProfileSchema = new Schema<IStudentProfile>(
  {
    userId: {
      type: Schema.Types.ObjectId as any,
      ref: 'User',
      required: [true, 'User ID is required'],
      unique: true
    },
    goals: {
      type: [String],
      default: []
    },
    selectedSubjects: {
      type: [String],
      default: []
    },
    onboardingCompleted: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true
  }
);

// Index for faster queries
studentProfileSchema.index({ userId: 1 });

export const StudentProfile = mongoose.model<IStudentProfile>('StudentProfile', studentProfileSchema);

