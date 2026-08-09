# 🎯 RR4 · Step 3: Determine the Transaction Price — What's Actually Yours

> The sticker price is a starting rumor. The transaction price is what you expect to be ENTITLED to after the variables are estimated, the reversal-bomb is defused by the constraint, any embedded financing is stripped out at market rates, non-cash payment is fair-valued, and the cash you're paying back to the customer is netted off. Step 3 is where hopeful contracts become honest ones — and where most revenue restatements are born.

---

## 🎯 Objectives

- Estimate variable consideration: expected value vs most-likely, choosing by outcome structure
- Apply the reversal constraint — include variable money only when a significant reversal is NOT probable
- Unpack significant financing components at incremental borrowing rates (the ₹116.64 canon), with the one-year expedient
- Measure non-cash consideration and net out consideration payable to the customer
- Decide when list-and-variable interplay (rebates, penalties, credits) belongs to Step 3 vs Step 1

## 📘 Concepts

### 4.1 Variable consideration — two estimators, one rule

Price varies when it hangs on events: bonuses, penalties, rebates, refunds, price concessions, SLA credits, volume discounts, performance incentives. Estimate UP FRONT (and refresh every reporting date) using whichever method predicts better:

- **Expected value** (probability-weighted sum) when outcomes are a RANGE or the entity has many similar contracts: e.g., penalty-tiered rate card — outcomes ₹0 @20%, ₹10L @30%, ₹20L @50% → **EV = ₹13.0L** (python-verified).
- **Most likely amount** when outcomes are essentially BINARY: a ₹20L on-time completion bonus you'll either win (70% track record says plan for it) or not → **most likely = ₹20L**.

Choose per contract, apply consistently per uncertainty type. The mistake to never make: EV-ing a binary (70/100 × ₹20L = ₹14L books a fine-tuned fiction neither reality will deliver).

### 4.2 The constraint — the defusing rule

Include variable consideration only to the extent it is **highly probable that a significant reversal will NOT occur** when the uncertainty resolves. The constraint is the anti-heroics valve: even your EV estimate gets clamped if experience, long horizons, many external drivers, or wide outcome ranges make a future clawback plausible. The canon reading: commodity-price-linked royalties with 3-year horizons → include little or nothing until real; a modest SLA credit history (max historically 2% of billings) → estimate away confidently. And the royalty special case (RR8's licenses): sales-based IP royalties are constrained to ZERO until the later of the sale occurring/PO satisfaction — by design. Reassess each period; constraint releases flow in as bonuses to the period they unlock in.

### 4.3 Significant financing component (SFC) — strip the embedded loan

If payment timing gives either party a SIGNIFICANT financing benefit, the contract contains an embedded loan, and revenue is the **cash-selling price**, not the nominal sum. Discount at the rate that would apply in a separate financing between the parties (customer's incremental borrowing rate when the customer pays later; your effective rate when customer pays early). **Canon (python-verified):** customer pays ₹100L upfront for equipment delivering in 2 years; appropriate rate 8% → the contract liability accretes: revenue at delivery = 100 × 1.08² = **₹116.64L**, with **₹16.64L interest expense** over the two years (delivery-date recognition, per RR6's timing). Mirror case: cash price ₹100L, customer pays ₹100L in 3 years at 0% explicit → the deferred pile discounts to a lower revenue today with interest INCOME unwinding. Expedients: (a) skip SFC if the pay-perform gap is **≤ 12 months** (mobilization advances, retainers under a year); (b) skip when timing is at the customer's discretion or the payment varies on future events. Indicators that invisible SFC is lurking: long retention tails, multi-year advances, deliberately "zero-interest" delayed payments.

### 4.4 Non-cash consideration — fair value it

Customer pays in goods, services, equity, or materials contributed? Measure at **fair value of the non-cash consideration** (what you received), at contract inception-era guidance; if you can't measure it reliably, use the SSP of what you promised instead. Customer contributes materials you use (say, steel for fabrication)? That's non-cash consideration too — it's part of your transaction price (and the fabrication steel is then your procurement, not a cost-free input authorizing revenue top-ups). Fair-value changes AFTER inception caused by form (e.g., equity price moves) — those don't reopen the revenue estimate.

### 4.5 Consideration payable to the customer — the netting blade

Money flowing back to the customer (slotting fees, coupons to end-consumers via retailers, volume rebates, co-op advertising funds) **reduces transaction price** — unless it's payment for a DISTINCT good/service received from the customer, in which case it's a purchase (up to fair value; the excess still nets). Rebates tie into variable consideration: expected volume rebates REDUCE revenue as sales occur (liability accrues), not when settled. Slotting allowances and "pay-to-play" listing fees — net. This blade is why many companies' "gross revenue" in marketing decks is a fiction the statements politely disown.

### 4.6 Price changes after inception — the discipline

Estimate at inception; update each reporting date; price changes flow to POs on the same allocation basis as at inception (with specific carve-outs for changes attributable to already-satisfied obligations vs variable considerations meeting particular criteria). A scope change isn't a price change — it's a modification (RR2's three doors). Keep the taxonomy clean: concession = estimate change; scope add/remove = modification; enforceability question = not yet a contract at all.

## 🧪 LAB — Price the Pack (10 min)

1. **TowerA**: fixed ₹8.0cr + ₹0.5cr on-time bonus (track record: hit 7 of last 10). Binary or range? Estimate before constraint, then apply constraint language.
2. **EquipB**: customer pays ₹100L now, delivery in 2 years, 8% rate. Revenue at delivery + the two P&L lines during the wait.
3. **DistribC**: list sales ₹5.0cr to a distributor; pattern shows 4% average rebate always settles quarter+1. This quarter's transaction price and balance?
4. **KiosKraft**: pays ₹60L to a retailer for premium shelf space, no distinct service received back. Net effect?
5. **SteelFab**: customer supplies ₹20L of steel for a ₹90L fabrication job. Transaction price and why?

**Why this matters:** five price-shaping devices in ten minutes — bonus, financing, rebates, pay-to-play, contributed materials — each with its own line mechanics. This IS Step 3.

**🔑 Lab answers:**
1. Binary → **most likely ₹0.5cr** (70% history supports plan-for-win); constraint: include only to the extent a significant reversal isn't probable — with 70% track record and a single hard deadline event, many builders still clamp to zero until the state is certain; defend your call with history, horizon and external drivers documented.
2. Revenue at delivery **₹116.64L** = ₹100L × 1.08²; while delivery is pending, the contract liability accretes with **interest expense ₹16.64L** total (year 1: ₹8.0L; year 2: ₹8.64L) — the embedded loan is honest.
3. Transaction price = ₹5.0cr − expected rebates 4% = **₹4.80cr** this quarter; accrue rebate liability ₹20L — rebates reduce revenue as sales happen, not when paid.
4. Net it: consideration payable to customer with no distinct good/service → **₹60L reduction of transaction price** (typically spread against the related sales), not a marketing expense.
5. Non-cash consideration: **transaction price = ₹90L + ₹20L steel FV = ₹110L**; the steel rides in as your input cost — contributed materials inflate both price and cost honestly.

## 💪 Exercises

1. Why does expected value fail a binary bonus, and most-likely fail a smooth range?
2. A 15-month deferred-payment "zero-interest" deal on cash-price-₹1cr equipment. Sketch the accounting with the customer's 10% incremental borrowing rate (direction only — name the lines).
3. Your sales VP books ₹5cr revenue and separately "marketing expense ₹30L" for slotting fees. Correct once, citing the blade.
4. Where does the reversal constraint show its teeth in royalty-franchise models (preview of RR8)?
5. A contract's price is ₹2cr "subject to regulator approval expected in 14 months." Step-1 or Step-3 problem? Defend.

### ✅ Selected answers

1. EV averages world-states that never individually occur in a binary — booking 0.7 × bonus promises ₹14L that will become either 0 or 20; most-likely preserves the binary truth. Conversely, most-likely on a smooth distribution ignores the probability mass in the tails; EV integrates the whole range, which is what many-similar-contract economics actually deliver.
2. No expedient (≈15m > 12m). At sale date: recognize revenue at the PV of ₹1cr discounted ~1.25 years at 10% (≈ ₹88.8L) and a receivable ₹1cr that accretes; over 15 months recognize **interest income** ≈ ₹11.2L via effective-interest unwinding — revenue is the cash price, and the time-value differential lives in finance lines.
3. Slotting fees payable to the customer with no distinct service = reduction of transaction price: restate to revenue ₹4.70cr, marketing expense ₹0 for that item. The blade leaves no gross-up option.
4. Sales-royalty franchises can't include unconsumed royalty streams: the sales-based royalty constraint keeps the amount at the lesser side until franchisee sales happen — franchises of anything else (monthly fixed + % of sales) split: fixed portion allocated and released per PO pattern, % portion streams as sales occur.
5. Approval uncertainty about an EXISTING price flow is Step-3-ish only if the contract is enforceable as signed; but "subject to approval" usually means no enforceable contract yet — Step 1: nothing runs until approval makes rights and payment terms enforceable. Date the engine's start at enforceability.

## ❓ Quiz

**Q1.** A ₹20L binary completion bonus with 70% track record estimates as:
(a) EV ₹14L, always average it
(b) most-likely ₹20L — binary outcomes price at the likely single outcome; then the reversal constraint decides how much of it may be included
(c) zero until received, per prudence
(d) ₹20L with a 30% provision

**Q2.** Customer pays ₹100L two years before delivery at an 8% financing rate. At delivery:
(a) revenue ₹100L, the rest is finance income
(b) revenue ₹116.64L and interest expense ₹16.64L recognized over the wait — significant upfront payment contains an embedded loan, measured at the cash-selling price equivalent
(c) revenue spread ₹58.32L per year
(d) revenue recognized at payment date cash amount only

**Q3.** Slotting fees paid to a retailer with no distinct service returned are:
(a) marketing expense
(b) netted against transaction price — payable-to-customer without a distinct service coming back reduces the price, full stop
(c) capitalized as shelf assets
(d) deferred as prepaid advertising

### ✅ Answers

1. **(b)** — estimator by outcome structure, then constraint; two dials, one at a time.
2. **(b)** — SFC strips the embedded financing into interest lines; delivery recognizes the accreted price.
3. **(b)** — the blade: pay-to-play without a distinct service is price reduction, not promotion cost.

## ✅ Mastery checklist

- [ ] I can pick EV vs most-likely by outcome structure and defend it
- [ ] I can state the reversal constraint in standard-speak and assess its clamp
- [ ] I can run SFC both directions and name the 12-month expedient
- [ ] I can measure non-cash consideration and contributed materials into price
- [ ] I can net rebates/slotting without defaulting to "marketing expense"

**Next:** RR5 slices the priced pie — standalone selling prices, the three estimation techniques, discount and residual rules, and the telecom bundle's ₹12,000/₹500-per-month split in full.
