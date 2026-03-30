import { redirect } from '@sveltejs/kit';
import { invalidateSession, deleteSessionCookie, SESSION_COOKIE } from '$lib/server/auth';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const token = cookies.get(SESSION_COOKIE);

	if (token) {
		await invalidateSession(token);
		deleteSessionCookie(cookies);
	}

	redirect(303, '/login');
};
