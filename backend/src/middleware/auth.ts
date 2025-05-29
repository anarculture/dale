// backend/src/middleware/auth.ts
import jwt from 'jsonwebtoken';
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET || 'cambia_este_secret';

import { Request, Response, NextFunction } from 'express';

// Extiende la interfaz Request para incluir userId
declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

function authenticate(req: Request, res: Response, next: NextFunction) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Token faltante.' });
  }
  try {
    const token = auth.split(' ')[1];
    const { userId } = jwt.verify(token, JWT_SECRET) as { userId: string };
    req.userId = userId;
    return next();
  } catch {
    return res.status(401).json({ error: 'Token inválido.' });
  }
}

module.exports = { authenticate };
