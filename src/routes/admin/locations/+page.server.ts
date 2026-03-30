import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [locations, countries] = await Promise.all([
		prisma.location.findMany({
			include: { country: { select: { id: true, name: true } } },
			orderBy: { name: 'asc' }
		}),
		prisma.country.findMany({ select: { id: true, name: true }, orderBy: { name: 'asc' } })
	]);

	return { locations, countries };
};
