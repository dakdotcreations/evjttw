<script lang="ts">
	import {
		Phone,
		MessageCircle,
		MapPin,
		ShieldCheck,
		Users,
		Leaf,
		Compass,
		Star,
		Clock
	} from 'lucide-svelte';
	import { formatPrice } from '$lib/utils/pricing';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const PHONE_PRIMARY = '+256 708 506 649';
	const PHONE_PRIMARY_TEL = 'tel:+256708506649';
	const PHONE_SECONDARY = '+256 780 379 017';
	const PHONE_SECONDARY_TEL = 'tel:+256780379017';
	const WHATSAPP_HREF = 'https://wa.me/256708506649';
	const EMAIL = 'info@evajotoursandtravel.com';

	const faqs = [
		{
			q: 'How physically demanding is gorilla trekking?',
			a: 'Treks range from 1 - 6 hours through forest terrain. Fitness levels vary by park and route. Call us and we\u2019ll match you to a trek suited to your ability.'
		},
		{
			q: "What's the chance of actually seeing gorillas?",
			a: 'Sighting rates are very high across Uganda and Rwanda\u2019s tracked gorilla families. Ask about specific park success rates when you call.'
		},
		{
			q: 'Can I combine gorillas, chimps and the Big 5 in one trip?',
			a: 'Yes - it\u2019s our specialty. Call to build a multi-park itinerary around your dates.'
		},
		{
			q: "What's the best time of year to go?",
			a: 'Trekking runs year-round with drier months easier underfoot. We\u2019ll help you pick dates that fit your schedule when you call.'
		},
		{
			q: 'What does the price include?',
			a: 'Permits, transport, guiding and lodging vary by itinerary. Get an exact, itemized quote on the phone.'
		},
		{
			q: 'Are children and families welcome?',
			a: 'Most national parks set a minimum age of 15 for gorilla permits. Family-friendly itineraries are available - call to discuss options.'
		},
		{
			q: 'Do you arrange group or private treks?',
			a: 'Both. Small shared groups and fully private departures are available - ask about rates for your group size.'
		}
	];
</script>

<svelte:head>
	<title>Gorilla & Big 5 Safari - Call Now | Evajo Tours & Travel</title>
	<meta
		name="description"
		content="Trek mountain gorillas and chimpanzees, then spot the Big 5 on the same journey. Permits are limited - call +256 708 506 649 to book your trek."
	/>
	<meta name="robots" content="noindex, follow" />
</svelte:head>

<!-- Sticky mobile call bar -->
<div
	class="fixed inset-x-0 bottom-0 z-50 flex items-stretch gap-px bg-black/10 lg:hidden"
	style="padding-bottom: env(safe-area-inset-bottom);"
>
	<a
		href={PHONE_PRIMARY_TEL}
		aria-label="Call Evajo Tours {PHONE_PRIMARY}"
		class="flex flex-1 items-center justify-center gap-2 bg-accent py-3.5 text-sm font-bold tracking-wide text-black"
	>
		<Phone size={18} />
		Call Now
	</a>
	<a
		href={WHATSAPP_HREF}
		target="_blank"
		rel="noopener noreferrer"
		aria-label="Chat with Evajo Tours on WhatsApp"
		class="flex flex-1 items-center justify-center gap-2 bg-[#25D366] py-3.5 text-sm font-bold tracking-wide text-white"
	>
		<MessageCircle size={18} />
		WhatsApp
	</a>
</div>

<main class="bg-white pb-20 text-black lg:pb-0">
	<!-- 1. HERO -->
	<section class="relative overflow-hidden bg-primary">
		<img
			src="/images/hero.webp"
			alt=""
			aria-hidden="true"
			fetchpriority="high"
			class="absolute inset-0 h-full w-full object-cover opacity-35"
		/>
		<div class="absolute inset-0 bg-linear-to-t from-primary via-primary/80 to-primary/40"></div>

		<div class="relative mx-auto max-w-4xl px-6 pb-16 pt-28 text-center sm:pt-36">
			<!-- <p
				class="mb-4 inline-block bg-accent/15 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-accent"
			>
				Permits limited - book now
			</p> -->
			<h1 class="font-display text-5xl leading-[1.05] tracking-wide text-white sm:text-7xl">
				Lock Eyes With Mountain Gorillas. Spot the Big 5 on the Same Journey.
			</h1>
			<p class="mx-auto mt-6 max-w-2xl text-lg text-white/70">
				Gorilla and chimpanzee trekking combined with Big 5 safaris across Uganda. Our trek specialists are standing by to check availability for your dates.
			</p>

			<div class="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
				<a
					href={PHONE_PRIMARY_TEL}
					aria-label="Call Evajo Tours now on {PHONE_PRIMARY}"
					class="flex w-full items-center justify-center gap-2 bg-accent px-8 py-4 text-lg font-bold tracking-wide text-black transition-colors hover:bg-accent/85 sm:w-auto"
				>
					<Phone size={20} />
					Call Now: {PHONE_PRIMARY}
				</a>
				<a
					href="#tours"
					class="flex w-full items-center justify-center gap-2 border border-white/40 px-8 py-4 text-sm font-semibold tracking-wide text-white transition-colors hover:border-white/80 hover:bg-white/10 sm:w-auto"
				>
					Or see availability dates
				</a>
			</div>
			<p class="mt-5 text-sm text-white/50">
				Guides standing by 8 AM - 7 PM EAT - call or WhatsApp today
			</p>
		</div>
	</section>

	<!-- 2. WHY CHOOSE EVAJO -->
	<section class="bg-black/3 py-16">
		<div class="mx-auto max-w-6xl px-6">
			<div class="grid gap-6 sm:grid-cols-3">
				<div class="bg-white p-6 text-center shadow-sm">
					<ShieldCheck class="mx-auto mb-3 text-accent" size={28} />
					<p class="font-display text-2xl tracking-wide">Permits Handled</p>
					<p class="mt-1 text-sm text-black/60">
						We secure gorilla and chimp permits directly - no chasing paperwork.
					</p>
				</div>
				<div class="bg-white p-6 text-center shadow-sm">
					<Compass class="mx-auto mb-3 text-accent" size={28} />
					<p class="font-display text-2xl tracking-wide">Primate + Big 5, One Trip</p>
					<p class="mt-1 text-sm text-black/60">
						Itineraries built to combine forest trekking with open-savanna game drives.
					</p>
				</div>
				<div class="bg-white p-6 text-center shadow-sm">
					<Users class="mx-auto mb-3 text-accent" size={28} />
					<p class="font-display text-2xl tracking-wide">Small, Personal Groups</p>
					<p class="mt-1 text-sm text-black/60">
						Private and small-group departures with experienced local guides.
					</p>
				</div>
			</div>

			<div class="mt-10 bg-primary p-8 text-center text-white">
				<p class="text-base">
					Mountain gorilla permits are limited and issued per day. Secure yours with a quick call.
				</p>
				<a
					href={PHONE_PRIMARY_TEL}
					class="mt-5 inline-flex items-center gap-2 bg-accent px-6 py-3 text-sm font-bold tracking-wide text-black hover:bg-accent/85"
				>
					<Phone size={18} />
					Chat With a Trek Specialist: {PHONE_PRIMARY}
				</a>
				<p class="mt-3 text-xs text-white/50">
					Available 8 AM - 7 PM EAT · WhatsApp also available
				</p>
			</div>
		</div>
	</section>

	<!-- 3. FEATURED TOURS -->
	<section id="tours" class="py-16">
		<div class="mx-auto max-w-6xl px-6">
			<h2 class="text-center font-display text-4xl tracking-wide sm:text-5xl">
				Primate & Big 5 Tours
			</h2>
			<p class="mx-auto mt-3 max-w-xl text-center text-sm text-black/60">
				A sample of our most requested combinations. Every itinerary can be adjusted to your
				dates - call to customize.
			</p>

			<div class="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#await data.tours}
					{#each { length: 3 } as _}
						<div class="h-64 animate-pulse border border-black/10 bg-black/5"></div>
					{/each}
				{:then tours}
					{#if tours.length === 0}
						<p class="col-span-full text-center text-sm text-black/50">
							No tours listed for this campaign yet - call us and we'll build one for you: {PHONE_PRIMARY}
						</p>
					{/if}
					{#each tours as tour (tour.id)}
						<div class="flex flex-col border border-black/10 p-4">
							<div class="flex flex-wrap gap-1.5">
								{#each tour.countries as country (country)}
									<span class="bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary"
										>{country}</span>
								{/each}
								{#each tour.tags as tag (tag)}
									<span class="bg-accent/15 px-2 py-0.5 text-xs font-semibold text-accent"
										>{tag}</span>
								{/each}
							</div>
                            <img src={tour.coverImage} alt={tour.title} class="aspect-16/10 object-cover mt-2">
							<h3 class="mt-2 font-display text-2xl leading-tight tracking-wide">{tour.title}</h3>
							<p class="mt-1 flex items-center gap-1 text-xs text-black/50">
								<Clock size={12} />
								{tour.durationDays} Days
							</p>
							<!-- <p class="mt-3 text-sm text-black/60">{formatPrice(tour)}</p> -->

							<div class="mt-auto pt-4">
								<a
									href={PHONE_PRIMARY_TEL}
									class="flex items-center justify-center gap-2 bg-accent px-4 py-2 text-sm font-bold tracking-wide text-black hover:bg-accent/85"
								>
									<Phone size={16} />
									Call to Reserve
								</a>
								<a
									href="/tours/{tour.id}"
									class="mt-2 block text-center text-xs font-medium text-black/50 underline underline-offset-2 hover:text-black"
								>
									View full itinerary
								</a>
							</div>
						</div>
					{/each}
				{:catch}
					<p class="col-span-full text-center text-sm text-black/50">
						Couldn't load tours right now - call us directly: {PHONE_PRIMARY}
					</p>
				{/await}
			</div>
		</div>
	</section>

	<!-- 4. WHAT YOU'LL EXPERIENCE -->
	<section class="bg-black/3 py-16">
		<div class="mx-auto max-w-6xl px-6">
			<h2 class="text-center font-display text-4xl tracking-wide sm:text-5xl">
				What You'll Experience
			</h2>
			<div class="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
				<div class="text-center">
                    <img src="/images/gorilla-trekking-uganda.webp" alt="Gorilla trekking in Uganda" class="aspect-16/10 object-cover w-full">
					<p class="mt-3 font-display text-xl tracking-wide">Mountain Gorillas</p>
					<p class="mt-1 text-sm text-black/60">
						Come face-to-face with endangered mountain gorillas in misty rainforests.
					</p>
				</div>
				<div class="text-center">
					<img src="/images/chimp-tracking.jpg" alt="Gorilla trekking in Uganda" class="aspect-16/10 object-cover w-full">
					<p class="mt-3 font-display text-xl tracking-wide">Chimpanzees</p>
					<p class="mt-1 text-sm text-black/60">
						Track wild chimpanzees through dense forest and observe their family dynamics.
					</p>
				</div>
				<div class="text-center">
					<img src="/images/forest-elephants.jpeg" alt="Gorilla trekking in Uganda" class="aspect-16/10 object-cover w-full">
					<p class="mt-3 font-display text-xl tracking-wide">The Big 5</p>
					<p class="mt-1 text-sm text-black/60">
						Spot Africa's iconic predators and megafauna on open-savanna game drives.
					</p>
				</div>
				<div class="text-center">
					<img src="/images/gorilla-trekking-uganda.webp" alt="Gorilla trekking in Uganda" class="aspect-16/10 object-cover w-full">
					<p class="mt-3 font-display text-xl tracking-wide">Expert Local Guides</p>
					<p class="mt-1 text-sm text-black/60">
						Experienced guides, safety-first protocols and a conservation-first approach.
					</p>
				</div>
			</div>
			<div class="mt-10 text-center">
				<a
					href={PHONE_PRIMARY_TEL}
					class="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-bold tracking-wide text-white hover:bg-primary/90"
				>
					<Phone size={18} />
					Ready to Customize Your Trek? Call: {PHONE_PRIMARY}
				</a>
			</div>
		</div>
	</section>

	<!-- 5. CUSTOM TOUR REQUEST -->
	<section class="py-16">
		<div class="mx-auto max-w-3xl px-6 text-center">
			<h2 class="font-display text-4xl tracking-wide sm:text-5xl">
				Don't See Your Ideal Itinerary? Build Your Own Trek.
			</h2>
			<p class="mt-4 text-black/60">
				No two travelers are the same. Adjust duration, choose destinations across Uganda,
				Rwanda, Tanzania and Kenya, combine primate species, or go fully private - we'll build it
				around you.
			</p>
			<ul class="mx-auto mt-6 grid max-w-md gap-2 text-left text-sm text-black/70">
				<li>✓ Any duration - 5, 7, 10, 14+ days</li>
				<li>✓ Multi-country combinations</li>
				<li>✓ Private or small shared groups</li>
				<li>✓ Family-friendly options</li>
				<li>✓ Budget through luxury lodging</li>
			</ul>
			<a
				href={PHONE_PRIMARY_TEL}
				class="mt-8 inline-flex items-center gap-2 bg-accent px-8 py-4 text-lg font-bold tracking-wide text-black hover:bg-accent/85"
			>
				<Phone size={20} />
				Speak With a Trek Designer: {PHONE_PRIMARY}
			</a>
			<p class="mt-3 text-xs text-black/50">
				A quick call is all it takes to outline your preferences.
			</p>
			<p class="mt-1 text-xs text-black/50">
				Prefer email? <a href="mailto:{EMAIL}" class="underline">{EMAIL}</a> - but calling is
				faster for custom planning.
			</p>
		</div>
	</section>

	<!-- 6. REGIONAL ACCESSIBILITY -->
	<section class="bg-primary py-16 text-white">
		<div class="mx-auto max-w-5xl px-6">
			<h2 class="text-center font-display text-4xl tracking-wide sm:text-5xl">
				Traveling From the US, Canada, Australia or Europe?
			</h2>
			<div class="mt-10 grid gap-6 sm:grid-cols-2">
				<div class="flex items-start gap-3">
					<MapPin class="mt-1 shrink-0 text-accent" size={20} />
					<p class="text-sm text-white/70">
						We arrange everything from your doorstep - flights, transfers and pickups at Entebbe,
						Kigali or Nairobi.
					</p>
				</div>
				<div class="flex items-start gap-3">
					<ShieldCheck class="mt-1 shrink-0 text-accent" size={20} />
					<p class="text-sm text-white/70">
						We secure gorilla and chimp permits and provide visa guidance for your trip.
					</p>
				</div>
				<div class="flex items-start gap-3">
					<Clock class="mt-1 shrink-0 text-accent" size={20} />
					<p class="text-sm text-white/70">
						Trips of 5, 7, 10 or 14+ days, customized to your schedule and time zone.
					</p>
				</div>
				<div class="flex items-start gap-3">
					<Leaf class="mt-1 shrink-0 text-accent" size={20} />
					<p class="text-sm text-white/70">
						Travel insurance and health guidance provided during your phone consultation.
					</p>
				</div>
			</div>
			<div class="mt-10 text-center">
				<a
					href={PHONE_PRIMARY_TEL}
					class="inline-flex items-center gap-2 bg-accent px-6 py-3 text-sm font-bold tracking-wide text-black hover:bg-accent/85"
				>
					<Phone size={18} />
					Free Logistics Consultation: {PHONE_PRIMARY}
				</a>
			</div>
		</div>
	</section>

	<!-- 7. FAQ -->
	<section class="py-16">
		<div class="mx-auto max-w-3xl px-6">
			<h2 class="text-center font-display text-4xl tracking-wide sm:text-5xl">
				Frequently Asked Questions
			</h2>
			<div class="mt-8 divide-y divide-black/10 border-y border-black/10">
				{#each faqs as item (item.q)}
					<details class="group py-4">
						<summary
							class="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold marker:content-none"
						>
							{item.q}
							<span class="shrink-0 text-accent transition-transform group-open:rotate-45">+</span>
						</summary>
						<p class="mt-2 text-sm text-black/60">{item.a}</p>
					</details>
				{/each}
			</div>
			<div class="mt-8 text-center">
				<a
					href={PHONE_PRIMARY_TEL}
					class="inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-bold tracking-wide text-white hover:bg-primary/90"
				>
					<Phone size={18} />
					Can't Find Your Answer? Call: {PHONE_PRIMARY}
				</a>
			</div>
		</div>
	</section>

	<!-- 8. CONSERVATION -->
	<section class="bg-black/3 py-16">
		<div class="mx-auto max-w-3xl px-6 text-center">
			<Leaf class="mx-auto mb-3 text-accent" size={28} />
			<h2 class="font-display text-4xl tracking-wide sm:text-5xl">Your Trek Supports Conservation</h2>
			<p class="mt-4 text-black/60">
				Gorilla and chimp trekking permits directly fund habitat protection and community
				conservation programs across the parks we visit.
			</p>
			<a
				href={PHONE_PRIMARY_TEL}
				class="mt-6 inline-flex items-center gap-2 bg-accent px-6 py-3 text-sm font-bold tracking-wide text-black hover:bg-accent/85"
			>
				<Phone size={18} />
				Ask About Our Conservation Impact: {PHONE_PRIMARY}
			</a>
		</div>
	</section>

	<!-- 9. FINAL CTA -->
	<section class="bg-primary py-20 text-white">
		<div class="mx-auto max-w-3xl px-6 text-center">
			<Star class="mx-auto mb-3 text-accent" size={24} />
			<h2 class="font-display text-5xl tracking-wide sm:text-6xl">
				Your Gorilla & Big 5 Adventure Awaits
			</h2>
			<p class="mt-4 text-white/70">
				Mountain gorilla permits are limited and go fast in peak season. Secure your spot this
				week.
			</p>

			<div class="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
				<a
					href={PHONE_PRIMARY_TEL}
					aria-label="Call Evajo Tours now on {PHONE_PRIMARY}"
					class="flex w-full items-center justify-center gap-2 bg-accent px-8 py-4 text-lg font-bold tracking-wide text-black hover:bg-accent/85 sm:w-auto"
				>
					<Phone size={20} />
					Call Now: {PHONE_PRIMARY}
				</a>
				<a
					href={WHATSAPP_HREF}
					target="_blank"
					rel="noopener noreferrer"
					class="flex w-full items-center justify-center gap-2 border border-white/40 px-8 py-4 text-sm font-semibold tracking-wide text-white hover:border-white/80 hover:bg-white/10 sm:w-auto"
				>
					<MessageCircle size={18} />
					WhatsApp Quick Questions
				</a>
			</div>

			<div class="mt-10 space-y-1 text-sm text-white/50">
				<p>
					Phone: <a href={PHONE_PRIMARY_TEL} class="underline">{PHONE_PRIMARY}</a> ·
					<a href={PHONE_SECONDARY_TEL} class="underline">{PHONE_SECONDARY}</a>
				</p>
				<p>Email: <a href="mailto:{EMAIL}" class="underline">{EMAIL}</a></p>
				<p>Hours: 9 AM–6 PM EAT, 7 days a week</p>
				<p class="pt-2 text-xs text-white/40">
					Can't reach us? Email your details and we'll call you back within 2 hours.
				</p>
			</div>
		</div>
	</section>
</main>
