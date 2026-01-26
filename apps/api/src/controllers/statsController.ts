import { Request, Response } from 'express';
import * as statsService from '../services/statsService';

export async function dashboard(req: Request, res: Response) {
  const ownerId = (req as any).userId;
  const stats = await statsService.dashboardStats(ownerId);
  res.json(stats);
}
