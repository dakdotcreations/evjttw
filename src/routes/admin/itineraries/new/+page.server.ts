import { superValidate, fail } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';

export const itinerarySchema = z.object({
	title: z.string().min(3, 'Title must be at least 3 characters'),
	summary: z.string().min(10, 'Summary must be at least 10 characters'),
	description: z.string().min(20, 'Description must be at least 20 characters'),
	fixedPrice: z.coerce.number().positive().optional(),
	pricePerPerson: z.coerce.number().positive().optional(),
	currency: z.string().default('USD'),
	durationDays: z.coerce.number().int().min(1, 'Must be at least 1 day'),
	bestSeasons: z.string().default(''),
	coverImage: z.string().optional(),
	images: z.string().default(''),
	published: z.boolean().default(false)
});

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod4(itinerarySchema));
	return { form };
};

export const actions: Actions = {
	createItinerary: async ({ request }) => {
		const form = await superValidate(request, zod4(itinerarySchema));
		if (!form.valid) return fail(400, { form });

		const bestSeasons = form.data.bestSeasons
			? form.data.bestSeasons.split(',').map((s) => s.trim()).filter(Boolean)
			: [];
		const images = form.data.images
			? form.data.images.split('\n').map((s) => s.trim()).filter(Boolean)
			: [];

		const itinerary = await prisma.itinerary.create({
			data: {
				title: form.data.title,
				summary: form.data.summary,
				description: form.data.description,
				fixedPrice: form.data.fixedPrice ?? null,
				pricePerPerson: form.data.pricePerPerson ?? null,
				currency: form.data.currency,
				durationDays: form.data.durationDays,
				bestSeasons,
				coverImage: form.data.coverImage || null,
				images,
				published: form.data.published
			}
		});

		redirect(303, `/admin/itineraries/${itinerary.id}`);
	}
};
