# KunwarAnalytics — Platform Information Architecture 2.0
**Version:** 2.0  
**Effective Date:** November 2026  
**Architecture Principle:** Cohesive Institutional Ecosystem | Zero Feature Deletion | High Information Density with Clean Hierarchy.

---

## 1. Architectural Philosophy

KunwarAnalytics operates as an integrated financial intelligence platform serving three primary user personas:
1. **Institutional Analysts & Quants:** Seeking verified market data, sector trackers, calibrated predictions, and financial modeling tools.
2. **Postgraduate & Finance Students (PGDM/MBA):** Preparing for elite campus placement days, studying core valuation/accounting syllabi, and pursuing certifications.
3. **Enterprise & Corporate Clients:** Looking for customized research, bespoke financial modeling, executive training, and strategic advisory.

To eliminate confusion between disparate pages, the platform organizes all capabilities into **5 Core Product Hubs** plus a unified **User Dashboard** and an **Admin Command Centre**.

```
                           ┌──────────────────────────────┐
                           │   KUNWAR ANALYTICS GLOBAL    │
                           │     NAVIGATION SYSTEM        │
                           └──────────────┬───────────────┘
                                          │
    ┌──────────────┬──────────────┬───────┴──────┬──────────────┬──────────────┐
    ▼              ▼              ▼              ▼              ▼              ▼
┌────────┐    ┌────────┐    ┌──────────┐    ┌────────┐    ┌─────────┐    ┌───────────┐
│RESEARCH│    │ TOOLS  │    │  MARKET  │    │ LEARN  │    │ COMPANY │    │ DASHBOARD │
│  HUB   │    │  HUB   │    │ TERMINAL │    │  HUB   │    │   HUB   │    │ (USER WS) │
└────────┘    └────────┘    └──────────┘    └────────┘    └─────────┘    └───────────┘
```

---

## 2. Hub-by-Hub Architecture Specification

### Hub 1: Research — Financial Research & Insights
- **Canonical Landing Route:** `/research`
- **Internal Sub-Navigation:**
  - `Overview`: `/research` (Featured reports, latest publications, sector distribution)
  - `Insights`: `/insights` (Short strategy notes & macro perspectives)
  - `Data Lab`: `/data-lab` (Reproducible empirical projects & datasets)
  - `Case Studies`: `/case-studies` (Deep-dive corporate & transactional analyses)
  - `Projects`: `/projects` (Portfolio of quantitative & financial engineering work)
- **Design Experience:** Editorial authority, typography tuned for readability, collapsible table of contents, citations, and structured metadata.

### Hub 2: Tools — Financial Modelling & Analytics
- **Canonical Landing Route:** `/tools`
- **Internal Sub-Navigation:**
  - `Overview`: `/tools` (16+ calculators categorized by domain)
  - `Company Intelligence`: `/company` (NSE/BSE financial health & DCF metrics)
  - `Startup Financials`: `/startup-financials` (3-statement VC runway engine)
  - `Valuation Models`: DCF Model, WACC Calculator, CCA Multiples
  - `Corporate Finance`: NPV/IRR, Capital Budgeting, Financial Ratios
  - `SaaS & Analytics`: SaaS LTV/CAC, Q-Commerce Economics, AI ROI
  - `Portfolio Risk`: Risk Lab, Black-Scholes Option Pricing
- **Design Experience:** Modelling workspace, deterministic financial calculations, parameter sensitivities, validation warnings, and export capabilities.

### Hub 3: Open Market — Financial Markets Intelligence Terminal
- **Canonical Landing Route:** `/markets`
- **Internal Sub-Navigation:**
  - `Overview`: `/markets` (Multi-asset global overview, market breadth, top gainers/losers)
  - `Indian Equities`: `/markets/india` (Nifty 50, Sensex, Sectoral benchmarks)
  - `Stock Screener`: `/markets/stocks` (Ratio & fundamental screener)
  - `Sector Heatmap`: `/markets/sector-heatmap` (Market-cap visual treemap)
  - `Forex & Currencies`: `/markets/forex` (Global FX cross-rates & USD/INR)
  - `Commodities`: `/markets/commodities` (Gold, Silver, Crude Oil, Natural Gas)
  - `Bonds & Yields`: `/markets/bonds` (10Y G-Sec, US Treasuries, spread curves)
  - `Derivatives (F&O)`: `/markets/derivatives` (Options Chain, PCR, Max Pain, FII/DII)
  - `Macro Economy`: `/markets/economy` (GDP, CPI, Policy Repo Rates)
  - `Economic Calendar`: `/markets/calendar` (RBI, Fed, macro announcements)
  - `News Wire`: `/markets/news` (Institutional financial wire)
  - `Intelligence`: `/tracker` (Sector Trackers), `/radar` (Contrarian Radar)
  - `Prediction Ledger`: `/predictions` & `/predictions/ledger` (Calibrated calls & Brier score)
  - `Data Freshness`: `/data-freshness` (Provider update SLAs & operations)
- **Design Experience:** Bloomberg/TradingView-grade dark terminal, high information density, numerical tabular clarity, live ticker ribbon, and unambiguous data source attribution.

### Hub 4: Learn — Unified Learning & Career Development
- **Canonical Landing Route:** `/study`
- **Internal Sub-Navigation:**
  - `Study Material`: `/study` (Course library, formula sheets, notes)
  - `Skill Academy`: `/study/skill-academy` (54 modular finance tracks)
  - `PGDM Curriculum`: `/pgdm` (14 academic subjects, 73 lectures, unit exams, cheatsheets)
  - `Placement War Room 2.0`: `/placement-day-war-room` (AI Career Coach, 6-Round Simulator, 10 Lab Workstations)
  - `Placement Roadmap`: `/study/placement-prep` (60-day placement curriculum)
  - `Finance Terms Glossary`: `/finance-terms` (Plain-language definitions)
  - `Certificates`: `/certificates` (Verifiable completion credentials)
  - `Podcast`: `/podcast` (Audio episodes & transcripts)
- **Design Experience:** Structured academic curriculum, progress tracking, interactive quizzes, step-by-step mathematical derivations, and multi-dimensional interview assessment.

### Hub 5: Company — Corporate & Business Experience
- **Canonical Landing Route:** `/about`
- **Internal Sub-Navigation:**
  - `About`: `/about` (Mission, methodology, founder background)
  - `Services`: `/services` (Advisory, modelling, bespoke research)
  - `Enterprise`: `/enterprise` (Institutional team engagements)
  - `Pricing`: `/pricing` (Transparent plan comparison & entitlement matrix)
  - `Speaking`: `/speaking` (Keynotes, lectures, workshops)
  - `Résumé`: `/resume` (Executive career background)
  - `Contact`: `/contact` (Direct communication & project onboarding)
- **Design Experience:** Institutional trust signals, clear commercial offerings, and transparent access terms.

---

## 3. Global Navigation Mega-Menu Specification

The Desktop Navbar mega-menu is organized into logical columns rather than flat unranked lists:

```
[RESEARCH MEGA-MENU]
Col 1: Publications (Research Reports, Short Insights, Editorial Notes)
Col 2: Practical Analysis (Data Lab Projects, Corporate Case Studies, Portfolio Projects)
Col 3: Featured (Flagship Banking Report, Macro Economic Outlook)

[TOOLS MEGA-MENU]
Col 1: Core Valuation (DCF Model, WACC Calculator, Multiples Screener)
Col 2: Institutional Platforms (Company Intelligence, Startup Financials, 3-Statement Model)
Col 3: Corporate & Analytics (NPV/IRR, SaaS LTV/CAC, Portfolio Risk Lab)

[MARKET TERMINAL MEGA-MENU]
Col 1: Equities & Screener (Indian Equities, Global Indices, Stock Screener, Sector Heatmap)
Col 2: Macro & Multi-Asset (Forex Rates, Commodities, Bonds & Yields, Economic Calendar)
Col 3: Intelligence & Derivatives (Options Chain, Sector Trackers, Prediction Ledger, Data Freshness)

[LEARN MEGA-MENU]
Col 1: Academic & Courses (Study Material, 54 Skill Academy Tracks, PGDM 14-Subject Syllabus)
Col 2: Career & Placement (Placement Day War Room 2.0, 60-Day Prep Plan, Finance Technical Lab)
Col 3: Credentials & Media (Certificates Registry, Financial Terms Glossary, Podcast)

[COMPANY MEGA-MENU]
Col 1: About & Practice (Practice Overview, Mission & Founder, Executive Résumé)
Col 2: Commercial Services (Advisory & Modelling, Enterprise Solutions, Pricing Plans)
Col 3: Engagement (Speaking & Workshops, Contact & Support)
```

---

## 4. Contextual Breadcrumb Standard

All nested pages must display hierarchical breadcrumbs with JSON-LD `BreadcrumbList` schema:

- **Research:** `Home > Research > [Report Title]`
- **Tools:** `Home > Tools > [Calculator / Model Name]`
- **Markets:** `Home > Markets > [Sub-Market or Instrument]`
- **Learn:** `Home > Learn > [Course / PGDM Subject] > [Lesson / Lecture]`
- **Company:** `Home > Company > [Service / Topic]`

