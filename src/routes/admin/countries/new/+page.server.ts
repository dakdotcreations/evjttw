import { superValidate, fail } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import { uploadImageFile } from '$lib/server/azure';
import { countrySchema } from '$lib/schemas/country';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const form = await superValidate(zod4(countrySchema));
	return { form };
};

export const actions: Actions = {
	createCountry: async ({ request }) => {
		const formData = await request.formData();
		const imageFile = formData.get('imageUrl_file');
		if (imageFile instanceof File && imageFile.size > 0) {
			const url = await uploadImageFile(imageFile);
			formData.set('imageUrl', url);
		}
		const form = await superValidate(formData, zod4(countrySchema));
		if (!form.valid) return fail(400, { form });

		await prisma.country.create({
			data: {
				name: form.data.name,
				code: form.data.code,
				flagEmoji: form.data.flagEmoji || null,
				description: form.data.description || null,
				imageUrl: form.data.imageUrl || null
			}
		});

		redirect(303, '/admin/countries');
	}
};
