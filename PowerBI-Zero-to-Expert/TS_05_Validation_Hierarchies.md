# TS5 · Validation, Intervals & Hierarchies: The Pro's Forecast Operations

> *A forecast is not a number — it's a system with a testing regimen, honest uncertainty, and a reconciliation story across every cut of the business (regions, categories, channels…). This module is the operations manual: validate like an auditor, calibrate bands like a risk manager, reconcile like a finance controller.*

## 🎯 Objectives
Time-aware validation designs (holdout, rolling origin, blocked) · the metric shelf (MAE/RMSE/MAPE/sMAPE/MASE) with meanings · prediction-interval CALIBRATION · hierarchical forecasting (top-down/bottom-up/middle-out + reconciliation math) · covariates & interventions · low-data strategies · FVA (forecast value added) process.

---

## 📘 5.1 Validation designs — the time-machine rules

```python
# ROLLING ORIGIN (the gold standard): train to t, forecast h, slide t, repeat:
for cutoff in range(start, len(s) - h):
    train, test = s[:cutoff], s[cutoff:cutoff + h]
    # refit model on train → score h-ahead against test → collect errors
```

- **Holdout once** (train ≤2024, test 2025): cheap, ONE roll of dice — fine for a first smell, insufficient as a verdict.
- **Rolling origin** = honest autopsy: multiple forecast origins over history; aggregates errors across DIFFERENT seasons/moods — the defensible number.
- **Blocked (purged) CV** for ML pipelines: no leakage through overlapping features (lags!); embargo between train/test when lags bleed.
- Choose h = the DECISION horizon (board = 1–3mo; budget = 12mo); score AT h that matters, not just h=1 (models great at 1-month, awful at 6, exist).

## 📘 5.2 Metric shelf — pick by question

- **MAE**: mean |error| — median-flavored robustness; says "typical miss in ₹".
- **RMSE**: punishes big misses (squared) — for tail-risk-averse finance.
- **MAPE**: % per point but dies at zero/small bases (St5 warning); **sMAPE** softens the asymmetry (still biased toward LOW forecasts; note in methods).
- **MASE** = model MAE ÷ in-sample NAIVE MAE: **<1 beats naive** (the benchmark law quantified!), comparable across series with different scales. THE report metric for tournaments (Hyndman's champion).
- **Bias (mean error)**: systematic over/under-forecast — budgets die here even when MAE looks fine; report beside every accuracy number.

## 📘 5.3 Calibration — do 95% bands cover 95%?

Compute interval MISSES across your rolling-origin runs:

```python
inside = (test >= lower) & (test <= upper)
coverage = inside.mean()          # hope: ≈ nominal 0.95; if 0.70 → bands too tight!
```

Undercoverage (too tight, overconfident) → widen via residual-bootstrap/simulation or Student-t df; overcoverage (too wide, useless) → consider better model before accepting. **Report coverage% beside RMSE**— a point-accuracy story without calibration receipts is half-dressed (St6's ES spine, applied to forecasts).

## 📘 5.4 Hierarchical forecasting — every cut must agree

ShopKart revenue exists simultaneously as: Total = Σ Regions = Σ Categories = Σ Regions×Categories. Naively forecasting each series independently → numbers that don't add (controller rage).

- **Bottom-up**: forecast leaves, sum up (noisy leaves average down; best when leaves are strong; total inherits leaf drama).
- **Top-down**: forecast total, spread by historical proportions (stable shares; leaves inherit share-error; misses local shocks).
- **Middle-out**: forecast at one robust level (e.g., Region), derive above & below.
- **Reconciliation** (MinT-family math): coherent adjustments so all levels sum — practically: forecast all levels then shrink each toward consistency (libraries: hierarchicalforecast). Monthly close sanity check: SUM of parts = total ±a rounding paisa. S5/P5's tie-out religion, in forecast form.

## 📘 5.5 Covariates & interventions — models meet reality

Known-future regressors elevate everything: planned promotions, holiday calendars (Diwali-movable!), price-change dates, marketing budget plan, festive-working-days. In SARIMAX they enter exog (TS4); in ETS via adjusted series (pre-deseasonalize/promo-normalize); deployment rule: **only knowable/planned futures** — else scenario-fork explicitly ("if promo runs: band A; if not: band B" — TWO answers are the honest one).

**Interventions**: one-off events (warehouse flood −30% month): don't teach it as season — flag dummy, model the pre/post regimes (TS2's change-point echo), exclude/impute consciously.

## 📘 5.6 Low-data strategies — forecasting with 8 points

New product/region: (a) analogous-series borrow (map to similar category's seasonal shape, scale by launch level); (b) pooled/global models (fit one model across leaves sharing parameters — strength in numbers; statsmodels VAR / global-ML flavors live here); (c) judgment + tracking: naive/snaive until error evidence allows promotion to a real model; (d) DECLARED wide bands (honest uncertainty when n is tiny — St3's CI humility in series form!).

## 📘 5.7 FVA — Forecast Value Added, the process KPI

Measure each PROCESS STEP's contribution: naive → statistical model → planner-adjusted. If planners' tweaks don't beat the model they inherit, the step adds theater not value. Track monthly per step (MAE/MASE), publish, adjust: models promoted/demoted by evidence; overrides logged with reasons (the audit trail finance respects). Forecasting IS a process with a P&L, not a one-shot model — write its review cadence (monthly error review: who, what, band checks, override log).

---

## 🧪 LAB TS5 — Validation & reconciliation gauntlet (70 min)

1. Rolling-origin rig on rev36: origins at 2024-01 … 2025-07 (h=3), models: seasonal-naive + HW(TS3) + SARIMA(TS4) — collect per-origin MAE; boxplot the MAEs per model (variability visible!); ONE verdict sentence.
2. MASE table: per model, per origin; champ gets crowned with scoreboard screenshot; bias column beside, noted explicitly.
3. Calibration audit: from HW's bands at h=3 across origins → coverage% of 95% claim; write the adjustment applied if under-covered and its effect.
4. Hierarchy lab: build Region-level series (join Sales↔Customers; 4 regions × 36m); bottom-up vs top-down totals for 2025 with the total series as judge; compute each's total-RMSE AND leaf-dispersion; reconcile summary recommendations (which level drives YOUR business best?).
5. Exog production: promo flag dummy for 2025-11 (Diwali push known-planned) + holiday-month Fourier (2 pairs) in SARIMAX vs without: forecast-Dec'25 comparison; comment realism.
6. FVA memo: design the monthly error-review ritual for ShopKart (owner, inputs, band-check, override log columns, escalation triggers).

## 💪 Exercises
1. Why does holdout-once over-trust models vs rolling origin — what variance does it hide?
2. sMAPE's asymmetry: which direction of error does it penalize softer, and the budget-risk story?
3. MASE>1 — translate the verdict into a ONE-line order to the modeling team.
4. Top-down's share-error mechanics: when does top-down beat bottom-up DESPITE local blindness?
5. Purged/blocked CV embargo: why do lag-features contaminate naive k-fold specifically (name the leak path)?

### ✅ Selected answers
- Ex 1: holdout = one historical mood (one season cycle, one trend regime) — error variance across regimes invisible; rolling origin samples multiple worlds.
- Ex 5: lag features built at t read y_(t−k) that randomly lands in the test fold for k-fold order-shuffles — the serial correlation carries the future backwards; embargo gaps sever the path.

## ❓ Quiz
1. Rolling origin beats holdout because it tests across ___?
2. MASE's reference and the <1 rule?
3. Hierarchical forecasting's core constraint (why independent forecasts enrage controllers)?
4. Coverage 70% on a "95%" band demands what action?

### ✅ Answers
1. Multiple origins/seasons/regimes — error distribution, not one lucky year.
2. Divide by in-sample naive MAE; <1 = beats naive; ≥1 = the naive benchmark out-forecast your model (kill/rollback).
3. Coherence: parts must sum to the whole across every cut — reconciliation aligns point-forecasts with one truth for the close pack.
4. Bands too tight (overconfident): widen via bootstrap/simulation/t-distribution or fix model bias first — then RE-audit coverage until calibrated (report coverage beside accuracy always).

## ✅ Mastery checklist
- [ ] Rolling-origin tournament + MASE champion crowned
- [ ] Coverage% audited and bands re-calibrated
- [ ] Hierarchy strategy chosen & defended
- [ ] FVA process memo drafted (cadence + logs)

**Next: TS6 — capstone: the full forecasting engine + budget bands + cash-flow outlook + review process, shipped. 🏅**
