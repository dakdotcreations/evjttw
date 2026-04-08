<script lang="ts">
	import { onMount } from 'svelte';
	import type { Snippet } from 'svelte';
	import { loadGsap } from '$lib/utils/useGsap';

	let { children, delay = 0 }: { children: Snippet; delay?: number } = $props();

	let el: HTMLElement;

	onMount(() => {
		const observer = new IntersectionObserver(
			async ([entry]) => {
				if (!entry.isIntersecting) return;
				observer.disconnect();

				const { gsap } = await loadGsap();

				gsap.from(el, {
					opacity: 0,
					y: 20,
					duration: 0.55,
					ease: 'power2.out',
					delay
				});
			},
			{ threshold: 0.1 }
		);

		observer.observe(el);
		return () => observer.disconnect();
	});
</script>

<div bind:this={el}>
	{@render children()}
</div>
