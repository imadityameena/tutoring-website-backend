import { Router } from 'express';
import { body } from 'express-validator';
import {
  getAllTeachers,
  getTeacherById,
  createTeacher,
  updateTeacher,
  deleteTeacher
} from '../controllers/teacher.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { UserRole } from '../types';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Validation rules
const createTeacherValidation = [
  body('userId').isMongoId().withMessage('Valid user ID is required'),
  body('subjects').optional().isArray().withMessage('Subjects must be an array'),
  body('bio').optional().isLength({ max: 1000 }).withMessage('Bio cannot exceed 1000 characters')
];

// Routes
router.get('/', getAllTeachers);
router.get('/:id', getTeacherById);
router.post('/', validate(createTeacherValidation), authorize(UserRole.ADMIN), createTeacher);
router.patch('/:id', authorize(UserRole.ADMIN), updateTeacher);
router.delete('/:id', authorize(UserRole.ADMIN), deleteTeacher);

export default router;

