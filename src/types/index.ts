import { Document } from 'mongoose';
import { Request } from 'express';

export enum UserRole {
  STUDENT = 'student',
  ADMIN = 'admin',
  TEACHER = 'teacher'
}

export enum SessionStatus {
  PENDING = 'Pending',
  APPROVED = 'Approved',
  REJECTED = 'Rejected',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled'
}

export interface IUser extends Document {
  _id: string;
  name: string;
  email: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export interface ISession extends Document {
  _id: string;
  studentId: string;
  subjectId: string;
  teacherId?: string;
  topic: string;
  sessionDate: Date;
  sessionTime: string;
  status: SessionStatus;
  notes?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ISubject extends Document {
  _id: string;
  name: string;
  description?: string;
  category?: string;
  difficulty?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ITeacher extends Document {
  _id: string;
  userId: string;
  subjects: string[];
  bio?: string;
  rating?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface AuthRequest extends Request {
  user?: {
    userId: string;
    email: string;
    role: UserRole;
  };
}

export interface ApiResponse<T = any> {
  success: boolean;
  message?: string;
  data?: T;
  error?: string | Array<{ field: string; message: string }>;
}

