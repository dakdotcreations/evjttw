import { superValidate, message } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { contactSchema } from '$lib/schemas/contactForm';
import { sendContactEmail } from '$lib/server/mail';
import type { PageServerLoad, Actions } from './$types';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod4(contactSchema)),
	};
};

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod4(contactSchema));

		if (!form.valid) {
			return { form };
		}

		try {
			await sendContactEmail({
				name: form.data.name,
				email: form.data.email,
				phone: form.data.phone,
				subject: form.data.subject,
				message: form.data.message,
			});
		} catch {
			// Log failure but don't expose details to client
			console.error('[contact] Failed to send contact email');
		}

		return message(form, { success: true });
	},
};
