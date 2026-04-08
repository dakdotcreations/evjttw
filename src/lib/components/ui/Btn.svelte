<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		variant = 'primary',
		size = 'md',
		type = 'button',
		disabled = false,
		href,
		external = false,
		class: klass = '',
		onclick,
		children
	}: {
		variant?: 'primary' | 'secondary' | 'ghost' | 'outline';
		size?: 'sm' | 'md' | 'lg';
		type?: 'button' | 'submit' | 'reset';
		disabled?: boolean;
		href?: string;
		external?: boolean;
		class?: string;
		onclick?: (e: MouseEvent) => void;
		children: Snippet;
	} = $props();

	const base =
		'inline-flex items-center justify-center gap-2 font-semibold tracking-wide transition-all duration-200 disabled:opacity-50 cursor-pointer';

	const sizes: Record<string, string> = {
		sm: 'px-4 py-2 text-xs',
		md: 'px-6 py-3 text-sm',
		lg: 'px-8 py-4 text-base'
	};

	const variants: Record<string, string> = {
		primary: 'bg-accent text-black hover:bg-accent/85',
		secondary: 'border border-black/25 text-black hover:bg-black hover:text-white',
		ghost: 'text-black/60 hover:text-black hover:bg-black/5',
		outline: 'border border-white/40 text-white hover:bg-white/10 hover:border-white/80'
	};

	const classes = $derived(`${base} ${sizes[size]} ${variants[variant]} ${klass}`);
</script>

{#if href}
	<a
		{href}
		class={classes}
		target={external ? '_blank' : undefined}
		rel={external ? 'noopener noreferrer' : undefined}
	>
		{@render children()}
	</a>
{:else}
	<button {type} {disabled} {onclick} class={classes}>
		{@render children()}
	</button>
{/if}
