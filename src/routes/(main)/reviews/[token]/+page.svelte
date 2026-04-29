<script lang="ts">
	import type { PageData } from './$types';
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { reviewSchema } from '$lib/schemas/review';
	import HeadlineReveal from '$lib/components/HeadlineReveal.svelte';
	import Btn from '$lib/components/ui/Btn.svelte';
	import { Star } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();

	const { form, errors, enhance, submitting, message } = superForm(data.form, {
		validators: zod4Client(reviewSchema),
	});

	let hovered = $state(0);

	function setRating(val: number) {
		$form.rating = val;
	}
</script>

<svelte:head>
	<title>Leave a Review - Evajo Tours & Travel</title>
</svelte:head>

<div class="bg-primary pb-20 pt-36">
	<div class="mx-auto max-w-2xl px-6">
		<p class="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent">Thank You</p>
		<HeadlineReveal>
			<h1 class="font-display text-[clamp(2.5rem,6vw,5rem)] leading-none tracking-wide text-white">
				{#if data.invite.used}
					Already Submitted
				{:else}
					Share Your Experience
				{/if}
			</h1>
		</HeadlineReveal>
	</div>
</div>

<section class="min-h-[60vh] bg-[#f5f3f0] py-20">
	<div class="mx-auto max-w-xl px-6">
		{#if data.invite.used && !$message?.success}
			<!-- Already used -->
			<div class="rounded-2xl bg-white p-10 text-center shadow-sm">
				<p class="text-lg font-semibold text-black">This link has already been used.</p>
				<p class="mt-2 text-sm text-gray-500">Each review link can only be submitted once.</p>
				<div class="mt-8">
					<Btn href="/" variant="primary">Back to Home</Btn>
				</div>
			</div>
		{:else if $message?.success}
			<!-- Success state -->
			<div class="rounded-2xl bg-white p-10 text-center shadow-sm">
				<div class="mb-4 flex justify-center gap-1">
					{#each Array(5) as _, i}
						<Star
							size={32}
							class={i < ($form.rating ?? 5) ? 'fill-accent text-accent' : 'text-gray-200'}
						/>
					{/each}
				</div>
				<h2 class="font-display text-3xl tracking-wide text-black">Thank You!</h2>
				<p class="mt-3 text-sm text-gray-600">
					Your review has been submitted and is awaiting approval. We truly appreciate your feedback.
				</p>
				<div class="mt-8">
					<Btn href="/" variant="primary">Back to Home</Btn>
				</div>
			</div>
		{:else}
			<!-- Review form -->
			<div class="rounded-2xl bg-white p-8 shadow-sm">
				<h2 class="mb-6 font-display text-2xl tracking-wide text-black">Your Review</h2>

				<form method="POST" use:enhance class="space-y-5">
					<!-- Star rating -->
					<div>
						<p class="mb-2 block text-xs font-semibold uppercase tracking-widest text-gray-500">
							Rating
						</p>
						<div class="flex gap-2">
							{#each [1, 2, 3, 4, 5] as star}
								<button
									type="button"
									onclick={() => setRating(star)}
									onmouseenter={() => (hovered = star)}
									onmouseleave={() => (hovered = 0)}
									class="transition-transform hover:scale-110"
								>
									<Star
										size={32}
										class={(hovered !== 0 ? hovered : ($form.rating ?? 0)) >= star
											? 'fill-accent text-accent'
											: 'text-gray-200'}
									/>
								</button>
							{/each}
						</div>
						<input type="hidden" name="rating" value={$form.rating ?? 5} />
						{#if $errors.rating}
							<p class="mt-1 text-xs text-red-500">{$errors.rating}</p>
						{/if}
					</div>

					<!-- Client name -->
					<div>
						<label
							for="clientName"
							class="mb-1 block text-xs font-semibold uppercase tracking-widest text-gray-500"
						>
							Your Name
						</label>
						<input
							id="clientName"
							name="clientName"
							type="text"
							bind:value={$form.clientName}
							class="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
							placeholder="Jane Smith"
						/>
						{#if $errors.clientName}
							<p class="mt-1 text-xs text-red-500">{$errors.clientName}</p>
						{/if}
					</div>

					<!-- Country -->
					<div>
						<label
							for="country"
							class="mb-1 block text-xs font-semibold uppercase tracking-widest text-gray-500"
						>
							Country <span class="font-normal normal-case text-gray-400">(optional)</span>
						</label>
						<input
							id="country"
							name="country"
							type="text"
							bind:value={$form.country}
							class="w-full rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
							placeholder="United Kingdom"
						/>
					</div>

					<!-- Quote -->
					<div>
						<label
							for="quote"
							class="mb-1 block text-xs font-semibold uppercase tracking-widest text-gray-500"
						>
							Your Review
						</label>
						<textarea
							id="quote"
							name="quote"
							rows="5"
							bind:value={$form.quote}
							class="w-full resize-none rounded-lg border border-gray-200 bg-gray-50 px-4 py-2.5 text-sm outline-none focus:border-accent focus:ring-1 focus:ring-accent"
							placeholder="Tell us about your experience…"
						></textarea>
						{#if $errors.quote}
							<p class="mt-1 text-xs text-red-500">{$errors.quote}</p>
						{/if}
					</div>

					<Btn type="submit" variant="primary" class="w-full" disabled={$submitting}>
						{$submitting ? 'Submitting…' : 'Submit Review'}
					</Btn>
				</form>
			</div>
		{/if}
	</div>
</section>
