import { superValidate, message, fail } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { error } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import { uploadImageFile } from '$lib/server/azure';
import { locationSchema } from '$lib/schemas/location';
import type { Actions, PageServerLoad } from './$types';

const deleteLocationSchema = z.object({ id: z.string() });

export const load: PageServerLoad = async () => {
	const [locations, countries, createForm, deleteForm] = await Promise.all([
		prisma.location.findMany({
			include: { country: { select: { id: true, name: true } } },
			orderBy: { name: 'asc' }
		}),
		prisma.country.findMany({ select: { id: true, name: true }, orderBy: { name: 'asc' } }),
		superValidate(zod4(locationSchema), { id: 'create-location' }),
		superValidate(zod4(deleteLocationSchema), { id: 'delete-location' })
	]);

	return { locations, countries, createForm, deleteForm };
};

export const actions: Actions = {
	createLocation: async ({ request }) => {
		const formData = await request.formData();
		const imageFile = formData.get('imageUrl_file');
		if (imageFile instanceof File && imageFile.size > 0) {
			const url = await uploadImageFile(imageFile);
			formData.set('imageUrl', url);
		}
		const form = await superValidate(formData, zod4(locationSchema), { id: 'create-location' });
		if (!form.valid) return fail(400, { createForm: form });

		await prisma.location.create({
			data: {
				name: form.data.name,
				description: form.data.description || null,
				countryId: form.data.countryId,
				imageUrl: form.data.imageUrl || null
			}
		});

		return message(form, { success: 'Location created.' });
	},

	updateLocation: async ({ request }) => {
		const updateSchema = locationSchema.extend({ id: z.string() });
		const formData = await request.formData();
		const imageFile = formData.get('imageUrl_file');
		if (imageFile instanceof File && imageFile.size > 0) {
			const url = await uploadImageFile(imageFile);
			formData.set('imageUrl', url);
		}
		const form = await superValidate(formData, zod4(updateSchema), { id: 'update-location' });
		if (!form.valid) return fail(400, { updateForm: form });

		await prisma.location.update({
			where: { id: form.data.id },
			data: {
				name: form.data.name,
				description: form.data.description || null,
				countryId: form.data.countryId,
				imageUrl: form.data.imageUrl || null
			}
		});

		return message(form, { success: 'Location updated.' });
	},

	deleteLocation: async ({ request }) => {
		const form = await superValidate(request, zod4(deleteLocationSchema), {
			id: 'delete-location'
		});
		if (!form.valid) return fail(400, { deleteForm: form });

		const stepCount = await prisma.itineraryStep.count({ where: { locationId: form.data.id } });
		if (stepCount > 0) {
			error(400, 'This location is used in itinerary steps. Remove those steps first.');
		}

		await prisma.location.delete({ where: { id: form.data.id } });
		return message(form, { success: 'Location deleted.' });
	}
};
