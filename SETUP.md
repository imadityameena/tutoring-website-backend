# Server Setup Guide

## Quick Start

1. **Install Dependencies**
   ```bash
   cd server
   npm install
   ```

2. **Create Environment File**
   Create a `.env` file in the `server` directory with the following content:
   ```env
   PORT=5000
   NODE_ENV=development
   MONGODB_URI=mongodb://localhost:27017/coderoof-tutoring
   JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
   JWT_EXPIRE=7d
   FRONTEND_URL=http://localhost:5173
   RATE_LIMIT_WINDOW_MS=900000
   RATE_LIMIT_MAX_REQUESTS=100
   ```

3. **Start MongoDB**
   Make sure MongoDB is running on your system:
   ```bash
   # If installed locally
   mongod
   
   # Or use MongoDB Atlas cloud connection string in MONGODB_URI
   ```

4. **Start the Server**
   ```bash
   # Development mode (with auto-reload)
   npm run dev
   
   # Production mode
   npm run build
   npm start
   ```

5. **Test the Server**
   Visit: `http://localhost:5000/health`
   
   You should see:
   ```json
   {
     "status": "OK",
     "message": "Server is running",
     "timestamp": "2024-01-01T00:00:00.000Z"
   }
   ```

## Environment Variables

| Variable | Description | Required | Default |
|----------|-------------|----------|---------|
| `PORT` | Server port | No | `5000` |
| `NODE_ENV` | Environment (development/production) | No | `development` |
| `MONGODB_URI` | MongoDB connection string | **Yes** | - |
| `JWT_SECRET` | Secret key for JWT tokens | **Yes** | - |
| `JWT_EXPIRE` | JWT token expiration | No | `7d` |
| `FRONTEND_URL` | Frontend URL for CORS | No | `http://localhost:5173` |
| `RATE_LIMIT_WINDOW_MS` | Rate limit window in milliseconds | No | `900000` |
| `RATE_LIMIT_MAX_REQUESTS` | Max requests per window | No | `100` |

## MongoDB Setup

### Option 1: Local MongoDB
1. Install MongoDB on your system
2. Start MongoDB service: `mongod`
3. Use connection string: `mongodb://localhost:27017/coderoof-tutoring`

### Option 2: MongoDB Atlas (Cloud)
1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string and replace in `MONGODB_URI`
4. Format: `mongodb+srv://username:password@cluster.mongodb.net/coderoof-tutoring`

## API Testing

### Using cURL

**Register a User:**
```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "student"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Get Current User (requires token):**
```bash
curl -X GET http://localhost:5000/api/auth/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

### Using Postman or Insomnia

Import the endpoints and test with the provided examples above.

## Troubleshooting

### MongoDB Connection Error
- Verify MongoDB is running
- Check `MONGODB_URI` is correct
- Ensure network/firewall allows connection

### Port Already in Use
- Change `PORT` in `.env` file
- Or kill the process using the port

### JWT Secret Error
- Make sure `JWT_SECRET` is set in `.env`
- Use a strong, random secret in production

### TypeScript Errors
- Run `npm install` to ensure all dependencies are installed
- Check `tsconfig.json` configuration

## Next Steps

1. Connect your frontend to this API
2. Update `FRONTEND_URL` in `.env` to match your frontend URL
3. Implement API calls in your frontend using the endpoints documented in `README.md`




