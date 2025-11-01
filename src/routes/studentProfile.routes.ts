import { Router } from 'express';
import { saveStudentProfile, getStudentProfile, getStudentProfileByUserId } from '../controllers/studentProfile.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../types';

const router = Router();

// All routes require authentication
router.use(authenticate);

// Routes for students to manage their own profile (must come before /:userId)
router.post('/', saveStudentProfile);
router.get('/', getStudentProfile);

// Admin route to get student profile by userId (must come after base routes)
router.get('/:userId', authorize(UserRole.ADMIN), getStudentProfileByUserId);

export default router;

