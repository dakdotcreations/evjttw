import { z } from 'zod';

export const bookingEnquirySchema = z.object({
	name: z.string().min(2, 'Name is required'),
	email: z.string().email('Enter a valid email address'),
	phone: z.string().optional(),
	travelDate: z.string().optional(),
	groupSize: z.coerce.number().int().min(1).optional(),
	message: z.string().optional(),
});
