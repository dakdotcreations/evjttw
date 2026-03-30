<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { z } from 'zod';
	import MediaUpload from '$lib/components/MediaUpload.svelte';
	import { Trash2 } from 'lucide-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const schema = z.object({
		name: z.string().min(2),
		code: z.string().length(2),
		flagEmoji: z.string().optional(),
		description: z.string().optional(),
		mediaUrl: z.string().optional(),
		mediaType: z.enum(['image', 'video_blob', 'video_embed']).optional()
	});

	const { form, errors, enhance, submitting, message } = superForm(data.form, {
		validators: zod4Client(schema)
	});

	const { form: deleteFormData, enhance: deleteEnhance } = superForm(data.deleteForm);

	let confirmDelete = $state(false);
	let mediaType = $derived(($form.mediaType ?? 'image') as 'image' | 'video_blob' | 'video_embed');
</script>

<div class="max-w-2xl space-y-8">
	<div>
		<a href="/admin/countries" class="text-sm text-indigo-600 hover:underline">← Back to countries</a>
	</div>

	{#if $message?.success}
		<div class="rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">{$message.success}</div>
	{/if}

	<!-- Edit form -->
	<div class="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
		<h2 class="mb-6 text-lg font-semibold text-gray-900">Edit Country</h2>

		<form method="POST" action="?/updateCountry" use:enhance class="space-y-5">
			<div class="grid grid-cols-2 gap-5">
				<div>
					<label for="name" class="block text-sm font-medium text-gray-700">Name</label>
					<input id="name" name="name" type="text" bind:value={$form.name}
						class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
					{#if $errors.name}<p class="mt-1 text-xs text-red-600">{$errors.name}</p>{/if}
				</div>
				<div>
					<label for="code" class="block text-sm font-medium text-gray-700">Code</label>
					<input id="code" name="code" type="text" maxlength="2" bind:value={$form.code}
						class="mt-1 block w-full rounded-md border-gray-300 font-mono text-sm uppercase shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
					{#if $errors.code}<p class="mt-1 text-xs text-red-600">{$errors.code}</p>{/if}
				</div>
			</div>

			<div>
				<label for="flagEmoji" class="block text-sm font-medium text-gray-700">Flag Emoji</label>
				<input id="flagEmoji" name="flagEmoji" type="text" bind:value={$form.flagEmoji}
					class="mt-1 block w-32 rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
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
					{$submitting ? 'Saving…' : 'Save Changes'}
				</button>
			</div>
		</form>
	</div>

	<!-- Locations in this country -->
	{#if data.country.locations.length > 0}
		<div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
			<h3 class="mb-4 font-semibold text-gray-900">Locations in this country</h3>
			<ul class="space-y-1.5">
				{#each data.country.locations as loc}
					<li>
						<a href="/admin/locations/{loc.id}" class="text-sm text-indigo-600 hover:underline">{loc.name}</a>
					</li>
				{/each}
			</ul>
		</div>
	{/if}

	<!-- Delete -->
	<div class="rounded-xl border border-red-100 bg-red-50 p-6">
		<h3 class="mb-2 font-semibold text-red-800">Danger Zone</h3>
		{#if data.country.locations.length > 0}
			<p class="text-sm text-red-700">Remove all locations in this country before deleting it.</p>
		{:else if confirmDelete}
			<p class="mb-3 text-sm text-red-700">Are you sure? This cannot be undone.</p>
			<form method="POST" action="?/deleteCountry" use:deleteEnhance class="flex gap-3">
				<input type="hidden" name="id" value={data.country.id} />
				<button type="submit" class="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
					Yes, delete
				</button>
				<button type="button" onclick={() => (confirmDelete = false)}
					class="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100">
					Cancel
				</button>
			</form>
		{:else}
			<button type="button" onclick={() => (confirmDelete = true)}
				class="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
				<Trash2 class="h-4 w-4" /> Delete Country
			</button>
		{/if}
	</div>
</div>
