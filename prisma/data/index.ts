/**
 * prisma/data/index.ts
 *
 * Inserts (or updates) all itinerary seed data files into the database.
 *
 * Run with:
 *   pnpm tsx prisma/data/index.ts
 *
 * To add a new itinerary:
 *   1. Create a data file in this folder that exports a SeedData object as default.
 *   2. Import it below and add it to the `allItineraries` array.
 */

import 'dotenv/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '../../src/generated/prisma/client.js';
import type { SeedData } from './types.js';

// ── Import data files ────────────────────────────────────────────────────────
import kibaleSafari from './kibale-chimp-safari.js';
import masaiMaraGameDrive from './masai-mara-game-drive.js';
import murchisonFallsSafari from './murchison-falls-safari.js';
import queenElizabethWildlifeTour from './queen-elizabeth-wildlife-tour.js';
import rwandaAkageraWildlifeSafari from './rwanda-akagera-wildlife-safari.js';
import bwindiGorillaTour from './bwindi-gorilla-tour.js';
import bwindiGorillaLakeBunyonyi from './bwindi-gorilla-lake-bunyonyi.js';
import gorillaAndWildlifeSafari5day from './gorilla-and-wildlife-safari-5day.js';
import kidepoBig5Safari5day from './kidepo-big5-safari-5day.js';
import murchisonQeGorillas7day from './murchison-qe-gorillas-7day.js';
import murchisonQeGorillas7dayPrivate from './murchison-qe-gorillas-7day-private.js';
import chimpsGorillaWildlife7day from './chimps-gorillas-wildlife-7day.js';
import kenyaExclusiveSafari7day from './kenya-exclusive-safari-7day.js';
import murchisonChimpGorilla8day from './murchison-chimp-gorilla-8day.js';
import ugandaTanzaniaExperience8day from './uganda-tanzania-experience-8day.js';

const allItineraries: SeedData[] = [
	kibaleSafari,
	masaiMaraGameDrive,
	murchisonFallsSafari,
	queenElizabethWildlifeTour,
	rwandaAkageraWildlifeSafari,
	bwindiGorillaTour,
	bwindiGorillaLakeBunyonyi,
	gorillaAndWildlifeSafari5day,
	kidepoBig5Safari5day,
	murchisonQeGorillas7day,
	murchisonQeGorillas7dayPrivate,
	chimpsGorillaWildlife7day,
	kenyaExclusiveSafari7day,
	murchisonChimpGorilla8day,
	ugandaTanzaniaExperience8day,
	// Add new itinerary data files here
];

// ── DB client ────────────────────────────────────────────────────────────────
const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

// ── Helpers ──────────────────────────────────────────────────────────────────

/** Resolves a location name to its DB id, throwing if not found. */
async function resolveLocationId(name: string): Promise<string> {
	const location = await prisma.location.findFirst({ where: { name } });
	if (!location) {
		throw new Error(
			`Location "${name}" not found in the database. ` +
				'Run the main seed (pnpm seed) first to create all locations.'
		);
	}
	return location.id;
}

// ── Main ─────────────────────────────────────────────────────────────────────

async function main() {
	console.log(`\n🌱 Seeding ${allItineraries.length} itinerar${allItineraries.length === 1 ? 'y' : 'ies'}…\n`);

	for (const data of allItineraries) {
		const { itinerary, steps, meta } = data;

		// Resolve locationName → locationId for each step
		const resolvedSteps = await Promise.all(
			steps.map(async ({ locationName, ...step }) => ({
				...step,
				...(locationName ? { locationId: await resolveLocationId(locationName) } : {}),
			}))
		);

		// Build flat meta fields from the optional meta object
		const metaFields = {
			pickup: meta?.pickup ?? null,
			meetingPoint: meta?.meetingPoint ?? null,
			includes: meta?.includes ?? [],
			excludes: meta?.excludes ?? [],
			complementaries: meta?.complementaries ?? [],
			faqs: meta?.faqs ? (meta.faqs as unknown as import('@prisma/client').Prisma.InputJsonValue) : null,
		};

		// Upsert the itinerary row (without nested steps so we control ordering)
		const { id, ...itineraryFields } = itinerary;
		await prisma.itinerary.upsert({
			where: { id },
			update: { ...itineraryFields, ...metaFields },
			create: { id, ...itineraryFields, ...metaFields },
		});

		// Replace all steps for this itinerary (idempotent re-runs)
		await prisma.itineraryStep.deleteMany({ where: { itineraryId: id } });
		await prisma.itineraryStep.createMany({
			data: resolvedSteps.map((step) => ({ ...step, itineraryId: id })),
		});

		console.log(`✅ ${itinerary.title} (${steps.length} step${steps.length === 1 ? '' : 's'})`);
	}

	console.log('\n🎉 Done!');
}

main()
	.catch((err) => {
		console.error('❌ Seed failed:', err.message);
		process.exit(1);
	})
	.finally(() => prisma.$disconnect());
