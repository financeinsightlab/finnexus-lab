# Admin Command Centre — Proposed Sitemap & Implementation Scope
Date: 2026-10-28 — Branch arena/570c2fa8-finnexus-lab

## Verified Existing Architecture (do not replace)

- **Guard**: `app/admin/layout.tsx` → `getCurrentUser()+isStaff(ADMIN,ANALYST)` via `lib/auth-guards.ts`. Proxy (`proxy.ts`) also 401/403. Mutations go through `actions/cms-actions.ts`, `actions/study-actions.ts`, `app/api/admin/*` with `requireRole` re-checks.
- **Prisma models inspected**: `Post` (`published` boolean + `contentStatus=DRAFT|REVIEW|APPROVED|PUBLISHED` + `scheduledPublishAt` + `publishedAt` + `viewCount`), `Media`, `Page` (`PageStatus`), `StudyMaterial`/`StudyCategory`, `Promotion`+`PromotionTarget`+`PromotionPlacement` (targeting engine 6 components), `PaymentSubmission`+`PaymentAuditEvent`, `Prediction`+`AnalystScore`, `FaqItem`/`FinanceTerm`/`RelatedContent`/`CourseLesson`, `User`/`Session`/`LoginEvent`/`PageView`, `Job`/`PublishEvent`.
- **Block-editor**: `components/admin/block-editor/*` (Canvas, Sidebar, SettingsPanel, Preview) + `lib/blocks/registry.ts` 14 block types + `lib/templates.ts` templates + `components/admin/Editor.tsx` (Tiptap + slash commands + media modal). Both markdown (`content`) and blocks (`blockContent` JSON + `contentType` enum) already persisted.
- **Current admin routes (12 surfaces)**: `/admin`, `/admin/cms` (library list, filters by type search status, pagination), `/admin/cms/new`, `/admin/cms/edit/[id]` (dual markdown/blocks, SEO/social/advanced tabs, scheduling, templates), `/admin/media` (Vercel Blob/local, alt/caption), `/admin/study` + categories/new/edit, `/admin/product-content` (FAQs/terms/related/courses tabs + promotions sub-manager), `/admin/predictions` (resolve ledger), `/admin/messages` (ContactInquiry reply flow), `/admin/users` (search/role table + role toggle action), `/admin/payments` (manual UPI pending+history + manual-upi API), `/admin/analytics` (live views, top pages, monthly chart, provider breakdown), `/admin/settings` (HomePageItem/FeaturedContent/HomePageConfig).
- **Permission matrix**: ADMIN sees all; ANALYST sees CMS/media/study/product-content/predictions, LOCKED overlay on messages/users/payments/analytics/settings; MEMBER blocked at layout. Verified in `CollapsibleSidebar.tsx` `adminOnly` flags + per-route `redirect()` checks + server-action `authorId` ownership check for ANALYST.

Empty sections do NOT exist — every nav item maps to a real route with data.

## Proposed Admin Sitemap v2 (grouped, no empty sections, URLs preserved)

All hrefs preserved to avoid breaking SEO/bookmarks. New grouping is UI-only.

```
Overview
  /admin                                  → Operations Command Centre (redesigned, real metrics only) — ADMIN only, ANALYST→/admin/cms

Content  [existing status fields reused]
  /admin/cms                              → Library — Idea→Draft→Review→Approve→Publish→Measure→Archive workflow surface
  /admin/cms/new                          → Create (markdown or block-builder, templates, SEO, media)
  /admin/cms/edit/[id]                    → Edit (autosave, preview, slug guard, quality checks)
  /admin/media                            → Media Library (search, filter, alt, reuse)

Learning
  /admin/study                            → Study Materials (search/status/category, published/featured flags)
  /admin/study/categories                 → Categories (order, icon, color)
  /admin/study/new & /edit/[id]           → Create/Edit study material

Product (Tools + Product Content)
  /admin/product-content                  → Content Ops hub (tabs: FAQs, Finance Terms, Related, Courses)
  /admin/product-content?tab=promotions   → Promotions (existing targeting engine: targets/placements/frequency/rotation, analytics)
  /admin/predictions                      → Predictions ledger (overdue, resolve, calibration)

Operations
  /admin/messages                          → Customer Enquiries (UNREAD/REPLIED, templates, in-app notify)
  /admin/users                            → Users & Organisations (orgs surfaced when data exists, else hidden empty-state — no filler)
  /admin/payments                          → Billing & UPI Payments (PENDING queue + history + audit)

Analytics
  /admin/analytics                        → Analytics (live sessions, top pages, monthly cohort, provider breakdown)

System
  /admin/settings                          → Settings & Homepage (FeaturedContent, HomePageItem TRACKERS/PILLARS/HERO_STATS, HomePageConfig visibility)
```

**Future slots not created as nav**: `/admin/api-keys`, `/admin/organisations` remain hidden until real org/API-key data exists — no placeholder menu items.

**Navigation behaviour**: grouped with sticky headers, active left accent + `bg-brand-muted text-brand`, exact+prefix match (incl. `?tab=promotions` active), top filter “Filter navigation…”, collapsible desktop rail (64↔256px, localStorage + event), mobile drawer (focus trap, Esc, overlay, safe-area), user badge + Back to Site. Layouts use consistent header (`section-label` + `h1` + description) + card/shadow rhythm already in repo.

## Implementation Scope (before any edit)

### Guiding rules
- Reuse `Post.contentStatus` workflow states (DRAFT, REVIEW, APPROVED, PUBLISHED) + `published`/`publishedAt`/`scheduledPublishAt`; do not introduce parallel status. ANALYST ownership rule stays at server-action layer.
- No production DB migration, no `DATABASE_URL` change, no destructive mutation bypass. Every mutation stays server-side + `requireRole`.
- Metrics are real only: each card declares source table, query and calculation in code comment so review can verify.

### One workflow at a time (delivery batches)
**Batch A — Command Centre + Navigation (this branch, first)**
- Replace decorative KPI grid with real, useful metrics: content workflow summary (groupBy contentStatus), drafts+scheduled (contentStatus+scheduledPublishAt), needing review (REVIEW), recently updated (orderBy updatedAt), freshness warnings (`evaluateSla` per content type via `lib/freshness-sla.ts` warn/breach windows), enquiries attention (getContactInquiries unread from DB/file), product/promotion status (promotion active vs scheduled vs expired via startsAt/endsAt), usage (pageView today/7d/30d + loginEvent + sessions + topPages), integration status (`featureStatus()` + Job pending/failed + PublishEvent recent). Each with source comment.
- Sidebar: grouped nav as above, active states, searchable, responsive, consistent.
- Files: `components/admin/CollapsibleSidebar.tsx`, `app/admin/AdminLayoutClient.tsx` (minor margin tweak if needed), `app/admin/page.tsx` + new local component `app/admin/_components/*` for metric cards. DB: none. Tests: existing admin guards + new render assertions for grouped nav + metric presence.

**Batch B — Content Workflow (next)**
- Surface `contentStatus` badges in CMS table, add status filter `?status=DRAFT|REVIEW|APPROVED|PUBLISHED` (keeping boolean `published` derived), Review queue view, scheduled list with overdue flag, confirm transitions (draft→review→approve→publish), measure tab (viewCount + pageViews for post slug), archive (keep DB row, `published=false`+`contentStatus=ARCHIVED` client-only label — no enum change unless migration approved).
- Smallest implementation: where workflow missing, add server utility `transitionContentStatus` reuse.
- DB: none. Report if enum extension needs migration.

**Batch C — Advanced Editor (prioritised)**
- Highest ROI first: autosave localStorage draft recovery, beforeunload unsaved guard, save status + inline error (not alert), preview true render (existing ContentRenderer, mobile/desktop toggle), slug validation (client preview + server unique check, `prisma.post.findUnique where slug` with collision hint), media alt-text gate.
- Defer: version history, full template gallery refresh, internal-link suggester (reported as next).
- DB: none.

**Batch D — Content Quality & SEO (transparent checks)**
- Replace opaque SEO score with checklist sections: completeness (title/excerpt/cover/tags/audience/readingTime), metadata (seoTitle length, metaDescription 120-160, og*), technical (slug pattern, canonical via slug, image alt), links (extract `<a href>` + validate internal vs external), structured data (FAQ schema presence for page, Article for post), readability (existing heuristics shown as guidance not score), editorial (contentStatus review label), search performance (real pageViews/avgDuration/topPages from analytics tables). No “SEO 87/100” guarantee.
- DB: none.

**Batch E — Content Types (8 via reusable schemas)**
- Verify editor fields already cover research/insights/case-study/media/other + study/course (+ finance terms/faqs/landing Page via existing models). Add reusable schema config `lib/content-types.ts` mapping type→required fields, reuse `Block` + SEO panels without forcing common shape.
- DB: none (Page/StudyMaterial/FinanceTerm reuse).

**Batch F — Media & Promotions discoverability**
- Media: search/type filter already exists — add reuse count (`post where blockContent contains media url` or Media↔Post relation count), preview, status (unused vs featured).
- Promotions: surface status (active/scheduled/expired/draft via startsAt/endsAt+active), reuse targets/placements read-out, preview per slot, simple aggregate report from `PromotionEvent` (impressions/clicks per slot last 7/30d). No new engine, no targeting duplication.
- DB: none.

### Verification per batch
After each batch report: files changed, behaviour, DB changes (none expected), tests executed + actual results (existing suite + new targeted), remaining limitations + next batch.

### Non-goals this phase
- Full security-remediation project — preserve existing controls, report blocking issues discovered.
- Stripe re-enable, PowerBI migration, vector search — intentionally deferred and will be reported as out-of-scope if encountered.

## Permission nuance verified during delivery (reported, not weakened)

- `/admin` layout admits STAFF (ADMIN+ANALYST). Most admin data APIs use `STAFF_ROLES`.
- Promotions admin API (`app/api/admin/content/promotions/*`) uses `ADMIN_ROLES` — stricter than the page guard. ANALYST can open `/admin/product-content` but promotion list/save returns 403. This is pre-existing and was **not** loosened in this phase; promotion mutations should stay ADMIN-only unless product explicitly approves ANALYST promotion management. Flagged here so it is not mistaken for a new bug.
- All new endpoints in this branch (`/api/admin/cms/slug-check`, `/api/admin/cms/link-suggestions`, `/api/admin/media/insights`) use `authorizeApi(STAFF_ROLES)` and are read-only.

## Delivery status (this branch)
- Batch A (command centre + grouped nav): implemented.
- Batch B (workflow: status badges, review queue, transitions incl. ARCHIVED, synced published): implemented.
- Batch C editor (autosave/draft recovery, unsaved warning, slug live check, save status, mobile/desktop preview, publish confirmation, link suggestions): implemented; version history intentionally deferred (needs revision table/migration decision).
- Batch D quality/SEO transparent panel: implemented (replaces score; legacy score bars left in older Advanced section for comparison but new panel is authoritative — remove in follow-up if desired).
- Batch E content types: `lib/content-types.ts` + tests + panel wiring: implemented.
- Batch F media/promotions: media insights API + filters; promotion status buckets: implemented (no engine change).

