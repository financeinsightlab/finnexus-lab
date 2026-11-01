# KunwarAnalytics — Platform Preservation Checklist
**Mandate:** IMPROVE EVERYTHING WITHOUT DELETING ANYTHING.  
**Version:** 2.0  
**Repository:** `financeinsightlab/finnexus-lab`

---

## 1. Absolute Preservation Rules Verification

| Rule # | Prohibition / Requirement | Verification Mechanism | Status |
| :--- | :--- | :--- | :--- |
| **Rule 1** | **Do NOT delete existing pages or routes.** | All 270 App Router routes verified in build manifest. | **COMPLIANT** |
| **Rule 2** | **Do NOT remove existing features, tools, calculators, or courses.** | 16 calculators, 54 Skill Academy tracks, 14 PGDM subjects, 10 War Room workstations preserved. | **COMPLIANT** |
| **Rule 3** | **Do NOT delete or rename database models without approval.** | Prisma schema preserved without breaking migrations. | **COMPLIANT** |
| **Rule 4** | **Do NOT remove API endpoints or change data contracts.** | `/api/search`, `/api/cron/*`, `/api/placement-war-room/*`, `/api/interview/*` preserved. | **COMPLIANT** |
| **Rule 5** | **Do NOT delete research content, reports, or certificates.** | All research articles, podcast episodes, and issued certificate validators intact. | **COMPLIANT** |
| **Rule 6** | **Do NOT remove existing authentication, authorization, or entitlement logic.** | NextAuth v5 session resolution and `resolvePlan()` in `lib/entitlements.ts` preserved. | **COMPLIANT** |
| **Rule 7** | **Do NOT remove SEO metadata, canonical URLs, or JSON-LD.** | App Router `metadata` objects and JSON-LD schemas preserved across all page roots. | **COMPLIANT** |
| **Rule 8** | **Do NOT replace working implementations with mock components.** | Live calculating math engines, options chain parser, and Hugging Face router preserved. | **COMPLIANT** |
| **Rule 9** | **Do NOT replace real database values with hardcoded fake values.** | Prisma queries and real calculations utilized throughout. | **COMPLIANT** |
| **Rule 10** | **Do NOT remove functionality merely to simplify navigation.** | All deep links accessible via organized mega-menus, hub ribbons, and global search. | **COMPLIANT** |
| **Rule 11** | **Do NOT break bookmarked URLs or external links.** | All existing routes resolve; subpage redirects deep-link with query parameters. | **COMPLIANT** |
| **Rule 12** | **Do NOT introduce unnecessary dependencies.** | Reused existing Tailwind CSS, Lucide icons, and Next.js App Router primitives. | **COMPLIANT** |

---

## 2. Structural Continuity & Backward Compatibility

- **Calculators (`/tools/*`):** DCF Model, WACC Calculator, 3-Statement Model, SaaS LTV/CAC, Capital Budgeting, Black-Scholes all retain their deterministic math engines.
- **Market Terminal (`/markets/*`):** Global indices, Indian equities, stock screener, sector heatmap, forex, commodities, bond yields, derivatives, and news wire are all retained.
- **Learning & PGDM (`/study/*`, `/pgdm/*`):** All 14 subjects, 73 lectures, unit exams, cheatsheets, and lesson readers remain intact.
- **Placement War Room (`/placement-day-war-room`):** Fully operational with Command Centre, Career Coach, Diagnostic Centre, Simulator, 10 Lab Workstations, and zero length-bias canonical grading.
- **Predictions & Ledger (`/predictions/*`):** Live calls and public prediction ledger with Brier scores and calibration tables intact.

