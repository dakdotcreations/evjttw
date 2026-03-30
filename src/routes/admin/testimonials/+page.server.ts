import { fail } from 'sveltekit-superforms';
import { error } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const testimonials = await prisma.testimonial.findMany({
		orderBy: { createdAt: 'desc' },
		include: { reviewInvite: { select: { token: true } } }
	});

	return { testimonials };
};

export const actions: Actions = {
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
		const data = await request.formData();
		const id = data.get('id') as string;
		if (!id) error(400, 'Missing id');

		await prisma.testimonial.delete({ where: { id } });
		return { success: true };
	}
};
