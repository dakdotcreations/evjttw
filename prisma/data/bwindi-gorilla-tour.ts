import type { SeedData } from './types.js';

/**
 * Locations required (must already exist in the database):
 *   - "Bwindi Impenetrable National Park"
 */
const data: SeedData = {
	itinerary: {
		id: 'seed-bwindi-gorilla-tour',
		title: '3 Days Bwindi Gorilla Tour',
		summary:
			'Come face-to-face with endangered mountain gorillas in their natural habitat at Bwindi Impenetrable Forest — home to nearly half the world\'s surviving mountain gorilla population.',
		description: `Bwindi Impenetrable National Park is a UNESCO World Heritage Site and one of the most biodiverse forests in Africa. Nestled in the Kabale district of southwestern Uganda, the park is home to over 400 mountain gorillas — roughly half of the world\'s entire surviving population. A gorilla trekking permit grants one magical, permitted hour in close proximity to a habituated gorilla family, an encounter widely regarded as one of the most profound wildlife experiences on earth.

Beyond gorillas, Bwindi\'s ancient rainforest shelters a remarkable variety of primates including black-and-white colobus monkeys, red-tailed monkeys, olive baboons, and L\'Hoest\'s monkeys. The park also supports over 350 bird species, making it a premier birding destination.

The surrounding community is equally rich in culture. The Batwa pygmies — the original forest dwellers — offer authentic cultural performances and traditional walks that bring their centuries-old way of life to vivid life.

The safari starts and ends in Kampala, with airport transfers included.`,
		durationDays: 3,
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
			title: 'Kampala → Bwindi Impenetrable National Park',
			description:
				'After an early breakfast, your driver/guide will collect you from your Kampala hotel and begin the 7–9 hour drive southwest to Bwindi Impenetrable National Park in the Kabale district. Stop at the equator for photos along the way, then continue to Mbarara town for lunch. Arrive at the park in the evening and check in to your lodge. If energy permits, join an optional community walk for a cultural encounter with the local Batwa pygmies — enjoy traditional performances and a glimpse into their centuries-old forest lifestyle. Dinner and overnight at the lodge. Meal plan: Full Board.',
			highlight: 'Optional Batwa pygmy community walk and cultural performance on arrival',
			durationDays: 1,
			locationName: 'Bwindi Impenetrable National Park',
		},
		{
			stepNumber: 2,
			title: 'Gorilla Trekking in Bwindi Forest',
			description:
				'The highlight of the safari. After an early breakfast, transfer to the park headquarters for a pre-trek briefing by Uganda Wildlife Authority rangers covering gorilla behaviour, trekking guidelines, and safety protocols. Then head into the forest with your ranger guides and trackers to search for a habituated gorilla family. Gorilla tracking can take anywhere from 2 to 6 hours depending on the gorillas\' location in the forest, but every step through the ancient jungle is an experience in itself. Once found, spend one unforgettable hour with the gorilla family — watching infants play, silverbacks display, and the family go about their daily routines. Return to the lodge for dinner and overnight. Meal plan: Full Board.',
			highlight: 'Mountain gorilla trekking permit — one hour with a habituated gorilla family',
			durationDays: 1,
			locationName: 'Bwindi Impenetrable National Park',
		},
		{
			stepNumber: 3,
			title: 'Bwindi → Kampala — End of Tour',
			description:
				'After a final delicious breakfast, set off on the long but scenic drive back to Kampala. Enjoy sweeping views of the rolling, terraced hills of Kigezi — the dramatic landscape known as the "Switzerland of Africa" — as you wind through the countryside of the Pearl of Africa. Stop for lunch and a cultural encounter at Igongo Cultural Center, celebrating the traditions of the Ankole tribe. Continue via Masaka, arriving in Kampala in the evening. Drop-off at your hotel or onward transfer to Entebbe International Airport for your flight.',
			highlight: 'Scenic Kigezi highlands drive and Igongo Cultural Center lunch stop',
			durationDays: 1,
			locationName: 'Bwindi Impenetrable National Park',
		},
	],

	meta: {
		pickup: 'Entebbe International Airport (EBB) or Kampala hotel',
		meetingPoint: 'Airport or Hotel',

		includes: [
			'Gorilla tracking permit',
			'Transport in a 4×4 WD safari vehicle',
			'Park entrance fees',
			'Bottled drinking water',
			'English-speaking driver/guide and allowances',
			'Full board accommodation and meals',
			'Airport transfers',
		],

		excludes: [
			'International flights',
			'Ugandan visas',
			'Personal insurance',
			'Optional activities not listed in the itinerary',
			'Tips and gratuities',
			'Personal expenses and shopping',
		],

		complementaries: [],

		faqs: [],
	},
};

export default data;
