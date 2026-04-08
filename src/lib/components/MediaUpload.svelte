<script lang="ts">
	import { Loader2, X } from 'lucide-svelte';

	let {
		value = $bindable(''),
		mediaType = 'image' as 'image' | 'video_blob' | 'video_embed',
		name,
		label = 'Media'
	}: {
		value?: string;
		mediaType?: 'image' | 'video_blob' | 'video_embed';
		name: string;
		label?: string;
	} = $props();

	let uploading = $state(false);
	let uploadError = $state('');

	async function handleFileChange(event: Event) {
		const input = event.currentTarget as HTMLInputElement;
		const file = input.files?.[0];
		if (!file) return;

		uploading = true;
		uploadError = '';

		try {
			const fd = new FormData();
			fd.append('file', file);
			const res = await fetch('/api/upload', { method: 'POST', body: fd });
			if (!res.ok) {
				const body = await res.json().catch(() => ({ message: 'Upload failed' }));
				uploadError = body.message ?? `Upload failed (${res.status})`;
				return;
			}
			const data = await res.json();
			value = data.url;
		} catch {
			uploadError = 'Upload failed. Check your connection.';
		} finally {
			uploading = false;
			input.value = '';
		}
	}

	function clear() {
		value = '';
		uploadError = '';
	}
</script>

<div class="space-y-2">
	<label for="{name}-control" class="block text-sm font-medium text-gray-700">{label}</label>

	<!-- Hidden input carries the URL into the form -->
	<input type="hidden" {name} bind:value />

	{#if mediaType === 'video_embed'}
		<input
			id="{name}-control"
			type="url"
			placeholder="YouTube or Vimeo URL"
			bind:value
			class="block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
		/>
	{:else}
		<div class="flex items-center gap-3">
			<label
				class="cursor-pointer rounded-md border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50"
			>
				{uploading ? 'Uploading…' : 'Choose file'}
				<input
					id="{name}-control"
					type="file"
					accept={mediaType === 'image' ? 'image/*' : 'video/*'}
					class="sr-only"
					onchange={handleFileChange}
					disabled={uploading}
				/>
			</label>
			{#if uploading}
				<Loader2 class="h-4 w-4 animate-spin text-gray-500" />
			{/if}
			{#if value}
				<button
					type="button"
					onclick={clear}
					class="flex items-center gap-1 text-xs text-red-600 hover:text-red-800"
				>
					<X class="h-3 w-3" /> Remove
				</button>
			{/if}
		</div>
	{/if}

	{#if uploadError}
		<p class="text-xs text-red-600">{uploadError}</p>
	{/if}

	<!-- Preview -->
	{#if value}
		<div class="mt-2 rounded-md border border-gray-200 overflow-hidden w-fit max-w-xs">
			{#if mediaType === 'image'}
				<img src={value} alt="Preview" class="h-40 w-auto object-cover" />
			{:else if mediaType === 'video_blob'}
				<!-- svelte-ignore a11y_media_has_caption -->
				<video src={value} controls class="h-40 w-auto"></video>
			{:else}
				<iframe
					src={value}
					title="Video preview"
					class="h-40 w-64"
					allowfullscreen
				></iframe>
			{/if}
		</div>
	{/if}
</div>
