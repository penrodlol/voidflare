import { z } from 'zod';

export const pageSchema = z.coerce.number().positive().int();

export const searchSchema = z
  .string()
  .trim()
  .min(1)
  .transform((v) => v.substring(0, 100));
