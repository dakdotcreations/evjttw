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
		id: 'seed-murchison-qe-gorillas-7day-private',
		title: '7 Days Murchison Falls, Queen Elizabeth & Gorillas Private Safari',
		summary:
			'A private 7-day Uganda grand tour — Nile game drives and waterfall boat cruise at Murchison Falls, Big Five safaris and Kazinga Channel at Queen Elizabeth, optional chimp tracking at Kalinzu, and mountain gorilla trekking at Bwindi.',
		description: `This private seven-day safari delivers an authoritative introduction to Uganda's most celebrated wildlife destinations in a single seamless journey. Only your group participates — no shared vehicles, no shared guides.

The adventure begins with a panoramic drive north-west through the Luwero Triangle and Masindi Town to Murchison Falls National Park — Uganda's largest wildlife reserve, bisected by the Nile. The river squeezes through the legendary Murchison Falls, an impossibly narrow 7-metre gap in cleft rock that creates one of the most powerful explosions of white water on earth. Two full days here deliver sunrise game drives across the open savannah and a 3-hour boat safari upstream to the falls, past crocodile banks, hippo pools, and extraordinary birdlife.

The route then sweeps south to Queen Elizabeth National Park, cradled in the shadow of the Rwenzori Mountains. The park's mosaic of grassy plains, tropical forest, crater lakes, and wetlands supports extraordinary wildlife diversity — lions, leopards, elephants, buffaloes, giant forest hogs, Uganda kob, and topi — best explored on sunrise game drives and an afternoon boat cruise along the Kazinga Channel.

A stopover at Kalinzu Central Forest Reserve offers optional chimpanzee tracking before the final drive through the Kigezi Highlands — the "Switzerland of Africa" — to Bwindi Impenetrable National Park. Here, over 400 mountain gorillas (roughly half the world's entire population) inhabit one of Africa's oldest rainforests. A full hour with a habituated gorilla family is the centrepiece of the safari.

The journey home passes through the equator monument at Mpigi for photos and the classic Coriolis water demonstration before returning to Entebbe.`,
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
			title: 'Entebbe / Kampala → Murchison Falls National Park — Sunset Game Drive',
			description:
				'Depart at 7:30 am from Entebbe International Airport or your Kampala hotel. Drive north-west through the famous Luwero Triangle and Masindi Town, arriving at Murchison Falls National Park in time for lunch at a spectacularly situated spot at the top of the falls. The 7-hour drive rewards you with sweeping views of the Ugandan countryside. Optionally stop at Ziwa Rhino Sanctuary along the way for on-foot white rhino tracking (additional $50 per person). Arrive in the afternoon and head out for a sunset game drive across the savannah. Check in at Fort Murchison Lodge for dinner and overnight. Meal plan: Lunch and Dinner.',
			highlight: 'Panoramic drive through the Luwero Triangle with optional Ziwa Rhino tracking',
			durationDays: 1,
			locationName: 'Murchison Falls National Park',
		},
		{
			stepNumber: 2,
			title: 'Sunrise Game Drive & Victoria Nile Boat Safari — Murchison Falls',
			description:
				'Breakfast is served before dawn so you can begin your morning game drive as the sun comes up. Sunrise is the best time for wildlife spotting — animals are most active during the golden hours when the first rays fall across the savannah. Elephants, buffaloes, and several antelope species are reliable sightings, with a good chance of lions and leopards. Return to the lodge for lunch, then embark on a 3-hour boat safari upstream on the Victoria Nile to the falls, passing breathtaking river scenery, Nile crocodiles, hundreds of hippos, and extraordinary waterside birdlife including the iconic shoebill stork. The boat brings you to the base of Murchison Falls and the spectacular "Devil\'s Cauldron." Return to Fort Murchison Lodge for dinner and overnight. Meal plan: Full Board.',
			highlight: '3-hour Nile boat safari to the base of Murchison Falls — crocodiles, hippos, and shoebills',
			durationDays: 1,
			locationName: 'Murchison Falls National Park',
		},
		{
			stepNumber: 3,
			title: 'Top of the Falls Walk → Queen Elizabeth National Park — Sunset Game Drive',
			description:
				'Enjoy a final sunrise breakfast in Murchison Falls National Park, then take the 30–60 minute walk to the top of the falls for a close-up view of the Nile roaring through its narrow gorge. Depart and drive south toward Queen Elizabeth National Park, set in the shadow of the Rwenzori Mountains. Stop along the way for equator experience and landscape photography. Arrive in the afternoon, have lunch, then head out for a sunset game drive expecting elephants, buffaloes, lions, bush pigs, and various antelope families. Check in at The Bush Lodge for dinner and overnight. Meal plan: Full Board.',
			highlight: 'Top of Murchison Falls walk and first game drive in Queen Elizabeth',
			durationDays: 1,
			locationName: 'Queen Elizabeth National Park',
		},
		{
			stepNumber: 4,
			title: 'Sunrise Game Drive & Kazinga Channel Boat Safari — Queen Elizabeth',
			description:
				'Set out early for a sunrise game drive in Queen Elizabeth National Park. The park\'s diverse ecosystem — grassy plains, tropical forests, rivers, swamps, lakes, and volcanic craters — makes it home to remarkable wildlife. With the Rwenzori Mountains as a backdrop, expect lions, leopards, giant forest hogs, Cape buffaloes, elephants, defassa waterbucks, Uganda kob, topi, and bushbuck. Return to the lodge for lunch. When the midday heat drives animals to the water, head to the Kazinga Channel for an exciting boat safari. Drift past hippos, Nile crocodiles, elephants, waterbucks, and hundreds of bird species on this 29-km natural channel connecting Lake Edward and Lake George. Return to The Bush Lodge for dinner and overnight. Meal plan: Full Board.',
			highlight: 'Kazinga Channel boat safari with the Rwenzori Mountains as backdrop',
			durationDays: 1,
			locationName: 'Queen Elizabeth National Park',
		},
		{
			stepNumber: 5,
			title: 'Optional Chimp Tracking at Kalinzu → Ishasha → Bwindi Impenetrable',
			description:
				'After breakfast, drive toward the Kigezi Highlands — the terraced hilltops and winding roads of the "Switzerland of Africa." Optionally stop at Kalinzu Central Forest Reserve for chimpanzee tracking (additional $50 per person — permit must be arranged in advance). Continue via the Ishasha sector of Queen Elizabeth National Park for an extended game drive in search of the famous tree-climbing lions resting in giant fig tree branches. Drive on into the southwestern Uganda highlands to Bwindi Impenetrable National Park, arriving in the evening. Check in at Broadbill Forest Camp for dinner and overnight. Meal plan: Full Board.',
			highlight: 'Tree-climbing lions at Ishasha + optional chimp tracking at Kalinzu ($50)',
			durationDays: 1,
			locationName: 'Bwindi Impenetrable National Park',
		},
		{
			stepNumber: 6,
			title: 'Mountain Gorilla Trekking & Batwa Community Visit / Lake Bunyonyi Canoe',
			description:
				'After breakfast, hike to the Bwindi park headquarters — just metres from the lodge — for the Uganda Wildlife Authority pre-trek briefing. Then begin the gorilla tracking experience through the thick untamed rainforest, scrambling over mossy rocks and through deep undergrowth in search of a habituated mountain gorilla family. The trek takes 2–6 hours; the encounter — one full hour watching gorillas in their natural habitat — lasts a lifetime. After returning, choose your afternoon experience: visit the Batwa community for traditional dance, beer brewing, and fire-setting demonstrations, or head to Lake Bunyonyi for a canoe ride across its 29 islands, including the historic Punishment Island. Check in at Bunyonyi Overland Resort for dinner and overnight. Meal plan: Full Board.',
			highlight: 'Mountain gorilla trekking — one hour with a habituated family in the impenetrable forest',
			durationDays: 1,
			locationName: 'Lake Bunyonyi',
		},
		{
			stepNumber: 7,
			title: 'Equator Experience → Entebbe International Airport — End of Safari',
			description:
				'Enjoy a final sunrise breakfast in this beautiful corner of Uganda before your guide drives you back through the rolling landscapes to Entebbe. Stop at the equator monument in Mpigi for the famous Coriolis water experiment and photos. Continue to Entebbe International Airport, arriving at least 3 hours before your departure flight. Please note: flights departing before 8:00 pm require an additional night in Entebbe — contact us and we can help arrange this. Meal plan: Breakfast and Lunch.',
			highlight: 'Equator monument stop at Mpigi — Coriolis experiment and photo moment',
			durationDays: 1,
			locationName: 'Entebbe Botanical Gardens',
		},
	],

	meta: {
		pickup: 'Entebbe International Airport (EBB)',
		meetingPoint: 'Arrival lounge, Entebbe International Airport — guide holds Evajo Tours & Travel Limited sign',

		includes: [
			'All park entrance fees',
			'Mountain Gorilla tracking permits ($800 per person)',
			'Top of Murchison Falls walk',
			'All game drives as per the itinerary',
			'Boat safaris (Victoria Nile and Kazinga Channel)',
			'Equator experience and photo moments',
			'Full board accommodation and en-route meals as indicated',
			'Full-time English-speaking driver/guide',
			'Ground transportation by a 4×4 safari van or Land Cruiser, fully fuelled',
			'All relevant government taxes',
			'Airport transfers and drinking water on all days',
			'6 breakfasts, 7 lunches, 6 dinners',
		],

		excludes: [
			'International airfares and airport taxes',
			'Ugandan visa fees',
			'Personal travel insurance',
			'Optional chimpanzee tracking at Kalinzu Forest Reserve ($50 per person)',
			'Optional white rhino tracking at Ziwa Rhino Sanctuary ($50 per person)',
			'Alcoholic and non-alcoholic beverages, tips, laundry, and personal expenses',
			'Accommodation and meals not indicated in the itinerary',
			'Accommodation on your first and last night in Uganda',
			'Any other items not listed above',
		],

		complementaries: ['Drinking water on all days'],

		faqs: [
			{
				question: 'Is this a private safari?',
				answer:
					'Yes — this is a fully private tour. Only your group participates. You will have your own dedicated vehicle and driver/guide throughout.',
			},
			{
				question: 'Are there any health or fitness requirements?',
				answer:
					'A moderate level of physical fitness is required. Gorilla trekking involves hiking over uneven, steep, and sometimes muddy terrain for 2–6 hours. This tour is not recommended for travellers with back problems, heart conditions, or other serious medical conditions, or for pregnant travellers. Please consult your doctor if in doubt.',
			},
			{
				question: 'What time should my return flight depart?',
				answer:
					'Please ensure your return flight departs no earlier than 8:00 pm to allow enough time for the drive back from Bwindi to Entebbe (Day 7). For earlier flights, an additional night in Entebbe on Day 6 is required — contact us and we will help arrange this.',
			},
			{
				question: 'Where will my guide meet me?',
				answer:
					'Your Evajo Tours & Travel Limited driver/guide will be waiting in the arrival lounge at Entebbe International Airport holding a sign with the company name. Departure is at 7:30 am, so please plan your arrival accordingly.',
			},
		],
	},
};

export default data;
