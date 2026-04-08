import { superValidate, fail } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { error, redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';

const createFeatureSchema = z.object({
	displayName: z.string().optional(),
	subjectType: z.enum(['country', 'location']),
	countryId: z.string().optional(),
	locationId: z.string().optional()
});

export const load: PageServerLoad = async () => {
	const [countries, locations] = await Promise.all([
		prisma.country.findMany({ orderBy: { name: 'asc' } }),
		prisma.location.findMany({
			orderBy: { name: 'asc' },
			include: { country: { select: { name: true } } }
		})
	]);

	const form = await superValidate(zod4(createFeatureSchema));
	return { form, countries, locations };
};

export const actions: Actions = {
	createFeature: async ({ request }) => {
		const form = await superValidate(request, zod4(createFeatureSchema));
		if (!form.valid) return fail(400, { form });

		const { subjectType, countryId, locationId, displayName } = form.data;

		if (subjectType === 'country' && !countryId) {
			return fail(400, { form: { ...form, errors: { countryId: ['Select a country'] } } });
		}
		if (subjectType === 'location' && !locationId) {
			return fail(400, { form: { ...form, errors: { locationId: ['Select a location'] } } });
		}

		const activeCount = await prisma.feature.count({ where: { isActive: true } });
		if (activeCount >= 6) {
			return fail(400, { form: { ...form, errors: { subjectType: ['Maximum 6 active features allowed'] } } });
		}

		const maxSort = await prisma.feature.aggregate({ _max: { sortOrder: true } });
		const sortOrder = (maxSort._max.sortOrder ?? -1) + 1;

		const feature = await prisma.feature.create({
			data: {
				displayName: displayName || null,
				countryId: subjectType === 'country' ? (countryId ?? null) : null,
				locationId: subjectType === 'location' ? (locationId ?? null) : null,
				sortOrder
			}
		});

		redirect(303, `/admin/features/${feature.id}`);
	}
};
