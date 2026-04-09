<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { z } from 'zod';
	import { Trash2, Plus } from 'lucide-svelte';
	import type { PageData } from './$types';
	import ItineraryForm from '$lib/components/ItineraryForm.svelte';
	import ImageUpload from '$lib/components/ImageUpload.svelte';
	import Tabs from '$lib/components/ui/Tabs.svelte';
	import Dialog from '$lib/components/ui/Dialog.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Textarea from '$lib/components/ui/Textarea.svelte';
	import Select from '$lib/components/ui/Select.svelte';
	import Button from '$lib/components/ui/Button.svelte';

	let { data }: { data: PageData } = $props();

	// ── Add step form ─────────────────────────────────────────────────────────
	const stepSchema = z.object({
		stepNumber: z.coerce.number().int().min(1),
		title: z.string().min(1),
		description: z.string().min(1),
		highlight: z.string().optional(),
		durationDays: z.coerce.number().int().min(0).optional(),
		durationHours: z.coerce.number().int().min(0).optional(),
		locationId: z.string().optional(),
		image: z.string().optional().default('')
	});

	const {
		form: addStepForm,
		errors: addStepErrors,
		enhance: addStepEnhance,
		submitting: addStepSubmitting,
		message: addStepMessage
	} = superForm(data.addStepForm, {
		validators: zod4Client(stepSchema),
		resetForm: true,
		onResult({ result }) {
			if (result.type === 'success') addStepOpen = false;
		}
	});

	// ── Update step form ──────────────────────────────────────────────────────
	const updateStepSchema = stepSchema.extend({ id: z.string() });
	const {
		form: updateStepForm,
		errors: updateStepErrors,
		enhance: updateStepEnhance,
		submitting: updateStepSubmitting
	} = superForm(data.updateStepForm, {
		validators: zod4Client(updateStepSchema),
		onResult({ result }) {
			if (result.type === 'success') editStepOpen = false;
		}
	});

	// ── Delete forms ──────────────────────────────────────────────────────────
	const { enhance: deleteStepEnhance } = superForm(data.deleteStepForm);
	const { enhance: deleteItinEnhance } = superForm(data.deleteItineraryForm);

	// ── UI state ──────────────────────────────────────────────────────────────
	let addStepOpen = $state(false);
	let editStepOpen = $state(false);
	let confirmDeleteStepId = $state<string | null>(null);
	let confirmDeleteItinerary = $state(false);

	function openStepEdit(step: (typeof data.itinerary.steps)[number]) {
		$updateStepForm.id = step.id;
		$updateStepForm.stepNumber = step.stepNumber;
		$updateStepForm.title = step.title;
		$updateStepForm.description = step.description;
		$updateStepForm.highlight = step.highlight ?? '';
		$updateStepForm.durationDays = step.durationDays ?? undefined;
		$updateStepForm.durationHours = step.durationHours ?? undefined;
		$updateStepForm.locationId = step.locationId ?? '';
		$updateStepForm.image = step.images[0] ?? '';
		editStepOpen = true;
	}

	const nextStepNumber = $derived(
		data.itinerary.steps.length > 0
			? Math.max(...data.itinerary.steps.map((s) => s.stepNumber)) + 1
			: 1
	);

	// Keep the superform store in sync so client-side validation sees the correct stepNumber
	$effect(() => {
		$addStepForm.stepNumber = nextStepNumber;
	});
</script>

<div class="space-y-10 max-w-3xl">
	<div class="flex items-center justify-between">
		<a href="/admin/itineraries" class="text-sm text-indigo-600 hover:underline">← Back to itineraries</a>
		<span class="text-sm text-gray-500">{data.enquiryCount} enquir{data.enquiryCount !== 1 ? 'ies' : 'y'}</span>
	</div>

	<!-- ── Tabs ── -->
	<Tabs tabs={['Details', 'Steps']}>
		{#snippet children({ activeTab })}
			{#if activeTab === 'Details'}
				<!-- ── Section A: Itinerary Details ── -->
				<div class="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
					<ItineraryForm formData={data.itineraryForm} action="?/updateItinerary" mode="update" />
				</div>
			{:else if activeTab === 'Steps'}
				<!-- ── Section B: Steps ── -->
				<div class="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
					<div class="mb-6 flex items-center justify-between">
						<h2 class="text-lg font-semibold text-gray-900">
							Steps <span class="text-base font-normal text-gray-400">({data.itinerary.steps.length})</span>
						</h2>
						<button
							type="button"
							onclick={() => (addStepOpen = true)}
							class="inline-flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
						>
							<Plus class="h-4 w-4" /> Add Step
						</button>
					</div>

					{#if data.itinerary.steps.length > 0}
						<div class="space-y-2">
							{#each data.itinerary.steps as step}
								<div class="flex items-center gap-4 rounded-lg border border-gray-200 px-4 py-3">
									<span class="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-indigo-100 text-xs font-bold text-indigo-700">{step.stepNumber}</span>
									<div class="flex-1">
										<p class="text-sm font-medium text-gray-900">{step.title}</p>
										<p class="text-xs text-gray-500">{step.location ? `${step.location.name}, ${step.location.country.name}` : 'No location'} · {step.durationDays ? `${step.durationDays}d` : ''}{step.durationHours ? ` ${step.durationHours}h` : ''}</p>
									</div>
									<button
										type="button"
										onclick={() => openStepEdit(step)}
										class="text-xs font-medium text-indigo-600 hover:text-indigo-800"
									>
										Edit
									</button>
									{#if confirmDeleteStepId === step.id}
										<form method="POST" action="?/deleteStep" use:deleteStepEnhance class="inline-flex items-center gap-2">
											<input type="hidden" name="id" value={step.id} />
											<button type="submit" class="text-xs font-medium text-red-600 hover:text-red-800">Confirm</button>
											<button type="button" onclick={() => (confirmDeleteStepId = null)} class="text-xs text-gray-500">Cancel</button>
										</form>
									{:else}
										<button type="button" onclick={() => (confirmDeleteStepId = step.id)} class="text-xs text-red-500 hover:text-red-700">
											<Trash2 class="h-3.5 w-3.5" />
										</button>
									{/if}
								</div>
							{/each}
						</div>
					{:else}
						<p class="text-sm text-gray-400">No steps yet. Add your first step using the button above.</p>
					{/if}
				</div>
			{/if}
		{/snippet}
	</Tabs>

	<!-- ── Edit Step Dialog ── -->
	<Dialog bind:open={editStepOpen} title="Edit Step">
		<form method="POST" action="?/updateStep" use:updateStepEnhance enctype="multipart/form-data" class="space-y-4">
			<input type="hidden" name="id" bind:value={$updateStepForm.id} />
			<div class="grid grid-cols-2 gap-4">
				<Input
					id="es-stepNumber"
					name="stepNumber"
					label="Step #"
					type="number"
					min={1}
					bind:value={$updateStepForm.stepNumber}
				/>
				<Select
					id="es-locationId"
					name="locationId"
					label="Location"
					bind:value={$updateStepForm.locationId}
				>
					<option value="">None</option>
					{#each data.locations as loc}
						<option value={loc.id}>{loc.name} ({loc.country.name})</option>
					{/each}
				</Select>
			</div>
			<Input
				id="es-title"
				name="title"
				label="Title"
				bind:value={$updateStepForm.title}
				error={$updateStepErrors.title}
				required
			/>
			<Textarea
				id="es-description"
				name="description"
				label="Description"
				bind:value={$updateStepForm.description}
				error={$updateStepErrors.description}
				required
			/>
			<Input
				id="es-durationDays"
				name="durationDays"
				label="Duration (days)"
				type="number"
				min={0}
				placeholder="e.g. 2"
				bind:value={$updateStepForm.durationDays}
				error={$updateStepErrors.durationDays}
			/>
			<Input
				id="es-durationHours"
				name="durationHours"
				label="Duration (hours, optional)"
				type="number"
				min={0}
				placeholder="e.g. 4"
				bind:value={$updateStepForm.durationHours}
			/>
			<Input
				id="es-highlight"
				name="highlight"
				label="Highlight"
				bind:value={$updateStepForm.highlight}
			/>
			<ImageUpload bind:value={$updateStepForm.image} name="image" label="Step Image" />
			<div class="flex justify-end gap-3 border-t border-gray-100 pt-4">
				<Button onclick={() => (editStepOpen = false)}>Cancel</Button>
				<Button variant="primary" type="submit" disabled={$updateStepSubmitting}>
					{$updateStepSubmitting ? 'Saving…' : 'Save Changes'}
				</Button>
			</div>
		</form>
	</Dialog>

	<!-- ── Add Step Dialog ── -->
	<Dialog bind:open={addStepOpen} title="Add Step {nextStepNumber}">
		{#if $addStepMessage?.success}
			<p class="mb-4 rounded-md bg-green-50 px-3 py-2 text-xs text-green-700">{$addStepMessage.success}</p>
		{/if}
		<form method="POST" action="?/createStep" use:addStepEnhance enctype="multipart/form-data" class="space-y-4">
			<input type="hidden" name="stepNumber" value={nextStepNumber} />
			<Select
				id="as-locationId"
				name="locationId"
				label="Location"
				bind:value={$addStepForm.locationId}
			>
				<option value="">None</option>
				{#each data.locations as loc}
					<option value={loc.id}>{loc.name} ({loc.country.name})</option>
				{/each}
			</Select>
			<Input
				id="as-title"
				name="title"
				label="Title"
				bind:value={$addStepForm.title}
				error={$addStepErrors.title}
				required
			/>
			<Textarea
				id="as-description"
				name="description"
				label="Description"
				bind:value={$addStepForm.description}
				error={$addStepErrors.description}
				required
			/>
			<Input
				id="as-durationDays"
				name="durationDays"
				label="Duration (days)"
				type="number"
				min={0}
				placeholder="e.g. 2"
				bind:value={$addStepForm.durationDays}
				error={$addStepErrors.durationDays}
			/>
			<Input
				id="as-durationHours"
				name="durationHours"
				label="Duration (hours, optional)"
				type="number"
				min={0}
				placeholder="e.g. 4"
				bind:value={$addStepForm.durationHours}
			/>
			<Input
				id="as-highlight"
				name="highlight"
				label="Highlight"
				bind:value={$addStepForm.highlight}
			/>
			<ImageUpload bind:value={$addStepForm.image} name="image" label="Step Image" />
			<div class="flex justify-end gap-3 border-t border-gray-100 pt-4">
				<Button onclick={() => (addStepOpen = false)}>Cancel</Button>
				<Button variant="accent" type="submit" disabled={$addStepSubmitting}>
					{$addStepSubmitting ? 'Adding…' : 'Add Step'}
				</Button>
			</div>
		</form>
	</Dialog>

	<!-- ── Danger Zone ── -->
	<div class="rounded-xl border border-red-100 bg-red-50 p-6">
		<h3 class="mb-2 font-semibold text-red-800">Danger Zone</h3>
		{#if confirmDeleteItinerary}
			<p class="mb-3 text-sm text-red-700">Delete this itinerary and all its steps? This cannot be undone.</p>
			<form method="POST" action="?/deleteItinerary" use:deleteItinEnhance class="flex gap-3">
				<input type="hidden" name="id" value={data.itinerary.id} />
				<Button variant="danger" type="submit">Yes, delete</Button>
				<Button onclick={() => (confirmDeleteItinerary = false)}>Cancel</Button>
			</form>
		{:else}
			<Button variant="danger" onclick={() => (confirmDeleteItinerary = true)}>
				<Trash2 class="h-4 w-4" /> Delete Itinerary
			</Button>
		{/if}
	</div>
</div>
