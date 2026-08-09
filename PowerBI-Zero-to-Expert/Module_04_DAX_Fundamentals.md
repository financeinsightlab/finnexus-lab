# Module 04 — DAX Fundamentals: Speak the Language of Power BI

> *DAX (Data Analysis Expressions) is the formula language of Power BI. 20% of DAX covers 80% of business needs — this module is that 20%. Module 05 is the other 80% of the power.*

## 🎯 Objectives
Measures vs calculated columns · row context vs filter context · core functions · `CALCULATE` (your first taste of the engine room) · time intelligence on a marked Date table · the 10 measures every business asks for.

---

## 📘 4.1 Three places DAX lives

| | **Calculated column** | **Measure** | **Calculated table** |
|---|---|---|---|
| Computed when? | At refresh, stored per row (uses memory) | At query time, no storage | At refresh (rare) |
| Sees filters/slicers? | ❌ Fixed forever | ✅ Recomputes per visual | ❌ |
| Use for | Row attributes, flags you slice by (rarely!) | Everything numeric you report | Date/lookup tables |
| Rule | *"If in doubt, measure."* | Default choice | Date table & utilities |

A measure is just a named formula: `Total Sales = SUM(...)`, stored in `_Measures`, evaluated wherever dropped.

## 📘 4.2 The two evaluation contexts (the whole game)

- **Row context** = "the current row". Exists in calculated columns and *iterating* functions (`SUMX`, `FILTER`). DAX reads `[Quantity] * [UnitPrice]` row by row.
- **Filter context** = the set of filters coming from the visual: row/column fields, slicers, filters pane, other visuals cross-filtering. A measure's result = formula evaluated **under the current filter context**. The same `[Total Sales]` shows `₹18.2M` on a card (no filters) and `₹84,520` inside a matrix row (filtered to one product, one month, one region).

> 📌 **The mantra:** *Measures are computed in filter context. Calculated columns are computed in row context.* Re-read after every exercise until it feels obvious.

## 📘 4.3 Core function toolbox

```dax
SUM / AVERAGE / MIN / MAX (Table[Column])        -- aggregations over a column
COUNT (col) / COUNTROWS (table) / DISTINCTCOUNT (col)
DIVIDE ( [A], [B] )                              -- safe division (no div/0)
IF ( cond, a, b )   /   SWITCH ( TRUE(), cond1, r1, cond2, r2, default )
COALESCE ( x, 0 )   BLANK()   ISBLANK ( x )
SUMX ( table, expression )   -- row-by-row then sum (iterator family: MINX, MAXX, AVERAGEX...)
&& (and)  || (or)   IN { "a", "b" }
```

**Syntax culture:** `Table[Column]` for columns, `[Measure]` for measures — never write `Table[Measure]` (it doesn't exist) or a bare `[Column]` inside a measure (DAX can't pick *which* row's value → error: "single value cannot be determined").

## 📘 4.4 CALCULATE — the most important function in all of Power BI

`CALCULATE ( <expression>, <filter1>, <filter2>, … )` evaluates the expression inside a **modified filter context**. Filters are combined with AND.

```dax
West Sales = CALCULATE ( [Total Sales], 'Customers'[Region] = "West" )

% of All Products =
DIVIDE (
    [Total Sales],
    CALCULATE ( [Total Sales], ALL ( 'Products' ) )   -- remove product filters
)
```
Simple boolean filters (`Column = "x"`) work in CALCULATE; complex ones need `FILTER`/`KEEPFILTERS` — Module 05. `ALL` removes filters; `ALLEXCEPT` keeps some; `REMOVEFILTERS` is the readable modern name. **Filter on dimension columns, not whole fact tables** (speed!).

## 📘 4.5 Time intelligence (needs your marked Date table)

```dax
Sales YTD   = TOTALYTD ( [Total Sales], 'Date'[Date] )           -- also TOTALMTD, TOTALQTD
Sales LY    = CALCULATE ( [Total Sales], SAMEPERIODLASTYEAR ( 'Date'[Date] ) )
Sales PrevMonth = CALCULATE ( [Total Sales], PREVIOUSMONTH ( 'Date'[Date] ) )
Sales 6M Ago    = CALCULATE ( [Total Sales], DATEADD ( 'Date'[Date], -6, MONTH ) )
YoY % = DIVIDE ( [Total Sales] - [Sales LY], [Sales LY] )
MoM % = VAR Cur = [Total Sales]
        VAR Prv = [Sales PrevMonth]
        RETURN DIVIDE ( Cur - Prv, Prv )
```
These work because, for the month on a visual, time-intel functions **reshape the Date filter** (e.g., expand July → Jan 1–Jul 31 for YTD).

## 📘 4.6 Formatting & housekeeping
Modeling tab with a measure selected → set **format string** (`₹ #,##0` or `0.0%`), **display folder** (`_Time Intelligence`). Dynamic title trick and format-by-measure come in Module 06.

---

## 🧪 LAB 4 — The 10 measures every business asks for (75 min)
In `ShopKart_Model.pbix`, all measures into `_Measures`, display folder `_Core KPIs`:

1. `Total Sales = SUMX ( Sales, Sales[Quantity] * Sales[UnitPrice] * ( 1 - Sales[Discount] ) )` — note: no `Revenue` column exists; SUMX computes it row by row. Format ₹.
2. `Total Cost = SUMX ( Sales, Sales[Quantity] * RELATED ( Products[UnitCost] ) )` ⚠️ `RELATED` pulls from the 1-side of the relationship (Products) into the many-side context — first taste of relationship-aware DAX.
3. `Profit = [Total Sales] - [Total Cost]`
4. `Margin % = DIVIDE ( [Profit], [Total Sales] )`
5. `Units Sold = SUM ( Sales[Quantity] )`
6. `Orders = COUNTROWS ( Sales )` and `Avg Order Value = DIVIDE ( [Total Sales], [Orders] )`
7. `Customers = DISTINCTCOUNT ( Sales[CustomerID] )`
8. `Sales YTD`, `Sales LY`, `YoY %` (formulas above — write them yourself, don't paste).
9. `% of Category Sales = DIVIDE ( [Total Sales], CALCULATE ( [Total Sales], ALLEXCEPT ( Products, Products[Category] ) ) )` — test in a matrix on SubCategory.
10. `Target = SUM ( Targets[SalesTarget] )` and `Achieved % = DIVIDE ( [Total Sales], [Target] )` — validate only in 2025 with Region on rows (granularity!).

**Test bench (build this page):** Card row: Total Sales, Profit, Margin %, YoY %. Matrix: Year → Month Name rows × Total Sales / YTD / LY / YoY %. Bar: Category by Total Sales with % of Category as tooltip. Slicers: Year, Region, Segment. Click around and *watch measures recompute* — that recompute is filter context becoming real knowledge.

---

## 💪 Exercises (write, verify, then compare)

1. `Customers Buying Electronics` = count of customers whose visible sales are electronics.
2. `Discount Given (₹)` = SUMX of quantity × price × discount.
3. `High-Discount Orders` = count rows with discount ≥ 15%. (`COUNTROWS ( FILTER ( … ) )`)
4. `Best Month Sales` = the MAX of monthly sales. Hint: `MAXX ( VALUES ( 'Date'[Year Month] ), [Total Sales] )` — save the "why VALUES" question for Module 5.
5. `QTD Sales` + `MTD Sales`.
6. `West % of India` = West sales / all-region sales (`ALL ( Customers )`).
7. Journal: why is `Margin %` wrong if written as `SUMX ( Sales, ... ) / COUNTROWS(...)`? Rewrite any three measures using **variables** (`VAR … RETURN`) to match house style; Module 5 explains why pros always do.

### ✅ Solutions
```dax
1. Customers Buying Electronics =
   CALCULATE ( DISTINCTCOUNT ( Sales[CustomerID] ), Products[Category] = "Electronics" )
2. Discount Given = SUMX ( Sales, Sales[Quantity] * Sales[UnitPrice] * Sales[Discount] )
3. High-Discount Orders = COUNTROWS ( FILTER ( Sales, Sales[Discount] >= 0.15 ) )
4. Best Month Sales = MAXX ( VALUES ( 'Date'[Year Month] ), [Total Sales] )
5. QTD = TOTALQTD ( [Total Sales], 'Date'[Date] ) ; MTD = TOTALMTD ( [Total Sales], 'Date'[Date] )
6. West % = DIVIDE ( CALCULATE ( [Total Sales], Customers[Region] = "West" ),
                     CALCULATE ( [Total Sales], ALL ( 'Customers' ) ) )
7. A ratio needs aggregates of *both* sides over the same filter context, not row-level division then aggregation — that's "average of ratios" ≠ ratio of totals.
```

## ❓ Quiz
1. Row vs filter context — the mantra, from memory. 2. Why measures over calculated columns (give two reasons)? 3. What does `ALL ( 'Products' )` do inside CALCULATE? 4. Why does time intelligence fail without a marked Date table? 5. `VALUES` vs `DISTINCT` on a column — what's the sneaky difference? 6. Fix: `Discount % = [Discount] * 100` errors in a measure. Why?

### ✅ Answers
1. Measures → filter context; columns/iterators → row context.
2. No model bloat (computed at query time, per visual) + they *respond* to slicers — a column can't.
3. Removes every filter coming from the Products table → denominator = all products.
4. TI functions need a contiguous, marked Date table to reshape date filters reliably; otherwise results are silently wrong or blank.
5. Both unique values, but `VALUES` includes the **blank row** created by broken referential integrity; `DISTINCT` doesn't.
6. `[Discount]` is a bare column in measure-land — no single value. Wrap in an aggregation/iterator: `AVERAGE ( Sales[Discount] )`.

## ✅ Mastery checklist
- [ ] 10 core measures built, formatted, and in display folders
- [ ] I can predict a measure's result when I click a slicer
- [ ] I wrote time-intel measures from memory
- [ ] I can explain every formula in this module aloud

**Next: `Module_05_DAX_Advanced.md` — context transition, iterators, and the patterns that make you dangerous.**
