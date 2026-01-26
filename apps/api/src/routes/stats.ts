import { Router } from 'express';
import { authenticate } from '../middleware/authMiddleware';
import * as controller from '../controllers/statsController';

const router = Router();

router.use(authenticate);
router.get('/dashboard', controller.dashboard);

export default router;
