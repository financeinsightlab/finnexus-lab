# 🎯 DT11 · Presentation, Rate Change & the Reconciliation — Putting the Shadow Ledger on Display

> You can compute every shadow perfectly and still publish a misleading tax note. This closing-mechanics module bolts down the three finishing arts: OFFSET (the two conditions that let hundreds of DTA/DTL lines compress into one number), MEASUREMENT AT REVERSAL RATES (substantively enacted, not wishfully proposed — with the ₹10L → ₹8.8L remeasurement release), and the NUMERICAL RECONCILIATION — the crown jewel table where ₹500L of accounting profit × 25% becomes ₹123.8L of actual tax expense, line by explained line, and the effective tax rate reveals itself at 24.76%. This is the first table sophisticated analysts photograph in any annual report, because it converts the company's entire tax story into six honest lines.

---

## 🎯 Objectives

- Apply the offset rules: DTA and DTL may net only when the set-off right AND the pattern align
- Measure deferred balances at reversal-expected rates — substantively enacted discipline
- Run a rate-change remeasurement: DTL ₹10L → ₹8.8L, release ₹1.2L to P&L (OCI-parked: to OCI)
- Build the tax-rate reconciliation: ₹125L → ₹123.8L with ETR 24.76%
- Recite the disclosure roll: TDs by nature, unrecognized DTA expiry, aggregate reconciliations

## 📘 Concepts

### 11.1 Offset — when the shadow ledger shows one number

Current tax assets and current tax liabilities offset only when the entity has a **legally enforceable right to set off** (same taxable entity, same taxation authority) AND **intends to settle on a net basis** (or realize simultaneously). Deferred DTA/DTL offset demands the same authority pair plus a pattern condition: the DTA vs DTL relate to income taxes levied by the SAME authority on either the same entity, or different entities intending net settlement/simultaneous realization in EACH future period of significant reversal — practically: same company, same Act, one net figure; group members with different jurisdictions, separate columns. The tax note in summary is a city skyline built from thousands of bricks — the offset rule is the zoning law deciding what may merge into one tower.

### 11.2 Measurement at reversal rates — the enacted-rate discipline

Deferred taxes measure at the tax rates EXPECTED to apply in the reversal periods, using rates (and tax laws) **enacted or substantively enacted** by the reporting date. The Indian nuance: a Finance Bill rate announced but not yet notified typically does not count as substantially enacted — disciplined papers wait for the Act; wishful papers don't survive audit. When the law DOES change: every deferred balance remeasures to the new rate in that period, with the effect following the hereditary stage rule (P&L-origin items → P&L; OCI-parked shadows → OCI, DT6). Rate volatility years are when the tax note earns its keep — read the remeasurement line first.

### 11.3 The rate-change canon (python-verified)

A machine-family's depreciation-gap DTL stands at **₹10L** (TD ₹40L at 25%). Parliament enacts a corporate rate cut to 22%, effective next year — clearly applicable to all this TD's reversal. Remeasured: 40 × 22% = **₹8.8L** → **release ₹1.2L** through P&L as deferred tax income in the enactment year. Scale the same reflex for DTA-side: a warranty DTA ₹2.0L remeasures to ₹1.76L, a charge of ₹0.24L. Companies with big standing DTLs post large one-off tax INCOMES in cut-years (the 2019 Indian rate-cut year printed exactly this across corporate India); companies DTA-heavy post charges. It says nothing about operations — it's legislation repricing the shadow ledger.

### 11.4 The crown jewel — the numerical reconciliation (python-verified)

Ind AS 12 makes entities explain their tax expense numerically (typical form: accounting profit × applicable rate plus adjustments). Build it on this year's file: accounting profit **₹500L**, statutory rate 25% → expected ₹125L. The actual faces:

| Item | ₹L |
|---|---|
| Tax at statutory rate (500 × 25%) | 125.0 |
| Permanent: non-deductible penalty ₹8L × 25% | +2.0 |
| Tax-holiday income ₹20L × 25% | −5.0 |
| Deferred remeasurement on rate change (§11.3 above) | −1.2 |
| MAT-credit recognition (true-up of past utilization evidence) | +3.0 |
| **Tax expense as reported** | **123.8** |

**ETR = 123.8 ÷ 500 = 24.76%** (every line python-verified). Read it the analyst's way: the statutory-to-effective bridge lists every reason the company's tax bill differs from a naive multiplication — permanents (+), holidays (−), preceding/true-up items, foreign-rate differentials, unrecognized losses, and this year's legislation repricing. Nothing about cash tax here — that's the current-tax cousin note — this bridges PROFIT to EXPENSE. The disaggregation trend globally moves this table from %s to absolute ₹ recent years; modern Indian majors usually give both.

### 11.5 The disclosure roll — what the note must confess

- Tax expense split: current and deferred, and the OCI/equity-staged amounts separately (tracing receipts).
- Temporary differences by TYPE with movement schedules (the DT4/DT5/DT6 biographies aggregated).
- Unused losses and credits: amounts recognized AND unrecognized, with expiry year ladders (DT7's leash).
- Subsidiary/JV shadows on which the two-condition exemption stood (the DT8 disclosures: aggregate unrecognized outside-basis amounts).
- The reconciliation (statutory-to-effective) with material lines explained.
- Rate/regime changes and one-off remeasurements flagged in period (115BAA migration years, Finance Act cuts).
A note with all six present and cross-threaded (DTA movements tie to provision notes; DTL movements tie to depreciation blocks) passes the stitch test an analyst applies in two minutes.

## 🧪 LAB — Build the Note (10 min)

Riverline file: accounting profit ₹600L; TD additions: depreciation gap +₹20L (new DTL), warranty provision +₹8L (new DTA); opening cumulative DTL ₹10L standing at the old 30% legacy rate; new 25% rate enacted this year; permanent disallowance ₹6L fine; brought-forward unused losses ₹40L with opening DTA ₹10L (recognized in an earlier year on convincing evidence); this year ₹24L of taxable income is absorbed by the pile. Construct in order:

1. Current tax line-up: taxable income, current tax @25% (use 600 − 20 + 8 + 6 − 24 for TI after loss set-off).
2. Deferred movements for the year: new DTL charge, new DTA, loss release, PLUS the legacy DTL remeasurement 30% → 25%.
3. Tax expense total; check against (book + permanents) × 25%.
4. The reconciliation table, ₹ lines.
5. Which of the year's effects hides in OCI? (Trick: none here — name why.)

**Why this matters:** assembling the note from atomics, once, is worth ten readings of it.

**🔑 Lab answers:**
1. TI = 600 − 20 + 8 + 6 − 24 = 570 → current = **₹142.5L**. 2. New DTL charge 20 × 25% = **₹5.0L expense**; warranty DTA **₹2.0L income**; loss-DTA release on ₹24L = **₹6.0L expense**; legacy remeasurement: 10 × (25 ÷ 30) = ₹8.33 → release **₹1.67L income** (round per policy). 3. Total = 142.5 + 5.0 − 2.0 + 6.0 − 1.67 ≈ **₹149.83L**; theory: (600 + 6) × 25% = ₹151.5L minus rate-cut legacy release 1.67 = **₹149.83L** — invariance adjusted by the one-off legislative repricing, foots. 4. Table: 600 × 25% = 150.0; fine +1.5; rate-cut release −1.67 → **₹149.83L**, ETR ≈ **24.97%**. 5. None — every parent this year was P&L-stage (depreciation, provisions, losses, rates-housed shadows); the trace confirms venue, an OCI stage appears only when parents (revaluations, FVOCI, remeasurements) appear.

## 💪 Exercises

1. Your ERP aggregates seven subsidiaries across four tax jurisdictions into one net deferred line. Name the two offset conditions it just violated.
2. "Rates were CUT after year-end but before signing; we remeasured to the new rate immediately." Audit-mode answer (two lines)?
3. Rebuild the crown-jewel invariance: profit 400, permanent 5, timing-only tax world, 25%. Total expense?
4. Why do DTA-heavy companies show tax CHARGES in rate-cut years while DTL-heavy show tax income? One-clean-paragraph physics.

### ✅ Selected answers

1. Same taxable entity/authority AND net settlement intent/pattern per reversal period — cross-jurisdiction members fail the first; offset was a zoning permission, not a default.
2. Only enacted or substantively-enacted rates measure shadows; an unenacted post-year-end announcement gets DISCLOSURE as a non-adjusting event, not remeasurement — discipline now, arithmetic when the Act lands.
3. (400 + 5) × 25% = **₹101.25L** total, regardless of which year current-vs-deferred columns split — invariance with the permanent wedge only.
4. Repricing physics: DTAs are future deductions priced at the rate the future will grant them — cut the rate, the coupon shrinks, charge; DTLs are future bills priced equally — cut the rate, the bill shrinks, income. Same law, two coupons, opposite signs; the note's remeasurement line is the microscope slide.

## ❓ Quiz

**Q1.** Offset permission requires:
(a) any nettable vibes
(b) a legally enforceable right to set off (same entity, same authority) AND net-settlement intent/pattern per future reversal period — one company under one Act merges to one figure; cross-jurisdiction group members stay in separate columns
(c) offset whenever DTA > DTL
(d) offset only annually

**Q2.** The enacted rate cut 25% → 22% with the machine family DTL ₹10L:
(a) nothing until reversal years
(b) remeasure ALL related balances at once: DTL 10 → 8.8, release ₹1.2L to P&L (OCI-parked shadows remeasure too, to OCI by hereditary staging); legislation reprices the shadow ledger the day it's substantially enacted — 2019's Indian cut printed exactly this income line nation-wide
(c) expense ₹1.2L now
(d) only the current tax rate changes

**Q3.** On the crown jewel table (500 × 25% = 125; penalty +2; holiday −5; rate remeasure −1.2; MAT-credit true-up +3):
(a) expense ₹125.0L, ETR 25.0%
(b) expense ₹123.8L, ETR 24.76% — the statutory-to-effective bridge that lists every honest reason (permanents up, holidays down, legislation repricing, true-ups) why real tax differs from naive multiplication; the first table analysts photograph because six lines tell the whole tax story
(c) expense ₹121.8L, ETR 24.4%
(d) expense ₹131.0L, ETR 26.2%

### ✅ Answers

1. **(b)** — zoning law for shadows: same authority, same entity, net settlement pattern.
2. **(b)** — enacted-day repricing: 10 → 8.8, income ₹1.2L, OCI-parked to OCI.
3. **(b)** — ₹123.8L at 24.76%: the bridge that converts the tax story into six lines.

## ✅ Mastery checklist

- [ ] I can run the offset conditions by heart
- [ ] I can apply enacted-rate discipline with the Indian nuance
- [ ] I can remeasure at rate change with hereditary staging
- [ ] I can build and ETR-read the crown jewel table
- [ ] I can audit a tax note with the six-confession disclosure roll

---

**Next:** **DT12 · CAPSTONE: The Shadow Ledger** — six exhibits, one mis-assembled deferred-tax file, the full bridge ₹120L → ₹88L → current ₹22.0L + deferred ₹9.0L = total ₹31.0L (and the invariance proof), the closing net DTL ₹0.5L position, and the ten-question interview forge that ends the course.
