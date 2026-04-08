<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { z } from 'zod';
	import { untrack } from 'svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const schema = z.object({
		name: z.string().min(1),
		email: z.string().email()
	});

	const { form, errors, enhance, submitting } = superForm(untrack(() => data.form), {
		validators: zod4Client(schema)
	});
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-50 px-4">
	<div class="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
		<div class="mb-8">
			<h1 class="text-2xl font-semibold text-gray-900">Create Admin Account</h1>
			<p class="mt-1 text-sm text-gray-500">Set up the first admin user for Evajo Tours &amp; Travel.</p>
		</div>

		<form method="POST" use:enhance>
			<div class="mb-5">
				<label for="name" class="mb-1.5 block text-sm font-medium text-gray-700">Full name</label>
				<input
					id="name"
					name="name"
					type="text"
					autocomplete="name"
					bind:value={$form.name}
					class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
					placeholder="Jane Smith"
				/>
				{#if $errors.name}
					<p class="mt-1.5 text-sm text-red-600">{$errors.name}</p>
				{/if}
			</div>

			<div class="mb-6">
				<label for="email" class="mb-1.5 block text-sm font-medium text-gray-700">Email address</label>
				<input
					id="email"
					name="email"
					type="email"
					autocomplete="email"
					bind:value={$form.email}
					class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
					placeholder="you@example.com"
				/>
				{#if $errors.email}
					<p class="mt-1.5 text-sm text-red-600">{$errors.email}</p>
				{/if}
			</div>

			<button
				type="submit"
				disabled={$submitting}
				class="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
			>
				{$submitting ? 'Creating…' : 'Create account'}
			</button>
		</form>
	</div>
</div>
