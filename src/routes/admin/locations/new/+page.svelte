<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { z } from 'zod';
	import MediaUpload from '$lib/components/MediaUpload.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Textarea from '$lib/components/ui/Textarea.svelte';
	import Select from '$lib/components/ui/Select.svelte';
	import Button from '$lib/components/ui/Button.svelte';
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
			<Input name="name" label="Name" bind:value={$form.name} error={$errors.name} required />

			<Select name="countryId" label="Country" bind:value={$form.countryId} error={$errors.countryId} required>
				<option value="">Select a country…</option>
				{#each data.countries as c}
					<option value={c.id}>{c.name}</option>
				{/each}
			</Select>

			<Textarea name="description" label="Description" bind:value={$form.description} />

			<Select name="mediaType" label="Media Type" bind:value={$form.mediaType}>
				<option value="">None</option>
				<option value="image">Image</option>
				<option value="video_blob">Video (upload)</option>
				<option value="video_embed">Video (embed URL)</option>
			</Select>

			{#if $form.mediaType}
				<MediaUpload name="mediaUrl" bind:value={$form.mediaUrl} {mediaType} label="Cover Media" />
			{/if}

			<div class="pt-2">
				<Button variant="primary" size="lg" type="submit" disabled={$submitting}>
					{$submitting ? 'Creating…' : 'Create Location'}
				</Button>
			</div>
		</form>
	</div>
</div>
