<script lang="ts">
	import type { PageData } from './$types';
	import TestimonialsStrip from '$lib/components/TestimonialsStrip.svelte';
	import CtaBanner from '$lib/components/CtaBanner.svelte';
	import HeadlineReveal from '$lib/components/HeadlineReveal.svelte';
	import ParaFade from '$lib/components/ParaFade.svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>About Us — Evajo Tours & Travel</title>
	<meta
		name="description"
		content="Learn about Evajo Tours & Travel — East Africa's dedicated safari and adventure specialists since 2014."
	/>
</svelte:head>

<!-- HERO -->
<section class="relative overflow-hidden bg-primary pb-20 pt-36">
	<div class="mx-auto max-w-5xl px-6 lg:px-8">
		<p class="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent">Our Story</p>
		<HeadlineReveal>
			<h1 class="font-display text-[clamp(3rem,7vw,6rem)] leading-none tracking-wide text-white">
				Born in East Africa. Built for Explorers.
			</h1>
		</HeadlineReveal>
		<ParaFade delay={0.3}>
			<p class="mt-6 max-w-2xl text-base leading-relaxed text-white/60">
				Evajo Tours & Travel was founded by East Africans who believe the best way to experience
				the continent is with people who truly know it — every trail, watering hole, and hidden gem.
			</p>
		</ParaFade>
	</div>
</section>

<!-- STORY -->
<section class="bg-white py-20">
	<div class="mx-auto max-w-5xl px-6 lg:px-8">
		<div class="grid gap-12 lg:grid-cols-2 lg:gap-16">
			<div>
				<p class="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">Who We Are</p>
				<HeadlineReveal>
					<h2 class="mb-6 font-display text-4xl tracking-wide text-black">
						Crafting Journeys Since 2014
					</h2>
				</HeadlineReveal>
				<ParaFade>
					<div class="space-y-4 text-sm leading-relaxed text-gray-600">
						<p>
							From mountain gorilla treks in Bwindi to wildebeest migrations on the Serengeti,
							white-water rafting on the Nile to flamingo-edged lakes in Rwanda — we curate
							journeys that go beyond the surface.
						</p>
						<p>
							We work directly with local guides, lodges, and conservation projects so that every
							trip supports the communities and ecosystems you come to see.
						</p>
					</div>
				</ParaFade>
			</div>
			<div class="grid grid-cols-2 gap-4 self-start">
				{#each [{ value: '10+', label: 'Years of Experience' }, { value: '500+', label: 'Happy Travellers' }, { value: '4', label: 'Countries Covered' }, { value: '100%', label: 'Tailor-Made Trips' }] as stat (stat.label)}
					<div class="bg-[#f5f3f0] p-6 text-center">
						<p class="font-display text-5xl tracking-wide text-primary">{stat.value}</p>
						<p class="mt-2 text-xs font-semibold uppercase tracking-widest text-gray-500">
							{stat.label}
						</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- WHY US -->
<section class="bg-primary py-20">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="mb-12 text-center">
			<p class="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
				Why Choose Evajo
			</p>
			<HeadlineReveal>
				<h2 class="font-display text-5xl tracking-wide text-white">The Evajo Difference</h2>
			</HeadlineReveal>
		</div>
		<div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
			{#each [{ icon: '🗺️', title: 'Expert Local Guides', body: 'Born and raised across East Africa — they know every trail, watering hole, and hidden gem.' }, { icon: '✏️', title: 'Bespoke Itineraries', body: 'Every trip is tailored to you — your pace, interests, and budget. No two Evajo journeys are the same.' }, { icon: '⭐', title: '10+ Years Experience', body: 'Crafting unforgettable East African adventures since 2014 for clients across the globe.' }, { icon: '🛡️', title: 'Safety First', body: 'From airport transfers to bush camps, we handle every detail so you can focus on the experience.' }] as item (item.title)}
				<div class="border border-white/10 p-6">
					<span class="text-3xl">{item.icon}</span>
					<h3 class="mt-4 font-display text-xl tracking-wide text-white">{item.title}</h3>
					<p class="mt-2 text-sm leading-relaxed text-white/60">{item.body}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<TestimonialsStrip testimonials={data.testimonials} />

<CtaBanner
	heading="Ready to Explore East Africa?"
	subtext="Let us build your perfect trip — tailor-made and expertly guided."
	btnLabel="Start Planning"
	href="/contact"
/>
