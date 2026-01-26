import { z } from 'zod';

export const createServiceSchema = z.object({
  name: z.string().min(1),
  description: z.string().optional(),
  durationMinutes: z.number().int().positive(),
  price: z.number().optional(),
  isActive: z.boolean().optional(),
});

export const updateServiceSchema = createServiceSchema.partial();

export const listServiceSchema = z.object({
  page: z.string().optional(),
  limit: z.string().optional(),
  isActive: z.string().optional(),
});
