import type { SeedData } from './types.js';

/**
 * Locations required (must already exist in the database):
 *   - "Murchison Falls National Park"
 *   - "Kibale Forest National Park"
 *   - "Queen Elizabeth National Park"
 *   - "Bwindi Impenetrable National Park"
 *   - "Lake Bunyonyi"
 *   - "Lake Mburo National Park"
 *   - "Entebbe Botanical Gardens"   (used for the final day / Entebbe drop-off)
 */
const data: SeedData = {
	itinerary: {
		id: 'seed-uganda-wildlife-primates-9day',
		title: '9 Days Uganda Wildlife and Primates Safari',
		summary:
			"An immersive 9-day journey through Uganda's finest national parks - from the thundering Murchison Falls and chimpanzee forests of Kibale to a face-to-face encounter with mountain gorillas in Bwindi.",
		description: `This 9-day safari offers a comprehensive overview of Uganda's top tourist destinations and wildlife experiences. You will visit Murchison Falls National Park for big-game drives and a Victoria Nile boat cruise, track chimpanzees in Kibale National Park or the Bigodi Wetland Sanctuary, explore the diverse ecosystems of Queen Elizabeth National Park including the Kazinga Channel, track chimpanzees at Kalinzu Forest Reserve, watch tree-climbing lions in the Ishasha sector, and culminate in a face-to-face encounter with endangered mountain gorillas in Bwindi Impenetrable or Mgahinga Gorilla National Park. The safari concludes with a guided walking safari in Lake Mburo National Park and an equator crossing on the drive back to Entebbe.

The tour starts and ends at Entebbe International Airport, with pickup and drop-off included.`,
		durationDays: 9,
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
				"Your driver/guide from Evajo Tours & Travel will meet you at Entebbe International Airport and begin the scenic drive north-west through the Luwero Triangle and Masindi Town to Murchison Falls National Park - Uganda's largest wildlife reserve, bisected by the River Nile. Arrive in the afternoon for lunch at the spectacularly situated site at the top of the falls, then set out for a sunset game drive across the northern savannah in search of elephants, giraffes, buffalo, lions, and Uganda kob. Optional stop at Ziwa Rhino Sanctuary en route to track southern white rhinos on foot (USD 50 per person additional fee).",
			highlight: 'Optional white rhino tracking at Ziwa Rhino Sanctuary',
			durationDays: 1,
			locationName: 'Murchison Falls National Park',
		},
		{
			stepNumber: 2,
			title: 'Sunrise Game Drive & Victoria Nile Boat Safari',
			description:
				'Pre-dawn breakfast so you can begin the morning game drive as the sun rises over the northern savannah - the golden hours are the best time to spot elephants, buffalo, lions, and leopards at their most active. Return to the lodge for lunch, then board a boat for a 3-hour cruise upstream on the Victoria Nile to the base of Murchison Falls, passing breathtaking scenery and watching hippos, Nile crocodiles, and hundreds of waterbirds at close range as you near the thundering base of the falls.',
			highlight: 'Boat cruise to the base of Murchison Falls on the Victoria Nile',
			durationDays: 1,
			locationName: 'Murchison Falls National Park',
		},
		{
			stepNumber: 3,
			title: 'Top of the Falls Walk & Transfer to Kibale National Park',
			description:
				"A short 30–60 minute walk to the top of Murchison Falls rewards you with a dramatic view of the Nile forcing itself through the impossibly narrow 7-metre cleft of rock. Then drive south, stopping for lunch in Fort Portal - Uganda's tourism city. In the afternoon choose between a guided Crater Lakes and tea plantation walk through the picturesque Kigezi highlands (some craters over 400 m deep), or explore the historic Amabere Ga Nyina Mwiru Caves whose stalactites, crater lake views, and Bachwezi legend make for a fascinating visit.",
			durationDays: 1,
			locationName: 'Kibale Forest National Park',
		},
		{
			stepNumber: 4,
			title: 'Bigodi Wetland / Chimp Tracking & Transfer to Queen Elizabeth NP',
			description:
				"Wake early for breakfast then head into Bigodi Wetland Sanctuary - a community-managed swamp bordering Kibale, home to 8 primate species, over 200 bird species, butterflies, and various reptiles. Alternatively, enter Kibale National Park itself for an optional chimpanzee tracking experience (permit included in the package): follow an experienced ranger guide deep into the forest to observe these fascinating creatures grooming, playing, and foraging at close range. In the afternoon, transfer to Queen Elizabeth National Park for lunch and a sunset game drive across the savannah.",
			highlight: 'Chimpanzee tracking permit included (Kalinzu Forest Reserve)',
			durationDays: 1,
			locationName: 'Queen Elizabeth National Park',
		},
		{
			stepNumber: 5,
			title: 'Sunrise Game Drive & Kazinga Channel Boat Safari',
			description:
				"Early morning game drive across Queen Elizabeth's diverse ecosystem of grassy plains, tropical forests, rivers, swamps, lakes, and volcanic craters, with the snow-capped Rwenzori Mountains as a backdrop - scanning for lions, leopards, giant forest hogs, Cape buffalo, elephants, defassa waterbuck, Uganda Kob, topi, and bushbuck. Return for lunch, then when the sun is high and the animals make their way down to the water, board a boat for a 2-hour cruise on the famous Kazinga Channel, where thousands of hippos, Nile crocodiles, buffalo, and elephants congregate at the shore.",
			highlight: "Kazinga Channel boat safari - one of Uganda's best wildlife experiences",
			durationDays: 1,
			locationName: 'Queen Elizabeth National Park',
		},
		{
			stepNumber: 6,
			title: 'Chimp Tracking at Kalinzu Forest Reserve & Transfer to Bwindi',
			description:
				"After breakfast, drive to Kalinzu Central Forest Reserve for chimpanzee tracking with experienced guides - one of the most accessible and affordable chimp tracking experiences in Uganda (permit USD 50 per person). Continue south through the Ishasha sector of Queen Elizabeth National Park for a game drive in search of the famous tree-climbing lions, which rest in the broad branches of giant fig trees overlooking the open plains. Then drive through the scenic Kigezi Highlands - the 'Switzerland of Africa' - with its terraced hillsides and winding mountain roads, arriving at Bwindi Impenetrable or Mgahinga Gorilla National Park in time for dinner.",
			highlight: 'Tree-climbing lions at Ishasha + chimp tracking at Kalinzu',
			durationDays: 1,
			locationName: 'Bwindi Impenetrable National Park',
		},
		{
			stepNumber: 7,
			title: 'Mountain Gorilla Tracking & Batwa Community Visit / Lake Bunyonyi',
			description:
				"The undisputed highlight of the safari. After an early breakfast, transfer to the park headquarters for a briefing by Uganda Wildlife Authority rangers covering gorilla behaviour, trekking etiquette, and safety. Head into the ancient impenetrable forest - one of Africa's oldest and most biodiverse rainforests - with your ranger guides and trackers in search of a habituated mountain gorilla family. The trek can take 2 to 6 hours through mossy rocks and deep undergrowth. Spend a magical one hour observing the family at close range: silverbacks resting, juveniles playing, mothers nursing. Afterwards, choose between a canoe ride on the tranquil island-dotted waters of Lake Bunyonyi - one of the few bilharzia-free lakes in East Africa - or a Batwa Pygmy community visit for traditional dance, fire-making, and cultural storytelling.",
			highlight: 'Mountain gorilla tracking permit (USD 700 per person) included',
			durationDays: 1,
			locationName: 'Lake Bunyonyi',
		},
		{
			stepNumber: 8,
			title: 'Transfer to Lake Mburo National Park - Afternoon Game Drive',
			description:
				'After an early breakfast, leave the highlands of Kigezi and drive east via Kabale Town to Lake Mburo National Park - the smallest savannah national park in Uganda and the only park in the country where zebras are found. You will be welcomed into the park by herds of zebra, buffalo, eland, and antelope grazing in the golden savannah grass. Arrive for lunch, then set out for an afternoon game drive assuring you of close encounters with zebras, buffaloes, impalas, warthogs, and waterbucks. The park also offers exceptional birding, including the malachite kingfisher, African fish eagle, blue-headed weaver, and the rare shoebill stork.',
			durationDays: 1,
			locationName: 'Lake Mburo National Park',
		},
		{
			stepNumber: 9,
			title: 'Walking Safari, Equator Crossing & Departure',
			description:
				'Enjoy your last sunrise in the beautiful savannah with a guided walking safari in Lake Mburo - on foot you can spot zebras, giraffes, eland, topi, Cape buffalo, and impalas at remarkably close range, and hike to the hilltop viewpoint overlooking nine of the twelve lakes surrounding Lake Mburo. After the walk, begin the drive back to Kampala and Entebbe, stopping at the equator on the Kampala–Masaka highway for the famous equator experience: photos straddling the line and the water-spinning demonstration. Your guide will drop you at Entebbe International Airport at least 3 hours before your international departure. Only breakfast, lunch, and drinking water are provided on this day.',
			highlight: 'Guided walking safari in Lake Mburo and equator experience',
			durationDays: 1,
			locationName: 'Entebbe Botanical Gardens',
		},
	],

	meta: {
		pickup: 'Entebbe International Airport (EBB)',
		meetingPoint: 'Entebbe International Airport, Kampala Road, Entebbe, Uganda',

		includes: [
			'Mountain gorilla tracking permit (USD 700 per person)',
			'Chimpanzee tracking permit at Kalinzu Forest Reserve (USD 50 per person)',
			'All park entrance and activity fees',
			'Top of Murchison Falls walk',
			'Game drives throughout the safari',
			'Boat safari on the Victoria Nile (Murchison Falls)',
			'Boat safari on the Kazinga Channel (Queen Elizabeth NP)',
			'Walking safari in Lake Mburo National Park',
			'Equator experience and photo stop',
			'Full-board accommodation and en-route meals as indicated',
			'Full-time English-speaking driver/guide',
			'Ground transportation in a 4×4 safari van or Land Cruiser (fully fuelled)',
			'All relevant government taxes',
			'Batwa/Pygmy community visit or canoe/boat ride on Lake Bunyonyi',
			'Airport pickup and drop-off at Entebbe',
			'Drinking water on all days',
			'8 breakfasts, 9 lunches, 8 dinners',
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
				question: 'Are there any health or fitness requirements?',
				answer:
					'Gorilla trekking involves hiking through dense forest on uneven terrain and is not recommended for travellers with back problems, heart conditions, or other serious medical conditions. It is also not suitable for pregnant travellers. Travellers should have a moderate physical fitness level. Please consult your doctor if you have any concerns.',
			},
			{
				question: 'Is wheelchair access available?',
				answer:
					'No - the safari involves off-road game drives, forest treks, and walking safaris that are not accessible to wheelchair users.',
			},
			{
				question: 'What time does the tour start?',
				answer:
					'The tour departs at approximately 07:30 am from Entebbe on Day 1. Your driver/guide will meet you at the arrival lounge of Entebbe International Airport holding an Evajo Tours & Travel sign.',
			},
		],
	},
};

export default data;
