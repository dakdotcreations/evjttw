import { superValidate, message, fail } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import prisma from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';

const campaignSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	code: z
		.string()
		.min(1, 'Code is required')
		.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Code must be lowercase letters, numbers, and hyphens')
});

const idSchema = z.object({ id: z.string() });

export const load: PageServerLoad = async () => {
	const [campaigns, createForm, deleteForm] = await Promise.all([
		prisma.campaign.findMany({
			orderBy: { code: 'asc' },
			include: { _count: { select: { itineraries: true } } }
		}),
		superValidate(zod4(campaignSchema), { id: 'create-campaign' }),
		superValidate(zod4(idSchema), { id: 'delete-campaign' })
	]);

	return { campaigns, createForm, deleteForm };
};

export const actions: Actions = {
	create: async ({ request }) => {
		const form = await superValidate(request, zod4(campaignSchema), { id: 'create-campaign' });
		if (!form.valid) return fail(400, { createForm: form });

		await prisma.campaign.create({
			data: { name: form.data.name, code: form.data.code }
		});

		return message(form, { success: 'Campaign created.' });
	},

	update: async ({ request }) => {
		const updateSchema = campaignSchema.extend({ id: z.string() });
		const form = await superValidate(request, zod4(updateSchema), { id: 'update-campaign' });
		if (!form.valid) return fail(400, { updateForm: form });

		await prisma.campaign.update({
			where: { id: form.data.id },
			data: { name: form.data.name, code: form.data.code }
		});

		return message(form, { success: 'Campaign updated.' });
	},

	delete: async ({ request }) => {
		const form = await superValidate(request, zod4(idSchema), { id: 'delete-campaign' });
		if (!form.valid) return fail(400, { deleteForm: form });

		await prisma.campaign.delete({ where: { id: form.data.id } });

		return message(form, { success: 'Campaign deleted.' });
	}
};
