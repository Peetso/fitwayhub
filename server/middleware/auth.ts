import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import { get } from '../config/database';

interface JwtPayload { id: number; email: string; role?: string; }

declare global {
  namespace Express {
    interface Request { user?: JwtPayload & { role: string }; }
  }
}

export const authenticateToken = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Access token required' });
  try {
    const secret = process.env.JWT_SECRET || 'your-secret-key';
    const decoded = jwt.verify(token, secret) as JwtPayload;
    const user = await get<any>('SELECT role FROM users WHERE id = ?', [decoded.id]);
    (req as any).user = { ...decoded, role: user?.role || 'user' };
    next();
  } catch {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }
};
