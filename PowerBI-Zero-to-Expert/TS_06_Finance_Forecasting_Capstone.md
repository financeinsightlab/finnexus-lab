# TS6 · Finance Forecasting Capstone: The End-to-End Forecast Engine

> *Time to ship. This capstone assembles everything TS1–TS5 into a living forecasting system for ShopKart's finance team: a model tournament with champions and receipts, budget bands for FY26, a cash-flow outlook, a rolling-error tracker, and a monthly review process that runs without you. This is CV-bullet material, verbatim.*

## 🎯 Objectives
Champion-model tournament with documented receipts · FY26 budget from forecast BANDS (not points) · cash-flow outlook via AR-days coupling · forecast-vs-actual tracker (error ledger) · the monthly review process (FVA institutionalized) · the final deliverable stack.

---

## 📘 6.1 Architecture — the pipeline in one view

```
monthly/ CSVs ──load──> rev36 (+ region/category cuts)
        │                GL actuals (accounting view) 
        ├─ portrait+decompose (TS1/TS2) ─> deseason, indexes
        ├─ candidates: snaive | HW-mul-damped | SARIMA | SARIMAX(+exog)
        ├─ rolling-origin tournament (TS5) ─> MASE/bias/coverage scoreboard
        ├─ CHAMPION + bands (calibrated) 
        ├─ budget bands (FY26) → Finance owners sign off
        ├─ cash-flow outlook (AR/AR-days coupling)
        └─ monthly error ledger + FVA review —> model council decisions
```

Records at every station of DV6's truth: each headline ties to its source (fifth time this course: reconcile before reveal!).

## 📘 6.2 The tournament — champions crowned with evidence

```python
# Scoreboard template (fill from TS5 lab machinery):
# model            MASE   bias₹L   RMSE₹L   coverage95%   verdict
# seasonal-naive   1.00   +0.3     1.85     67%           gatekeeper
# Holt-Winters     0.74   -0.1     1.51     92%           champion (calibrated)
# SARIMA(1,1,1)... 0.79   +0.2     1.60     88%           runner-up — audit quarterly
# SARIMAX+promo    0.69   -0.2     1.42     93%           champ when promo plan exists
```

Rules: promotion only by rolling-origin MASE with ≥3 origins; calibration ≥90% for 95%-claims; losers stay deployed monthly as SHADOW for one quarter (dethronement is data-decided, not fashion-decided).

## 📘 6.3 Budget from bands — most CFOs never saw this coming

Point-forecast budgets are fiction; band budgets are queues to act on:
- **Plan** = P50 path (median scenario) — the operating target, deseasonalized logic applied to monthly splits using TS2 indexes (shared truth for sales targets!).
- **Stretch** = P80; **Covenant/safety** = P20 (cash-headroom planning: credit line sized to the P20 month, not the P50 fantasy).
- Document: assumption list beside (promo calendar, no price war, INR regime stable; change-logged if any flips).
- Variance conversations change: "missed budget" becomes "outside P50–P80 corridor" — the accountable question sharpens (fair-weather misses vs true signal: TS5's control-chart lens grafted onto forecast tracking!).

## 📘 6.4 Cash-flow outlook — revenue × payment behavior

Finance reality: revenue ≠ cash (AR days!). Lightweight engine:

```python
# AR-days model: collect_t ≈ share_same_month · y_t + share_next · y_(t−1) + share_60d · y_(t−2)
collect = 0.60 * fc + 0.30 * fc.shift(1) + 0.10 * fc.shift(2)     # tune from actuals!
cash_need = collect - (payroll + rent + cogs_now)                    # simplified
```

Calibrate shares on 2024 actuals (receipts vs shipments ledger when available; ELSE state assumption & monitor monthly). Deliverable: 6-month expected collections + P50/P20 band per month → treasury brief in one table. (The remaining debt-schedule + interest effects come from Py2/Py6 loan engines — integrate them for the full nerd-bird view.)

## 📘 6.5 The error ledger — forecasts accountable forever

Monthly, append: actual, P50, band, error, bias-run, inside-band? — then:
- Control rules: ≥2 consecutive months outside band ⇒ council review (model or world changed?);
- Rolling 3-origin MASE recompute ⇒ dethronement check (shadows waiting!);
- Override log: every manual tweak with reason + outcome (FVA by step, TS5).
The ledger is Excel-friendly (E6/P5 muscle) — one tab, no magic, refreshing monthly; optional Power BI page (M6/DV craft) for the council's gaze.

## 📘 6.6 The review process — forecasting as an institution

Monthly Forecast Council (30 min):
1. Ledger readout (5'): errors, bands, bias-runs.
2. Champion health (10'): MASE vs shadows, coverage, Ljung-Box spot checks.
3. Exog/plan changes (5'): promo calendar, price moves, new regions (low-data rules from TS5).
4. Decisions (10'): keep/swap/damp champion; adjust bands; log overrides.
Output: one paragraph council memo + updated ledger row. Total cost: 2 engineer-hours/month. Total value: budget discipline that compounds — the moat of boring excellence.

---

## 🧪 LAB TS6 — Ship the engine (120 min, your capstone)

1. **Tournament**: re-run TS5 rig cleanly from raw CSVs on rev36; produce the scoreboard table (MASE/bias/RMSE/coverage per model); crown + shadow assignments.
2. **Bands**: champion's 6-month P20/P50/P80 monthly table, calibrated per TS5 receipts; chart with DV-grade labels + St5/DV5 band disclosures.
3. **Budget bands FY26**: extend horizon 12m on full history (state the longer-band humility + why widen!), split monthly via TS2 indexes (share-weights), document 5 assumptions.
4. **Cash outlook**: 60/30/10 collection engine on bands; monthly expected-collections table + P20 caution column; treasury 5-line memo.
5. **Ledger v1**: Excel tab skeleton: 2025 actuals vs P50 rows, columns (error, %, inside?, overrun-rule flag, bias-run); formula-driven (E6 skills: SUMIFS/EDATE!); first 2 rows filled from actuals.
6. **Council memo #1**: 1 page — process design + first findings + next-quarter experiment list (SARIMAX-with-promo trial, regional-level hierarchy experiment, Diwali-covariate refinement); self-score with DV6 rubric only where visuals appear.

## 💪 Exercises
1. Why should shadows stay for a quarter post-dethronement instead of being deleted on the spot?
2. Budget P20 ≠ band-P20 in which scenario — name a structural reason bands may understate (hint: model-form blindness).
3. Collection-share calibration: what does a rising AR-days trend do to the 60/30/10 engine and how do you detect before pain?
4. Council anti-pattern: overrides that win by luck once — how does the log protect against survivorship (St6 ghost!)?
5. Integrating Py6's close pack with this engine: name 2 synergies (data + governance).

### ✅ Selected answers
- Ex 2: tails not in the model's family: regime breaks (price war, law change) — mitigate via scenario adjunct (hand-adjusted P5 line) clearly labeled as judgment, not statistics.
- Ex 4: the override log records EVERY tweak with outcome; one-shot wins can't hide among forgotten losses — council reviews win-RATE, not win-moments.

## ❓ Quiz
1. A "band budget" replaces what habit, and which two extra numbers govern treasury?
2. MASE promotion rule + the shadow-quarter devotion?
3. Error-ledger's two control triggers (outside-band run + …)?
4. FVA's core measurement per process step?

### ✅ Answers
1. Point-forecast budgets; operating plan = P50 with P80 (stretch) and P20 (covenant) alongside — bands size credit lines, points size nothing.
2. Crown only by rolling-origin MASE across ≥3 origins; dethroned models shadow one quarter — decisions by evidence over moods.
3. ≥2 consecutive months outside the band; rolling-MASE deterioration vs shadows — each triggers council review with logged action.
4. Each step (naive → model → planner) must beat its input's error — steps that add theater not value get redesigned/removed.

## ✅ Mastery checklist
- [ ] Champion crowned with receipts (scoreboard shared)
- [ ] FY26 band budget + treasury cash outlook delivered
- [ ] Error ledger live (formula-driven, monthly-grained)
- [ ] Council process memo #1 written + calendar-blocked 🗓️

**🏆 TIME SERIES TRACK COMPLETE.** From clockwork-reading to a rolling forecast institution: portraits, smoothing, ETS, SARIMA, validation, hierarchies, bands, budgets, governance. You forecast like a finance professional now — humbly, with intervals, and always with receipts. 🔮📈
