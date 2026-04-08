<script lang="ts">
	import HeadlineReveal from '$lib/components/HeadlineReveal.svelte';
	import ParaFade from '$lib/components/ParaFade.svelte';
	import Btn from '$lib/components/ui/Btn.svelte';

	let {
		heading,
		subtext = '',
		btnLabel = 'Explore Tours',
		href = '/tours'
	}: {
		heading: string;
		subtext?: string;
		btnLabel?: string;
		href?: string;
	} = $props();
</script>

<section class="bg-primary py-24">
	<div class="mx-auto max-w-4xl px-6 text-center">
		<HeadlineReveal>
			<h2 class="font-display text-6xl tracking-wide text-white sm:text-7xl">{heading}</h2>
		</HeadlineReveal>
		{#if subtext}
			<ParaFade delay={0.3}>
				<p class="mt-6 text-lg text-white/60">{subtext}</p>
			</ParaFade>
		{/if}
		<ParaFade delay={0.5}>
			<div class="mt-10">
				<Btn {href} variant="primary" size="lg">{btnLabel}</Btn>
			</div>
		</ParaFade>
	</div>
</section>
