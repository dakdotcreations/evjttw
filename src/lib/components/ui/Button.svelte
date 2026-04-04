<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		variant = 'outline',
		type = 'button',
		size = 'md',
		disabled = false,
		onclick,
		children
	}: {
		variant?: 'outline' | 'accent' | 'primary' | 'danger' | 'ghost';
		type?: 'button' | 'submit' | 'reset';
		size?: 'sm' | 'md' | 'lg';
		disabled?: boolean;
		onclick?: (e: MouseEvent) => void;
		children: Snippet;
	} = $props();

	const base = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-colors disabled:opacity-50';

	const sizes: Record<string, string> = {
		sm: 'px-3 py-1.5 text-xs',
		md: 'px-4 py-2 text-sm',
		lg: 'px-5 py-2.5 text-sm'
	};

	const variants: Record<string, string> = {
		outline: 'border border-primary/20 hover:bg-primary/30',
		primary: 'bg-primary text-white hover:bg-primary/70',
		accent:  'bg-accent text-black hover:bg-accent/70',
		danger:  'bg-red-600 text-white hover:bg-red-700',
		ghost:   'text-gray-600 hover:bg-gray-100'
	};
</script>

<button
	{type}
	{disabled}
	{onclick}
	class="{base} {sizes[size]} {variants[variant]}"
>
	{@render children()}
</button>
