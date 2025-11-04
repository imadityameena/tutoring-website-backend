import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { User } from '../models/User.model';
import { Session } from '../models/Session.model';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../types';

export const getAllUsers = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { role } = req.query;
  
  const filter: any = {};
  if (role) {
    filter.role = role;
  }

  const users = await User.find(filter)
    .select('-password')
    .sort({ createdAt: -1 })
    .lean();

  res.json({
    success: true,
    data: users
  } as ApiResponse);
});

export const getUserById = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  const user = await User.findById(id).select('-password').lean();
  if (!user) {
    res.status(404).json({
      success: false,
      message: 'User not found'
    } as ApiResponse);
    return;
  }

  res.json({
    success: true,
    data: user
  } as ApiResponse);
});

export const getUserStats = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const userId = id || req.user?.userId;

  if (!userId) {
    res.status(401).json({
      success: false,
      message: 'Authentication required'
    } as ApiResponse);
    return;
  }

  // Get user sessions
  const sessions = await Session.find({ studentId: userId }).lean();
  
  const stats = {
    totalSessions: sessions.length,
    completedSessions: sessions.filter(s => s.status === 'Completed').length,
    pendingSessions: sessions.filter(s => s.status === 'Pending').length,
    approvedSessions: sessions.filter(s => s.status === 'Approved').length,
    rejectedSessions: sessions.filter(s => s.status === 'Rejected').length
  };

  res.json({
    success: true,
    data: stats
  } as ApiResponse);
});

export const updateUser = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;
  const { name, email } = req.body;
  const userId = req.user?.userId;

  // Users can only update themselves unless they're admin
  if (id !== userId && req.user?.role !== 'admin') {
    res.status(403).json({
      success: false,
      message: 'Access denied'
    } as ApiResponse);
    return;
  }

  const updateData: any = {};
  if (name) updateData.name = name;
  if (email) updateData.email = email;

  const user = await User.findByIdAndUpdate(
    id,
    updateData,
    { new: true, runValidators: true }
  ).select('-password').lean();

  if (!user) {
    res.status(404).json({
      success: false,
      message: 'User not found'
    } as ApiResponse);
    return;
  }

  res.json({
    success: true,
    message: 'User updated successfully',
    data: user
  } as ApiResponse);
});

export const deleteUser = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { id } = req.params;

  const user = await User.findByIdAndDelete(id);
  if (!user) {
    res.status(404).json({
      success: false,
      message: 'User not found'
    } as ApiResponse);
    return;
  }

  res.json({
    success: true,
    message: 'User deleted successfully'
  } as ApiResponse);
});




