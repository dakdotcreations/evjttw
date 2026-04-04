<script lang="ts">
	import { Loader2, Upload, X, ImageIcon, CheckCircle } from 'lucide-svelte';
	import { compressImage } from '$lib/utils/compressImage';

	let {
		value = $bindable(''),
		name,
		label = 'Image'
	}: {
		value?: string;
		name: string;
		label?: string;
	} = $props();

	let compressing = $state(false);
	let compressError = $state('');
	let isDragging = $state(false);
	let compressionInfo = $state<{ original: number; compressed: number } | null>(null);
	let fileInputEl = $state<HTMLInputElement | null>(null);

	// What's shown in the preview: either the saved Azure URL or a local object URL for the staged file
	let displayUrl = $state(value);

	$effect(() => {
		// When value changes externally (e.g. form reset) and no file is staged, sync display
		if (!fileInputEl?.files?.length) {
			displayUrl = value;
		}
	});

	function formatBytes(bytes: number): string {
		if (bytes < 1024) return `${bytes} B`;
		if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
		return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
	}

	async function processFile(file: File) {
		if (!file.type.startsWith('image/')) {
			compressError = 'Please select an image file.';
			return;
		}

		compressing = true;
		compressError = '';
		compressionInfo = null;

		try {
			const originalSize = file.size;
			const compressed = await compressImage(file);
			compressionInfo = { original: originalSize, compressed: compressed.size };

			// Show a local preview without uploading anything
			displayUrl = URL.createObjectURL(compressed);

			// Stage the compressed file on the real file input so it's included in the form POST
			const dt = new DataTransfer();
			dt.items.add(compressed);
			if (fileInputEl) fileInputEl.files = dt.files;
		} catch {
			compressError = 'Failed to process image.';
		} finally {
			compressing = false;
		}
	}

	function handleFileChange(e: Event) {
		const input = e.currentTarget as HTMLInputElement;
		const file = input.files?.[0];
		if (file) processFile(file);
	}

	function handleDrop(e: DragEvent) {
		e.preventDefault();
		isDragging = false;
		const file = e.dataTransfer?.files?.[0];
		if (file) processFile(file);
	}

	function handleDragOver(e: DragEvent) {
		e.preventDefault();
		isDragging = true;
	}

	function clear() {
		displayUrl = '';
		value = '';
		compressError = '';
		compressionInfo = null;
		if (fileInputEl) {
			const dt = new DataTransfer();
			fileInputEl.files = dt.files;
		}
	}

	function openPicker() {
		fileInputEl?.click();
	}
</script>

<div class="space-y-2">
	<span class="block text-sm font-medium text-gray-700">{label}</span>

	<!--
		Two inputs submitted with the form:
		1. Hidden text input — sends the existing saved Azure URL (empty string if cleared/new)
		2. File input — sends the newly selected compressed file (empty if not changed)
		The server prefers the file if present, otherwise falls back to the hidden URL.
	-->
	<input type="hidden" {name} bind:value />
	<input
		type="file"
		name="{name}_file"
		accept="image/*"
		class="sr-only"
		bind:this={fileInputEl}
		onchange={handleFileChange}
		disabled={compressing}
	/>

	{#if displayUrl}
		<!-- Preview state -->
		<div class="relative w-full overflow-hidden rounded-xl border border-gray-200">
			<img src={displayUrl} alt="Preview" class="max-h-72 w-full object-cover" />
			<div class="absolute inset-0 flex items-end bg-linear-to-t from-black/50 to-transparent p-3">
				<div class="flex w-full items-center gap-2">
					{#if compressionInfo}
						<span class="rounded-full bg-black/60 px-2 py-0.5 text-xs text-white">
							<CheckCircle class="mr-1 inline h-3 w-3 text-green-400" />
							{formatBytes(compressionInfo.original)} → {formatBytes(compressionInfo.compressed)}
							<span class="ml-1 text-gray-300">· uploaded on save</span>
						</span>
					{/if}
					<div class="ml-auto flex gap-2">
						<button
							type="button"
							onclick={openPicker}
							disabled={compressing}
							class="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-gray-800 shadow hover:bg-white disabled:opacity-50"
						>
							Replace
						</button>
						<button
							type="button"
							onclick={clear}
							class="flex h-7 w-7 items-center justify-center rounded-full bg-white/90 text-gray-700 shadow hover:bg-white"
						>
							<X class="h-3.5 w-3.5" />
						</button>
					</div>
				</div>
			</div>
		</div>
	{:else}
		<!-- Drop zone -->
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_static_element_interactions -->
		<div
			class="flex min-h-44 cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed transition-colors {isDragging
				? 'border-indigo-400 bg-indigo-50'
				: 'border-gray-300 bg-gray-50 hover:border-indigo-300 hover:bg-indigo-50/40'}"
			ondrop={handleDrop}
			ondragover={handleDragOver}
			ondragleave={() => (isDragging = false)}
			onclick={openPicker}
		>
			{#if compressing}
				<Loader2 class="h-8 w-8 animate-spin text-indigo-400" />
				<p class="text-sm font-medium text-indigo-600">Compressing…</p>
			{:else}
				<div class="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
					{#if isDragging}
						<Upload class="h-6 w-6 text-indigo-500" />
					{:else}
						<ImageIcon class="h-6 w-6 text-indigo-400" />
					{/if}
				</div>
				<div class="text-center">
					<p class="text-sm font-medium text-gray-700">
						{isDragging ? 'Drop image here' : 'Click to select or drag & drop'}
					</p>
					<p class="mt-0.5 text-xs text-gray-400">Compressed locally · uploaded when you save</p>
				</div>
			{/if}
		</div>
	{/if}

	{#if compressError}
		<p class="text-xs text-red-600">{compressError}</p>
	{/if}
</div>
