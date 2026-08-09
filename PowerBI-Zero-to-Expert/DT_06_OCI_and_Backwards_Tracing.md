# 🎯 DT6 · OCI & Backwards Tracing — Tax Follows the Item Onto Its Stage

> Every deferred tax entry has TWO questions: how big, and WHERE it reports. The DT4/DT5 families report in P&L because their parents (depreciation, provisions) lived in P&L. But some deferred differences are born in other comprehensive income — the revaluation surplus, FVOCI gains, actuarial remeasurements — and the standard's tracing law says the deferred tax must follow the item onto the SAME stage: born in OCI, reported in OCI; born in equity, reported in equity; born in P&L, reported in P&L. You actually met this law's most famous exhibit two courses ago: DP5's revaluation carried a ₹2.5L DTL riding in OCI next to the ₹10L surplus. Today you learn why it HAD to be there — and how to trace any shadow home.

---

## 🎯 Objectives

- State the backwards-tracing law: deferred tax reports where its parent item reported
- Rebuild the DP5 revaluation shadow: ₹10L uplift → DTL ₹2.5L in OCI, surplus net ₹7.5L
- Trace FVOCI instrument gains: ₹8L → DTL ₹2.0L in OCI (equity-instrument one-way door)
- Trace DBO remeasurements: ₹6L actuarial loss → DTA ₹1.5L in OCI, never recycled
- Handle rate changes on OCI-parked shadows (remeasurement stays on the parent's stage)

## 📘 Concepts

### 6.1 The tracing law — the shadow never leaves its parent's stage

Current and deferred tax are recognized outside profit or loss when the tax relates to items recognized outside profit or loss — recognized in OCI if the item was (or will be) recognized in OCI, recognized directly in equity if the item was. The law is called backwards tracing because the deferred entry's home is decided by REVERSE-engineering each temporary difference to its parent transaction and reporting the tax wherever the parent performed. Failed to trace and the distortion is double: OCI is shown gross of its own tax effects, and P&L's tax line carries a stranger's burden. The tax note and the OCI note are stitched along this seam.

### 6.2 The revaluation shadow — the DP5 handshake (python-verified)

Rewind DP5: machine revalued ₹40L → ₹50L; the ₹10L uplift credited to OCI and stacked into the revaluation surplus. Tax base: unchanged (tax never wears the valuer's hat). Temporary difference: ₹10L taxable — recovering the revalued ₹50L against a ₹40L base means future taxable flows of ₹10L. DTL = **₹2.5L** (25%). Where does the DEBIT go? The parent's stage — the uplift sat in OCI, so the DTL charge sits in OCI too, net against the surplus: equity's pocket holds **₹10 − 2.5 = ₹7.5L net**. P&L sees neither the uplift nor its shadow: the whole drama plays one floor up in other comprehensive income. Analysts, note the practical echo: that ₹2.5L is REAL — its existence is why DP5's depreciation onward runs on the revalued base while tax shelters only the old one, and why disposals of revalued kit settle the shadow with them (DP6's corridor).

### 6.3 FVOCI instruments — the one-way-door shadow (python-verified)

An equity investment designated at fair value through OCI (Ind AS 109's irrevocable election — the one-way door from IA6): fair value rises ₹40L → ₹48L, an ₹8L gain booked in OCI (never recycled to P&L, even on sale). Deferred tax on the ₹8L TD: **DTL ₹2.0L, reported in OCI** — the parent's stage, again. Whatever later happens (sale, transfer within equity), the tax effect migrates with the item but the P&L remains untouched; the one-way door applies to the tax as faithfully as to the gain. FVOCI DEBT instruments (recycling allowed on sale) trace the same way while held — OCI stage — and their recycled proceeds simply carry the pre-traced tax across to P&L on sale day as the parent gain recycles. Trace the parent, never the shadow.

### 6.4 DBO remeasurements — the pension-stage actuarial shadow (python-verified)

Ind AS 19 (IA9's engine): the defined-benefit obligation gets remeasured — actuarial loss of **₹6L** charged to OCI (remeasurements never recycle, ever). The underlying expense will be deductible in the tax universe when contributions are actually paid — timing gap on the parent's OCI stage → **DTA ₹1.5L, also in OCI**, netting the actuarial loss to ₹4.5L in that statement. Future contribution years: the shadow unwinds through OCI over the same pattern the parent developed. Keep the pattern straight: created in OCI, lives in OCI, dies in OCI. It never once crosses P&L — same discipline as the DP5 shadow, opposite sign.

### 6.5 Rate changes and the stage rule (preview of DT11)

Enchanted corner worth visiting now: when the enacted tax rate changes, ALL deferred balances are remeasured — including OCI-parked ones — and the remeasurement charge/credit follows the PARENT's stage too: the revaluation-linked DTL's rate-change adjustment lands in OCI, not P&L, because the parent never left OCI. (Exceptions the standard grants — when the balancing entry can't be identified to a stage it defaults to P&L — are for odd historical mixtures; document your mapping.) DT11 runs the rate-change arithmetic; the stage-rule sentence to memorize now is: the shadow's home is hereditary.

## 🧪 LAB — Trace Every Shadow Home (10 min)

Riverline's year file, 25% rate. For each: compute the deferred entry AND name its statement home (P&L / OCI / equity).

1. Land revalued up ₹10L (first revaluation, class policy adopted; tax base unchanged).
2. FVOCI equity stake up ₹8L (irrevocable election, held).
3. Actuarial loss ₹6L on the DBO (contribution-funded plan, deductions on payment).
4. The depreciation gap on the machine fleet grew ₹4L of TD this year.
5. Opening revaluation-DTL of ₹2.5L stands; Parliament enacts a rate cut to 22% at year-end. Where does the remeasurement go, and how big?

**Why this matters:** mis-staged tax effects corrupt two statements at once — the annual report's OCI note is where auditors hunt this exact error.

**🔑 Lab answers:**
1. **DTL ₹2.5L → OCI** (net surplus ₹7.5L; P&L untouched end-to-end). 2. **DTL ₹2.0L → OCI** with the one-way-door parent; never recycles. 3. **DTA ₹1.5L → OCI** alongside the remeasurement loss (net OCI impact ₹4.5L); unwinds in OCI as contributions are funded. 4. **DTL charge ₹1.0L → P&L**, parent's stage = income statement (the DT4 family home). 5. Remeasure ₹2.5L to ₹2.2L — release **₹0.3L credited to OCI**: the rate change reaches the shadow but follows the hereditary-stage rule; only stray, unidentifiable historical mixtures default to P&L.

## 💪 Exercises

1. "Tax on revaluation hits the year-end tax expense because that's when the DTL formed." Correct the venue in two lines.
2. An FVOCI debt instrument is sold: ₹8L cumulative gain recycles to P&L. Walk the tax shadow across the doorway.
3. Why does the actuarial DTA not simply sit in P&L where the pension cost partially lives? One paragraph on parent-matching.
4. Opening balance: revaluation surplus net ₹7.5L (gross 10, DTL 2.5). The asset is sold at the revalued amount, settling all gain-related tax. What remains in the surplus pocket, per DP6's corridor?

### ✅ Selected answers

1. No — backwards tracing sends the DTL (₹2.5L) to OCI beside the ₹10L surplus that parented it; the year's P&L tax line carries only P&L-stage items. Watch the note: surplus stands NET at ₹7.5L precisely because the shadow moved in upstairs.
2. The pre-traced ₹2.0L tax rides with the parent: as the ₹8L gain recycles into P&L on sale, its shadow transfers venues with it — P&L shows the gain and absorbs the related tax effect together, net economics — while during the holding years everything sat in OCI.
3. Only the SERVICE-cost and interest parts live in P&L; the actuarial remeasurement parent lives exclusively in OCI (non-recycling). Since the DTA is born from the remeasurement slice (the funding-timing gap), tracing parks it in OCI with its parent — the pension machine is one asset class with TWO tax venues split by component discipline.
4. The realized ₹7.5L transfers from revaluation surplus to retained earnings INSIDE equity (para-41 corridor, DP6) — never through P&L — and the DTL was settled with the sale's tax, closing the shadow; equity pockets stay clean and the parent's stage work is complete.

## ❓ Quiz

**Q1.** Revaluation uplift ₹10L (tax base unchanged, 25%):
(a) DTL ₹2.5L charged to P&L
(b) DTL ₹2.5L charged to OCI beside the surplus — backwards tracing: the deferred tax shares its parent's stage, so the revaluation pocket stands at ₹7.5L net and the year's P&L tax line carries no part of it
(c) DTA ₹2.5L in OCI
(d) no deferred entry at all for OCI items

**Q2.** The tracing law, complete:
(a) all deferred tax goes to P&L for simplicity
(b) tax follows the item — deferred tax on items recognized in OCI is recognized in OCI (FVOCI ₹2.0L, DBO remeasurement-earned DTA ₹1.5L); items recognized directly in equity trace to equity; P&L parents (depreciation, provisions) trace to P&L; the shadow's home is hereditary
(c) OCI items are tax-exempt
(d) the filer may choose per policy

**Q3.** A rate change remeasures the revaluation-parked DTL downward by ₹0.3L:
(a) credit P&L tax expense
(b) credit OCI — the remeasurement obeys the parent's stage too: the revaluation never left OCI, so its shadow's rate-driven haircut stays in OCI; only untraceable historical mixtures default to P&L
(c) debit OCI
(d) capitalize against the asset

### ✅ Answers

1. **(b)** — hereditary staging: ₹2.5L rides in OCI, pocket nets to ₹7.5L.
2. **(b)** — P&L/OCI/equity by parent: the tracing law in one breath.
3. **(b)** — rate changes inherit the parent's stage as well.

## ✅ Mastery checklist

- [ ] I can state the backwards-tracing law and its three venues
- [ ] I can rebuild the ₹10L → ₹2.5L → ₹7.5L-net OCI revaluation shadow cold
- [ ] I can trace FVOCI gains and DBO remeasurements with recycling discipline
- [ ] I can place rate-change remeasurements on the hereditary stage
- [ ] I can read an OCI note for gross/net tax presentation errors

---

**Next:** **DT7 · Loss Carryforwards & MAT** — the asset born from losing money: ₹40L of unused losses → DTA ₹10L (if the evidence gate opens), India's 8-year vs unlimited clocks, the MAT minimum-tax machine (pay ₹15L when regular tax says ₹8L) and its 15-year credit window, and the utilization release ₹6L that finally eats the asset.
