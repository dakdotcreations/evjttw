<script lang="ts">
	let logos = $state([
		{
			id: 'uwa',
			src: '/images/affiliates/uwa.webp',
			alt: 'Uganda Wildlife Authority'
		},
		{
			id: 'utb',
			src: '/images/affiliates/utb.webp',
			alt: 'Uganda Tourism Board'
		},
		{
			id: 'tourismuganda',
			src: '/images/affiliates/tourismuganda.webp',
			alt: 'Tourism Uganda'
		},
		{
			id: 'safaribookings',
			src: '/images/affiliates/safaribookings.webp',
			alt: 'SafariBookings'
		},
		{
			id: 'tripadvisor',
			src: '/images/affiliates/tripadvisor.webp',
			alt: 'Tripadvisor'
		},
		{
			id: 'auto',
			src: '/images/affiliates/auto.webp',
			alt: 'AUTO Travel Journal'
		}
	]);
</script>

<section class="bgc-[#f5f3f0] py-20">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<div class="max-w-2xl">
			<p class="mb-3 text-xs font-semibold uppercase tracking-widest text-accent">
				Trusted Affiliations
			</p>
			<h2 class="font-display text-4xl tracking-wide text-black">
				Partnering with tourism and conservation leaders
			</h2>
			<p class="mt-4 text-sm leading-relaxed text-gray-600">
				Evajo Tours &amp; Travel works with trusted regional authorities and travel platforms to ensure every safari is authentic, safe, and sustainable.
			</p>
		</div>

		<div class="mt-12 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
			{#each logos as logo}
				<div class="flex items-center justify-center transition-all duration-200 hover:-translate-y-1">
					<img src={logo.src} alt={logo.alt} class="h-20 w-auto object-contain" loading="lazy" />
				</div>
			{/each}
		</div>
	</div>
</section>
