---
description: "Use when writing or editing SvelteKit routes, Svelte components, TypeScript, Tailwind CSS, Superforms, Zod schemas, or Prisma models in this project."
applyTo: "**/*.svelte, **/*.ts, **/*.svelte.ts, prisma/schema.prisma"
---

# Project Conventions

## Stack

- **SvelteKit** with **Svelte 5** runes mode (globally enabled)
- **TypeScript** strict mode
- **Tailwind CSS v4** with `@tailwindcss/forms` and `@tailwindcss/typography`
- **Superforms** + **Zod v4** for forms
- **Prisma** with PostgreSQL, client output at `src/generated/prisma`
- **pnpm** — never use npm or yarn commands

---

## Svelte 5

- Always use runes — never legacy syntax (`export let`, `$:`, `on:click`, slots)
- Declare props with `$props()`:
  ```svelte
  let { value, onchange }: { value: string; onchange: (v: string) => void } = $props();
  ```
- Reactive state: `$state()`, derived: `$derived()`, side effects: `$effect()`
- Use snippets and `{@render}` instead of slots:
  ```svelte
  {#snippet footer()}<p>content</p>{/snippet}
  {@render footer()}
  ```
- Use `{@render children()}` in layout components; destructure from `$props()`
- Use `onclick` (not `on:click`), `oninput`, etc. for event handlers
- All `<script>` blocks must have `lang="ts"`

---

## TypeScript

- Strict mode is on — no implicit `any`, no `as any` shortcuts
- Use `$lib/` alias for imports from `src/lib/`; use `./relative` for same-directory files
- Extend `App` namespace in `src/app.d.ts` for `Locals`, `PageData`, etc.
- Prisma client imports come from `$lib/server/prisma` (or similar server-only module), never from client-side components
- Type form data with Zod `.infer<>` — do not write duplicate type definitions

---

## Tailwind CSS v4

- Use utility classes directly in markup; avoid arbitrary values when a design token exists
- `@tailwindcss/forms` and `@tailwindcss/typography` plugins are available
- Global styles belong in `src/routes/layout.css`; import it once in `+layout.svelte`
- Do not use `@apply` for one-off styles; reserve it for reusable component abstractions

---

## Forms — Superforms + Zod

- Define schemas with Zod in a shared `$lib/schemas/` file; import into server `load`/`actions`
- Use `superValidate` server-side; return `{ form }` from `load`
- Client-side: `const { form, errors, enhance } = superForm(data.form)`
- Always use `use:enhance` on `<form>` elements
- Display errors with `$errors.fieldName`

---

## Prisma

- Generated client lives at `src/generated/prisma` — import from there only in server-side code
- Model names: PascalCase singular (e.g., `User`, `BlogPost`)
- Field names: camelCase
- Always include `id`, `createdAt`, `updatedAt` on every model
- Use `@@index` and `@@unique` constraints explicitly; do not rely on application logic alone

---

## File & Route Conventions

- Route files: `+page.svelte`, `+page.server.ts`, `+layout.svelte`, `+layout.server.ts`
- Components: PascalCase in `src/lib/components/` (e.g., `Button.svelte`)
- Utilities/helpers: camelCase in `src/lib/utils/`
- Server-only code (DB, secrets): `src/lib/server/`
- Re-export public API from `src/lib/index.ts`
