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

				const { gsap, SplitText } = await loadGsap();

				if (!el) return;

				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				const split = new (SplitText as any)(el, { type: 'words' });

				// Wrap each word in an overflow-hidden clip container
				// eslint-disable-next-line @typescript-eslint/no-explicit-any
				split.words.forEach((word: any) => {
					const wrapper = document.createElement('span');
					wrapper.style.cssText =
						'display:inline-block;overflow:hidden;vertical-align:bottom;padding-bottom:0.06em;';
					word.style.display = 'inline-block';
					word.parentNode!.insertBefore(wrapper, word);
					wrapper.appendChild(word);
				});

				gsap.from(split.words, {
					y: '105%',
					duration: 0.75,
					ease: 'power3.out',
					stagger: 0.08,
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
