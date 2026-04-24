import type { SeedData } from './types.js';

/**
 * Locations required (must already exist in the database):
 *   - "Jinja - Source of the Nile"          (Day 1)
 *   - "Mabira Forest"                        (Day 1 — stopover)
 *   - "Ziwa Rhino Sanctuary"                 (Day 2)
 *   - "Kidepo Valley National Park"          (Days 3 & 4)
 *   - "Murchison Falls National Park"        (Days 5 & 6)
 *   - "Kibale Forest National Park"          (Days 7 & 8)
 *   - "Semuliki National Park"               (Day 8 — afternoon)
 *   - "Queen Elizabeth National Park"        (Days 9 & 10)
 *   - "Bwindi Impenetrable National Park"    (Days 11 & 12)
 *   - "Mgahinga Gorilla National Park"       (Day 13 — golden monkeys)
 *   - "Lake Bunyonyi"                        (Day 13 — canoe & overnight)
 *   - "Lake Mburo National Park"             (Days 14 & 15)
 *   - "Entebbe Botanical Gardens"            (Day 15 — departure)
 */
const data: SeedData = {
	itinerary: {
		id: 'seed-around-uganda-15day',
		title: '15 Days Around Uganda Safari',
		summary:
			"The ultimate north-to-south Uganda safari — from the untouched wilderness of Kidepo Valley to mountain gorilla trekking in Bwindi, with Murchison Falls, Kibale, Semuliki, Queen Elizabeth, and Lake Mburo along the way.",
		description: `Experience Uganda from North to South: Kidepo Valley National Park to Bwindi Impenetrable National Park.

Start by heading east to the Source of the Nile in Jinja and tracking white rhinos at Ziwa Rhino Sanctuary, then journey north to the untouched wilderness of Kidepo Valley National Park — ranked among Africa's finest wildernesses for its massive elephant herds, lions, giraffes, zebras, and a cultural encounter with the Karamojong people. From Kidepo, travel south-west to Murchison Falls National Park for big-game drives and a Victoria Nile boat cruise, before entering the lush forests of Kibale and the unique lowland ecosystem of Semuliki National Park with its Sempaya hot springs.

Continue through the scenic Fort Portal crater-lake region and the historic Amabere Ga'Nyinamwiru Caves to Queen Elizabeth National Park for the famous Kazinga Channel boat safari, before tracking chimpanzees at Kalinzu Forest Reserve and spotting tree-climbing lions in the Ishasha sector on the way south. The final chapters bring you face-to-face with mountain gorillas in Bwindi, golden monkeys in Mgahinga, a canoe ride on Lake Bunyonyi, and a walking safari in Lake Mburo, before the equator crossing back to Entebbe.

This is a private tour — only your group will participate. Departure is at 07:30 am from Entebbe on Day 1.`,
		durationDays: 15,
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
			title: 'Sezibwa Falls, Mabira Forest & Source of the Nile — Jinja',
			description:
				"After breakfast, drive east from Entebbe through Kampala along the Kampala-Jinja highway, passing coffee, tea, and sugar plantations and colourful roadside markets. Stop at Sezibwa Falls — a Buganda cultural heritage site with twin rivers, beautiful waterfalls, and a cool atmosphere. Spend an hour hiking the rocks, watching birds, and hearing the myths and ancient traditional practices still observed here. Continue to Mabira Central Forest Reserve — the largest forest in central Uganda — for a 2-hour guided trek to track habituated Grey-cheeked Mangabeys, watch birds, monkeys, and squirrels, or experience zip-lining through the jungle canopy. Drive to Jinja for lunch, then board a boat for a sunset cruise to the spot where John Speke discovered the source of the Nile and view the Speke Monument. Overnight in Jinja.",
			highlight: 'Sunset boat safari to the Source of the Nile — Speke Monument',
			durationDays: 1,
			locationName: 'Jinja - Source of the Nile',
		},
		{
			stepNumber: 2,
			title: 'White Rhino Tracking at Ziwa Rhino Sanctuary & Transfer to Gulu',
			description:
				"After breakfast, drive north with a stopover at Ziwa Rhino Sanctuary — the only place in Uganda where southern white rhinos can be tracked on foot in the wild. Arrive at approximately 10:00 am and enter the territory of the white rhinos accompanied by well-trained rangers who guide you through the bush to locate these magnificent and endangered creatures. Spend time observing them at close range in their natural habitat before continuing north to Gulu City. Dinner and overnight in Gulu.",
			highlight: 'White rhino tracking on foot — the only place in Uganda',
			durationDays: 1,
			locationName: 'Ziwa Rhino Sanctuary',
		},
		{
			stepNumber: 3,
			title: 'Transfer to Kidepo Valley National Park — Afternoon Game Drive',
			description:
				"After breakfast, drive north-east to Kidepo Valley National Park — Uganda's most isolated national park and among Africa's finest wildernesses. The drive takes you through dramatic Karamojong landscapes with splendid views of the northeastern frontier. Arrive in the afternoon for lunch, then set out for a sunset game drive across the vast Narus Valley in search of zebras, elephants, buffaloes, giraffes, lions, eland, ostriches, and the park's impressive bird life. Dinner and overnight at the lodge.",
			highlight: "Africa's finest wilderness — Kidepo Valley, Uganda's most remote park",
			durationDays: 1,
			locationName: 'Kidepo Valley National Park',
		},
		{
			stepNumber: 4,
			title: 'Sunrise Game Drive & Karamojong/IK Cultural Experience — Kidepo',
			description:
				"Begin before dawn for a sunrise game drive with a ranger guide who has extensive knowledge of the park. Kidepo is known for its massive elephant population, huge buffalo herds, wide array of bird species, giraffes, lions, antelope, waterbucks, and elusive leopards in the trees. The park also hosts species not found elsewhere in Uganda, including ostriches and the Kanarok Hot Springs. In the afternoon after lunch, visit a Karamojong or IK village community — spending time learning about their traditional kraals, manyattas, colourful blankets, traditional dance, and pastoral way of life in one of East Africa's most distinctive cultures. Evening at the lodge.",
			highlight: 'Karamojong cultural village visit + Kanarok Hot Springs experience',
			durationDays: 1,
			locationName: 'Kidepo Valley National Park',
		},
		{
			stepNumber: 5,
			title: 'Kidepo → Murchison Falls National Park — Afternoon Game Drive',
			description:
				"After breakfast, drive south-west through Karamojong country towards Murchison Falls National Park — Uganda's largest national park, bisected by the River Nile where it squeezes through the legendary 7-metre cleft creating the world's most powerful waterfall. Stop in Gulu town for lunch and any shopping before continuing to the park. Arrive in the afternoon for a sunset game drive across the northern savannah, expecting elephants, buffalo, giraffes, antelope, and giraffe, with fingers crossed for lion and leopard. Dinner and overnight at the lodge.",
			durationDays: 1,
			locationName: 'Murchison Falls National Park',
		},
		{
			stepNumber: 6,
			title: 'Sunrise Game Drive & Victoria Nile Boat Safari — Murchison Falls',
			description:
				"Pre-dawn breakfast so you can begin the morning game drive at sunrise — the golden hours when elephants, buffalo, antelope, lions, and leopards are most active across the northern savannah. Return for lunch, then board a boat for a 3-hour safari upstream on the Victoria Nile to the base of Murchison Falls, passing breathtaking scenery alongside crocodiles, hippos, and hundreds of waterbirds as you approach the thundering cascade. Dinner and overnight at the lodge.",
			highlight: 'Victoria Nile boat safari to the base of Murchison Falls',
			durationDays: 1,
			locationName: 'Murchison Falls National Park',
		},
		{
			stepNumber: 7,
			title: 'Top of the Falls Walk & Transfer to Kibale — Crater Lakes Walk',
			description:
				"A 30-minute to 1-hour walk to the top of Murchison Falls delivers a spectacular view of the 50 m-wide Nile funnelled through a 7-metre cleft, dropping 40 metres with a thunderous roar and creating a rainbow and plume of spray — once described as the most spectacular event on the Nile's 6,700 km length. Then drive south to Kibale Forest National Park, stopping for lunch in Fort Portal. In the afternoon choose a guided Crater Lakes and plantation walk through the picturesque volcanic landscape south of Fort Portal, with crater lakes some over 400 m deep, tea plantations, villages, and waterfalls. Dinner and overnight at the lodge.",
			highlight: 'Top of Murchison Falls walk + Fort Portal crater lakes',
			durationDays: 1,
			locationName: 'Kibale Forest National Park',
		},
		{
			stepNumber: 8,
			title: 'Bigodi Wetland / Chimp Tracking & Semuliki Hot Springs',
			description:
				"Early morning guided swamp walk in Bigodi Wetland Sanctuary — a community-managed wetland bordering Kibale Forest, home to 8 primate species, over 200 bird species, butterflies, and various reptiles. Alternatively, enter Kibale National Park for optional chimpanzee tracking (USD 200 per person additional fee): follow an experienced ranger guide to observe chimps grooming, playing, and foraging at close range in the world's premier primate forest. In the afternoon, transfer north-west to Semuliki National Park for a guided walk through the lowland tropical forest — spotting baboons, red-tailed colobus monkeys, vervet monkeys, diverse birds, and butterflies — and the famous Sempaya hot springs, which can boil an egg in just a few minutes. Dinner and overnight near Semuliki.",
			highlight: 'Sempaya hot springs + Bigodi Wetland primate walk',
			durationDays: 1,
			locationName: 'Semuliki National Park',
		},
		{
			stepNumber: 9,
			title: 'Amabere Caves & Transfer to Queen Elizabeth NP — Sunset Game Drive',
			description:
				"After an early breakfast, visit the Amabere Ga'Nyinamwiru Caves — a historic site believed to be the birthplace of the founding King of the Bachwezi, with stalactites resembling the breasts of a woman (Nyinamwiru), crater lake views, birds, and hill climbing. After the guided walk, drive south along the mystical Rwenzori Mountain range to Queen Elizabeth National Park. Arrive in the afternoon and set out for a sunset game drive across the savannah, spotting elephants, buffaloes, lions, bush pigs, and antelope families. Dinner and overnight at the lodge.",
			highlight: "Amabere Ga'Nyinamwiru Caves guided walk",
			durationDays: 1,
			locationName: 'Queen Elizabeth National Park',
		},
		{
			stepNumber: 10,
			title: 'Sunrise Game Drive & Kazinga Channel Boat Safari — Queen Elizabeth NP',
			description:
				"Early morning game drive across Queen Elizabeth's grassy plains, tropical forests, rivers, swamps, and volcanic craters — with the Rwenzori Mountains as a dramatic backdrop — scanning for lions, leopards, giant forest hogs, Cape buffalo, elephants, defassa waterbuck, Uganda Kob, topi, and bushbuck. Return for lunch, then in the afternoon head to the Kazinga Channel for a boat safari along the channel which hosts one of the highest concentrations of hippos in Africa, alongside Nile crocodiles, migrant birds, and herds of elephant and buffalo at the water's edge. Dinner and overnight at the lodge.",
			highlight: 'Kazinga Channel boat safari — highest hippo concentration in Africa',
			durationDays: 1,
			locationName: 'Queen Elizabeth National Park',
		},
		{
			stepNumber: 11,
			title: 'Chimp Tracking at Kalinzu Forest Reserve & Transfer to Bwindi via Ishasha',
			description:
				"After breakfast, stop at Kalinzu Central Forest Reserve for chimpanzee tracking (permit USD 50 per person, included). Continue through the Ishasha sector of southern Queen Elizabeth National Park — the only place in Africa outside the Congo where lions regularly climb trees, resting in the broad branches of fig trees above the savannah. Then drive through the spectacular Kigezi Highlands — the 'Switzerland of Africa' — through terraced hillsides and winding mountain roads to Bwindi Impenetrable or Mgahinga Gorilla National Park. Dinner and overnight at the lodge.",
			highlight: 'Chimp tracking at Kalinzu + tree-climbing lions at Ishasha',
			durationDays: 1,
			locationName: 'Bwindi Impenetrable National Park',
		},
		{
			stepNumber: 12,
			title: 'Mountain Gorilla Tracking & Batwa Community Visit — Bwindi',
			description:
				"After breakfast, hike to park headquarters for a briefing by Uganda Wildlife Authority guides before transferring to the tracking start point. The search for gorillas goes through thick, untamed ancient rainforest — scrambling over mossy rocks and deep undergrowth. It is arduous, but the encounter with a habituated mountain gorilla family is worth every step: spend one magical hour watching silverbacks at rest, juveniles playing, and mothers nursing. After tracking, visit the Batwa community along the Batwa Trail for traditional dance, beer making, fire-setting demonstrations, and cultural storytelling from Africa's oldest forest-dwelling people.",
			highlight: 'Mountain gorilla tracking permit (USD 700 per person) included',
			durationDays: 1,
			locationName: 'Bwindi Impenetrable National Park',
		},
		{
			stepNumber: 13,
			title: 'Golden Monkey Tracking at Mgahinga & Canoe Ride on Lake Bunyonyi',
			description:
				"Pre-tracking briefing at Mgahinga Gorilla National Park headquarters before entering the bamboo forest in search of the golden monkey family (permit USD 60 per person, included). Golden monkeys live in lower altitude zones so the trek rarely exceeds 3 hours, and you are rewarded with one hour in the company of these strikingly vivid primates. No minimum group size; minimum age 12 years. In the afternoon, drive to Lake Bunyonyi for a canoe ride across the glassy, bilharzia-free waters — the lake has 29 islands including the floating island and the historic Punishment Island. Dinner and overnight at Bunyonyi.",
			highlight: 'Golden monkey tracking at Mgahinga (USD 60 per person included)',
			durationDays: 1,
			locationName: 'Lake Bunyonyi',
		},
		{
			stepNumber: 14,
			title: 'Transfer to Lake Mburo National Park — Afternoon Game Drive',
			description:
				"After an early breakfast, leave Lake Bunyonyi and drive east via Kabale Town to Lake Mburo National Park — Uganda's smallest savannah park and the only place in the country where zebras are found. Welcomed by herds of zebra, buffalo, eland, and antelope at the park gate, arrive for lunch then set out for an afternoon game drive assured of spotting zebras, buffaloes, impalas, warthogs, and waterbucks at close range. The lake margins offer exceptional birding: malachite kingfisher, African fish eagle, blue-headed weaver, rufous-tailed starling, herons, pelicans, cormorants, and the rare shoebill. Dinner and overnight at the lodge.",
			durationDays: 1,
			locationName: 'Lake Mburo National Park',
		},
		{
			stepNumber: 15,
			title: 'Sunrise Walking Safari, Equator Experience & Departure',
			description:
				"Enjoy your final sunrise in Uganda with a guided walking safari in Lake Mburo — spotting zebras, giraffes, eland, topi, antelope, and Cape buffaloes at close range under the guidance of an armed ranger. Climb the trail to the hilltop viewpoint for a panoramic view of Lake Mburo and nine of the twelve surrounding lakes. Then drive back to Entebbe with a stopover at the equator monument for the equator experience and photos. Drop-off at Entebbe International Airport 3 hours before your international flight. Only breakfast, lunch, and drinking water are provided on this final day.",
			highlight: 'Guided walking safari + equator crossing experience',
			durationDays: 1,
			locationName: 'Lake Mburo National Park',
		},
	],

	meta: {
		pickup: 'Entebbe International Airport (EBB)',
		meetingPoint: 'Entebbe International Airport, Entebbe, Uganda — your guide will be at the arrivals lounge with an Evajo Tours & Travel sign.',

		includes: [
			'All park entrance fees and vehicle park entry fees',
			'Mountain gorilla tracking permit at Bwindi Impenetrable (USD 700 per person)',
			'Chimpanzee tracking permit at Kalinzu Forest Reserve (USD 50 per person)',
			'Golden monkey tracking at Mgahinga National Park (USD 60 per person)',
			'Kanarok Hot Springs experience at Kidepo Valley National Park',
			'Ostriches experiences at Kidepo Valley National Park',
			'Karamojong/IK community cultural visit at Kidepo',
			'Game safaris throughout the tour',
			'Boat safaris (Victoria Nile & Kazinga Channel)',
			'Top of Murchison Falls walk',
			'Guided walk at Bigodi Wetland Sanctuary',
			'Guided walk and Sempaya Hot Springs at Semuliki National Park',
			'Guided walk at Amabere Caves or Crater Lakes & plantations walk',
			'Batwa/Pygmy community visit',
			'Canoe/boat ride on Lake Bunyonyi',
			'Equator experience and photo moments',
			'Park ranger fees',
			'All en-route meals as indicated in the itinerary',
			'Full-board accommodation throughout',
			'Full-time English-speaking driver/guide',
			'Ground transportation in a 4×4 safari van or Land Cruiser (fully fuelled)',
			'Airport pickup and drop-off at Entebbe',
			'Drinking water on all days',
			'14 breakfasts, 15 lunches, 14 dinners',
		],

		excludes: [
			'International flights and airfares',
			'Ugandan visa fees',
			'Personal travel insurance',
			'Alcoholic and non-alcoholic beverages',
			'Tips and gratuities',
			'Laundry and personal expenses',
			'Accommodation and meals not indicated in the itinerary',
			'Optional chimpanzee tracking at Kibale National Park (USD 200 per person)',
			'Chimpanzee habituation experience at Kibale National Park (USD 250 per person)',
			'Accommodation on your first and last night in Uganda if outside itinerary days',
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
				question: 'What time does the tour start?',
				answer:
					'The tour departs at 07:30 am from Entebbe on Day 1. Your driver/guide will meet you at the arrivals lounge of Entebbe International Airport holding an Evajo Tours & Travel sign.',
			},
			{
				question: 'Are there any health or fitness requirements?',
				answer:
					'Gorilla and chimpanzee tracking involves hiking through dense forest on uneven terrain and is not recommended for travellers with back problems, heart conditions, or other serious medical conditions. It is also not suitable for pregnant travellers. Travellers should have a moderate level of physical fitness. Please consult your doctor if you have any concerns.',
			},
			{
				question: 'Is wheelchair access available?',
				answer:
					'No — the safari involves off-road game drives, forest treks, and walking safaris that are not accessible to wheelchair users.',
			},
			{
				question: 'When will I receive booking confirmation?',
				answer: 'Confirmation will be received at the time of booking.',
			},
		],
	},
};

export default data;
