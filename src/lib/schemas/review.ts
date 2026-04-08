import { z } from 'zod';

export const reviewSchema = z.object({
	clientName: z.string().min(2, 'Name must be at least 2 characters'),
	country: z.string().optional(),
	rating: z.coerce.number().int().min(1).max(5),
	quote: z.string().min(10, 'Please write at least 10 characters'),
});
