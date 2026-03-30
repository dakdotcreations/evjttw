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
		description: z.string().optional(),
		countryId: z.string().min(1),
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
		<a href="/admin/locations" class="text-sm text-indigo-600 hover:underline">← Back to locations</a>
	</div>

	{#if $message?.success}
		<div class="rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">{$message.success}</div>
	{/if}

	<div class="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
		<h2 class="mb-6 text-lg font-semibold text-gray-900">Edit Location</h2>

		<form method="POST" action="?/updateLocation" use:enhance class="space-y-5">
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
					{$submitting ? 'Saving…' : 'Save Changes'}
				</button>
			</div>
		</form>
	</div>

	<!-- Steps using this location -->
	{#if data.location.steps.length > 0}
		<div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
			<h3 class="mb-4 font-semibold text-gray-900">Used in itinerary steps</h3>
			<ul class="space-y-1.5">
				{#each data.location.steps as step}
					<li class="text-sm">
						<a href="/admin/itineraries/{step.itinerary.id}" class="text-indigo-600 hover:underline">
							{step.itinerary.title}
						</a>
						<span class="text-gray-400"> — Step {step.stepNumber}: {step.title}</span>
					</li>
				{/each}
			</ul>
		</div>
	{/if}

	<!-- Delete -->
	<div class="rounded-xl border border-red-100 bg-red-50 p-6">
		<h3 class="mb-2 font-semibold text-red-800">Danger Zone</h3>
		{#if data.location.steps.length > 0}
			<p class="text-sm text-red-700">This location is used in itinerary steps. Remove those steps first.</p>
		{:else if confirmDelete}
			<p class="mb-3 text-sm text-red-700">Are you sure? This cannot be undone.</p>
			<form method="POST" action="?/deleteLocation" use:deleteEnhance class="flex gap-3">
				<input type="hidden" name="id" value={data.location.id} />
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
				<Trash2 class="h-4 w-4" /> Delete Location
			</button>
		{/if}
	</div>
</div>
