# 🎯 DT7 · Loss Carryforwards & MAT — The Asset Born from Losing Money

> Here is the strangest asset in accounting: one manufactured by LOSING money. When taxable income goes negative, Indian tax law doesn't refund the loss — it lets you carry it forward and set it off against future taxable profits (business losses for 8 years; unabsorbed depreciation forever). That future tax shelter is, literally, an asset worth 25% of the loss pile — IF the DT3 gate opens. And sitting beside it is India's minimum-alternate-tax machine, built for companies whose books show fat profits but whose tax returns show starvation: MAT makes you pay 15% of BOOK profit anyway, then hands you a 15-year credit to claw it back. This module runs both: the ₹40L → DTA ₹10L recognition gauntlet, and the MAT canon (pay ₹15L when regular tax says ₹8L, credit ₹7L in the locker).

---

## 🎯 Objectives

- Run India's carryforward rules: business loss 8-year clock vs unabsorbed depreciation's unlimited runway
- Recognize a loss DTA through the convincing-evidence gate: ₹40L → DTA ₹10L, then utilization ₹24L → release ₹6L
- Price the doubt: unrecognized losses as contingency doors with expiry schedules
- Run the MAT machine: 15% of book profit, MAT credit 15-year window, credit-as-DTA-class asset
- Explain DTAs on losses to a board as "real but perishable"

## 📘 Concepts

### 7.1 Two carryforward clocks — 8 years and forever

Indian tax law splits the loss pile in two: **business losses** (everything except depreciation) carry forward **8 assessment years**, lapsing at midnight of the eighth; **unabsorbed depreciation** carries forward WITHOUT time limit, and ranks (with its cousins) to be set off ahead of everything. Set-off order inside the year: current depreciation → unabsorbed brought-forward depreciation → other brought-forward business losses. Keep the two clocks separated in every working paper; the 8-year one has an expiry-disclosure consequence (DT11's unrecognized-DTA ageing note) and the forever one effectively never dies (short of the entity dying first).

### 7.2 Recognition through the gate — the ₹40L → ₹10L gauntlet (python-verified)

Unused tax losses are deductible temporary-difference cousins: **₹40L of losses → a potential DTA of ₹10L** at 25%. But DT3's probable-profit gate applies with the volume turned UP — the existence of losses is itself evidence they may recur, so the standard demands **convincing other evidence** of future taxable profit: signed multi-year orderbooks, a non-recurring cause demonstrably fixed (the fire), fresh contracts, a credible unveiled business plan. Cleared? Recognize ₹10L through P&L (deferred tax income — a loss year that still shows a tax CREDIT is a strange and honest sight). Not cleared? The ₹10L remains an UNRECOGNIZED DTA — disclosed with its expiry ladder, converting doubt into scheduled optionality for next year's reassessment.

### 7.3 Utilization — eating the asset (python-verified)

Turnaround year: taxable income before set-off ₹24L absorbs ₹24L of the pile (set-off capped at available income; business losses sometimes further ring-fenced by head). Current tax on the ₹24L: nil — the losses pay it. The DTA side releases in mirror image: **release ₹6L** (24 × 25%) as deferred tax charge, DTA balance steps down from ₹10L to ₹4L (remaining losses ₹16L). Ledger truth: the loss DTA was never cash — it was the right to pay less later; utilization is the right being spent. Watch for the classic graph: current tax zero + deferred charge positive = total expense still tracks (book + permanent) × rate. Invariance never sleeps.

### 7.4 The MAT machine — paying tax on profit you didn't have (python-verified)

India's Minimum Alternate Tax targets the two-universe split directly: if regular tax on taxable income falls below **15% of book profit** (the MAT-prescribed book version), pay 15% of book instead. Canon: book profit ₹100L → MAT ₹15L; regular tax (thin taxable income after holidays/accelerated allowances) ₹8L → **pay ₹15L**. The ₹7L excess is **MAT credit**, carried forward **15 years**, set off in future years to the extent regular tax then exceeds MAT. Accounting treatment: MAT credit entitlement sits in the DTA family (unused tax credit under Ind AS 12) subject to the SAME probable-utilization gate — payout horizon analysis mandatory, write-down through P&L if the horizon stretches past the 15-year fuse. Typical lives: MAT-paying years accumulate, normalization years consume mat-credit to shrink the cash outflow back toward MAT level — a battery charging and draining across the business cycle.

### 7.5 Boardroom translation — real but perishable

Loss DTAs and MAT credits are real assets in an arithmetic sense and perishable in an economic one: they only convert if FUTURE profits arrive within the statutory window. The disclosure habit that signals maturity: show the expiry ladder (₹4L of DTAs lapsing in year 6, ₹6L in year 7, and so on to the window's end), tie recognition to VERIFIABLE contracts, and present the write-down when horizons slip — before auditors serve it. The practitioner bookmark: a company carrying heavy loss DTAs through two straight profit years without releasing them is either inefficient in set-off planning or still short of profits; the note tells which.

## 🧪 LAB — The Two Machines (10 min)

Riverline file: brought-forward losses ₹40L (business ₹28L within years 2–5 of the clock, unabsorbed depreciation ₹12L); DTA recognized fully last year on convincing evidence at ₹10L; this year: TI before set-off ₹24L, book profit for MAT-test ₹100L, regular-tax-on-TI-after-set-off computes below MAT.

1. Apply set-off: what is taxable income and current tax (regular)?
2. Compute the DTA release and closing DTA (losses remaining?).
3. MAT test: book ₹100L vs regular tax ₹8L-equivalent — what is paid in cash?
4. MAT credit this year, its fuse length, its Ind AS home.
5. Year-6 status check: business-loss DTAs unutilized — what disclosure and what recognition risk?

**Why this matters:** loss-DTA and MAT math is THE Indian deferred-tax interview staple — both machines in one lab.

**🔑 Lab answers:**
1. Set-off full ₹24L (set-off capped by income) → TI nil → **regular current tax ₹0**. 2. Release on ₹24L utilization = ₹24 × 25% = **₹6L deferred charge**; DTA closes from ₹10L to **₹4L** (remaining losses ₹16L: business ₹4L + unabsorbed dep ₹12L). 3. MAT floor = 15% × 100 = **₹15L paid in cash**. 4. **MAT credit ₹7L** (15 − regular 8-equivalent), fuse **15 years**, home = DTA-family unused tax credit subject to probable-utilization gate. 5. Disclose unrecognized/unutilized loss by EXPIRY year (business ₹4L lapsing when its 8-year window ends); recognition risk: haircut any amount that clarity of future income can no longer support — through P&L, with the expiry ladder in the note.

## 💪 Exercises

1. "Loss carryforward means the government writes you a cheque for 25% of the loss." Correct the imagery in two lines.
2. Why is the 8-year business-loss disclosure more urgent than depreciation's? One sentence of mechanics.
3. A company pays MAT for the 4th straight year and keeps full MAT-credit DTAs with no horizon analysis. What journal-grade question do you ask?
4. Release math: DTA opens ₹10L, year absorbs ₹12L of losses → closing DTA and charge?

### ✅ Selected answers

1. No cheque — only the right to SHELTER future profits: rupees of tax saved tomorrow, conditional on tomorrow arriving with taxable income inside the window. It is a coupon on future profits, perishable, never cash today.
2. The business-loss clock expires by year (year-8 midnight) and dies; the unabsorbed-depreciation one never does — so every unrecognized business-loss DTA needs an expiry-ladder line, and its recognition argument weakens mechanically as the window narrows.
3. "Show me the utilization horizon": is future regular-tax above MAT within 15 years probable by evidence — else the battery never drains and the DTA gets written down through P&L. Four straight accumulation years is exactly the pattern the question was invented for.
4. Release 12 × 25% = **₹3L charge**; closing DTA **₹7L** (₹28L of losses remain at full rate).

## ❓ Quiz

**Q1.** ₹40L of unused tax losses, gate cleared by convincing evidence:
(a) DTL ₹10L, since losses are liabilities
(b) DTA ₹10L recognized through P&L — losses are future deduction rights at 25%; but the probable-profit gate demands CONVINCING evidence (signed orderbooks, non-recurring cause repaired), and anything unrecognized sits disclosed with its expiry ladder
(c) nothing — losses can't create entries
(d) DTA ₹40L at 100%

**Q2.** Turnaround year absorbing ₹24L of the loss pile shows:
(a) current tax ₹24 plus DTA release
(b) current tax zero on the absorbed slice + deferred tax CHARGE ₹6L as the DTA steps ₹10L → ₹4L — total expense still tracking (book + permanent) × rate: utilization isn't saving tax twice, it's spending a coupon you already booked as an asset
(c) current tax ₹6 with release nil
(d) MAT credit ₹6

**Q3.** The MAT canon (book ₹100L vs regular ₹8L tax):
(a) pay ₹8L, the lower of the two
(b) pay ₹15L (15% of book profit) IN CASH — inside the MAT machine, and bank the ₹7L difference as MAT credit with a 15-year fuse, carried as a DTA-family unused tax credit gated by probable future utilization horizons
(c) pay ₹23L, both stacked
(d) file for refund next year automatically

### ✅ Answers

1. **(b)** — the asset born from losing money: coupon rights at 25%, convincingly-evidenced or just disclosed.
2. **(b)** — utilization = coupon spent: current zero mirrored by release charge ₹6L, closing DTA ₹4L.
3. **(b)** — MAT makes book profit the floor: pay 15, bank 7, 15-year fuse, utilization-gated.

## ✅ Mastery checklist

- [ ] I can separate the 8-year business-loss clock from forever-depreciation
- [ ] I can argue a ₹40L → ₹10L DTA through the convincing-evidence gate
- [ ] I can run the utilization release and closing balances
- [ ] I can work the MAT machine: floor, cash payable, credit, fuse, Ind AS home
- [ ] I can draft the expiry-ladder disclosure from memory

---

**Next:** **DT8 · Groups & Undistributed Profits** — the group-structure shadows: outside-basis differences on subsidiaries, associates and JVs; the two-condition exemption that keeps a parent's ₹5cr DTL unbooked when dividends never leave; and the post-DDT Indian dividend reality.
