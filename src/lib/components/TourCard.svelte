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
	}: {
		id: string;
		title: string;
		coverImage: string | null;
		durationDays: number;
		fixedPrice: number | null;
		pricePerPerson: number | null;
		currency: string;
		countries: string[];
	} = $props();

	const price = $derived(formatPrice({ fixedPrice, pricePerPerson, currency }));
	const daysLabel = $derived(durationDays === 1 ? '1 day' : `${durationDays} days`);
</script>

<a
	href="/tours/{id}"
	class="group flex flex-col overflow-hidden rounded-xl bg-white shadow-sm transition-shadow hover:shadow-md"
>
	<div class="relative aspect-[4/3] overflow-hidden bg-gray-100">
		{#if coverImage}
			<img
				src={coverImage}
				alt={title}
				loading="lazy"
				class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
			/>
		{:else}
			<div class="flex h-full w-full items-center justify-center bg-primary/10">
				<img src="/images/leopard.svg" alt="" aria-hidden="true" class="h-16 w-16 opacity-20" />
			</div>
		{/if}
		<span
			class="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-primary/80 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm"
		>
			<Clock size={11} />{daysLabel}
		</span>
	</div>
	<div class="flex flex-1 flex-col gap-1.5 p-4">
		<h3 class="text-sm font-semibold leading-snug text-black transition-colors group-hover:text-primary">
			{title}
		</h3>
		{#if countries.length > 0}
			<div class="flex items-center gap-1 text-xs text-gray-500">
				<MapPin size={11} class="flex-shrink-0" />
				{countries.join(' · ')}
			</div>
		{/if}
		<p class="mt-auto pt-2 text-xs font-semibold text-primary">{price}</p>
	</div>
</a>
