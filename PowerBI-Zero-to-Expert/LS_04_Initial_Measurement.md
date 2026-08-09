# 🎯 LS4 · Day-One Measurement — Liability Buckets, the IBR Hunt, and the ROU Build

> The gate said "lease". The split said "this much is lease". Now we price it. Day one under Ind AS 116 is a two-artifact build: the **lease liability** (present value of five precise buckets of payments, discounted at a rate you often have to hunt for) and the **right-of-use asset** (the liability, plus or minus four adjustments). Two numbers, infinite judgment, and a canon — ₹38.90L — that by the end of this module you'll be able to rebuild in your sleep.

---

## 🎯 Objectives

- Name the five payment buckets that enter the lease liability — and the two famous frauds kept out
- Hunt the discount rate: rate implicit in the lease vs the lessee's incremental borrowing rate (IBR)
- Run the headline canon: 5y × ₹10L/yr at 9% → **₹38.90L**
- Build the ROU asset: liability + upfront payments + initial direct costs + restoration provision − incentives (**₹42.00L canon**)
- Handle annuity-in-advance timing (the ₹16.70L lab) and residual-value guarantees

## 📘 Concepts

### 4.1 The lease liability — five buckets, nothing else

At the commencement date, the liability is the **present value of lease payments not yet paid**. "Lease payments" is a defined term — exactly five buckets:

1. **Fixed payments** (including in-substance fixed — LS2's floors), minus lease incentives receivable.
2. **Variable payments linked to an index or rate** — measured at the commencement-date level of that index (CPI-linked rent enters at today's rent; the future inflation is NOT pre-guessed at inception — see LS5's remeasurement door).
3. **Residual value guarantee (RVG)** amounts *expected to be payable* — if you promised the car returns worth at least ₹8L and you expect to hand back a ₹6L car, the expected ₹2L shortfall gets discounted in. Expect a ₹9L handback? Expected payment ₹0 — bucket stays empty.
4. **Exercise price of a purchase option** — only if you're **reasonably certain** to exercise (same certainty bar as lease-term assessment).
5. **Termination penalties** — only if the lease term reflects you exercising that termination option.

**Kept out (the two famous frauds):** variable usage/sales-linked payments (the 3%-of-sales mall top-up — expensed as incurred, forever outside the liability), and non-lease component money (LS3's ₹8.57L maintenance slice). Contaminating the liability with either is the rookie error.

### 4.2 The discount rate hunt — implicit vs IBR

Hierarchy: use the **rate implicit in the lease** (the rate making PV of payments + unguaranteed residual equal the asset's fair value + lessor's initial direct costs) **if readily determinable**. For most lessees it isn't — the lessor alone knows its residual assumptions and cost base. So the workhorse becomes the lessee's **incremental borrowing rate**: *the rate you'd pay to borrow, over a similar term and with similar security, the funds to buy a similar asset, in a similar currency and economic environment.*

IBR consequences that bend real balance sheets:

- **Entity-specific**: AAA-rated parent's treasury borrows at 7%; its scrappy subsidiary at 11%. Same building, same lease — different liabilities, because IBR prices the LESSEE's credit, not the asset's.
- **Term- and security-matched**: a 9% "unsecured overdraft quote" is not the IBR for a secured 5-year property-backed obligation. Match term, collateral, currency.
- **Portfolio approach** is allowed where effects don't differ materially — one rate for a class of similar leases, which is how a 200-store chain survives a close.

Higher rate → smaller liability; lower rate → fatter one. Rate-hunting is therefore also ratio-sculpting, and auditors hunt back.

### 4.3 The headline canon — ₹38.90L

UrbanNest leases a flagship store: **5 years, ₹10L/year, payable in arrears (year-end), IBR 9%, no options, no RVG**. Payments bucket = five payments of ₹10L. PV at 9% (python-verified): annuity factor = (1 − 1.09⁻⁵)/0.09 = 3.8897 →

**Liability = 10 × 3.8897 = ₹38.90L** (precisely ₹38.8965L)

Day-1 journal: Dr ROU asset ₹38.90L · Cr Lease liability ₹38.90L. The ₹150L gross footnote of the old world has contracted into ₹38.90L of honest present value — and the difference between ₹50L (undiscounted payments) and ₹38.90L is the ₹11.10L of interest that LS5 will spin out year by year.

### 4.4 The ROU build — four adjustments

The right-of-use asset starts at the liability and then gets dressed:

**ROU = lease liability** (38.90)
**+ payments at/before commencement** (first month's rent paid upfront, key money — minus any lease incentives received)
**+ initial direct costs (IDCs)** — incremental costs of obtaining the lease: commissions, legal fees for closing. (Costs that'd exist anyway — your property team's salaries — are expensed.)
**+ restoration/dismantling estimate** — the PV of the Ind AS 37 obligation to strip out your fit-outs and hand the shell back (the landlord's "make good" clause). The credit side is a provision, not the liability.

**Canon build (all python-verified):** liability ₹38.90L + broker commission ₹1.00L + restoration PV (₹4.00L due end-Y5, discounted at 9% → ₹2.60L) − move-in incentive received ₹0.50L = **₹42.00L**.

Depreciation then runs over the shorter of useful life and lease term — ₹42.00L/5 = ₹8.40L/yr for THIS dressed ROU (our buckets-only exhibit of LS1 used the naked ₹38.90L → ₹7.78L). If ownership transfers or a reasonably-certain purchase option exists, depreciate over the asset's full useful life instead. Impairment watches via Ind AS 36, as ever.

### 4.5 Timing wrinkle — payments in advance (annuity due)

"₹6L/year, payable at the START of each year, 3 years, 8%." The first ₹6L leaves at commencement (it lands in the ROU as a "payment at commencement") — only the remaining two payments get discounted: PV = 6 + 6 × annuity(8%,2y) = 6 × (1 + 1.7833) = 6 × 2.7833 = **₹16.70L** (python-verified). Interest then accrues only on the post-payment balance: Y1: ₹0.86L; Y2: ₹0.44L (both python-verified) — advance payments starve the interest line. Depreciation: 16.70/3 = **₹5.57L/yr**. Same rent, different calendar: in-arrears vs in-advance changes liability, interest and EBITDA geometry — know which annuity you're holding.

### 4.6 Quick map of what changes the answer

Liability fatter when: term longer (incl. reasonably-certain extensions), payments sooner, IBR lower, purchase option likely, RVG shortfall expected. ROU deviates from liability when: incentives, IDCs, prepaid rent, restoration. Keep the two artifacts' drivers separate in your head — interviews love making you smash them together.

## 🧪 LAB — UrbanNest's Day-One Desk (10 min)

1. **Bucket sort**: which of these enter the liability? (a) fixed ₹10L/yr; (b) 2%-of-sales top-up; (c) in-substance floor ₹12L/yr; (d) RVG shortfall expected ₹2L; (e) purchase option you're mulling at 40% confidence; (f) termination penalty on an option outside your term assessment; (g) CAM actuals.
2. **ROU build**: liability ₹38.90L + ₹1.00L commission + ₹4L restoration due end-Y5 (PV at 9%) − ₹0.50L incentive = ? (verify: 1.09⁵ = 1.5386)
3. **Advance timing**: 3y, ₹6L/yr in ADVANCE, 8% — liability+ROU at commencement, and the two interest accruals.
4. **Rate hunt**: pick the discount rate for UrbanNest's 5-year store: the lessor's internal ROI (unknown to you), UrbanNest's 12% unsecured working-capital rate, UrbanNest's 9% 5-year secured property-backed quote, or the holding company's 7% blended cost of debt. One line why.
5. **RVG**: leased delivery truck, RVG ₹8L in 5y, expected market value ₹6L. What joins the bucket set, at what number (9%)? What if expected value is ₹9L?

**Why this matters:** day one is a policy machine — every input you'll fight auditors about for the next five years gets frozen here. Building the canon twice under examination conditions is the entire point.

**🔑 Lab answers:**
1. IN: (a) fixed ₹10L; (c) floor ₹12L (in-substance fixed); (d) RVG expected ₹2L (discounted). OUT: (b) sales-linked variable (P&L as incurred); (e) 40% is not reasonably certain — option stays out (revisit if certainty flips, LS5's door b); (f) penalty outside the term assessment — out; (g) CAM actuals — variable service money, out.
2. Restoration PV = 4 × 1.09⁻⁵ = 4 × 0.6499 = **₹2.60L**. ROU = 38.90 + 1.00 + 2.60 − 0.50 = **₹42.00L**; credit split: Cr liability 38.90, Cr provision 2.60, Cr/cash-net incentive 0.50 — and depreciation then runs ₹8.40L/yr on the dressed asset.
3. **₹16.70L** (6 paid at start + PV of two more: 6 × 1.7833 = 10.70). Interest accruals: Y1 ₹0.86L, Y2 ₹0.44L; depreciation ₹5.57L/yr.
4. **The 9% secured 5-year property-backed quote** — IBR matches term, security, currency and asset class for THIS lessee. The parent's 7% prices the parent's credit; the 12% overdraft prices unsecured short risk; the lessor's ROI is the implicit rate we can't readily determine.
5. Expected shortfall ₹2L → include **PV = ₹1.30L** (2 × 0.6499) in the liability (bucket 3), mirrored in the ROU. If expected value is ₹9L ≥ guarantee ₹8L → expected payment ₹0 → bucket empty, and the RVG lives only in disclosure until expectations change.

## 💪 Exercises

1. Why does the standard include index-linked variables in the liability at commencement but sales-linked ones never — and what measurement-date discipline does that create for CPI leases?
2. UrbanNest's CFO prefers the 9% store rate; its loss-making kiosk subsidiary wants to use the parent's rate on an identical kiosk. Rule on it with the IBR definition.
3. List the four ROU adjustments and state the credit side of each (journal-thinking).
4. A lease is 5y at ₹8L/yr, 9%, in arrears — but pays the first year on signing. Liability and ROU at commencement (before other adjustments)?
5. Why do reasonably-certain purchase options get capitalized while 40%-confidence ones don't — and what's the manifestation difference inside the buckets?

### ✅ Selected answers

1. Index-linked payments are unavoidable in FORM (you will pay whatever the index dictates) — only the amount floats, so the liability captures today's index level and LS5's remeasurement doors update it. Sales-linked payments are avoidable in form — no sales, no obligation — so they never join the liability; they're contingent rent expensed as incurred. Discipline created: CPI leases remeasure when the CASH resets (unchanged discount rate), keeping signal without noise.
2. Denied — IBR prices the OBLIGOR's own credit: the kiosk subsidiary borrows with its own (weaker) profile, so its IBR (and hence a SMALLER liability) reflects subsidiary credit. Same asset, different lessee, different rate: that's the rule working, not failing. Consolidation doesn't average rates across entities.
3. Payments at/before commencement (Cr cash; incentives reverse it — Dr cash / Cr ROU); initial direct costs (Cr cash/payables); restoration estimate (Cr Ind AS 37 provision — unwinds as finance cost later, separate from the lease liability); incentives received (Cr ROU directly). Each has a different counter-line — merging them is how provisions go missing.
4. First ₹8L paid at signing → a commencement payment. Liability = PV of remaining 4 payments = 8 × annuity(9%,4) = 8 × 3.2397 = **₹25.92L**. ROU = 25.92 + 8 = **₹33.92L** before IDCs/restoration/incentives. (Timing only re-labels which payments are "discounted" vs "already paid" — the asset still carries the full economics.)
5. Reasonable certainty is the same bar used for the lease TERM — crossing it means the economics are "you're buying this asset on instalments", so the strike price joins bucket 4 and depreciation shifts to full useful life. At 40% you're a tenant, and buckets see only tenant cash flows. The manifestation difference: strike price inside the discounted stream + different depreciation horizon — ten years of expense physics from one probability judgment.

## ❓ Quiz

**Q1.** Which stream ENTERS the lease liability at commencement?
(a) 2%-of-sales top-up rent
(b) an in-substance fixed floor and the expected RVG shortfall — unavoidable payments (fixed floors, fixed payments, index-linked at today's level, expected guarantee shortfalls, reasonably-certain strikes); only genuinely activity-contingent money stays out, forever
(c) CAM actuals trued-up quarterly
(d) a purchase option at 40% confidence

**Q2.** 5 years × ₹10L/yr in arrears at IBR 9% gives a liability of:
(a) ₹50.00L — the gross commitment
(b) ₹38.90L — 10 × 3.8897; the ₹11.10L gap to ₹50L is interest that accretes through LS5's table, not missing liability
(c) ₹38.90L asset but ₹50.00L liability
(d) ₹11.10L, the time value only

**Q3.** ROU = ₹38.90L liability + ₹1.00L commission + ₹2.60L restoration PV − ₹0.50L incentive produces:
(a) ₹38.90L — adjustments cancel out
(b) ₹42.00L — the liability dressed with upfront/indirect-cost/restoration/incentive adjustments; depreciation then runs on the dressed ₹42.00L (₹8.40L/yr), not on the naked liability
(c) ₹42.00L, depreciated over 8 years
(d) ₹40.40L, since incentives add

### ✅ Answers

1. **(b)** — the liability holds unavoidable economics; activity-contingent variables are expensed as incurred.
2. **(b)** — PV at the IBR; gross-vs-PV gap is precisely the interest schedule to come.
3. **(b)** — ROU is the liability plus/minus its four adjustments, and depreciation follows the dressed number.

## ✅ Mastery checklist

- [ ] I can recite the five liability buckets and both famous exclusions
- [ ] I can hunt an IBR by matching term/security/currency to the ACTUAL lessee
- [ ] I can rebuild ₹38.90L (5y, ₹10L, 9%) and ₹16.70L (3y, ₹6L, advance, 8%) from factors
- [ ] I can dress the ROU to ₹42.00L and journal each adjustment's credit side
- [ ] I can price an RVG bucket at expected shortfall (₹2L → ₹1.30L) and explain the ₹0 case

**Next:** LS5 lives the years after — the full accretion table, front-loading proven line by line, the EBITDA re-badge, and the three remeasurement doors (cash reset, term reassessment, guarantee rethinking) with their split rule on which discount rate survives.
