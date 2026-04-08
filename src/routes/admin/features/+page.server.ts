import { superValidate, message, fail } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { error, redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';

const reorderSchema = z.object({ order: z.string().min(1) });

export const load: PageServerLoad = async () => {
	const features = await prisma.feature.findMany({
		orderBy: { sortOrder: 'asc' },
		include: {
			country: { select: { id: true, name: true } },
			location: { select: { id: true, name: true } },
			_count: { select: { items: true } }
		}
	});

	const reorderForm = await superValidate(zod4(reorderSchema), { id: 'reorder' });

	return { features, reorderForm };
};

export const actions: Actions = {
	updateFeatureOrder: async ({ request }) => {
		const form = await superValidate(request, zod4(reorderSchema), { id: 'reorder' });
		if (!form.valid) return fail(400, { reorderForm: form });

		const ids = form.data.order.split(',').filter(Boolean);

		await prisma.$transaction(
			ids.map((id, index) =>
				prisma.feature.update({ where: { id }, data: { sortOrder: index } })
			)
		);

		return message(form, { success: 'Order saved.' });
	},

	toggleActive: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		const isActive = data.get('isActive') === 'true';
		if (!id) error(400, 'Missing id');

		await prisma.feature.update({ where: { id }, data: { isActive: !isActive } });
		return { success: true };
	},

	deleteFeature: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		if (!id) error(400, 'Missing id');

		await prisma.feature.delete({ where: { id } });
		redirect(303, '/admin/features');
	}
};
