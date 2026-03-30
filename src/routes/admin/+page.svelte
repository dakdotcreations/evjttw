<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-50">
	<div class="text-center">
		<p class="text-lg text-gray-700">
			You are logged in as <strong>{data.user.email}</strong>.
		</p>
		<a href="/logout" class="mt-4 inline-block text-sm text-blue-600 hover:underline">Log out</a>
	</div>
</div>
