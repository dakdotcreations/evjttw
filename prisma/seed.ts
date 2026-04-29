import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client.js';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

// Find a country by name, update its fields if found, create if not.
async function upsertCountry(data: {
	name: string;
	code: string;
	flagEmoji: string;
	description: string;
}) {
	const existing = await prisma.country.findFirst({ where: { name: data.name } });
	if (existing) {
		return prisma.country.update({ where: { id: existing.id }, data });
	}
	return prisma.country.create({ data });
}

// Find a location by name, update its fields if found, create if not.
async function upsertLocation(data: {
	name: string;
	description: string;
	countryId: string;
}) {
	const existing = await prisma.location.findFirst({ where: { name: data.name } });
	if (existing) {
		return prisma.location.update({ where: { id: existing.id }, data });
	}
	return prisma.location.create({ data });
}

async function main() {
	console.log('🌱 Seeding database…');

	// ── Users ──────────────────────────────────────────────────────────────────
	const adminEmail = process.env.SEED_ADMIN_EMAIL;
	if (!adminEmail) throw new Error('SEED_ADMIN_EMAIL env var is required');

	const admin = await prisma.user.upsert({
		where: { email: adminEmail },
		update: {},
		create: { name: 'Evajo Admin', email: adminEmail }
	});
	console.log(`✅ Admin user: ${admin.email}`);

	// ── Countries ─────────────────────────────────────────────────────────────
	const uganda = await upsertCountry({
		name: 'Uganda',
		code: 'UG',
		flagEmoji: '🇺🇬',
		description: "Known as the 'Pearl of Africa', Uganda offers a diverse landscape ranging from the snow-capped Rwenzori Mountains to the immense Lake Victoria. It is the premier destination for mountain gorilla trekking and bird watching."
	});
	const kenya = await upsertCountry({
		name: 'Kenya',
		code: 'KE',
		flagEmoji: '🇰🇪',
		description: 'The heart of the African safari, Kenya is defined by its vast savannahs, the Great Migration, and a stunning Indian Ocean coastline.'
	});
	const tanzania = await upsertCountry({
		name: 'Tanzania',
		code: 'TZ',
		flagEmoji: '🇹🇿',
		description: "Home to Africa's highest peak and its most famous plains, Tanzania offers an unparalleled scale of wildlife and tropical island luxury."
	});
	const rwanda = await upsertCountry({
		name: 'Rwanda',
		code: 'RW',
		flagEmoji: '🇷🇼',
		description: "The Land of a Thousand Hills, Rwanda is a conservation success story and home to more than half the world's remaining mountain gorillas."
	});
	console.log('✅ Countries: Uganda, Kenya, Tanzania, Rwanda');

	// ── Locations - Uganda ───────────────────────────────────────────────────
	const bwindi = await upsertLocation({ name: 'Bwindi Impenetrable National Park', description: 'A UNESCO World Heritage site and home to nearly half of the world\'s remaining mountain gorillas.', countryId: uganda.id });
	await upsertLocation({ name: 'Murchison Falls National Park', description: 'Witness the Nile squeeze through an 8-meter gorge, creating the world\'s most powerful waterfall.', countryId: uganda.id });
	await upsertLocation({ name: 'Queen Elizabeth National Park', description: 'Famous for tree-climbing lions and the wildlife-rich Kazinga Channel.', countryId: uganda.id });
	await upsertLocation({ name: 'Kibale Forest National Park', description: 'The primate capital of the world, boasting the highest density of chimpanzees in Africa.', countryId: uganda.id });
	await upsertLocation({ name: 'Jinja - Source of the Nile', description: 'The adrenaline capital of East Africa, offering world-class white-water rafting and bungee jumping.', countryId: uganda.id });
	await upsertLocation({ name: 'Kidepo Valley National Park', description: "A rugged, remote wilderness that offers the most authentic 'Old Africa' safari experience.", countryId: uganda.id });
	await upsertLocation({ name: 'Lake Bunyonyi', description: 'A serene, highland lake dotted with 29 islands, perfect for canoeing and relaxation.', countryId: uganda.id });
	await upsertLocation({ name: 'Rwenzori Mountains National Park', description: "The 'Mountains of the Moon,' offering world-class alpine trekking and permanent glaciers.", countryId: uganda.id });
	await upsertLocation({ name: 'Sipi Falls', description: 'Three spectacular waterfalls located on the edge of Mount Elgon, famous for coffee tours and hiking.', countryId: uganda.id });
	await upsertLocation({ name: 'Mgahinga Gorilla National Park', description: 'Where gold meets silver; home to both mountain gorillas and the rare golden monkeys.', countryId: uganda.id });
	await upsertLocation({ name: 'Lake Mburo National Park', description: 'The best place to see Zebras and Elands in Uganda, with beautiful lakeside camping.', countryId: uganda.id });
	await upsertLocation({ name: 'Semuliki National Park', description: 'Unique hot springs and a true lowland tropical forest experience with Central African bird species.', countryId: uganda.id });
	await upsertLocation({ name: 'Mount Elgon National Park', description: 'Home to the largest volcanic base in the world and incredible cave exploration.', countryId: uganda.id });
	await upsertLocation({ name: 'Ssese Islands', description: 'An archipelago of 84 islands on Lake Victoria offering white sand beaches and a tropical vibe.', countryId: uganda.id });
	await upsertLocation({ name: 'Ziwa Rhino Sanctuary', description: 'The only place in Uganda where you can track wild southern white rhinos on foot.', countryId: uganda.id });
	await upsertLocation({ name: 'Pian Upe Wildlife Reserve', description: 'A raw, untouched savannah landscape home to cheetahs and ostriches.', countryId: uganda.id });
	await upsertLocation({ name: 'Kampala Cultural Circuit', description: 'A vibrant tour of the Kasubi Tombs, Bahai Temple, and Namugongo Martyrs Shrine.', countryId: uganda.id });
	const lakeVictoria = await upsertLocation({ name: 'Entebbe Botanical Gardens', description: 'A lakeside sanctuary perfect for birding and nature walks right by the international airport.', countryId: uganda.id });
	await upsertLocation({ name: 'Katwe Salt Lake', description: 'A traditional salt mining lake where locals have used the same methods for centuries.', countryId: uganda.id });
	await upsertLocation({ name: 'Mabira Forest', description: 'A lush rainforest canopy perfect for zip-lining and eco-walks between Kampala and Jinja.', countryId: uganda.id });
	console.log('✅ Locations - Uganda (20)');

	// ── Locations - Kenya ────────────────────────────────────────────────────
	const masaiMara = await upsertLocation({ name: 'Maasai Mara National Reserve', description: 'Host to the Great Wildebeest Migration, one of the seven natural wonders of the world.', countryId: kenya.id });
	await upsertLocation({ name: 'Amboseli National Park', description: 'Famous for large elephant herds and iconic views of Mount Kilimanjaro.', countryId: kenya.id });
	await upsertLocation({ name: 'Diani Beach', description: 'A world-renowned white-sand beach destination with turquoise waters and coral reefs.', countryId: kenya.id });
	await upsertLocation({ name: 'Tsavo East & West', description: "Kenya's largest protected area, known for red elephants and Mzima Springs.", countryId: kenya.id });
	await upsertLocation({ name: 'Lake Nakuru National Park', description: 'A sanctuary for black and white rhinos and millions of pink flamingos.', countryId: kenya.id });
	await upsertLocation({ name: 'Mount Kenya National Park', description: "Africa's second-highest peak, offering diverse flora and challenging trekking.", countryId: kenya.id });
	await upsertLocation({ name: 'Samburu National Reserve', description: "Unique northern species including the reticulated giraffe and Grevy's zebra.", countryId: kenya.id });
	await upsertLocation({ name: 'Ol Pejeta Conservancy', description: 'A leading private conservancy and the last refuge for the Northern White Rhino.', countryId: kenya.id });
	await upsertLocation({ name: 'Watamu Marine National Park', description: 'A pristine coastal ecosystem perfect for snorkeling and visiting Gede Ruins.', countryId: kenya.id });
	await upsertLocation({ name: 'Lamu Island', description: 'A UNESCO World Heritage Swahili settlement where time seems to stand still.', countryId: kenya.id });
	await upsertLocation({ name: "Hell's Gate National Park", description: 'One of the few parks where you can cycle or hike among wildlife and explore deep gorges.', countryId: kenya.id });
	console.log('✅ Locations - Kenya (11)');

	// ── Locations - Tanzania ─────────────────────────────────────────────────
	const serengeti = await upsertLocation({ name: 'Serengeti National Park', description: 'The quintessential safari destination with endless plains and massive predator populations.', countryId: tanzania.id });
	await upsertLocation({ name: 'Ngorongoro Crater', description: "The world's largest intact volcanic caldera, home to over 25,000 large animals.", countryId: tanzania.id });
	await upsertLocation({ name: 'Mount Kilimanjaro', description: 'The roof of Africa; a bucket-list destination for hikers and adventurers worldwide.', countryId: tanzania.id });
	const zanzibar = await upsertLocation({ name: 'Zanzibar - Stone Town', description: 'A historic spice island with winding alleys, ancient architecture, and vibrant markets.', countryId: tanzania.id });
	await upsertLocation({ name: 'Tarangire National Park', description: 'The land of giants, famous for its ancient baobab trees and massive elephant herds.', countryId: tanzania.id });
	await upsertLocation({ name: 'Lake Manyara National Park', description: 'Known for its groundwater forest, baboon troops, and tree-climbing lions.', countryId: tanzania.id });
	await upsertLocation({ name: 'Nyerere National Park (Selous)', description: 'One of the largest faunal reserves in the world, offering unique boat safaris.', countryId: tanzania.id });
	await upsertLocation({ name: 'Mafia Island', description: 'A secluded paradise famous for whale shark sightings and world-class diving.', countryId: tanzania.id });
	await upsertLocation({ name: 'Ruaha National Park', description: "Tanzania's largest national park, offering rugged scenery and wild dog sightings.", countryId: tanzania.id });
	await upsertLocation({ name: 'Arusha National Park', description: 'The gateway to the northern circuit, featuring Mount Meru and Momella Lakes.', countryId: tanzania.id });
	await upsertLocation({ name: 'Pemba Island', description: "Known as the 'Green Island,' offering some of the best untouched coral reefs in the Indian Ocean.", countryId: tanzania.id });
	await upsertLocation({ name: 'Lake Naivasha', description: 'A freshwater Rift Valley lake ringed by yellow-fever acacia woodland, famous for hippos and boat safaris.', countryId: kenya.id });
	console.log('✅ Locations - Tanzania (11) + Lake Naivasha (Kenya)');

	// ── Locations - Rwanda ───────────────────────────────────────────────────
	await upsertLocation({ name: 'Akagera National Park', description: "Rwanda's only Big Five savannah park, reintroduced with lions and rhinos and bordering Lake Ihema.", countryId: rwanda.id });
	await upsertLocation({ name: 'Volcanoes National Park', description: 'The premier destination for mountain gorilla trekking in Rwanda, set in the Virunga Mountains.', countryId: rwanda.id });
	await upsertLocation({ name: 'Nyungwe Forest National Park', description: 'A montane rainforest spanning 970 sq km, rich in chimpanzees and over 300 bird species.', countryId: rwanda.id });
	console.log('✅ Locations - Rwanda (3)');

	// ── Itineraries ───────────────────────────────────────────────────────────
	const gorillaTrek = await prisma.itinerary.upsert({
		where: { id: 'seed-gorilla-trek' },
		update: {},
		create: {
			id: 'seed-gorilla-trek',
			title: 'Gorilla Trek & Wildlife Safari',
			summary: 'Track mountain gorillas in Bwindi and explore Uganda\'s stunning landscapes.',
			description: 'Embark on a once-in-a-lifetime journey to the heart of Uganda. Begin with a trek through the impenetrable Bwindi forest to observe mountain gorillas in their natural habitat, then cruise the Kazinga Channel and explore Queen Elizabeth National Park before unwinding on the shores of Lake Victoria.',
			fixedPrice: 2800,
			currency: 'USD',
			durationDays: 7,
			bestSeasons: ['June', 'July', 'August', 'December', 'January', 'February'],
			published: true,
			steps: {
				create: [
					{
						stepNumber: 1,
						title: 'Arrival in Entebbe',
						description: 'Arrive at Entebbe International Airport. Transfer to your lakeside hotel for rest and orientation.',
					durationDays: 1,
						locationId: lakeVictoria.id
					},
					{
						stepNumber: 2,
						title: 'Gorilla Trekking in Bwindi',
						description: 'Rise early and head into the impenetrable forest with expert guides. Spend an hour observing a habituated gorilla family.',
						highlight: 'Face-to-face with mountain gorillas',
					durationDays: 2,
						locationId: bwindi.id
					},
					{
						stepNumber: 3,
						title: 'Queen Elizabeth National Park Safari',
						description: 'Game drives across the savannah in search of lions, elephants, and buffaloes. Evening Kazinga Channel boat cruise.',
					durationDays: 2,
						locationId: lakeVictoria.id
					},
					{
						stepNumber: 4,
						title: 'Return to Entebbe & Departure',
						description: 'Leisurely morning at Lake Victoria before transfer to the airport for your onward flight.',
					durationDays: 2,
						locationId: lakeVictoria.id
					}
				]
			}
		}
	});

	const grandTour = await prisma.itinerary.upsert({
		where: { id: 'seed-east-africa-grand' },
		update: {},
		create: {
			id: 'seed-east-africa-grand',
			title: 'East Africa Grand Tour',
			summary: 'The ultimate 14-day East Africa experience spanning three countries.',
			description: 'From gorilla trekking in Uganda to the wildebeest migration in Kenya and Tanzania, this grand tour covers the best of East Africa. Conclude with a beach escape on the idyllic shores of Zanzibar.',
			pricePerPerson: 350,
			currency: 'USD',
			durationDays: 14,
			bestSeasons: ['July', 'August', 'September', 'October'],
			published: true,
			steps: {
				create: [
					{
						stepNumber: 1,
						title: 'Bwindi Gorilla Trek',
						description: 'Fly into Entebbe and transfer to Bwindi for gorilla trekking in the heart of Uganda.',
						highlight: 'Gorilla trekking permit included',
					durationDays: 3,
						locationId: bwindi.id
					},
					{
						stepNumber: 2,
						title: 'Maasai Mara Safari',
						description: 'Fly into Nairobi and drive south into the world-famous Maasai Mara for Big Five game drives and cultural Maasai village visits.',
					durationDays: 3,
						locationId: masaiMara.id
					},
					{
						stepNumber: 3,
						title: 'Serengeti National Park',
						description: 'Cross into Tanzania. Experience the endless plains of the Serengeti and witness the Great Migration if in season.',
						highlight: 'Great Migration (July–October)',
					durationDays: 3,
						locationId: serengeti.id
					},
					{
						stepNumber: 4,
						title: 'Zanzibar Beach Escape',
						description: 'Fly to Zanzibar for pristine beaches, spice tours, and the historic Stone Town.',
					durationDays: 3,
						locationId: zanzibar.id
					},
					{
						stepNumber: 5,
						title: 'Departure from Zanzibar',
						description: 'Final morning at leisure before your international flight home.',
					durationDays: 2,
						locationId: zanzibar.id
					}
				]
			}
		}
	});
	console.log('✅ Itineraries: Gorilla Trek, East Africa Grand Tour');

	// ── Feature ───────────────────────────────────────────────────────────────
	const feature = await prisma.feature.upsert({
		where: { id: 'seed-feature-uganda' },
		update: {},
		create: {
			id: 'seed-feature-uganda',
			displayName: 'Explore Uganda',
			countryId: uganda.id,
			isActive: true,
			sortOrder: 0,
			items: {
				create: [{ itineraryId: gorillaTrek.id, sortOrder: 0 }]
			}
		}
	});
	console.log('✅ Feature: Explore Uganda');

	// ── Review Invite ──────────────────────────────────────────────────────────
	await prisma.reviewInvite.upsert({
		where: { id: 'seed-invite-1' },
		update: {},
		create: { id: 'seed-invite-1', note: 'Thank you for travelling with us!' }
	});
	console.log('✅ Review invite created');

	console.log('\n🎉 Seed complete!');
}

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
