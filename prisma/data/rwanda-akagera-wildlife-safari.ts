import type { SeedData } from './types.js';

/**
 * Locations required (must already exist in the database):
 *   - "Akagera National Park"
 *
 * NOTE: Rwanda is not in the main seed. Run the following (or add to seed.ts)
 * before seeding this itinerary:
 *   - Country: Rwanda (code: "RW", flagEmoji: "🇷🇼")
 *   - Location: "Akagera National Park" linked to Rwanda
 */
const data: SeedData = {
	itinerary: {
		id: 'seed-rwanda-akagera-wildlife-safari',
		title: '3 Day Rwanda Wildlife Safari - Akagera National Park',
		summary:
			"Explore Rwanda\'s remarkable conservation success story at Akagera - a park that lost all its wildlife and has now reclaimed lions, black rhinos, elephants, and the full savannah ecosystem.",
		description: `Akagera National Park is one of Africa\'s most extraordinary conservation comeback stories. After years of near-total loss of biodiversity, intensive rewilding efforts have returned black rhinos, lions, elephants, buffaloes, giraffes, hippos, and a wealth of other species to the park. Today Akagera is Rwanda\'s only Big Five reserve and one of the most inspiring wildlife destinations on the continent.

The park covers over 1,100 sq km of savannah, woodland, lakes, and wetlands along the Tanzania border. Its network of lakes - including the vast Lake Ihema - forms a rich aquatic ecosystem that supports hippos, Nile crocodiles, and over 500 bird species, making it one of East Africa\'s premier birding destinations.

Beyond the wildlife, Rwanda offers a fascinating cultural dimension. The Ibwachu Cultural Village experience provides an immersive look at local community life - traditional music and dance performances, community walks, banana brewing, and handicrafts.

The safari departs from and returns to Kigali International Airport.`,
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
			title: 'Kigali → Akagera National Park - Evening Game Drive',
			description:
				'Your journey begins in Kigali. Depart early and drive approximately 3 hours east to Akagera National Park, arriving in time for lunch. After settling in at your lodge (options include Magashi Lodge, Ruzizi Tented Camp, Karenge Bush Camp, or Akagera Game Lodge), head out for an evening game drive across the savannah. Spot elephants, buffaloes, lions, giraffes, oribis, topis, waterbucks, duikers, klipspringers, impalas, and many more species during the golden hours when wildlife is most active. Return to the lodge for dinner and overnight.',
			highlight: 'First encounter with Akagera\'s rewilded Big Five - lions, rhinos, and elephants',
			durationDays: 1,
			locationName: 'Akagera National Park',
		},
		{
			stepNumber: 2,
			title: 'Morning Game Drive & Lake Ihema Boat Trip',
			description:
				'After breakfast, set off for an early morning game drive while animals are at their most active on the open plains. Watch herds graze, predators patrol, and birds fill the skies as the day warms up. Return to the lodge for lunch. In the afternoon, board a boat for a cruise on Lake Ihema - one of the largest lakes in Rwanda - drifting past pods of hippos, basking Nile crocodiles, and an exceptional diversity of water birds including African fish eagles, herons, storks, and kingfishers. Return to the lodge for dinner and overnight. Meal plan: Full Board.',
			highlight: 'Lake Ihema boat cruise - hippos, crocodiles, and 500+ bird species',
			durationDays: 1,
			locationName: 'Akagera National Park',
		},
		{
			stepNumber: 3,
			title: 'Departure → Kigali International Airport',
			description:
				'Enjoy a final breakfast at the lodge before checking out and beginning the drive back to Kigali. Transfer to Kigali International Airport in time for your onward flight, marking the end of your Rwanda Wildlife Safari.',
			highlight: null,
			durationDays: 1,
			locationName: 'Akagera National Park',
		},
	],

	meta: {
		pickup: 'Kigali International Airport (KGL)',
		meetingPoint: 'Kigali International Airport',

		includes: [
			'Accommodation on full board basis',
			'One gorilla permit per person',
			'Sightseeing with private guide as per the itinerary',
			'All park entrance fees',
			'All transportation within the destination',
			'Transfers as detailed in the itinerary',
		],

		excludes: [
			'International flights',
			'Drinks',
			'Private expenses',
			'Travel insurance',
			'Visas',
		],

		complementaries: ['Umbrella', 'Sunscreen', 'T-Shirt'],

		faqs: [
			{
				question: 'What cultural experiences are available on this tour?',
				answer:
					'The tour includes an opportunity to visit the Ibwachu Cultural Village, where you can participate in traditional music and dance performances, community walks, banana brewing, and other local activities that offer a genuine insight into Rwandan community life.',
			},
			{
				question: 'What other activities can I add to this safari?',
				answer:
					'Popular extensions include gorilla trekking in Volcanoes National Park, golden monkey tracking, a Kigali city tour, and scenic drives through Rwanda\'s famous "Land of a Thousand Hills." Get in touch and we\'ll help tailor the perfect itinerary.',
			},
		],
	},
};

export default data;
