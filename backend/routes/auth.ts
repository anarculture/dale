import { Router } from 'express';

const router = Router();

router.get('/me', (req, res) => {
  if (!req.auth?.user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  res.json({ user: req.auth.user });
});

export default router;
