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
	class="group relative block aspect-[3/4] overflow-hidden bg-gray-100"
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
		{#if flagEmoji}
			<span class="text-2xl">{flagEmoji}</span>
		{/if}
		<h3 class="mt-1 font-display text-3xl tracking-wide text-white">{name}</h3>
		<p class="mt-1 text-xs text-white/55">
			{tourCount}
			{tourCount === 1 ? 'tour' : 'tours'}
		</p>
	</div>
</a>


<a
	href="/destinations/{code}"
	class="group relative flex aspect-[3/4] flex-col overflow-hidden rounded-xl shadow-sm transition-shadow hover:shadow-md"
>
	<div class="absolute inset-0">
		{#if imageUrl}
			<img
				src={imageUrl}
				alt={name}
				loading="lazy"
				class="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
			/>
		{:else}
			<div class="h-full w-full bg-primary/30"></div>
		{/if}
		<div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
	</div>
	<div class="relative mt-auto p-4 text-white">
		{#if flagEmoji}
			<div class="mb-1 text-2xl">{flagEmoji}</div>
		{/if}
		<h3 class="text-lg font-bold leading-tight">{name}</h3>
		<p class="mt-0.5 text-xs text-white/70">
			{tourCount}
			{tourCount === 1 ? 'tour' : 'tours'}
		</p>
	</div>
</a>
