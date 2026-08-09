# Module 06 — Visualization & Report Design: Dashboards People Actually Use

> *A perfect model with an ugly report gets ignored. A great report tells a story in 5 seconds, invites exploration, and never lies.*

## 🎯 Objectives
Choose the right visual every time · formatting & conditional color · slicers/filters/drill/trillthrough · **bookmarks & buttons** (real interactivity) · themes, tooltips pages, field parameters · design principles & accessibility · mobile layout.

---

## 📘 6.1 The chart chooser (tattoo this)

| Question | Use |
|---|---|
| Compare categories | **Bar** (long labels) / **Column** (short labels) |
| Trend over time | **Line** (many points) / **Column** (few periods) / Line+Column combo for two scales |
| Part of a whole | **100% stacked bar/column**, **Treemap** (many parts) — pie/donut only ≤ 5 slices, never for comparison |
| KPI vs target | **KPI visual**, **Gauge** (rarely), **Card** (+ conditional color) |
| Breakdown flow | **Waterfall** (variance bridge), **Funnel** (stage conversion) |
| Distribution | **Histogram-like column** (binned), scatter |
| Relationship of 2–3 measures | **Scatter** (+ play axis over time for demos) |
| Geography | **Map** (points/bubbles by city-state) vs **Filled map** (shaded regions). Set Data Category + locale for India geocoding |
| Detailed matrix w/ hierarchy | **Matrix** (+/- drill, stepped layout off, subtotals styled, sparklines in cells) |
| Exact values / export | **Table** (with conditional formatting) |
| Which item drives a metric? | **Decomposition tree** (AI-split explorer — executives adore it) |
| What influences a KPI | **Key influencers** (AI visual) |
| Free-text questions | **Q&A** visual |

Newer friends: **small multiples** (one chart per category automatically), **sparklines** in table/matrix, **new card visual** (multi-card with layouts). Avoid the temptation of "cool" — boring and clear beats exciting and confusing.

## 📘 6.2 Formatting & conditional logic

- **Format pane**: data colors, axis (log scales off by default — good), data labels (position, density), gridlines (usually off), **titles = takeaways** ("South grew 31% YoY", not "Sales by Region").
- **Conditional formatting** (fx buttons on background/font/icons/web URL): by *Field value* = a **measure that returns colors/hex** → full dynamic control:
  ```dax
  Margin Color = IF ( [Margin %] >= 0.35, "#2E7D32", IF ( [Margin %] >= 0.25, "#F9A825", "#C62828" ) )
  ```
- **Dynamic format strings** (measure → Format dropdown → *Dynamic*): one measure showing ₹ Cr vs ₹ Lakh by size, or "+12.4% ▲" logic.
- **Themes**: View → Themes (built-in gallery) or a custom **JSON theme** — brand colors, fonts, defaults applied to every visual. Build once per company. (Format everywhere: textboxes/shapes for headers, consistent 8-pt grid.)

## 📘 6.3 Interactivity machinery

| Mechanism | What it does | Pro notes |
|---|---|---|
| Cross-filter/highlight | Clicking a visual filters/highlights others | Format → **Edit interactions** to decide per-pair (e.g., total cards should Ignore slicers? — usually not) |
| **Slicers** | User-facing filters: list, dropdown, tile, **between/relative date**, numeric range | Turn on *Search*; **Sync slicers** pane to share across pages |
| **Filters pane** | Visual / Page / All-pages levels | Can **lock** (user can't change) or **hide** (user can't see) a filter |
| Drill down/up | Through a hierarchy on an axis | Tree-arrow icons on the visual header |
| **Drillthrough** | Right-click a data point → jump to a detail page pre-filtered | Add a **back button** (auto appears); "Keep all filters" toggle |
| **Tooltip pages** | Hover → entire mini report page pops up | Design a page, mark *Allow use as tooltip*, set small canvas size |
| **Q&A button/visual** | Natural-language questions | Teach synonyms in Model view (Linguistic schema) |

### ⭐ Bookmarks + buttons = "apps", not reports
**Bookmark = saved view state** (filters, slicers, **visibility** + which visuals affected, current page). Window: View → **Bookmarks pane** + **Selection pane** (rename every object: `btn_FilterPanel_Open`, `img_Logo` — undisciplined naming makes bookmarks hell).

**Pattern 1 — Collapsible filter panel:** build a shape-backed panel of slicers off-canvas-style → Bookmark A "Filters Open" (panel visible + down-arrow icon) → Bookmark B "Filters Closed" → two buttons/images each triggering the opposite bookmark (assign in *Action*). Update bookmarks to affect **Selected visuals** only (select the slicer group first) so they don't trap user filters — uncheck **Data** in the bookmark options when you only toggle visibility.

**Pattern 2 — Chart-type toggle / KPI switcher:** two overlapping charts; bookmarks swap visibility; a single button toggles. 

**Pattern 3 — Reset filters:** bookmark the page's default state → "Reset" button. 

**Buttons:** Page navigation, Back, Bookmark, Drillthrough, Q&A, Web URL (`Web URL` buttons can even open mail links). **Personal bookmarks** (Service) = each user's saved views.

## 📘 6.4 Field parameters & measure switchers
Modeling → **New parameter → Fields** → pick measures or columns + toggle *Add slicer to page*. Power BI creates a table whose selection drives a visual's value/axis → user-controlled "Show by: Sales | Profit | Margin %". Explains itself in the DAX (`NAMEOF` references). For time-intel-switch patterns, professionals historically used **calculation groups** (Tabular Editor) — still the industrial tool for "Current / YTD / YoY%" selectors (Module 08).

## 📘 6.5 Design principles (the designer's dozen)
1. **5-second rule:** page must answer its core question at a glance. Title = the answer, not the topic.
2. **F-layout:** KPI row across the top, main trend center-left, breakdowns right, details below.
3. **One page, one story.** 3–7 visuals max; detail demands its own page + drillthrough.
4. **Align to a grid;** consistent sizes; white space is a feature.
5. **Color with intent:** brand palette (60/30/10 rule), *one* accent for attention, red/green only for bad/good, never both meanings.
6. **Typography hierarchy:** big KPI numbers (28–40+), medium titles (12–14), small labels (9–10). One font family (Segoe UI / DIN).
7. **Label data directly** where possible; ditch legends when direct labels exist; round aggressively (₹1.8M not ₹1,847,293.42).
8. Kill chartjunk: heavy gridlines, borders, 3-D, shadows.
9. Avoid dual axis unless audiences expect it; if used, color-match axis to series.
10. **Accessibility:** colorblind-safe palettes (test: deuteranopia), contrast ≥ 4.5:1, **Alt text** on every visual (Format → General → Alt text), set **Tab order** (Selection pane). 8% of men are colorblind — red/green-only coding is malpractice.
11. Numbers need context: always pair a KPI with vs-target, YoY or sparkline.
12. Mobile first for execs: check **View → Mobile layout**, arrange a vertical one-hand scroll page.

---

## 🧪 LAB 6 — "ShopKart Executive Overview" (2 hrs)
Canvas 16:9.
1. **Header bar** (rectangle + logo shape + dynamic title measure from Module 5 + report date).
2. **KPI row:** 4 cards — Total Sales, Profit, YoY %, Achieved % of Target — each with `Margin Color`-style conditional font color and small subtitle (₹ vs Target).
3. **Trend:** line+column combo — columns = Total Sales by Month, line = Sales LY, data labels off (tooltip detail instead).
4. **Breakdowns:** bar = Sales by Category (with drill down to sub-category); map = bubbles by State/City sized by Sales; decomposition tree pinned bottom-right: Sales → split by Region → Segment → Category.
5. **Slicer panel** on a collapsible bookmark: Year, Region, Segment (+ Search on). Add sync across pages OFF for now; Reset button (Pattern 3).
6. **Page 2 — Customer drillthrough:** matrix of customers, Units/Sales/Margin; set drillthrough field `CustomerName`; auto back button; conditional bar on Margin %.
7. **Page 3 — tooltip page** "TT Product": product name, 12-month sparkline-like line, top-3 customers; wire to the category bar visual.
8. Apply a **theme** (choose one + set title colors), align to grid, set alt texts, publish-ready.
9. **Critique pass:** squint test (is the hierarchy obvious?), 5-second test on a colleague, colorblind sim, mobile layout arranged.

**Deliverable:** screenshots of all three pages → portfolio asset #2.

## 💪 Exercises
1. Rebuild a famous chart: pick any Economist/FT graphic; recreate it in Power BI with the dataset. (Best design training there is.)
2. Implement the chart-type toggle (Pattern 2) between *map* and *filled-map*-style table.
3. Make `Achieved %` flip between vs Target and vs LY using a **field parameter**.
4. Conditional-format the matrix so any month with Margin % < 25% glows amber — measure-driven, not gradient.
5. Full **edit interactions** audit of Lab 6: decide, per visual pair, filter vs highlight vs none. Document two choices in your journal.
6. **Bad dashboard clinic:** I describe one — 3 pages, 14 visuals/page, rainbow pie charts, unlabeled axes. List 8 concrete fixes (do it before looking at §6.5).

## ❓ Quiz
1. Pie or bar for 8 categories — and why? 2. What three things can a bookmark capture — and which should you *uncheck* for a pure visibility toggle? 3. Drill down vs drillthrough vs tooltip page. 4. Two ways to give users a "switch the measure" experience. 5. Name four accessibility musts. 6. What is the 5-second rule?

### ✅ Answers
1. Bar. Humans compare lengths far more accurately than angles/areas; pies hide differences (esp. >5 slices).
2. Data (filters/slicer state), Display (visibility/spotlight), Current page. Uncheck **Data** for visibility-only toggles so user filters survive.
3. Drill down = descend a hierarchy *within* one visual; drillthrough = jump to another *page* filtered by the clicked point; tooltip page = hover overlay mini-report.
4. Field parameters (no code, works in axis too) and calculation groups via Tabular Editor (industrial, cleaner for time-intel).
5. Colorblind-safe palette, 4.5:1 contrast, alt text on visuals, logical tab order (+ not encoding by color alone).
6. A new viewer must grasp the page's main message within 5 seconds.

## ✅ Mastery checklist
- [ ] Executive Overview built, themed, critiqued, screenshot in portfolio
- [ ] Bookmarks/buttons panel works without trapping user filters
- [ ] Drillthrough + tooltip pages wired
- [ ] I can reuse this design language on any dataset in under an hour

**Next: `Module_07_Service_Sharing_Security.md` — publish it, protect it, refresh it.**
