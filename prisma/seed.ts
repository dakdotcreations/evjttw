import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../src/generated/prisma/client/index.js';

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

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
	const uganda = await prisma.country.upsert({
		where: { code: 'UG' },
		update: {},
		create: { name: 'Uganda', code: 'UG', flagEmoji: '🇺🇬', description: 'The Pearl of Africa — home to mountain gorillas, crater lakes, and the source of the Nile.' }
	});
	const kenya = await prisma.country.upsert({
		where: { code: 'KE' },
		update: {},
		create: { name: 'Kenya', code: 'KE', flagEmoji: '🇰🇪', description: 'The cradle of humanity — world-class safaris, diverse cultures, and dramatic landscapes.' }
	});
	const tanzania = await prisma.country.upsert({
		where: { code: 'TZ' },
		update: {},
		create: { name: 'Tanzania', code: 'TZ', flagEmoji: '🇹🇿', description: 'Home to Kilimanjaro, the Serengeti, and the spice island of Zanzibar.' }
	});
	console.log('✅ Countries: Uganda, Kenya, Tanzania');

	// ── Locations ─────────────────────────────────────────────────────────────
	const bwindi = await prisma.location.upsert({
		where: { id: 'seed-bwindi' },
		update: {},
		create: { id: 'seed-bwindi', name: 'Bwindi Impenetrable Forest', description: 'A UNESCO World Heritage Site and home to half the world\'s mountain gorilla population.', countryId: uganda.id }
	});
	const serengeti = await prisma.location.upsert({
		where: { id: 'seed-serengeti' },
		update: {},
		create: { id: 'seed-serengeti', name: 'Serengeti National Park', description: 'The world\'s greatest wildlife spectacle — the Great Migration of over 1.5 million wildebeest.', countryId: tanzania.id }
	});
	const masaiMara = await prisma.location.upsert({
		where: { id: 'seed-masai-mara' },
		update: {},
		create: { id: 'seed-masai-mara', name: 'Maasai Mara', description: 'Kenya\'s most famous game reserve, home to the Big Five and the annual wildebeest migration.', countryId: kenya.id }
	});
	const zanzibar = await prisma.location.upsert({
		where: { id: 'seed-zanzibar' },
		update: {},
		create: { id: 'seed-zanzibar', name: 'Zanzibar', description: 'A semi-autonomous archipelago off Tanzania\'s coast, known for pristine beaches and historic Stone Town.', countryId: tanzania.id }
	});
	const lakeVictoria = await prisma.location.upsert({
		where: { id: 'seed-lake-victoria' },
		update: {},
		create: { id: 'seed-lake-victoria', name: 'Lake Victoria', description: 'Africa\'s largest lake, shared by Uganda, Kenya, and Tanzania.', countryId: uganda.id }
	});
	console.log('✅ Locations: Bwindi, Serengeti, Maasai Mara, Zanzibar, Lake Victoria');

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
						durationText: '1 day',
						locationId: lakeVictoria.id
					},
					{
						stepNumber: 2,
						title: 'Gorilla Trekking in Bwindi',
						description: 'Rise early and head into the impenetrable forest with expert guides. Spend an hour observing a habituated gorilla family.',
						highlight: 'Face-to-face with mountain gorillas',
						durationText: '2 days',
						locationId: bwindi.id
					},
					{
						stepNumber: 3,
						title: 'Queen Elizabeth National Park Safari',
						description: 'Game drives across the savannah in search of lions, elephants, and buffaloes. Evening Kazinga Channel boat cruise.',
						durationText: '2 days',
						locationId: lakeVictoria.id
					},
					{
						stepNumber: 4,
						title: 'Return to Entebbe & Departure',
						description: 'Leisurely morning at Lake Victoria before transfer to the airport for your onward flight.',
						durationText: '2 days',
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
						durationText: '3 days',
						locationId: bwindi.id
					},
					{
						stepNumber: 2,
						title: 'Maasai Mara Safari',
						description: 'Fly into Nairobi and drive south into the world-famous Maasai Mara for Big Five game drives and cultural Maasai village visits.',
						durationText: '3 days',
						locationId: masaiMara.id
					},
					{
						stepNumber: 3,
						title: 'Serengeti National Park',
						description: 'Cross into Tanzania. Experience the endless plains of the Serengeti and witness the Great Migration if in season.',
						highlight: 'Great Migration (July–October)',
						durationText: '3 days',
						locationId: serengeti.id
					},
					{
						stepNumber: 4,
						title: 'Zanzibar Beach Escape',
						description: 'Fly to Zanzibar for pristine beaches, spice tours, and the historic Stone Town.',
						durationText: '3 days',
						locationId: zanzibar.id
					},
					{
						stepNumber: 5,
						title: 'Departure from Zanzibar',
						description: 'Final morning at leisure before your international flight home.',
						durationText: '2 days',
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
