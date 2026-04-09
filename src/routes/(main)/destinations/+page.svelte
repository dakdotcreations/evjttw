<script lang="ts">
	import { onMount } from 'svelte';
	import { loadGsap } from '$lib/utils/useGsap';
	import type { PageData } from './$types';
	import DestinationCard from '$lib/components/DestinationCard.svelte';
	import HeadlineReveal from '$lib/components/HeadlineReveal.svelte';
	import CtaBanner from '$lib/components/CtaBanner.svelte';

	let { data }: { data: PageData } = $props();

	let grid: HTMLElement = $state() as HTMLElement;

	onMount(() => {
		const observer = new IntersectionObserver(
			async ([entry]) => {
				if (!entry.isIntersecting) return;
				observer.disconnect();
				const { gsap } = await loadGsap();
				gsap.from(grid?.children, { opacity: 0, y: 28, stagger: 0.08, duration: 0.6, ease: 'power2.out' });
			},
			{ threshold: 0.1 }
		);
		if (grid) observer.observe(grid);
		return () => observer.disconnect();
	});
</script>

<svelte:head>
	<title>Destinations — Evajo Tours & Travel</title>
	<meta
		name="description"
		content="Explore Uganda, Kenya, Tanzania and Rwanda with Evajo Tours & Travel. Discover wildlife safaris, mountain trekking and water adventures."
	/>
</svelte:head>

<!-- HERO -->
<div class="bg-primary pb-20 pt-36">
	<div class="mx-auto max-w-5xl px-6 lg:px-8">
		<p class="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent">Where We Go</p>
		<HeadlineReveal>
			<h1 class="font-display text-[clamp(3rem,7vw,6rem)] leading-none tracking-wide text-white">
				Our Destinations
			</h1>
		</HeadlineReveal>
		<p class="mt-5 max-w-xl text-sm leading-relaxed text-white/60">
			Four of East Africa's most remarkable countries, each offering world-class wildlife,
			landscapes, and culture.
		</p>
	</div>
</div>

<!-- DESTINATIONS GRID -->
<section class="bg-white py-20">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		{#if data.countries.length > 0}
			<div
				bind:this={grid}
				class="grid gap-6 grid-cols-[repeat(auto-fit,minmax(280px,1fr))]"
			>
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
			<p class="py-24 text-center text-sm text-gray-400">No destinations added yet.</p>
		{/if}
	</div>
</section>

<CtaBanner
	heading="Where Will You Go Next?"
	subtext="Browse our tours and start planning your East Africa adventure."
	btnLabel="View All Tours"
	href="/tours"
/>
