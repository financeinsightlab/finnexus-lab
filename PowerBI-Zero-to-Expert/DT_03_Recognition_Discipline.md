# 🎯 DT3 · Recognition Discipline — Almost-Always for DTLs, Prove-It for DTAs

> The shadow ledger is not symmetric, and the asymmetry is the whole discipline. A deferred tax LIABILITY is recognized for every taxable temporary difference — the taxman's sprint is presumed collectable by future profits as a near-certainty, so book it, full stop. A deferred tax ASSET is recognized only to the extent it is PROBABLE that future taxable profit will exist to absorb it — an asset you cannot use is paperwork, and prudence runs the gate. Two deliberate exceptions keep the machine from eating itself: goodwill's initial DTL is never recognized, and a difference born at initial recognition of a lone, non-business-combination transaction is exempted so the asset's cost doesn't chase its own tail. This module is the standard's character: conservative about assets, unsentimental about liabilities.

---

## 🎯 Objectives

- State the asymmetric recognition rule: DTL full-recognition vs DTA probable-profit gate
- Run the probable-profit evidence ladder for deductible differences and losses
- Apply the initial-recognition exemption — and explain what it prevents
- Explain the goodwill DTL carve-out (initial recognition only)
- Reassess DTAs at every balance-sheet date: raise, hold, or haircut

## 📘 Concepts

### 3.1 DTL — the presumption of collection

For all taxable temporary differences, recognize a DTL — because recovering the carrying amount almost certainly generates taxable flows above the tax base: the machine gets depreciated or sold, the receivable gets collected. The standard's exceptions are deliberate and narrow: **(a) goodwill's initial recognition** (below), **(b) the initial-recognition exemption** (below), and (c) certain group-structure differences (undistributed profits of subsidiaries/JVs where you control timing and reversal is not probable — DT8's home). Outside those, no judgment, no haircut, no "maybe": book it.

### 3.2 DTA — the probable-profit gate

A DTA is recognized only to the extent it is **probable** that taxable profit will be available against which the deductible difference (or unused loss/credit, DT7) can be utilized — "probable" in IFRS-speak meaning more likely than not. Sources of future taxable profit, in descending order of strength:

1. **Sufficient taxable temporary differences** reversing in the same period — a DTL schedule that itself guarantees future taxable income as it unwinds (the shadow ledger can vouch for its own assets: if ₹20L of taxable TD reverses next year, ₹20L of deduction room exists).
2. **History of taxable profits**, especially recent and expected to continue.
3. **Signed orders, contracts, verifiable pipeline** pointing at future profits.
4. **Prudent, feasible tax-planning strategies** the entity would actually execute (sell appreciated assets, switch timing).

For entities with a history of recent LOSSES, the bar rises: **convincing other evidence** is demanded — the losses themselves are evidence of the opposite (DT7 runs the full loss-DTA gauntlet).

### 3.3 The initial-recognition exemption — the anti-recursion clause

Suppose you buy a specialist permit-jig for **₹100L** — not in a business combination, and at acquisition the transaction affects NEITHER accounting profit NOR taxable profit — but tax law grants NO depreciation on it, ever. Carrying ₹100L, tax base nil → taxable TD ₹100L. If you recognized the ₹25L DTL conventionally, the double-entry would have to gross the asset up to ₹125L — which grows the TD to ₹125L — which grows the DTL again: an infinite regress inside a single purchase. The standard cuts the knot: **no deferred tax is recognized at initial recognition of such an asset or liability** (when not a business combination and affecting neither profit measure at that date), and subsequent movements of THAT initial difference are likewise ignored. Depreciation-based differences arising AFTER (book dep vs zero tax dep) are also covered by the template — the practical file note: identify the asset at birth, stamp "IRE — no shadow," move on.

### 3.4 Goodwill — the non-recognition that protects arithmetic

Goodwill in a business combination is the residual; tax law in most jurisdictions gives it no base (no amortization shield). Measuring a DTL on that TD would feed straight back into goodwill itself — the same recursion sickness — so the standard simply prohibits recognizing a DTL on initial recognition of goodwill. (Subsequent tax-deductible amortization of goodwill, where law permits, creates differences recognized normally.) DT9 returns with numbers; the doctrine to hold: some differences are exempt so the model doesn't explode.

### 3.5 The annual reassessment — DTAs live on probation

Every balance-sheet date: review the carrying amount of every DTA. No longer probable it will be used? Write it down through P&L (the DTA haircut — a nasty surprise line in tax notes). Became probable after all? Recognize previously unrecognized amounts — even from past years — also through P&L. DTAs are works-in-progress held to an annually re-argued evidence standard; the disclosure note (unrecognized DTAs with expiry dates, DT11) is where the unaudited war stories accumulate. Keep the discipline quote: liabilities are facts, assets are arguments.

## 🧪 LAB — The Recognition Gate (10 min)

For each item, give the entry and one-line justification (25% rate):

1. Machine TD ₹20L taxable — plain asset, fully in use.
2. Warranty DTD ₹8L — company: three straight profitable years, pipeline signed.
3. Loss carryforward DTA candidate ₹10L (₹40L unused losses) — company: losses in three of the last four years; a one-off fire caused the worst; signed two-year export orderbook started this quarter.
4. Permit-jig ₹100L purchased stand-alone, never tax-deductible, not a business combination.
5. Goodwill ₹60L recognized on acquisition; tax base nil.
6. Same warranty item as (2), but the company instead posts its fourth straight loss with no corrective evidence.

**Why this matters:** the recognition gate is where deferred tax stops being arithmetic and becomes professional judgment — auditors contest THIS, not the multiplication.

**🔑 Lab answers:**
1. **Recognize DTL ₹5.0L** — presumption of collection; no exception applies. 2. **Recognize DTA ₹2.0L** — probable profits by history + pipeline; gate passed. 3. **Recognize DTA ₹10L with disclosure of the evidence** — recent losses demand CONVINCING evidence; non-recurrence of the fire cause plus a signed orderbook clears it; keep the expiry schedule honest. 4. **Nothing — IRE applies**: born at initial recognition, non-BC, neither profit measure touched; recognizing would recurse the cost upward forever. Stamp the register. 5. **Nothing** — initial-recognition of goodwill DTL is prohibited; goodwill is the residual and may not carry its own tax shadow at birth. 6. **Do not recognize** — probable-profit gate failed; keep the ₹2.0L as an UNRECOGNIZED DTA note line with a one-line evidence memo for next year's reassessment.

## 💪 Exercises

1. A treasurer argues "our DTL on accelerated depreciation should be recognized only if we expect profits too — fair is fair." Two-line correction.
2. How does an existing DTL schedule ITSELF provide evidence for recognizing a DTA? One paragraph using the reversal calendar.
3. The IRE asset (permit-jig ₹100L) grows old and you revalue it upward ₹10L under the revaluation model. Deferred tax on the uplift?
4. Last year you haircut a ₹6L DTA to zero for lack of evidence; this year the turnaround is obvious and profitable. Entry and its P&L home?

### ✅ Selected answers

1. Fair doesn't enter: the standard's symmetry-break is doctrinal — taxable differences are presumed to reverse into taxable flows (the asset's recovery), so DTLs book unconditionally; only ASSETS must be argued for. Prudence runs one way only.
2. Because DTL reversal IS future taxable income by construction: when the ₹20L depreciation TD reverses, taxable income rises ₹20L versus book that year — pre-built deduction room scheduled years ahead. Matching deductible differences to that calendar is the strongest evidence class the standard lists.
3. The uplift is a NEW difference born through OCI, not part of the exempt initial-recognition difference → recognize the DTL ₹2.5L with its debit in OCI (DT6 tracing). IRE shields only the original ₹100L knot, not later revaluation layers.
4. Re-recognize ₹6L (or the amount now probable) through P&L as deferred tax income — reassessment is two-way; DTAs live on probation either direction, and the restoration belongs in the same tax-expense line that absorbed the haircut.

## ❓ Quiz

**Q1.** The recognition asymmetry:
(a) both DTA and DTL need probable profits
(b) DTLs are recognized for ALL taxable temporary differences (narrow exceptions only), while DTAs pass a probable-profit GATE — liabilities are facts, assets are arguments; the presumption is that asset-recovery always generates the taxable flows the shadow expects
(c) DTAs are always recognized, DTLs need evidence
(d) both are optional by policy

**Q2.** The initial-recognition exemption exists because:
(a) small assets don't matter
(b) recognizing deferred tax on a stand-alone, non-BC purchase that touches neither profit measure would force the asset's cost to gross up against its own DTL endlessly — an infinite regress; the exemption cuts the knot at birth and ignores that initial difference thereafter
(c) goodwill requires it
(d) tax law forbids deferred entries

**Q3.** A company with three recent loss years wants to recognize a ₹10L loss DTA:
(a) impossible while losses continue in memory
(b) possible only with CONVINCING evidence beyond the losses themselves — non-recurring cause (the fire), signed orderbooks, executable tax-planning — plus reassessment every single balance-sheet date, haircutting or restoring through P&L as probability moves
(c) automatic — losses guarantee refunds
(d) only if auditors agree unanimously

### ✅ Answers

1. **(b)** — the asymmetry is the discipline: DTLs presumed, DTAs argued.
2. **(b)** — IRE is the anti-recursion clause for stand-alone initial differences.
3. **(b)** — recent-loss history raises the evidence bar to convincing, and probation never ends.

## ✅ Mastery checklist

- [ ] I can state the DTL presumption and the three narrow exceptions
- [ ] I can run the probable-profit evidence ladder in strength order
- [ ] I can explain the IRE infinite-regress it prevents
- [ ] I can apply the goodwill initial-recognition carve-out
- [ ] I can reassess a DTA both directions with its P&L home

---

**Next:** **DT4 · The Depreciation Gap** — the DTL that climbs ₹1.25L a year to its ₹5.0L summit and then walks itself home in year five: the full life-cycle of the most common temporary difference on Earth, with India's WDV block reality bolted on.
