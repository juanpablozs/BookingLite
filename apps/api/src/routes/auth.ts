import { Router } from 'express';
import * as controller from '../controllers/authController';
import { registerSchema, loginSchema, refreshSchema } from '../schemas/auth';
import { ZodError } from 'zod';

const router = Router();

function validate(schema: any) {
  return (req: any, _res: any, next: any) => {
    try {
      req.body = schema.parse(req.body);
      next();
    } catch (err) {
      if (err instanceof ZodError) return _res.status(400).json({ errors: err.errors });
      next(err);
    }
  };
}

router.post('/register', validate(registerSchema), controller.register);
router.post('/login', validate(loginSchema), controller.login);
router.post('/refresh', validate(refreshSchema), controller.refresh);
router.post('/logout', controller.logout);

export default router;
