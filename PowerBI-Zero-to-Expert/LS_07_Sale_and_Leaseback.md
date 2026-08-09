# 🎯 LS7 · Sale & Leaseback — Selling the Asset, Keeping the Keys, Booking Only What You Gave Up

> The oldest financing dance in the book: sell your building to an investor, sign a lease to stay in it, and walk out with cash plus a "profit". Under the old rules this machine printed instant earnings — sell at a glossy price, book the whole gain, sign the lease, regret nothing. Ind AS 116 shut the press down with two gates: first, prove the transfer is genuinely a SALE under Ind AS 115's control doctrine; then, even when it is, recognize gain ONLY on the rights you actually transferred. Keep 35% of the building's use? You keep 35% of the story off the P&L. Welcome to the proportion-of-rights revolution — and to the transaction IndiGo built a fleet empire on.

---

## 🎯 Objectives

- Run Gate 1: the Ind AS 115 control test that decides "sale" vs "failed sale" (disguised borrowing)
- Run Gate 2 at market terms: ROU = proportion of previous carrying amount retained (**₹24.5cr**), gain only on rights transferred (**₹19.5cr canon**)
- Fix off-market terms: above-market price = separate financing; below-market = prepaid lease payments
- Mirror the buyer-lessor's accounting
- Spot failed-sale economics: keep the asset, book the loan, split every payment interest/principal

## 📘 Concepts

### 7.1 Gate 1 — is it even a sale? (Ind AS 115 does the bouncer work)

Before lease accounting touches the file, ask whether the transfer satisfies **Ind AS 115's performance-obligation test**: has CONTROL of the asset passed to the buyer-lessor? Classic sale-killers that fail the gate:

- The seller must repurchase (forward) or may repurchase (call) the asset at a fixed/below-residual price — control never left; substantive repurchase obligations mean the buyer never owned the risks.
- Terms engineered so the buyer-lender bears no price or idle risk and the "lease" payments walk the asset straight back to the seller.

**Fail the gate → NO sale, NO gain, NO ROU. It's a financing**: seller-lessee keeps the asset on the books (keeps depreciating), recognizes a **financial liability** for the proceeds (Ind AS 109), and splits every "lease" payment into interest expense and principal on the effective-interest method. The glossiest SLB ever printed becomes a mortgage with choreography. This was the old regime's favorite loophole — sale-and-"leaseback" papers wrapped around what was always a loan — and the 115-gate is why it now dies on arrival.

### 7.2 Gate 2 at market terms — the proportion-of-rights rule

True sale confirmed. Now the twist that defines Ind AS 116 SLB accounting: you sold 100% of the legal title but leased back a chunk of the USE — so part of the "sale" was really you selling the asset to yourself. Measure:

- **ROU asset** = previous carrying amount × (rights retained ÷ rights transferred+retained) — the retained fraction is measured by **PV of leaseback payments ÷ fair value of the asset**.
- **Gain recognized** = total gain × fraction of rights TRANSFERRED only. The retained fraction's gain sits hidden inside the ROU and amortizes quietly through depreciation.

**The ₹100cr canon (all python-verified):** UrbanNest sells a warehouse — fair value ₹100cr, sale price ₹100cr (cleanly at market), carrying amount ₹70cr — and leases it back (PV of leaseback payments: ₹35cr at the appropriate rate).

| Step | Math | Result |
|---|---|---|
| Rights retained | 35 ÷ 100 | **35%** |
| ROU asset | 70 × 35% | **₹24.5cr** |
| Carrying amount derecognized | 70 − 24.5 | ₹45.5cr |
| Total gain (had you sold outright) | 100 − 70 | ₹30cr |
| Gain RECOGNIZED (rights transferred only) | 30 × 65% | **₹19.5cr** |

Journal: Dr Cash ₹100cr · Dr ROU ₹24.5cr · Cr Warehouse ₹70cr · Cr Lease liability ₹35cr · Cr Gain ₹19.5cr. The books balance, and ₹10.5cr of gain (35% × 30) never sees the P&L as gain — it rides inside the ₹24.5cr ROU, dissolving into depreciation over the lease term. The whole inflated-gain industry of the 1990s died of this single multiplication.

### 7.3 Off-market terms — the market-price reset button

SLB pricing games get unwound to fair value FIRST:

- **Sale price ABOVE fair value** → the excess over FV is **additional financing** the buyer-lessor gave you (a loan dressed as price). Canon extension: same warehouse, negotiated price **₹110cr**, PV of the contractual payments ₹45cr. Reset the sale at FV ₹100cr → the extra ₹10cr is a **financial liability** (Ind AS 109); of the ₹45cr payment-PV, ₹10cr relates to financing and **₹35cr to the lease**. From there the at-market canon runs UNTOUCHED: ROU ₹24.5cr, recognized gain ₹19.5cr — priced off market reality, not the negotiated fantasy. The 110 sticker bought ₹10cr of debt, not ₹10cr of extra "profit".
- **Sale price BELOW fair value** → the shortfall is a **prepayment of lease payments** (you pre-bought rent with a discount) — folded into the lease/ROU side. Same doctrine: unwind to FV, THEN measure.

### 7.4 The buyer-lessor's mirror

The buyer accounts for the purchase of the asset under its usual rules (Ind AS 16 etc.), and applies LESSOR accounting to the leaseback (LS8's two doors — most SLBs lease back as operating leases to the seller). Off-market terms mirror symmetrically: the above-market ₹10cr isn't a costlier building on the buyer's books — it's a **receivable (financial asset)** for the financing piece, with the building booked at FV. Both sides unwind to the same ₹100cr truth — the standard leaves no side of the table a place to hide the same fiction twice.

### 7.5 Why this transaction built modern aviation — and burned it too

Sale-and-leaseback is the aviation industry's cash engine: an airline orders aircraft at bulk-discount prices, sells delivered airframes to lessors at market, and leases them back 6–12 years — booking gains on the discount spread and keeping the balance sheet liquid. **IndiGo** historically built its fleet economics on exactly this machine: order cheap, sell at market, lease back, let lease rentals (opex, in the old world) fund growth; the SLB gains underwrote inductions. The strengths: cash release without route disruption, residual-value risk outsourced, capex recycling. The rats: currency mismatch (dollar rentals, rupee revenue), fixed-obligation bloat in downturns, and — post-Ind AS 116 — all of it now sits as ROU + liability on the face of the balance sheet. The machine still runs; it just can no longer run invisibly.

## 🧪 LAB — The Warehouse Files (10 min)

1. At-market canon: FV ₹100cr, price ₹100cr, carrying ₹70cr, PV of leaseback ₹35cr. Compute rights-retained %, ROU, derecognized carrying amount, recognized gain. Write the journal.
2. Above-market: price ₹110cr, PV of payments ₹45cr. Split the PV; state the financial liability, lease liability, ROU, and recognized gain. Explain why the last two didn't move.
3. Failed sale: UrbanNest "sells" for ₹100cr with a fixed-price repurchase obligation in year 4. Accounting?
4. Below-market: price ₹92cr against FV ₹100cr (motivated seller, negotiated fast exit). What is the ₹8cr shortfall and where does it live?
5. Interview trap: "An SLB is just a mortgage." Defend the difference in two sentences when Gate 1 passes.

**Why this matters:** SLB files arrive at quarter-end with seven-figure gains riding on the retained-rights fraction — a fraction computed from two inputs (payment PV and FV) that management conveniently controls. You are hired to be the person who recomputes it.

**🔑 Lab answers:**
1. Retained 35%; **ROU ₹24.5cr**; derecognize ₹45.5cr; **gain recognized ₹19.5cr**. Journal: Dr Cash 100 · Dr ROU 24.5 · Cr Warehouse 70 · Cr Lease liability 35 · Cr Gain 19.5 (all ₹cr).
2. PV split: **₹10cr financing + ₹35cr lease**; financial liability ₹10cr (Ind AS 109), lease liability ₹35cr; ROU **₹24.5cr**, gain **₹19.5cr** — both priced on the ₹100cr FV reality, so the inflated ₹110cr sticker bought debt, not profit: the gain formula runs on (100 − 70) × 65% whatever sticker finance wrote on the door.
3. **Failed sale**: keep the warehouse (₹70cr, keep depreciating); book a **financial liability ₹100cr**; every leaseback installment splits interest/principal under EIR; NO ROU, NO gain — a mortgage wearing a lease costume.
4. A **prepayment of lease payments**: reset the sale at ₹100cr; the ₹8cr discount lives inside the lease side (part of the ROU economics) — below-market prices buy rent, they don't create losses.
5. *"A mortgage keeps the asset and books a loan when control NEVER moves; this SLB passed Ind AS 115's control test — legal title and residual value genuinely transferred, so the seller recognizes the rights it gave up (and, unleasably, only those). Same cash geometry, different ownership physics — and the gain rule is the proof."*

## 💪 Exercises

1. Why does the standard measure rights-retained by **PV of payments ÷ FV** rather than by lease term ÷ asset life?
2. Compute the hidden (never-P&L) gain in the canon and explain its exit route from the balance sheet.
3. A CFO proposes pricing the SLB at ₹115cr "because our asset is genuinely special". From the buyer's audited perspective, what does the extra ₹15cr become — and what does that tell you about the negotiating room to fake gains?
4. Failed-sale files: name the three Ind AS numbers you'd cite in an audit query (one per artifact: asset, liability, payments).
5. Aviation SLBs fund growth famously well. Name the two structural risks that pandemic-era aviation exposed in this machine.

### ✅ Selected answers

1. Rights in property are ECONOMIC, not temporal: a 10-year leaseback of a building's summit decades isn't "10/life" of the rights — it's the present value of what usage you kept over what the whole asset is worth. PV÷FV prices the retained slice at money-value, immune to term-length cosmetics (leaseback for 5 years at fat rents retains MORE than 10 years at crumbs).
2. Hidden gain = 35% × ₹30cr = **₹10.5cr**. Its exit: buried inside the ROU at ₹24.5cr, it evaporates through depreciation over the lease term — never reported as gain, merely avoided as expense. The balance sheet remembers what the P&L was never allowed to celebrate.
3. From the buyer's side the extra ₹15cr above FV is a **receivable/financing** — a loan booked at fair terms, collected through the fatter lease installments with interest. Which is the point: both sides unwind to FV symmetrically, so sticker-price games shift DEBT, not profit. The negotiating room to fake gains is zero; the room to disguise borrowings is what the reset button exists to close.
4. Asset: Ind AS 16 (kept, depreciated per original life). Liability: Ind AS 109 (financial liability at EIR). Payments: split under Ind AS 109's amortized-cost mechanics (interest expense + principal) — and if anyone mentions ROU or gain, the file fails Gate 1.
5. Currency mismatch: hard-currency rentals against domestic revenue (a depreciating rupee inflates the rental burden overnight); fixed-obligation bloat: ground the fleet and the lease liabilities keep accruing — SLB converts flexible ownership into inflexible debt-like commitments precisely when revenue vanishes. Ind AS 116's balance-sheet honesty makes both risks VISIBLE earlier; it doesn't make them smaller.

## ❓ Quiz

**Q1.** Warehouse: FV ₹100cr = sale price, carrying ₹70cr, PV of leaseback payments ₹35cr. Under Ind AS 116:
(a) recognize the full ₹30cr gain — a sale is a sale
(b) ROU ₹24.5cr (70 × 35% rights retained) and recognized gain ₹19.5cr (₹30cr × 65% rights transferred); the other ₹10.5cr of gain rides inside the ROU and exits only as avoided depreciation
(c) ROU ₹35cr, gain ₹0
(d) keep the warehouse, no gain, financial liability ₹100cr

**Q2.** The same warehouse sells for ₹110cr against FV ₹100cr; PV of contractual payments is ₹45cr:
(a) gain recognized ₹30cr × 65% on the ₹110cr price
(b) the extra ₹10cr is a financial LIABILITY (additional financing); PV splits ₹10cr financing + ₹35cr lease; ROU stays ₹24.5cr and recognized gain stays ₹19.5cr — the unwound-to-FV machinery prices reality, not stickers
(c) the extra ₹10cr is extra recognized gain
(d) the sale fails automatically at any off-market price

**Q3.** A "sale" with a fixed-price repurchase obligation in four years is:
(a) SLB with proportion-of-rights gain
(b) a failed sale — control never passed under Ind AS 115; keep the asset, keep depreciating, book the proceeds as a financial liability under Ind AS 109 and split every payment interest/principal; no ROU, no gain, no lease
(c) an operating leaseback with deferred gain
(d) a finance leaseback with P&L smoothing

### ✅ Answers

1. **(b)** — proportion-of-rights: gain only on what left the building; the retained slice hides in the ROU.
2. **(b)** — off-market prices unwind to FV first; above-market excess is debt, not dream income.
3. **(b)** — repurchase obligations kill the sale at Gate 1; the file becomes Ind AS 109 borrowing.

## ✅ Mastery checklist

- [ ] I can run Gate 1 and name the classic sale-killers
- [ ] I can rebuild the at-market canon: 35% retained → ROU ₹24.5cr, gain ₹19.5cr, journal included
- [ ] I can unwind a ₹110cr sticker into ₹10cr debt + ₹35cr lease and keep the gain at ₹19.5cr
- [ ] I can account for a failed sale in three lines without hesitation
- [ ] I can mirror the buyer-lessor side and explain why both books hit ₹100cr truth

**Next:** LS8 crosses the table — the lessor's world, where Ind AS 17's two doors survived: finance vs operating classification, net investment and the rate implicit in the lease (₹84.29L at 9.00%), manufacturer-dealer day-one selling profit, and operating-lease incentives smoothed to ₹9.5L a year.
