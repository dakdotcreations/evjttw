import nodemailer from 'nodemailer';
import { format } from 'date-fns';
import { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, SMTP_FROM, ADMIN_EMAIL } from '$env/static/private';
import { PUBLIC_SITE_URL } from '$env/static/public';

// Inline types — will be replaced with generated Prisma types once models are added
type BookingEnquiry = {
	itineraryId: string;
	fullName: string;
	email: string;
	phone?: string | null;
	travelDate?: Date | string | null;
	groupSize?: number | null;
	message?: string | null;
};

type Itinerary = {
	title: string;
};

const isDev = process.env.NODE_ENV !== 'production';

const transporter = isDev
	? null
	: nodemailer.createTransport({
			host: SMTP_HOST,
			port: Number(SMTP_PORT),
			auth: { user: SMTP_USER, pass: SMTP_PASS }
		});

async function sendMail(options: nodemailer.SendMailOptions): Promise<void> {
	if (isDev || !transporter) {
		console.log('\n--- [DEV EMAIL] ---');
		console.log(`To:      ${options.to}`);
		console.log(`From:    ${options.from}`);
		console.log(`Subject: ${options.subject}`);
		console.log('-------------------\n');
		return;
	}
	await transporter.sendMail(options);
}

export async function sendOtpEmail(email: string, code: string): Promise<void> {
	if (isDev) {
		console.log(`\n--- [DEV OTP] ---\nTo: ${email}\nCode: ${code}\n-----------------\n`);
		return;
	}
	await sendMail({
		from: SMTP_FROM,
		to: email,
		subject: 'Your Evajo Admin Login Code',
		html: `
			<!DOCTYPE html>
			<html>
			<body style="font-family: sans-serif; max-width: 480px; margin: 0 auto; padding: 32px 16px; color: #111;">
				<h1 style="font-size: 20px; margin-bottom: 8px;">Evajo Tours &amp; Travel</h1>
				<p style="color: #555; margin-bottom: 24px;">Your one-time admin login code:</p>
				<div style="background: #f4f4f4; border-radius: 8px; padding: 24px; text-align: center; margin-bottom: 24px;">
					<span style="font-size: 40px; font-weight: 700; letter-spacing: 12px; color: #111;">${code}</span>
				</div>
				<p style="color: #555; font-size: 14px;">This code expires in <strong>10 minutes</strong>. Do not share it with anyone.</p>
			</body>
			</html>
		`
	});
}

export async function sendBookingEnquiryEmail(
	enquiry: BookingEnquiry & { itinerary: Itinerary }
): Promise<void> {
	const travelDate = enquiry.travelDate
		? format(new Date(enquiry.travelDate), 'd MMMM yyyy')
		: 'Not specified';

	const itineraryUrl = `${PUBLIC_SITE_URL}/tours/${enquiry.itineraryId}`;

	await sendMail({
		from: SMTP_FROM,
		to: ADMIN_EMAIL,
		subject: `New Booking Enquiry — ${enquiry.itinerary.title}`,
		html: `
			<!DOCTYPE html>
			<html>
			<body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px 16px; color: #111;">
				<h1 style="font-size: 20px; margin-bottom: 4px;">New Booking Enquiry</h1>
				<p style="color: #555; margin-bottom: 24px;">
					Tour: <a href="${itineraryUrl}" style="color: #2563eb;">${enquiry.itinerary.title}</a>
				</p>
				<table style="width: 100%; border-collapse: collapse; font-size: 15px;">
					<tr><td style="padding: 8px 0; color: #555; width: 140px;">Full Name</td><td style="padding: 8px 0; font-weight: 600;">${enquiry.fullName}</td></tr>
					<tr><td style="padding: 8px 0; color: #555;">Email</td><td style="padding: 8px 0;">${enquiry.email}</td></tr>
					<tr><td style="padding: 8px 0; color: #555;">Phone</td><td style="padding: 8px 0;">${enquiry.phone ?? '—'}</td></tr>
					<tr><td style="padding: 8px 0; color: #555;">Travel Date</td><td style="padding: 8px 0;">${travelDate}</td></tr>
					<tr><td style="padding: 8px 0; color: #555;">Group Size</td><td style="padding: 8px 0;">${enquiry.groupSize ?? '—'}</td></tr>
					<tr><td style="padding: 8px 0; color: #555; vertical-align: top;">Message</td><td style="padding: 8px 0; white-space: pre-wrap;">${enquiry.message ?? '—'}</td></tr>
				</table>
				<hr style="margin: 24px 0; border: none; border-top: 1px solid #e5e5e5;" />
				<p style="font-size: 13px; color: #888;">
					<a href="${itineraryUrl}" style="color: #2563eb;">View itinerary →</a>
				</p>
			</body>
			</html>
		`
	});
}
