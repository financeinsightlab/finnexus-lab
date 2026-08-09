# T6 · Tableau for Finance: P&L, Variance Packs & Waterfalls

> *Same rules you've learned in E6, P5, S5 and M10 — now in Tableau's paintbox. Flows sum, stocks snapshot, signs normalize ONCE, variance bows to favourable/unfavourable logic. Welcome to the CFO's favorite module.*

## 🎯 Objectives
Build a signed monthly P&L from Finance_GL · budget-vs-actual with favourable/unfavourable logic · CAGR/ YoY table calcs · Gantt-bar waterfalls · balance-sheet "last value" semantics · FX conversion on the noodle.

---

## 📘 6.1 Connect the finance stack

Connect `Finance_GL.csv` (P&L + B/S monthly actuals, 2024–25), `Finance_Budget.csv` (2025 plan), `Finance_FX.csv` (monthly USDINR/EURINR/GBPINR):

- Noodle 1: GL ⟷ Budget on **MonthStart + AccountName** (both text relations — drag fields together and pick both join-clauses).
- Noodle 2: GL ⟷ FX on **MonthStart**.

Same law from PQ/SQL modules: budget months (2025 only) ≠ GL months (2024–25) — that's WHY we relate (logical layer) instead of inner-join; no month is dropped from either side.

## 📘 6.2 Sign normalization — once, centrally, forever

GL stores magnitudes as positive amounts (costs positive too). For a P&L the convention is **income positive, costs negative**:

```tableau
// SignedAmount (P&L view of GL)
CASE [Type]
WHEN 'Revenue'      THEN [Amount]
WHEN 'Other Income' THEN [Amount]
WHEN 'COGS'         THEN -[Amount]
WHEN 'OpEx'         THEN -[Amount]
ELSE [Amount]     // B/S accounts keep their sign (assets +, liab/equity as stored)
END

// Net Profit (only P&L rows count!)
SUM(IF [Statement] = 'P&L' THEN [SignedAmount] END)
```

One calc, every viz downstream stays natural — the exact same "fix once" discipline as P5's SignedAmount column. Audit window: a quick crosstab Type × Month of SUM(SignedAmount) should show costs always negative.

## 📘 6.3 The monthly P&L pack

1. Rows: `Type` → `AccountName` (hierarchy!); Columns: MONTH(MonthStart) green; Text: SUM(SignedAmount).
2. Restrict to Statement='P&L' (*Data-source filter* or quick filter — but make it data-source so nobody forgets it).
3. Add subtotal per Type: Analysis → Totals → Column Subtotals. Grand total = Net Profit row — freeze it on top via duplicate sheet if execs complain.
4. Conditional colour: SUM(SignedAmount) < 0 red, else green (drag the same measure to Color, two-step stepped).

**YoY & MoM:** quick table calc Percent Difference, then harden it into a calc (audit-friendly):

```tableau
// YoY safe (lookup 12 back, absolute denom for negative bases)
(ZN(SUM([SignedAmount])) - LOOKUP(ZN(SUM([SignedAmount])), -12))
 / ABS(LOOKUP(ZN(SUM([SignedAmount])), -12))
```

## 📘 6.4 Variance pack — Actual vs Budget

Because GL and Budget are *related*, `SUM([Finance_GL].[SignedAmount])` and `SUM([Finance_Budget].[Budget])` coexist per AccountName + month with no row duplication:

```tableau
// Variance
SUM([SignedAmount (GL)]) - SUM([Budget])

// Favourable? costs under-budget = good; income over-budget = good
IF [Type] IN ('Revenue','Other Income') THEN [Variance] >= 0
ELSE [Variance] <= 0 END
// → color: T = Favourable (green), F = Unfavourable (red)

// Variance % against Budget (ABS protects negative budgets)
DIV([Variance], ABS(SUM([Budget])))
```

Layout: Budget bar + Actual dot (dual axis with Reference 'Actual' circle) per Account × month; or the classic crosstab Budget | Actual | Var | Var%. Add a sparkline of monthly variance beside each account — one-glance habit tracking.

## 📘 6.5 Waterfall — Budget → Actual journey

The CFO chart: starting Budget → +Volume → +Price → −Cost overruns → ending Actual. Gantt-bar recipe (concept; pick any 5 bridge steps):

1. Rows: `RUNNING_SUM([Bridge])` (Bridge = signed step totals in order). Mark type **Gantt Bar**.
2. Size: `-[Bridge]` (negative so the block hangs FROM the running total down/up to the step value).
3. Columns: ordered step dimension ("Budget","Volume","Price","Costs","FX","Actual").
4. Color by step sign; label absolute value.

(For Budget/Actual endpoints make Bridge = Budget (positive) at step 1 and Actual at the last; the running-total trick works because you color/label the true values — standard Tableau-finance craft, mirrors M10's native waterfall. Walk it slowly, it clicks.)

## 📘 6.6 Balance sheet semantics — stocks, not flows

Cash, AR, AP, Inventory are **stocks at period end** — never sum months (the SAME rule as E6 last-month balance, DAX LASTDATE, SQL FIRST_VALUE-DESC):

```tableau
// Keep only the last month's mark in each quarter view (table calc filter)
LAST() == 0        // → Filters, Compute Using: Table (across), marks kept: True
```

Attach it to any B/S trend broken by quarter → "quarter-end balance", not sum-of-3-months (which would triple-count cash). Cheap, correct, interview-impressing. (With real DBs you'd rather filter `MonthStart = MAX(MonthStart)` per group via LOD: `{FIXED [AccountName]: MAX(IF quarter = view-quarter THEN [MonthStart] END)} = [MonthStart]` — same idea, heavier syntax.)

## 📘 6.7 FX-aware reporting

Related Finance_FX on MonthStart ⇒ conversion uses the month's rate:

```tableau
// P&L (converted at each month's rate, then summed) — mirror of P5 logic
SUM([Finance_GL].[SignedAmount] / [Finance_FX].[USDINR])

// NEVER SUM(amounts)/AVG(rate) for flows month-by-month; for B/S convert at period-end rate only
```

Add EURINR/GBPINR similarly; build the classic "₹ vs $" toggle via parameter + CASE (T4 muscle!).

---

## 🧪 LAB T6 — The finance pack in Tableau (75 min)

1. Connect GL + Budget + FX with the two noodles; verify row counts didn't change and budget months exist with NULL GL (expected — budgets for a month without close yet? journal which side is "extra").
2. Sign-normalize (§6.2); build the monthly P&L crosstab with red/green conditional colour and Type subtotals; export a screenshot for your close pack.
3. YoY calc (safe-deonom version) + sparkline row: Revenue by month, YoY% on tooltip.
4. Variance pack: Budget | Actual | Var | Var% | Favourable? crosstab, Account × FY-2025, formatted ₹/%; spot the single worst account.
5. Waterfall: Budget (Jan-FY25) → by Type bridges → Actual; format labels ₹ lakh (divide by 100000 in calc or format with "K/L" custom units).
6. B/S dashboard: Cash + Inventory + AP month-end with LAST()==0 per-quarter filter; prove in a side-crosstab that summing months lies (write the wrong number beside the right one).

## 💪 Exercises
1. Convert Depreciation account to a running YTD calc RUNNING_SUM; note in journals why finance needs both monthly and YTD views.
2. EBITDA-style KPI: Net Profit + Depreciation (add-back) monthly KPI card.
3. Cross-check: does `IF Type IN ('Revenue','Other Income') THEN ...` favourability match your S5 SQL CASE? Diff the two implementations in words.
4. Build the "wrong vs right" B/S cash comparison chart (summing vs LAST()==0) and publish it as "Why stocks don't sum".
5. FX: parameter switching denominator USD→EUR→GBP; spot which currency makes variance look best — comment on the ethics + audit duty.

### ✅ Selected answers
- Ex 2: `[Net Profit] - SUM(IF [AccountName]='Depreciation' THEN [SignedAmount] END)` — signed Depreciation is negative, subtracting negative = add-back. (Or compute `+ SUM(IF AccountName='Depreciation' THEN [Amount] END)`.)
- Ex 4: side-by-side bars: `SUM(Amount)` per quarter vs the filtered month-end only — bars differ ×3 for flat balances: dramatic proof.

## ❓ Quiz
1. Why sign-normalize in ONE calculated field?
2. A budget month with no GL actual yet — what does the related (not joined) data show?
3. LAST()==0 trick — flow or stock advice?
4. Favourable variance logic for OpEx: actual < budget, actual > budget, or depends?

### ✅ Answers
1. Centrality: every chart, export and audit reads identical math; one fix propagates; Sign logic lives in exactly one place (same mantra as P5's conditional column / S5's view).
2. Budget value present, GL measures NULL — relationships keep both logical tables whole; an inner join would have silently dropped the month.
3. Stocks (balance sheet). Pick the period-end observation; never sum stocks across months. LAST()==0 table-calc filter keeps the final period mark per partition.
4. Actual < budget for costs (spend less = good); reverse for income; encode per Type in one calc, not eyeball judgment per chart.

## ✅ Mastery checklist
- [ ] Signed monthly P&L with conditional colour + totals
- [ ] Variance pack with favourable logic + sparklines
- [ ] Gantt waterfall shipped (Budget→Actual bridge)
- [ ] Stocks-vs-flows proof chart created and journaled
- [ ] FX conversion + currency toggle working

**🏆 TABLEAU TRACK COMPLETE.** You now own the full viz-analyst arsenal: Excel → Power Query → SQL → Power BI → **Tableau**, finance-flavoured end to end. Update your LinkedIn — you've earned the flex. 💼✨
