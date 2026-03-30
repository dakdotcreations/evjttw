import { superValidate, fail } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';

export const countrySchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	code: z.string().length(2, 'Code must be exactly 2 letters').toUpperCase(),
	flagEmoji: z.string().optional(),
	description: z.string().optional(),
	mediaUrl: z.string().optional(),
	mediaType: z.enum(['image', 'video_blob', 'video_embed']).optional()
});

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod4(countrySchema));
	return { form };
};

export const actions: Actions = {
	createCountry: async ({ request }) => {
		const form = await superValidate(request, zod4(countrySchema));
		if (!form.valid) return fail(400, { form });

		await prisma.country.create({
			data: {
				name: form.data.name,
				code: form.data.code,
				flagEmoji: form.data.flagEmoji || null,
				description: form.data.description || null,
				mediaUrl: form.data.mediaUrl || null,
				mediaType: form.data.mediaType ?? null
			}
		});

		redirect(303, '/admin/countries');
	}
};
