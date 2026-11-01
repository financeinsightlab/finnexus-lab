# Kunwar Analytics — Research Intelligence 2.0: Information Architecture

**Document Version:** 2.0  
**Status:** Approved Architecture Blueprint  
**Target Domain:** `https://kunwaranalytics.in/research`  

---

## 1. Product Positioning & Editorial Identity

### Brand Identity
**Kunwar Analytics Research Intelligence**

### Supporting Proposition
> *"Independent financial research, sector intelligence and data-driven analysis for investors, analysts, founders and business decision-makers."*

### Editorial Philosophy
- **Analytical Depth:** Reports prioritize rigorous quantitative modeling, structural unit economics, regulatory analysis, and verifiable empirical data.
- **Evidence-Based Transparency:** Every metric cites primary filings, industry benchmarks, or explicitly defined computational assumptions.
- **Zero Unsupported Marketing Claims:** Absolute prohibition of unsupported claims such as "100% Peer-Reviewed", "India's #1", or "Guaranteed Returns".
- **Distinction of Review Levels:**
  - `Editorially Reviewed`: Verified by internal research and editorial desk.
  - `Quantitative Model Verified`: Mathematical formulas and assumptions cross-checked against source filings.
  - `AI-Assisted Drafting / Analyst Refined`: Clear disclosure when synthesis was assisted by LLM tooling.

---

## 2. Research Sub-Domains & Editorial Hierarchy

```
                                 [Research Hub: /research]
                                             │
      ┌──────────────────┬───────────────────┼───────────────────┬──────────────────┐
      ▼                  ▼                   ▼                   ▼                  ▼
[In-Depth Reports]   [Insights]          [Data Lab]        [Case Studies]    [Custom Inquiries]
  /research/[slug]   /insights/[slug]    /data-lab/[slug]  /case-studies/[..]  /contact?service=..
   (5,000+ words)    (1,000-2,000 words) (Reproducible     (Problem / Method / (Commissioned
   Full Valuation,   Tactical notes,     Jupyter / Models,  Outcome Narratives, Custom Modeling &
   Unit Economics,   Policy briefs,      Interactive KPIs)  Client Advisory)    Due Diligence)
   Supply Chain)     Sector shifts)
```

### Definitions:
1. **Research Reports (`/research/[slug]`):** Consulting-grade deep dives (5,000+ words) covering micro-fulfillment geometry, capital expenditure cycles, regulatory impacts, and DCF/EBITDA models.
2. **Strategy Insights (`/insights/[slug]`):** Concise executive memos (800–2,000 words) analyzing high-conviction market developments, regulatory alerts (e.g., RBI risk weights), and policy inflection points.
3. **Data Lab (`/data-lab/[slug]`):** Reproducible data science and empirical projects featuring interactive charts, formula walk-throughs, and methodology datasets.
4. **Case Studies (`/case-studies/[slug]`):** Structured narratives detailing strategic problem definitions, analytical frameworks, and financial outcomes across enterprise advisory engagements.

---

## 3. Editorial Collections & Taxonomy

To replace arbitrary card grids, content is organized into 11 curated institutional collections:

| Collection Slug | Collection Name | Core Themes & Coverage Universe |
| :--- | :--- | :--- |
| `macro-economy` | Indian Economy & Macroeconomics | Monetary policy, RBI liquidity, GDP cycles, debt capital markets, dedollarization. |
| `banking-bfsi` | Banking & Financial Services | NIM compression, asset quality, credit growth, private credit, regulatory capital. |
| `fintech-payments` | Fintech & Digital Payments | UPI rails, digital lending, FLDG guidelines, payment aggregators, credit cards. |
| `quick-commerce` | Quick Commerce & Consumer Internet | Dark store density, rider economics, SKU velocity, grocery logistics, ad revenues. |
| `tech-ai` | Technology & Artificial Intelligence | Enterprise AI adoption, cloud spending, data center power, GPU cluster economics. |
| `semiconductors` | Semiconductors & Deep Tech | Fab capex, OSAT packaging, ATMP, supply chain indigenisation, ISM subsidies. |
| `energy-climate` | Energy & Sustainability | Green hydrogen, solar/wind round-the-clock power, battery storage, grid parity. |
| `infrastructure` | Infrastructure & Real Estate | Data center parks, logistics hubs, transmission capex, toll roads, REITs. |
| `private-markets` | Private Equity & Private Credit | Direct lending, venture debt, buyout multiples, turnaround capital, LP yields. |
| `mobility-ev` | Automotive & Mobility | EV 2W/3W penetration, battery chemistry, gigafactories, fleet TCO parity. |
| `defence-aerospace` | Defence & Aerospace | DAP indigenisation, defence order book multiples, aerospace precision manufacturing. |

---

## 4. Single Canonical Content Discovery Layer

To eliminate the split between file-backed MDX and PostgreSQL CMS posts, all research consumers interact with a unified interface in `lib/research-content.ts`:

```
 [File-Backed MDX in /content]               [PostgreSQL `Post` via Prisma]
   (content/research/*.mdx)                    (type='RESEARCH', published=true)
              │                                              │
              └──────────────────────┬───────────────────────┘
                                     ▼
                    [lib/research-content.ts Layer]
                     - Deduplication by Slug
                     - CMS Priority Overriding
                     - Accurate Word & Reading Time Counts
                     - Disclosed Review Levels
                     - Real Sector & Tag Aggregation
                                     │
      ┌──────────────────────────────┼──────────────────────────────┐
      ▼                              ▼                              ▼
[/research Landing]          [/research/[slug] Detail]       [/sitemap.ts & Algolia]
```

### Invariants:
1. **Deduplication:** A slug appearing in both CMS and MDX is merged such that the CMS record provides updated overrides, while preserving any extended MDX components.
2. **True Status Only:** Draft or review posts in CMS are never published to public listings or sitemaps.
3. **Accurate Page/Reading Metrics:** If `pageCount` is not explicitly set in frontmatter, it is calculated from actual word count (`Math.ceil(words / 450)`), never a blanket 50-page fallback.
4. **Search Discoverability:** Both CMS and MDX items receive consistent indexing IDs (`research-${slug}`) preventing Algolia duplication.

---

## 5. Report Reading Page Architecture (`/research/[slug]`)

```
+-----------------------------------------------------------------------------------+
| BREADCRUMBS: Home / Research / Sector / [Report Title]             [SAVE] [SHARE] |
+-----------------------------------------------------------------------------------+
| SECTOR PILL | READING TIME | WORD COUNT | METHODOLOGY DISCLOSURE                  |
| REPORT TITLE (3xl - 4xl font-extrabold)                                          |
| EXECUTIVE SUMMARY (border-l-2 border-primary leading-relaxed)                     |
| METADATA STRIP: Author, Organization, Date Published, Last Reviewed, Version     |
+-----------------------------------------------------------------------------------+
| FEATURED VISUAL / COVER (Full width responsive container)                         |
+-----------------------------------------------------------------------------------+
| [STICKY SIDEBAR - 4 Cols]             | [REPORT ARTICLE BODY - 8 Cols]            |
| 1. Dynamic Table of Contents (H2/H3)  | 1. Executive Summary & Findings           |
| 2. Report Specifications Table        | 2. Research Hypothesis & Core Questions   |
| 3. Commercial Commission CTA Card     | 3. Quantitative Models, Tables & Charts   |
| 4. Related Institutional Models       | 4. Sensitivity & Scenario Matrices        |
| 5. Grounded AI Concept Tutor          | 5. Strategic Implications & Limitations   |
| 6. Citation Block (BibTeX / Chicago)  | 6. Source Data & Methodology Appendix     |
|                                       | 7. Commercial Custom Advisory Banner      |
|                                       | 8. Peer & Community Discussion            |
+-----------------------------------------------------------------------------------+
```

---

## 6. Commercialization Funnel Integration

Every research report directly feeds one of four commercial pathways:
1. **Custom Financial Research (Stream A):** Sector deep-dive, bespoke DCF modeling, competitor benchmarking.
2. **Paid Financial Products (Stream B):** Downloadable institutional models and dataset packs.
3. **Research Intelligence Pro (Stream C):** Premium monthly sector updates and private briefing access.
4. **Contextual Advisory Inquiries (Stream D):** Cross-links to Startup Financials, Due Diligence, and Capital Planning.

