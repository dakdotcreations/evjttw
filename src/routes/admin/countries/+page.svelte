<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { z } from 'zod';
	import { Plus, Pencil, Trash2 } from 'lucide-svelte';
	import MediaUpload from '$lib/components/MediaUpload.svelte';
	import Dialog from '$lib/components/ui/Dialog.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Textarea from '$lib/components/ui/Textarea.svelte';
	import Select from '$lib/components/ui/Select.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import { countrySchema } from '$lib/schemas/country';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// ── Create ────────────────────────────────────────────────
	let createOpen = $state(false);

	const {
		form: createForm,
		errors: createErrors,
		enhance: createEnhance,
		submitting: createSubmitting,
		message: createMessage
	} = superForm(data.createForm, {
		validators: zod4Client(countrySchema),
		resetForm: true,
		onResult({ result }) {
			if (result.type === 'success') createOpen = false;
		}
	});

	let createMediaType = $derived(
		($createForm.mediaType ?? 'image') as 'image' | 'video_blob' | 'video_embed'
	);

	// ── Edit ─────────────────────────────────────────────────
	const updateSchema = countrySchema.extend({ id: z.string() });

	let editOpen = $state(false);
	let editCountryId = $state('');

	const {
		form: editForm,
		errors: editErrors,
		enhance: editEnhance,
		submitting: editSubmitting,
		message: editMessage
	} = superForm(data.createForm, {
		id: 'update-country',
		validators: zod4Client(updateSchema),
		resetForm: false,
		onResult({ result }) {
			if (result.type === 'success') { editOpen = false; confirmDelete = false; }
		}
	});

	let editMediaType = $derived(
		($editForm.mediaType ?? 'image') as 'image' | 'video_blob' | 'video_embed'
	);

	function openEdit(c: (typeof data.countries)[number]) {
		editCountryId = c.id;
		$editForm.name = c.name;
		$editForm.code = c.code;
		$editForm.flagEmoji = c.flagEmoji ?? '';
		$editForm.description = c.description ?? '';
		$editForm.mediaUrl = c.mediaUrl ?? '';
		$editForm.mediaType = c.mediaType ?? undefined;
		confirmDelete = false;
		editOpen = true;
	}

	// ── Delete ────────────────────────────────────────────────
	const { enhance: deleteEnhance } = superForm(data.deleteForm, {
		id: 'delete-country',
		onResult({ result }) {
			if (result.type === 'success') { editOpen = false; confirmDelete = false; }
		}
	});

	let confirmDelete = $state(false);

	function deleteCountry() {
		(document.getElementById('delete-country-form') as HTMLFormElement)?.requestSubmit();
	}
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<p class="text-sm text-gray-500">
			{data.countries.length} countr{data.countries.length !== 1 ? 'ies' : 'y'}
		</p>
		<Button variant="primary" onclick={() => (createOpen = true)}>
			<Plus class="h-4 w-4" /> Add Country
		</Button>
	</div>

	<div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
		<table class="w-full text-sm">
			<thead>
				<tr
					class="border-b border-gray-100 bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
				>
					<th class="px-6 py-3">Country</th>
					<th class="px-6 py-3">Code</th>
					<th class="px-6 py-3">Locations</th>
					<th class="px-6 py-3"></th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-100">
				{#each data.countries as country}
					<tr class="hover:bg-gray-50">
						<td class="px-6 py-3 font-medium text-gray-900">
							{#if country.flagEmoji}<span class="mr-2">{country.flagEmoji}</span>{/if}{country.name}
						</td>
						<td class="px-6 py-3">
							<span class="rounded bg-gray-100 px-2 py-0.5 font-mono text-xs text-gray-600"
								>{country.code}</span
							>
						</td>
						<td class="px-6 py-3 text-gray-600">{country._count.locations}</td>
						<td class="px-6 py-3 text-right">
							<Button variant="ghost" size="sm" onclick={() => openEdit(country)}>
								<Pencil class="h-3.5 w-3.5" /> Edit
							</Button>
						</td>
					</tr>
				{:else}
					<tr>
						<td colspan="4" class="px-6 py-8 text-center text-gray-400">No countries yet</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<!-- ── Add Country Dialog ───────────────────────────────────── -->
<Dialog bind:open={createOpen} title="Add Country">
	{#if $createMessage?.success}
		<p class="mb-4 rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">
			{$createMessage.success}
		</p>
	{/if}
	<form method="POST" action="?/createCountry" use:createEnhance class="space-y-4">
		<div class="grid grid-cols-2 gap-4">
			<Input
				name="name"
				label="Name"
				bind:value={$createForm.name}
				error={$createErrors.name}
				required
			/>
			<Input
				name="code"
				label="Code"
				hint="2-letter ISO"
				bind:value={$createForm.code}
				error={$createErrors.code}
				maxlength={2}
				required
			/>
		</div>
		<Input name="flagEmoji" label="Flag Emoji" placeholder="🇺🇬" bind:value={$createForm.flagEmoji} />
		<Textarea name="description" label="Description" bind:value={$createForm.description} />
		<Select name="mediaType" label="Media Type" bind:value={$createForm.mediaType}>
			<option value="">None</option>
			<option value="image">Image</option>
			<option value="video_blob">Video (upload)</option>
			<option value="video_embed">Video (embed URL)</option>
		</Select>
		{#if $createForm.mediaType}
			<MediaUpload
				name="mediaUrl"
				bind:value={$createForm.mediaUrl}
				mediaType={createMediaType}
				label="Cover Media"
			/>
		{/if}
		<div class="flex justify-end gap-3 pt-2">
			<Button onclick={() => (createOpen = false)}>Cancel</Button>
			<Button variant="primary" type="submit" disabled={$createSubmitting}>
				{$createSubmitting ? 'Creating…' : 'Create Country'}
			</Button>
		</div>
	</form>
</Dialog>

<!-- ── Edit Country Dialog ──────────────────────────────────── -->
<Dialog bind:open={editOpen} title="Edit Country">
	{#if $editMessage?.success}
		<p class="mb-4 rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">
			{$editMessage.success}
		</p>
	{/if}
	<form method="POST" action="?/updateCountry" use:editEnhance class="space-y-4">
		<input type="hidden" name="id" value={editCountryId} />
		<div class="grid grid-cols-2 gap-4">
			<Input
				name="name"
				label="Name"
				bind:value={$editForm.name}
				error={$editErrors.name}
				required
			/>
			<Input
				name="code"
				label="Code"
				hint="2-letter ISO"
				bind:value={$editForm.code}
				error={$editErrors.code}
				maxlength={2}
				required
			/>
		</div>
		<Input name="flagEmoji" label="Flag Emoji" bind:value={$editForm.flagEmoji} />
		<Textarea name="description" label="Description" bind:value={$editForm.description} />
		<Select name="mediaType" label="Media Type" bind:value={$editForm.mediaType}>
			<option value="">None</option>
			<option value="image">Image</option>
			<option value="video_blob">Video (upload)</option>
			<option value="video_embed">Video (embed URL)</option>
		</Select>
		{#if $editForm.mediaType}
			<MediaUpload
				name="mediaUrl"
				bind:value={$editForm.mediaUrl}
				mediaType={editMediaType}
				label="Cover Media"
			/>
		{/if}
		<div class="flex items-center justify-between pt-2">
			{#if confirmDelete}
				<div class="flex gap-2">
					<Button variant="danger" size="sm" onclick={() => deleteCountry()}>Yes, delete</Button>
					<Button size="sm" onclick={() => (confirmDelete = false)}>Cancel</Button>
				</div>
			{:else}
				<Button variant="ghost" size="sm" onclick={() => (confirmDelete = true)}>
					<Trash2 class="h-3.5 w-3.5 text-red-500" />
					<span class="text-red-500">Delete</span>
				</Button>
			{/if}
			<div class="flex gap-3">
				<Button onclick={() => (editOpen = false)}>Cancel</Button>
				<Button variant="primary" type="submit" disabled={$editSubmitting}>
					{$editSubmitting ? 'Saving…' : 'Save Changes'}
				</Button>
			</div>
		</div>
	</form>
	<form id="delete-country-form" method="POST" action="?/deleteCountry" use:deleteEnhance class="hidden">
		<input type="hidden" name="id" value={editCountryId} />
	</form>
</Dialog>

