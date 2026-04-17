export type SeedStep = {
	stepNumber: number;
	title: string;
	description: string;
	highlight?: string | null;
	durationDays?: number | null;
	durationHours?: number | null;
	/** Name of an existing Location row — resolved to locationId at insert time. */
	locationName?: string;
	images?: string[];
};

export type SeedItinerary = {
	/** Stable ID used for upserts — use a descriptive slug, e.g. "seed-kibale-chimp-safari". */
	id: string;
	title: string;
	summary: string;
	description: string;
	fixedPrice?: number | null;
	pricePerPerson?: number | null;
	currency?: string;
	durationDays: number;
	bestSeasons?: string[];
	coverImage?: string | null;
	images?: string[];
	published?: boolean;
	pricingDisabled?: boolean;
};

export type SeedMeta = {
	pickup?: string;
	meetingPoint?: string;
	includes?: string[];
	excludes?: string[];
	complementaries?: string[];
	faqs?: { question: string; answer: string }[];
};

export type SeedData = {
	itinerary: SeedItinerary;
	steps: SeedStep[];
	meta?: SeedMeta;
};
