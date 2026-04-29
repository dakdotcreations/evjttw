import type { SeedData } from './types.js';

/**
 * Locations required (must already exist in the database):
 *   - "Bwindi Impenetrable National Park" → Days 1 & 2  (Uganda)
 *   - "Tarangire National Park"           → Day 4        (Tanzania)
 *   - "Serengeti National Park"           → Days 5 & 6   (Tanzania)
 *   - "Ngorongoro Crater"                 → Day 7        (Tanzania)
 *
 * Day 3 (flight/transfer to Arusha) and Day 8 (departure) have no location.
 *
 * NOTE: The original itinerary describes the first day drive as departing from
 * Kigali International Airport. The official pickup point is listed as
 * Entebbe Airport. Both are viable start points - the guide will be arranged
 * from whichever airport the client arrives at. Adjust as needed at booking.
 */
const data: SeedData = {
	itinerary: {
		id: 'seed-uganda-tanzania-experience-8day',
		title: '8 Days Uganda – Tanzania Experience',
		summary:
			'Gorilla trekking at Bwindi plus Tanzania\'s northern circuit - Tarangire elephant herds, the endless Serengeti plains, and the Ngorongoro Crater - all in a single seamless 8-day East Africa adventure.',
		description: `This eight-day cross-border safari combines the two highlights that define East Africa: mountain gorilla trekking in Uganda\'s Bwindi Impenetrable National Park, followed by a domestic flight into Tanzania for an immersive northern circuit safari.

The journey opens with two days at Bwindi - widely regarded as Africa\'s most rewarding primate destination. Around 460 mountain gorillas (roughly half the world\'s entire population) live in Bwindi\'s misty highland rainforest. Trekking through the undergrowth to spend an hour with a habituated family group is an encounter that consistently tops travellers\' most memorable experiences.

A short domestic flight then transfers you south to Arusha, the gateway to Tanzania\'s legendary northern circuit. Tarangire National Park welcomes you with its ancient baobab silhouettes and elephant herds that number in the hundreds during the dry season - the largest concentration anywhere in northern Tanzania. En route to the Serengeti, the historic Olduvai Gorge provides a compelling window into human evolution before the endless plains open up around you.

Two full days in the Serengeti offer unparalleled wildlife density - three million animals call this ecosystem home. Lion prides, leopards, cheetahs, and vast herds of wildebeest, zebra, and buffalo are daily sightings. Optional hot-air balloon flights deliver a dawn aerial perspective over the plains that is simply incomparable.

The circuit concludes at the Ngorongoro Crater - the world\'s largest intact volcanic caldera and a UNESCO World Heritage Site. A descent into the 260 sq km crater floor delivers one of Africa\'s most concentrated Big Five environments, with resident black rhinos, prides of lions, and flamingo-fringed Lake Magadi all within a single breathtaking bowl.`,
		durationDays: 8,
		currency: 'USD',
		fixedPrice: null,
		pricePerPerson: null,
		pricingDisabled: false,
		bestSeasons: ['June', 'July', 'August', 'September', 'October', 'January', 'February'],
		published: true,
	},

	steps: [
		{
			stepNumber: 1,
			title: 'Arrival → Bwindi Impenetrable National Park',
			description:
				'Your guide will collect you from Entebbe International Airport (or Kigali International Airport) and transfer you through the scenic Kigezi Highlands to Bwindi Impenetrable National Park - a UNESCO World Heritage Site and one of Africa\'s oldest and most biodiverse rainforests. Arrive at Bweza Gorilla Lodge in the late afternoon, surrounded by the sounds of the forest. Settle in, enjoy dinner, and prepare for the life-changing gorilla trekking experience ahead. Meal plan: Full Board from breakfast Day 1.',
			highlight: 'Arrival at Bwindi - the heart of mountain gorilla country',
			durationDays: 1,
			locationName: 'Bwindi Impenetrable National Park',
		},
		{
			stepNumber: 2,
			title: 'Gorilla Trekking & Batwa Cultural Immersion - Bwindi',
			description:
				'After an early breakfast, receive a briefing from your ranger guide and enter the gorilla sanctuary. The trek through Bwindi\'s steep, moss-draped rainforest may take between one and eight hours depending on where the gorilla family has moved overnight - the effort only adds to the reward. Spend one full hour with a habituated gorilla family, watching silverbacks, nursing mothers, and playful juveniles in their natural habitat at close range. Return to the lodge for lunch, then spend the afternoon on a cultural immersion experience with the Batwa Pygmies - Bwindi\'s original forest-dwelling community - learning their traditional forest skills, stories, and music. Dinner and overnight at Bweza Gorilla Lodge. Meal plan: Full Board.',
			highlight:
				'One hour face-to-face with a mountain gorilla family - among Africa\'s greatest wildlife encounters',
			durationDays: 1,
			locationName: 'Bwindi Impenetrable National Park',
		},
		{
			stepNumber: 3,
			title: 'Bwindi → Domestic Flight → Arusha, Tanzania',
			description:
				'Bid farewell to Uganda after breakfast and transfer to the airstrip for a domestic flight to Kilimanjaro International Airport (JRO) in northern Tanzania. Upon arrival, transfer to the Mount Meru Hotel in Arusha - a comfortable and well-appointed base for exploring the northern circuit. Enjoy a relaxed dinner and early night in preparation for the game drives ahead. Meal plan: Dinner & Breakfast.',
			highlight: null,
			durationDays: 1,
		},
		{
			stepNumber: 4,
			title: 'Tarangire National Park Game Drives - Tanzania',
			description:
				'After breakfast, depart Arusha for Tarangire National Park - a land of giants defined by one of the greatest concentrations of African elephants anywhere on the continent. Ancient baobab trees scattered across the golden savannah create an otherworldly landscape that is unlike any other park in northern Tanzania. Morning and afternoon game drives reveal lions, leopards, giraffes, zebras, wildebeest, impalas, elands, and an exceptional variety of raptors and waterbirds around the Tarangire River. Retire to Burunge Tented Lodge for dinner under the African sky. Meal plan: Full Board.',
			highlight: 'Tarangire elephant herds and ancient baobab trees - Tanzania\'s most distinctive landscape',
			durationDays: 1,
			locationName: 'Tarangire National Park',
		},
		{
			stepNumber: 5,
			title: 'Tarangire → Olduvai Gorge → Serengeti National Park',
			description:
				'Depart Tarangire after breakfast and journey west through the Ngorongoro Conservation Area, stopping at the historic Olduvai Gorge - the site where paleoanthropologists Louis and Mary Leakey uncovered some of the earliest evidence of human existence, including fossils of Homo habilis. A brief guided visit to the Olduvai museum provides fascinating context before you continue into Serengeti National Park - home to over three million animals in one of the world\'s greatest and most intact ecosystems. Arrive at Tanzania Bush Camp Central and head directly into the Serengeti for an afternoon game drive. Dinner and overnight. Meal plan: Full Board.',
			highlight: 'Entering the Serengeti - the world\'s most famous wildlife ecosystem, via Olduvai Gorge',
			durationDays: 1,
			locationName: 'Serengeti National Park',
		},
		{
			stepNumber: 6,
			title: 'Full Day on the Serengeti Plains',
			description:
				'Rise before dawn for a full day exploring the Serengeti\'s sweeping plains and riverine woodlands on morning and afternoon game drives. The Serengeti sustains Africa\'s most extraordinary predator density - lions, leopards, cheetahs, hyenas, and wild dogs all feature regularly. Vast herds of wildebeest, zebra, and buffalo migrate seasonally across the park; between July and September the Grumeti and Mara River crossings bring the Great Migration spectacle in full force. An optional sunrise hot-air balloon safari provides an extraordinary aerial perspective over the plains, followed by a champagne bush breakfast on landing (additional cost). Dinner and overnight at Tanzania Bush Camp Central. Meal plan: Full Board.',
			highlight:
				'Optional dawn hot-air balloon safari over the Serengeti plains - the ultimate safari experience',
			durationDays: 1,
			locationName: 'Serengeti National Park',
		},
		{
			stepNumber: 7,
			title: 'Ngorongoro Crater - UNESCO World Heritage Site',
			description:
				'Depart the Serengeti and drive east to the Ngorongoro Conservation Area. Descend into the Ngorongoro Crater - the world\'s largest intact volcanic caldera, stretching 260 sq km across. The crater floor is a self-contained ecosystem sheltering an extraordinary density of wildlife: resident prides of lions, leopards, spotted hyenas, golden jackals, cheetahs, elephants, buffaloes, zebras, wildebeest, and a population of critically endangered black rhinos. Lake Magadi, on the crater floor, draws flamingos and hippos and makes for superb waterside photography. Spend the full day exploring the crater before ascending in the late afternoon to spend the evening at Tloma Lodge perched on the crater rim with sweeping views across the caldera. Dinner and overnight. Meal plan: Full Board.',
			highlight: 'Ngorongoro Crater descent - Africa\'s most concentrated Big Five environment',
			durationDays: 1,
			locationName: 'Ngorongoro Crater',
		},
		{
			stepNumber: 8,
			title: 'Departure - Kilimanjaro International Airport',
			description:
				'Enjoy a final relaxed breakfast at Tloma Lodge with views across the Ngorongoro highlands before transferring to Kilimanjaro International Airport for your international onward flight. This marks the end of your 8-day Uganda–Tanzania Experience - an itinerary that delivers two of Africa\'s greatest wildlife encounters in a single unforgettable journey.',
			highlight: null,
			durationDays: 1,
		},
	],

	meta: {
		pickup: 'Entebbe International Airport (EBB) or Kigali International Airport (KGL)',
		meetingPoint: 'Airport or Hotel',

		includes: [
			'Gorilla trekking permits',
			'Park entrance fees',
			'Domestic flights (Uganda → Tanzania)',
			'Knowledgeable guides throughout',
			'Bottled water on safari',
			'Round-trip transportation to and from hotels',
			'All meals from breakfast on Day 1 through lunch on the last day',
		],

		excludes: [
			'International flights',
			'Airport transfers (unless otherwise arranged)',
			'Additional accommodation before or after the tour (unless otherwise arranged)',
			'Guide gratuity (industry recommendation: 10–15% of trip cost)',
			'Personal items: souvenirs, travel insurance, visa fees, etc.',
			'Hot-air balloon safari over the Serengeti (optional, additional cost)',
			'Any activities not mentioned in the itinerary',
		],

		complementaries: ['Umbrella', 'T-Shirt'],

		faqs: [
			{
				question: 'Does this tour start from Entebbe or Kigali?',
				answer:
					'The official pickup point is Entebbe International Airport, but the tour can also be arranged to begin from Kigali International Airport for travellers who prefer to fly into Rwanda. Please advise your preferred arrival airport at the time of booking.',
			},
			{
				question: 'Are gorilla permits included in the price?',
				answer:
					'Yes - gorilla trekking permits are included in the tour price. Uganda gorilla permits are issued through the Uganda Wildlife Authority and are arranged on your behalf.',
			},
			{
				question: 'What is the best season for this combined tour?',
				answer:
					'June to October is the dry season and the best overall window for both gorilla trekking and Tanzania game drives. January to February is a secondary dry season. July to September also coincides with the Serengeti wildebeest migration river crossings for added spectacle.',
			},
		],
	},
};

export default data;
