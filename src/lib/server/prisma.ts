import { PrismaClient } from '$generated/prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { DATABASE_URL } from '$env/static/private';

declare global {
	// eslint-disable-next-line no-var
	var __prisma: PrismaClient | undefined;
}

function createPrismaClient(): PrismaClient {
	const adapter = new PrismaPg({ connectionString: DATABASE_URL });
	return new PrismaClient({ adapter });
}

const prisma = globalThis.__prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== 'production') {
	globalThis.__prisma = prisma;
}

export default prisma;
