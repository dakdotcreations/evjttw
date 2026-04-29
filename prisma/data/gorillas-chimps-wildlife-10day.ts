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
		id: 'seed-gorillas-chimps-wildlife-10day',
		title: '10 Days Mountain Gorillas, Chimps & Uganda Wildlife Safari',
		summary:
			"The ultimate 10-day Uganda safari - Big Five game drives at Murchison Falls, chimpanzee tracking in Kibale and Kalinzu, tree-climbing lions in Ishasha, mountain gorillas in Bwindi, golden monkeys in Mgahinga, and a canoe ride on Lake Bunyonyi.",
		description: `This 10-day expedition takes you to the very best of Uganda. Start at Murchison Falls National Park for classic big-game drives and a boat trip on the Victoria Nile to the thundering base of the falls. Continue to Kibale National Park for chimpanzee tracking and the Bigodi Wetland Sanctuary, then on to Queen Elizabeth National Park with its rare tree-climbing lions and the wildlife-rich Kazinga Channel.

Track chimpanzees at Kalinzu Forest Reserve before transferring through the spectacular Ishasha sector to Bwindi Impenetrable National Park - home to nearly half the world's remaining mountain gorillas. A golden monkeys tracking experience at Mgahinga Gorilla National Park and a canoe ride on the island-dotted Lake Bunyonyi follow before a final game drive and walking safari in Lake Mburo National Park and an equator crossing on the drive back to Entebbe.

The tour starts and ends at Entebbe International Airport, with pickup and drop-off included.`,
		durationDays: 10,
		currency: 'USD',
		fixedPrice: 7320,
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
				"Your Evajo Tours & Travel driver/guide will meet you at Entebbe International Airport and drive north-west through the Luwero Triangle and Masindi Town to Murchison Falls National Park - Uganda's largest wildlife reserve, bisected by the River Nile. Arrive in the afternoon for lunch at the spectacularly situated site at the top of the falls, then set out for a sunset game drive across the northern savannah in search of elephants, lions, giraffes, buffalo, and Uganda kob. Optional stop en route at Ziwa Rhino Sanctuary to track southern white rhinos on foot (additional fee). Dinner and overnight at Fort Murchison Lodge.",
			highlight: 'Optional white rhino tracking at Ziwa Rhino Sanctuary en route',
			durationDays: 1,
			locationName: 'Murchison Falls National Park',
		},
		{
			stepNumber: 2,
			title: 'Sunrise Game Drive & Victoria Nile Boat Safari',
			description:
				"Pre-dawn breakfast so you can begin the morning game drive as the first rays of sun come to rest on the northern savannah - the best time to spot elephants, buffalo, lions, and leopards at their most active. Return to the lodge for lunch, then board a boat for a 3-hour cruise upstream on the Victoria Nile to the base of Murchison Falls, watching hippos, Nile crocodiles, and hundreds of waterbirds crowd the banks as you draw closer to the thundering falls. Dinner and overnight at Fort Murchison Lodge.",
			highlight: 'Boat cruise on the Victoria Nile to the base of Murchison Falls',
			durationDays: 1,
			locationName: 'Murchison Falls National Park',
		},
		{
			stepNumber: 3,
			title: 'Top of the Falls Walk & Transfer to Kibale National Park',
			description:
				"A short 30–60 minute walk to the top of Murchison Falls delivers a dramatic view of the Nile forcing itself through the impossibly narrow 7-metre cleft of rock. Then drive south, stopping for lunch in Fort Portal - Uganda's tourism city. In the afternoon choose between a guided Crater Lakes and tea plantation walk through the picturesque Kigezi highlands, or a guided walk in Nature at the historic Amabere Ga Nyina Mwiru Caves, with stalagmites, crater lake views, and Bachwezi legend. Check in for dinner and overnight at Kibale Forest Camp.",
			durationDays: 1,
			locationName: 'Kibale Forest National Park',
		},
		{
			stepNumber: 4,
			title: 'Bigodi Wetland / Chimp Tracking & Transfer to Queen Elizabeth NP',
			description:
				"Wake early for breakfast, then head to Bigodi Wetland Sanctuary - a community-managed swamp bordering Kibale Forest, home to 8 primate species, over 200 bird species, butterflies, and various reptiles. Alternatively, enter Kibale National Park for optional chimpanzee tracking: follow an experienced ranger guide into the forest to observe these fascinating creatures grooming, playing, and foraging at close range. In the afternoon, transfer to Queen Elizabeth National Park for lunch and a sunset game drive across the savannah spotting lions, elephants, buffaloes, and Uganda Kob. Check in for dinner and overnight at The Bush Lodge.",
			highlight: 'Chimpanzee tracking or Bigodi Wetland primate walk',
			durationDays: 1,
			locationName: 'Queen Elizabeth National Park',
		},
		{
			stepNumber: 5,
			title: 'Sunrise Game Drive & Kazinga Channel Boat Safari',
			description:
				"Early morning game drive across Queen Elizabeth's diverse ecosystem of grassy plains, tropical forests, rivers, swamps, and volcanic craters - scanning for lions, leopards, giant forest hogs, Cape buffalo, elephants, defassa waterbuck, Uganda Kob, topi, and bushbuck, with the snow-capped Rwenzori Mountains as a backdrop. Return for lunch, then in the afternoon when the animals make their way to the water's edge, board a boat for a 2-hour cruise on the famous Kazinga Channel where thousands of hippos, Nile crocodiles, buffalo, and elephants congregate at the shore. Dinner and overnight at The Bush Lodge.",
			highlight: "Kazinga Channel boat safari - one of Uganda's finest wildlife experiences",
			durationDays: 1,
			locationName: 'Queen Elizabeth National Park',
		},
		{
			stepNumber: 6,
			title: 'Chimp Tracking at Kalinzu Forest Reserve & Transfer to Bwindi via Ishasha',
			description:
				"After breakfast, drive to Kalinzu Central Forest Reserve for chimpanzee tracking with experienced guides (permit USD 150 per person, included). Continue south through the Ishasha sector of Queen Elizabeth National Park for a game drive in search of the famous tree-climbing lions that rest in the broad branches of giant fig trees overlooking the open savannah. Then drive through the breathtaking Kigezi Highlands - the 'Switzerland of Africa' - with its terraced hillsides and winding mountain roads, arriving at Bwindi Impenetrable or Mgahinga Gorilla National Park in time for dinner. Check in for dinner and overnight at Broadbill Forest Camp.",
			highlight: 'Chimp tracking at Kalinzu + tree-climbing lions at Ishasha',
			durationDays: 1,
			locationName: 'Bwindi Impenetrable National Park',
		},
		{
			stepNumber: 7,
			title: 'Mountain Gorilla Tracking & Batwa Community Visit',
			description:
				"The undisputed highlight of the safari. After an early breakfast, transfer to park headquarters for a briefing by Uganda Wildlife Authority rangers covering gorilla behaviour, trekking etiquette, and safety. Head into the ancient impenetrable forest - one of Africa's oldest and most biodiverse rainforests - with ranger guides and trackers in search of a habituated mountain gorilla family. The trek can take anywhere from 2 to 6 hours through mossy rocks and deep undergrowth. Spend a magical one hour observing silverbacks resting, juveniles playing, and mothers nursing at close range. In the afternoon, visit the Batwa Pygmy community along the Batwa Trail for a window into their ancient forest-dwelling culture - traditional dance, fire-making, hunting demonstrations, and storytelling. Check in for dinner and overnight at Travellers' Rest Hotel, Kisoro.",
			highlight: 'Mountain gorilla tracking permit (USD 700 per person) included',
			durationDays: 1,
			locationName: 'Bwindi Impenetrable National Park',
		},
		{
			stepNumber: 8,
			title: 'Golden Monkey Tracking at Mgahinga & Canoe Ride on Lake Bunyonyi',
			description:
				"Morning golden monkey tracking in Mgahinga Gorilla National Park - the only place in Uganda where the endangered golden monkey can be tracked. These strikingly beautiful primates, with their vivid orange-gold patches, are found only in the Virunga volcanic highlands, and tracking them through the bamboo forest of Mgahinga is a wonderfully intimate experience. After tracking, descend to Lake Bunyonyi - one of Uganda's most scenic highland landscapes, dotted with 29 islands and ringed by terraced hills. Board a traditional dugout canoe for a relaxing paddle across the glassy, bilharzia-free waters. Check in for dinner and overnight at Bunyonyi Overland Resort.",
			highlight: 'Golden monkey tracking in Mgahinga - unique to the Virunga highlands',
			durationDays: 1,
			locationName: 'Lake Bunyonyi',
		},
		{
			stepNumber: 9,
			title: 'Transfer to Lake Mburo National Park - Afternoon Game Drive',
			description:
				"After an early breakfast, leave the highlands and drive east via Kabale Town to Lake Mburo National Park - the smallest savannah national park in Uganda and the only place in the country where zebras are found. You will be welcomed into the park by herds of zebra, buffalo, eland, and antelope as they graze in the golden savannah grass. Arrive for lunch, then set out for an afternoon game drive assuring close encounters with zebras, buffaloes, impalas, elands, warthogs, and waterbucks. The park also offers exceptional birding including the malachite kingfisher, African fish eagle, blue-headed weaver, and the rare shoebill. Check in for dinner and overnight at Eagles' Nest Lodge.",
			durationDays: 1,
			locationName: 'Lake Mburo National Park',
		},
		{
			stepNumber: 10,
			title: 'Sunrise Walking Safari, Equator Experience & Departure',
			description:
				"Enjoy your final sunrise in Uganda with a guided walking safari in Lake Mburo - on foot under the guidance of an armed ranger you can encounter zebras, giraffes, eland, and Cape buffalo at remarkably close range, and hike to the hilltop viewpoint overlooking nine of the twelve surrounding lakes. After the walk, begin the drive back to Entebbe, stopping at the equator monument on the Kampala-Masaka highway for photos and the classic water-spinning demonstration. Your driver/guide will drop you at Entebbe International Airport at least 3 hours before your international departure. Only breakfast and lunch are provided on this final day.",
			highlight: 'Guided walking safari in Lake Mburo and equator crossing experience',
			durationDays: 1,
			locationName: 'Lake Mburo National Park',
		},
	],

	meta: {
		pickup: 'Entebbe International Airport (EBB)',
		meetingPoint: 'Entebbe International Airport - your guide will be at the arrivals lounge holding an Evajo Tours & Travel sign.',

		includes: [
			'Ground transportation in a 4×4 safari van or Land Cruiser (fully fuelled)',
			'Game drives throughout the safari',
			'Full-time English-speaking driver/guide',
			'Boat safaris (Victoria Nile & Kazinga Channel)',
			'Walking safaris',
			'Golden monkey tracking at Mgahinga Gorilla National Park',
			'Full-board accommodation and en-route meals as indicated in the itinerary',
			'All park entrance fees',
			'Chimpanzee tracking permit at Kalinzu Forest Reserve (USD 150 per person)',
			'Mountain gorilla tracking permit (USD 700 per person)',
			'Batwa/Pygmy community visit',
			'Canoe/boat ride on Lake Bunyonyi',
			'Equator experience and photo moments',
			'All relevant government taxes',
			'Airport pickup and drop-off at Entebbe',
			'Drinking water on all days',
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
			'Accommodation on your first and last night in Uganda if arriving/departing outside itinerary days',
		],

		complementaries: [],

		faqs: [
			{
				question: 'Where does the tour start and end?',
				answer:
					'The tour starts and ends at Entebbe International Airport. Your guide will meet you at the arrivals lounge holding an Evajo Tours & Travel sign. Please arrive at the pickup point at least 30 minutes before the departure time.',
			},
			{
				question: 'Are there any health or fitness requirements?',
				answer:
					'Gorilla and chimpanzee trekking involves hiking through dense forest on uneven, sometimes steep terrain. This safari is not recommended for travellers with spinal injuries, poor cardiovascular health, or other serious medical conditions, and is not suitable for pregnant travellers. Travellers should have at least a moderate level of physical fitness. Please consult your doctor if you have any concerns.',
			},
			{
				question: 'Can I be picked up from my hotel rather than the airport?',
				answer:
					'Yes - pickup can be arranged from your Entebbe or Kampala hotel. Please let us know your accommodation details when booking.',
			},
		],
	},
};

export default data;
