import { Request, Response } from 'express';
import * as bookingService from '../services/bookingService';

export async function create(req: Request, res: Response) {
  const ownerId = (req as any).userId;
  const data = req.body;
  const booking = await bookingService.createBooking(ownerId, data);
  res.json(booking);
}

export async function update(req: Request, res: Response) {
  const ownerId = (req as any).userId;
  const id = Number(req.params.id);
  const updated = await bookingService.updateBooking(ownerId, id, req.body);
  if (!updated) return res.status(404).json({ message: 'Not found' });
  res.json(updated);
}

export async function remove(req: Request, res: Response) {
  const ownerId = (req as any).userId;
  const id = Number(req.params.id);
  await bookingService.deleteBooking(ownerId, id);
  res.json({ message: 'deleted' });
}

export async function getOne(req: Request, res: Response) {
  const ownerId = (req as any).userId;
  const id = Number(req.params.id);
  const b = await bookingService.getBooking(ownerId, id);
  if (!b) return res.status(404).json({ message: 'Not found' });
  res.json(b);
}

export async function list(req: Request, res: Response) {
  const ownerId = (req as any).userId;
  const filters: any = {};
  if (req.query.status) filters.status = req.query.status;
  if (req.query.date) filters.date = req.query.date;
  const result = await bookingService.listBookings(ownerId, filters);
  res.json(result);
}
