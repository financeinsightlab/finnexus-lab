# Py6 · Python for Finance Capstone: The End-to-End Analyst Toolkit

> *Everything from Py1–Py5, assembled into ONE project that produces a month-end close pack from raw CSVs with a single command. This is your portfolio piece, your interview story, and — honestly — a tool a real finance team would happily steal.*

## 🎯 Objectives
Project structure & config · loader functions with data validation (the recon suite) · signed P&L + variance pack + loan book automation · one-button Excel report · "close checklist" pass/fail runner.

---

## 📘 6.1 Project structure — boring folders save careers

```
finance_toolkit/
├── data/            ← the CSVs (Sales, GL, Budget, Loans, FX) — read-only, never edit in place
├── output/          ← every generated report (timestamped!)
├── config.py        ← all constants: paths, rates, mappings
├── checks.py        ← reconciliation functions returning (bool, message)
└── toolkit.py       ← the pipeline: load → validate → build → export
```

Golden rules: inputs never modified, every output reproducible from inputs + code, configuration separated from logic (a CFO changing the budget year shouldn't need an engineer).

## 📘 6.2 config.py — every assumption in one file

```python
from pathlib import Path
DATA   = Path("data")
OUTPUT = Path("output")
INCOME_TYPES = ("Revenue", "Other Income")
COST_TYPES   = ("COGS", "OpEx")
RISK_FREE    = 0.07
FIN_YEARS    = [2024, 2025]
RUPEE_FMT    = "₹{:,.0f}"
```

## 📘 6.3 Loaders — read, type, validate (the recon suite)

```python
import pandas as pd
from config import DATA, INCOME_TYPES

def load_gl():
    gl = pd.read_csv(DATA / "Finance_GL.csv", parse_dates=["MonthStart"])
    is_pl = gl["Statement"] == "P&L"
    is_income = gl["Type"].isin(INCOME_TYPES)
    gl["Signed"] = gl["Amount"].where(~is_pl, gl["Amount"].where(is_income, -gl["Amount"]))
    return gl

def load_budget(): return pd.read_csv(DATA / "Finance_Budget.csv", parse_dates=["MonthStart"])
def load_fx():     return pd.read_csv(DATA / "Finance_FX.csv",  parse_dates=["MonthStart"])
def load_loans():  return pd.read_csv(DATA / "Finance_Loans.csv", parse_dates=["StartDate"])
```

**checks.py** — S5/P5's month-end discipline, executable:

```python
def run_checks(gl, budget):
    results = []
    dup = gl.duplicated(["MonthStart", "AccountCode"]).sum()
    results.append(("No duplicate account-months", dup == 0, f"{dup} duplicates"))
    pl = gl[gl["Statement"] == "P&L"]
    net = pl.groupby("MonthStart")["Signed"].sum()
    results.append(("Net profit exists every month (24)", len(net) == 24, f"{len(net)} months"))
    tb_tieout = abs(gl[gl["Statement"] == "P&L"].groupby("MonthStart")["Signed"].sum().min()) < 1e6
    results.append(("P&L never catastrophically negative", tb_tieout,
                    f"worst net = ₹{net.min():,.0f}"))
    cont = gl["MonthStart"].nunique() == gl["MonthStart"].sort_values().diff().dropna().gt(pd.Timedelta(days=0)).sum() + 1
    results.append(("Months are strictly increasing", bool(cont), ""))
    b2025 = budget["MonthStart"].dt.year.isin([2025]).all()
    results.append(("Budget is FY2025 only", bool(b2025), ""))
    return results
```

Extending this list is literally your real job one day: GL↔bank counts, trial-balance debits=credits, FX coverage of every GL month, accounts present in both actual & budget.

## 📘 6.4 The pack-builders

```python
def monthly_pl(gl):
    pl = (gl[gl["Statement"] == "P&L"]
            .groupby(["MonthStart", "Type"])["Signed"].sum().unstack().fillna(0))
    pl["Net Profit"] = pl.sum(axis=1)
    return pl

def variance_pack(gl, budget):
    act = (gl[gl["Statement"] == "P&L"]
             .groupby(["MonthStart", "AccountName"], as_index=False)["Signed"].sum())
    va = act.merge(budget, on=["MonthStart", "AccountName"], how="outer", suffixes=("", "_b"))
    va[["Signed", "Budget"]] = va[["Signed", "Budget"]].fillna(0)
    va["Variance"] = va["Signed"] - va["Budget"]
    va["Var%"] = va["Variance"] / va["Budget"].abs().replace(0, float("nan"))
    va["Favourable"] = va.apply(lambda r: (r["Variance"] >= 0) if r["Type"] in INCOME_TYPES
                                          else (r["Variance"] <= 0), axis=1)
    return va

def loan_book(loans):                       # Py2 amortization, data-frame'd
    rows = []
    for L in loans.itertuples():
        r, n = L.AnnualRatePct / 100 / 12, int(L.Years) * 12
        emi = L.Principal * r * (1 + r) ** n / ((1 + r) ** n - 1)
        rows.append({"LoanID": L.LoanID, "Bank": L.Bank, "EMI": round(emi, 2),
                     "TotalInterest": round(emi * n - L.Principal, 2),
                     "Months": n})
    return pd.DataFrame(rows).sort_values("TotalInterest", ascending=False)

def fx_view(gl, fx):
    rev = (gl[(gl["AccountName"] == "Sales Revenue")]
             .groupby("MonthStart")["Amount"].sum().rename("INR"))
    m = pd.concat([rev, fx.set_index("MonthStart")], axis=1)
    m["USD"] = m["INR"] / m["USDINR"]
    return m.round(0)
```

## 📘 6.5 One-command Excel report

```python
from datetime import datetime
from config import OUTPUT

def export_excel(pl, va, lb, fxv):
    OUTPUT.mkdir(exist_ok=True)
    path = OUTPUT / f"close_pack_{datetime.now():%Y%m%d_%H%M}.xlsx"
    with pd.ExcelWriter(path, engine="openpyxl") as xl:
        pl.round(0).to_excel(xl, sheet_name="Monthly P&L")
        va.round(2).to_excel(xl, sheet_name="Variance 2025", index=False)
        lb.to_excel(xl, sheet_name="Loan Book", index=False)
        fxv.to_excel(xl, sheet_name="FX View")
        for ws in xl.book.worksheets:                    # light openpyxl polish
            for col_cells in ws.columns:
                width = max(len(str(c.value)) for c in col_cells if c.value is not None) + 2
                ws.column_dimensions[col_cells[0].column_letter].width = min(width, 24)
    return path

def main():
    gl, budget, fx, loans = load_gl(), load_budget(), load_fx(), load_loans()
    print("— RECON —"); ok = True
    for name, passed, note in run_checks(gl, budget):
        ok &= passed; print(("✅" if passed else "❌"), name, "—", note)
    if not ok: print("⛔ Fix data issues before producing the pack."); return
    path = export_excel(monthly_pl(gl), variance_pack(gl, budget), loan_book(loans), fx_view(gl, fx))
    print(f"— REPORT —\n📦 {path}")

if __name__ == "__main__":
    main()
```

Run: `python toolkit.py` → recon prints → Excel lands in output/. That's a month-end close pack in 3 seconds, every month, forever. 🚀

## 📘 6.6 Push it further (pick one tonight)

- Charts sheet: add openpyxl BarChart of Net Profit directly INTO the workbook.
- `argparse`: `python toolkit.py --year 2025 --budget data/budget26.csv`.
- Schedule it: Windows Task Scheduler / `cron` — truly unattended close.
- Streamlit (`pip install streamlit`): `st.dataframe(variance_pack(...))` + sliders = an internal app in 30 lines.
- Version the repo: `git init` + commit per close — audit trail for free.

---

## 🧪 LAB Py6 — Ship the toolkit (90 min)

1. Rebuild §6.1–6.5 exactly; run; the recon must print 5 ✅ before the Excel appears. Fix (or deliberately break-and-watch-fail) ONE check to prove the gate works.
2. Add a 6th check: every budget (month, account) must have its account exist in GL's account master (list them if not) — S5's two-direction risk, coded.
3. Add the "worst 5 unfavourable" sheet + an insights sheet with 3 auto-written sentences (use f-strings pulling max/min values from the pack).
4. Add the Net Profit BarChart via openpyxl to the P&L sheet; verify in Excel.
5. `--year` CLI flag filtering variance to a chosen year (argparse), default 2025.
6. Print a final console summary: FY profit, best month, worst variance account, total loan-book interest, USD-converted FY revenue — the 30-second elevator brief.

## 💪 Exercises
1. Data-contract: write the 4 expectations you ENFORCE on Finance_GL.csv before you trust any number it produces (columns, dtypes, grain, contiguity) — the checks header for any future dataset.
2. Idempotency test: run twice, same data → identical packs (timestamps differ!) — how do you make file OVERWRITE vs append a deliberate choice?
3. Error UX: a budget CSV missing "AccountName" — where does your pipeline fail today, and which friendly assert/message would make it FAIL LOUD but CLEAR?
4. Refactor the loan loop into pure-pandas (vectorized) — measure with %timeit; keep the loop if clarity wins? Debate in 4 lines.
5. Journal: which parts of this toolkit would a Power BI model replace/absorb — and where does CODE still beat semantic models? (Honest senior answer, no tool zealotry.)

### ✅ Selected answers
- Ex 3: pandas raise KeyError at `budget["AccountName"]` — confusing for others; add `required = {"MonthStart","AccountName","Type","Budget"}; assert required <= set(budget.columns), f"Budget file missing {required - set(budget.columns)}"`.
- Ex 5: BI wins for interactive slicing, security, refresh, sharing; code wins for bespoke math (Monte Carlo, XIRR bisection), pipeline asserts, file operations, and unit-tested recon. Seniors pick per problem, not per brand.

## ❓ Quiz
1. Why run recon checks BEFORE building the pack — not after?
2. `.where(cond, other)` in load_gl does what vs np.where?
3. What makes the loan EMC math identical across Py2/npf/toolkit — and why does that matter?
4. One-command reports: name 3 properties that make them production-grade.

### ✅ Answers
1. Block early: garbage-in produces a BEAUTIFUL wrong pack — the fail-loud gate before stakeholder eyes. (Same reason S5 recon precedes any close review.)
2. `.where` keeps original where cond True else fills other — index-aligned masking; np.where(cond, a, b) picks elementwise without alignment subtleties. Both vectorized; pick the clearer per case.
3. Deterministic closed-form math, same inputs, verified cross-tool (assert-close in tests) — reproducibility = audit trust = the whole point of the toolkit.
4. Reproducible (seed/config), timestamped outputs, gate checks, idempotent or logged overwrites, readable failure messages, config externalized.

## ✅ Mastery checklist
- [ ] Complete toolkit runs end-to-end with recon gate
- [ ] Excel pack has P&L / Variance / Loans / FX sheets
- [ ] CLI flag + insights sentences + chart added
- [ ] Portfolio-ready: README + one run screenshot

**🏆 PYTHON TRACK COMPLETE.** From `print("Namaste")` to a month-end close engine — Excel → Power Query → SQL → Power BI → Tableau → Python, all finance-hardened. You now think in pipelines, not files. GO SHIP IT. 🐍💼
