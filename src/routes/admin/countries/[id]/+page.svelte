<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { z } from 'zod';
	import ImageUpload from '$lib/components/ImageUpload.svelte';
	import { Trash2 } from 'lucide-svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Textarea from '$lib/components/ui/Textarea.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const schema = z.object({
		name: z.string().min(2),
		code: z.string().length(2),
		flagEmoji: z.string().optional(),
		description: z.string().optional(),
		imageUrl: z.string().optional()
	});

	const { form, errors, enhance, submitting, message } = superForm(data.form, {
		validators: zod4Client(schema)
	});

	const { form: deleteFormData, enhance: deleteEnhance } = superForm(data.deleteForm);

	let confirmDelete = $state(false);
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

		<form method="POST" action="?/updateCountry" use:enhance enctype="multipart/form-data" class="space-y-5">
			<div class="grid grid-cols-2 gap-5">
				<Input name="name" label="Name" bind:value={$form.name} error={$errors.name} required />
				<Input name="code" label="Code" hint="2-letter ISO code" bind:value={$form.code} error={$errors.code} maxlength={2} required />
			</div>

			<Input name="flagEmoji" label="Flag Emoji" bind:value={$form.flagEmoji} />

			<Textarea name="description" label="Description" bind:value={$form.description} />

			<ImageUpload name="imageUrl" label="Cover Image" bind:value={$form.imageUrl} />

			<div class="pt-2">
				<Button variant="primary" size="lg" type="submit" disabled={$submitting}>
					{$submitting ? 'Saving…' : 'Save Changes'}
				</Button>
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
				<Button variant="danger" type="submit">Yes, delete</Button>
				<Button onclick={() => (confirmDelete = false)}>Cancel</Button>
			</form>
		{:else}
			<Button variant="danger" onclick={() => (confirmDelete = true)}>
				<Trash2 class="h-4 w-4" /> Delete Country
			</Button>
		{/if}
	</div>
</div>
