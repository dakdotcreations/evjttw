<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { z } from 'zod';
	import { format } from 'date-fns';
	import { UserPlus, Trash2 } from 'lucide-svelte';
	import Dialog from '$lib/components/ui/Dialog.svelte';
	import Input from '$lib/components/ui/Input.svelte';
	import Button from '$lib/components/ui/Button.svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const createUserSchema = z.object({
		name: z.string().min(2),
		email: z.string().email()
	});
	const deleteUserSchema = z.object({ id: z.string() });

	const {
		form: createFormData,
		errors: createErrors,
		enhance: createEnhance,
		message: createMessage,
		submitting: createSubmitting
	} = superForm(data.createForm, {
		validators: zod4Client(createUserSchema),
		resetForm: true,
		onResult({ result }) {
			if (result.type === 'success') createOpen = false;
		}
	});

	const { enhance: deleteEnhance } = superForm(data.deleteForm, {
		validators: zod4Client(deleteUserSchema)
	});

	let createOpen = $state(false);
	let confirmDeleteId = $state<string | null>(null);
</script>

<div class="space-y-6">
	<!-- Header -->
	<div class="flex items-center justify-between">
		<p class="text-sm text-gray-500">{data.users.length} user{data.users.length !== 1 ? 's' : ''}</p>
		<Button variant="primary" onclick={() => (createOpen = true)}>
			<UserPlus class="h-4 w-4" /> Add User
		</Button>
	</div>

	<!-- Table -->
	<div class="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
		<table class="w-full text-sm">
			<thead>
				<tr
					class="border-b border-gray-100 bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500"
				>
					<th class="px-6 py-3">Name</th>
					<th class="px-6 py-3">Email</th>
					<th class="px-6 py-3">Joined</th>
					<th class="px-6 py-3"></th>
				</tr>
			</thead>
			<tbody class="divide-y divide-gray-100">
				{#each data.users as user}
					<tr class="hover:bg-gray-50">
						<td class="px-6 py-3 font-medium text-gray-900">{user.name}</td>
						<td class="px-6 py-3 text-gray-600">{user.email}</td>
						<td class="px-6 py-3 text-gray-500">{format(user.createdAt, 'PP')}</td>
						<td class="px-6 py-3 text-right">
							{#if user.id !== data.user.id}
								{#if confirmDeleteId === user.id}
									<span class="mr-2 text-xs text-gray-600">Are you sure?</span>
									<form method="POST" action="?/deleteUser" use:deleteEnhance class="inline">
										<input type="hidden" name="id" value={user.id} />
										<button
											type="submit"
											class="mr-2 text-xs font-medium text-red-600 hover:text-red-800"
											>Yes, delete</button
										>
									</form>
									<button
										type="button"
										onclick={() => (confirmDeleteId = null)}
										class="text-xs text-gray-500 hover:text-gray-700">Cancel</button
									>
								{:else}
									<Button
										variant="ghost"
										size="sm"
										onclick={() => (confirmDeleteId = user.id)}
									>
										<Trash2 class="h-3.5 w-3.5 text-red-500" />
										<span class="text-red-500">Delete</span>
									</Button>
								{/if}
							{:else}
								<span class="text-xs text-gray-400">You</span>
							{/if}
						</td>
					</tr>
				{:else}
					<tr>
						<td colspan="4" class="px-6 py-8 text-center text-gray-400">No users found</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</div>

<!-- ── Add User Dialog ─────────────────────────────────────── -->
<Dialog bind:open={createOpen} title="Add User">
	{#if $createMessage?.error}
		<p class="mb-4 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{$createMessage.error}</p>
	{/if}
	{#if $createMessage?.success}
		<p class="mb-4 rounded-md bg-green-50 px-3 py-2 text-sm text-green-700">
			{$createMessage.success}
		</p>
	{/if}
	<form method="POST" action="?/createUser" use:createEnhance class="space-y-4">
		<Input
			name="name"
			label="Name"
			bind:value={$createFormData.name}
			error={$createErrors.name}
			required
		/>
		<Input
			name="email"
			label="Email"
			type="email"
			bind:value={$createFormData.email}
			error={$createErrors.email}
			required
		/>
		<div class="flex justify-end gap-3 pt-2">
			<Button onclick={() => (createOpen = false)}>Cancel</Button>
			<Button variant="primary" type="submit" disabled={$createSubmitting}>
				{$createSubmitting ? 'Creating…' : 'Create User'}
			</Button>
		</div>
	</form>
</Dialog>
