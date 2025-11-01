import mongoose, { Schema } from 'mongoose';
import { ITeacher } from '../types';

const teacherSchema = new Schema<ITeacher>(
  {
    userId: {
      type: Schema.Types.ObjectId as any,
      ref: 'User',
      required: [true, 'User ID is required'],
      unique: true
    },
    subjects: [{
      type: Schema.Types.ObjectId as any,
      ref: 'Subject'
    }],
    bio: {
      type: String,
      maxlength: [1000, 'Bio cannot exceed 1000 characters'],
      default: ''
    },
    rating: {
      type: Number,
      min: [0, 'Rating cannot be negative'],
      max: [5, 'Rating cannot exceed 5'],
      default: 0
    }
  },
  {
    timestamps: true
  }
);

// Index for faster queries
teacherSchema.index({ userId: 1 });

export const Teacher = mongoose.model<ITeacher>('Teacher', teacherSchema);

