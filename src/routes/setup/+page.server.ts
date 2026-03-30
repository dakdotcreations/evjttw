import { superValidate, message, fail } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';

const schema = z.object({
	name: z.string().min(1),
	email: z.string().email()
});

export const load: PageServerLoad = async () => {
	const count = await prisma.user.count();
	if (count > 0) {
		redirect(303, '/login');
	}

	return { form: await superValidate(zod4(schema)) };
};

export const actions: Actions = {
	default: async ({ request }) => {
		const count = await prisma.user.count();
		if (count > 0) {
			redirect(303, '/login');
		}

		const form = await superValidate(request, zod4(schema));
		if (!form.valid) {
			return fail(400, { form });
		}

		await prisma.user.create({
			data: {
				name: form.data.name,
				email: form.data.email
			}
		});

		redirect(303, '/login');
	}
};
