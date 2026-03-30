<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { z } from 'zod';
	import { format } from 'date-fns';
	import { UserPlus, Trash2, X } from 'lucide-svelte';
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
		resetForm: true
	});

	const { form: deleteFormData, enhance: deleteEnhance } = superForm(data.deleteForm, {
		validators: zod4Client(deleteUserSchema)
	});

	let showCreateForm = $state(false);
	let confirmDeleteId = $state<string | null>(null);
</script>

<div class="space-y-6">
	<!-- Header -->
	<div class="flex items-center justify-between">
		<p class="text-sm text-gray-500">{data.users.length} user{data.users.length !== 1 ? 's' : ''}</p>
		<button
			type="button"
			onclick={() => (showCreateForm = !showCreateForm)}
			class="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700"
		>
			{#if showCreateForm}
				<X class="h-4 w-4" /> Cancel
			{:else}
				<UserPlus class="h-4 w-4" /> Add User
			{/if}
		</button>
	</div>

	<!-- Inline create form -->
	{#if showCreateForm}
		<div class="rounded-xl border border-indigo-100 bg-indigo-50 p-6">
			<h2 class="mb-4 font-semibold text-gray-900">New User</h2>
			{#if $createMessage?.error}
				<p class="mb-3 rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">{$createMessage.error}</p>
			{/if}
			<form method="POST" action="?/createUser" use:createEnhance class="flex flex-wrap gap-4">
				<div class="flex-1 min-w-48">
					<label for="cu-name" class="block text-sm font-medium text-gray-700">Name</label>
					<input
						id="cu-name"
						name="name"
						type="text"
						bind:value={$createFormData.name}
						class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
					/>
					{#if $createErrors.name}<p class="mt-1 text-xs text-red-600">{$createErrors.name}</p>{/if}
				</div>
				<div class="flex-1 min-w-48">
					<label for="cu-email" class="block text-sm font-medium text-gray-700">Email</label>
					<input
						id="cu-email"
						name="email"
						type="email"
						bind:value={$createFormData.email}
						class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
					/>
					{#if $createErrors.email}<p class="mt-1 text-xs text-red-600">{$createErrors.email}</p>{/if}
				</div>
				<div class="flex items-end">
					<button
						type="submit"
						disabled={$createSubmitting}
						class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50"
					>
						{$createSubmitting ? 'Creating…' : 'Create User'}
					</button>
				</div>
			</form>
		</div>
	{/if}

	<!-- Table -->
	<div class="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
		<table class="w-full text-sm">
			<thead>
				<tr class="border-b border-gray-100 bg-gray-50 text-left text-xs font-medium uppercase tracking-wider text-gray-500">
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
									<span class="text-xs text-gray-600 mr-2">Are you sure?</span>
									<form method="POST" action="?/deleteUser" use:deleteEnhance class="inline">
										<input type="hidden" name="id" value={user.id} />
										<button
											type="submit"
											class="text-xs font-medium text-red-600 hover:text-red-800 mr-2"
										>Yes, delete</button>
									</form>
									<button
										type="button"
										onclick={() => (confirmDeleteId = null)}
										class="text-xs text-gray-500 hover:text-gray-700"
									>Cancel</button>
								{:else}
									<button
										type="button"
										onclick={() => (confirmDeleteId = user.id)}
										class="inline-flex items-center gap-1 text-xs text-red-600 hover:text-red-800"
									>
										<Trash2 class="h-3.5 w-3.5" /> Delete
									</button>
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
