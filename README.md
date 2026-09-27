# Kunwar Analytics

Financial-intelligence platform for analysts, students, and finance teams — institutional-grade
research, market insights, PGDM finance & analytics courseware, interactive financial tools, and
study materials, in one Next.js application.

- **Research & Insights** — MDX-authored sector research and market notes with SEO metadata, sitemap,
  and JSON-LD structured data.
- **PGDM / Courseware** — subjects and lectures (theory, worked examples, practice questions,
  formulas, diagrams) plus an interactive in-browser analyst course.
- **Financial Tools** — free calculators and analyzers (DCF, EV, portfolio, etc.).
- **Study Materials** — database-backed material library with categories, difficulty, and tracking.
- **Search** — a single, server-side search facade across research, insights, data-lab, case studies,
  podcast, PGDM content, tools, and study materials.

## Tech stack

| Area | Choice |
| --- | --- |
| Framework | Next.js **16** (App Router, Turbopack) |
| UI | React **19**, Tailwind CSS, Framer Motion, GSAP |
| Auth | NextAuth **v5** (JWT sessions, credentials + Google OAuth) |
| Database | PostgreSQL via Prisma **6** (`@prisma/adapter-pg`) |
| Validation | Zod |
| Search | Algolia (client) + unified `lib/search.ts` (server) |
| Content | MDX (`gray-matter` + `next-mdx-remote`) |
| Tests | Vitest (unit) |
| Hosting | Vercel (cron jobs via `vercel.json`) |

> **Next.js 16 note:** this version renamed the `middleware` file convention to
> [`proxy.ts`](proxy.ts). The network boundary (auth gating, security headers, cron protection)
> lives in [`proxy.ts`](proxy.ts) and runs on the Node.js runtime. Always check the bundled docs in
> `node_modules/next/dist/docs/` before writing framework code.

## Prerequisites

- Node.js 20+
- A PostgreSQL database (local Postgres, Neon, or Supabase)
- Optional: Google OAuth credentials, Vercel Blob token, Algolia keys

## Getting started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment** — copy the template and fill in the values:

   ```bash
   cp .env.example .env.local
   ```

   Required at minimum: `DATABASE_URL`, `AUTH_SECRET`, `AUTH_URL`. See [`.env.example`](.env.example)
   for the full list (Google OAuth, Blob storage, Algolia, GA4, Search Console).

3. **Set up the database**

   ```bash
   npx prisma generate
   npx prisma migrate deploy   # or: npx prisma db push (dev)
   ```

4. **Run the dev server**

   ```bash
   npm run dev
   ```

   Open <http://localhost:3000>.

## Scripts

| Script | Description |
| --- | --- |
| `npm run dev` | Start the Next.js dev server |
| `npm run build` | Generate Prisma client and build for production |
| `npm run start` | Start the production server |
| `npm run lint` | Run ESLint |
| `npm run index` | Rebuild the Algolia search index (run separately from the build) |
| `npm run seed:study` | Seed study categories |

## Architecture

```
app/                      App Router routes, layouts, and API handlers
  api/                    Route handlers (health, search, blocks, saved, analytics, cron …)
  (dashboard)/            Authenticated dashboard area
  admin/                  Staff-only admin area (CMS, users, analytics)
actions/                  Server actions (mutating, validated)
components/               UI, layout, 3D, analytics, study, tracker widgets
content/                  MDX source for research, insights, data-lab, case studies, podcast
lib/                      Domain logic and infrastructure
  auth-guards.ts          Central authorization (requireUser / requireRole / requireCron)
  entitlements.ts         Plan + entitlement engine (FREE → ENTERPRISE)
  validation.ts           Shared Zod request parsing
  search.ts               Unified server-side search facade
  logger.ts               Structured logging
  study.ts, content.ts, pgdm/, blocks/, trackerData.ts
prisma/                   Schema and migrations
proxy.ts                  Next.js 16 network boundary (auth gating + security headers)
```

### Authorization & entitlements

The platform separates **permissions** from **entitlements**:

- `UserRole` (`MEMBER`, `VIEWER`, `ANALYST`, `ADMIN`) controls **what a user may operate**
  (admin/CMS access). Enforced by [`lib/auth-guards.ts`](lib/auth-guards.ts) and
  [`proxy.ts`](proxy.ts).
- `subscriptionPlan` (`FREE`, `PRO`, `ELITE`, `TEAM`, `ENTERPRISE`) controls **what content a user can
  consume**. Resolved by [`lib/entitlements.ts`](lib/entitlements.ts).

Route handlers and server actions always re-verify authorization inside the handler; the proxy is a
fast first pass, not the only gate.

### API surface

| Endpoint | Method | Access |
| --- | --- | --- |
| `/api/health` | GET | Public — DB ping, uptime |
| `/api/search` | GET | Public — unified content search |
| `/api/analytics/track` | POST | Public — page-view tracking |
| `/api/saved` | GET/POST/DELETE | Authenticated |
| `/api/user` | GET/PUT | Authenticated |
| `/api/blocks` | GET/POST | Staff |
| `/api/blocks/templates` | GET/POST/DELETE | Staff |
| `/api/admin/live-views` | GET | Admin |
| `/api/cron/freshness-check` | GET | Cron secret (`CRON_SECRET`) |

## Testing & quality

```bash
npx tsc --noEmit     # type-check
npm run lint         # eslint
npm run test         # vitest unit tests
```

Unit tests live alongside the code in `lib/**/*.test.ts` and focus on pure domain logic
(entitlements, validation, search scoring, auth guards).

## Deployment

Deployed on Vercel. Set the environment variables from [`.env.example`](.env.example) in the project
settings, then deploy. The Algolia index is intentionally **not** rebuilt during `npm run build` —
run `npm run index` as a separate step or post-deploy job so an Algolia outage cannot fail a build.

Scheduled jobs are declared in [`vercel.json`](vercel.json) and protected by `CRON_SECRET`.

## License

Proprietary. © Kunwar Analytics. All rights reserved.
