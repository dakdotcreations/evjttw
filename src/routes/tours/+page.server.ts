import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const itineraries = await prisma.itinerary.findMany({
		where: { published: true },
		orderBy: { createdAt: 'desc' },
		include: {
			steps: {
				include: {
					location: {
						include: { country: true },
					},
				},
			},
		},
	});

	const tours = itineraries.map((it) => {
		const countryMap = new Map<string, { id: string; name: string; code: string }>();
		const locationMap = new Map<string, { id: string; name: string; countryId: string }>();

		for (const step of it.steps) {
			if (step.location) {
				locationMap.set(step.location.id, {
					id: step.location.id,
					name: step.location.name,
					countryId: step.location.countryId,
				});
				if (step.location.country) {
					countryMap.set(step.location.country.id, {
						id: step.location.country.id,
						name: step.location.country.name,
						code: step.location.country.code,
					});
				}
			}
		}

		return {
			id: it.id,
			title: it.title,
			coverImage: it.coverImage,
			durationDays: it.durationDays,
			fixedPrice: it.fixedPrice ? Number(it.fixedPrice) : null,
			pricePerPerson: it.pricePerPerson ? Number(it.pricePerPerson) : null,
			currency: it.currency,
			countries: [...countryMap.values()],
			locations: [...locationMap.values()],
		};
	});

	return { tours };
};
