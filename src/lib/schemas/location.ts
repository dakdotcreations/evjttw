import { z } from 'zod';

export const locationSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	description: z.string().optional(),
	countryId: z.string().min(1, 'Please select a country'),
	mediaUrl: z.string().optional(),
	mediaType: z.enum(['image', 'video_blob', 'video_embed']).optional()
});
