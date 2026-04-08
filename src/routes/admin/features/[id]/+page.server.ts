import { superValidate, message, fail } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { error, redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';

const updateFeatureSchema = z.object({
	displayName: z.string().optional(),
	isActive: z.boolean().default(true)
});

const addItemSchema = z.object({ itineraryId: z.string().min(1) });
const removeItemSchema = z.object({ itemId: z.string().min(1) });
const reorderItemsSchema = z.object({ order: z.string().min(1) });

export const load: PageServerLoad = async ({ params }) => {
	const [feature, itineraries] = await Promise.all([
		prisma.feature.findUnique({
			where: { id: params.id },
			include: {
				country: { select: { id: true, name: true } },
				location: { select: { id: true, name: true } },
				items: {
					orderBy: { sortOrder: 'asc' },
					include: { itinerary: { select: { id: true, title: true, published: true } } }
				}
			}
		}),
		prisma.itinerary.findMany({
			where: { published: true },
			orderBy: { title: 'asc' },
			select: { id: true, title: true }
		})
	]);

	if (!feature) error(404, 'Feature not found');

	const [updateForm, addItemForm, removeItemForm, reorderItemsForm] = await Promise.all([
		superValidate({ displayName: feature.displayName ?? '', isActive: feature.isActive }, zod4(updateFeatureSchema), { id: 'update-feature' }),
		superValidate(zod4(addItemSchema), { id: 'add-item' }),
		superValidate(zod4(removeItemSchema), { id: 'remove-item' }),
		superValidate(zod4(reorderItemsSchema), { id: 'reorder-items' })
	]);

	return { feature, itineraries, updateForm, addItemForm, removeItemForm, reorderItemsForm };
};

export const actions: Actions = {
	updateFeature: async ({ request, params }) => {
		const form = await superValidate(request, zod4(updateFeatureSchema), { id: 'update-feature' });
		if (!form.valid) return fail(400, { updateForm: form });

		await prisma.feature.update({
			where: { id: params.id },
			data: {
				displayName: form.data.displayName || null,
				isActive: form.data.isActive
			}
		});

		return message(form, { success: 'Feature updated.' });
	},

	addFeatureItem: async ({ request, params }) => {
		const form = await superValidate(request, zod4(addItemSchema), { id: 'add-item' });
		if (!form.valid) return fail(400, { addItemForm: form });

		const existing = await prisma.featureItem.count({ where: { featureId: params.id } });
		if (existing >= 4) {
			return fail(400, { addItemForm: { ...form, errors: { itineraryId: ['Maximum 4 itineraries per feature'] } } });
		}

		const existingItem = await prisma.featureItem.findFirst({
			where: { featureId: params.id, itineraryId: form.data.itineraryId }
		});
		if (existingItem) {
			return fail(400, { addItemForm: { ...form, errors: { itineraryId: ['Already added'] } } });
		}

		const maxSort = await prisma.featureItem.aggregate({
			where: { featureId: params.id },
			_max: { sortOrder: true }
		});

		await prisma.featureItem.create({
			data: {
				featureId: params.id,
				itineraryId: form.data.itineraryId,
				sortOrder: (maxSort._max.sortOrder ?? -1) + 1
			}
		});

		return message(form, { success: 'Itinerary added.' });
	},

	removeFeatureItem: async ({ request }) => {
		const form = await superValidate(request, zod4(removeItemSchema), { id: 'remove-item' });
		if (!form.valid) return fail(400, { removeItemForm: form });

		await prisma.featureItem.delete({ where: { id: form.data.itemId } });
		return message(form, { success: 'Removed.' });
	},

	updateFeatureItemOrder: async ({ request, params }) => {
		const form = await superValidate(request, zod4(reorderItemsSchema), { id: 'reorder-items' });
		if (!form.valid) return fail(400, { reorderItemsForm: form });

		const ids = form.data.order.split(',').filter(Boolean);
		await prisma.$transaction(
			ids.map((id, index) =>
				prisma.featureItem.update({ where: { id }, data: { sortOrder: index } })
			)
		);

		return message(form, { success: 'Order saved.' });
	},

	deleteFeature: async ({ params }) => {
		await prisma.feature.delete({ where: { id: params.id } });
		redirect(303, '/admin/features');
	}
};
