# Coderoof Tutoring Server

Backend API server for the Coderoof Tutoring Platform built with Express, TypeScript, and MongoDB.

## Features

- ✅ RESTful API architecture
- ✅ TypeScript for type safety
- ✅ MongoDB with Mongoose for data modeling
- ✅ JWT authentication and authorization
- ✅ Role-based access control (Student, Admin, Teacher)
- ✅ Request validation
- ✅ Error handling middleware
- ✅ Security best practices (Helmet, CORS)
- ✅ Clean code structure

## Project Structure

```
server/
├── src/
│   ├── config/          # Configuration files
│   │   └── database.ts  # MongoDB connection
│   ├── controllers/     # Request handlers
│   │   ├── auth.controller.ts
│   │   ├── session.controller.ts
│   │   ├── subject.controller.ts
│   │   ├── teacher.controller.ts
│   │   ├── user.controller.ts
│   │   └── admin.controller.ts
│   ├── middleware/      # Custom middleware
│   │   ├── auth.middleware.ts
│   │   ├── errorHandler.ts
│   │   ├── notFoundHandler.ts
│   │   └── validation.middleware.ts
│   ├── models/          # Mongoose models
│   │   ├── User.model.ts
│   │   ├── Session.model.ts
│   │   ├── Subject.model.ts
│   │   └── Teacher.model.ts
│   ├── routes/          # API routes
│   │   ├── auth.routes.ts
│   │   ├── session.routes.ts
│   │   ├── subject.routes.ts
│   │   ├── teacher.routes.ts
│   │   ├── user.routes.ts
│   │   └── admin.routes.ts
│   ├── types/           # TypeScript type definitions
│   │   └── index.ts
│   ├── utils/           # Utility functions
│   │   ├── jwt.utils.ts
│   │   └── asyncHandler.ts
│   └── index.ts         # Application entry point
├── .env.example         # Environment variables template
├── .gitignore
├── package.json
├── tsconfig.json
└── README.md
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### Installation

1. Navigate to the server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file from the example:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
PORT=5000
NODE_ENV=development
MONGODB_URI=mongodb://localhost:27017/coderoof-tutoring
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRE=7d
FRONTEND_URL=http://localhost:5173
```

5. Start MongoDB (if running locally):
```bash
mongod
```

### Running the Server

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm run build
npm start
```

The server will start on `http://localhost:5000` (or your configured PORT).

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (requires auth)

### Sessions
- `POST /api/sessions` - Create a session request (student)
- `GET /api/sessions/my-sessions` - Get my sessions (student)
- `GET /api/sessions/all` - Get all sessions (admin)
- `GET /api/sessions/:id` - Get session by ID
- `PATCH /api/sessions/:id` - Update session status (admin)

### Subjects
- `GET /api/subjects` - Get all subjects (public)
- `GET /api/subjects/:id` - Get subject by ID (public)
- `POST /api/subjects` - Create subject (admin)
- `PATCH /api/subjects/:id` - Update subject (admin)
- `DELETE /api/subjects/:id` - Delete subject (admin)

### Teachers
- `GET /api/teachers` - Get all teachers
- `GET /api/teachers/:id` - Get teacher by ID
- `POST /api/teachers` - Create teacher (admin)
- `PATCH /api/teachers/:id` - Update teacher (admin)
- `DELETE /api/teachers/:id` - Delete teacher (admin)

### Users
- `GET /api/users` - Get all users (admin)
- `GET /api/users/:id` - Get user by ID
- `GET /api/users/:id/stats` - Get user statistics
- `PATCH /api/users/:id` - Update user
- `DELETE /api/users/:id` - Delete user (admin)

### Admin
- `GET /api/admin/dashboard` - Get dashboard statistics
- `GET /api/admin/students` - Get all students with stats

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Error Handling

The API uses consistent error responses:

```json
{
  "success": false,
  "message": "Error message here"
}
```

## Development

### TypeScript Compilation

```bash
npm run build
```

### Linting

```bash
npm run lint
```

## Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `NODE_ENV` | Environment | `development` |
| `MONGODB_URI` | MongoDB connection string | - |
| `JWT_SECRET` | JWT secret key | - |
| `JWT_EXPIRE` | JWT expiration | `7d` |
| `FRONTEND_URL` | Frontend URL for CORS | `http://localhost:5173` |

## License

ISC

