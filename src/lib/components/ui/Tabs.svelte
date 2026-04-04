<script lang="ts">
	let {
		tabs,
		children
	}: {
		tabs: string[];
		children: import('svelte').Snippet<[{ activeTab: string }]>;
	} = $props();

	let activeTab = $state(tabs[0]);
</script>

<div>
	<div class="border-b border-gray-200">
		<nav class="-mb-px flex gap-6" aria-label="Tabs">
			{#each tabs as tab}
				<button
					type="button"
					onclick={() => (activeTab = tab)}
					class="whitespace-nowrap border-b-2 px-1 pb-3 text-sm font-medium transition-colors {activeTab === tab
						? 'border-indigo-600 text-indigo-600'
						: 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700'}"
				>
					{tab}
				</button>
			{/each}
		</nav>
	</div>

	<div class="pt-6">
		{@render children({ activeTab })}
	</div>
</div>
