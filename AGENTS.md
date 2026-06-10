# Agent guide — personal-web-page

Context for Cursor and other AI coding assistants working in this repository.

<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Project summary

Personal portfolio + CMS for **Grigor Yankov**. Next.js 16 App Router, Supabase backend, Tailwind 4. Public marketing/content site with a password-protected admin panel (email allowlist).

## Stack

- **Next.js 16** / **React 19** — App Router, Server Components, Server Actions
- **Supabase** — Postgres, Auth, Storage (`@supabase/ssr` for cookies)
- **Tailwind CSS 4** — CSS variables in `src/app/globals.css`, `@theme inline`
- **Framer Motion** — client animations; wrap with `AccessibilityMotionConfig` for reduce-motion
- **next-themes** — `ThemeProvider` in root layout
- **Resend** — optional contact form email (`src/lib/contact/actions.ts`)

## Directory map

| Path | Purpose |
|------|---------|
| `src/app/(public)/` | Public routes; `layout.tsx` fetches profile for header/footer |
| `src/app/admin/(dashboard)/` | CMS pages; guarded by middleware |
| `src/app/admin/login/` | Password login (not magic link) |
| `src/app/api/og-preview/` | Fetch OG tags for admin project form |
| `src/app/auth/callback/` | Supabase auth code exchange |
| `src/components/pages/` | Client “view” shells for public pages |
| `src/components/motion/` | Reveal, Stagger, MotionCard, ListPageShell, DetailShell |
| `src/components/accessibility/` | A11y widget + provider; settings on `<html data-a11y-*>` |
| `src/lib/queries.ts` | Public data fetching (Supabase) |
| `src/lib/admin/actions.ts` | Server actions for CMS mutations; call `requireAdmin()` |
| `src/lib/about-data.ts` | Merges Supabase profile/experience/skills with `about-fallback.ts` |
| `src/lib/types.ts` | Hand-written TS types (not generated from Supabase) |
| `src/middleware.ts` | Session refresh + admin route protection |

## Conventions

### Server vs client

- **Pages** (`page.tsx`) are async Server Components: fetch data, pass props to client views.
- **Client views** live in `components/pages/`, `components/home/`, feature folders — marked `"use client"` when using hooks, motion, or browser APIs.
- Prefer keeping fetch logic in `lib/queries.ts`, not inline in pages (admin list pages are an exception today).

### Data & auth

- Public reads: `createClient()` from `src/lib/supabase/server.ts` in queries or pages.
- Admin writes: `"use server"` actions in `src/lib/admin/actions.ts` with `getAuthedClient()` + `requireAdmin()`.
- Admin access: user email must match `ADMIN_EMAIL` env var (`src/lib/admin-email.ts`).
- After mutations: `revalidatePath()` for affected public routes.

### Styling

- Use design tokens: `bg-surface`, `text-muted`, `border-border`, `text-accent`, etc.
- Gradients: `.text-gradient`, `.text-gradient-interactive` (home header name only).
- Glass: `.glass` utility.
- Accessibility overrides: `html[data-a11y-*]` rules in `globals.css` — do not break these when changing styles.

### Imports

- Keep imports at the top of files (no inline imports unless circular dependency is documented).

### TypeScript

- `strict: true`. Use exhaustive `switch` with `never` in default for union types.

## Environment variables

See `.env.local.example`. Never commit `.env.local`.

Required for local dev:

- `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `ADMIN_EMAIL`, `NEXT_PUBLIC_ADMIN_EMAIL` (must match)

Optional:

- `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_TO_EMAIL`

## Key product rules

- Display name: **Grigor Yankov** (not Grigory Ankov) — normalized in `src/lib/queries.ts`.
- **No public `/cv` page** — CV content lives on About; optional PDF via `cv_pdf_url` on profile.
- Projects split: `project_type` = `personal` | `team` (`src/lib/projects.ts`, badges on cards).
- About page uses fallback data when DB is empty (`src/lib/about-fallback.ts`).
- Profile photo fallback: `/public/images/grigor-yankov.png` if `avatar_url` missing/invalid.

## Common tasks

| Task | Where to look |
|------|----------------|
| Add public page | `src/app/(public)/…/page.tsx` + view component |
| Add admin CRUD | `src/app/admin/(dashboard)/…` + `src/lib/admin/actions.ts` |
| Change nav links | `src/components/layout/header.tsx` |
| Change admin nav | `src/components/admin/admin-nav.tsx` |
| Theme / colors | `src/app/globals.css` `:root` and `.dark` |
| A11y behavior | `src/lib/accessibility/` + `src/components/accessibility/` |

## What not to do

- Do not commit secrets (`.env.local`, API keys).
- Do not add inline imports in function bodies without documenting why.
- Do not recreate a separate `/cv` route unless explicitly requested.
- Avoid widening client boundaries — only `"use client"` when needed (motion, hooks, browser storage).

## Build & verify

```bash
npm run lint
npm run build
```

Supabase project id (reference): `kblpdbdqnhhuvqbhvnof`

## Deployment

Vercel + Supabase cloud. Set env vars on Vercel; configure Supabase Auth redirect URLs for production domain. See README.md.
