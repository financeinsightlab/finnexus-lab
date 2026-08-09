# 🎯 IA6 · Financial Instruments: Classification — The Ind AS 109 Sorting Machine

> Ind AS 109 is the biggest single engine in the whole system: one standard decides what billions of loans, bonds, and investments are worth on every balance sheet in India. Its classification logic is a two-gate sorting machine — the business-model gate and the SPPI gate — followed by one irrevocable equity election and the EIR machine that makes "amortized cost" honest. Master this and IA7's impairment engine plugs straight in.

---

## 🎯 Objectives

- Run the two-gate classification: business-model test → SPPI test → AC / FVOCI / FVTPL
- Distinguish debt instruments from equity instruments and state the default + election for equities
- Apply the FVOCI-equity one-way door (no recycling, ever) and the reclassification rule
- Operate the effective interest rate method with fees inside the rate — full schedule, verified numbers
- Explain embedded derivatives in one paragraph and when reclassification is even allowed

## 📘 Concepts

### 6.1 The two gates for debt instruments

Gate 1 — **Business model** (portfolio-level judgment, not instrument-by-instrument mood): how does management actually manage these assets to produce cash flows?
- **Hold to collect** contractual cash flows → the AC track
- **Hold to collect AND sell** (liquidity buffer portfolios — banks' investment books) → the FVOCI track
- **Trading / managed on fair value / everything else** → FVTPL
The acid test is observed behavior: frequent significant sales out of a "hold to collect" book is evidence the model isn't what the policy says.

Gate 2 — **SPPI** (Solely Payments of Principal and Interest): do the contractual cash flows represent only principal + interest on outstanding principal (which includes basic credit risk, time value, liquidity, cost, margin)? Pass → eligible for AC/FVOCI per Gate 1. Fail → **FVTPL by default**, no matter how benign. Fails include: leveraged-index bonds (2x Nifty payoffs), convertibles (the equity upside violates "solely"), inverse floaters (payments inversely geared to rates), ESG-ratchet bonds where ratchets don't represent basic lending risk. A plain 9% 5-year debenture? Pure SPPI. Same note with a "rate doubles if Sensex falls" clause? FVTPL — one clause, different life.

### 6.2 The three categories — what each one does to the statements

| Category | Balance sheet | P&L | OCI |
|---|---|---|---|
| **Amortized Cost (AC)** | EIR roll-forward net of ECL | interest income (EIR), ECL charges | — |
| **FVOCI (debt)** | **Fair value** | interest (EIR), ECL — as if AC | the FV-vs-AC gap; **recycles** to P&L on derecognition |
| **FVTPL** | Fair value | everything: interest + all FV movement | — |

FVOCI-for-debt is the elegant hybrid: the P&L behaves exactly like the AC world (interest + impairment), while the balance sheet marks to market, and the accumulated fair-value difference sits in OCI until you sell — then that bucket **recycles into P&L** (Bucket B of IA3). Contrast retained for IA7: ECL applies to AC and FVOCI-debt; never to FVTPL (the losses are already on the face).

### 6.3 Equity instruments — default FVTPL, and the one-way door

Investments in equity shares default to **FVTPL** — SPPI is structurally impossible (no principal, no promised interest). One escape: at **initial recognition**, per investment (not portfolio), you may make an **irrevocable election** to present FV changes in **OCI** for non-trading strategic holdings. Rules of the door:

- Gains and losses go to OCI and **never recycle to P&L — not even on sale** (Bucket A canon: the one-way door). On disposal you shuffle the reserve **within equity** (to retained earnings), bypassing the profit line forever.
- **Dividends** still land in P&L (unless they clearly represent recovery of part of the cost).
- No impairment losses ever — L3-fair values flow straight to OCI.

Why the door is one-way: the framework refuses to let companies sell winners into profit and park losers in OCI. Choose per investment, choose forever.

### 6.4 The EIR machine — amortized cost done honestly

Amortized cost is not "straight-line the interest." The **effective interest rate** discounts all contractual cash flows — including upfront **fees paid/received and transaction costs** — back to the net carrying amount. Canon build, fully verified:

Loan: face ₹100L, 10% annual coupon for 5 years, principal at maturity; upfront fee ₹2L → net disbursal ₹98L. Solve for EIR r: 98 = 10×annuity(r,5) + 100/(1+r)^5 → **r = 10.53%**.

| Year | Opening AC (₹L) | Interest income @EIR | Coupon received | Closing AC |
|---|---|---|---|---|
| 1 | 98.00 | 10.32 | 10.00 | 98.32 |
| 2 | 98.32 | 10.36 | 10.00 | 98.68 |
| 3 | 98.68 | 10.40 | 10.00 | 99.08 |
| 4 | 99.08 | 10.44 | 10.00 | 99.52 |
| 5 | 99.52 | 10.48 | 10.00 + 100.00 principal | nil |

Total interest income ₹52.0L = ₹50L coupons + ₹2L fee — the fee was never a year-1 windfall; it accretes into income across the life. This is why origination-fee-heavy lenders can't front-load profits: the EIR machine spreads the juice. Floating-rate? The EIR resets with the rate (catch-up mechanics). Credit-impaired assets (IA7 Stage 3)? EIR is applied to the **net** carrying amount — interest shrinks with the rot.

### 6.5 Embedded derivatives and reclassification

- **Embedded derivative**: a derivative hiding inside a non-derivative host (a structured deposit paying equity-linked returns). Under Ind AS 109 for **financial assets**, do NOT separate — classify the whole hybrid by running SPPI on the entire contract (usually it fails → FVTPL). Separation engineering survives mainly for liabilities and non-financial hosts.
- **Reclassification**: only when the **business model changes** — genuinely rare (a portfolio's purpose demonstrably changes; e.g., a lender shutters a business line). Prospective from the first day of the next reporting period; no restating. Category-hopping to dress up a quarter is not a business-model change, and auditors treat the excuse accordingly.

## 🧪 LAB — Classify the Book (10 min)

LoanBook Finance Co's holdings: (1) 5-year plain-vanilla term loans, originated to hold; (2) ₹40cr G-secs held as the liquidity buffer — sold ₹6cr twice this year for liquidity management; (3) a bond paying 2x the return of a bond index; (4) convertible debentures of a midcap; (5) 2% strategic stake in a supplier (not for trading); (6) IPO-flip equity positions churned weekly. Classify each (AC / FVOCI / FVTPL / election available) with the gate logic in one line.

**Why this matters:** six instruments, one machine — this exact drill is how auditors and credit analysts test that you can run the two gates blindfolded.

**🔑 Lab answers:**
1. **AC** — hold-to-collect + SPPI pass.
2. **FVOCI (debt)** — hold-collect-AND-sell model (liquidity selling is consistent with the model) + SPPI pass. P&L runs like AC; the FV gap parks in OCI.
3. **FVTPL** — SPPI fails at the leverage clause; Gate 1 never gets a vote.
4. **FVTPL** — convertibility breaks "solely payments of principal and interest."
5. **FVTPL by default — with the one-time, irrevocable FVOCI election available** (strategic, non-trading). If elected: no recycling, ever; dividends to P&L.
6. **FVTPL** — trading model; the equity election is closed to trading books.

## 💪 Exercises

1. A bank's "hold to collect" book sold 30% of its volume this quarter. CFO says "isolated liquidity needs." What evidence settles the business-model question, and what changes if failed?
2. Why does ESG-linked coupon ratchet potentially fail SPPI, and when might it survive?
3. Compute the EIR and Y1 income: face ₹50L, 9% coupon, 4 years, fee ₹1L net disbursal ₹49L (solve, then sanity-check against the canon shape).
4. Trace the statement journey of an FVOCI-debt G-sec sold after two years: every line it touched from purchase to disposal.
5. "We elect FVOCI for ALL our equities including the trading desk." Rule on it.

### ✅ Selected answers

1. Frequency, significance, reasons of sales vs the documented model — sales near maturity, tiny relative to the book, or credit-deterioration sales may stay consistent with collect; 30% recurring volume does not. If the model fails, the book reclassifies (prospectively) to FVTPL/FVOCI per the real model — a public admission the label was wrong.
2. If the ratchet compensates only basic lending risks (e.g., margin step for credit-rating migration), it can stay SPPI-clean; if it rides equity, commodity, or ESG-index variables unrelated to lending risk, "solely" dies → FVTPL. The test is what the cash flows REPRESENT, not the label.
3. Solve 49 = 4.5×annuity(r,4) + 50/(1+r)^4 → **r ≈ 9.63%**. Y1 income = 49 × 9.63% = **₹4.72L** vs coupon 4.5; the ₹0.22L slice of fee accretes into the AC rail — same canon shape as 10.53% (verify: total income over 4y = 18 + 1 = 19 on 49 invested ✓).
4. Purchase at FV → interest income via EIR each year + ECL charge through P&L → FV change vs AC rail accumulates in OCI → on sale, derecognize, realize proceeds logic in P&L **and recycle the accumulated OCI fair-value reserve into P&L** (Bucket B). Every statement touched: BS, P&L, OCI, SOCIE, cash flow.
5. Rejected: the FVOCI election is only for investments **not held for trading**; the trading desk is FVTPL by definition. Per-investment, strategic-only, irrevocable — those are the door's three hinges.

## ❓ Quiz

**Q1.** A debt fund holds bonds both to collect coupons and to sell for liquidity-management needs; cash flows are pure SPPI. Category:
(a) amortized cost — any selling kills it
(b) FVOCI — hold-collect-and-sell business model with SPPI pass; P&L runs like AC, FV gap in OCI, recycling on sale
(c) FVTPL, sales prove trading
(d) HTM with disclosure only

**Q2.** A bond paying twice the Nifty-50 return classifies as:
(a) FVOCI, since index exposure is just a market factor
(b) FVTPL — SPPI fails: cash flows must be solely principal and interest on outstanding principal; the 2x leverage clause kills it
(c) AC if held to maturity
(d) AC if no fees were charged

**Q3.** On disposal of an equity investment held under the FVOCI election, the accumulated OCI:
(a) recycles to P&L like FVOCI debt
(b) is never recycled to P&L — it moves within equity; the one-way door blocks sale-timing games with profit
(c) transfers to deferred tax
(d) reverses through P&L as impairment

### ✅ Answers

1. **(b)** — the hybrid: AC-flavored P&L on an FV balance sheet, with Bucket-B honesty on exit.
2. **(b)** — one leverage clause, category decided; SPPI is binary.
3. **(b)** — the door is one-way by design: no flipping winners through the profit line.

## ✅ Mastery checklist

- [ ] I can run the two gates (business model → SPPI) on any debt instrument cold
- [ ] I can write the three-category statement-map (AC / FVOCI / FVTPL) from memory
- [ ] I can explain the FVOCI-equity election's three hinges and why no-recycling is the point
- [ ] I can build an EIR schedule with fees inside the rate (10.53% canon, 9.58% drill)
- [ ] I know the only legitimate trigger for reclassification

**Next:** IA7 fires the second engine inside Ind AS 109 — ECL impairment: three stages, SICR judgment, the 30-day rebuttable presumption, provision matrices for trade receivables, and why Stage-3 interest math shrinks with the rot.
