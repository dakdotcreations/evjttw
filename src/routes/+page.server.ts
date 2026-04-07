import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [features, testimonials, countries] = await Promise.all([
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
							},
						},
					},
				},
			},
		}),
		prisma.testimonial.findMany({
			where: { published: true },
			orderBy: { createdAt: 'desc' },
			take: 3,
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
			},
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
				countries: string[];
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
				countries: derivedCountries,
			});
			return acc;
		}, []);

	// Hero images — add files to static/images/ and update this list
	const heroImages: string[] = [
		// '/images/hero-1.jpg',
		// '/images/hero-2.jpg',
	];

	return {
		featuredTours,
		testimonials,
		countries,
		heroImages,
	};
};
