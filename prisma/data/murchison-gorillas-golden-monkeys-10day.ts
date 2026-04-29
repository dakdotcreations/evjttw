import type { SeedData } from './types.js';

/**
 * Locations required (must already exist in the database):
 *   - "Murchison Falls National Park"       (Days 1 & 2)
 *   - "Kibale Forest National Park"         (Days 3 & 4)
 *   - "Queen Elizabeth National Park"       (Days 4 & 5)
 *   - "Bwindi Impenetrable National Park"   (Days 6 & 7)
 *   - "Mgahinga Gorilla National Park"      (Day 8 - golden monkey tracking)
 *   - "Lake Bunyonyi"                       (Day 8 - canoe ride & overnight)
 *   - "Lake Mburo National Park"            (Days 9 & 10)
 */
const data: SeedData = {
	itinerary: {
		id: 'seed-murchison-gorillas-golden-monkeys-10day',
		title: '10 Days Mountain Gorillas, Chimps & Uganda Wildlife Safari (Private)',
		summary:
			"A private 10-day expedition through Uganda's finest parks - Big Five game drives at Murchison Falls, chimp tracking at Kalinzu, tree-climbing lions in Ishasha, mountain gorillas in Bwindi, and golden monkey tracking in Mgahinga.",
		description: `This private 10-day safari takes you on an expedition to the best destinations in Uganda. Begin at Murchison Falls National Park for the Big Five, a boat trip on the Victoria Nile to the base of the falls, and a hike to the top. Continue to Kibale National Park for chimpanzee tracking and the Bigodi Wetland Sanctuary, then on to Queen Elizabeth National Park with its rare tree-climbing lions and the wildlife-rich Kazinga Channel.

Track chimpanzees at Kalinzu Forest Reserve, spot tree-climbing lions through the Ishasha sector, and then enter Bwindi Impenetrable National Park for mountain gorilla trekking and a Batwa community visit. The next day takes you to Mgahinga Gorilla National Park for golden monkey tracking, followed by a canoe ride on the tranquil island-dotted Lake Bunyonyi. The safari concludes with a walking safari and game drive in Lake Mburo National Park before the equator crossing back to Entebbe.

This is a private tour - only your group will participate. The tour starts and ends at Entebbe International Airport with pickup and drop-off included. Departure is at 07:30 am on Day 1.`,
		durationDays: 10,
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
			title: 'Entebbe → Murchison Falls National Park - Afternoon Game Drive',
			description:
				"Begin the panoramic drive north-west through the famous Luwero Triangle and Masindi Town to arrive at Murchison Falls National Park - Uganda's largest wildlife reserve, divided by the River Nile where it squeezes through the legendary 7-metre gap at Murchison Falls. Arrive in the afternoon for lunch at the spectacular site at the top of the falls, then set out for a sunset game drive across the northern savannah in search of elephants, lions, giraffes, buffalo, Uganda kob, and antelope. Optional stop at Ziwa Rhino Sanctuary to track southern white rhinos on foot (USD 50 per person additional fee).",
			highlight: 'Optional white rhino tracking at Ziwa Rhino Sanctuary en route',
			durationDays: 1,
			locationName: 'Murchison Falls National Park',
		},
		{
			stepNumber: 2,
			title: 'Sunrise Game Drive & Victoria Nile Boat Safari',
			description:
				"Your safari breakfast will be served before dawn so you can begin the morning game drive as the sun rises. Sunrise is the best time for wildlife spotting - elephants, buffalo, several antelope species, and if you are lucky, lions and leopards may be seen during the golden hours. Return for lunch, then board a boat for a 3-hour safari upstream on the Victoria Nile to the base of the falls, passing breathtaking scenery alongside crocodiles, hundreds of hippos, and an incredible concentration of waterbirds as you approach the thundering cascade.",
			highlight: 'Boat safari on the Victoria Nile to the base of Murchison Falls',
			durationDays: 1,
			locationName: 'Murchison Falls National Park',
		},
		{
			stepNumber: 3,
			title: 'Top of the Falls Walk & Transfer to Kibale - Amabere Caves or Crater Lakes',
			description:
				"Enjoy your last sunrise at Murchison Falls with a 30-minute to 1-hour walk to the top of the falls for a breathtaking view of the Nile forcing itself through the narrow cleft. Then transfer south to Kibale National Park with several scenic stops for landscape and countryside viewing before reaching Fort Portal tourism city for lunch. In the afternoon choose between a guided Crater Lakes and plantation walk - through picturesque crater lakes some over 400 m deep, tea plantations, villages, and waterfalls - or a guided walk at the historic Amabere Ga Nyina Mwiru Caves, with stalactites, stalagmites, crater lake views, bird viewing, and hill climbing steeped in Bachwezi legend.",
			durationDays: 1,
			locationName: 'Kibale Forest National Park',
		},
		{
			stepNumber: 4,
			title: 'Bigodi Wetland / Chimp Tracking & Transfer to Queen Elizabeth NP',
			description:
				"Wake early for breakfast then head to the Bigodi Wetland Sanctuary - a community-managed swamp bordering Kibale Forest, home to 8 primate species, over 200 bird species, butterflies, and various reptiles. Alternatively, enter Kibale National Park itself for optional chimpanzee tracking: follow an experienced ranger guide into the forest to observe these fascinating creatures at close range - grooming, playing, and foraging. The park is home to 10 other primate species including l'Hoeste's and red colobus monkeys. In the afternoon, transfer to Queen Elizabeth National Park for lunch, then head to the Kazinga Channel for an exciting boat safari where hippos, elephants, and buffalo congregate at the water's edge.",
			highlight: 'Bigodi Wetland primate walk or optional chimpanzee tracking',
			durationDays: 1,
			locationName: 'Queen Elizabeth National Park',
		},
		{
			stepNumber: 5,
			title: 'Sunrise Game Drive & Kazinga Channel Boat Safari',
			description:
				"Early morning game drive across Queen Elizabeth's diverse ecosystem of grassy plains, tropical forests, rivers, swamps, lakes, and volcanic craters - with the massive Rwenzori Mountains as a backdrop. Excellent opportunities to see lions, leopards, giant forest hogs, Cape buffalo, elephants, defassa waterbuck, Uganda Kob, topi, and bushbuck. Return for lunch, then in the afternoon head back to the Kazinga Channel for another boat safari - the Kazinga Channel connects Lakes George and Edward and hosts one of the highest concentrations of hippos in Africa along its banks.",
			highlight: 'Kazinga Channel boat safari and Rwenzori Mountains backdrop',
			durationDays: 1,
			locationName: 'Queen Elizabeth National Park',
		},
		{
			stepNumber: 6,
			title: 'Chimp Tracking at Kalinzu Forest Reserve & Transfer to Bwindi via Ishasha',
			description:
				"After breakfast, stop at Kalinzu Central Forest Reserve for chimpanzee tracking (permit USD 150 per person, included). If time allows, continue into the Ishasha sector of Queen Elizabeth National Park for an extended game drive searching for the famous tree-climbing lions - a unique population that rests in the broad branches of giant fig trees. Then drive through the scenic Kigezi Highlands - the 'Switzerland of Africa' - through terraced hillsides and winding mountain roads to Bwindi Impenetrable or Mgahinga Gorilla National Park. Bwindi's impenetrable forest protects over 400 mountain gorillas - approximately half of the world's entire population.",
			highlight: 'Chimp tracking at Kalinzu + tree-climbing lions at Ishasha',
			durationDays: 1,
			locationName: 'Bwindi Impenetrable National Park',
		},
		{
			stepNumber: 7,
			title: 'Mountain Gorilla Tracking & Batwa Community Visit',
			description:
				"After breakfast, hike to park headquarters for a briefing by Uganda Wildlife Authority guides before transferring to the starting point for gorilla tracking. The search for gorillas goes through thick, untamed rainforest - scrambling over mossy rocks and through deep undergrowth. It is arduous, but the encounter is worth every step. Spend one magical hour with a habituated gorilla family - silverbacks, juveniles, and mothers - an experience that lasts a lifetime. After tracking, visit the Batwa Pygmy community along the Batwa Trail for traditional dance, beer making, fire setting, and cultural storytelling.",
			highlight: 'Mountain gorilla tracking permit (USD 800 per person) included',
			durationDays: 1,
			locationName: 'Bwindi Impenetrable National Park',
		},
		{
			stepNumber: 8,
			title: 'Golden Monkey Tracking at Mgahinga & Canoe Ride on Lake Bunyonyi',
			description:
				"Start with a pre-tracking briefing at Mgahinga Gorilla National Park headquarters before entering the forest in search of the golden monkey family. Golden monkeys live in lower altitude bamboo zones, so tracking is less strenuous than gorilla trekking and rarely exceeds 3 hours. Spend one hour with the family observing and photographing their vivid orange-gold colouring and playful behaviour. No minimum group size; minimum age is 12 years. In the afternoon, drive to scenic Lake Bunyonyi for a canoe ride across the glassy waters - the lake has 29 islands including the floating island and the historic Punishment Island, and is one of the few bilharzia-free lakes in East Africa.",
			highlight: 'Golden monkey tracking at Mgahinga - unique to the Virunga highlands',
			durationDays: 1,
			locationName: 'Lake Bunyonyi',
		},
		{
			stepNumber: 9,
			title: 'Transfer to Lake Mburo National Park - Afternoon Game Drive',
			description:
				"After an early breakfast, leave Lake Bunyonyi and drive east via Kabale Town to Lake Mburo National Park. You will be welcomed into the park by herds of zebra, buffalo, eland, and antelope grazing in the savannah grass. Arrive in the afternoon, have lunch, and set out for an afternoon game drive assured of spotting zebras, buffaloes, impalas, warthogs, and waterbucks. Birding is exceptional, with malachite kingfishers, African fish eagles, blue-headed weavers, rufous-tailed starlings, herons, pelicans, cormorants, and the rare shoebill all possible.",
			durationDays: 1,
			locationName: 'Lake Mburo National Park',
		},
		{
			stepNumber: 10,
			title: 'Sunrise Walking Safari, Equator Experience & Departure',
			description:
				"Enjoy your last sunrise with a guided walking safari in Lake Mburo - spot zebras, giraffes, eland, topi, antelope, and Cape buffalo at close range, and climb to the hilltop trail for a view of Lake Mburo and nine of the twelve surrounding lakes. After the walk, drive back to Kampala or Entebbe with a stopover at the equator for the equator experience and photo moments. Drop-off at Entebbe International Airport 3 hours before your departure time. Only breakfast, lunch, and drinking water are provided on this final day.",
			highlight: 'Guided walking safari + equator crossing experience',
			durationDays: 1,
			locationName: 'Lake Mburo National Park',
		},
	],

	meta: {
		pickup: 'Entebbe International Airport (EBB)',
		meetingPoint: 'Entebbe International Airport, Kampala Road, Entebbe, Uganda - your guide will be at the arrivals lounge with an Evajo Tours & Travel sign.',

		includes: [
			'All park entrance fees',
			'Mountain gorilla tracking permit (USD 800 per person)',
			'Chimpanzee tracking permit at Kalinzu Forest Reserve (USD 150 per person)',
			'Golden monkey tracking at Mgahinga Gorilla National Park',
			'Batwa/Pygmy community visit',
			'Canoe/boat ride on Lake Bunyonyi',
			'Game drives throughout the safari',
			'Boat safaris (Victoria Nile & Kazinga Channel)',
			'Walking safaris',
			'Equator experience and photo moments',
			'Full-board accommodation and en-route meals as indicated in the itinerary',
			'Full-time English-speaking driver/guide',
			'Ground transportation in a 4×4 safari van or Land Cruiser (fully fuelled)',
			'All relevant government taxes',
			'Airport pickup and drop-off at Entebbe',
			'Drinking water on all days',
			'9 breakfasts, 10 lunches, 9 dinners',
		],

		excludes: [
			'International flights and airfares',
			'Ugandan visa fees',
			'Personal travel insurance',
			'Alcoholic and non-alcoholic beverages',
			'Tips and gratuities',
			'Laundry and personal expenses',
			'Accommodation and meals not indicated in the itinerary',
			'Optional activities not listed above',
			'Ziwa Rhino Sanctuary tracking (optional, USD 50 per person)',
			'Accommodation on your first and last night in Uganda if arriving/departing outside itinerary days',
		],

		complementaries: [],

		faqs: [
			{
				question: 'Is this a private tour?',
				answer:
					'Yes - this is a fully private tour. Only your group will participate; there are no shared vehicles or shared guides with other travellers.',
			},
			{
				question: 'What time does the safari depart?',
				answer:
					'The safari departs at 07:30 am from Entebbe on Day 1. Your driver/guide will meet you at the arrivals lounge of Entebbe International Airport holding an Evajo Tours & Travel sign.',
			},
			{
				question: 'Are there any health or fitness requirements?',
				answer:
					'Gorilla and chimpanzee tracking involves hiking through dense forest on uneven terrain. This safari is not recommended for travellers with back problems, heart conditions, or other serious medical conditions, and is not suitable for pregnant travellers. Travellers should have a moderate level of physical fitness. Please consult your doctor if you have any concerns.',
			},
			{
				question: 'Is wheelchair access available?',
				answer:
					'No - the safari involves off-road game drives, forest treks, and walking safaris that are not accessible to wheelchair users.',
			},
			{
				question: 'When will I receive confirmation?',
				answer: 'Confirmation will be received at the time of booking.',
			},
		],
	},
};

export default data;
