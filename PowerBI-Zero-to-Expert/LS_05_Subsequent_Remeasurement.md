# 🎯 LS5 · Life After Day One — The Accretion Table, Front-Loading, and the Three Remeasurement Doors

> Day one froze two numbers. Now they have to live. The liability behaves like a loan — interest accretes, payments knock it down — while the ROU amortizes straight like a machine. Run them side by side and you prove the standard's most quoted side-effects: front-loaded expense, fattened EBITDA, shrinking net debt optics. And when the world shifts — a CPI reset, an extension decision, a guarantee reconsidered — three remeasurement doors decide what gets re-priced and at which discount rate. This module is the operating years.

---

## 🎯 Objectives

- Run the liability like a loan: full 5-year accretion table on the ₹38.90L canon
- Prove front-loading and the EBITDA re-badge with year-by-year arithmetic (₹11.28L → ₹8.61L)
- Depreciate and impair the ROU (Ind AS 16 life choice, Ind AS 36 watch)
- Master the three remeasurement doors and their discount-rate split (unchanged vs revised)
- Keep variable-invoice true-ups and payment-timing surprises in their P&L lane

## 📘 Concepts

### 5.1 The liability is a loan — run it like one

Subsequent measurement: **increase for interest (at the discount rate), decrease for payments.** The ₹38.90L canon, python-verified, in full:

| Year | Opening | Interest @9% | Payment | Closing |
|---|---|---|---|---|
| 1 | 38.90 | 3.50 | 10.00 | 32.40 |
| 2 | 32.40 | 2.92 | 10.00 | 25.31 |
| 3 | 25.31 | 2.28 | 10.00 | 17.59 |
| 4 | 17.59 | 1.58 | 10.00 | 9.17 |
| 5 | 9.17 | 0.83 | 10.00 | 0.00 |

Total interest across the life: **₹11.10L** — exactly the ₹50L gross minus ₹38.90L PV from LS4. Present value isn't a discount permanently gifted; it's interest issued on layaway. Journals (Y1): Dr Finance cost 3.50 / Cr Liability 3.50 · Dr Liability 10.00 / Cr Cash 10.00.

### 5.2 The P&L shape — front-loading, proven line by line

Run depreciation (naked canon: ₹38.90/5 = ₹7.78L/yr SL) next to interest:

| Year | Depreciation | Interest | **Total charge** | Old rent would have been |
|---|---|---|---|---|
| 1 | 7.78 | 3.50 | **11.28** | 10.00 |
| 2 | 7.78 | 2.92 | **10.70** | 10.00 |
| 3 | 7.78 | 2.28 | **10.06** | 10.00 |
| 4 | 7.78 | 1.58 | **9.36** | 10.00 |
| 5 | 7.78 | 0.83 | **8.61** | 10.00 |

Front-loading is a fact of arithmetic, not activism: interest is fattest on the fattest balance. Year 1 runs **+₹1.28L** heavier than rent; Year 5 runs **−₹1.39L** lighter. Cumulative across the life both models total ₹50L (+ empty-side depreciation effects vanish) — same cash, different calendar. A company ADDING leases every year (growing retailers, airlines inducting aircraft) stacks the heavy years forever: structurally lower PAT than the old world. That's why FY20 Indian earnings calls sounded like a co-ordinated sigh.

### 5.3 The EBITDA re-badge — rent below the line

Under 116 the P&L reorganizes: **depreciation sits below EBITDA, interest below EBIT.** The ₹10L rent that used to chew operating profit now strolls past it. Effects (python-verified cascade from UrbanNest's store): EBITDA **+₹10L**; EBIT better by **₹2.22L** (₹10L rent out, ₹7.78L dep in); PBT worse by ₹1.28L (interest ₹3.50L ate the EBIT gain and more). An EBITDA-priced business just got cheaper-looking to value for free — and LS10 shows the covenant carnage when lenders noticed. Cash flow statement keeps everyone honest: under Ind AS 7, principal repayments sit in FINANCING, interest per policy choice (financing/operating) — the old operating-outflow rent has left the building.

### 5.4 Door (a) — the cash reset: index/rate-driven payment changes

When future payments change **because an index or rate moved** (CPI escalation kicks in, a benchmark-linked rent reprices), remeasure the liability at the **UNCHANGED discount rate** — the obligation's shape didn't change, only its amount did; adjust the ROU by the same amount. (Fine print: if payments float on an interest-rate benchmark, use a REVISED rate reflecting the new benchmark.)

**Canon (python-verified):** end of Y2, CPI resets UrbanNest's remaining payments ₹10L → ₹10.6L for the last 3 years. Liability today: ₹25.31L. Remeasured at the unchanged 9%: 10.6 × annuity(9%,3) = 10.6 × 2.5313 = **₹26.83L**. Adjustment: **+₹1.52L to liability, +₹1.52L to ROU.** No P&L today — inflation enters through tomorrow's depreciation and interest, where it belongs.

### 5.5 Door (b) — the term/option reassessment: revised rate, revised flows

Reassessing the lease TERM or a purchase-option's exercise (something now reasonably certain that wasn't, or vice versa) re-opens the whole deal: remeasure at a **REVISED discount rate** (today's IBR for the revised term), revised payments, revised ROU.

**Canon (python-verified):** end of Y2, UrbanNest commits to a 2-year extension (was not reasonably certain at commencement), so 5 payments of ₹10L remain; today's IBR for that horizon: 10%. Remeasured liability: 10 × annuity(10%,5) = 10 × 3.7908 = **₹37.91L**; carrying was ₹25.31L → **+₹12.60L to liability AND ROU.** Why the revised rate here but not in door (a)? Because the DEAL changed — its term, its optionality, its risk tenor — not merely its invoice amount. Rate follows shape.

### 5.6 Door (c) — the guarantee rethinking: same flows, new expectation

Change in amounts **expected to be payable under an RVG** (the truck's resale outlook sagged: expected shortfall ₹2L where you forecast ₹0): remeasure at the **UNCHANGED rate** — expectation change, not deal change. **Canon (python-verified):** the rethinking lands at end of Y2 and the guarantee settles at end-Y5, 3 years out → add PV of ₹2L discounted 3 years at 9%: 2 × 1.09⁻³ = 2 × 0.7722 = **₹1.54L** to liability and ROU. (At commencement, five years out, the same ₹2L would have cost only **₹1.30L** = 2 × 1.09⁻⁵ — the LS4 bucket. Horizon is everything; pin the settlement date before discounting.) And the ROU's other life-events stay in their lanes: variable true-ups (sales-linked excess) expensed as incurred; impairment flagged under Ind AS 36 when the store's CGU sours (ROU rides inside the CGU test); sublease triggers re-read through LS9 before any impairment conclusion.

## 🧪 LAB — Run the Operating Years (10 min)

1. Rebuild table rows Y2–Y3 from opening ₹32.40L (interest, payment, closing).
2. Compute Y1 and Y5 **total P&L charge** on the naked canon (dep ₹7.78L constant) and state the deltas vs old ₹10L rent.
3. Door (a): CPI lifts remaining payments to ₹10.6L for Y3–Y5 (end of Y2). New liability? Journal the adjustment. Discount rate — changed or not?
4. Door (b): instead, a 2-year extension becomes reasonably certain (5 payments of ₹10L left, current IBR 10%). New liability, adjustment, and the rate question.
5. Door (c): the ₹2L expected RVG shortfall lands at end of Y2 (3 years out). Adjustment and rate?

**Why this matters:** mid-life re-pricing is where IFRS/Ind AS exam candidates and real close teams both bleed — everyone can do day one; the doors are the discipline.

**🔑 Lab answers:**
1. Y2: 32.40 + 2.92 − 10 = **25.31** ✓; Y3: 25.31 + 2.28 − 10 = **17.59** ✓ — the table foots to zero and total interest is ₹11.10L.
2. Y1: 7.78 + 3.50 = **₹11.28L** (+₹1.28L vs rent); Y5: 7.78 + 0.83 = **₹8.61L** (−₹1.39L). Front-load quantified, not just asserted.
3. 10.6 × 2.5313 = **₹26.83L**; Dr ROU ₹1.52L / Cr liability ₹1.52L; **rate UNCHANGED at 9%** — amount moved, shape didn't.
4. 10 × 3.7908 = **₹37.91L**; **+₹12.60L** to liability and ROU; rate **REVISED to 10%** — the deal's term changed, so its rate gets re-shopped at today's market.
5. **+₹1.54L** to liability and ROU at the unchanged 9%: guarantee settles end-Y5, three years from today → 2 × 1.09⁻³ = 2 × 0.7722 = **₹1.54L** (python-verified). The drill that matters is pinning the settlement date: the same ₹2L would have been ₹1.30L at commencement (5-year horizon, LS4's bucket) — discount the RESIDUAL horizon, never the original one.

## 💪 Exercises

1. Why is front-loading "structural" for a growing lessee but a wash for a steady-state one?
2. Write the three journal lines of Year 1 (interest accrual, payment, depreciation) for the naked canon.
3. A rent holiday (landlord waives Y3, then resumes) — modification (LS6), remeasurement door, or variable-style P&L? Pick and pre-defend against the other two.
4. The treasury team proposes recognizing ALL CPI uplift of the next 5 years into today's liability "to be prudent". Rule on it.
5. Where does ROU impairment testing sit — standalone asset or inside the store's CGU — and why?

### ✅ Selected answers

1. A steady-state portfolio's heavy young leases are offset by light old ones — the cohorts cancel. A growing lessee keeps ADDING fresh cohorts: heavy years stack, light years never catch up in proportion — front-loading becomes a permanent P&L tilt, not a timing curiosity.
2. Dr Finance cost ₹3.50L / Cr Lease liability ₹3.50L · Dr Lease liability ₹10.00L / Cr Cash ₹10.00L · Dr Depreciation expense ₹7.78L / Cr Accumulated dep (ROU) ₹7.78L.
3. Treat as a **modification** (the consideration for the period changed outside the original terms — LS6's doors apply, typically door-3-style remeasurement with ROU adjustment) — UNLESS it qualifies for the COVID-19-era practical expedient (LS9), which lets genuine pandemic concessions drop straight to P&L as a negative variable payment. It is NOT a door-(a) cash reset (no index moved) and NOT free "variable" treatment without the expedient.
4. Rejected — prudence isn't a license to pre-measure the future. Index-linked variables enter at TODAY's index level (LS4) and remeasure THROUGH door (a) as cash resets; capitalizing five years of forecast inflation invents obligations no contract yet imposes and double-counts tomorrow.
5. Inside the store's **cash-generating unit**: the ROU has no independent cash inflows, so Ind AS 36 carries it inside the store CGU; impairment allocates across the CGU's assets, ROU included — a standalone ROU write-down test would be category nonsense.

## ❓ Quiz

**Q1.** Year-1 total P&L charge on the ₹10L/yr, 5y, 9% canon (SL depreciation) is:
(a) ₹10.00L — same as rent, timing-neutral
(b) ₹11.28L — depreciation ₹7.78L plus interest ₹3.50L; interest is fattest on the fat opening balance, so charge front-loads (+₹1.28L now, −₹1.39L by Year 5) while lifetime totals match the old ₹50L
(c) ₹10.78L — dep minus interest
(d) ₹13.50L — full interest load

**Q2.** CPI resets remaining payments upward mid-lease (amounts changed, term and options untouched). The liability is remeasured at:
(a) today's market IBR, always
(b) the UNCHANGED original discount rate — only the cash amounts moved; the (python-verified) ₹10.6L-for-3-years case lands ₹26.83L vs ₹25.31L, a +₹1.52L tweak to liability and ROU with no day-one P&L hit
(c) the lessor's implicit rate
(d) zero — remeasurements are prohibited

**Q3.** A 2-year extension becomes reasonably certain; remaining payments become ₹10L × 5; today's IBR is 10%:
(a) keep 9% — rates never change
(b) remeasure at the REVISED 10% rate: ₹37.91L against the ₹25.31L carrying, +₹12.60L to liability and ROU — the deal's shape changed, so the rate gets re-shopped at current market for the revised horizon
(c) expense the ₹12.60L to P&L immediately
(d) derecognize and sign again

### ✅ Answers

1. **(b)** — ₹7.78L + ₹3.50L = ₹11.28L; front-loading is balance-size arithmetic, forecastable to the paisa.
2. **(b)** — amount-only resets keep the original rate; rate follows the deal's shape, not its invoice.
3. **(b)** — term/option changes re-open the deal at a revised rate; no immediate P&L, the ROU absorbs.

## ✅ Mastery checklist

- [ ] I can produce the full ₹38.90L accretion table and tie interest to ₹11.10L
- [ ] I can prove front-loading (₹11.28L/₹8.61L) and the empty-lifetime-total symmetry
- [ ] I can state the EBITDA +₹10L / EBIT +₹2.22L / PBT −₹1.28L cascade
- [ ] I can route any mid-life change to door (a), (b) or (c) with its correct rate
- [ ] I can write Year-1 journals from memory

**Next:** LS6 enters the renegotiation room — lease modifications: the separate-lease door, the scope-reduction door with its partial-derecognition gain, the plain reprice door, and why the revised discount rate crashes every modification party.
