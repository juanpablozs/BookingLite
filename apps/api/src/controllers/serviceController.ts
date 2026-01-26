import { Request, Response } from 'express';
import * as serviceService from '../services/serviceService';

export async function create(req: Request, res: Response) {
  const ownerId = (req as any).userId;
  const data = req.body;
  const service = await serviceService.createService(ownerId, data);
  res.json(service);
}

export async function update(req: Request, res: Response) {
  const ownerId = (req as any).userId;
  const id = Number(req.params.id);
  await serviceService.updateService(ownerId, id, req.body);
  res.json({ message: 'updated' });
}

export async function remove(req: Request, res: Response) {
  const ownerId = (req as any).userId;
  const id = Number(req.params.id);
  await serviceService.deleteService(ownerId, id);
  res.json({ message: 'deleted' });
}

export async function getOne(req: Request, res: Response) {
  const ownerId = (req as any).userId;
  const id = Number(req.params.id);
  const s = await serviceService.getService(ownerId, id);
  if (!s) return res.status(404).json({ message: 'Not found' });
  res.json(s);
}

export async function list(req: Request, res: Response) {
  const ownerId = (req as any).userId;
  const page = Number(req.query.page || 1);
  const limit = Number(req.query.limit || 20);
  const isActive = req.query.isActive === undefined ? undefined : req.query.isActive === 'true';
  const result = await serviceService.listServices(ownerId, page, limit, isActive);
  res.json({ ...result, page, limit });
}
