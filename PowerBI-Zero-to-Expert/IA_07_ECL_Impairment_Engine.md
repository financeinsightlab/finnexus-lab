# 🎯 IA7 · ECL Impairment — The Expected Loss Engine Inside Ind AS 109

> The old world booked losses AFTER borrowers defaulted ("incurred loss"); the 2008 crisis proved that is accounting-by-rearview-mirror. Ind AS 109's Expected Credit Loss model books losses **today** for defaults that haven't happened yet, using probability, exposure, and loss-given-default. This module: the three stages, the SICR judgment, the 30-day presumption, the trade-receivables shortcut (provision matrix), and the Stage-3 interest twist. Every NBFC and bank analyst in India lives inside this engine — and with banks deferring Ind AS, NBFCs are its Indian home.

---

## 🎯 Objectives

- Explain why expected-loss replaced incurred-loss: forward-looking provisioning vs the "too little, too late" crisis critique
- Run the three-stage general model: 12-month ECL → lifetime ECL → credit-impaired, with interest presentation per stage
- Operationalize the SICR trigger and the 30-days-past-due rebuttable presumption
- Build a provision matrix for trade receivables (the simplified approach) with verified numbers
- Decompose ECL into PD × LGD × EAD and connect staged books to coverage ratios an analyst can audit

## 📘 Concepts

### 7.1 From incurred to expected — the philosophy flip

Incurred loss required a **trigger event** (missed payment, restructuring, bankruptcy) before you could provision — so 2006-vintage subprime books looked spotless while the borrowers were already drowning; losses arrived "too little, too late," and when they arrived they were cliffs. **ECL flips the clock**: at every reporting date you estimate the probability-weighted, discounted cash shortfalls expected over the instrument's life (or 12 months, per stage), embedding macro forecasts — GDP, rates, unemployment — into today's allowance. Consequences: provisions arrive EARLY and SMOOTHLY (the day a loan is booked, a reserve exists); allowance models become data infrastructure, not quarter-end judgment; and sudden stage migrations can swing P&L violently — which is the feature, not a bug: credit risk repriced honestly.

### 7.2 The three stages — general model

| Stage | Condition | Loss allowance | Interest revenue on |
|---|---|---|---|
| **Stage 1** | Performing; credit risk not significantly increased since origination | **12-month ECL** | **Gross** carrying amount |
| **Stage 2** | **SICR** — significant increase in credit risk since origination (but no objective impairment evidence) | **Lifetime ECL** | **Gross** carrying amount |
| **Stage 3** | Credit-impaired (default observed) | **Lifetime ECL** | **NET** carrying amount (gross minus allowance) |

Two fuel-saving valves: instruments with **low credit risk** at the reporting date (think investment grade) may stay Stage 1 without deeper SICR analysis; and **purchased or originated credit-impaired** (POCI) assets live in their own always-lifetime lane with the credit adjustment baked into the EIR. The Stage-3 interest rule — EIR applied to the NET book — is the honest one: charging interest on money you no longer expect to recover would inflate revenue with fiction.

### 7.3 SICR and the 30-day presumption

SICR is the engine's trigger and its judgment core: compare default risk at the reporting date vs at origination — NOT vs a static bar, and NOT mere deterioration of absolute quality (a CCC loan originated as CCC has not SICR'd; it was born there). Evidence menu: rating downgrades since origination, watchlist entry, pricing-for-risk the market now demands, adverse industry/regulatory shifts, covenant breaches. And the mechanical floor: payments **more than 30 days past due → SICR is presumed** — a presumption you may rebut only with evidence ("technical delay, documented"). It is deliberately hard to leave assets in Stage 1 once they're past 30 days late.

**Canon book (all numbers python-verified):** NBFC portfolio ₹650cr: Stage 1 ₹500cr at 1.2% allowance = **₹6.0cr**; Stage 2 ₹120cr at 6.5% = **₹7.8cr**; Stage 3 ₹30cr at 45% = **₹13.5cr**. Total ECL **₹27.3cr** = 4.2% coverage. The analyst's drills: coverage = ECL/gross book per stage (1.2% / 6.5% / 45%); year-on-year **stage migration** (how much S1 money slid to S2?) tells the story faster than the P&L charge; and GNPA-comparisons reveal why NBFC-plus-bank sectoral comparisons need the ECL lens, not NPA optics.

### 7.4 PD × LGD × EAD — inside the estimate

ECL = present value of expected shortfalls = **PD** (probability of default in the horizon, macro-conditioned) × **LGD** (loss given default — 1 minus recovery, collateral-awareness inside) × **EAD** (exposure at default — for term loans the outstanding; for revolvers, drawn + expected further drawings). Multiply across scenarios, weight by probability, discount at the EIR. Point-in-time vs through-the-cycle PDs is the professional knife: ECL wants forward-looking point-in-time estimates, which is exactly why NBFC models buy macro scenarios (base/upside/adverse weighted, e.g., 50/25/25) and why an adverse-GDP shock mechanically inflates Stage-2 allowances before anyone has missed a payment.

### 7.5 The simplified approach — trade receivables' provision matrix

For trade receivables and contract assets without significant financing components, Ind AS 109 drops the staging entirely: **lifetime ECL always**, estimated with a **provision matrix** — historical loss rates per aging bucket, adjusted forward-looking. Canon: receivables book ₹300cr, buckets and rates — 0-30 days ₹200cr @ 0.5% = ₹1.0cr; 31-60 ₹60cr @ 2% = ₹1.2cr; 61-90 ₹20cr @ 10% = ₹2.0cr; 91-180 ₹12cr @ 25% = ₹3.0cr; >180 ₹8cr @ 60% = ₹4.8cr. Allowance = **₹12.0cr** (4.0% of the book). Manufacturers and traders get ECL this way without buying SICR machinery; the analyst's test is whether the matrix's historicals were refreshed for forward-looking conditions (a stagnant matrix in a deteriorating cycle is a finding).

## 🧪 LAB — Run the Engine (10 min)

FinGrow NBFC facts: gross book ₹800cr. Stage 1 ₹620cr @ 1.0% loss rate; Stage 2 ₹140cr @ 5.0%; Stage 3 ₹40cr @ 40%. EIR on the Stage-3 pool 12%.

1. Compute the ECL allowance and headline coverage ratio.
2. This quarter ₹50cr of formerly-30dpd accounts rolled from Stage 1 to Stage 2 (rate 5%). Recompute the allowance and the P&L charge from migration alone.
3. Stage-3 carrying: interest income this year is booked on WHICH base? Compute it.
4. The CFO proposes moving 60dpd accounts back to Stage 1 "because historically they cure." Rule on it with the presumption vocabulary.

**Why this matters:** coverage math and migration math are the two numbers every NBFC earnings-call question is built from — do them in 90 seconds or get cut off.

**🔑 Lab answers:**
1. ECL = 620×1.0% + 140×5.0% + 40×40% = 6.2 + 7.0 + 16.0 = **₹29.2cr**; coverage = 29.2/800 = **3.65%**.
2. New allowance = 570×1.0% + 190×5.0% + 40×40% = 5.7 + 9.5 + 16.0 = **₹31.2cr** → migration cost the quarter **₹2.0cr** of charge (50cr × (5.0%−1.0%) = ₹2.0cr ✓ same answer).
3. Interest on the **net** carrying amount: (40 − 16) × 12% = 24 × 12% = **₹2.88cr** — not on the ₹40cr gross.
4. Presumed SICR ≥ 30dpd; at 60dpd, moving BACK needs strong documented evidence that risk is back at origination levels — a cure history can support rebuttal only prospectively, not by narrative. Expect the auditor and NFRA-lens reviewers to ask for the cure data series, not the adjective.

## 💪 Exercises

1. Why did incurred loss fail in 2008, stated in one sentence an examiner accepts?
2. A Crisil-BBB-loan book was originated BBB and is still BBB but the sector outlook turned negative. SICR yes/no, and what decides?
3. Explain why ECL applies to FVOCI-debt instruments even though they're already fair-valued (where does the allowance sit?).
4. A trader's aging matrix hasn't been updated since 2022. Write the one-paragraph audit query.
5. POCI: your fund buys a distressed ₹100cr book for ₹35cr. Sketch how interest recognition differs from a normal Stage-3 book.

### ✅ Selected answers

1. It recognized losses only after trigger events, so books looked clean exactly while risk was metastasizing — "too little, too late." (The cliff then arrived all at once, which is why forward-looking ECL exists.)
2. Possibly yes: SICR compares default risk NOW vs AT ORIGINATION — a sector-outlook deterioration can raise forward-looking default risk even before a downgrade. Same-grade is not immunity; origination-to-now is the comparison, and macro scenarios are legitimate evidence both ways.
3. Because FVOCI-debt keeps an AC soul: the FV is on the balance sheet, but ECL is still recognized **in P&L** with the offset in OCI — the allowance does not reduce the balance-sheet carrying amount (it's already FV). Net effect: impairment charge hits profit exactly like AC.
4. "The matrix embeds 2022 loss experience into 2026 conditions. Please evidence a refresh: recent default vintages, current macro overlays (sector stress, interest regime), and a sensitivity of the allowance to plausible rate shifts; absent this, the provision risks material understatement under the forward-looking requirement."
5. For POCI, expected credit losses at acquisition are inside the price — a **credit-adjusted EIR** (lower than contractual) drives interest income, and subsequent changes in expected losses run through P&L as impairment gains/losses. Interest is thus earned on a realistic yield from day one rather than a fiction of full recovery.

## ❓ Quiz

**Q1.** Under the general ECL model, a performing loan with no significant risk increase since origination carries:
(a) zero allowance until a trigger event
(b) a 12-month ECL allowance with interest revenue on the GROSS carrying amount — provisioning starts at origination, not at default
(c) lifetime ECL always
(d) lifetime ECL with interest on net

**Q2.** Payments 45 days past due on a loan imply:
(a) nothing until 90 days, by RBI rules
(b) a rebuttable presumption of SICR — the loan is presumed Stage 2 unless documented evidence says otherwise
(c) automatic Stage 3 classification
(d) immediate write-off

**Q3.** FinGrow's book computes: ₹620cr S1 @1.0% + ₹140cr S2 @5.0% + ₹40cr S3 @40% gives total ECL of:
(a) ₹22.0cr with 2.75% coverage
(b) ₹29.2cr with 3.65% coverage — stage rates applied stage-wise, then migrate-and-measure is how the quarterly charge builds
(c) ₹31.2cr with 3.9% coverage
(d) ₹16.0cr, Stage 3 only

### ✅ Answers

1. **(b)** — ECL's philosophy flip: reserve at birth, smooth through life, and interest stays honest to the stage.
2. **(b)** — 30 days past due is the mechanical floor; rebuttal needs evidence, not narrative.
3. **(b)** — 6.2 + 7.0 + 16.0 = 29.2 on 800: coverage is the first number every earnings call asks for.

## ✅ Mastery checklist

- [ ] I can state the incurred-vs-expected flip in one examiner-proof sentence
- [ ] I can write the 3-stage table (allowance + interest base) from memory
- [ ] I can argue SICR with origination-relative, forward-looking evidence
- [ ] I can compute allowances, coverage, and migration charges at NBFC speeds
- [ ] I can build a provision matrix and write the audit query for a stale one

**Next:** IA8 crosses borders — Ind AS 21 foreign currency: functional vs presentation, which items retranslate and which never do, the machine that stays at ₹88L while the payable bleeds ₹3.5L, and FCTR's journey to OCI.
