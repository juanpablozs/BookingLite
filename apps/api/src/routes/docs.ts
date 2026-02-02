import { Router } from 'express';
import swaggerUi from 'swagger-ui-express';
import fs from 'fs';
import path from 'path';

const router = Router();
const specPath = path.join(__dirname, '..', 'docs', 'openapi.json');
const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));

router.use('/', swaggerUi.serve, swaggerUi.setup(spec));

export default router;
