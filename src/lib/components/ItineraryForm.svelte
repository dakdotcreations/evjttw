<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import type { SuperValidated, Infer } from 'sveltekit-superforms';
	import { X } from 'lucide-svelte';
	import { itinerarySchema } from '$lib/schemas/itinerary';
	import ImageUpload from '$lib/components/ImageUpload.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Textarea from '$lib/components/ui/Textarea.svelte';
	import Select from '$lib/components/ui/Select.svelte';

	let {
		formData,
		action,
		mode = 'create'
	}: {
		formData: SuperValidated<Infer<typeof itinerarySchema>>;
		action: string;
		mode?: 'create' | 'update';
	} = $props();

	const { form, errors, enhance, submitting, message } = superForm(formData, {
		validators: zod4Client(itinerarySchema)
	});

	// Tag input for bestSeasons
	let seasonInput = $state('');
	let seasons = $state<string[]>(
		$form.bestSeasons ? $form.bestSeasons.split(',').map((s) => s.trim()).filter(Boolean) : []
	);

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

{#if ($message as { success?: string } | undefined)?.success}
	<div class="mb-5 rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">
		{($message as { success: string }).success}
	</div>
{/if}

<form method="POST" {action} use:enhance enctype="multipart/form-data" class="space-y-6">

	<!-- Cover Image -->
	<ImageUpload
		name="coverImage"
		label="Cover Image"
		bind:value={$form.coverImage}
	/>

	<hr class="border-gray-100" />

	<Input
		id="itin-title"
		name="title"
		label="Tour Title"
		hint="The name customers will see when browsing tours."
		placeholder="e.g. 7-Day Gorilla Trekking Adventure"
		bind:value={$form.title}
		error={$errors.title}
		required
	/>

	<Textarea
		id="itin-summary"
		name="summary"
		label="Short Summary"
		hint="One or two sentences shown on tour cards and search results."
		placeholder="e.g. Trek through Bwindi Impenetrable Forest and encounter endangered mountain gorillas up close."
		rows={2}
		bind:value={$form.summary}
		error={$errors.summary}
	/>

	<Textarea
		id="itin-description"
		name="description"
		label="Full Description"
		hint="Detailed description shown on the tour's full page."
		placeholder="Describe the experience, highlights, inclusions, and what makes this tour special…"
		rows={6}
		bind:value={$form.description}
		error={$errors.description}
	/>

	<hr class="border-gray-100" />

	<!-- Pricing -->
	<div>
		<h3 class="mb-1 text-sm font-semibold text-gray-800">Pricing</h3>
		<p class="mb-4 text-xs text-gray-400">Set a fixed group price OR a per-person price. Fixed price takes precedence. Leave both empty to show "Price on request".</p>

		<div class="mb-4 flex items-start gap-3">
			<input
				id="itin-pricingDisabled"
				name="pricingDisabled"
				type="checkbox"
				bind:checked={$form.pricingDisabled}
				class="mt-0.5 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
			/>
			<div>
				<label for="itin-pricingDisabled" class="block text-sm font-medium text-gray-700">Price on booking</label>
				<p class="text-xs text-gray-400">When enabled, no price is shown. Customers will see "Price on booking" instead.</p>
			</div>
		</div>

		{#if !$form.pricingDisabled}
		<div class="grid grid-cols-2 gap-5">
			<Input
				id="itin-fixedPrice"
				name="fixedPrice"
				label="Fixed Group Price"
				hint="Total price for the whole group, regardless of size."
				type="number"
				min={0}
				step="0.01"
				placeholder="e.g. 2500"
				bind:value={$form.fixedPrice}
			/>
			<Input
				id="itin-pricePerPerson"
				name="pricePerPerson"
				label="Price Per Person"
				hint="Price multiplied by traveller count."
				type="number"
				min={0}
				step="0.01"
				placeholder="e.g. 850"
				bind:value={$form.pricePerPerson}
			/>
		</div>
		{/if}
	</div>

	<div class="grid grid-cols-2 gap-5">
		<Select
			id="itin-currency"
			name="currency"
			label="Currency"
			hint="Currency used for the prices above."
			bind:value={$form.currency}
		>
			{#each ['USD', 'EUR', 'GBP', 'UGX', 'KES', 'TZS'] as c}
				<option value={c}>{c}</option>
			{/each}
		</Select>
		<Input
			id="itin-durationDays"
			name="durationDays"
			label="Duration (days)"
			hint="Total number of days including travel days."
			type="number"
			min={1}
			placeholder="e.g. 7"
			bind:value={$form.durationDays}
			error={$errors.durationDays}
			required
		/>
	</div>

	<hr class="border-gray-100" />

	<!-- Best seasons tag input -->
	<div>
		<label for="itin-season-input" class="block text-sm font-medium text-gray-700">
			Best Seasons to Visit
		</label>
		<p class="mb-1 text-xs text-gray-400">Add the months or seasons when this tour is best experienced. Press Enter after each one.</p>
		<input type="hidden" name="bestSeasons" bind:value={$form.bestSeasons} />
		<div class="flex flex-wrap gap-2 rounded-md border border-gray-300 p-2">
			{#each seasons as s}
				<span
					class="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700"
				>
					{s}
					<button type="button" onclick={() => removeSeason(s)} class="hover:text-indigo-900">
						<X class="h-3 w-3" />
					</button>
				</span>
			{/each}
			<input
				id="itin-season-input"
				type="text"
				bind:value={seasonInput}
				onkeydown={handleSeasonKeydown}
				placeholder="e.g. June, Dry Season…"
				class="min-w-32 border-0 p-0 text-sm focus:ring-0"
			/>
		</div>
	</div>

	<hr class="border-gray-100" />

	<div class="flex items-start gap-3">
		<input
			id="itin-published"
			name="published"
			type="checkbox"
			bind:checked={$form.published}
			class="mt-0.5 h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
		/>
		<div>
			<label for="itin-published" class="block text-sm font-medium text-gray-700">Publish this tour</label>
			<p class="text-xs text-gray-400">When enabled, this tour will be visible to the public on the website.</p>
		</div>
	</div>

	<div class="pt-2">
		<button
			type="submit"
			disabled={$submitting}
			class="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
		>
			{#if $submitting}
				{mode === 'create' ? 'Creating…' : 'Saving…'}
			{:else}
				{mode === 'create' ? 'Create & Add Steps →' : 'Save Changes'}
			{/if}
		</button>
	</div>
</form>
