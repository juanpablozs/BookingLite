import { Router } from 'express';

const router = Router();

router.post('/register', (_req, res) => {
  res.json({ message: 'register endpoint (to implement)' });
});

router.post('/login', (_req, res) => {
  res.json({ message: 'login endpoint (to implement)' });
});

router.post('/refresh', (_req, res) => {
  res.json({ message: 'refresh endpoint (to implement)' });
});

router.post('/logout', (_req, res) => {
  res.json({ message: 'logout endpoint (to implement)' });
});

export default router;
