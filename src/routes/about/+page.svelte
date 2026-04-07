<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>About Us — Evajo Tours & Travel</title>
	<meta
		name="description"
		content="Learn about Evajo Tours & Travel — East Africa's dedicated safari and adventure specialists."
	/>
</svelte:head>

<!-- Hero -->
<div class="bg-primary pb-12 pt-24 text-white">
	<div class="mx-auto max-w-4xl px-4 sm:px-6">
		<p class="mb-1 text-xs font-semibold uppercase tracking-widest text-accent">Our Story</p>
		<h1 class="text-3xl font-bold sm:text-4xl">About Evajo Tours & Travel</h1>
	</div>
</div>

<!-- Story section -->
<div class="bg-white py-12 sm:py-16">
	<div class="mx-auto max-w-4xl px-4 sm:px-6">
		<div class="prose prose-gray max-w-none">
			<p>
				Evajo Tours & Travel is a Kampala-based tour operator founded by passionate East Africans who
				believe the best way to experience the continent is with people who truly know it.
			</p>
			<p>
				From mountain gorilla treks in Bwindi to wildebeest migrations on the Serengeti, white-water
				rafting on the Nile to flamingo-edged lakes in Rwanda — we curate journeys that go beyond the
				surface.
			</p>
			<p>
				We work directly with local guides, lodges, and conservation projects so that every trip
				supports the communities and ecosystems you come to see.
			</p>
		</div>

		<div class="mt-10 grid grid-cols-2 gap-6 sm:grid-cols-4">
			{#each [{ value: '10+', label: 'Years of experience' }, { value: '500+', label: 'Happy travellers' }, { value: '4', label: 'Countries covered' }, { value: '100%', label: 'Tailor-made trips' }] as stat (stat.label)}
				<div class="rounded-xl bg-gray-50 p-5 text-center">
					<p class="text-2xl font-bold text-primary">{stat.value}</p>
					<p class="mt-1 text-xs text-gray-500">{stat.label}</p>
				</div>
			{/each}
		</div>
	</div>
</div>

<!-- Testimonials -->
{#if data.testimonials.length > 0}
	<div class="border-t border-gray-100 bg-gray-50 py-12 sm:py-16">
		<div class="mx-auto max-w-5xl px-4 sm:px-6">
			<h2 class="mb-8 text-center text-2xl font-bold text-black sm:text-3xl">
				What Our Clients Say
			</h2>
			<div class="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{#each data.testimonials as t (t.id)}
					<div class="flex flex-col rounded-2xl bg-white p-6 shadow-sm">
						<!-- Stars -->
						<div class="mb-3 flex gap-0.5">
							{#each Array.from({ length: t.rating }) as _, i (i)}
								<svg
									class="h-4 w-4 text-accent"
									fill="currentColor"
									viewBox="0 0 20 20"
									aria-hidden="true"
								>
									<path
										d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
									/>
								</svg>
							{/each}
						</div>
						<blockquote class="grow text-sm leading-relaxed text-gray-600">
							"{t.quote}"
						</blockquote>
						<footer class="mt-4">
							<p class="text-sm font-semibold text-black">{t.clientName}</p>
							{#if t.country}
								<p class="text-xs text-gray-400">{t.country}</p>
							{/if}
						</footer>
					</div>
				{/each}
			</div>
		</div>
	</div>
{/if}

<!-- CTA -->
<div class="bg-accent py-12 text-center sm:py-16">
	<div class="mx-auto max-w-2xl px-4 sm:px-6">
		<h2 class="text-2xl font-bold text-primary sm:text-3xl">Ready to explore East Africa?</h2>
		<p class="mt-2 text-sm text-primary/70">Let us build your perfect trip.</p>
		<a
			href="/contact"
			class="mt-6 inline-block rounded-full bg-primary px-8 py-3 text-sm font-semibold text-white transition hover:bg-primary/90"
		>
			Get In Touch
		</a>
	</div>
</div>
