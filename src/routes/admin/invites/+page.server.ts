import { error } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const invites = await prisma.reviewInvite.findMany({
		orderBy: { createdAt: 'desc' },
		include: { testimonial: { select: { id: true, clientName: true, published: true } } }
	});

	return { invites };
};

export const actions: Actions = {
	createInvite: async ({ request }) => {
		const data = await request.formData();
		const note = (data.get('note') as string) || null;

		const invite = await prisma.reviewInvite.create({ data: { note } });
		return { created: invite };
	},

	deleteInvite: async ({ request }) => {
		const data = await request.formData();
		const id = data.get('id') as string;
		if (!id) error(400, 'Missing id');

		const invite = await prisma.reviewInvite.findUnique({ where: { id } });
		if (!invite) error(404, 'Invite not found');
		if (invite.used) error(400, 'Cannot delete a used invite');

		await prisma.reviewInvite.delete({ where: { id } });
		return { success: true };
	}
};
