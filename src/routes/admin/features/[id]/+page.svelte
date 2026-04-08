<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { z } from 'zod';
	import { dndzone, type DndEvent } from 'svelte-dnd-action';
	import { GripVertical, X, Trash2 } from 'lucide-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	type FeatureItem = (typeof data.feature.items)[number];

	// ── Update feature form ──────────────────────────────────────────────────
	const updateSchema = z.object({
		displayName: z.string().optional(),
		isActive: z.boolean().default(true)
	});
	const { form: updateForm, errors: updateErrors, enhance: updateEnhance, submitting: updateSubmitting, message: updateMessage } = superForm(data.updateForm, {
		validators: zod4Client(updateSchema)
	});

	// ── Add item form ─────────────────────────────────────────────────────────
	const addSchema = z.object({ itineraryId: z.string().min(1) });
	const { form: addForm, errors: addErrors, enhance: addEnhance, submitting: addSubmitting, message: addMessage } = superForm(data.addItemForm, {
		validators: zod4Client(addSchema)
	});

	// ── Remove / reorder ──────────────────────────────────────────────────────
	const { enhance: removeEnhance } = superForm(data.removeItemForm);
	const { form: reorderItemsForm, enhance: reorderItemsEnhance, submit: reorderItemsSubmit } = superForm(data.reorderItemsForm, { id: 'reorder-items' });

	// ── DnD ───────────────────────────────────────────────────────────────────
	let items = $state<FeatureItem[]>(data.feature.items);

	function handleItemConsider(e: CustomEvent<DndEvent<FeatureItem>>) {
		items = e.detail.items;
	}
	function handleItemFinalize(e: CustomEvent<DndEvent<FeatureItem>>) {
		items = e.detail.items;
		$reorderItemsForm.order = items.map((i) => i.id).join(',');
		reorderItemsSubmit();
	}

	// ── UI state ──────────────────────────────────────────────────────────────
	let confirmDeleteFeature = $state(false);

	const subjectName = $derived(
		data.feature.displayName ??
		(data.feature.country ? data.feature.country.name : data.feature.location?.name ?? '—')
	);

	// itineraries already added
	const addedIds = $derived(new Set(items.map((i) => i.itineraryId)));
	const availableToAdd = $derived(data.itineraries.filter((it) => !addedIds.has(it.id)));
</script>

<div class="space-y-8 max-w-2xl">
	<a href="/admin/features" class="text-sm text-indigo-600 hover:underline">← Back to features</a>

	{#if $updateMessage?.success}
		<div class="rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">{$updateMessage.success}</div>
	{/if}

	<!-- Section A: Feature Settings -->
	<div class="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
		<h2 class="mb-1 text-lg font-semibold text-gray-900">{subjectName}</h2>
		<p class="mb-6 text-sm text-gray-500">
			{data.feature.country ? '🌍 Country feature' : '📍 Location feature'}
		</p>

		<form method="POST" action="?/updateFeature" use:updateEnhance class="space-y-5">
			<div>
				<label for="displayName" class="block text-sm font-medium text-gray-700">Display Name <span class="text-gray-400">(optional)</span></label>
				<input id="displayName" name="displayName" type="text" bind:value={$updateForm.displayName}
					class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
			</div>
			<div class="flex items-center gap-2">
				<input id="isActive" name="isActive" type="checkbox" bind:checked={$updateForm.isActive}
					class="h-4 w-4 rounded border-gray-300 text-indigo-600" />
				<label for="isActive" class="text-sm font-medium text-gray-700">Active (visible on homepage)</label>
			</div>
			{#if $updateErrors.isActive}<p class="text-xs text-red-600">{$updateErrors.isActive}</p>{/if}
			<button type="submit" disabled={$updateSubmitting}
				class="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50">
				{$updateSubmitting ? 'Saving…' : 'Save'}
			</button>
		</form>
	</div>

	<!-- Section B: Itineraries -->
	<div class="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
		<h2 class="mb-1 text-lg font-semibold text-gray-900">
			Itineraries
			<span class="ml-2 text-sm font-normal text-gray-400">{items.length} / 4</span>
		</h2>
		<p class="mb-6 text-sm text-gray-500">Drag to reorder. Between 1 and 4 itineraries.</p>

		<!-- Hidden reorder form -->
		<form method="POST" action="?/updateFeatureItemOrder" use:reorderItemsEnhance class="hidden">
			<input type="hidden" name="order" bind:value={$reorderItemsForm.order} />
		</form>

		{#if items.length > 0}
			<ul
				use:dndzone={{ items, flipDurationMs: 150 }}
				onconsider={handleItemConsider}
				onfinalize={handleItemFinalize}
				class="mb-6 space-y-2">
				{#each items as item (item.id)}
					<li class="flex items-center gap-3 rounded-lg border border-gray-200 px-4 py-3">
						<GripVertical class="h-4 w-4 shrink-0 text-gray-400 cursor-grab" />
						<span class="flex-1 text-sm font-medium text-gray-800">{item.itinerary.title}</span>
						{#if !item.itinerary.published}
							<span class="rounded-full bg-yellow-100 px-2 py-0.5 text-xs text-yellow-700">Draft</span>
						{/if}
						<form method="POST" action="?/removeFeatureItem" use:removeEnhance class="inline">
							<input type="hidden" name="itemId" value={item.id} />
							<button type="submit" class="text-red-400 hover:text-red-600">
								<X class="h-4 w-4" />
							</button>
						</form>
					</li>
				{/each}
			</ul>
		{/if}

		{#if $addMessage?.success}
			<p class="mb-3 text-xs text-green-700">{$addMessage.success}</p>
		{/if}

		{#if items.length < 4}
			<form method="POST" action="?/addFeatureItem" use:addEnhance class="flex gap-3">
				<select name="itineraryId" bind:value={$addForm.itineraryId}
					class="flex-1 rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
					<option value="">Select itinerary…</option>
					{#each availableToAdd as it}
						<option value={it.id}>{it.title}</option>
					{/each}
				</select>
				<button type="submit" disabled={$addSubmitting}
					class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50">
					{$addSubmitting ? '…' : 'Add'}
				</button>
			</form>
			{#if $addErrors.itineraryId}<p class="mt-1 text-xs text-red-600">{$addErrors.itineraryId}</p>{/if}
		{:else}
			<p class="text-sm text-gray-400 italic">Maximum 4 itineraries reached.</p>
		{/if}
	</div>

	<!-- Danger Zone -->
	<div class="rounded-xl border border-red-100 bg-red-50 p-6">
		<h3 class="mb-2 font-semibold text-red-800">Danger Zone</h3>
		{#if confirmDeleteFeature}
			<p class="mb-3 text-sm text-red-700">Delete this feature? This cannot be undone.</p>
			<form method="POST" action="?/deleteFeature" class="flex gap-3">
				<button type="submit" class="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
					Yes, delete
				</button>
				<button type="button" onclick={() => (confirmDeleteFeature = false)}
					class="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100">
					Cancel
				</button>
			</form>
		{:else}
			<button type="button" onclick={() => (confirmDeleteFeature = true)}
				class="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
				<Trash2 class="h-4 w-4" /> Delete Feature
			</button>
		{/if}
	</div>
</div>
