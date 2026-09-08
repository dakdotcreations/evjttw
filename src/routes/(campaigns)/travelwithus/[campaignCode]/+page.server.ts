import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export type CampaignTour = {
	id: string;
	title: string;
	coverImage: string | null;
	durationDays: number;
	fixedPrice: number | null;
	pricePerPerson: number | null;
	currency: string;
	pricingDisabled: boolean;
	countries: string[];
	tags: string[];
};

async function getCampaignTours(campaignCode: string): Promise<CampaignTour[]> {
	const itineraries = await prisma.itinerary.findMany({
		where: { campaigns: { some: { campaign: { code: campaignCode } } }, published: true },
		orderBy: { createdAt: 'desc' },
		include: {
			steps: { include: { location: { include: { country: true } } } },
			tags: { include: { tag: true } }
		}
	});

	return itineraries.map((it) => {
		const countries = new Set<string>();
		for (const step of it.steps) {
			if (step.location?.country) countries.add(step.location.country.name);
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
			countries: [...countries],
			tags: it.tags.map((t) => t.tag.name)
		};
	});
}

export const load: PageServerLoad = ({ params }) => {
	// Not awaited - streams in once ready so the rest of the page renders immediately.
	return {
		campaignCode: params.campaignCode,
		tours: getCampaignTours(params.campaignCode)
	};
};
