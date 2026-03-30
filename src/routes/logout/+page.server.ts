import { redirect } from '@sveltejs/kit';
import {
	invalidateSession,
	deleteSessionCookie,
	deleteAccessTokenCookie,
	REFRESH_TOKEN_COOKIE
} from '$lib/server/auth';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ cookies }) => {
	const token = cookies.get(REFRESH_TOKEN_COOKIE);

	if (token) {
		await invalidateSession(token);
		deleteSessionCookie(cookies);
	}
	deleteAccessTokenCookie(cookies);

	redirect(303, '/login');
};
