<script lang="ts">
	import type { PageData } from './$types';
	import TourCard from '$lib/components/TourCard.svelte';
	import { ChevronDown } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();

	let selectedCountryId = $state('');
	let selectedLocationId = $state('');

	const allCountries = $derived(
		[...new Map(data.tours.flatMap((t) => t.countries).map((c) => [c.id, c])).values()].sort(
			(a, b) => a.name.localeCompare(b.name)
		)
	);

	const availableLocations = $derived(
		selectedCountryId
			? [
					...new Map(
						data.tours
							.flatMap((t) => t.locations)
							.filter((l) => l.countryId === selectedCountryId)
							.map((l) => [l.id, l])
					).values(),
				].sort((a, b) => a.name.localeCompare(b.name))
			: []
	);

	const filteredTours = $derived(
		data.tours.filter((t) => {
			if (selectedCountryId && !t.countries.some((c) => c.id === selectedCountryId)) return false;
			if (selectedLocationId && !t.locations.some((l) => l.id === selectedLocationId)) return false;
			return true;
		})
	);

	function onCountryChange(e: Event) {
		selectedCountryId = (e.target as HTMLSelectElement).value;
		selectedLocationId = '';
	}
</script>

<svelte:head>
	<title>Tours — Evajo Tours & Travel</title>
	<meta
		name="description"
		content="Browse East Africa safaris, mountain treks and water adventures. Filter by country or location to find your perfect tour."
	/>
</svelte:head>

<!-- Page Banner -->
<div class="bg-primary pb-12 pt-24 text-white">
	<div class="mx-auto max-w-7xl px-4 sm:px-6">
		<p class="mb-1 text-xs font-semibold uppercase tracking-widest text-accent">All Tours</p>
		<h1 class="text-3xl font-bold sm:text-4xl">Find Your Adventure</h1>
		<p class="mt-2 max-w-xl text-sm text-white/70">
			Safaris, mountain trekking, and water activities across East Africa. Filter below to find the
			perfect trip.
		</p>
	</div>
</div>

<!-- Filters -->
<div class="sticky top-16 z-40 border-b border-gray-100 bg-white shadow-sm">
	<div class="mx-auto flex max-w-7xl flex-wrap items-center gap-3 px-4 py-3 sm:px-6">
		<span class="text-xs font-medium uppercase tracking-wide text-gray-500">Filter:</span>

		<div class="relative">
			<select
				value={selectedCountryId}
				onchange={onCountryChange}
				class="appearance-none rounded-lg border border-gray-200 bg-white py-1.5 pl-3 pr-8 text-sm text-black focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
			>
				<option value="">All Countries</option>
				{#each allCountries as c (c.id)}
					<option value={c.id}>{c.name}</option>
				{/each}
			</select>
			<ChevronDown
				size={14}
				class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
			/>
		</div>

		{#if availableLocations.length > 0}
			<div class="relative">
				<select
					bind:value={selectedLocationId}
					class="appearance-none rounded-lg border border-gray-200 bg-white py-1.5 pl-3 pr-8 text-sm text-black focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
				>
					<option value="">All Locations</option>
					{#each availableLocations as l (l.id)}
						<option value={l.id}>{l.name}</option>
					{/each}
				</select>
				<ChevronDown
					size={14}
					class="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 text-gray-400"
				/>
			</div>
		{/if}

		{#if selectedCountryId || selectedLocationId}
			<button
				onclick={() => {
					selectedCountryId = '';
					selectedLocationId = '';
				}}
				class="text-xs text-gray-400 underline underline-offset-2 transition-colors hover:text-primary"
			>
				Clear filters
			</button>
		{/if}

		<span class="ml-auto text-xs text-gray-400">
			{filteredTours.length}
			{filteredTours.length === 1 ? 'tour' : 'tours'}
		</span>
	</div>
</div>

<!-- Tour Grid -->
<div class="bg-white py-10 sm:py-14">
	<div class="mx-auto max-w-7xl px-4 sm:px-6">
		{#if filteredTours.length > 0}
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{#each filteredTours as tour (tour.id)}
					<TourCard
						id={tour.id}
						title={tour.title}
						coverImage={tour.coverImage}
						durationDays={tour.durationDays}
						fixedPrice={tour.fixedPrice}
						pricePerPerson={tour.pricePerPerson}
						currency={tour.currency}
						countries={tour.countries.map((c) => c.name)}
					/>
				{/each}
			</div>
		{:else}
			<div class="py-20 text-center">
				<p class="text-sm text-gray-400">No tours match your filters.</p>
				<button
					onclick={() => {
						selectedCountryId = '';
						selectedLocationId = '';
					}}
					class="mt-3 text-sm text-primary underline underline-offset-2"
				>
					Clear filters
				</button>
			</div>
		{/if}
	</div>
</div>
