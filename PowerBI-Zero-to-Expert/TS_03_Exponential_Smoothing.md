# TS3 · Exponential Smoothing Models: SES → Holt → Winters (+ FORECAST.ETS)

> *The workhorse family of business forecasting: simple enough to explain to a CFO, strong enough to run a supply chain. Level, then level+trend, then level+trend+season — three machines, one idea: recent data weighs more. By module end you'll have produced ShopKart's first formal 6-month forecast with honest bands.*

## 🎯 Objectives
Naive/seasonal-naive/drift benchmarks (the honesty gate) · SES & α intuitions · Holt linear & damped trends · Holt-Winters additive/multiplicative · Excel FORECAST.ETS fluency · statsmodels implementation · residual diagnosis · your first banded forecast (ShopKart revenue, six months).

---

## 📘 3.1 Benchmarks first — the gatekeepers return

St5's law, now with keyboard: before ANY model, implement:

```python
naive   = s.shift(1)                        # next = last
snaive  = s.shift(12)                       # next = same month last year (season-killer)
drift   = s.shift(1) + (s - s.iloc[0]) / (np.arange(len(s)) / 12)   # last + avg-change
```

These three, plus MEAN, cost zero to produce. A model that fails to beat seasonal-naive on monthly ShopKart data gets deleted without discussion (its RMSE found a worse way to say "last year").

## 📘 3.2 SES — level-only, the smart EMA

**Simple Exponential Smoothing** for ~stationary series (no trend/season): forecast = EMA(level):

```python
from statsmodels.tsa.holtwinters import SimpleExpSmoothing
ses = SimpleExpSmoothing(usdinr_ret.dropna()).fit(smoothing_level=0.3)
ses.fittedvalues; ses.forecast(3)
```

`level_t = α·y_t + (1−α)·level_(t−1)`. α near 1 = fast & jittery; α near 0 = calm & slow (α≈0.3 = decent starting culture). All forecasts from SES are FLAT (one number repeated) — correct ONLY when trend/season don't exist (FX returns-ish series!).

## 📘 3.3 Holt — let trend breathe

Adds the trend term: `level`, `trend` updated each step; forecast = level + h·trend (a straight runway):

```python
from statsmodels.tsa.holtwinters import Holt
holt = Holt(trend_series).fit()     # α (level), β (trend) optimized by SSE
holt.forecast(6)
```

Danger: linear-runway hype — Holt extrapolates last slope FOREVER (a +/-runaway in 24 months → fantasy). **Damped Holt** (`damped_trend=True`, φ<1) bends trend toward flat far out — the sane default for revenue (surprises fade, empires plateau).

## 📘 3.4 Holt-Winters — the seasonal king

```python
from statsmodels.tsa.holtwinters import ExponentialSmoothing
hw = ExponentialSmoothing(rev36, trend="add", damped_trend=True,
                          seasonal="mul", seasonal_periods=12).fit(optimized=True)
fc = hw.forecast(6); hw.params   # α, β, γ, φ — print & interpret all four!
```

- Additive season: swings constant in ₹ (small/stable business); **multiplicative**: swings scale with level (ShopKart's growing May? → mul; multiplicative needs strictly positive series — our revenue is fine).
- Read params as personalities: α = how fast LEVEL forgets; β = trend jumpiness (almost always tiny); γ = how fast seasons relearn (near 0 = stable calendar!); φ = trend-damping courage. Sanity: tiny γ on seasonal fests = stable Diwali/US-Diwali identity?

## 📘 3.5 Excel FORECAST.ETS — the CFO-friendly route

```
=FORECAST.ETS(date, values, timeline, [seasonality], [data_completion], [aggregation])
=FORECAST.ETS.CONFINT(date, values, timeline, confidence)
```

- Auto-detects season length (or set 12), handles missing months per arg, returns point forecast; CONFINT gives the band (95% default, set 0.9 sometimes). Under the hood: AAA/ETS-family with parameter optimization — the VERY machinery of §3.4! Power BI's line-chart "forecast" = cousin (exp smoothing too).
- Deployment trick: compute point + UPPER + LOWER columns in ONE sheet → plot trio → chart bands like the pros (fan-lite, DV5 chapter born in Excel).

## 📘 3.6 Residual diagnosis — the model's conscience

```python
resid = hw.resid          # in-sample errors: the model's leftovers
resid.mean()              # ≈0? bias check!
plot_acf(resid, lags=18)  # any bar outside band = signal left behind!
resid.std()               # drives the bands (wider ⇒ honest uncertainty)
```

Residuals MUST behave like white noise (TS1): mean≈0, ACF inside the band, no seasonal ghosts at lag 12, no funnels. Anything else = the model missed structure; improve model, don't widen excuses.

## 📘 3.7 Bands the honest way

- ETS family produces analytic sqrt-growing bands (statsmodels: `get_forecast(6).summary_frame()` when using `.fit` under state-space wrapper `sm.tsa.ExponentialSmoothing` or `holt.forecast`+manual σ·z·√h).
- Excel: CONFINT spreads √-wise by horizon automatically — screenshot-worthy sanity: check Jan-band looks wider than Dec-band.
- Label the band "95% prediction interval, residuals→σ" (DV5 law) and pair with fan-visual (St5's bands, DV5's rules —可视 together at last).

---

## 🧪 LAB TS3 — First formal forecast, ShopKart revenue (60 min)

1. Benchmarks: naive/seasonal-naive/drift for 2025 given history thru 2024 → their 2025 RMSE + MAE table (TS5 scoring preview). Seasonal-naive = required trophy.
2. statsmodels Holt-Winters mul + damped, history→2024: params printed (α β γ φ); interpret in 3 sentences as personalities.
3. 2025 forecast vs actual: per-month error table + measures: bias, MAE, RMSE; beat benchmarks? By how much (%)?
4. Bands: build σ·1.96·√h band (or get_forecast frame), plot fan "+" actual 2025 dots INSIDE or OUT — count outliers, honesty-box sentence ("1/6 months broke the 95% band: too few? too many? comment").
5. Excel cross-build: FORECAST.ETS + CONFINT on the same history; plot; compare ONE month's point vs Python (drift accounted? params diff?) — 2-line verdict.
6. Sanity theatre: refit damped=False; extend 36 months out — screenshot the runway disaster; damped=True again; write one memo line on why φ matters to CFOs.

## 💪 Exercises
1. α=0.9 vs α=0.1 narrative — which suits promo-heavy retail weekly data vs slow-moving base-rate KPIs?
2. Why is Holt unsafe for 24-month horizons & the φ-fix in one formula-ish sentence?
3. Additive vs mul seasonality decision rule from TS1/2 checks?
4. Residual ACF spike at lag 3 after Holt-Winters: WHAT kind of information is left, and the first fix you try?
5. FORECAST.ETS seasonality arg auto-detects "12″ monthly rhythm — failure case when it CAN'T (name a real dataset reason)?

### ✅ Selected answers
- Ex 2: linear runway extrapolates slope forever; φ∈(0,1) powers trend term gradually to zero: `level + (φ + φ² + … + φʰ)·trend` — trend decays geometric.
- Ex 5: irregular/missing calendars (fiscal months differing lengths, sparse series under ~3 full cycles, 13-period fiscal calendars) auto-seasonality guesses wrong — set explicitly or aggregate to calendar months first.

## ❓ Quiz
1. The three benchmarks every model must beat?
2. Name the ETS triple and the structure each adds: SES×Holt×Winters?
3. Residual WHITE-NOISE criteria (4)?
4. Damped Holt's φ fixes which classic failure?

### ✅ Answers
1. Naive, seasonal-naive, drift (+mean) — scored on rolling windows, not luck.
2. SES = level only; Holt = +trend; Winters = +seasonal component (add/mul) — the ladder matches data complexity, no more.
3. Mean≈0 (unbiased), ACF inside band everywhere, no seasonal ghosts, homoscedastic (no funnels) + roughly Gaussian face if bands matter.
4. Linear-runaway: unbounded straight extrapolation — φ damps the trend to sanity at long horizons (flats where hype lived).

## ✅ Mastery checklist
- [ ] Benchmark table produced and enforced
- [ ] Holt-Winters mul+damped fitted, params interpreted
- [ ] Banded 6-month forecast + out-of-band audit
- [ ] Excel FORECAST.ETS cross-check delivered

**Next: TS4 — ARIMA & dynamic regression: statistical forecasting meat, p/d/q hunting, SARIMA, Ljung-Box. 🤖**
