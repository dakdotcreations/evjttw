import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [features, testimonials, countries, tags] = await Promise.all([
		prisma.feature.findMany({
			where: { isActive: true },
			orderBy: { sortOrder: 'asc' },
			take: 6,
			include: {
				country: true,
				location: true,
				items: {
					orderBy: { sortOrder: 'asc' },
					include: {
						itinerary: {
							include: {
								steps: {
									include: {
										location: { include: { country: true } },
									},
								},
								tags: { include: { tag: true } },
							},
						},
					},
				},
			},
		}),
		prisma.testimonial.findMany({
			where: { published: true },
			orderBy: { createdAt: 'desc' },
			take: 6,
		}),
		prisma.country.findMany({
			orderBy: { name: 'asc' },
			take: 6,
			select: {
				id: true,
				code: true,
				name: true,
				flagEmoji: true,
				imageUrl: true,
				videoUrl: true,
			},
		}),
		prisma.tag.findMany({
			orderBy: { itineraries: { _count: 'desc' } },
			take: 8,
			select: { id: true, name: true, slug: true },
		}),
	]);

	// Derive countries per itinerary and convert Decimal prices
	const featuredTours = features
		.flatMap((f) => f.items)
		.reduce<
			{
				id: string;
				title: string;
				coverImage: string | null;
				durationDays: number;
				fixedPrice: number | null;
				pricePerPerson: number | null;
				currency: string;
				pricingDisabled: boolean;
				countries: string[];
				tags: { name: string; slug: string }[];
			}[]
		>((acc, item) => {
			if (acc.some((t) => t.id === item.itinerary.id)) return acc;
			const derivedCountries = [
				...new Set(
					item.itinerary.steps
						.filter((s) => s.location?.country)
						.map((s) => s.location!.country!.name)
				),
			];
			acc.push({
				id: item.itinerary.id,
				title: item.itinerary.title,
				coverImage: item.itinerary.coverImage,
				durationDays: item.itinerary.durationDays,
				fixedPrice: item.itinerary.fixedPrice ? Number(item.itinerary.fixedPrice) : null,
				pricePerPerson: item.itinerary.pricePerPerson
					? Number(item.itinerary.pricePerPerson)
					: null,
				currency: item.itinerary.currency,
				pricingDisabled: item.itinerary.pricingDisabled,
				countries: derivedCountries,
				tags: item.itinerary.tags.map((it) => ({ name: it.tag.name, slug: it.tag.slug })),
			});
			return acc;
		}, []);

	// Strip non-serializable Decimal fields from nested itineraries in features
	const serializedFeatures = features.map((f) => ({
		...f,
		items: f.items.map((item) => ({
			...item,
			itinerary: {
				...item.itinerary,
				fixedPrice: item.itinerary.fixedPrice ? Number(item.itinerary.fixedPrice) : null,
				pricePerPerson: item.itinerary.pricePerPerson ? Number(item.itinerary.pricePerPerson) : null,
			},
		})),
	}));

	return {
		featuredTours,
		testimonials,
		countries,
		features: serializedFeatures,
		tags,
	};
};
