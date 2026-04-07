<script lang="ts">
	import type { PageData } from './$types';
	import HeroSlideshow from '$lib/components/HeroSlideshow.svelte';
	import TourCard from '$lib/components/TourCard.svelte';
	import DestinationCard from '$lib/components/DestinationCard.svelte';
	import { Star } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Evajo Tours & Travel — East Africa Safaris & Adventures</title>
	<meta
		name="description"
		content="Experience safaris, mountain trekking and water adventures across Uganda, Kenya, Tanzania and Rwanda with Evajo Tours & Travel."
	/>
</svelte:head>

<!-- Hero -->
<HeroSlideshow images={data.heroImages}>
	<div class="mx-auto max-w-3xl px-6 text-center text-white">
		<p class="mb-3 text-sm font-semibold uppercase tracking-widest text-accent">
			Uganda · Kenya · Tanzania · Rwanda
		</p>
		<h1 class="mb-5 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
			Experience East Africa<br />Like Never Before
		</h1>
		<p class="mb-8 text-base text-white/80 sm:text-lg">
			Safaris, mountain trekking &amp; water adventures crafted for explorers who expect the
			extraordinary.
		</p>
		<div class="flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
			<a
				href="/tours"
				class="rounded-lg bg-accent px-7 py-3 text-sm font-semibold text-black transition-colors hover:bg-accent/90"
			>
				Explore Tours
			</a>
			<a
				href="/contact"
				class="rounded-lg border border-white/40 px-7 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
			>
				Plan My Trip
			</a>
		</div>
	</div>
</HeroSlideshow>

<!-- Featured Destinations -->
{#if data.countries.length > 0}
	<section class="bg-white py-16 sm:py-20">
		<div class="mx-auto max-w-7xl px-4 sm:px-6">
			<div class="mb-10 flex items-end justify-between">
				<div>
					<p class="mb-1 text-xs font-semibold uppercase tracking-widest text-accent">Where We Go</p>
					<h2 class="text-2xl font-bold text-black sm:text-3xl">Explore Destinations</h2>
				</div>
				<a
					href="/destinations"
					class="text-sm font-medium text-primary underline-offset-2 hover:underline"
				>View all →</a>
			</div>
			<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
				{#each data.countries as country (country.id)}
					<DestinationCard
						code={country.code}
						name={country.name}
						flagEmoji={country.flagEmoji}
						imageUrl={country.imageUrl}
						tourCount={0}
					/>
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- Featured Tours -->
{#if data.featuredTours.length > 0}
	<section class="bg-gray-50 py-16 sm:py-20">
		<div class="mx-auto max-w-7xl px-4 sm:px-6">
			<div class="mb-10 flex items-end justify-between">
				<div>
					<p class="mb-1 text-xs font-semibold uppercase tracking-widest text-accent">
						Handpicked for You
					</p>
					<h2 class="text-2xl font-bold text-black sm:text-3xl">Featured Tours</h2>
				</div>
				<a
					href="/tours"
					class="text-sm font-medium text-primary underline-offset-2 hover:underline"
				>View all →</a>
			</div>
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
				{#each data.featuredTours as tour (tour.id)}
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
		</div>
	</section>
{/if}

<!-- Why Choose Us -->
<section class="bg-white py-16 sm:py-20">
	<div class="mx-auto max-w-7xl px-4 sm:px-6">
		<div class="mb-12 text-center">
			<p class="mb-1 text-xs font-semibold uppercase tracking-widest text-accent">Why Evajo</p>
			<h2 class="text-2xl font-bold text-black sm:text-3xl">The Evajo Difference</h2>
		</div>
		<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
			<div class="text-center">
				<div
					class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary" aria-hidden="true"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" x2="9" y1="3" y2="18"/><line x1="15" x2="15" y1="6" y2="21"/></svg>
				</div>
				<h3 class="mb-2 text-sm font-semibold text-black">Expert Local Guides</h3>
				<p class="text-xs leading-relaxed text-gray-500">
					Our guides are born and raised across East Africa — they know every trail, watering hole,
					and hidden gem.
				</p>
			</div>
			<div class="text-center">
				<div
					class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
				</div>
				<h3 class="mb-2 text-sm font-semibold text-black">Bespoke Itineraries</h3>
				<p class="text-xs leading-relaxed text-gray-500">
					Every trip is tailored to you — your pace, interests, and budget. No two Evajo journeys
					are the same.
				</p>
			</div>
			<div class="text-center">
				<div
					class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary" aria-hidden="true"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
				</div>
				<h3 class="mb-2 text-sm font-semibold text-black">10+ Years of Experience</h3>
				<p class="text-xs leading-relaxed text-gray-500">
					Crafting unforgettable East African adventures since 2014 for clients across the globe.
				</p>
			</div>
			<div class="text-center">
				<div
					class="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10"
				>
					<svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-primary" aria-hidden="true"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
				</div>
				<h3 class="mb-2 text-sm font-semibold text-black">Safety &amp; Peace of Mind</h3>
				<p class="text-xs leading-relaxed text-gray-500">
					From airport transfers to bush camps, we handle every detail so you can focus on the
					experience.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- Testimonials Teaser -->
{#if data.testimonials.length > 0}
	<section class="bg-primary py-16 sm:py-20">
		<div class="mx-auto max-w-7xl px-4 sm:px-6">
			<div class="mb-10 text-center">
				<p class="mb-1 text-xs font-semibold uppercase tracking-widest text-accent">
					What Clients Say
				</p>
				<h2 class="text-2xl font-bold text-white sm:text-3xl">Real Experiences</h2>
			</div>
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each data.testimonials as t (t.id)}
					<div class="rounded-xl bg-white/10 p-6 text-white">
						<div class="mb-3 flex gap-0.5">
							{#each Array.from({ length: t.rating }) as _, i (i)}
								<Star size={14} class="fill-accent text-accent" />
							{/each}
						</div>
						<p class="mb-4 text-sm leading-relaxed text-white/90">"{t.quote}"</p>
						<p class="text-xs font-semibold text-accent">{t.clientName}</p>
						{#if t.country}
							<p class="text-xs text-white/50">{t.country}</p>
						{/if}
					</div>
				{/each}
			</div>
			<div class="mt-10 text-center">
				<a
					href="/about"
					class="inline-block rounded-lg border border-white/40 px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-white/10"
				>
					Read all reviews →
				</a>
			</div>
		</div>
	</section>
{/if}

<!-- Booking CTA -->
<section class="bg-accent py-14 sm:py-16">
	<div class="mx-auto max-w-2xl px-4 text-center">
		<h2 class="mb-3 text-2xl font-bold text-black sm:text-3xl">Ready for Your Adventure?</h2>
		<p class="mb-7 text-sm text-black/70">
			Tell us your dream and we will plan every detail — from flights to campfires.
		</p>
		<a
			href="/contact"
			class="inline-block rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-white transition-colors hover:bg-primary/90"
		>
			Plan My Trip
		</a>
	</div>
</section>

