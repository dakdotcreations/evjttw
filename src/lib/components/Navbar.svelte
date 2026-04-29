<script lang="ts">
	import { page } from '$app/state';
	import { Menu, X, ArrowRight } from 'lucide-svelte';

	let scrolled = $state(false);
	let hidden = $state(false);
	let mobileOpen = $state(false);
	let entering = $state(false);

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

	$effect(() => {
		if (mobileOpen) {
			requestAnimationFrame(() => requestAnimationFrame(() => (entering = true)));
			document.body.style.overflow = 'hidden';
		} else {
			entering = false;
			document.body.style.overflow = '';
		}
	});

	$effect(() => {
		page.url.pathname;
		mobileOpen = false;
	});

	const links = [
		{ href: '/tours', label: 'Tours' },
		{ href: '/destinations', label: 'Destinations' },
		{ href: '/about', label: 'About' }
	];

	function isActive(href: string) {
		return page.url.pathname === href || page.url.pathname.startsWith(href + '/');
	}

	function closeMenu() {
		mobileOpen = false;
	}
</script>

<!--
  Segmented navbar:
  - At top (not scrolled): three floating pill segments spaced across the bar,
    all with white/10 glass backgrounds - links left, logo centre, CTA right.
  - On scroll: segments merge into a solid white bar seamlessly.
-->
<header
	class="fixed inset-x-0 top-0 z-50 transition-transform duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] {hidden && !mobileOpen
		? '-translate-y-full'
		: 'translate-y-0'}"
>

	<!-- Desktop layout -->
	<div class="relative mx-auto hidden h-20 max-w-7xl items-center px-6 md:flex lg:px-8">

		<!-- LEFT - nav links segment -->
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

		<!-- CENTRE - logo blob (organic shape) -->
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

		<!-- RIGHT - CTA segment -->
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
				class="h-9 w-auto transition-all duration-300 {scrolled ? '' : 'brightness-0 invert'}"
			/>
		</a>
		<button
			onclick={() => (mobileOpen = !mobileOpen)}
			class="p-2 transition-colors {scrolled ? 'text-black' : 'text-white'}"
			aria-label="Open menu"
		>
			<Menu size={22} />
		</button>
	</div>
</header>

<!-- Full-screen mobile menu overlay -->
<div
	class="fixed inset-0 z-[55] flex flex-col overflow-hidden bg-neutral-950 md:hidden"
	style:transform={mobileOpen ? 'translateY(0)' : 'translateY(-100%)'}
	style:transition="transform 0.65s cubic-bezier(0.76, 0, 0.24, 1)"
	style:pointer-events={mobileOpen ? 'auto' : 'none'}
	aria-hidden={!mobileOpen}
>
	<!-- Decorative blobs -->
	<div class="pointer-events-none absolute inset-0 overflow-hidden">
		<div class="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl"></div>
		<div class="absolute -bottom-24 -left-24 h-72 w-72 rounded-full bg-accent/5 blur-2xl"></div>
	</div>

	<!-- Overlay top bar -->
	<div class="relative flex items-center justify-between px-6 pb-4 pt-5">
		<a href="/" onclick={closeMenu}>
			<img src="/images/logo.svg" alt="Evajo Tours & Travel" class="h-8 w-auto brightness-0 invert" />
		</a>
		<button
			onclick={closeMenu}
			class="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors duration-200 hover:bg-white/20"
			aria-label="Close menu"
		>
			<X size={20} />
		</button>
	</div>

	<!-- Top divider -->
	<div
		class="mx-6 h-px bg-white/10"
		style:opacity={entering ? '1' : '0'}
		style:transition="opacity 0.4s ease"
		style:transition-delay={entering ? '80ms' : '0ms'}
	></div>

	<!-- Nav links -->
	<nav class="relative flex flex-1 flex-col justify-center px-8">
		{#each links as link, i (link.href)}
			<div
				style:opacity={entering ? '1' : '0'}
				style:transform={entering ? 'translateY(0)' : 'translateY(28px)'}
				style:transition="opacity 0.55s ease, transform 0.55s cubic-bezier(0.33, 1, 0.68, 1)"
				style:transition-delay={entering ? `${i * 90 + 150}ms` : '0ms'}
			>
				<a
					href={link.href}
					onclick={closeMenu}
					class="group flex items-center justify-between py-6 text-5xl font-bold leading-none tracking-tight transition-colors duration-300
					{isActive(link.href) ? 'text-accent' : 'text-white/80 hover:text-white'}"
				>
					<span>{link.label}</span>
					<ArrowRight
						size={24}
						class="transition-all duration-300 {isActive(link.href)
							? 'translate-x-0 opacity-100 text-accent'
							: '-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 text-white'}"
					/>
				</a>
				{#if i < links.length - 1}
					<div class="h-px bg-white/10"></div>
				{/if}
			</div>
		{/each}
	</nav>

	<!-- CTA -->
	<div
		class="relative px-8 pb-12"
		style:opacity={entering ? '1' : '0'}
		style:transform={entering ? 'translateY(0)' : 'translateY(20px)'}
		style:transition="opacity 0.55s ease, transform 0.55s cubic-bezier(0.33, 1, 0.68, 1)"
		style:transition-delay={entering ? `${links.length * 90 + 150}ms` : '0ms'}
	>
		<a
			href="/contact"
			onclick={closeMenu}
			class="flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-4 text-sm font-bold text-black transition-all duration-300 hover:gap-3"
		>
			Plan My Trip
			<ArrowRight size={16} />
		</a>
	</div>
</div>
