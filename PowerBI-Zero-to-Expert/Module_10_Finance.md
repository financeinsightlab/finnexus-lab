# Module 10 — Power BI for Finance: P&L, Variance & Balance-Sheet DAX

> *Finance reporting is Power BI's most-paid-for use case. P&Ls have rules (signs, subtotals), balances have rules (point-in-time), and variance has rules (% + bridge). Learn them and you're dangerous in FP&A hiring.*

## 🎯 Objectives
Model a GL for reporting · signed-amount conventions · semi-additive balance measures (LASTDATE) · Actual vs Budget variance · waterfall bridges · finance-grade page design.

---

## 📘 10.1 Finance shapes: flows vs stocks

| | **P&L items** (flows) | **Balance-sheet items** (stocks) |
|---|---|---|
| Add over time? | YES — June = May+June | NO — June balance ≠ May + June |
| Measure pattern | `SUM(...)` over period | **Semi-additive**: value at *last date* in filter |
| Examples | Sales, COGS, Expenses | Cash, Inventory, Bank Loan |

Mistaking stocks for flows is the #1 finance-reporting bug. Rule: *any "balance" gets the LASTDATE treatment.*

## 📘 10.2 Model for the GL data (408 rows, 2024–25)

```
Date (marked) 1──* Finance_GL (MonthStart, AccountCode, AccountName, Statement, Type, Amount)
Date 1──* Finance_Budget (MonthStart, AccountCode, AccountName, Type, Budget)
```
Sign convention chosen for you: **income positive, costs positive in data** → reporting measures apply signs:
```dax
GL Total = SUM ( Finance_GL[Amount] )
Revenue = CALCULATE ( [GL Total], Finance_GL[Type] = "Revenue" || Finance_GL[Type] = "Other Income" )
COGS = CALCULATE ( [GL Total], Finance_GL[Type] = "COGS" )
OpEx = CALCULATE ( [GL Total], Finance_GL[Type] = "OpEx" )
Gross Profit = [Revenue] - [COGS]
Operating Income = [Gross Profit] - [OpEx]
Margin % = DIVIDE ( [Operating Income], [Revenue] )
```

## 📘 10.3 Balance-sheet (semi-additive) measures

```dax
Balance = 
CALCULATE ( SUM ( Finance_GL[Amount] ),
    Finance_GL[Statement] = "B/S",
    LASTDATE ( 'Date'[Date] ) )
Cash Balance = CALCULATE ( [Balance], Finance_GL[AccountName] = "Cash" )
Working Capital = CALCULATE ( [Balance], Finance_GL[AccountName] IN { "Cash", "Accounts Receivable", "Inventory" } )
                - CALCULATE ( [Balance], Finance_GL[AccountName] = "Accounts Payable" )
Current Ratio = DIVIDE ( [WC Assets], [WC Liabilities] )
```
LASTDATE grabs month-end within whatever the slicer spans: quarter → last month of quarter → correct stock logic automatically.

## 📘 10.4 Actual vs Budget (the FP&A heartbeat)

```dax
Budget Total = SUM ( Finance_Budget[Budget] )
Budget Revenue = CALCULATE ( [Budget Total], Finance_Budget[Type] = "Revenue" )
Variance = [Revenue] - [Budget Revenue]
Variance % = DIVIDE ( [Variance], [Budget Revenue] )
Fav/Unfav = IF ( [Variance] >= 0, "▲ Favourable", "▼ Adverse" )
Var Color = IF ( [Variance] >= 0, "#2E7D32", "#C62828" )   -- conditional-format via Field value
```
Bridge it with a **Waterfall**: Budget → Volume → Price/Mix → Cost → Actual (one waterfall = a CFO's favorite picture). Use Month on axis, Variance % data labels, colored by measure.

## 📘 10.5 Finance page anatomy (CFO-grade)

Header: *"Q3 FY26 · Operating income ₹57.2M vs budget (+3.1%)"* (dynamic title measure!) · KPI row: Revenue, Gross Margin %, Operating Income, Cash Balance (all with vs-budget chips) · Matrix P&L: Statement→Type→AccountName hierarchy, Actual/Budget/Var/Var% columns, Var% conditional color · Waterfall bridge · Line: revenue trend Actual vs Budget two lines · Cards: Working Capital + Current Ratio · slicers: Year/Quarter minimal.

---

## 🧪 LAB 10 — The ShopKart Finance Pack (90 min)

1. Import `Finance_GL.csv`, `Finance_Budget.csv`; build/mark Date table; relate via MonthStart (*many*-to-1).
2. Type checks; create `_Fin` measure folder; write all §10.2–§10.4 measures (variables + comments, folder discipline).
3. P&L matrix (hierarchy + 4 value columns with `Var Color` on Var %); B/S row of cards using `[Balance]` variants — prove to yourself that a *quarter* filter returns month-end, not sum.
4. Waterfall: Category = Type (Revenue→OpEx order via Sort-By), Value = signed income measure; then Budget-vs-Actual bridge.
5. Line chart Actual vs Budget Revenue by month; MoM variance column chart colored by sign.
6. Executive page assembled per §10.5 + mobile layout + tooltip page for account drill.
7. **Stretch:** scenario measure — `Scenario Rev = [Revenue] * (1 + WhatIf[Value])` via Modeling → New parameter.

## 💪 Exercises
1. Compute `Rolling 3M Revenue` and `Run-rate` (annualized L3M) measures.
2. Why does `SUM(Balance amounts)` across a quarter lie? Write the DAX that proves LASTDATE correctness in a month(s) matrix.
3. DSO = `DIVIDE(AR Balance, Revenue) * Days in period` — implement `DaysInPeriod = COUNTROWS('Date')` variant.
4. Duplicate tab "Dept P&L": add conditional-format data bars to Var%; which expense line is most off-plan in 2025?
5. Journal: how would multi-entity consolidation change the model? (Entity table + keys — preview of P5 lab.)

### ✅ Selected answers
- Run-rate: `DIVIDE ( [L3M Revenue], 3 ) * 12` — guard for incomplete first quarter with variables.
- DSO: `DIVIDE ( CALCULATE ( [Balance], AccountName="Accounts Receivable" ), [Revenue] ) * COUNTROWS ( 'Date' )`.

## ❓ Quiz
1. Why LASTDATE for balances and not SUM over time? 2. What visual bridges Budget → Actual? 3. Variance % formula sign for costs: favourable means…? 4. What does the what-if parameter generate behind the scenes?

### ✅ Answers
1. Balances are stocks at a point in time; adding months double-counts the same money. LASTDATE returns the period-end stock correctly at any granularity.
2. The **waterfall** chart.
3. Costs: Actual < Budget is *favourable* — sign logic flips vs revenue; handle per-Type or present absolute with labels.
4. A GENERATESERIES table + selected-value measure — a slicer the user drives.

## ✅ Mastery checklist
- [ ] GL + Budget modeling with correct granularity intuition
- [ ] Semi-additive balances verified at month/quarter/year
- [ ] Variance pack: Actual/Budget/Var/Var% + sign-aware colors + waterfall
- [ ] Screenshot → portfolio (finance pack = strongest hiring asset)

**Next: `PQ_05_Finance.md` — build the finance data engine this module consumed.**
