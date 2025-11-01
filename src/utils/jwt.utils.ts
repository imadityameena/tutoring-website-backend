import jwt from 'jsonwebtoken';
import { UserRole } from '../types';

interface TokenPayload {
  userId: string;
  email: string;
  role: UserRole;
}

export const generateToken = (payload: TokenPayload): string => {
  const secret = process.env.JWT_SECRET || 'secret';
  const expiresIn = process.env.JWT_EXPIRE || '7d';

  return jwt.sign(payload, secret, { expiresIn } as jwt.SignOptions);
};

export const verifyToken = (token: string): TokenPayload => {
  const secret = process.env.JWT_SECRET || 'secret';
  return jwt.verify(token, secret) as TokenPayload;
};

