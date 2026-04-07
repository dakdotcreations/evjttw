<script lang="ts">
	import type { PageData } from './$types';
	import ContactForm from '$lib/components/ContactForm.svelte';

	let { data }: { data: PageData } = $props();

	const faqs: Array<{ q: string; a: string }> = [
		{
			q: 'Do I need a visa to visit Uganda, Kenya, Tanzania or Rwanda?',
			a: "Most nationalities require a visa. Uganda and Rwanda offer an East Africa Tourist Visa (shared entry) for USD 100. Kenya offers an e-Visa. We'll send you a detailed visa guide after booking.",
		},
		{
			q: 'When is the best time to go on safari?',
			a: "Peak wildlife viewing is during the dry seasons: June–October and December–February. However, each destination has its own optimal window — we'll advise based on your preferred activities.",
		},
		{
			q: 'What is included in the tour price?',
			a: 'Our packages include accommodation, game drives, park entrance fees, a professional guide, and meals as specified per package. International flights and travel insurance are typically not included.',
		},
		{
			q: 'How do I book a tour?',
			a: "Fill out the booking enquiry form on any tour page, or contact us directly via email or WhatsApp. We'll put together a personalised itinerary and confirm availability within 24 hours.",
		},
		{
			q: 'Is East Africa safe for tourists?',
			a: 'Yes — Uganda, Kenya, Tanzania and Rwanda are well-established tourist destinations with solid infrastructure and welcoming communities. We brief all clients on current conditions before travel.',
		},
		{
			q: 'Can you arrange private or custom tours?',
			a: "Absolutely. We specialise in custom group and private itineraries. Reach out on WhatsApp or use the form below and we'll design a trip around your dates and interests.",
		},
	];

	let openIndex = $state<number | null>(null);

	function toggle(i: number) {
		openIndex = openIndex === i ? null : i;
	}
</script>

<svelte:head>
	<title>Contact Us — Evajo Tours & Travel</title>
	<meta
		name="description"
		content="Get in touch with Evajo Tours & Travel to plan your East Africa safari or trek."
	/>
</svelte:head>

<!-- Page header -->
<div class="bg-primary pb-12 pt-24 text-white">
	<div class="mx-auto max-w-5xl px-4 sm:px-6">
		<p class="mb-1 text-xs font-semibold uppercase tracking-widest text-accent">Get In Touch</p>
		<h1 class="text-3xl font-bold sm:text-4xl">Contact Us</h1>
		<p class="mt-2 max-w-xl text-sm text-white/70">
			We're here to help plan your perfect East Africa adventure. Reach out and we'll respond within
			24 hours.
		</p>
	</div>
</div>

<!-- Contact section -->
<div class="bg-white py-12 sm:py-16">
	<div class="mx-auto grid max-w-5xl grid-cols-1 gap-12 px-4 sm:px-6 lg:grid-cols-2">
		<!-- Contact details -->
		<div>
			<h2 class="mb-6 text-xl font-bold text-black">Our Details</h2>
			<ul class="space-y-5 text-sm text-gray-600">
				<li>
					<span class="mb-0.5 block text-xs font-semibold uppercase tracking-widest text-gray-400"
						>Email</span
					>
					<a href="mailto:info@evajotours.com" class="text-primary hover:underline"
						>info@evajotours.com</a
					>
				</li>
				<li>
					<span class="mb-0.5 block text-xs font-semibold uppercase tracking-widest text-gray-400"
						>Phone / WhatsApp</span
					>
					<a href="tel:+256760971269" class="text-primary hover:underline">+256 760 971 269</a>
				</li>
				<li>
					<span class="mb-0.5 block text-xs font-semibold uppercase tracking-widest text-gray-400"
						>Location</span
					>
					Kampala, Uganda
				</li>
				<li>
					<span class="mb-0.5 block text-xs font-semibold uppercase tracking-widest text-gray-400"
						>Operating Hours</span
					>
					Monday – Friday, 8 am – 6 pm EAT
				</li>
			</ul>
		</div>

		<!-- Contact form -->
		<div>
			<ContactForm formData={data.form} />
		</div>
	</div>
</div>

<!-- FAQ section -->
<div class="border-t border-gray-100 bg-gray-50 py-12 sm:py-16">
	<div class="mx-auto max-w-3xl px-4 sm:px-6">
		<h2 class="mb-8 text-center text-2xl font-bold text-black sm:text-3xl">
			Frequently Asked Questions
		</h2>
		<dl class="space-y-3">
			{#each faqs as faq, i (i)}
				<div class="overflow-hidden rounded-xl border border-gray-200 bg-white">
					<button
						type="button"
						onclick={() => toggle(i)}
						class="flex w-full items-center justify-between px-5 py-4 text-left text-sm font-semibold text-black hover:bg-gray-50"
						aria-expanded={openIndex === i}
					>
						<span>{faq.q}</span>
						<span class="ml-4 shrink-0 text-base text-gray-400">{openIndex === i ? '−' : '+'}</span>
					</button>
					{#if openIndex === i}
						<div class="border-t border-gray-100 px-5 py-4 text-sm leading-relaxed text-gray-600">
							{faq.a}
						</div>
					{/if}
				</div>
			{/each}
		</dl>
	</div>
</div>
