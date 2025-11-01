import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { Session } from '../models/Session.model';
import { Subject } from '../models/Subject.model';
import { User } from '../models/User.model';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse, SessionStatus } from '../types';

export const createSession = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { subjectId, topic, sessionDate, sessionTime } = req.body;
  const userId = req.user?.userId;

  if (!userId) {
    res.status(401).json({
      success: false,
      message: 'Authentication required'
    } as ApiResponse);
    return;
  }

  // Verify subject exists
  const subject = await Subject.findById(subjectId);
  if (!subject) {
    res.status(404).json({
      success: false,
      message: 'Subject not found'
    } as ApiResponse);
    return;
  }

  const session = await Session.create({
    studentId: userId,
    subjectId,
    topic,
    sessionDate: new Date(sessionDate),
    sessionTime,
    status: SessionStatus.PENDING
  });

  const populatedSession = await Session.findById(session._id)
    .populate('subjectId', 'name description')
    .populate('studentId', 'name email')
    .lean();

  res.status(201).json({
    success: true,
    message: 'Session request created successfully',
    data: populatedSession
  } as ApiResponse);
});

export const getMySessions = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const userId = req.user?.userId;
  const { status } = req.query;

  if (!userId) {
    res.status(401).json({
      success: false,
      message: 'Authentication required'
    } as ApiResponse);
    return;
  }

  const filter: any = { studentId: userId };
  if (status) {
    filter.status = status;
  }

  const sessions = await Session.find(filter)
    .populate('subjectId', 'name description category')
    .populate('teacherId', 'name email')
    .sort({ createdAt: -1 })
    .lean();

  res.json({
    success: true,
    data: sessions
  } as ApiResponse);
});

export const getSessionById = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const userId = req.user?.userId;

  if (!userId) {
    res.status(401).json({
      success: false,
      message: 'Authentication required'
    } as ApiResponse);
    return;
  }

  const session = await Session.findById(id)
    .populate('subjectId', 'name description category')
    .populate('studentId', 'name email')
    .populate('teacherId', 'name email');

  if (!session) {
    res.status(404).json({
      success: false,
      message: 'Session not found'
    } as ApiResponse);
    return;
  }

  // Check if user is authorized to view this session
  const studentId = session.studentId as any;
  const studentIdStr = (typeof studentId === 'object' && studentId?._id 
    ? studentId._id.toString() 
    : studentId.toString());
    
  if (studentIdStr !== userId && req.user?.role !== 'admin') {
    res.status(403).json({
      success: false,
      message: 'Access denied'
    } as ApiResponse);
    return;
  }

  const sessionData = session.toObject();

  res.json({
    success: true,
    data: sessionData
  } as ApiResponse);
});

export const updateSessionStatus = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { status, teacherId, notes } = req.body;

  const session = await Session.findById(id);
  if (!session) {
    res.status(404).json({
      success: false,
      message: 'Session not found'
    } as ApiResponse);
    return;
  }

  // Validate status
  if (status && !Object.values(SessionStatus).includes(status)) {
    res.status(400).json({
      success: false,
      message: 'Invalid status'
    } as ApiResponse);
    return;
  }

  // If approving, verify teacher exists
  if (status === SessionStatus.APPROVED && teacherId) {
    const teacher = await User.findById(teacherId);
    if (!teacher || teacher.role !== 'teacher') {
      res.status(404).json({
        success: false,
        message: 'Teacher not found'
      } as ApiResponse);
      return;
    }
    session.teacherId = teacherId;
  }

  if (status) session.status = status as SessionStatus;
  if (notes !== undefined) session.notes = notes;

  await session.save();

  const populatedSession = await Session.findById(session._id)
    .populate('subjectId', 'name description')
    .populate('studentId', 'name email')
    .populate('teacherId', 'name email')
    .lean();

  res.json({
    success: true,
    message: 'Session updated successfully',
    data: populatedSession
  } as ApiResponse);
});

export const getAllSessions = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { status, studentId, teacherId } = req.query;

  const filter: any = {};
  if (status) filter.status = status;
  if (studentId) filter.studentId = studentId;
  if (teacherId) filter.teacherId = teacherId;

  const sessions = await Session.find(filter)
    .populate('subjectId', 'name description category')
    .populate('studentId', 'name email')
    .populate('teacherId', 'name email')
    .sort({ createdAt: -1 })
    .lean();

  res.json({
    success: true,
    data: sessions
  } as ApiResponse);
});

