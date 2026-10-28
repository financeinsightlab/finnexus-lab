# Kunwar Analytics — Independent Readiness Audit

**Date:** 2026-10-28 · **Auditor stance:** independent verification — prior phase outputs (including my
own) were treated as unproven until re-executed or re-inspected this session.
**Branch:** `arena/570c2fa8-finnexus-lab` · **HEAD:** `d6c6e030` · **Working tree:** 57 dirty paths
**No fixes applied. No features added. No production/payment settings touched.**

Labels: **[EXEC]** executed and observed · **[INSP]** code-inspected · **[NV]** not verified.

---

## A. Executive Readiness Verdict — **INTERNAL TESTING**

Not Private Beta yet. The engineering core is genuinely strong — 384/384 tests re-executed green,
financial engines independently reproduced to the penny on fresh cases, hostile-input sweep clean,
admin APIs properly 401 — but the product **cannot be given to real users today** for reasons that
have nothing to do with code quality:

1. **It isn't deployed.** Both public URLs serve "Deployment Paused"; all audited improvements sit
   uncommitted on this branch (57 dirty paths vs `main`). [EXEC]
2. **No money path has ever been executed end-to-end** in a verifiable environment (manual-UPI
   submission → admin approval → entitlement grant is code-complete but [NV]).
3. **Authenticated, premium, dashboard and admin user journeys have never been run** against a real
   database/session in this engagement. [NV]
4. **The flagship DCF has an unresolved terminal-value convention question** (§C-1) that moves
   output ~7% in a common input region — a domain decision must precede charging for valuations.

With the Phase-0 ship + smoke sequence (§F) this becomes Private Beta Ready. Public Launch
Candidate additionally requires automated payments and monitoring.

---

## B. Issue Table

### Critical

| # | Issue (route/file) | Evidence & reproduction | Impact | Recommended fix | Test of fix |
|---|---|---|---|---|---|
| C-0 | **Nothing is live; audited work is uncommitted** (`git status`: 57 paths; sites paused) | `git status --porcelain \| wc -l` → 57; fetch kunwaranalytics.in → "Deployment Paused" [EXEC] | Zero users can reach any of this; all other findings are theoretical until shipped | Slice branch into PRs (engines→components→IA→admin), green CI, deploy staging→prod | CI build green incl. `prisma generate`; staging smoke checklist signed off |
| C-1 | **DCF terminal value uses `FCFFₙ×(1+g)` without investment normalisation** (`lib/finance/dcf.ts:271`) | Independent Python vs engine on fresh case (rev0 ₹2.0M, g 12%, NWC 8%): PV-explicit matched to the penny (₹805,738.97) but TV differed ₹3.81M vs ₹4.10M. At DCF defaults + NWC 10%: engine price ₹24.54 vs normalised ₹26.35 (**−6.9%**) [EXEC]. Convention IS disclosed in UI (`TV = UFCF_N(1+g)/(WACC−g)`) and doc line 32 agrees with code — so this is a **convention choice**, not a doc/code mismatch | With growth-fade off and NWC%>0 (a headline input), final-year ΔNWC embeds explicit-period growth forever, systematically understating value. Charging for "institutional" DCF output with an undisclosed-understatement in the common case is a trust/liability risk | Domain decision: normalise terminal-year ΔNWC (and state capex stance) at perpetual g — standard practice — **or** keep and add a prominent warning + auto-suggest fade. Either way: new goldens + fade on/off regression tests | New Python goldens for fade-off/NWC>0 case; existing 384 tests still green; sensitivity grid sanity (TV share monotonic in g) |

### High

| # | Issue | Evidence | Impact | Fix | Test |
|---|---|---|---|---|---|
| H-1 | **Typecheck has never been observed green** (184 errors) | `npx tsc --noEmit` today → 184; decomposed: TS2305/TS2694 "no exported member" from stale generated Prisma client + TS7006 implicit-any cascades [EXEC]. `prisma generate` fails here (binaries.prisma.sh unreachable) [EXEC] | Unknown residue of real errors may hide inside the cascade; CI `verify` job would fail or has never run on this code | Run generate+typecheck in CI; fix true residue; ratchet to 0 | CI typecheck step green on PR |
| H-2 | **Production build unverified** | `npm run build` aborts at `prisma generate` in sandbox [EXEC] | Same as H-1 — no proof the branch builds | CI build (already configured) as merge gate | `npm run build` exit 0 in CI |
| H-3 | **Auth/premium/payment journeys unverified E2E** | No DB/credentials in sandbox; /dashboard renders sign-in shell 200 under mock [NV] | The entire revenue path (register→pay→approve→unlock) is unproven | Staging env + seeded test users (free/PRO/admin) + scripted smoke | Checklist: each role completes its journey; entitlement flips verified in DB |
| H-4 | **Errors can masquerade as HTTP 200** (`/predictions`, `/predictions/ledger`) | Server log: `⨯ Error: Prisma mock: prediction.findMany…` with digest, yet `GET /predictions 200` [EXEC] | Monitoring blindness; users may see fallback/empty states reported as success | Ensure error paths set correct status or render explicit error states; add error tracking | Kill DB in staging → pages return 5xx or visibly-labelled degraded state; alert fires |
| H-5 | **Payments cannot scale / B2B cannot buy** (`lib/payments/manual-upi-provider.ts`, `/api/checkout` → `{"provider":"MANUAL_UPI","automaticCheckout":false}` [EXEC]) | Code + live API response; PRO ₹999 / ELITE ₹1,999 verified in code and rendered pricing | Human approval per subscriber; no auto-renewal, invoices, refunds, GST docs | Razorpay subscriptions behind existing provider seam; keep manual as fallback | Test-mode subscription lifecycle: pay→webhook→entitlement→renew→cancel |

### Medium

| # | Issue | Evidence | Impact | Fix | Test |
|---|---|---|---|---|---|
| M-1 | **Soft-404s on dynamic routes** — invalid slugs return 200 with not-found/fallback UI (research, insights, finance-terms, tracker sector, tools slug, checkout plan, authors: 7/7 executed) | curl statuses today; `/research/bad` title "Report Not Found" at 200; `/tools/not-a-tool` renders hub-title page at 200 (despite `notFound()` at `tools/[slug]/page.tsx:92` — streaming flushes 200 first) [EXEC] | SEO soft-404 penalties; confusing analytics; invalid-plan checkout shows "Unknown plan" at 200 (guard itself works — no wrong payment possible [INSP]) | `dynamicParams=false` on closed sets (tools, tracker, checkout plans); verify status on production build for MDX families | Invalid slugs → 404 in staging for all families |
| M-2 | **Admin API defence-in-depth unproven per-handler** | Unauthenticated probes: 8/8 admin/user APIs → 401 [EXEC]; but only 5/18 admin route files reference the common guard helpers statically — protection may be coming from `proxy.ts`, whose own header warns it must not be the sole layer [INSP] | If proxy matching ever loosens, handlers may be exposed | Audit each of 18 handlers for an explicit guard; add missing ones | With proxy bypassed in test, handlers still 401/403 |
| M-3 | **~3 MB unoptimised PNGs** in `public/` (8 files ≥2.5 MB, cartoon-* series) | `find public -exec stat` [EXEC] | LCP/mobile data cost on tracker/card pages | Convert to WebP/AVIF via next/image; set budgets in Lighthouse CI (exists, warn-only) | Lighthouse mobile run on staging: LCP + total bytes within budget |
| M-4 | **"Markets" framing over-promises static data** (nav group "Markets"; tracker = 8 static sectors; live pipeline unwired) | Prior audit §3.2; tracker disclaimers themselves are honest [INSP] | Expectation gap for a finance-savvy first-time visitor | Rename group ("Research Data") or wire the keyless pipeline with provenance | Copy review; user test: 5 visitors describe what data is live |
| M-5 | **No server-side saved analyses** (all calculator persistence is per-browser localStorage) | Engine codecs exist; no SavedAnalysis model/API [INSP] | No resume/share-with-team/audit trail → retention and B2B ceiling | Phase-1 feature (§F) — not now | — |
| M-6 | **Dashboard next-action clarity unproven visually** | Code: learning-first modules + FocusSwitcher [INSP]; never seen rendered with a real session [NV] | Founder/analyst personas may land on learner content | Staging visual review per persona; first-run goal picker | 5-user hallway test per persona: "what would you click first?" |
| M-7 | **Dev-server instability under crawl load in sandbox** (died 3×; logs show no app crash — environment reaping; dev SSR 150 ms–2.4 s first-hit) | Process logs [EXEC] | Not a production verdict, but blocks thorough local QA; production perf unknown | Do QA against `next start` build in CI/staging | Full 95-link crawl completes against staging build |

### Low

| # | Issue | Evidence | Fix |
|---|---|---|---|
| L-1 | Dead lock-overlay JSX + unused subscribe handlers remain in 10 calculator components (unreachable) | calculator docs; locks neutralised | Delete on next touch |
| L-2 | `components/calculators/*` still brand themselves "Premium Web Calculator" incl. free tools | component headers [INSP] | Copy pass |
| L-3 | Lint: 134 warnings repo-wide (0 errors) [EXEC today] | `npm run lint` | Opportunistic cleanup; keep 0-error gate |
| L-4 | Duplicate delegate route `/tools/autonomous-workforce` (thin wrapper) | page re-exports `[slug]` | Keep or canonicalise; harmless |
| L-5 | Stripe env vars/webhook stub imply a disabled integration | §prior audit | Remove during Razorpay work |
| L-6 | i18n cookie scaffold + partial catalogues presented as infrastructure | `lib/i18n/` | Hide until real, or finish — decide; don't market it |

---

## C. Verified vs Unverified

### Verified completed (executed this session unless noted)

- **Unit tests:** `npx vitest run` → **46 files / 384 tests passed** [EXEC today].
- **Lint:** `npm run lint` (full repo) → **0 errors**, 134 warnings [EXEC today].
- **Financial engines — independent reproduction on FRESH inputs** (Python vs engine via tsx):
  WACC 11.7487% ✓ · EMI ₹19,858.52 ✓ · SaaS LTV 6,069.38 / payback 8 ✓ · CCA even-median 5.5139,
  net-cash target, price 47.06 ✓ · CPM tie path (all 4 critical, duration 7) ✓ · DCF explicit-period
  PV to the penny ✓ (TV convention = issue C-1). **Hostile sweep: 29/29 engines × invalid/extreme
  inputs returned structured results — zero throws, zero NaN/∞ leaks** [EXEC today].
- **Routing/links:** 95 unique internal links discovered from 7 hub pages; executed checks across
  restarts covered content, tools, PGDM, podcast, tracker, legal families at 200; **no broken
  (404/5xx) internal link observed** among completed checks; unknown top-level route → 404 ✓.
- **Admin surface protection:** `/admin*` pages 307→signin; 8/8 sensitive APIs 401 unauthenticated [EXEC].
- **Pricing truthfulness:** rendered ₹999/₹1,999 exactly match `PRICE_MINOR` (99_900/199_900);
  `/api/checkout` honestly reports manual-UPI-only [EXEC]. Claims: "16 tools" = registry count 16 ✓;
  "73 lectures" ≤ 79 lecture slugs counted ✓; no fabricated user-count claims found on homepage [EXEC scan].
- **Prior-audit consistency:** file/route counts, test count, gating map (7 gated / 9 free) all
  re-verified consistent with `docs/AUDIT-2026-10-28.md`. **One material correction to prior
  characterisation:** session summaries described DCF terminal value as "recomputed/normalised";
  code (`dcf.ts:271`) and the DCF doc (line 32) both implement/document `FCFFₙ(1+g)` — see C-1.
  Golden defaults (₹27.51) unaffected (default NWC% = 0).

### Unverified (do not treat as working)

Sign-up/sign-in/OAuth · dashboard with real data (all personas) · premium unlock after payment ·
manual-UPI admin approval → entitlement flip · CMS create→preview→publish→live round-trip · media
upload to Blob · study progress/assessment/certificate issuance · predictions authoring/resolution ·
email delivery (contact, inquiries, notifications) · Algolia index freshness · cron jobs on Vercel ·
mobile/tablet layouts & touch UX at any viewport · accessibility (Lighthouse config exists,
warn-only, never run by me) · production performance · orgs/API-keys/badges depth (thin UI
references only) · role-matrix behaviour beyond unauthenticated 401s.

---

## D. Five Most Important Remaining Improvements (in order)

1. **Ship the branch through CI to a real deployment** and run the missing verification battery
   (fresh-Prisma typecheck, build, visual/auth/premium/payment smoke). *Unblocks everything.*
2. **Adjudicate + fix/document the DCF terminal-value convention** (C-1) with new goldens — before
   any paid positioning of valuation outputs.
3. **Automate payments** (Razorpay) with webhook-driven entitlements + GST invoices; verify E2E.
4. **Server-side saved analyses ("My Models")** for DCF/WACC/3-Stmt/CCA/SaaS/Ratios — the retention
   and future-team keystone; engines already expose parse/serialise codecs.
5. **Truth-in-operations pack:** soft-404 fixes (M-1), error→status correctness (H-4), error
   monitoring + uptime on `/api/health`, image optimisation (M-3), "Markets" rename (M-4).

## E. What NOT to Build (complexity without demonstrated value)

- **More calculators.** Sixteen validated ones exceed the current distribution by an order of magnitude.
- **FP&A/team suite, org workspaces, approvals** — no paying team has asked; schema exists if pull emerges.
- **Equity data terminal / screener** — Screener.in/Trendlyne own the data moat; unwinnable and ops-heavy.
- **SaaS-metrics data sync** (ChartMogul/Baremetrics territory) — different company.
- **CMS expansion** (scheduling, more editors, promotions features) — internal tooling already
  outweighs audience; freeze until content is the proven bottleneck.
- **Native apps, i18n completion, three.js embellishments, more gamification (badges)** — no demand signal.
- **"AI analyst" chat beyond grounded FAQ** — Ask Kunwar's lexical core is honest; LLM-wrapping
  valuations before C-1/data exist manufactures liability, not value.

## F. Practical 30-Day Commercial Validation Plan

**Days 1–7 — Ship & instrument.** Land PRs; green CI (typecheck/build with fresh Prisma); staging
with seeded DB (free/PRO/admin users, sample predictions/study data); execute the NV checklist (§C)
as a signed smoke script; deploy production; add error tracking + uptime + basic funnel analytics
(landing → tool run → share-link → signup → pricing view → checkout start). Decide C-1 and patch
with tests. *Exit criteria: a stranger can sign up, run a DCF, hit a paywall, pay (manual UPI ok),
get unlocked — observed working.*

**Days 8–14 — Private beta (concierge).** Recruit 12–20 users: 6 founders, 6 analysts/finance
professionals, rest PGDM learners (existing network + LinkedIn). Onboard 1:1; watch first-session
recordings (consented); log: time-to-first-model, completion, share/export use, paywall reactions.
Interview 8 of them (problem, current Excel workflow, what would make this a weekly habit, price
reaction at ₹999/₹1,999).

**Days 15–21 — Offer tests.** (a) Landing/pricing message test: "modelling workspace" vs
"calculators" framing. (b) One paid **model pack** (e.g., Q-commerce or SaaS template built on the
engines, delivered as workspace + PDF) at ₹2,999–4,999 to the beta list. (c) One **services** offer
(fixed-scope valuation/model review) to 10 targeted founders. Measure: pack sales, calls booked,
reply rates — real money signals over survey intent.

**Days 22–30 — Decide & commit.** Score against pre-set thresholds (suggested: ≥40% beta users run
≥3 models in week 1; ≥3 pack/service purchases or ≥5 paid PRO conversions; ≥60% interviewees name
a recurring job the tool beats Excel for). Pick the single wedge segment; freeze everything else;
start Razorpay + saved-analyses build only for the winning segment's top workflow. Publish a
transparent beta retrospective (fits the brand's methodology-led positioning).

## G. Recommended Next Action

**Execute Days 1–7 ship-and-verify (task D-1) before any other work.** Reason: every commercial
question — pricing, wedge, willingness to pay — is currently unanswerable because no human can use
the product; the codebase is already past the quality bar where deployment, not features, is the
binding constraint (384 green tests and penny-exact engine reproduction vs a paused site and an
uncommitted branch). Shipping converts a year of accumulated, verified engineering into evidence,
and its staging checklist simultaneously clears H-1/H-2/H-3. The DCF convention decision (C-1)
should ride along in the same window since it touches the flagship tool's trust story.

*Audit ends. No fixes implemented — awaiting review and prioritisation.*

---

## Addendum — 2026-10-28, post-audit CI verification (PR #12)

After this report was issued, the branch was committed, pushed, and opened as PR #12 against `main`. The audit's Blocker **B-1 is now partially resolved**, and **C-0 partially improved** — updating the record:

- GitHub Actions run `40724346654` passed **every step**: Prisma client generation, `tsc --noEmit` (clean, on a fresh client), ESLint, Vitest 384/384, production `next build`, and Lighthouse budgets. A green type-check and production build have now actually been observed — the sandbox's stale-client ambiguity is closed.
- Reaching green required three type-only fixes: typing the `lib/prisma.ts` export as `PrismaClient` (its `any` annotation had been cascading implicit-any errors across the codebase — this also confirms CI type-check could not have been green at `main`'s `d6c6e03` either), and two casts on the new "published vs draft" Prisma `groupBy` in `app/admin/page.tsx` (mirroring `app/admin/cms/page.tsx`). No behaviour changed.
- The only failing PR check is Vercel: *account deployment blocked* — the same account-level pause recorded in C-0, not a code failure.
- Governance: the work is now version-controlled and in review (PR #12). It remains **merged-pending and unshipped** — no end user is affected by any of it until a merge + deployment happens against an un-paused Vercel account.
- Everything else in this report stands unchanged: authenticated/premium/payment/CMS journeys and the manual-UPI flow still need staging verification; the DCF terminal-value convention (C-1) is still open; the **Internal Testing** verdict stands.
