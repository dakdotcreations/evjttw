import type { SeedData } from './types.js';

/**
 * Locations required (must already exist in the database):
 *   - "Kampala Cultural Circuit"       (Days 1 & 2)
 *   - "Jinja - Source of the Nile"     (Day 3)
 *   - "Sipi Falls"                     (Days 4 & 5)
 *   - "Kibale Forest National Park"    (Day 8)
 *   - "Queen Elizabeth National Park"  (Days 9 & 10)
 *   - "Entebbe Botanical Gardens"      (Day 12)
 *
 * Days 6, 7 & 11 have no matching DB location (Hoima, Fort Portal/Bunyoro,
 * Sembabule) and are left without a locationName.
 */
const data: SeedData = {
	itinerary: {
		id: 'seed-uganda-culture-wildlife-12day',
		title: '12 Days Uganda Culture & Wildlife Safari',
		summary:
			"An immersive 12-day journey blending Uganda's rich cultural heritage with premier wildlife encounters - from Kampala's seven hills and the Source of the Nile to chimpanzee tracking in Kibale and game drives in Queen Elizabeth National Park.",
		description: `This 12-day tour combines Uganda's most compelling cultural landmarks with its finest wildlife parks. Begin in Kampala - the city of seven hills - visiting the Namugongo Martyrs Shrine, Uganda Museum, Ndere Cultural Centre, and the Kabaka's Trail through the Buganda royal tombs, Kabaka's lake, and the Naggalabi coronation site.

Travel east to the Sezibwa Falls - the only place in Africa where black-water rafting takes place - and on to Jinja to witness the source of the world's longest river. Visit the Nyero Rock paintings in Kumi (among the finest in East Africa) and hike the spectacular Sipi Falls on the slopes of Mount Elgon.

Head west through Hoima, stopping at the four-hundred-year-old Nakayima tree and exploring the Bunyoro Kingdom burial sites, before reaching Fort Portal and the crater-lake region. Chimpanzee tracking in Kibale National Park - the primate capital of the world - and a visit to the Tooro Kingdom palace and Amabere Ga'Nyinamwiru caves follow, before two days of game drives and a Kazinga Channel boat cruise in Queen Elizabeth National Park.

The penultimate day covers the Ntusi mounds and Bigo bya Mugenyi Fort in Sembabule - both associated with the legendary Bachwezi rulers - before the final drive back to Entebbe via the equator, the Mpambire drum-makers workshop, and Kampala's craft markets.`,
		durationDays: 12,
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
			title: 'Kampala City Tour - Namugongo, Uganda Museum & Ndere Cultural Centre',
			description:
				"After breakfast, your Kampala city tour begins in the capital city of seven hills. Visit the Uganda Martyrs Shrine at Namugongo - where many Christian converts were burnt alive by a late king of Buganda - for a brief history of the kingdom and the martyrs. Continue to the Uganda Museum for an overview of the country's cultural heritage, then break for lunch at a restaurant of your choice. In the afternoon, visit the Ndere Cultural Centre for traditional food preparation demonstrations and live music and dance performances by various Ugandan ethnic groups. Dinner and overnight in Kampala.",
			highlight: "Uganda Martyrs Shrine and Ndere Cultural Centre traditional performances",
			durationDays: 1,
			locationName: 'Kampala Cultural Circuit',
		},
		{
			stepNumber: 2,
			title: "Kabaka's Trail - Kasubi Tombs, Kabaka's Lake & Naggalabi Coronation Site",
			description:
				"A full day on the Kabaka's Trail with packed lunch - an experience that goes far beyond sight-seeing. The trail gives you a chance to learn about the hidden and forgotten history of Buganda and to experience authentic traditional culture through dance, music, craft-making, spiritual healing, and storytelling. Begin at the Buganda Royal Tombs at Kasubi - the traditional burial place for the last four kings of Buganda and a UNESCO World Heritage Site housing the largest grass-thatched building in the world. See the bark cloth, a local fabric made from the Mutuba tree. Transfer to Kabaka's Lake - a remarkable man-made lake in the suburbs of Kampala - then visit the Naggalabi Coronation Site where every king of Buganda has been crowned. Dinner and overnight in Kampala.",
			highlight: "Kasubi Royal Tombs - UNESCO World Heritage Site",
			durationDays: 1,
			locationName: 'Kampala Cultural Circuit',
		},
		{
			stepNumber: 3,
			title: 'Sezibwa Falls, Source of the Nile & Bujagali Falls - Jinja',
			description:
				"After an early breakfast, transfer east to the Sezibwa Falls - a unique twin-river waterfall and the only place in Africa where black-water rafting takes place, with its natural beauty and reputed healing powers. Continue to Jinja - the adventure capital of East Africa - for lunch at the Source of the Nile. Board a motorized canoe to visit the exact spot where the Nile is believed to originate from Lake Victoria before flowing north across the continent to the Mediterranean Sea. In the late afternoon, drive to Bujagali Falls for sightseeing. Overnight in Jinja town.",
			highlight: 'Source of the Nile canoe trip and Sezibwa black-water rapids',
			durationDays: 1,
			locationName: 'Jinja - Source of the Nile',
		},
		{
			stepNumber: 4,
			title: 'Nyero Rock Paintings - Kumi, then Sipi Falls',
			description:
				"After breakfast, transfer north to Kumi to view the Nyero Rock Paintings - widely recognised as some of the finest ancient rock art in East Africa. Drawn approximately 400 years ago, the paintings are surrounded by intrigue and mystery, their origins and meaning still debated by archaeologists. After sightseeing at Nyero, drive to the Sipi Falls area on the slopes of Mount Elgon for dinner and overnight - ready for a morning hike the following day.",
			durationDays: 1,
			locationName: 'Sipi Falls',
		},
		{
			stepNumber: 5,
			title: 'Sipi Falls Hike & Return to Kampala',
			description:
				"Early morning hike to the Sipi Falls - three spectacular waterfalls cascading down the slopes of Mount Elgon through coffee plantations and lush green valleys. The hike passes through local villages and offers sweeping views of the plains below. Return to the lodge after the hike, then prepare for transfer back to Kampala for dinner and overnight.",
			highlight: 'Three-waterfall hike on the slopes of Mount Elgon',
			durationDays: 1,
			locationName: 'Sipi Falls',
		},
		{
			stepNumber: 6,
			title: 'Transfer to Hoima - Nakayima Tree',
			description:
				"Transfer west to Hoima, stopping en route near the Kampala-Fort Portal road to visit the Nakayima Tree - a four-hundred-year-old fig tree believed to contain the spirit of Ndahura, a medieval Bachwezi king. The tree is one of Uganda's most important spiritual sites and is festooned with offerings left by worshippers who come to communicate with the spirit. Continue to Hoima and arrive in the evening for dinner and overnight at the lodge.",
			highlight: 'Four-hundred-year-old Nakayima spirit tree',
			durationDays: 1,
		},
		{
			stepNumber: 7,
			title: 'Bunyoro Kingdom, Fort Portal & the Crater Lakes',
			description:
				"Visit the Bunyoro Kingdom and the burial site for the late kings of the Banyoro people, exploring the rich history of one of East Africa's most powerful pre-colonial kingdoms. Then transfer south to Fort Portal, driving along the western edge of the Ugandan Rift Valley through winding agricultural land where villagers offer a warm glimpse of Ugandan rural life. Arrive in the crater-lake region south of Fort Portal - a landscape dotted with deeply excavated volcanic craters, some over 400 m deep - for dinner and overnight.",
			highlight: 'Bunyoro Kingdom burial sites and scenic Rift Valley drive',
			durationDays: 1,
		},
		{
			stepNumber: 8,
			title: 'Chimpanzee Tracking in Kibale Forest & Amabere Caves',
			description:
				"After an early breakfast, drive to Kibale National Park - home to 13 primate species and the greatest variety and highest concentration of primates in the world. Go chimpanzee tracking with experienced ranger guides through the forest; you may also encounter Grey-cheeked Mangabeys, Vervet, L'Hoest, and Red-tailed Monkeys, Olive Baboons, and Red and Black-and-White Colobus Monkeys. In the afternoon, visit the Tooro King's Palace in Fort Portal for a brief history of the Tooro Kingdom, then stop at the Tooro royal burial site before visiting Amabere Ga'Nyinamwiru - the 'Breasts of Nyinamwiru' - a historic cave site with stalactites, crater lake views, and bird watching. Dinner and overnight at the lodge.",
			highlight: 'Chimpanzee tracking in the primate capital of the world',
			durationDays: 1,
			locationName: 'Kibale Forest National Park',
		},
		{
			stepNumber: 9,
			title: 'Transfer to Queen Elizabeth National Park - Game Drive',
			description:
				"After breakfast, transfer south to Queen Elizabeth National Park - one of Uganda's most biodiverse reserves, spanning grassy plains, tropical forests, rivers, swamps, volcanic craters, and the Kazinga Channel. Enter the park with a game drive on the way to your lodge, with chances to spot lions, elephants, buffalo, Uganda kob, waterbuck, and the park's famous tree-climbing lions in the Ishasha sector. Dinner and overnight at the lodge.",
			durationDays: 1,
			locationName: 'Queen Elizabeth National Park',
		},
		{
			stepNumber: 10,
			title: 'Morning Game Drive & Kazinga Channel Boat Cruise',
			description:
				"Morning game drive through the Kasenyi tracks and Kob mating grounds in search of lions, elephants, buffalo, hyena, giant forest hogs, and other game. The Rwenzori Mountains provide a spectacular backdrop. After lunch, board a boat for an afternoon cruise along the Kazinga Channel - believed to host the largest concentration of hippos in Africa - alongside migrant birds, Nile crocodiles, and elephants and buffalo that descend to the channel for water. Dinner and overnight at the lodge.",
			highlight: 'Kazinga Channel boat cruise - highest hippo concentration in Africa',
			durationDays: 1,
			locationName: 'Queen Elizabeth National Park',
		},
		{
			stepNumber: 11,
			title: 'Ntusi Mounds & Bigo bya Mugenyi Fort - Sembabule',
			description:
				"Transfer east to Sembabule District to visit the Ntusi Mounds - two man-made earthen mounds known locally as Ntusi Male and Ntusi Female, representing a remarkable example of later Iron Age archaeology and associated with the legendary Bachwezi rulers of pre-colonial Uganda. The surrounding Ntusi village sits in a roughly 1 km square of heavy archaeological deposits, surrounded by wide expanse of rolling barren grassland. Continue approximately 16 km to visit Bigo bya Mugenyi Fort - a system of earthwork ditches and ramparts also attributed to the Bachwezi, linked in oral tradition to the Ntusi site. Visit local schools and interact with community members. Overnight at Rainbow Motel, Sembabule.",
			highlight: 'Ntusi Mounds and Bigo bya Mugenyi - enigmatic Bachwezi earthworks',
			durationDays: 1,
		},
		{
			stepNumber: 12,
			title: 'Equator Stop, Mpambire Drum Makers, Kampala Markets & Departure',
			description:
				"After breakfast, transfer back to Kampala and Entebbe, stopping at the equator monument on the Kampala-Masaka highway for coffee or tea and the classic water-spinning demonstration. Continue to Mpambire - Uganda's drum-making village - to watch skilled artisans hollow out logs and stretch animal skins to create traditional drums using techniques passed down through generations. Continue to Kampala where, depending on your flight time, you may visit Nakasero Market, the craft market at the National Theatre, or Buganda Road for souvenirs and last-minute shopping. Finally, transfer to Entebbe International Airport for your return flight home.",
			highlight: 'Mpambire drum-makers workshop and equator crossing',
			durationDays: 1,
			locationName: 'Entebbe Botanical Gardens',
		},
	],

	meta: {
		pickup: 'Entebbe International Airport (EBB)',
		meetingPoint: 'Entebbe International Airport, Kampala Road, Entebbe, Uganda',

		includes: [
			'Transportation in a 4×4 safari vehicle',
			'English-speaking driver/guide',
			'En-route lunches',
			'All park entrance fees',
			'Ranger fees',
			'Chimpanzee tracking permit (Kibale Forest)',
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

		complementaries: [
			'Evajo Tours & Travel branded T-shirt',
			'All park and site entrance fees',
		],

		faqs: [
			{
				question: 'What should I pack for this tour?',
				answer:
					'Recommended items include a camera with charger, sunglasses, lightweight and neutral-coloured clothing, heavier layers for highland evenings and forest walks, sturdy hiking boots, insect repellent, binoculars, and any personal medications. Extra memory cards and batteries are advised.',
			},
			{
				question: 'Is this tour suitable for solo travellers?',
				answer:
					'Yes - this tour can be arranged for solo travellers. Evajo Tours & Travel creates a safe and inclusive environment for all guests, and many solo travellers enjoy the immersive private-guide experience.',
			},
			{
				question: 'Where does the tour start and end?',
				answer:
					'The tour starts and ends at Entebbe International Airport. Your guide will meet you on arrival.',
			},
		],
	},
};

export default data;
