import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import { connectDatabase } from './config/database';
import { errorHandler } from './middleware/errorHandler';
import { notFoundHandler } from './middleware/notFoundHandler';
import { apiLimiter } from './middleware/rateLimiter';
import authRoutes from './routes/auth.routes';
import userRoutes from './routes/user.routes';
import sessionRoutes from './routes/session.routes';
import subjectRoutes from './routes/subject.routes';
import teacherRoutes from './routes/teacher.routes';
import adminRoutes from './routes/admin.routes';
import studentProfileRoutes from './routes/studentProfile.routes';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(helmet()); // Security headers

// CORS configuration
const allowedOrigins = process.env.NODE_ENV === 'production'
  ? [process.env.FRONTEND_URL || 'http://localhost:5173']
  : ['http://localhost:5173', 'http://localhost:8080', process.env.FRONTEND_URL].filter((origin): origin is string => Boolean(origin));

app.use(cors({
  origin: process.env.NODE_ENV === 'production' ? allowedOrigins[0] : allowedOrigins,
  credentials: true
}));
app.use(morgan('dev')); // Logging
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api', apiLimiter); // Rate limiting for all API routes

// Health check endpoint
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/sessions', sessionRoutes);
app.use('/api/subjects', subjectRoutes);
app.use('/api/teachers', teacherRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/student-profile', studentProfileRoutes);

// Error handling middleware (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

// Start server
const startServer = async () => {
  try {
    // Connect to MongoDB
    await connectDatabase();
    
    // Start listening
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
      console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log(`🔗 Health check: http://localhost:${PORT}/health`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;

