# 🎯 LS8 · Lessor — The Two Doors Survive: Finance vs Operating

> Here's the plot twist of the whole standard: while the lessee's world was demolished and rebuilt, the **lessor's model walked out of the blast zone almost untouched**. Lessors still split leases into finance and operating at inception, still measure risk-and-reward transfer, still book either a "net investment" receivable or keep the asset and collect rent. Why the mercy? Because the crisis of 2008-vintage reporting was INVISIBLE OBLIGATIONS on lessee balance sheets — lessor balance sheets were already honest. This module gives you the surviving machine: classification, the net-investment engine (₹84.29L at 9.00%), manufacturer margins, and the straight-line rent rituals of the operating door.

---

## 🎯 Objectives

- Classify leases as a lessor: the five classic indicators plus the supporting cast, applied at INCEPTION
- Run finance-lease mechanics: derecognize the asset, book net investment, earn at the implicit rate (**₹7.59L Year-1 canon**)
- Book manufacturer/dealer lessors: day-one selling profit (₹6L canon) plus the finance-income tail
- Run operating leases: keep the asset, keep depreciating, straight-line rent with incentives smoothed (**₹9.5L/yr canon**)
- Route initial direct costs correctly through each door, and handle lessor modifications at a summary level

## 📘 Concepts

### 8.1 The classification exam — five indicators plus two stragglers

A **finance lease** transfers substantially all the risks and rewards incidental to ownership; an **operating lease** doesn't. Ind AS 116 (carrying forward Ind AS 17's furniture) gives indicators — none conclusive alone, substance over any contract label:

1. Ownership **transfers** to the lessee by the end of the term.
2. A **purchase option** priced so low that exercise is reasonably certain at inception.
3. The lease term covers the **major part** of the asset's economic life (even sans title).
4. At inception, the **PV of lease payments amounts to substantially all** of the asset's fair value.
5. The asset is **so specialized** that only the lessee can use it without major modification.

Supporting stragglers: the lessee absorbs the lessor's cancellation losses; gains/losses from residual-value fluctuations accrue to the lessee (a rent rebate tied to sale proceeds); the lessee can continue into a **secondary period at substantially below-market rent**. Classify at INCEPTION and — unlike lessee reassessments — a later **modification** re-opens classification as if a new lease; a mere estimate change (residual value outlook) doesn't re-open the door, it re-prices inside it.

### 8.2 Finance lease — the net-investment engine

At commencement the finance lessor **derecognizes the underlying asset** and recognizes a **net investment in the lease**:

- **Gross investment** = undiscounted lease payments receivable + any **unguaranteed residual** value.
- **Net investment** = gross investment discounted at the **rate implicit in the lease** — the rate setting PV (payments + unguaranteed residual) equal to fair value (+ lessor's initial direct costs for non-manufacturers).
- Then: finance income each period = a constant periodic return on the outstanding net investment (EIR-style); receipts split income/principal; unguaranteed residuals REVIEWED annually (a sagging residual is an income-statement event via the accretion path).

**The ₹84.29L canon (python-verified):** LeaseLine Capital finances equipment, fair value ₹84.29L, five receipts of ₹20L in arrears plus a ₹10L guaranteed residual. Rate implicit = 9.00% (20 × 3.8897 + 10 × 0.6499 = 77.79 + 6.50 = 84.29 ✓). The engine:

| Year | Opening NI | Finance income @9% | Receipt | Closing NI |
|---|---|---|---|---|
| 1 | 84.29 | **7.59** | 20.00 | 71.88 |
| 2 | 71.88 | 6.47 | 20.00 | 58.35 |
| 3 | 58.35 | 5.25 | 20.00 | 43.60 |
| 4 | 43.60 | 3.92 | 20.00 | 27.52 |
| 5 | 27.52 | 2.48 | 20.00 | **10.00** |

Liftoff: total receipts ₹100L + residual ₹10L = ₹110L out of an ₹84.29L book → ₹25.71L lifetime finance income (schedule foots: 7.59+6.47+5.25+3.92+2.48 = ₹25.71L, python-verified). The closing ₹10.00L is exactly the residual collected at return — the machine foots to the paisa, which is the point of an engine.

### 8.3 Manufacturer / dealer lessors — margin at the door, interest down the hall

A manufacturer (or dealer) who finances its OWN product earns two profit types, and the standard lets both show up:

- **Selling profit/loss at commencement** = revenue (fair value of the asset, or PV of payments discounted at a market rate if lower) minus cost (carrying amount less PV of any unguaranteed residual). **Canon:** LeaseLine's auto arm builds a vehicle costing ₹22L, finance-leases it at terms pricing to FV **₹28L** → day-one **selling profit ₹6L**, booked like an ordinary sale — then the finance-income tail (8.2's engine) unwinds over the term.
- **Costs of negotiating/arranging** (selling costs) for a manufacturer/dealer are **expensed at commencement** (mostly when the selling profit lands) — NOT folded into the net investment as with plain finance lessors (for non-manufacturer finance lessors, IDCs instead enter the net investment and shave the implicit rate).

### 8.4 Operating lease — the unbothered door

Asset stays on the lessor's books. Depreciate it per your normal policy (Ind AS 16 life). Recognize lease income **straight-line** over the term unless another systematic basis IS more representative. Two rituals matter:

- **Incentives flatten, they don't vanish.** Total consideration is total consideration: **canon:** 5 years at ₹10L/yr with the first 3 months free → aggregate billings 50 − 2.5 = ₹47.5L → income **₹9.5L/yr straight-line, every year**, including the free quarter (year 1: cash ₹7.5L, income ₹9.5L, the ₹2L difference accrues as a lease receivable that later years' cash > income unwinds). (Aggregate math python-verified: 10 × 0.25 = 2.5; 50 − 2.5 = 47.5; 47.5 ÷ 5 = 9.5.)
- **Initial direct costs** are ADDED to the asset's carrying amount and recognized as expense over the term on the same basis as income — the operating door's quiet way of matching.

Lessor disclosures then get their own section (Ind AS 107-flavored maturity analysis of undiscounted receipts, variable income, residual-value risk management) — financial-statement readers watch the lessor's residual bets like card-counters.

### 8.5 Lessor modifications — door logic of their own

A lessor's modification depends on the door it's standing in and whether the change would've re-run inception classification: finance-lease mods that aren't separate leases remeasure with EIR rules (or, had the change existed at inception, flip the book to operating — derecognize the net investment, book the asset, fresh paint); operating mods run as new leases from the effective date with prepaid/accrued balances gliding into the new schedule. Summary doctrine: **modifications re-open classification; estimate changes only re-price.**

## 🧪 LAB — LeaseLine's Ledger (10 min)

1. Classify by door: (A) 5-of-6-year-life crane lease, PV of payments = 97% of FV; (B) 2-year photocopier deal on a 6-year-life machine, PV = 30% of FV, returns at market; (C) car lease with ₹50k purchase option against an expected ₹9L market; (D) generic 3-year office furniture lease, PV = 55% of FV, no transfer, no option.
2. Run the canon engine: book the ₹84.29L net investment, produce Y1–Y2 lines, and verify the year-5 closing equals the guaranteed residual.
3. Manufacturer arm: vehicle cost ₹22L leased at FV ₹28L — state commencement-date entries conceptually (what profit, what asset transformation) and where negotiation costs go.
4. Operating arm: 5y at ₹10L/yr, first 3 months free. Income per year, Y1 cash vs income, and the receivable that glues them.
5. LeaseLine's residual desk learns mid-term the unguaranteed residual on a big-ticket lease will sag 20%. Door logic: re-open classification, or re-price inside it — and what hits income?

**Why this matters:** half of India's NBFC book and every REIT you will ever analyze runs this exact machine. Lessor reading = knowing which door a portfolio stands in, then reading income shape, residual risk, and incentive-smoothing artifacts off it.

**🔑 Lab answers:**
1. (A) **Finance** — major-part-of-life plus PV-substantially-all both flash; (B) **Operating** — no indicator breathes; (C) **Finance** — bargain purchase option reasonably certain (₹50k vs ₹9L expected); (D) **Operating** — 55% PV is nowhere near substantially-all; classification travels on substance, not the label printed at the top.
2. Dr Net investment ₹84.29L · Cr Equipment ₹84.29L. Y1: income ₹7.59L, receipt ₹20L → ₹71.88L. Y2: income ₹6.47L → ₹58.35L. (Y5 closing: ₹10.00L = the residual, collected at handback — the engine foots ✓.)
3. Day one: recognize **revenue ₹28L** (selling profit **₹6L** against cost ₹22L) and a net investment for the payment stream; the cost side removes carrying amount (net of any unguaranteed residual PV). Negotiation/arrangement costs: **expensed at commencement** — manufacturers don't get to tuck selling costs into the receivable.
4. Income **₹9.5L/yr × 5 years** (aggregate ₹47.5L ÷ 5). Y1: cash ₹7.5L (9 billing months), income ₹9.5L → a **₹2L lease receivable accrues**, collected back in later years when cash (10) > income (9.5). Incentive smoothing in one line: rent-free periods bend cash, never total income.
5. **Re-price inside the door** — a residual estimate change is NOT a modification; classification stays. The lower unguaranteed residual re-runs the accretion economics: the net investment remeasures and the shortfall flows through income (the finance lease's built-in impairment path), disclosed with residual-risk management commentary.

## 💪 Exercises

1. Why did the standard-setters leave lessor accounting mostly alone? Ground it in the crisis the project actually targeted.
2. Which indicator is closest to a "bright line" in practice, and why do standard-setters still refuse to number it?
3. A manufacturer lessor argues arranging-costs should sit inside the net investment "like a bank's". Rebut.
4. Show the full Y1 statement lines for the operating canon (rent-free first quarter): income, receivable movement, depreciation line position.
5. Guaranteed vs unguaranteed residuals — which enters the lessee's liability and which enters the lessor's gross investment? Articulate the asymmetry.

### ✅ Selected answers

1. The project's enemy was the lessee's invisible debt: operating leases let airlines and retailers carry empires off balance sheet. Lessor books already carried either the asset or the receivable — the assets/claims were visible; only income-shape nuance remained. Rebuilding the visible side would have spent years for cosmetic gain, so the two-door model crossed into 116 substantially intact.
2. PV-of-payments ≈ substantially all of FV (and its cousin, term ≈ major part of life) are the workhorse triggers in practice — bright-line-ish because numbers tempt thresholds. Setters still refuse explicit percentages (the old US 75%/90% lines) because bright lines invite engineering one basis point underneath them: "substantially all" forces judgment in BOTH directions and kills the game of structuring to 89.9%.
3. Banks don't fold salesman commissions into loans either when originating product-linked deals: for a MANUFACTURER the lease is a SALES channel, so its negotiation costs are selling costs — expensed at commencement alongside the selling profit. The net-investment-treatment is reserved for pure financiers, whose IDCs genuinely price the implicit rate. Different business, different routing.
4. Income statement: lease income ₹9.5L in operating lines; depreciation on the asset (say ₹6L) also in operating lines (Ind AS 16 policy). Balance sheet: lease receivable +₹2L (income ₹9.5L vs cash ₹7.5L), unwinding in later years. Note the shape: rent-free front-loading boosts EARLY income above cash — that's the accrual doing its matching job, not growth.
5. The lessee's liability carries only the GUARANTEED slice, and only to the extent payment is expected (LS4's bucket 3: expected shortfall, not face). The lessor's gross investment sweeps EVERYTHING: guaranteed + UNGUARANTEED residual (the lessor owns whatever comes back, hopeful or not). Asymmetry by design: the lessee books obligations it expects to PAY; the lessor books every rupee of value it expects to RECEIVE.

## ❓ Quiz

**Q1.** LeaseLine's canon: 5 receipts of ₹20L in arrears + ₹10L guaranteed residual, fair value ₹84.29L. Year-1 finance income is:
(a) ₹20.00L — the first receipt
(b) ₹7.59L — 9% × ₹84.29L net investment; receipts then split income/principal so the closing balance accretes exactly to the ₹10L residual at year 5
(c) ₹7.20L — 9% on ₹80L
(d) ₹25.71L — lifetime income, all upfront

**Q2.** A manufacturer lessor finance-leases a vehicle costing ₹22L at FV-anchored terms of ₹28L. At commencement it books:
(a) nothing until the first payment arrives
(b) revenue ₹28L and selling profit ₹6L immediately (the lease is a sales channel), a net investment for the stream, and negotiation costs expensed at commencement — the finance-income tail then unwinds over the term
(c) revenue spread ₹1.2L per year over 5 years
(d) profit ₹6L over the lease term on collection

**Q3.** 5-year operating lease, ₹10L/yr, first 3 months rent-free. Annual recognized income is:
(a) ₹10L in billing years, ₹0 in the free stretch
(b) ₹9.5L every year — aggregate billings ₹47.5L ÷ 5 years; incentives bend cash (year-1 cash ₹7.5L with a ₹2L receivable accrual) but never total income, which straight-lines across the term
(c) ₹7.5L in year 1, then ₹10L
(d) ₹47.5L recognized at inception

### ✅ Answers

1. **(b)** — constant periodic return on outstanding net investment; the schedule foots to the residual.
2. **(b)** — manufacturer/dealer lessors book selling profit at commencement; selling costs expense with it.
3. **(b)** — operating incentives smooth through the term; watch the receivable bridge, not the cash.

## ✅ Mastery checklist

- [ ] I can classify with all five indicators plus stragglers, at inception, without bright-line crutches
- [ ] I can build the ₹84.29L / 9.00% engine and foot it to the ₹10L residual (₹25.71L lifetime income)
- [ ] I can book a manufacturer-dealer: ₹6L day-one profit + expensed arrangement costs
- [ ] I can smooth the operating incentive canon to ₹9.5L/yr with the ₹2L receivable
- [ ] I can route IDCs three ways and keep estimate-changes vs modifications apart

**Next:** LS9 stacks the Russian dolls — subleases: the intermediate lessor classifies against the ROU (not the building), daylight can bring a ₹1.96L day-one loss, the head liability never leaves, and then the sweeteners: incentives on every side and the COVID-19 concession expedient India used through June 2022.
