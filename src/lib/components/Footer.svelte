<script lang="ts">
	import { Mail, Phone, MapPin } from 'lucide-svelte';
	const year = new Date().getFullYear();

	const explore = [
		{ href: '/tours', label: 'Tours' },
		{ href: '/destinations', label: 'Destinations' },
		{ href: '/about', label: 'About' },
		{ href: '/contact', label: 'Contact' }
	];
</script>

<footer class="bg-primary text-white">
	<div class="mx-auto max-w-7xl px-6 py-16 lg:px-8">
		<div class="grid grid-cols-1 gap-12 md:grid-cols-12">
			<!-- Brand col -->
			<div class="md:col-span-4">
				<a href="/" class="inline-block">
					<img
						src="/images/logo.svg"
						alt="Evajo Tours & Travel"
						class="h-30 w-auto brightness-0 invert"
					/>
				</a>
				<p class="mt-5 max-w-xs text-sm leading-relaxed text-white/55">
					East Africa's premier tour operator — crafting extraordinary safari, trekking &amp; wildlife
					adventures since 2014.
				</p>
			</div>

			<!-- Contact col -->
			<div class="md:col-span-3">
				<h4 class="mb-5 text-xs font-semibold uppercase tracking-widest text-accent">Contact</h4>
				<div class="space-y-2.5">
					<a href="tel:+256708506649" class="flex items-center gap-2.5 text-sm text-white/55 transition-colors hover:text-accent">
						<Phone size={14} class="shrink-0 text-accent" />+256 708 506 649
					</a>
					<a href="tel:+256780379017" class="flex items-center gap-2.5 text-sm text-white/55 transition-colors hover:text-accent">
						<Phone size={14} class="shrink-0 text-accent" />+256 780 379 017
					</a>
					<a href="mailto:info@evajotours.com" class="flex items-center gap-2.5 text-sm text-white/55 transition-colors hover:text-accent">
						<Mail size={14} class="shrink-0 text-accent" />info@evajotours.com
					</a>
					<div class="flex items-center gap-2.5 text-sm text-white/55">
						<MapPin size={14} class="shrink-0 text-accent" />Seeta Namilyango Rd, Mukono, Kampala
					</div>
				</div>
			</div>

			<!-- Explore col -->
			<div class="md:col-span-2">
				<h4 class="mb-5 text-xs font-semibold uppercase tracking-widest text-accent">Explore</h4>
				<ul class="space-y-3">
					{#each explore as link (link.href)}
						<li>
							<a href={link.href} class="text-sm text-white/55 transition-colors hover:text-accent">
								{link.label}
							</a>
						</li>
					{/each}
				</ul>
			</div>

			<!-- Social / WhatsApp col -->
			<div class="md:col-span-3">
				<h4 class="mb-5 text-xs font-semibold uppercase tracking-widest text-accent">Connect</h4>
				<div class="flex gap-4">
					<a
						href="https://wa.me/256703879666"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="WhatsApp"
						class="text-white/55 transition-colors hover:text-accent"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
							<path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
						</svg>
					</a>
					<a
						href="https://instagram.com/evajotours"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Instagram"
						class="text-white/55 transition-colors hover:text-accent"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
					</a>
					<a
						href="https://facebook.com/evajotours"
						target="_blank"
						rel="noopener noreferrer"
						aria-label="Facebook"
						class="text-white/55 transition-colors hover:text-accent"
					>
						<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
					</a>
				</div>
			</div>
		</div>

		<!-- Bottom bar -->
		<div class="mt-14 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 pt-6">
			<p class="text-xs text-white/35">&copy; {year} Evajo Tours &amp; Travel. All rights reserved.</p>
			<div class="flex gap-5">
				<a href="/contact" class="text-xs text-white/35 transition-colors hover:text-white">Contact</a>
				<a href="/about" class="text-xs text-white/35 transition-colors hover:text-white">About</a>
			</div>
		</div>
	</div>
</footer>

