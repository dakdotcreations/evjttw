<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { z } from 'zod';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const schema = z.object({
		displayName: z.string().optional(),
		subjectType: z.enum(['country', 'location']),
		countryId: z.string().optional(),
		locationId: z.string().optional()
	});

	const { form, errors, enhance, submitting } = superForm(data.form, {
		validators: zod4Client(schema)
	});
</script>

<div class="max-w-lg">
	<a href="/admin/features" class="mb-6 inline-block text-sm text-indigo-600 hover:underline">← Back</a>

	<div class="rounded-xl border border-gray-200 bg-white p-8 shadow-sm">
		<h2 class="mb-6 text-lg font-semibold text-gray-900">New Feature</h2>

		<form method="POST" action="?/createFeature" use:enhance class="space-y-5">
			<div>
				<label for="displayName" class="block text-sm font-medium text-gray-700">Display Name <span class="text-gray-400">(optional)</span></label>
				<input id="displayName" name="displayName" type="text" bind:value={$form.displayName}
					placeholder="e.g. Explore Uganda"
					class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
			</div>

			<div>
				<label for="subjectType" class="block text-sm font-medium text-gray-700">Feature type <span class="text-red-500">*</span></label>
				<select id="subjectType" name="subjectType" bind:value={$form.subjectType}
					class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
					<option value="">Select…</option>
					<option value="country">Country</option>
					<option value="location">Location</option>
				</select>
				{#if $errors.subjectType}<p class="mt-1 text-xs text-red-600">{$errors.subjectType}</p>{/if}
			</div>

			{#if $form.subjectType === 'country'}
				<div>
					<label for="countryId" class="block text-sm font-medium text-gray-700">Country <span class="text-red-500">*</span></label>
					<select id="countryId" name="countryId" bind:value={$form.countryId}
						class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
						<option value="">Select country…</option>
						{#each data.countries as c}
							<option value={c.id}>{c.flagEmoji ? c.flagEmoji + ' ' : ''}{c.name}</option>
						{/each}
					</select>
					{#if $errors.countryId}<p class="mt-1 text-xs text-red-600">{$errors.countryId}</p>{/if}
				</div>
			{/if}

			{#if $form.subjectType === 'location'}
				<div>
					<label for="locationId" class="block text-sm font-medium text-gray-700">Location <span class="text-red-500">*</span></label>
					<select id="locationId" name="locationId" bind:value={$form.locationId}
						class="mt-1 block w-full rounded-md border-gray-300 text-sm shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
						<option value="">Select location…</option>
						{#each data.locations as loc}
							<option value={loc.id}>{loc.name} ({loc.country.name})</option>
						{/each}
					</select>
					{#if $errors.locationId}<p class="mt-1 text-xs text-red-600">{$errors.locationId}</p>{/if}
				</div>
			{/if}

			<button type="submit" disabled={$submitting}
				class="rounded-lg bg-indigo-600 px-5 py-2 text-sm font-medium text-white hover:bg-indigo-700 disabled:opacity-50">
				{$submitting ? 'Creating…' : 'Create Feature'}
			</button>
		</form>
	</div>
</div>
