<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { z } from 'zod';
	import { enhance } from '$app/forms';
	import { Star, Plus, Pencil, Trash2 } from 'lucide-svelte';
	import { format } from 'date-fns';
	import Dialog from '$lib/components/ui/Dialog.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Textarea from '$lib/components/ui/Textarea.svelte';
	import Button from '$lib/components/ui/Button.svelte';
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

	// ── Schema ────────────────────────────────────────────────
	const testimonialSchema = z.object({
		clientName: z.string().min(2, 'Name must be at least 2 characters'),
		country: z.string().optional(),
		rating: z.number().int().min(1).max(5).default(5),
		quote: z.string().min(10, 'Quote must be at least 10 characters'),
		published: z.boolean().default(false)
	});

	// ── Create ────────────────────────────────────────────────
	let createOpen = $state(false);

	const {
		form: createForm,
		errors: createErrors,
		enhance: createEnhance,
		submitting: createSubmitting,
		message: createMessage
	} = superForm(data.createForm, {
		validators: zod4Client(testimonialSchema),
		resetForm: true,
		onResult({ result }) {
			if (result.type === 'success') createOpen = false;
		}
	});

	// ── Edit ─────────────────────────────────────────────────
	const updateSchema = testimonialSchema.extend({ id: z.string() });

	let editOpen = $state(false);
	let editId = $state('');

	const {
		form: editForm,
		errors: editErrors,
		enhance: editEnhance,
		submitting: editSubmitting,
		message: editMessage
	} = superForm(data.createForm, {
		id: 'update-testimonial',
		validators: zod4Client(updateSchema),
		resetForm: false,
		onResult({ result }) {
			if (result.type === 'success') { editOpen = false; confirmDelete = false; }
		}
	});

	function openEdit(t: (typeof data.testimonials)[number]) {
		editId = t.id;
		$editForm.clientName = t.clientName;
		$editForm.country = t.country ?? '';
		$editForm.rating = t.rating;
		$editForm.quote = t.quote;
		$editForm.published = t.published;
		confirmDelete = false;
		editOpen = true;
	}

	// ── Delete ────────────────────────────────────────────────
	const { enhance: deleteEnhance } = superForm(data.deleteForm, {
		id: 'delete-testimonial',
		onResult({ result }) {
			if (result.type === 'success') { editOpen = false; confirmDelete = false; }
		}
	});

	let confirmDelete = $state(false);

	function submitDelete() {
		(document.getElementById('delete-testimonial-form') as HTMLFormElement)?.requestSubmit();
	}
</script>

<div class="space-y-6">
	<!-- Header & Tabs -->
	<div class="flex items-center justify-between">
		<div class="flex gap-1 border-b border-gray-200">
			{#each (['all', 'pending', 'published'] as Tab[]) as tab}
				<button
					type="button"
					onclick={() => (activeTab = tab)}
					class="px-4 py-2 text-sm font-medium capitalize {activeTab === tab
						? 'border-b-2 border-indigo-600 text-indigo-600'
						: 'text-gray-500 hover:text-gray-700'}"
				>
					{tab}
					{#if tab === 'pending'}
						<span class="ml-1.5 rounded-full bg-yellow-100 px-1.5 py-0.5 text-xs text-yellow-700">
							{data.testimonials.filter((t) => !t.published).length}
						</span>
					{/if}
				</button>
			{/each}
		</div>
		<Button variant="primary" onclick={() => (createOpen = true)}>
			<Plus class="h-4 w-4" /> Add Testimonial
		</Button>
	</div>

	{#if filtered.length === 0}
		<div class="rounded-xl border-2 border-dashed border-gray-200 py-16 text-center">
			<p class="text-sm text-gray-500">No testimonials here.</p>
		</div>
	{:else}
		<div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
			<table class="w-full text-sm">
				<thead class="bg-gray-50 text-xs font-medium uppercase tracking-wide text-gray-500">
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
										<Star
											class="h-3.5 w-3.5 {i < t.rating
												? 'fill-yellow-400 text-yellow-400'
												: 'text-gray-300'}"
										/>
									{/each}
								</div>
							</td>
							<td class="max-w-xs px-4 py-3">
								<p class="line-clamp-2 text-gray-700">"{t.quote}"</p>
							</td>
							<td class="px-4 py-3">
								{#if t.published}
									<span
										class="inline-flex rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-700"
										>Published</span
									>
								{:else}
									<span
										class="inline-flex rounded-full bg-yellow-100 px-2 py-0.5 text-xs font-medium text-yellow-700"
										>Pending</span
									>
								{/if}
							</td>
							<td class="whitespace-nowrap px-4 py-3 text-xs text-gray-500">
								{format(new Date(t.createdAt), 'dd MMM yyyy')}
							</td>
							<td class="px-4 py-3 text-right">
								<div class="flex items-center justify-end gap-2">
									{#if !t.published}
										<form method="POST" action="?/approve" use:enhance class="inline">
											<input type="hidden" name="id" value={t.id} />
											<button
												type="submit"
												class="text-xs font-medium text-green-600 hover:text-green-800"
												>Approve</button
											>
										</form>
									{:else}
										<form method="POST" action="?/unpublish" use:enhance class="inline">
											<input type="hidden" name="id" value={t.id} />
											<button
												type="submit"
												class="text-xs font-medium text-gray-500 hover:text-gray-700"
												>Unpublish</button
											>
										</form>
									{/if}
									<Button variant="ghost" size="sm" onclick={() => openEdit(t)}>
										<Pencil class="h-3.5 w-3.5" />
									</Button>
								</div>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>

<!-- ── Add Testimonial Dialog ─────────────────────────────── -->
<Dialog bind:open={createOpen} title="Add Testimonial">
	{#if $createMessage?.success}
		<p class="mb-4 rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">
			{$createMessage.success}
		</p>
	{/if}
	<form method="POST" action="?/create" use:createEnhance class="space-y-4">
		<div class="grid grid-cols-2 gap-4">
			<Input
				name="clientName"
				label="Client Name"
				bind:value={$createForm.clientName}
				error={$createErrors.clientName}
				required
			/>
			<Input name="country" label="Country" bind:value={$createForm.country} />
		</div>
		<div>
			<p class="block text-sm font-medium opacity-80">Rating <span class="ml-0.5 text-red-500">*</span></p>
			<div class="mt-1 flex gap-1" role="group" aria-label="Rating">
				{#each [1, 2, 3, 4, 5] as n}
					<button
						type="button"
						aria-label="{n} star{n !== 1 ? 's' : ''}"
						onclick={() => ($createForm.rating = n)}
						class="p-0.5 focus:outline-none"
					>
						<Star
							class="h-6 w-6 {n <= $createForm.rating
								? 'fill-yellow-400 text-yellow-400'
								: 'text-gray-300'}"
						/>
					</button>
				{/each}
			</div>
			<input type="hidden" name="rating" value={$createForm.rating} />
		</div>
		<Textarea
			name="quote"
			label="Quote"
			rows={4}
			bind:value={$createForm.quote}
			error={$createErrors.quote}
			required
		/>
		<label class="flex items-center gap-2 text-sm">
			<input type="checkbox" name="published" bind:checked={$createForm.published} class="rounded" />
			Publish immediately
		</label>
		<div class="flex justify-end gap-3 pt-2">
			<Button onclick={() => (createOpen = false)}>Cancel</Button>
			<Button variant="primary" type="submit" disabled={$createSubmitting}>
				{$createSubmitting ? 'Creating…' : 'Create Testimonial'}
			</Button>
		</div>
	</form>
</Dialog>

<!-- ── Edit Testimonial Dialog ────────────────────────────── -->
<Dialog bind:open={editOpen} title="Edit Testimonial">
	{#if $editMessage?.success}
		<p class="mb-4 rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">
			{$editMessage.success}
		</p>
	{/if}
	<form method="POST" action="?/update" use:editEnhance class="space-y-4">
		<input type="hidden" name="id" value={editId} />
		<div class="grid grid-cols-2 gap-4">
			<Input
				name="clientName"
				label="Client Name"
				bind:value={$editForm.clientName}
				error={$editErrors.clientName}
				required
			/>
			<Input name="country" label="Country" bind:value={$editForm.country} />
		</div>
		<div>
			<p class="block text-sm font-medium opacity-80">Rating <span class="ml-0.5 text-red-500">*</span></p>
			<div class="mt-1 flex gap-1" role="group" aria-label="Rating">
				{#each [1, 2, 3, 4, 5] as n}
					<button
						type="button"
						aria-label="{n} star{n !== 1 ? 's' : ''}"
						onclick={() => ($editForm.rating = n)}
						class="p-0.5 focus:outline-none"
					>
						<Star
							class="h-6 w-6 {n <= $editForm.rating
								? 'fill-yellow-400 text-yellow-400'
								: 'text-gray-300'}"
						/>
					</button>
				{/each}
			</div>
			<input type="hidden" name="rating" value={$editForm.rating} />
		</div>
		<Textarea
			name="quote"
			label="Quote"
			rows={4}
			bind:value={$editForm.quote}
			error={$editErrors.quote}
			required
		/>
		<label class="flex items-center gap-2 text-sm">
			<input type="checkbox" name="published" bind:checked={$editForm.published} class="rounded" />
			Published
		</label>
		<div class="flex items-center justify-between pt-2">
			{#if confirmDelete}
				<div class="flex gap-2">
					<Button variant="danger" size="sm" onclick={submitDelete}>Yes, delete</Button>
					<Button size="sm" onclick={() => (confirmDelete = false)}>Cancel</Button>
				</div>
			{:else}
				<Button variant="ghost" size="sm" onclick={() => (confirmDelete = true)}>
					<Trash2 class="h-3.5 w-3.5 text-red-500" />
					<span class="text-red-500">Delete</span>
				</Button>
			{/if}
			<div class="flex gap-3">
				<Button onclick={() => (editOpen = false)}>Cancel</Button>
				<Button variant="primary" type="submit" disabled={$editSubmitting}>
					{$editSubmitting ? 'Saving…' : 'Save Changes'}
				</Button>
			</div>
		</div>
	</form>
	<form id="delete-testimonial-form" method="POST" action="?/delete" use:deleteEnhance class="hidden">
		<input type="hidden" name="id" value={editId} />
	</form>
</Dialog>
