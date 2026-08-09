# S4 · Advanced SQL: Views, Indexes, Plans, Transactions & Optimization

> *The senior layer: make data reusable (views), make it fast (indexes), make it trustworthy (transactions), and read the optimizer's mind (plans).*

## 🎯 Objectives
Create views & materialized thinking · understand B-tree indexes & when they fail · EXPLAIN query plans · transactions & integrity · the optimization playbook · enterprise objects overview.

---

## 📘 4.1 Views — saved queries as virtual tables

```sql
CREATE VIEW vw_MonthlyRevenue AS
SELECT strftime('%Y-%m', s.OrderDate) AS Month,
       SUM(s.Quantity * s.UnitPrice * (1 - s.Discount)) AS Revenue
FROM Sales s GROUP BY Month;
-- now anyone: SELECT * FROM vw_MonthlyRevenue WHERE Month >= '2025-01';
```
Views = logic reuse + security boundary (expose columns, hide the table). *Materialized views* (Postgres/Oracle/SQL Server indexed views) store pre-computed results — the database world' aggregations (hi, Power BI!).

## 📘 4.2 Indexes — the B-tree superpower (and its kryptonite)

```sql
CREATE INDEX idx_sales_date ON Sales (OrderDate);
CREATE INDEX idx_sales_cust ON Sales (CustomerID, OrderDate);   -- composite: left-prefix rule
```
- Index = sorted structure: WHERE/JOIN on indexed column = phone-book lookup instead of full scan (1000× on big tables).
- **Left-prefix rule:** `(CustomerID, OrderDate)` serves `CustomerID` and `(CustomerID+OrderDate)` filters, **not** OrderDate alone.
- Kryptonite: functions on indexed columns (`WHERE strftime('%Y', OrderDate)='2025'` defeats the index → SARGable rewrite: `WHERE OrderDate >= '2025-01-01' AND OrderDate < '2026-01-01'`), wildcards like `'%abc'` (leading %) , small tables (scan is cheaper), write-heavy tables (indexes cost on INSERT/UPDATE).

## 📘 4.3 EXPLAIN — x-ray the optimizer

```sql
EXPLAIN QUERY PLAN
SELECT c.Region, SUM(s.Quantity) FROM Sales s JOIN Customers c USING(CustomerID)
WHERE s.OrderDate >= '2025-01-01' GROUP BY c.Region;
```
Look for: `SCAN` (full table read) vs `SEARCH ... USING INDEX`, join *order* (small first), "temporary b-tree" (extra sort work). Read plans before blaming hardware.

## 📘 4.4 Transactions — all or nothing (ACID)

```sql
BEGIN;
UPDATE Products SET UnitPrice = UnitPrice * 1.05 WHERE Category = 'Electronics';
DELETE FROM Sales WHERE OrderDate < '2020-01-01';
COMMIT;                                  -- or ROLLBACK;
```
Atomicity (all-or-nothing), Consistency (rules hold), Isolation (other readers see pre-commit state), Durability (committed = permanent). Wrap multi-writes; test on a copy first. Isolation levels (`READ COMMITTED`, `SERIALIZABLE`) matter at scale — enterprise databases vary.

## 📘 4.5 Integrity & shape objects

- **Constraints:** PRIMARY KEY, FOREIGN KEY … REFERENCES, UNIQUE, NOT NULL, CHECK (`Price > 0`).
- **Triggers:** auto-run on INSERT/UPDATE/DELETE (audit logs, totals maintenance) — powerful, debugging-hostile; use sparingly.
- **Stored procedures & functions** (SQL Server/Postgres): parameterized server-side logic — sqlite lacks them; dialect-aware enterprise topic.
- **Temp tables / table variables** for staging within a session.

## 📘 4.6 The optimization playbook (interview-ready list)

1. **SARGable predicates** (no functions on filtered columns).
2. Select exactly what you need — `SELECT *` forces extra I/O and kills covering-index chances.
3. Index the join + filter columns; composites follow the left-prefix rule; drop unused indexes.
4. EXISTS for semi-joins beats IN on big sets; avoid correlated subqueries on large tables (rewrite as joins/windows).
5. Aggregate early, join late — shrink rows before the expensive operation.
6. Keep stats updated (ANALYZE); partition giant tables by date; measure with plans, not vibes.

---

## 🧪 LAB #S4 — Production-grade ShopKart (60 min)

1. Create `vw_MonthlyRevenue` (above) + `vw_CustomerLTV` (per-customer totals) → query both with filters.
2. Plan hunt: EXPLAIN `WHERE strftime('%Y', OrderDate)='2025'` → note SCAN. Add `idx_sales_date`; rewrite SARGably (`BETWEEN '2025-01-01' AND '2025-12-31'`); EXPLAIN again → watch the plan change.
3. Composite index experiment: create `(CustomerID, OrderDate)`; EXPLAIN a CustomerID-only query vs an OrderDate-only query — record the left-prefix proof.
4. Transaction drill: BEGIN → raise prices 5% on Furniture → SELECT check → ROLLBACK → SELECT again (history untouched). Repeat with COMMIT.
5. Integrity: try `INSERT INTO Sales (CustomerID…) VALUES (999…)` → FK blocks it (if enforced via `PRAGMA foreign_keys=ON`) — document why referential integrity is sacred. Drop your indexes at the end for downstream labs (`DROP INDEX`), journal why indexes are a tradeoff, not a checkbox.

## 💪 Exercises
1. Design the index(es) for "all 2025 orders of a given product" — two columns, right order; defend.
2. A colleague's query is slow: `SELECT * FROM Sales WHERE UPPER(PaymentType)='UPI'` — diagnose & rewrite both query + (better) data fix.
3. Rewrite a correlated subquery as a window-function version — compare plan text.
4. Create a view that hides raw `UnitPrice` and exposes price bands + revenue — a security pattern.
5. Journal: three scenarios where you would *avoid* adding an index.

### ✅ Selected answers
- Ex 1: `(ProductID, OrderDate)` or `(OrderDate, ProductID)`? Filter equality on ProductID + range on OrderDate → equality first, range second: **(ProductID, OrderDate)**.
- Ex 2: SARGable kill: precompute/store normalized value or `WHERE PaymentType IN ('UPI','upi')` case-insensitively only if collation allows; best: fix data to a canonical case.

## ❓ Quiz
1. Left-prefix rule in one sentence? 2. What does a full SCAN in a plan mean for table size vs selectivity? 3. Why COMMIT/ROLLBACK both exist in transactions? 4. Materialized vs normal view?

### ✅ Answers
1. A composite index `(a,b)` serves queries filtering on `a` alone AND `(a,b)` — but not on `b` alone.
2. Engine reads the entire table — fine for small/high-selectivity queries, a red flag for big tables when you expected an index seek.
3. COMMIT makes the *whole unit* permanent; ROLLBACK undoes the *whole unit* — atomicity's two outcomes.
4. Normal view = stored SQL, computed at query time; materialized = stored results (fast reads, needs refresh) — enterprise aggregation pattern.

## ✅ Mastery checklist
- [ ] Indexes created justifiably + plans read aloud
- [ ] Transaction test (commit vs rollback) done twice
- [ ] Optimization rules applied to three real queries
- [ ] Security-view pattern understood

**Next: `SQL_05_Finance.md` — the finance finale: trial balances, variance, fiscal logic, reconciliation in pure SQL.**
