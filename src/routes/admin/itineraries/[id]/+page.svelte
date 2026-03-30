<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { z } from 'zod';
	import { X, Trash2, ChevronDown, ChevronUp } from 'lucide-svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	// ── Itinerary update form ──────────────────────────────────────────────────
	const itinSchema = z.object({
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

	const {
		form: itinForm,
		errors: itinErrors,
		enhance: itinEnhance,
		submitting: itinSubmitting,
		message: itinMessage
	} = superForm(data.itineraryForm, { validators: zod4Client(itinSchema) });

	// Tag input
	let seasonInput = $state('');
	let seasons = $state<string[]>(
		data.itinerary.bestSeasons
	);
	function addSeason() {
		const val = seasonInput.trim();
		if (val && !seasons.includes(val)) {
			seasons = [...seasons, val];
			$itinForm.bestSeasons = seasons.join(',');
		}
		seasonInput = '';
	}
	function removeSeason(s: string) {
		seasons = seasons.filter((x) => x !== s);
		$itinForm.bestSeasons = seasons.join(',');
	}

	// ── Add step form ─────────────────────────────────────────────────────────
	const stepSchema = z.object({
		stepNumber: z.coerce.number().int().min(1),
		title: z.string().min(1),
		description: z.string().min(1),
		highlight: z.string().optional(),
		durationText: z.string().min(1),
		durationMinutes: z.coerce.number().int().positive().optional(),
		locationId: z.string().min(1),
		images: z.string().default('')
	});

	const {
		form: addStepForm,
		errors: addStepErrors,
		enhance: addStepEnhance,
		submitting: addStepSubmitting,
		message: addStepMessage
	} = superForm(data.addStepForm, { validators: zod4Client(stepSchema), resetForm: true });

	// ── Update step form ──────────────────────────────────────────────────────
	const updateStepSchema = stepSchema.extend({ id: z.string() });
	const {
		form: updateStepForm,
		errors: updateStepErrors,
		enhance: updateStepEnhance,
		submitting: updateStepSubmitting
	} = superForm(data.updateStepForm, { validators: zod4Client(updateStepSchema) });

	// ── Delete forms ──────────────────────────────────────────────────────────
	const { enhance: deleteStepEnhance } = superForm(data.deleteStepForm);
	const { enhance: deleteItinEnhance } = superForm(data.deleteItineraryForm);

	// ── UI state ──────────────────────────────────────────────────────────────
	let expandedStepId = $state<string | null>(null);
	let confirmDeleteStepId = $state<string | null>(null);
	let confirmDeleteItinerary = $state(false);

	function openStepEdit(step: (typeof data.itinerary.steps)[number]) {
		if (expandedStepId === step.id) {
			expandedStepId = null;
			return;
		}
		expandedStepId = step.id;
		$updateStepForm.id = step.id;
		$updateStepForm.stepNumber = step.stepNumber;
		$updateStepForm.title = step.title;
		$updateStepForm.description = step.description;
		$updateStepForm.highlight = step.highlight ?? '';
		$updateStepForm.durationText = step.durationText;
		$updateStepForm.durationMinutes = step.durationMinutes ?? undefined;
		$updateStepForm.locationId = step.locationId;
		$updateStepForm.images = step.images.join('\n');
	}

	const nextStepNumber = $derived(
		data.itinerary.steps.length > 0
			? Math.max(...data.itinerary.steps.map((s) => s.stepNumber)) + 1
			: 1
	);
</script>

<div class="space-y-10 max-w-3xl">
	<div class="flex items-center justify-between">
		<a href="/admin/itineraries" class="text-sm text-indigo-600 hover:underline">← Back to itineraries</a>
		<span class="text-sm text-gray-500">{data.enquiryCount} enquir{data.enquiryCount !== 1 ? 'ies' : 'y'}</span>
	</div>

	{#if $itinMessage?.success}
		<div class="rounded-md bg-green-50 px-4 py-3 text-sm text-green-700">{$itinMessage.success}</div>
	{/if}

	<!-- ── Section A: Itinerary Details ── -->
	<div class="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
		<h2 class="mb-6 text-lg font-semibold text-gray-900">Itinerary Details</h2>

		<form method="POST" action="?/updateItinerary" use:itinEnhance class="space-y-5">
			<div>
				<label for="title" class="block text-sm font-medium text-gray-700">Title</label>
				<input id="title" name="title" type="text" bind:value={$itinForm.title}
					class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
				{#if $itinErrors.title}<p class="mt-1 text-xs text-red-600">{$itinErrors.title}</p>{/if}
			</div>
			<div>
				<label for="summary" class="block text-sm font-medium text-gray-700">Summary</label>
				<textarea id="summary" name="summary" rows="2" bind:value={$itinForm.summary}
					class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
				{#if $itinErrors.summary}<p class="mt-1 text-xs text-red-600">{$itinErrors.summary}</p>{/if}
			</div>
			<div>
				<label for="description" class="block text-sm font-medium text-gray-700">Description</label>
				<textarea id="description" name="description" rows="5" bind:value={$itinForm.description}
					class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
				{#if $itinErrors.description}<p class="mt-1 text-xs text-red-600">{$itinErrors.description}</p>{/if}
			</div>
			<div class="grid grid-cols-2 gap-5">
				<div>
					<label for="fixedPrice" class="block text-sm font-medium text-gray-700">Fixed Price</label>
					<input id="fixedPrice" name="fixedPrice" type="number" min="0" step="0.01" bind:value={$itinForm.fixedPrice}
						class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
				</div>
				<div>
					<label for="pricePerPerson" class="block text-sm font-medium text-gray-700">Price Per Person</label>
					<input id="pricePerPerson" name="pricePerPerson" type="number" min="0" step="0.01" bind:value={$itinForm.pricePerPerson}
						class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
				</div>
			</div>
			<div class="grid grid-cols-2 gap-5">
				<div>
					<label for="currency" class="block text-sm font-medium text-gray-700">Currency</label>
					<select id="currency" name="currency" bind:value={$itinForm.currency}
						class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
						{#each ['USD', 'EUR', 'GBP', 'UGX', 'KES', 'TZS'] as c}
							<option value={c}>{c}</option>
						{/each}
					</select>
				</div>
				<div>
					<label for="durationDays" class="block text-sm font-medium text-gray-700">Duration (days)</label>
					<input id="durationDays" name="durationDays" type="number" min="1" bind:value={$itinForm.durationDays}
						class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
				</div>
			</div>
			<!-- Best seasons tag input -->
			<div>
				<label for="season-input" class="block text-sm font-medium text-gray-700">Best Seasons</label>
				<input type="hidden" name="bestSeasons" bind:value={$itinForm.bestSeasons} />
				<div class="mt-1 flex flex-wrap gap-2 rounded-md border border-gray-300 p-2">
					{#each seasons as s}
						<span class="inline-flex items-center gap-1 rounded-full bg-indigo-100 px-2 py-0.5 text-xs font-medium text-indigo-700">
							{s}
							<button type="button" onclick={() => removeSeason(s)}><X class="h-3 w-3" /></button>
						</span>
					{/each}
					<input id="season-input" type="text" bind:value={seasonInput}
						onkeydown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addSeason(); } }}
						placeholder="Type season, press Enter…" class="min-w-32 border-0 p-0 text-sm focus:ring-0" />
				</div>
			</div>
			<div>
				<label for="coverImage" class="block text-sm font-medium text-gray-700">Cover Image URL</label>
				<input id="coverImage" name="coverImage" type="url" bind:value={$itinForm.coverImage}
					class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
			</div>
			<div>
				<label for="images" class="block text-sm font-medium text-gray-700">Gallery URLs <span class="text-gray-400">(one per line)</span></label>
				<textarea id="images" name="images" rows="3" bind:value={$itinForm.images}
					class="mt-1 block w-full rounded-md border-gray-300 font-mono text-xs shadow-sm focus:border-indigo-500 focus:ring-indigo-500"></textarea>
			</div>
			<div class="flex items-center gap-2">
				<input id="published" name="published" type="checkbox" bind:checked={$itinForm.published}
					class="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
				<label for="published" class="text-sm font-medium text-gray-700">Published</label>
			</div>
			<div class="pt-2">
				<button type="submit" disabled={$itinSubmitting}
					class="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50">
					{$itinSubmitting ? 'Saving…' : 'Save Changes'}
				</button>
			</div>
		</form>
	</div>

	<!-- ── Section B: Steps ── -->
	<div class="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
		<h2 class="mb-6 text-lg font-semibold text-gray-900">
			Steps <span class="text-base font-normal text-gray-400">({data.itinerary.steps.length})</span>
		</h2>

		<!-- Existing steps -->
		{#if data.itinerary.steps.length > 0}
			<div class="mb-8 space-y-2">
				{#each data.itinerary.steps as step}
					<div class="rounded-lg border border-gray-200">
						<div class="flex items-center gap-4 px-4 py-3">
							<span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">{step.stepNumber}</span>
							<div class="flex-1">
								<p class="font-medium text-gray-900 text-sm">{step.title}</p>
								<p class="text-xs text-gray-500">{step.location.name}, {step.location.country.name} · {step.durationText}</p>
							</div>
							<button type="button" onclick={() => openStepEdit(step)}
								class="text-xs font-medium text-indigo-600 hover:text-indigo-800 flex items-center gap-1">
								{#if expandedStepId === step.id}<ChevronUp class="h-3.5 w-3.5" />Close{:else}<ChevronDown class="h-3.5 w-3.5" />Edit{/if}
							</button>
							{#if confirmDeleteStepId === step.id}
								<form method="POST" action="?/deleteStep" use:deleteStepEnhance class="inline-flex items-center gap-2">
									<input type="hidden" name="id" value={step.id} />
									<button type="submit" class="text-xs font-medium text-red-600 hover:text-red-800">Confirm</button>
									<button type="button" onclick={() => (confirmDeleteStepId = null)} class="text-xs text-gray-500">Cancel</button>
								</form>
							{:else}
								<button type="button" onclick={() => (confirmDeleteStepId = step.id)}
									class="text-xs text-red-500 hover:text-red-700"><Trash2 class="h-3.5 w-3.5" /></button>
							{/if}
						</div>

						<!-- Inline edit -->
						{#if expandedStepId === step.id}
							<div class="border-t border-gray-100 bg-gray-50 px-4 py-4">
								<form method="POST" action="?/updateStep" use:updateStepEnhance class="space-y-4">
									<input type="hidden" name="id" bind:value={$updateStepForm.id} />
									<div class="grid grid-cols-2 gap-4">
										<div>
											<label for="es-stepNumber" class="block text-xs font-medium text-gray-600">Step #</label>
											<input id="es-stepNumber" name="stepNumber" type="number" min="1" bind:value={$updateStepForm.stepNumber}
												class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm" />
										</div>
										<div>
											<label for="es-locationId" class="block text-xs font-medium text-gray-600">Location</label>
											<select id="es-locationId" name="locationId" bind:value={$updateStepForm.locationId}
												class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm">
												{#each data.locations as loc}
													<option value={loc.id}>{loc.name} ({loc.country.name})</option>
												{/each}
											</select>
										</div>
									</div>
									<div>
										<label for="es-title" class="block text-xs font-medium text-gray-600">Title</label>
										<input id="es-title" name="title" type="text" bind:value={$updateStepForm.title}
											class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm" />
									</div>
									<div>
										<label for="es-description" class="block text-xs font-medium text-gray-600">Description</label>
										<textarea id="es-description" name="description" rows="2" bind:value={$updateStepForm.description}
											class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm"></textarea>
									</div>
									<div class="grid grid-cols-2 gap-4">
										<div>
											<label for="es-durationText" class="block text-xs font-medium text-gray-600">Duration Text</label>
											<input id="es-durationText" name="durationText" type="text" bind:value={$updateStepForm.durationText}
												class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm" />
										</div>
										<div>
											<label for="es-durationMinutes" class="block text-xs font-medium text-gray-600">Duration (minutes)</label>
											<input id="es-durationMinutes" name="durationMinutes" type="number" min="1" bind:value={$updateStepForm.durationMinutes}
												class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm" />
										</div>
									</div>
									<div>
										<label for="es-highlight" class="block text-xs font-medium text-gray-600">Highlight</label>
										<input id="es-highlight" name="highlight" type="text" bind:value={$updateStepForm.highlight}
											class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm" />
									</div>
									<div>
										<label for="es-images" class="block text-xs font-medium text-gray-600">Images <span class="text-gray-400">(one URL per line)</span></label>
										<textarea id="es-images" name="images" rows="2" bind:value={$updateStepForm.images}
											class="mt-1 block w-full rounded-md border-gray-300 font-mono text-xs shadow-sm"></textarea>
									</div>
									<button type="submit" disabled={$updateStepSubmitting}
										class="rounded-lg bg-indigo-600 px-4 py-1.5 text-xs font-medium text-white hover:bg-indigo-700 disabled:opacity-50">
										{$updateStepSubmitting ? 'Saving…' : 'Update Step'}
									</button>
								</form>
							</div>
						{/if}
					</div>
				{/each}
			</div>
		{/if}

		<!-- Add step form -->
		<div class="rounded-lg border border-dashed border-gray-300 p-6">
			<h3 class="mb-4 text-sm font-semibold text-gray-700">Add Step</h3>

			{#if $addStepMessage?.success}
				<p class="mb-3 rounded-md bg-green-50 px-3 py-2 text-xs text-green-700">{$addStepMessage.success}</p>
			{/if}

			<form method="POST" action="?/createStep" use:addStepEnhance class="space-y-4">
				<div class="grid grid-cols-2 gap-4">
					<div>
						<label for="as-stepNumber" class="block text-xs font-medium text-gray-600">Step #</label>
						<input id="as-stepNumber" name="stepNumber" type="number" min="1" value={nextStepNumber}
							class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm" />
						{#if $addStepErrors.stepNumber}<p class="mt-1 text-xs text-red-600">{$addStepErrors.stepNumber}</p>{/if}
					</div>
					<div>
						<label for="as-locationId" class="block text-xs font-medium text-gray-600">Location <span class="text-red-500">*</span></label>
						<select id="as-locationId" name="locationId" bind:value={$addStepForm.locationId}
							class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm">
							<option value="">Select…</option>
							{#each data.locations as loc}
								<option value={loc.id}>{loc.name} ({loc.country.name})</option>
							{/each}
						</select>
						{#if $addStepErrors.locationId}<p class="mt-1 text-xs text-red-600">{$addStepErrors.locationId}</p>{/if}
					</div>
				</div>
				<div>
					<label for="as-title" class="block text-xs font-medium text-gray-600">Title <span class="text-red-500">*</span></label>
					<input id="as-title" name="title" type="text" bind:value={$addStepForm.title}
						class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm" />
					{#if $addStepErrors.title}<p class="mt-1 text-xs text-red-600">{$addStepErrors.title}</p>{/if}
				</div>
				<div>
					<label for="as-description" class="block text-xs font-medium text-gray-600">Description <span class="text-red-500">*</span></label>
					<textarea id="as-description" name="description" rows="2" bind:value={$addStepForm.description}
						class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm"></textarea>
					{#if $addStepErrors.description}<p class="mt-1 text-xs text-red-600">{$addStepErrors.description}</p>{/if}
				</div>
				<div class="grid grid-cols-2 gap-4">
					<div>
						<label for="as-durationText" class="block text-xs font-medium text-gray-600">Duration Text <span class="text-red-500">*</span></label>
						<input id="as-durationText" name="durationText" type="text" placeholder="e.g. 2 days" bind:value={$addStepForm.durationText}
							class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm" />
						{#if $addStepErrors.durationText}<p class="mt-1 text-xs text-red-600">{$addStepErrors.durationText}</p>{/if}
					</div>
					<div>
						<label for="as-durationMinutes" class="block text-xs font-medium text-gray-600">Duration (minutes)</label>
						<input id="as-durationMinutes" name="durationMinutes" type="number" min="1" bind:value={$addStepForm.durationMinutes}
							class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm" />
					</div>
				</div>
				<div>
					<label for="as-highlight" class="block text-xs font-medium text-gray-600">Highlight</label>
					<input id="as-highlight" name="highlight" type="text" bind:value={$addStepForm.highlight}
						class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm" />
				</div>
				<div>
					<label for="as-images" class="block text-xs font-medium text-gray-600">Images <span class="text-gray-400">(one URL per line)</span></label>
					<textarea id="as-images" name="images" rows="2" bind:value={$addStepForm.images}
						class="mt-1 block w-full rounded-md border-gray-300 font-mono text-xs shadow-sm"></textarea>
				</div>
				<button type="submit" disabled={$addStepSubmitting}
					class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50">
					{$addStepSubmitting ? 'Adding…' : 'Add Step'}
				</button>
			</form>
		</div>
	</div>

	<!-- ── Danger Zone ── -->
	<div class="rounded-xl border border-red-100 bg-red-50 p-6">
		<h3 class="mb-2 font-semibold text-red-800">Danger Zone</h3>
		{#if confirmDeleteItinerary}
			<p class="mb-3 text-sm text-red-700">Delete this itinerary and all its steps? This cannot be undone.</p>
			<form method="POST" action="?/deleteItinerary" use:deleteItinEnhance class="flex gap-3">
				<input type="hidden" name="id" value={data.itinerary.id} />
				<button type="submit" class="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
					Yes, delete
				</button>
				<button type="button" onclick={() => (confirmDeleteItinerary = false)}
					class="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-100">
					Cancel
				</button>
			</form>
		{:else}
			<button type="button" onclick={() => (confirmDeleteItinerary = true)}
				class="inline-flex items-center gap-2 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700">
				<Trash2 class="h-4 w-4" /> Delete Itinerary
			</button>
		{/if}
	</div>
</div>
