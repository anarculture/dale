// src/routes/auth.ts

import { Router } from 'express';

const router = Router();

router.get('/me', (req, res) => {
  const sub = req.auth?.claims?.sub;
  const email = req.auth?.claims?.email;
  const name = req.auth?.claims?.name;

  if (!sub) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  return res.json({
    userId: sub,
    email,
    name,
  });
});

export default router;
