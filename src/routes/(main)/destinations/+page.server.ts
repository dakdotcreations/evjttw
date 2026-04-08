import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [countries, stepsWithLocation] = await Promise.all([
		prisma.country.findMany({
			orderBy: { name: 'asc' },
		}),
		prisma.itineraryStep.findMany({
			where: {
				itinerary: { published: true },
				location: { isNot: null },
			},
			select: {
				itineraryId: true,
				location: { select: { countryId: true } },
			},
		}),
	]);

	// Build countryId → unique itinerary IDs map
	const tourCountMap = new Map<string, Set<string>>();
	for (const step of stepsWithLocation) {
		if (!step.location) continue;
		const { countryId } = step.location;
		if (!tourCountMap.has(countryId)) tourCountMap.set(countryId, new Set());
		tourCountMap.get(countryId)!.add(step.itineraryId);
	}

	return {
		countries: countries.map((c) => ({
			id: c.id,
			code: c.code,
			name: c.name,
			flagEmoji: c.flagEmoji,
			imageUrl: c.imageUrl,
			tourCount: tourCountMap.get(c.id)?.size ?? 0,
		})),
	};
};
