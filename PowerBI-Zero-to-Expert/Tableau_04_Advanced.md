# T4 · Advanced Tableau: LODs, Parameters & Sets

> *LODs are the DAX-like power that separates juniors from seniors. Twenty lines of `{FIXED …}` solve questions that take pages of SQL subqueries. Then parameters turn static charts into user-driven instruments. This is the fun part.*

## 🎯 Objectives
Master FIXED/INCLUDE/EXCLUDE LODs on real questions · Tableau's order of operations · parameters (Top-N switch, measure selector, what-if) · sets + combined sets · bullet charts vs Targets.

---

## 📘 4.1 LOD expressions — pick your aggregation grain

An LOD computes at a **chosen level of detail**, independent of the view:

```tableau
// FIXED — compute at exactly these dimensions, ignoring the view
{FIXED [CustomerID] : SUM([Revenue])}              // lifetime value per customer
{FIXED [CustomerID] : MIN([OrderDate])}            // customer birth/cohort date
{FIXED [Region], DATETRUNC('month',[OrderDate]) : SUM([Revenue])}

// INCLUDE — compute FINER than the view (view + these dims)
{INCLUDE [ProductID] : SUM([Revenue])}             // product-level sums inside a Region view

// EXCLUDE — drop a view dimension (coarser than the view)
{EXCLUDE [Category] : SUM([Revenue])}              // total regardless of category on rows
```

LOD results come back as **un-aggregated fields** — wrap them on the pill (`AVG({FIXED [CustomerID]: SUM([Revenue])})` = avg customer LTV). FIXED computes **before** dimension filters (only Context Filters and above apply) — FIXED "ignores" your quick filters. That is usually the superpower; when you need filters respected, right-click the filter → **Add to Context** (it turns grey).

## 📘 4.2 The three canonical LOD patterns

**1. Cohorts / new vs returning** — every data job asks this:

```tableau
// Cohort month
DATETRUNC('month', {FIXED [CustomerID]: MIN([OrderDate])})

// Is this order from a brand-new customer? (row-ish flag)
DATETRUNC('month', [OrderDate]) = DATETRUNC('month', {FIXED [CustomerID]: MIN([OrderDate])})
```

**2. Share-of-total that survives filters:**

```tableau
SUM([Revenue]) / SUM({FIXED [Region]: SUM([Revenue])})   // % of region, per category row
```

**3. "Biggest day/month" trivia:**

```tableau
// each customer's best single month (fixed at customer+month grain, then MAX down)
{FIXED [CustomerID]: MAX({FIXED [CustomerID], DATETRUNC('month',[OrderDate]): SUM([Revenue])})}
```

(Outer = "per customer, of his monthly totals, take the max" — a nested LOD, legal and fast.)

## 📘 4.3 Order of operations — WHY your filter "doesn't work"

Extract → Data Source → **Context Filters** → Sets / conditional + Top-N filters / **FIXED LODs** → Dimension Filters → INCLUDE/EXCLUDE/row calcs → Measure Filters → Table calcs → trend/ref.

One-line takeaway: **FIXED beats dimension filters; add filters to Context when FIXED must obey them.** INCLUDE/EXCLUDE sit after dimension filters — they respect them.

## 📘 4.4 Parameters — user-controlled levers

Create (Data pane → drop-down → Create Parameter) with name/type/allowable values. Parameters do NOTHING until a calc or filter references them.

```tableau
// Top N lever (parameter [Top N] int, range 3..20) + filter calc:
RANK(SUM([Revenue])) <= [Top N]        // table calc filter on product view

// Measure switcher (string param: Revenue | Orders | Units)
CASE [Choose Measure]
WHEN "Revenue" THEN SUM([Revenue])
WHEN "Orders"  THEN COUNTD([OrderID])
WHEN "Units"   THEN SUM([Quantity]) END

// What-if price shock (parameter [Price Shift] float −0.2..0.3)
SUM([Revenue]) * (1 + [Price Shift])
```

Show control: right-click param → **Show Parameter Control** (slider/list). Dynamic params can auto-fill from a field on open (2021+).

## 📘 4.5 Sets & combined sets

Sets = boolean In/Out flags that re-evaluate with data. **Combined set** = intersection/union/difference of two sets (right-click a set → Create Combined Set) — "top 10 products that are ALSO discounted >10%" in two clicks. Sets filter via the Filter shelf, Color shelf, or a calc: `IF [Top 10 Products] THEN 'Focus' ELSE 'Rest' END`.

## 📘 4.6 Bullet charts — Actual vs Target like a CFO

1. Relate **Targets.csv** to Sales: noodle links `Region` + month — or simpler: connect Targets separately; in the Targets view… For one-sheet bullets, relate Targets↔Sales on Region and MonthStart (add a calc `MonthStart = DATETRUNC('month',[OrderDate])` in Sales).
2. Rows: `SUM(SalesTarget)` (reference) and Revenue (bar) → Show Me → **Bullet Graph** auto-builds bar + reference distribution. Edit reference lines for quartile bands.
3. Gap calc: `SUM([Revenue]) - SUM([SalesTarget])` → color by sign (Achievement %) algebra in T6's variance pack.

---

## 🧪 LAB T4 — Senior-analyst moves (70 min)

1. **LTV histogram**: `{FIXED [CustomerID]: SUM([Revenue])}` as continuous → Size bins (right-click calc → Create Bins, size 1,000) → histogram of customers by LTV. How many whales (>₹40k)?
2. **Cohort revenue**: cohort month to Columns, MONTHs-since-cohort row to Rows; color = avg revenue per customer. Mosaic plot = instant retention story.
3. **Share of region**: Category rows; columns Revenue and `% of Region` LOD; verify the % column sums to 100 within each region. Then filter to one region — note FIXED kept the engine running (test with/without Context!).
4. **Top-N parameter** lever on products; wire a filter calc; slide 3→15 live.
5. **Measure switcher** dashboard-ready: 3-way parameter + CASE on a monthly trend; add a dropdown control.
6. **Bullet chart**: monthly Regional actual vs target with quartile bands; identify the worst-performing region-month with a calc `Achievement % = SUM([Revenue])/SUM([SalesTarget])`.

## 💪 Exercises
1. INCLUDE: in a Region view, AVG of `{INCLUDE [City]: SUM([Revenue])}` — what question does it answer exactly (one sentence)?
2. EXCLUDE: `% of total ignoring Category filter`… wait — which LOD ignores CATEGORY on ROWS vs a CATEGORY filter? Write both versions.
3. Combined set: top-10 revenue products AND avg discount >8%. How many members?
4. Order-of-ops quiz yourself: Context filter on Region + FIXED by Region — does the LOD shrink? Why?
5. Parameter + calc that flips currency display between ₹ and "USD @ Finance_FX rate" (data in T6 — design the calc logic now).

### ✅ Selected answers
- Ex 1: "Average per-city revenue within each region" — INCLUDE computed at City grain is averaged per region by the pill's AVG.
- Ex 4: The LOD shrinks with it — Context filters apply BEFORE FIXED. That's the whole point of Context (grey pills).

## ❓ Quiz
1. `{FIXED [CustomerID]: MIN([OrderDate])}` — grain and classic use?
2. Which filter type do FIXED LODs ignore, and what's the workaround?
3. INCLUDE vs EXCLUDE — one-line difference?
4. A parameter alone does nothing until…? Give 3 wiring examples.

### ✅ Answers
1. One value per customer — first purchase date → cohort, new-vs-returning, LTV windows.
2. Dimension (quick) filters — workaround: right-click filter → Add to Context (computed above FIXED in the pipeline).
3. INCLUDE adds dimensions (finer than view), EXCLUDE removes view dimensions (coarser).
4. Referenced in a calc/filter/top-tab: measure switcher CASE, Top-N rank filter, what-if multiplier, threshold highlighter, date-range pickers, sheet-swap sizing tricks.

## ✅ Mastery checklist
- [ ] 3 LOD patterns built and validated (cohort / share / nested max)
- [ ] Context filter used deliberately
- [ ] 2 parameters driving live views
- [ ] Bullet Actual-vs-Target shipped

**Next: T5 — package everything into dashboards + stories, and publish like a pro. 🧩**
