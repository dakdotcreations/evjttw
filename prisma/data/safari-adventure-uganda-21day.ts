import type { SeedData } from './types.js';

/**
 * Locations required (must already exist in the database):
 *   - "Ziwa Rhino Sanctuary"                 (Day 2 — en-route stop, no overnight)
 *   - "Murchison Falls National Park"        (Days 2 & 3)
 *   - "Kibale Forest National Park"          (Days 4 & 5)
 *   - "Queen Elizabeth National Park"        (Days 7 & 8 incl. Ishasha)
 *   - "Bwindi Impenetrable National Park"    (Days 9 & 10)
 *   - "Mgahinga Gorilla National Park"       (Day 12)
 *   - "Lake Mburo National Park"             (Days 18 & 19)
 *   Note: Day 1 (Entebbe arrival), Day 6 (Amabere Caves/Fort Portal — no DB record),
 *         Day 11 (Lake Chahafi — no DB record), Days 13–17 (Rukungiri homestay — no DB record),
 *         Day 20 (return to Entebbe), and Day 21 (departure) have no locationName.
 */
const data: SeedData = {
	itinerary: {
		id: 'seed-safari-adventure-uganda-21day',
		title: '21 Days Uganda Safari Adventure',
		summary:
			"A sweeping 21-day journey across roughly 70% of Uganda's attractions — from Murchison Falls in the north through Kibale's chimpanzees, Fort Portal's cultural sites, Queen Elizabeth's Kazinga Channel, mountain gorillas in Bwindi, golden monkeys at Mgahinga, an authentic Rukungiri homestay, and a wildlife finale at Lake Mburo.",
		description: `Embark on a 21-day journey across Uganda, traversing from the shores of Entebbe to the captivating landscapes of Northern Uganda, and then exploring the eastern and southwestern regions before returning to Entebbe. This comprehensive trip encompasses approximately 70% of Uganda's breathtaking attractions, offering encounters with diverse wildlife, stunning natural wonders, and rich cultural experiences.

Begin with a rhino tracking stop at Ziwa Rhino Sanctuary on the way north to Murchison Falls — Uganda's largest national park — for game drives and a Victoria Nile boat cruise to the base of the world's most powerful waterfall. Continue south through Kibale Forest for chimpanzee trekking and on to Fort Portal's ancient Amabere Caves and crater lakes. Queen Elizabeth National Park delivers the iconic Kazinga Channel hippo cruise and tree-climbing lions at Ishasha on the drive south to Bwindi Impenetrable Forest for mountain gorilla trekking.

From Bwindi, drop into the Kigezi Highlands for a canoe on Lake Chahafi, golden monkey tracking at Mgahinga, and then something truly unique: four days of authentic homestay life with a family in Rukungiri — cooking, farming, and engaging in the rhythms of a real Ugandan household. The final chapter brings you back north through Lake Mburo for zebra walks and a lake boat ride before the equator crossing and return to Entebbe.

This is a private tour — only your group will participate.`,
		durationDays: 21,
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
			title: 'Arrival at Entebbe International Airport',
			description:
				"Arrive at Entebbe International Airport where your driver/guide will meet you at the arrivals lounge holding an Evajo Tours & Travel sign. Transfer to your lodge in Entebbe — approximately 10 minutes from the airport. Check in, freshen up, and relax after your journey. Your guide will brief you on the 21-day adventure ahead. Entebbe is a leafy lakeside town on the shores of Lake Victoria; the Entebbe Botanical Gardens nearby are a lovely spot for an evening stroll and first birdwatching. Dinner and overnight at Entebbe lodge.",
			highlight: 'Warm welcome to the Pearl of Africa',
			durationDays: 1,
		},
		{
			stepNumber: 2,
			title: 'Transfer to Murchison Falls NP via Ziwa Rhino Sanctuary',
			description:
				"After breakfast, drive north from Entebbe with a stopover at Ziwa Rhino Sanctuary — the only place in Uganda where the critically endangered southern white rhinoceros can be tracked on foot in the wild. Accompanied by well-trained ranger guides, walk through the bush to locate the rhino groups and observe them at close range. Ziwa is also an excellent birding stop — the papyrus swamps at the sanctuary are one of the most reliable sites in Uganda for the prehistoric shoebill stork. After the rhino experience, continue north to Murchison Falls National Park — Uganda's largest national park, bisected by the River Nile. Dinner and overnight at the lodge.",
			highlight: 'White rhino tracking on foot at Ziwa — the only site in Uganda',
			durationDays: 1,
			locationName: 'Murchison Falls National Park',
		},
		{
			stepNumber: 3,
			title: 'Sunrise Game Drive & Victoria Nile Boat Cruise — Murchison Falls',
			description:
				"Pre-dawn breakfast to be on the northern savannah at sunrise — the golden hour when lions, leopards, Rothschild's giraffes, massive elephant herds, Cape buffalo, Uganda Kob, and waterbuck are most active. Return for lunch, then in the afternoon board a boat for a 3-hour safari upstream on the Victoria Nile to the base of Murchison Falls — Africa's most powerful waterfall, where the entire Nile forces itself through a 7-metre cleft and drops 40 metres with a thunderous roar. The boat passes Nile crocodiles, pods of hippos, African skimmers, herons, pelicans, pink-backed pelicans, and the occasional shoebill in the papyrus channels. Dinner and overnight at the lodge.",
			highlight: 'Victoria Nile boat safari to the base of Murchison Falls',
			durationDays: 1,
			locationName: 'Murchison Falls National Park',
		},
		{
			stepNumber: 4,
			title: 'Transfer to Kibale National Park',
			description:
				"After breakfast, drive south through the Albertine Rift landscape to Kibale Forest National Park — the chimpanzee capital of the world, home to the highest density of primates in Africa. The drive passes through Fort Portal, with its dramatic backdrop of the Rwenzori Mountains. Arrive in the afternoon and settle in at the lodge. Optional: an afternoon guided nature walk around the lodge grounds to spot forest elephants, L'Hoest's monkeys, and the rich birdlife that makes Kibale one of Uganda's premier birding destinations. Dinner and overnight near Kibale.",
			durationDays: 1,
			locationName: 'Kibale Forest National Park',
		},
		{
			stepNumber: 5,
			title: 'Chimpanzee Trekking & Birdwatching — Kibale Forest',
			description:
				"Early morning briefing at Kibale National Park headquarters before entering the forest for chimpanzee trekking (permit USD 200 per person). Follow experienced ranger guides through the world's most primate-rich forest to locate habituated chimpanzee communities — spending one hour watching them groom, play, feed, and swing through the canopy at close range. Kibale hosts 13 primate species including red-tailed monkeys, L'Hoest's monkeys, grey-cheeked mangabeys, olive colobus, and black-and-white colobus. In the afternoon, join a guided birdwatching walk — Kibale has over 375 bird species including the African green broadbill, the blue-headed sunbird, and the rare Afep pigeon. Dinner and overnight near Kibale.",
			highlight: 'Chimpanzee trekking in the world\'s most primate-rich forest',
			durationDays: 1,
			locationName: 'Kibale Forest National Park',
		},
		{
			stepNumber: 6,
			title: 'Amabere Caves, Crater Lakes & Fort Portal Cultural Sites',
			description:
				"A day exploring the fascinating cultural and geological heritage around Fort Portal. Begin with a visit to the Amabere Ga'Nyinamwiru Caves — stalactite and stalagmite formations over a cliff edge, associated with the legendary founding King of the Bachwezi empire. The name means 'the breasts of Nyinamwiru', referencing the stalactites' shape, and the site includes a beautiful crater lake viewpoint, birding, and hill climbing. Explore the series of deep volcanic crater lakes around Fort Portal — some over 400 m deep — with guided walks through tea plantations, banana farms, and Tooro Kingdom villages. Evening at the lodge near Fort Portal.",
			highlight: "Amabere Ga'Nyinamwiru Caves + Fort Portal crater lake walks",
			durationDays: 1,
		},
		{
			stepNumber: 7,
			title: 'Transfer to Queen Elizabeth NP — Community Visit & Arrival',
			description:
				"After breakfast, drive south to Queen Elizabeth National Park — Uganda's most visited park, stretching across volcanic craters, savannah plains, tropical forests, swamps, and the Kazinga Channel. En route, stop for a cultural encounter with a local community near the park boundary to learn about traditional livelihoods, farming practices, and the cultural heritage of the Bakonzo people who live alongside the park. Arrive in the afternoon, check into the lodge, and enjoy the evening views across the park. Dinner and overnight at the lodge.",
			durationDays: 1,
			locationName: 'Queen Elizabeth National Park',
		},
		{
			stepNumber: 8,
			title: 'Sunrise Game Drive & Kazinga Channel Boat Cruise — Queen Elizabeth NP',
			description:
				"Early morning game drive across Queen Elizabeth's grassy plains, tropical forests, volcanic craters, and river valleys — scanning for lions, leopards, giant forest hogs, hyenas, Cape buffalo, elephants, Uganda Kob, Defassa waterbuck, topi, and the stunning backdrop of the Rwenzori Mountains. Return for lunch, then in the afternoon board a boat on the Kazinga Channel — the natural waterway linking Lake George to Lake Edward. The 2-hour cruise passes one of the highest concentrations of hippos in Africa, alongside Nile crocodiles, African fish eagles, herons, pelicans, and enormous herds of buffalo and elephant coming down to drink at the water's edge. Dinner and overnight at the lodge.",
			highlight: 'Kazinga Channel boat cruise — hippos, crocs & buffalo',
			durationDays: 1,
			locationName: 'Queen Elizabeth National Park',
		},
		{
			stepNumber: 9,
			title: 'Transfer to Bwindi Impenetrable Forest via Ishasha — Tree-Climbing Lions',
			description:
				"After breakfast, drive south through Queen Elizabeth National Park to the remote Ishasha sector — the only place in Africa outside the Congo where lions regularly climb and rest in large fig trees. Spend time game-viewing in the Ishasha circuit, scanning the broad branches for lions at rest and the grassland below for Uganda Kob, topi, buffalo, and elephant. Then wind up through the Kigezi Highlands — known as the Switzerland of Africa — through terraced hillsides and banana plantations to Bwindi Impenetrable National Park. Dinner and overnight near Bwindi.",
			highlight: 'Tree-climbing lions at Ishasha + Kigezi Highland scenery',
			durationDays: 1,
			locationName: 'Bwindi Impenetrable National Park',
		},
		{
			stepNumber: 10,
			title: 'Mountain Gorilla Trekking — Bwindi Impenetrable Forest',
			description:
				"Receive an early briefing by Uganda Wildlife Authority rangers before entering the ancient Bwindi forest. The search for the habituated gorilla family can take 30 minutes to 6 hours, depending on where they have moved overnight. Trek through dense undergrowth and over mossy roots until you hear the first crash of vegetation — then mountain gorillas appear through the leaves. Spend one unforgettable hour watching silverbacks at rest, juveniles wrestling, and mothers nursing infants. Bwindi is a UNESCO World Heritage Site and shelters roughly half the world's remaining mountain gorillas. Dinner and overnight near Bwindi.",
			highlight: 'Mountain gorilla trekking permit (USD 700 per person) included',
			durationDays: 1,
			locationName: 'Bwindi Impenetrable National Park',
		},
		{
			stepNumber: 11,
			title: 'Lake Chahafi — Canoe Ride & Relaxation in the Kigezi Highlands',
			description:
				"Drive to Lake Chahafi — a pristine crater lake in the Kigezi Highlands near Kisoro, enclosed by steep forested ridges and offering sweeping views of the Virunga volcanoes across the border. The lake is serene and largely undiscovered by mainstream tourism, making it a special hidden gem of southwestern Uganda. Spend the day relaxing at the resort, taking an optional canoe ride on the calm lake waters, birdwatching along the forested shores, and enjoying the cool highland air at 1,800 m altitude. Dinner and overnight at Lake Chahafi Resort.",
			highlight: 'Canoe on Lake Chahafi — a hidden Kigezi Highlands gem',
			durationDays: 1,
		},
		{
			stepNumber: 12,
			title: 'Golden Monkey Tracking at Mgahinga & Transfer to Lake Bunyonyi',
			description:
				"Morning briefing at Mgahinga Gorilla National Park headquarters before trekking into the bamboo forest in search of the habituated golden monkey family (permit included). Golden monkeys (Cercopithecus kandti) are found only in the Virunga highlands — their vivid gold-and-black colouring and energetic acrobatics make them one of Uganda's most photogenic primates. Spend one hour with the family in the bamboo, then drive to Lake Bunyonyi for check-in at your lakeside lodge. Enjoy an afternoon canoe ride or simply relax on the shores of Africa's most beautiful lake. Dinner and overnight near Lake Bunyonyi.",
			highlight: 'Golden monkey tracking at Mgahinga (permit included)',
			durationDays: 1,
			locationName: 'Mgahinga Gorilla National Park',
		},
		{
			stepNumber: 13,
			title: 'Drive to Rukungiri — Community Arrival & Cultural Introduction',
			description:
				"After breakfast, drive north-east from Lake Bunyonyi to Rukungiri District — a beautiful, hilly region in southwestern Uganda known for its tea estates, rolling landscapes, and vibrant Banyankole and Bahororo communities. Arrive at the homestay and meet your host family. Spend the afternoon in a gentle introduction to community life: a guided village walk, meeting neighbours, learning about the local crops (bananas, sorghum, tea, cassava), and sharing an early evening meal prepared by your host family. This is the beginning of a deeper, more intimate experience of Ugandan culture than any lodge can offer. Overnight at Rukungiri homestay.",
			durationDays: 1,
		},
		{
			stepNumber: 14,
			title: 'Rukungiri Homestay — Four Days of Authentic Community Life',
			description:
				"Spend four immersive days living alongside a Ugandan family in Rukungiri. Each day offers a new dimension of community life: join the family in morning farm work (digging, planting, or harvesting bananas and sorghum), learn to cook traditional Ugandan dishes like matoke, groundnut stew, and roasted maize over an open fire, and participate in daily household rhythms. Visit the local market, attend a community gathering or church service, meet traditional healers, listen to traditional storytelling under the stars, and engage in local crafts such as basket weaving and bead making. This authentic homestay is one of the most genuinely transformative experiences available to visitors in Uganda — a rare window into the warmth, resilience, and beauty of everyday Ugandan life. Overnight at Rukungiri homestay each night.",
			highlight: 'Four days of authentic homestay life — the heart of Uganda',
			durationDays: 4,
		},
		{
			stepNumber: 18,
			title: 'Transfer to Lake Mburo National Park',
			description:
				"After saying farewell to your host family, drive east to Lake Mburo National Park — Uganda's smallest savannah park and the only national park in the country where zebras are found. The route passes through Mbarara, the largest city in western Uganda. Arrive at the park in the late afternoon for an evening game drive — the golden light is perfect for photographing zebras, impalas, buffaloes, warthogs, and Defassa waterbuck at close range. The lakeside setting and abundant bird life make Lake Mburo an excellent final wildlife destination. Dinner and overnight at the lodge.",
			durationDays: 1,
			locationName: 'Lake Mburo National Park',
		},
		{
			stepNumber: 19,
			title: 'Nature Walk & Boat Ride — Lake Mburo National Park',
			description:
				"Begin the morning with a guided walking safari in Lake Mburo — an armed ranger guide leads you through the acacia woodland and grassland, allowing close encounters with zebras, eland, topi, and Cape buffalo that are impossible to replicate from a vehicle. The lakeside trail is exceptional for birding: malachite kingfisher, African fish eagle, blue-headed weaver, rufous-tailed weaver, herons, pelicans, cormorants, and the occasional shoebill in the papyrus. In the afternoon, take a boat ride on Lake Mburo itself — passing hippos, Nile crocodiles, monitor lizards, and spectacular waterbirds along the papyrus-fringed shores. Dinner and overnight at the lodge.",
			highlight: 'Walking safari + boat ride on Lake Mburo',
			durationDays: 1,
			locationName: 'Lake Mburo National Park',
		},
		{
			stepNumber: 20,
			title: 'Drive Back to Entebbe — Equator Experience',
			description:
				"After breakfast, begin the drive north-east back to Entebbe with a stopover at the Uganda Equator monument at Kayabwe — one of two points where the tarmac Kampala–Mbarara road crosses the equator. Enjoy the famous water-flow demonstration and take photos straddling the line between hemispheres. Continue to Entebbe for a final dinner on the shores of Lake Victoria. Your guide will brief you on airport check-in procedures and departure logistics for Day 21. Overnight at Entebbe lodge.",
			highlight: 'Equator crossing experience at Kayabwe',
			durationDays: 1,
		},
		{
			stepNumber: 21,
			title: 'Departure from Entebbe International Airport',
			description:
				"After breakfast, transfer to Entebbe International Airport for your international flight home. Your driver/guide will ensure you arrive at least 3 hours before your scheduled departure. Should time allow, a final stroll through the Entebbe Botanical Gardens on the shores of Lake Victoria is always worthwhile — the same gardens that featured in the film Tarzan and home to some of Uganda's finest birding. We hope you carry home extraordinary memories from the Pearl of Africa.",
			highlight: 'Farewell to Uganda — the Pearl of Africa',
			durationDays: 1,
		},
	],

	meta: {
		pickup: 'Entebbe International Airport (EBB)',
		meetingPoint:
			'Entebbe International Airport arrivals lounge — your guide will be holding an Evajo Tours & Travel sign.',

		includes: [
			'Accommodation as specified throughout (lodges and homestay)',
			'All meals as indicated (breakfast, lunch, dinner)',
			'Airport pickup and drop-off at Entebbe',
			'All park entrance fees and vehicle park entry fees',
			'Mountain gorilla trekking permit at Bwindi Impenetrable (USD 700 per person)',
			'Chimpanzee trekking permit at Kibale National Park (USD 200 per person)',
			'Golden monkey tracking at Mgahinga National Park (permit included)',
			'White rhino tracking at Ziwa Rhino Sanctuary',
			'Victoria Nile boat cruise at Murchison Falls',
			'Kazinga Channel boat cruise at Queen Elizabeth NP',
			'Amabere Caves guided walk',
			'Fort Portal crater lakes walk',
			'Community and cultural visits throughout',
			'Rukungiri four-day authentic homestay experience',
			'Optional canoe ride on Lake Chahafi',
			'Boat ride on Lake Mburo',
			'Walking safari at Lake Mburo',
			'Equator experience and photo moments',
			'Game drives throughout the tour',
			'Park ranger fees throughout',
			'Full-time English-speaking driver/guide',
			'Ground transportation in a 4×4 safari van or Land Cruiser (fully fuelled)',
			'Bottled water in the vehicle on all days',
		],

		excludes: [
			'International flights and airfares',
			'Ugandan visa fees',
			'Personal travel insurance',
			'Alcoholic and non-alcoholic beverages',
			'Tips and gratuities',
			'Personal expenses (souvenirs, laundry, etc.)',
			'Optional activities not mentioned in the itinerary',
			'Any other items not listed above',
		],

		complementaries: [],

		faqs: [
			{
				question: 'Is this a private tour?',
				answer:
					'Yes — this is a fully private tour. Only your group will participate; there are no shared vehicles or shared guides with other travellers.',
			},
			{
				question: 'What is the homestay experience like?',
				answer:
					'The Rukungiri homestay places you with a real Ugandan family for four nights. You will share meals, participate in daily farm and household activities, meet neighbours, and experience authentic community life. It is a genuine cultural exchange — not a staged performance — and is one of the most popular and memorable parts of this itinerary.',
			},
			{
				question: 'Are there fitness requirements for gorilla trekking?',
				answer:
					'Gorilla trekking involves hiking through dense, steep forest for up to 6 hours. It is not suitable for travellers with serious heart conditions, back problems, or other significant medical conditions, or for pregnant travellers. A moderate-to-good level of physical fitness is required.',
			},
			{
				question: 'What is the minimum age for gorilla trekking?',
				answer:
					'The minimum age for gorilla trekking in Uganda is 15 years, as set by Uganda Wildlife Authority.',
			},
			{
				question: 'What is the minimum age for golden monkey tracking?',
				answer: 'The minimum age for golden monkey tracking at Mgahinga is 12 years.',
			},
			{
				question: 'When will I receive booking confirmation?',
				answer: 'Confirmation will be received at the time of booking.',
			},
		],
	},
};

export default data;
