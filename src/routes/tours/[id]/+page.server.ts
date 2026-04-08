import { error } from '@sveltejs/kit';
import { superValidate, message, fail } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import prisma from '$lib/server/prisma';
import { bookingEnquirySchema } from '$lib/schemas/bookingEnquiry';
import { sendBookingEnquiryEmail } from '$lib/server/mail';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const [itinerary, enquiryForm] = await Promise.all([
		prisma.itinerary.findFirst({
			where: { id: params.id, published: true },
			include: {
				steps: {
					orderBy: { stepNumber: 'asc' },
					include: {
						location: { include: { country: true } },
					},
				},
			},
		}),
		superValidate(zod4(bookingEnquirySchema)),
	]);

	if (!itinerary) throw error(404, 'Tour not found');

	const countries = [
		...new Set(
			itinerary.steps
				.filter((s) => s.location?.country)
				.map((s) => s.location!.country!.name)
		),
	];

	return {
		itinerary: {
			...itinerary,
			fixedPrice: itinerary.fixedPrice ? Number(itinerary.fixedPrice) : null,
			pricePerPerson: itinerary.pricePerPerson ? Number(itinerary.pricePerPerson) : null,
		},
		countries,
		enquiryForm,
	};
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const form = await superValidate(request, zod4(bookingEnquirySchema));
		if (!form.valid) return fail(400, { enquiryForm: form });

		const itinerary = await prisma.itinerary.findFirst({
			where: { id: params.id, published: true },
			select: { id: true, title: true },
		});
		if (!itinerary) throw error(404, 'Tour not found');

		const enquiry = await prisma.bookingEnquiry.create({
			data: {
				itineraryId: params.id,
				name: form.data.name,
				email: form.data.email,
				phone: form.data.phone || null,
				message: form.data.message || null,
				travelDate: form.data.travelDate ? new Date(form.data.travelDate) : null,
				groupSize: form.data.groupSize ?? null,
			},
		});

		try {
			await sendBookingEnquiryEmail({
				itineraryId: enquiry.itineraryId,
				fullName: enquiry.name,
				email: enquiry.email,
				phone: enquiry.phone,
				message: enquiry.message,
				travelDate: enquiry.travelDate,
				groupSize: enquiry.groupSize,
				itinerary: { title: itinerary.title },
			});
		} catch {
			// Email failure should not block the success response
		}

		return message(form, {
			success: "Your enquiry has been sent! We'll be in touch within 24 hours.",
		});
	},
};
