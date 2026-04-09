import { z } from 'zod';

export const itinerarySchema = z.object({
	title: z.string().min(3, 'Title must be at least 3 characters'),
	summary: z.string().min(10, 'Summary must be at least 10 characters'),
	description: z.string().min(20, 'Description must be at least 20 characters'),
	fixedPrice: z.coerce.number().positive().optional(),
	pricePerPerson: z.coerce.number().positive().optional(),
	currency: z.string().default('USD'),
	durationDays: z.coerce.number().int().min(1, 'Must be at least 1 day'),
	bestSeasons: z.string().default(''),
	coverImage: z.string().optional().default(''),
	images: z.string().default(''),
	published: z.boolean().default(false),
	pricingDisabled: z.boolean().default(false)
});
