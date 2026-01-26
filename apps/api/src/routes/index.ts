import { Router } from 'express';
import auth from './auth';

const router = Router();

router.use('/auth', auth);

router.get('/', (_req, res) => res.json({ hello: 'bookinglite api' }));

export default router;
