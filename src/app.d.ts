// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		interface Locals {
			user: import('$generated/prisma/client').User | null;
			session: import('$generated/prisma/client').Session | null;
		}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
	namespace Superforms {
		type Message = { success?: string };
	}
}

export {};
