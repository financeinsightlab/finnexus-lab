# 🎯 DT10 · India Deep Dive — The Desi Operating Manual

> Everything so far was the standard. This module is the statute. Indian deferred tax practice sits on a specific operating stack: a corporate rate that is really three numbers stapled together (22% + 10% surcharge + 4% cess = 25.168%), a regime fork every company must choose (115BAA's low flat rate vs the old deductions world), depreciation run in WDV blocks at 15/10/40/25 with a 180-day half-year gate, Section 43B's pay-before-deduct family, MAT with its 15-year credit fuse, and — the inheritance layer — all the deferred tax consequences from the 2016 Ind AS transition, sitting inside opening reserves in thousands of Indian balance sheets to this day. Run this module and the next Indian tax note you read will feel like your own notebook.

---

## 🎯 Objectives

- Decompose the Indian corporate rate: 22 × 1.10 × 1.04 = 25.168% — and when 25% teaching approximations hurt
- Choose between the old regime and 115BAA — and what the fork does to deferred balances
- Operate WDV blocks + the 180-day gate in the wild (19.5 vs 17.25 canon)
- Drive the 43B payment gate with its DTA train
- Run MAT at scale and read the transition-era layer in opening reserves

## 📘 Concepts

### 10.1 The rate anatomy — a stapled number (python-verified)

Section 115BAA domestic-company rate: **22%** base + **10% surcharge** on tax + **4% health & education cess** on tax-plus-surcharge: 22 × 1.10 × 1.04 = **25.168%** (python-verified). That's why this course teaches with 25% but signs its Indian affidavits at 25.168%. Deferred tax must be measured at the rate EXPECTED to apply in the reversal years (substantively-enacted rates, DT11's rule) — for most Indian companies on screen today, that's 25.168% under 115BAA, or the old-regime ~30%-plus-surcharge stack (~34.94% for large corporates) for those who stayed. Reading habit: always locate the rate note before multiplying anything; the same ₹20L TD is ₹5.0L at 25%, ₹5.03L at 25.168%, and up to ₹6.99L at 34.94%.

### 10.2 The regime fork — 115BAA vs the old world

Domestic companies choose annually-with-lock-in consequences: (a) **115BAA's 25.168%** flat-ish world with most exemptions/deductions surrendered (no chapter-holiday claims, no accelerated-depreciation goodies beyond basic block rules, MAT non-applicable — and unused MAT credits from prior years cannot be set off after migrating), or (b) the **old regime** with deductions intact at a higher headline rate. The deferred-tax angle is immediate: migrating changes the effective rate on every shadow in the ledger → a one-time remeasurement through P&L/OCI (hereditary staging, DT6) with real cash-timing consequences for MAT-credit-built DTAs. Companies contemplating the fork model BOTH worlds' reversal calendars before signing — exactly the kind of decision the reconciliation note quietly discloses a year later.

### 10.3 WDV blocks in the wild — the 180-day gate (python-verified)

Quick-registry reality from DT4, now in production form: plant & machinery block **15%**, buildings **10%**, computers **40%**, intangibles **25%**, pooling forever (assets leave the block only when the block hits zero or the sale drains it; individual machines never exit). The 180-day gate, python-verified canon: opening block ₹100L plus ₹30L additions used the WHOLE year: dep = 15 + 4.5 = **₹19.5L**; same additions commissioned late (used under 180 days): 15 + 2.25 = **₹17.25L** — ₹2.25L of tax depreciation postponed by the commissioning calendar alone, shadowed inside the DT4 machinery-note. Additional depreciation (new eligible plant for manufacturing, % per statute-year) adds front-load where it applies — consult the year's statute, not folklore.

### 10.4 Section 43B — payment-gated deductions, DTA train attached

DT5 visited the family portrait; §43B deserves its Indian operating detail: deductions for gratuity & leave-encashment provisions, employer/employee welfare contributions, certain statutory dues (GST/customs/interest to scheduled institutions) crystallize ONLY on actual payment (dues relax if paid before the return-due date) — regardless of perfect Ind AS accrual. Every unpaid accrual in the family wears a DTA tag (₹16L → ₹4L teaching canon at 25%) that melts as money moves. Timing discipline for working papers: compute the UNPAID-at-year-end slice, net it for amounts statutorily deductible if paid before the filing date, and tag the residual: practice-grade papers do NOT multiply the whole provision blindly.

### 10.5 MAT at scale — the battery across cycles

DT7's machine in its Indian habitat: where regular tax dips under 15% of MAT-book profit, cash outflows jump to the 15% floor with the excess banked as MAT credit (15-year fuse). Deep-dive notes: MAT-book profit starts from the Ind AS P&L with statutory adjustments (deferred tax itself is added back under the MAT definition — the shadow never feeds the machine that watches it); companies under 115BAA are MAT-exempt by design (their world surrendered the deductions MAT was built to police) but forfeit unutilized legacy credits on migration. The analyst question still stands: what's the credit's utilization horizon, and when did the note last show the math?

### 10.6 The transition layer — deferred tax born on 1 April 2015/2016

When India flipped to Ind AS, thousands of companies restated opening balance sheets: fair-valued lands (deemed cost, DP6), ECL retro-fittings, financial instruments at fair value, components reconstructed. Every transition adjustment with a tax consequence landed its deferred shadow directly in OPENING RESERVES (the item never passed P&L, so its tax doesn't either — equity heredity, DT6's law at geological scale). The legacy is visible a decade later: tax notes that carry "transition date" opening-line references, and the question every new auditor on the file asks — "which of these shadows were born at transition?" — answered by the oldest schedules in the working papers.

## 🧪 LAB — The Desi Checklist (10 min)

Riverline Auto, an Indian domestic company file: PBT ₹500L; plant block addition ₹120L commissioned 10 October (140 days in use by 31 March); unpaid gratuity provision ₹24L; unpaid GST-liability accrual ₹10L (paid 20 July, return due 31 July-ish window matters); rate regime = 115BAA; rate-appropriate teaching note: use 25% for arithmetic, name the statutory figure.

1. Block-depre deduction on the addition under the 180-day gate.
2. 43B analysis on the two accruals — deductible now or timed later?
3. DTA/DTL tag for each accrual (25% teaching).
4. Name the statutory rate decomposition and the teaching number used here.
5. One regime-fork question management should pre-answer before migrating next year.

**Why this matters:** the checklist is mechanical for a reason — Indian deferred-tax working papers devolve to exactly these judgments, line by line.

**🔑 Lab answers:**
1. Used <180 days in year 1 → HALF-rate: 120 × 7.5% = **₹9L** this year (not ₹18L) — the gate postpones ₹9L into later blocks. 2. Gratuity unpaid at year-end → **timed later (DTA-tag)**, deductible only on funding; GST accrual ₹10L paid before the return window → **deductible now per 43B's proviso**, no shadow. 3. Gratuity: **DTA ₹6L** (24 × 25%). GST: **nil** (paid in window). 4. 22 × 1.10 × 1.04 = **25.168%** statutory; arithmetic taught at 25%; disclose the chosen-reversal-rate basis. 5. "What happens to our unutilized MAT credits and how big is the remeasurement on our shadow ledger?" — the two money-moving questions of migration that the next annual report silently records.

## 💪 Exercises

1. A US-educated CFO multiplies every Indian TD by 25%. Write the one-line rate-note correction with numbers.
2. The 180-day rule: explain in two lines why two identical ₹120L machines delivered in April vs October create a ₹9L first-year tax-depreciation difference.
3. Why is deferred-tax expense added back inside MAT-book profit? What doctrine does that reflect?
4. Your client's opening-reserves section still shows a transition-era deemed-cost fair-value layer with a ₹40cr DTL. Which module's laws govern its presentation home and its unwind?

### ✅ Selected answers

1. The statutory rate is a stapled stack — 22% + surcharge + cess = 25.168% (and up to ~34.94% in old-regime worlds): multiply by the rate EXPECTED to apply in reversal years, not by the teaching approximation.
2. Delivery isn't the trigger — USE is: >180 days in the year earns full 15%, <180 days earns half-per-block rate (7.5% on the new addition): same machines, same price, ₹9L apart by the commissioning calendar alone.
3. MAT was built to police the two-universe gap: its book definition strips deferral out so the 15% floor can't be dodged by the shadow itself; doctrine = an alternative tax universe that has no interest in your timing stories.
4. DT6's hereditary staging (its effect sits in the same reserve-zone where its parent adjustment lives, opening reserves at transition) and DT4/DP6's mechanics for the unwinds (the revalued base depreciates, the shadow follows its calendar): old stones, still holding weight.

## ❓ Quiz

**Q1.** The Indian domestic rate under 115BAA:
(a) 25.0% exactly
(b) 22% × 1.10 surcharge × 1.04 cess = 25.168% — and deferred balances are measured at the rate expected to apply in REVERSAL years (the old-regime stack runs ~34.94% for large corporates), which is why every working paper starts by locating the regime and the rate note
(c) 30% flat for all companies
(d) 17.5% with no cess

**Q2.** A ₹120L plant addition used 140 days in year one (15% block):
(a) ₹18L depreciation
(b) ₹9L — the 180-day gate halves the first-year rate for under-180-day usage (120 × 7.5%); commissioning calendars move tax timing by design, and the DT4 shadow ledger records the postponement
(c) ₹120L written off
(d) nothing until next year

**Q3.** Section 43B's family operates as:
(a) accrual = deductible always
(b) deduction on actual PAYMENT for welfare/statutory accruals (gratuity ₹16L unpaid → DTA ₹4L teaching canon; dues relaxed only if paid before the return-due window) — every unpaid slice in the family walks with a DTA tag that melts as money moves
(c) never deductible at all
(d) deductible only on audit approval

### ✅ Answers

1. **(b)** — a stapled rate: 25.168% for the BAA world, ~34.94% in the old one; measure at reversal rates.
2. **(b)** — the 180-day gate: half-rate first year, ₹9L not ₹18L.
3. **(b)** — payment-gated deductions with the proviso window; the DTA train follows the unpaid slice.

## ✅ Mastery checklist

- [ ] I can decompose 25.168% blindfolded (22 × 1.10 × 1.04)
- [ ] I can map the 115BAA-vs-old-regime fork with its MAT and remeasurement consequences
- [ ] I can run a WDV block including the 180-day gate
- [ ] I can tag 43B families with DTAs, proviso-window awareness included
- [ ] I can read MAT at scale and the transition layer in opening reserves

---

**Next:** **DT11 · Presentation, Rate Change & the Reconciliation** — offsetting rules (when the shadow ledger may show ONE number), rate-change remeasurement at ₹1.2L release, and the crown jewel of the tax note: the numerical reconciliation from ₹125L expected to ₹123.8L actual with ETR 24.76% — the table analysts photograph first.
