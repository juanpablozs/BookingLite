import { Router } from 'express';
import * as controller from '../controllers/serviceController';
import { authenticate } from '../middleware/authMiddleware';
import { createServiceSchema, updateServiceSchema } from '../schemas/service';
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

router.use(authenticate);
router.post('/', validate(createServiceSchema), controller.create);
router.get('/', controller.list);
router.get('/:id', controller.getOne);
router.patch('/:id', validate(updateServiceSchema), controller.update);
router.delete('/:id', controller.remove);

export default router;
