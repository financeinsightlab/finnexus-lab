# S1 · SQL Foundations: SELECT, WHERE, ORDER BY — Read Any Database

> *SQL is the language of data itself. Power BI pulls from databases, Excel pulls from databases, every backend stores in one. Learn SQL and no dataset is locked to you ever again.*

## 🎯 Objectives
Understand relational tables · write SELECT/WHERE/ORDER BY/LIMIT · filter with dates, text, NULLs correctly · run your first 20 queries on `ShopKart.db`.

---

## 📘 1.1 The mental model

A database = Excel workbook; a **table** = one sheet with strict column types; a **row** = record; a **column** = field. SQL = the instructions you send: "give me these columns, from that table, where these rules hold, sorted like this." The engine does the work; you declare *what*, not *how*.

## 📘 1.2 The skeleton (memorize the classroom order)

```sql
SELECT CustomerName, Segment, Region   -- what columns (or * for all)
FROM Customers                          -- from which table
WHERE Region = 'West'                   -- keep which rows
ORDER BY CustomerName ASC               -- sort (ASC default, DESC flips)
LIMIT 10 OFFSET 5;                      -- SQLite/Postgres: first 10 after skipping 5
```
**Logical execution order (interview favorite):** FROM → WHERE → GROUP BY → HAVING → SELECT → ORDER BY → LIMIT. That's why you can't use a SELECT alias in the same WHERE.

## 📘 1.3 Filtering with WHERE — the 90% toolkit

```sql
Region = 'West'                         -- equality (text in single quotes)
Quantity >= 3 AND Discount = 0          -- AND / OR / NOT  (parenthesize mixed logic!)
Region IN ('North', 'South')            -- set membership
Quantity BETWEEN 2 AND 5                -- inclusive range
ProductName LIKE 'Laptop%'              -- start-with ( % = any run, _ = one char )
ProductName LIKE '%mouse%'              -- contains
Discount IS NULL                        -- NEVER write = NULL (NULL means "unknown")
COALESCE(Discount, 0)                   -- swap NULL for a value on the fly
```
**NULL rules:** comparisons with NULL return *unknown*, not true/false → those rows vanish. `= NULL` matches nothing ever. This causes more beginner bugs than everything else combined.

## 📘 1.4 Derived columns & aliases

```sql
SELECT ProductID, Quantity, UnitPrice,
       Quantity * UnitPrice AS LineTotal,      -- computed column, named
       UPPER(Region) AS RegionUpper            -- string functions (UPPER, LOWER, LENGTH, TRIM, SUBSTR)
FROM Sales;
-- dates (SQLite): strftime('%Y', OrderDate), date(OrderDate,'+7 days'), julianday(a)-julianday(b)
```
Comments: `-- line comment` or `/* block */`. End statements with `;`.

## 📘 1.5 DISTINCT & small bites

`SELECT DISTINCT Region FROM Customers;` — uniques. `SELECT COUNT(DISTINCT CustomerID) FROM Sales;` — preview of aggregations (S2). `LIMIT`/`TOP`/`FETCH FIRST` differ by dialect: SQLite = LIMIT; SQL Server = TOP n; always check your engine.

---

## 🧪 LAB 1 — Interrogate ShopKart (40 min)

**Setup (one time):** Install **DB Browser for SQLite** (free) → Open Database → `datasets/ShopKart.db` → "Execute SQL" tab. (Or use VS Code's SQLite extension / any online SQLite runner by uploading the file.)

Run each, predict first, verify:
```sql
SELECT * FROM Products LIMIT 5;
SELECT ProductName, UnitPrice FROM Products WHERE Category = 'Electronics' ORDER BY UnitPrice DESC;
SELECT Region, Segment FROM Customers WHERE City IN ('Delhi','Mumbai');
SELECT OrderID, OrderDate FROM Sales WHERE Quantity >= 7 AND Discount > 0 ORDER BY OrderDate;
SELECT COUNT(*) AS OrderCount FROM Sales;                       -- whole fact table, one number
SELECT ProductName FROM Products WHERE ProductName LIKE '%Laptop%';
SELECT CustomerID, COALESCE(Discount,0) FROM Sales LIMIT 10;
-- date slicing:
SELECT * FROM Sales WHERE OrderDate BETWEEN '2025-01-01' AND '2025-03-31';
SELECT strftime('%Y-%m', OrderDate) AS Month, COUNT(*) FROM Sales GROUP BY Month LIMIT 6;
```

## 💪 Exercises
1. All products priced between 5,000 and 15,000, cheapest first.
2. Customers whose names start with 'A' in the South or East.
3. Orders *not* from West, under quantity 3, with any discount.
4. Every distinct discount value in Sales.
5. The 10 most recent orders of 2024.
6. Write a query that *fails* because of `= NULL`, fix it with `IS NULL` (check Discount).

### ✅ Selected answers
- Ex 2: `WHERE CustomerName LIKE 'A%' AND Region IN ('South','East')`
- Ex 5: `WHERE OrderDate BETWEEN '2024-01-01' AND '2024-12-31' ORDER BY OrderDate DESC LIMIT 10`

## ❓ Quiz
1. Why does the execution order matter (FROM→WHERE→SELECT→ORDER BY)? 2. `LIKE '_ouse'` matches what? 3. Why `IS NULL`, not `= NULL`? 4. Difference WHERE vs HAVING (preview)?

### ✅ Answers
1. Aliases made in SELECT aren't visible to WHERE because WHERE runs first; ORDER BY runs after SELECT so aliases work there.
2. One char + "ouse": 'Mouse', 'House' — `_` is exactly one character.
3. NULL means "unknown": unknown = anything → unknown → excluded. IS NULL tests existence of unknown-ness.
4. WHERE filters *rows before grouping*; HAVING filters *groups after* — S2 unlocks it.

## ✅ Mastery checklist
- [ ] 20 queries run against ShopKart.db with output sanity-checked
- [ ] Text/date/NUL L filters from memory
- [ ] Execution order recited while writing

**Next: `SQL_02_Joins_Aggregations.md` — where SQL starts feeling like analysis, not lookup.**
