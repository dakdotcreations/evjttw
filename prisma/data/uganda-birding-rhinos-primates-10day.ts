import type { SeedData } from './types.js';

/**
 * Locations required (must already exist in the database):
 *   - "Entebbe Botanical Gardens"      (Days 1 & 10 — Entebbe/Kampala area)
 *   - "Ziwa Rhino Sanctuary"           (Day 2)
 *   - "Murchison Falls National Park"  (Day 3 — Budongo Forest is in Masindi, same area)
 *   - "Kibale Forest National Park"    (Days 4 & 5)
 *   - "Bwindi Impenetrable National Park" (Days 6, 7 & 8)
 *   - "Lake Mburo National Park"       (Day 9)
 */
const data: SeedData = {
	itinerary: {
		id: 'seed-uganda-birding-rhinos-primates-10day',
		title: '10 Days Uganda Birding, Rhinos and Primates Safari',
		summary:
			"A paradise for bird lovers — 10 days exploring Uganda's richest birding habitats from the shoebill swamps of Mabamba and the canopies of Budongo Forest to gorilla trekking in Bwindi and chimp tracking in Kibale.",
		description: `This 10-day safari is a reward for bird lovers, combining Uganda's most biodiverse ecosystems into one immersive journey. From the prehistoric shoebill at Mabamba Swamp and forest birds of Mpanga to the Albertine Rift endemics of Bwindi and the Green-breasted Pitta of Kibale, this itinerary targets over 600 possible species across habitats that range from papyrus swamps and lowland rainforest to montane cloud forest and open savannah.

Beyond birding, the safari weaves in Uganda's finest wildlife encounters: tracking southern white rhinos on foot at Ziwa Rhino Sanctuary, chimpanzee tracking in Kibale Forest National Park, and mountain gorilla trekking in Bwindi Impenetrable National Park. Tree-climbing lions are possible through the Ishasha sector en route to Bwindi, and game viewing in Lake Mburo rounds out the experience.

The tour starts and ends at Entebbe International Airport, with pickup and drop-off included.`,
		durationDays: 10,
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
			title: 'Mabamba Swamp Shoebill Search & Mpanga Forest Birding',
			description:
				"The first day is entirely devoted to birding. Begin at Mabamba Swamp — a vast marshland of papyrus-fringed channels along the northern shore of Lake Victoria, and one of the world's best locations to find the prehistoric shoebill stork. Guides paddle dugout canoes through the swamp's channels (typically 2–3 hours) while the shoebill stands motionless, hunting lungfish, frogs, and water snakes. Other species include African Jacana, Yellow-billed Duck, White-faced Whistling Duck, Long-toed Plover, Purple Swamphen, Northern Brown-throated Weaver, Malachite Kingfisher, Papyrus Gonolek, African Darter, White-winged Warbler, and Rufous-bellied Heron.\n\nAfter Mabamba, drive to Mpanga Forest — a 453-hectare patch of natural equatorial rainforest 37 km southwest of Kampala, supporting over 300 bird species, 500 tree species, and three monkey species. Search for Little Greenbul, Lesser Honeyguide, Grey-headed Nigrita, White-breasted Nigrita, Western Black-headed Oriole, White-spotted Flufftail, Red-tailed Bristlebill, and Fire-crested Alethe. Overnight in Kampala.",
			highlight: 'Shoebill stork search by canoe at Mabamba Swamp',
			durationDays: 1,
			locationName: 'Entebbe Botanical Gardens',
		},
		{
			stepNumber: 2,
			title: 'Rhino Tracking at Ziwa Rhino Sanctuary & Transfer to Masindi',
			description:
				"After breakfast, drive north to Ziwa Rhino Sanctuary — established in 2005, it is the only place in Uganda where southern white rhinos roam in a wild, unfenced landscape. The sanctuary now hosts over 22 white rhinos and tracking them on foot with armed rangers is a truly exhilarating experience. The sanctuary is also excellent for birding: look for White-crested Turaco, Bruce's Green Pigeon, Thick-billed Cuckoo, White-winged Tit, and numerous woodland and waterbird species around the lakes and seasonal swamps. In the late afternoon, continue to Masindi Town for dinner and overnight at Masindi Hotel.",
			highlight: 'Track southern white rhinos on foot — the only place in Uganda',
			durationDays: 1,
			locationName: 'Ziwa Rhino Sanctuary',
		},
		{
			stepNumber: 3,
			title: 'Budongo Forest Birding & Top of Murchison Falls Walk',
			description:
				"After breakfast, drive to Budongo Forest — Uganda's largest natural forest and one of the finest birding destinations in East Africa, sharing species with the Congo Basin. Spend the full day with a specialist birding guide in pursuit of Congo-affinity species including Chocolate-backed Kingfisher, Dwarf Kingfisher, Shining Blue Kingfisher, Blue-breasted Kingfisher, Chestnut Wattle-eye, Ituri Batis, Chestnut-capped Warbler, Lemon-bellied Crombec, White-thighed Hornbill, and various Eremomela species. If time permits, drive to the top of Murchison Falls for a breathtaking view of the Nile forcing itself through the 7-metre rock cleft. Return to Masindi Hotel for dinner and overnight.",
			highlight: 'Congo-affinity kingfishers and hornbills in Budongo Forest',
			durationDays: 1,
			locationName: 'Murchison Falls National Park',
		},
		{
			stepNumber: 4,
			title: 'Transfer to Kibale Forest National Park',
			description:
				"Early morning departure from Masindi, driving south via the scenic Hoima-Kagadi road to Kibale Forest National Park — a 7-hour journey through Uganda's lush countryside. Make occasional stops to scan the Rift Valley escarpments and tea plantation edges for birds. Lunch en route in Fort Portal — Uganda's tourism city. Arrive at Kibale in the evening, check in to your lodge, and rest in preparation for tomorrow's full birding and chimpanzee tracking day.",
			durationDays: 1,
			locationName: 'Kibale Forest National Park',
		},
		{
			stepNumber: 5,
			title: 'Green-breasted Pitta, Chimp Tracking & Bigodi Swamp Walk',
			description:
				"Enter Kibale Forest at first light with a specialist ranger-guide in pursuit of the Green-breasted Pitta — one of Uganda's most sought-after species — which can sometimes be seen displaying on the forest floor at dawn. Morning chimpanzee tracking follows: enter the forest with experienced trackers and spend up to one hour in the presence of a habituated chimpanzee community. In the afternoon, walk the Bigodi Wetland Sanctuary bordering Kibale — a community-managed swamp renowned for primates and birds. Species include Green Crombec, Tooro Olive Greenbul, Grey-capped Warbler, Western Black-headed Oriole, White-spotted Flufftail, Afep Pigeon, White-naped Pigeon, Olive Pigeon, and Cassin's Grey Flycatcher. Primates including Red Colobus, Black-and-white Colobus, Uganda Mangabey, Olive Baboon, Blue Monkey, and Vervet Monkey are regularly seen.",
			highlight: 'Green-breasted Pitta search + chimpanzee tracking in Kibale Forest',
			durationDays: 1,
			locationName: 'Kibale Forest National Park',
		},
		{
			stepNumber: 6,
			title: 'Transfer to Bwindi via Kasese, Queen Elizabeth & Ishasha',
			description:
				"After an early breakfast, drive south via Kasese and through the Ishasha sector of Queen Elizabeth National Park — famous for its tree-climbing lions, which rest in the broad branches of giant fig trees overlooking the savannah. Stop for birdwatching along the route to add new species to your list. Continue through the terraced Kigezi Highlands — the 'Switzerland of Africa' — and arrive at Bwindi Impenetrable National Park in the late afternoon. Bwindi's mist-covered hillsides harbour one of Africa's oldest rainforests, around 400 mountain gorillas, and an extraordinary 350 bird species. Check in at your lodge and prepare for tomorrow's gorilla trek.",
			highlight: 'Tree-climbing lions at Ishasha + scenic Kigezi Highlands drive',
			durationDays: 1,
			locationName: 'Bwindi Impenetrable National Park',
		},
		{
			stepNumber: 7,
			title: 'Mountain Gorilla Trekking & Afternoon Birding in Bwindi',
			description:
				"After an early briefing by Uganda Wildlife Authority rangers, enter the dense ancient forest in search of a habituated mountain gorilla family. The trek can take 4–7 hours through moss-covered rocks and impenetrable undergrowth — every step an experience in itself. Spend one magical hour observing the family at close range before returning to the lodge to rest. In the afternoon, go birding for Albertine Rift endemics: Chapin's Flycatcher, Black-billed Weaver, Short-tailed Warbler, Bar-tailed Trogon, Black-faced Rufous Warbler, Red-throated Alethe, Mountain Illadopsis, Dusky Long-tailed Cuckoo, Tullberg's Woodpecker, Banded Prinia, Elliot's Woodpecker, Dwarf Honeyguide, Brown-capped Weaver, Pink-footed Puffback, Purple-breasted Sunbird, and Blue-shouldered Robin-chat.",
			highlight: 'Mountain gorilla tracking permit included',
			durationDays: 1,
			locationName: 'Bwindi Impenetrable National Park',
		},
		{
			stepNumber: 8,
			title: 'Buhoma → Ruhija Sector Birding',
			description:
				"A full day of birding along the Buhoma-to-Ruhija road — a 2–3 hour drive through one of the most productive birding transects in Bwindi, rising from mid-altitude forest to montane zones above 2,300 m. Birds along the route and around Ruhija include Black-collared Apalis, Buff-throated Apalis, Masked Apalis, Mountain Apalis, African Black Duck, Black Bee-eater, Grey Cuckoo-shrike, Many-colored Bushshrike, Black-billed Turaco, White-tailed Blue Flycatcher, and many Albertine Rift endemics not easily seen elsewhere. Arrive at Ruhija in the afternoon, have lunch, and continue with evening birding around the forest edges. Overnight at Gorilla Mist Camp.",
			highlight: "Buhoma-Ruhija transect — one of Uganda's richest birding drives",
			durationDays: 1,
			locationName: 'Bwindi Impenetrable National Park',
		},
		{
			stepNumber: 9,
			title: 'Transfer to Lake Mburo National Park — Birding & Game Viewing',
			description:
				"Depart Bwindi early and drive east through Uganda's scenic countryside — rolling hills, vast banana plantations, and herds of long-horned Ankole cattle — to Lake Mburo National Park. Upon arrival, head straight into the park for birding and game viewing: the acacia woodland and lakeside habitats attract malachite kingfisher, African fish eagle, blue-headed weaver, rufous-tailed starling, heron, pelican, cormorant, and the rare shoebill can occasionally be seen on the lake margins. Game viewing adds zebras, buffaloes, impalas, elands, warthogs, and waterbucks. Overnight at a lodge on the park boundary.",
			durationDays: 1,
			locationName: 'Lake Mburo National Park',
		},
		{
			stepNumber: 10,
			title: 'Final Morning Birding & Transfer to Entebbe International Airport',
			description:
				"After breakfast, enjoy a final morning of birding in and around Lake Mburo before beginning the 4-hour drive back to Entebbe. En route, stop at the Equator Monument on the Kampala-Masaka highway for photos and the classic water-spinning experiment at the equator line. Your guide will drop you at Entebbe International Airport at least 3 hours before your international departure, marking the end of an unforgettable birding safari. Only breakfast and lunch are provided on this final day.",
			highlight: 'Equator Monument photo stop on the drive back to Entebbe',
			durationDays: 1,
			locationName: 'Entebbe Botanical Gardens',
		},
	],

	meta: {
		pickup: 'Entebbe International Airport (EBB)',
		meetingPoint: 'Entebbe International Airport or your Kampala/Entebbe hotel',

		includes: [
			'9 nights accommodation at specified hotels and camps',
			'All park entrance fees and national park permits',
			'Gorilla tracking permit',
			'Chimpanzee tracking permit (Kibale Forest)',
			'Rhino tracking at Ziwa Rhino Sanctuary',
			'Shoebill canoe trip at Mabamba Swamp',
			'Services of a professional birding guide and driver',
			'Round-trip ground transportation in a 4×4 safari vehicle',
			'All meals from breakfast on Day 1 through lunch on Day 10',
			'Bottled water throughout the safari',
			'Evajo Tours & Travel branded T-shirt',
		],

		excludes: [
			'International flights and airfares',
			'Ugandan visa fees',
			'Optional activities not listed in the itinerary',
			'Porter fees when tracking',
			'Personal travel insurance',
			'Shopping and personal expenses',
			'Alcoholic and non-alcoholic beverages',
			'Tips and gratuities',
		],

		complementaries: ['Bottled water throughout the safari', 'Evajo Tours & Travel T-shirt'],

		faqs: [
			{
				question: 'Is this safari suitable for solo travellers?',
				answer:
					"Absolutely. Many of our travellers join as solo travellers and appreciate meeting like-minded people on the road. As a responsible tour operator, Evajo Tours & Travel strives to create a safe and inclusive environment for everyone.",
			},
			{
				question: 'What should I pack for this safari?',
				answer:
					'Essential items include a camera with charger, sunglasses, lightweight and neutral-coloured clothing, light and heavy layers for highland mornings, sturdy hiking boots, insect repellent, sunscreen, binoculars (highly recommended for birding), and any necessary personal medications. Extra memory cards and spare batteries for your camera are strongly advised.',
			},
			{
				question: 'Do I need to book pre- or post-safari accommodation separately?',
				answer:
					'No — 9 nights of accommodation are included in the package from Day 1 through to the morning of Day 10. In rare cases where clients wish to upgrade to different accommodation, this can be arranged at additional cost.',
			},
			{
				question: 'What is the cancellation policy?',
				answer:
					'Please contact us directly for full details of our cancellation and refund policy, as terms vary depending on how far in advance you cancel and the specific permits and bookings involved (gorilla and chimp permits are non-refundable once issued).',
			},
		],
	},
};

export default data;
