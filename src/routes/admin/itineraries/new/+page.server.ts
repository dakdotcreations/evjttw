import { superValidate, fail } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import { itinerarySchema } from '$lib/schemas/itinerary';
import { uploadImageFile } from '$lib/server/azure';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod4(itinerarySchema));
	return { form };
};

export const actions: Actions = {
	createItinerary: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod4(itinerarySchema));
		if (!form.valid) return fail(400, { form });

		const bestSeasons = form.data.bestSeasons
			? form.data.bestSeasons.split(',').map((s) => s.trim()).filter(Boolean)
			: [];
		const images = form.data.images
			? form.data.images.split('\n').map((s) => s.trim()).filter(Boolean)
			: [];

		// Upload cover image to Azure if a new file was submitted
		const coverImageFile = formData.get('coverImage_file');
		let coverImageUrl = form.data.coverImage || null;
		if (coverImageFile instanceof File && coverImageFile.size > 0) {
			coverImageUrl = await uploadImageFile(coverImageFile);
		}

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
				coverImage: coverImageUrl,
				images,
				published: form.data.published,
				pricingDisabled: form.data.pricingDisabled
			}
		});

		redirect(303, `/admin/itineraries/${itinerary.id}`);
	}
};
