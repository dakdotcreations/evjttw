import type { SeedData } from './types.js';

/**
 * Locations required (must already exist in the database):
 *   - "Lake Mburo National Park"             (Days 2–3)
 *   - "Lake Bunyonyi"                        (Days 4–5)
 *   - "Mgahinga Gorilla National Park"       (Days 6–7)
 *   - "Bwindi Impenetrable National Park"    (Days 8–9)
 *   - "Queen Elizabeth National Park"        (Days 10–11)
 *   - "Kibale Forest National Park"          (Days 12–13)
 *   - "Murchison Falls National Park"        (Days 14–15)
 *   - "Kidepo Valley National Park"          (Days 16–17)
 *   - "Sipi Falls"                           (Day 18)
 *   - "Jinja - Source of the Nile"           (Day 19)
 *   Note: Day 1 (Entebbe arrival) and Day 20 (departure) have no locationName.
 */
const data: SeedData = {
	itinerary: {
		id: 'seed-adventure-uganda-20day',
		title: '20 Days Adventure Safari in Uganda',
		summary:
			"A comprehensive 20-day circuit of the Pearl of Africa — zebras at Lake Mburo, canoes on Lake Bunyonyi, golden monkeys at Mgahinga, mountain gorillas in Bwindi, Kazinga Channel boat cruise, chimpanzee trekking in Kibale, big game at Murchison Falls, the remote wilderness of Kidepo, Sipi Falls, and a grand finale at the Source of the Nile in Jinja.",
		description: `Embark on a 20-day adventure that immerses you in the wonders of Uganda, often hailed as the Pearl of Africa. From the lush forests of Bwindi Impenetrable National Park to the vast savannahs of Kidepo Valley, this safari promises unforgettable encounters with diverse wildlife, stunning landscapes, and vibrant cultures.

The journey begins gently in the south: morning walks among zebras at Lake Mburo, peaceful days on the terraced shores of Lake Bunyonyi, and golden monkey tracking in the bamboo forests of Mgahinga. Then enter the ancient mist of Bwindi Impenetrable Forest for one of the world's greatest wildlife encounters — mountain gorilla trekking. Continue north through Queen Elizabeth National Park for the famous Kazinga Channel boat cruise, Kibale Forest for chimpanzee trekking, and Murchison Falls for a Victoria Nile boat safari to the base of the world's most powerful waterfall.

Push further into the remote Karamoja frontier for game drives and cultural encounters at Kidepo Valley, before looping south through Sipi Falls — with its triple cascades, natural pools, and Arabica coffee farms — and finally to Jinja on the shores of Lake Victoria for optional white-water rafting and bungee jumping at the Source of the Nile.

This is a private tour — only your group will participate.`,
		durationDays: 20,
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
				"Arrive at Entebbe International Airport where your driver/guide will meet you at the arrivals lounge holding an Evajo Tours & Travel sign. Transfer to your guesthouse in Entebbe — approximately 10 minutes from the airport. Check in, freshen up, and relax. Your guide will brief you on the 20-day adventure ahead. Entebbe is a charming lakeside town on the shores of Lake Victoria — if you arrive early, a walk through the nearby Entebbe Botanical Gardens is a wonderful way to stretch your legs and spot the first birds of the trip. Dinner and overnight at Entebbe guesthouse.",
			highlight: 'Warm welcome to the Pearl of Africa',
			durationDays: 1,
		},
		{
			stepNumber: 2,
			title: 'Lake Mburo National Park — Nature Walk & Game Drives',
			description:
				"Drive south-west from Entebbe to Lake Mburo National Park — Uganda's smallest savannah park and the only national park in the country where zebras roam freely. Arrive for an afternoon game drive spotting zebras, impalas, buffaloes, topi, warthogs, and Defassa waterbuck. On the second morning, join a guided walking safari with an armed ranger — the best way to approach wildlife on foot, including zebras, eland, and Cape buffalo. The lake margins offer exceptional birding: malachite kingfisher, African fish eagle, blue-headed weaver, herons, pelicans, and the rare shoebill can sometimes be spotted in the papyrus. Optional: afternoon boat trip on Lake Mburo. Dinner and overnights at the lodge.",
			highlight: 'Guided walking safari among zebras — Uganda\'s only zebra habitat',
			durationDays: 2,
			locationName: 'Lake Mburo National Park',
		},
		{
			stepNumber: 4,
			title: 'Lake Bunyonyi — Canoe, Island Exploration & Relaxation',
			description:
				"Drive south through the Kigezi Highlands to Lake Bunyonyi — one of the most beautiful lakes in Africa, sitting at 1,962 m above sea level, bilharzia-free, and ringed by steeply terraced hills. With 29 islands, the lake is a world apart: spend two days exploring by canoe or motorboat, visiting Punishment Island (where unmarried mothers were once exiled), buying crafts from local market traders on Bushara Island, kayaking, and simply enjoying the cool highland air and tranquil scenery. Optional zip-lining is available nearby. Dinners and overnights at the lodge.",
			highlight: 'Canoe among 29 islands on Africa\'s most beautiful lake',
			durationDays: 2,
			locationName: 'Lake Bunyonyi',
		},
		{
			stepNumber: 6,
			title: 'Mgahinga Gorilla National Park — Golden Monkey Tracking & Nature Walks',
			description:
				"Drive to Mgahinga Gorilla National Park — Uganda's smallest national park and the only Ugandan park that protects all three Virunga volcanoes. Over two days, the main highlight is golden monkey tracking: a briefing at the park headquarters precedes a guided trek into the bamboo forests in search of the habituated golden monkey family (Cercopithecus kandti). These vivid primates — golden-orange flanks against jet-black faces — live in groups of up to 80 and are found only in the Virunga highlands. Each tracking session allows one hour with the monkeys. Additional activities include nature walks through the bamboo and hagenia-hypericum forest, with excellent birding and views of Gahinga, Sabyinyo, and Muhabura volcanoes. Dinners and overnights near Mgahinga.",
			highlight: 'Golden monkey tracking in the Virunga bamboo forest',
			durationDays: 2,
			locationName: 'Mgahinga Gorilla National Park',
		},
		{
			stepNumber: 8,
			title: 'Bwindi Impenetrable Forest — Gorilla Trekking & Cultural Visit',
			description:
				"Drive to Bwindi Impenetrable National Park — a UNESCO World Heritage Site and one of the oldest rainforests in Africa, home to roughly half the world's remaining mountain gorillas. On the first day, participate in a cultural experience with the Batwa — Africa's oldest forest-dwelling people — learning about their traditional fire-setting, medicinal plant knowledge, and hunting techniques through the Batwa Trail. On the second day, the main event: gorilla trekking. Receive an early briefing by Uganda Wildlife Authority rangers before entering the dense ancient forest. The search can take 30 minutes to 6 hours. When you find the habituated family, spend one magical hour watching silverbacks at rest, juveniles playing, and mothers nursing in the mist. Dinners and overnights near Bwindi.",
			highlight: 'Mountain gorilla trekking permit (USD 700 per person) included',
			durationDays: 2,
			locationName: 'Bwindi Impenetrable National Park',
		},
		{
			stepNumber: 10,
			title: 'Queen Elizabeth National Park — Game Drive & Kazinga Channel Boat Cruise',
			description:
				"Drive north through the Kigezi Highlands to Queen Elizabeth National Park, entering through the Ishasha sector — famous for its tree-climbing lions that rest in large fig trees. Over two days, enjoy a sunrise game drive across the park's open savannah, tropical forests, volcanic craters, and river valleys — scanning for lions, leopards, elephants, Cape buffalo, Uganda Kob, Defassa waterbuck, topi, giant forest hogs, and the Rwenzori Mountains backdrop. The afternoon highlight is a boat cruise on the Kazinga Channel — the natural waterway linking Lake George to Lake Edward, hosting one of the highest hippo concentrations in Africa alongside Nile crocodiles, African fish eagles, herons, pelicans, and elephants drinking at the water's edge. Dinners and overnights at the lodge.",
			highlight: 'Kazinga Channel boat cruise + tree-climbing lions at Ishasha',
			durationDays: 2,
			locationName: 'Queen Elizabeth National Park',
		},
		{
			stepNumber: 12,
			title: 'Kibale National Park — Chimpanzee Trekking & Forest Walks',
			description:
				"Drive north to Kibale Forest National Park — home to the highest density of primates in Africa and the world's premier destination for chimpanzee trekking. Over two days, enter the forest for chimpanzee tracking (permit USD 200 per person): experienced ranger guides lead you through the ancient forest to locate habituated chimpanzee communities, allowing one hour watching them groom, play, feed, and swing through the canopy. The forest also hosts 12 other primate species including L'Hoest's monkeys, red-tailed monkeys, grey-cheeked mangabeys, and black-and-white colobus. Guided forest walks on the second day explore the Bigodi Wetland Sanctuary — a community-managed papyrus swamp bordering the park, rich in birds, primates, and butterflies. Dinners and overnights near Kibale.",
			highlight: 'Chimpanzee trekking in the world\'s most primate-rich forest',
			durationDays: 2,
			locationName: 'Kibale Forest National Park',
		},
		{
			stepNumber: 14,
			title: 'Murchison Falls National Park — Game Drives & Victoria Nile Boat Safari',
			description:
				"Drive north to Murchison Falls National Park — Uganda's largest national park, bisected by the River Nile where it forces itself through a 7-metre cleft and drops 40 metres in a thunderous cascade. Over two days: a sunrise game drive across the northern savannah for Rothschild's giraffes, massive elephant herds, Cape buffalo, Uganda Kob, oribi, waterbuck, lions, and leopards; a Victoria Nile boat safari upstream to the base of the falls, passing Nile crocodiles, hippos, shoebill storks in the papyrus channels, herons, pelicans, and African skimmers as the thunder of the falls grows louder; and a walk to the top of Murchison Falls for a dramatic view of the Nile forcing through the cleft — once described by Winston Churchill as the most spectacular event in the Nile's entire length. Dinners and overnights at the lodge.",
			highlight: 'Victoria Nile boat safari + top of Murchison Falls walk',
			durationDays: 2,
			locationName: 'Murchison Falls National Park',
		},
		{
			stepNumber: 16,
			title: 'Kidepo Valley National Park — Game Drives & Cultural Encounters',
			description:
				"Drive north-east to Kidepo Valley National Park — Uganda's most remote national park and one of Africa's finest wildernesses, ranked by CNN among the top parks on the continent. Over two days, explore the vast Narus Valley in search of species found nowhere else in Uganda: ostriches, Burchell's zebras, cheetahs, caracals, and bat-eared foxes, alongside massive elephant herds, lions, leopards, buffalo, giraffes, and eland. The park hosts over 475 bird species. Beyond wildlife, Kidepo offers rare cultural encounters with the semi-nomadic Karamojong people — visit a traditional kraal to see their colourful blankets, beadwork, cattle culture, and traditional dances. Optional: guided walk to the Kanangorok Hot Springs — a geothermal feature unique to Kidepo. Dinners and overnights at the lodge.",
			highlight: 'Ostriches, cheetahs & Karamojong culture in Uganda\'s last frontier',
			durationDays: 2,
			locationName: 'Kidepo Valley National Park',
		},
		{
			stepNumber: 18,
			title: 'Sipi Falls — Waterfall Hike, Natural Pool & Coffee Farm Tour',
			description:
				"Drive south through the Karamoja landscape and Pian Upe Wildlife Reserve to Sipi Falls — a spectacular series of three waterfalls on the slopes of Mount Elgon at 1,500 m, with views across the plains of eastern Uganda. In the morning, take a guided hike to the top of the main falls — the largest cascade drops 100 metres into a misty gorge with a natural pool at the base, ideal for a refreshing swim. In the afternoon, visit a local Arabica coffee farmer to experience the full production process: cherry picking, pulping, wet fermentation, sun drying on raised beds, hulling, roasting, and finally tasting a cup of single-origin Mount Elgon Arabica. Dinner and overnight near Sipi Falls.",
			highlight: 'Sipi Falls hike + Mount Elgon Arabica coffee farm tour',
			durationDays: 1,
			locationName: 'Sipi Falls',
		},
		{
			stepNumber: 19,
			title: 'Jinja — Source of the Nile & Adventure Activities',
			description:
				"Drive south-west to Jinja — the adventure capital of East Africa — situated where the River Nile flows out of Lake Victoria. Board a boat for a cruise to the spot where explorer John Hanning Speke declared the source of the Nile in 1862, viewing the Speke Monument and the swirling waters where the world's longest river begins its 6,700 km journey to the Mediterranean. For the adventurous, optional activities in Jinja include white-water rafting on Grade 4 and 5 rapids (the best in Africa), bungee jumping 44 metres above the Nile, quad biking, kayaking, and horseback riding along the river. Dinner and overnight at a lodge in Jinja.",
			highlight: 'Source of the Nile boat cruise + optional white-water rafting & bungee jumping',
			durationDays: 1,
			locationName: 'Jinja - Source of the Nile',
		},
		{
			stepNumber: 20,
			title: 'Departure from Entebbe International Airport',
			description:
				"After breakfast, drive from Jinja to Entebbe International Airport — approximately 2 hours along the Jinja–Kampala highway. Your driver/guide will ensure you arrive at least 2–3 hours before your scheduled international departure. Stop for any last-minute souvenir shopping in Kampala if time permits. We hope you carry home extraordinary memories and a deep love for the Pearl of Africa.",
			highlight: 'Farewell to Uganda — the Pearl of Africa',
			durationDays: 1,
		},
	],

	meta: {
		pickup: 'Entebbe International Airport (EBB)',
		meetingPoint:
			'Entebbe International Airport arrivals lounge — your guide will be holding an Evajo Tours & Travel sign.',

		includes: [
			'Accommodation as specified throughout the tour',
			'All meals as indicated (breakfast, lunch, dinner)',
			'Airport pickup and drop-off at Entebbe',
			'All park entrance fees and vehicle park entry fees',
			'Mountain gorilla trekking permit at Bwindi Impenetrable (USD 700 per person)',
			'Chimpanzee trekking permit at Kibale National Park (USD 200 per person)',
			'Golden monkey tracking at Mgahinga National Park',
			'Batwa/Pygmy community cultural experience',
			'Karamojong cultural village visit at Kidepo',
			'Game drives throughout the tour',
			'Victoria Nile boat cruise at Murchison Falls',
			'Kazinga Channel boat cruise at Queen Elizabeth NP',
			'Bigodi Wetland Sanctuary guided walk',
			'Sipi Falls hiking guide',
			'Coffee farm tour at Sipi Falls',
			'Source of the Nile boat cruise at Jinja',
			'Canoe/boat rides at Lake Bunyonyi',
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
			'Optional activities at Jinja (white-water rafting, bungee jumping, quad biking)',
			'Optional zip-lining at Lake Bunyonyi',
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
				question: 'Are there fitness requirements for gorilla trekking?',
				answer:
					'Gorilla trekking involves hiking through dense, steep forest for up to 6 hours. It is not suitable for travellers with serious heart conditions, back problems, or other significant medical conditions, or for pregnant travellers. A moderate-to-good level of physical fitness is required. Please consult your doctor if you have any concerns.',
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
				question: 'Are the adventure activities at Jinja safe?',
				answer:
					'White-water rafting and bungee jumping at Jinja are operated by established, internationally certified operators with strong safety records. These are optional activities not included in the tour price — your guide can assist with booking on the day.',
			},
			{
				question: 'When will I receive booking confirmation?',
				answer: 'Confirmation will be received at the time of booking.',
			},
		],
	},
};

export default data;
