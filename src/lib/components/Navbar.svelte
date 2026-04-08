<script lang="ts">
	import { page } from '$app/state';
	import { Menu, X } from 'lucide-svelte';

	let scrolled = $state(false);
	let hidden = $state(false);
	let mobileOpen = $state(false);

	$effect(() => {
		let lastY = window.scrollY;
		function onScroll() {
			const y = window.scrollY;
			const delta = y - lastY;
			scrolled = y > 80;
			if (y <= 120) {
				hidden = false;
			} else if (delta > 8) {
				hidden = true;
			} else if (delta < -8) {
				hidden = false;
			}
			lastY = y;
		}
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	const links = [
		{ href: '/tours', label: 'Tours' },
		{ href: '/destinations', label: 'Destinations' },
		{ href: '/about', label: 'About' }
	];

	function isActive(href: string) {
		return page.url.pathname === href || page.url.pathname.startsWith(href + '/');
	}
</script>

<!--
  Segmented navbar:
  - At top (not scrolled): three floating pill segments spaced across the bar,
    all with white/10 glass backgrounds — links left, logo centre, CTA right.
  - On scroll: segments merge into a solid white bar seamlessly.
-->
<header
	class="fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] {hidden && !mobileOpen
		? '-translate-y-full'
		: 'translate-y-0'}"
>

	<!-- Desktop layout -->
	<div class="relative mx-auto hidden h-20 max-w-7xl items-center px-6 md:flex lg:px-8">

		<!-- LEFT — nav links segment -->
		<div
			class="flex items-center gap-1 transition-all duration-500 {scrolled
				? 'rounded-full bg-white/40 px-2 py-2 backdrop-blur-xs'
				: 'bg-transparent px-0 py-0'}"
		>
			{#each links as link (link.href)}
				<a
					href={link.href}
					class="px-3 py-1.5 text-sm font-medium tracking-wide transition-colors duration-300
					{scrolled
						? isActive(link.href)
							? 'text-accent'
							: 'text-black hover:text-accent'
						: isActive(link.href)
							? 'text-accent'
							: 'text-white hover:text-white/70'}"
				>
					{link.label}
				</a>
			{/each}
		</div>

		<!-- CENTRE — logo blob (organic shape) -->
		<div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
			<a
				href="/"
				style="border-radius: 62% 38% 46% 54% / 56% 44% 60% 40%;"
				class="flex h-14 w-14 items-center justify-center overflow-hidden transition-all duration-500
				{scrolled
					? 'bg-white/60 backdrop-blur-xs shadow-lg scale-125'
					: 'bg-white scale-150 translate-y-4'}"
			>
				<img
					src="/images/logo.svg"
					alt="Evajo Tours & Travel"
					class="w-8 transition-all duration-300 {scrolled ? '' : 'scale-90'}"
				/>
			</a>
		</div>

		<!-- RIGHT — CTA segment -->
		<div class="ml-auto">
			<a
				href="/contact"
				class="block text-sm font-semibold transition-all duration-500
				{scrolled
					? 'bg-accent px-5 py-2.5 text-black hover:bg-accent/80'
					: 'bg-transparent px-5 py-2.5 text-white hover:text-white/70'}"
			>
				Plan My Trip
			</a>
		</div>
	</div>

	<!-- Mobile bar -->
	<div class="relative flex h-16 items-center justify-between px-5 md:hidden">
		<a href="/">
			<img
				src="/images/logo.svg"
				alt="Evajo Tours & Travel"
				class="h-9 w-auto transition-all duration-300 {scrolled || mobileOpen ? '' : 'brightness-0 invert'}"
			/>
		</a>
		<button
			onclick={() => (mobileOpen = !mobileOpen)}
			class="p-2 transition-colors {scrolled || mobileOpen ? 'text-black' : 'text-white'}"
			aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
		>
			{#if mobileOpen}
				<X size={22} />
			{:else}
				<Menu size={22} />
			{/if}
		</button>
	</div>

	<!-- Mobile menu -->
	{#if mobileOpen}
		<div class="border-t border-black/10 bg-white px-6 pb-6 md:hidden">
			<div class="flex flex-col gap-1 pt-4">
				{#each links as link (link.href)}
					<a
						href={link.href}
						onclick={() => (mobileOpen = false)}
						class="py-3 text-base font-semibold tracking-wide transition-colors
						{isActive(link.href) ? 'text-accent' : 'text-black hover:text-accent'}"
					>
						{link.label}
					</a>
				{/each}
				<a
					href="/contact"
					onclick={() => (mobileOpen = false)}
					class="mt-4 block bg-accent px-5 py-3 text-center text-sm font-semibold text-black"
				>
					Plan My Trip
				</a>
			</div>
		</div>
	{/if}
</header>
