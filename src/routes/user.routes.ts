import { Router } from 'express';
import { body } from 'express-validator';
import {
  getAllUsers,
  getUserById,
  getUserStats,
  updateUser,
  deleteUser
} from '../controllers/user.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { UserRole } from '../types';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Validation rules
const updateUserValidation = [
  body('name').optional().trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters'),
  body('email').optional().isEmail().normalizeEmail().withMessage('Please provide a valid email')
];

// Routes
router.get('/', authorize(UserRole.ADMIN), getAllUsers);
router.get('/:id', getUserById);
router.get('/:id/stats', getUserStats);
router.patch('/:id', validate(updateUserValidation), updateUser);
router.delete('/:id', authorize(UserRole.ADMIN), deleteUser);

export default router;

