<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { z } from 'zod';
	import { untrack } from 'svelte';
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	type SendOtpMessage = { step: 'verify'; email: string } | { error: string };
	type VerifyOtpMessage = { error: string };

	const sendOtpSchema = z.object({ email: z.string().email() });

	let step = $state<'email' | 'otp'>('email');
	let savedEmail = $state('');
	let otpDigits = $state(['', '', '', '', '', '']);

	const {
		form: emailForm,
		errors: emailErrors,
		enhance: emailEnhance,
		submitting: emailSubmitting,
		message: emailMessage
	} = superForm(untrack(() => data.sendOtpForm), {
		validators: zod4Client(sendOtpSchema),
		onUpdate({ form }) {
			const msg = form.message as SendOtpMessage | undefined;
			if (msg && 'step' in msg && msg.step === 'verify') {
				savedEmail = msg.email;
				step = 'otp';
			}
		}
	});

	const {
		enhance: otpEnhance,
		submitting: otpSubmitting,
		message: otpMessage
	} = superForm(untrack(() => data.verifyOtpForm));
	// Cast message type for template checks
	const typedOtpMessage = otpMessage as import('svelte/store').Readable<VerifyOtpMessage | undefined>;

	function focusOtpInput(index: number) {
		(document.getElementById(`otp-${index}`) as HTMLInputElement | null)?.focus();
	}

	function handleOtpInput(index: number, e: Event) {
		const input = e.target as HTMLInputElement;
		const digit = input.value.replace(/\D/g, '').slice(-1);
		otpDigits[index] = digit;
		// Keep the DOM value in sync (maxlength="1" may not filter non-digits)
		input.value = digit;
		if (digit && index < 5) focusOtpInput(index + 1);
	}

	function handleOtpKeydown(index: number, e: KeyboardEvent) {
		if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
			otpDigits[index - 1] = '';
			focusOtpInput(index - 1);
		}
	}

	function handleOtpPaste(e: ClipboardEvent) {
		e.preventDefault();
		const pasted = (e.clipboardData?.getData('text') ?? '').replace(/\D/g, '').slice(0, 6);
		for (let i = 0; i < 6; i++) {
			otpDigits[i] = pasted[i] ?? '';
		}
		focusOtpInput(Math.min(pasted.length, 5));
	}
</script>

<div class="flex min-h-screen items-center justify-center bg-gray-50 px-4">
	<div class="w-full max-w-md rounded-2xl bg-white p-8 shadow-sm ring-1 ring-gray-200">
		<div class="mb-8">
			<h1 class="text-2xl font-semibold text-gray-900">Admin Login</h1>
			<p class="mt-1 text-sm text-gray-500">Evajo Tours &amp; Travel</p>
		</div>

		{#if step === 'email'}
			<form method="POST" action="?/sendOtp" use:emailEnhance>
				<div class="mb-5">
					<label for="email" class="mb-1.5 block text-sm font-medium text-gray-700">
						Email address
					</label>
					<input
						id="email"
						name="email"
						type="email"
						autocomplete="email"
						bind:value={$emailForm.email}
						class="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-gray-900 placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
						placeholder="you@example.com"
					/>
					{#if $emailErrors.email}
						<p class="mt-1.5 text-sm text-red-600">{$emailErrors.email}</p>
					{/if}
				</div>

				{#if $emailMessage && 'error' in $emailMessage}
					<p class="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
						{($emailMessage as { error: string }).error}
					</p>
				{/if}

				<button
					type="submit"
					disabled={$emailSubmitting}
					class="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
				>
					{$emailSubmitting ? 'Sending…' : 'Send code'}
				</button>
			</form>
		{:else}
			<form method="POST" action="?/verifyOtp" use:otpEnhance>
				<input type="hidden" name="email" value={savedEmail} />

				<p class="mb-6 text-sm text-gray-600">
					We sent a 6-digit code to <strong class="text-gray-900">{savedEmail}</strong>.
				</p>

				<div class="mb-6">
					<label for="otp-0" class="mb-3 block text-sm font-medium text-gray-700">Verification code</label>
					<div class="flex gap-2">
						{#each [0, 1, 2, 3, 4, 5] as i}
							<input
								id="otp-{i}"
								type="text"
								inputmode="numeric"
								maxlength="1"
								value={otpDigits[i]}
								oninput={(e) => handleOtpInput(i, e)}
								onkeydown={(e) => handleOtpKeydown(i, e)}
								onpaste={handleOtpPaste}
								class="h-12 w-full rounded-lg border border-gray-300 text-center text-xl font-bold text-gray-900 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
							/>
						{/each}
					</div>
					<input type="hidden" name="code" value={otpDigits.join('')} />
				</div>

				{#if $typedOtpMessage && 'error' in $typedOtpMessage}
					<p class="mb-5 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
						{($typedOtpMessage as VerifyOtpMessage).error}
					</p>
				{/if}

				<button
					type="submit"
					disabled={$otpSubmitting}
					class="mb-4 w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
				>
					{$otpSubmitting ? 'Verifying…' : 'Verify'}
				</button>

				<p class="text-center text-sm text-gray-500">
					Didn't receive a code?
					<button
						type="button"
						onclick={() => (step = 'email')}
						class="text-blue-600 hover:underline"
					>
						Resend code
					</button>
				</p>
			</form>
		{/if}
	</div>
</div>
