<script lang="ts">
	import type { PageData } from './$types';
	import DestinationCard from '$lib/components/DestinationCard.svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Destinations — Evajo Tours & Travel</title>
	<meta
		name="description"
		content="Explore Uganda, Kenya, Tanzania and Rwanda with Evajo Tours & Travel. Discover wildlife safaris, mountain trekking and water adventures."
	/>
</svelte:head>

<div class="bg-primary pb-12 pt-24 text-white">
	<div class="mx-auto max-w-7xl px-4 sm:px-6">
		<p class="mb-1 text-xs font-semibold uppercase tracking-widest text-accent">Where We Go</p>
		<h1 class="text-3xl font-bold sm:text-4xl">Our Destinations</h1>
		<p class="mt-2 max-w-xl text-sm text-white/70">
			Four of East Africa's most remarkable countries, each offering world-class wildlife,
			landscapes, and culture.
		</p>
	</div>
</div>

<div class="bg-white py-12 sm:py-16">
	<div class="mx-auto max-w-7xl px-4 sm:px-6">
		{#if data.countries.length > 0}
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{#each data.countries as country (country.id)}
					<DestinationCard
						code={country.code}
						name={country.name}
						flagEmoji={country.flagEmoji}
						imageUrl={country.imageUrl}
						tourCount={country.tourCount}
					/>
				{/each}
			</div>
		{:else}
			<p class="py-20 text-center text-sm text-gray-400">No destinations added yet.</p>
		{/if}
	</div>
</div>
