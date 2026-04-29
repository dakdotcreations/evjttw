<script lang="ts">
	let {
		code,
		name,
		flagEmoji,
		imageUrl,
		tourCount
	}: {
		code: string;
		name: string;
		flagEmoji: string | null;
		imageUrl: string | null;
		tourCount: number;
	} = $props();
</script>

<a
	href="/destinations/{code}"
	class="group relative block aspect-square overflow-hidden bg-gray-100"
>
	{#if imageUrl}
		<img
			src={imageUrl}
			alt={name}
			loading="lazy"
			class="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.06]"
		/>
	{:else}
		<div class="absolute inset-0 flex items-center justify-center bg-primary/20">
			<span class="text-5xl">{flagEmoji ?? '🌍'}</span>
		</div>
	{/if}

	<!-- Gradient -->
	<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/0"></div>

	<!-- Content -->
	<div class="absolute bottom-0 left-0 right-0 p-5">
		<h3 class="mt-1 font-display text-3xl md:text-5xl tracking-wide text-white">{name}</h3>
	</div>
</a>

