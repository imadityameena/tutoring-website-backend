import { Router } from 'express';
import { body } from 'express-validator';
import {
  createSession,
  getMySessions,
  getSessionById,
  updateSessionStatus,
  getAllSessions
} from '../controllers/session.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { validate } from '../middleware/validation.middleware';
import { UserRole, SessionStatus } from '../types';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Validation rules
const createSessionValidation = [
  body('subjectId').notEmpty().isMongoId().withMessage('Valid subject ID is required'),
  body('topic').trim().isLength({ min: 1, max: 500 }).withMessage('Topic is required and must be less than 500 characters'),
  body('sessionDate').isISO8601().toDate().withMessage('Valid session date is required'),
  body('sessionTime').matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/).withMessage('Valid time format (HH:MM) is required')
];

const updateSessionValidation = [
  body('status').optional().isIn(Object.values(SessionStatus)).withMessage('Invalid status'),
  body('teacherId').optional().isMongoId().withMessage('Valid teacher ID is required'),
  body('notes').optional().isLength({ max: 1000 }).withMessage('Notes cannot exceed 1000 characters')
];

// Routes
router.post('/', validate(createSessionValidation), createSession);
router.get('/my-sessions', getMySessions);
router.get('/all', authorize(UserRole.ADMIN), getAllSessions);
router.get('/:id', getSessionById);
router.patch('/:id', validate(updateSessionValidation), authorize(UserRole.ADMIN), updateSessionStatus);

export default router;

