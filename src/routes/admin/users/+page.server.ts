import { superValidate, message, fail } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { error } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';

const createUserSchema = z.object({
	name: z.string().min(2, 'Name must be at least 2 characters'),
	email: z.string().email('Invalid email address')
});

const deleteUserSchema = z.object({
	id: z.string()
});

export const load: PageServerLoad = async () => {
	const [users, createForm, deleteForm] = await Promise.all([
		prisma.user.findMany({ orderBy: { createdAt: 'asc' } }),
		superValidate(zod4(createUserSchema), { id: 'create-user' }),
		superValidate(zod4(deleteUserSchema), { id: 'delete-user' })
	]);

	return { users, createForm, deleteForm };
};

export const actions: Actions = {
	createUser: async ({ request }) => {
		const form = await superValidate(request, zod4(createUserSchema), { id: 'create-user' });
		if (!form.valid) return fail(400, { createForm: form });

		const existing = await prisma.user.findUnique({ where: { email: form.data.email } });
		if (existing) {
			return message(form, { error: 'Email is already taken.' }, { status: 400 });
		}

		await prisma.user.create({ data: { name: form.data.name, email: form.data.email } });
		return message(form, { success: 'User created.' });
	},

	deleteUser: async ({ request, locals }) => {
		const form = await superValidate(request, zod4(deleteUserSchema), { id: 'delete-user' });
		if (!form.valid) return fail(400, { deleteForm: form });

		if (form.data.id === locals.user?.id) {
			error(400, 'You cannot delete your own account.');
		}

		await prisma.user.delete({ where: { id: form.data.id } });
		return message(form, { success: 'User deleted.' });
	}
};
