# TS4 · ARIMA & Dynamic Regression: The Statistical Machinery

> *Exponential smoothing forecasts by weighted MEMORY; ARIMA forecasts by explicit STATISTICS — autoregression on the past, moving-average of shocks, integration of differences. It demands stationarity, rewards diagnostics, and speaks fluently in p,d,q. This module makes the black box transparent.*

## 🎯 Objectives
Stationarity→differencing d · ACF/PACF order identification (p, q intuition that sticks) · ARIMA fitted + read · seasonal SARIMA (P,D,Q,s) · AIC/BIC model selection & auto_arima workflow · Ljung-Box residual proof · dynamic regression (ARIMA + covariates) & Fourier terms for complex seasons.

---

## 📘 4.1 The A-R-I-MA name, unpacked

- **AR(p) — autoregressive**: today explained by its own past p values: `y_t = c + φ₁y_(t−1) + … + φ_py_(t−p) + ε_t`. Momentum with memory. PACF cuts off after lag p (the tell!).
- **I(d) — integrated**: we model the d-th DIFFERENCE (TS1's stationarity gate): d=1 dominates finance levels; d=2 when differenced still trends.
- **MA(q) — moving average**: today explained by past q SHOCKS: `y_t = c + ε_t + θ₁ε_(t−1) + … + θ_qε_(t−q)`. Shocks linger briefly then clear. ACF cuts off after lag q (the mirror tell!).

Combined on differenced data: ARIMA(p,d,q) — a recipe, not magic: difference until stationary (d), then model leftover pattern (p AR terms, q MA terms).

## 📘 4.2 Identification ritual — the classic table

After differencing to stationarity (ADF receipt in hand):

```
PACF cuts after p, ACF trails → AR(p)-dominant
ACF cuts after q, PACF trails → MA(q)-dominant
both trail/decay       → ARMA mix (try (1,0,1) first)
spikes only at 12/PACF-12 → SEASONAL terms needed (P,Q)s
```

Reality check: on noisy business data the walls rarely sing opera — take the table as GUIDANCE, then let AIC + Ljung-Box referee (§4.4, §4.6). Over-identifying by eye = overfitting by vanity.

## 📘 4.3 Fitting & reading one ARIMA

```python
from statsmodels.tsa.arima.model import ARIMA
fit = ARIMA(rev36, order=(1,1,1)).fit()
print(fit.summary())                    # coefs, se, z, p — the t-test wall from St4's world
fc = fit.get_forecast(6)                # mean + conf_int (model-based bands!)
print(fc.summary_frame())
```

Reading: AR coef sign/strength (momentum), MA coef (shock absorption), sigma² (noise scale, drives bands), AIC (fit-complexity trade — lower wins). Each coef p<0.05-ish? kill dead terms (simpler = robust + honest).

## 📘 4.4 SARIMA — the seasonal upgrade

SARIMA(p,d,q)(P,D,Q,s): seasonal twins operate at lag s=12: seasonal AR (SAR), seasonal MA (SMA), seasonal differencing D (`y_t − y_(t−12)` explicitly subtracts the calendar — TS1's diff(12) drill returns as a model part!). Typical start: (1,1,1)(1,1,1,12), then prune by AIC & residual tests.

```python
from statsmodels.tsa.statespace.sarimax import SARIMAX
sar = SARIMAX(rev36, order=(1,1,1), seasonal_order=(1,1,1,12),
              enforce_stationarity=False, enforce_invertibility=False).fit()
sar.get_forecast(6).summary_frame()
```

Both ETS (TS3) and SARIMA handle trend+season — DIFFERENT bones: ETS ≈ components-smoothed memory; SARIMA = parametric differences + shock-modeling. Forecast TOURNAMENTS (TS6 crown) pit them honestly; business reality picks winners, brand loyalty picks losers.

## 📘 4.5 AIC/BIC & auto_arima — search with conscience

- **AIC** = fit − penalty·k (parameters): lower = better trade-off; **BIC** harsher on k (bigger data ⇒ trust BIC more for sparsity).
- Auto search = stepwise/optimizer over (p,d,q)(P,D,Q): `pmdarima`'s auto_arima (pip install; sanity args: `seasonal=True, m=12, stepwise=True, suppress_warnings=True, max_p=3, max_q=3, d=None, D=None`).

Rules of conscience: cap search space, ALWAYS verify stationarity story (d/D testing inside), NEVER ship top-AIC blindly: compare to (1,1,1)(1,1,1) hand baseline + ETS champion + naive benchmarks (the tournament again!), Ljung-Box check survivors.

## 📘 4.6 Ljung-Box — the residuals' court date

H₀: residuals are jointly white-noise up to lag m. p<0.05 ⇒ autocorrelation remains ⇒ model is missing structure ⇒ back to orders, not forward to deck:

```python
from statsmodels.stats.diagnostic import acorr_ljungbox
acorr_ljungbox(sar.resid, lags=[12, 24], return_df=True)
```

Pair with residual mean (bias) & normality (JB, St6's friend). Note: Ljung-Box has df adjusted by model terms (fit df) — statsmodels handles via `model_df=fit.df_model` when needed.

## 📘 4.7 Dynamic regression & Fourier terms — beyond one series

**Regression with ARIMA errors (dynamic regression / SARIMAX exog)**: the model learns from predictors (Marketing spend, promo flags, Diwali-month dummy!) while ARIMA cleans leftover autocorrelation (St5's spurious-rescue matured):

```python
exog = monthly_df[["Marketing", "IsDiwali", "PromoFlag"]]     # aligned monthly!
SARIMAX(rev36, exog=exog, order=(1,1,1), seasonal_order=(1,1,1,12)).fit()
```

- **Fourier terms** (sin/cos pairs) model season flexibly inside regression/ARIMAX when periods get awkward (weekly 52.18!) or shapes non-smooth: 2–4 pairs typically; chosen by AIC.
- Leakage vigilance: exog future values at forecast time must be KNOWN/PLANNED (planned marketing calendar ✅, unknown next-Dec ✅-unknown → scenario the scenarios) — forecasting the world before forecasting the series (TS5's plan discipline).

---

## 🧪 LAB TS4 — The ARIMA forge on rev36 (65 min)

1. Orders by hand: ADF-test ladder (d, D) then stare at differenced ACF/PACF walls → nominate TWO candidate orders in writing (your human priors).
2. Fit your candidates + (1,1,1)(1,1,1,12) baseline + auto_arima (if pip allows; else simulate the grid manually 3 combos) → AIC/BIC table, rank them.
3. Winner deep-read: summary wall; coef significance; drop losers & refit simpler; AIC path printable?
4. Ljung-Box [12,24] + residual mean + JB normality on the winner: verdict sentences (fail Ljung-Box? iterate or defect to ETS champion, both are real pro moves).
5. SARIMAX with Marketing exog: does thе Marketing stay significant AFTER ARIMA eats autocorrelation? compare its coef+CI vs the naive St4 OLS — write the humility paragraph (St5's spurious trap quantified!).
6. Forecast frame: 6-month mean + 95% bands from BOTH winner-SARIMA and TS3's HW — overlay them on one figure; do the two machines agree on May-peak position? Divergence explained in one line each?

## 💪 Exercises
1. AR(1) φ=0.95 near-unit-root — what does the ACF look like and why is it dangerous un-differenced?
2. AIC vs BIC tension: under which data sizes would you report BIC as primary referee, and why?
3. Auto_arima chose (0,1,1)(0,1,1,12) — interpret the pure-MA anatomy & one reason data likes it (hint: ETS equivalence family!).
4. Exog LEAKAGE trap: name one popular covariate that is useless-at-forecast-time unless you separately forecast IT (and how to scenario around it).
5. Why must exog matrices be aligned length-with-series and shifted-clean? What breaks silently otherwise?

### ✅ Selected answers
- Ex 1: ACF hyper-slow decay near 1, looks like trend — model memorizes persistence rather than learning structure; differencing reveals the white-noise-underneath that AR can actually explain.
- Ex 4: Rate-promo/growth-path covariates like "future interest rates or FX next year" — unknowable; handle via scenarios/planned values only (scenario bands, not point-pretense).

## ❓ Quiz
1. In ARIMA(p,d,q): which parameter is THE finance levels' default, and why?
2. ACF-vs-PACF cut-off tells for AR(p) and MA(q)?
3. Ljung-Box failing after your champion — the meaning + your next move?
4. Dynamic regression's promise vs plain regression-with-autocorrelated-errors illusion?

### ✅ Answers
1. d=1 — level series (revenue, balances, prices) trend → first-difference reaches stationarity; d=0 for returns/growth already stationary.
2. AR: PACF cuts after lag p (ACF tails); MA: ACF cuts after lag q (PACF tails); mixed → both tail with cautious small orders.
3. Leftover predictable structure — model diagnosed as incomplete: revisit orders/seasonality/covariates, or concede to a better ETS/benchmark; never ship through a failed gate.
4. Promise: coefficients that survive autocorrelation correction (marketing ROI read!). Illusion: OLS on autocorr data inflates t-stats (St5 DW ghost) → false significance, false confidence, false budget.

## ✅ Mastery checklist
- [ ] p,d,q + P,D,Q nomination with ACF/ADF receipts
- [ ] AIC/BIC tournament incl. baselines & auto search
- [ ] Ljung-Box + bias + normality all passed (or honest defect)
- [ ] SARIMAX exog lesson internalized (leakage & spurious)

**Next: TS5 — validation designs, interval calibration, hierarchies & covariates: the pro's forecasting operations. 🧬**
