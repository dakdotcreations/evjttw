<script lang="ts">
	let {
		value = $bindable<string | number | undefined>(),
		label,
		name,
		id,
		type = 'text',
		hint,
		error,
		required = false,
		placeholder,
		min,
		max,
		step,
		maxlength,
		disabled = false
	}: {
		value?: string | number;
		label: string;
		name: string;
		id?: string;
		type?: string;
		hint?: string;
		error?: string | string[];
		required?: boolean;
		placeholder?: string;
		min?: number | string;
		max?: number | string;
		step?: number | string;
		maxlength?: number;
		disabled?: boolean;
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
	<input
		{type}
		{name}
		id={fieldId}
		{placeholder}
		{min}
		{max}
		{step}
		{maxlength}
		{disabled}
		bind:value
		class="mt-1 block w-full rounded-md border-primary/20 text-sm focus:border-accent focus:ring-accent"
	/>
	{#if errorMsg}<p class="mt-1 text-xs text-red-600">{errorMsg}</p>{/if}
</div>
