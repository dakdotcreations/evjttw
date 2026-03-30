import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import type { Cookies } from '@sveltejs/kit';
import type { Session, User } from '$generated/prisma/client';
import prisma from './prisma';

export const SESSION_COOKIE = 'session';

export function generateSessionToken(): string {
	const bytes = crypto.getRandomValues(new Uint8Array(20));
	return encodeBase32LowerCaseNoPadding(bytes);
}

export function hashToken(token: string): string {
	return encodeHexLowerCase(sha256(new TextEncoder().encode(token)));
}

export async function createSession(token: string, userId: string): Promise<Session> {
	const expiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
	return prisma.session.create({
		data: {
			id: hashToken(token),
			userId,
			expiresAt
		}
	});
}

export async function validateSession(
	token: string
): Promise<{ session: Session | null; user: User | null }> {
	const sessionId = hashToken(token);

	const result = await prisma.session.findUnique({
		where: { id: sessionId },
		include: { user: true }
	});

	if (!result) {
		return { session: null, user: null };
	}

	const { user, ...session } = result;

	if (Date.now() >= session.expiresAt.getTime()) {
		await prisma.session.delete({ where: { id: sessionId } });
		return { session: null, user: null };
	}

	const fifteenDaysInMs = 1000 * 60 * 60 * 24 * 15;
	if (Date.now() >= session.expiresAt.getTime() - fifteenDaysInMs) {
		const newExpiresAt = new Date(Date.now() + 1000 * 60 * 60 * 24 * 30);
		const updated = await prisma.session.update({
			where: { id: sessionId },
			data: { expiresAt: newExpiresAt }
		});
		return { session: updated, user };
	}

	return { session, user };
}

export async function invalidateSession(token: string): Promise<void> {
	await prisma.session.delete({ where: { id: hashToken(token) } }).catch(() => {
		// Ignore if session doesn't exist
	});
}

export function setSessionCookie(cookies: Cookies, token: string, expiresAt: Date): void {
	cookies.set(SESSION_COOKIE, token, {
		httpOnly: true,
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
		path: '/',
		expires: expiresAt
	});
}

export function deleteSessionCookie(cookies: Cookies): void {
	cookies.delete(SESSION_COOKIE, { path: '/' });
}
