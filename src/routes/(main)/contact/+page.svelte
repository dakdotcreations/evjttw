<script lang="ts">
	import type { PageData } from './$types';
	import ContactForm from '$lib/components/ContactForm.svelte';
	import HeadlineReveal from '$lib/components/HeadlineReveal.svelte';
	import ParaFade from '$lib/components/ParaFade.svelte';
	import { Mail, Phone, MapPin } from 'lucide-svelte';

	let { data }: { data: PageData } = $props();
</script>

<svelte:head>
	<title>Contact Us - Evajo Tours & Travel</title>
	<meta
		name="description"
		content="Get in touch with Evajo Tours & Travel to plan your East Africa safari or trek."
	/>
</svelte:head>

<!-- HERO -->
<div class="bg-primary pb-20 pt-36">
	<div class="mx-auto max-w-7xl px-6 lg:px-8">
		<p class="mb-4 text-xs font-semibold uppercase tracking-[0.25em] text-accent">Let's Talk</p>
		<HeadlineReveal>
			<h1 class="font-display text-[clamp(3rem,7vw,6rem)] leading-none tracking-wide text-white">
				Plan Your Adventure
			</h1>
		</HeadlineReveal>
		<ParaFade delay={0.3}>
			<p class="mt-5 max-w-xl text-sm leading-relaxed text-white/60">
				Whether you have a specific destination in mind or just a dream, we'll turn it into
				the trip of a lifetime.
			</p>
		</ParaFade>
	</div>
</div>

<!-- SPLIT LAYOUT -->
<section class="bg-white lg:bg-linear-to-r lg:from-[#f5f3f0] lg:to-40% lg:to-white/50">
	<div class="mx-auto grid max-w-7xl gap-0 lg:grid-cols-[38fr_62fr]">
		<!-- Left info panel -->
		<div class="bg-[#f5f3f0] px-8 py-16 lg:px-12 lg:py-20">
			<p class="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">Find Us</p>
			<h2 class="mb-8 font-display text-3xl tracking-wide text-black">Get In Touch</h2>

			<div class="space-y-6 text-sm text-gray-700">
				<div class="flex items-start gap-3">
					<MapPin size={18} class="mt-0.5 shrink-0 text-accent" />
					<div>
                        <p class="font-semibold">Seeta Namilyango Road, Mukono</p>
                        <p class="text-gray-500">Kampala–Jinja Highway · P.O.Box 141615, Kampala, Uganda</p>
					</div>
                </div>
                <div class="flex items-start gap-3">
                    <Phone size={18} class="mt-0.5 shrink-0 text-accent" />
                    <div class="space-y-1">
                        <a href="tel:+256708506649" class="block hover:text-primary">
                            +256 708 506 649 <span class="text-gray-400">(Direct)</span>
                        </a>
                        <a href="tel:+256780379017" class="block hover:text-primary">
                            +256 780 379 017
                        </a>
                        <a href="https://wa.me/256703879666" target="_blank" rel="noopener noreferrer" class="block hover:text-primary">
                            +256 703 879 666 <span class="text-gray-400">(WhatsApp)</span>
                        </a>
                    </div>
                </div>
                <div class="flex items-center gap-3">
                    <Mail size={18} class="shrink-0 text-accent" />
                    <div class="space-y-1">
                        <a href="mailto:info@evajotoursandtravel.com" class="block hover:text-primary">
                            info@evajotoursandtravel.com</a>
                    </div>
                </div>
				<p class="mb-3 text-xs font-semibold uppercase tracking-widest opacity-60">
					Response time
				</p>
				<p class="text-sm text-gray-600">
					We reply to all enquiries within <strong class="text-black">24 hours</strong>. For urgent
					matters reach us via WhatsApp.
				</p>
			</div>
		</div>

		<!-- Right form -->
		<div class="px-8 py-16 lg:px-16 lg:py-20">
			<p class="mb-2 text-xs font-semibold uppercase tracking-widest text-accent">Send a Message</p>
			<h2 class="mb-8 font-display text-3xl tracking-wide text-black">Tell Us About Your Adventure</h2>
			<ContactForm formData={data.form} />
		</div>
	</div>
</section>
