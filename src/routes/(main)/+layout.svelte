<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import { afterNavigate } from '$app/navigation';
	import { loadGsap } from '$lib/utils/useGsap';
	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
	import FloatingWhatsApp from '$lib/components/FloatingWhatsApp.svelte';

	let { children } = $props();

	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let smootherInstance: any = null;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let scrollTriggerRef: any = null;

	onMount(async () => {
		const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		if (prefersReduced) return;

		const { ScrollSmoother, ScrollTrigger } = await loadGsap();
		scrollTriggerRef = ScrollTrigger;

		smootherInstance = ScrollSmoother.create({
			wrapper: '#smooth-wrapper',
			content: '#smooth-content',
			smooth: 1.5,
			effects: true,
			normalizeScroll: false,
			ignoreMobileResize: true
		});
	});

	onDestroy(() => {
		smootherInstance?.kill();
		scrollTriggerRef?.getAll().forEach((t: { kill: () => void }) => t.kill());
		smootherInstance = null;
	});

	afterNavigate(() => {
		smootherInstance?.scrollTo(0, false);
		loadGsap().then(({ ScrollTrigger }) => ScrollTrigger.refresh());
	});
</script>

<Navbar />
<div id="smooth-wrapper">
	<div id="smooth-content">
		{@render children()}
		<Footer />
	</div>
</div>
<FloatingWhatsApp />

