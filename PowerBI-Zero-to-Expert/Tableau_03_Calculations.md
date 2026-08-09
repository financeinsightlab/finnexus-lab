# T3 · Calculated Fields & Table Calcs: Where Analysts Are Made

> *Tableau has two math engines. Calculated fields compute in the DATA (row → aggregate). Table calculations compute over what you SEE (the marks in the pane). Confuse them once, wrong numbers forever. Master both = you're dangerous (in a good way).*

## 🎯 Objectives
Write calculated fields confidently (IF/CASE/strings/dates) · row-level vs aggregate-level · master every Quick Table Calculation + "Compute Using" · nest table calcs · convert quick → permanent calcs.

---

## 📘 3.1 Calculated field grammar

Fields in `[square brackets]`, comments with `//`, functions in CAPS by convention:

```tableau
// Revenue per line (row-level)
[Quantity] * [UnitPrice] * (1 - [Discount])

// Discount band (row-level, returns text per row)
IF [Discount] >= 0.15 THEN "High"
ELSEIF [Discount] > 0 THEN "Standard"
ELSE "None" END

// Margin ratio (aggregate-level — sums FIRST, then divides)
SUM([Revenue]) / SUM([Gross Revenue])
```

**The iron rule:** if ANY field in a calc is wrapped in an aggregate (`SUM`, `AVG`…), ALL numbers in that calc must be aggregated. Row math first → aggregate on the pill (left column above); aggregations inside the field (right) for ratios, KPIs, AOV.

## 📘 3.2 The function belt (use daily)

| Family | Functions |
|---|---|
| Logic | `IF/ELSEIF/END`, `IIF`, `CASE`, `AND/OR/NOT`, `ISNULL`, `ZN` (convert NULL→0) |
| Strings | `LEFT/RIGHT/MID`, `TRIM`, `UPPER/LOWER`, `LEN`, `CONTAINS`, `SPLIT`, `REPLACE`, `+` (concat) |
| Dates | `TODAY()`, `DATETRUNC('month', d)`, `DATEPART('week', d)`, `DATEDIFF('day', a, b)`, `DATEADD`, `DATENAME`, `MAKEDATE` |
| Numbers | `ROUND`, `INT/FLOAT`, `ABS`, `MIN/MAX` (also 2-arg form: `MIN(a,b)` per row!), `POWER` |
| Conversion | `STR()`, `INT()`, `FLOAT()`, `DATE()` |

```tableau
// Customer tenure in months — pure DAX-brain already knows this pattern
DATEDIFF('month', DATETRUNC('month', [JoinDate]), DATETRUNC('month', TODAY()))

// Fiscal year for India (Apr–Mar) — classic finance ask
IF MONTH([OrderDate]) >= 4 THEN YEAR([OrderDate]) ELSE YEAR([OrderDate]) - 1 END
```

> 🔗 `ZN()`: `SUM` ignores NULLs but a row-level `NULL + 5 = NULL` eats your value — wrap with `ZN([Col])`. Silent killer in joins (matches the SQL track's three-valued logic lesson).

## 📘 3.3 Aggregate calcs — the KPI pack

```tableau
// AOV
SUM([Revenue]) / COUNTD([OrderID])

// Units per customer
SUM([Quantity]) / COUNTD([CustomerID])

// Discount rate actually paid (NOT AVG(Discount) — weight it!)
1 - DIV(SUM([Revenue]), SUM([Quantity] * [UnitPrice]))
```

(`DIV` divides handling divide-by-zero → NULL safety. Or wrap with `IF denom=0 THEN NULL`.)

## 📘 3.4 Table calculations — math over the visible grid

Quick Table Calculation (right-click any green pill): **Running Total, Difference, Percent Difference, Percent of Total, Rank, Percentile, Moving Average, YTD Total/Comp Growth**.

**Compute Using = the direction the calc walks:** Table (across), Table (down), Pane, Specific Dimensions… Get it wrong → percentage-of-wrong-denominator. Always ask: *"of what?"* and click **Edit Table Calculation** to set addressing.

```tableau
// What a quick calc writes under the hood (drag a quick-calc pill
// into the Data pane to auto-save it as a REAL calculated field!)
// Percent Difference From:
(ZN(SUM([Revenue])) - LOOKUP(ZN(SUM([Revenue])), -1)) / ABS(LOOKUP(ZN(SUM([Revenue])), -1))
// Running Total:
RUNNING_SUM(SUM([Revenue]))
// Rank:
RANK(SUM([Revenue]), 'desc')
```

**Nesting:** Moving average OF the MoM % change = Quick Table Calc → edit → secondary calc (Moving Average, 3 periods, previous values) on the first. POWER move for smoothed growth curves.

Cohort clue: `DATEDIFF('month', {FIXED [CustomerID]: MIN([OrderDate])}, [OrderDate])` — that brace syntax smuggles an LOD into a table-calc recipe; T4 makes LODs yours.

---

## 🧪 LAB T3 — The KPI arsenal (60 min)

1. Build the calc pack: `Revenue`, `Gross Revenue` (`[Quantity]*[UnitPrice]`), `Discount Paid` (gross − revenue), `AOV`, `Units/Customer`. Publish all with ₹ formats.
2. KPI crosstab: Region rows; columns = Revenue, AOV, Discount Paid; correct number formats.
3. Trend with **MoM % change** (Percent Difference), then the SAME view with **3-month moving average of MoM** (nested). Which tells the cleaner story for executives? Journal it.
4. Rank: products by Revenue with `RANK`; convert Table (down)→Pane so rank restarts per Region when Region is on Rows.
5. Fiscal-year column (Apr–Mar) as a calc; show FY totals by Region for FY2024 & FY2025.
6. Quick → permanent: drag your MoM % pill into the Data pane, rename `MoM Revenue %`, reuse it in the rank view. Table calc as real field — unlocked.

## 💪 Exercises
1. First-name calc: `SPLIT([CustomerName], ' ', 1)`; greet chart by first name (silly but proves SPLIT).
2. Weighted avg price: `SUM([Revenue]) / SUM([Quantity])` vs plain `AVG(UnitPrice)` — why do they differ?
3. "New vs Returning": flag orders in customer's first calendar month (hint: you can cheat with `MIN([OrderDate])` per customer… for now).
4. Percentile table calc on products — what question does it answer better than rank?
5. Break then fix: put `OrderDate` (blue year) next to MONTH(blue) and watch your MoM calc die. Set Compute Using correctly and explain WHY.

### ✅ Selected answers
- Ex 2: `AVG(UnitPrice)` weights every LINE equally; the weighted version weights by units sold. For the price customers actually paid, always weighted.
- Ex 4: Percentile is distribution-relative (0–1, robust to magnitude), rank is ordinal. "Is this product top-decile?" survives revenue inflation; "rank 3 of 26" drifts.

## ❓ Quiz
1. Row-level vs aggregate-level calc: the iron rule?
2. `ZN()` does what, and where does it bite?
3. Compute Using — what exactly are you choosing?
4. How do you turn a Quick Table Calc into a reusable field?

### ✅ Answers
1. If one field is aggregated, all must be. Otherwise Tableau throws "cannot mix aggregate and non-aggregate". Ratios = aggregate both sides.
2. Converts NULL→0. Bites: joined lookups (missing match) and `NULL + x` row math returning NULL.
3. The address/order the table calc walks the visible marks — Table across/down, pane, or specific dimension(s) restarting per the rest.
4. Right-drag (or drag) the quick-calc pill into the Data pane → saved as a real calculated field you can edit/reuse.

## ✅ Mastery checklist
- [ ] All LAB T3 calcs built and number-formatted
- [ ] Nested a table calc inside another
- [ ] Fiscal-year logic works for India (Apr–Mar)
- [ ] Can set Compute Using blindfolded and say why

**Next: T4 — LODs ({FIXED}), parameters, sets — the advanced tier. ⚡**
