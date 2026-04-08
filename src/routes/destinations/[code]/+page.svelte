<script lang="ts">
	import type { PageData } from './$types';
	import TourCard from '$lib/components/TourCard.svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>{data.country.name} — Evajo Tours & Travel</title>
	<meta
		name="description"
		content={data.country.description ??
			`Explore ${data.country.name} with Evajo Tours & Travel.`}
	/>
</svelte:head>

<!-- Country Hero -->
<div class="relative flex items-end bg-primary" style="min-height: 50vh;">
	{#if data.country.imageUrl}
		<img
			src={data.country.imageUrl}
			alt={data.country.name}
			class="absolute inset-0 h-full w-full object-cover"
		/>
	{/if}
	<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/5"></div>
	<div class="relative z-10 w-full pb-10 pt-24">
		<div class="mx-auto max-w-5xl px-4 sm:px-6">
			{#if data.country.flagEmoji}
				<div class="mb-2 text-4xl">{data.country.flagEmoji}</div>
			{/if}
			<h1 class="text-4xl font-bold text-white sm:text-5xl">{data.country.name}</h1>
		</div>
	</div>
</div>

<div class="bg-white py-12 sm:py-16">
	<div class="mx-auto max-w-5xl px-4 sm:px-6">
		{#if data.country.description}
			<p class="mb-10 max-w-2xl text-base leading-relaxed text-gray-600">
				{data.country.description}
			</p>
		{/if}

		{#if data.country.locations.length > 0}
			<div class="mb-10">
				<h2 class="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">Key Areas</h2>
				<div class="flex flex-wrap gap-2">
					{#each data.country.locations as loc (loc.id)}
						<span
							class="rounded-full border border-primary/20 px-3 py-1 text-xs font-medium text-primary"
						>
							{loc.name}
						</span>
					{/each}
				</div>
			</div>
		{/if}

		{#if data.tours.length > 0}
			<h2 class="mb-6 text-xl font-bold text-black">Tours in {data.country.name}</h2>
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each data.tours as tour (tour.id)}
					<TourCard
						id={tour.id}
						title={tour.title}
						coverImage={tour.coverImage}
						durationDays={tour.durationDays}
						fixedPrice={tour.fixedPrice}
						pricePerPerson={tour.pricePerPerson}
						currency={tour.currency}
						countries={tour.countries}
					/>
				{/each}
			</div>
		{:else}
			<p class="rounded-xl border border-gray-100 py-12 text-center text-sm text-gray-400">
				No tours currently available for this destination.
				<a href="/contact" class="text-primary underline">Contact us</a> to plan a custom trip.
			</p>
		{/if}
	</div>
</div>
