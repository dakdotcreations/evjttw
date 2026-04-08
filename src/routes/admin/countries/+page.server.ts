import { superValidate, message, fail } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { error } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import { uploadImageFile } from '$lib/server/azure';
import { countrySchema } from '$lib/schemas/country';
import type { Actions, PageServerLoad } from './$types';

const deleteCountrySchema = z.object({ id: z.string() });

export const load: PageServerLoad = async () => {
	const [countries, createForm, deleteForm] = await Promise.all([
		prisma.country.findMany({
			include: { _count: { select: { locations: true } } },
			orderBy: { name: 'asc' }
		}),
		superValidate(zod4(countrySchema), { id: 'create-country' }),
		superValidate(zod4(deleteCountrySchema), { id: 'delete-country' })
	]);

	return { countries, createForm, deleteForm };
};

export const actions: Actions = {
	createCountry: async ({ request }) => {
		const formData = await request.formData();
		const imageFile = formData.get('imageUrl_file');
		if (imageFile instanceof File && imageFile.size > 0) {
			const url = await uploadImageFile(imageFile);
			formData.set('imageUrl', url);
		}
		const form = await superValidate(formData, zod4(countrySchema), { id: 'create-country' });
		if (!form.valid) return fail(400, { createForm: form });

		await prisma.country.create({
			data: {
				name: form.data.name,
				code: form.data.code,
				flagEmoji: form.data.flagEmoji || null,
				description: form.data.description || null,
				imageUrl: form.data.imageUrl || null
			}
		});

		return message(form, { success: 'Country created.' });
	},

	updateCountry: async ({ request }) => {
		const updateSchema = countrySchema.extend({ id: z.string() });
		const formData = await request.formData();
		const imageFile = formData.get('imageUrl_file');
		if (imageFile instanceof File && imageFile.size > 0) {
			const url = await uploadImageFile(imageFile);
			formData.set('imageUrl', url);
		}
		const form = await superValidate(formData, zod4(updateSchema), { id: 'update-country' });
		if (!form.valid) return fail(400, { updateForm: form });

		await prisma.country.update({
			where: { id: form.data.id },
			data: {
				name: form.data.name,
				code: form.data.code,
				flagEmoji: form.data.flagEmoji || null,
				description: form.data.description || null,
				imageUrl: form.data.imageUrl || null
			}
		});

		return message(form, { success: 'Country updated.' });
	},

	deleteCountry: async ({ request }) => {
		const form = await superValidate(request, zod4(deleteCountrySchema), { id: 'delete-country' });
		if (!form.valid) return fail(400, { deleteForm: form });

		const locationCount = await prisma.location.count({ where: { countryId: form.data.id } });
		if (locationCount > 0) {
			error(400, 'Remove all locations in this country before deleting it.');
		}

		await prisma.country.delete({ where: { id: form.data.id } });
		return message(form, { success: 'Country deleted.' });
	}
};
