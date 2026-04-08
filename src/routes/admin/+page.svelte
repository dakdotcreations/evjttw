<script lang="ts">
	import type { PageData } from './$types';
	import { BarChart2, BookOpen, Clock, Zap } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();

	const stats = $derived([
		{ label: 'Total Itineraries', value: data.itineraryCount, icon: BookOpen, color: 'bg-indigo-50 text-indigo-600' },
		{ label: 'Total Enquiries', value: data.enquiryCount, icon: BarChart2, color: 'bg-emerald-50 text-emerald-600' },
		{ label: 'Pending Testimonials', value: data.pendingTestimonialCount, icon: Clock, color: 'bg-amber-50 text-amber-600' },
		{ label: 'Active Features', value: data.activeFeatureCount, icon: Zap, color: 'bg-sky-50 text-sky-600' }
	]);
</script>

<!-- Stat cards -->
<div class="grid grid-cols-2 gap-6 xl:grid-cols-4">
	{#each stats as stat}
		<div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
			<div class="flex items-center justify-between">
				<p class="text-sm font-medium text-gray-500">{stat.label}</p>
				<div class="rounded-lg p-2 {stat.color}">
					<stat.icon class="h-5 w-5" />
				</div>
			</div>
			<p class="mt-3 text-3xl font-bold text-gray-900">{stat.value}</p>
		</div>
	{/each}
</div>

<!-- Tables -->
<div class="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
	<!-- Most booked -->
	<div class="rounded-xl border border-gray-200 bg-white shadow-sm">
		<div class="border-b border-gray-100 px-6 py-4">
			<h2 class="font-semibold text-gray-900">Most Booked Itineraries</h2>
		</div>
		<table class="w-full text-sm">
			<thead>
				<tr class="border-b border-gray-100 bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
					<th class="px-6 py-3">Itinerary</th>
					<th class="px-6 py-3 text-right">Enquiries</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-100">
				{#each data.topItineraries as item}
					<tr class="hover:bg-gray-50">
						<td class="px-6 py-3">
							<a href="/admin/itineraries/{item.id}" class="font-medium text-indigo-600 hover:underline"
								>{item.title}</a
							>
						</td>
						<td class="px-6 py-3 text-right font-medium text-gray-900">{item._count.enquiries}</td>
					</tr>
				{:else}
					<tr>
						<td colspan="2" class="px-6 py-6 text-center text-gray-400">No data yet</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>

	<!-- Least booked -->
	<div class="rounded-xl border border-gray-200 bg-white shadow-sm">
		<div class="border-b border-gray-100 px-6 py-4">
			<h2 class="font-semibold text-gray-900">Least Booked Itineraries</h2>
		</div>
		<table class="w-full text-sm">
			<thead>
				<tr class="border-b border-gray-100 bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
					<th class="px-6 py-3">Itinerary</th>
					<th class="px-6 py-3 text-right">Enquiries</th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-100">
				{#each data.bottomItineraries as item}
					<tr class="hover:bg-gray-50">
						<td class="px-6 py-3">
							<a href="/admin/itineraries/{item.id}" class="font-medium text-indigo-600 hover:underline"
								>{item.title}</a
							>
						</td>
						<td class="px-6 py-3 text-right font-medium text-gray-900">{item._count.enquiries}</td>
					</tr>
				{:else}
					<tr>
						<td colspan="2" class="px-6 py-6 text-center text-gray-400">No published itineraries yet</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>
