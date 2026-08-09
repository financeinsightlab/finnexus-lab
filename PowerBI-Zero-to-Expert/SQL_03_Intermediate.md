# S3 · Intermediate SQL: Subqueries, CTEs & Window Functions

> *This module is the pivot from "can query" to "writes SQL others steal". Windows especially — they power running totals, period-over-period, top-N-per-group.*

## 🎯 Objectives
CASE WHEN logic columns · subqueries (scalar/IN/EXISTS/correlated) · clean, readable CTE chains · window functions end-to-end · set operations.

---

## 📘 3.1 CASE — the if/else of SQL

```sql
SELECT ProductName,
       CASE WHEN UnitPrice >= 15000 THEN 'High'
            WHEN UnitPrice >= 3000  THEN 'Mid'
            ELSE 'Low' END AS PriceBand,
       CASE Category WHEN 'Electronics' THEN 1 ELSE 0 END AS IsElec
FROM Products;
```
Two forms: searched (`CASE WHEN cond THEN…`) / simple (`CASE col WHEN val THEN…`). Works inside aggregates: `SUM(CASE WHEN Region='West' THEN rev ELSE 0 END)` = conditional aggregation — the SQL twin of CALCULATE.

## 📘 3.2 Subqueries — a query inside a query

```sql
-- scalar: one cell
SELECT * FROM Sales WHERE UnitPrice > (SELECT AVG(UnitPrice) FROM Sales);
-- IN: membership against a derived set
SELECT * FROM Products WHERE ProductID IN
  (SELECT ProductID FROM Sales GROUP BY ProductID HAVING SUM(Quantity) > 100);
-- EXISTS: semi-join existence test (fast, no duplicates)
SELECT c.* FROM Customers c
WHERE EXISTS (SELECT 1 FROM Sales s WHERE s.CustomerID = c.CustomerID);
-- correlated: inner references outer row-by-row (elegant, often slower)
SELECT s.* FROM Sales s
WHERE s.Quantity > (SELECT AVG(x.Quantity) FROM Sales x WHERE x.ProductID = s.ProductID);
```
NOT IN/NOT EXISTS carry a NULL grenade (NOT IN with a NULL in the set returns nothing ever — prefer NOT EXISTS).

## 📘 3.3 CTEs — readable pipelines (`WITH`)

```sql
WITH Rev AS (
  SELECT strftime('%Y-%m', OrderDate) AS Month,
         SUM(Quantity * UnitPrice * (1-Discount)) AS Revenue
  FROM Sales GROUP BY Month
),
BigMonths AS (SELECT * FROM Rev WHERE Revenue > 500000)
SELECT * FROM BigMonths ORDER BY Month;
```
Same power as nested subqueries, 10× readability — stages named like Applied Steps. Recursive CTEs (`WITH RECURSIVE`) generate series/dates — research topic, one-line mention.

## 📘 3.4 Window functions — rows keep their identity while aggregating

`OVER (PARTITION BY group ORDER BY time ROWS/RANGE …)`

```sql
SELECT OrderDate, Revenue,
  SUM(Revenue)  OVER (ORDER BY OrderDate)                 AS RunningTotal,
  AVG(Revenue)  OVER (ORDER BY OrderDate ROWS BETWEEN 2 PRECEDING AND CURRENT ROW) AS MovAvg3,
  LAG(Revenue, 1) OVER (ORDER BY OrderDate)               AS PrevMonth,
  FIRST_VALUE(Revenue) OVER (ORDER BY OrderDate)          AS FirstValue
FROM MonthlyRev;
SELECT Region, ProductName, Revenue,
  ROW_NUMBER() OVER (PARTITION BY Region ORDER BY Revenue DESC) AS RN,
  RANK()       OVER (PARTITION BY Region ORDER BY Revenue DESC) AS Rk,
  NTILE(4)     OVER (ORDER BY Revenue DESC)               AS Quartile
FROM RegionProductRev;
```
- `ROW_NUMBER` unique 1..n · `RANK` shares ties & gaps · `DENSE_RANK` ties without gaps.
- Growth math: `(Revenue - LAG(Revenue) OVER w) / LAG(Revenue) OVER w` = YoY/MoM in pure SQL.
- Top-N-per-group = wrap ROW_NUMBER in CTE and filter `WHERE RN <= 3` (The Pattern).

## 📘 3.5 Set operations

`UNION` (stack + dedupe), `UNION ALL` (stack, keep dups — faster, usually right), `INTERSECT`, `EXCEPT`. Column-count/types must match; names come from the first SELECT.

---

## 🧪 LAB 3 — Analytics-grade ShopKart queries (60 min)

1. Monthly revenue CTE → **RunningTotal** and **MovAvg3** windows over it; sanity-check the first two months' avg manually.
2. `PrevMonth` via LAG → `MoM% = (cur - prev)/prev`, blank-safe with NULLIF(prev,0).
3. YoY: LAG with offset 12 on the monthly CTE (months contiguous — confirm!) → YoY %.
4. **Top-3 products per Region** by revenue: build region×product revenue CTE → ROW_NUMBER partition → filter.
5. PriceBand CASE on Products → customer count per band per Region (conditional aggregation with SUM(CASE WHEN)).
6. EXISTS audit: customers who never bought (NOT EXISTS) — count and list (expected 0 or small; note what it *means* in RL).

## 💪 Exercises
1. Months above the *average month revenue* (scalar subquery approach) vs CTE approach — feel the readability.
2. `DENSE_RANK` categories by units regionally; find ties.
3. Cumulative **% of total revenue** per product sorted desc (window sums) — a Pareto column.
4. `INTERSECT`: customers buying both Electronics AND Appliances (two IN subqueries intersected) vs EXISTS — try both.
5. Detect the NOT IN NULL trap deliberately with a tiny demo table in a temp query.

### ✅ Selected answers
- Pareto: `SUM(Revenue) OVER (ORDER BY Revenue DESC) / SUM(Revenue) OVER ()` → cumulative share.
- Elect+Appl: `SELECT CustomerID FROM Sales WHERE CustomerID IN (…,p.Category='Electronics') INTERSECT SELECT … 'Appliances'`.

## ❓ Quiz
1. CTE vs nested subquery — same power, what changes? 2. ROW_NUMBER vs RANK vs DENSE_RANK ties? 3. Why NOT EXISTS > NOT IN? 4. What does `OVER ()` alone mean?

### ✅ Answers
1. Readability & reuse: named stages you can reference multiple times; optimizer treats them alike.
2. ROW_NUMBER never ties (arbitrary order within ties), RANK ties share a number and skips the next, DENSE_RANK ties share and doesn't skip.
3. A single NULL in the NOT IN list negates everything (three-valued logic); NOT EXISTS is NULL-safe.
4. Window over **all rows** — grand aggregates without collapsing detail (e.g., % of total inline).

## ✅ Mastery checklist
- [ ] LAG-based YoY/MoM written unaided
- [ ] Top-N-per-group pattern on demand
- [ ] Conditional aggregation inside CASE+SUM
- [ ] Queries organized as CTE chains by habit

**Next: `SQL_04_Advanced.md` — views, indexes, plans, transactions, optimization — the DBA-worthy layer.**
