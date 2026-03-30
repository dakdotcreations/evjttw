import { sha256 } from '@oslojs/crypto/sha2';
import { encodeHexLowerCase } from '@oslojs/encoding';
import prisma from './prisma';

function hashOtpCode(code: string): string {
	return encodeHexLowerCase(sha256(new TextEncoder().encode(code)));
}

export function generateOtpCode(): string {
	const num = crypto.getRandomValues(new Uint32Array(1))[0] % 1_000_000;
	return String(num).padStart(6, '0');
}

export async function createOtp(userId: string): Promise<string> {
	await prisma.otp.updateMany({
		where: { userId, used: false },
		data: { used: true }
	});

	const code = generateOtpCode();
	const expiresAt = new Date(Date.now() + 1000 * 60 * 10);

	await prisma.otp.create({
		data: {
			code: hashOtpCode(code),
			userId,
			expiresAt
		}
	});

	return code;
}

export async function verifyOtp(userId: string, code: string): Promise<boolean> {
	const otp = await prisma.otp.findFirst({
		where: {
			userId,
			used: false,
			expiresAt: { gt: new Date() }
		},
		orderBy: { createdAt: 'desc' }
	});

	if (!otp) {
		return false;
	}

	await prisma.otp.update({
		where: { id: otp.id },
		data: { used: true }
	});

	return otp.code === hashOtpCode(code);
}
