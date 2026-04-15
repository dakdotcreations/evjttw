import type { SeedData } from './types.js';

/**
 * Locations required (must already exist in the database):
 *   - "Ziwa Rhino Sanctuary"          → Day 1
 *   - "Kidepo Valley National Park"   → Days 2, 3, 4 & 5
 */
const data: SeedData = {
	itinerary: {
		id: 'seed-kidepo-big5-safari-5day',
		title: '5 Days Big 5 Kidepo Safari',
		summary:
			"Venture into Uganda's most remote and rewarded wilderness — CNN's top-ranked African national park — for five days of Big Five game drives, hot springs walks, and a Karimojong cultural village experience.",
		description: `Kidepo Valley National Park is Uganda's most remote and arguably most spectacular national park, receiving CNN's prestigious Wilderness Award in 2013. Nestled in the rugged, semi-arid valleys of the Karamoja sub-region in the far northeast of Uganda, Kidepo offers a raw "Old Africa" wilderness experience unlike anything found elsewhere in the country.

The park is home to over 77 mammal species — including all of the African Big Five — and around 475 bird species, making it one of East Africa's premier wildlife destinations. Huge buffalo herds roam the Narus Valley, lions patrol the golden plains, zebras and giraffes graze alongside Jackson's hartebeest and eland, and elusive cheetahs and leopards stalk the rocky outcrops. Because the park receives relatively few visitors, sightings feel genuinely exclusive.

Beyond the wildlife, Kidepo sits in the heart of Karimojong territory. The Karimojong are one of Uganda's most distinctive pastoralist communities, known for their vibrant beadwork, unique beliefs, traditional tools, and energetic leaping dances. A village visit is one of the most memorable cultural encounters available anywhere in East Africa.

The journey north passes through Ziwa Rhino Sanctuary — the only place in Uganda to track wild rhinos on foot — before crossing the Nile at Karuma and continuing to Gulu and on to Kidepo. The safari starts and ends at Entebbe International Airport.`,
		durationDays: 5,
		currency: 'USD',
		fixedPrice: null,
		pricePerPerson: null,
		pricingDisabled: false,
		bestSeasons: ['September', 'October', 'November', 'December', 'January', 'February', 'March'],
		published: true,
	},

	steps: [
		{
			stepNumber: 1,
			title: 'Entebbe / Kampala → Ziwa Rhino Sanctuary → Gulu',
			description:
				'Depart early from Entebbe or Kampala and drive north toward Kidepo. Stop at Ziwa Rhino Sanctuary in Masindi for an on-foot rhino tracking experience — the only opportunity in Uganda to encounter wild southern white rhinos. After lunch at the sanctuary, continue north, crossing the mighty River Nile at Karuma Falls, and proceed to Gulu town for your overnight stay at Bomah Hotel. Meals: Lunch and Dinner included.',
			highlight: 'On-foot rhino tracking at Ziwa — Uganda's only wild rhino population',
			durationDays: 1,
			locationName: 'Ziwa Rhino Sanctuary',
		},
		{
			stepNumber: 2,
			title: 'Gulu → Kidepo Valley National Park — First Game Drive',
			description:
				'After breakfast, continue the drive northeast through the increasingly dramatic Karamoja landscape to Kidepo Valley National Park — one of Africa's most remote and least-visited wilderness areas. Arrive in time for lunch at Kidepo Savannah Lodge, a mid-range property bordering the park without fences, putting you directly in the heart of the bush. In the afternoon, head out for your first game drive across the Narus Valley plains, scanning for elephants, buffaloes, zebras, lions, and the park's remarkable diversity of birds. Dinner and overnight at Kidepo Savannah Lodge. Meals: All included.',
			highlight: 'First game drive in Uganda's most remote Big Five wilderness',
			durationDays: 1,
			locationName: 'Kidepo Valley National Park',
		},
		{
			stepNumber: 3,
			title: 'Full Day Game Drives & Hot Springs Walk',
			description:
				'Set out at dawn for a morning game drive to witness the early activities of Kidepo's wildlife. Look out for elephants, warthogs, duikers, Jackson's hartebeest, lions, leopards, zebras, Rothschild's giraffes, massive buffalo herds, cheetahs, and a wealth of bird species including the rare ostrich and Kori bustard. Return to the lodge for a restful afternoon lunch break. In the late afternoon, enjoy another game drive leading to the Kidepo hot springs, where you can walk around the fascinating geothermal streams bubbling up through the savannah floor. Dinner and overnight at Kidepo Savannah Lodge. Meals: All included.',
			highlight: 'Hot springs walk and Big Five game drives — cheetahs and ostriches in the wild',
			durationDays: 1,
			locationName: 'Kidepo Valley National Park',
		},
		{
			stepNumber: 4,
			title: 'Narus Valley Game Drive & Karimojong Cultural Village',
			description:
				'After breakfast, embark on a morning game drive through the Narus Valley — the park's prime zone for wildlife and birdwatching, particularly productive as animals converge on the permanent water sources during the dry season. In the evening, visit a nearby Karimojong village for one of Uganda's most immersive cultural encounters. Discover the unique beliefs, values, and traditions of this proud pastoralist community, handle traditional tools and admire intricate beadwork and jewellery, and join the villagers in their vigorous and joyful leaping dance. Dinner and overnight at Kidepo Savannah Lodge. Meals: All included.',
			highlight: 'Karimojong community village visit — leaping dances, beadwork, and traditional crafts',
			durationDays: 1,
			locationName: 'Kidepo Valley National Park',
		},
		{
			stepNumber: 5,
			title: 'Final Morning → Return to Entebbe',
			description:
				'Enjoy an early breakfast and take in the last of Kidepo's extraordinary landscapes before checking out and beginning the long drive south to Entebbe or Kampala. The scenic journey passes through Gulu, across the Nile, and down through central Uganda, with stops as needed along the way. Drop-off at Entebbe International Airport or your Kampala hotel, marking the end of your Kidepo Big 5 Safari.',
			highlight: null,
			durationDays: 1,
			locationName: 'Kidepo Valley National Park',
		},
	],

	meta: {
		pickup: 'Entebbe International Airport (EBB)',
		meetingPoint: 'Entebbe International Airport',

		includes: [
			'All accommodation (unless listed as an upgrade)',
			'Park entrance fees and national park permits',
			'Professional driver/guide',
			'Meals as specified per day; drinking water on all days',
			'All transportation (unless labelled as optional)',
		],

		excludes: [
			'Air flight tickets',
			'Ugandan visa',
			'Optional activities not listed in the itinerary',
			'Personal expenses — souvenirs, crafts, alcoholic drinks, laundry, tips',
		],

		complementaries: ['Bottled water', 'T-Shirt'],

		faqs: [
			{
				question: 'When is the best time to visit Kidepo Valley National Park?',
				answer:
					'The best time to visit is during the dry season, September to March, when wildlife congregates around permanent water sources and game viewing is at its peak. September to November (end of the rains) offers the best weather, with lush landscapes and excellent sightings.',
			},
			{
				question: 'Is Kidepo suitable for first-time safari visitors?',
				answer:
					'Absolutely — the park's low visitor numbers make sightings feel exclusive and intimate. The remoteness is part of the appeal. Roads can be rough, so expect a true bush experience rather than a manicured resort safari.',
			},
		],
	},
};

export default data;
