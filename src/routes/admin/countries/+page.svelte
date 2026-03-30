<script lang="ts">
	import { Plus, Pencil, Trash2 } from 'lucide-svelte';
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { z } from 'zod';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<p class="text-sm text-gray-500">{data.countries.length} countr{data.countries.length !== 1 ? 'ies' : 'y'}</p>
		<a
			href="/admin/countries/new"
			class="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
		>
			<Plus class="h-4 w-4" /> New Country
		</a>
	</div>

	<div class="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
		<table class="w-full text-sm">
			<thead>
				<tr class="border-b border-gray-100 bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
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
							<span class="rounded bg-gray-100 px-2 py-0.5 font-mono text-xs text-gray-600">{country.code}</span>
						</td>
						<td class="px-6 py-3 text-gray-600">{country._count.locations}</td>
						<td class="px-6 py-3 text-right">
							<a href="/admin/countries/{country.id}" class="inline-flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-800">
								<Pencil class="h-3.5 w-3.5" /> Edit
							</a>
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
