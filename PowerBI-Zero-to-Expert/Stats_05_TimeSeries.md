# St5 · Time-Series Statistics: Trend, Seasonality, Autocorrelation & Forecasting That Survives Reality

> *Time changes all the rules. Months aren't independent (last month bleeds into this month), trends fake relationships between unrelated series, and "the model with the best fit" often means "the model that memorized the past". Here's the defensive & offensive kit for time-aware finance stats — ending with a real revenue forecast.*

## 🎯 Objectives
Components: trend/seasonality/noise · autocorrelation (ACF) & what it breaks · decomposition · stationarity & differencing · naive benchmarks must be beaten · seasonal indexes + trended-seasonal regression · forecast scoring (MAE/RMSE/MAPE) · ARIMA concept level · the spurious-regression trap.

---

## 📘 5.1 The three ingredients of every finance series

**Observed = Trend + Seasonality + Irregular.** GL revenue: long march UP (trend) + regular intra-year rhythm (seasonal) + jitter (noise). Your first move is always a TIME PLOT with these labeled by eye before any model.

## 📘 5.2 Autocorrelation — months aren't strangers

**Autocorrelation** = correlation of a series with its own lags: corr(y_t, y_{t−1}), corr(y_t, y_{t−12})…

```python
from statsmodels.tsa.stattools import acf
acf(rev_m, nlags=12)                     # lag-1 strong → momentum/trend; lag-12 strong → yearly seasonality
from statsmodels.graphics.tsaplots import plot_acf
plot_acf(rev_m.pct_change().dropna(), lags=12)
```

Why you care: (a) autocorrelation REVEALS structure (lag-12 spike ⇒ annual seasonality confirmed, no guessing); (b) autocorrelated ERRORS invalidate St3/St4 p-values (the Durbin-Watson stat in your regression summary ≈2 is what "clean" looks like).

## 📘 5.3 Decomposition — disassemble the clockwork

```python
from statsmodels.tsa.seasonal import seasonal_decompose
dec = seasonal_decompose(rev_m, model="additive", period=12)
dec.plot()
```

Additive = components add (stable seasonal swing); multiplicative = seasonal % (grows with level). Read: Trend panel (the real direction), Seasonal panel (repeatable rhythm you can BUDGET on!), Resid panel (should be noise — patterns = unfinished business).

## 📘 5.4 Stationarity & differencing — make the series learnable

**Stationary** ≈ constant mean/variance/covariance structure over time. Trends + unit growth = NON-stationary; models like ARIMA demand stationarity.

```python
# Differencing: model CHANGES instead of levels:
delta = rev_m.diff().dropna()
# Formal test — Augmented Dickey-Fuller: p<0.05 ⇒ "stationary" is defensible:
from statsmodels.tsa.stattools import adfuller
print(adfuller(rev_m)[1], adfuller(delta)[1])
```

For MLAI work: growth rates (returns) of finance series are usually Far-closer-to-stationary than levels — another reason returns rule all quant desks (St2's log-normal echo).

## 📘 5.5 Benchmarks first — a fancy model must BEAT naive

Before any model, lock in THREE dumb forecasts:
- **Naive**: next = last month.
- **Seasonal naive**: next = same month last year (kills seasonality).
- **Drift**: last + average historical monthly change (kills trend).

If your model can't beat these — delete it. (Real desks reject "great fits" constantly on this test.)

## 📘 5.6 Seasonal indexes + trended-seasonal regression — your own forecaster

```python
monthly_idx = rev_m.groupby(rev_m.index.month).mean() / rev_m.mean()   # e.g., Dec 1.12, Jan 0.94
import numpy as np, statsmodels.formula.api as smf
t = np.arange(len(rev_m))
dd = pd.DataFrame({"rev": rev_m, "t": t, "m": rev_m.index.month})
fit = smf.ols("rev ~ t + C(m)", data=dd).fit()          # trend + monthly dummies
future = pd.DataFrame({"t": range(len(rev_m), len(rev_m)+6),
                       "m": [d.month for d in pd.date_range(rev_m.index[-1] + pd.offsets.MonthBegin(1), periods=6, freq="MS")]})
pred = fit.get_prediction(future).summary_frame(alpha=.05)   # mean + CI band!
```

Regional seasonality differs (festive Diwali/Q3 vs lean months) — compute indexes per Region from Sales (group by month across years; M's monthly grain feeds it cleanly).

## 📘 5.7 Score forecasts like an auditor

```python
err      = actual - forecast
mae      = abs(err).mean()
rmse     = (err**2).mean() ** .5        # punishes big misses
mape     = (abs(err/actual)).mean()     # % — BUT explodes on zero/near-zero actuals!
```

**Time-aware validation:** never random-split time data! Walk-forward: train 2023–24 → test 2025-01…06, roll the window. Rank models by TEST RMSE vs the naive benchmarks (§5.5). Report n of test periods beside the score (one lucky month proves nothing).

## 📘 5.8 ARIMA — concept level, honest boundaries

ARIMA(p,d,q) = AR (the series explains ITSELF via its own p lags) + I (d differences to reach stationarity) + MA (q lags of past SHOCKS). `auto_arima` searches parameters by AICc (fit penalized by complexity). It handles trend/short memory but NOT regression structure, holidays, or structural breaks — those need SARIMAX/regression-with-ARIMA-errors and domain flags (Diwali month dummy!). One-line truth: AR handles momentum, MA handles shocks lingering, I handles levels that wander. All three = a disciplined way to extrapolate the PATTERN, never the NEWS.

## 📘 5.9 The spurious-regression trap — the module's final boss

Regress Revenue on Marketing IN LEVELS → pretty r² (both trend UP, remember St4's 0.43!). Both have TREND ⇒ fake linkage risk. Fix options: (1) regress CHANGES/growth rates (`diff` both sides); (2) include a trend term; (3) test residual autocorrelation (DW≈0.5 = confession). Any two strongly-trended series will "correlate" — GDP of India vs ice-cream sales: yes, and it means nothing. This is WHY quants work in returns/changes. Burn it in.

---

## 🧪 LAB St5 — The ShopKart forecast (75 min)

1. Time-plot GL monthly revenue, hand-label trend/season/noise; compute seasonal indexes (per month across 3 years incl.'23 Sales-side revenue as a cross-check).
2. ACF of levels (12 lags) + ACF of monthly GROWTH — compare; what did differencing do to the lag-1 bar?
3. seasonal_decompose additive; screenshot; write 2 budget-making sentences from the seasonal panel.
4. adfuller on levels vs differences — quote both p-values in your memo and their plain-English meaning.
5. Seasonal naive benchmark 2025 months from 2024 actuals → RMSE. Then build §5.6 trend+month-dummies on 2023–24 ONLY → predict 2025 first 6 months → MAE/RMSE/MAPE vs actuals AND vs the benchmark. Verdict?
6. Spuriousness demo: regress revenue-levels on marketing-levels; note DW stat; redo in growth rates; state the before/after story in 3 lines.

## 💪 Exercises
1. Why is walk-forward validation stricter/more honest than random-split on time data?
2. MAPE vs RMSE: which misleads when actuals approach zero, and what's the workaround (name one)?
3. A seasonal index of 0.88 for February means…? What does a LOWER value in EVERY region suggest? (Data, not business: check month-end alignment!)
4. In growth space, is autocorrelation "good" or "bad" for forecasting? Nuance please.
5. auto_arima picked (1,1,1) — decode p, d, q in one line each.

### ✅ Selected answers
- Ex 2: MAPE dies at zero & over-weights small bases; use weighted MAPE = Σ|e|/Σ|actual| or sMAPE, or RMSE with a scale note.
- Ex 1: random-split leaks the future into training (adjacent rows correlate) — walk-forward mimics reality: predict only from the past you actually had.

## ❓ Quiz
1. Lag-12 spike in revenue ACF indicates…?
2. Name the three forecasts every model must beat before it's taken seriously.
3. Regressing two trending LEVELS produces what famous trap + TWO fixes?
4. ADF p=0.40 on levels vs p=0.01 on differenced — translate for your memo.

### ✅ Answers
1. Annual seasonality — every month correlates with the same month last year (Diwali/festive rhythm).
2. Naive, seasonal naive, drift — "dumb" benchmarks are the gatekeepers of forecasting honesty.
3. Spurious regression — trend commonality masquerading as relationships; fixes: difference/growth rates, or include trend + check residual autocorrelation (DW≈2).
4. Levels non-stationary (can't reject random-walk structure), differenced series stationary — proceed in growth/difference space.

## ✅ Mastery checklist
- [ ] Decomposition + seasonal indexes budget-ready
- [ ] ACF read like a dashboard (lag-1 momentum, lag-12 season)
- [ ] Walk-forward scored model vs benchmarks
- [ ] Spurious-regression spotter installed permanently 🧠

**Next: St6 — risk statistics & the expert's toolkit: VaR/ES, bootstrap, portfolio math, multiplicity & backtest hygiene, the capstone memo. 🏆**
