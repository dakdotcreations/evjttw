import { browser } from '$app/environment';
import { error } from '@sveltejs/kit';
import { tourStore, type TourDetail, type RelatedTour } from '$lib/stores/tours.svelte';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch, params }) => {
	if (browser) {
		// Fire background fetch (no-op if already loading/loaded), return immediately.
		// The store drives the UI reactively — skeleton shows while loading.
		tourStore.loadDetail(params.id);
		const entry = tourStore.details[params.id];
		return {
			itinerary: entry?.itinerary,
			countries: entry?.countries ?? [],
			related: entry?.related ?? [],
		};
	}

	// SSR: await fully so the first HTML render has real content
	const res = await fetch(`/api/tours/${params.id}`);
	if (!res.ok) throw error(res.status, 'Tour not found');
	const json = (await res.json()) as { itinerary: TourDetail; countries: string[]; related: RelatedTour[] };
	return json;
};
