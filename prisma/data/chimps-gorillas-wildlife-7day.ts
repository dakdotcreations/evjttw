import type { SeedData } from './types.js';

/**
 * Locations required (must already exist in the database):
 *   - "Kibale Forest National Park"       → Days 1 & 2
 *   - "Queen Elizabeth National Park"     → Days 3 & 4
 *   - "Bwindi Impenetrable National Park" → Day 4 (arrival & cultural)
 *   - "Lake Bunyonyi"                     → Day 5 (post-gorilla transfer)
 *   - "Lake Mburo National Park"          → Days 6 & 7
 */
const data: SeedData = {
	itinerary: {
		id: 'seed-chimps-gorillas-wildlife-7day',
		title: '7 Day Chimps, Gorilla Trekking and Wildlife Experience',
		summary:
			'Seven days covering the very best of Uganda — chimpanzee trekking at Kibale, game drives and a Kazinga Channel boat cruise at Queen Elizabeth, mountain gorilla trekking at Bwindi, and a walking safari at Lake Mburo.',
		description: `This seven-day safari threads together Uganda\'s most iconic wildlife experiences in one fluid journey, moving from the primate capital of the world through the Big Five savannah of Queen Elizabeth to the ancient gorilla forests of Bwindi and the zebra-dotted shores of Lake Mburo.

Kibale Forest National Park is home to an estimated 1,500 chimpanzees — the highest density of chimps anywhere in Africa. Four communities are fully habituated, allowing close encounters in the rainforest. A Bigodi Wetland nature walk on arrival adds red colobus monkeys, grey-cheeked mangabeys, and over 200 bird species to the opening day.

Queen Elizabeth National Park delivers savannah game drives across the Kasenyi Plains and a boat cruise along the Kazinga Channel — one of East Africa\'s finest water safari routes — with hippos, Nile crocodiles, and elephants lining the banks.

Bwindi Impenetrable National Park holds over 400 mountain gorillas, roughly half the world\'s entire population. A full hour with a habituated gorilla family, reached after a 1–8 hour forest trek, is the emotional high point of the safari.

The journey ends at Lake Mburo National Park — Uganda\'s smallest savannah park but home to unique species including zebras, impalas, elands, and hippos — with an on-foot guided nature walk alongside an armed ranger guide.

The safari starts and ends at Entebbe International Airport.`,
		durationDays: 7,
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
			title: 'Entebbe / Kampala → Kibale Forest — Bigodi Wetland Nature Walk',
			description:
				'Your driver/guide will collect you from your Kampala hotel or Entebbe International Airport and drive west to Kibale Forest National Park — one of Africa\'s premier chimpanzee destinations. Stop for lunch in Fort Portal town on arrival. In the afternoon, embark on a 2–3 hour guided nature walk in Bigodi Wetland Sanctuary, a community-run reserve bordering the park that teems with red colobus monkeys, olive baboons, grey-cheeked mangabeys, and over 200 bird species. Transfer to your lodge in Kibale for dinner and overnight.',
			highlight: 'Bigodi Wetland nature walk — primates, birds, and a first taste of the forest',
			durationDays: 1,
			locationName: 'Kibale Forest National Park',
		},
		{
			stepNumber: 2,
			title: 'Chimpanzee Trekking → Transfer to Queen Elizabeth National Park',
			description:
				'After breakfast, meet your guide at the Kibale park headquarters with packed food and water for the chimpanzee trek. Enter the rainforest and spend 2–5 hours tracking a habituated chimpanzee community — one of four accustomed to human visitors in the park. Once located, spend one hour observing and photographing the chimps in their natural environment: social groups grooming, juveniles playing, and the forest canopy alive with movement. In the later afternoon, depart Kibale and drive south to Queen Elizabeth National Park, arriving at the lodge in time to relax and settle in for dinner and overnight.',
			highlight: 'Chimpanzee trekking in the primate capital of the world — 1,500 chimps call Kibale home',
			durationDays: 1,
			locationName: 'Kibale Forest National Park',
		},
		{
			stepNumber: 3,
			title: 'Morning Game Drive & Kazinga Channel Boat Cruise — Queen Elizabeth',
			description:
				'Rise early and join your guide for a morning game drive across the Kasenyi Plains, scanning for elephants, hippos, lions, leopards, buffaloes, Uganda kob, and various antelope species in the golden early light. Return to the lodge for lunch. In the afternoon, embark on a boat cruise along the Kazinga Channel — the 29-km waterway connecting Lake Edward and Lake George — drifting past hippo pods, Nile crocodiles, elephants at the water\'s edge, and hundreds of bird species including African skimmers, pink-backed pelicans, and pied kingfishers. Dinner and overnight at the lodge.',
			highlight: 'Kazinga Channel boat cruise — hippos, crocodiles, elephants, and 600+ bird species',
			durationDays: 1,
			locationName: 'Queen Elizabeth National Park',
		},
		{
			stepNumber: 4,
			title: 'Transfer to Bwindi — Batwa Community Cultural Experience',
			description:
				'After a hearty breakfast, begin the drive to Bwindi Impenetrable National Park via the scenic Kigezi Highlands — Uganda\'s "Switzerland of Africa" — with terraced hillsides, winding mountain roads, and extraordinary photography opportunities at every bend. Arrive at Bwindi in the afternoon and check in to your lodge. Before dinner, join the Batwa pygmies — the original inhabitants of the impenetrable forest — for traditional dances, storytelling, and cultural performances that bring their centuries-old way of life vividly to life. Relax at the lodge in preparation for the gorilla trek the following morning. Dinner and overnight.',
			highlight: 'Batwa pygmy cultural experience — traditional dances and forest traditions on arrival at Bwindi',
			durationDays: 1,
			locationName: 'Bwindi Impenetrable National Park',
		},
		{
			stepNumber: 5,
			title: 'Mountain Gorilla Trekking → Lake Bunyonyi',
			description:
				'Enjoy an early breakfast, then head to the Bwindi park headquarters by 7:45 am for the Uganda Wildlife Authority pre-trek briefing on gorilla behaviour and safety guidelines. Trek through the dense, ancient rainforest with experienced ranger guides and trackers; the search may take 1–8 hours depending on the gorillas\' location in the forest. Every step through the impenetrable undergrowth, over mossy rocks and tangled roots, is an experience in itself. Once the gorilla family is found, spend one unforgettable hour observing them at close range — silverbacks at rest, infants at play, and mothers nursing in the green cathedral of the forest. After returning to camp, transfer north to the serene highland waters of Lake Bunyonyi for dinner and overnight at your lakeside lodge.',
			highlight: 'One hour with a habituated mountain gorilla family — the defining safari moment',
			durationDays: 1,
			locationName: 'Lake Bunyonyi',
		},
		{
			stepNumber: 6,
			title: 'Lake Bunyonyi → Lake Mburo National Park — Lake Boat Cruise',
			description:
				'After an early breakfast, transfer east to Lake Mburo National Park — Uganda\'s smallest savannah park and the only park in the country with zebras, impalas, and elands. Arrive around lunchtime, register at the gate, and proceed to a 2-hour boat cruise on Lake Mburo. Drift past hippos wallowing in the shallows, Nile crocodiles on the banks, and a rich variety of waterbirds including African fish eagles, malachite kingfishers, and herons. Return to the lodge for dinner and overnight.',
			highlight: 'Lake Mburo boat cruise — hippos, crocodiles, and Uganda\'s only zebra habitat',
			durationDays: 1,
			locationName: 'Lake Mburo National Park',
		},
		{
			stepNumber: 7,
			title: 'Morning Nature Walking Safari → Return to Entebbe',
			description:
				'Begin the final morning with a guided on-foot nature walk alongside an armed Uganda Wildlife Authority ranger guide. Explore the salt licks where wildlife congregates at dawn — impalas, zebras, buffaloes, and warthogs are frequently encountered at close range on foot, a uniquely intimate experience compared to vehicle-based game drives. A second walk in the western section of the park offers encounters with hippos, hyenas, giraffes, and zebras along the lake shore. After lunch, transfer back to Entebbe or Kampala, concluding your seven-day Uganda safari. Drop-off at Entebbe International Airport or your Kampala hotel.',
			highlight: 'On-foot guided walking safari at Lake Mburo — zebras, giraffes, and hippos at close range',
			durationDays: 1,
			locationName: 'Lake Mburo National Park',
		},
	],

	meta: {
		pickup: 'Entebbe International Airport (EBB)',
		meetingPoint: 'Airport or Hotel',

		includes: [
			'All park entrance fees',
			'Full board accommodation',
			'Vehicle and fuel (4×4 Land Cruiser or Safari Van)',
			'Chimpanzee and gorilla trekking permits',
			'Drinking water while on safari (2 litres per person per day)',
			'Pickup and drop-off at Entebbe International Airport',
		],

		excludes: [
			'International airfares',
			'Ugandan visa',
			'Optional activities not listed in the itinerary',
			'Personal expenses — souvenirs, crafts, alcoholic drinks, laundry, tips',
			'Airport transfers unless otherwise stated',
		],

		complementaries: ['Umbrella', 'T-Shirt'],

		faqs: [
			{
				question: 'How long does chimpanzee trekking take?',
				answer:
					'The trek itself takes 2–5 hours depending on where the chimps are in the forest. Once located, you spend one hour with the group. Permits are limited so it is important to book well in advance — we handle this on your behalf.',
			},
			{
				question: 'How long does gorilla trekking take?',
				answer:
					'The search can take anywhere from 1 to 8 hours depending on the gorillas\' movement. On average most treks take 3–4 hours. Once found, you spend exactly one hour with the family. The trek can be physically demanding — a moderate level of fitness is recommended.',
			},
		],
	},
};

export default data;
