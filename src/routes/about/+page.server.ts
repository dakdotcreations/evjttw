import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const testimonials = await prisma.testimonial.findMany({
		where: { published: true },
		orderBy: { createdAt: 'desc' },
	});

	return { testimonials };
};
