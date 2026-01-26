import { Request, Response } from 'express';
import * as clientService from '../services/clientService';

export async function create(req: Request, res: Response) {
  const ownerId = (req as any).userId;
  const client = await clientService.createClient(ownerId, req.body);
  res.json(client);
}

export async function update(req: Request, res: Response) {
  const ownerId = (req as any).userId;
  const id = Number(req.params.id);
  await clientService.updateClient(ownerId, id, req.body);
  res.json({ message: 'updated' });
}

export async function remove(req: Request, res: Response) {
  const ownerId = (req as any).userId;
  const id = Number(req.params.id);
  await clientService.deleteClient(ownerId, id);
  res.json({ message: 'deleted' });
}

export async function getOne(req: Request, res: Response) {
  const ownerId = (req as any).userId;
  const id = Number(req.params.id);
  const c = await clientService.getClient(ownerId, id);
  if (!c) return res.status(404).json({ message: 'Not found' });
  res.json(c);
}

export async function list(req: Request, res: Response) {
  const ownerId = (req as any).userId;
  const q = (req.query.q as string) || undefined;
  const result = await clientService.listClients(ownerId, q);
  res.json(result);
}
