import { superValidate, fail } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';

export const locationSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	description: z.string().optional(),
	countryId: z.string().min(1, 'Please select a country'),
	mediaUrl: z.string().optional(),
	mediaType: z.enum(['image', 'video_blob', 'video_embed']).optional()
});

export const load: PageServerLoad = async () => {
	const [countries, form] = await Promise.all([
		prisma.country.findMany({ select: { id: true, name: true }, orderBy: { name: 'asc' } }),
		superValidate(zod4(locationSchema))
	]);

	return { countries, form };
};

export const actions: Actions = {
	createLocation: async ({ request }) => {
		const form = await superValidate(request, zod4(locationSchema));
		if (!form.valid) return fail(400, { form });

		await prisma.location.create({
			data: {
				name: form.data.name,
				description: form.data.description || null,
				countryId: form.data.countryId,
				mediaUrl: form.data.mediaUrl || null,
				mediaType: form.data.mediaType ?? null
			}
		});

		redirect(303, '/admin/locations');
	}
};
