<script lang="ts">
	import { enhance } from '$app/forms';
	import { format } from 'date-fns';
	import { Copy, CheckCheck, Plus, Trash2 } from 'lucide-svelte';
	import type { PageData, ActionData } from './$types';

	let { data, form: actionData }: { data: PageData; form: ActionData } = $props();

	let noteInput = $state('');
	let copiedToken = $state<string | null>(null);
	let confirmDeleteId = $state<string | null>(null);
	let showCreateForm = $state(false);

	function getReviewUrl(token: string): string {
		return `${window.location.origin}/review/${token}`;
	}

	async function copyLink(token: string) {
		await navigator.clipboard.writeText(getReviewUrl(token));
		copiedToken = token;
		setTimeout(() => (copiedToken = null), 2000);
	}

	// When a new invite is created show it at top
	const allInvites = $derived(
		actionData?.created
			? [actionData.created as (typeof data.invites)[number], ...data.invites.filter((i) => i.id !== actionData?.created?.id)]
			: data.invites
	);
</script>

<div class="space-y-6">
	<div class="flex items-center justify-between">
		<p class="text-sm text-gray-500">Send these links to clients to collect testimonials.</p>
		<button type="button" onclick={() => (showCreateForm = !showCreateForm)}
			class="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
			<Plus class="h-4 w-4" /> New Invite
		</button>
	</div>

	{#if showCreateForm}
		<div class="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
			<h3 class="mb-4 text-sm font-semibold text-gray-800">Create Review Invite</h3>
			<form method="POST" action="?/createInvite" use:enhance={() => async ({ update }) => { await update(); showCreateForm = false; noteInput = ''; }} class="flex gap-3">
				<input type="text" name="note" bind:value={noteInput} placeholder="Optional note (e.g. client name)"
					class="flex-1 rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
				<button type="submit" class="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700">
					Create
				</button>
			</form>
		</div>
	{/if}

	{#if actionData?.created}
		<div class="rounded-md bg-green-50 px-4 py-3">
			<p class="text-sm font-medium text-green-800 mb-1">Invite created! Share this link:</p>
			<div class="flex items-center gap-2">
				<code class="flex-1 rounded bg-green-100 px-3 py-1.5 text-sm text-green-900 font-mono break-all">
					{getReviewUrl(actionData.created.token)}
				</code>
				<button type="button" onclick={() => copyLink(actionData!.created!.token)}
					class="shrink-0 rounded-lg border border-green-300 px-3 py-1.5 text-xs font-medium text-green-700 hover:bg-green-100 inline-flex items-center gap-1">
					{#if copiedToken === actionData.created.token}
						<CheckCheck class="h-3.5 w-3.5" /> Copied
					{:else}
						<Copy class="h-3.5 w-3.5" /> Copy
					{/if}
				</button>
			</div>
		</div>
	{/if}

	{#if allInvites.length === 0}
		<div class="rounded-xl border-2 border-dashed border-gray-200 py-16 text-center">
			<p class="text-sm text-gray-500">No review invites yet.</p>
		</div>
	{:else}
		<div class="rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
			<table class="w-full text-sm">
				<thead class="bg-gray-50 text-xs font-medium uppercase text-gray-500 tracking-wide">
					<tr>
						<th class="px-4 py-3 text-left">Note</th>
						<th class="px-4 py-3 text-left">Status</th>
						<th class="px-4 py-3 text-left">Testimonial</th>
						<th class="px-4 py-3 text-left">Created</th>
						<th class="px-4 py-3 text-right">Actions</th>
					</tr>
				</thead>
				<tbody class="divide-y divide-gray-100">
					{#each allInvites as invite}
						<tr class="hover:bg-gray-50">
							<td class="px-4 py-3">
								<p class="font-medium text-gray-800">{invite.note ?? '-'}</p>
								<button type="button" onclick={() => copyLink(invite.token)}
									class="mt-0.5 inline-flex items-center gap-1 text-xs text-indigo-500 hover:text-indigo-700">
									{#if copiedToken === invite.token}
										<CheckCheck class="h-3 w-3" /> Copied
									{:else}
										<Copy class="h-3 w-3" /> Copy link
									{/if}
								</button>
							</td>
							<td class="px-4 py-3">
								{#if invite.used}
									<span class="inline-flex rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">Used</span>
								{:else}
									<span class="inline-flex rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-600">Unused</span>
								{/if}
							</td>
							<td class="px-4 py-3">
								{#if invite.testimonial}
									<a href="/admin/testimonials" class="text-xs text-indigo-600 hover:underline">
										{invite.testimonial.clientName}
										{#if invite.testimonial.published}
											<span class="ml-1 text-green-600">✓</span>
										{:else}
											<span class="ml-1 text-yellow-500">pending</span>
										{/if}
									</a>
								{:else}
									<span class="text-gray-400">-</span>
								{/if}
							</td>
							<td class="px-4 py-3 text-gray-500 text-xs whitespace-nowrap">
								{format(new Date(invite.createdAt), 'dd MMM yyyy')}
							</td>
							<td class="px-4 py-3 text-right">
								{#if !invite.used}
									{#if confirmDeleteId === invite.id}
										<form method="POST" action="?/deleteInvite" use:enhance class="inline-flex items-center gap-2">
											<input type="hidden" name="id" value={invite.id} />
											<button type="submit" class="text-xs font-medium text-red-600 hover:text-red-800">Confirm</button>
											<button type="button" onclick={() => (confirmDeleteId = null)} class="text-xs text-gray-500">Cancel</button>
										</form>
									{:else}
										<button type="button" onclick={() => (confirmDeleteId = invite.id)}
											class="inline-flex items-center gap-1 text-xs font-medium text-red-500 hover:text-red-700">
											<Trash2 class="h-3.5 w-3.5" />
										</button>
									{/if}
								{/if}
							</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{/if}
</div>
