<script lang="ts">
	import { onMount } from "svelte"
	import { loadGsap } from "$lib/utils/useGsap"
	import { page } from "$app/state"
	import { defaults } from "sveltekit-superforms"
	import { zod4 } from "sveltekit-superforms/adapters"
	import type { PageData } from "./$types"
	import BookingEnquiryForm from "$lib/components/BookingEnquiryForm.svelte"
	import TourCard from "$lib/components/TourCard.svelte"
	import CtaBanner from "$lib/components/CtaBanner.svelte"
	import { formatPrice } from "$lib/utils/pricing"
	import { buildStepLabels } from "$lib/utils/stepLabel"
	import { tourStore } from "$lib/stores/tours.svelte"
	import { bookingEnquirySchema } from "$lib/schemas/bookingEnquiry"
	import { MapPin, Clock, Tag, CheckCircle2, XCircle, Gift, ChevronDown, ChevronUp } from "lucide-svelte"

	let { data }: { data: PageData } = $props()

	const tourId = $derived(page.params.id ?? '')

	// Seed store from SSR data on first hydration
	onMount(() => {
		if (data.itinerary && tourStore.detailStatus[tourId] !== 'loaded') {
			tourStore.seedDetail(tourId, {
				itinerary: data.itinerary,
				countries: data.countries ?? [],
				related: data.related ?? [],
			})
		}
	})

	// Source of truth: store when loaded, SSR data as fallback
	const entry = $derived(tourStore.details[tourId])
	const itinerary = $derived(entry?.itinerary ?? data.itinerary)
	const countries = $derived(entry?.countries ?? data.countries ?? [])
	const related = $derived(entry?.related ?? data.related ?? [])
	const isLoading = $derived(!itinerary)

	const price = $derived(
		itinerary
			? formatPrice({
					fixedPrice: itinerary.fixedPrice,
					pricePerPerson: itinerary.pricePerPerson,
					currency: itinerary.currency,
					pricingDisabled: itinerary.pricingDisabled,
				})
			: "",
	)

	const stepLabels = $derived(itinerary ? buildStepLabels(itinerary.steps) : [])

	type Faq = { question: string; answer: string }
	const faqs = $derived(
		itinerary && Array.isArray(itinerary.faqs)
			? (itinerary.faqs as unknown as Faq[])
			: []
	)
	let openFaq = $state<number | null>(null)
	function toggleFaq(i: number) { openFaq = openFaq === i ? null : i }

	// Client-side superforms initialisation — form actions still POST to the server
	const enquiryForm = defaults(zod4(bookingEnquirySchema))

	let heroEl: HTMLElement | undefined = $state()
	let stepsListEl: HTMLElement = $state(null as unknown as HTMLElement)
	let railEl: HTMLElement = $state(null as unknown as HTMLElement)
	let blobEl: HTMLElement = $state(null as unknown as HTMLElement)

	onMount(async () => {
		const { gsap, ScrollTrigger } = await loadGsap()

		if (!heroEl) return

		// Hero entrance
		gsap.from(heroEl.querySelectorAll(".hero-in"), {
			opacity: 0,
			y: 24,
			stagger: 0.12,
			duration: 0.8,
			ease: "power3.out",
			delay: 0.25,
		})

		if (!stepsListEl || !blobEl) return

		const stepItems = [...stepsListEl.querySelectorAll<HTMLElement>(".step-item")]
		const stepDots = [...stepsListEl.querySelectorAll<HTMLElement>(".step-dot")]

		if (!stepItems.length) return

		// Initial states
		stepItems.forEach((item) => {
			gsap.set(item, { opacity: 0.35 })
			gsap.set(item.querySelectorAll(".step-img"), { filter: "grayscale(1) brightness(0.85)" })
		})

		// Place blob at first dot
		const firstDot = stepDots[0]
		if (firstDot) {
			gsap.set(blobEl, { top: firstDot.offsetTop + firstDot.offsetHeight / 2 })
		}

		// Entrance animation for each step
		stepItems.forEach((item) => {
			gsap.from(item, {
				opacity: 0,
				x: -24,
				duration: 0.6,
				ease: "power2.out",
				scrollTrigger: { trigger: item, start: "top 80%", once: true },
			})
		})

		// Active step focus: blob moves + grayscale lifts
		stepItems.forEach((item, i) => {
			const dot = stepDots[i]

			ScrollTrigger.create({
				trigger: item,
				start: "top 45%",
				end: "bottom 45%",
				onEnter: () => activate(i),
				onEnterBack: () => activate(i),
			})

			function activate(idx: number) {
				// Move blob to this dot
				if (dot) {
					gsap.to(blobEl, {
						top: dot.offsetTop + dot.offsetHeight / 2,
						duration: 0.55,
						ease: "power3.out",
					})
				}

				// Dim all, focus active
				stepItems.forEach((el, j) => {
					gsap.to(el, { opacity: j === idx ? 1 : 0.35, duration: 0.4 })
					gsap.to(el.querySelectorAll(".step-img"), {
						filter: j === idx ? "grayscale(0) brightness(1)" : "grayscale(1) brightness(0.85)",
						duration: 0.6,
						ease: "power2.out",
					})
					stepDots[j]?.classList.toggle("is-active", j === idx)
				})
			}
		})
	})
</script>

<svelte:head>
	<title>{itinerary ? `${itinerary.title} — Evajo Tours & Travel` : 'Loading… — Evajo Tours & Travel'}</title>
	<meta name="description" content={itinerary?.summary ?? ""} />
</svelte:head>

{#if isLoading}
	<!-- Detail loading skeleton (client-side navigation, store not yet populated) -->
	<div class="animate-pulse">
		<div class="bg-primary" style="min-height:65vh;"></div>
		<div class="mx-auto max-w-5xl px-6 py-14 lg:px-8 space-y-4">
			<div class="h-6 w-2/3 rounded bg-gray-100"></div>
			<div class="h-4 w-full rounded bg-gray-100"></div>
			<div class="h-4 w-5/6 rounded bg-gray-100"></div>
		</div>
	</div>
{:else if itinerary}

<!-- HERO -->
<div
	bind:this={heroEl}
	class="relative flex items-end overflow-hidden bg-primary"
	style="min-height:65vh;">
	{#if itinerary.coverImage}
		<img
			data-speed="0.5"
			src={itinerary.coverImage}
			alt={itinerary.title}
			class="absolute inset-0 h-full w-full scale-110 object-cover" />
	{/if}
	<div class="absolute inset-0 bg-linear-to-t from-black/85 via-black/30 to-black/10"></div>
	<div class="relative z-10 w-full pb-12 pt-28">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			{#if itinerary.tags.length > 0}
				<div class="hero-in mb-4 flex flex-wrap gap-2">
					{#each itinerary.tags as tag (tag.slug)}
						<a
							href="/tours?tag={tag.slug}"
							class="flex items-center gap-1 border border-accent/60 px-3 py-1 text-xs font-semibold text-accent hover:bg-accent hover:text-black transition-colors">
							<Tag size={10} />{tag.name}
						</a>
					{/each}
				</div>
			{/if}
			<h1
				class="hero-in font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-wide text-white">
				{itinerary.title}
			</h1>
			<div class="hero-in mt-4 flex flex-wrap items-center gap-4 text-sm text-white/70">
				<span class="flex items-center gap-1.5"
					><Clock size={14} />{itinerary.durationDays}
					{itinerary.durationDays === 1 ? "day" : "days"}</span>
				{#if countries.length > 0}
					<span class="flex items-center gap-1.5"
						><MapPin size={14} />{countries.join(", ")}</span>
				{/if}
				<span class="font-semibold text-accent">{price}</span>
			</div>
			<div class="hero-in mt-6">
				<a
					href="#enquiry"
					class="inline-block bg-accent px-8 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-accent/85"
					>Book This Tour</a>
			</div>
		</div>
	</div>
</div>

<!-- MAIN CONTENT -->
<div class="bg-white">
	<div class="mx-auto max-w-7xl px-6 py-14 lg:px-8">
		<div class="grid gap-12 lg:grid-cols-[1fr_360px]">
			<!-- Left column -->
			<div>
				{#if itinerary.summary}
					<p class="mb-6 text-lg leading-relaxed text-gray-700">
						{itinerary.summary}
					</p>
				{/if}
				{#if itinerary.description}
					<p class="mb-10 whitespace-pre-line text-sm leading-relaxed text-gray-600">
						{itinerary.description}
					</p>
				{/if}

			<!-- DAY-BY-DAY -->
				{#if itinerary.steps.length > 0}
					<h2 class="mb-10 font-display text-3xl tracking-wide text-black">Day-by-Day</h2>

					<div class="relative mb-16 flex gap-6">
						<!-- Scroll rail (desktop) -->
						<div bind:this={railEl} class="relative hidden w-5 shrink-0 lg:block">
							<!-- track line -->
							<div class="absolute left-1/2 top-0 h-full w-px -translate-x-1/2 bg-accent/20"></div>
							<!-- moving blob -->
							<div
								bind:this={blobEl}
								class="absolute left-1/2 z-10 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent shadow-[0_0_0_4px_rgb(var(--color-accent)/0.2),0_0_14px_4px_rgb(var(--color-accent)/0.35)]">
							</div>
						</div>

						<!-- Steps list -->
						<div bind:this={stepsListEl} class="min-w-0 flex-1 space-y-14">
							{#each itinerary.steps as step, i (step.id)}
								<div class="step-item">
									<!-- dot (mobile) + label row -->
									<div class="mb-3 flex items-center gap-3">
										<div
											class="step-dot h-2.5 w-2.5 shrink-0 rounded-full border-2 border-accent bg-white transition-all duration-300 lg:hidden [&.is-active]:bg-accent [&.is-active]:shadow-[0_0_8px_2px_rgb(var(--color-accent)/0.4)]">
										</div>
										<span
											class="text-xs font-semibold uppercase tracking-widest text-accent">
											{stepLabels[i].days}{stepLabels[i].hours
												? ` · ${stepLabels[i].hours}`
												: ""}
										</span>
									</div>

									<h3 class="mb-1 font-semibold text-black">
										{step.title}
										{#if step.location}
											<span class="ml-2 text-xs font-normal text-gray-400">
												· {step.location.name}
											</span>
										{/if}
									</h3>

									{#if step.description}
										<p class="mt-2 text-sm leading-relaxed text-gray-600">
											{step.description}
										</p>
									{/if}

									{#if step.highlight}
										<p
											class="mt-3 border-l-2 border-accent pl-3 text-xs font-medium text-primary">
											{step.highlight}
										</p>
									{/if}

									{#if step.images && step.images.length > 0}
										<div
											class="mt-4 grid gap-2 {step.images.length === 1
												? 'grid-cols-1'
												: 'grid-cols-2'}">
											{#each step.images as img (img)}
												<img
													src={img}
													alt={step.title}
													loading="lazy"
													class="step-img w-full rounded object-cover transition-[filter] duration-500 {step.images
														.length === 1
														? 'aspect-video'
														: 'aspect-4/3'}" />
											{/each}
										</div>
									{/if}
								</div>
							{/each}
						</div>
					</div>
				{/if}

				<!-- GALLERY -->
				{#if itinerary.images && itinerary.images.length > 0}
					<h2 class="mb-6 font-display text-3xl tracking-wide text-black">Gallery</h2>
					<div class="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-3">
						{#each itinerary.images as img (img)}
							<img
								src={img}
								alt=""
								loading="lazy"
									class="aspect-4/3 w-full object-cover" />
						{/each}
					</div>
				{/if}

				<!-- INCLUDES / EXCLUDES / COMPLEMENTARIES -->
				{#if itinerary.includes.length > 0 || itinerary.excludes.length > 0 || itinerary.complementaries.length > 0}
					<div class="mb-12">
						<h2 class="mb-6 font-display text-3xl tracking-wide text-black">What's Included</h2>
						<div class="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
							{#if itinerary.includes.length > 0}
								<div>
									<p class="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-accent">
										<CheckCircle2 size={14} /> Included
									</p>
									<ul class="space-y-2">
										{#each itinerary.includes as item}
											<li class="flex items-start gap-2 text-sm text-gray-700">
												<CheckCircle2 size={15} class="mt-0.5 shrink-0 text-green-500" />
												{item}
											</li>
										{/each}
									</ul>
								</div>
							{/if}
							{#if itinerary.excludes.length > 0}
								<div>
									<p class="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-gray-500">
										<XCircle size={14} /> Not Included
									</p>
									<ul class="space-y-2">
										{#each itinerary.excludes as item}
											<li class="flex items-start gap-2 text-sm text-gray-600">
												<XCircle size={15} class="mt-0.5 shrink-0 text-red-400" />
												{item}
											</li>
										{/each}
									</ul>
								</div>
							{/if}
							{#if itinerary.complementaries.length > 0}
								<div>
									<p class="mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-widest text-primary">
										<Gift size={14} /> Complimentaries
									</p>
									<ul class="space-y-2">
										{#each itinerary.complementaries as item}
											<li class="flex items-start gap-2 text-sm text-gray-700">
												<Gift size={15} class="mt-0.5 shrink-0 text-primary" />
												{item}
											</li>
										{/each}
									</ul>
								</div>
							{/if}
						</div>
					</div>
				{/if}

				<!-- PICKUP INFO -->
				{#if itinerary.pickup || itinerary.meetingPoint}
					<div class="mb-12 flex flex-wrap gap-6 rounded bg-[#f8f7f5] p-5 text-sm">
						{#if itinerary.pickup}
							<div class="flex items-start gap-2">
								<MapPin size={15} class="mt-0.5 shrink-0 text-accent" />
								<div>
									<p class="font-semibold text-black">Departure & Return</p>
									<p class="text-gray-600">{itinerary.pickup}</p>
								</div>
							</div>
						{/if}
						{#if itinerary.meetingPoint}
							<div class="flex items-start gap-2">
								<MapPin size={15} class="mt-0.5 shrink-0 text-primary" />
								<div>
									<p class="font-semibold text-black">Meeting Point</p>
									<p class="text-gray-600">{itinerary.meetingPoint}</p>
								</div>
							</div>
						{/if}
					</div>
				{/if}

				<!-- FAQs -->
				{#if faqs.length > 0}
					<div class="mb-12">
						<h2 class="mb-6 font-display text-3xl tracking-wide text-black">
							Frequently Asked Questions
						</h2>
						<dl class="divide-y divide-black/10">
							{#each faqs as faq, i}
								<div class="py-4">
									<button
										type="button"
										class="flex w-full items-start justify-between gap-4 text-left"
										onclick={() => toggleFaq(i)}
									>
										<dt class="text-sm font-semibold text-black">{faq.question}</dt>
										<span class="mt-0.5 shrink-0 text-gray-400">
											{#if openFaq === i}
												<ChevronUp size={16} />
											{:else}
												<ChevronDown size={16} />
											{/if}
										</span>
									</button>
									{#if openFaq === i}
										<dd class="mt-3 text-sm leading-relaxed text-gray-600 whitespace-pre-line">
											{faq.answer}
										</dd>
									{/if}
								</div>
							{/each}
						</dl>
					</div>
				{/if}
			</div>

			<!-- Right column: booking form -->
			<div>
				<div id="enquiry" class="sticky top-28 border border-black/10 bg-[#f8f7f5] p-6">
					<p class="mb-1 text-xs font-semibold uppercase tracking-widest text-accent">
						Reserve Your Spot
					</p>
					<h3 class="mb-1 font-display text-2xl tracking-wide text-black">
						Book This Tour
					</h3>
					<p class="mb-6 text-sm text-gray-500">
						Fill in your details and we'll get back to you within 24 hours.
					</p>
					<BookingEnquiryForm formData={enquiryForm} />
				</div>
			</div>
		</div>
		<!-- /grid -->
	</div>
</div>

<!-- RELATED TOURS -->
{#if related.length > 0}
	<section class="bg-[#f5f3f0] py-16">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<div class="mb-10">
				<p class="mb-1 text-xs font-semibold uppercase tracking-widest text-accent">
					You May Also Like
				</p>
				<h2 class="font-display text-4xl tracking-wide text-black">Related Tours</h2>
			</div>
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
				{#each related as tour (tour.id)}
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
						tags={tour.tags} />
				{/each}
			</div>
		</div>
	</section>
{/if}

<CtaBanner
	heading="Questions About This Tour?"
	subtext="Our team is here to help you plan every detail."
	btnLabel="Contact Us"
	href="/contact" />

{/if}
