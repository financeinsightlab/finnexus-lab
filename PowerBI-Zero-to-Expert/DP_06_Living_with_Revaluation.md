# 🎯 DP6 · Living with Revaluation — Transfers, Disposals, and the Doors That Never Open

> Adopting the revaluation model is not a one-day festival; it is a household. The revalued base must now be depreciated (heavier than the old one), the surplus must be walked into retained earnings in disciplined steps or in one stride at disposal, and — above all — that surplus must NEVER leak back through profit. Para 41 is the doorman: transfers from revaluation surplus go to retained earnings DIRECTLY, an equity-to-equity corridor, not through the P&L door. This module keeps the DP5 canon running: the ₹10L vs ₹8L depreciation fork, the ₹2L/yr transfer, the disposal of a revalued machine (gain ₹2L to profit, leftover surplus to RE), and the grandparent of all revaluation shortcuts — Ind AS 101 fair value as deemed cost.

---

## 🎯 Objectives

- Depreciate a revalued base and quantify the P&L drag vs the old cost base (₹10L/yr vs ₹8L/yr — the ₹2L wedge)
- Run the para 41 transfer: ₹2L/yr slice-by-slice, or the full remaining surplus at disposal
- Handle disposal of a revalued asset: the P&L gain on CURRENT base, the RE transfer of surplus — never recycled through profit
- Summarize gross vs elimination closing techniques at revaluation days
- Place Ind AS 101 deemed cost: fair value at transition as the starting cost base
- Read revaluation-surplus movements in the SOCIE like an analyst

## 📘 Concepts

### 6.1 The fork — depreciation gets heavier the day the number goes up

The DP5 machine stands at revalued ₹50L, five years remaining, residual nil → **₹10L/yr** depreciation (python-verified), versus the historical-cost path's ₹8L/yr. The ₹2L annual difference is the price of showing today's value on the face: the very year profit was NOT boosted by the revaluation, the P&L nevertheless starts paying heavier depreciation. This is the model's honesty tax — and management's favourite complaint. Note: the charge flows through P&L like any depreciation; the SURPLUS then takes care of symmetry, next.

### 6.2 Para 41 — the equity corridor

An entity MAY transfer revaluation surplus to retained earnings as the asset is used (the transfer = difference between depreciation on the revalued carrying amount and depreciation on historical cost: **₹2L/yr here**, python-verified) or in one amount when the asset is derecognized. Non-negotiable: the transfer moves INSIDE equity — surplus column to RE column in the SOCIE — and is never routed through P&L in its life, before it, or after. Why care? RE is distributable-adjacent; surplus is valuation-glaze. Walking the slice calmly into RE each year is the "realization" convention — the flavour settles where dividends get fed, WITHOUT ever impersonating earnings. Both policies (annual transfer vs hold-till-disposal) are legal; consistency is the rule.

### 6.3 Disposal of a revalued asset — two exits, two destinations

Sell the DP5 machine later for ₹32L when its (revalued) carrying amount is ₹30L, surplus balance standing ₹4L for that asset:

- **Gain to P&L: ₹2L** — disposal proceeds minus CURRENT carrying amount (32 − 30, python-verified); the historical cost is a speck in the rearview mirror, irrelevant to the number.
- **Surplus ₹4L → retained earnings**, directly in equity (para 41 again). If you ran the annual-transfer policy, most surplus has already migrated and only the residue moves.

The scam this kills: "revalue up today (+OCI), sell next year (+big P&L gain on old cost)". Under the revaluation model the P&L gain is measured on the REBASED amount — the model is abuse-proof by construction; the uplift was never profit and its exit never becomes one.

### 6.4 Revaluation-day bookkeeping — the two road sweepers

At each valuation date: **(a) gross restatement** — proportionately restate gross cost and accumulated depreciation (an index pushes a ₹100L/₹40L-dep asset to a ₹125L gross with ₹50L dep, carrying 75); or **(b) elimination** — wipe accumulated depreciation against gross and restate net to fair value (buildings' favourite). The balance sheet doesn't care; the fixed-asset SCHEDULE does (disclosure readers see either grossed-up blocks or clean nets). Deferred tax rides along under either road (DP5's ₹2.5L canon).

### 6.5 Ind AS 101's heirloom — fair value as deemed cost

Rewind to transition day (IA4's first-time-adoption world): Ind AS 101 permits fair value AT THE TRANSITION DATE to be used as **deemed cost** for an item of PPE — measure once, at fair value, then continue under the cost model from that base. India's balance sheets quietly host crores of these one-time revaluations (land bought in 1987 shown at 2016 fair values) — NOT revaluation-model assets, but cost-model assets whose "cost" was reset at the border. Reading a notes section that says "deemed cost" you now know: a one-way door was walked years ago, and the depreciation you see today is the AFTER picture.

### 6.6 Reading the SOCIE column like a hawk

The revaluation surplus column of the statement of changes in equity is a diary: opening balance, + gross uplifts, − deferred tax, − same-asset reversals, − transfers to RE (annual or at disposal). Empty years are fine; zigzag years tell stories — uplift one year, reversal the next, a different valuer in between. DP11's radar formalizes the hunt checklist: frequency vs volatility, valuer identity, technique shifts, class coverage, and whether any surplus ever, EVER, sneezed into P&L (it must not).

## 🧪 LAB — The Household Ledger (10 min)

Machine class, revalued base ₹60L, six years left, residual nil; historical-cost depreciation would have been ₹8L/yr. Surplus on this asset (net of tax) stands ₹18L. Policy: annual transfer.

1. Annual depreciation now. 2. Annual para-41 transfer. 3. Surplus balance after three transfer years. 4. At end of year 3 you sell the machine for ₹34L. Carrying amount at disposal? 5. P&L gain on disposal? 6. Where does the remaining surplus go — and through which door can it NEVER pass?

**Why this matters:** every annual report's SOCIE runs exactly these lines; analysts reconstruct the surplus diary to see how much "equity" is valuation glaze versus retained earnings.

**🔑 Lab answers:**
1. 60 ÷ 6 = **₹10L/yr**. 2. Transfer = 10 − 8 = **₹2L/yr** (surplus to RE, inside equity). 3. 18 − 3 × 2 = **₹12L**. 4. 60 − 3 × 10 = **₹30L**. 5. 34 − 30 = **₹4L gain to P&L** — measured on the rebased carrying amount. 6. Remaining surplus **₹12L → retained earnings directly in equity**; it can never pass through profit or loss — not on transfer, not at disposal, not retroactively. (If policy were hold-till-disposal, the full ₹18L would migrate at exit instead.)

## 💪 Exercises

1. Under the elimination method, a building at gross ₹200L, accumulated dep ₹80L, fair value ₹150L: show the reset.
2. Your CFO asks if the ₹2L/yr transfer "adds anything to profit." Reply with the corridor rule.
3. Why is the P&L disposal gain on a revalued asset structurally smaller than a naive gain-on-original-cost? What scam does that kill?
4. A company's deemed-cost land (transition fair value ₹400cr) shows flat for years. Is it violating the revaluation regularity rule?

### ✅ Selected answers

1. Eliminate ₹80L accumulated dep against the ₹200L gross; carrying ₹120L restated to fair value ₹150L → the schedule now reads gross ₹150L (= net), surplus +₹30L gross (tax handled per DP5). Depreciation restarts on ₹150L over the remaining life.
2. Nothing ever. The ₹2L moves INSIDE equity (surplus → RE); it is a reallocation between equity pockets. Profit saw revaluation neither at uplift time nor at transfer time; the only P&L echo is the heavier ₹10L/yr depreciation already charged.
3. Because the base got rebased — proceeds are compared to the ₹30L CURRENT carrying amount, not the original ₹20L; the uplift already lives in equity, so disposal harvests only post-rebase performance. Killed scam: revalue-then-sell to manufacture fake operating gains.
4. No — deemed cost under Ind AS 101 is a cost-model asset whose STARTING line was fair value; the regularity rule binds only the revaluation MODEL. Flat land at ₹400cr deemed cost, depreciated-never-mostly (land), disclosed as deemed cost — perfectly legal, very Indian.

## ❓ Quiz

**Q1.** The para-41 annual transfer equals:
(a) the full surplus divided by original cost
(b) the difference between depreciation on the revalued base and depreciation on historical cost — ₹10L minus ₹8L = ₹2L/yr here — moved from surplus to retained earnings INSIDE equity, an equity-to-equity corridor that never crosses P&L
(c) the deferred tax unwinding
(d) the impairment reversal for the year

**Q2.** Disposal of the revalued machine: proceeds ₹32L, current carrying ₹30L, surplus ₹4L:
(a) gain ₹12L to P&L, surplus kept forever
(b) gain ₹2L to P&L measured against the REBASED carrying amount; the ₹4L surplus transfers to retained earnings in equity — uplift was never profit, and its exit never becomes one either (revalue-then-sell scam structurally dead)
(c) gain ₹12L to P&L plus ₹4L surplus to RE
(d) loss ₹0, all of it absorbed by surplus

**Q3.** "Deemed cost" under Ind AS 101 means:
(a) the asset must be revalued every year thereafter
(b) fair value at the transition date was adopted as the STARTING cost — a one-time reset, after which the asset lives under the cost model; those flat land values visible across Indian balance sheets are doorways walked once, not a revaluation policy
(c) any tax-assessed value
(d) the valuer's insurance estimate

### ✅ Answers

1. **(b)** — transfer = the ₹2L wedge between revalued and historical depreciation, equity-to-equity only.
2. **(b)** — ₹2L P&L gain on the rebased base; surplus walks to RE without touching profit.
3. **(b)** — one reset at the border, cost model thereafter: deemed cost is history wearing today's value.

## ✅ Mastery checklist

- [ ] I can depreciate a revalued base and explain the heavier-charge honesty tax
- [ ] I can run both para-41 policies (annual slice vs at-disposal stride)
- [ ] I can dispose of a revalued asset with the two-destination split
- [ ] I know gross restatement vs elimination at revaluation dates
- [ ] I can place Ind AS 101 deemed cost vs the revaluation model
- [ ] I can read the surplus column of the SOCIE as a diary

---

**Next:** **DP7 · The Spending After** — repairs vs replacements vs overhauls: the ₹0.5L servicing that dies in P&L, the ₹6L furnace lining that becomes an asset while its ₹1.6L ancestor is derecognized, and the day-to-day servicing wall the fraudsters keep slamming into.
