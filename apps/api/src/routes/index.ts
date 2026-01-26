import { Router } from 'express';
import auth from './auth';
import services from './services';
import clients from './clients';
import bookings from './bookings';
import stats from './stats';

const router = Router();

router.use('/auth', auth);
router.use('/services', services);
router.use('/clients', clients);
router.use('/bookings', bookings);
router.use('/stats', stats);

router.get('/', (_req, res) => res.json({ hello: 'bookinglite api' }));

export default router;
