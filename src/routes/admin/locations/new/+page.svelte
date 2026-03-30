<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { z } from 'zod';
	import MediaUpload from '$lib/components/MediaUpload.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const schema = z.object({
		name: z.string().min(2),
		description: z.string().optional(),
		countryId: z.string().min(1),
		mediaUrl: z.string().optional(),
		mediaType: z.enum(['image', 'video_blob', 'video_embed']).optional()
	});

	const { form, errors, enhance, submitting } = superForm(data.form, {
		validators: zod4Client(schema)
	});

	let mediaType = $derived(($form.mediaType ?? 'image') as 'image' | 'video_blob' | 'video_embed');
</script>

<div class="max-w-2xl">
	<div class="mb-6">
		<a href="/admin/locations" class="text-sm text-indigo-600 hover:underline">← Back to locations</a>
	</div>

	<div class="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
		<h2 class="mb-6 text-lg font-semibold text-gray-900">New Location</h2>

		<form method="POST" action="?/createLocation" use:enhance class="space-y-5">
			<div>
				<label for="name" class="block text-sm font-medium text-gray-700">Name</label>
				<input id="name" name="name" type="text" bind:value={$form.name}
					class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
				{#if $errors.name}<p class="mt-1 text-xs text-red-600">{$errors.name}</p>{/if}
			</div>

			<div>
				<label for="countryId" class="block text-sm font-medium text-gray-700">Country</label>
				<select id="countryId" name="countryId" bind:value={$form.countryId}
					class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
					<option value="">Select a country…</option>
					{#each data.countries as c}
						<option value={c.id}>{c.name}</option>
					{/each}
				</select>
				{#if $errors.countryId}<p class="mt-1 text-xs text-red-600">{$errors.countryId}</p>{/if}
			</div>

			<div>
				<label for="description" class="block text-sm font-medium text-gray-700">Description</label>
				<textarea id="description" name="description" rows="3" bind:value={$form.description}
					class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
			</div>

			<div>
				<label for="mediaType" class="block text-sm font-medium text-gray-700">Media Type</label>
				<select id="mediaType" name="mediaType" bind:value={$form.mediaType}
					class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
					<option value="">None</option>
					<option value="image">Image</option>
					<option value="video_blob">Video (upload)</option>
					<option value="video_embed">Video (embed URL)</option>
				</select>
			</div>

			{#if $form.mediaType}
				<MediaUpload name="mediaUrl" bind:value={$form.mediaUrl} {mediaType} label="Cover Media" />
			{/if}

			<div class="pt-2">
				<button type="submit" disabled={$submitting}
					class="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50">
					{$submitting ? 'Creating…' : 'Create Location'}
				</button>
			</div>
		</form>
	</div>
</div>
