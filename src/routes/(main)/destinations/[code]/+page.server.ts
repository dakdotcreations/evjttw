import { error } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	const country = await prisma.country.findUnique({
		where: { code: params.code },
		include: { locations: { orderBy: { name: 'asc' } } },
	});

	if (!country) throw error(404, 'Destination not found');

	// Find published itinerary IDs that pass through this country
	const steps = await prisma.itineraryStep.findMany({
		where: {
			location: { countryId: country.id },
			itinerary: { published: true },
		},
		select: { itineraryId: true },
	});

	const itineraryIds = [...new Set(steps.map((s) => s.itineraryId))];

	const itineraries = await prisma.itinerary.findMany({
		where: { id: { in: itineraryIds } },
		include: {
			steps: {
				include: {
					location: { include: { country: true } },
				},
			},
		},
	});

	const tours = itineraries.map((it) => ({
		id: it.id,
		title: it.title,
		coverImage: it.coverImage,
		durationDays: it.durationDays,
		fixedPrice: it.fixedPrice ? Number(it.fixedPrice) : null,
		pricePerPerson: it.pricePerPerson ? Number(it.pricePerPerson) : null,
		currency: it.currency,
		pricingDisabled: it.pricingDisabled,
		countries: [
			...new Set(
				it.steps
					.filter((s) => s.location?.country)
					.map((s) => s.location!.country!.name)
			),
		],
	}));

	return { country, tours };
};
