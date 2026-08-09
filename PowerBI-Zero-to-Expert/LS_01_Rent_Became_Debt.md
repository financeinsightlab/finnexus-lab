# 🎯 LS1 · When Rent Became Debt — Why Ind AS 116 Exists

> For thirty years the cheapest financing trick in corporate India wore a moustache and called itself "rent". Lease the asset, never own it, keep a hundred crores of obligation out of the balance sheet and let the footnotes carry the corpse. Ind AS 116 walked into that room in 2019, flipped the lights on, and said one sentence that re-papered every office, aircraft, warehouse and mall in the country: **if you control the use of an asset, it's on your balance sheet — the asset, and the debt that bought it.** This module is the story of that revolution, the one number every CFO recalculated overnight, and why EBITDA learned to lie legally.

---

## 🎯 Objectives

- Explain the IAS 17 / AS 19 operating-lease illusion and why the world's regulators killed it
- Run the headline conversion: off-BS commitment → on-BS right-of-use asset + lease liability (the ₹240cr → ₹166.0cr canon)
- Unpack the dual-entry P&L surgery: one rent line out, depreciation + interest in — and the EBITDA mirage it creates
- Date the standard: IFRS 16 (1-Jan-2019) vs Ind AS 116 (1-Apr-2019), and the transition menu
- Preview what survived unchanged: lessor accounting, short-term leases, low-value assets

## 📘 Concepts

### 1.1 The great disappearing debt

Sir David Tweedie, the IASB's founding chairman, had a legendary quip that became the standard-setter's mission statement: *"One of my great ambitions before I die is to fly in an aircraft that is on an airline's balance sheet."* He wasn't joking about a quirk — he was naming the biggest credibility hole in financial reporting. Under the old Ind AS 17 (and IFRS's IAS 17, India's AS 19), leases split into two species:

- **Finance leases** — you effectively bought the asset (ownership-ish risks passed to you), so asset + liability went on the balance sheet. Honest.
- **Operating leases** — everything else. Rent slipped quietly through the P&L as an expense, one line a year, while the multi-year promise to keep paying lived ONLY in a commitments footnote. No asset, no debt.

Everyone who mattered knew the second category was a fiction with a marketing budget. An airline with 200 leased aircraft and 8 owned ones looked debt-light in the balance sheet and debt-heavy in the footnotes. Retail chains leased every store. Logistics companies leased every warehouse. Analysts quietly multiplied annual rent × 8 to estimate "real" debt, each with their own multiplier — a guess-factory the standard replaced with arithmetic.

### 1.2 The AirSutra canon — one number that explains the whole standard

Meet **AirSutra**, our fictional carrier: 10 aircraft on operating leases, rent ₹3cr per aircraft per year, 8 years remaining on each, incremental borrowing rate 9%.

- **Old world (Ind AS 17):** balance sheet shows ₹0 debt for these planes. A footnote whispers "future lease commitments: ₹240cr" (30cr/yr × 8y, undiscounted — python-verified: 8 × 30 = 240). Ratios look pristine. The market sniffs the footnote anyway.
- **New world (Ind AS 116), Day 1:** present-value those payments at 9% → annuity factor 5.5348 → **lease liability = 30 × 5.5348 = ₹166.0cr** (python-verified), matched by a **right-of-use (ROU) asset ₹166.0cr**. Two lines, both honest, one unmistakable conclusion: the airline OWES for these planes the way a borrower owes a bank.

Note the liabilities-vs-commitment relationship: ₹166.0cr booked vs ₹240cr gross = the ₹74cr gap is just imputed interest the undiscounted footnote was carrying around. The old footnote wasn't small — it was shapeless.

### 1.3 The P&L surgery — rent out, dep + interest in

Old model: one operating line, rent ₹30cr, sitting INSIDE operating expenses — so it chewed EBITDA.

New model, Year 1 (python-verified split):

| Line | Amount | Sits |
|---|---|---|
| Depreciation of ROU (SL, 8y) | 166.0 / 8 = **₹20.75cr** | below EBITDA |
| Interest on liability (9% × 166.0) | **₹14.94cr** | below EBIT, in finance costs |
| **Total P&L charge** | **₹35.69cr** | |
| Old rent charge (for comparison) | ₹30.00cr | inside EBITDA |

Two seismic consequences:

1. **EBITDA inflates overnight, mechanically.** The ₹30cr rent vanishes from operating expenses → EBITDA rises by ₹30cr without a single extra rupee of cash earned. An airline or retailer that reported 14% EBITDA margins suddenly prints 22% and holds press conferences. Nothing real changed. This is "EBITDA learning to lie legally" — and why every covenant written against EBITDA needed renegotiating (LS10 lives in that wreckage).
2. **Total charge is FRONT-LOADED.** ₹35.69cr > ₹30cr in Year 1 because interest is charged on a fat opening balance. As the liability amortizes, interest decays; in the last years the combined charge runs BELOW old rent. Mature, steady-state lease portfolios roughly wash — but a growing lessee (constantly signing fresh leases) runs a permanently front-loaded P&L. PAT dipped for exactly the companies boasting about EBITDA. Beautiful.

### 1.4 Dates and the transition menu

- **IFRS 16**: issued January 2016, effective for annual periods beginning on/after **1 January 2019**.
- **Ind AS 116**: notified by MCA on **30 March 2019**, effective annual periods beginning on/after **1 April 2019** (India converged with a quarter's lag, as usual), replacing Ind AS 17 and burying the old Appendix-C operating/finance distinction for lessees.

At transition, every Indian lessee picked a door:

- **Full retrospective** — restate comparatives as if 116 had always applied (Ind AS 8 style). Maximally comparable, maximally painful.
- **Modified retrospective** (the crowd favorite) — don't restate comparatives; recognize the cumulative effect in opening retained earnings at 1-Apr-2019. ROU asset measured either (a) as if 116 had always applied, discounted at the transition-date incremental borrowing rate, or (b) simply equal to the lease liability (adjusted for prepaid/accrued rent). Expedients on offer: one discount rate for a portfolio of similar leases, hindsight allowed in assessing lease term, initial direct costs excluded at transition, and reliance on the old onerous-lease assessment instead of a fresh impairment review of ROU assets.

Interglobe Aviation's (IndiGo's) FY20 statements are the canonical Indian exhibit: one transition note, and aircraft that lived in footnotes for a decade materialized on the face of the balance sheet.

### 1.5 What did NOT change (calm islands)

- **Lessor accounting** — substantially carried forward from Ind AS 17. Lessors still classify finance vs operating (LS8 keeps both doors). The revolution is overwhelmingly a lessee story.
- **Short-term leases** (≤ 12 months) and **low-value assets** (think laptops, small furniture — IASB calibrated around US$5,000 when new) — a lessee may elect to keep expensing these straight-line. The inevitable invoice-splitting games get policed in LS2.
- **Variable payments** not linked to an index/rate (e.g., a mall store paying 3% of sales) — still expensed as incurred, never capitalized. LS11 feasts on this.

The doctrine in one sentence: the lessee's right to USE an asset is itself an asset, and the promise to pay for that right is a liability — the paper the promise is written on ("lease" vs "purchase") no longer decides where it lives.

## 🧪 LAB — UrbanNest's Off-Balance-Sheet Autopsy (10 min)

**UrbanNest Stores Ltd** runs home-goods stores. Under Ind AS 17 it leases 3 flagship stores, each at ₹10L/year, exactly 5 years remaining, IBR 9%. Commitments footnote reads "₹150L future lease payments".

1. Compute the Day-1 lease liability per store under Ind AS 116 (annuity factor at 9%, 5y = 3.8897 — verify it).
2. Total ROU + liability UrbanNest books on transition.
3. Year-1 P&L per store: old rent line vs new dep + interest. How much does EBITDA rise, per store?
4. Is Year-1 PAT per store higher or lower than the old world, and by how much?
5. One sentence to UrbanNest's CFO explaining why the banks "suddenly" care about a ratio that got worse "without anything changing".

**Why this matters:** multiplying one verified per-store canon (₹38.90L) by three stores is 80% of what India's listed retailers actually disclosed in April 2019. The illusion died of arithmetic, not outrage.

**🔑 Lab answers:**
1. ₹10L × 3.8897 = **₹38.90L liability per store** (python-precise: ₹38.8965L), matched by ROU asset ₹38.90L.
2. 3 × ₹38.90L ≈ **₹116.70L of new assets AND ₹116.70L of new debt** appearing on the face of the balance sheet — the footnote's ghost, corporal at last.
3. Old: rent ₹10L inside operating expenses. New: depreciation ₹38.90/5 = **₹7.78L** + interest 9% × 38.90 = **₹3.50L**. Rent line gone → **EBITDA rises ₹10L per store**.
4. **Lower, by ₹1.28L**: new total charge ₹7.78 + ₹3.50 = **₹11.28L** vs old ₹10L — the front-loading effect (interest is fattest when the liability is fattest). The gap burns off by the later years, but Year 1 tells the PAT story honestly and the EBITDA story loudly.
5. Bro-to-CFO: *"Our Debt/EBITDA and interest-coverage covenants were priced on the old fictional balance sheet — ₹116.7L of real payment promises just moved onto the face of it, so either we renegotiate covenant definitions (frozen-GAAP clause) or our next compliance certificate is a confession."*

## 💪 Exercises

1. Why did analysts use "rent × 8" rules before Ind AS 116, and what exactly does the standard replace that guess with?
2. AirSutra's commitment footnote says ₹240cr but the booked liability is ₹166.0cr. Where did ₹74cr go? Is the liability "understated"?
3. A CEO boasts: "Adopting Ind AS 116 grew our EBITDA 25% — we out-executed the market." Draft the two-line correction for the earnings call Q&A.
4. Which transition route (full vs modified retrospective) did most Indian companies choose and why? What happens to comparatives under each?
5. Name three accounting universes Ind AS 116 deliberately left untouched, and one reason each for leaving them.

### ✅ Selected answers

1. Multiples of rent were a homemade proxy for the discounted obligation hidden in operating leases — every analyst used a different multiplier and a different discount instinct, so "adjusted debt" was a range, not a number. The standard replaces the guess with the actual present value of contractual payments at a stated rate, one figure, audited, on the face of the balance sheet.
2. The ₹74cr is imputed interest embedded in the undiscounted ₹240cr — the footnote showed gross future cash, the balance sheet shows its present value; the difference is time-value, not concealment. The liability is NOT understated: it amortizes up through interest accretion exactly into that ₹240cr of cash outflow.
3. *"The EBITDA movement is a reclassification: ₹30cr of rent moved below the EBITDA line as depreciation and interest under Ind AS 116. Cash flow, capacity, and unit economics are unchanged — please value us on EBIT, PAT or cash flow, where the honest noise lives."*
4. Modified retrospective — comparatives NOT restated, cumulative catch-up to opening retained earnings at 1-Apr-2019, ROU commonly set equal to the liability (adjusted for accruals). Chosen because restating history for hundreds of leases costs weeks and the expedients (portfolio rate, hindsight, skip IDC, onerous-as-impairment-proxy) made the cheap door respectable.
5. Lessor accounting (Ind AS 17 model largely carried forward — negotiating a new lessor model would have delayed the lessee fix by years); short-term leases ≤12 months (cost-benefit: tiny balances, genuine optionality); low-value assets (~US$5,000 when new — capitalizing a ₹40k laptop fleet produces disclosure noise, not decision-useful signal).

## ❓ Quiz

**Q1.** AirSutra pays ₹30cr/year rent for 8 years, IBR 9%. Under Ind AS 116, what lands on its balance sheet?
(a) ₹240cr liability, matching the commitment footnote exactly
(b) ₹166.0cr lease liability + ₹166.0cr ROU asset — the PV of the payments at 5.5348; the ₹74cr gap to ₹240cr is imputed interest, amortized through finance costs
(c) ₹30cr liability for next year's rent only
(d) an asset of ₹240cr and no liability, since ownership stays with the lessor

**Q2.** In Year 1 of adoption, UrbanNest's per-store statements show:
(a) EBITDA down ₹10L, PAT flat
(b) EBITDA up ₹10L (rent reclassified below the line), PAT down ₹1.28L — depreciation ₹7.78L plus interest ₹3.50L totals ₹11.28L versus the old ₹10L rent, because interest is front-loaded on the fat opening liability
(c) EBITDA flat, PAT up ₹1.28L
(d) EBITDA up ₹11.28L, PAT up ₹10L

**Q3.** Which universe did Ind AS 116 leave substantially alone?
(a) lessee accounting for office buildings
(b) lessor accounting — the finance-vs-operating classification survives for lessors, along with electable lessee exemptions for short-term and low-value leases; the revolution targets the lessee's balance sheet
(c) sale-and-leaseback gains
(d) sublease classification rules

### ✅ Answers

1. **(b)** — PV at the IBR, both sides of the balance sheet; gross-vs-PV gap is interest yet to accrue.
2. **(b)** — reclassification inflates EBITDA mechanically; front-loaded interest nicks PAT; both effects are arithmetic, not performance.
3. **(b)** — lessors keep the old two-door model; exemptions keep small beer off the lessee's books.

## ✅ Mastery checklist

- [ ] I can narrate the IAS 17 illusion and the Tweedie quote without notes
- [ ] I can convert a rent stream into liability + ROU with an annuity factor (₹30cr × 5.5348 = ₹166.0cr)
- [ ] I can split Year-1 charge into dep ₹20.75cr + interest ₹14.94cr and explain the ₹35.69cr front-load
- [ ] I can explain the EBITDA mirage and the PAT dip in one breath each
- [ ] I can compare full vs modified retrospective transition and name two expedients

**Next:** LS2 draws the boundary that everything else stands on — what exactly IS a lease under Ind AS 116: identified assets, physically distinct capacity, substantive substitution rights, the two exemptions, and the data-centre traps that turn "leases" back into services.
