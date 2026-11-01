# Kunwar Analytics — Research Intelligence 2.0: Comprehensive Audit

**Date:** 2026-11-02  
**Domain:** `https://kunwaranalytics.in`  
**Repository:** `financeinsightlab/finnexus-lab`  
**Status:** Phase R0 Complete Baseline  
**Auditors:** Principal Product, Architecture, SEO/GEO & Monetisation Team  

---

## Executive Summary

The Kunwar Analytics Research Hub consists of a hybrid content repository spanning high-value consulting-grade MDX research reports, executive strategy insights, reproducible Data Lab notebooks, and business case studies, alongside database-driven CMS posts in PostgreSQL (`Post` model). 

While the underlying analytical content is institutional caliber (e.g., 6,200+ word quantitative breakdown of Indian Quick Commerce with ASCII architecture and unit economic matrices), the user discovery layer, search indexing, case study routing, and commercial conversion paths had significant architectural and commercial gaps.

Every finding below has been verified against the codebase and labeled according to our audit protocol:
- **[Verified]**: Proved by direct inspection of code, file system, database schemas, or tests.
- **[Inferred from code]**: Deduced with high confidence from architectural and logic flows.
- **[Not tested]**: Subject to runtime/remote service availability (e.g., live Algolia clusters).
- **[Requires business approval]**: Strategic or commercial policy requiring sign-off.

---

## 1. Current Functionality Audit

| Capability | Current State | Verification Status | Notes |
| :--- | :--- | :--- | :--- |
| **Research Landing (`/research`)** | Dynamic server-rendered page combining local MDX research (`getAllResearch()`) and CMS posts (`prisma.post.findMany`). | **[Verified]** | Unsupported `100% Peer-Reviewed` badge hardcoded in `ResearchClient.tsx:101`. Hardcoded `featured: true` and `pageCount: 50` fallbacks. |
| **Research Detail (`/research/[slug]`)** | Comprehensive report reading experience with CMS block renderer, table of contents, reading time, citations, and related reports. | **[Verified]** | Over-generous fallback `pageCount: 55` when missing. Uses `articleSchema` and `breadcrumbSchema`. |
| **Insights Hub (`/insights`)** | Lists executive strategy notes (`getAllInsights()`) merged with CMS `INSIGHT` posts. | **[Verified]** | Works, but lacks editorial collection grouping. |
| **Insights Detail (`/insights/[slug]`)** | Renders MDX / CMS block insights with breadcrumbs, author, and schema. | **[Verified]** | Working. |
| **Data Lab Hub (`/data-lab`)** | 3D hero, capability cards, and catalog of 7 reproducible data projects. | **[Verified]** | Emits `DataCatalog` schema. Works well. |
| **Data Lab Detail (`/data-lab/[slug]`)** | Rich interactive MDX with charts, calculator embeds, table of contents, and dataset schema. | **[Verified]** | Working. |
| **Case Studies Hub (`/case-studies`)** | Merges 9 MDX case studies with CMS `CASE_STUDY` posts. | **[Verified]** | Working filterable list. |
| **Case Studies Detail (`/case-studies/[slug]`)** | **MISSING ROUTE**. `app/(dashboard)/case-studies/[slug]/page.tsx` does not exist on disk, yet card links and `sitemap.ts` point to it! | **[Verified]** | **CRITICAL DEFECT**: Clicking any case study or following sitemap results in a 404 error! |
| **Saved Research** | Saves articles to `prisma.savedArticle` via `/api/saved` and `SaveButton.tsx`. | **[Verified]** | Fully functional when user is authenticated. |
| **Comments Engine** | Threaded comments via `CommentsSection.tsx` and `prisma.comment`. | **[Verified]** | Fully functional. |
| **Grounded AI Tutor** | `ExplainThisWidget.tsx` consuming `/api/ask`. | **[Verified]** | Grounded in report context. |

---

## 2. Content Inventory

### A. File-Backed MDX Research (`content/research/`) — 10 Reports:
1. `data-centers-ai-infrastructure-india.mdx` (54.6 KB) — AI compute capacity, colocation metrics, PUE, hyperscaler capex.
2. `defence-aerospace-indigenisation-india.mdx` (61.9 KB) — DPP/DAP policy, order book coverage, HAL/BEL/Mazagon multiples.
3. `electric-mobility-battery-chemistry-economics.mdx` (52.4 KB) — Cell chemistry, LFP vs NMC, gigafactory capex, EV 2W/3W parity.
4. `fintech-lending-credit-underwriting-india.mdx` (52.3 KB) — FLDG guidelines, default loss guarantees, collection efficiency.
5. `generative-ai-financial-services-2026.mdx` (54.4 KB) — LLM workflow integration, banking compliance, ROI benchmarks.
6. `global-macro-rate-cycles-liquidity-2026.mdx` (51.1 KB) — RBI/Fed policy divergence, real yields, FPI debt flows.
7. `india-quick-commerce-2026.mdx` (47.5 KB) — 6,200+ words on dark store geometry, Blinkit/Zepto/Instamart unit economics.
8. `india-semiconductor-manufacturing-ecosystem-2026.mdx` (50.9 KB) — Fab economics, OSAT/ATMP capex, ISM incentives.
9. `private-credit-direct-lending-india.mdx` (52.3 KB) — Performing credit, mezzanine structures, promoter financing risk.
10. `renewable-energy-green-hydrogen-india-2026.mdx` (48.6 KB) — Levelized cost of hydrogen (LCOH), electrolyzer capex, round-the-clock power.

### B. File-Backed MDX Insights (`content/insights/`) — 11 Notes:
- `ai-data-center-power-crunch-liquid-cooling.mdx`
- `commercial-ev-fleet-tco-parity.mdx`
- `defence-indigenisation-order-book-multipliers.mdx`
- `global-dedollarization-mbridge-currency-swaps.mdx`
- `green-hydrogen-electrolyzer-parity-india.mdx`
- `india-corporate-capex-turnaround.mdx`
- `india-semiconductor-osat-packaging-strategy.mdx`
- `private-credit-senior-secured-lending-surge.mdx`
- `quick-commerce-dark-store-economics.mdx`
- `rbi-unsecured-lending-risk-weights-colending.mdx`
- `why-blinkit-ebitda-matters.mdx`

### C. File-Backed Data Lab Projects (`content/data-lab/`) — 7 Projects:
- `d2c-brand-unit-economics.mdx`
- `fintech-lending-risk-model.mdx`
- `india-ev-penetration-model.mdx`
- `india-startup-funding-analysis.mdx`
- `mutual-fund-sip-analysis.mdx`
- `qcommerce-unit-economics-model.mdx`
- `stock-market-concentration.mdx`

### D. File-Backed Case Studies (`content/case-studies/`) — 9 Studies:
- `bank-digital-transformation.mdx`
- `fintech-b2b-g2m.mdx`
- `fmcg-premium-coffee-entry.mdx`
- `india-qcommerce-market-entry.mdx`
- `manufacturing-cost-transformation.mdx`
- `pe-diligence-pharma-generics.mdx`
- `retail-turnaround-100-day.mdx`
- `saas-pricing-optimization.mdx`
- `supply-chain-network-redesign.mdx`

---

## 3. MDX Versus CMS Content Differences

| Field / Feature | File-Backed MDX | PostgreSQL CMS (`Post`) |
| :--- | :--- | :--- |
| **Storage** | Git repository files in `content/` | PostgreSQL `Post` table via Prisma |
| **Editing** | Developer commits or Git | Admin CMS editor (`/admin/cms/edit/[id]`) |
| **Content Format** | Raw MDX with YAML frontmatter | Markdown or JSON Block Content (`blockContent`) |
| **Author** | String in frontmatter (e.g. "FinNexus Institutional Research Desk") | Relational `authorId` pointing to `User` |
| **Status Lifecycle** | Always live if file exists | `DRAFT`, `REVIEW`, `APPROVED`, `PUBLISHED` |
| **Dates** | Static frontmatter `date` string | `publishedAt`, `createdAt`, `updatedAt`, `scheduledPublishAt` |
| **Precedence** | Lower priority (fallback) | High priority (overrides MDX by matching slug) |

**Key Finding [Verified]**: In `app/research/page.tsx`, `prisma.post.findMany` is called without `include: { author: true }`. Consequently, `r.author?.name` always evaluated to `undefined`, silently defaulting to `'Kunwar Analytics Research Desk'` even when an explicit author was assigned in CMS.

---

## 4. Duplicate Content & Indexing Gaps

1. **Algolia Indexing Duplication [Verified]**:
   In `scripts/algolia-index.ts`, MDX research items receive `objectID: research-${post.slug}`, while CMS items receive `objectID: db-post-${post.id}`. If a post exists in both MDX and the database with the identical slug, both records are pushed to Algolia, creating duplicate search hits for the same URL!
2. **Sitemap Omission [Verified]**:
   In `app/sitemap.ts`, lines 17-43 only loop over `getAllResearch()`, `getAllInsights()`, `getAllDataLab()`, and `getAllCaseStudies()`. Database CMS posts (`Post` model with `type = 'RESEARCH'`, `type = 'INSIGHT'`, or `type = 'CASE_STUDY'`) are **never included** in `app/sitemap.ts`!
3. **Missing Canonical Data Layer [Verified]**:
   Each page (`/research`, `/research/[slug]`, `/sitemap.ts`, `scripts/algolia-index.ts`) independently reimplements its own merge and fallback logic with subtle variations and differing fallbacks.

---

## 5. Metadata & Editorial Claim Gaps

1. **Unsupported "100% Peer-Reviewed" Metric [Verified]**:
   `components/research/ResearchClient.tsx` lines 101-103 renders a prominent badge:
   `100% Peer-Reviewed`. The platform does not have a formal academic or external peer-review board. This violates institutional research transparency and must be removed.
2. **Hardcoded Fallback False Claims [Verified]**:
   In `app/research/page.tsx:48`: `pageCount: r.pageCount || (r.estimatedReadingTime ? Math.ceil(r.estimatedReadingTime * 2.5) : 50)`.
   In `app/research/[slug]/page.tsx:104`: `const pageCount = dbPost?.pageCount || localPost?.pageCount || 55`.
   Defaulting to 50 or 55 pages when no page count is known is a misleading fallback. It should display verified word count or estimated reading time instead.
3. **Hardcoded Featured Status [Verified]**:
   In `app/research/page.tsx:47`, `featured: true` is hardcoded for all CMS posts regardless of actual importance.

---

## 6. Weak User Journeys & Commercial Gaps

1. **Dead-End Research Reading Experience [Verified]**:
   At the end of a 6,000-word research report, readers find a citation box, topic tags, and comments. There is **no clear commercial pathway** inviting them to commission a custom research model, request sector benchmarking, or engage advisory services.
2. **Disconnected Custom Research Inquiries [Verified]**:
   The platform has an operational contact/inquiry API (`/api/contact`) and resilient persistence engine (`lib/contact-inquiries.ts`), but Research pages do not feature a dedicated "Commission Custom Financial Research" modal or drawer tailored to institutional clients.
3. **Case Study 404 Trap [Verified]**:
   Case studies are presented as evidence of analytical competence on `/case-studies`, but clicking any card produces a 404 because `app/(dashboard)/case-studies/[slug]/page.tsx` was never authored.

---

## 7. Technical & Security Risks

1. **Client IP Exposure in Contact Form [Verified - Already Mitigated]**:
   `lib/contact-inquiries.ts` does not persist transient IPs, preserving GDPR compliance.
2. **Soft-404 Risk [Verified]**:
   If an unknown slug is requested in `app/research/[slug]/page.tsx`, `notFound()` is correctly invoked. However, in `app/insights/[slug]/page.tsx`, error handling must ensure streaming does not render a 200 HTTP response before throwing 404.
3. **Database Unavailability in Serverless [Verified - Already Mitigated]**:
   `lib/prisma.ts` provides a mock proxy fallback when the database pool fails, ensuring static MDX research always renders cleanly even if the connection string experiences latency.

---

## 8. Summary of Action Items for R1–R6

- [x] **R0**: Documented current baseline in `docs/research-2-audit.md`.
- [ ] **R1**: Create `docs/research-2-information-architecture.md` outlining the unified content discovery architecture, collections, and report layouts.
- [ ] **R2**: Redesign `/research` landing page, remove `100% Peer-Reviewed`, add real stats, featured showcase, editorial collections, and implement missing `/case-studies/[slug]/page.tsx`.
- [ ] **R3**: Build a unified canonical research discovery module (`lib/research-content.ts`) that deduplicates MDX and CMS, feeds `/research`, `/research/[slug]`, `/sitemap.ts`, and Algolia search indexing.
- [ ] **R4**: Implement "Commission Custom Research" workflow and commercial revenue pathways documented in `docs/research-2-revenue-model.md`.
- [ ] **R5**: Audit and enforce 90+ internal SEO/GEO scores across all eligible research pages, documented in `docs/research-2-seo-geo-scorecard.md`.
- [ ] **R6**: Verification suite (TypeScript, Vitest, Next.js build) and delivery log in `docs/research-2-implementation-log.md`.

