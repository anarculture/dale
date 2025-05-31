// backend/routes/auth.ts

import { Router, Request, Response } from 'express';
import { AuthContext } from 'better-auth';

const router = Router();

interface BetterAuthRequest extends Request {
  auth?: AuthContext & {
    sub: string;
    email?: string;
    name?: string;
  };
}

router.get('/me', (req: Request, res: Response) => {
  const betterReq = req as BetterAuthRequest;
  if (!betterReq.auth?.sub) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  return res.json({
    userId: betterReq.auth.sub,
    email: betterReq.auth.email,
    name: betterReq.auth.name,
  });
});

export default router;
