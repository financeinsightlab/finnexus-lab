# Py4 · Pandas Time-Series for Finance: resample, shift, rolling & Real Charts

> *Finance data IS dates. This module teaches the four verbs — resample (aggregate flows, snapshot stocks), shift (YoY/MoM), rolling (smoothing), pct_change (returns) — and graduates you to real matplotlib charts worth a CFO deck.*

## 🎯 Objectives
DatetimeIndex mastery · resample('ME'/'QE') with .sum() vs .last() — the flows/stocks rule · shift/diff/pct_change for growth math · rolling windows · FX returns & cumulative performance · matplotlib charts that pass the T2/T5 design bar.

---

## 📘 4.1 DatetimeIndex — dates become the spine

```python
import pandas as pd
gl = pd.read_csv("datasets/Finance_GL.csv", parse_dates=["MonthStart"])
cash = (gl[gl["AccountName"] == "Cash"]
          .set_index("MonthStart")["Amount"]
          .sort_index())
cash.index                  # DatetimeIndex → time-aware slicing:
cash["2025"]                # all of 2025
cash["2024-07":"2025-03"]   # every month Jul'24–Mar'25
```

With a DatetimeIndex, date slices just work — no masks gymnastics. Rule: set the date column as INDEX the moment you do time operations; keep it a column when merging.

## 📘 4.2 resample — flows SUM, stocks LAST (never confuse!)

```python
rev = (gl[(gl["AccountName"] == "Sales Revenue")]
          .set_index("MonthStart")["Amount"])
rev.resample("QE").sum()     # quarterly REVENUE = sum the months (flow ✅)

cash.resample("QE").last()   # quarterly CASH = ending balance (stock ✅)
cash.resample("QE").sum()    # ❌ the lie — triple-counts money!
```

`'ME'` month-end, `'QE'` quarter-end, `'YE'` year-end (older pandas: M/Q/Y — use the E-aliases, the old ones are deprecated). This one section is the SQL FIRST_VALUE-DESC, DAX LASTDATE, E6 ending-balance rule — fourth time, now unavoidable. 💪

## 📘 4.3 shift / diff / pct_change — growth math without loops

```python
rev_m = rev.resample("ME").sum()
rev_m.pct_change()                    # MoM %
rev_m.pct_change(12)                  # YoY % (12 months back)
rev_m.diff()                          # absolute change
rev_m.shift(1)                        # previous month beside current (the LAG!)
pd.DataFrame({"Rev": rev_m,
              "Prev": rev_m.shift(1),
              "MoM%": rev_m.pct_change() * 100}).round(1)
```

`shift(12)` on monthly data = the YoY you'll be asked for in EVERY interview/close. Sign-safe division when denominators may be negative: `(cur - prev) / prev.abs()` (T6's ABS rule).

## 📘 4.4 rolling — smooth the noise, see the trend

```python
rev_m.rolling(3).mean()      # 3-month moving average (T3's nested table-calc, one call)
rev_m.rolling(3).std()       # rolling volatility of monthly revenue
rev_m.rolling(3).agg(["mean", "std"])
# Centered view for presentation (current month in the middle):
rev_m.rolling(3, center=True).mean()
```

Min-periods to avoid NaN floods early: `rolling(3, min_periods=1).mean()`.

## 📘 4.5 FX analytics — returns, volatility, cumulative

```python
fx = pd.read_csv("datasets/Finance_FX.csv", parse_dates=["MonthStart"], index_col="MonthStart")
ret = fx.pct_change().dropna()                       # monthly currency returns
ret.std() * (12 ** 0.5)                              # annualized vol (√12 rule!)
(1 + ret["USDINR"]).cumprod()                        # cumulative ₹/US$ path (growth of 1)
fx["USDINR"].corr(fx["EURINR"])                      # currencies moving together?
```

`cumprod` of (1+r) = compounding — the universal index-chart trick. Py05 builds Monte Carlo on this exact machinery.

## 📘 4.6 matplotlib — charts with a design spine

```python
import matplotlib.pyplot as plt
plt.style.use("seaborn-v0_8-whitegrid")        # sane defaults instantly

fig, ax = plt.subplots(figsize=(10, 4.5))
ax.plot(rev_m.index, rev_m / 1e5, marker="o", lw=1.8, label="Revenue")
ax.plot(rev_m.index, rev_m.rolling(3).mean() / 1e5, lw=2.6, label="3-mo MA")
ax.set_title("ShopKart — Revenue trend (₹ lakh)")
ax.set_ylabel("₹ lakh"); ax.legend(); ax.spines[["top", "right"]].set_visible(False)
fig.autofmt_xdate(); plt.tight_layout(); plt.savefig("rev_trend.png", dpi=150); plt.show()
```

Design rules (T5 echoes): ONE accent color, direct labels over legends when possible, no 3-D, no chartjunk, title carries the INSIGHT ("Revenue up 21% FY25") — format numbers in lakh for the Indian reader. Bars: `ax.bar`, dual-axis: `ax.twinx()`, horizontal: `ax.barh`.

## 📘 4.7 The composite finance figure — 4 panels, one figure

```python
fig, axs = plt.subplots(2, 2, figsize=(12, 7))
axs[0,0].plot(rev_m)                                   ; axs[0,0].set_title("Revenue")
axs[0,1].bar(rev_m.index, rev_m.pct_change()*100, width=20); axs[0,1].set_title("MoM %")
axs[1,0].plot(cash)                                    ; axs[1,0].set_title("Cash (stock — resample.last!)")
axs[1,1].hist(ret["USDINR"], bins=12)                  ; axs[1,1].set_title("USDINR monthly returns")
plt.tight_layout(); plt.show()
```

This 4-up is your first *quant desk* screenshot for the portfolio. 📸

---

## 🧪 LAB Py4 — Time mastered (60 min)

1. Revenue quarterly via resample('QE').sum(); CASH quarterly via .last(); put both side by side and write one sentence: "why did I use different aggs?" (The exam answer: flows vs stocks.)
2. Full growth table for revenue: Prev, MoM%, YoY%, 3m-MA — exported to Excel.
3. FX desk: monthly returns for the 3 currencies, annualized vols, correlation matrix, and the cumulative chart (3 lines, 1 = no change). Which currency pair moved most vs INR?
4. The §4.7 composite figure with honest ₹ lakh labels; save the PNG; post-ready.
5. Rolling-3 std of revenue — interpret: which months were unusually volatile? Cross-check with the MoM% table: did the model and your eyes agree?

## 💪 Exercises
1. `rev_m.asfreq('MS')` vs the raw index — when would asfreq rescue you (missing months?) and what does it insert?
2. Compute YTD revenue per calendar year: `rev_m.groupby(rev_m.index.year).cumsum()` — then fiscal-Apr YTD (harder: group by india-FY via a helper column).
3. `.ewm(span=3).mean()` vs `.rolling(3).mean()` — one sentence on the difference; which one reacts faster to a shock?
4. Currency % change sign trap: USDINR up 2% — is that ₹ strengthening or weakening? Write it carefully (this confuses even senior folks!).
5. Resample equity-side chain: `.resample('QE').agg(['first','last','mean'])` on Inventory — which column belongs in a quarterly B/S?

### ✅ Selected answers
- Ex 2 (fiscal): `fy = rev_m.index.year - (rev_m.index.month < 4); rev_m.groupby(fy).cumsum()`.
- Ex 4: USDINR ↑ 2% = dollar stronger vs ₹ → ₹ WEAKENED. Quote it as "INR depreciated ~2% vs USD" — direction depends on which currency is the base of the quote!

## ❓ Quiz
1. Why `.last()` for Cash but `.sum()` for Revenue at quarterly grain?
2. `pct_change(12)` on monthly data = ?
3. What does NaN-heavy early output of rolling(3) mean & the min_periods fix?
4. cumprod(1+returns) builds what?

### ✅ Answers
1. Cash is a STOCK measured at period end; revenue is a FLOW accumulated across the period. Semi-additivity: stocks snapshot, flows sum (5th time we meet this law — it owns every finance stack).
2. Year-over-year growth — compares each month to the same month last year (seasonality-safe).
3. The first 2 windows lack 3 months of history; `min_periods=1` computes with what's available (or accept NaNs as honest "not enough data").
4. A cumulative performance index (growth of ₹1) — the universal normalized comparison chart.

## ✅ Mastery checklist
- [ ] resample with sum-vs-last mastered and defended
- [ ] MoM/YoY/rolling shipped to Excel
- [ ] FX returns, vol, correlation, cumulative painted
- [ ] 4-panel finance figure saved to PNG

**Next: Py5 — NumPy + numpy-financial: NPV/IRR/XIRR, annuities, Monte Carlo and the quant toolkit. 🧮**
