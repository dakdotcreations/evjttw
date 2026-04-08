<script lang="ts">
	import './layout.css';
	import { onMount } from 'svelte';
	import { onNavigate } from '$app/navigation';
	import { loadGsap } from '$lib/utils/useGsap';

	let { children } = $props();

	let introEl: HTMLElement = $state() as HTMLElement;
	let showIntro = $state(false);

	onMount(async () => {
		if (sessionStorage.getItem('intro_done')) return;
		sessionStorage.setItem('intro_done', '1');

		showIntro = true;

		const { gsap } = await loadGsap();

		const leopard = introEl.querySelector<HTMLElement>('.intro-leopard');
		const wordmark = introEl.querySelector<HTMLElement>('.intro-wordmark');

		const tl = gsap.timeline({
			defaults: { ease: 'power3.out' },
			onComplete: () => {
				showIntro = false;
			}
		});

		tl.from(leopard, { scale: 0.7, opacity: 0, duration: 0.55, delay: 0.1 })
			.from(wordmark, { opacity: 0, letterSpacing: '0.5em', duration: 0.5 }, '-=0.2')
			.to(introEl, {
				clipPath: 'inset(0 0 100% 0)',
				duration: 0.65,
				ease: 'power4.inOut',
				delay: 0.35
			});
	});

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;
		return new Promise<void>((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

{#if showIntro}
	<div
		bind:this={introEl}
		style="clip-path: inset(0 0 0% 0);"
		class="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-primary"
	>
		<img src="/images/leopard.svg" alt="" aria-hidden="true" class="intro-leopard w-20" />
		<p class="intro-wordmark mt-4 font-display text-4xl tracking-[0.25em] text-white">EVAJO</p>
	</div>
{/if}

{@render children()}
