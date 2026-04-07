<script lang="ts">
	import type { PageData } from './$types';
	import BookingEnquiryForm from '$lib/components/BookingEnquiryForm.svelte';
	import { formatPrice } from '$lib/utils/pricing';
	import { MapPin, Calendar, ChevronDown, ChevronUp } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();

	const price = $derived(
		formatPrice({
			fixedPrice: data.itinerary.fixedPrice,
			pricePerPerson: data.itinerary.pricePerPerson,
			currency: data.itinerary.currency,
		})
	);

	let openStep = $state<number | null>(null);

	function toggleStep(n: number) {
		openStep = openStep === n ? null : n;
	}
</script>

<svelte:head>
	<title>{data.itinerary.title} — Evajo Tours & Travel</title>
	<meta name="description" content={data.itinerary.summary} />
</svelte:head>

<!-- Hero -->
<div class="relative flex items-end bg-primary" style="min-height: 60vh;">
	{#if data.itinerary.coverImage}
		<img
			src={data.itinerary.coverImage}
			alt={data.itinerary.title}
			class="absolute inset-0 h-full w-full object-cover"
		/>
	{/if}
	<div class="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"></div>
	<div class="relative z-10 w-full pb-10 pt-28">
		<div class="mx-auto max-w-4xl px-4 sm:px-6">
			<div class="mb-3 flex flex-wrap gap-2">
				{#each data.countries as country (country)}
					<span class="rounded-full bg-accent/90 px-3 py-1 text-xs font-semibold text-black">
						{country}
					</span>
				{/each}
			</div>
			<h1 class="text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
				{data.itinerary.title}
			</h1>
		</div>
	</div>
</div>

<!-- Quick Stats Bar -->
<div class="border-b border-gray-100 bg-white">
	<div class="mx-auto flex max-w-4xl flex-wrap gap-x-6 gap-y-2 px-4 py-4 sm:px-6">
		<div class="flex items-center gap-1.5 text-sm text-gray-600">
			<Calendar size={15} class="text-primary" />
			{data.itinerary.durationDays}
			{data.itinerary.durationDays === 1 ? 'day' : 'days'}
		</div>
		{#if data.countries.length > 0}
			<div class="flex items-center gap-1.5 text-sm text-gray-600">
				<MapPin size={15} class="text-primary" />
				{data.countries.join(', ')}
			</div>
		{/if}
		<div class="flex items-center gap-1.5 text-sm font-semibold text-primary">
			{price}
		</div>
		{#if data.itinerary.bestSeasons.length > 0}
			<div class="text-sm text-gray-600">
				Best seasons: {data.itinerary.bestSeasons.join(', ')}
			</div>
		{/if}
	</div>
</div>

<!-- Main Content -->
<div class="bg-white py-10 sm:py-14">
	<div class="mx-auto max-w-4xl px-4 sm:px-6">
		<p class="mb-6 text-base leading-relaxed text-gray-700">{data.itinerary.summary}</p>
		<p class="mb-10 whitespace-pre-line text-sm leading-relaxed text-gray-600">
			{data.itinerary.description}
		</p>

		<!-- Day-by-Day Accordion -->
		{#if data.itinerary.steps.length > 0}
			<h2 class="mb-4 text-xl font-bold text-black">Day-by-Day Itinerary</h2>
			<div class="mb-10 divide-y divide-gray-100 rounded-xl border border-gray-100">
				{#each data.itinerary.steps as step (step.id)}
					<div>
						<button
							onclick={() => toggleStep(step.stepNumber)}
							class="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-gray-50"
						>
							<div>
								<span class="mr-2 text-xs font-semibold text-accent">Day {step.stepNumber}</span>
								<span class="text-sm font-semibold text-black">{step.title}</span>
								{#if step.location}
									<span class="ml-2 text-xs text-gray-400">{step.location.name}</span>
								{/if}
							</div>
							{#if openStep === step.stepNumber}
								<ChevronUp size={16} class="flex-shrink-0 text-gray-400" />
							{:else}
								<ChevronDown size={16} class="flex-shrink-0 text-gray-400" />
							{/if}
						</button>
						{#if openStep === step.stepNumber}
							<div class="border-t border-gray-50 px-5 pb-5 pt-3">
								<p class="text-sm leading-relaxed text-gray-600">{step.description}</p>
								{#if step.highlight}
									<p
										class="mt-3 rounded-lg bg-accent/10 px-3 py-2 text-xs font-medium text-primary"
									>
										★ {step.highlight}
									</p>
								{/if}
								{#if step.durationText}
									<p class="mt-2 text-xs text-gray-400">{step.durationText}</p>
								{/if}
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{/if}

		<!-- Image Gallery -->
		{#if data.itinerary.images.length > 0}
			<h2 class="mb-4 text-xl font-bold text-black">Gallery</h2>
			<div class="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-3">
				{#each data.itinerary.images as img (img)}
					<img
						src={img}
						alt=""
						loading="lazy"
						class="aspect-[4/3] w-full rounded-lg object-cover"
					/>
				{/each}
			</div>
		{/if}

		<!-- Booking Form -->
		<div id="enquiry" class="rounded-2xl border border-gray-100 bg-gray-50 p-6 sm:p-8">
			<h2 class="mb-1 text-xl font-bold text-black">Ready to Go?</h2>
			<p class="mb-6 text-sm text-gray-500">
				Fill in your details and we'll be in touch to plan your perfect trip.
			</p>
			<BookingEnquiryForm formData={data.enquiryForm} />
		</div>
	</div>
</div>
