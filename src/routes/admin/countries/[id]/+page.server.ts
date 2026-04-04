import { superValidate, message, fail } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { error, redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import { countrySchema } from '$lib/schemas/country';
import type { Actions, PageServerLoad } from './$types';

const deleteCountrySchema = z.object({ id: z.string() });

export const load: PageServerLoad = async ({ params }) => {
	const country = await prisma.country.findUnique({
		where: { id: params.id },
		include: { locations: { orderBy: { name: 'asc' } } }
	});

	if (!country) error(404, 'Country not found');

	const form = await superValidate(
		{
			...country,
			flagEmoji: country.flagEmoji ?? undefined,
			description: country.description ?? undefined,
			mediaUrl: country.mediaUrl ?? undefined,
			mediaType: country.mediaType ?? undefined
		},
		zod4(countrySchema)
	);
	const deleteForm = await superValidate(zod4(deleteCountrySchema), { id: 'delete-country' });

	return { country, form, deleteForm };
};

export const actions: Actions = {
	updateCountry: async ({ request, params }) => {
		const form = await superValidate(request, zod4(countrySchema));
		if (!form.valid) return fail(400, { form });

		await prisma.country.update({
			where: { id: params.id },
			data: {
				name: form.data.name,
				code: form.data.code,
				flagEmoji: form.data.flagEmoji || null,
				description: form.data.description || null,
				mediaUrl: form.data.mediaUrl || null,
				mediaType: form.data.mediaType ?? null
			}
		});

		return message(form, { success: 'Country updated.' });
	},

	deleteCountry: async ({ request, params }) => {
		const form = await superValidate(request, zod4(deleteCountrySchema), { id: 'delete-country' });
		if (!form.valid) return fail(400, { deleteForm: form });

		const locationCount = await prisma.location.count({ where: { countryId: params.id } });
		if (locationCount > 0) {
			error(400, 'Remove all locations in this country before deleting it.');
		}

		await prisma.country.delete({ where: { id: params.id } });
		redirect(303, '/admin/countries');
	}
};
