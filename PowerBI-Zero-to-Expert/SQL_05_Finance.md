# S5 · SQL for Finance: GL Reporting, Variance, Fiscal Logic & Reconciliation

> *The payoff module: write the queries a finance system runs on — P&L from a GL, Actual-vs-Budget packs, fiscal calendars, running balances, and month-end reconciliation.*

## 🎯 Objectives
Sign-normalize finance data in SQL · aggregate GL into P&L lines · full-outer variance · fiscal year logic · semi-additive balances with windows · reconciliation (the month-end closer skill).

---

## 📘 5.1 Sign convention once, centrally (doctor's orders: in a view)

Finance exports typically hold positive amounts + a `Type` classifier. Normalize in a view so every downstream query writes natural math:

```sql
CREATE VIEW vw_GL AS
SELECT MonthStart, AccountCode, AccountName, Statement, Type, Amount,
  CASE WHEN Type IN ('Revenue','Other Income','Liability','Equity') THEN Amount
       ELSE -Amount END AS SignedAmount
FROM FinanceGL;
```

## 📘 5.2 P&L aggregation — CASE-conditional grouping

```sql
SELECT MonthStart,
  SUM(CASE WHEN Type IN ('Revenue','Other Income') THEN Amount ELSE 0 END) AS TotalIncome,
  SUM(CASE WHEN Type = 'COGS'  THEN Amount ELSE 0 END)                        AS COGS,
  SUM(CASE WHEN Type = 'OpEx'  THEN Amount ELSE 0 END)                        AS OpEx
FROM FinanceGL
WHERE Statement = 'P&L'
GROUP BY MonthStart
ORDER BY MonthStart;
-- derived: Gross = TotalIncome - COGS; Operating = Gross - OpEx; Margin% = Operating/TotalIncome
```

## 📘 5.3 Actual ⟷ Budget variance (FULL OUTER lives here)

SQLite-template (Postgres/SQL Server use FULL JOIN natively):

```sql
WITH A AS (
  SELECT MonthStart, AccountCode, MAX(AccountName) AccountName, SUM(Amount) Actual
  FROM FinanceGL WHERE Statement='P&L' GROUP BY MonthStart, AccountCode
),
B AS (
  SELECT MonthStart, AccountCode, MAX(AccountName) AccountName, SUM(Budget) Budget
  FROM FinanceBudget GROUP BY MonthStart, AccountCode
),
U AS (
  SELECT COALESCE(a.MonthStart,b.MonthStart) MonthStart,
         COALESCE(a.AccountCode,b.AccountCode) AccountCode,
         COALESCE(a.AccountName,b.AccountName) AccountName,
         COALESCE(a.Actual,0) Actual, COALESCE(b.Budget,0) Budget
  FROM A a LEFT JOIN B b ON a.MonthStart=b.MonthStart AND a.AccountCode=b.AccountCode
  UNION
  SELECT COALESCE(a.MonthStart,b.MonthStart), COALESCE(a.AccountCode,b.AccountCode),
         COALESCE(a.AccountName,b.AccountName), COALESCE(a.Actual,0), COALESCE(b.Budget,0)
  FROM B b LEFT JOIN A a ON a.MonthStart=b.MonthStart AND a.AccountCode=b.AccountCode
  WHERE a.AccountCode IS NULL
)
SELECT *, Actual - Budget AS Variance,
       ROUND(100.0 * (Actual - Budget) / NULLIF(Budget,0), 1) AS VariancePct
FROM U ORDER BY MonthStart, ABS(Variance) DESC;
```
Favourability flips by Type (cost vs revenue): add a `CASE` for a Fav/Unfav column — sign logic *with* the numbers, not in your head.

## 📘 5.4 Fiscal years in SQL (April–March)

```sql
SELECT *,
  CASE WHEN CAST(strftime('%m', MonthStart) AS INT) >= 4
       THEN 'FY' || strftime('%Y', MonthStart) || '-'
                 || substr(strftime('%Y', date(MonthStart,'+1 year')),3,2)
       ELSE 'FY' || strftime('%Y', date(MonthStart,'-1 year')) || '-'
                 || substr(strftime('%Y', MonthStart),3,2)
  END AS FiscalYear
FROM FinanceGL;
-- then group BY FiscalYear, FiscalQtr (same CASE pattern on month → quarter)
```

## 📘 5.5 Running position & semi-additive balances

Stocks use *last observation in period* (same rule as DAX LASTDATE):

```sql
WITH bs AS (SELECT * FROM FinanceGL WHERE Statement='B/S')
SELECT MonthStart, AccountName, Amount,
  SUM(Amount) OVER (PARTITION BY AccountName ORDER BY MonthStart) AS Cumulative_buildup,  -- flows only! educationnal
  FIRST_VALUE(Amount) OVER (PARTITION BY AccountName ORDER BY MonthStart DESC) AS PeriodEndValue
FROM bs;
-- Max month per account (classic anti-window pattern):
SELECT b.* FROM bs b JOIN (SELECT AccountName, MAX(MonthStart) m FROM bs GROUP BY AccountName) t
  ON b.AccountName=t.AccountName AND b.MonthStart=t.m;
-- Running bank balance from transactions:
SELECT txnDate, Amount, SUM(Amount) OVER (ORDER BY txnDate, txnId) AS RunningBalance FROM BankTxns;
```

## 📘 5.6 Reconciliation — the month-end closer ritual

- GL vs Bank: entries in GL not in statement (LEFT joins anti-pattern) + vice-versa.
- Duplicate detector: `GROUP BY MonthStart, AccountCode HAVING COUNT(*)>1`.
- Trial-balance tie-out: `SUM(debits) = SUM(credits)` — a one-line CHECK query.
- Cut-off check: transactions after period-end but dated inside → `WHERE PostingDate > PeriodEnd AND TxnDate <= PeriodEnd`.

---

## 🧪 LAB S5 — The Finance Pack in SQL (75 min, tables live in `ShopKart.db`: FinanceGL, FinanceBudget, FX)

1. Create `vw_GL` (signed) → monthly P&L aggregate → compute Gross/Operating/Margin columns on top via outer SELECT over that CTE.
2. Full **variance pack** (§5.3) for 2025: add a Fav/Unfav CASE per Type; export mentally earlier vs Power BI M10 version — journal 3 pros/cons SQL-vs-DAX for finance packs.
3. Fiscal columns (§5.4) + FiscalQtr; produce **FY totals** by Type sorted FY → Type desc.
4. Balances: for **Cash**, produce PeriodEndValue per quarter (window DESC over quarter boundary) — verify April end ≠ sum of 3 months.
5. FX: monthly USDINR via join on MonthStart → convert a fabricated 2025 USD expense table (create temp) to INR.
6. Recon drills: duplicates check on FinanceGL; tie-out `SUM(CASE WHEN Type IN ('Revenue','Other Income')…)` vs costs side totals as the TB analog; write 3 month-end checklist queries of your own.

## 💪 Exercises
1. Top 5 variance-risks: accounts with avg |Variance%| > 8% in 2025.
2. Contra entries pattern: accounts whose sign flipped between two consecutive months (LAG sign check).
3. 12-month rolling OpEx per month using windows on the P&L CTE.
4. Reconciliation count table: GL rows vs Bank rows per month with the anti-counts side-by-side.
5. Journal: why is the TB tie-out the cheapest fraud/error detector in accounting?

### ✅ Selected answers
- Ex 2: `CASE WHEN SIGN(cur)=SIGN(prev)…` via LAG(SignedAmount) — flag flips; they're the classic cut-off/reclass red flags.
- Ex 3: `AVG(OpEx) OVER (ORDER BY MonthStart ROWS BETWEEN 11 PRECEDING AND CURRENT ROW)` on monthly OpEx.

## ❓ Quiz
1. Why sign-normalize in a view instead of every query? 2. Balances need LAST-observation: state the window pattern. 3. FULL OUTER variance: the two cases it saves? 4. Give 2 reconciliation SQL checks.

### ✅ Answers
1. Centralized convention → fixes propagate, all consumers share identical numbers, audits read one place.
2. `FIRST_VALUE(Amount) OVER (PARTITION BY Account ORDER BY MonthStart DESC)` (or latest-month join) within the period.
3. Budgeted-but-unspent lines and spent-but-unbudgeted lines — both must surface as variance, not vanish.
4. Duplicate periods per account; debit/credit tie-out; GL-vs-bank anti-counts; cut-off dated-after-close entries.

## ✅ Mastery checklist
- [ ] P&L & variance & fiscal packs written from scratch on ShopKart.db
- [ ] Balance queries respect last-observation semantics
- [ ] Reconciliation toolkit documented for a month-end close
- [ ] One finance pack compared SQL vs DAX with honest verdicts

**SQL track complete. 🏆 You now command the full data stack: Excel → Power Query → SQL → Power BI/DAX — finance-flavored end to end.**
