<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { dndzone, type DndEvent } from 'svelte-dnd-action';
	import { GripVertical, Pencil, Trash2, ToggleLeft, ToggleRight, Plus } from 'lucide-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	type FeatureRow = (typeof data.features)[number];

	let items = $state<FeatureRow[]>(data.features);
	let confirmDeleteId = $state<string | null>(null);

	// Reorder form
	const { form: reorderForm, enhance: reorderEnhance, submit: reorderSubmit } = superForm(
		data.reorderForm,
		{ id: 'reorder' }
	);

	async function handleDndConsider(e: CustomEvent<DndEvent<FeatureRow>>) {
		items = e.detail.items;
	}
	async function handleDndFinalize(e: CustomEvent<DndEvent<FeatureRow>>) {
		items = e.detail.items;
		$reorderForm.order = items.map((i) => i.id).join(',');
		reorderSubmit();
	}
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<p class="text-sm text-gray-500">Drag rows to reorder. Max 6 active features.</p>
		<a href="/admin/features/new"
			class="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
			<Plus class="h-4 w-4" /> New Feature
		</a>
	</div>

	<!-- Hidden reorder form -->
	<form method="POST" action="?/updateFeatureOrder" use:reorderEnhance class="hidden">
		<input type="hidden" name="order" bind:value={$reorderForm.order} />
	</form>

	{#if items.length === 0}
		<div class="rounded-xl border-2 border-dashed border-gray-200 py-16 text-center">
			<p class="text-sm text-gray-500">No features yet. Create one to feature destinations on the homepage.</p>
		</div>
	{:else}
		<div class="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
			<table class="w-full text-sm">
				<thead class="bg-gray-50 text-xs font-medium uppercase text-gray-500 tracking-wide">
					<tr>
						<th class="px-4 py-3 text-left w-8"></th>
						<th class="px-4 py-3 text-left">Name</th>
						<th class="px-4 py-3 text-left">Subject</th>
						<th class="px-4 py-3 text-left">Items</th>
						<th class="px-4 py-3 text-left">Status</th>
						<th class="px-4 py-3 text-right">Actions</th>
					</tr>
				</thead>
				<tbody
					use:dndzone={{ items, flipDurationMs: 150 }}
					onconsider={handleDndConsider}
					onfinalize={handleDndFinalize}
					class="divide-y divide-gray-100">
					{#each items as feature (feature.id)}
						<tr class="hover:bg-gray-50 transition-colors">
							<td class="px-4 py-3 text-gray-400 cursor-grab">
								<GripVertical class="h-4 w-4" />
							</td>
							<td class="px-4 py-3 font-medium text-gray-900">
								{feature.displayName ?? (feature.country?.name ?? feature.location?.name ?? '—')}
							</td>
							<td class="px-4 py-3">
								{#if feature.country}
									<span class="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
										Country · {feature.country.name}
									</span>
								{:else if feature.location}
									<span class="inline-flex items-center rounded-full bg-purple-100 px-2 py-0.5 text-xs font-medium text-purple-700">
										Location · {feature.location.name}
									</span>
								{:else}
									<span class="text-gray-400">—</span>
								{/if}
							</td>
							<td class="px-4 py-3 text-gray-600">{feature._count.items} / 4</td>
							<td class="px-4 py-3">
								<form method="POST" action="?/toggleActive">
									<input type="hidden" name="id" value={feature.id} />
									<input type="hidden" name="isActive" value={feature.isActive} />
									<button type="submit" class="inline-flex items-center gap-1 text-xs font-medium {feature.isActive ? 'text-green-600' : 'text-gray-400'}">
										{#if feature.isActive}
											<ToggleRight class="h-4 w-4" /> Active
										{:else}
											<ToggleLeft class="h-4 w-4" /> Inactive
										{/if}
									</button>
								</form>
							</td>
							<td class="px-4 py-3 text-right space-x-3">
								<a href="/admin/features/{feature.id}" class="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-800">
									<Pencil class="h-3.5 w-3.5" /> Edit
								</a>
								{#if confirmDeleteId === feature.id}
									<form method="POST" action="?/deleteFeature" class="inline-flex items-center gap-2">
										<input type="hidden" name="id" value={feature.id} />
										<button type="submit" class="text-xs font-medium text-red-600 hover:text-red-800">Confirm</button>
										<button type="button" onclick={() => (confirmDeleteId = null)} class="text-xs text-gray-500">Cancel</button>
									</form>
								{:else}
									<button type="button" onclick={() => (confirmDeleteId = feature.id)}
										class="inline-flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-700">
										<Trash2 class="h-3.5 w-3.5" />
									</button>
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
