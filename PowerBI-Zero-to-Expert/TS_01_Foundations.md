# TS1 · Time Series Foundations: Reading the Clockwork

> *St5 gave you the statistics; this track makes you a FORECASTER. First we learn to SEE a series properly: its four components, its grain, its calendar quirks, and the two tests (ACF walls, stationarity) that every serious model requires before it starts.*

## 🎯 Objectives
What makes data "time series" (and what doesn't) · trend/season/cycle/irregular decomposition thinking · grains & resampling discipline · calendars (fiscal, business days, holidays) · ACF & PACF as x-rays · stationarity + random walk vs white noise · your first time-aware data portrait (36 months of ShopKart!).

---

## 📘 1.1 What IS a time series?

Observations measured at successive, ordered points where ORDER CARRIES INFORMATION: monthly revenue, daily orders, intraday FX ticks. Shuffle the rows of a regression dataset → same analysis; shuffle a time series → destroy the signal (autocorrelation!). This is why time data gets its own toolkit — and its own ruthlessness about validation (St5's walk-forward echo).

Not time series: cross-sectional pivots, ranked snapshots, "Top 10 products" (one moment, no clock).

## 📘 1.2 The four components — memorize the skeleton

```
Series = TREND + SEASONALITY + CYCLE + IRREGULAR
```

- **Trend (T)**: long-run direction. ShopKart monthly revenue: ₹1.94Cr (2023) → ₹2.07Cr (2024) → ₹2.22Cr (2025) — a steady ~7%/yr climb. Trend answers "is this business fundamentally growing?"
- **Seasonality (S)**: fixed CALENDAR-locked rhythm (period = 12 for monthly, 7 for daily-weekly). ShopKart indexes: **May 1.29 (summer/wedding peak!), Mar 1.13 (fiscal year-end push!), Feb 0.80 (short-month trough), Dec 0.89 (post-Diwali exhale)**. Periodicity repeats on the calendar, period known in advance — this is what makes it PREDICTABLE.
- **Cycle (C)**: long waves without fixed period (business cycles, credit cycles — 4–10 yrs). With 3 years of data you can't estimate it; SAY SO (honesty = competence in forecasting).
- **Irregular (I)**: noise + shocks (one-off campaigns, a warehouse flood). Not predictable by definition — only bounded.

**Additive vs multiplicative**: does the seasonal swing stay constant in ₹ (additive: `Y = T + S + I`) or scale with level in % (multiplicative: `Y = T × S × I` → log it to add!)? ShopKart's May spike grows with revenue → multiplicative instincts (log-transform before linear tools, back-transform after). Check by plotting swing-vs-level.

## 📘 1.3 Grain & the aggregation contract

"Monthly revenue" means: transaction rows aggregated by calendar month (sum for flows — St5's law again: stocks snapshot with .last!). Discipline:
- One row PER period — fill gaps explicitly (missing months ≠ zero months; `asfreq` inserts NaN to make holes VISIBLE).
- Declare the grain in the chart subtitle (DV3 rule); never mix daily+monthly on one axis silently.
- Rolling windows (3-mo MA) sit at the SAME grain — "3 periods", not vague "quarter-ish".

## 📘 1.4 Calendars — finance runs on them

- **Fiscal years**: India Apr–Mar (Py2's rule, 6th reunion 🎉): label FY by start year consistently.
- **Business days vs calendar days**: monthly totals partly reflect working-day counts (Feb is short AND festivalless here — index 0.80 reflects BOTH). Pro shops publish working-day-adjusted revenue; mention before panicking at February.
- **Holidays**: Diwali moves between Oct/Nov by year — calendar-event fields matter for models later (TS5's covariates). A "November slowdown" can be an October Diwali stealing the sale.

## 📘 1.5 ACF & PACF — the series' own autobiography

```python
from statsmodels.graphics.tsaplots import plot_acf, plot_pacf
plot_acf(rev_m, lags=18)     # bar per lag: corr(y_t, y_(t−k)) — slow decay = trend; k=12 spike = season!
plot_pacf(rev_m, lags=18)    # DIRECT effect of lag k holding intermediate lags constant
```

- **ACF**: every lag's correlation — trend shows as a slow waterfall across all lags; annual seasonality pops a spike exactly at lag 12 (its harmonics 24…).
- **PACF**: the *direct* voice of each lag after removing what the middle lags explain — THIS is what AR(p) order-hunting reads (TS4).
- Confidence band (shaded): bars inside = noise-compatible; outside = structure. Learn to read the wall before any model (St5 reprise, now mandatory drill).

## 📘 1.6 Stationarity — the gate every model checks

**Stationary**: statistical properties (mean, variance, autocorrelation) invariant over time. Revenue with trend+season = NON-stationary (mean marches; variance grows). Most classical models (ARIMA) require making the series stationary first: **differencing** (`y_t − y_(t−1)`, seasonal diff `y_t − y_(t−12)`) and/or transforms (log for variance stabilization).

```python
from statsmodels.tsa.stattools import adfuller
adfuller(series)[1]        # p-value: < 0.05 ⇒ "stationary" defensible (the ESP of TS!)
```

- **White noise**: mean 0, constant σ, zero autocorrelation — the perfect RESIDUAL (your goal for leftovers).
- **Random walk**: today's value = yesterday + noise (`y_t = y_(t−1) + ε`): ACF decays SLOWLY near 1, differences = white noise. Markets-style series; "no model beats naive" is random-walk's confession (benchmarks, TS3!).
- Differenced revenue growth ≈ stationary-ish → workable; the USDINR monthly returns (Py4/St6) — nearly stationary already (that's why quants forecast returns, not prices — St2's law again!).

## 📘 1.7 The time-series portrait — your opening ritual

Copy this block into every engagement:

```python
def ts_portrait(s, name="series"):
    from statsmodels.tsa.stattools import adfuller
    print(f"{name}: n={len(s)} | mean={s.mean():,.0f} sd={s.std():,.0f} cv={s.std()/s.mean():.1%}")
    print(f"ADF p={adfuller(s.dropna())[1]:.4f}")
    # + time plot, 12m ACF/PACF walls, seasonal indexes, gap map — picture stack, never numbers alone
```

---

## 🧪 LAB TS1 — Portrait of 36 months (50 min)

1. Build the monthly series: aggregate all 36 files in `datasets/monthly/` (loop + concat + groupby — Py3 drill) OR monthly-sum the big Sales.csv → `rev36` (DatetimeIndex, MS freq). Cross-check two adjacent months against the GL view — journal the grain/source difference (transactions vs accounting!).
2. Time plot with year separators; hand-label T/S/I on the image; compute yearly totals (1.94/2.07/2.22 Cr) + YoY (≈6.5%, 7.2%).
3. Seasonal indexes per calendar month (mean-bucket / overall mean); verify May≈1.29, Feb≈0.80 — sentence each about the business (summer? year-end push? short-month?).
4. ACF (18 lags) of levels: SEE the slow-decay trend wall + lag-12 season spike; then ACF of YoY-differenced (`.diff(12)`): what remains? Then PACF levels → which lags speak directly?
5. ADF p-values: levels → diff(1) → diff(12). Table them; verdicts each?
6. Transform check: swing-vs-level scatter (rolling 12m pivots) — additive or multiplicative bones?

## 💪 Exercises
1. Why does shuffling rows destroy time-series modeling but change nothing in cross-sectional regression?
2. A stationary "residual" should look like WHAT three ways (mean/var/ACF)?
3. Multiplicative decomposition → WHY take logs before linear decomposition, and what do the log units mean?
4. Loess-bin seasonality: February index 0.80 blends TWO effects — name both + one compensation idea for fairness in sales targets.
5. Random walk + drift — write its equation; why does its ACF decay near-linearly from ~1?

### ✅ Selected answers
- Ex 2: mean ≈ 0; constant variance (no funnel); ACF bars all inside the band (white-noise-compatible). Ljung-Box formalizes the ACF part (TS4).
- Ex 4: fewer calendar days + post-holiday retail lull; compensate with per-working-day normalization when setting daily targets (fairness = no Feb-blaming!).

## ❓ Quiz
1. Name the four components + which are predictable?
2. ACF signature of trend vs annual seasonality on monthly data?
3. Why does ADF's p<0.05 "permit" modeling, precisely?
4. The asfreq/gap rule for missing months?

### ✅ Answers
1. Trend, Seasonality, Cycle, Irregular — T and S are predictable; I is only bounded; C needs length.
2. Trend = gradual ACF decay across MANY lags; season = spikes exactly at 12 (and harmonics 24…). Both can co-exist (trend wall + seasonal pop).
3. It rejects unit-root (non-stationarity): statistical properties hold steady → relationships estimated are stable → forecasts generalize beyond the sample.
4. Insert NaN with asfreq instead of zero-filling: holes visible ≠ fake zeros; then impute consciously (interpolate/ffill) per cause.

## ✅ Mastery checklist
- [ ] 36-month portrait produced (plot+T/S/I+acf+pacf+ADF)
- [ ] Seasonal indexes computed & business-explained
- [ ] Stationarity made via diff(1)/diff(12) with ADF receipts
- [ ] Additive-vs-multiplicative questioned with data

**Next: TS2 — smoothing & seasonal-toolbox mastery: MA/EMA, decomposition pipelines, deseasonalized truth-telling. 🌊**
