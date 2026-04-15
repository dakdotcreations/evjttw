import { superValidate, message, fail } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { error, redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import { itinerarySchema } from '$lib/schemas/itinerary';
import { uploadImageFile } from '$lib/server/azure';
import type { Actions, PageServerLoad } from './$types';

const stepSchema = z.object({
	stepNumber: z.coerce.number().int().min(1),
	title: z.string().min(1, 'Title is required'),
	description: z.string().min(1, 'Description is required'),
	highlight: z.string().optional(),
	durationDays: z.coerce.number().int().min(0).optional(),
	durationHours: z.coerce.number().int().min(0).optional(),
	locationId: z.string().optional(),
	image: z.string().optional().default('')
});

const updateStepSchema = stepSchema.extend({ id: z.string() });
const deleteStepSchema = z.object({ id: z.string() });
const deleteItinerarySchema = z.object({ id: z.string() });

export const load: PageServerLoad = async ({ params }) => {
	const [itinerary, locations] = await Promise.all([
		prisma.itinerary.findUnique({
			where: { id: params.id },
			include: {
				steps: {
					include: { location: { include: { country: { select: { name: true } } } } },
					orderBy: { stepNumber: 'asc' }
				},
				_count: { select: { enquiries: true } }
			}
		}),
		prisma.location.findMany({
			include: { country: { select: { name: true } } },
			orderBy: { name: 'asc' }
		})
	]);

	if (!itinerary) error(404, 'Itinerary not found');

	const formValues = {
		...itinerary,
		fixedPrice: itinerary.fixedPrice ? Number(itinerary.fixedPrice) : undefined,
		pricePerPerson: itinerary.pricePerPerson ? Number(itinerary.pricePerPerson) : undefined,
		coverImage: itinerary.coverImage ?? undefined,
		bestSeasons: itinerary.bestSeasons.join(','),
		images: itinerary.images.join('\n'),
		pickup: itinerary.pickup ?? '',
		meetingPoint: itinerary.meetingPoint ?? '',
		includes: itinerary.includes.join('\n'),
		excludes: itinerary.excludes.join('\n'),
		complementaries: itinerary.complementaries.join('\n'),
		faqs: itinerary.faqs ? JSON.stringify(itinerary.faqs) : '[]'
	};

	const [itineraryForm, addStepForm, updateStepForm, deleteStepForm, deleteItineraryForm] =
		await Promise.all([
			superValidate(formValues, zod4(itinerarySchema), { id: 'update-itinerary' }),
			superValidate(zod4(stepSchema), { id: 'add-step' }),
			superValidate(zod4(updateStepSchema), { id: 'update-step' }),
			superValidate(zod4(deleteStepSchema), { id: 'delete-step' }),
			superValidate(zod4(deleteItinerarySchema), { id: 'delete-itinerary' })
		]);

	return {
		itinerary: {
			...itinerary,
			fixedPrice: itinerary.fixedPrice ? Number(itinerary.fixedPrice) : null,
			pricePerPerson: itinerary.pricePerPerson ? Number(itinerary.pricePerPerson) : null
		},
		locations,
		enquiryCount: itinerary._count.enquiries,
		itineraryForm,
		addStepForm,
		updateStepForm,
		deleteStepForm,
		deleteItineraryForm
	};
};

export const actions: Actions = {
	updateItinerary: async ({ request, params }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod4(itinerarySchema), { id: 'update-itinerary' });
		if (!form.valid) return fail(400, { itineraryForm: form });

		const bestSeasons = form.data.bestSeasons
			? form.data.bestSeasons.split(',').map((s) => s.trim()).filter(Boolean)
			: [];
		const images = form.data.images
			? form.data.images.split('\n').map((s) => s.trim()).filter(Boolean)
			: [];
		const includes = form.data.includes
			? form.data.includes.split('\n').map((s) => s.trim()).filter(Boolean)
			: [];
		const excludes = form.data.excludes
			? form.data.excludes.split('\n').map((s) => s.trim()).filter(Boolean)
			: [];
		const complementaries = form.data.complementaries
			? form.data.complementaries.split('\n').map((s) => s.trim()).filter(Boolean)
			: [];
		let faqs: { question: string; answer: string }[] = [];
		try { faqs = form.data.faqs ? JSON.parse(form.data.faqs) : []; } catch { faqs = []; }

		const coverImageFile = formData.get('coverImage_file');
		let coverImageUrl = form.data.coverImage || null;
		if (coverImageFile instanceof File && coverImageFile.size > 0) {
			coverImageUrl = await uploadImageFile(coverImageFile);
		}

		await prisma.itinerary.update({
			where: { id: params.id },
			data: {
				title: form.data.title,
				summary: form.data.summary,
				description: form.data.description,
				fixedPrice: form.data.fixedPrice ?? null,
				pricePerPerson: form.data.pricePerPerson ?? null,
				currency: form.data.currency,
				durationDays: form.data.durationDays,
				bestSeasons,
				coverImage: coverImageUrl,
				images,
				published: form.data.published,
				pricingDisabled: form.data.pricingDisabled,
				pickup: form.data.pickup || null,
				meetingPoint: form.data.meetingPoint || null,
				includes,
				excludes,
				complementaries,
				faqs: faqs.length ? faqs : null
			}
		});

		return message(form, { success: 'Itinerary updated.' });
	},

	deleteItinerary: async ({ request, params }) => {
		const form = await superValidate(request, zod4(deleteItinerarySchema), {
			id: 'delete-itinerary'
		});
		if (!form.valid) return fail(400, { deleteItineraryForm: form });

		await prisma.itinerary.delete({ where: { id: params.id } });
		redirect(303, '/admin/itineraries');
	},

	createStep: async ({ request, params }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod4(stepSchema), { id: 'add-step' });
		if (!form.valid) return fail(400, { addStepForm: form });

		const maxStep = await prisma.itineraryStep.aggregate({
			where: { itineraryId: params.id },
			_max: { stepNumber: true }
		});
		const stepNumber = form.data.stepNumber || (maxStep._max.stepNumber ?? 0) + 1;

		const imageFile = formData.get('image_file');
		let imageUrl = form.data.image || null;
		if (imageFile instanceof File && imageFile.size > 0) {
			imageUrl = await uploadImageFile(imageFile);
		}

		await prisma.itineraryStep.create({
			data: {
				itinerary: { connect: { id: params.id } },
				stepNumber,
				title: form.data.title,
				description: form.data.description,
				highlight: form.data.highlight || null,
				durationDays: form.data.durationDays ?? null,
				durationHours: form.data.durationHours ?? null,
				...(form.data.locationId
					? { location: { connect: { id: form.data.locationId } } }
					: {}),
				images: imageUrl ? [imageUrl] : []
			}
		});

		return message(form, { success: 'Step added.' });
	},

	updateStep: async ({ request }) => {
		const formData = await request.formData();
		const form = await superValidate(formData, zod4(updateStepSchema), { id: 'update-step' });
		if (!form.valid) return fail(400, { updateStepForm: form });

		const imageFile = formData.get('image_file');
		let imageUrl = form.data.image || null;
		if (imageFile instanceof File && imageFile.size > 0) {
			imageUrl = await uploadImageFile(imageFile);
		}

		await prisma.itineraryStep.update({
			where: { id: form.data.id },
			data: {
				stepNumber: form.data.stepNumber,
				title: form.data.title,
				description: form.data.description,
				highlight: form.data.highlight || null,
				durationDays: form.data.durationDays ?? null,
				durationHours: form.data.durationHours ?? null,
				location: form.data.locationId
					? { connect: { id: form.data.locationId } }
					: { disconnect: true },
				images: imageUrl ? [imageUrl] : []
			}
		});

		return message(form, { success: 'Step updated.' });
	},

	deleteStep: async ({ request, params }) => {
		const form = await superValidate(request, zod4(deleteStepSchema), { id: 'delete-step' });
		if (!form.valid) return fail(400, { deleteStepForm: form });

		await prisma.itineraryStep.delete({ where: { id: form.data.id } });

		// Re-number remaining steps sequentially
		const remaining = await prisma.itineraryStep.findMany({
			where: { itineraryId: params.id },
			orderBy: { stepNumber: 'asc' },
			select: { id: true }
		});
		await prisma.$transaction(
			remaining.map((s, i) =>
				prisma.itineraryStep.update({ where: { id: s.id }, data: { stepNumber: i + 1 } })
			)
		);

		return message(form, { success: 'Step deleted.' });
	}
};
