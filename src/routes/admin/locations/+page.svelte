<script lang="ts">
	import { Plus, Pencil } from 'lucide-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	let selectedCountry = $state('');

	const filtered = $derived(
		selectedCountry
			? data.locations.filter((l) => l.country.id === selectedCountry)
			: data.locations
	);
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<p class="text-sm text-gray-500">{data.locations.length} location{data.locations.length !== 1 ? 's' : ''}</p>
		<a
			href="/admin/locations/new"
			class="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
		>
			<Plus class="h-4 w-4" /> New Location
		</a>
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

	<div class="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
		<table class="w-full text-sm">
			<thead>
				<tr class="border-b border-gray-100 bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
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
							<a href="/admin/locations/{location.id}" class="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-800">
								<Pencil class="h-3.5 w-3.5" /> Edit
							</a>
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
