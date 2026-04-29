<script lang="ts">
	import { onMount } from 'svelte';
	import { loadGsap } from '$lib/utils/useGsap';
	import type { PageData } from './$types';
	import TourCard from '$lib/components/TourCard.svelte';
	import HeadlineReveal from '$lib/components/HeadlineReveal.svelte';
	import CtaBanner from '$lib/components/CtaBanner.svelte';

	let { data }: { data: PageData } = $props();

	let heroEl: HTMLElement = $state() as HTMLElement;
	let toursGrid: HTMLElement = $state() as HTMLElement;

	$effect(async () => {
		const { gsap } = await loadGsap();
		gsap.from(heroEl.querySelectorAll('.hero-in'), {
			opacity: 0,
			y: 24,
			stagger: 0.1,
			duration: 0.7,
			ease: 'power3.out',
			delay: 0.3
		});
	});
</script>

<svelte:head>
	<title>{data.country.name} — Evajo Tours & Travel</title>
	<meta
		name="description"
		content={data.country.description ?? `Explore ${data.country.name} with Evajo Tours & Travel.`}
	/>
</svelte:head>

<!-- HERO -->
<div
	bind:this={heroEl}
	class="relative flex items-end overflow-hidden bg-primary"
	style="min-height:80vh;"
>
	{#if data.country.videoUrl}
		<video
			src={data.country.videoUrl}
			autoplay
			muted
			loop
			playsinline
			class="absolute inset-0 h-full w-full scale-105 object-cover"
		></video>
	{:else if data.country.imageUrl}
		<img
			data-speed="0.5"
			src={data.country.imageUrl}
			alt={data.country.name}
			class="absolute inset-0 h-full w-full scale-110 object-cover"
		/>
	{/if}
	<div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10"></div>
	<div class="relative z-10 w-full pb-14 pt-28">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<HeadlineReveal>
				<h1 class="hero-in font-display text-[clamp(4rem,9vw,8.5rem)] leading-none tracking-wide text-white">
					{data.country.name}
				</h1>
			</HeadlineReveal>
            {#if data.country.description}
                <div class="text-base text-white opacity-80 leading-relaxed">
                    {@html data.country.description}
                </div>
            {/if}
		</div>
	</div>
</div>

<!-- ABOUT / KEY AREAS -->
<section class="bg-white py-16">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		{#if data.country.locations.length > 0}
			<div>
				<p class="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">Key Areas</p>
				<div class="flex flex-wrap gap-2">
					{#each data.country.locations as loc (loc.id)}
						<span class="border border-primary/20 px-3 py-1.5 text-xs font-medium text-primary">
							{loc.name}
						</span>
					{/each}
				</div>
			</div>
		{/if}
	</div>
</section>

<!-- TOURS -->
<section class="bg-[#f5f3f0] py-16">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mb-10">
			<p class="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">Available Tours</p>
			<HeadlineReveal>
				<h2 class="font-display text-4xl tracking-wide text-black">Tours in {data.country.name}</h2>
			</HeadlineReveal>
		</div>
		{#if data.tours.length > 0}
			<div bind:this={toursGrid} class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each data.tours as tour (tour.id)}
					<TourCard
						id={tour.id}
						title={tour.title}
						coverImage={tour.coverImage}
						durationDays={tour.durationDays}
						fixedPrice={tour.fixedPrice}
						pricePerPerson={tour.pricePerPerson}
						currency={tour.currency}
						pricingDisabled={tour.pricingDisabled}
						countries={tour.countries}
					/>
				{/each}
			</div>
		{:else}
			<p class="py-16 text-center text-sm text-gray-400">
				No tours currently available. <a href="/contact" class="text-primary underline">Contact us</a> to plan a custom trip.
			</p>
		{/if}
	</div>
</section>

<CtaBanner
	heading="Dreaming of {data.country.name}?"
	subtext="Tell us your interests and we'll craft a bespoke itinerary for you."
	btnLabel="Plan My Trip"
	href="/contact"
/>
