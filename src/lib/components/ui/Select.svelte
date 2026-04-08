<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		value = $bindable<string | undefined>(),
		label,
		name,
		id,
		hint,
		error,
		required = false,
		disabled = false,
		children
	}: {
		value?: string;
		label: string;
		name: string;
		id?: string;
		hint?: string;
		error?: string | string[];
		required?: boolean;
		disabled?: boolean;
		children: Snippet;
	} = $props();

	const fieldId = $derived(id ?? name);
	const errorMsg = $derived(Array.isArray(error) ? error[0] : error);
</script>

<div>
	<label for={fieldId} class="block text-sm font-medium">
		<span class="opacity-80">{label}</span>
        {#if required}<span class="ml-0.5 text-red-500">*</span>{/if}
	</label>
	{#if hint}<p class="mb-1 mt-0.5 text-xs opacity-60">{hint}</p>{/if}
	<select
		{name}
		id={fieldId}
		{disabled}
		bind:value
		class="mt-1 block w-full rounded-md border-primary/20 text-sm focus:border-accent focus:ring-accent"
	>
		{@render children()}
	</select>
	{#if errorMsg}<p class="mt-1 text-xs text-red-600">{errorMsg}</p>{/if}
</div>
