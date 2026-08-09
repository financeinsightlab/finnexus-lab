# TS2 · Smoothing & Seasonal Toolbox: See the Signal Through the Noise

> *Raw monthly data screams over every promotion and holiday. Smoothing is the art of quieting jitter WITHOUT burying real turns; decomposition is the art of splitting trend, season, and noise into budget-grade components. Master both and every chart you touch gets calmer AND more honest.*

## 🎯 Objectives
SMA/WMA/EMA with span–half-life intuition · centered MAs & the 2×12 trick · classical decomposition end-to-end · deseasonalized series (the KPI that tells the truth) · STL robustness + outlier hygiene · change-point instincts · EMA half-life for finance dashboards.

---

## 📘 2.1 Simple Moving Average — the universal shock absorber

```python
sma3 = s.rolling(3).mean()          # 3-period simple MA: each point = mean of (t-2, t-1, t)
sma12 = s.rolling(12).mean()        # 12-period ≈ trend estimate (seasonality averages out!)
```

- Window ↑ ⇒ smoother but laggier: MA always trails true turns by ~(window−1)/2 periods (explain ANY flat-lag meeting with this one line).
- Odd windows for monthly seasonality kill the seasonal component only at the seasonal multiple (use 12!): a 12-SMA makes the trend visible by definition.
- `rolling(3, min_periods=1)` to tame NaN-heads; trailing MAs are for DISPLAY; never feed lagged MAs silently into "current month" KPIs (look-back bias, TS5's enemy).

## 📘 2.2 Centered MAs & the 2×12 trick — honest trend placement

A 12-SMA sits "between" months (even window). Center it with 2×12-MA: average two adjacent 12-SMAs → the trend aligned to each month:

```python
trend = s.rolling(12).mean().rolling(2).mean().shift(-1)   # classical-decomposition trend line
```

Classical decomposition lives on this: trend first, then residual/s ratios per calendar month (TS1's indexes = seasonal component), noise last. Excel equivalent: `AVERAGE()` rolling columns + `=TREND()`/Analysis ToolPak Moving Average (centered=TRUE check).

## 📘 2.3 Weighted & Exponential MAs — recency-weighted memory

```python
wma = s.rolling(3).apply(lambda x: (0.5*x.iloc[-1] + 0.3*x.iloc[-2] + 0.2*x.iloc[-3]), raw=False)
ema = s.ewm(span=12, adjust=False).mean()      # α = 2/(span+1); recursive: EMA_t = α·y_t + (1−α)·EMA_(t−1)
```

- **EMA > WMA pizazz**: infinite memory decaying exponentially; reacts faster than same-band SMA; the streaming-friendly choice (dashboards update one step, no stored window!) — that's why Power BI quick-measures and every quant lib love EMAs.
- **Half-life** = the human translation: `HL = ln(2)/(-ln(1−α))` periods for the weight to halve. span 12 ⇒ α≈0.154 ⇒ HL≈4.1 months — say THAT in the meeting and watch analysts nod.
- Param selection by purpose: reporting smooth (slow EMA) vs signal-hunting (fast EMA). Declare span on the chart footer (DV honesty).

## 📘 2.4 Classical decomposition — assemble the machine

Additive recipe (multiplicative: work on logs, return by exp):

```python
from statsmodels.tsa.seasonal import seasonal_decompose
dec = seasonal_decompose(rev36, model="multiplicative", period=12)   # T, S, I panels
trend = dec.trend; seasonal = dec.seasonal; irregular = dec.resid
```

Steps your eyes should verify: (1) 2×12 trend; (2) detrend `y/T` per month → average per calendar month = S; (3) irregular = y/(T×S) hovers ~1, random-looking. Read the irregular panel for model clues: any month >1.10 = explainable event or data bug (audit instinct, S5 discipline).

## 📘 2.5 Deseasonalized series — the KPI that tells the truth

```python
deseason = rev36 / seasonal.reindex(rev36.index)      # strip the calendar rhythm
```

NOW compare consecutive months like adults: "December dipped −11% MoM" is a LIE by calendar (Dec index 0.89 — seasonal, remember!); deseasonalized, December may actually have RISEN. Every exec review on seasonal data needs ONE deseasonalized trend chart next to the raw. (Power BI: compute via a seasonal-index dim table; Tableau: LOD-per-month ratio — all roads lead here.)

## 📘 2.6 STL — robust decomposition for real-world mess

SEASONAL-trend decomposition by Loess:

```python
from statsmodels.tsa.seasonal import STL
stlf = STL(rev36, seasonal=13, robust=True).fit()
```

Why senior: (a) nonlinear trend allowed (covid-style bends); (b) robust=TRUE shrinks outlier influence (one Diwali blowout doesn't bend the trend); (c) any season period (52 weekly, 24 hourly). Classical = fine when clean, STL = default when reality got in. Same reading panels: T/S/I.

## 📘 2.7 Outlier hygiene inside series

Decompose → z-sore the irregular (|z|>3 = flag) → label events ("Diwali promo 2024-11") vs data errors (re-load; fix at source!). NEVER delete spikes silently: winsorize (cap at 99th pct) for MODEL TRAINING only, keep raw series for reporting; log every cap in the audit trail. Spikes removed from training without notes = next year's forecast mystery bug.

## 📘 2.8 Change-point instincts — the regime whisperer

Watch the deseasonalized series + rolling mean/sd jointly: a STEP-shift (new baseline after a date) breaks SMA-family assumptions (slowly adapts, wrong for months). Clues: residual runs one-sided, MA suddenly "wrong side" every month. Confirm with business knowledge first (new channel? pricing change?), then mark the regime boundary explicity in notebooks; model post-break data separately when stats demand (TGIF... this is where fancy CUSUM/ruptures libs live — `pip install ruptures` curiosity homework).

---

## 🧪 LAB TS2 — The ShopKart decomposition line (55 min)

1. SMA3/SMA12 + EMA(12, adjust=False) on rev36, all 4 lines on ONE plot with legend+spans footnoted; spot their lag difference at the first big seasonal turn (comment!).
2. 2×12 centered trend via §2.2; extend it visually 2 months — now state CLASSIC's endpoint blindness in one sentence (why we lose ~6 months of trend info at a time).
3. Multiplicative seasonal_decompose full panel: screenshot the I-panel; every |I−1|>10% month investigation-listed with hypothetical causes (campaign? dec slump? data?).
4. Deseasonalized series: replot YoY path on deseason; rewrite a "bad ❌" exec sentence from raw MoM vs the deseasonalized truth ("Dec fell −11%" → yours).
5. STL robust vs classical decomposition side-by-side T-panel: where do they differ most & why (outlier months ~ recall TS1 portraits)?
6. Winsorize training variant (cap at 99pct): recompute seasonal indexes PRE/POST caps; which month moved the index most? Log your cap table as CSV.

## 💪 Exercises
1. Why is a 12-window special for monthly seasonally-driven series — what dies inside the average?
2. EMA half-life: compute for α={0.1, 0.3, 0.5} and translate each span into "reporting" vs "alerting" jobs.
3. Centered-MA edge loss: exactly how many trend points vanish at each end of a 2×12 — and what TWO approaches replace them at the boundary?
4. Deseasonalized-vs-Year-over-Year comparison: which is stricter for monthly health, and why does YoY feel easier in exec decks?
5. Winsorizing vs removing outliers: scenario where winsorizing still lies.

### ✅ Selected answers
- Ex 1: the seasonal cycles nicely through exactly one full orbit per window → seasonal terms average to 1 (multiplicative) / 0 (additive) — trend survives, season cancels by construction.
- Ex 3: 6 points each side; replacement candidates: STL's loess handles boundaries / or model the trend (regression fit) so extrapolation becomes explicit not hidden.
- Ex 5: recurring shocks — EVERY festive month is an "outlier": capping deletes the exact phenomenon a seasonal index wants (never winsorize systematic seasonality!).

## ❓ Quiz
1. 2×12-MA accomplishes what vs plain 12-SMA?
2. EMA's recursive update (one formula) + one dashboard benefit?
3. Deseasonalized comparisons fix which classic exec-report lie?
4. STL beats classical on which two real-world properties?

### ✅ Answers
1. Centers an even window's estimate ON each month (aligned, unbiased-phase trend) — classical decomposition's trend spine.
2. `EMA_t = α·y_t + (1−α)·EMA_(t−1)` — one-step update, no stored window; fresh values each refresh = dashboards love it.
3. Calendar-rhythm illusions: raw MoM confuses seasonal months (Dec slump, May spike) with business turns; deseason compares like-for-like.
4. Nonlinear trends (bends) + robustness to outliers (robust=TRUE) — reality's default rather than the clean-classroom case.

## ✅ Mastery checklist
- [ ] SMA/EMA built with span+half-life footnoted
- [ ] Classical + STL decomposition panels audited
- [ ] Deseasonalized truth-chart + rewritten exec sentence
- [ ] Outlier policy: winsorize-with-audit-trail, never silent-delete

**Next: TS3 — Exponential Smoothing models (SES→Holt→Winters), Excel FORECAST.ETS & your first real forecast. ⚗️**
