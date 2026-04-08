<script lang="ts">
	import type { Snippet } from 'svelte';
	import { X } from 'lucide-svelte';

	let {
		open = $bindable(false),
		title,
		children
	}: {
		open?: boolean;
		title?: string;
		children: Snippet;
	} = $props();

	let dialogEl = $state<HTMLDialogElement | null>(null);

	$effect(() => {
		if (!dialogEl) return;
		if (open) {
			dialogEl.showModal();
		} else {
			dialogEl.close();
		}
	});

	function handleBackdropClick(e: MouseEvent) {
		if (e.target === dialogEl) open = false;
	}

	function handleClose() {
		open = false;
	}
</script>

<!-- svelte-ignore a11y_click_events_have_key_events a11y_no_noninteractive_element_interactions -->
<dialog
	bind:this={dialogEl}
	onclick={handleBackdropClick}
	onclose={handleClose}
	class="m-auto w-[90vw] max-w-2xl max-h-[90vh] overflow-y-auto rounded-xl bg-white p-0 shadow-2xl backdrop:bg-black/40"
>
	<div class="sticky top-0 z-10 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
		{#if title}
			<h2 class="text-base font-semibold text-gray-900">{title}</h2>
		{/if}
		<button
			type="button"
			onclick={() => (open = false)}
			class="ml-auto rounded-md p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
		>
			<X class="h-5 w-5" />
		</button>
	</div>
	<div class="px-6 py-5">
		{@render children()}
	</div>
</dialog>
