<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import type { SuperValidated, Infer } from 'sveltekit-superforms';
	import { bookingEnquirySchema } from '$lib/schemas/bookingEnquiry';

	let { formData }: { formData: SuperValidated<Infer<typeof bookingEnquirySchema>> } = $props();

	const { form, errors, enhance, submitting, message } = superForm(formData, {
		validators: zod4Client(bookingEnquirySchema),
	});
</script>

{#if ($message as { success?: string } | undefined)?.success}
	<div class="rounded-lg border border-green-200 bg-green-50 px-4 py-4 text-sm text-green-700">
		✓ {($message as { success: string }).success}
	</div>
{:else}
	<form method="POST" use:enhance class="space-y-4">
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
			<div>
				<label for="enq-name" class="mb-1 block text-sm font-medium text-black">
					Full Name <span class="text-red-500">*</span>
				</label>
				<input
					id="enq-name"
					name="name"
					type="text"
					autocomplete="name"
					bind:value={$form.name}
					class="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary {$errors.name
						? 'border-red-400'
						: 'border-gray-200 focus:border-primary'}"
				/>
				{#if $errors.name}<p class="mt-1 text-xs text-red-500">{$errors.name}</p>{/if}
			</div>
			<div>
				<label for="enq-email" class="mb-1 block text-sm font-medium text-black">
					Email <span class="text-red-500">*</span>
				</label>
				<input
					id="enq-email"
					name="email"
					type="email"
					autocomplete="email"
					bind:value={$form.email}
					class="w-full rounded-lg border px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary {$errors.email
						? 'border-red-400'
						: 'border-gray-200 focus:border-primary'}"
				/>
				{#if $errors.email}<p class="mt-1 text-xs text-red-500">{$errors.email}</p>{/if}
			</div>
		</div>
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2">
			<div>
				<label for="enq-phone" class="mb-1 block text-sm font-medium text-black">Phone</label>
				<input
					id="enq-phone"
					name="phone"
					type="tel"
					autocomplete="tel"
					bind:value={$form.phone}
					class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
				/>
			</div>
			<div>
				<label for="enq-groupSize" class="mb-1 block text-sm font-medium text-black"
					>Group Size</label
				>
				<input
					id="enq-groupSize"
					name="groupSize"
					type="number"
					min="1"
					bind:value={$form.groupSize}
					class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
				/>
			</div>
		</div>
		<div>
			<label for="enq-travelDate" class="mb-1 block text-sm font-medium text-black"
				>Planned Travel Date</label
			>
			<input
				id="enq-travelDate"
				name="travelDate"
				type="date"
				bind:value={$form.travelDate}
				class="w-full rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
			/>
		</div>
		<div>
			<label for="enq-message" class="mb-1 block text-sm font-medium text-black">Message</label>
			<textarea
				id="enq-message"
				name="message"
				rows={4}
				bind:value={$form.message}
				placeholder="Tell us about your dream trip…"
				class="w-full resize-none rounded-lg border border-gray-200 px-3 py-2 text-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
			></textarea>
		</div>
		<button
			type="submit"
			disabled={$submitting}
			class="w-full rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-black transition-colors hover:bg-accent/90 disabled:opacity-50"
		>
			{$submitting ? 'Sending…' : 'Send Enquiry'}
		</button>
	</form>
{/if}
