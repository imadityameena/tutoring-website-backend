import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { User } from '../models/User.model';
import { Session } from '../models/Session.model';
import { Teacher } from '../models/Teacher.model';
import { StudentProfile } from '../models/StudentProfile.model';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse, SessionStatus } from '../types';
import { seedData } from '../scripts/seedData';

export const getDashboardStats = asyncHandler(async (_req: AuthRequest, res: Response): Promise<void> => {
  const [
    totalUsers,
    totalTeachers,
    totalSessions,
    pendingSessions,
    approvedSessions,
    rejectedSessions,
    students
  ] = await Promise.all([
    User.countDocuments(),
    Teacher.countDocuments(),
    Session.countDocuments(),
    Session.countDocuments({ status: SessionStatus.PENDING }),
    Session.countDocuments({ status: SessionStatus.APPROVED }),
    Session.countDocuments({ status: SessionStatus.REJECTED }),
    User.countDocuments({ role: 'student' })
  ]);

  const stats = {
    users: {
      total: totalUsers,
      students,
      teachers: totalTeachers
    },
    sessions: {
      total: totalSessions,
      pending: pendingSessions,
      approved: approvedSessions,
      rejected: rejectedSessions
    }
  };

  res.json({
    success: true,
    data: stats
  } as ApiResponse);
});

export const getAllStudents = asyncHandler(async (_req: AuthRequest, res: Response): Promise<void> => {
  const students = await User.find({ role: 'student' })
    .select('-password')
    .sort({ createdAt: -1 })
    .lean();

  // Get session stats and profile for each student
  const studentsWithStats = await Promise.all(
    students.map(async (student) => {
      const sessions = await Session.find({ studentId: student._id }).lean();
      
      // Get student profile with onboarding details
      const profile = await StudentProfile.findOne({ userId: student._id }).lean();
      
      return {
        ...student,
        totalSessions: sessions.length,
        activeSessions: sessions.filter(s => s.status === SessionStatus.PENDING || s.status === SessionStatus.APPROVED).length,
        lastActivity: sessions.length > 0 
          ? sessions.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())[0].createdAt
          : student.createdAt,
        profile: profile || null
      };
    })
  );

  res.json({
    success: true,
    data: studentsWithStats
  } as ApiResponse);
});

export const seedDatabase = asyncHandler(async (_req: AuthRequest, res: Response): Promise<void> => {
  try {
    await seedData();
    res.json({
      success: true,
      message: 'Database seeded successfully'
    } as ApiResponse);
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'Failed to seed database'
    } as ApiResponse);
  }
});

