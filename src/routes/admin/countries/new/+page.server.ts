import { superValidate, fail } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import { countrySchema } from '$lib/schemas/country';
import type { Actions, PageServerLoad } from './$types';

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
