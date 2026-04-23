import { json, error } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import type { RequestHandler } from './$types';

export const GET: RequestHandler = async ({ params }) => {
	const itineraryRaw = await prisma.itinerary.findFirst({
		where: { id: params.id, published: true },
		include: {
			steps: {
				orderBy: { stepNumber: 'asc' },
				include: {
					location: { include: { country: true } },
				},
			},
			tags: { include: { tag: true } },
		},
	});

	if (!itineraryRaw) throw error(404, 'Tour not found');

	const countries = [
		...new Set(
			itineraryRaw.steps
				.filter((s) => s.location?.country)
				.map((s) => s.location!.country!.name),
		),
	];

	const relatedRaw = await prisma.itinerary.findMany({
		where: {
			published: true,
			id: { not: params.id },
			steps: {
				some: {
					location: { country: { name: { in: countries } } },
				},
			},
		},
		take: 4,
		include: {
			steps: { include: { location: { include: { country: true } } } },
			tags: { include: { tag: true } },
		},
	});

	const related = relatedRaw.map((it) => ({
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
				it.steps.filter((s) => s.location?.country).map((s) => s.location!.country!.name),
			),
		],
		tags: it.tags.map((t) => ({ name: t.tag.name, slug: t.tag.slug })),
	}));

	const itinerary = {
		id: itineraryRaw.id,
		title: itineraryRaw.title,
		summary: itineraryRaw.summary,
		description: itineraryRaw.description,
		coverImage: itineraryRaw.coverImage,
		durationDays: itineraryRaw.durationDays,
		fixedPrice: itineraryRaw.fixedPrice ? Number(itineraryRaw.fixedPrice) : null,
		pricePerPerson: itineraryRaw.pricePerPerson ? Number(itineraryRaw.pricePerPerson) : null,
		currency: itineraryRaw.currency,
		pricingDisabled: itineraryRaw.pricingDisabled,
		bestSeasons: itineraryRaw.bestSeasons,
		images: itineraryRaw.images,
		includes: itineraryRaw.includes,
		excludes: itineraryRaw.excludes,
		complementaries: itineraryRaw.complementaries,
		faqs: itineraryRaw.faqs,
		pickup: itineraryRaw.pickup,
		meetingPoint: itineraryRaw.meetingPoint,
		tags: itineraryRaw.tags.map((t) => ({ name: t.tag.name, slug: t.tag.slug })),
		countries: itineraryRaw.steps
			.filter((s) => s.location?.country)
			.reduce<{ id: string; name: string; code: string }[]>((acc, s) => {
				const c = s.location!.country!;
				if (!acc.find((x) => x.id === c.id)) acc.push({ id: c.id, name: c.name, code: c.code });
				return acc;
			}, []),
		steps: itineraryRaw.steps.map((s) => ({
			id: s.id,
			stepNumber: s.stepNumber,
			title: s.title,
			description: s.description,
			highlight: s.highlight,
			durationDays: s.durationDays,
			durationHours: s.durationHours,
			images: s.images,
			location: s.location
				? {
						id: s.location.id,
						name: s.location.name,
						country: s.location.country
							? { id: s.location.country.id, name: s.location.country.name, code: s.location.country.code }
							: null,
					}
				: null,
		})),
	};

	return json({ itinerary, countries, related });
};
