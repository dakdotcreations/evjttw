<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		images,
		interval = 4000,
		children,
	}: {
		images: string[];
		interval?: number;
		children: Snippet;
	} = $props();

	let current = $state(0);
	let paused = $state(false);

	$effect(() => {
		if (images.length <= 1 || paused) return;
		const t = setInterval(() => {
			current = (current + 1) % images.length;
		}, interval);
		return () => clearInterval(t);
	});
</script>

<section
	aria-label="Hero"
	class="relative w-full overflow-hidden bg-primary"
	style="height: 100svh;"
	onmouseenter={() => (paused = true)}
	onmouseleave={() => (paused = false)}
>
	{#each images as src, i (src)}
		<img
			{src}
			alt=""
			aria-hidden="true"
			loading={i === 0 ? 'eager' : 'lazy'}
			class="absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 {i === current
				? 'opacity-100'
				: 'opacity-0'}"
		/>
	{/each}
	<div class="absolute inset-0 bg-black/45"></div>
	<div class="relative z-10 flex h-full items-center">
		{@render children()}
	</div>
	{#if images.length > 1}
		<div class="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
			{#each images as _, i (i)}
				<button
					onclick={() => {
						current = i;
						paused = true;
					}}
					aria-label="Slide {i + 1}"
					class="h-2 rounded-full transition-all {i === current ? 'w-6 bg-accent' : 'w-2 bg-white/50'}"
				></button>
			{/each}
		</div>
	{/if}
</section>
