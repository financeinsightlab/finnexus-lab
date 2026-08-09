# 🎯 IA5 · Fair Value Measurement — Ind AS 113's Price of Exit

> Modern accounting runs on fair value, and Ind AS 113 is the rulebook every other standard cites when they say those two words. It does not tell you WHEN to fair-value (each standard decides that) — it tells you WHAT fair value means and HOW to defend the number. This module: the exit-price definition, the market-participant lens, the three-level hierarchy, the three valuation techniques, highest-and-best-use, and the disclosure confessions that come with Level 3 courage.

---

## 🎯 Objectives

- Define fair value precisely: exit price, orderly transaction, market participants, measurement date
- Separate valuation premise inputs into Level 1 / Level 2 / Level 3 and classify real instruments cold
- Sketch the three valuation techniques (market, cost, income) and when each earns the job
- Apply highest-and-best-use thinking to non-financial assets, and the unit-of-account discipline
- Explain Day-1 gain/loss deferral and the disclosure weight Level 3 measurements must carry

## 📘 Concepts

### 5.1 The definition — four load-bearing words

**Fair value = the price that would be RECEIVED to SELL an asset or PAID TO TRANSFER a liability in an ORDERLY transaction between MARKET PARTICIPANTS at the MEASUREMENT date.**

- **Exit price, not entry price**: fair value is what you could sell for today — not what you paid, not what it cost to build. Entry and exit prices part company the second after purchase (transaction costs, bid-ask spreads, moguls of sunk cost).
- **Orderly**: assumes normal exposure to the market — a fire sale is not an orderly transaction, so distress prices don't define FV.
- **Market participants**: the measurement is a **market-based** measurement, not entity-specific. Your plans, synergies, and fears are inputs only to the extent the market shares them. This is the discipline that stops "we value it at ₹X because WE love it."
- **Measurement date**: anchored to a specific date — markets move, and FV moves with them.

### 5.2 The hierarchy — L1, L2, L3

Inputs to valuation techniques sit in three integrity tiers, and the **lowest significant input** determines the instrument's level:

| Level | Inputs | Canon examples |
|---|---|---|
| **Level 1** | Quoted prices in **active markets** for identical assets | NSE-listed equity, liquid G-sec — the price itself, unadjusted |
| **Level 2** | Observable inputs, directly or indirectly, short of L1 | Corporate bonds priced off similar-bond yields, FX forwards built from observable forward points, derivatives valued on quoted curves |
| **Level 3** | **Unobservable** inputs | Unquoted equity (your DCF, your multiples), bespoke structured notes, investment property using your own cap-rate judgment |

Profession rules: L1 needs no adjustment and accepts none; L2 allows calibration; L3 demands **maximum use of relevant observable inputs and minimum use of unobservable ones** — L3 is the last resort, not the first workshop. And availability bias is audited: an inactive market (thin trading, stale quotes, collapsed volumes) can knock an instrument out of L1 into L2/L3 territory.

### 5.3 The three techniques — and the mix

1. **Market approach**: prices and multiples from market transactions of identical/comparable assets (guideline companies, precedent transactions). Workhorse for unquoted equity — EV/EBITDA of comparables, adjusted for size/liquidity/growth.
2. **Cost approach**: current replacement cost — what it would cost today to replace the service capacity (used for specialized plant, some investment properties early in life).
3. **Income approach**: convert future amounts to a single discounted amount — DCF for businesses, option models for derivatives, multi-period excess earnings for customer intangibles.

Ind AS 113 blesses using one or multiple techniques **as appropriate**, then judging the result against the hierarchy and market evidence. The art is input selection: a DCF with management's dream cash flows is an L3 tower; its disclosures must let the user see the assumptions' sensitivity.

### 5.4 Non-financial assets — highest and best use

For non-financial assets, FV measures the asset's **highest and best use (H&BU)** by market participants — which may differ from its current use. Canon: a warehouse on city-edge land where developers would build residences is measured as residential-potential land (subject to the use being legally permitted, physically possible, financially feasible), NOT as a warehouse. Two premises chain off H&BU: **in-use** (asset's value comes from combination with other assets — a machine on a line) vs **in-exchange** (standalone sale). Unit of account — what exactly is being measured (single share? block with control premium? asset-within-CGU?) — comes from the standard governing the item; the FV framework then prices that unit faithfully, which is why control premiums and blockage discounts are forbidden add-ons unless the unit of account says so.

### 5.5 Day-1 differences and the disclosure load

- **Day-1 gain/loss**: if transaction price ≠ fair value at initial recognition, and the FV evidence is L1 or observable — recognize the difference immediately in P&L. If it leans on unobservable inputs — **defer** it, and release over the instrument's life as inputs become observable. (The structured-note desk cannot book day-one profit on its own model.)
- **Disclosure scales with audacity**: L1 items disclose perfunctorily; L3 items carry the full confessional — valuation technique, significant unobservable inputs, **sensitivity analysis**, rollforward from opening to closing, transfers between levels with reasons. Transfers L2→L3 (or back) are disclosed with justification; the note is the audit trail of humility.

## 🧪 LAB — Classify the Shelf (10 min)

Portfolio at 31-Mar-2026: (a) 50,000 shares of a Nifty-50 constituent; (b) ₹20cr AAA PSU bonds, priced off traded comparables' yields; (c) 8% stake in an unquoted logistics startup — last funding round 4 years ago; (d) USD/INR 6-month forward, valued from observable forward points; (e) investment property valued with your own 7.5% cap rate on projected rents; (f) an exotic structured note whose correlation input only your model produces. Level each item, name the technique, and flag the Day-1 question for (f).

**Why this matters:** level classification decides how much disclosure weight each item carries — and interviewers test whether you can place instruments in under 30 seconds.

**🔑 Lab answers:**
1. (a) **L1** — identical-asset quotes in an active market; no adjustment, technique = direct price.
2. (b) **L2, market approach** — observable comparables/yields; not L1 because this bond's own trade is thin.
3. (c) **L3, market/income mix** — stale 4-year-old round isn't a current observable; run comparables' EV/Revenue sanity-checked by a DCF.
4. (d) **L2, income approach flavor** — built from observable forward points and rates.
5. (e) **L3, income approach** — the cap rate and rent projections are unobservable judgments; full sensitivity disclosure applies.
6. (f) **L3** — and if booked at a Day-1 price your own model produced, the model-profit portion is **deferred**, not taken to P&L on day one.

## 💪 Exercises

1. "We paid ₹40cr for this stake, so fair value can't be below ₹40cr." Dismantle with the definition.
2. Why is the exit-price convention safer than entry price during bubbles?
3. Your land parcel is a warehouse today but sits in a zone where market participants would build apartments. Argue the valuation premise both as CFO (defend) and auditor (query).
4. What turns an L2 bond into an L3 problem, and what must happen to disclosures when it does?
5. Explain why blockage discounts on a 25% listed stake are generally forbidden add-ons under the unit-of-account rule.

### ✅ Selected answers

1. Fair value is an **exit** price on the **measurement date** — what the market pays today. Purchase price is history; the market owes nobody a recovery guarantee. If comparables trade lower, FV is lower, and the loss is real whether or not you like it.
2. Entry prices embed the buyer's bubble-era optimism permanently; exit prices re-anchor to today's market every reporting date, so overvaluation cannot hide inside the book — it must shrink in public.
3. CFO: H&BU = residential development (legally permitted, physically possible, financially feasible) → value as development land, capturing potential the warehouse can't. Auditor: prove it — zoning evidence, feasibility numbers, market-participant behavior; and if we keep operating it as a warehouse, reconcile the in-use premise of the operation with the in-exchange premise of the land.
4. Market inactivity — comparable trades dry up, spreads widen past honesty, quotes go stale → the observable inputs degrade to unobservable ones, and the instrument steps into L3 with the full confessional: techniques, sensitivities, rollforwards, and a transfer note with reasons.
5. Unit of account comes from the instrument's standard — per-share for an equity stake under Ind AS 109: FV = quoted price × shares. A blockage ("can't sell 25% without crashing the price") or control premium adjusts the UNIT, not the market input — Ind AS 113 forbids it unless the unit of account is itself the block.

## ❓ Quiz

**Q1.** Fair value under Ind AS 113 is best described as:
(a) the price you paid, adjusted for inflation
(b) an exit price in an orderly transaction between market participants at the measurement date — market-based, not entity-specific
(c) the replacement cost of the asset
(d) management's best estimate of intrinsic worth

**Q2.** A corporate bond priced from yields of actively traded comparable bonds is:
(a) Level 1 always
(b) Level 2 — observable inputs short of an identical active-market quote; the lowest significant input decides the level
(c) Level 3 because comparables are not identical
(d) exempt from the hierarchy

**Q3.** A model-only structured note shows a Day-1 model profit. Ind AS 113/109 treatment:
(a) book it immediately in P&L
(b) defer the day-one difference and release it as unobservable inputs become observable — model-only profit cannot be front-loaded
(c) book it in OCI until sold
(d) ignore the hierarchy and amortize over 10 years

### ✅ Answers

1. **(b)** — four load-bearing words: exit, orderly, market participants, measurement date.
2. **(b)** — comparables' yields are observable; but the instrument's level follows its lowest significant input.
3. **(b)** — unobservable day-one differences defer; heroic models cannot front-load profit.

## ✅ Mastery checklist

- [ ] I can recite the FV definition with all four load-bearing phrases
- [ ] I can level any shelf of instruments into L1/L2/L3 in under a minute
- [ ] I can match technique (market/cost/income) to asset type
- [ ] I can argue H&BU and in-use vs in-exchange premises
- [ ] I can explain Day-1 deferral and the L3 disclosure weight

**Next:** IA6 opens the giant itself — Ind AS 109 classification: business models, the SPPI test, the three measurement categories, the one-way FVOCI equity door, and the effective interest machine with numbers.
