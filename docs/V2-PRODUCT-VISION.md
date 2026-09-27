# Kunwar Analytics 2.0 — Product Vision & Feature Roadmap

> Baseline: Horizons 0–1 of [`NEXT-LEVEL-ROADMAP.md`](NEXT-LEVEL-ROADMAP.md) are **shipped**
> (guards + `proxy.ts`, zod, typed boundary, entitlements engine, Vitest + CI, health/logging,
> error boundaries, unified search, pricing wired to the catalog).
> This document defines **what "2.0" means** — the features that turn a hardened content platform
> into a revenue-generating, defensible product.

---

## 0. What already exists (build on these, don't rebuild)

| Capability | Where it lives today | 2.0 move |
|---|---|---|
| Custom CMS + block editor + media library | `components/admin/*`, `lib/blocks/*`, `app/admin/*` | Add scheduling, revisions, collaborative editing |
| Comments model | `Comment` (post + prediction targets), [`components/ui/CommentSection.tsx`](../components/ui/CommentSection.tsx) | Wire to product — threads, reactions, moderation |
| Prediction ledger + calibration | `Prediction`, `AnalystScore` | Public calibration dashboard (trust asset) |
| Subscription fields | `User.subscriptionPlan`, `stripeCustomerId`, `SubscriptionStatus` | Real Stripe billing + enforcement |
| Study system | `StudyMaterial`/`StudyCategory`, `/pgdm`, `/study/*` | Persisted progress, certificates, adaptive paths |
| Analytics | `PageView`, [`components/analytics/PageTracker.tsx`](../components/analytics/PageTracker.tsx) | Batched pipeline + aggregates |
| Entitlements engine | [`lib/entitlements.ts`](../lib/entitlements.ts) | Drive every gated route + checkout |
| 16 calculators, trackers, radar, podcast | `components/calculators/*`, `lib/trackerData*` | Live data, saved runs, API access |

---

## Pillar A — Revenue Engine (monetization that actually charges)

The single biggest 2.0 gap: **money is modeled, never collected.**

1. **Stripe Checkout + Billing Portal + webhooks.** `POST /api/checkout` creates a Checkout Session
   from the plan in [`PLAN_CATALOG`](../lib/entitlements.ts); `POST /api/webhooks/stripe` maps
   `checkout.session.completed`, `customer.subscription.*`, `invoice.payment_failed` onto
   `subscriptionPlan` + `subscriptionStatus` (including `PAST_DUE` for dunning).
2. **Server-side content gating.** A `<Paywall>` boundary + `canAccess()` checks on premium research,
   insights, and gated calculators. Free users see a teaser + upgrade CTA; the *server* never sends
   gated body content.
3. **Trials, coupons, annual plans.** Add `billingInterval` to the plan catalog; support `TRIALING`.
4. **Team / Enterprise tier.** Introduce `Organization`, `Membership` (seat), and `ApiKey` models.
   Replace the loose `purchasedServices: String[]` with real entitlements. SSO (SAML/OIDC) + seat
   management + team analytics — the schema already hints at `TEAM`/`ENTERPRISE`.
5. **Usage-metered API.** Sell the intelligence as an API: keys, rate limits, usage dashboard,
   per-call quotas tied to plan.

**Why first:** every other pillar becomes fundable once billing works. Highest revenue leverage.

---

## Pillar B — AI Intelligence Layer (category-defining)

1. **"Ask Kunwar" RAG assistant.** Embed the corpus (MDX + `Post` + `StudyMaterial` + trackers) into
   `pgvector`; answer with **inline citations to source pages**. Use the Vercel AI SDK for streaming.
   This is GEO-native — the site both *feeds* and *answers* AI queries.
2. **Semantic + hybrid search.** Extend [`lib/search.ts`](../lib/search.ts) beyond keyword scoring with
   embeddings; keep Algolia for typo-tolerant public search, add vector recall for "find me the thesis
   about X" queries.
3. **AI content accelerators** (internal): draft summaries, TL;DR blocks, auto-tagging, meta-description
   generation, and a weekly AI digest email assembled from the week's research.
4. **"Explain this" inline tutor** on calculators and study pages — contextual, RAG-backed help.

**Why:** turns a strong content archive into an interactive intelligence product. Hard to copy, high
perceived value, strong upgrade driver for Pro/Elite.

---

## Pillar C — Live Data + Trust Ledger (the moat)

1. **Live-data trackers.** Replace static KPI values in [`lib/trackerData.data.ts`](../lib/trackerData.data.ts)
   with a scheduled ingest (RBI, SEBI, NSE/BSE, MOSPI, public APIs) via `Inngest`/QStash background jobs.
   Surface **provenance + as-of timestamp + source link** on every metric.
2. **Public Prediction Ledger.** Turn `Prediction` + `AnalystScore` into a public calibration dashboard:
   resolution history, hit-rate, streaks, Brier score, JSON-LD `Dataset`. A transparent track record is a
   rare, defensible trust asset.
3. **Data Lab 2.0.** Real reproducible notebooks, downloadable datasets, and the metered API (Pillar A.5)
   for the same data — analyst-grade credibility.
4. **Freshness SLAs.** Per-content-type staleness thresholds in admin, with alerting when breached
   (extends the existing `/api/cron/freshness-check`).

**Why:** static numbers are copyable; a live, cited, time-stamped dataset with a public track record is not.

---

## Pillar D — Community & Engagement (retention)

1. **Comments 2.0.** Wire the existing `Comment` model: threaded replies, reactions, `@mentions`,
   moderation queue, spam guard, and email/in-app notifications on reply.
2. **User profiles + portfolios.** Public analyst profiles with saved research, authored posts, and
   Prediction Ledger stats.
3. **Follows & notifications.** Follow authors/sectors; in-app notification center + weekly digest email
   with double opt-in (the current `NewsletterForm` is unconfirmed).
4. **Gamification.** Streaks, badges (`User.customBadge` already exists), leaderboards for study
   progress and prediction accuracy.

**Why:** community + notifications convert one-time visitors into returning users — the retention layer.

---

## Pillar E — Learning Productization (education → credential)

1. **Persisted progress tracking.** `Enrollment` + `Progress` models for PGDM quizzes
   ([`components/pgdm/Quiz.tsx`](../components/pgdm/Quiz.tsx)), the 60-day placement plan, and
   analyst-course levels — resume where you left off, across devices.
2. **Certificates / credentials.** Signed, verifiable completion certificates (shareable, with an
   Open Badge / Verifiable Credential URL) for courses and tracks.
3. **Adaptive paths + spaced repetition.** Recommend next lessons from quiz performance and review
   schedules for durable retention.
4. **Cohort / bootcamp enrollment.** Paid cohorts with scheduling, live sessions, and alumni outcomes.

**Why:** credentials and progress are the strongest reason to create an account and keep paying.

---

## Pillar F — Platform Experience (polish that scales)

1. **Command palette / unified search UI** (`⌘K`) over the already-unified [`lib/search.ts`](../lib/search.ts).
2. **i18n** (`next-intl`) — `en-IN`/`en-US` first, with currency + date formatting; expands market reach.
3. **PWA / offline + push.** `public/sw.js` exists — add offline study packs, install prompt, and push
   notifications for new research.
4. **Personalized dashboard.** Recommendations by sector/tag from saved-item history; "continue learning"
   and "new since your last visit" modules.
5. **Accessibility + performance budgets.** WCAG 2.2 AA pass, Core Web Vitals SLOs, and a
   `Lighthouse CI` gate in [`ci.yml`](../.github/workflows/ci.yml).

---

## Pillar G — Ops & Scale Foundation (enables all of the above)

1. **Observability.** Sentry (errors + traces) wired into the existing error boundaries; SLO dashboards;
   uptime + alerting.
2. **Real analytics pipeline.** Batched/beacon writes, precomputed daily aggregates, and a managed
   backend option — the in-process [`lib/cache.ts`](../lib/cache.ts) `Map` stays a per-instance micro-cache only.
3. **Background jobs & queue.** Inngest/QStash for ingest, re-index, digest email, and webhook retries
   (decoupled from `next build`, which is already done).
4. **Unified publish pipeline.** One action: DB write → `revalidateTag` → re-index → sitemap refresh →
   social/OG generation. Removes the MDX/DB split-brain.
5. **Multi-env + e2e.** Staging with an isolated DB branch; Playwright smoke + contract tests as a CI gate.

---

## Phasing

| Phase | Theme | Ships |
|---|---|---|
| **2.0** | **Revenue + Trust** | Stripe billing + server gating (A1–A3), public Prediction Ledger (C2), live-data trackers v1 (C1) |
| **2.1** | **Intelligence + Community** | "Ask Kunwar" RAG (B1), semantic search (B2), comments + notifications (D1, D3), persisted learning progress (E1) |
| **2.2** | **Scale + Enterprise** | Teams/SSO/API keys (A4–A5), certificates (E2), i18n + PWA (F2–F3), observability + jobs + staging (G1, G3–G5) |

**Sequencing rationale:** Revenue and trust assets fund and differentiate the product *now*. AI and
community drive engagement next. Enterprise, i18n, and scale follow once the product is proven.

---

## Scorecard (target for 2.2)

| Dimension | Now | 2.2 Target |
|---|---|---|
| Monetization | Modeled, manual | Stripe + entitlements + teams |
| Differentiation | Strong static content | Live data + AI assistant + public ledger |
| Retention | Anonymous, no accounts needed | Progress, notifications, community |
| Intelligence delivery | Static pages + keyword search | RAG answers + semantic search + API |
| Reach | en-IN web | i18n + PWA/offline + mobile |
| Operability | Health + logs | Sentry + SLOs + jobs + staging |
