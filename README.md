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

2. **Configure environment** — set the required server variables `DATABASE_URL`, `AUTH_SECRET`, and
   `AUTH_URL` in `.env.local` (keep that file out of Git). Add optional integration secrets only when
   needed; see [`docs/ASK-KUNWAR.md`](docs/ASK-KUNWAR.md) for the Hugging Face opt-in and handling rules.

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

## V2 roadmap status

This branch contains an incremental V2 hardening pass. ESLint passes with existing warnings, and the
new pure-domain tests pass. A successful Prisma client generation, full test run, typecheck, and production
build are still blocked or incomplete in this environment. See the pull
request summary for exact verification results and remaining blockers.

### Current branch changes

- Manual UPI submissions are stored as `PENDING` until an administrator approves or rejects them.
  Only approval grants a one-calendar-month entitlement; renewal is another manually reviewed payment.
  No payment screenshots or card data are stored. The additive migration is
  [`prisma/migrations/add_manual_upi_payments/migration.sql`](prisma/migrations/add_manual_upi_payments/migration.sql)
  and has **not** been applied to production.
- Premium calculator/sector metrics are gated on the server. Public prediction and comment responses
  omit private account data, private profiles are excluded from author pages, and public comments are
  limited to visible records. Rate limits use the existing PostgreSQL database.
- Ask Kunwar uses retrieved site knowledge, citations, and a local fallback. Optional Hugging Face
  inference is off unless `HUGGINGFACE_INFERENCE_ENABLED=true` and the existing server-side
  `HUGGINGFACE_API_KEY` is present. No live Hugging Face call has been verified. See
  [`docs/ASK-KUNWAR.md`](docs/ASK-KUNWAR.md).
- The public prediction ledger reports outcomes, weighted accuracy, confirmed hit rate, and streaks.
  It does not publish a Brier score because stored predictions do not contain forecast probabilities.
- Certificate URLs remain public catalogue pages, but they are not represented as individual issued or
  verified credentials. Assessment delivery and learner-specific completion/issuance tracking are not
  currently available.

### Explicitly not activated

- **Stripe checkout, portal, and webhooks are disabled.** Existing legacy Stripe helpers do not authorize
  Stripe use; the supported paid self-service route is manual UPI only.
- No new paid AI, email, observability, market-data, vector-database, or authentication service is
  required by this branch. No API key has been added, printed, or committed.
- Vector search, intraday market quotes, automated payment verification, email delivery of certificates,
  and signed certificate issuance are not claimed as live features.

### Existing systems retained

The work builds on the repository's existing learning/community features, live reference data, search,
freshness checks, PWA/i18n, analytics, PostgreSQL job queue, publish systems, SEO/GEO metadata, public
URLs/content, and FOT optimizations. Roadmap items that were not implemented in this branch remain
partial or pending; they are not described as complete here.

## Deployment

Deployed on Vercel. Configure required server environment variables in the project settings; keep
optional provider credentials server-side and off unless explicitly enabled. The Algolia index is
intentionally **not** rebuilt during `npm run build` — run `npm run index` as a separate step or
post-deploy job so an Algolia outage cannot fail a build.

Scheduled jobs are declared in [`vercel.json`](vercel.json) and protected by `CRON_SECRET`.

## License

Proprietary. © Kunwar Analytics. All rights reserved.
