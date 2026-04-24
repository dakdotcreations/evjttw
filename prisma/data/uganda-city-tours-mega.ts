import type { SeedData } from './types.js';

/**
 * Mega catalog of Uganda city tours, day trips, and excursions from Kampala/Entebbe.
 * Each step is a standalone bookable experience; the itinerary is a "pick your experience" menu.
 *
 * Locations used (must already exist in the database):
 *   - "Entebbe Botanical Gardens"            (Steps 1 & 2)
 *   - "Kampala Cultural Circuit"             (Steps 4, 5, 6, 7 & 8)
 *   - "Mabira Forest"                        (Steps 10 & 15 — en-route stop)
 *   - "Jinja - Source of the Nile"           (Steps 10, 11 & 15)
 *   - "Ziwa Rhino Sanctuary"                 (Step 17)
 *   - "Lake Mburo National Park"             (Step 19)
 *   - "Queen Elizabeth National Park"        (Step 9)
 *   - "Murchison Falls National Park"        (Step 13)
 *   - "Bwindi Impenetrable National Park"    (Steps 14 & 16)
 *   Note: Steps 3 (Lake Victoria cycling), 12 (Mabamba Swamp), 18 (Equator/Kayabwe)
 *         have no locationName — no matching DB record.
 */
const data: SeedData = {
	itinerary: {
		id: 'seed-uganda-city-tours-mega',
		title: 'Uganda City Tours & Day Experiences',
		summary:
			'The complete Uganda activity menu — from Entebbe walking tours and Kampala cultural safaris to white-water rafting in Jinja, shoebill searching at Mabamba, rhino tracking at Ziwa, and multi-day excursions to Queen Elizabeth, Murchison Falls, and Bwindi.',
		description: `Discover Uganda one experience at a time with this curated collection of city tours, day trips, and short excursions designed for every type of traveller — from first-time visitors wanting an introduction to Entebbe or Kampala, to adventure seekers chasing Grade 5 rapids on the Nile or searching for the elusive shoebill stork at Mabamba Swamp.

Choose from half-day city walks through Kampala's markets, mosques, and royal palaces; full-day journeys to the Source of the Nile in Jinja with stops at Sezibwa Falls and Mabira Forest; a paddleboat search for the prehistoric shoebill stork at one of East Africa's most important wetlands; or the iconic Equator experience at Kayabwe. For those with more time, multi-day excursions include a Victoria Nile boat safari at Murchison Falls, chimp trekking in Queen Elizabeth's Kyambura Gorge, and mountain gorilla trekking in Bwindi Impenetrable Forest.

All experiences depart from Kampala or Entebbe with private transportation, English-speaking guide, and entrance fees included. Mix and match activities to create your perfect Uganda itinerary — our team will handle all the logistics.`,
		durationDays: 19,
		currency: 'USD',
		fixedPrice: null,
		pricePerPerson: null,
		pricingDisabled: true,
		bestSeasons: ['January', 'February', 'June', 'July', 'August', 'September', 'December'],
		published: true,
	},

	steps: [
		// ── ENTEBBE EXPERIENCES ──────────────────────────────────────────────────────
		{
			stepNumber: 1,
			title: 'Entebbe Walking Tour — Crafts Village, Street Food & Botanical Gardens',
			description:
				"The ideal introduction for first-time visitors to Entebbe, this small-group half-day tour ticks off the highlights of the bustling lakeside city. Meet Ugandan artisans at Entebbe Crafts Village — local woodcarvers, weavers, and jewellers working in traditional styles. Sample iconic street food including the famous Ugandan 'rolex' — a chapati rolled around a fried egg with tomatoes and vegetables — alongside other local delicacies. Visit a charming colonial-era Anglican church before choosing between an optional stroll through the Entebbe Botanical Gardens (established in 1901, used as a filming location for Tarzan, and home to over 30 bird species and swimming primates) or a relaxed afternoon on a public beach by Lake Victoria. Duration: 3–4 hours.",
			highlight: 'Entebbe Botanical Gardens + rolex street food + artisan crafts village',
			durationDays: 1,
			locationName: 'Entebbe Botanical Gardens',
		},
		{
			stepNumber: 2,
			title: 'Luxury Spa Day in Entebbe',
			description:
				"Wind down after a busy trip of backpacking, city exploring, or wildlife watching with a small-group spa session in Entebbe. Enjoy a full day of self-care starting with sauna and steam to open the pores and relax tired muscles, followed by a full body scrub and massage, then rounded off with foot and hand treatments. Savour unlimited refreshments as you relax in a serene environment, leaving you fully rejuvenated and ready for your flight home or next adventure. Perfect after gorilla trekking or a long safari drive. Duration: 5 hours.",
			highlight: 'Full spa day — sauna, steam, scrub, massage, foot & hand treatment',
			durationDays: 1,
			locationName: 'Entebbe Botanical Gardens',
		},
		{
			stepNumber: 3,
			title: 'Guided Cycling Tour Across Lake Victoria Islands',
			description:
				"Explore Lake Victoria on two wheels with this guided cycling tour from Kampala or Entebbe. Your bikes and helmets are provided — no need to bring your own. Board a local boat to cross to a Lake Victoria island, then follow your English-speaking guide along narrow dirt trails through fishing communities, banana plantations, and rural villages with sweeping views across Africa's largest lake. A genuinely off-the-beaten-path experience that gets you away from the city bustle and into the heart of lakeside Ugandan life. Duration: 3 hours.",
			highlight: 'Lake Victoria island cycling through fishing villages and rural trails',
			durationDays: 1,
		},

		// ── KAMPALA CITY TOURS ───────────────────────────────────────────────────────
		{
			stepNumber: 4,
			title: "Kampala Walking City Tour — Mosque, Monument & Markets",
			description:
				"Get an intimate glimpse of Kampala as you explore its iconic landmarks on foot on this small-group walking tour. Tick off top attractions including the Uganda National Mosque (Gaddafi Mosque) — the largest mosque in Sub-Saharan Africa with panoramic city views from its minaret — and the Independence Monument at the heart of the city. Learn more about the region's cultural heritage at Kabaka's Palace, then be immersed in the city buzz as you stroll through the organised chaos of Owino and Nakasero Markets — the beating commercial heart of Kampala. Benefit from the personalized insights of your small-group guide throughout. Duration: 4–6 hours.",
			highlight: 'Gaddafi Mosque, Independence Monument, Kabaka\'s Palace & city markets',
			durationDays: 1,
			locationName: 'Kampala Cultural Circuit',
		},
		{
			stepNumber: 5,
			title: 'Kampala Cultural Heritage Tour — Buganda Kingdom',
			description:
				"Join this small-group guided tour to learn all about the culture, heritage, history, and traditions of Kampala and the ancient Buganda Kingdom. Visit Wamala King's Tombs and Kabaka Ssuuna's grave — a royal burial site shrouded in legend and spiritual significance. Continue to Kasubi Tombs (a UNESCO World Heritage Site) to see the burial graves of the Buganda Kabakas, surrounded by thatched royal architecture. The tour concludes at Kabaka's Palace, where your guide recounts the history of the torture chambers, the kingdom's battles with colonial forces, and the enduring power of the Buganda monarchy in modern Uganda. Duration: 3–4 hours.",
			highlight: 'Wamala Tombs, Kasubi Tombs (UNESCO) & Kabaka\'s Palace torture chambers',
			durationDays: 1,
			locationName: 'Kampala Cultural Circuit',
		},
		{
			stepNumber: 6,
			title: 'Complete Kampala Tour Experience — Curate Your Own Adventure',
			description:
				"Discover the best of Kampala with this multi-option tour that allows you to curate your own experience. Begin by traversing the Kisenyi neighbourhood for an authentic urban experience — narrow lanes, workshops, and the rhythms of working-class Kampala life. Visit bustling markets including Owino (one of Africa's largest second-hand clothes markets) and Nakasero (the colonial-era fresh produce market), then wander through Buganda Road's Exposure Africa Arts & Crafts Market for traditional crafts, sculptures, and fabrics. Optional add-ons include the Kasenyi fishing village on Lake Victoria, the Uganda Museum (Uganda's oldest and largest museum), Kasubi Tombs, and the Ndere Cultural Centre — home to nightly performances of Uganda's diverse tribal dances and music. Duration: 3–9 hours.",
			highlight: 'Owino Market, Ndere Cultural Centre & Uganda Museum — curate your own tour',
			durationDays: 1,
			locationName: 'Kampala Cultural Circuit',
		},
		{
			stepNumber: 7,
			title: 'Ultimate Kampala Nightlife Experience — Skip the Line',
			description:
				"Be immersed in Kampala's vibrant party atmosphere on this guided nightlife tour, with round-trip transfer from your hotel ensuring a hassle-free night out. Kampala has one of East Africa's most energetic and welcoming nightlife scenes, with live music, Afrobeats, and a diverse mix of locals and visitors. Your guide knows the best venues and ensures you skip the queue at top city clubs, bars, and live-music spots. Perfect for solo travellers and groups alike, this tour offers the chance to meet fellow partygoers, enjoy free drinks throughout the night, and experience Ugandan hospitality after dark. Duration: 4–10 hours.",
			highlight: 'Skip-the-line Kampala nightlife with free drinks and local guide',
			durationDays: 1,
			locationName: 'Kampala Cultural Circuit',
		},
		{
			stepNumber: 8,
			title: 'Night-time Boda Boda Street Food Tour — Rolex Wraps & Muchomo',
			description:
				"Discover the Ugandan capital after dark on this private street food tour by boda-boda motorbike or private vehicle. Cruise around the city with your local guide, stopping at the best after-dark food spots for a taste of quintessential Kampala street cuisine: rolex wraps (chapati rolled with egg and vegetables), muchomo (roasted pork skewers), fried tilapia from roadside grills, groundnut stew, and fresh sugarcane juice. Learn about Kampala's culinary scene, the culture behind each dish, and the stories of the street vendors as you navigate the city's illuminated streets. Enjoy hassle-free drop-off back to your central hotel. Duration: 5 hours.",
			highlight: 'Boda-boda street food tour — rolex wraps, muchomo & Kampala after dark',
			durationDays: 1,
			locationName: 'Kampala Cultural Circuit',
		},

		// ── DAY TRIPS FROM KAMPALA / ENTEBBE ────────────────────────────────────────
		{
			stepNumber: 9,
			title: 'Queen Elizabeth Park Wildlife Safari + Chimp Trekking (3 Days)',
			description:
				"Enjoy a balanced blend of adventure and relaxation on this 3-day excursion to Queen Elizabeth National Park. The park's stunning African savanna, explosion craters, Lake George, Lake Edward, and the natural Kazinga Channel — hosting one of the highest concentrations of hippos in Africa — make it Uganda's most diverse park. Day 1: transfer from Kampala or Entebbe with an afternoon game drive. Day 2: sunrise game drive across the savanna, then a Kazinga Channel boat cruise alongside hippos, crocodiles, and waterbirds. Day 3: optional chimpanzee trek into the Kyambura Gorge — a sunken rainforest where a habituated chimp community lives in dramatic canyon scenery — before returning to Kampala or Entebbe. Duration: 3 days.",
			highlight: 'Kazinga Channel boat cruise + Kyambura Gorge chimpanzee trek',
			durationDays: 3,
			locationName: 'Queen Elizabeth National Park',
		},
		{
			stepNumber: 10,
			title: 'Best of Jinja — Sezibwa Falls, Mabira Forest & Source of the Nile (Full Day)',
			description:
				"Widen your perspective of Uganda on this private full-day tour to Sezibwa Falls, Mabira Central Forest Reserve, and Jinja — perfect for travellers with limited time. The drive east from Kampala takes you through coffee, tea, and sugar cane plantations. First stop: Sezibwa Falls — a Buganda cultural heritage site with twin rivers, beautiful cascades, and ancient spiritual significance; spend an hour hiking the rocks and learning the myths. Continue to Mabira Central Forest Reserve — the largest forest in central Uganda — for a 2-hour guided trek to track Grey-cheeked Mangabeys, spot birds, and experience the jungle canopy. Drive to Jinja for lunch, then embark on a city tour before a boat ride to the spot where explorer John Speke declared the Source of the Nile in 1862. Activities, transfers, and meals included. Duration: 9 hours.",
			highlight: 'Sezibwa Falls + Mabira Forest trek + Source of the Nile boat cruise',
			durationDays: 1,
			locationName: 'Jinja - Source of the Nile',
		},
		{
			stepNumber: 11,
			title: 'Full Day White-Water Rafting on the River Nile — Jinja',
			description:
				"Experience the Source of the Nile in the most exhilarating way possible on this full-day white-water rafting excursion in Jinja — widely regarded as offering the best rafting in Africa. Follow a 12-mile (19 km) rafting course with complimentary pickup and drop-off from Kampala or Entebbe. Choose between Grade 3 rapids for a thrilling but accessible experience, or Grade 5 for a full adrenaline surge through some of the biggest commercially navigable rapids in the world. Rafts are guided by internationally certified river guides with strong safety records. Souvenir photos and videos provided free of charge, plus GoPro helmets. Duration: 7 hours.",
			highlight: 'Grade 3 or Grade 5 white-water rafting — the best in Africa',
			durationDays: 1,
			locationName: 'Jinja - Source of the Nile',
		},
		{
			stepNumber: 12,
			title: 'Full Day Mabamba Swamp Shoebill Tour — Lake Victoria',
			description:
				"Shoebill watching in Uganda is an adventure every bird enthusiast should experience — and Mabamba Swamp is the single most reliable place in the world to observe this prehistoric bird in the wild. Located 50 km west of Kampala on the northern shore of Lake Victoria, Mabamba covers over 2,424 hectares of papyrus reeds, water lilies, and open wetland. Designated a Ramsar Wetland of International Importance in 2006 and a BirdLife International Important Bird Area, the swamp harbours over 300 bird species. Board a dugout canoe for a guided paddle through the papyrus channels in search of the shoebill stork (Balaeniceps rex) — a 1.2 m tall living fossil with a massive whale-shaped bill — as well as other specials including the blue-breasted kingfisher, African jacana, papyrus gonolek, and white-winged warbler. Duration: 5 hours.",
			highlight: 'Dugout canoe shoebill search at Mabamba — most reliable site in the world',
			durationDays: 1,
		},
		{
			stepNumber: 13,
			title: 'Murchison Falls Safari (3 Days) — Game Drives & Victoria Nile Cruise',
			description:
				"Immerse yourself in Uganda's pristine landscapes on this 3-day private tour to Murchison Falls National Park — Uganda's largest park, bisected by the River Nile. Enjoy hotel or airport pickup with comfortable air-conditioned transport throughout. Day 1: drive north with a stopover at Ziwa Rhino Sanctuary for white rhino tracking on foot, then continue to Murchison Falls. Day 2: sunrise game drive spotting elephants, lions, Rothschild's giraffes, Cape buffalo, and leopards across the northern savanna; afternoon boat cruise along the Victoria Nile to the base of Murchison Falls — passing hippos, Nile crocodiles, and abundant waterbirds. Day 3: hike to the top of the roaring falls for a panoramic view of the Nile forcing through the 7-metre cleft, then drive back to Kampala or Entebbe. Duration: 3 days.",
			highlight: 'Victoria Nile boat cruise + top of Murchison Falls hike + rhino tracking',
			durationDays: 3,
			locationName: 'Murchison Falls National Park',
		},
		{
			stepNumber: 14,
			title: 'Gorilla Trekking & Batwa Experience in Bwindi (3 Days)',
			description:
				"Have a tailor-made private safari through Bwindi Impenetrable National Park — a UNESCO World Heritage Site sheltering roughly half the world's remaining mountain gorillas. Your guide, driver, and team handle all logistics so you and your group can simply enjoy the experience. Day 1: scenic drive from Kampala to Bwindi through the Kigezi Highlands, afternoon Batwa community cultural walk with traditional dances and fire-making demonstrations. Day 2: gorilla trekking — early briefing by Uganda Wildlife Authority rangers, then enter the ancient forest to track a habituated gorilla family and spend one magical hour observing silverbacks, juveniles, and nursing mothers. Day 3: leisure morning at the lodge before driving back to Kampala or Entebbe. Duration: 3 days.",
			highlight: 'Mountain gorilla trekking permit (USD 700 per person) + Batwa experience',
			durationDays: 3,
			locationName: 'Bwindi Impenetrable National Park',
		},
		{
			stepNumber: 15,
			title: 'Full-Day Jinja Sightseeing — Mabira Forest, Tea Plantation & Nile Cruise',
			description:
				"See the source of the mighty Nile River during this private full-day excursion to the lakeside city of Jinja. Enjoy comfortable transfers from Kampala or Entebbe with hotel or airport pickup and drop-off. The route stops at Mabira Central Forest Reserve for a guided rainforest walk spotting monkeys and birds, and visits a local tea plantation to learn about Uganda's tea industry. In Jinja, sample local Ugandan delicacies at a street market before boarding a motorboat for a cruise to the spot where the Nile River separates from Lake Victoria — watching the swirling confluence where the world's longest river begins its 6,700 km journey to the Mediterranean Sea. Duration: 12 hours.",
			highlight: 'Mabira Forest trek + tea plantation + Nile source motorboat cruise',
			durationDays: 1,
			locationName: 'Jinja - Source of the Nile',
		},
		{
			stepNumber: 16,
			title: 'Gorilla Trekking Safari in Bwindi Impenetrable Forest (3 Days)',
			description:
				"Fully explore the Bwindi Impenetrable Forest on this 3-day private safari, where each day is packed with opportunities to encounter extraordinary wildlife and immerse yourself in the beauty of one of Africa's oldest rainforests. Day 1: drive from Kampala across the Equator to Mbarara through banana plantations and rolling hills, arriving at Bwindi in the evening. Day 2: gorilla trekking with Uganda Wildlife Authority ranger guides — track a habituated gorilla family through dense jungle and spend an unforgettable hour with these gentle giants. Day 3: optional morning nature walk or village visit before driving back to Kampala or Entebbe. Your guide takes care of every detail. Duration: 3 days.",
			highlight: 'Private 3-day gorilla trekking — gorilla permit (USD 700) included',
			durationDays: 3,
			locationName: 'Bwindi Impenetrable National Park',
		},
		{
			stepNumber: 17,
			title: 'Ziwa Rhino Trekking — White Rhino Day Safari',
			description:
				"Avoid the lengthy wildlife searches typical of traditional safaris on this private trekking tour at Ziwa Rhino Sanctuary and Wildlife Ranch — the only place in Uganda where the critically endangered southern white rhinoceros can be tracked on foot in the wild. Accompanied by well-trained ranger guides, walk through the bush to locate the rhino groups and observe them at close range for at least one hour. Beyond rhinos, Ziwa is rich in other wildlife: warthogs, monkeys, antelope species, and over 350 bird species including the rare shoebill stork in the papyrus swamps. Return hotel transport, lunch, and entrance fees are included. A perfect standalone day trip or an en-route stop on the way to Murchison Falls. Duration: 7 hours 30 minutes.",
			highlight: 'White rhino tracking on foot — Uganda\'s only site for wild rhinos',
			durationDays: 1,
			locationName: 'Ziwa Rhino Sanctuary',
		},
		{
			stepNumber: 18,
			title: 'Uganda Equator Experience — Kayabwe Day Tour',
			description:
				"Discover Uganda's equator attraction on this private tour to Kayabwe — one of two points where the tarmac Kampala–Mbarara highway crosses the equator line. Enjoy scenic rural Ugandan countryside en route, passing village markets, roadside craft stalls, and lush hillsides. At the equator monument, snap memorable photos straddling the line between the Northern and Southern Hemispheres, experience the famous Coriolis water-flow demonstration — where water drains clockwise in one hemisphere and anticlockwise in the other — and browse local souvenir stalls. A complimentary lunch is included on-site. Optionally extend with a 1-hour countryside walk through nearby villages, farms, and local crops. Duration: 5–12 hours (flexible).",
			highlight: 'Equator monument, Coriolis experiment & rural Uganda countryside walk',
			durationDays: 1,
		},
		{
			stepNumber: 19,
			title: 'Lake Mburo National Park — Game Drive, Boat Safari & Walking Tour',
			description:
				"A guided one-day tour to Lake Mburo National Park — Uganda's closest national park to Kampala and the only park in the country where zebras are found. This full-day experience is designed to maximise wildlife encounters in a single day with three complementary modes of exploration: a game drive through the acacia woodland and open savanna spotting zebras, impalas, buffaloes, topi, warthogs, and Defassa waterbuck; a boat safari on Lake Mburo itself for hippos, Nile crocodiles, monitor lizards, and exceptional lakeside birding (malachite kingfisher, African fish eagle, herons, pelicans, and the occasional shoebill in the papyrus); and an optional walking safari with an armed ranger for the closest possible approach to wildlife on foot. Meals and transport from Kampala included. Duration: 14 hours.",
			highlight: 'Triple wildlife experience — game drive, boat safari & walking tour',
			durationDays: 1,
			locationName: 'Lake Mburo National Park',
		},
	],

	meta: {
		pickup: 'Your hotel in Kampala or Entebbe International Airport (EBB)',
		meetingPoint:
			'Your hotel in Kampala or Entebbe — your driver/guide will collect you at the agreed time for each experience.',

		includes: [
			'Private transportation in an air-conditioned 4×4 vehicle for all experiences',
			'English-speaking driver/guide',
			'Park entrance fees and ranger fees where applicable',
			'Gorilla trekking permit for Bwindi experiences (USD 700 per person)',
			'Entrance fees and activity fees as listed per experience',
			'Meals as specified per experience',
			'Bottled water in the vehicle on all days',
			'Hotel/airport pickup and drop-off',
		],

		excludes: [
			'International flights and airfares',
			'Ugandan visa fees',
			'Personal travel insurance',
			'Alcoholic and non-alcoholic beverages (unless specified)',
			'Tips and gratuities',
			'Personal expenses',
			'Optional activities not mentioned per experience',
		],

		complementaries: [],

		faqs: [
			{
				question: 'Can I combine multiple activities into a custom itinerary?',
				answer:
					'Absolutely — this is a menu of experiences designed to be mixed and matched. Contact us with your preferred dates and activities and we will create a seamless custom itinerary with all logistics handled.',
			},
			{
				question: 'Are these private or group tours?',
				answer:
					'All experiences are offered as private tours — only your group will participate. Some experiences (city walks, cycling) can also be offered as small-group shared tours at a reduced rate.',
			},
			{
				question: 'What is the minimum age for gorilla trekking?',
				answer:
					'The minimum age for gorilla trekking in Uganda is 15 years, as set by Uganda Wildlife Authority.',
			},
			{
				question: 'Is white-water rafting at Jinja safe?',
				answer:
					'Yes — rafting is operated by internationally certified operators with strong safety records. Grade 3 is suitable for beginners; Grade 5 is for thrill-seekers comfortable with intense rapids. Life jackets, helmets, and experienced guides are provided.',
			},
			{
				question: 'When will I receive booking confirmation?',
				answer: 'Confirmation will be received at the time of booking.',
			},
		],
	},
};

export default data;
