# 🎯 IA10 · EPS & Operating Segments — Ind AS 33 & 108

> Two standards, one purpose: forcing performance per share and performance per segment into honest arithmetic. Ind AS 33 makes dilution confess every potential share; Ind AS 108 makes conglomerates open the management dashboard to outsiders. Both are scored by mechanical tests you can run blindfolded — the anti-dilution sieve and the 10%/75% rules — and both are interview staples because they compress judgment into numbers.

---

## 🎯 Objectives

- Compute basic EPS with weighted-average shares, including bonus and rights adjustments
- Build diluted EPS instrument-by-instrument using the treasury-stock method and if-converted method, in anti-dilution order
- Explain retrospective adjustment of bonus issues and why prior-period EPS changes without any error
- Identify operating segments through the management approach, the CODM lens
- Apply the 10% quantitative thresholds and the 75% external-revenue sufficiency test with numbers

## 📘 Concepts

### 10.1 Basic EPS — the honest denominator

**Basic EPS = profit attributable to ordinary equity holders of the parent ÷ weighted-average number of ordinary shares outstanding.** The numerator shrugs off preference dividends (declared for non-cumulative, accumulated for cumulative) — EPS belongs to ordinary shareholders only. The denominator weights TIME: a share issued mid-year counts for its fraction of the year (shares issued in business combinations count from acquisition date; in payment for services, from the service date). Two mechanical traps: **bonus issues and share splits** are treated as if they had ALWAYS existed — no time-weighting, and **prior-period EPS is restated** with the same multiplier (your ₹12.00 EPS becomes ₹6.00 after a 1:1 bonus, with no restatement error — comparability demands the past wear the new share count). **Rights issues** with a discount: part bonus, part fresh issue — apply the theoretical ex-rights factor to comparatives.

### 10.2 Diluted EPS — the sieve, in order

Diluted EPS answers: what if every potential ordinary share converted? Rules of the game: test **each instrument individually**, include only instruments that are **dilutive** (reduce EPS or increase loss per share), and sequence from **most dilutive to least** (lowest "incremental EPS" first) so the anti-dilution screen closes properly. The two workhorse methods:

- **Treasury-stock method (options/warrants/ESOPs)**: numerator unchanged; denominator adds issued-on-exercise shares MINUS the shares the exercise proceeds could buy back at average market price. Option strike ₹50, average price ₹80 → only (80−50)/80 = **37.5% of options** become net new shares.
- **If-converted method (convertible debt/preference)**: numerator adds back the after-tax interest/dividend saved; denominator adds the conversion shares for the full period outstanding.

**Canon case (python-verified):** PAT ₹120cr, weighted base 10cr shares → basic **₹12.00**. ESOPs: 1cr options, strike ₹50, average price ₹80 → incremental shares 1 × (80−50)/80 = **0.375cr** (zero numerator impact: incremental EPS ₹0 — most dilutive brand, tested first) → ₹120 / 10.375 = **₹11.57**. Convertible debentures: 2cr shares on conversion, after-tax interest saved ₹8cr → incremental EPS = 8/2 = ₹4.00 — tested after ESOPs: (120+8) / (10.375+2) = 128/12.375 = **₹10.34**. Both dilutive → **diluted EPS ₹10.34**. If the convertible's incremental EPS had exceeded 11.57, it would be **excluded as anti-dilutive** — the sieve exists to stop management parking dilution in the "potential" footnote.

### 10.3 Ind AS 108 — the management approach

Segments are not an accountant's taxonomy — they are **components whose operating results are regularly reviewed by the CODM** (chief operating decision maker — usually the board/CEO dashboard) to allocate resources and assess performance. If the MD sees "North Region," "EV Division," "Exports," those ARE the operating segments — even if they cross legal-entity lines. Two identical legal entities managed as one unit = one segment; one entity with three dashboards = three segments. Aggregation of similar segments (same products, production process, customers, distribution, regulation, AND similar long-run margins) is permitted but the default disclosure is what management actually watches.

### 10.4 The 10% thresholds + the 75% floor

An operating segment is **reportable** if it meets ANY 10% test: its revenue (external + intersegment) ≥ 10% of combined revenue of all segments; its profit or loss (ABSOLUTE value, the larger of combined-profits vs combined-losses is the base) ≥ 10%; or its assets ≥ 10% of combined assets. Then the sufficiency check: external revenue of all reportable segments must total **≥ 75% of entity external revenue** — if not, add the next biggest segments until you clear it.

**Canon case (python-verified):** five segments revenue [A 420, B 260, C 150, D 120, E 50] = ₹1,000cr; profit [60, 20, −10, 15, 5]; assets [500, 300, 200, 150, 100] = ₹1,250cr. Thresholds: revenue ₹100cr, profit base = max(60+20+15+5=100 profits, |−10| losses) → ₹10cr, assets ₹125cr. Result: **A, B, C, D reportable** (E fails all three: 50 < 100, 5 < 10, 100 < 125); external-revenue coverage of reportables = 950/1,000 = **95% ≥ 75% ✓** — no forced additions. Disclosure per segment: the measures the CODM actually uses (EBITDA if that's the dashboard), reconciliations to the totals, entity-wide geo/customer data (any single customer ≥ 10% of revenue gets named-to-anonymity).

## 🧪 LAB — Score the Dilution (10 min)

GigaChem facts: PAT ₹240cr; weighted shares 20cr. Potential shares: (1) 2cr ESOPs, strike ₹120, average price ₹200; (2) convertible bonds: 1.5cr shares, post-tax interest saved ₹6cr; (3) convertible prefs: 1.0cr shares, dividend saved ₹9cr. Compute basic, then diluted, instrument-by-instrument with incremental EPS ordering.

**Why this matters:** interviews hand you exactly this table and watch whether you sequence incremental EPS correctly — order is where most candidates break.

**🔑 Lab answers:**
1. Basic = 240/20 = **₹12.00**.
2. ESOP incremental: 2 × (200−120)/200 = **0.80cr** shares; incremental EPS ₹0 — test first: 240/20.80 = **₹11.54** (dilutive ✓).
3. Convertible bonds incremental EPS = 6/1.5 = **₹4.00** — test second: (240+6)/(20.80+1.5) = 246/22.30 = **₹11.03** (dilutive vs 11.54 ✓ include).
4. Prefs incremental EPS = 9/1.0 = **₹9.00** — test against current 11.03: (246+9)/(22.30+1.0) = 255/23.30 = **₹10.94** (STILL dilutive ✓ include).
5. **Diluted EPS = ₹10.94**. If the prefs' saved dividend had been ₹12cr (incremental 12.00 > 11.03), they would be EXCLUDED — the sieve's entire point stands proven in one branch.

## 💪 Exercises

1. Why does a bonus issue rewrite last year's EPS with no error anywhere?
2. The CODM reviews "Digital," "Physical Retail," "Export Wholesale" dashboards. Legal structure disagrees (5 entities). Which world wins under Ind AS 108?
3. Segment M: revenue 9% of combined, profit ₹1L tiny, assets 11% of combined. Reportable?
4. An anti-dilutive convertible: where does it show up, and what must you still disclose?
5. Recompute GigaChem's diluted EPS if average market price was ₹240 instead of ₹200 (keep other numbers).

### ✅ Selected answers

1. A bonus gives shareholders nothing of new value — it subdivides the same pie. Comparable per-share economics demand the past be measured in the same units, so prior shares (and EPS) are restated by the bonus factor. It is an arithmetic denominator change, not a restatement of performance.
2. The management world: operating segments follow the CODM's internal reporting even when it crosses legal entities — Ind AS 108 deliberately maps management's decision geography, not the registry's.
3. **Yes** — the assets test is met (11% ≥ 10%), and ANY single threshold suffices. Reportability is a union of tests, not an average.
4. Excluded from the diluted computation per the anti-dilution sieve — but disclosed: its existence, terms, and the reason for exclusion, so users can run their own scenarios (deep ITM-ness next year can flip it).
5. ESOP incremental = 2 × (240−120)/240 = **1.0cr**; steps: 240/21.0 = 11.43 → bonds: 246/22.5 = 10.93 → prefs: 255/23.5 = **₹10.85 diluted** (still all dilutive).

## ❓ Quiz

**Q1.** ESOPs: 1cr options, strike ₹50, average market ₹80, PAT ₹120cr on 10cr shares. Diluted EPS from the ESOP step alone:
(a) ₹10.91 — all 1cr options are added as new shares
(b) ₹11.57 — the treasury-stock method adds only 0.375cr net shares, since exercise proceeds buy back stock at market price
(c) ₹12.00 — options never dilute
(d) ₹11.43 — computed with the if-converted method

**Q2.** Under Ind AS 108, an operating segment is fundamentally defined by:
(a) the legal entity structure of the group
(b) the management approach: components whose results the CODM regularly reviews for resource allocation and performance assessment
(c) MINIMUM ₹100cr of revenue
(d) the auditor's business classification

**Q3.** GigaChem's convertible prefs (1.0cr shares, ₹9cr dividend saved, tested after bonds at ₹11.03) are included because:
(a) all potentials are always included
(b) their inclusion yields ₹10.94, still below ₹11.03 — instruments enter in most-dilutive-first order and stay only while each successive EPS falls
(c) anti-dilution tests happen only at basic level
(d) their incremental EPS of ₹9.00 is above basic ₹12.00

### ✅ Answers

1. **(b)** — strike-money buys back shares; only the net wedge (37.5% of options) dilutes.
2. **(b)** — the CODM's dashboard maps your segments, not the MCA's registry.
3. **(b)** — the sieve runs instrument-by-instrument, cheapest-dilution first, until a test fails.

## ✅ Mastery checklist

- [ ] I can build weighted-average shares with bonus/rights restatements blindfolded
- [ ] I can run treasury-stock and if-converted methods and sequence incremental EPS
- [ ] I can argue why the anti-dilution sieve protects the number
- [ ] I can derive reportable segments with all three 10% tests
- [ ] I can run the 75% sufficiency check and name the forced-addition rule

**Next:** IA11 takes the speed-tour — seven everyday standards in one sweep: provisions (37), intangibles (38), impairment (36), borrowing costs (23), related parties (24), events after reporting (10), and the discipline cases that make each one stick.
