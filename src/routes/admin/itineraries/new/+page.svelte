<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { z } from 'zod';
	import { X } from 'lucide-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const schema = z.object({
		title: z.string().min(3),
		summary: z.string().min(10),
		description: z.string().min(20),
		fixedPrice: z.coerce.number().positive().optional(),
		pricePerPerson: z.coerce.number().positive().optional(),
		currency: z.string().default('USD'),
		durationDays: z.coerce.number().int().min(1),
		bestSeasons: z.string().default(''),
		coverImage: z.string().optional(),
		images: z.string().default(''),
		published: z.boolean().default(false)
	});

	const { form, errors, enhance, submitting } = superForm(data.form, {
		validators: zod4Client(schema)
	});

	// Tag input for bestSeasons
	let seasonInput = $state('');
	let seasons = $state<string[]>([]);

	function addSeason() {
		const val = seasonInput.trim();
		if (val && !seasons.includes(val)) {
			seasons = [...seasons, val];
			$form.bestSeasons = seasons.join(',');
		}
		seasonInput = '';
	}

	function removeSeason(s: string) {
		seasons = seasons.filter((x) => x !== s);
		$form.bestSeasons = seasons.join(',');
	}

	function handleSeasonKeydown(e: KeyboardEvent) {
		if (e.key === 'Enter') {
			e.preventDefault();
			addSeason();
		}
	}
</script>

<div class="max-w-2xl">
	<div class="mb-6">
		<a href="/admin/itineraries" class="text-sm text-indigo-600 hover:underline">← Back to itineraries</a>
	</div>

	<div class="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
		<h2 class="mb-6 text-lg font-semibold text-gray-900">New Itinerary</h2>

		<form method="POST" action="?/createItinerary" use:enhance class="space-y-5">
			<div>
				<label for="title" class="block text-sm font-medium text-gray-700">Title</label>
				<input id="title" name="title" type="text" bind:value={$form.title}
					class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
				{#if $errors.title}<p class="mt-1 text-xs text-red-600">{$errors.title}</p>{/if}
			</div>

			<div>
				<label for="summary" class="block text-sm font-medium text-gray-700">Summary</label>
				<textarea id="summary" name="summary" rows="2" bind:value={$form.summary}
					class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
				{#if $errors.summary}<p class="mt-1 text-xs text-red-600">{$errors.summary}</p>{/if}
			</div>

			<div>
				<label for="description" class="block text-sm font-medium text-gray-700">Description</label>
				<textarea id="description" name="description" rows="5" bind:value={$form.description}
					class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
				{#if $errors.description}<p class="mt-1 text-xs text-red-600">{$errors.description}</p>{/if}
			</div>

			<div class="grid grid-cols-2 gap-5">
				<div>
					<label for="fixedPrice" class="block text-sm font-medium text-gray-700">Fixed Price <span class="text-gray-400">(overrides per-person)</span></label>
					<input id="fixedPrice" name="fixedPrice" type="number" min="0" step="0.01" bind:value={$form.fixedPrice}
						class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
				</div>
				<div>
					<label for="pricePerPerson" class="block text-sm font-medium text-gray-700">Price Per Person</label>
					<input id="pricePerPerson" name="pricePerPerson" type="number" min="0" step="0.01" bind:value={$form.pricePerPerson}
						class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
				</div>
			</div>

			<div class="grid grid-cols-2 gap-5">
				<div>
					<label for="currency" class="block text-sm font-medium text-gray-700">Currency</label>
					<select id="currency" name="currency" bind:value={$form.currency}
						class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
						{#each ['USD', 'EUR', 'GBP', 'UGX', 'KES', 'TZS'] as c}
							<option value={c}>{c}</option>
						{/each}
					</select>
				</div>
				<div>
					<label for="durationDays" class="block text-sm font-medium text-gray-700">Duration (days)</label>
					<input id="durationDays" name="durationDays" type="number" min="1" bind:value={$form.durationDays}
						class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
					{#if $errors.durationDays}<p class="mt-1 text-xs text-red-600">{$errors.durationDays}</p>{/if}
				</div>
			</div>

			<!-- Best seasons tag input -->
			<div>
				<label for="new-season-input" class="block text-sm font-medium text-gray-700">Best Seasons</label>
				<input type="hidden" name="bestSeasons" bind:value={$form.bestSeasons} />
				<div class="mt-1 flex flex-wrap gap-2 rounded-md border border-gray-300 p-2">
					{#each seasons as s}
						<span class="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">
							{s}
							<button type="button" onclick={() => removeSeason(s)} class="hover:text-indigo-900"><X class="h-3 w-3" /></button>
						</span>
					{/each}
					<input
						id="new-season-input"
						type="text"
						bind:value={seasonInput}
						onkeydown={handleSeasonKeydown}
						placeholder="Type season, press Enter…"
						class="min-w-32 border-0 p-0 text-sm focus:ring-0"
					/>
				</div>
			</div>

			<div>
				<label for="coverImage" class="block text-sm font-medium text-gray-700">Cover Image URL</label>
				<input id="coverImage" name="coverImage" type="url" bind:value={$form.coverImage}
					class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
			</div>

			<div>
				<label for="images" class="block text-sm font-medium text-gray-700">Gallery Image URLs <span class="text-gray-400">(one per line)</span></label>
				<textarea id="images" name="images" rows="4" bind:value={$form.images}
					placeholder="https://..."
					class="mt-1 block w-full rounded-md border-gray-300 font-mono text-xs shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
			</div>

			<div class="flex items-center gap-2">
				<input id="published" name="published" type="checkbox" bind:checked={$form.published}
					class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
				<label for="published" class="text-sm font-medium text-gray-700">Published</label>
			</div>

			<div class="pt-2">
				<button type="submit" disabled={$submitting}
					class="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50">
					{$submitting ? 'Creating…' : 'Create & Add Steps →'}
				</button>
			</div>
		</form>
	</div>
</div>
