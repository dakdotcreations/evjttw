<script lang="ts">
import { onMount } from 'svelte';
import { goto } from '$app/navigation';
import { page } from '$app/state';
import { loadGsap } from '$lib/utils/useGsap';
import TourCard from '$lib/components/TourCard.svelte';
import TagPill from '$lib/components/ui/TagPill.svelte';
import HeadlineReveal from '$lib/components/HeadlineReveal.svelte';
import CtaBanner from '$lib/components/CtaBanner.svelte';
import type { PageData } from './$types';

let { data }: { data: PageData } = $props();

let selectedCountry = $state(data.activeCountry);

const filteredTours = $derived(
selectedCountry
? data.tours.filter((t) => t.countries.some((c) => c.id === selectedCountry))
: data.tours
);

function setTag(slug: string) {
const params = new URLSearchParams(page.url.searchParams);
if (slug) {
params.set('tag', slug);
} else {
params.delete('tag');
}
params.delete('country');
selectedCountry = '';
goto(`?${params.toString()}`, { replaceState: true, keepFocus: true });
}

function setCountry(id: string) {
selectedCountry = id;
}

let grid: HTMLElement = $state() as HTMLElement;

onMount(() => {
const observer = new IntersectionObserver(async ([entry]) => {
if (!entry.isIntersecting) return;
observer.disconnect();
const { gsap } = await loadGsap();
gsap.from(grid?.children, { opacity: 0, y: 28, stagger: 0.07, duration: 0.55, ease: 'power2.out' });
}, { threshold: 0.05 });
if (grid) observer.observe(grid);
return () => observer.disconnect();
});
</script>

<svelte:head>
<title>Tours — Evajo Tours & Travel</title>
<meta name="description" content="Browse East Africa safaris, mountain treks and water adventures. Filter by tag or country to find your perfect tour." />
</svelte:head>

<!-- HERO BANNER -->
<div class="bg-primary pb-16 pt-32">
<div class="mx-auto max-w-7xl px-6 lg:px-8">
<p class="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">All Tours</p>
<HeadlineReveal>
<h1 class="font-display text-[clamp(3rem,7vw,6rem)] leading-none tracking-wide text-white">Find Your Adventure</h1>
</HeadlineReveal>
<p class="mt-4 max-w-xl text-sm text-white/60">
Safaris, mountain trekking, and water activities across East Africa. Use the filters below.
</p>
</div>
</div>

<!-- STICKY FILTER BAR -->
<div class="sticky top-20 z-40 border-b border-black/5 bg-white/95 shadow-sm backdrop-blur-sm">
<div class="mx-auto max-w-7xl px-6 py-4 lg:px-8">
<div class="flex flex-wrap items-center gap-2">
<!-- Tag pills -->
<TagPill label="All" active={!data.activeTag} onclick={() => setTag('')} />
{#each data.allTags as tag (tag.id)}
<TagPill label={tag.name} active={data.activeTag === tag.slug} onclick={() => setTag(tag.slug)} />
{/each}

<!-- Country dropdown -->
{#if data.allCountries.length > 0}
<div class="ml-auto">
<select
value={selectedCountry}
onchange={(e) => setCountry((e.target as HTMLSelectElement).value)}
class="border border-black/15 bg-white px-3 py-2 text-xs font-medium text-black focus:border-primary focus:outline-none"
>
<option value="">All Countries</option>
{#each data.allCountries as c (c.id)}
<option value={c.id}>{c.name}</option>
{/each}
</select>
</div>
{/if}

<span class="text-xs text-gray-400 {data.allCountries.length > 0 ? '' : 'ml-auto'}">
{filteredTours.length} {filteredTours.length === 1 ? 'tour' : 'tours'}
</span>
</div>
</div>
</div>

<!-- TOUR GRID -->
<section class="bg-white py-14">
<div class="mx-auto max-w-7xl px-6 lg:px-8">
{#if filteredTours.length > 0}
<div bind:this={grid} class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
tags={tour.tags}
/>
{/each}
</div>
{:else}
<div class="flex flex-col items-center py-24 text-center">
<p class="font-display text-3xl tracking-wide text-black">No tours found</p>
<p class="mt-2 text-sm text-gray-400">Try removing a filter or browse all tours.</p>
<button onclick={() => { setTag(''); setCountry(''); }} class="mt-6 border border-primary px-6 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white">
Clear Filters
</button>
</div>
{/if}
</div>
</section>

<CtaBanner heading="Can't Find What You're Looking For?" subtext="Tell us your dream trip and we'll craft a bespoke itinerary for you." btnLabel="Talk to Us" href="/contact" />
