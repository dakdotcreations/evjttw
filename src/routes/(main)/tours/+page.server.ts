import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ url }) => {
	const tagSlug = url.searchParams.get('tag') ?? '';
	const countryId = url.searchParams.get('country') ?? '';

	const [itineraries, allTags] = await Promise.all([
		prisma.itinerary.findMany({
			where: {
				published: true,
				...(tagSlug ? { tags: { some: { tag: { slug: tagSlug } } } } : {}),
			},
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
			countries: [...countryMap.values()],
			tags: it.tags.map((t) => ({ name: t.tag.name, slug: t.tag.slug })),
		};
	});

	// Client-side country filter applied after load (URL param pre-filter only by tag)
	const filteredByCountry = countryId
		? tours.filter((t) => t.countries.some((c) => c.id === countryId))
		: tours;

	const allCountries = [
		...new Map(tours.flatMap((t) => t.countries).map((c) => [c.id, c])).values(),
	].sort((a, b) => a.name.localeCompare(b.name));

	return { tours: filteredByCountry, allCountries, allTags, activeTag: tagSlug, activeCountry: countryId };
};
