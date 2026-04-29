<script lang="ts">
	import { onMount } from "svelte"
	import { goto } from "$app/navigation"
	import { page } from "$app/state"
	import { loadGsap } from "$lib/utils/useGsap"
	import TourCard from "$lib/components/TourCard.svelte"
	import TagPill from "$lib/components/ui/TagPill.svelte"
	import HeadlineReveal from "$lib/components/HeadlineReveal.svelte"
	import CtaBanner from "$lib/components/CtaBanner.svelte"
	import { tourStore } from "$lib/stores/tours.svelte"
	import type { PageData } from "./$types"

	let { data }: { data: PageData } = $props()

	// Seed the store from SSR data on first hydration
	onMount(() => {
		if (data.tours?.length && tourStore.listStatus !== 'loaded') {
			tourStore.seedList({
				tours: data.tours,
				allTags: data.allTags ?? [],
				allCountries: data.allCountries ?? [],
			})
		}
	})

	// Store is the source of truth on client; fall back to SSR data before store is ready
	const tours = $derived(tourStore.listStatus === 'loaded' ? tourStore.summaries : (data.tours ?? []))
	const allTags = $derived(tourStore.listStatus === 'loaded' ? tourStore.allTags : (data.allTags ?? []))
	const allCountries = $derived(tourStore.listStatus === 'loaded' ? tourStore.allCountries : (data.allCountries ?? []))

	// Active tag comes from URL; filter is applied client-side (no server roundtrip)
	const activeTag = $derived(page.url.searchParams.get("tag") ?? "")

	let selectedCountry = $state("")

	const filteredTours = $derived(() => {
		let result = activeTag
			? tours.filter((t) => t.tags.some((tg) => tg.slug === activeTag))
			: tours
		if (selectedCountry) {
			result = result.filter((t) => t.countries.some((c) => c.id === selectedCountry))
		}
		return result
	})

	function setTag(slug: string) {
		const params = new URLSearchParams(page.url.searchParams)
		if (slug) {
			params.set("tag", slug)
		} else {
			params.delete("tag")
		}
		selectedCountry = ""
		goto(`?${params.toString()}`, { replaceState: true, keepFocus: true, noScroll: true })
	}

	function setCountry(id: string) {
		selectedCountry = id
	}

	let grid: HTMLElement = $state() as HTMLElement
</script>

<svelte:head>
	<title>Tours — Evajo Tours & Travel</title>
	<meta
		name="description"
		content="Browse East Africa safaris, mountain treks and water adventures. Filter by tag or country to find your perfect tour." />
</svelte:head>

<!-- HERO BANNER -->
<div class="bg-primary pb-16 pt-32">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<p class="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">All Tours</p>
		<HeadlineReveal>
			<h1
				class="font-display text-[clamp(3rem,7vw,6rem)] leading-none tracking-wide text-white">
				Find Your Adventure
			</h1>
		</HeadlineReveal>
		<p class="mt-4 max-w-xl text-sm text-white/60">
			Safaris, mountain trekking, and water activities across East Africa. Use the filters
			below.
		</p>
	</div>
</div>

<!-- STICKY FILTER BAR -->
<div class="sticky top-20 z-40 border-b border-black/5 bg-white/95 shadow-sm backdrop-blur-sm">
	<div class="mx-auto max-w-7xl px-6 py-4 lg:px-8">
		<div class="flex flex-wrap items-center gap-2">
			<!-- Tag pills -->
			<TagPill label="All" active={!activeTag} onclick={() => setTag("")} />
			{#each allTags as tag (tag.id)}
				<TagPill
					label={tag.name}
					active={activeTag === tag.slug}
					onclick={() => setTag(tag.slug)} />
			{/each}

			<!-- Country dropdown -->
			{#if allCountries.length > 0}
				<div class="ml-auto">
					<select
						value={selectedCountry}
						onchange={(e) => setCountry((e.target as HTMLSelectElement).value)}
						class="border border-black/15 bg-white px-3 py-2 text-xs font-medium text-black focus:border-primary focus:outline-none">
						<option value="">All Countries</option>
						{#each allCountries as c (c.id)}
							<option value={c.id}>{c.name}</option>
						{/each}
					</select>
				</div>
			{/if}

			<span class="text-xs text-gray-400 {allCountries.length > 0 ? '' : 'ml-auto'}">
				{filteredTours().length}
				{filteredTours().length === 1 ? "tour" : "tours"}
			</span>
		</div>
	</div>
</div>

<!-- TOUR GRID -->
<section class="bg-white py-14">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		{#if tourStore.listStatus === 'loading' && !data.tours?.length}
			<!-- Loading skeleton -->
			<div class="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-6">
				{#each { length: 6 } as _}
					<div class="animate-pulse">
						<div class="aspect-4/3 w-full bg-gray-100"></div>
						<div class="mt-3 h-4 w-3/4 rounded bg-gray-100"></div>
						<div class="mt-2 h-3 w-1/2 rounded bg-gray-100"></div>
					</div>
				{/each}
			</div>
		{:else if filteredTours().length > 0}
			<div
				bind:this={grid}
				class="grid grid-cols-[repeat(auto-fit,minmax(350px,1fr))] gap-6">
				{#each filteredTours() as tour (tour.id)}
					<TourCard
						id={tour.id}
						title={tour.title}
						coverImage={tour.coverImage}
						durationDays={tour.durationDays}
						fixedPrice={tour.fixedPrice}
						pricePerPerson={tour.pricePerPerson}
						currency={tour.currency}
						pricingDisabled={tour.pricingDisabled}
						countries={tour.countries.map((c) => c.name)}
						tags={tour.tags} />
				{/each}
			</div>
		{:else}
			<div class="flex flex-col items-center py-24 text-center">
				<p class="font-display text-3xl tracking-wide text-black">No tours found</p>
				<p class="mt-2 text-sm text-gray-400">Try removing a filter or browse all tours.</p>
				<button
					onclick={() => {
						setTag("")
						setCountry("")
					}}
					class="mt-6 border border-primary px-6 py-2.5 text-sm font-semibold text-primary transition-colors hover:bg-primary hover:text-white">
					Clear Filters
				</button>
			</div>
		{/if}
	</div>
</section>

<CtaBanner
	heading="Can't Find What You're Looking For?"
	subtext="Tell us your dream trip and we'll craft a bespoke itinerary for you."
	btnLabel="Talk to Us"
	href="/contact" />
