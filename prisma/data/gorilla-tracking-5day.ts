import type { SeedData } from './types.js';

/**
 * Locations required (must already exist in the database):
 *   - "Bwindi Impenetrable National Park"    (Days 1 & 2)
 *   - "Queen Elizabeth National Park"        (Days 3 & 4 incl. Ishasha & Kyambura)
 *   Note: Day 5 (Equator stop + Entebbe/airport departure) has no locationName.
 */
const data: SeedData = {
	itinerary: {
		id: 'seed-gorilla-tracking-5day',
		title: '5 Days Gorilla Tracking Safari',
		summary:
			'An exclusive five-day Uganda wilderness experience — Batwa cultural encounters and mountain gorilla trekking in Bwindi, followed by tree-climbing lions, Kazinga Channel hippos, and chimp trekking in the Kyambura Gorge of Queen Elizabeth National Park.',
		description: `Embark on an unforgettable five-day adventure into the heart of Uganda's wilderness. Prepare to be captivated by the rare beauty of mountain gorillas in Bwindi Impenetrable National Park and the abundant wildlife of Queen Elizabeth National Park.

Begin with a scenic drive from Kampala through lush, Switzerland-like landscapes to Bwindi — a UNESCO World Heritage Site sheltering roughly half the world's remaining mountain gorillas. Spend the first evening on a Batwa community cultural walk before the main event: an early morning gorilla trekking expedition deep into the ancient rainforest. Come face to face with habituated mountain gorilla families, observe their behaviour, and spend one magical hour among these gentle giants.

Transfer south through the Ishasha sector — famous for its tree-climbing lions — to Queen Elizabeth National Park for a Kazinga Channel boat cruise teeming with hippos, crocodiles, and waterbirds. On Day 4, choose between a chimpanzee trek into the dramatic Kyambura Gorge or a game drive along the Kasenyi Trail for giraffes, Kob, and buffalo. The tour concludes with a scenic return drive via the Equator monument to Entebbe.

This is a private tour — only your group will participate.`,
		durationDays: 5,
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
			title: 'Kampala → Bwindi — Scenic Drive & Batwa Community Walk',
			description:
				"Depart Kampala early for the long but spectacular drive south-west to Bwindi Impenetrable National Park — passing through the Kigezi Highlands, known as the Switzerland of Africa, with rolling terraced hillsides, banana plantations, and misty mountain ridges. Arrive at your lodge, check in, and choose from a selection of deluxe accommodations nestled in the forest. In the afternoon, venture into the northern edge of the Bwindi Rainforest on a Batwa community cultural walk — meeting Africa's oldest forest-dwelling people and experiencing their traditional dances, fire-making, medicinal plant knowledge, and forest lore. Return to the lodge for dinner and a restful night in the forest. Dinner and overnight near Bwindi.",
			highlight: 'Batwa/Pygmy community cultural walk and traditional dances',
			durationDays: 1,
			locationName: 'Bwindi Impenetrable National Park',
		},
		{
			stepNumber: 2,
			title: 'Mountain Gorilla Trekking — Bwindi Impenetrable Forest',
			description:
				"Awaken before dawn for an early breakfast, then gather at the park headquarters for a comprehensive briefing by Uganda Wildlife Authority rangers — covering gorilla behaviour, health precautions, and forest etiquette. Transfer to the trekking start point and enter the ancient Bwindi forest. Navigate through dense vegetation, mossy rocks, and challenging terrain with expert ranger guidance until you come face to face with a habituated mountain gorilla family. Spend one magical hour observing silverbacks at rest, juveniles wrestling, and mothers nursing infants in the mist. Capture unforgettable moments before trekking back to the lodge for a well-deserved dinner. Dinner and overnight near Bwindi.",
			highlight: 'Mountain gorilla trekking permit (USD 700 per person) included',
			durationDays: 1,
			locationName: 'Bwindi Impenetrable National Park',
		},
		{
			stepNumber: 3,
			title: 'Bwindi → Queen Elizabeth NP via Ishasha — Boat Cruise on Kazinga Channel',
			description:
				"After breakfast, bid farewell to Bwindi and drive north through Queen Elizabeth National Park, entering via the remote Ishasha sector — the only place in Africa outside the Congo where lions regularly climb and rest in large fig trees. Spend time game-viewing along the Ishasha circuit, scanning the broad branches of towering fig trees for lions at rest and the grassland below for Uganda Kob, topi, buffalo, and antelope. Continue to the main park area, refresh at your accommodation, then in the afternoon embark on a captivating boat cruise along the Kazinga Channel — the natural waterway linking Lake George to Lake Edward. Witness hippos at close range, Nile crocodiles lining the banks, abundant waterbirds, and large herds of buffalo and elephant coming to drink. Dinner and overnight at the lodge.",
			highlight: 'Tree-climbing lions at Ishasha + Kazinga Channel hippo cruise',
			durationDays: 1,
			locationName: 'Queen Elizabeth National Park',
		},
		{
			stepNumber: 4,
			title: 'Kyambura Gorge Chimp Trek or Kasenyi Game Drive — Queen Elizabeth NP',
			description:
				"Embark on your choice of adventure today. Option A — Kyambura Gorge chimpanzee trek: descend into the dramatic Kyambura Gorge, a sunken rainforest carved by the Kyambura River into the Queen Elizabeth savannah, home to a habituated chimpanzee community. Trek with experienced ranger guides through this spectacular gorge, spotting chimps, black-and-white colobus, and red-tailed monkeys against the backdrop of sheer walls and lush vegetation. Option B — Kasenyi game drive: explore the open Kasenyi plains in search of Rothschild's giraffes, Kob, Cape buffalo, leopards, and lion prides. Both options offer rich wildlife viewing. After your chosen activity, begin the drive back towards Kampala, arriving in the evening for onward connections.",
			highlight: 'Chimp trek in Kyambura Gorge or Kasenyi game drive — your choice',
			durationDays: 1,
			locationName: 'Queen Elizabeth National Park',
		},
		{
			stepNumber: 5,
			title: 'Equator Experience & Transfer to Entebbe',
			description:
				"After breakfast, depart for Entebbe with a scenic drive north. Stop at the Uganda Equator monument at Kayabwe for photos and the famous water-flow demonstration — standing with one foot in the Northern Hemisphere and one in the Southern. Enjoy lunch en route before continuing to Entebbe or Kampala, where your driver/guide will transfer you to a hotel or Entebbe International Airport for your return flight. We hope you carry home extraordinary memories of the Pearl of Africa.",
			highlight: 'Equator monument stop at Kayabwe',
			durationDays: 1,
		},
	],

	meta: {
		pickup: 'Kampala or Entebbe International Airport (EBB)',
		meetingPoint:
			'Your hotel in Kampala or Entebbe — your driver/guide will collect you at the agreed time.',

		includes: [
			'Mountain gorilla trekking permit at Bwindi Impenetrable (USD 700 per person)',
			'All park entrance fees and vehicle park entry fees',
			'Batwa community cultural walk',
			'Game drive at Ishasha sector (tree-climbing lions)',
			'Kazinga Channel boat cruise',
			'Chimpanzee trek at Kyambura Gorge or Kasenyi game drive (Day 4)',
			'Equator experience and photo stop',
			'All meals as indicated (breakfast, lunch, dinner)',
			'Full-board accommodation throughout (Days 1–4)',
			'Full-time English-speaking driver/guide',
			'Ground transportation in a 4×4 safari vehicle (fully fuelled)',
			'Bottled water in the vehicle on all days',
			'Hotel/airport pickup and drop-off',
		],

		excludes: [
			'International flights and airfares',
			'Ugandan visa fees',
			'Personal travel insurance',
			'Alcoholic and non-alcoholic beverages',
			'Tips and gratuities',
			'Personal expenses (souvenirs, laundry, etc.)',
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
					'Gorilla trekking involves hiking through dense, steep rainforest on uneven terrain for up to several hours. It is not suitable for travellers with serious heart conditions, back problems, or other significant medical conditions, or for pregnant travellers. A moderate level of physical fitness is required.',
			},
			{
				question: 'What is the minimum age for gorilla trekking?',
				answer:
					'The minimum age for gorilla trekking in Uganda is 15 years, as set by Uganda Wildlife Authority.',
			},
			{
				question: 'Can I choose the Day 4 activity in advance?',
				answer:
					'Yes — please let us know your preference when booking (Kyambura Gorge chimpanzee trek or Kasenyi game drive) so we can arrange the permit if required.',
			},
			{
				question: 'When will I receive booking confirmation?',
				answer: 'Confirmation will be received at the time of booking.',
			},
		],
	},
};

export default data;
