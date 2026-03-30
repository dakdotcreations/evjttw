<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { z } from 'zod';
	import MediaUpload from '$lib/components/MediaUpload.svelte';
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

	const { form, errors, enhance, submitting } = superForm(data.form, {
		validators: zod4Client(schema)
	});

	let mediaType = $derived(($form.mediaType ?? 'image') as 'image' | 'video_blob' | 'video_embed');
</script>

<div class="max-w-2xl">
	<div class="mb-6">
		<a href="/admin/countries" class="text-sm text-indigo-600 hover:underline">← Back to countries</a>
	</div>

	<div class="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
		<h2 class="mb-6 text-lg font-semibold text-gray-900">New Country</h2>

		<form method="POST" action="?/createCountry" use:enhance class="space-y-5">
			<div class="grid grid-cols-2 gap-5">
				<div>
					<label for="name" class="block text-sm font-medium text-gray-700">Name</label>
					<input id="name" name="name" type="text" bind:value={$form.name}
						class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
					{#if $errors.name}<p class="mt-1 text-xs text-red-600">{$errors.name}</p>{/if}
				</div>
				<div>
					<label for="code" class="block text-sm font-medium text-gray-700">Code <span class="text-gray-400">(2 letters)</span></label>
					<input id="code" name="code" type="text" maxlength="2" bind:value={$form.code}
						class="mt-1 block w-full rounded-md border-gray-300 font-mono text-sm uppercase shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
					{#if $errors.code}<p class="mt-1 text-xs text-red-600">{$errors.code}</p>{/if}
				</div>
			</div>

			<div>
				<label for="flagEmoji" class="block text-sm font-medium text-gray-700">Flag Emoji</label>
				<input id="flagEmoji" name="flagEmoji" type="text" bind:value={$form.flagEmoji}
					placeholder="🇺🇬"
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
				<MediaUpload
					name="mediaUrl"
					bind:value={$form.mediaUrl}
					{mediaType}
					label="Cover Media"
				/>
			{/if}

			<div class="pt-2">
				<button type="submit" disabled={$submitting}
					class="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50">
					{$submitting ? 'Creating…' : 'Create Country'}
				</button>
			</div>
		</form>
	</div>
</div>
