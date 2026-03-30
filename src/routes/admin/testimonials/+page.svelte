<script lang="ts">
	import { enhance } from '$app/forms';
	import { Star } from 'lucide-svelte';
	import { format } from 'date-fns';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	type Tab = 'all' | 'pending' | 'published';
	let activeTab = $state<Tab>('all');

	const filtered = $derived(
		data.testimonials.filter((t) => {
			if (activeTab === 'pending') return !t.published;
			if (activeTab === 'published') return t.published;
			return true;
		})
	);

	let confirmDeleteId = $state<string | null>(null);
</script>

<div class="space-y-6">
	<!-- Tabs -->
	<div class="flex gap-1 border-b border-gray-200">
		{#each (['all', 'pending', 'published'] as Tab[]) as tab}
			<button type="button"
				onclick={() => (activeTab = tab)}
				class="px-4 py-2 text-sm font-medium capitalize {activeTab === tab
					? 'border-b-2 border-indigo-600 text-indigo-600'
					: 'text-gray-500 hover:text-gray-700'}">
				{tab}
				{#if tab === 'pending'}
					<span class="ml-1.5 rounded-full bg-yellow-100 px-1.5 py-0.5 text-xs text-yellow-700">
						{data.testimonials.filter((t) => !t.published).length}
					</span>
				{/if}
			</button>
		{/each}
	</div>

	{#if filtered.length === 0}
		<div class="rounded-xl border-2 border-dashed border-gray-200 py-16 text-center">
			<p class="text-sm text-gray-500">No testimonials here.</p>
		</div>
	{:else}
		<div class="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
			<table class="w-full text-sm">
				<thead class="bg-gray-50 text-xs font-medium uppercase text-gray-500 tracking-wide">
					<tr>
						<th class="px-4 py-3 text-left">Client</th>
						<th class="px-4 py-3 text-left">Rating</th>
						<th class="px-4 py-3 text-left">Quote</th>
						<th class="px-4 py-3 text-left">Status</th>
						<th class="px-4 py-3 text-left">Date</th>
						<th class="px-4 py-3 text-right">Actions</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-100">
					{#each filtered as t}
						<tr class="hover:bg-gray-50">
							<td class="px-4 py-3">
								<p class="font-medium text-gray-900">{t.clientName}</p>
								{#if t.country}<p class="text-xs text-gray-500">{t.country}</p>{/if}
							</td>
							<td class="px-4 py-3">
								<div class="flex gap-0.5">
									{#each Array(5) as _, i}
										<Star class="h-3.5 w-3.5 {i < t.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}" />
									{/each}
								</div>
							</td>
							<td class="px-4 py-3 max-w-xs">
								<p class="line-clamp-2 text-gray-700">"{t.quote}"</p>
							</td>
							<td class="px-4 py-3">
								{#if t.published}
									<span class="inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700">Published</span>
								{:else}
									<span class="inline-flex rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700">Pending</span>
								{/if}
							</td>
							<td class="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
								{format(new Date(t.createdAt), 'dd MMM yyyy')}
							</td>
							<td class="px-4 py-3 text-right space-x-2">
								{#if !t.published}
									<form method="POST" action="?/approve" use:enhance class="inline">
										<input type="hidden" name="id" value={t.id} />
										<button type="submit" class="text-xs font-medium text-green-600 hover:text-green-800">Approve</button>
									</form>
								{:else}
									<form method="POST" action="?/unpublish" use:enhance class="inline">
										<input type="hidden" name="id" value={t.id} />
										<button type="submit" class="text-xs font-medium text-gray-500 hover:text-gray-700">Unpublish</button>
									</form>
								{/if}
								{#if confirmDeleteId === t.id}
									<form method="POST" action="?/delete" use:enhance class="inline-flex items-center gap-2">
										<input type="hidden" name="id" value={t.id} />
										<button type="submit" class="text-xs font-medium text-red-600 hover:text-red-800">Confirm</button>
										<button type="button" onclick={() => (confirmDeleteId = null)} class="text-xs text-gray-500">Cancel</button>
									</form>
								{:else}
									<button type="button" onclick={() => (confirmDeleteId = t.id)}
										class="text-xs font-medium text-red-500 hover:text-red-700">Delete</button>
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
