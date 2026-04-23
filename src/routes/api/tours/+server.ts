import { json } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async () => {
	const [itineraries, allTags] = await Promise.all([
		prisma.itinerary.findMany({
			where: { published: true },
			orderBy: { createdAt: 'desc' },
			include: {
				steps: {
					include: {
						location: { include: { country: true } },
					},
				},
				tags: { include: { tag: true } },
			},
		}),
		prisma.tag.findMany({
			orderBy: { name: 'asc' },
			select: { id: true, name: true, slug: true },
		}),
	]);

	const tours = itineraries.map((it) => {
		const countryMap = new Map<string, { id: string; name: string; code: string }>();
		for (const step of it.steps) {
			if (step.location?.country) {
				countryMap.set(step.location.country.id, {
					id: step.location.country.id,
					name: step.location.country.name,
					code: step.location.country.code,
				});
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
			pricingDisabled: it.pricingDisabled,
			countries: [...countryMap.values()],
			tags: it.tags.map((t) => ({ name: t.tag.name, slug: t.tag.slug })),
		};
	});

	const allCountries = [
		...new Map(tours.flatMap((t) => t.countries).map((c) => [c.id, c])).values(),
	].sort((a, b) => a.name.localeCompare(b.name));

	return json({ tours, allTags, allCountries });
};
