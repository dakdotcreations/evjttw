import type { SeedData } from './types.js';

/**
 * Locations required (must already exist in the database):
 *   - "Murchison Falls National Park"      → Days 1 & 2
 *   - "Queen Elizabeth National Park"      → Days 3 & 4
 *   - "Bwindi Impenetrable National Park"  → Days 5 & 6
 *   - "Lake Bunyonyi"                      → Day 6
 *   - "Entebbe Botanical Gardens"          → Day 7 (Entebbe area)
 */
const data: SeedData = {
	itinerary: {
		id: 'seed-murchison-qe-gorillas-7day',
		title: '7 Days Murchison Falls, Queen Elizabeth & Gorillas Safari',
		summary:
			"Uganda\'s ultimate 7-day grand safari - Murchison Falls game drives and Nile boat cruise, Queen Elizabeth wildlife and Kazinga Channel, chimpanzee tracking at Kalinzu, and a face-to-face encounter with mountain gorillas in Bwindi.",
		description: `This seven-day safari is the definitive overview of Uganda\'s finest wildlife destinations, combining four iconic national parks and reserves in a single unforgettable journey.

The adventure begins at Murchison Falls National Park - Uganda\'s largest park - where the entire volume of the Nile is forced through an 8-metre gorge in the world\'s most powerful waterfall. Game drives across the Nyamsika Plateau deliver sightings of lions, elephants, buffaloes, giraffes, and leopards, while a boat cruise up the Nile brings you face-to-face with hippos and crocodiles.

From Murchison, the route heads south to Queen Elizabeth National Park for savannah game drives, the famous tree-climbing lions of the Ishasha sector, and an afternoon boat safari along the Kazinga Channel - one of Africa\'s premier hippo and bird habitats.

En route to Bwindi, an optional chimpanzee tracking experience at Kalinzu Central Forest Reserve offers an intimate primate encounter. The safari culminates at Bwindi Impenetrable National Park - a UNESCO World Heritage Site sheltering over 400 mountain gorillas - for one hour with a habituated gorilla family. The journey home passes through Bwindi and over the equator back to Entebbe.`,
		durationDays: 7,
		currency: 'USD',
		fixedPrice: 5372,
		pricePerPerson: null,
		pricingDisabled: false,
		bestSeasons: ['June', 'July', 'August', 'September', 'December', 'January', 'February'],
		published: true,
	},

	steps: [
		{
			stepNumber: 1,
			title: 'Entebbe / Kampala → Murchison Falls National Park - Sunset Game Drive',
			description:
				'Your driver/guide will meet you at Entebbe International Airport with an Evajo Tours & Travel Limited sign and begin the drive north to Murchison Falls National Park. En route, stop for lunch and optionally visit Ziwa Rhino Sanctuary - the only place in Uganda to track wild rhinos on foot. Cross the Nile and enter the park in time for an afternoon sunset game drive across the savannah. Check in at Fort Murchison Lodge for dinner and overnight. Meal plan: Lunch and Dinner.',
			highlight: 'Afternoon sunset game drive - first wildlife sightings in Uganda\'s largest park',
			durationDays: 1,
			locationName: 'Murchison Falls National Park',
		},
		{
			stepNumber: 2,
			title: 'Sunrise Game Drive & Nile Boat Safari - Murchison Falls',
			description:
				'Rise before dawn for a sunrise game drive across the Nyamsika Plateau, prime territory for lions, elephants, leopards, buffaloes, and giraffes illuminated in the early morning light. Return to the lodge for breakfast. In the afternoon, board a launch boat for a cruise up the Nile to the base of Murchison Falls - drifting past hippo pods, basking Nile crocodiles, and waterside elephants, with hundreds of bird species lining the banks. The boat anchors near the "Devil\'s Cauldron" for views of the cascade from below. Return to Fort Murchison Lodge for dinner and overnight. Meal plan: Full Board.',
			highlight: 'Nile boat safari to the base of the world\'s most powerful waterfall',
			durationDays: 1,
			locationName: 'Murchison Falls National Park',
		},
		{
			stepNumber: 3,
			title: 'Top of the Falls Walk → Queen Elizabeth National Park - Sunset Game Drive',
			description:
				'After breakfast, hike to the top of Murchison Falls for a dramatic close-up view of the Nile thundering through the narrow gorge - an experience that perfectly showcases the raw power of the river. Depart the park and drive south toward Queen Elizabeth National Park. Stop for lunch en route. Arrive at Queen Elizabeth and head out for an afternoon game drive in the Ishasha sector to search for the park\'s famous tree-climbing lions resting in giant fig trees. Check in at The Bush Lodge for dinner and overnight. Meal plan: Full Board.',
			highlight: 'Top of the Falls walk and tree-climbing lions in the Ishasha sector',
			durationDays: 1,
			locationName: 'Queen Elizabeth National Park',
		},
		{
			stepNumber: 4,
			title: 'Sunrise Game Drive & Kazinga Channel Boat Safari - Queen Elizabeth',
			description:
				'Early breakfast followed by a sunrise game drive across the Kasenyi Plains - excellent for lion tracking, elephant herds, Uganda kob, buffaloes, hyenas, and a remarkable diversity of savannah birds. Return to The Bush Lodge for lunch. In the afternoon, board a boat for a cruise along the Kazinga Channel connecting Lake Edward and Lake George, one of Africa\'s finest water safari experiences. Drift past hippo pods, Nile crocodiles, elephants bathing at the water\'s edge, waterbucks, and hundreds of bird species. Return to The Bush Lodge for dinner and overnight. Meal plan: Full Board.',
			highlight: 'Kazinga Channel boat safari - hippos, crocodiles, and 600+ bird species',
			durationDays: 1,
			locationName: 'Queen Elizabeth National Park',
		},
		{
			stepNumber: 5,
			title: 'Optional Chimp Tracking at Kalinzu → Ishasha → Bwindi Impenetrable',
			description:
				'After breakfast, optionally stop at Kalinzu Central Forest Reserve for chimpanzee tracking (permit $150 per person, arranged in advance). Kalinzu is one of Uganda\'s lesser-known primate forests and offers intimate chimp encounters away from the crowds. Continue driving through the scenic Ishasha sector - keeping an eye on the fig trees for lions - and on to Bwindi Impenetrable National Park. Check in at Broadbill Forest Camp in time for dinner and overnight. Meal plan: Full Board.',
			highlight: 'Optional chimpanzee tracking at Kalinzu Forest Reserve (additional cost)',
			durationDays: 1,
			locationName: 'Bwindi Impenetrable National Park',
		},
		{
			stepNumber: 6,
			title: 'Mountain Gorilla Trekking & Batwa Community Visit / Lake Bunyonyi',
			description:
				'The highlight of the safari. After an early breakfast, transfer to the Bwindi park headquarters for a pre-trek ranger briefing. Head into the ancient impenetrable forest with trained guides and trackers in search of a habituated mountain gorilla family. The trek takes 2–6 hours depending on the gorillas\' location - every step through the forest is an experience in itself. Spend one unforgettable hour observing the family at close range. After returning to camp, choose between visiting the Batwa community for traditional cultural performances and forest storytelling, or driving to Lake Bunyonyi for a scenic canoe paddle across the tranquil island-dotted highland lake. Transfer to Bunyonyi Overland Resort for dinner and overnight. Meal plan: Full Board.',
			highlight: 'One hour face-to-face with a mountain gorilla family - the heart of the safari',
			durationDays: 1,
			locationName: 'Lake Bunyonyi',
		},
		{
			stepNumber: 7,
			title: 'Equator Experience → Entebbe - End of Safari',
			description:
				'After a final breakfast, check out and begin the drive north back toward Entebbe and Kampala. Stop at the equator for the classic Coriolis water experiment and photos at the zero-degree latitude line - a fitting final memory of your Uganda adventure. Continue to Entebbe, arriving in time for lunch before your onward flight, or transfer to your Kampala hotel. Your guide will see you off at Entebbe International Airport. Meal plan: Breakfast and Lunch.',
			highlight: 'Equator crossing ceremony and photo moment on the way home',
			durationDays: 1,
			locationName: 'Entebbe Botanical Gardens',
		},
	],

	meta: {
		pickup: 'Entebbe International Airport (EBB)',
		meetingPoint: 'Arrival lounge, Entebbe International Airport - guide holds Evajo Tours & Travel Limited sign',

		includes: [
			'Ground transportation by a 4×4 safari van or Land Cruiser, fully fuelled',
			'All game drives as per the itinerary',
			'Top of Murchison Falls walk',
			'Full-time English-speaking driver/guide',
			'Boat safaris (Nile and Kazinga Channel)',
			'Mountain gorilla tracking permits ($800 per person)',
			'Full board accommodation and en-route meals as indicated',
			'All park entrance fees',
			'All relevant government taxes',
			'Airport transfers and drinking water on all days',
			'Equator experience and photo moments',
		],

		excludes: [
			'International airfares and airport taxes',
			'Ugandan visa fees',
			'Personal travel insurance',
			'Optional chimpanzee tracking permits at Kalinzu Forest Reserve ($150 per person)',
			'Alcoholic and non-alcoholic beverages, tips, laundry, and personal expenses',
			'Accommodation and meals not indicated in the itinerary',
			'Accommodation on your first and last night in Uganda',
			'Any other items not listed above',
		],

		complementaries: ['Drinking water on all days'],

		faqs: [
			{
				question: 'Are there any health or physical fitness requirements?',
				answer:
					'A moderate level of physical fitness is required - gorilla trekking involves hiking over uneven, steep, and sometimes muddy terrain for 2–6 hours. This safari is not recommended for travellers with spinal injuries, poor cardiovascular health, or pregnant travellers. Please consult your doctor if you have any concerns.',
			},
			{
				question: 'Is the chimpanzee tracking at Kalinzu included?',
				answer:
					'Chimpanzee tracking at Kalinzu Central Forest Reserve is an optional activity at an additional cost of $150 per person. Please let us know at the time of booking so we can arrange the permit in advance.',
			},
			{
				question: 'Where will my guide meet me on arrival?',
				answer:
					'Your Evajo Tours & Travel Limited driver/guide will be waiting for you in the arrival lounge at Entebbe International Airport, holding a sign with the company name. Please arrive at the pickup point 30 minutes before your scheduled departure time.',
			},
		],
	},
};

export default data;
