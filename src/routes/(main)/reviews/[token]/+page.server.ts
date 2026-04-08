import { error, fail } from '@sveltejs/kit';
import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import prisma from '$lib/server/prisma';
import { reviewSchema } from '$lib/schemas/review';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const invite = await prisma.reviewInvite.findUnique({
		where: { token: params.token },
	});

	if (!invite) {
		error(404, 'Review invitation not found');
	}

	return {
		invite,
		form: await superValidate(zod4(reviewSchema)),
	};
};

export const actions: Actions = {
	default: async ({ request, params }) => {
		const invite = await prisma.reviewInvite.findUnique({
			where: { token: params.token },
		});

		if (!invite || invite.used) {
			return fail(400, { alreadyUsed: true });
		}

		const form = await superValidate(request, zod4(reviewSchema));

		if (!form.valid) {
			return fail(400, { form });
		}

		const testimonial = await prisma.testimonial.create({
			data: {
				clientName: form.data.clientName,
				country: form.data.country ?? null,
				rating: form.data.rating,
				quote: form.data.quote,
				published: false,
			},
		});

		await prisma.reviewInvite.update({
			where: { id: invite.id },
			data: { used: true, testimonialId: testimonial.id },
		});

		return message(form, { success: true });
	},
};
