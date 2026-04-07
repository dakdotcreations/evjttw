<script lang="ts">
	import { page } from '$app/state';
	import { Menu, X } from 'lucide-svelte';

	let scrolled = $state(false);
	let mobileOpen = $state(false);

	$effect(() => {
		function onScroll() {
			scrolled = window.scrollY > 50;
		}
		window.addEventListener('scroll', onScroll, { passive: true });
		return () => window.removeEventListener('scroll', onScroll);
	});

	const links = [
		{ href: '/tours', label: 'Tours' },
		{ href: '/destinations', label: 'Destinations' },
		{ href: '/about', label: 'About' },
		{ href: '/contact', label: 'Contact' },
	];
</script>

<nav
	class="fixed inset-x-0 top-0 z-50 transition-all duration-300 {scrolled || mobileOpen
		? 'bg-primary shadow-lg'
		: 'bg-transparent'}"
>
	<div class="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6">
		<a href="/" class="flex flex-shrink-0 items-center">
			<img src="/images/logo.svg" alt="Evajo Tours & Travel" class="h-10 w-auto" />
		</a>
		<div class="hidden items-center gap-6 md:flex">
			{#each links as link (link.href)}
				<a
					href={link.href}
					class="text-sm font-medium transition-colors {page.url.pathname.startsWith(link.href)
						? 'text-accent'
						: 'text-white/80 hover:text-accent'}"
				>
					{link.label}
				</a>
			{/each}
			<a
				href="/contact"
				class="ml-2 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black transition-colors hover:bg-accent/90"
			>
				Plan My Trip
			</a>
		</div>
		<button
			onclick={() => (mobileOpen = !mobileOpen)}
			class="p-2 text-white transition-colors hover:text-accent md:hidden"
			aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
		>
			{#if mobileOpen}
				<X size={22} />
			{:else}
				<Menu size={22} />
			{/if}
		</button>
	</div>
	{#if mobileOpen}
		<div class="border-t border-white/10 bg-primary px-4 pb-4 md:hidden">
			{#each links as link (link.href)}
				<a
					href={link.href}
					onclick={() => (mobileOpen = false)}
					class="block border-b border-white/5 py-3 text-sm font-medium transition-colors {page.url.pathname.startsWith(
						link.href
					)
						? 'text-accent'
						: 'text-white/80 hover:text-accent'}"
				>
					{link.label}
				</a>
			{/each}
			<a
				href="/contact"
				onclick={() => (mobileOpen = false)}
				class="mt-4 block rounded-lg bg-accent px-4 py-2.5 text-center text-sm font-semibold text-black transition-colors hover:bg-accent/90"
			>
				Plan My Trip
			</a>
		</div>
	{/if}
</nav>
