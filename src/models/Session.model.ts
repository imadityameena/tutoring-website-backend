import mongoose, { Schema } from 'mongoose';
import { ISession, SessionStatus } from '../types';

const sessionSchema = new Schema<ISession>(
  {
    studentId: {
      type: Schema.Types.ObjectId as any,
      ref: 'User',
      required: [true, 'Student ID is required']
    },
    subjectId: {
      type: Schema.Types.ObjectId as any,
      ref: 'Subject',
      required: [true, 'Subject ID is required']
    },
    teacherId: {
      type: Schema.Types.ObjectId as any,
      ref: 'User',
      default: null
    },
    topic: {
      type: String,
      required: [true, 'Topic is required'],
      trim: true,
      maxlength: [500, 'Topic cannot exceed 500 characters']
    },
    sessionDate: {
      type: Date,
      required: [true, 'Session date is required'],
      validate: {
        validator: function(value: Date) {
          return value >= new Date(new Date().setHours(0, 0, 0, 0));
        },
        message: 'Session date must be today or in the future'
      }
    },
    sessionTime: {
      type: String,
      required: [true, 'Session time is required'],
      match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, 'Please provide a valid time format (HH:MM)']
    },
    status: {
      type: String,
      enum: Object.values(SessionStatus),
      default: SessionStatus.PENDING
    },
    notes: {
      type: String,
      maxlength: [1000, 'Notes cannot exceed 1000 characters'],
      default: ''
    }
  },
  {
    timestamps: true
  }
);

// Indexes for faster queries
sessionSchema.index({ studentId: 1, createdAt: -1 });
sessionSchema.index({ teacherId: 1 });
sessionSchema.index({ status: 1 });
sessionSchema.index({ sessionDate: 1 });

export const Session = mongoose.model<ISession>('Session', sessionSchema);

