# S2 · Joins & Aggregations: GROUP BY, HAVING & Sticking Tables Together

> *One table answers questions. Joins + GROUP BY answer *business* questions: revenue by region, top customers, category share — the analytics paychecks.*

## 🎯 Objectives
Master the aggregate five + COUNT variants · GROUP BY / HAVING fluently · join confidently (inner/left/right/full/cross) · combine both in real reporting queries.

---

## 📘 2.1 Aggregation: collapse rows into answers

```sql
SELECT COUNT(*) AS Orders,            -- row count
       SUM(Quantity) AS Units,        -- totals
       AVG(UnitPrice) AS AvgPrice,
       MIN(OrderDate) AS FirstOrder, MAX(OrderDate) AS LastOrder,
       COUNT(DISTINCT CustomerID) AS Customers
FROM Sales;
```
`SUM/AVG/MIN/MAX` etc. ignore NULLs (except COUNT(*) which counts all rows; COUNT(col) skips NULLs — sneaky interview question).

## 📘 2.2 GROUP BY — buckets first, then aggregate

```sql
SELECT Region, COUNT(*) AS Customers
FROM Customers
GROUP BY Region
HAVING COUNT(*) >= 3            -- filter the GROUPS (WHERE filters rows pre-group)
ORDER BY Customers DESC;
```
**The unbreakable law:** every SELECTed column must be either (a) in GROUP BY, or (b) inside an aggregate. Order of writing: `SELECT … FROM … WHERE … GROUP BY … HAVING … ORDER BY`. Grouping keys appear exactly; expressions group logically (`GROUP BY strftime('%Y-%m', OrderDate)`).

## 📘 2.3 Joins — merging tables on keys

```sql
SELECT s.OrderID, s.OrderDate, p.ProductName, p.Category
FROM Sales s
INNER JOIN Products p ON s.ProductID = p.ProductID;
```

| Join | Keeps |
|---|---|
| **INNER JOIN** | only matches on both sides |
| **LEFT JOIN** | all left rows + right matches (NULL padding) — the reporting default |
| **RIGHT JOIN** | mirror of LEFT (rarely used; flip the tables instead) |
| **FULL OUTER JOIN** | everything both sides (SQLite: emulate with LEFT JOIN + UNION + RIGHT) |
| **CROSS JOIN** | every row × every row (test grids, date scaffolding) |

Aliases `s` / `p` keep queries readable. Multi-join chains: Sales → Products → and → Customers in one FROM.

## 📘 2.4 Anti-patterns via joins

- Orphans (sales with no matching product): `LEFT JOIN Products … WHERE p.ProductID IS NULL` — the SQL anti-join (same idea as Power Query's Left Anti!).
- Duplicates from one-to-many joins: joining at wrong grains multiplies rows → check row counts before/after; `COUNT` vs `COUNT(DISTINCT …)` tells the story.

## 📘 2.5 Combined pattern you will type forever

```sql
SELECT c.Region,
       p.Category,
       SUM(s.Quantity * s.UnitPrice * (1 - s.Discount)) AS Revenue
FROM Sales s
JOIN Customers c ON s.CustomerID = c.CustomerID
JOIN Products  p ON s.ProductID  = p.ProductID
WHERE s.OrderDate >= '2025-01-01'
GROUP BY c.Region, p.Category
HAVING SUM(s.Quantity) > 10
ORDER BY Revenue DESC;
```

---

## 🧪 LAB 2 — ShopKart business answers (50 min)

1. Units & revenue (with discount math) **by Region** for 2025, best first.
2. Revenue by **Category × YearMonth** (group by `strftime('%Y-%m', OrderDate)`), limited to Electronics+Appliances.
3. **Average order value** per Segment: `SUM(rev)/COUNT(DISTINCT OrderID)` grouped by Segment.
4. Top 5 **customers** by lifetime revenue with their names and cities (join, group, order, limit).
5. Orphan audit: any Sales rows without Customer or Product matches? (Two anti-join queries; both should return 0 — why is 0 the *right* answer?)
6. Targets vs actuals quickie: total `SalesTarget` by Region (Targets table) vs 2025 achieved revenue per region (two different grains — journal the care needed; S5 and Power BI M10 own this properly).

## 💪 Exercises
1. Categories sorted by **average discount %** given (AVG of Discount).
2. Months where revenue dropped vs the *previous* month — using only GROUP BY + HAVING tricks (hint: not trivial without window functions; attend S3 for the clean solution).
3. Customers count per City where count > 1, cities alphabetically.
4. Revenue share: category revenue / **grand total** inline (subquery `SELECT SUM(...)` without group) — write it two ways.
5. Join chain sanity: Sales join Products vs Sales join Products join Customers — verify row counts stay 1300 in both (why does Customer join not change the count?).

### ✅ Selected answers
- Ex 3: `SELECT City, COUNT(*) FROM Customers GROUP BY City HAVING COUNT(*)>1 ORDER BY City;`
- Ex 5: one-to-many join with unique keys on the "one" side never multiplies rows — that's why PK/UK matters.

## ❓ Quiz
1. WHERE vs HAVING in one line each. 2. Why can a LEFT JOIN show NULLs on the right side? 3. The law of SELECT inside GROUP BY queries? 4. COUNT(*) vs COUNT(col)?

### ✅ Answers
1. WHERE filters rows before grouping; HAVING filters groups after aggregation.
2. No match found → left row survives with right columns padded NULL — that's literally the point of LEFT joins (find matches *if any*).
3. Columns must be group keys or aggregated — otherwise the engine can't know *which* row's value to show.
4. COUNT(*) counts all rows incl. NULL-col rows; COUNT(col) skips rows where col is NULL.

## ✅ Mastery checklist
- [ ] Group+aggregate queries written without syntax trips
- [ ] Two-table and three-table joins chained comfortably
- [ ] Row-count checks habitual before reporting any join result
- [ ] Anti-join audit query memorized

**Next: `SQL_03_Intermediate.md` — subqueries, CTEs, window functions (the promotion to "writes clever SQL").**
