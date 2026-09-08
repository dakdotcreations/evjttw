<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { z } from 'zod';
	import { Plus, Megaphone } from 'lucide-svelte';
	import type { PageData } from './$types';
	import Dialog from '$lib/components/ui/Dialog.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	let { data }: { data: PageData } = $props();

	let search = $state('');
	let tab = $state<'all' | 'published' | 'draft'>('all');
	let selected = $state<Set<string>>(new Set());
	let bulkOpen = $state(false);

	const filtered = $derived(
		data.rows.filter((r) => {
			const matchesSearch = r.title.toLowerCase().includes(search.toLowerCase());
			const matchesTab =
				tab === 'all' || (tab === 'published' ? r.published : !r.published);
			return matchesSearch && matchesTab;
		})
	);

	function formatPrice(row: (typeof data.rows)[number]) {
		if (row.fixedPrice != null) return `${row.currency} ${row.fixedPrice.toLocaleString()}`;
		if (row.pricePerPerson != null) return `${row.currency} ${row.pricePerPerson.toLocaleString()}/pp`;
		return 'Price on request';
	}

	function toggleRow(id: string) {
		const next = new Set(selected);
		if (next.has(id)) next.delete(id);
		else next.add(id);
		selected = next;
	}

	function toggleAll() {
		selected =
			selected.size === filtered.length ? new Set() : new Set(filtered.map((r) => r.id));
	}

	const bulkAddSchema = z.object({
		itineraryIds: z.string().min(1),
		code: z
			.string()
			.min(1, 'Campaign code is required')
			.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Lowercase letters, numbers, and hyphens only'),
		name: z.string().optional()
	});

	const {
		form: bulkForm,
		errors: bulkErrors,
		enhance: bulkEnhance,
		submitting: bulkSubmitting,
		message: bulkMessage
	} = superForm(data.bulkAddForm, {
		id: 'bulk-add-campaign',
		validators: zod4Client(bulkAddSchema),
		resetForm: true,
		onResult({ result }) {
			if (result.type === 'success') {
				bulkOpen = false;
				selected = new Set();
			}
		}
	});

	function openBulkAdd() {
		$bulkForm.itineraryIds = [...selected].join(',');
		bulkOpen = true;
	}
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<p class="text-sm text-gray-500">{data.rows.length} itinerar{data.rows.length !== 1 ? 'ies' : 'y'}</p>
		<a
			href="/admin/itineraries/new"
			class="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
		>
			<Plus class="h-4 w-4" /> New Itinerary
		</a>
	</div>

	<!-- Filter bar -->
	<div class="flex flex-wrap items-center gap-4">
		<input
			type="search"
			bind:value={search}
			placeholder="Search by title…"
			class="w-64 rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
		/>
		<div class="flex rounded-lg border border-gray-200 bg-white text-sm">
			{#each (['all', 'published', 'draft'] as const) as t}
				<button
					type="button"
					onclick={() => (tab = t)}
					class="px-4 py-2 font-medium capitalize first:rounded-l-lg last:rounded-r-lg {tab === t
						? 'bg-indigo-600 text-white'
						: 'text-gray-600 hover:bg-gray-50'}"
				>{t}</button>
			{/each}
		</div>
	</div>

	<!-- Bulk actions bar -->
	{#if selected.size > 0}
		<div class="flex items-center justify-between rounded-lg border border-indigo-200 bg-indigo-50 px-4 py-2.5">
			<p class="text-sm font-medium text-indigo-800">{selected.size} selected</p>
			<button
				type="button"
				onclick={openBulkAdd}
				class="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-indigo-700"
			>
				<Megaphone class="h-3.5 w-3.5" /> Add to Campaign
			</button>
		</div>
	{/if}

	<div class="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
		<table class="w-full text-sm">
			<thead>
				<tr class="border-b border-gray-100 bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
					<th class="w-10 px-6 py-3">
						<input
							type="checkbox"
							checked={filtered.length > 0 && selected.size === filtered.length}
							onchange={toggleAll}
							class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
						/>
					</th>
					<th class="px-6 py-3">Title</th>
					<th class="px-6 py-3">Countries</th>
					<th class="px-6 py-3">Campaigns</th>
					<th class="px-6 py-3">Days</th>
					<th class="px-6 py-3">Price</th>
					<th class="px-6 py-3">Enquiries</th>
					<th class="px-6 py-3">Status</th>
					<th class="px-6 py-3"></th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-100">
				{#each filtered as row}
					<tr class="hover:bg-gray-50">
						<td class="px-6 py-3">
							<input
								type="checkbox"
								checked={selected.has(row.id)}
								onchange={() => toggleRow(row.id)}
								class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
							/>
						</td>
						<td class="px-6 py-3 font-medium text-gray-900">{row.title}</td>
						<td class="px-6 py-3 text-gray-600 text-xs">{row.countries.join(', ') || '-'}</td>
						<td class="px-6 py-3 text-xs text-gray-600">{row.campaigns.join(', ') || '-'}</td>
						<td class="px-6 py-3 text-gray-600">{row.durationDays}d</td>
						<td class="px-6 py-3 text-gray-600 whitespace-nowrap">{formatPrice(row)}</td>
						<td class="px-6 py-3 text-gray-600">{row.enquiryCount}</td>
						<td class="px-6 py-3">
							{#if row.published}
								<span class="rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">Published</span>
							{:else}
								<span class="rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">Draft</span>
							{/if}
						</td>
						<td class="px-6 py-3 text-right">
							<a href="/admin/itineraries/{row.id}" class="text-xs font-medium text-indigo-600 hover:text-indigo-800">Edit</a>
						</td>
					</tr>
				{:else}
					<tr>
						<td colspan="8" class="px-6 py-8 text-center text-gray-400">No itineraries found</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<!-- Bulk add-to-campaign dialog -->
<Dialog bind:open={bulkOpen} title="Add {selected.size} Itineraries to a Campaign">
	{#if $bulkMessage?.success}
		<p class="mb-4 rounded-lg bg-green-50 px-4 py-2 text-sm text-green-700">{$bulkMessage.success}</p>
	{/if}
	<form method="POST" action="?/bulkAddToCampaign" use:bulkEnhance class="space-y-4">
		<input type="hidden" name="itineraryIds" bind:value={$bulkForm.itineraryIds} />

		<div>
			<label for="bulk-campaign-code" class="block text-sm font-medium text-gray-700">
				Campaign Code
			</label>
			<p class="mb-1 text-xs text-gray-400">
				Pick an existing code or type a new one to create a campaign.
			</p>
			<input
				id="bulk-campaign-code"
				name="code"
				list="existing-campaigns"
				bind:value={$bulkForm.code}
				placeholder="e.g. gorilla-big5"
				class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
			/>
			<datalist id="existing-campaigns">
				{#each data.allCampaigns as c (c.code)}
					<option value={c.code}>{c.name}</option>
				{/each}
			</datalist>
			{#if $bulkErrors.code}<p class="mt-1 text-xs text-red-600">{$bulkErrors.code[0]}</p>{/if}
		</div>

		<div>
			<label for="bulk-campaign-name" class="block text-sm font-medium text-gray-700">
				Campaign Name
			</label>
			<p class="mb-1 text-xs text-gray-400">Only used when creating a brand new campaign.</p>
			<input
				id="bulk-campaign-name"
				name="name"
				bind:value={$bulkForm.name}
				placeholder="e.g. Gorilla & Big 5 Safari"
				class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
			/>
		</div>

		<div class="flex justify-end gap-3 pt-2">
			<Button variant="ghost" onclick={() => (bulkOpen = false)}>Cancel</Button>
			<Button type="submit" variant="primary" disabled={$bulkSubmitting}>
				{$bulkSubmitting ? 'Adding…' : 'Add to Campaign'}
			</Button>
		</div>
	</form>
</Dialog>

