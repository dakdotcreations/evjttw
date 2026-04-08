<script lang="ts">
	import { onMount } from 'svelte';
	import { Star } from 'lucide-svelte';
	import { loadGsap } from '$lib/utils/useGsap';

	let {
		testimonials
	}: {
		testimonials: {
			id: string;
			clientName: string;
			country: string | null;
			rating: number;
			quote: string;
		}[];
	} = $props();

	let strip: HTMLElement = $state() as HTMLElement;
	let cards: HTMLElement[] = $state([]);

	onMount(() => {
		if (!strip || cards.length === 0) return;

		let observer: IntersectionObserver;

		observer = new IntersectionObserver(
			async ([entry]) => {
				if (!entry.isIntersecting) return;
				observer.disconnect();

				const { gsap } = await loadGsap();

				gsap.from(cards, {
					opacity: 0,
					y: 24,
					stagger: 0.1,
					duration: 0.6,
					ease: 'power2.out'
				});

				cards.forEach((card, i) => {
					const starItems = card.querySelectorAll('.star-item');
					gsap.from(starItems, {
						opacity: 0,
						scale: 0.5,
						stagger: 0.06,
						duration: 0.3,
						ease: 'back.out(1.7)',
						delay: i * 0.1 + 0.4
					});
				});
			},
			{ threshold: 0.15 }
		);

		observer.observe(strip);
		return () => observer.disconnect();
	});
</script>

{#if testimonials.length > 0}
	<section class="overflow-hidden bg-primary py-20">
		<div class="mx-auto max-w-7xl px-6 lg:px-8">
			<div class="mb-10">
				<p class="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">
					What They Say
				</p>
				<h2 class="font-display text-5xl tracking-wide text-white">What our travelers say</h2>
			</div>

			<div
				bind:this={strip}
				class="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4"
			>
				{#each testimonials as t, i (t.id)}
					<div
						bind:this={cards[i]}
						class="w-80 shrink-0 snap-start bg-white/10 p-6 backdrop-blur-sm"
					>
						<div class="mb-4 flex gap-1">
							{#each Array.from({ length: 5 }) as _, si (si)}
								<span class="star-item">
									<Star
										size={14}
										class={si < t.rating ? 'fill-accent text-accent' : 'text-white/20'}
									/>
								</span>
							{/each}
						</div>
						<p class="mb-6 text-sm leading-relaxed text-white/80">"{t.quote}"</p>
						<div>
							<p class="text-sm font-semibold text-white">{t.clientName}</p>
							{#if t.country}<p class="text-xs text-white/50">{t.country}</p>{/if}
						</div>
					</div>
				{/each}
			</div>
		</div>
	</section>
{/if}
