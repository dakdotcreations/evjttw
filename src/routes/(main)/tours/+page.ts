import { browser } from '$app/environment';
import { tourStore, type TourSummary, type Tag, type StoreCountry } from '$lib/stores/tours.svelte';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
	if (browser) {
		// Fire background fetch (no-op if already loading/loaded), return immediately.
		// The store drives the UI reactively - skeleton shows while loading.
		tourStore.loadList();
		return {
			tours: tourStore.summaries,
			allTags: tourStore.allTags,
			allCountries: tourStore.allCountries,
		};
	}

	// SSR: await fully so the first HTML render has real content
	const res = await fetch('/api/tours');
	const json = (await res.json()) as { tours: TourSummary[]; allTags: Tag[]; allCountries: StoreCountry[] };
	return json;
};
