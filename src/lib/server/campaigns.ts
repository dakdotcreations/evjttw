import prisma from '$lib/server/prisma';

/** Replaces an itinerary's campaign assignments with the given codes, creating any new campaigns as needed. */
export async function syncItineraryCampaigns(itineraryId: string, codes: string[]) {
	const cleaned = [...new Set(codes.map((c) => c.trim()).filter(Boolean))];

	await prisma.itineraryCampaign.deleteMany({
		where: { itineraryId, campaign: { code: { notIn: cleaned } } }
	});

	for (const code of cleaned) {
		const campaign = await prisma.campaign.upsert({
			where: { code },
			update: {},
			create: { code, name: code }
		});
		await prisma.itineraryCampaign.upsert({
			where: { itineraryId_campaignId: { itineraryId, campaignId: campaign.id } },
			update: {},
			create: { itineraryId, campaignId: campaign.id }
		});
	}
}
