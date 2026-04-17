import type { SeedData } from './types.js';

/**
 * Locations required (must already exist in the database):
 *   - "Bwindi Impenetrable National Park"  → Days 1 & 2
 *   - "Queen Elizabeth National Park"      → Days 3, 4 & 5
 */
const data: SeedData = {
	itinerary: {
		id: 'seed-gorilla-and-wildlife-safari-5day',
		title: '5 Day Gorilla and Wildlife Safari',
		summary:
			'Track mountain gorillas in Bwindi, encounter tree-climbing lions in Ishasha, cruise the hippo-lined Kazinga Channel, and track chimpanzees in Kyambura Gorge — the ultimate 5-day Uganda primate and wildlife experience.',
		description: `This five-day safari distils the very best of Uganda into one unforgettable journey. It combines three of the country\'s most iconic wildlife encounters — mountain gorilla trekking, tree-climbing lion tracking, and chimpanzee tracking — with a Kazinga Channel boat cruise and authentic community cultural experiences.

Bwindi Impenetrable National Park, a UNESCO World Heritage Site in southwestern Uganda, shelters over 400 mountain gorillas — roughly half the world\'s entire population. Tracking a habituated gorilla family through the ancient forest is one of the most profound wildlife encounters on earth.

Queen Elizabeth National Park brings an entirely different dimension: open savannah game drives across the Kasenyi Plains, the famous tree-climbing lions of the Ishasha sector, and an afternoon boat cruise along the Kazinga Channel — one of East Africa\'s finest hippo and crocodile habitats. Kyambura Gorge, carved into the park\'s eastern edge, harbours a habituated chimpanzee community and is known as the "Valley of Apes."

The safari is suitable for both first-time visitors and seasoned safari goers. It starts and ends in Kampala or Entebbe, with pickup at Entebbe International Airport.`,
		durationDays: 5,
		currency: 'USD',
		fixedPrice: null,
		pricePerPerson: null,
		pricingDisabled: false,
		bestSeasons: ['June', 'July', 'August', 'December', 'January', 'February'],
		published: true,
	},

	steps: [
		{
			stepNumber: 1,
			title: 'Kampala / Entebbe → Bwindi Impenetrable National Park',
			description:
				'Pick up from your Kampala hotel, Entebbe International Airport, or designated city location at 8:00 am. Drive south via the Kampala–Masaka–Mbarara–Kabale road, stopping for lunch at Igongo Cultural Centre in Mbarara — a fascinating museum celebrating the traditions of the Ankole people. Continue to Bwindi and check in at Buhoma Haven Lodge. Freshen up, enjoy dinner, and rest ahead of the early morning trek. Meal plan: Full Board.',
			highlight: null,
			durationDays: 1,
			locationName: 'Bwindi Impenetrable National Park',
		},
		{
			stepNumber: 2,
			title: 'Gorilla Trekking & Batwa Community Tour',
			description:
				'Rise at 5:30 am for an early breakfast and pack your lodge-provided lunch. Meet your driver/guide for a briefing, then transfer to the park headquarters for the pre-trek ranger briefing covering gorilla behaviour and safety guidelines. Head into the impenetrable forest with trained rangers and trackers in search of a habituated gorilla family. The trek can take 2–6 hours depending on the gorillas\' location. Spend one unforgettable hour with the family at close range. Return to Buhoma Haven Lodge to freshen up, then visit the Batwa community — Uganda\'s famous forest-dwelling pygmies — for traditional singing, dancing, and cultural storytelling. Dinner and overnight at Buhoma Haven Lodge. Meal plan: Full Board.',
			highlight: 'One hour with a mountain gorilla family + Batwa community cultural encounter',
			durationDays: 1,
			locationName: 'Bwindi Impenetrable National Park',
		},
		{
			stepNumber: 3,
			title: 'Bwindi → Queen Elizabeth National Park — Tree-Climbing Lions & Evening Game Drive',
			description:
				'After breakfast, check out of Buhoma Haven Lodge and drive north to Queen Elizabeth National Park. Check in at Park View Hotel and enjoy lunch. In the afternoon, head to the remote Ishasha sector in the southern part of the park to track the famous tree-climbing lions — a unique behaviour rarely seen elsewhere in Africa, where lions drape themselves across the branches of giant fig trees. Round off the day with an evening game drive across the Kasenyi Plains, scanning for elephants, buffaloes, Uganda kob, and other wildlife in the golden afternoon light. Dinner and overnight. Meal plan: Full Board.',
			highlight: 'Tree-climbing lions in the Ishasha sector — a uniquely Ugandan spectacle',
			durationDays: 1,
			locationName: 'Queen Elizabeth National Park',
		},
		{
			stepNumber: 4,
			title: 'Morning Game Drive & Kazinga Channel Boat Cruise',
			description:
				'Wake early for a morning game drive across the Kasenyi Plains, prime territory for lions, leopards, elephants, buffaloes, hyenas, and Uganda kob. Return to the lodge for lunch. In the afternoon, board a launch boat for a cruise along the Kazinga Channel — the waterway connecting Lake Edward and Lake George — drifting past hippo pods, basking Nile crocodiles, and elephants bathing at the water\'s edge, while hundreds of bird species line the banks. Return to the lodge for dinner and overnight. Meal plan: Full Board.',
			highlight: 'Kazinga Channel boat cruise — hippos, crocodiles, elephants and 600+ bird species',
			durationDays: 1,
			locationName: 'Queen Elizabeth National Park',
		},
		{
			stepNumber: 5,
			title: 'Chimpanzee Tracking in Kyambura Gorge → Return to Kampala',
			description:
				'After breakfast, prepare for chimpanzee tracking in Kyambura Gorge — a dramatic river gorge carved into the floor of the Rift Valley, home to a habituated chimpanzee community. Your guide will lead you down into the gorge and through the lush forest in search of the chimps, with additional opportunities to spot forest birds and other primates. After trekking, return to the lodge, check out, and begin the drive back to Kampala. Optionally, explore Kampala\'s streets and markets on arrival before being dropped at your hotel or Entebbe International Airport.',
			highlight: 'Chimpanzee tracking in the dramatic "Valley of Apes" — Kyambura Gorge',
			durationDays: 1,
			locationName: 'Queen Elizabeth National Park',
		},
	],

	meta: {
		pickup: 'Entebbe International Airport (EBB)',
		meetingPoint: 'Airport or Hotel',

		includes: [
			'Transportation by a 4×4 vehicle',
			'Full board accommodation as per the itinerary',
			'Border crossing fees',
			'Ranger fees',
			'English-speaking driver/guide',
			'Driver/guide subsistence allowance',
			'En-route lunches',
		],

		excludes: [
			'Air flight tickets',
			'Ugandan visa',
			'Gorilla and chimpanzee trekking permits (arranged on your behalf — ask for current pricing)',
			'Optional activities not listed in the itinerary',
			'Porter fees when tracking',
			'Personal insurance and shopping',
			'Any other item not mentioned above',
		],

		complementaries: ['Bottled water', 'T-Shirt'],

		faqs: [
			{
				question: 'Do I need to be physically fit for this safari?',
				answer:
					'A moderate level of fitness is advisable. Gorilla and chimpanzee trekking can involve several hours of hiking over uneven, steep, and sometimes muddy jungle terrain. The more fit you are, the more enjoyable the experience. Porter support is available at an additional cost for those who need it.',
			},
			{
				question: 'Do I need a gorilla trekking permit in advance?',
				answer:
					'Yes — gorilla permits are limited and must be secured well in advance, especially during peak season (June–September). We handle permit booking on your behalf; contact us as early as possible to guarantee your preferred dates.',
			},
		],
	},
};

export default data;
