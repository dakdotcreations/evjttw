import type { SeedData } from './types.js';

/**
 * Locations required (must already exist in the database):
 *   - "Queen Elizabeth National Park"
 */
const data: SeedData = {
	itinerary: {
		id: 'seed-queen-elizabeth-wildlife-tour',
		title: '3 Day Queen Elizabeth Wildlife Tour',
		summary:
			"Track tree-climbing lions, cruise the hippo-lined Kazinga Channel, and witness Uganda\'s most famous wildlife in one of Africa\'s most diverse national parks.",
		description: `Queen Elizabeth National Park is Uganda\'s most visited wildlife reserve and one of the most biodiverse parks in Africa, home to over 95 mammal species and more than 600 bird species. The park\'s varied landscape - from open savannah and crater lakes to the Kazinga Channel wetlands and the remote Ishasha sector - delivers a full spectrum of wildlife encounters within a single destination.

The park is famous for its tree-climbing lions, a unique behaviour most commonly observed in the Ishasha sector where lions drape themselves across fig-tree branches. Other highlights include large herds of Uganda kob, elephants, hippos, Nile crocodiles, buffaloes, leopards, hyenas, chimpanzees, and an extraordinary array of water birds along the Kazinga Channel.

The Kazinga Channel connects Lake Edward and Lake George, forming one of the best boat safari routes in Africa. Afternoon cruises drift past hippo pools and crocodile banks while elephants bathe on the shoreline.

The safari starts and ends in Kampala or Entebbe, with pickup at Entebbe International Airport.`,
		durationDays: 3,
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
			title: 'Kampala / Entebbe → Queen Elizabeth National Park',
			description:
				"Pick up from your Kampala hotel or Entebbe Airport and begin the 6–7 hour drive to Queen Elizabeth National Park. Stop at the equator for photos and a browse of the craft shops, then enjoy lunch at Igongo Cultural Center - featuring striking animal and human sculptures, a museum, and a bookshop. Continue through Mbarara, Bushenyi, and Fort Portal and arrive at the park in the late afternoon. Head straight into the Ishasha sector for a night game drive in search of the famous tree-climbing lions, which often rest draped across fig-tree branches at dusk. Check in, refresh, and dine at your lodge: Mweya Safari Lodge (luxury), Park View Safari Lodge (mid-range), or Pumba Safari Lodge (budget). Meal plan: Half Board.",
			highlight: 'Tree-climbing lions in the Ishasha sector - a uniquely Ugandan spectacle',
			durationDays: 1,
			locationName: 'Queen Elizabeth National Park',
		},
		{
			stepNumber: 2,
			title: 'Lion Tracking Game Drive & Kazinga Channel Boat Cruise',
			description:
				"Rise early for breakfast, then head to the Kasenyi Plains for a morning lion-tracking game drive. The open grasslands are prime habitat for lions, elephants, buffaloes, hyenas, Uganda kob, and a diverse array of savannah birds. Return to the lodge for lunch. In the afternoon, board a boat for a cruise along the Kazinga Channel - one of Africa\'s finest boat safaris - drifting past hippo pods, basking Nile crocodiles, water buffaloes, elephants bathing at the water\'s edge, and hundreds of bird species including African skimmers, pink-backed pelicans, and pied kingfishers. Stop to visit Lake Katwe Salt Works and observe traditional rock salt extraction methods that have been used for centuries. Optionally, continue to Lake Munyanyange for dedicated bird watching. Return to the lodge for dinner and overnight. Meal plan: Full Board.",
			highlight: 'Kazinga Channel boat safari - hippos, crocodiles, and 600+ bird species',
			durationDays: 1,
			locationName: 'Queen Elizabeth National Park',
		},
		{
			stepNumber: 3,
			title: 'Final Game Drive → Return to Kampala',
			description:
				'After breakfast, check out of the lodge and enjoy a final 3-hour morning game drive to pick up any animals missed on previous drives. Depart the park and drive northeast toward Kampala, passing through rolling tea plantations and stopping for lunch in Fort Portal. Continue via Mubende, arriving in Kampala in the early evening. Drop-off at Entebbe International Airport, your Kampala hotel, or any chosen lodge.',
			highlight: null,
			durationDays: 1,
			locationName: 'Queen Elizabeth National Park',
		},
	],

	meta: {
		pickup: 'Entebbe International Airport (EBB)',
		meetingPoint: 'Airport or Hotel',

		includes: [
			'All park entrance fees',
			'Full board accommodation',
			'Vehicle and fuel',
			'Lion tracking fees',
			'Boat cruise on the Kazinga Channel',
			'Crater lake tour (optional)',
		],

		excludes: [
			'Air flight tickets',
			'Ugandan visas',
			'Optional activities not listed in the itinerary',
			'Porter fees when tracking',
			'Personal insurance and shopping',
			'Any other item not mentioned above',
		],

		complementaries: ['Bottle of water', 'T-Shirt'],

		faqs: [
			{
				question: "I\'m a solo traveller, is that ok?",
				answer:
					'Absolutely. This is the beauty of the Evajo Tours and Travel Limited style of travel - many of our travellers join because they are travelling solo and want to meet and share experiences with like-minded people. As a responsible tour operator, we strive to create a safe and inclusive environment for everyone.',
			},
			{
				question: 'What should I pack for my safari?',
				answer:
					'Essential items include lightweight and neutral-coloured clothing, a wide-brimmed hat, sunscreen, insect repellent, sturdy walking shoes, binoculars, a camera with extra batteries and memory cards, and any necessary medications.',
			},
			{
				question: 'Should I book pre/post tour accommodation?',
				answer:
					'Accommodation is included in the safari package, so there is no need to book separately. In rare cases, clients wish to upgrade to different accommodation - that is absolutely fine as long as you are available at the time of the tour.',
			},
			{
				question: 'What is the cancellation policy?',
				answer:
					'Cancellations made 30+ days before departure receive a full refund less the deposit. Cancellations 15–29 days before departure forfeit 50% of the total cost. Cancellations within 14 days of departure are non-refundable. We strongly recommend travel insurance.',
			},
		],
	},
};

export default data;
