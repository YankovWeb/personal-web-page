# Personal Web Page — Grigor Yankov

Personal portfolio and content site with a Supabase-backed admin CMS. Public pages for projects, articles, notes, videos, and about; protected admin panel for content management.

**Repository:** [github.com/YankovWeb/personal-web-page](https://github.com/YankovWeb/personal-web-page)

## Stack

| Layer | Technology |
|-------|------------|
| Framework | [Next.js 16](https://nextjs.org) (App Router, React 19) |
| Styling | [Tailwind CSS 4](https://tailwindcss.com) |
| Database & Auth | [Supabase](https://supabase.com) (Postgres, RLS, Storage) |
| Email | [Resend](https://resend.com) (contact form notifications) |
| Animation | [Framer Motion](https://www.framer.com/motion/) |
| Theme | [next-themes](https://github.com/pacocoursey/next-themes) (light / dark) |
| Markdown | react-markdown + remark-gfm |

## Features

- **Public site** — Home, About (timeline, skills, certifications), Projects (personal vs team), Articles, Notes, Videos, Contact
- **Admin CMS** — CRUD for profile, articles, notes, videos, projects; contact message inbox
- **Accessibility widget** — Text size, high contrast, grayscale, link highlighting, readable font, reduce motion (persisted in `localStorage`)
- **Theme toggle** — Animated light/dark mode with CSS design tokens
- **OG preview** — Admin can fetch Open Graph metadata when adding project share URLs
- **Motion system** — Reusable reveal/stagger primitives; respects reduced-motion preference

## Project structure

```
src/
  app/
    (public)/          Public routes (shared header/footer layout)
    admin/             Protected CMS (middleware + email allowlist)
    api/og-preview/    Server-side OG metadata fetch
    auth/callback/     Supabase OAuth / code exchange
  components/          Feature-grouped UI (about, admin, motion, ui, …)
  lib/                 Queries, server actions, Supabase clients, types
supabase/migrations/   SQL migrations (apply via Supabase CLI or dashboard)
```

For AI assistants and contributors, see **[AGENTS.md](./AGENTS.md)** for architecture notes and coding conventions.

## Prerequisites

- Node.js 20+
- A [Supabase](https://supabase.com) project with schema and RLS configured
- (Optional) [Resend](https://resend.com) API key for contact email notifications

## Local development

1. **Clone and install**

   ```bash
   git clone git@github.com:YankovWeb/personal-web-page.git
   cd personal-web-page
   npm install
   ```

2. **Environment variables**

   Copy the example file and fill in your values:

   ```bash
   cp .env.local.example .env.local
   ```

   | Variable | Description |
   |----------|-------------|
   | `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
   | `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon / publishable key |
   | `ADMIN_EMAIL` | Email allowed to access admin (server-side check) |
   | `NEXT_PUBLIC_ADMIN_EMAIL` | Same email (client-side login form pre-check) |
   | `CONTACT_TO_EMAIL` | Inbox for contact form submissions |
   | `RESEND_API_KEY` | Optional — sends email when contact form is submitted |
   | `RESEND_FROM_EMAIL` | Optional — verified sender in Resend |

3. **Supabase Auth**

   Create an admin user in Supabase Dashboard → **Authentication → Users** with the same email as `ADMIN_EMAIL`. Login uses email + password at `/admin/login`.

4. **Run dev server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Run production server locally |
| `npm run lint` | ESLint |

## Deployment (Vercel)

1. Push to GitHub and import the repo on [Vercel](https://vercel.com/new).
2. Add all environment variables from `.env.local.example` in **Project → Settings → Environment Variables**.
3. In Supabase → **Authentication → URL Configuration**, set:
   - **Site URL:** `https://your-domain.vercel.app`
   - **Redirect URLs:** `https://your-domain.vercel.app/**` and `https://your-domain.vercel.app/auth/callback`
4. Deploy. Admin panel: `/admin/login`.

## Supabase migrations

Migrations live in `supabase/migrations/`. Apply new migrations through the Supabase dashboard SQL editor or Supabase CLI:

```bash
supabase db push
```

## License

Private — personal portfolio project.
