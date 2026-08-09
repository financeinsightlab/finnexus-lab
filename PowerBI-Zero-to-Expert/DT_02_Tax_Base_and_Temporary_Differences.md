# 🎯 DT2 · Tax Base × Temporary Differences — The Balance-Sheet Machinery

> DT1 ran the bridge as a P&L story. The standard actually computes deferred tax from the BALANCE SHEET — and the balance-sheet way is more powerful, because differences the P&L lens misses (headlights on revaluations, business combinations, opening-retained-earnings adjustments) show up automatically. The machinery has exactly two concepts: **tax base** (the amount tax law attributes to an asset or liability) and **temporary difference** (carrying amount minus tax base). Multiply by the rate and the shadow ledger falls out: taxable differences build DTLs, deductible differences build DTAs. Four cells. One multiplication. This module owns them forever.

---

## 🎯 Objectives

- Define the tax base of an asset and of a liability — in plain words and in formula
- Compute temporary differences and sort them: taxable (→ DTL) vs deductible (→ DTA)
- Run the four-cell map on classic items: machine, warranty, revenue-in-advance, receivable
- Explain why the balance-sheet method catches what the P&L bridge misses
- Distinguish "temporary" from "permanent" in balance-sheet language

## 📘 Concepts

### 2.1 Tax base of an ASSET — what tax lets you deduct later

An asset's tax base = the amount that will be deductible for tax purposes AGAINST the taxable economic benefits you will receive when you recover the carrying amount. Translation: **whatever tax depreciation/deduction the machine has LEFT**. Canon (python-verified): machine carrying ₹80L, total future tax depreciation remaining ₹60L → tax base ₹60L. When you recover that ₹80L (use or sale), tax only shelters ₹60L of it — you will pay tax on the ₹20L difference in future years. Difference of ₹20L × 25% = **DTL ₹5L**: the liability for the tax sprint already taken.

If future benefits are not taxable (grants of certain kinds), tax base = carrying amount and the TD is zero — that's the standard's own built-in filter (paragraph nuances handled at recognition, DT3).

### 2.2 Tax base of a LIABILITY — carrying minus what tax deducts later

A liability's tax base = its carrying amount LESS any amount deductible for tax in future periods. Warranty provision canon (python-verified): provision ₹10L on the shelf, deductible when paid → tax base = 10 − 10 = **₹0** → carrying 10 − base 0 = **₹10L deductible temporary difference → DTA ₹2.5L** (25%): settling that liability later saves tax, an asset now.

Careful with the SIGN: for liabilities, a carrying amount ABOVE tax base is DEDUCTIBLE (DTA) — the mirror of assets, where carrying above base is TAXABLE (DTL). The lock: assets think "recovery will be taxed"; liabilities think "settlement will be deducted."

### 2.3 Revenue received in advance — the sneaky fourth cell (python-verified)

₹10L customer advance ALREADY TAXED on receipt (the tax clock ran before the book clock). Carrying (liability) ₹10L; tax base = carrying minus the revenue that will NOT be taxed again = 10 − 10 = **₹0**. Direction check: tax is already paid on this ₹10L while book has not earned it — when settlement comes (earning the revenue), it stays outside future taxable income, which is exactly a deduction-shaped benefit: deductible TD ₹10L → **DTA ₹2.5L**. The mirror-image arrangement (book earns early, tax runs late) flips the cell and the sign — the four-cell map handles every one; you never memorize items, only cells.

### 2.4 The four-cell map — one table to rule the shadow ledger

| | Carrying > Tax base | Carrying < Tax base |
|---|---|---|
| **Asset** | Taxable TD → **DTL** (recovery taxed harder later) | Deductible TD → **DTA** (more tax deduction left than book expects) |
| **Liability** | Deductible TD → **DTA** (settlement deducted later) | Taxable TD → **DTL** (tax already recognized what book carries — rare) |

Apply to the canon set (all at 25%, python-verified): machine CA 80 / TB 60 → TD 20 → **DTL 5.0**. Warranty CA 10 / TB 0 → **DTA 2.5**. Advance-taxed-early CA 10 / TB 0 (liability) → **DTA 2.5**. A receivable ₹30L already taxed on accrual → TB 30 → TD 0 → nothing. The map is mechanical; judgment lives only in establishing the two columns (carrying from Ind AS; tax base from the statute).

### 2.5 Why balance-sheet beats P&L-bridge only thinking

The DT1 bridge catches differences that pass through THIS year's income comparison. But the tax base gap can be born without touching P&L: revalue land upward ₹10L in OCI — book carrying rises, tax base untouched, a ₹2.5L DTL appears with NO income statement trace (DT6 lives here); acquire a company and step assets up to fair value in consolidation — tax base stays at the seller's historic base, a DTL is born inside goodwill's arithmetic (DT9). Permanent differences, in balance-sheet language, are items whose tax base can never move (the fine's "asset" of zero has no future deduction AND its expense never enters taxable income — no base, no difference, no deferral). The balance-sheet lens is the full camera; the bridge is one frame of the film.

## 🧪 LAB — Build the Shadow Ledger (10 min)

Aravali Castings close of books. For each item fill: carrying / tax base / TD type (taxable or deductible) / amount / entry (DTL or DTA @25%).

1. Press: carrying ₹80L, tax depreciation left ₹60L.
2. Warranty provision: ₹10L (tax on payment).
3. Gratuity provision ₹16L, deductible under statute only when PAID.
4. Customer advance ₹10L, already taxed on receipt.
5. Receivable ₹30L, taxed on accrual when invoiced.
6. Press from item 1 before today's entry: historically carrying ₹70L with tax base ₹70L; the valuer just added ₹10L through OCI (carrying now ₹80L, tax base unchanged — tax never wears the valuer's hat).

**Why this matters:** this table, signed by you, is the deferred tax working paper — the audit artifact at the heart of the tax note.

**🔑 Lab answers:**
1. 80/60 → taxable 20 → **DTL 5.0**. 2. 10/0 → deductible 10 → **DTA 2.5**. 3. 16/0 → deductible 16 → **DTA 4.0**. 4. 10/0 (liability, taxed early) → deductible 10 → **DTA 2.5**. 5. 30/30 → TD 0 → **nothing**. 6. 80/70 → taxable 10 → **DTL ₹2.5L, and its debit rides in OCI** beside the surplus (DT6's tracing law) — same four cells, but this gap was BORN in other comprehensive income, never in the bridge. Net running shadow: DTL 5.0 + 2.5 = 7.5 vs DTA 2.5 + 4.0 + 2.5 = 9.0 → **net DTA ₹1.5L**.

## 💪 Exercises

1. Inventory written down ₹6L to NRV in books; tax ignores until scrapped/sold. Cells, type, entry.
2. Borrowing costs ₹12L capitalized into a machine in books; tax deducted when incurred. Cells and entry.
3. "Tax base of an asset is what the tax department still owes you in deductions." Defend or refine the slogan in two lines.
4. A prepaid expense ₹4L booked as asset; tax allowed it when paid. Entry?

### ✅ Selected answers

1. Carrying 94 (say), tax base 100 → deductible TD 6 → **DTA ₹1.5L**; the deduction arrives later when inventory actually leaves.
2. Asset carrying higher than tax base by ₹12L (tax spent it all already) → taxable TD 12 → **DTL ₹3.0L**: book will depreciate ₹12L tax never shelters again.
3. Refine: it owes you DEDUCTIONS against the benefits you will recover — if the benefits are taxed, the unrecovered base shelters them; if benefits are tax-free, base equals carrying and the slogan is moot. Base is about future deduction-against-recovery, not an IOU.
4. Prepaid asset carrying ₹4L, tax base nil (already deducted) → taxable TD 4 → **DTL ₹1.0L**: tax already granted the shield that book consumes later.

## ❓ Quiz

**Q1.** Machine: carrying ₹80L, tax base ₹60L:
(a) deductible TD ₹20L → DTA ₹5L
(b) taxable TD ₹20L → DTL ₹5L at 25% — recovering an ₹80L asset against only ₹60L of remaining tax deduction means ₹20L of future taxable flows; the tax sprint already taken is a liability today
(c) no TD — both numbers are honest
(d) DTA ₹15L on the gap

**Q2.** Warranty provision ₹10L, deductible only when paid:
(a) DTL ₹2.5L — provision grows
(b) tax base = 10 − 10 = nil → deductible TD ₹10L → DTA ₹2.5L — settling the liability later brings a future deduction; for LIABILITIES the map mirrors: carrying above base is deductible, the exact sign-flip of assets
(c) DTL ₹2.5L on the future expense
(d) nothing — provisions are ignored for tax

**Q3.** Why is the balance-sheet method strictly more complete than the P&L bridge?
(a) it uses bigger numbers
(b) it catches differences born OUTSIDE profit or loss — revaluation uplifts in OCI (₹10L → ₹2.5L DTL riding in OCI) and business-combination step-ups create carrying/base gaps with no income statement trace; the bridge alone would miss them, the balance-sheet camera sees all four cells
(c) the Act demands balance sheets monthly
(d) it avoids using tax bases

### ✅ Answers

1. **(b)** — assets: carrying above base = taxable; ₹20L of future tax = ₹5L liability.
2. **(b)** — liabilities mirror: carrying above base = deductible; DTA ₹2.5L.
3. **(b)** — OCI-born and combination-born differences never cross the bridge but always cross the map.

## ✅ Mastery checklist

- [ ] I can state both tax-base definitions cold (asset and liability)
- [ ] I can fill the four-cell map for any classic item
- [ ] I can run machine 5.0 / warranty 2.5 / gratuity 4.0 / advance 2.5 without paper
- [ ] I can explain the liability sign-flip
- [ ] I can name what the balance-sheet method sees that the bridge cannot

---

**Next:** **DT3 · Recognition Discipline** — DTLs get booked almost always, DTAs only on probable profit, and the two deliberate exceptions (initial-recognition and goodwill) that stop the shadow ledger from eating itself.
