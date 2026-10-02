# Kunwar Analytics 2.0 — Product Vision & Feature Roadmap

> Baseline: the repository contains earlier work on guards, validation, entitlements, tests,
> health/logging, unified search, and pricing. Their presence in source does not by itself prove
> production deployment or end-to-end operation. This document defines **what "2.0" means** —
> the features that turn a content platform into a more accountable product.

---

## 0. What already exists (build on these, don't rebuild)

| Capability | Where it lives today | 2.0 move |
|---|---|---|
| Custom CMS + block editor + media library | `components/admin/*`, `lib/blocks/*`, `app/admin/*` | Add scheduling, revisions, collaborative editing |
| Comments model | `Comment` (post + prediction targets), [`components/ui/CommentSection.tsx`](../components/ui/CommentSection.tsx) | Wire to product — threads, reactions, moderation |
| Prediction ledger + calibration | `Prediction`, `AnalystScore` | Public calibration dashboard (trust asset) |
| Subscription fields | `User.subscriptionPlan`, `stripeCustomerId`, `SubscriptionStatus` | Manually approved UPI entitlements; Stripe remains disabled |
| Study system | `StudyMaterial`/`StudyCategory`, `/pgdm`, `/study/*` | Persisted progress, certificates, adaptive paths |
| Analytics | `PageView`, [`components/analytics/PageTracker.tsx`](../components/analytics/PageTracker.tsx) | Batched pipeline + aggregates |
| Entitlements engine | [`lib/entitlements.ts`](../lib/entitlements.ts) | Drive every gated route + checkout |
| 16 calculators, trackers, radar, podcast | `components/calculators/*`, `lib/trackerData*` | Live data, saved runs, API access |

---

## Pillar A — Revenue Engine (manual payments + entitlements)

This branch implements a **manual UPI with administrator review** flow for Pro and Elite. It is not
production-enabled until the additive schema change is reviewed and deployed. Stripe is intentionally
out of scope and disabled; do not enable a legacy Stripe key or route.

1. **Manual UPI review.** Pro and Elite submissions store a transaction reference, plan, amount, status,
   and audit events. A submission stays `PENDING` until an administrator approves or rejects it. Approval
   alone grants one calendar month; renewal is another manual payment and approval. No screenshots, card
   data, recurring charge, or automatic verification are used.
2. **Server-side content gating.** This branch adds server-side checks to calculator/tool pages and
   selected sector-tracker sections. It does not yet establish a complete premium gate across research
   and insight pages, and those routes still require an explicit access-policy review. Do not describe
   research/insights as premium-gated until every route and data response has been verified to withhold
   gated body content from ineligible users.
3. **One-month manual renewal.** No trials, coupons, annual auto-renewal, or card billing are promised.
   Expiry is calculated from approval time; renewal requires a new administrator-reviewed payment.
4. **Team / Enterprise tier.** Existing organization, membership, and API-key models remain staged until
   a separate product/security review. No SSO, seat billing, or team analytics are claimed as complete.
5. **Usage-metered API.** Existing API-key and rate-limit foundations can be extended later; do not
   expose premium data or add a paid service without separate approval.

**Why first:** entitlement decisions must be enforced at the server boundary and remain auditable.

---

## Pillar B — AI Intelligence Layer (category-defining)

1. **"Ask Kunwar" grounded Q&A.** Build on the existing lexical/site retrieval, platform facts, inline
   citations, and local fallback. Hugging Face inference is optional, off by default, and may use only the
   existing `HUGGINGFACE_API_KEY` when `HUGGINGFACE_INFERENCE_ENABLED=true`; do not add a provider key,
   automatic spend, or vector database. A live provider response must be verified before claiming availability.
2. **Search.** Keep the existing lexical/hybrid search. Vector/embedding retrieval is not currently
   implemented and remains deferred unless an explicitly approved no-additional-cost path is verified.
3. **Internal content accelerators.** Any future drafting/tagging tools must remain human-reviewed and
   cannot send email unless a delivery system is separately approved and implemented.
4. **"Explain this" inline tutor.** Extend grounded source retrieval only where existing content supports it;
   keep deterministic local behavior available.

**Why:** turns a strong content archive into an interactive intelligence product. Hard to copy, high
perceived value, strong upgrade driver for Pro/Elite.

---

## Pillar C — Live Data + Trust Ledger (the moat)

1. **Data integrations and tracker freshness.** Build on current keyless daily-reference FX and
   World Bank integrations and the existing PostgreSQL job queue. The sector `/tracker` pages currently
   render stored quarter-keyed data; they are not connected to live quotes or a guaranteed-refresh feed.
   Future integrations must preserve provenance, source timestamps, and links. Existing reference sources
   are not intraday quotes; do not add paid market feeds or an external queue service.
2. **Public Prediction Ledger.** Turn `Prediction` + `AnalystScore` into a public outcome dashboard:
   resolution history, hit rate, weighted accuracy, streaks, and JSON-LD `Dataset`. Add a Brier score only
   after real forecast probabilities are stored for each prediction; never infer probability from outcomes.
   A transparent track record is a rare, defensible trust asset.
3. **Data Lab 2.0.** Real reproducible notebooks, downloadable datasets, and the metered API (Pillar A.5)
   for the same data — analyst-grade credibility.
4. **Freshness SLAs.** Per-content-type staleness thresholds in admin, with alerting when breached
   (extends the existing `/api/cron/freshness-check`).

**Why:** static numbers are copyable; a live, cited, time-stamped dataset with a public track record is not.

---

## Pillar D — Community & Engagement (retention)

1. **Comments 2.0.** Build on the existing `Comment` model: threaded replies, validated reactions,
   `@mentions`, moderation states, spam checks, and rate limits. In-app notification records may be used;
   email delivery is not implemented and no email provider is added here.
2. **User profiles + portfolios.** Public analyst profiles with saved research, authored posts, and
   Prediction Ledger stats.
3. **Follows & notifications.** Build on existing follows and in-app notification records. Email digests
   remain deferred; the current `NewsletterForm` is not proof of email delivery and no email service is
   added under the current scope.
4. **Gamification.** Streaks, badges (`User.customBadge` already exists), leaderboards for study
   progress and prediction accuracy.

**Why:** community + notifications convert one-time visitors into returning users — the retention layer.

---

## Pillar E — Learning Productization (education → credential)

1. **Persisted progress tracking.** `Enrollment` + `Progress` models for PGDM quizzes
   ([`components/pgdm/Quiz.tsx`](../components/pgdm/Quiz.tsx)), the 60-day placement plan, and
   analyst-course levels — resume where you left off, across devices.
2. **Certificates / credentials.** The current public pages are pathway catalogue entries only. Do not
   issue or describe signed/verifiable credentials until actual assessments, learner completion records,
   issuance controls, and independent verification are implemented.
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

1. **Observability.** Keep existing application logging and error boundaries. External monitoring, SLO
   dashboards, uptime services, and alerting are not configured or added by this zero-additional-cost scope.
2. **Real analytics pipeline.** Batched/beacon writes, precomputed daily aggregates, and a managed
   backend option — the in-process [`lib/cache.ts`](../lib/cache.ts) `Map` stays a per-instance micro-cache only.
3. **Background jobs & queue.** Extend the existing PostgreSQL job queue and publish pipeline within the
   deployed platform's plan limits. Do not introduce Inngest/QStash or a new email/webhook service here.
4. **Unified publish pipeline.** One action: DB write → `revalidateTag` → re-index → sitemap refresh →
   social/OG generation. Removes the MDX/DB split-brain.
5. **Multi-env + e2e.** Staging with an isolated DB branch; Playwright smoke + contract tests as a CI gate.

---

## Phasing

| Phase | Theme | Intended scope |
|---|---|---|
| **2.0** | **Revenue + Trust** | Manually approved UPI + server gating (A1–A2), public Prediction Ledger (C2), existing free-source data (C1) |
| **2.1** | **Intelligence + Community** | "Ask Kunwar" RAG (B1), semantic search (B2), comments + notifications (D1, D3), persisted learning progress (E1) |
| **2.2** | **Scale + Enterprise** | Teams/SSO/API keys (A4–A5), certificates (E2), i18n + PWA (F2–F3), observability + jobs + staging (G1, G3–G5) |

**Sequencing rationale:** Revenue and trust assets fund and differentiate the product *now*. AI and
community drive engagement next. Enterprise, i18n, and scale follow once the product is proven.

---

## Scorecard (target for 2.2)

| Dimension | Now | 2.2 Target |
|---|---|---|
| Monetization | Manual UPI with admin approval | Auditable entitlements; teams remain staged |
| Differentiation | Strong static content | Live data + AI assistant + public ledger |
| Retention | Anonymous, no accounts needed | Progress, notifications, community |
| Intelligence delivery | Site retrieval + local grounded answers | Verified optional inference; vector search remains gated on approved cost-free infrastructure |
| Reach | en-IN web | i18n + PWA/offline + mobile |
| Operability | Health + application logs + PostgreSQL job queue | Keep within current hosting and database plan; external monitoring/staging remain deferred |
