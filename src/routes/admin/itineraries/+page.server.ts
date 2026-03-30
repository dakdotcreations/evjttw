import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const itineraries = await prisma.itinerary.findMany({
		include: {
			steps: {
				include: { location: { include: { country: { select: { id: true, name: true } } } } }
			},
			_count: { select: { enquiries: true } }
		},
		orderBy: { createdAt: 'desc' }
	});

	const rows = itineraries.map((it) => {
		const countryMap = new Map<string, string>();
		for (const step of it.steps) {
			countryMap.set(step.location.country.id, step.location.country.name);
		}
		return {
			id: it.id,
			title: it.title,
			durationDays: it.durationDays,
			fixedPrice: it.fixedPrice ? Number(it.fixedPrice) : null,
			pricePerPerson: it.pricePerPerson ? Number(it.pricePerPerson) : null,
			currency: it.currency,
			published: it.published,
			enquiryCount: it._count.enquiries,
			countries: [...countryMap.values()]
		};
	});

	return { rows };
};
