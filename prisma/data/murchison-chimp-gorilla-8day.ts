import type { SeedData } from './types.js';

/**
 * Locations required (must already exist in the database):
 *   - "Ziwa Rhino Sanctuary"              → Day 1
 *   - "Murchison Falls National Park"     → Days 2 & 3
 *   - "Kibale Forest National Park"       → Days 3 & 4
 *   - "Queen Elizabeth National Park"     → Days 4 & 5
 *   - "Bwindi Impenetrable National Park" → Days 6 & 7
 *   - "Lake Bunyonyi"                     → Day 7 (transfer after gorillas)
 */
const data: SeedData = {
	itinerary: {
		id: 'seed-murchison-chimp-gorilla-8day',
		title: '8 Days Murchison Falls, Chimp & Gorilla Trekking Safari',
		summary:
			'A private 8-day journey through four of Uganda\'s finest reserves - rhino tracking at Ziwa, game drives and a Nile boat trip at Murchison Falls, chimpanzee trekking at Kibale, tree-climbing lions at Ishasha, and mountain gorilla trekking at Bwindi.',
		description: `This eight-day private safari covers the full breadth of Uganda\'s wildlife offering across four protected reserves, delivering an extraordinary variety of experiences in a single seamless itinerary.

The journey begins with an en-route stop at Ziwa Rhino Sanctuary - the only place in Uganda where you can track wild white rhinos on foot - before continuing north to Murchison Falls National Park, Uganda\'s largest reserve. Two days here deliver morning savannah game drives and a 3-hour boat trip up the Victoria Nile to the base of the world\'s most powerful waterfall.

A top-of-the-falls walk marks the departure from Murchison before the route swings south to Kibale Forest National Park - the primate capital of the world - for chimpanzee trekking in a forest that supports the highest density of chimps anywhere in Africa.

From Kibale the safari sweeps across to Queen Elizabeth National Park for game drives and a Kazinga Channel boat cruise, then passes through the Ishasha sector - home to Uganda\'s famous tree-climbing lions - on the way to Bwindi Impenetrable National Park for gorilla trekking. The adventure concludes with a relaxed afternoon at the serene highland waters of Lake Bunyonyi before the return drive to Entebbe.`,
		durationDays: 8,
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
			title: 'Entebbe → Ziwa Rhino Sanctuary → Murchison Falls National Park',
			description:
				'Your driver/guide will collect you from Entebbe International Airport and head directly north toward Murchison Falls National Park. En route, stop at Ziwa Rhino Sanctuary for approximately one hour of on-foot white rhino tracking - the only opportunity in Uganda to encounter wild southern white rhinos. Continue to Murchison Falls National Park, crossing the Nile by ferry, and check in to your lodge for dinner and overnight.',
			highlight: 'On-foot white rhino tracking at Ziwa - the only wild rhinos in Uganda',
			durationDays: 1,
			locationName: 'Ziwa Rhino Sanctuary',
		},
		{
			stepNumber: 2,
			title: 'Morning Game Drive & Victoria Nile Boat Trip - Murchison Falls',
			description:
				'After an early breakfast, head north of the Nile to tour the Northern Section of Murchison Falls - the area with the highest concentration of savannah wildlife. Game viewing and photography of elephants, buffaloes, waterbucks, giraffes, Uganda kob, and lions; with a chance of leopard for the lucky. Return to your accommodation for lunch, then embark on a 3-hour boat trip up the Victoria Nile to the base of the falls. Drift past banks thick with Nile crocodiles, hundreds of hippos, and extraordinary waterside birdlife, arriving at the "Devil\'s Cauldron" for spectacular close views of the falls. Return to the lodge for dinner and overnight. Meal plan: Full Board.',
			highlight: '3-hour Victoria Nile boat trip to the base of Murchison Falls - hippos and crocodiles',
			durationDays: 1,
			locationName: 'Murchison Falls National Park',
		},
		{
			stepNumber: 3,
			title: 'Top of the Falls Walk → Transfer to Kibale Forest National Park',
			description:
				'After breakfast, hike to the top of Murchison Falls for a dramatic close-up view of the Nile thundering through its narrow 7-metre gorge. After the walk, depart Murchison Falls and drive south to Kibale Forest National Park - celebrated as the primate capital of the world. Kibale is home to 13 primate species, most notably over 1,500 chimpanzees, with four habituated communities allowing close tracking encounters. Arrive at your lodge for dinner and overnight. Meal plan: Full Board.',
			highlight: 'Top of Murchison Falls walk - close-up of the world\'s most powerful waterfall',
			durationDays: 1,
			locationName: 'Kibale Forest National Park',
		},
		{
			stepNumber: 4,
			title: 'Chimpanzee Trekking at Kibale → Transfer to Queen Elizabeth National Park',
			description:
				'An experienced ranger guide leads you into Kibale Forest for chimpanzee trekking, beginning at 8:00 am with a briefing on trekking rules and chimp behaviour. Set off into the rainforest in search of a habituated community. Once located, spend one full hour with the chimpanzees - observing social interactions, foraging, and play in their natural forest habitat. Also look out for red colobus monkeys, grey-cheeked mangabeys, red-tailed monkeys, and abundant forest birdlife. Return to the lodge for lunch, then transfer to Queen Elizabeth National Park for dinner and overnight. Meal plan: Full Board.',
			highlight: 'Chimpanzee trekking in Kibale - one hour with a habituated chimp community',
			durationDays: 1,
			locationName: 'Kibale Forest National Park',
		},
		{
			stepNumber: 5,
			title: 'Morning Game Drive & Kazinga Channel Boat Cruise - Queen Elizabeth',
			description:
				'Early morning game drive across the Kasenyi Plains scanning for lions, leopards, elephants, buffaloes, Uganda kob, hyenas, and a diversity of savannah birds. Queen Elizabeth National Park\'s mosaic of habitats - grassy plains, crater lakes, tropical forest fringe, and river wetlands - delivers exceptional wildlife variety throughout the day. Return to the lodge for lunch, then board a launch boat for an afternoon cruise along the Kazinga Channel connecting Lake Edward and Lake George. Drift past hippo pods, Nile crocodiles, elephants bathing at the water\'s edge, and hundreds of bird species including African skimmers and pink-backed pelicans. Dinner and overnight at the lodge. Meal plan: Full Board.',
			highlight: 'Kazinga Channel boat cruise - one of East Africa\'s finest water safari experiences',
			durationDays: 1,
			locationName: 'Queen Elizabeth National Park',
		},
		{
			stepNumber: 6,
			title: 'Ishasha Tree-Climbing Lions Game Drive → Bwindi Impenetrable National Park',
			description:
				'After breakfast, depart Queen Elizabeth National Park through the Ishasha sector - the southernmost part of the park and the only place in Uganda where lions routinely climb into the branches of giant fig trees. An extended game drive here offers excellent chances of spotting these remarkable animals at rest in the canopy. Continue south through the scenic Kigezi Highlands - the terraced "Switzerland of Africa" - to Bwindi Impenetrable National Park. Check in to your lodge, relax, and prepare for gorilla trekking the following morning. Dinner and overnight. Meal plan: Full Board.',
			highlight: 'Tree-climbing lions in Ishasha - extended game drive in search of Uganda\'s most unusual lions',
			durationDays: 1,
			locationName: 'Bwindi Impenetrable National Park',
		},
		{
			stepNumber: 7,
			title: 'Mountain Gorilla Trekking → Lake Bunyonyi',
			description:
				'After an early breakfast, receive a briefing from your ranger guide, then enter the gorilla sanctuary and begin the trek through Bwindi\'s thick untamed rainforest. The search for the gorillas may take 1–8 hours, scrambling over mossy rocks and through deep undergrowth, but the encounter at the end - one full hour with a habituated gorilla family - makes every step worthwhile. Silverbacks, nursing mothers, and playful juveniles observed at close range in their natural habitat create a memory that lasts a lifetime. Return to the lodge for lunch, then transfer to the serene highland shores of Lake Bunyonyi for dinner and overnight at your lakeside lodge. Meal plan: Full Board.',
			highlight: 'Mountain gorilla trekking in Bwindi - one hour face-to-face with a gorilla family',
			durationDays: 1,
			locationName: 'Lake Bunyonyi',
		},
		{
			stepNumber: 8,
			title: 'Lake Bunyonyi → Entebbe International Airport - End of Safari',
			description:
				'Enjoy a relaxed final breakfast at your lodge with views across the island-dotted waters of Lake Bunyonyi - one of Uganda\'s most beautiful highland lakes. Embark on the return drive north to Entebbe, passing through the rolling hills and verdant countryside of central Uganda. Arrive at Entebbe International Airport in time for your onward flight, marking the end of your 8-day Murchison Falls, Chimp and Gorilla Trekking Safari.',
			highlight: null,
			durationDays: 1,
			locationName: 'Lake Bunyonyi',
		},
	],

	meta: {
		pickup: 'Entebbe International Airport (EBB)',
		meetingPoint: 'Entebbe International Airport',

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
			'Ugandan visas',
			'Chimpanzee and gorilla trekking permits (arranged on your behalf - ask for current pricing)',
			'Optional activities not listed in the itinerary',
			'Porter fees when tracking',
			'Personal insurance and shopping',
			'Any other item not listed above',
		],

		complementaries: ['T-Shirt', 'Park entrance fees'],

		faqs: [
			{
				question: 'What should I carry for this safari?',
				answer:
					'Pack a camera and charger, sunglasses, light layers for warm days and warmer layers for cool highland evenings, sturdy hiking boots for trekking, and binoculars if available. Neutral-coloured clothing is recommended for game drives.',
			},
			{
				question: 'Is this a private safari?',
				answer:
					'Yes - this is a fully private multi-day excursion. Only your group will participate in the vehicle and activities.',
			},
		],
	},
};

export default data;
