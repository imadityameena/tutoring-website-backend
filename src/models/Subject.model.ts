import mongoose, { Schema } from 'mongoose';
import { ISubject } from '../types';

const subjectSchema = new Schema<ISubject>(
  {
    name: {
      type: String,
      required: [true, 'Subject name is required'],
      unique: true,
      trim: true,
      maxlength: [100, 'Subject name cannot exceed 100 characters']
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, 'Description cannot exceed 500 characters']
    },
    category: {
      type: String,
      trim: true,
      maxlength: [50, 'Category cannot exceed 50 characters']
    },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      default: 'Beginner'
    }
  },
  {
    timestamps: true
  }
);

// Index for faster queries
subjectSchema.index({ name: 1 });

export const Subject = mongoose.model<ISubject>('Subject', subjectSchema);

