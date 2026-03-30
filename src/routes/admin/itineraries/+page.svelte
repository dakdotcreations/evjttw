<script lang="ts">
	import { Plus } from 'lucide-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let search = $state('');
	let tab = $state<'all' | 'published' | 'draft'>('all');

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

	<div class="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
		<table class="w-full text-sm">
			<thead>
				<tr class="border-b border-gray-100 bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
					<th class="px-6 py-3">Title</th>
					<th class="px-6 py-3">Countries</th>
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
						<td class="px-6 py-3 font-medium text-gray-900">{row.title}</td>
						<td class="px-6 py-3 text-gray-600 text-xs">{row.countries.join(', ') || '—'}</td>
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
						<td colspan="7" class="px-6 py-8 text-center text-gray-400">No itineraries found</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
