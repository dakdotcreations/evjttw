import type { SeedData } from './types.js';

/**
 * Locations required (must already exist in the database):
 *   - "Amboseli National Park"          → Days 1 & 2
 *   - "Lake Nakuru National Park"       → Day 3
 *   - "Maasai Mara National Reserve"    → Days 4, 5 & 6
 *
 * NOTE: "Lake Naivasha" does not exist in the main seed.
 * Add it to seed.ts before running seed:itineraries, or map Day 7 to a
 * nearby existing Kenya location. The step uses locationName "Lake Naivasha"
 * and the runner will throw a clear error if it is missing.
 */
const data: SeedData = {
	itinerary: {
		id: 'seed-kenya-exclusive-safari-7day',
		title: '7 Day Kenya Exclusive Safari',
		summary:
			"Seven days exploring Kenya\'s finest - elephant-filled Amboseli beneath Kilimanjaro, the flamingo-lined shores of Lake Nakuru, two full days of Big Five action in the Maasai Mara, and a final boat ride on Lake Naivasha.",
		description: `This seven-day exclusive safari guides you through Kenya\'s most celebrated wildlife destinations, from the iconic elephant herds of Amboseli to the dramatic plains of the Maasai Mara.

Amboseli National Park embodies five distinct wildlife habitats - open plains, acacia woodland, lava thorn-bush, swamps, and marshes - all set against the magnificent backdrop of Mount Kilimanjaro. It is Kenya\'s most photogenic park and home to some of the largest elephant herds on the continent, alongside lions, cheetahs, zebras, and wildebeest.

Lake Nakuru National Park is one of East Africa\'s great birding destinations, famous for its roseate flamingos and over 400 bird species. The park also shelters both white and black rhinos, warthogs, waterbucks, buffaloes, reedbucks, and the occasional leopard - all within a compact 180 sq km reserve.

The Maasai Mara needs little introduction. At 1,510 sq km of open savannah and riverine woodland, it offers Africa\'s most reliable Big Five sightings year-round. The ultimate spectacle is the Great Wildebeest Migration - millions of wildebeest crossing north from the Serengeti in July and August before returning south in October. Even outside migration season, game viewing in the Mara is exceptional.

The safari ends with a boat ride on the papyrus-fringed shores of Lake Naivasha before returning to Nairobi for your international flight.`,
		durationDays: 7,
		currency: 'USD',
		fixedPrice: null,
		pricePerPerson: null,
		pricingDisabled: false,
		bestSeasons: ['June', 'July', 'August', 'September', 'October'],
		published: true,
	},

	steps: [
		{
			stepNumber: 1,
			title: 'Nairobi → Amboseli National Park - Afternoon Game Drive',
			description:
				'Pick up from Nairobi airport or hotel and transfer south to Amboseli National Park, arriving in time for a hot lunch at Kibo Safari Camp. Amboseli is Kenya\'s most iconic park - five contrasting wildlife habitats converging at the foot of Africa\'s highest peak. In the afternoon, head out for your first game drive across the dry lake-bed plains, scanning for Amboseli\'s famous large elephant herds, lions, cheetahs, Maasai giraffe, zebras, and wildebeest with Kilimanjaro dominating the horizon. Dinner and overnight at Kibo Safari Camp. Meal plan: Full Board.',
			highlight: 'Amboseli elephant herds with Mount Kilimanjaro as backdrop - Kenya\'s most iconic view',
			durationDays: 1,
			locationName: 'Amboseli National Park',
		},
		{
			stepNumber: 2,
			title: 'Full Day - Amboseli National Park',
			description:
				'Spend the full day exploring Amboseli\'s five diverse wildlife habitats on morning and afternoon game drives. The park\'s open plains, yellow-barked acacia woodland, rocky lava thorn-bush, and swampy marshes each hold different species and offer dramatically different landscapes. Amboseli\'s elephant families are the most studied in the world, and interactions between breeding herds are a regular highlight. Optionally, a Maasai cultural village visit can be arranged at minimal extra cost payable directly. Dinner and overnight at Kibo Safari Camp. Meal plan: Full Board.',
			highlight: 'Full-day Amboseli wildlife exploration - the most-studied elephant families in the world',
			durationDays: 1,
			locationName: 'Amboseli National Park',
		},
		{
			stepNumber: 3,
			title: 'Amboseli → Lake Nakuru National Park - Evening Game Drive',
			description:
				'After breakfast, depart for Lake Nakuru National Park in Kenya\'s Rift Valley. Arrive for lunch and check in at Sarova Lion Hill Lodge. Lake Nakuru covers 180 sq km and is one of Kenya\'s most ornithologically rich parks, home to over 400 bird species. The lake is famous for its colonies of pink flamingos - at peak season the shoreline turns entirely flamingo-pink. White and black rhinos were introduced to the park and are regularly sighted; other residents include warthogs, waterbucks, buffaloes, reedbucks, and leopards. Head out for an evening game drive to make the most of the golden hour light. Dinner and overnight at Sarova Lion Hill Lodge. Meal plan: Full Board.',
			highlight: 'Lake Nakuru flamingos, rhinos, and 400+ bird species in Kenya\'s Rift Valley',
			durationDays: 1,
			locationName: 'Lake Nakuru National Park',
		},
		{
			stepNumber: 4,
			title: 'Lake Nakuru → Maasai Mara Game Reserve',
			description:
				'After breakfast, depart for the world-famous Maasai Mara Game Reserve - 1,510 sq km of sweeping savannah and fertile riverine woodland following the looping meanders of the Mara and Talek rivers. Arrive at Mara Simba Lodge in time for lunch. The next two days will be devoted to game viewing in the early morning and evening, when wildlife is most active. En route to the Mara you may spot wildlife on the open Rift Valley floor. Arrive, settle in, and enjoy a late afternoon game drive to start acquainting yourself with the reserve. Dinner and overnight at Mara Simba Lodge. Meal plan: Full Board.',
			highlight: 'Arrival in the Maasai Mara - Big Five country and wildebeest migration territory',
			durationDays: 1,
			locationName: 'Maasai Mara National Reserve',
		},
		{
			stepNumber: 5,
			title: 'Full Day - The Maasai Mara',
			description:
				'Spend a full day in the heart of the Maasai Mara on morning and afternoon game drives. The reserve teams with Maasai giraffe, baboons, warthogs, bat-eared foxes, grey jackals, spotted hyenas, topi, impalas, hartebeest, and wildebeest - alongside elephants, buffaloes, zebras, and hippos in great numbers. Lions are commonly seen basking after a heavy meal or prowling the plains; cheetahs and leopards are harder to find but reasonably common. During July and August, the annual wildebeest migration brings millions of animals north from the Serengeti in search of fresh grass - one of the greatest wildlife spectacles on earth. On clear evenings, the Mara offers spectacular orange-tinted sunsets best savoured with sundowners at the lodge. Dinner and overnight at Mara Simba Lodge. Meal plan: Full Board.',
			highlight: 'Full-day Big Five game drives - wildebeest migration river crossings in season',
			durationDays: 1,
			locationName: 'Maasai Mara National Reserve',
		},
		{
			stepNumber: 6,
			title: 'Full Day - The Maasai Mara',
			description:
				'A second full day in the Maasai Mara, maximising the chance of sightings missed on previous drives. Optionally, an early morning hot-air balloon flight at dawn offers a breathtaking aerial perspective over the plains and wildlife, followed by a champagne bush breakfast on landing (additional cost). The afternoon game drive continues through the reserve\'s riverine woodland and open grassland in search of the Mara\'s diverse wildlife. Dinner and overnight at Mara Simba Lodge. Meal plan: Full Board.',
			highlight: 'Optional sunrise hot-air balloon flight with champagne breakfast over the Mara',
			durationDays: 1,
			locationName: 'Maasai Mara National Reserve',
		},
		{
			stepNumber: 7,
			title: 'Lake Naivasha Boat Ride → Nairobi - End of Safari',
			description:
				'After breakfast, depart the Mara and drive north to Lake Naivasha - a freshwater Rift Valley lake ringed by yellow fever acacia woodland and papyrus. Arrive for lunch, then enjoy a boat ride on the lake, spotting hippos, Nile crocodiles, African fish eagles, and a remarkable variety of waterbirds including pelicans, cormorants, herons, and kingfishers. After the boat trip, transfer to Nairobi to catch your international flight home, marking the end of your Kenya Exclusive Safari.',
			highlight: 'Lake Naivasha boat ride - hippos, fish eagles, and a scenic Rift Valley farewell',
			durationDays: 1,
			locationName: 'Lake Naivasha',
		},
	],

	meta: {
		pickup: 'Jomo Kenyatta International Airport (NBO) or Nairobi hotel',
		meetingPoint: 'Airport or Hotel',

		includes: [
			'All park entrance fees',
			'Full board accommodation',
			'Professional guide',
			'4×4 Land Cruiser or Safari Van',
			'Drinking water while on safari (2 litres per person per day)',
		],

		excludes: [
			'Guide service fee',
			'Driver service fee',
			'Private expenses',
			'Room service fees',
			'International airfares',
			'Kenyan visa',
			'Optional activities not listed in the itinerary',
			'Hot-air balloon flight (optional, additional cost)',
			'Maasai village visit (optional, minimal extra cost payable direct)',
		],

		complementaries: [],

		faqs: [
			{
				question: 'When is the best time to visit Kenya for the wildebeest migration?',
				answer:
					'The Great Wildebeest Migration crosses into the Maasai Mara from the Serengeti between July and October, with the most dramatic river crossings typically occurring in August and September. Year-round game viewing is excellent even outside migration season.',
			},
			{
				question: 'Is Lake Naivasha safe for a boat ride?',
				answer:
					'Yes - boat rides on Lake Naivasha are a well-established activity operated by licensed guides. The lake is famous for its hippo population, which are observed from a safe distance on the water.',
			},
		],
	},
};

export default data;
