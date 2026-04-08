<script lang="ts">
	import type { PageData } from './$types';
	import ItineraryForm from '$lib/components/ItineraryForm.svelte';

	let { data }: { data: PageData } = $props();
</script>

<div class="max-w-2xl">
	<div class="mb-6">
		<a href="/admin/itineraries" class="text-sm text-primary hover:underline">← Back to itineraries</a>
	</div>

	<div class="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
		<h2 class="mb-6 text-lg font-semibold text-gray-900">New Itinerary</h2>
		<ItineraryForm formData={data.form} action="?/createItinerary" mode="create" />
	</div>
</div>
