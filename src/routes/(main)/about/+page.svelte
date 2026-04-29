<script lang="ts">
	import type { PageData } from './$types';
	import TestimonialsStrip from '$lib/components/TestimonialsStrip.svelte';
	import CtaBanner from '$lib/components/CtaBanner.svelte';
	import HeadlineReveal from '$lib/components/HeadlineReveal.svelte';
	import ParaFade from '$lib/components/ParaFade.svelte';
	import {
		Map,
		PenLine,
		Award,
		ShieldCheck,
		Banknote,
		Globe,
		Compass,
		Check,
		X,
		CalendarX2,
		Info,
		Sliders
	} from 'lucide-svelte';

	let { data }: { data: PageData } = $props();

	const whyUs = [
		{
			icon: Map,
			title: 'Expert Local Guides',
			body: 'Born and raised across East Africa - they know every trail, watering hole, and hidden gem.'
		},
		{
			icon: PenLine,
			title: 'Bespoke Itineraries',
			body: 'Every trip is tailored to you - your pace, interests, and budget. No two Evajo journeys are the same.'
		},
		{
			icon: Award,
			title: '10+ Years Experience',
			body: 'Crafting unforgettable East African adventures since 2014 for clients across the globe.'
		},
		{
			icon: ShieldCheck,
			title: 'Safety First',
			body: 'From airport transfers to bush camps, we handle every detail so you can focus on the experience.'
		}
	];

	const cancellationPolicy = [
		{ label: '30+ days before departure', refund: '100% of deposit refunded' },
		{ label: '15–29 days before departure', refund: '50% of deposit refunded' },
		{ label: '7–15 days before departure', refund: '25% of deposit refunded' },
		{ label: 'Less than 7 days', refund: 'Non-refundable' }
	];
</script>

<svelte:head>
	<title>About Us - Evajo Tours & Travel</title>
	<meta
		name="description"
		content="Learn about Evajo Tours & Travel - East Africa's dedicated safari and adventure specialists since 2014, official partner of the African Conservation Foundation."
	/>
</svelte:head>

<!-- HERO -->
<section class="relative overflow-hidden bg-primary pb-20 pt-36">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<HeadlineReveal>
			<h1 class="font-display text-[clamp(3rem,7vw,6rem)] leading-none tracking-wide text-white">
				Born in East Africa. <br>Built for Explorers.
			</h1>
		</HeadlineReveal>
		<ParaFade delay={0.3}>
			<p class="mt-6 max-w-2xl text-base leading-relaxed text-white/60">
				Evajo Tours &amp; Travel is East Africa's premier tour operator and official partner of the
				African Conservation Foundation crafting extraordinary safari, trekking &amp; wildlife
				adventures, and giving back to the ecosystems you come to explore.
			</p>
		</ParaFade>
	</div>
</section>

<!-- WHO WE ARE -->
<section class="bg-white py-20">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
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
							Do you want to explore Uganda? You are right with us! Enjoy remarkable tours all over
							the Pearl of Africa. From wildlife safaris, conservation safaris and outdoor adventures
							to community-based cultural experiences and city tours.
						</p>
						<p>
							We work directly with local guides, lodges, and conservation projects so that every
							trip supports the communities and ecosystems you come to see. Find all our tour
							packages on <a href="https://www.evajotours.com" target="_blank" rel="noopener noreferrer" class="font-medium text-primary hover:underline">evajotours.com</a> or through our partner
							<a href="https://www.africanconservation.org" target="_blank" rel="noopener noreferrer" class="font-medium text-primary hover:underline">africanconservation.org</a>.
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
			{#each whyUs as item (item.title)}
				<div class="border border-white/10 p-6 hover:-translate-y-4 transition-transform duration-300">
					<item.icon size={28} class="text-accent" />
					<h3 class="mt-4 font-display text-xl tracking-wide text-white">{item.title}</h3>
					<p class="mt-2 text-sm leading-relaxed text-white/60">{item.body}</p>
				</div>
			{/each}
		</div>
	</div>
</section>

<!-- CUSTOMIZE YOUR SAFARI -->
<section class="bg-[#f5f3f0] py-20">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="grid gap-12 lg:grid-cols-2 lg:gap-16 lg:items-center">
			<div>
				<p class="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">Tailor-Made Travel</p>
				<HeadlineReveal>
					<h2 class="mb-6 font-display text-4xl tracking-wide text-black">
						Customize Your Safari Adventure
					</h2>
				</HeadlineReveal>
				<ParaFade>
					<div class="space-y-4 text-sm leading-relaxed text-gray-600">
						<p>
							Create with us your tailor-made travel experience and design your tour according to
							your individual needs. We'll offer you the experience you are looking for a trip
							that fits perfectly with your requirements.
						</p>
						<p>
							Our goal is to make you happy with an adventure of a lifetime.
						</p>
					</div>
				</ParaFade>
				<a
					href="/contact"
					class="mt-8 inline-flex items-center gap-2 bg-primary px-6 py-3 text-sm font-semibold text-white transition-opacity hover:opacity-90"
				>
					<Sliders size={16} />
					Design Your Trip
				</a>
			</div>
			<div class="space-y-4">
				{#each [
					{ icon: Compass, text: 'Book one of our most loved safari adventures' },
					{ icon: Globe, text: 'Explore Uganda, Kenya, Tanzania, Rwanda & more' },
					{ icon: PenLine, text: 'Design a fully customized journey around your schedule' },
					{ icon: ShieldCheck, text: 'We handle every detail - you focus on the experience' }
				] as item (item.text)}
					<div class="flex items-start gap-4 bg-white p-5">
						<item.icon size={20} class="mt-0.5 shrink-0 text-accent" />
						<p class="text-sm leading-relaxed text-gray-700">{item.text}</p>
					</div>
				{/each}
			</div>
		</div>
	</div>
</section>

<!-- RESERVATION & PAYMENTS -->
<section class="bg-white py-20">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<p class="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">How It Works</p>
		<HeadlineReveal>
			<h2 class="mb-10 font-display text-4xl tracking-wide text-black">
				Reservation &amp; Payments
			</h2>
		</HeadlineReveal>
		<div class="grid gap-8 lg:grid-cols-2 lg:gap-12">
			<!-- Payment steps -->
			<div class="space-y-6">
				<div class="flex items-start gap-4 border border-gray-100 p-6">
					<Banknote size={28} class="mt-0.5 shrink-0 text-accent" />
					<div>
						<h3 class="mb-1 font-semibold text-black">20% Deposit to Reserve</h3>
						<p class="text-sm leading-relaxed text-gray-600">
							Secure your spot with a deposit of only 20% of your total safari package via bank
							transfer or Western Union money transfer.
						</p>
					</div>
				</div>
				<div class="flex items-start gap-4 border border-gray-100 p-6">
					<Check size={28} class="mt-0.5 shrink-0 text-accent" />
					<div>
						<h3 class="mb-1 font-semibold text-black">80% Balance on Arrival</h3>
						<p class="text-sm leading-relaxed text-gray-600">
							The remaining 80% is paid in cash on arrival in Uganda when you begin your adventure.
						</p>
					</div>
				</div>
			</div>

			<!-- Rates info -->
			<div class="bg-[#f5f3f0] p-8">
				<div class="mb-4 flex items-center gap-2">
					<Info size={18} class="shrink-0 text-accent" />
					<h3 class="font-semibold text-black">Rate Information</h3>
				</div>
				<ul class="space-y-2 text-sm text-gray-600">
					{#each [
						'Quoted in US dollars (USD)',
						'Subject to availability',
						'Quoted per person - double or single room basis',
						'Inclusive of accommodation, stated activities, full-board meals and all levies',
						'Subject to change without prior notice'
					] as point (point)}
						<li class="flex items-start gap-2">
							<Check size={14} class="mt-0.5 shrink-0 text-accent" />
							{point}
						</li>
					{/each}
				</ul>
				<p class="mt-6 text-sm leading-relaxed text-gray-600">
					We have carefully selected lodges with excellent meals, service-oriented staff and a
					nature-based setting for a more wonderful experience - recommended by our guests time
					and again.
				</p>
			</div>
		</div>
	</div>
</section>

<!-- CANCELLATION POLICY -->
<section class="bg-primary py-20">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<p class="mb-2 text-xs font-semibold uppercase tracking-[0.25em] text-accent">Terms &amp; Conditions</p>
		<HeadlineReveal>
			<h2 class="mb-4 font-display text-4xl tracking-wide text-white">
				Cancellation &amp; Refund Policy
			</h2>
		</HeadlineReveal>
		<p class="mb-10 max-w-2xl text-sm leading-relaxed text-white/60">
			The following terms apply to all safari packages and activities offered by Evajo Tours &amp;
			Travel Limited and are accepted in full upon making a reservation.
		</p>

		<div class="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
			{#each cancellationPolicy as row, i (row.label)}
				<div class="border border-white/10 p-6">
					<CalendarX2 size={22} class="mb-4 text-accent" />
					<p class="mb-1 text-xs font-semibold uppercase tracking-widest text-white/50">{row.label}</p>
					<p class="font-display text-lg tracking-wide text-white">{row.refund}</p>
				</div>
			{/each}
		</div>

		<div class="mt-10 space-y-3 border-t border-white/10 pt-8">
			<div class="flex items-start gap-3 text-sm text-white/70">
				<X size={16} class="mt-0.5 shrink-0 text-red-400" />
				<p>Mountain Gorilla, Chimpanzee and Golden Monkey permits are excluded from the percentages above and are <strong class="text-white">100% non-refundable</strong>.</p>
			</div>
			<div class="flex items-start gap-3 text-sm text-white/70">
				<ShieldCheck size={16} class="mt-0.5 shrink-0 text-accent" />
				<p>Cancellations or postponements caused by the effects of Covid-19 will not attract any charges.</p>
			</div>
		</div>
	</div>
</section>

<TestimonialsStrip testimonials={data.testimonials} />

<CtaBanner
	heading="Ready to Explore East Africa?"
	subtext="Let us build your perfect trip - tailor-made and expertly guided. We wish you a wonderful and splendid safari adventure."
	btnLabel="Start Planning"
	href="/contact"
/>
