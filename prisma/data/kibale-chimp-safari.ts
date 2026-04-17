import type { SeedData } from './types.js';

/**
 * Locations required (must already exist in the database):
 *   - "Kibale Forest National Park"
 *   - "Kampala Cultural Circuit"
 */
const data: SeedData = {
	itinerary: {
		id: 'seed-kibale-chimp-safari',
		title: '3 Day Kibale Forest Chimpanzee Safari',
		summary:
			'Track wild chimpanzees in the primate capital of the world, hike volcanic crater landscapes, and explore Bigodi Wetland on this action-packed 3-day Uganda safari.',
		description: `Kibale Forest National Park is a reward to primate lovers because of the exceptional concentration of primates thriving in this dense tropical rainforest. It holds the highest percentage of chimpanzee sightings in the wild of any location in Africa or the world. But Kibale is more than primates — the region\'s volcanic heritage has carved out authentic crater lakes, sweeping farmland, and lush tea estates that make it an unforgettable destination for eco-travellers and nature lovers alike.

The safari starts and ends in Kampala, with an optional extension to Murchison Falls, Queen Elizabeth National Park, or Bwindi Impenetrable Forest for mountain gorilla trekking.

It is estimated that over 1,500 chimpanzees live in community groups within Kibale National Park. Of these, approximately four communities are fully habituated — meaning they are wild yet accustomed to human visitors and behave in a predictable manner. A strict limit on the number of trekkers per group means permits must be booked well in advance.

Activities include chimpanzee trekking, guided birding, a Bigodi Wetland boardwalk walk, crater lake hiking at Nyakashura, and en-route scenic drives through tea country.`,
		durationDays: 3,
		currency: 'USD',
		fixedPrice: null,
		pricePerPerson: null,
		pricingDisabled: false,
		bestSeasons: ['June', 'July', 'August', 'September', 'December', 'January', 'February'],
		published: true,
	},

	steps: [
		{
			stepNumber: 1,
			title: 'Kampala → Nyakashura Crater → Kibale Forest',
			description:
				'Depart Kampala in the morning and drive west toward Fort Portal. Stop en route for a guided hike around the scenic Nyakashura Crater, one of the striking volcanic craters that dot the landscape. Continue to Kibale Forest National Park and check in at your mid-range forest camp in time for an evening orientation briefing. Meal plan: Half Board. Accommodation: Mid-Range Kibale Forest Camp.',
			highlight: 'Nyakashura Crater hike with panoramic volcanic crater views',
			durationDays: 1,
			locationName: 'Kibale Forest National Park',
		},
		{
			stepNumber: 2,
			title: 'Chimpanzee Trekking & Bigodi Wetland Walk',
			description:
				'Rise early for a pre-dawn briefing at the park headquarters before heading into the forest with ranger guides and trackers. Spend up to one hour in the presence of a habituated chimpanzee community — one of the most sought-after wildlife encounters in Africa. Return to camp for lunch, then join an afternoon guided boardwalk walk through Bigodi Wetland Sanctuary, a community-run reserve teeming with red colobus monkeys, olive baboons, grey-cheeked mangabeys, and over 200 bird species. Meal plan: Full Board. Accommodation: Mid-Range Kibale Forest Camp.',
			highlight: 'Chimp trekking permit and Bigodi community wetland walk',
			durationDays: 1,
			locationName: 'Kibale Forest National Park',
		},
		{
			stepNumber: 3,
			title: 'Return to Kampala — End of Safari',
			description:
				'Enjoy a leisurely breakfast in the forest, then begin the scenic drive back to Kampala. En-route photo stops at the crater lakes and tea estates are possible depending on time. Drop-off at your Kampala hotel or Entebbe International Airport, marking the end of your Kibale chimpanzee adventure.',
			highlight: null,
			durationDays: 1,
			locationName: 'Kampala Cultural Circuit',
		},
	],

	meta: {
		pickup: 'Entebbe International Airport (EBB)',
		meetingPoint: 'Airport or Hotel',

		includes: [
			'Transportation by a 4×4 vehicle',
			'Entrance fees and national park permits',
			'Full board accommodation as per the itinerary',
			'Border crossing fees',
			'English-speaking driver guide',
			'Driver/guide subsistence allowance',
			'Ranger fees',
			'En-route lunches',
		],

		excludes: [
			'Air flight tickets',
			'Ugandan visas',
			'Water bottles and a headlamp / flashlight',
			'Optional activities not listed in the itinerary',
			'Porter fees when tracking',
			'Personal insurance and shopping',
			'Laundry, telephone, tips, and meals not indicated in the itinerary',
			'Accommodation on your first and last night in Uganda',
			'Mountain Gorilla habituation experience at Bwindi Impenetrable / Mgahinga (optional — $800 per person)',
			'Night game drive at Queen Elizabeth National Park (optional — $80 per person)',
		],

		complementaries: ['Umbrella', 'T-Shirt', 'Sunglasses'],

		faqs: [
			{
				question: "I\'m a solo traveller, is there a single supplement?",
				answer:
					'Single supplements apply when occupying a double/twin room alone. Please contact us for the current single supplement rate for this itinerary, as it varies by season and camp.',
			},
			{
				question: 'Should I book pre/post tour accommodation?',
				answer:
					"We recommend arriving in Entebbe the night before departure so you are rested and ready for the early morning drive. Post-tour accommodation in Kampala or Entebbe is not included but can be arranged. Get in touch and we\'ll help you find the right option.",
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
