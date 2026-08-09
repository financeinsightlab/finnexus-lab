# Py2 · Core Python Tools: Functions, Dates & Files

> *Py1 made you a calculator. Py2 makes you an engineer: package logic into functions, handle dates like a banker (finance runs on day-counts!), and read real CSVs — including ShopKart's own files. End of module: a complete loan amortization schedule, built by you.*

## 🎯 Objectives
def/return/default-args fluently · comprehensions · try/except for bulletproof input · datetime for finance calendars & fiscal years · csv module read/write · build + export a full 60-month amortization schedule.

---

## 📘 2.1 Functions — reusable money machines

```python
def emi(principal, annual_rate, years):
    """Monthly EMI for a reducing-balance loan."""
    r, n = annual_rate / 12, years * 12
    return principal * r * (1 + r) ** n / ((1 + r) ** n - 1)

def compound(principal, rate, periods):
    return principal * (1 + rate) ** periods

print(f"L1 EMI = ₹{emi(5_000_000, 0.095, 5):,.2f}")      # reused forever
print(f"FD grows to ₹{compound(100_000, 0.07, 5):,.0f}") # ₹1,40,255
```

Rules: `def name(args):`, indented body, `return` hands the result back. Default args make functions friendly: `def npv(rate, flows, initial=0):`. One function = one job = easy audit (same discipline as P5's "one conditional column").

## 📘 2.2 Scope & returns gotchas

Variables inside a function are LOCAL — they vanish after return. A function without `return` gives `None` (classic silent bug: printing `None` in your finance report). Return TUPLES to hand back bundles:

```python
def loan_summary(p, rate, years):
    e = emi(p, rate, years)
    return e, e * years * 12, e * years * 12 - p      # emi, total, interest
e, tot, i = loan_summary(1_200_000, 0.0875, 3)        # unpack
```

## 📘 2.3 Comprehensions — loops on espresso

```python
months = [f"2025-{m:02d}" for m in range(1, 13)]            # 12 month strings
discounted = [price * 0.9 for price in [499, 999, 1499]]    # 10% off each
costs_only = {a: v for a, v in tb.items() if a not in ("Sales Revenue", "Other Income")}
```

`[expr for x in seq if cond]` — one line replaces 4. Comprehensions are how pros write the boring 80%.

## 📘 2.4 try / except — input that never crashes

```python
def to_float(text):
    try:
        return float(text)
    except (ValueError, TypeError):
        return None

def variance_pct(actual, budget):
    try:
        return (actual - budget) / abs(budget)
    except ZeroDivisionError:
        return None                        # budget=0 → no infinite %, no crash
```

Catch the SPECIFIC error, return a safe sentinel (`None`, `0.0`, "n/a"), log and move on — exactly the SQL `NULLIF` / DAX `DIVIDE` philosophy, coded.

## 📘 2.5 Dates — finance runs on these

```python
from datetime import date, timedelta

d = date(2025, 3, 31)                    # FY end!
print(d.strftime("%d-%b-%Y"))            # 31-Mar-2025  ( Indian statement style )
parsed = date.fromisoformat("2024-01-01")# our CSVs use ISO → perfect match
print((d - parsed).days)                 # day-count between postings

next_month = parsed + timedelta(days=32) # careful: 32 days ≠ 1 month always…
```

**Month arithmetic the banker way** (matches every track's fiscal logic):

```python
def add_months(d, n):
    y, m = divmod(d.month - 1 + n, 12)
    return date(d.year + y, m + 1, min(d.day, 28))     # safe day (no Feb-30 crashes)

def india_fy(d):
    return d.year if d.month >= 4 else d.year - 1      # Apr–Mar fiscal year
print(india_fy(date(2025, 3, 31)))   # 2024  🎉
print(india_fy(date(2025, 4, 1)))    # 2025
```

## 📘 2.6 Reading CSVs — the honest way (csv module, before pandas)

```python
import csv
from datetime import date

gl = []
with open("datasets/Finance_GL.csv", newline="", encoding="utf-8") as f:
    for row in csv.DictReader(f):
        row["Amount"] = float(row["Amount"])
        row["MonthStart"] = date.fromisoformat(row["MonthStart"])
        gl.append(row)

print(len(gl), "rows")                       # 408
rev_2024 = sum(r["Amount"] for r in gl
               if r["AccountName"] == "Sales Revenue" and r["MonthStart"].year == 2024)
print(f"2024 revenue ₹{rev_2024:,.0f}")
```

`csv.DictReader` → every row is a dict; convert types yourself (YOUR responsibility in raw Python — pandas will automate this in Py3). Monthly P&L aggregation the procedural way:

```python
monthly = {}
for r in gl:
    key = (r["MonthStart"], r["Type"])
    monthly[key] = monthly.get(key, 0) + r["Amount"]
```

## 📘 2.7 The big build — full loan amortization schedule

E6 showed one row. Now ALL 60 rows:

```python
def amort_schedule(principal, annual_rate, years):
    r, n, bal = annual_rate / 12, years * 12, principal
    payment = emi(principal, annual_rate, years)
    schedule = []
    for m in range(1, n + 1):
        interest  = bal * r
        principal_paid = payment - interest
        bal = max(0.0, bal - principal_paid)      # max() guards the final-rupee float wobble
        schedule.append({"Month": m, "EMI": payment, "Interest": interest,
                         "Principal": principal_paid, "Balance": bal})
    return schedule

sch = amort_schedule(5_000_000, 0.095, 5)
print(f"Month 1 : interest ₹{sch[0]['Interest']:,.0f} | principal ₹{sch[0]['Principal']:,.0f}")
print(f"Month 60: interest ₹{sch[-1]['Interest']:,.0f} | principal ₹{sch[-1]['Principal']:,.0f}")
print("Interest front-loading proves why prepayment early saves lakhs 👀")
```

Write it out: `csv.DictWriter(f, fieldnames=sch[0].keys())` → `writeheader()` → `writerows(sch)` → open in Excel and compare with E6's IPMT/PPMT rows — identical. 🎯

---

## 🧪 LAB Py2 — Loan desk + GL reader (60 min)

1. Amend the loan-library: `emi`, `loan_summary`, `amort_schedule`, `add_months`, `india_fy` in one file. Run all 5 loans from `Finance_Loans.csv` (read it with DictReader!) → print EMI + total interest per loan, banks sorted by interest cost desc.
2. Full schedule for L1 exported to `L1_schedule.csv`; sanity checks: Month-60 balance ≈ 0; Σ principal = principal exactly (tolerance ₹1).
3. GL reader: total P&L revenue vs costs for FY2024 vs FY2025 using `india_fy` — print net profit both years + YoY %.
4. try/except armour: wrap every parse; if a bad row appears, count it in `errors` and continue (write the audit note).
5. Interest front-load proof: for L1, print the % of each EMI that is interest in month 1 vs month 36 vs month 60.

## 💪 Exercises
1. `recurse`? No — write `fv_sip(monthly, monthly_rate, months)` with a loop + also `while` version.
2. Dict comp: turn `Finance_Budget.csv` into `{(month, account): budget}` in one comprehension.
3. `unpaid months`: date math — from StartDate to today, how many EMIs should have run per loan? (`add_months`!)
4. Guard: emi() with rate=0 would divide by zero — extend emi(r=0) → simple P/n branch.
5. Why is `max(0.0, bal - pp)` in the loop? What float artifact does it catch on month n?

### ✅ Selected answers
- Ex 4: `if annual_rate == 0: return principal / (years * 12)` — zero-interest edge case (family loans, no-cost EMI).
- Ex 5: floating-point crumbs (₹0.03) would leave a tiny negative balance; the clamp makes the schedule end exactly at zero.

## ❓ Quiz
1. What does a function without `return` produce, and why is that dangerous in reports?
2. `date(2025,4,1)` — which Indian FY, and the rule?
3. Why convert each CSV field's type yourself when using csv.DictReader?
4. try/except for finance input — the two patterns?

### ✅ Answers
1. `None` — silently. Downstream math on None crashes LATER, far from the bug. Always return explicitly.
2. FY2024→FY label 2025? Careful: Apr 1 2025 opens FY 2025-26 commonly labelled FY26-wor FY25 depending convention; our helper returns `2025` (year-start convention). Rule: month ≥ 4 → current year, else year-1.
3. DictReader gives strings only; `"9.5"` + `"1"` concatenates, not adds. Types are your contract.
4. Return a sentinel (None/0) and log + continue — never let one bad row kill a 10k-row close, never crash mid-pipeline with no audit trail.

## ✅ Mastery checklist
- [ ] Loan library built, all 5 loans amortized correctly
- [ ] GL read with csv module + fiscal-year math works
- [ ] try/except guarding every external input
- [ ] Amortization CSV exports and matches Excel E6 values

**Next: Py3 — pandas: the Excel-killer. DataFrames, groupby, merge — the variance pack in 10 lines. 🐼**
