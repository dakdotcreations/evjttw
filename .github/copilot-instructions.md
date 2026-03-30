# Evajo Tours & Travel — Copilot Instructions

## Project
Tourism website for Evajo Tours & Travel. Built with SvelteKit, PostgreSQL,
Prisma ORM, TailwindCSS, and Azure Blob Storage.

## Tech Stack
- **Framework**: SvelteKit (TypeScript, file-system routing)
- **Database**: PostgreSQL via Prisma ORM
- **Styling**: TailwindCSS + @tailwindcss/forms + @tailwindcss/typography
- **Icons**: lucide-svelte
- **Forms**: sveltekit-superforms + zod
- **Email**: nodemailer
- **Storage**: Azure Blob Storage (@azure/storage-blob)
- **Drag and drop**: svelte-dnd-action
- **Crypto**: @oslojs/crypto + @oslojs/encoding
- **Date utils**: date-fns

## Auth
- No third-party auth library
- Custom session-based auth using Prisma Session model
- Admin login is OTP-only (6-digit code sent to email, expires in 10 min)
- Session token stored as httpOnly cookie, hashed with SHA-256 before DB storage
- Rolling 30-day session expiry
- All session/OTP logic lives in src/lib/server/auth.ts and src/lib/server/otp.ts
- Auth state attached to event.locals in src/hooks.server.ts

## Database Models (Prisma)
- User — admin users, no password, OTP login
- Session — persisted login sessions
- Otp — one-time login codes
- Country — top-level geography, has one cover media (image or video)
- Location — specific town/area/spot within a country, has one cover media
- Itinerary — core tour package, pricing (fixedPrice overrides pricePerPerson)
- ItineraryStep — ordered steps, each tied to a Location
- BookingEnquiry — stores every booking form submission (no status workflow)
- Testimonial — client review, must be approved before publishing
- ReviewInvite — one-time token link sent to clients for leaving a review
- Feature — homepage section promoting a Country or Location with 1–4 itineraries
- FeatureItem — join table between Feature and Itinerary with sortOrder

## Key Rules
- Countries on an itinerary are DERIVED from steps → location → country. Never stored directly on Itinerary.
- fixedPrice takes precedence over pricePerPerson. If both null → "Price on request".
- A Feature references EITHER a Country OR a Location, never both. Enforced in app logic.
- Max 6 active Features on homepage. Enforced in app logic, not DB.
- Each Feature has 1–4 itineraries. Enforced in app logic.
- MediaType enum: image | video_blob | video_embed
- BookingEnquiry has no status — it only exists to count enquiries per itinerary.
- ReviewInvite is single-use — used flag flipped on submission, form locks.
- Testimonials default to published: false — admin must approve.

## File Structure
- src/lib/server/prisma.ts — Prisma singleton
- src/lib/server/auth.ts — session create/validate/invalidate
- src/lib/server/otp.ts — OTP generate/verify
- src/lib/server/mail.ts — nodemailer config + send functions
- src/lib/server/azure.ts — Azure Blob upload/delete helpers
- src/lib/components/ui/ — reusable UI components
- src/lib/components/ — feature components (TourCard, BookingForm, etc.)
- src/lib/utils/ — shared utilities (pricing.ts, currency.ts)
- src/routes/admin/ — all admin dashboard routes, protected by layout guard
- src/routes/api/ — server-only API endpoints (+server.ts files)
- src/hooks.server.ts — attaches user + session to event.locals

## Conventions
- Always use TypeScript. No .js files.
- Always use +page.server.ts for data loading and form actions. Avoid +page.ts unless truly public/non-sensitive data.
- Use superforms for every form — never raw fetch for form submissions.
- Use zod schemas colocated with their form route or in src/lib/schemas/.
- Use event.locals.user for auth checks — never re-query the DB for the user in a load function.
- Admin routes must check locals.user in +layout.server.ts and redirect to /login if null.
- All image/video URLs stored as full Azure Blob URLs (or YouTube/Vimeo URLs for video_embed).
- Use date-fns for all date formatting.
- Use lucide-svelte for all icons — import individually, never wildcard.
- Prefer server-side load functions over client-side fetch.
- Error handling: use SvelteKit's error() helper from @sveltejs/kit, not throw new Error().

## Environment Variables
- Store secrets in `.env` at project root; do not commit real secrets to version control
- Access env vars in server code via `import { DATABASE_URL } from '$env/static/private';`
- For client-side config (e.g., public API base URL), use `VITE_` prefix and access via `import { VITE_API_BASE } from '$env/static/public';`