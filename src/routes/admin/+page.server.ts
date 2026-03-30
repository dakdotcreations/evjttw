import prisma from '$lib/server/prisma';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async () => {
	const [
		itineraryCount,
		enquiryCount,
		pendingTestimonialCount,
		activeFeatureCount,
		topItineraries,
		bottomItineraries
	] = await Promise.all([
		prisma.itinerary.count(),
		prisma.bookingEnquiry.count(),
		prisma.testimonial.count({ where: { published: false } }),
		prisma.feature.count({ where: { isActive: true } }),
		prisma.itinerary.findMany({
			take: 5,
			orderBy: { enquiries: { _count: 'desc' } },
			select: { id: true, title: true, _count: { select: { enquiries: true } } }
		}),
		prisma.itinerary.findMany({
			where: { published: true },
			take: 5,
			orderBy: { enquiries: { _count: 'asc' } },
			select: { id: true, title: true, _count: { select: { enquiries: true } } }
		})
	]);

	return {
		itineraryCount,
		enquiryCount,
		pendingTestimonialCount,
		activeFeatureCount,
		topItineraries,
		bottomItineraries
	};
};
