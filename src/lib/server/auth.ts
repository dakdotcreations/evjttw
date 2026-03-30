import { sha256 } from '@oslojs/crypto/sha2';
import { encodeBase32LowerCaseNoPadding, encodeHexLowerCase } from '@oslojs/encoding';
import { createHmac, timingSafeEqual } from 'node:crypto';
import { Buffer } from 'node:buffer';
import type { Cookies } from '@sveltejs/kit';
import type { Session, User } from '$generated/prisma/client';
import { AUTH_SECRET } from '$env/static/private';
import prisma from './prisma';

export const REFRESH_TOKEN_COOKIE = 'refresh';
export const ACCESS_TOKEN_COOKIE = 'access';
/** @deprecated use REFRESH_TOKEN_COOKIE */
export const SESSION_COOKIE = REFRESH_TOKEN_COOKIE;

const ACCESS_TTL_MS = 15 * 60 * 1000; // 15 minutes

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
	cookies.set(REFRESH_TOKEN_COOKIE, token, {
		httpOnly: true,
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
		path: '/',
		expires: expiresAt
	});
}

export function deleteSessionCookie(cookies: Cookies): void {
	cookies.delete(REFRESH_TOKEN_COOKIE, { path: '/' });
}

// ── Access token (HMAC-SHA256 signed, no DB lookup) ──────────────────────────

type AccessTokenPayload = {
	userId: string;
	sessionId: string;
	name: string;
	email: string;
	exp: number;
};

export type VerifiedAccessToken = Readonly<AccessTokenPayload>;

function hmacSign(data: string): string {
	return createHmac('sha256', AUTH_SECRET).update(data).digest('base64url');
}

export function generateAccessToken(user: User, sessionId: string): string {
	const payload: AccessTokenPayload = {
		userId: user.id,
		sessionId,
		name: user.name,
		email: user.email,
		exp: Date.now() + ACCESS_TTL_MS
	};
	const data = Buffer.from(JSON.stringify(payload)).toString('base64url');
	return `${data}.${hmacSign(data)}`;
}

export function verifyAccessToken(token: string): VerifiedAccessToken | null {
	try {
		const dot = token.lastIndexOf('.');
		if (dot === -1) return null;
		const data = token.slice(0, dot);
		const sig = token.slice(dot + 1);
		const expected = Buffer.from(hmacSign(data), 'base64url');
		const actual = Buffer.from(sig, 'base64url');
		if (expected.length !== actual.length || !timingSafeEqual(expected, actual)) return null;
		const payload: AccessTokenPayload = JSON.parse(
			Buffer.from(data, 'base64url').toString('utf-8')
		);
		if (Date.now() > payload.exp) return null;
		return payload;
	} catch {
		return null;
	}
}

export function setAccessTokenCookie(cookies: Cookies, token: string): void {
	cookies.set(ACCESS_TOKEN_COOKIE, token, {
		httpOnly: true,
		sameSite: 'lax',
		secure: process.env.NODE_ENV === 'production',
		path: '/',
		expires: new Date(Date.now() + ACCESS_TTL_MS)
	});
}

export function deleteAccessTokenCookie(cookies: Cookies): void {
	cookies.delete(ACCESS_TOKEN_COOKIE, { path: '/' });
}
