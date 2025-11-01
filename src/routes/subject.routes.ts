import { Router } from 'express';
import { body } from 'express-validator';
import {
  getAllSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject
} from '../controllers/subject.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { UserRole } from '../types';

const router = Router();

// Validation rules
const createSubjectValidation = [
  body('name').trim().isLength({ min: 1, max: 100 }).withMessage('Name is required and must be less than 100 characters'),
  body('description').optional().isLength({ max: 500 }).withMessage('Description cannot exceed 500 characters'),
  body('category').optional().isLength({ max: 50 }).withMessage('Category cannot exceed 50 characters'),
  body('difficulty').optional().isIn(['Beginner', 'Intermediate', 'Advanced']).withMessage('Invalid difficulty level')
];

// Public routes
router.get('/', getAllSubjects);
router.get('/:id', getSubjectById);

// Protected routes (require authentication)
router.use(authenticate);

// Admin only routes
router.post('/', validate(createSubjectValidation), authorize(UserRole.ADMIN), createSubject);
router.patch('/:id', authorize(UserRole.ADMIN), updateSubject);
router.delete('/:id', authorize(UserRole.ADMIN), deleteSubject);

export default router;

