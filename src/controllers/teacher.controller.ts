import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { Teacher } from '../models/Teacher.model';
import { User } from '../models/User.model';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../types';

export const getAllTeachers = asyncHandler(async (_req: AuthRequest, res: Response): Promise<void> => {
  const teachers = await Teacher.find()
    .populate('userId', 'name email')
    .populate('subjects', 'name description')
    .sort({ createdAt: -1 })
    .lean();

  res.json({
    success: true,
    data: teachers
  } as ApiResponse);
});

export const getTeacherById = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  const teacher = await Teacher.findById(id)
    .populate('userId', 'name email')
    .populate('subjects', 'name description')
    .lean();

  if (!teacher) {
    res.status(404).json({
      success: false,
      message: 'Teacher not found'
    } as ApiResponse);
    return;
  }

  res.json({
    success: true,
    data: teacher
  } as ApiResponse);
});

export const createTeacher = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { userId, subjects, bio } = req.body;

  // Verify user exists and is a teacher
  const user = await User.findById(userId);
  if (!user) {
    res.status(404).json({
      success: false,
      message: 'User not found'
    } as ApiResponse);
    return;
  }

  // Check if teacher already exists for this user
  const existingTeacher = await Teacher.findOne({ userId });
  if (existingTeacher) {
    res.status(400).json({
      success: false,
      message: 'Teacher profile already exists for this user'
    } as ApiResponse);
    return;
  }

  const teacher = await Teacher.create({
    userId,
    subjects: subjects || [],
    bio
  });

  const populatedTeacher = await Teacher.findById(teacher._id)
    .populate('userId', 'name email')
    .populate('subjects', 'name description')
    .lean();

  res.status(201).json({
    success: true,
    message: 'Teacher created successfully',
    data: populatedTeacher
  } as ApiResponse);
});

export const updateTeacher = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { subjects, bio, rating } = req.body;

  const teacher = await Teacher.findByIdAndUpdate(
    id,
    { subjects, bio, rating },
    { new: true, runValidators: true }
  )
    .populate('userId', 'name email')
    .populate('subjects', 'name description')
    .lean();

  if (!teacher) {
    res.status(404).json({
      success: false,
      message: 'Teacher not found'
    } as ApiResponse);
    return;
  }

  res.json({
    success: true,
    message: 'Teacher updated successfully',
    data: teacher
  } as ApiResponse);
});

export const deleteTeacher = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  const teacher = await Teacher.findByIdAndDelete(id);
  if (!teacher) {
    res.status(404).json({
      success: false,
      message: 'Teacher not found'
    } as ApiResponse);
    return;
  }

  res.json({
    success: true,
    message: 'Teacher deleted successfully'
  } as ApiResponse);
});

