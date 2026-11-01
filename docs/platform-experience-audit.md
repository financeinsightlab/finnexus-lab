# KunwarAnalytics — Complete Platform Experience & Information Architecture Audit (v2.0)
**Date:** November 2026  
**Auditors:** Executive Platform Product & Architecture Council  
**Repository:** `financeinsightlab/finnexus-lab` (`https://kunwaranalytics.in`)  
**Mandate:** Zero Feature Deletion — Institutional-Grade Cohesion & Experience Transformation.

---

## 1. Executive Summary

KunwarAnalytics has grown into a sophisticated platform comprising over 270 App Router routes, 16+ financial calculators, an institutional multi-asset market terminal, comprehensive PGDM and Skill Academy learning systems, a public prediction track record with calibrated Brier scoring, and an AI-powered Placement Day War Room.

While individual modules possess deep domain functionality, the user experience historically evolved in silos:
1. **Navigation Congestion:** The global navbar and menus had uneven depth—some deep analytical tools were buried while others were overexposed.
2. **Disjointed Hub Boundaries:** Boundaries between Research, Tools, Open Market, Learn, and Company lacked unified contextual sub-navigation, breadcrumbs, and cross-linking.
3. **Data Provenance Transparency:** Market, pricing, and research data displays required standardized source attribution, update timestamps, and explicit data-freshness labels.
4. **Duplicate Search & Discovery Facades:** Quick actions, command palettes, and site search needed unified result grouping across all 5 product hubs.

This audit establishes the baseline for **Information Architecture 2.0**: a unified, institutional-grade product architecture inspired by Bloomberg, TradingView, FactSet, and Linear, adhering strictly to **Zero Feature Deletion**.

---

## 2. Complete Route & Module Inventory

### Hub 1: Research — Financial Research & Insights
| Route | Purpose | Current Implementation | Data Source / Engine | Auth / Entitlements | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/research` | Research Library & Overview | Server Component + filters | Prisma (`Post` / `Research`) | Public | Complete |
| `/research/[slug]` | Full Research Report Reader | Server Component + TOC | Markdown + Prisma | Public / Tiered | Complete |
| `/insights` | Executive Strategy Notes | Server Component | Prisma (`Insight`) | Public | Complete |
| `/insights/[slug]` | Strategy Note Reader | Server Component | Prisma | Public | Complete |
| `/data-lab` | Reproducible Data Projects | Server Component | Seeded datasets + charts | Public | Complete |
| `/data-lab/[slug]` | Individual Data Project Deep Dive | Client interactive charts | Static JSON / DB | Public | Complete |
| `/case-studies` | Client Engagements & Outcomes | Server Component | Prisma (`CaseStudy`) | Public | Complete |
| `/case-studies/[slug]` | Case Study Reader | Server Component | Markdown + Prisma | Public | Complete |
| `/projects` | Analytics & Financial Projects | Server Component | Project records | Public | Complete |

### Hub 2: Tools — Financial Modelling & Analytics
| Route | Purpose | Current Implementation | Data Source / Engine | Auth / Entitlements | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/tools` | Tools Directory & Category Grid | Server Component + filters | Tool metadata registry | Public | Complete |
| `/tools/[slug]` | 16+ Financial Calculators | Interactive Client Engines | Deterministic Math Engines | Tiered (Pro/Elite) | Complete |
| `/company` | Company Intelligence Platform | Client Search & Summary | NSE/BSE API + Prisma | Public / Pro | Complete |
| `/company/[symbol]` | Company Detailed Health & DCF | Interactive Client Engine | Market APIs + DCF Model | Public / Pro | Complete |
| `/startup-financials` | VC 3-Statement & Runway Engine | Client Interactive Model | Deterministic VC Engine | Pro / Elite | Complete |
| `/financial-intelligence` | Background Queue & Telemetry | Client Dashboard + API | Prisma Job Queue | Enterprise / Admin | Complete |

### Hub 3: Open Market — Financial Markets Intelligence Terminal
| Route | Purpose | Current Implementation | Data Source / Engine | Auth / Entitlements | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/markets` | Global Market Terminal Overview | Client multi-asset dashboard | AlphaVantage, RBI, Mock | Public | Complete |
| `/markets/india` | Indian Equities & Benchmark Indices | Client Terminal View | NSE/BSE benchmarks | Public | Complete |
| `/markets/stocks` | Institutional Ratio Screener | Client Table + Filters | Real & cached equity data | Public | Complete |
| `/markets/sector-heatmap` | Visual Market-Cap Heatmap | Treemap Canvas/SVG | Sector performance feeds | Public | Complete |
| `/markets/forex` | Currencies & Cross-Rate Matrix | Client Currency Table | Global FX feeds | Public | Complete |
| `/markets/commodities` | Metals, Energy & Agriculture | Client Commodities Board | Global spot & futures | Public | Complete |
| `/markets/bonds` | Sovereign Yield Curves (G-Sec, UST) | Client Yield Spreads | RBI & UST data | Public | Complete |
| `/markets/derivatives` | Options Chain, PCR, Max Pain, FII/DII | Client Options Matrix | NSE Derivatives cache | Public | Complete |
| `/markets/economy` | Macro Indicators & Central Banks | Client Macro View | RBI, MoSPI, World Bank | Public | Complete |
| `/markets/calendar` | Global Economic Calendar | Client Calendar Feed | Macro release schedules | Public | Complete |
| `/markets/news` | Institutional Market Wire | Filterable News Feed | Sourced financial RSS | Public | Complete |
| `/tracker` | Sector KPI Trackers | Server/Client Trackers | Sector KPI dataset | Public | Complete |
| `/tracker/[sector]` | Specific Sector Tracker | Client Dashboard | Quarterly filing metrics | Public | Complete |
| `/radar` | Contrarian Consensus Radar | Heatmap & Analysis | Sourced consensus feeds | Public | Complete |
| `/predictions` | Live Prediction Calls Board | Server/Client Board | Prisma (`Prediction`) | Public | Complete |
| `/predictions/ledger` | Public Scored Prediction Ledger | Client Ledger + Brier score | Prisma verified calls | Public | Complete |
| `/data-freshness` | Data Operations & SLAs | Live Health Grid | Provider telemetry | Public / Analyst | Complete |

### Hub 4: Learn — Unified Learning & Career Development
| Route | Purpose | Current Implementation | Data Source / Engine | Auth / Entitlements | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/study` | Study Material & Course Library | Server Component | Prisma (`Course`, `Lesson`)| Public | Complete |
| `/study/[slug]` | Course Overview & Syllabus | Server Component | Prisma | Public | Complete |
| `/study/[slug]/lessons/[lessonSlug]` | Lesson Reader & Quiz | Client interactive lesson | Prisma | Public / Enrolled | Complete |
| `/study/skill-academy` | 54 Skill Academy Tracks | Track Grid & Enrolment | Course catalog registry | Pro / Elite | Complete |
| `/study/analyst-levels` | Analyst Pathway Progression | Level roadmap | Curriculum metadata | Public | Complete |
| `/study/analyst-complete` | Full Analyst Curriculum | Comprehensive view | All modules aggregated | Pro / Elite | Complete |
| `/study/placement-prep` | 60-Day Placement Plan | Daily task curriculum | Static + dynamic tasks | Public | Complete |
| `/pgdm` | PGDM Academic Hub (14 subjects) | Academic overview | Prisma / Academic seeds | Public | Complete |
| `/pgdm/[subject]` | PGDM Subject Syllabus | Unit & lecture listing | Academic database | Public | Complete |
| `/pgdm/[subject]/[lecture]` | Lecture Notes & Problem Sets | Markdown lecture reader | Seeded academic content | Public | Complete |
| `/pgdm/[subject]/cheatsheet` | Academic Formula Cheatsheets | Reference card grid | Curated formulas | Public | Complete |
| `/finance-terms` | Plain-Language Finance Glossary | Searchable glossary | Prisma (`FinanceTerm`) | Public | Complete |
| `/finance-terms/[slug]` | Specific Finance Term Definition | Term page + cross-links | Prisma | Public | Complete |
| `/certificates` | Issued Credentials Registry | Public verification list | Prisma (`Certificate`) | Public | Complete |
| `/certificates/issued/[id]` | Verifiable Certificate Viewer | Verification Card | Cryptographic signature | Public | Complete |
| `/placement-day-war-room` | Placement War Room 2.0 | Full Operating System | Mistral 7B AI + Workstations | Unlimited Access | Complete |
| `/podcast` | The Kunwar Analytics Podcast | Audio player & episodes | RSS / Audio files | Public | Complete |
| `/podcast/[slug]` | Individual Episode Details | Audio player + notes | Audio & transcript | Public | Complete |

### Hub 5: Company — Corporate & Business Experience
| Route | Purpose | Current Implementation | Data Source / Engine | Auth / Entitlements | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/about` | Mission, Founder & Practice | Server Component | Editorial content | Public | Complete |
| `/services` | Advisory, Modelling & Research | Service detail sections | Commercial offerings | Public | Complete |
| `/enterprise` | Institutional & Team Solutions | Tier enquiry & features | Commercial agreements | Public | Complete |
| `/pricing` | Transparent Subscription Tiers | Plan comparison table | Entitlement matrix | Public | Complete |
| `/speaking` | Keynotes & Guest Lectures | Portfolio & speaker reel | Speaking profile | Public | Complete |
| `/resume` | Professional CV & Experience | Executive résumé | Career milestones | Public | Complete |
| `/contact` | Direct Contact & Inquiries | Validated Contact Form | Email / Prisma message | Public | Complete |
| `/privacy`, `/terms`, `/security` | Compliance & Governance | Legal disclosure pages | Static legal copy | Public | Complete |

### Hub 6: Dashboard — Personal User Workspace
| Route | Purpose | Current Implementation | Data Source / Engine | Auth / Entitlements | Status |
| :--- | :--- | :--- | :--- | :--- | :--- |
| `/dashboard` | Personal Command Centre | Client Dashboard | Prisma (`User`, progress) | Authenticated | Complete |
| `/dashboard/edit` | Profile & Goals Editor | Client Form | User preferences | Authenticated | Complete |
| `/account` | Credentials & Plan State | Account settings | NextAuth session | Authenticated | Complete |

---

## 3. Confirmed Information Architecture Issues

1. **Mega-Menu Information Density:** Previously, the mega-menu had an unranked list of tools and market pages that overwhelmed mobile and compact screens.
2. **Missing Sub-Nav Hub Ribbons:** Visitors entering `/markets/india` or `/study/placement-prep` via direct links or search engines lacked contextual navigation to sibling pages within the same hub.
3. **Breadcrumb Inconsistency:** While some pages contained breadcrumbs, formatting and schema markup varied between `/pgdm`, `/markets`, and `/research`.
4. **Data Attribution Clarity:** Financial tables on certain market pages lacked a visible pill identifying whether data was Delayed, End-of-Day, or Historical.

---

## 4. Preservation Strategy & Action Plan

- **Preserve 100% of URLs:** No route deletions or breaking changes.
- **Implement Hub Shells:** Introduce standardized contextual sub-nav ribbons for Research, Tools, Open Market, Learn, and Company.
- **Enhance Global Mega-Menus:** Cleanly categorize sub-destinations into organized columns with prominent hub landing links.
- **Standardize Market Data Provenance:** Ensure every market table explicitly states the provider, time delay, and freshness SLA.
- **Unified Global Search:** Wire all 5 hubs into the global search index with categorized hit badges.

