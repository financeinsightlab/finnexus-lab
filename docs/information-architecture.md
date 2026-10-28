# Information Architecture & Dashboard Reorganisation — Proposal + Delivery Record

Status: implemented in this branch (small, reviewable changes; see §9 for test evidence).
Principle: **no URL changes, no DB changes, no auth/entitlement changes, no new dependencies.**
Every route keeps working; only *discoverability, labelling and emphasis* change.

## 1. Audit findings that drove this (source: code inspection, 2026-10-28)

1. Two competing ⌘K search surfaces: `GlobalSearch` (Navbar) **and** `CommandPalette`
   mounted in `app/layout.tsx`, which also rendered a second stray "Search… ⌘K"
   button in the page flow on md+ screens. Duplication, divergent keyboard behaviour.
2. Dashboard persona was inference-only (`enrollments → learner`, else
   `saved/paid → analyst`, else `business`), with **no user override**, and it only
   changed a tool list + heading. A business owner who saves one article became an
   "analyst"; a CFO still saw a 🔥 streak chip and "Continue learning" as a primary action.
3. "Saved work" over-promised: only `SavedArticle` (research/insight) persists.
   Calculator runs are stateless (no `ToolRun`/localStorage persistence exists).
4. No `aria-current` in Navbar / DashboardSidebar (the sidebar's Dashboard-first
   workspace link already existed), and the sidebar never auto-expanded the
   cluster containing the current route.
5. Company hub mixed commercial (Services/Enterprise/Pricing), account ("Your Account",
   duplicating the user menu) and personal (Résumé) destinations at equal weight.
   "Ask Kunwar" (cross-cutting Q&A over all content) sat in **Markets**, duplicating search
   intent. Learn led with a glossary ahead of courses. `/predictions` vs
   `/predictions/ledger` were near-duplicate labels with no differentiation in nav.
6. Breadcrumbs: JSON-LD exists on many pages, but visible UI was ad-hoc "← Back to…"
   links (research/insight/tracker/pgdm detail pages) and a fake non-navigable crumb
   on the dashboard.
7. Dashboard bugs: fresh-content icons compared `'research'` against kinds that are
   actually `'Research' | 'Insight' | 'Study'` (icons always fell back); "16 models"
   hard-coded twice instead of `TOOLS.length`; optional data (badges/enrollments)
   could 500 the whole dashboard.
8. Learning sub-routes `/study/analyst-complete`, `/study/analyst-levels`,
   `/study/skill-academy`, `/study/course/*` are correctly **contextually** linked
   (Featured Programs section on `/study`, chained from Analyst Complete) and are
   deliberately kept out of top-level nav — verified, no change needed.

## 2. Navigation model (single source: `lib/navigation.ts`)

Five hubs are retained — they already map cleanly to the brief's hierarchy without
making everything top-level:

| Hub (landing) | Covers (brief §1) | Items after this change |
|---|---|---|
| Research (`/research`) | Research & intelligence, discovery | Research, Insights, Data Lab, Case Studies, Projects |
| Tools (`/tools`) | Business tools, financial analysis | All tools + DCF, 3-Statement, WACC, SaaS LTV/CAC (full 16-tool catalogue is searchable/filterable on `/tools`) |
| Markets (`/tracker`) | Market intelligence | Sector Trackers, Deal Radar, Predictions (live board), **Prediction Ledger (scored record — newly listed, differentiated)**, Data Freshness |
| Learn (`/study`) | Learning | Study Material, PGDM Curriculum, Finance Terms, Placement Prep, Certificates, Podcast (courses before glossary) |
| Company (`/about`) | Services/enterprise, trust | About, Services, Enterprise, Pricing, Speaking, Résumé, Contact — **"Your Account" removed** (already in user menu + dashboard; route `/account` unchanged) |

- **Ask Kunwar (`/ask`)** removed from Markets (wrong hub; it is a retrieval surface,
  not a market view). It remains fully routed and is surfaced where the intent lives:
  GlobalSearch quick actions and the dashboard Discover grid.
- One source renders everywhere: Navbar dropdowns, mobile drawer, DashboardSidebar,
  Footer columns all consume `NAV_CLUSTERS`. That is intentional responsive/SEO
  sitemap behaviour, not content duplication — there is exactly **one** list to edit.
  Current-page state (`aria-current="page"`) is announced in Navbar + Sidebar only,
  so screen-reader users are not told three times.
- `QUICK_ACTIONS` (search jump-to list) and `isNavActive()` now also live in
  `lib/navigation.ts`, exported from the same module.
- Admin (`/admin/*`) is unchanged — separate grouped nav already delivered.

## 3. Proposed sitemap (all URLs preserved)

```
Public / discovery        /  /research(+/[slug])  /insights(+/[slug])  /data-lab(+/[slug])
                          /case-studies(+/[slug])  /projects  /ask  /authors/[slug]
Business tools & analysis /tools(+/[slug], 16 calculators)  /tools/autonomous-workforce
Markets                   /tracker(+/[sector])  /radar  /predictions  /predictions/ledger  /data-freshness
Learning                  /study(+/[slug], /placement-prep, /analyst-complete*, /analyst-levels*,
                          /skill-academy*, /course/[courseSlug]/[lessonSlug])
                          /pgdm(+/[subject](/[lecture]|/cheatsheet|/lesson/[lessonSlug]), /search)
                          /finance-terms(+/[slug])  /certificates(+/[slug], /course/[s], /issued/[id])  /podcast(+/[slug])
Saved work & reports      /dashboard (saved articles, learning progress)  /account
Services / enterprise     /services  /enterprise  /pricing  /checkout/[plan]  /contact  /speaking
Company / trust / legal   /about  /resume  /status  /ethics  /security  /privacy  /terms  /cookies  /gdpr
Auth                      /auth/signin  /auth/error
Admin (staff only)        /admin(+ /cms, /media, /messages, /payments, /predictions, /product-content,
                          /settings, /study, /users, /analytics)
* = contextual: linked from the /study landing (Featured Programs), deliberately not top-level nav.
```

Per-route decision shorthand: **keep** (all of the above), **link contextually**
(study sub-paths, ledger), **hide from primary nav but keep routed** (`/ask` from
Markets, `/account` from Company — both still one click via search/user menu),
**move/redirect: none** (SEO equity preserved; `app/sitemap.ts` untouched).

## 4. Dashboard layout by user type (`/dashboard`)

Layer order is stable (predictable return visits); *contents and emphasis* vary.
Focus is inferred as before but **the user can override it** (Business / Analyst /
Learner switcher in the header; choice persists in a `dash-focus` cookie — no DB change).

| Layer | Business | Analyst | Learner |
|---|---|---|---|
| 1 Workspace header | plan chip, last-visit | plan chip, last-visit | + streak, level/XP, badges |
| 2 Primary actions | Start a model · Value a business (DCF) · Talk to us | Open tools · Read research · Check predictions | Continue learning · Open a tool · Read research |
| 3 Return to work | Saved articles + fresh-since-visit (honestly labelled; tool runs are not saved — stated in §4 of page) | same | same |
| 4 Tools for you | DCF, 3-Statement, Market Sizing, WACC | DCF, CCA, SaaS LTV/CAC, Ratio Analyzer | WACC, TVM, Ratio Analyzer, Portfolio Risk |
| 5 Progress / start | "Where to start" → case studies, services | → research, Data Lab | real course progress bars (LessonProgress) |
| 6 Plan & account | plan benefits, `/pricing`, `/account` (real data only; failures degrade to a labelled unavailable note) | same | same |
| 7 Discover | Enterprise/Services first | Data Lab/Predictions first | Certificates/Placement first |

No persona gets a separate route or page tree — shared components, one URL.
No decorative metrics: every number comes from `SavedArticle`, `LessonProgress`,
enrollments, or `resolvePlan()`.

## 5. Search consolidation

`CommandPalette` mount + component removed. Its two good behaviours were ported into
the one remaining surface, `GlobalSearch`: ArrowUp/ArrowDown + Enter-to-open with an
active-row highlight, and a "Jump to" quick-action list (from `QUICK_ACTIONS`) when
the query is empty. ⌘K / Ctrl-K, the Navbar button, grouped `/api/search` results,
and the full-research-search footer are unchanged. Saved items are not in the public
search index (per-user data) — labelled limitation, see §8.

## 6. Breadcrumbs

New shared `components/ui/Breadcrumbs.tsx` (semantic `nav > ol`, `aria-current="page"`
on the current item, truncates safely on mobile). Adopted on the dashboard (replacing
the fake crumb) and on `/research/[slug]`, `/insights/[slug]`, `/tracker/[sector]`,
`/pgdm/[subject]` (replacing or heading the ad-hoc back-links; existing JSON-LD kept).
Pattern for remaining detail pages: `<Breadcrumbs items={[Home, Section, Title]} />`.

## 7. Files changed in this pass

- `docs/information-architecture.md` (this file), `docs/design-system.md`
- `lib/navigation.ts` (hub membership/order, `QUICK_ACTIONS`, `isNavActive`) + `lib/navigation.test.ts`
- `app/layout.tsx` (remove CommandPalette mount), ~~`components/ui/CommandPalette.tsx`~~ (deleted)
- `components/layout/GlobalSearch.tsx` (keyboard nav + quick actions)
- `components/layout/Navbar.tsx`, `components/layout/DashboardSidebar.tsx`
  (`aria-current`, active-cluster auto-expand, workspace-home link)
- `components/ui/Breadcrumbs.tsx` (new) + adoption in dashboard / research / insights / tracker / pgdm pages
- `app/(dashboard)/dashboard/page.tsx` (focus override, persona actions/emphasis,
  honest saved-work labelling, kind-icon fix, dynamic tool count, resilient optional data)
- `components/dashboard/FocusSwitcher.tsx` (new, cookie persistence)
- (no study-page change: contextual program links already existed and were verified)

## 8. Risks, compatibility & remaining limitations

- **Compatibility:** zero URL/redirect/API/DB/auth changes; removal of a nav *link*
  (Ask from Markets, Account from Company) does not affect routing, bookmarks, or SEO
  (both remain in `sitemap.ts` and internally linked). Deleting `CommandPalette`
  removes only its own button; ⌘K behaviour is preserved by GlobalSearch.
- **Focus persistence** uses a first-party cookie, not the DB (scope limit). It is
  per-browser; a future `User.dashboardFocus` column would make it cross-device.
- **Search** still cannot surface a user's saved items (public index only) and has no
  recents; adding that needs an authenticated search merge — out of scope.
- **Tool runs remain unsaved** by design of the current data model; the dashboard now
  says so instead of implying otherwise. Persisting runs is a product feature, not IA.
- Persona inference is still a heuristic default; the override is the corrective.
  Onboarding-based persona capture would need an auth-flow change (out of scope).
- Breadcrumb rollout covers 5 representative surfaces; remaining detail pages keep
  their working back-links until migrated to the shared component incrementally.
- Build verification in this sandbox is limited by the known Prisma binary-download
  block (pre-existing); type-check delta, lint, unit tests and dev-server smoke
  tests are the evidence in §9. Re-run `npm run build` in CI/Vercel.

## 9. Test evidence (2026-10-28, sandbox dev server on 0.0.0.0:3000)

- **Unit tests:** `npx vitest run` → **40 files / 274 tests passed** (267 baseline
  + 7 new in `lib/navigation.test.ts`: hub integrity, no duplicate labels,
  account/ask excluded from hubs, predictions vs ledger, quick-action uniqueness,
  `isNavActive` exact/nested/root semantics).
- **Lint:** eslint on all 13 touched files → **0 errors** (11 pre-existing warnings).
- **Type-check:** `tsc --noEmit` → **184 errors, all pre-existing** stale-Prisma-client
  noise; baseline was 191 (this pass removed a net 7; zero errors in any touched file).
- **Build:** `npm run build` still blocked in-sandbox at `prisma generate`
  (binaries.prisma.sh unreachable — pre-existing infra limit). Re-run in CI/Vercel.
- **Route smoke (all nav destinations):** every `NAV_CLUSTERS` + `QUICK_ACTIONS` href
  plus `/ask`, `/account`, `/dashboard`, study sub-routes → **HTTP 200** (35/35 after
  dev-server restart; calculator pages compile in <3s on a warm server).
- **Search:** homepage HTML contains **no** "Open command palette" button (duplicate
  removed); `GET /api/search?q=dcf` returns grouped results; GlobalSearch now carries
  the ported ↑↓/↵ handling + Jump-to quick actions (keyboard flow code-reviewed
  against the removed CommandPalette implementation it was ported from).
- **Breadcrumbs (server-rendered, asserted in HTML):** `aria-label="Breadcrumb"` +
  `aria-current="page"` present on `/research/india-quick-commerce-2026`,
  `/insights/india-corporate-capex-turnaround`, `/tracker/quick-commerce`,
  `/pgdm/project-management`. Dashboard crumb renders post-auth.
- **Dashboard personas:** unauthenticated `/dashboard` serves the sign-in shell in
  this sandbox (no seed session), so Business/Analyst/Learner visuals could not be
  screenshot-verified here. Verified instead: page type-checks clean; focus cookie
  parsing is whitelist-guarded (invalid `dash-focus` value falls back to inference,
  HTTP 200); action/discover ordering is deterministic data selection reviewed in
  code. **Action: visual check per persona on staging with a real login.**
- **Responsive/keyboard:** navigation behaviour (mobile drawer focus trap, dropdown
  Escape handling, `useModalAccessibility`) was not restructured — changes were
  additive (`aria-current`, auto-expand, arrow keys). Manual spot-check on staging
  recommended for the switcher's pressed state announcement.
