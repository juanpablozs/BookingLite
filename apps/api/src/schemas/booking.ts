import { z } from 'zod';

export const createBookingSchema = z.object({
  serviceId: z.number().int(),
  clientId: z.number().int(),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  startTime: z.string().regex(/^\d{2}:\d{2}$/),
  notes: z.string().optional(),
});

export const updateBookingSchema = z.object({
  status: z.enum(['scheduled', 'completed', 'cancelled']).optional(),
  notes: z.string().optional(),
});
