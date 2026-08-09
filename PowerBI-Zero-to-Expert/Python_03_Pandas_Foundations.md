# Py3 · Pandas Foundations: The Excel-Killer

> *pandas is a programmable Excel: every PivotTable, filter and VLOOKUP you know — as one line of code, repeatable forever, on a million rows. Same ShopKart data, now at program speed.*

## 🎯 Objectives
DataFrames & Series mental model · read_csv with dtypes + dates · select/filter without loops · the sign-normalization pattern · groupby = PivotTable · merge = VLOOKUP FULL OUTER · export clean Excel/CSV.

---

## 📘 3.1 Install & first contact

```python
# In Colab: preinstalled. Locally:  pip install pandas
import pandas as pd

gl = pd.read_csv("datasets/Finance_GL.csv", parse_dates=["MonthStart"])
print(gl.shape)          # (408, 6) — rows × columns
gl.head()                # first 5
gl.info()                # dtypes, nulls — the health check
gl.describe()            # stats of numeric columns
```

Mental model: **DataFrame = the sheet** (rows + named columns); **Series = one column**; **index = the row labels** (numbers by default; we'll make it dates in Py4). pandas uses NumPy under the hood → every op is vectorized = fast — loops are a red flag now.

## 📘 3.2 Selecting — the daily 90%

```python
gl["Amount"]                                  # one column → Series
gl[["Type", "Amount"]]                        # columns list → DataFrame
gl.loc[gl["Type"] == "Revenue"]               # filter rows (boolean mask)
gl.loc[(gl["Type"] == "Revenue") & (gl["MonthStart"] >= "2025-01-01"),  # AND with &
       ["MonthStart", "Amount"]]                                          # + column pick
gl.iloc[0:5, [0, 5]]                        # by position: rows 0–4, cols 0 and 5
gl.sort_values("Amount", ascending=False)
```

Masks compose: `&` AND, `|` OR, `~` NOT — wrap each condition in `()` (Python operator precedence trap #1 in pandas).

## 📘 3.3 New columns — sign normalization, vectorized

THIS is the finance pattern you've met in P5/S5/T6 — one conditional column, every consumer downstream stays natural:

```python
import numpy as np
income = gl["Type"].isin(["Revenue", "Other Income"])
gl["Signed"] = np.where(income, gl["Amount"], -gl["Amount"])

# only P&L rows sign-flip; B/S keep their own sign:
is_pl = gl["Statement"] == "P&L"
gl["Signed"] = np.where(is_pl, np.where(income, gl["Amount"], -gl["Amount"]), gl["Amount"])
gl["Year"]  = gl["MonthStart"].dt.year                 # .dt = the datetime toolkit
gl["Month"] = gl["MonthStart"].dt.month
```

`.dt.year/.month/.month_name()/.to_period('M')` — build your calendar columns in seconds (Apr–Mar fiscal: `gl["FY"] = gl["Year"] - (gl["Month"] < 4)` — clean vectorized version of Py2's function!).

## 📘 3.4 groupby — every PivotTable ever

```python
# monthly P&L by Type (Excel E4 pivot, one line)
pl = (gl[gl["Statement"] == "P&L"]
        .groupby(["MonthStart", "Type"])["Signed"].sum()
        .unstack("Type")          # Types become columns — THE wide P&L!
        .fillna(0))
pl["NetProfit"] = pl.sum(axis=1)
pl.round(0)
```

- `groupby(...)[col].sum()/.mean()/.count()/.agg([...])` — aggregations.
- `.unstack(level)` pivots a group level into columns (`pivot_table` alternative in §Py3.6).
- Named aggregations: `.agg(Revenue=("Amount","sum"), Txns=("Amount","size"), MaxLine=("Amount","max"))`.

## 📘 3.5 merge — VLOOKUP with seatbelts (FULL OUTER!)

Budget-vs-actual like S5 taught: budget-only or actual-only lines MUST survive → outer:

```python
bud = pd.read_csv("datasets/Finance_Budget.csv", parse_dates=["MonthStart"])
actual = (gl[gl["Statement"] == "P&L"]
          .groupby(["MonthStart", "AccountName"], as_index=False)["Signed"].sum())

va = actual.merge(bud[["MonthStart", "AccountName", "Type", "Budget"]],
                  on=["MonthStart", "AccountName"], how="outer", indicator=True)
va["Signed"] = va["Signed"].fillna(0); va["Budget"] = va["Budget"].fillna(0)
va["Variance"] = va["Signed"] - va["Budget"]
va["_merge"].value_counts()    # both / left_only / right_only — the audit treasure
```

Keys must match dtypes; `indicator=True` tells you exactly which side each row came from — S5's full-outer discipline, enforced by code. ShopKart version: `sales.merge(products, on="ProductID")` then `sales.merge(customers, on="CustomerID")` = your SQL joins, lazy-evaluated name-wise (`how="left"` default inner — choose deliberately!).

## 📘 3.6 pivot_table + the display sugar

```python
piv = pd.pivot_table(va, values=["Signed", "Budget", "Variance"],
                     index="AccountName", columns=va["MonthStart"].dt.to_period("M"),
                     aggfunc="sum", margins=True, margins_name="TOTAL", fill_value=0)

pd.options.display.float_format = "₹{:,.0f}".format   # every number reports ₹
piv
```

`margins=True` = grand totals — E4 pivot power, scriptable. Export for the CFO:

```python
piv.to_excel("variance_pack.xlsx")                     # needs: pip install openpyxl
va.to_csv("variance_pack.csv", index=False)
```

## 📘 3.7 Tiny built-in charts (real charts arrive in Py4)

```python
pl["NetProfit"].plot(kind="bar", title="Monthly Net Profit")     # matplotlib inside
(in your first notebook you'll need:  import matplotlib.pyplot as plt; plt.show())
```

---

## 🧪 LAB Py3 — The variance pack, code edition (60 min)

1. Load GL + Budget; sign-normalize GL (§3.3); print the audit crosstab (Type × one month of Signed sums) — costs negative or you stop.
2. Build the wide monthly P&L (§3.4) with NetProfit row-column, export `pl_wide.xlsx`.
3. Full-outer merge (§3.5) → Variance, Variance% (budget-0-safe: np.where(budget!=0, …, np.nan)) → Favourable column via Type logic → top 5 unfavourable accounts of 2025 by absolute variance.
4. ShopKart side: read Sales + Products; compute `Revenue = Quantity*UnitPrice*(1-Discount)`; groupby Category revenue; merge Category targets? (Targets is regional — do `sales.merge(customers).groupby("Region")` revenue vs `targets.groupby("Region")["SalesTarget"].sum()`, outer merge the two series, compute Achievement%).
5. `.dt` calendar: add FY column (Apr–Mar), then FY totals by Type — compare FY2024 vs FY2025 net profit with one groupby.

## 💪 Exercises
1. `.value_counts(dropna=False)` on GL.Type — why include dropna? What does a NaN here mean?
2. Duplicate audit: `gl.duplicated(["MonthStart","AccountCode"]).sum()` should be 0 — write the full check + message.
3. `query()`: rewrite the 2025 revenue filter as `gl.query("Type == 'Revenue' and MonthStart >= '2025-01-01'")` — when does query beat masks?
4. Weighted average discount via groupby-agg-lambda (hint: np.average with weights inside apply… or compute two sums and divide — compare readability).
5. `.clip(lower=0)` — where in finance would clipping be a SILENT lie?

### ✅ Selected answers
- Ex 2: `dup = gl.duplicated(["MonthStart","AccountCode"]); assert not dup.any(), f"{dup.sum()} duplicate account-months"` — one assert = recon millionaire (S5 vibe).
- Ex 5: any error metric or variance — clipping negatives to 0 erases unfavourable months. Clip display, never data.

## ❓ Quiz
1. Why vectorized (`np.where`) over a row loop for sign normalization?
2. `how="outer"` + `indicator=True` — which two finance dangers does it defuse?
3. groupby+unstack achieves what Excel concept?
4. Merge keys: the one thing to verify that silently corrupts results?

### ✅ Answers
1. Millions of rows in milliseconds, ONE audited column, no loop-bug surface — the P5 "fix once" rule, executed in code.
2. Budget-without-spend and spend-without-budget would vanish in inner merges; the indicator column makes each side explicit → variance that's provably complete.
3. A PivotTable with Types as columns = the wide P&L / cross-tab.
4. Matching dtypes & same grain (MonthStart vs MonthStart!). Mismatched types merge as all-NaN; wrong grain explodes row counts — check `.shape` before/after, always.

## ✅ Mastery checklist
- [ ] Wide monthly P&L built + exported
- [ ] Outer-merge variance pack with favourable logic, audited via `_merge`
- [ ] groupby fluency on ShopKart revenue (Category, Region, FY)
- [ ] Display tidy (₹ formats) + files exported for Excel users

**Next: Py4 — time-series pandas: resample, shift, rolling, YoY/MoM, stocks-vs-flows and real matplotlib charts. 📈**
