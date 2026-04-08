<script lang="ts">
	import { page } from '$app/state';
	import {
		LayoutDashboard,
		Map,
		Globe,
		MapPin,
		Star,
		MessageSquare,
		Link,
		Users,
		LogOut
	} from 'lucide-svelte';
	import type { LayoutData } from './$types';

	let { data, children }: { data: LayoutData; children: import('svelte').Snippet } = $props();

	const navItems = [
		{ href: '/admin', label: 'Dashboard', icon: LayoutDashboard, exact: true },
		{ href: '/admin/itineraries', label: 'Itineraries', icon: Map, exact: false },
		{ href: '/admin/countries', label: 'Countries', icon: Globe, exact: false },
		{ href: '/admin/locations', label: 'Locations', icon: MapPin, exact: false },
		{ href: '/admin/features', label: 'Features', icon: Star, exact: false },
		{ href: '/admin/testimonials', label: 'Testimonials', icon: MessageSquare, exact: false },
		{ href: '/admin/invites', label: 'Review Invites', icon: Link, exact: false },
		{ href: '/admin/users', label: 'Users', icon: Users, exact: false }
	];

	const titles: Record<string, string> = {
		'/admin': 'Dashboard',
		'/admin/itineraries': 'Itineraries',
		'/admin/countries': 'Countries',
		'/admin/locations': 'Locations',
		'/admin/features': 'Features',
		'/admin/testimonials': 'Testimonials',
		'/admin/invites': 'Review Invites',
		'/admin/users': 'Users'
	};

	const pageTitle = $derived.by(() => {
		const pathname = page.url.pathname;
		// Exact match first
		if (titles[pathname]) return titles[pathname];
		// Segment match — find longest prefix
		const match = Object.keys(titles)
			.filter((k) => k !== '/admin' && pathname.startsWith(k))
			.sort((a, b) => b.length - a.length)[0];
		return match ? titles[match] : 'Admin';
	});

	function isActive(href: string, exact: boolean) {
		const pathname = page.url.pathname;
		return exact ? pathname === href : pathname === href || pathname.startsWith(href + '/');
	}
</script>

<div class="flex min-h-screen">
	<!-- Sidebar -->
	<aside class="fixed inset-y-0 left-0 z-10 flex w-64 flex-col bg-gray-900 text-white">
		<!-- Header -->
		<div class="flex flex-col gap-0.5 border-b border-gray-700 px-6 py-5">
			<span class="text-lg font-bold tracking-tight text-white">Evajo Admin</span>
			<span class="text-sm text-gray-400">{data.user.name}</span>
		</div>

		<!-- Nav -->
		<nav class="flex-1 overflow-y-auto px-3 py-4">
			<ul class="space-y-1">
				{#each navItems as item}
					{@const active = isActive(item.href, item.exact)}
					<li>
						<a
							href={item.href}
							class="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors {active
								? 'bg-gray-700 text-white'
								: 'text-gray-300 hover:bg-gray-800 hover:text-white'}"
						>
							<item.icon class="h-4 w-4 shrink-0" />
							{item.label}
						</a>
					</li>
				{/each}
			</ul>
		</nav>

		<!-- Logout -->
		<div class="border-t border-gray-700 px-3 py-4">
			<a
				href="/logout"
				class="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-300 transition-colors hover:bg-gray-800 hover:text-white"
			>
				<LogOut class="h-4 w-4 shrink-0" />
				Log out
			</a>
		</div>
	</aside>

	<!-- Main -->
	<div class="ml-64 flex min-h-screen flex-1 flex-col bg-gray-50">
		<!-- Top bar -->
		<header class="sticky top-0 z-10 border-b border-gray-200 bg-white px-8 py-4">
			<h1 class="text-xl font-semibold text-gray-900">{pageTitle}</h1>
		</header>

		<!-- Content -->
		<main class="flex-1 p-8">
			{@render children()}
		</main>
	</div>
</div>
