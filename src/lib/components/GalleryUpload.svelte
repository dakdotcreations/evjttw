<script lang="ts">
	import { Loader2, X, Plus } from 'lucide-svelte';
	import { compressImage } from '$lib/utils/compressImage';

	let {
		value = $bindable(''),
		name,
		label = 'Gallery Images'
	}: {
		value?: string;
		name: string;
		label?: string;
	} = $props();

	let uploading = $state(false);
	let uploadError = $state('');

	let urls = $derived(value ? value.split('\n').map((s) => s.trim()).filter(Boolean) : []);

	function removeUrl(url: string) {
		value = urls.filter((u) => u !== url).join('\n');
	}

	async function handleFile(event: Event) {
		const input = event.currentTarget as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;

		uploading = true;
		uploadError = '';

		try {
			const compressed = await compressImage(file);
			const fd = new FormData();
			fd.append('file', compressed);
			const res = await fetch('/api/upload', { method: 'POST', body: fd });
			if (!res.ok) {
				const body = await res.json().catch(() => ({ message: 'Upload failed' }));
				uploadError = body.message ?? `Upload failed (${res.status})`;
				return;
			}
			const data = await res.json();
			value = value ? `${value}\n${data.url}` : data.url;
		} catch {
			uploadError = 'Upload failed. Check your connection.';
		} finally {
			uploading = false;
			input.value = '';
		}
	}
</script>

<div class="space-y-2">
	<span class="block text-sm font-medium text-gray-700">{label}</span>
	<input type="hidden" {name} bind:value />

	{#if urls.length > 0}
		<div class="grid grid-cols-3 gap-2 sm:grid-cols-4">
			{#each urls as url}
				<div class="relative overflow-hidden rounded-md border border-gray-200">
					<img src={url} alt="Gallery" class="h-24 w-full object-cover" />
					<button
						type="button"
						onclick={() => removeUrl(url)}
						class="absolute right-1 top-1 flex h-5 w-5 items-center justify-center rounded-full bg-black/60 text-white hover:bg-black/80"
					>
						<X class="h-3 w-3" />
					</button>
				</div>
			{/each}
		</div>
	{/if}

	<div class="flex items-center gap-3">
		<label
			class="inline-flex cursor-pointer items-center gap-1.5 rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
		>
			{#if uploading}
				<Loader2 class="h-3.5 w-3.5 animate-spin" />
				Uploading…
			{:else}
				<Plus class="h-3.5 w-3.5" />
				Add image
			{/if}
			<input
				type="file"
				accept="image/*"
				class="sr-only"
				onchange={handleFile}
				disabled={uploading}
			/>
		</label>
	</div>

	{#if uploadError}
		<p class="text-xs text-red-600">{uploadError}</p>
	{/if}
</div>
