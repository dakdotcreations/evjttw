<script lang="ts">
import { onMount } from 'svelte';
import { loadGsap } from '$lib/utils/useGsap';
import type { PageData } from './$types';
import BookingEnquiryForm from '$lib/components/BookingEnquiryForm.svelte';
import TourCard from '$lib/components/TourCard.svelte';
import CtaBanner from '$lib/components/CtaBanner.svelte';
import { formatPrice } from '$lib/utils/pricing';
import { buildStepLabels } from '$lib/utils/stepLabel';
import { MapPin, Clock, Tag } from 'lucide-svelte';

let { data }: { data: PageData } = $props();

const price = $derived(formatPrice({
fixedPrice: data.itinerary.fixedPrice,
pricePerPerson: data.itinerary.pricePerPerson,
currency: data.itinerary.currency,
pricingDisabled: data.itinerary.pricingDisabled,
}));

const stepLabels = $derived(buildStepLabels(data.itinerary.steps));

let openStep = $state<number | null>(null);
function toggleStep(n: number) { openStep = openStep === n ? null : n; }

let heroEl: HTMLElement;
let contentEl: HTMLElement;

onMount(async () => {
const { gsap } = await loadGsap();
gsap.from(heroEl.querySelectorAll('.hero-in'), { opacity: 0, y: 24, stagger: 0.1, duration: 0.7, ease: 'power3.out', delay: 0.3 });

// Step timeline draw
const steps = contentEl?.querySelectorAll('.step-item');
if (steps?.length) {
const obs = new IntersectionObserver(([entry]) => {
if (!entry.isIntersecting) return;
obs.disconnect();
gsap.from(steps, { opacity: 0, x: -20, stagger: 0.1, duration: 0.5, ease: 'power2.out' });
}, { threshold: 0.1 });
obs.observe(contentEl);
}
});
</script>

<svelte:head>
<title>{data.itinerary.title} — Evajo Tours & Travel</title>
<meta name="description" content={data.itinerary.summary ?? ''} />
</svelte:head>

<!-- HERO -->
<div bind:this={heroEl} class="relative flex items-end overflow-hidden bg-primary" style="min-height:65vh;">
{#if data.itinerary.coverImage}
<img data-speed="0.5" src={data.itinerary.coverImage} alt={data.itinerary.title} class="absolute inset-0 h-full w-full scale-110 object-cover" />
{/if}
<div class="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/10"></div>
<div class="relative z-10 w-full pb-12 pt-28">
<div class="mx-auto max-w-5xl px-6 lg:px-8">
{#if data.itinerary.tags.length > 0}
<div class="hero-in mb-4 flex flex-wrap gap-2">
{#each data.itinerary.tags as tag (tag.slug)}
<a href="/tours?tag={tag.slug}" class="flex items-center gap-1 border border-accent/60 px-3 py-1 text-xs font-semibold text-accent hover:bg-accent hover:text-black transition-colors">
<Tag size={10} />{tag.name}
</a>
{/each}
</div>
{/if}
<h1 class="hero-in font-display text-[clamp(2.5rem,6vw,5.5rem)] leading-[0.95] tracking-wide text-white">{data.itinerary.title}</h1>
<div class="hero-in mt-4 flex flex-wrap items-center gap-4 text-sm text-white/70">
<span class="flex items-center gap-1.5"><Clock size={14} />{data.itinerary.durationDays} {data.itinerary.durationDays === 1 ? 'day' : 'days'}</span>
{#if data.countries.length > 0}
<span class="flex items-center gap-1.5"><MapPin size={14} />{data.countries.join(', ')}</span>
{/if}
<span class="font-semibold text-accent">{price}</span>
</div>
<div class="hero-in mt-6">
<a href="#enquiry" class="inline-block bg-accent px-8 py-3.5 text-sm font-semibold text-black transition-colors hover:bg-accent/85">Book This Tour</a>
</div>
</div>
</div>
</div>

<!-- MAIN CONTENT -->
<div class="bg-white">
<div class="mx-auto max-w-5xl px-6 py-14 lg:px-8">
<div class="grid gap-12 lg:grid-cols-[1fr_360px]">

<!-- Left column -->
<div bind:this={contentEl}>
{#if data.itinerary.summary}
<p class="mb-6 text-lg leading-relaxed text-gray-700">{data.itinerary.summary}</p>
{/if}
{#if data.itinerary.description}
<p class="mb-10 whitespace-pre-line text-sm leading-relaxed text-gray-600">{data.itinerary.description}</p>
{/if}

<!-- DAY-BY-DAY -->
{#if data.itinerary.steps.length > 0}
<h2 class="mb-6 font-display text-3xl tracking-wide text-black">Day-by-Day</h2>
<div class="mb-12 space-y-0 border-l-2 border-accent/30 pl-6">
{#each data.itinerary.steps as step, i (step.id)}
<div class="step-item relative mb-6 last:mb-0">
<div class="absolute -left-[1.6rem] top-1 h-3 w-3 rounded-full bg-accent"></div>
<button onclick={() => toggleStep(step.stepNumber)} class="flex w-full items-start justify-between gap-4 text-left">
<div>
<span class="mr-2 text-xs font-semibold uppercase tracking-widest text-accent">{stepLabels[i].days}{stepLabels[i].hours ? ` · ${stepLabels[i].hours}` : ''}</span>
<span class="font-semibold text-black">{step.title}</span>
{#if step.location}
<span class="ml-2 text-xs text-gray-400">· {step.location.name}</span>
{/if}
</div>
</button>
{#if openStep === step.stepNumber || true}
<div class="mt-2">
{#if step.description}
<p class="text-sm leading-relaxed text-gray-600">{step.description}</p>
{/if}
{#if step.highlight}
<p class="mt-2 border-l-2 border-accent pl-3 text-xs font-medium text-primary">{step.highlight}</p>
{/if}
</div>
{/if}
</div>
{/each}
</div>
{/if}

<!-- GALLERY -->
{#if data.itinerary.images && data.itinerary.images.length > 0}
<h2 class="mb-6 font-display text-3xl tracking-wide text-black">Gallery</h2>
<div class="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-3">
{#each data.itinerary.images as img (img)}
<img src={img} alt="" loading="lazy" class="aspect-[4/3] w-full object-cover" />
{/each}
</div>
{/if}
</div>

<!-- Right column: booking form -->
<div>
<div id="enquiry" class="sticky top-28 border border-black/10 bg-[#f8f7f5] p-6">
<p class="mb-1 text-xs font-semibold uppercase tracking-widest text-accent">Reserve Your Spot</p>
<h3 class="mb-1 font-display text-2xl tracking-wide text-black">Book This Tour</h3>
<p class="mb-6 text-sm text-gray-500">Fill in your details and we'll get back to you within 24 hours.</p>
<BookingEnquiryForm formData={data.enquiryForm} />
</div>
</div>

</div><!-- /grid -->
</div>
</div>

<!-- RELATED TOURS -->
{#if data.related.length > 0}
<section class="bg-[#f5f3f0] py-16">
<div class="mx-auto max-w-7xl px-6 lg:px-8">
<div class="mb-10">
<p class="mb-1 text-xs font-semibold uppercase tracking-widest text-accent">You May Also Like</p>
<h2 class="font-display text-4xl tracking-wide text-black">Related Tours</h2>
</div>
<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
{#each data.related as tour (tour.id)}
<TourCard id={tour.id} title={tour.title} coverImage={tour.coverImage} durationDays={tour.durationDays} fixedPrice={tour.fixedPrice} pricePerPerson={tour.pricePerPerson} currency={tour.currency} pricingDisabled={tour.pricingDisabled} countries={tour.countries} tags={tour.tags} />
{/each}
</div>
</div>
</section>
{/if}

<CtaBanner heading="Questions About This Tour?" subtext="Our team is here to help you plan every detail." btnLabel="Contact Us" href="/contact" />
