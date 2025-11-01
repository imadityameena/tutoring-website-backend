import { Response } from 'express';
import { AuthRequest } from '../middleware/auth.middleware';
import { User } from '../models/User.model';
import { generateToken } from '../utils/jwt.utils';
import { asyncHandler } from '../utils/asyncHandler';
import { ApiResponse } from '../types';

export const register = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { name, email, password, role } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    res.status(400).json({
      success: false,
      message: 'User with this email already exists'
    } as ApiResponse);
    return;
  }

  // Create new user
  const user = await User.create({
    name,
    email,
    password,
    role: role || 'student'
  });

  // Generate token
  const token = generateToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role
  });

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    }
  } as ApiResponse);
});

export const login = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const { email, password } = req.body;

  // Find user and include password for comparison
  const user = await User.findOne({ email }).select('+password');
  
  if (!user || !(await user.comparePassword(password))) {
    res.status(401).json({
      success: false,
      message: 'Invalid email or password'
    } as ApiResponse);
    return;
  }

  // Generate token
  const token = generateToken({
    userId: user._id.toString(),
    email: user.email,
    role: user.role
  });

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    }
  } as ApiResponse);
});

export const getMe = asyncHandler(async (req: AuthRequest, res: Response): Promise<void> => {
  const user = await User.findById(req.user?.userId);
  
  if (!user) {
    res.status(404).json({
      success: false,
      message: 'User not found'
    } as ApiResponse);
    return;
  }

  res.json({
    success: true,
    data: {
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      createdAt: user.createdAt
    }
  } as ApiResponse);
});

