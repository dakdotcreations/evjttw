<script lang="ts">
	let {
		label,
		active = false,
		onclick
	}: {
		label: string;
		active?: boolean;
		onclick?: () => void;
	} = $props();
</script>

<button
	type="button"
	{onclick}
	class="inline-flex items-center px-4 py-1.5 text-xs font-semibold tracking-wide transition-all duration-200
		{active
		? 'bg-accent text-black scale-[1.04]'
		: 'bg-black/8 text-black/50 hover:text-black hover:bg-black/12'}"
>
	{label}
</button>
