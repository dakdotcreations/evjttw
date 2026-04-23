// Tour client-side cache store.
// Module-level $state persists across SvelteKit navigations for the lifetime of the browser tab.

export type Tag = { id: string; name: string; slug: string };
export type StoreCountry = { id: string; name: string; code: string };

export type TourSummary = {
	id: string;
	title: string;
	coverImage: string | null;
	durationDays: number;
	fixedPrice: number | null;
	pricePerPerson: number | null;
	currency: string;
	pricingDisabled: boolean;
	countries: StoreCountry[];
	tags: { name: string; slug: string }[];
};

export type TourStep = {
	id: string;
	stepNumber: number;
	title: string;
	description: string | null;
	highlight: string | null;
	durationDays: number | null;
	durationHours: number | null;
	images: string[];
	location: {
		id: string;
		name: string;
		country: { id: string; name: string; code: string } | null;
	} | null;
};

export type RelatedTour = {
	id: string;
	title: string;
	coverImage: string | null;
	durationDays: number;
	fixedPrice: number | null;
	pricePerPerson: number | null;
	currency: string;
	pricingDisabled: boolean;
	countries: string[];
	tags: { name: string; slug: string }[];
};

export type TourDetail = TourSummary & {
	summary: string;
	description: string;
	bestSeasons: string[];
	images: string[];
	includes: string[];
	excludes: string[];
	complementaries: string[];
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	faqs: any;
	pickup: string | null;
	meetingPoint: string | null;
	steps: TourStep[];
};

export type DetailEntry = {
	itinerary: TourDetail;
	countries: string[];
	related: RelatedTour[];
};

type Status = 'idle' | 'loading' | 'loaded' | 'error';

// ── Module-level reactive state ──────────────────────────────────────────────
let summaries = $state<TourSummary[]>([]);
let details = $state<Record<string, DetailEntry>>({});
let allTags = $state<Tag[]>([]);
let allCountries = $state<StoreCountry[]>([]);
let listStatus = $state<Status>('idle');
let detailStatus = $state<Record<string, Status>>({});

// ── Actions ──────────────────────────────────────────────────────────────────

/** Fetch all published tour summaries from the API. No-op if already loading/loaded. */
async function loadList() {
	if (listStatus === 'loading' || listStatus === 'loaded') return;
	listStatus = 'loading';
	try {
		const res = await fetch('/api/tours');
		if (!res.ok) throw new Error('Failed to fetch tours');
		const json = await res.json() as { tours: TourSummary[]; allTags: Tag[]; allCountries: StoreCountry[] };
		summaries = json.tours;
		allTags = json.allTags;
		allCountries = json.allCountries;
		listStatus = 'loaded';
	} catch {
		listStatus = 'error';
	}
}

/** Fetch a single tour's full detail from the API. No-op if already loading/loaded. */
async function loadDetail(id: string) {
	const current = detailStatus[id];
	if (current === 'loading' || current === 'loaded') return;
	detailStatus = { ...detailStatus, [id]: 'loading' };
	try {
		const res = await fetch(`/api/tours/${id}`);
		if (!res.ok) throw new Error('Tour not found');
		const json = await res.json() as { itinerary: TourDetail; countries: string[]; related: RelatedTour[] };
		details = { ...details, [id]: { itinerary: json.itinerary, countries: json.countries, related: json.related } };
		// Also merge into summaries if not already present
		if (!summaries.find((s) => s.id === id)) {
			summaries = [...summaries, json.itinerary];
		}
		detailStatus = { ...detailStatus, [id]: 'loaded' };
	} catch {
		detailStatus = { ...detailStatus, [id]: 'error' };
	}
}

/** Populate the list cache synchronously (e.g. from SSR data on hydration). */
function seedList(data: { tours: TourSummary[]; allTags: Tag[]; allCountries: StoreCountry[] }) {
	summaries = data.tours;
	allTags = data.allTags;
	allCountries = data.allCountries;
	listStatus = 'loaded';
}

/** Add or replace a detail entry synchronously (e.g. from SSR data on hydration). */
function seedDetail(id: string, entry: DetailEntry) {
	details = { ...details, [id]: entry };
	if (!summaries.find((s) => s.id === id)) {
		summaries = [...summaries, entry.itinerary];
	}
	detailStatus = { ...detailStatus, [id]: 'loaded' };
}

/**
 * Merge additional tour summaries into the store (e.g. from home page or
 * destination page featured tours). Only adds entries not already present.
 */
function seedSummaries(tours: TourSummary[]) {
	const existing = new Set(summaries.map((s) => s.id));
	const incoming = tours.filter((t) => !existing.has(t.id));
	if (incoming.length > 0) summaries = [...summaries, ...incoming];
}

// ── Public API ───────────────────────────────────────────────────────────────
export const tourStore = {
	get summaries() { return summaries; },
	get details() { return details; },
	get allTags() { return allTags; },
	get allCountries() { return allCountries; },
	get listStatus() { return listStatus; },
	get detailStatus() { return detailStatus; },
	loadList,
	loadDetail,
	seedList,
	seedDetail,
	seedSummaries,
};
