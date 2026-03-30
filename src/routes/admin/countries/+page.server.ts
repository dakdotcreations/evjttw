import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const countries = await prisma.country.findMany({
		include: { _count: { select: { locations: true } } },
		orderBy: { name: 'asc' }
	});

	return { countries };
};
