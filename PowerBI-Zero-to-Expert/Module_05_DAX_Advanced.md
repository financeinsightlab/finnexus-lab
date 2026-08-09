# Module 05 — DAX Mastery: CALCULATE, Context Transition & Expert Patterns

> *Everyone can SUM. What separates experts is mastery of **filter context manipulation**. This module rewires your brain — expect a week of "aha, so THAT'S why".*

## 🎯 Objectives
Deep CALCULATE · context transition · variables · iterators & virtual tables · the filter-control family (ALL/ALLEXCEPT/ALLSELECTED/KEEPFILTERS…) · 12 production patterns · debugging with DAX Studio · visual calculations.

---

## 📘 5.1 CALCULATE, properly understood

`CALCULATE ( expr, f1, f2, … )` does two things: ① modifies the filter context (replace roles below), ② evaluates `expr` in the new context.

**Key rules experts recite:**
1. Filters are **tables**: `[Region] = "West"` is syntax sugar for `FILTER ( ALL ( Customers[Region] ), Customers[Region] = "West" )`.
2. Multiple filters = **AND** across them; `OR` needs `||` inside one `FILTER`/`KEEPFILTERS` or the `IN` set.
3. By default each filter **replaces** existing filters on those columns. `KEEPFILTERS` switches to **intersect** (adds to slicers instead of overriding them).
4. Filter on **dimension columns**, never whole fact tables (`FILTER ( Sales, … )` materializes the giant table → slow).

```dax
-- Replace (default): ignores the user's Region slicer
West forced = CALCULATE ( [Total Sales], Customers[Region] = "West" )
-- Intersect: respects slicer, narrows to West when visible
West respect = CALCULATE ( [Total Sales], KEEPFILTERS ( Customers[Region] = "West" ) )
```

## 📘 5.2 Context transition — the dragon you must slay

When `CALCULATE` (or a **measure reference**, which hides a CALCULATE) runs **inside a row context**, the current row's values become filters: that's **context transition**. Two consequences:

- In a calculated column, `[Total Sales]` evaluated per row filters the model to *that row's* customer/product/date → not "grand total". Wrap in `ALL` if needed.
- Inside iterators like `SUMX`, measures transition — columns don't. `SUMX ( Products, [Total Sales] )` ≠ `SUMX ( Products, Products[UnitPrice] )`: the first evaluates per-product filtered sales (correct), the second ignores context inside the sum.

> 📌 **Mastery test:** if you can explain why `SUM ( Sales[Quantity] )` (no CALCULATE, no transition) behaves differently from `SUMX ( Sales, [Units Sold] )` inside a calculated column on `Date` — you've slain the dragon.

## 📘 5.3 Variables — house style of every pro

```dax
YoY % = 
VAR CurrentSales = [Total Sales]
VAR PriorSales   = CALCULATE ( [Total Sales], SAMEPERIODLASTYEAR ( 'Date'[Date] ) )
RETURN
    IF ( ISBLANK ( PriorSales ), BLANK (), DIVIDE ( CurrentSales - PriorSales, PriorSales ) )
```
- `VAR` = computed **once**, in the context where defined (constant afterward) → clarity + speed.
- Formatting discipline: one variable per line, `RETURN` on its own line, blank line before complex sections. Comment with `--` or `//`.

## 📘 5.4 Iterators & virtual tables

Iterators (`SUMX, AVERAGEX, MAXX, MINX, RANKX, COUNTX, CONCATENATEX`) = `X ( <table>, <expression> )` — loop rows (row context), evaluate, aggregate. Pass **small virtual tables** from functions:

| Function | Returns | Classic use |
|---|---|---|
| `VALUES ( col )` | distinct values incl. blank | loop customers/months |
| `DISTINCT ( col )` | distinct, no blank | counts without RI blank |
| `ALL ( tbl/col )` | ignore filters | denominators, ranking sets |
| `ALLEXCEPT ( t, c… )` | ignore filters except c… | % of parent |
| `ALLSELECTED ( col )` | ignore *visual* filters, keep slicers | % of *visible* total, RANKX within selection |
| `FILTER ( t, cond )` | rows matching cond | fine-grained filtering — keep t small! |
| `KEEPFILTERS` / `REMOVEFILTERS` | modifier wrappers | intersect / explicit remove |
| `SELECTEDVALUE ( col, default )` | single visible value or default | dynamic titles, "what-if" reads |
| `HASONEVALUE` / `ISFILTERED` / `ISINSCOPE` | booleans | matrix-level logic |
| `ADDCOLUMNS` / `SUMMARIZE` | shaped tables | virtual aggregations (prefer `SUMMARIZECOLUMNS` in queries) |
| `TOPN ( n, t, [measure], DESC )` | top rows | Top-N filters, Pareto |
| `DATESBETWEEN` / `DATESINPERIOD` / `DATEADD` | date sets | rolling windows |
| `TREATAS` | applies one table's values as filters on unrelated columns | virtual relationships, basket/budget tricks |
| `USERELATIONSHIP` / `CROSSFILTER` | relationship modifiers | activate inactive rels; switch direction per-measure (no global bidirectional needed!) |

```dax
-- Inactive JoinDate relationship, awakened:
Customers Joined = CALCULATE ( COUNTROWS ( Customers ), USERELATIONSHIP ( Customers[JoinDate], 'Date'[Date] ) )
-- Per-measure bidirectionality:
Sales by Product-to-Region = CALCULATE ( [Total Sales], CROSSFILTER ( Sales[ProductID], Products[ProductID], BOTH ) )
```

## 📘 5.5 The 12 production patterns (type each, don't paste)

```dax
1) Running Total = CALCULATE ( [Total Sales], FILTER ( ALL ( 'Date' ), 'Date'[Date] <= MAX ( 'Date'[Date] ) ) )
   -- smarter variant: DATESBETWEEN('Date'[Date], BLANK(), MAX('Date'[Date]))
2) 3-Month Moving Avg = AVERAGEX ( DATESINPERIOD ( 'Date'[Date], MAX ( 'Date'[Date] ), -3, MONTH ), [Total Sales] )
3) % of Visible Total = DIVIDE ( [Total Sales], CALCULATE ( [Total Sales], ALLSELECTED ( 'Products'[ProductName] ) ) )
4) Product Rank = IF ( ISINSCOPE ( 'Products'[ProductName] ),
                      RANKX ( ALLSELECTED ( 'Products'[ProductName] ), [Total Sales] ) )
5) New Customers = VAR Cur = VALUES ( Sales[CustomerID] )
                   VAR Prev = CALCULATETABLE ( VALUES ( Sales[CustomerID] ),
                              FILTER ( ALL ( 'Date' ), 'Date'[Date] < MIN ( 'Date'[Date] ) ) )
                   RETURN COUNTROWS ( EXCEPT ( Cur, Prev ) )
6) Semi-additive (snapshot/inventory style): Closing = CALCULATE ( [Total Sales], LASTDATE ( 'Date'[Date] ) )
7) Top-N Others (dynamic): combine pattern 4 with TOPN and an IF rank <= N branch
8) Actual vs Budget at different grain via TREATAS (skip shared dimension):
   Budget = CALCULATE ( SUM ( Targets[SalesTarget] ),
              TREATAS ( VALUES ( Customers[Region] ), Targets[Region] ) )
9) Safe YoY for incomplete Year: hide YoY % when prior-year data partial:
   = IF ( NOT ISBLANK ( [Sales LY] ) && [Sales LY] <> 0, [YoY %] )
10) Dynamic title = "Sales: " & COALESCE ( SELECTEDVALUE ( Customers[Region] ), "All Regions" )
                & " | " & COALESCE ( SELECTEDVALUE ( 'Date'[Year] ), "All Years" )
11) Pareto % (cumulative share) — matrix on ProductName desc by sales:
    Pareto % = VAR Cur = [Total Sales]
               RETURN DIVIDE (
                   SUMX ( FILTER ( ALLSELECTED ( 'Products'[ProductName] ), [Total Sales] >= Cur ), [Total Sales] ),
                   CALCULATE ( [Total Sales], ALLSELECTED ( 'Products'[ProductName] ) ) )
12) Customers joined per month (USERELATIONSHIP above) or basket analysis (filtered copy of Products via TREATAS + CALCULATETABLE)
```

## 📘 5.6 Debugging like an engineer

1. **Build on a table visual**, one `VAR` at a time — return intermediate variables to inspect them (`RETURN PriorSales`).
2. On a matrix, wrong subtotals are almost always context issues: think "what is the filter context *right here*?" `ISINSCOPE`/`HASONEVALUE` shape the answer per level.
3. **DAX Studio** (free, external tool): *View Metrics* shows cardinality & size; write queries (`EVALUATE SUMMARIZECOLUMNS(...)`) to inspect tables; Server Timings shows storage vs formula engine (Module 08 deep-dive).
4. **DAX query view** in Desktop can now run those same queries natively — use it to test table functions.
5. Error decoder: "single value…" = bare column in measure · circular dependency = two columns each depending on the other via CALCULATE/context transition · wrong totals = filter context logic, or `% of parent` math.

## 📘 5.7 Visual calculations (modern, visual-local DAX)
New capability: DAX attached to *one visual*, with its own tiny grid context — great for running totals & deltas without touching the model:
`Running sum = RUNNINGSUM ( [Total Sales] )` · `MoveAvg = MOVINGAVERAGE ( [Total Sales], 3 )` · `Delta = [Total Sales] - PREVIOUS ( [Total Sales] )` · helpers: `FIRST, LAST, NEXT, LOOKUP, RANGE, COLLAPSE, EXPAND`. Use for presentation-level math; keep business logic in model measures.

---

## 🧪 LAB 5 — Upgrade ShopKart (90 min)
1. Rebuild the test-bench page from Module 4; add a **Date-level matrix** (Year→Month on rows).
2. Implement patterns **1, 2, 3, 4, 5, 9, 10** from §5.5 into `_Measures` (folder `_Advanced`).
3. Dynamic title measure on a card; confirm it changes with slicers.
4. Ranking visual: bar with `Product Rank` ≤ 10 via a visual-level filter — then explain why `ALL` vs `ALLSELECTED` changes ranks when you toggle the Region slicer.
5. Write `Customers Joined` (USERELATIONSHIP) and chart it by month.
6. Bonus gauntlet: Pareto chart — column chart of sales by product (desc) + Pareto % line. When cumulative crosses 80%, roughly how many of 26 products drive the business?

## 💪 Exercises (graded sets — solutions after)
**A. Warm-up:** A1) `West 2025 Sales = ?` (two filters). A2) Rewrite high-discount orders with `COUNTROWS(CALCULATETABLE(...))`. A3) `% of Region` such that rows = City, denominator = the region total (`ALLEXCEPT` twice? or `ALL(Cities)`… solve it). 
**B. Context drills:** B1) Predict, then verify: does `CALCULATE ( [Total Sales], REMOVEFILTERS ( 'Date' ) )` change inside a Year-on-rows matrix? Why? B2) Write `Avg Customers per Month` = AVERAGEX over visible Year-Months of distinct customers. B3) Fix a report where YoY% shows -100% for future months.
**C. Boss level:** C1) Rolling 12-month sales *ending* at current month. C2) Returning customers (bought in prior 90 days, distinct count). C3) Sales of "products never sold in West" via `FILTER`+`NOT IN CALCULATETABLE`. 

### ✅ Solutions (selected)
```dax
A1 = CALCULATE ( [Total Sales], Customers[Region] = "West", 'Date'[Year] = 2025 )
A2 = COUNTROWS ( CALCULATETABLE ( Sales, Sales[Discount] >= 0.15 ) )
A3 % of Region = DIVIDE ( [Total Sales],
                          CALCULATE ( [Total Sales], ALL ( 'Customers'[City] ), VALUES ( 'Customers'[Region] ) ) )
B1 — No change per row: REMOVEFILTERS('Date') clears the row's Year filter → same grand value each row.
B2 = AVERAGEX ( VALUES ( 'Date'[Year Month] ), CALCULATE ( DISTINCTCOUNT ( Sales[CustomerID] ) ) )
B3 Guard: = VAR LY = [Sales LY] RETURN IF ( ISBLANK ( LY ), BLANK(), DIVIDE ( [Total Sales] - LY, LY ) )
C1 = CALCULATE ( [Total Sales], DATESINPERIOD ( 'Date'[Date], MAX ( 'Date'[Date] ), -12, MONTH ) )
C2 = VAR Prev90 = CALCULATETABLE ( VALUES ( Sales[CustomerID] ),
                     DATESINPERIOD ( 'Date'[Date], MIN ( 'Date'[Date] ) - 1, -90, DAY ) )
     RETURN COUNTROWS ( INTERSECT ( VALUES ( Sales[CustomerID] ), Prev90 ) )
C3 = CALCULATE ( [Total Sales],
         FILTER ( VALUES ( Products[ProductName] ),
                  NOT Products[ProductName] IN CALCULATETABLE ( VALUES ( Products[ProductName] ), Customers[Region] = "West" ) ) )
```

## ❓ Quiz
1. RESTORE vs INTERSECT — which CALCULATE behavior is default and which needs KEEPFILTERS? 2. What exactly happens in context transition (one precise paragraph)? 3. When is `VALUES` risky? 4. Why is `FILTER(ALL(Sales), ...)` a performance sin — and what's the fix? 5. `ALLSELECTED` vs `ALL` in ranking: which ignores slicers? 6. Why does a measure referenced inside `SUMX` "see" each row, but a column reference doesn't?

### ✅ Answers
1. Replace is default; KEEPFILTERS = intersect with the existing context.
2. Row context → CALCULATE converts the *column values of the current row* into equivalent filters on the model, then evaluates the expression in that new filter context (this is also why measure references trigger it: every measure is implicitly wrapped in CALCULATE).
3. It includes the blank member from broken referential integrity → phantom +1 counts / ghost rows.
4. It scans/materializes the entire fact table per evaluation. Fix: filter on *dimension columns* and let relationships reach the fact (e.g., `CALCULATE (..., Products[PriceBand]="High")` or `KEEPFILTERS` on a keys column).
5. `ALL` ignores slicers AND visual filters; `ALLSELECTED` keeps slicer/page selections — ranking adapts to the user's view.
6. Measures carry hidden CALCULATE → context transition per iterated row; raw columns sit in pure row context and never become filters by themselves.

## ✅ Mastery checklist
- [ ] I can write patterns 1–12 from memory-ish, recognizing the *shape* needed
- [ ] I explain context transition without notes (test yourself on a friend/me)
- [ ] All measures refactored to VAR/RETURN with comments
- [ ] I'm comfortable in DAX Studio / DAX query view for debugging

**Next: `Module_06_Visualization_Design.md` — make it beautiful, interactive, undeniable.**
