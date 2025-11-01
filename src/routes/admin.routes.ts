import { Router } from 'express';
import { getDashboardStats, getAllStudents, seedDatabase } from '../controllers/admin.controller';
import { authenticate, authorize } from '../middleware/auth.middleware';
import { UserRole } from '../types';

const router = Router();

// All routes require authentication and admin role
router.use(authenticate);
router.use(authorize(UserRole.ADMIN));

// Routes
router.get('/dashboard', getDashboardStats);
router.get('/students', getAllStudents);
router.post('/seed', seedDatabase);

export default router;

