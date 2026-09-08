<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { z } from 'zod';
	import { Plus, Pencil, Trash2, Megaphone } from 'lucide-svelte';
	import { format } from 'date-fns';
	import Dialog from '$lib/components/ui/Dialog.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const campaignSchema = z.object({
		name: z.string().min(1, 'Name is required'),
		code: z
			.string()
			.min(1, 'Code is required')
			.regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Code must be lowercase letters, numbers, and hyphens')
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
		id: 'create-campaign',
		validators: zod4Client(campaignSchema),
		resetForm: true,
		onResult({ result }) {
			if (result.type === 'success') createOpen = false;
		}
	});

	function autoCode(name: string) {
		return name
			.toLowerCase()
			.trim()
			.replace(/[^a-z0-9\s-]/g, '')
			.replace(/\s+/g, '-')
			.replace(/-+/g, '-');
	}

	$effect(() => {
		const n = $createForm.name;
		if (n && !$createForm.code) {
			$createForm.code = autoCode(n);
		}
	});

	// ── Edit ─────────────────────────────────────────────────
	const updateSchema = campaignSchema.extend({ id: z.string() });

	let editOpen = $state(false);
	let editId = $state('');
	let confirmDelete = $state(false);

	const {
		form: editForm,
		errors: editErrors,
		enhance: editEnhance,
		submitting: editSubmitting
	} = superForm(data.createForm, {
		id: 'update-campaign',
		validators: zod4Client(updateSchema),
		resetForm: false,
		onResult({ result }) {
			if (result.type === 'success') {
				editOpen = false;
				confirmDelete = false;
			}
		}
	});

	function openEdit(c: (typeof data.campaigns)[number]) {
		editId = c.id;
		$editForm.name = c.name;
		$editForm.code = c.code;
		confirmDelete = false;
		editOpen = true;
	}

	// ── Delete ────────────────────────────────────────────────
	const { enhance: deleteEnhance } = superForm(data.deleteForm, {
		id: 'delete-campaign',
		onResult({ result }) {
			if (result.type === 'success') {
				editOpen = false;
				confirmDelete = false;
			}
		}
	});

	function submitDelete() {
		(document.getElementById('delete-campaign-form') as HTMLFormElement)?.requestSubmit();
	}
</script>

<div class="space-y-6">
	<!-- Header -->
	<div class="flex items-center justify-between">
		<p class="text-sm text-gray-500">
			{data.campaigns.length} campaign{data.campaigns.length !== 1 ? 's' : ''}
		</p>
		<Button variant="primary" onclick={() => (createOpen = true)}>
			<Plus class="h-4 w-4" /> Add Campaign
		</Button>
	</div>

	{#if data.campaigns.length === 0}
		<div class="rounded-xl border-2 border-dashed border-gray-200 py-16 text-center">
			<Megaphone class="mx-auto mb-3 h-8 w-8 text-gray-300" />
			<p class="text-sm text-gray-500">No campaigns yet. Add one to get started.</p>
		</div>
	{:else}
		<div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
			<table class="w-full text-sm">
				<thead class="bg-gray-50 text-xs font-medium uppercase tracking-wide text-gray-500">
					<tr>
						<th class="px-4 py-3 text-left">Name</th>
						<th class="px-4 py-3 text-left">Code</th>
						<th class="px-4 py-3 text-left">Itineraries</th>
						<th class="px-4 py-3 text-left">Created</th>
						<th class="px-4 py-3 text-right">Actions</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-100">
					{#each data.campaigns as campaign}
						<tr class="hover:bg-gray-50">
							<td class="px-4 py-3 font-medium text-gray-900">{campaign.name}</td>
							<td class="px-4 py-3">
								<code class="rounded bg-gray-100 px-1.5 py-0.5 text-xs text-gray-600"
									>{campaign.code}</code
								>
							</td>
							<td class="px-4 py-3 text-gray-600">{campaign._count.itineraries}</td>
							<td class="whitespace-nowrap px-4 py-3 text-xs text-gray-500">
								{format(new Date(campaign.createdAt), 'dd MMM yyyy')}
							</td>
							<td class="px-4 py-3 text-right">
								<button
									type="button"
									onclick={() => openEdit(campaign)}
									class="inline-flex items-center gap-1 text-xs text-indigo-600 hover:text-indigo-800"
								>
									<Pencil class="h-3.5 w-3.5" /> Edit
								</button>
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>

<!-- Create dialog -->
<Dialog bind:open={createOpen} title="Add Campaign">
	{#if $createMessage?.success}
		<p class="mb-4 rounded-lg bg-green-50 px-4 py-2 text-sm text-green-700">
			{$createMessage.success}
		</p>
	{/if}
	<form method="POST" action="?/create" use:createEnhance class="space-y-4">
		<Input
			label="Name"
			name="name"
			bind:value={$createForm.name}
			error={$createErrors.name?.[0]}
			placeholder="e.g. Gorilla & Big 5 Safari"
			required
		/>
		<Input
			label="Code"
			name="code"
			bind:value={$createForm.code}
			error={$createErrors.code?.[0]}
			placeholder="e.g. gorilla-big5"
			required
		/>
		<div class="flex justify-end gap-3 pt-2">
			<Button variant="ghost" onclick={() => (createOpen = false)}>Cancel</Button>
			<Button type="submit" variant="primary" disabled={$createSubmitting}>
				{$createSubmitting ? 'Creating…' : 'Create Campaign'}
			</Button>
		</div>
	</form>
</Dialog>

<!-- Edit / delete dialog -->
<Dialog bind:open={editOpen} title="Edit Campaign">
	<form method="POST" action="?/update" use:editEnhance class="space-y-4">
		<input type="hidden" name="id" bind:value={editId} />
		<Input
			label="Name"
			name="name"
			bind:value={$editForm.name}
			error={$editErrors.name?.[0]}
			placeholder="e.g. Gorilla & Big 5 Safari"
			required
		/>
		<Input
			label="Code"
			name="code"
			bind:value={$editForm.code}
			error={$editErrors.code?.[0]}
			placeholder="e.g. gorilla-big5"
			required
		/>

		{#if confirmDelete}
			<p class="rounded-lg bg-red-50 px-4 py-2 text-sm text-red-700">
				Are you sure? This will remove the campaign from all itineraries.
			</p>
			<div class="flex justify-end gap-3">
				<Button variant="ghost" onclick={() => (confirmDelete = false)}>Cancel</Button>
				<Button variant="danger" onclick={submitDelete} disabled={$editSubmitting}>
					<Trash2 class="h-4 w-4" /> Yes, delete
				</Button>
			</div>
		{:else}
			<div class="flex items-center justify-between pt-2">
				<Button variant="danger" onclick={() => (confirmDelete = true)}>
					<Trash2 class="h-4 w-4" /> Delete
				</Button>
				<div class="flex gap-3">
					<Button variant="ghost" onclick={() => (editOpen = false)}>Cancel</Button>
					<Button type="submit" variant="primary" disabled={$editSubmitting}>
						{$editSubmitting ? 'Saving…' : 'Save Changes'}
					</Button>
				</div>
			</div>
		{/if}
	</form>

	<!-- Hidden delete form -->
	<form id="delete-campaign-form" method="POST" action="?/delete" use:deleteEnhance class="hidden">
		<input type="hidden" name="id" value={editId} />
	</form>
</Dialog>
