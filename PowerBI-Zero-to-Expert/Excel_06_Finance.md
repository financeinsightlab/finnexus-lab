# E6 · Excel for Finance: Loans, NPV/IRR & Financial Modeling

> *Finance teams live in Excel. These functions and patterns are what analysts in banks, FP&A and CA firms use every single day — and what interviews test.*

## 🎯 Objectives
Time-value-of-money functions · build a loan amortization schedule · value projects with NPV/IRR/XIRR · depreciation & ratios · model best practices used in real financial models.

---

## 📘 F1. The time-value toolkit (memorize signatures)

| Function | Computes | Signature |
|---|---|---|
| `PMT` | Loan EMI (payment) | `PMT(rate/12, years*12, -principal)` |
| `IPMT` | Interest part of payment n | `IPMT(rate/12, n, years*12, -pv)` |
| `PPMT` | Principal part of payment n | `PPMT(rate/12, n, years*12, -pv)` |
| `FV` | Future value | `FV(rate, nper, pmt, -pv)` |
| `PV` | Present value | `PV(rate, nper, pmt)` |
| `RATE` | Implied rate | `RATE(nper, pmt, -pv)` |
| `NPER` | How many periods | `NPER(rate, pmt, -pv)` |

💡 Sign convention: money out = **negative**. `PMT(9.5%/12, 60, -5000000)` → ₹1,05,012 (L1's EMI).

## 📘 F2. Loan amortization — the classic build

Per row (period n): EMI = `PMT(...)` (locked with $) · Interest = `IPMT(...)` or `Balance_prev * rate/12` · Principal = `EMI - Interest` (or `PPMT`) · New Balance = `Balance_prev - Principal` · checks: final balance → 0. Add `CUMIPMT(rate/12,60,-pv,1,n,0)` for "total interest till now" — the number that shocks borrowers.

## 📘 F3. Valuing a project: NPV, IRR, and their date-aware siblings

```excel
=NPV(12%, B4:B9) + B3          -- B3 = initial outlay (negative). NPV() pockets flows END of period 1+
=IRR(B3:B9)                    -- rate where NPV = 0 (needs one sign change)
=XNPV(12%, flows, dates)       -- irregular/real dates — the honest one
=XIRR(flows, dates)            -- irregular dates version of IRR
```
Decision rule recap: NPV > 0 → project adds value; IRR > cost of capital → accept. **Common bug:** including year-0 inside NPV() directly — add it separately (it's already "present").

## 📘 F4. Depreciation & ratio one-liners

`SLN(cost, salvage, life)` straight-line · `DB(...)` declining balance · `DDB(...)` double-declining. Ratios from your E4 pivot skills: Gross margin = 1 − COGS/Revenue · Current ratio = Current Assets/Current Liabilities · Debt/Equity · DSO = AR/Revenue×365 · Inventory days.

## 📘 F5. Financial-modeling discipline (the CA-grade checklist)

1. **Blue = inputs, black = formulas**, never hardcode inside formulas → one `Inputs` sheet with named cells.
2. One row = one period, one column = one driver; no merged cells anywhere (they break sorting/references).
3. **Checks panel:** Balance check (A = L + E → `=IF(ABS(diff)<1,"OK","ERROR")`), total checks — always visible.
4. Scenario spine: assumptions table (Best/Base/Worst) + `CHOOSE` or `XLOOKUP` to switch the whole model.
5. Document everything: a README cell per input ("Source: FY25 budget v3").

---

## 🧪 LAB E6 — Finance suite (75 min) · data: `Finance_Loans.csv`, provide your own project flows

1. **EMI calculator:** import loans as Table `tblLoans` → add `EMI =PMT([@AnnualRatePct]/100/12, [@Years]*12, -[@Principal])` formatted ₹. Compare L1 vs L4 total interest (`=EMI*n - Principal`).
2. **Amortization sheet (L1):** rows 1–60 with `n`, EMI, `=IPMT(...)`, `=PPMT(...)`, Balance. Color inputs blue; check cell `Final Balance = 0` must say OK. Line chart: balance ↓ over time; stacked columns interest vs principal (watch interest shrink).
3. **Project X:** initial outlay ₹40,00,000 then inflows 8L, 10L, 12L, 15L, 18L (years 1–5): compute `NPV@12%` (correct way: `=NPV(12%, inflows) - 4000000`) and `=IRR(range)`. Decision + journal note.
4. **Real dates:** same flows on irregular dates in B:C → `=XIRR(values, dates)` vs IRR — record the difference.
5. **Ratios page:** finance-flavored pivot from a summary you make of `Finance_GL.csv`: Current ratio, Gross margin %, Debt/Equity per month.
6. **Scenario spine:** three revenue-growth assumptions; `=CHOOSE($B$1, ...)` switches model; data table over rate × term for the EMI (what-if grid).

## 💪 Exercises
1. Which loan costs the most TOTAL interest? Prove with CUMIPMT pattern of your own.
2. Savings goal: how much monthly SIP (`PMT`) to reach ₹50L in 10 years at 12% p.a. monthly compounding? (=PMT(rate/12,120,0,-5000000)? careful with signs — try until ₹50L appears.)
3. Compute payback year for Project X with a running-total column + `MATCH`.
4. DB vs SLN first 3 years for a ₹10L asset (7.5% salvage? pick 10%), 5-year life — chart the difference.
5. Build a "break-even units" mini-model: (Fixed Costs)/(Price − Variable Cost) with named cells and one Goal Seek check.

### ✅ Selected answers
- Ex 2: ≈ ₹21,522/month — `=PMT(12%/12, 120, 0, -5000000)` (fv positive target).
- Payback: running total crosses 0 between year columns → `=MATCH(TRUE, running>=0, 0)` array or helper flag column.

## ❓ Quiz
1. What do `IPMT`/`PPMT` split? 2. Why add year-0 outside `NPV()`? 3. `XIRR` vs `IRR`? 4. Blue vs black in models?

### ✅ Answers
1. Each EMI into its interest component and principal-repayment component (they sum to EMI).
2. NPV() discounts every flow assuming end-of-period; the initial outlay today shouldn't be discounted.
3. IRR assumes evenly-spaced periods; XIRR uses actual dates — reality is irregular.
4. Blue font = hardcoded input; black = formula — instant audit readability.

## ✅ Mastery checklist
- [ ] EMI + full amortization from memory, checks green
- [ ] NPV/IRR/XIRR computed and *defended aloud*
- [ ] One model with Inputs sheet + checks + scenario switch
- [ ] Screenshot of amortization chart → portfolio

**This completes the 📗 Excel track (6 modules). Next: revisit ⚡ Power BI Module 10 (Finance) to see these numbers in a live P&L dashboard.**
