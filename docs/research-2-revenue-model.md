# Kunwar Analytics — Research Intelligence 2.0: Commercialisation & Revenue Architecture

**Document Version:** 2.0  
**Status:** Approved Revenue Model  
**Target Domain:** `https://kunwaranalytics.in/research`  
**Primary Goal:** Transform Research from a purely free reading room into an active commercial pipeline and qualified customer acquisition engine.

---

## 1. Commercial Strategy & Philosophy

Institutional research requires substantial analytical labor, access to capital market datasets, and domain expertise. While keeping core public research accessible for organic search discovery, brand equity, and GEO citation readiness, Kunwar Analytics activates a four-stream revenue model:

```
                          [Research Intelligence Traffic]
                                        │
           ┌────────────────────────────┼────────────────────────────┐
           ▼                            ▼                            ▼
[Stream A: Custom Advisory]   [Stream B: Paid Products]   [Stream C: Membership]
 Commission Bespoke Modeling,   Downloadable Excel Models,  Analyst Pro & Elite Plans
 Competitor Benchmarks & DD     Dataset Packs & Licenses    (Gated Features & Tools)
           │                            │                            │
           └────────────────────────────┼────────────────────────────┘
                                        ▼
                   [Stream D: Contextual Commercial Leads]
              Cross-Sells to Startup Financials, Placement War Room,
                        and Valuation Advisory Services
```

---

## 2. Revenue Stream A: Custom Research Engagements (Immediate Cash-Flow Priority)

### Target Audience
- Venture Capital & Private Equity associates requiring independent market-sizing and due diligence.
- Early-stage and Growth Founders preparing Series A/B financial memos and unit-economics teardowns.
- Corporate Strategy & Business Development leaders evaluating market entry in India.
- Investment banks and M&A boutiques seeking sector deep-dives.

### Standardized Deliverable Catalog

| Deliverable Code | Engagement Scope | Indicative Scope & Timeline | Starting Retainer / Fee |
| :--- | :--- | :--- | :--- |
| **CR-01: Sector Deep-Dive** | Comprehensive 40+ page sector study covering supply chain architecture, regulatory risks, and market-size forecasts. | 2–3 weeks | Bespoke Quotation |
| **CR-02: Unit Economics & DCF Model** | Unlocked Excel dynamic financial model with 3-statement integration, WACC calculation, and sensitivity tables. | 7–10 business days | Bespoke Quotation |
| **CR-03: Competitor Benchmarking** | Side-by-side KPI matrix comparing revenue, margins, customer acquisition costs, and churn across key players. | 5–7 business days | Bespoke Quotation |
| **CR-04: Market Entry Assessment** | India-specific commercial feasibility study, foreign investment limits, regulatory compliance, and partner evaluation. | 3–4 weeks | Bespoke Quotation |
| **CR-05: Investor Pitch & Memo Pack** | Board-ready institutional investment memorandum and deck with audited historicals and five-year projections. | 2 weeks | Bespoke Quotation |

### Inquiry & Lead Capture Pipeline
1. **Frontend Surface:** A prominent "Commission Custom Financial Research" section is integrated on `/research`, with contextual advisory banners embedded inside every report on `/research/[slug]`.
2. **Submission Engine:** Submissions pass through the rate-limited, honeypot-protected `/api/contact` endpoint.
3. **Storage & Fallback:** Handled by `lib/contact-inquiries.ts`, inserting directly into PostgreSQL (`contact_inquiries` table) with an atomic local JSON backup in `data/contact-inquiries.json`.
4. **Honest Fulfillment SLA:** Immediate client-facing confirmation stating that the Research Desk evaluates requests and returns a written scoping proposal within 24 business hours. No fake automated emails are simulated.

---

## 3. Revenue Stream B: Institutional Research Products (Productised Knowledge)

### Product Architecture
1. **Unlocked Financial Models:** Fully unlocked `.xlsx` / `.xlsm` workbook files accompanying published reports (e.g., Quick Commerce Dark Store Unit Economics Workbook, India Semiconductor Fab Capex Model).
2. **Specialized Sector Packs:** Curated bundles comprising research PDF, raw CSV data tables, and presentation slide decks.
3. **Data Licensing:** Rights for enterprise clients and advisory firms to cite, republish, and integrate Kunwar Analytics datasets in internal investment committee materials.

### Fulfillment Gatekeeping
- Checkout buttons are only rendered when server-verified payment gateways (Stripe, Razorpay, or Manual UPI) and automated file delivery pipelines are active.
- Until self-serve fulfillment is automated, products are offered via verified quotation requests to prevent broken transaction flows.

---

## 4. Revenue Stream C: Research Membership & Entitlements

### Integration with Existing Subscription Plans
The existing platform entitlement system (`lib/entitlements.ts`) defines:
- **FREE:** Full access to public research, insights, and community commentary.
- **ANALYST PRO (₹999/mo):** Unlocks Company Intelligence Hub, Bull/Bear Investment Thesis, Interactive DCF Studio, and Pro-gated Sector Trackers.
- **ELITE INSTITUTIONAL (₹1,999/mo):** Unlocks downloadable financial models, M&A merger models, LBO generators, and full placement simulation.
- **ENTERPRISE:** Multi-seat access with custom research retainers.

### Policy on Existing Research Reports
In strict accordance with the Zero Destructive Deletion policy, **no existing public research report will be retroactively locked behind a paywall**. Public research remains open to maximize brand authority, search indexing, and GEO citation readiness.

---

## 5. Revenue Stream D: Contextual Cross-Product Inquiries

Every research report functions as a natural top-of-funnel customer acquisition channel for specialized platform tools and commercial services:

| Report Topic | Contextual In-Article Recommendation | Primary Commercial Destination |
| :--- | :--- | :--- |
| **Quick Commerce & FMCG** | Q-Commerce Unit Economics Simulator & DCF Model Studio | `/tools/q-commerce-model` & `/tools/dcf-valuation-model` |
| **Fintech & Digital Lending** | 3-Statement Modeling & Ratio Analyzer | `/tools/3-statement-model` & `/tools/ratio-analyzer` |
| **Electric Mobility & Clean Tech** | Capital Expenditure & WACC Calculator | `/tools/wacc-calculator` & `/services` |
| **Startup Valuation & Tech** | Startup Financials 36-Month Runway & VC Memo | `/startup-financials` & `/pricing` |
| **Corporate Finance & Careers** | Placement Day War Room 2.0 (AI Interview Simulator) | `/placement-day-war-room` |

---

## 6. Commercial Measurement & Analytics Tracking

Conversion telemetry is wired to non-invasive client event callbacks:
- `research_report_view`: Triggered when an article is loaded.
- `research_report_engaged`: Triggered at 50% scroll depth or 2 minutes of active reading.
- `research_save_article`: Triggered on `SaveButton` click.
- `research_share_article`: Triggered on native/clipboard share.
- `research_inquiry_start`: Triggered when the user focuses on the custom research form.
- `research_inquiry_submitted`: Triggered upon verified 200 HTTP response from `/api/contact`.
- `research_tool_cross_sell_click`: Tracks contextual clicks from reports to calculators.

