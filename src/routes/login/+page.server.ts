import { superValidate, message, fail } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { z } from 'zod';
import { redirect } from '@sveltejs/kit';
import prisma from '$lib/server/prisma';
import { createOtp, verifyOtp as verifyOtpCode } from '$lib/server/otp';
import { sendOtpEmail } from '$lib/server/mail';
import { generateSessionToken, createSession, setSessionCookie } from '$lib/server/auth';
import type { Actions, PageServerLoad } from './$types';

const sendOtpSchema = z.object({
	email: z.string().email()
});

const verifyOtpSchema = z.object({
	email: z.string().email(),
	code: z.string().length(6)
});

export const load: PageServerLoad = async () => {
	const [sendOtpForm, verifyOtpForm] = await Promise.all([
		superValidate(zod4(sendOtpSchema), { id: 'send-otp' }),
		superValidate(zod4(verifyOtpSchema), { id: 'verify-otp' })
	]);
	return { sendOtpForm, verifyOtpForm };
};

export const actions: Actions = {
	sendOtp: async ({ request }) => {
		const form = await superValidate(request, zod4(sendOtpSchema), { id: 'send-otp' });

		if (!form.valid) {
			return fail(400, { sendOtpForm: form });
		}

		const user = await prisma.user.findUnique({ where: { email: form.data.email } });
		if (!user) {
			return message(form, { error: 'No account found for that email.' });
		}

		const code = await createOtp(user.id);
		await sendOtpEmail(form.data.email, code);

		return message(form, { step: 'verify' as const, email: form.data.email });
	},

	verifyOtp: async ({ request, cookies }) => {
		const form = await superValidate(request, zod4(verifyOtpSchema), { id: 'verify-otp' });

		if (!form.valid) {
			return fail(400, { verifyOtpForm: form });
		}

		const user = await prisma.user.findUnique({ where: { email: form.data.email } });
		if (!user) {
			return message(form, { error: 'Invalid or expired code.' });
		}

		const valid = await verifyOtpCode(user.id, form.data.code);
		if (!valid) {
			return message(form, { error: 'Invalid or expired code.' });
		}

		const token = generateSessionToken();
		const session = await createSession(token, user.id);
		setSessionCookie(cookies, token, session.expiresAt);

		redirect(303, '/admin');
	}
};
