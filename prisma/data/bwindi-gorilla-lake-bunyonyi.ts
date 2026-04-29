import type { SeedData } from './types.js';

/**
 * Locations required (must already exist in the database):
 *   - "Bwindi Impenetrable National Park"
 *   - "Lake Bunyonyi"
 */
const data: SeedData = {
	itinerary: {
		id: 'seed-bwindi-gorilla-lake-bunyonyi',
		title: '3 Days Gorilla Tracking & Canoe Ride at Lake Bunyonyi',
		summary:
			'Track rare mountain gorillas deep in the forests of southwest Uganda, then unwind with a scenic canoe ride on the tranquil island-dotted waters of Lake Bunyonyi.',
		description: `This three-day private tour combines two of Uganda\'s most iconic experiences: mountain gorilla trekking in Bwindi Impenetrable National Park and a canoe ride on the serene, highland waters of Lake Bunyonyi.

Bwindi Impenetrable National Park is a UNESCO World Heritage Site sheltering over 400 mountain gorillas - roughly half of the world\'s entire surviving population. Gorilla tracking takes you deep into one of Africa\'s oldest and most biodiverse rainforests in search of a habituated family, delivering one of wildlife\'s most profound close encounters.

Lake Bunyonyi lies just north of Bwindi in the highlands of Kigezi. Dotted with 29 islands and ringed by terraced hills, it is one of Uganda\'s most scenic landscapes and one of the few lakes in East Africa free of bilharzia - making it perfect for canoeing. The lake is also a birder\'s paradise, with the haunting call of the African fish eagle echoing across the water.

The tour starts and ends at Entebbe International Airport, with pickup and drop-off included.`,
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
			title: 'Entebbe / Kampala → Bwindi Impenetrable National Park',
			description:
				'Your guide will meet you at Entebbe International Airport or your Kampala hotel and begin the drive southwest to Bwindi Impenetrable National Park. The journey takes approximately 7–9 hours through Uganda\'s lush countryside, passing the equator for a photo stop and continuing through Mbarara for lunch. Arrive at the park in the evening, check in to your lodge, and rest up ahead of the early start for gorilla tracking the following morning. Dinner and overnight at the lodge.',
			highlight: null,
			durationDays: 1,
			locationName: 'Bwindi Impenetrable National Park',
		},
		{
			stepNumber: 2,
			title: 'Gorilla Tracking in Bwindi Forest',
			description:
				'Wake early for breakfast, then transfer to the park headquarters for a pre-trek briefing by Uganda Wildlife Authority rangers. Guidelines cover gorilla behaviour, trekking etiquette, and safety protocols. Head into the ancient forest with your ranger guides and trackers in search of a habituated mountain gorilla family. The trek can take anywhere from 2 to 6 hours depending on the gorillas\' location - every step through the impenetrable jungle is an experience in itself. Once found, spend one magical hour observing the family at close range: silverbacks resting, juveniles playing, and mothers nursing their young. Return to the lodge for a conservation experience debrief, dinner, and overnight.',
			highlight: 'One hour face-to-face with a habituated mountain gorilla family',
			durationDays: 1,
			locationName: 'Bwindi Impenetrable National Park',
		},
		{
			stepNumber: 3,
			title: 'Lake Bunyonyi Canoe Ride → Entebbe International Airport',
			description:
				'After breakfast, check out of the lodge and make the short drive to Lake Bunyonyi - one of Uganda\'s most breathtaking highland landscapes. Board a traditional dugout canoe and paddle across the glassy waters past several of the lake\'s 29 islands, taking in the terraced hills of Kigezi and the calls of birds echoing across the water. Lake Bunyonyi is one of the few lakes in East Africa free of bilharzia, making it ideal for a relaxed paddle. After the canoe experience, continue the drive north through the scenic Kigezi countryside and on to Entebbe International Airport for your onward flight home.',
			highlight: 'Dugout canoe ride across the island-studded waters of Lake Bunyonyi',
			durationDays: 1,
			locationName: 'Lake Bunyonyi',
		},
	],

	meta: {
		pickup: 'Entebbe International Airport (EBB)',
		meetingPoint: 'Entebbe International Airport, Uganda',

		includes: [
			'Gorilla tracking permit',
			'All park entrance and activity fees',
			'Transport in a 4×4 safari vehicle',
			'2 breakfasts, 2 lunches, 2 dinners (Days 1–2)',
			'English-speaking driver/guide',
			'Airport pickup and drop-off at Entebbe',
		],

		excludes: [
			'International flights and airfares',
			'Ugandan visa',
			'Travel insurance',
			'Alcoholic drinks',
			'Tips and gratuities',
			'Telephone and personal expenses',
		],

		complementaries: [],

		faqs: [
			{
				question: 'Is this a private tour?',
				answer:
					'Yes - this is a fully private tour. Only your group will participate; there are no shared vehicles or shared guides with other travellers.',
			},
			{
				question: 'Are there any health or accessibility restrictions?',
				answer:
					'Gorilla trekking involves hiking through dense forest on uneven terrain and is not recommended for travellers with back problems, heart conditions, or other serious medical conditions. It is also not suitable for pregnant travellers. Most fit and reasonably active travellers can participate. Please consult your doctor if you have any concerns.',
			},
		],
	},
};

export default data;
