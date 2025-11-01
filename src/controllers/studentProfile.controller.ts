import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { StudentProfile } from '../models/StudentProfile.model';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../types';

export const saveStudentProfile = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { goals, selectedSubjects, onboardingCompleted } = req.body;

  const profile = await StudentProfile.findOneAndUpdate(
    { userId: req.user?.userId },
    {
      userId: req.user?.userId,
      goals: goals || [],
      selectedSubjects: selectedSubjects || [],
      onboardingCompleted: onboardingCompleted !== undefined ? onboardingCompleted : true
    },
    {
      new: true,
      upsert: true,
      runValidators: true
    }
  );

  res.json({
    success: true,
    data: profile,
    message: 'Student profile updated successfully'
  } as ApiResponse);
});

export const getStudentProfile = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const profile = await StudentProfile.findOne({ userId: req.user?.userId })
    .populate('userId', 'name email')
    .lean();

  if (!profile) {
    res.json({
      success: true,
      data: null,
      message: 'No profile found'
    } as ApiResponse);
    return;
  }

  res.json({
    success: true,
    data: profile
  } as ApiResponse);
});

export const getStudentProfileByUserId = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { userId } = req.params;

  const profile = await StudentProfile.findOne({ userId })
    .populate('userId', 'name email')
    .lean();

  if (!profile) {
    res.json({
      success: true,
      data: null,
      message: 'Student profile not found'
    } as ApiResponse);
    return;
  }

  res.json({
    success: true,
    data: profile
  } as ApiResponse);
});

