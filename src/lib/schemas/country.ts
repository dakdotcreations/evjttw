import { z } from 'zod';

export const countrySchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	code: z.string().length(2, 'Code must be exactly 2 letters').toUpperCase(),
	flagEmoji: z.string().optional(),
	description: z.string().optional(),
	imageUrl: z.string().optional()
});
