<script lang="ts">
import { MapPin, Clock } from 'lucide-svelte';
import { formatPrice } from '$lib/utils/pricing';

let {
id,
title,
coverImage,
durationDays,
fixedPrice,
pricePerPerson,
currency,
countries,
tags = []
}: {
id: string;
title: string;
coverImage: string | null;
durationDays: number;
fixedPrice: number | null;
pricePerPerson: number | null;
currency: string;
countries: string[];
tags?: { name: string; slug: string }[];
} = $props();

const price = $derived(formatPrice({ fixedPrice, pricePerPerson, currency }));
</script>

<a
href="/tours/{id}"
class="group block overflow-hidden bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
>
<!-- Image -->
<div class="relative aspect-[4/3] overflow-hidden bg-gray-100">
{#if coverImage}
<img
src={coverImage}
alt={title}
loading="lazy"
class="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
/>
{:else}
<div class="flex h-full w-full items-center justify-center bg-primary/10">
<img src="/images/leopard.svg" alt="" aria-hidden="true" class="h-16 w-16 opacity-20" />
</div>
{/if}

<!-- Tag pills overlay -->
{#if tags.length > 0}
<div class="absolute left-3 top-3 flex flex-wrap gap-1.5">
{#each tags.slice(0, 2) as tag (tag.slug)}
<span class="bg-black/55 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
{tag.name}
</span>
{/each}
</div>
{/if}
</div>

<!-- Content -->
<div class="p-4">
{#if countries.length > 0}
<div class="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1">
{#each countries as country (country)}
<span class="flex items-center gap-1 text-xs font-medium text-gray-400">
<MapPin size={9} class="text-accent" />{country}
</span>
{/each}
</div>
{/if}

<h3 class="font-display text-2xl leading-tight tracking-wide text-black transition-colors group-hover:text-primary">
{title}
</h3>

<div class="mt-3 flex items-center justify-between">
<div class="flex items-center gap-1 text-xs text-gray-400">
<Clock size={11} />
{durationDays}
{durationDays === 1 ? 'day' : 'days'}
</div>
<span class="text-sm font-semibold text-primary">{price}</span>
</div>
</div>
</a>
