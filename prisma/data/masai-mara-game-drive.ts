import type { SeedData } from './types.js';

/**
 * Locations required (must already exist in the database):
 *   - "Maasai Mara National Reserve"
 */
const data: SeedData = {
	itinerary: {
		id: 'seed-masai-mara-game-drive',
		title: '3 Day Masai Mara Game Drive',
		summary:
			'Three days of pure safari magic in Kenya's most iconic wildlife reserve — home to the Big Five, the Great Migration, and endless open savannah.',
		description: `The Maasai Mara National Reserve is Kenya's premier wildlife destination and one of the most celebrated safari areas on the planet. This 3-day game drive puts you in the heart of the action — whether it's lions basking on the plains, cheetahs cutting across the grasslands, or the thundering hooves of the annual wildebeest migration.

The ultimate spectacle is the Great Wildebeest Migration: every July and August, millions of wildebeest move north from the Serengeti in search of lusher pastures before turning south again in October. Witnessing a river crossing is a bucket-list moment that very few places on earth can match.

Beyond the migration, the Mara is 1,510 sq km of wide-open landscapes and fertile river woodland following the looping meanders of the Mara and Talek rivers. Expect regular sightings of Maasai giraffe, baboons, warthogs, bat-eared foxes, grey jackals, spotted hyenas, topi, impala, wildebeest, elephants, buffaloes, zebras, and hippos. Lions are commonly seen either basking after a heavy meal or surveying the plains. Cheetahs and leopards are harder to spot but still reasonably common.

The safari starts and ends in Nairobi, with airport pickup at Jomo Kenyatta International Airport.`,
		durationDays: 3,
		currency: 'USD',
		fixedPrice: null,
		pricePerPerson: null,
		pricingDisabled: false,
		bestSeasons: ['June', 'July', 'August', 'September', 'October'],
		published: true,
	},

	steps: [
		{
			stepNumber: 1,
			title: 'Nairobi → Maasai Mara',
			description:
				'Pick up from Jomo Kenyatta International Airport or your Nairobi hotel and drive southwest to the famous Maasai Mara Game Reserve, arriving in time for lunch at Sarova Mara Game Camp. After settling in, head out for an afternoon game drive during the golden hours when predators become most active. The next two days are devoted entirely to game viewing in the early mornings and evenings when wildlife sightings are at their peak. Accommodation: Full board at Sarova Mara Game Camp.',
			highlight: 'Afternoon game drive on arrival — first taste of Mara wildlife',
			durationDays: 1,
			locationName: 'Maasai Mara National Reserve',
		},
		{
			stepNumber: 2,
			title: 'Full Day in the Maasai Mara',
			description:
				'Spend the entire day exploring the reserve with your expert driver-guide. Morning game drives offer the best predator activity; afternoons bring dramatic light for photography, and evenings reward you with spectacular orange-tinted sunsets best enjoyed with sundowners at the lodge. The Mara\'s diverse ecosystems mean wildlife is visible everywhere — lions, cheetahs, leopards, elephants, buffaloes, zebras, hippos, giraffes, hyenas, and hundreds of bird species all share this landscape. During migration season (July–October), river crossing sightings can be arranged depending on wildebeest movement. Accommodation: Full board at Sarova Mara Game Camp.',
			highlight: 'Full-day Big Five game drives; wildebeest migration river crossings in season',
			durationDays: 1,
			locationName: 'Maasai Mara National Reserve',
		},
		{
			stepNumber: 3,
			title: 'Maasai Mara → Nairobi — End of Safari',
			description:
				'On your final morning you have two options: a hot-air balloon flight over the savannah at dawn — an outstanding way to view the plains and wildlife from above, followed by a champagne bush breakfast on landing — or an early morning game drive for last-minute encounters before departure. After breakfast, transfer back to Nairobi for drop-off at your hotel or Jomo Kenyatta International Airport, marking the end of your Maasai Mara adventure.',
			highlight: 'Optional sunrise hot-air balloon flight with champagne breakfast',
			durationDays: 1,
			locationName: 'Maasai Mara National Reserve',
		},
	],

	meta: {
		pickup: 'Jomo Kenyatta International Airport (NBO)',
		meetingPoint: 'Nairobi Hotel or Airport',

		includes: [
			'Full board accommodation (meal plan as per itinerary)',
			'Ground transport in a comfortable 4×4 safari vehicle',
			'English-speaking professional driver/guide',
			'All game drives as detailed in the itinerary',
			'Airport transfers between Jomo Kenyatta International Airport and your Nairobi hotel',
		],

		excludes: [
			'International flights from home and back',
			'Travel insurance',
			'Park entry fees',
			'Guide gratuity',
			'Visit to the Maasai village (available at additional cost)',
			'Hot-air balloon flight (optional — additional cost)',
			'Personal items and shopping',
		],

		complementaries: [],

		faqs: [
			{
				question: 'What is a game drive in the Maasai Mara?',
				answer:
					'A game drive is a guided wildlife-viewing excursion in an open 4×4 vehicle. Your guide will navigate the reserve in search of the Big Five and other species, sharing knowledge about animal behaviour along the way. Drives typically take place in the early morning and late afternoon when wildlife is most active.',
			},
			{
				question: 'How long is a game drive in the Maasai Mara?',
				answer:
					'Game drives typically last between 3 and 5 hours. Full-day drives with a picnic lunch in the bush are also available. Let us know your preferences and we will tailor the schedule accordingly.',
			},
			{
				question: "I'm a solo traveller, is there a single supplement?",
				answer:
					'Yes, a single supplement applies when occupying a double or twin room alone. Please contact us for the current rate, which varies by season and camp.',
			},
			{
				question: 'Should I book pre/post tour accommodation?',
				answer:
					"We recommend arriving in Nairobi the night before departure so you are rested and ready for the early morning drive to the Mara. Post-tour accommodation in Nairobi is not included but can be arranged — get in touch and we'll find the right option for you.",
			},
			{
				question: 'What is the cancellation policy?',
				answer:
					'Cancellations made 30+ days before departure receive a full refund less the deposit. Cancellations 15–29 days before departure forfeit 50% of the total cost. Cancellations within 14 days of departure are non-refundable. We strongly recommend travel insurance.',
			},
		],
	},
};

export default data;
