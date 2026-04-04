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
	import { locationSchema } from '$lib/schemas/location';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let selectedCountry = $state('');
	const filtered = $derived(
		selectedCountry
			? data.locations.filter((l) => l.country.id === selectedCountry)
			: data.locations
	);

	// ── Create ────────────────────────────────────────────────
	let createOpen = $state(false);

	const {
		form: createForm,
		errors: createErrors,
		enhance: createEnhance,
		submitting: createSubmitting,
		message: createMessage
	} = superForm(data.createForm, {
		validators: zod4Client(locationSchema),
		resetForm: true,
		onResult({ result }) {
			if (result.type === 'success') createOpen = false;
		}
	});

	let createMediaType = $derived(
		($createForm.mediaType ?? 'image') as 'image' | 'video_blob' | 'video_embed'
	);

	// ── Edit ─────────────────────────────────────────────────
	const updateSchema = locationSchema.extend({ id: z.string() });

	let editOpen = $state(false);
	let editLocationId = $state('');

	const {
		form: editForm,
		errors: editErrors,
		enhance: editEnhance,
		submitting: editSubmitting,
		message: editMessage
	} = superForm(data.createForm, {
		id: 'update-location',
		validators: zod4Client(updateSchema),
		resetForm: false,
		onResult({ result }) {
			if (result.type === 'success') { editOpen = false; confirmDelete = false; }
		}
	});

	let editMediaType = $derived(
		($editForm.mediaType ?? 'image') as 'image' | 'video_blob' | 'video_embed'
	);

	function openEdit(l: (typeof data.locations)[number]) {
		editLocationId = l.id;
		$editForm.name = l.name;
		$editForm.countryId = l.country.id;
		$editForm.description = l.description ?? '';
		$editForm.mediaUrl = l.mediaUrl ?? '';
		$editForm.mediaType = l.mediaType ?? undefined;
		confirmDelete = false;
		editOpen = true;
	}

	// ── Delete ────────────────────────────────────────────────
	const { enhance: deleteEnhance } = superForm(data.deleteForm, {
		id: 'delete-location',
		onResult({ result }) {
			if (result.type === 'success') { editOpen = false; confirmDelete = false; }
		}
	});

	let confirmDelete = $state(false);

	function deleteLocation() {
		(document.getElementById('delete-location-form') as HTMLFormElement)?.requestSubmit();
	}
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<p class="text-sm text-gray-500">
			{data.locations.length} location{data.locations.length !== 1 ? 's' : ''}
		</p>
		<Button variant="primary" onclick={() => (createOpen = true)}>
			<Plus class="h-4 w-4" /> Add Location
		</Button>
	</div>

	<!-- Filter -->
	<div class="flex items-center gap-3">
		<label for="filter-country" class="text-sm font-medium text-gray-700">Filter by country:</label>
		<select
			id="filter-country"
			bind:value={selectedCountry}
			class="rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
		>
			<option value="">All countries</option>
			{#each data.countries as c}
				<option value={c.id}>{c.name}</option>
			{/each}
		</select>
	</div>

	<div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
		<table class="w-full text-sm">
			<thead>
				<tr
					class="border-b border-gray-100 bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
				>
					<th class="px-6 py-3">Name</th>
					<th class="px-6 py-3">Country</th>
					<th class="px-6 py-3"></th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-100">
				{#each filtered as location}
					<tr class="hover:bg-gray-50">
						<td class="px-6 py-3 font-medium text-gray-900">{location.name}</td>
						<td class="px-6 py-3 text-gray-600">{location.country.name}</td>
						<td class="px-6 py-3 text-right">
							<Button variant="ghost" size="sm" onclick={() => openEdit(location)}>
								<Pencil class="h-3.5 w-3.5" /> Edit
							</Button>
						</td>
					</tr>
				{:else}
					<tr>
						<td colspan="3" class="px-6 py-8 text-center text-gray-400">No locations found</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<!-- ── Add Location Dialog ─────────────────────────────────── -->
<Dialog bind:open={createOpen} title="Add Location">
	{#if $createMessage?.success}
		<p class="mb-4 rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">
			{$createMessage.success}
		</p>
	{/if}
	<form method="POST" action="?/createLocation" use:createEnhance class="space-y-4">
		<Input
			name="name"
			label="Name"
			bind:value={$createForm.name}
			error={$createErrors.name}
			required
		/>
		<Select
			name="countryId"
			label="Country"
			bind:value={$createForm.countryId}
			error={$createErrors.countryId}
			required
		>
			<option value="">Select a country…</option>
			{#each data.countries as c}
				<option value={c.id}>{c.name}</option>
			{/each}
		</Select>
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
				{$createSubmitting ? 'Creating…' : 'Create Location'}
			</Button>
		</div>
	</form>
</Dialog>

<!-- ── Edit Location Dialog ────────────────────────────────── -->
<Dialog bind:open={editOpen} title="Edit Location">
	{#if $editMessage?.success}
		<p class="mb-4 rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">
			{$editMessage.success}
		</p>
	{/if}
	<form method="POST" action="?/updateLocation" use:editEnhance class="space-y-4">
		<input type="hidden" name="id" value={editLocationId} />
		<Input
			name="name"
			label="Name"
			bind:value={$editForm.name}
			error={$editErrors.name}
			required
		/>
		<Select
			name="countryId"
			label="Country"
			bind:value={$editForm.countryId}
			error={$editErrors.countryId}
			required
		>
			{#each data.countries as c}
				<option value={c.id}>{c.name}</option>
			{/each}
		</Select>
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
					<Button variant="danger" size="sm" onclick={() => deleteLocation()}>Yes, delete</Button>
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
	<form id="delete-location-form" method="POST" action="?/deleteLocation" use:deleteEnhance class="hidden">
		<input type="hidden" name="id" value={editLocationId} />
	</form>
</Dialog>
