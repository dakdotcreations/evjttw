<script lang="ts">
	import type { SuperValidated, Infer } from 'sveltekit-superforms';
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { contactSchema } from '$lib/schemas/contactForm';

	let {
		formData,
	}: {
		formData: SuperValidated<Infer<typeof contactSchema>>;
	} = $props();

	const { form, errors, enhance, submitting, message } = superForm(formData, {
		validators: zod4Client(contactSchema),
	});
</script>

{#if $message?.success}
	<div class="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
		<p class="font-semibold text-green-800">Message sent!</p>
		<p class="mt-1 text-sm text-green-700">We'll be in touch within 24 hours.</p>
	</div>
{:else}
	<form method="POST" use:enhance class="space-y-4">
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
			<div>
				<label for="cf-name" class="mb-1 block text-xs font-semibold text-gray-700">
					Full Name <span class="text-accent">*</span>
				</label>
				<input
					id="cf-name"
					name="name"
					type="text"
					autocomplete="name"
					bind:value={$form.name}
					class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
				/>
				{#if $errors.name}<p class="mt-1 text-xs text-red-600">{$errors.name}</p>{/if}
			</div>
			<div>
				<label for="cf-email" class="mb-1 block text-xs font-semibold text-gray-700">
					Email <span class="text-accent">*</span>
				</label>
				<input
					id="cf-email"
					name="email"
					type="email"
					autocomplete="email"
					bind:value={$form.email}
					class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
				/>
				{#if $errors.email}<p class="mt-1 text-xs text-red-600">{$errors.email}</p>{/if}
			</div>
		</div>
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
			<div>
				<label for="cf-phone" class="mb-1 block text-xs font-semibold text-gray-700">Phone</label>
				<input
					id="cf-phone"
					name="phone"
					type="tel"
					autocomplete="tel"
					bind:value={$form.phone}
					class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
				/>
			</div>
			<div>
				<label for="cf-subject" class="mb-1 block text-xs font-semibold text-gray-700">Subject</label>
				<input
					id="cf-subject"
					name="subject"
					type="text"
					bind:value={$form.subject}
					class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
				/>
			</div>
		</div>
		<div>
			<label for="cf-message" class="mb-1 block text-xs font-semibold text-gray-700">
				Message <span class="text-accent">*</span>
			</label>
			<textarea
				id="cf-message"
				name="message"
				rows="5"
				bind:value={$form.message}
				class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
			></textarea>
			{#if $errors.message}<p class="mt-1 text-xs text-red-600">{$errors.message}</p>{/if}
		</div>
		<button
			type="submit"
			disabled={$submitting}
			class="w-full rounded-lg bg-primary px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-60"
		>
			{$submitting ? 'Sending…' : 'Send Message'}
		</button>
	</form>
{/if}
