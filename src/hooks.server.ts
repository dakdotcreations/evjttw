import type { Handle } from '@sveltejs/kit';
import type { User } from '$generated/prisma/client';
import {
	validateSession,
	verifyAccessToken,
	generateAccessToken,
	setAccessTokenCookie,
	deleteAccessTokenCookie,
	deleteSessionCookie,
	REFRESH_TOKEN_COOKIE,
	ACCESS_TOKEN_COOKIE
} from '$lib/server/auth';

export const handle: Handle = async ({ event, resolve }) => {
	const refreshToken = event.cookies.get(REFRESH_TOKEN_COOKIE);

	if (!refreshToken) {
		event.locals.user = null;
		event.locals.session = null;
		return resolve(event);
	}

	// Fast path: verify HMAC-signed access token — no DB call
	const accessToken = event.cookies.get(ACCESS_TOKEN_COOKIE);
	if (accessToken) {
		const payload = verifyAccessToken(accessToken);
		if (payload) {
			event.locals.user = {
				id: payload.userId,
				name: payload.name,
				email: payload.email,
				createdAt: new Date(0),
				updatedAt: new Date(0)
			} satisfies User;
			event.locals.session = null;
			return resolve(event);
		}
	}

	// Slow path: validate refresh token against DB, reissue access token
	const { session, user } = await validateSession(refreshToken);
	event.locals.session = session;
	event.locals.user = user;

	if (session && user) {
		setAccessTokenCookie(event.cookies, generateAccessToken(user, session.id));
	} else {
		deleteAccessTokenCookie(event.cookies);
		deleteSessionCookie(event.cookies);
	}

	return resolve(event);
};
