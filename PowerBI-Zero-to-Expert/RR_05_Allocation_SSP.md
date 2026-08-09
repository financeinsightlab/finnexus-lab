# 🎯 RR5 · Step 4: Allocate the Price — Standalone Selling Prices Do the Slicing

> Once the price is priced (RR4) and the promises are counted (RR3), the remaining act of arithmetic violence is sharing: which promise gets how much. Ind AS 115's rule is one line with an ocean beneath — **allocate on relative standalone selling prices** — and the ocean is what you do when no standalone price exists, when the bundle discount doesn't belong to everyone, and when "residual" tempts you to shove the mess into the last obligation. Telecom's free phone is the teaching animal; by the end of this module you'll never see a "free" anything the same way again.

---

## 🎯 Objectives

- Run the relative-SSP allocation with exact numbers on multi-PO bundles
- Estimate SSP when unobservable: adjusted market assessment, expected-cost-plus-margin, residual (with guardrails)
- Allocate discounts to specific obligations only on evidence — otherwise to everyone
- Allocate variable consideration to specific obligations when its terms point there
- Detect the classic allocation manipulations in real disclosure

## 📘 Concepts

### 5.1 The allocation rule — the pro-rata hammer

Allocate the transaction price to each PO in proportion to its **standalone selling price** (the price at which you'd sell that good/service separately to a similar customer in similar circumstances). Determined at contract inception; not re-allocated for later price movements.

**Canon telecom (python-verified):** customer pays ₹0 down + ₹1,000/month × 24 = ₹24,000 total for a "free" handset + service. SSPs: handset ₹18,000; service ₹750/month × 24 = ₹18,000; total SSP ₹36,000. Allocation: handset 24,000 × 18/36 = **₹12,000 at delivery**; service 24,000 × 18/36 = ₹12,000 → **₹500/month** for 24 months. The "free" phone was 50% of the economics wearing a marketing costume. The balance-sheet consequence you already know: at delivery, revenue ₹12,000 vs cash collected ₹0 of the phone slice → a **contract asset** builds (RR7 formalizes it), unwinding as bills rise. Every "free-with-plan" business you analyze has this paper asset humming beneath it.

### 5.2 When SSP isn't on the shelf — three estimation lanes

If no directly observable standalone price exists, estimate — maximizing observable inputs, consistently applied:

1. **Adjusted market assessment**: what would the market pay? Competitor prices for like goods, adjusted to your costs/margins. Best for products your rivals sell naked.
2. **Expected cost plus a margin**: forecast fulfillment cost, add an appropriate margin for that good/service. The workhorse for services and bespoke goods.
3. **Residual approach**: total price minus the observable SSPs of the OTHER obligations — permitted only when the price is highly variable/uncertain (never-the-same-deal software licenses are the canonical permitted use). **Guardrail**: residual may not produce a zero or absurd price; if it does, the residual isn't genuine — go back to lanes 1-2. Companies that park ALL uncertainty into a residual "support" obligation and front-load product revenue are rehearsing a restatement.

### 5.3 Allocating discounts — shared pain vs targeted pain

A bundle sells below the sum of SSPs: that's a discount, and the default is to allocate it **proportionately to ALL obligations**. Exception: if there's OBSERVABLE EVIDENCE the discount attaches only to particular obligations (e.g., you routinely sell A at full SSP and discount only B; the bundle discount exactly matches your standalone B-discount), you may pin the discount to those obligations — but the evidence bar is real, and the pinned set must itself be a coherent subset. The audit-challenge question, verbatim: "Show me the standalone evidence that this discount belongs to that obligation."

### 5.4 Allocating variable consideration — the pointing test

Variable consideration (bonuses, usage fees, penalty contingencies) is allocated entirely to one particular obligation (rather than spread) when BOTH: its terms relate specifically to that obligation/its outcome, AND allocating it fully there is consistent with the allocation objective (it mirrors what you'd charge for that obligation standalone). A usage-based fee on machine B in a two-machine contract? To B. An overall project bonus? Everyone. The pointing test matters enormously in software: a per-transaction fee that maps to the SaaS stream stays in the stream; it should not lubricate the license element's day-1 revenue.

### 5.5 Changes after inception & the manipulation detector

Post-inception total-price changes flow through the SAME allocation proportions (unless the change attaches to a specific obligation or is a modification — RR2's doors). Manipulation detector for analysts: (i) SSPs disclosed at suspiciously round ratios dedicating value to the point-in-time PO; (ii) "residual" support revenues that never vary with contract size; (iii) discount allocations that lean persistently against over-time revenue (front-loading); (iv) SSP ranges in notes with infinite width. Each is the Step-4 signature of a revenue-management quiet hands.

## 🧪 LAB — Slice Three Pies (10 min)

1. **BundleX**: box (SSP ₹8,000) + year of support (SSP ₹4,000) sells for ₹10,000 total. Allocate; what's the discount, and where does it sit by default?
2. **SoftY**: license (never sold standalone, price swings wildly across deals ₹40–90L) + 1-yr mandatory support (sold standalone at ₹15L/yr, observable). Deal price ₹80L. Which lane prices each, and compute.
3. **FitZ**: sells a treadmill (SSP ₹50,000) + 2-yr extended warranty (SSP ₹10,000) + delivery-and-install (SSP ₹6,000) for ₹58,000. The company always discounts delivery to free in standalone deals. What's the sharpest defensible allocation?

**Why this matters:** three pies cover the hammer, the residual lane with its guardrail, and the evidence-pinned discount — the complete Step-4 vocabulary in numbers.

**🔑 Lab answers:**
1. SSP total ₹12,000; price ₹10,000 → **discount ₹2,000**; default allocation: box 10,000 × 8/12 = **₹6,667**, support 10,000 × 4/12 = **₹3,333** (box at delivery; support ₹278/month over 12 months).
2. License SSP unobservable & highly variable → **residual lane is permissible**: support at observable ₹15L → license = 80 − 15 = **₹65L residual**. Guardrail check: ₹65L sits inside the ₹40–90L observed swing — plausible, lane stands; had it computed ₹95L or −₹5L, the residual collapses and lanes 1-2 must price the license instead.
3. Default would split ₹8,000 discount pro-rata; but standalone evidence shows delivery is ALWAYS free in separate deals → the discount plausibly attaches to delivery specifically. Defensible allocation: delivery **₹0** (its standalone price never actually charges), then the remaining ₹58,000 between treadmill+warranty at their SSP ratio: treadmill 58,000 × 50/60 = **₹48,333**, warranty 58,000 × 10/60 = **₹9,667** — provided the standalone-free-delivery history is documented; otherwise, pro-rata for everyone.

## 💪 Exercises

1. Why did the standard ban "management intent" pricing inside allocation and demand SSP evidence?
2. A perpetual-software vendor books license price as total minus residual-support ₹5L on a ₹55L deal, while support renews standalone at ₹20L/yr. Your finding?
3. Write the audit query for a company showing every bundle discount pinned to the "over-time" obligation, quarter after quarter.
4. Deal: ₹1cr with a usage fee estimated ₹10L that attaches contractually to Machine B (of A+B). Allocate the logic, not the numbers.
5. Explain the telecom contract asset in two sentences to someone who only knows deferred revenue.

### ✅ Selected answers

1. Intent is unauditable and elastic — it bends toward whichever revenue-timing the quarter needs. SSP (observable or estimated through disciplined lanes) makes the split mechanically reproducible: same inputs, same slices. Allocation stopped being a mood in 2015 for this reason.
2. The residual mispriced: support's observable ₹20L/yr makes a ₹5L residual-support absurd — guardrail fails; the license cannot front-load a phantom ₹50L. Re-price support at observable ₹20L; residual-license ₹35L — and question how ₹5L got booked (embellishment finding).
3. "Per note X, discounts were consistently allocated away from over-time obligations. Provide standalone-discount evidence supporting the attachment for each portfolio, sensitivity if default pro-rata allocation were applied, and the internal-approval trail. Absent evidence, the allocation appears engineered toward early revenue."
4. Attach the usage estimate fully to Machine B if the pointing test holds (terms name B's usage; full attachment mirrors standalone charging); the fixed ₹1cr splits A:B on relative SSP. Result: B's revenue carries the variability and timing of usage — A's slice stays clean.
5. "You gave the customer a ₹12,000 phone on day 1 but bill ₹500/month of phone-money over 24 months — the gap is an accrued, unbilled claim that is NOT yet a receivable because billing depends on staying on the plan. That conditional claim sits as a contract asset and unwinds into receivables as the bills go out."

## ❓ Quiz

**Q1.** The ₹24,000 telecom bundle (SSP: handset ₹18,000 + service ₹18,000) allocates day-1 handset revenue of:
(a) ₹18,000 — the phone's list price
(b) ₹12,000 — relative-SSP: half the SSP pool, so half the ₹24,000 total consideration, recognized at delivery
(c) ₹0 — free means free
(d) ₹24,000 − first month × ₹1,000

**Q2.** The residual approach to an unobservable license price is legitimate only when:
(a) management approves it annually
(b) the license price is highly variable or uncertain AND the residual outcome remains plausible against market evidence — an absurd residual collapses the lane
(c) the resulting license figure is zero or negative
(d) support is also priced as a residual

**Q3.** A bundle discount pins to ONE obligation only when:
(a) it is the smallest obligation
(b) there is observable standalone evidence the discount attaches there (e.g., that item is routinely discounted alone); otherwise the discount spreads pro-rata to all
(c) the CFO designates it at inception
(d) it is the point-in-time obligation

### ✅ Answers

1. **(b)** — the pro-rata hammer: 18,000/36,000 × 24,000 = 12,000; "free" was a marketing costume.
2. **(b)** — residual is the guarded lane: variability admits you, absurdity ejects you.
3. **(b)** — evidence pins discounts; preference does not.

## ✅ Mastery checklist

- [ ] I can compute relative-SSP allocations to the rupee on any bundle
- [ ] I can name and defend the three estimation lanes
- [ ] I can apply the residual guardrail and know when the lane collapses
- [ ] I can allocate discounts (default vs evidence-pinned) and variable consideration (pointing test)
- [ ] I can spot allocation manipulation signatures in disclosure

**Next:** RR6 answers WHEN — the three over-time criteria, input vs output progress methods, the uninstalled-materials exclusion (₹123.33L canon), and the right-to-invoice shortcut.
