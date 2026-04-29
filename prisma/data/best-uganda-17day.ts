import type { SeedData } from './types.js';

/**
 * Locations required (must already exist in the database):
 *   - "Ziwa Rhino Sanctuary"                 (Day 2)
 *   - "Kidepo Valley National Park"          (Days 3 & 4)
 *   - "Murchison Falls National Park"        (Days 5, 6 & 7)
 *   - "Semuliki National Park"               (Day 8 - Sempaya Hot Springs)
 *   - "Kibale Forest National Park"          (Day 9)
 *   - "Queen Elizabeth National Park"        (Days 10, 11 & 12 incl. Ishasha)
 *   - "Bwindi Impenetrable National Park"    (Days 13 & 14)
 *   - "Lake Bunyonyi"                        (Day 15)
 *   Note: Day 1 (Entebbe arrival), Day 16 (Mabamba/Entebbe), and Day 17 (departure)
 *         have no locationName - no matching DB record needed.
 */
const data: SeedData = {
	itinerary: {
		id: 'seed-best-uganda-17day',
		title: '17 Days Best Uganda Safaris',
		summary:
			'A grand 17-day circuit of Uganda - rhino tracking at Ziwa, the remote wilderness of Kidepo, big game at Murchison Falls, chimp trekking in Kibale, Queen Elizabeth\'s Kazinga Channel, tree-climbing lions at Ishasha, mountain gorillas in Bwindi, and a shoebill search at Mabamba Swamp before departure.',
		description: `Embark on an unforgettable 17-day journey through Uganda, discovering its remarkable wildlife, stunning landscapes, and vibrant cultures. From the shores of Lake Victoria to the rugged terrains of Kidepo National Park, this safari offers an immersive experience in Uganda's diverse ecosystems and rich heritage.

The adventure begins with white rhino tracking at Ziwa Rhino Sanctuary before a long drive north to Kidepo Valley National Park - one of Africa's most isolated and pristine wildernesses - for big-game drives, the Kanangorok Hot Springs, and a cultural encounter with the Karamojong people. From Kidepo, head south-west to Murchison Falls National Park for Victoria Nile boat safaris, sunrise game drives, and the spectacular top-of-the-falls viewpoint.

Cross into the lowland tropics of Semuliki National Park for the boiling Sempaya Hot Springs before entering the chimpanzee stronghold of Kibale Forest. Continue to Queen Elizabeth National Park for a Kazinga Channel boat cruise and the famous tree-climbing lions of the Ishasha sector, then wind up into the Bwindi highlands for mountain gorilla trekking. Relax on the tranquil shores of Lake Bunyonyi before one final highlight on the return: a canoe search for the rare shoebill stork on Mabamba Swamp.

This is a private tour - only your group will participate. Get ready for thrilling game drives, captivating cultural encounters, and breathtaking wildlife experiences in the heart of Africa.`,
		durationDays: 17,
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
			title: 'Arrival at Entebbe International Airport',
			description:
				'Arrive at Entebbe International Airport where your driver/guide will meet you at the arrivals lounge holding an Evajo Tours & Travel sign. Transfer to your accommodation in Entebbe for check-in, relaxation, and an orientation briefing about the tour ahead. Entebbe is a charming lakeside town on the shores of Lake Victoria - take a stroll through the botanical gardens or along the lake shore if time permits. Dinner and overnight at Entebbe hotel.',
			highlight: 'Warm welcome to Uganda - shores of Lake Victoria',
			durationDays: 1,
		},
		{
			stepNumber: 2,
			title: 'Transfer to Gulu via Ziwa Rhino Sanctuary',
			description:
				"Drive north from Entebbe with a stopover at Ziwa Rhino Sanctuary - the only place in Uganda where southern white rhinos roam freely in the wild. Accompanied by well-trained rangers, track the rhinos on foot through the bush and spend time observing these magnificent, endangered animals at close range. Ziwa is also a birding hotspot, home to shoebill storks in the papyrus swamps, so keep your binoculars ready. After the rhino experience, continue north to Gulu City through rolling Ugandan countryside. Dinner and overnight in Gulu.",
			highlight: 'White rhino tracking on foot at Ziwa - the only place in Uganda',
			durationDays: 1,
			locationName: 'Ziwa Rhino Sanctuary',
		},
		{
			stepNumber: 3,
			title: 'Transfer to Kidepo Valley National Park',
			description:
				"After breakfast, drive north-east through the dramatic Karamojong landscapes towards Uganda's most isolated national park - Kidepo Valley National Park. The long drive passes through traditional Karamojong homesteads, semi-arid scrubland, and rugged frontier scenery. Arrive in the afternoon, check in, and head out for an evening game drive across the vast Narus Valley, where herds of elephant, buffalo, zebra, giraffe, and eland graze against a backdrop of rolling hills. Dinner and overnight at the lodge.",
			highlight: "Africa's most remote wilderness - Uganda's northeast frontier",
			durationDays: 1,
			locationName: 'Kidepo Valley National Park',
		},
		{
			stepNumber: 4,
			title: 'Sunrise Game Drive & Karamojong Cultural Visit - Kidepo',
			description:
				"Set out before dawn for a sunrise game drive in the Narus Valley - the golden hours are when lions, leopards, elephants, buffaloes, zebras, ostriches, eland, and giraffes are most active. Kidepo is known for species not found elsewhere in Uganda, including ostriches and the iconic Kanangorok Hot Springs. In the afternoon, visit a Karamojong or IK village community to learn about their colourful blankets, traditional kraals, cattle culture, and pastoral way of life - one of East Africa's most distinctive and least-visited cultures. Evening at the lodge.",
			highlight: 'Kanangorok Hot Springs + Karamojong cultural village visit',
			durationDays: 1,
			locationName: 'Kidepo Valley National Park',
		},
		{
			stepNumber: 5,
			title: 'Transfer to Murchison Falls National Park - Afternoon Game Drive',
			description:
				"After breakfast, drive south-west from Kidepo through the Karamoja region towards Murchison Falls National Park - Uganda's largest national park, bisected by the River Nile. Stop in Gulu for lunch and any necessary supplies. Enter the park in the afternoon for a sunset game drive across the northern savannah - the Para plains are famous for large elephant herds, Cape buffalo, Rothschild's giraffe, oribi, waterbuck, Uganda Kob, lions, and leopards. Dinner and overnight at the lodge.",
			durationDays: 1,
			locationName: 'Murchison Falls National Park',
		},
		{
			stepNumber: 6,
			title: 'Morning Game Drive & Victoria Nile Boat Cruise - Murchison Falls',
			description:
				"An early pre-dawn breakfast ensures you reach the savannah at sunrise - the prime time for lion and leopard sightings. Spend the morning game drive traversing the northern circuit through grasslands, acacia woodland, and riverine forest. In the afternoon, board a boat for a 3-hour safari upstream on the Victoria Nile to the base of Murchison Falls, passing close to enormous Nile crocodiles, pods of hippos, and hundreds of waterbirds - herons, pelicans, kingfishers, African skimmers, and the rare shoebill - as you approach the thundering cascade. Dinner and overnight at the lodge.",
			highlight: 'Victoria Nile boat safari to the base of Murchison Falls',
			durationDays: 1,
			locationName: 'Murchison Falls National Park',
		},
		{
			stepNumber: 7,
			title: 'Top of the Falls Walk & Leisure at Murchison Falls',
			description:
				"This morning visit the top of Murchison Falls - a spectacular 30-minute to 1-hour walk to the viewpoint where the entire River Nile forces itself through a 7-metre cleft, drops 40 metres, and creates a thunderous roar, rainbow, and plume of spray. It is one of the most dramatic waterfalls on earth and was described by Winston Churchill as the most spectacular event in the whole course of the Nile. Spend the rest of the day at leisure - relax at the lodge, take an optional nature walk, or enjoy birding along the Nile. Dinner and overnight at the lodge.",
			highlight: 'Top of Murchison Falls - the world\'s most powerful waterfall',
			durationDays: 1,
			locationName: 'Murchison Falls National Park',
		},
		{
			stepNumber: 8,
			title: 'Transfer to Kibale National Park via Sempaya Hot Springs - Semuliki',
			description:
				"After breakfast, drive south through Fort Portal with a stopover at Semuliki National Park for a guided walk to the famous Sempaya Hot Springs - geothermal vents in the lowland tropical forest that shoot boiling water several metres into the air and can cook an egg in minutes. The park itself is a lowland extension of the Ituri Forest (Congo) and harbours 441 bird species as well as red-tailed monkeys, olive baboons, and the rare Semuliki flying squirrel. After the hot springs walk, continue to Kibale National Park, the chimpanzee capital of the world. Dinner and overnight near Kibale.",
			highlight: 'Sempaya Hot Springs guided walk at Semuliki National Park',
			durationDays: 1,
			locationName: 'Semuliki National Park',
		},
		{
			stepNumber: 9,
			title: 'Chimpanzee Trekking & Bigodi Wetland Swamp Walk - Kibale',
			description:
				"Early morning briefing at Kibale National Park headquarters before entering the forest for chimpanzee trekking (permit USD 200 per person). Follow an experienced ranger guide through the world's most species-rich primate forest - tracking habituated chimpanzees and spending one magical hour watching them groom, play, feed, and travel through the canopy. Kibale also hosts red-tailed monkeys, L'Hoest's monkeys, black-and-white colobus, blue monkeys, grey-cheeked mangabeys, and forest elephants. In the afternoon, join a guided community swamp walk through Bigodi Wetland Sanctuary - a community-managed wetland bordering the park, home to 8 primate species, over 200 bird species, butterflies, and monitor lizards. Dinner and overnight near Kibale.",
			highlight: 'Chimpanzee trekking in the world\'s premier primate forest',
			durationDays: 1,
			locationName: 'Kibale Forest National Park',
		},
		{
			stepNumber: 10,
			title: 'Transfer to Queen Elizabeth NP - Lake Katwe & Afternoon Game Drive',
			description:
				"After breakfast, drive south through the scenic Fort Portal area to Queen Elizabeth National Park, stopping en route at Lake Katwe - one of Uganda's two commercial salt lakes, situated within the park. Observe the ancient salt extraction process still practised by local communities, with the vivid pink, grey, and white salt pans stretching to the horizon. Continue to the main park area and set out for an afternoon game drive across the open savannah, spotting Cape buffalo, elephants, Uganda Kob, Defassa waterbuck, topi, warthog, and the occasional lion. Dinner and overnight at the lodge.",
			highlight: 'Lake Katwe salt lake visit + Queen Elizabeth game drive',
			durationDays: 1,
			locationName: 'Queen Elizabeth National Park',
		},
		{
			stepNumber: 11,
			title: 'Sunrise Game Drive & Kazinga Channel Boat Cruise - Queen Elizabeth NP',
			description:
				"Begin the day with a sunrise game drive across the park's grassy plains, tropical forests, river valleys, and volcanic craters - scanning for lions, leopards, giant forest hogs, hyenas, elephants, and the spectacular backdrop of the Rwenzori Mountains. Return for lunch, then in the afternoon board a boat on the Kazinga Channel - the natural waterway linking Lake George to Lake Edward - for a 2-hour cruise hosting one of the highest concentrations of hippos in Africa, alongside Nile crocodiles, African fish eagles, herons, pelicans, pink-backed pelicans, and large herds of buffalo and elephant drinking at the water's edge. Dinner and overnight at the lodge.",
			highlight: 'Kazinga Channel boat safari - highest hippo density in Africa',
			durationDays: 1,
			locationName: 'Queen Elizabeth National Park',
		},
		{
			stepNumber: 12,
			title: 'Transfer to Ishasha Sector - Tree-Climbing Lions Game Drive',
			description:
				"Drive south through Queen Elizabeth National Park to the remote Ishasha sector - the only place in Africa outside the Congo where lions are regularly observed climbing and resting in large fig trees above the savannah. The Ishasha River circuit also offers excellent sightings of Uganda Kob, buffalo, topi, elephant, and the rare sitatunga in the marshes. Spend the afternoon on a game drive searching for the iconic tree-climbing lions and enjoying the wild, less-visited southern section of the park. Dinner and overnight at the Ishasha lodge.",
			highlight: 'Tree-climbing lions at Ishasha - unique to this corner of Uganda',
			durationDays: 1,
			locationName: 'Queen Elizabeth National Park',
		},
		{
			stepNumber: 13,
			title: 'Morning Game Drive in Ishasha & Transfer to Bwindi - Batwa Visit',
			description:
				"An early morning game drive in the Ishasha sector gives another chance to photograph the tree-climbing lions in the early light. Then drive through the spectacular Kigezi Highlands - the 'Switzerland of Africa' - through steep terraced hillsides, banana plantations, and winding mountain roads to Bwindi Impenetrable National Park. Arrive for lunch, then in the afternoon take part in the Batwa Trail cultural experience - visiting Africa's oldest forest-dwelling people for traditional dance, fire-starting demonstrations, medicinal plant knowledge, and storytelling of life before they were displaced from their ancestral forest. Dinner and overnight near Bwindi.",
			highlight: 'Batwa/Pygmy community cultural experience',
			durationDays: 1,
			locationName: 'Bwindi Impenetrable National Park',
		},
		{
			stepNumber: 14,
			title: 'Mountain Gorilla Trekking - Bwindi Impenetrable National Park',
			description:
				"After breakfast, receive a briefing by Uganda Wildlife Authority guides at park headquarters - covering gorilla behaviour, trekking etiquette, and safety in the forest. Transfer to the tracking start point before entering the thick ancient rainforest. The search for the gorillas can take anywhere from 30 minutes to several hours, depending on where the family has moved. Scramble through dense undergrowth and over mossy roots until you hear the first distant crash of vegetation - then suddenly, mountain gorillas appear through the leaves. Spend one magical hour observing a habituated gorilla family: silverbacks beating their chests, juveniles wrestling, and mothers nursing infants in the mist. Dinner and overnight near Bwindi.",
			highlight: 'Mountain gorilla trekking permit (USD 700 per person) included',
			durationDays: 1,
			locationName: 'Bwindi Impenetrable National Park',
		},
		{
			stepNumber: 15,
			title: 'Transfer to Lake Bunyonyi - Boat Ride & Relaxation',
			description:
				"After breakfast, drive to the beautiful Lake Bunyonyi - often called the most beautiful lake in Africa, sitting at 1,962 m above sea level and bilharzia-free. The lake has 29 islands, each with its own story - including the historic Punishment Island where unmarried girls were once abandoned. Spend the afternoon on a canoe or boat ride between the islands, exploring the lake's glassy waters, fishing villages, and dense papyrus margins. Optional zip-lining and kayaking are available. The peaceful atmosphere and cool highland air make for a perfect rest day after the intensity of gorilla tracking. Dinner and overnight at the resort.",
			highlight: 'Boat ride and relaxation on the most beautiful lake in Africa',
			durationDays: 1,
			locationName: 'Lake Bunyonyi',
		},
		{
			stepNumber: 16,
			title: 'Transfer to Entebbe - Equator Experience & Mabamba Shoebill Search',
			description:
				"After an early breakfast, begin the long drive back to Entebbe with a stopover at the Uganda Equator monument at Kayabwe for photos and the famous water-flow experiment at the equator line. Continue to Lake Victoria, arriving at Mabamba Swamp - one of the most reliable places in East Africa to spot the prehistoric shoebill stork (Balaeniceps rex). Board a dugout canoe for a guided paddle through the papyrus channels in search of this extraordinary bird that stands over 1.2 m tall and has been described as 'a bird from the age of dinosaurs'. Return to Entebbe for dinner and overnight.",
			highlight: 'Mabamba Swamp canoe safari for the rare shoebill stork',
			durationDays: 1,
		},
		{
			stepNumber: 17,
			title: 'Departure from Entebbe International Airport',
			description:
				'After breakfast, transfer to Entebbe International Airport for your international flight home. Your driver/guide will ensure you arrive at least 3 hours before your scheduled departure. Should time permit before the airport transfer, enjoy a final walk through the Entebbe Botanical Gardens on the shores of Lake Victoria - the same gardens used as a location in the film Tarzan. We hope you carry home extraordinary memories and a deep love for the Pearl of Africa.',
			highlight: 'Farewell to the Pearl of Africa',
			durationDays: 1,
		},
	],

	meta: {
		pickup: 'Entebbe International Airport (EBB)',
		meetingPoint:
			'Entebbe International Airport arrivals lounge - your guide will be holding an Evajo Tours & Travel sign.',

		includes: [
			'Airport pickup and drop-off at Entebbe',
			'All park entrance fees and vehicle park entry fees',
			'Mountain gorilla trekking permit at Bwindi Impenetrable (USD 700 per person)',
			'Chimpanzee trekking permit at Kibale National Park (USD 200 per person)',
			'White rhino tracking at Ziwa Rhino Sanctuary',
			'Kanangorok Hot Springs experience at Kidepo Valley National Park',
			'Karamojong/IK cultural village visit at Kidepo',
			'Game drives throughout the tour',
			'Victoria Nile boat cruise to the base of Murchison Falls',
			'Top of Murchison Falls guided walk',
			'Sempaya Hot Springs guided walk at Semuliki National Park',
			'Bigodi Wetland Sanctuary guided swamp walk',
			'Lake Katwe salt lake visit',
			'Kazinga Channel boat cruise',
			'Batwa/Pygmy community cultural experience',
			'Boat/canoe ride on Lake Bunyonyi',
			'Equator experience and photo moments',
			'Mabamba Swamp shoebill search by dugout canoe',
			'Park ranger fees throughout',
			'Full-board accommodation throughout (except Day 1 and Day 17 - bed and breakfast)',
			'Full-time English-speaking driver/guide',
			'Ground transportation in a 4×4 safari van or Land Cruiser (fully fuelled)',
			'Drinking water on all days',
		],

		excludes: [
			'International flights and airfares',
			'Ugandan visa fees',
			'Personal travel insurance',
			'Alcoholic and non-alcoholic beverages',
			'Tips and gratuities',
			'Laundry and personal expenses',
			'Meals not specified in the itinerary',
			'Optional activities (zip-lining, kayaking at Lake Bunyonyi)',
			'Any other items not listed above',
		],

		complementaries: [],

		faqs: [
			{
				question: 'Is this a private tour?',
				answer:
					'Yes - this is a fully private tour. Only your group will participate; there are no shared vehicles or shared guides with other travellers.',
			},
			{
				question: 'Are there any health or fitness requirements for gorilla trekking?',
				answer:
					'Gorilla trekking involves hiking through dense forest on steep, uneven terrain for potentially several hours. It is not recommended for travellers with serious heart conditions, back problems, or other significant medical conditions, or for pregnant travellers. A moderate-to-good level of physical fitness is required. Consult your doctor if you have any concerns.',
			},
			{
				question: 'What is the minimum age for gorilla trekking?',
				answer:
					'The minimum age for gorilla trekking in Uganda is 15 years, as set by Uganda Wildlife Authority.',
			},
			{
				question: 'Can I see shoebill storks anywhere other than Mabamba?',
				answer:
					'Shoebill storks can also be spotted at Ziwa Rhino Sanctuary on Day 2 - the papyrus swamps there are a known habitat. Mabamba Swamp on Day 16 remains one of the most reliable sites in East Africa for guaranteed sightings.',
			},
			{
				question: 'When will I receive booking confirmation?',
				answer: 'Confirmation will be received at the time of booking.',
			},
		],
	},
};

export default data;
