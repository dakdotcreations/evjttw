import { superValidate, message, fail } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { error } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';

const testimonialSchema = z.object({
	clientName: z.string().min(2, 'Name must be at least 2 characters'),
	country: z.string().optional(),
	rating: z.number().int().min(1).max(5).default(5),
	quote: z.string().min(10, 'Quote must be at least 10 characters'),
	published: z.boolean().default(false)
});

const idSchema = z.object({ id: z.string() });

export const load: PageServerLoad = async () => {
	const [testimonials, createForm, deleteForm] = await Promise.all([
		prisma.testimonial.findMany({
			orderBy: { createdAt: 'desc' }
		}),
		superValidate(zod4(testimonialSchema), { id: 'create-testimonial' }),
		superValidate(zod4(idSchema), { id: 'delete-testimonial' })
	]);

	return { testimonials, createForm, deleteForm };
};

export const actions: Actions = {
	create: async ({ request }) => {
		const form = await superValidate(request, zod4(testimonialSchema), {
			id: 'create-testimonial'
		});
		if (!form.valid) return fail(400, { createForm: form });

		await prisma.testimonial.create({
			data: {
				clientName: form.data.clientName,
				country: form.data.country || null,
				rating: form.data.rating,
				quote: form.data.quote,
				published: form.data.published
			}
		});

		return message(form, { success: 'Testimonial created.' });
	},

	update: async ({ request }) => {
		const updateSchema = testimonialSchema.extend({ id: z.string() });
		const form = await superValidate(request, zod4(updateSchema), { id: 'update-testimonial' });
		if (!form.valid) return fail(400, { updateForm: form });

		await prisma.testimonial.update({
			where: { id: form.data.id },
			data: {
				clientName: form.data.clientName,
				country: form.data.country || null,
				rating: form.data.rating,
				quote: form.data.quote,
				published: form.data.published
			}
		});

		return message(form, { success: 'Testimonial updated.' });
	},

	approve: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		if (!id) error(400, 'Missing id');
		await prisma.testimonial.update({ where: { id }, data: { published: true } });
		return { success: true };
	},

	unpublish: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		if (!id) error(400, 'Missing id');
		await prisma.testimonial.update({ where: { id }, data: { published: false } });
		return { success: true };
	},

	delete: async ({ request }) => {
		const form = await superValidate(request, zod4(idSchema), { id: 'delete-testimonial' });
		if (!form.valid) return fail(400, { deleteForm: form });
		await prisma.testimonial.delete({ where: { id: form.data.id } });
		return message(form, { success: 'Testimonial deleted.' });
	}
};
