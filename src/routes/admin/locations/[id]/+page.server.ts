import { superValidate, message, fail } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { error, redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import { uploadImageFile } from '$lib/server/azure';
import { locationSchema } from '$lib/schemas/location';
import type { Actions, PageServerLoad } from './$types';

const deleteLocationSchema = z.object({ id: z.string() });

export const load: PageServerLoad = async ({ params }) => {
	const [location, countries] = await Promise.all([
		prisma.location.findUnique({
			where: { id: params.id },
			include: {
				country: { select: { id: true, name: true } },
				steps: {
					include: { itinerary: { select: { id: true, title: true } } },
					orderBy: { stepNumber: 'asc' }
				}
			}
		}),
		prisma.country.findMany({ select: { id: true, name: true }, orderBy: { name: 'asc' } })
	]);

	if (!location) error(404, 'Location not found');

	const form = await superValidate(
		{
			...location,
			description: location.description ?? undefined,
			imageUrl: location.imageUrl ?? undefined
		},
		zod4(locationSchema)
	);
	const deleteForm = await superValidate(zod4(deleteLocationSchema), { id: 'delete-location' });

	return { location, countries, form, deleteForm };
};

export const actions: Actions = {
	updateLocation: async ({ request, params }) => {
		const formData = await request.formData();
		const imageFile = formData.get('imageUrl_file');
		if (imageFile instanceof File && imageFile.size > 0) {
			const url = await uploadImageFile(imageFile);
			formData.set('imageUrl', url);
		}
		const form = await superValidate(formData, zod4(locationSchema));
		if (!form.valid) return fail(400, { form });

		await prisma.location.update({
			where: { id: params.id },
			data: {
				name: form.data.name,
				description: form.data.description || null,
				countryId: form.data.countryId,
				imageUrl: form.data.imageUrl || null
			}
		});

		return message(form, { success: 'Location updated.' });
	},

	deleteLocation: async ({ request, params }) => {
		const form = await superValidate(request, zod4(deleteLocationSchema), {
			id: 'delete-location'
		});
		if (!form.valid) return fail(400, { deleteForm: form });

		const stepCount = await prisma.itineraryStep.count({ where: { locationId: params.id } });
		if (stepCount > 0) {
			error(400, 'This location is used in itinerary steps. Remove those steps first.');
		}

		await prisma.location.delete({ where: { id: params.id } });
		redirect(303, '/admin/locations');
	}
};
