<script lang="ts">
	import { onMount } from "svelte"
	import { loadGsap } from "$lib/utils/useGsap"
	import TourCard from "$lib/components/TourCard.svelte"
	import DestinationCard from "$lib/components/DestinationCard.svelte"
	import HeadlineReveal from "$lib/components/HeadlineReveal.svelte"
	import TestimonialsStrip from "$lib/components/TestimonialsStrip.svelte"
	import CtaBanner from "$lib/components/CtaBanner.svelte"
	import Btn from "$lib/components/ui/Btn.svelte"
	import type { PageData } from "./$types"

	let { data }: { data: PageData } = $props()

	let heroTagline: HTMLElement
	let heroHeadEl: HTMLElement
	let heroPills: HTMLElement = $state() as HTMLElement
	let heroCtas: HTMLElement = $state() as HTMLElement

	onMount(async () => {
		const { gsap } = await loadGsap()
		const tl = gsap.timeline({ defaults: { ease: "power3.out" } })
		tl.from(heroTagline, { opacity: 0, y: 10, duration: 0.5, delay: 0.3 })
			.from(
				heroHeadEl.querySelectorAll(".hero-word"),
				{ y: "110%", duration: 0.75, stagger: 0.08 },
				"-=0.1",
			)
			.from(heroPills?.children, { opacity: 0, y: 12, stagger: 0.06, duration: 0.4 }, "-=0.2")
			.from(
				heroCtas?.children,
				{ opacity: 0, scale: 0.92, stagger: 0.08, duration: 0.4 },
				"-=0.15",
			)
	})

	let statsEl: HTMLElement

	onMount(() => {
		let animated = false
		const observer = new IntersectionObserver(
			async ([entry]) => {
				if (!entry.isIntersecting || animated) return
				animated = true
				observer.disconnect()
				const { gsap } = await loadGsap()
				statsEl.querySelectorAll("[data-count]").forEach((el) => {
					const target = parseInt((el as HTMLElement).dataset.count ?? "0")
					const suffix = (el as HTMLElement).dataset.suffix ?? ""
					const obj = { val: 0 }
					gsap.to(obj, {
						val: target,
						duration: 1.2,
						ease: "power2.out",
						onUpdate: () => {
							el.textContent = Math.round(obj.val) + suffix
						},
					})
				})
			},
			{ threshold: 0.5 },
		)
		if (statsEl) observer.observe(statsEl)
		return () => observer.disconnect()
	})

	let featureSections: HTMLElement[] = $state([])

	onMount(() => {
		const observers: IntersectionObserver[] = []
		featureSections.forEach((section, i) => {
			if (!section) return
			const isReverse = i % 2 !== 0
			const mediaEl = section.querySelector<HTMLElement>(".feature-media")
			const textEl = section.querySelector<HTMLElement>(".feature-text")
			if (!mediaEl || !textEl) return
			const obs = new IntersectionObserver(
				async ([entry]) => {
					if (!entry.isIntersecting) return
					obs.disconnect()
					const { gsap } = await loadGsap()
					gsap.from(mediaEl, {
						x: isReverse ? 40 : -40,
						opacity: 0,
						duration: 0.8,
						ease: "power3.out",
					})
					gsap.from(textEl, {
						opacity: 0,
						y: 24,
						duration: 0.7,
						ease: "power2.out",
						delay: 0.1,
					})
				},
				{ threshold: 0.15 },
			)
			obs.observe(section)
			observers.push(obs)
		})
		return () => observers.forEach((o) => o.disconnect())
	})

	const heroBgImage = $derived(data.countries[0]?.imageUrl ?? null)
</script>

<svelte:head>
	<title>Evajo Tours & Travel — East Africa Safaris & Adventures</title>
	<meta
		name="description"
		content="Experience safaris, mountain trekking and water adventures across Uganda, Kenya, Tanzania and Rwanda with Evajo Tours & Travel." />
</svelte:head>

<!-- HERO -->
<section class="relative flex min-h-svh items-center justify-center">
	<div class="absolute inset-0 overflow-hidden">
		{#if heroBgImage}
			<img
				data-speed="0.4"
				src={heroBgImage}
				alt=""
				aria-hidden="true"
				class="absolute inset-0 h-full w-full scale-110 object-cover" />
		{:else}
			<div class="absolute inset-0 bg-primary"></div>
		{/if}
		<div class="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70"></div>
	</div>
	<div class="relative z-10 mx-auto max-w-5xl px-6 pt-28 text-center">
		<p
			bind:this={heroTagline}
			class="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent">
			Uganda · Kenya · Tanzania · Rwanda
		</p>
		<div bind:this={heroHeadEl} class="overflow-hidden">
			<h1
				class="font-display text-[clamp(3.5rem,9vw,8rem)] leading-[0.95] tracking-wide text-white">
				{#each "Where the Wild Calls You".split(" ") as word, i (i)}
					<span class="hero-word mr-[0.18em] inline-block last:mr-0">{word}</span>
				{/each}
			</h1>
		</div>
		{#if data.tags.length > 0}
			<div bind:this={heroPills} class="mt-8 flex flex-wrap justify-center gap-2">
				{#each data.tags as tag (tag.id)}
					<a
						href="/tours?tag={tag.slug}"
						class="border border-white/30 px-4 py-1.5 text-xs font-semibold tracking-wide text-white/80 backdrop-blur-sm transition-all duration-200 hover:border-accent hover:bg-accent hover:text-black"
						>{tag.name}</a>
				{/each}
			</div>
		{/if}
		<div bind:this={heroCtas} class="mt-10 flex flex-wrap justify-center gap-4">
			<Btn href="/tours" variant="primary" size="lg">Explore Tours</Btn>
			<Btn href="/contact" variant="outline" size="lg">Plan My Trip</Btn>
		</div>
	</div>
	<div class="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
		<div class="h-10 w-px bg-white/30"></div>
	</div>
</section>

<!-- TRUST BAR -->
<section bind:this={statsEl} class="bg-[#231000] py-12">
	<div class="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-6 sm:grid-cols-4">
		{#each [{ count: 10, suffix: "+", label: "Years Experience" }, { count: 500, suffix: "+", label: "Travellers" }, { count: 4, suffix: "", label: "Countries" }, { count: 100, suffix: "%", label: "Tailored" }] as stat, i (i)}
			<div class="text-center">
				<p class="font-display text-5xl tracking-wide text-accent">
					<span data-count={stat.count} data-suffix={stat.suffix}
						>{stat.count}{stat.suffix}</span>
				</p>
				<p class="mt-1 text-xs font-semibold uppercase tracking-widest text-white/50">
					{stat.label}
				</p>
			</div>
		{/each}
	</div>
</section>

<!-- FEATURED SECTIONS -->
{#each data.features as feature, i (feature.id)}
	{@const isReverse = i % 2 !== 0}
	{@const subject = feature.country ?? feature.location}
	{@const featureTours = feature.items
		.map((item) => data.featuredTours.find((t) => t.id === item.itinerary.id))
		.filter(Boolean)}
	{#if subject && featureTours.length > 0}
		<section
			bind:this={featureSections[i]}
			class="flex flex-col overflow-hidden {isReverse
				? 'md:flex-row-reverse'
				: 'md:flex-row'}">
			<div
				class="feature-media relative min-h-72 w-full overflow-hidden bg-gray-100 md:w-1/2">
				{#if subject.videoUrl}
					<video
						src={subject.videoUrl}
						autoplay
						muted
						loop
						playsinline
						class="h-full w-full object-cover"></video>
				{:else if subject.imageUrl}
					<img
						src={subject.imageUrl}
						alt={subject.name}
						class="h-full w-full object-cover" />
				{/if}
				<div class="absolute inset-0 bg-black/20"></div>
			</div>
			<div
				class="feature-text flex w-full flex-col justify-center bg-white px-8 py-14 md:w-1/2 lg:px-16 lg:py-20">
				<p class="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
					{feature.country ? "Destination" : "Location"}
				</p>
				<h2 class="mb-1 font-display text-5xl tracking-wide text-black">
					{feature.displayName ?? subject.name}
				</h2>
				<p class="mb-8 text-sm text-gray-500">{subject.name}</p>
				<div class="grid grid-cols-2 gap-4">
					{#each featureTours.slice(0, 4) as tour}
						{#if tour}
							<TourCard
								id={tour.id}
								title={tour.title}
								coverImage={tour.coverImage}
								durationDays={tour.durationDays}
								fixedPrice={tour.fixedPrice}
								pricePerPerson={tour.pricePerPerson}
								currency={tour.currency}
								countries={tour.countries}
								tags={tour.tags} />
						{/if}
					{/each}
				</div>
				<div class="mt-6">
					<a
						href="/tours"
						class="text-sm font-semibold text-primary underline-offset-2 hover:underline"
						>View all tours →</a>
				</div>
			</div>
		</section>
	{/if}
{/each}

<!-- FALLBACK: no features configured -->
{#if data.features.length === 0 && data.featuredTours.length > 0}
	<section class="bg-white py-20">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<div class="mb-12 flex items-end justify-between">
				<div>
					<p class="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
						Handpicked for You
					</p>
					<HeadlineReveal
						><h2 class="font-display text-5xl tracking-wide text-black">
							Featured Tours
						</h2></HeadlineReveal>
				</div>
				<a
					href="/tours"
					class="text-sm font-semibold text-primary underline-offset-2 hover:underline"
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
						tags={tour.tags} />
				{/each}
			</div>
		</div>
	</section>
{/if}

<!-- DESTINATIONS GRID -->
{#if data.countries.length > 0}
	<section class="bg-[#f5f3f0] py-20">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<div class="mb-12 flex items-end justify-between">
				<div>
					<p class="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
						Where We Go
					</p>
					<HeadlineReveal
						><h2 class="font-display text-5xl tracking-wide text-black">
							Our Destinations
						</h2></HeadlineReveal>
				</div>
				<a
					href="/destinations"
					class="text-sm font-semibold text-primary underline-offset-2 hover:underline"
					>View all →</a>
			</div>
			<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
				{#each data.countries as country (country.id)}
					<DestinationCard
						code={country.code}
						name={country.name}
						flagEmoji={country.flagEmoji}
						imageUrl={country.imageUrl}
						tourCount={0} />
				{/each}
			</div>
		</div>
	</section>
{/if}

<TestimonialsStrip testimonials={data.testimonials} />

<CtaBanner
	heading="Ready to Answer the Call?"
	subtext="Tell us your dream — we'll plan every detail from flights to campfires."
	btnLabel="Plan My Trip"
	href="/contact" />
