import type { SeedData } from './types.js';

/**
 * Locations required (must already exist in the database):
 *   - "Ziwa Rhino Sanctuary"
 *   - "Murchison Falls National Park"
 */
const data: SeedData = {
	itinerary: {
		id: 'seed-murchison-falls-safari',
		title: '3 Day Murchison Falls Safari',
		summary:
			"Track wild rhinos at Ziwa Sanctuary then explore Uganda\'s largest national park - home to four of the Big Five, the world\'s most powerful waterfall, and a spectacular Nile boat cruise.",
		description: `Murchison Falls National Park is Uganda\'s largest and most visited national park, covering over 3,800 sq km of savannah, woodland, and riverine forest along the Nile. The park is home to four of the Big Five - lions, buffaloes, leopards, and elephants - as well as giraffes, Nile crocodiles, hippos, and an incredible diversity of birdlife.

The centrepiece of the park is Murchison Falls itself, where the entire volume of the Nile is forced through a narrow 8-metre gorge, creating the most powerful waterfall on earth. A boat cruise up the Nile to the base of the falls - through channels thick with hippos and crocodiles - is one of East Africa\'s great safari experiences.

Before entering the park, the itinerary includes a stop at Ziwa Rhino Sanctuary in Masindi, the only place in Uganda where you can track wild southern white rhinos on foot. Rhinos were previously extinct in Uganda and are now being reintroduced and bred here ahead of eventual release into the wild.

The safari starts and ends in Kampala or Entebbe, with pickup at Entebbe International Airport.`,
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
			title: 'Kampala / Entebbe → Murchison Falls National Park',
			description:
				'Depart at 7:00 am from your Kampala or Entebbe hotel and drive north. En route, pass through the historic Luwero Triangle before stopping in Masindi town for lunch at Court View Hotel, Kabalega Dinners, or Masindi Hotel. Continue to Murchison Falls National Park, stopping at the top of the falls for a first look at this extraordinary natural wonder. Cross the Nile by ferry and check in at your lodge (luxury options: Paraa Safari Lodge or Baker\'s Lodge; mid-range: Murchison River Lodge or Pakuba Safari Lodge). Refresh and enjoy dinner. Optional: night game drive at an additional cost of $200 per person for guests at Paraa Safari Lodge. Meal plan: Half Board.',
			highlight: 'Top of Murchison Falls viewpoint and Nile ferry crossing on arrival',
			durationDays: 1,
			locationName: 'Murchison Falls National Park',
		},
		{
			stepNumber: 2,
			title: 'Full Day - Morning Game Drive & Nile Boat Cruise',
			description:
				'After an early breakfast at around 6:30 am, set off for a morning game drive across the Nyamsika Plateau - prime territory for lions, elephants, buffaloes, giraffes, and leopards. Return to the lodge for lunch, then board a launch boat for an afternoon cruise up the Nile, drifting past banks heavy with hippos, Nile crocodiles, elephants, antelopes, and an extraordinary variety of water birds. The boat anchors near the "Devil\'s Cauldron" at the base of the falls for views of the thundering cascade from below. Hike up to the top of the falls to watch the full force of the Nile pouring through the gorge - often accompanied by a resident herd of elephants on the opposite bank. Return to the lodge for dinner and overnight. Meal plan: Full Board.',
			highlight: 'Nile boat cruise to the base of Murchison Falls - Big Five game drive',
			durationDays: 1,
			locationName: 'Murchison Falls National Park',
		},
		{
			stepNumber: 3,
			title: 'Rhino Tracking at Ziwa → Return to Kampala',
			description:
				'Enjoy an early breakfast and check out of the lodge. Drive south toward Kampala, stopping at Ziwa Rhino Sanctuary in Masindi for a 2–3 hour guided rhino tracking experience on foot - the only opportunity in Uganda to encounter wild southern white rhinos. Afterwards, stop in Masindi town for a traditional African lunch at Court View Hotel before continuing to Kampala. Drop-off at your hotel or Entebbe International Airport on arrival, marking the end of your Murchison Falls adventure.',
			highlight: 'On-foot rhino tracking at Ziwa - the only place in Uganda to see wild rhinos',
			durationDays: 1,
			locationName: 'Ziwa Rhino Sanctuary',
		},
	],

	meta: {
		pickup: 'Entebbe International Airport (EBB)',
		meetingPoint: 'Airport or Hotel',

		includes: [
			'Ranger fees',
			'Transportation by a 4×4 vehicle',
			'Full board accommodation as per the itinerary',
			'English-speaking driver/guide',
			'All meals from breakfast on Day 1 through lunch on Day 3',
			'Driver/guide subsistence allowance',
		],

		excludes: [
			'Air flight tickets',
			'Ugandan visas',
			'Optional activities not listed in the itinerary',
			'Night game drive (optional - $200 per person at Paraa Safari Lodge)',
			'Porter fees when tracking',
			'Personal insurance and shopping',
		],

		complementaries: ['Bottled water', 'T-Shirt'],

		faqs: [
			{
				question: "I\'m a solo traveller, is that ok?",
				answer:
					'Absolutely. Many of our travellers join because they are travelling solo and want to meet and share experiences with like-minded people. As a responsible tour operator, we strive to create a safe and inclusive environment for everyone.',
			},
			{
				question: 'What should I pack for my safari?',
				answer:
					'Essential items include lightweight and neutral-coloured clothing, a wide-brimmed hat, sunscreen, insect repellent, sturdy walking shoes, binoculars, a camera with extra batteries and memory cards, and any necessary medications.',
			},
			{
				question: 'Should I book pre/post tour accommodation?',
				answer:
					'Accommodation is included in the safari package, so there is no need to book pre/post accommodation separately. In rare cases, clients wish to upgrade to different accommodation - that is absolutely fine as long as you are available at the time of the tour.',
			},
		],
	},
};

export default data;
