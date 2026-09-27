# FinNexus Lab (Kunwar Analytics) — Next-Level Analysis & Roadmap

> Scope: full repository read (app/, components/, lib/, actions/, prisma/, scripts/, content/, public/, plans/, configs)
> plus GitHub remote state, plus the bundled Next.js 16.2.1 docs in `node_modules/next/dist/docs/`.
> This document is analysis + strategy only — no production code was changed.

---

## 1. What This Project Actually Is

A single Next.js 16 (App Router, Turbopack) marketing + content + learning + light-SaaS platform for
"Kunwar Analytics" — an Indian financial-intelligence brand. It is far larger and more ambitious than a
typical brochure site.

**Product surface (verified from the route tree):**

| Area | Routes | Notes |
|------|--------|-------|
| Editorial | `/research`, `/insights`, `/data-lab`, `/case-studies`, `/podcast` | MDX-first (`content/**/*.mdx`) **plus** a Prisma `Post` fallback path |
| Education | `/pgdm` (14 subjects · 73 lectures · quizzes · cheat sheets), `/study`, `/study/placement-prep`, `/study/analyst-course`, `/study/courses` | Static curriculum data + DB-backed `StudyMaterial` |
| Intelligence | `/tracker`, `/tracker/[sector]`, `/radar`, `/predictions`, `/data-freshness` | Static data model + live KPI surfacing |
| Tools | `/tools`, `/tools/[slug]`, `/tools/autonomous-workforce` | 16 interactive calculators (client components) |
| Growth | `/pricing`, `/enterprise`, `/services`, `/resume`, `/speaking`, `/contact`, `/about` | |
| Auth/Account | `/auth/signin`, `/auth/error`, `/dashboard`, `/dashboard/edit` | NextAuth v5 (JWT) + Credentials + Google |
| Admin/CMS | `/admin` (+ analytics, cms, media, study, users, predictions, settings) | Custom WordPress/Elementor-style CMS + media library + block editor |
| API | 31 route handlers | auth, user, saved, admin/*, media/*, blocks/*, analytics/track, cron/* |
| SEO/GEO | `sitemap.ts`, `robots.ts`, `opengraph-image.tsx`, `manifest.ts`, `public/llms.txt` | Already strong |

**Tech stack:** Next.js 16.2.1 · React 19.2 · TypeScript (strict) · Tailwind 3.4 · Prisma 6.16
(PostgreSQL via `@prisma/adapter-pg` + query compiler) · NextAuth v5-beta · Tiptap 3 (rich editor) ·
Three.js / react-three-fiber / drei (3D) · Framer Motion · GSAP · Recharts · Algolia · Vercel Blob ·
Zod · KaTeX · pdf-lib.

**Repo/remote state:** `origin = github.com/financeinsightlab/finnexus-lab`. Local `main` is **0 ahead /
0 behind** `origin/main`; working tree clean. Stale `arena/*` branches exist on the remote (Aug–Sep 2026)
and could be pruned. Single-branch workflow, direct-to-main.

---

## 2. Core Strengths (protect these)

1. **Deep, genuinely useful content** — research, insights, case studies, a full PGDM curriculum, and a
   structured study library. This is the real moat, not the UI.
2. **Serious SEO/GEO foundation** — canonical URLs, OG/Twitter, JSON-LD (Organization, WebSite, FAQ,
   breadcrumb, Article), `sitemap.ts` that includes MDX + DB + PGDM + tools, `robots.ts`, `llms.txt`,
   `ai-content-allowed` meta. A real `public/llms.txt` is already in place.
3. **Custom CMS with block editor + media library** — a differentiator for operating the content engine.
4. **Rich interactive layer** — 16 calculators, sector trackers, consensus radar, podcast with RSS feed,
   case-study PDF download route, resume.
5. **Solid performance intent in config** — `inlineCss`, `optimizePackageImports`, image formats + long
   cache TTL, security headers, `removeConsole` in prod.
6. **Auth + roles + subscriptions** modeled (`UserRole`, `SubscriptionStatus`, `stripeCustomerId`) — the
   skeleton of a monetization system already exists.

---

## 3. Critical Findings (ordered by leverage)

### P0 — Security & data integrity

1. **No `middleware.ts` exists.** Admin protection is enforced only inside `app/admin/layout.tsx` and
   per-route. There is no central auth/role gate, no security headers on non-asset routes, no rate
   limiting. Any new route that forgets its own check is exposed.
2. **Inconsistent authorization across API routes.** `make-pro` checks `ADMIN`, but the check is a
   string compare on a JWT-derived role; several admin routes (`settings/*`, `live-views`) repeat this
   pattern ad hoc. A single `requireRole()` helper is missing, invites drift.
3. **`app/api/admin/make-pro/route.ts` calls `redirect()` inside a `POST` route handler** and returns a
   `Response` on the unauthorized path — mixing a 307 navigation into an API contract. This belongs in a
   server action, not a route handler.
4. **`.env` is committed to the working tree** (`.env`, `.env.local` present). `.gitignore` correctly
   ignores `.env*` and `git ls-files` shows **no env files tracked**, so history is likely clean — but a
   **secret-rotation checkpoint and a `git log --all -- .env` audit** are still warranted before next deploy.
5. **Cron endpoint auth is the single point of trust.** `/api/cron/freshness-check` validates a secret —
   good — but that pattern should be standardized for every `/api/cron/*` and admin mutation.

### P0 — Correctness & type safety

6. **~38 `as any` casts, concentrated in the data boundary** (`(prisma as any).post`, `pageView`,
   `loginEvent`, analytics raw). These hide real drift between schema and code. Notably `auth.ts` casts
   `prisma as any` to write `loginEvent` even though `LoginEvent` is a proper model — a pure typing bug.
7. **`app/(dashboard)/study/page.tsx` uses `materials: any[]` and casts to `any` on pass-through**, while
   `lib/study.ts` already returns fully-typed Prisma payloads. Types are being thrown away, not missing.
8. **Dashboard role logic is incoherent with the schema.** `app/(dashboard)/dashboard/page.tsx`
   `roleLabel()` switches on `'FREE' | 'PRO' | 'ELITE' | 'TEAM' | 'ENTERPRISE'`, but the Prisma
   `UserRole` enum is `MEMBER | VIEWER | ADMIN | ANALYST` and plan lives on `subscriptionPlan`. Plan vs
   role are conflated, so "Upgrade to Pro" and benefit gating can mis-render.
9. **Dual content systems create split-brain risk.** MDX and Prisma `Post` both feed `/research`,
   `/insights`, `/case-studies`, `/study`. The Algolia indexer historically only read MDX, so DB-created
   CMS posts may be invisible to search — verify `scripts/algolia-index.ts` covers both and add a
   publish-time re-index hook.
10. **`app/(dashboard)/study/analyst-course/[[...path]]/route.ts` and `study/courses/[[...path]]/route.ts`**
    serve a large hand-written static runtime (`public/analyst-course/*.js`, ~25 engines). This is
    effectively a second app with no tests and no type coverage.

### P1 — Engineering process gaps

11. **Zero automated tests.** `git ls-files` finds no `test`/`spec`/`__tests__` anywhere. No Vitest/Jest,
    no Playwright, no Testing Library. Every change is verified by manual clicks.
12. **No CI/CD.** No `.github/` directory at all. No PR checks, no type-check gate, no build gate.
    `npm run build` runs `prisma generate && npm run index && next build` — the Algolia step is **inside
    the build**, so a search hiccup can break deploys, and it requires Algolia secrets at build time.
13. **Version-control hygiene debt in repo root** — committed build/error artifacts:
    `build-log.txt`, `build-log-utf8.txt`, `build-output.txt`, `errors.txt`, `tsc-errors.log`,
    `tsc-errors-utf8.log`, `typescript-errors.txt`, `tmp_pages.txt`, `fix_edit_client.cjs`,
    `fix-featured.ts`, `check-db.ts`, `check-posts.ts`, `test-blob-upload.js`, plus `.zip` bundles
    (`Analyst Complete Course.zip`, `PREVIOUS AND ADDITIONAL COURSES.zip`,
    `placement-preparation-tracking-website.zip`). These bloat history and confuse tooling.
14. **`README.md` is still the create-next-app boilerplate** and mislabels the project. `CLAUDE.md`
    contains only `@AGENTS.md`.
15. **GitHub `AGENTS.md` file name contains an emoji + space** (`🛡️ AGENTS.md`), which is fragile across
    shells/tooling.

### P2 — Product/ops opportunity gaps

16. **Monetization is modeled but not wired.** `subscriptionPlan`, `stripeCustomerId`,
    `SubscriptionStatus` exist; `make-pro` manually flips a user to PRO. There is no real checkout,
    webhook, entitlement middleware, or gated-content rule that reads subscription state server-side.
17. **Analytics is home-grown and unbatched.** `PageTracker` writes per session/path with a heartbeat;
    `lib/cache.ts` is an in-process `Map` that does not survive serverless invocations and is not
    shared across instances. Works for a small audience; not a real analytics pipeline.
18. **Freshness "cron" is a single weekly schedule** (`vercel.json`: Mondays 03:30). No alerting, no
    per-content-type SLAs surfaced in the admin UI.
19. **Search UX split** — Algolia (`components/research/AlgoliaSearch.tsx`) coexists with static
    `GlobalSearch` and `lib/study.ts` `contains` queries. No unified search across research + PGDM +
    study + tools.
20. **No observability** — no Sentry/OpenTelemetry, no structured logging, no uptime checks, no error
    boundary telemetry. Production failures are invisible until a user reports them.

---

## 4. "Next Level" — Prioritized Roadmap

### Horizon 0 — Harden (1–2 weeks) — non-negotiable before growth

| # | Action | Why it matters |
|---|--------|----------------|
| 0.1 | Create `middleware.ts`: match `/admin/:path*`, `/api/admin/:path*`, `/api/cron/:path*`; enforce session + role centrally; add security headers | Closes the biggest authorization surface |
| 0.2 | Add `lib/auth-guards.ts` with `requireUser()`, `requireRole(...)`, `requireCron(request)` and refactor all routes to use them | Removes ad-hoc, drifting checks |
| 0.3 | Move `make-pro` from a route handler into a server action; return typed results, never `redirect()` from an API route | Correct API semantics |
| 0.4 | Add `zod` schemas to **every** mutating route (`saved`, `analytics/track`, `media/*`, `blocks/*`, `admin/settings/*`) | Consistent 400s, no malformed writes |
| 0.5 | Eliminate the ~38 `as any` at the data boundary; regenerate Prisma client; type `study/page.tsx` with `lib/study.ts` return types | Restores real type safety end-to-end |
| 0.6 | Reconcile role vs plan: keep `UserRole` for permissions, use `subscriptionPlan`/`SubscriptionStatus` for entitlements; fix `dashboard/page.tsx` | Fixes visible gating bugs |
| 0.7 | Audit env/secrets (`git log --all -- .env`), rotate anything possibly exposed, keep `.env.example` current | Removes credential risk |
| 0.8 | Delete build/error/zip artifacts from the repo and root; extend `.gitignore` | Clean history & tooling |
| 0.9 | Replace `README.md` with a real one (architecture, env, scripts, deploy); normalize the AGENTS filename | Onboarding + tool compatibility |

### Horizon 1 — Automate & guarantee quality (2–4 weeks)

| # | Action | Why it matters |
|---|--------|----------------|
| 1.1 | Add **Vitest** (unit: `lib/*`, zod schemas, `sentimentEngine`, `predictions`, `freshness`) + **Playwright** (smoke: home, research, pgdm, study, tools, admin login) | First regression safety net |
| 1.2 | Add `.github/workflows/ci.yml`: `tsc --noEmit`, `eslint`, `vitest run`, `next build` on every PR | Stops type/build regressions from reaching main |
| 1.3 | **Decouple Algolia from build** — run indexing as a post-deploy job or on publish, not inside `next build` | Deploys become deterministic |
| 1.4 | Add **Sentry** (`@sentry/nextjs`) + a global `error.tsx`/`global-error.tsx` reporting path | Observability for real users |
| 1.5 | Add a staging environment + preview deploys with an isolated DB branch | Safe iteration |
| 1.6 | Introduce structured logging + a `/api/health` route (DB ping, version) | Operability |
| 1.7 | Add Storybook (or a `/kitchen-sink` route) for the UI system | Locks in the design language |

### Horizon 2 — Make it a real product (4–8 weeks)

| # | Action | Why it matters |
|---|--------|----------------|
| 2.1 | **Unify search**: one index (or one facade) over research, insights, case studies, PGDM, study, tools; keep Algolia for public search, server-side for admin | One predictable search UX |
| 2.2 | **Entitlements engine**: server-side `canAccess(user, resource)` used by pages and API; drive `/pricing` copy from the same source | Monetization that actually gates |
| 2.3 | **Wire payments** (Stripe Checkout + webhook → `subscriptionStatus`/`subscriptionPlan`); retire manual `make-pro` | Revenue path |
| 2.4 | **Unified content pipeline**: one publish action → DB write → revalidate → re-index → sitemap refresh; retire the MDX/DB ambiguity or make MDX import-first | Removes split-brain |
| 2.5 | **Real analytics**: batched/beacon writes, edge-friendly counters, or a managed analytics backend; precomputed daily aggregates; keep the in-process cache only as a per-instance micro-cache | Scalable insight |
| 2.6 | **Personalized dashboard**: adapt `getSaved*` heuristics to recommend by sector/tag, add progress tracking for study/PGDM | Retention |
| 2.7 | **Alumni/employer outcome layer** for PGDM/placement: outcome stats, testimonials, cohort pages | Trust + conversion |
| 2.8 | **Structured data expansion**: Course, Quiz, LearningResource, PodcastEpisode, Person (authors), Dataset schemas | Richer SERP/GEO presence |

### Horizon 3 — Differentiate (8–16 weeks)

| # | Action | Why it matters |
|---|--------|----------------|
| 3.1 | **AI layer** — retrieval-augmented "Ask FinNexus" over the content corpus; citation-backed answers with links to source pages | Category-defining, GEO-native |
| 3.2 | **Live-data trackers** — replace static KPI values with a scheduled ingest (RBI/SEBI/exchange/public APIs) and show data provenance + timestamp | Turns trackers into a defensible product |
| 3.3 | **Prediction ledger as a public trust asset** — calibration dashboard, streaks, resolution history, JSON-LD | Unique, hard to copy |
| 3.4 | **Data Lab → real notebooks** — downloadable datasets, reproducible notebooks, API access | Analyst-grade credibility |
| 3.5 | **Internationalization** (`next-intl`) — start with en-IN/en-US, currency + date formatting | Market expansion |
| 3.6 | **PWA/offline** — service worker already exists (`public/sw.js`); add offline study packs, install prompts, push for new research | Mobile retention |
| 3.7 | **Enterprise track** — SSO, seat management, team analytics, API keys (schema already hints at TEAM/ENTERPRISE) | Higher ACV |

---

## 5. Version-Specific Notes (Next.js 16.2.1)

Per the workspace rule, I checked the bundled docs. Key points that affect "next level" work:

- **`unstable_instant` is a real, version-specific API.** The docs index explicitly says: *"If fixing
  slow client-side navigations, Suspense alone is not enough. You must also export
  `unstable_instant` from the route."* Before any navigation-performance work, read
  `node_modules/next/dist/docs/01-app/02-guides/` for the current guide. Do **not** assume the
  `loading.tsx` + Suspense pattern alone is sufficient on this version.
- **Edge runtime + `generateStaticParams` are mutually exclusive** on this version (build error E42).
  The only `edge` runtime in the app is `app/opengraph-image.tsx` (correct). Keep content routes on
  `nodejs` (the feed, case-study download, and cron routes already declare `runtime = 'nodejs'`).
- **`experimental_ppr` was removed in v16** — don't plan partial prerendering via that flag.
- Route segment config, `runtime`, `preferredRegion`, and codemods all live under
  `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/` and `.../02-guides/upgrading/`.
  Consult these before touching routing config.

---

## 6. Suggested Execution Order (single track)

```
H0 Harden ─► H1 Automate ─► H2 Productize ─► H3 Differentiate
   │             │                │                  │
middleware    tests + CI       search+entitlements   AI, live data,
+guards       +Sentry          +Stripe+content pipe  prediction ledger
+types+zod    +decouple build  +real analytics       +i18n, PWA, enterprise
+secret audit
```

Sequencing rationale: you cannot safely add payments, AI, or live data on top of an unguarded,
untested, `any`-riddled data boundary. Horizon 0 and Horizon 1 are prerequisites; they are also small
in absolute effort and highest in risk reduction.

---

## 7. Quick Scorecard (current → target)

| Dimension | Now | After H0–H1 | After H2–H3 |
|-----------|-----|-------------|-------------|
| Security posture | Per-route, ad hoc | Central middleware + guards | Entitlement-gated |
| Type safety | ~38 `as any` at DB boundary | Typed boundary, strict CI | End-to-end typed |
| Test coverage | 0 | Unit + smoke, CI-gated | Contract + e2e |
| Deploy reliability | Build couples Algolia + DB | Deterministic build | Multi-env, staged |
| Search | Split (Algolia vs static) | Unified facade | Semantic + AI |
| Monetization | Manual `make-pro` | Entitlements engine | Stripe + enterprise |
| Observability | None | Sentry + health route | Dashboards + SLOs |
| Differentiation | Strong content, static data | Live-ish + ledger | AI + live data + i18n |

---

## 8. Immediate Next Actions (this week)

1. Add `middleware.ts` + `lib/auth-guards.ts`; refactor `make-pro` into a server action.
2. Fix the role/plan conflation in `app/(dashboard)/dashboard/page.tsx`.
3. Remove the ~38 `as any` casts at the Prisma boundary and re-run `tsc --noEmit`.
4. Add Vitest + one Playwright smoke suite; add `.github/workflows/ci.yml`.
5. Move Algolia indexing out of `npm run build` into a separate `npm run index` / post-deploy job.
6. Delete root build/error/zip artifacts; rewrite `README.md`; normalize the AGENTS filename.
7. Audit env/secrets (`git log --all -- .env`) and rotate if needed.

---

*Generated from a full workspace + remote + bundled-docs review. This is a plan, not an implementation;
each numbered item maps to concrete files already identified above.*
