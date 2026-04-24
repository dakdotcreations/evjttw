import type { SeedData } from './types.js';

/**
 * Locations required (must already exist in the database):
 *   - "Lake Mburo National Park"             (Day 2)
 *   - "Lake Bunyonyi"                        (Days 3–5)
 *   - "Mgahinga Gorilla National Park"       (Day 6 — golden monkeys)
 *   - "Bwindi Impenetrable National Park"    (Days 6 overnight & 7)
 *   - "Queen Elizabeth National Park"        (Days 8 & 9 incl. Ishasha)
 *   - "Kibale Forest National Park"          (Days 10 & 11)
 *   - "Murchison Falls National Park"        (Days 12 & 13)
 *   - "Kidepo Valley National Park"          (Days 14 & 15)
 *   - "Sipi Falls"                           (Days 17 & 18)
 *   Note: Day 1 (Entebbe arrival), Day 16 (Kotido/Moroto — no DB record),
 *         and Day 19 (departure) have no locationName.
 */
const data: SeedData = {
	itinerary: {
		id: 'seed-best-uganda-19day',
		title: '19 Days Best Safari in Uganda',
		summary:
			"An epic 19-day circuit of the Pearl of Africa — from Lake Mburo and Lake Bunyonyi in the south, to golden monkeys at Mgahinga, mountain gorillas in Bwindi, tree-climbing lions at Ishasha, chimp trekking in Kibale, big game at Murchison Falls, the remote wilderness of Kidepo, and a grand finale at Sipi Falls.",
		description: `Embark on a 19-day adventure that captures the very essence of Uganda, often referred to as the Pearl of Africa. This comprehensive safari takes you through Uganda's most celebrated attractions — from the lush Bwindi Impenetrable Forest and the vast savannahs of Kidepo Valley to the crater lakes of Fort Portal and the thundering cascade of Murchison Falls.

Begin in the south with zebra walks at Lake Mburo, a peaceful stay on the shores of Lake Bunyonyi, and golden monkey tracking at Mgahinga before entering the ancient mist-covered rainforest of Bwindi for mountain gorilla trekking — one of the greatest wildlife encounters on earth. Continue north through the iconic Ishasha sector of Queen Elizabeth National Park, famous for its tree-climbing lions, and into the chimpanzee stronghold of Kibale Forest.

The journey sweeps north to Murchison Falls National Park — Uganda's largest — for big-game drives and a Victoria Nile boat cruise, then pushes further into the remote Karamoja frontier for game drives and a cultural visit with the Jie people of the Karamojong tribe at Nakapelemoru. The tour concludes with a scenic traverse across the Pian Upe Wildlife Reserve to the beautiful Sipi Falls on the slopes of Mount Elgon, with waterfalls, natural pools, and a coffee farm visit before returning to Entebbe.

This is a private tour — only your group will participate.`,
		durationDays: 19,
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
				"Arrive at Entebbe International Airport where your driver/guide will meet you at the arrivals lounge holding an Evajo Tours & Travel sign. Transfer to your guesthouse in Entebbe — approximately 10 minutes from the airport. Check in, freshen up, and relax after your journey. Your guide will brief you on the 19-day adventure ahead. Entebbe is a charming lakeside town on the shores of Lake Victoria — the world's second-largest freshwater lake — and the surrounding botanical gardens are worth an evening stroll. Dinner and overnight at Entebbe guesthouse.",
			highlight: 'Warm welcome to the Pearl of Africa — shores of Lake Victoria',
			durationDays: 1,
		},
		{
			stepNumber: 2,
			title: 'Entebbe to Lake Mburo National Park via the Equator',
			description:
				"After a Ugandan breakfast, begin the drive south-west to Lake Mburo National Park with a stopover at the Uganda Equator monument at Kayabwe — one of the two points where the tarmac Kampala–Mbarara road crosses the equator. Enjoy the famous water-flow experiment and take photos straddling the line between the Northern and Southern Hemispheres. Continue to Lake Mburo National Park — Uganda's smallest savannah park and the only park in the country where zebras are found. Arrive in the late afternoon for an evening game drive, spotting zebras, buffaloes, impalas, warthogs, and waterbucks at close range. Dinner and overnight at the lodge.",
			highlight: 'Equator experience + zebras at Lake Mburo National Park',
			durationDays: 1,
			locationName: 'Lake Mburo National Park',
		},
		{
			stepNumber: 3,
			title: 'Lake Mburo Nature Walk & Lake Bunyonyi — Relaxation & Island Exploration',
			description:
				"Morning guided walking safari in Lake Mburo — the best way to get close to zebras, Defassa waterbuck, eland, topi, and Cape buffalo on foot with an armed ranger guide. The lakeside trail also passes through acacia woodland rich in birds. After the walk, drive south through the scenic Kigezi Highlands to Lake Bunyonyi — one of the most beautiful lakes in Africa, sitting at 1,962 m above sea level, bilharzia-free, and ringed by steeply terraced hills. Spend the next two days relaxing at the resort, exploring the lake's 29 islands by canoe or motorboat, visiting Punishment Island (where unmarried mothers were once exiled), shopping at local markets, kayaking, and enjoying the cool highland air. Dinners and overnights at lodge on Lake Bunyonyi.",
			highlight: 'Walking safari at Lake Mburo + 2 leisure days on Lake Bunyonyi',
			durationDays: 3,
			locationName: 'Lake Bunyonyi',
		},
		{
			stepNumber: 6,
			title: 'Golden Monkey Tracking at Mgahinga & Transfer to Bwindi',
			description:
				"After breakfast, drive to Mgahinga Gorilla National Park for golden monkey tracking — a briefing at the park headquarters is followed by a guided trek into the bamboo forests in search of the habituated golden monkey family (Cercopithecus kandti). Golden monkeys live at lower altitudes so the trek rarely exceeds 3 hours, and you are rewarded with 1 hour in the company of these vivid, lively primates as they leap through bamboo stems and groom each other in family groups. Minimum age 12 years. After tracking, drive north through the Kigezi Highlands to Bwindi Impenetrable National Park. Dinner and overnight near Bwindi.",
			highlight: 'Golden monkey tracking in the bamboo forests of Mgahinga',
			durationDays: 1,
			locationName: 'Bwindi Impenetrable National Park',
		},
		{
			stepNumber: 7,
			title: 'Mountain Gorilla Trekking — Bwindi Impenetrable Forest',
			description:
				"Receive an early morning briefing by Uganda Wildlife Authority rangers at park headquarters — covering gorilla behaviour, forest rules, and health precautions. Transfer to the trekking start point and enter the ancient Bwindi forest. The search for the habituated gorilla family can take anywhere from 30 minutes to 6 hours depending on where they have moved; the trek involves scrambling through dense undergrowth, over mossy roots, and up steep ridges. When you hear the first crash of vegetation and the jungle parts to reveal silverbacks, juveniles at play, and nursing mothers — the effort instantly becomes worthwhile. Spend one unforgettable hour with the gorillas before trekking back. Dinner and overnight near Bwindi.",
			highlight: 'Mountain gorilla trekking permit (USD 700 per person) included',
			durationDays: 1,
			locationName: 'Bwindi Impenetrable National Park',
		},
		{
			stepNumber: 8,
			title: 'Bwindi to Queen Elizabeth NP via Ishasha — Tree-Climbing Lions',
			description:
				"After breakfast, drive north through the Kigezi Highlands to Queen Elizabeth National Park, entering through the remote Ishasha sector in the south — the only place in Africa (outside the Congo) where lions regularly climb and rest in large fig trees. Spend the afternoon on a game drive through the Ishasha circuit, scanning the broad branches of towering fig trees for lions at rest, and the grassland below for Uganda Kob, topi, buffalo, elephant, and sitatunga in the marshes. The sector's remoteness and low visitor numbers make for an exclusive and atmospheric safari experience. Dinner and overnight at the lodge.",
			highlight: 'Tree-climbing lions at Ishasha — unique to this corner of Africa',
			durationDays: 1,
			locationName: 'Queen Elizabeth National Park',
		},
		{
			stepNumber: 9,
			title: 'Sunrise Game Drive & Kazinga Channel Boat Cruise — Queen Elizabeth NP',
			description:
				"An early morning game drive across Queen Elizabeth's grassy plains, tropical forests, volcanic craters, and river valleys — scanning for nocturnal animals still active at dawn: lions, leopards, hyenas, giant forest hogs, and Cape buffalo. Return for lunch, then in the afternoon board a boat on the famous Kazinga Channel — the natural waterway linking Lake George to Lake Edward — for a 2-hour cruise alongside one of the highest hippo concentrations in Africa. Nile crocodiles line the banks, African fish eagles call overhead, and enormous herds of buffalo and elephant come down to drink as the boat drifts past. Dinner and overnight at the lodge.",
			highlight: 'Kazinga Channel boat cruise — hippos, crocs & elephants',
			durationDays: 1,
			locationName: 'Queen Elizabeth National Park',
		},
		{
			stepNumber: 10,
			title: 'Morning Game Drive & Transfer to Kibale — Bigodi Swamp Walk',
			description:
				"Early morning game drive before checking out — a final sweep through the park for elephants, lions, and the vivid Uganda Kob. Then drive north through the scenic Fort Portal area to Kibale Forest National Park — home to the highest density of primates in Africa. In the afternoon, join a guided community walk through Bigodi Wetland Sanctuary bordering the park: a community-managed papyrus swamp home to 8 primate species (including red colobus, grey-cheeked mangabeys, and black-and-white colobus), over 200 bird species, monitor lizards, and butterflies. Dinner and overnight near Kibale.",
			highlight: 'Bigodi Wetland Sanctuary — 8 primate species in a papyrus swamp',
			durationDays: 1,
			locationName: 'Kibale Forest National Park',
		},
		{
			stepNumber: 11,
			title: 'Chimpanzee Trekking & Crater Lakes Hike — Kibale Forest',
			description:
				"Morning briefing at Kibale National Park headquarters before entering the forest for chimpanzee trekking (permit USD 200 per person). Track habituated chimpanzee communities with experienced ranger guides through the world's most diverse primate forest — spending one hour observing chimps as they groom, play, feed, and swing through the canopy at close range. The forest is also home to L'Hoest's monkeys, blue monkeys, red-tailed monkeys, olive baboons, and forest elephants. In the afternoon, hike to the highest vantage point above the park for panoramic views of the stunning Fort Portal crater lakes — dozens of deep volcanic lakes set among rolling hills and tea plantations. Dinner and overnight near Kibale.",
			highlight: 'Chimpanzee trekking + Fort Portal crater lakes viewpoint hike',
			durationDays: 1,
			locationName: 'Kibale Forest National Park',
		},
		{
			stepNumber: 12,
			title: 'Transfer to Murchison Falls National Park',
			description:
				"After breakfast, begin the long but scenic drive north to Murchison Falls National Park — a journey of approximately 5 to 7 hours through Ugandan countryside, passing tea estates, tropical forest fringes, small market towns, and the rolling Albertine Rift landscape. Murchison Falls National Park is Uganda's largest national park, bisected by the River Nile where it squeezes through a 7-metre cleft and drops 40 metres in a thunderous cascade. Arrive in time for dinner and overnight at the lodge.",
			durationDays: 1,
			locationName: 'Murchison Falls National Park',
		},
		{
			stepNumber: 13,
			title: 'Sunrise Game Drive & Victoria Nile Boat Cruise — Murchison Falls',
			description:
				"Pre-dawn breakfast for a sunrise game drive across the northern savannah — Murchison Falls is famous for its population of Rothschild's giraffes, one of the world's most endangered giraffe subspecies, alongside massive elephant herds, Cape buffalo, Uganda Kob, oribi, waterbuck, lions, and leopards. Return for lunch, then in the afternoon board a boat for a 3-hour safari upstream on the Victoria Nile to the base of Murchison Falls — passing Nile crocodiles, hippos, shoebill storks (in the papyrus channels), herons, pelicans, and African skimmers. Optional: after the boat, hike to the top of the falls for a dramatic viewpoint of the Nile forcing through the 7-metre cleft. Dinner and overnight at the lodge.",
			highlight: 'Rothschild\'s giraffes + Victoria Nile boat safari to Murchison Falls',
			durationDays: 1,
			locationName: 'Murchison Falls National Park',
		},
		{
			stepNumber: 14,
			title: 'Transfer to Kidepo Valley National Park via Gulu & Kitgum',
			description:
				"After breakfast, set off on the long drive north-east to Kidepo Valley National Park — Uganda's most remote national park and one of Africa's finest wildernesses. The route passes through Gulu City and Kitgum District, cutting through the vast semi-arid landscapes of Karamoja with traditional homesteads, acacia woodlands, and dramatic mountain ridges. Stop for lunch en route. Arrive at Kidepo in time for a brief evening game drive or sunset at the lodge. Dinner and overnight at the lodge.",
			durationDays: 1,
			locationName: 'Kidepo Valley National Park',
		},
		{
			stepNumber: 15,
			title: 'Guided Walk & Afternoon Game Drive — Kidepo Valley NP',
			description:
				"Begin early with a guided walking safari in Kidepo — an armed ranger guide leads you through the Narus Valley on foot, allowing close encounters with ostriches, eland, zebras, and buffalo that are impossible to replicate from a vehicle. The walk also passes through the area of the Kanangorok Hot Springs — a geothermal feature unique to Kidepo and not found in any other Ugandan national park. In the afternoon, head out for a full game drive across the Narus Valley in search of the park's impressive predator population: lions, leopards, cheetahs, and jackals, as well as massive elephant herds, giraffes, and over 475 bird species. Dinner and overnight at the lodge.",
			highlight: 'Kanangorok Hot Springs + guided walking safari in Kidepo',
			durationDays: 1,
			locationName: 'Kidepo Valley National Park',
		},
		{
			stepNumber: 16,
			title: 'Kidepo to Kotido — Nakapelemoru Village & Transfer to Moroto',
			description:
				"After an early breakfast, drive south to Kotido District for a cultural visit to Nakapelemoru — reportedly the largest traditional village in East Africa and home to the Jie people, a sub-group of the Karamojong tribe. Meet the community leaders, observe daily life in the kraals, learn about the Karamojong's cattle-centric culture, their colourful blankets and beadwork, and their traditional dances. The Jie people have maintained their nomadic pastoral lifestyle for centuries despite modern pressures. After the cultural visit, continue south to Moroto town for dinner and overnight at the lodge.",
			highlight: 'Nakapelemoru — the largest traditional village in East Africa',
			durationDays: 1,
		},
		{
			stepNumber: 17,
			title: 'Moroto to Sipi Falls via Pian Upe Wildlife Reserve',
			description:
				"After breakfast, drive south from Moroto to Sipi Falls through the Pian Upe Wildlife Reserve — Uganda's second-largest game reserve, a semi-arid expanse on the escarpment of Mount Elgon hosting roan antelope, eland, ostriches, and large buffalo herds. The route offers stunning views of the Mount Elgon massif as you descend into the Mbale area. Arrive at Sipi Falls — a series of three dramatic waterfalls on the slopes of Mount Elgon at 1,500 m, with views across the plains of eastern Uganda. Settle in and enjoy the cool highland air. Dinner and overnight near Sipi Falls.",
			highlight: 'Scenic drive through Pian Upe Wildlife Reserve to Sipi Falls',
			durationDays: 1,
			locationName: 'Sipi Falls',
		},
		{
			stepNumber: 18,
			title: 'Sipi Falls Hike, Natural Pool Swim & Coffee Farm Tour',
			description:
				"A full day to explore Sipi Falls and the surrounding Sebei cultural landscape. Begin with a guided hike to the top of the main falls — the largest of the three cascades drops 100 metres into a misty gorge with a natural pool below ideal for a refreshing swim. The trail continues to two more waterfalls through banana plantations and Sebei villages. In the afternoon, visit a local Arabica coffee farmer to learn the full coffee production process — from cherry picking and pulping on the farm to wet fermentation, sun drying on raised beds, hulling, and finally roasting and tasting a cup of single-origin Mount Elgon Arabica. Dinner and overnight near Sipi Falls.",
			highlight: 'Sipi Falls hike, natural pool swim & Arabica coffee farm tour',
			durationDays: 1,
			locationName: 'Sipi Falls',
		},
		{
			stepNumber: 19,
			title: 'Sipi Falls to Entebbe — Final Drive & Departure',
			description:
				"After breakfast, begin the drive back west to Entebbe — a journey of approximately 5 to 6 hours through Iganga, Jinja, and Kampala. Stop for lunch en route and take time for any final souvenir shopping in Kampala or Jinja. Arrive at Entebbe International Airport at least 2 hours before your scheduled international flight. Your driver/guide will assist with luggage and check-in formalities. We hope you carry home extraordinary memories and a deep love for the Pearl of Africa.",
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
			'Kanangorok Hot Springs experience at Kidepo Valley National Park',
			'Karamojong/IK cultural visit — Nakapelemoru village',
			'Equator experience and photo moments',
			'Game drives throughout the tour',
			'Victoria Nile boat cruise at Murchison Falls',
			'Kazinga Channel boat cruise at Queen Elizabeth NP',
			'Bigodi Wetland Sanctuary guided swamp walk',
			'Sipi Falls hiking guide',
			'Coffee farm tour at Sipi Falls',
			'Boat and canoe rides at Lake Bunyonyi',
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
				question: 'Are there any fitness requirements for gorilla trekking?',
				answer:
					'Gorilla trekking involves hiking through dense forest on steep, uneven terrain for up to 6 hours. It is not suitable for travellers with serious heart conditions, back problems, or other significant medical conditions, or for pregnant travellers. A moderate-to-good level of physical fitness is required. Consult your doctor if you have any concerns.',
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
