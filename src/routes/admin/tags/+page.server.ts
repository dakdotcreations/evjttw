import { superValidate, message, fail } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import prisma from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';

const tagSchema = z.object({
	name: z.string().min(1, 'Name is required'),
	slug: z
		.string()
		.min(1, 'Slug is required')
		.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug must be lowercase letters, numbers, and hyphens')
});

const idSchema = z.object({ id: z.string() });

export const load: PageServerLoad = async () => {
	const [tags, createForm, deleteForm] = await Promise.all([
		prisma.tag.findMany({
			orderBy: { name: 'asc' },
			include: { _count: { select: { itineraries: true } } }
		}),
		superValidate(zod4(tagSchema), { id: 'create-tag' }),
		superValidate(zod4(idSchema), { id: 'delete-tag' })
	]);

	return { tags, createForm, deleteForm };
};

export const actions: Actions = {
	create: async ({ request }) => {
		const form = await superValidate(request, zod4(tagSchema), { id: 'create-tag' });
		if (!form.valid) return fail(400, { createForm: form });

		await prisma.tag.create({
			data: { name: form.data.name, slug: form.data.slug }
		});

		return message(form, { success: 'Tag created.' });
	},

	update: async ({ request }) => {
		const updateSchema = tagSchema.extend({ id: z.string() });
		const form = await superValidate(request, zod4(updateSchema), { id: 'update-tag' });
		if (!form.valid) return fail(400, { updateForm: form });

		await prisma.tag.update({
			where: { id: form.data.id },
			data: { name: form.data.name, slug: form.data.slug }
		});

		return message(form, { success: 'Tag updated.' });
	},

	delete: async ({ request }) => {
		const form = await superValidate(request, zod4(idSchema), { id: 'delete-tag' });
		if (!form.valid) return fail(400, { deleteForm: form });

		await prisma.tag.delete({ where: { id: form.data.id } });

		return message(form, { success: 'Tag deleted.' });
	}
};
