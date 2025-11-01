import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { Subject } from '../models/Subject.model';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../types';

export const getAllSubjects = asyncHandler(async (_req: AuthRequest, res: Response): Promise<void> => {
  const subjects = await Subject.find().sort({ name: 1 }).lean();

  res.json({
    success: true,
    data: subjects
  } as ApiResponse);
});

export const getSubjectById = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  const subject = await Subject.findById(id);
  if (!subject) {
    res.status(404).json({
      success: false,
      message: 'Subject not found'
    } as ApiResponse);
    return;
  }

  res.json({
    success: true,
    data: subject
  } as ApiResponse);
});

export const createSubject = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { name, description, category, difficulty } = req.body;

  const subject = await Subject.create({
    name,
    description,
    category,
    difficulty
  });

  res.status(201).json({
    success: true,
    message: 'Subject created successfully',
    data: subject
  } as ApiResponse);
});

export const updateSubject = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, description, category, difficulty } = req.body;

  const subject = await Subject.findByIdAndUpdate(
    id,
    { name, description, category, difficulty },
    { new: true, runValidators: true }
  );

  if (!subject) {
    res.status(404).json({
      success: false,
      message: 'Subject not found'
    } as ApiResponse);
    return;
  }

  res.json({
    success: true,
    message: 'Subject updated successfully',
    data: subject
  } as ApiResponse);
});

export const deleteSubject = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  const subject = await Subject.findByIdAndDelete(id);
  if (!subject) {
    res.status(404).json({
      success: false,
      message: 'Subject not found'
    } as ApiResponse);
    return;
  }

  res.json({
    success: true,
    message: 'Subject deleted successfully'
  } as ApiResponse);
});

