import { superValidate, message, fail } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import prisma from '$lib/server/prisma';
import type { Actions, PageServerLoad } from './$types';

const bulkAddSchema = z.object({
	itineraryIds: z.string().min(1, 'Select at least one itinerary'),
	code: z
		.string()
		.min(1, 'Campaign code is required')
		.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Lowercase letters, numbers, and hyphens only'),
	name: z.string().optional()
});

export const load: PageServerLoad = async () => {
	const [itineraries, allCampaigns] = await Promise.all([
		prisma.itinerary.findMany({
			include: {
				steps: {
					include: { location: { include: { country: { select: { id: true, name: true } } } } }
				},
				campaigns: { include: { campaign: { select: { code: true } } } },
				_count: { select: { enquiries: true } }
			},
			orderBy: { createdAt: 'desc' }
		}),
		prisma.campaign.findMany({ orderBy: { code: 'asc' } })
	]);

	const rows = itineraries.map((it) => {
		const countryMap = new Map<string, string>();
		for (const step of it.steps) {
			if (step.location) {
				countryMap.set(step.location.country.id, step.location.country.name);
			}
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
			countries: [...countryMap.values()],
			campaigns: it.campaigns.map((c) => c.campaign.code)
		};
	});

	const bulkAddForm = await superValidate(zod4(bulkAddSchema), { id: 'bulk-add-campaign' });

	return { rows, allCampaigns, bulkAddForm };
};

export const actions: Actions = {
	bulkAddToCampaign: async ({ request }) => {
		const form = await superValidate(request, zod4(bulkAddSchema), { id: 'bulk-add-campaign' });
		if (!form.valid) return fail(400, { bulkAddForm: form });

		const itineraryIds = form.data.itineraryIds.split(',').map((s) => s.trim()).filter(Boolean);

		const campaign = await prisma.campaign.upsert({
			where: { code: form.data.code },
			update: {},
			create: { code: form.data.code, name: form.data.name || form.data.code }
		});

		await prisma.itineraryCampaign.createMany({
			data: itineraryIds.map((itineraryId) => ({ itineraryId, campaignId: campaign.id })),
			skipDuplicates: true
		});

		return message(form, {
			success: `Added ${itineraryIds.length} itinerar${itineraryIds.length !== 1 ? 'ies' : 'y'} to "${campaign.code}".`
		});
	}
};
