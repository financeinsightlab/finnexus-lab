# 🎯 RR9 · Application Guidance II — Consignment, Bill-and-Hold, Upfront Fees, Options & Breakage

> The strangest revenue questions arrive at the edges: whose inventory is it when it sits in someone else's warehouse (consignment)? Can I book revenue for goods still in MY warehouse (bill-and-hold)? What is a joining fee actually buying (upfront fees)? And when your coupon expires unused, when does unused money become revenue (breakage)? Four edge cases, each with tight criteria and anti-abuse DNA.

---

## 🎯 Objectives

- Distinguish consignment from a sale: indicators that the dealer never took control
- Run bill-and-hold's four cumulative criteria and the anti-window-dressing logic
- Treat non-refundable upfront fees: assess whether the setup transfers anything (₹1,000/month gym canon)
- Account for customer options as material rights (the ₹9,000 voucher SSP) — a separate PO discipline
- Estimate and release breakage proportionately, with the unclaimed-property caveat

## 📘 Concepts

### 9.1 Consignment — possession is not control (echoes)

In a consignment, the manufacturer ships goods to a dealer/agent who sells them on. Revenue waits for the onward sale because the dealer never takes control. Indicators of a true consignment: (1) the entity controls the product until a specified onward event (the dealer can't redirect it to his own use); (2) the entity can require return or transfer to another dealer; (3) the dealer has no unconditional payment obligation (he pays when HE sells). Financial-press red flag: **channel-stuffing** — pushing finished-goods onto dealer premises at quarter-end with generous return rights and calling it revenue. The indicators close that door: if the dealer can return freely or pays only on resale, control never moved, and the "sale" was logistics. Analyst's corroboration: dealer-level inventory days rising faster than end-demand is the fingerprint to price.

### 9.2 Bill-and-hold — the four-test fortress

Bill-and-hold lets you recognize revenue for goods **still physically with you** — when the customer bought them and asked you to keep them. Legitimate cases exist (customer's warehouse flooded; phased delivery they requested), so the standard doesn't ban it — it fortifies it with FOUR cumulative criteria: (1) a **substantive reason** for the arrangement (the CUSTOMER requested custody); (2) the product is **identified separately** as belonging to the customer; (3) it's **ready for physical transfer** on demand; (4) you **cannot use the product or direct it to another customer** (no double-pledging). Miss any → PIT recognition waits for real delivery. The anti-window-dressing core: criteria 2-4 kill the classic December trick of "selling" the same warehouse stock twice. Custody fees beyond cost-recovery become a separate service PO over the custody period.

### 9.3 Non-refundable upfront fees — what is the fee buying?

A joining/initiation fee is revenue over the good/service period if the setup activity transfers NO distinct good or service — the gym canon (python-verified): ₹6,000 joining + ₹2,000/month × 12 months, expected membership ~30 months → total consideration ₹30,000 released as service revenue at **₹1,000/month** (the fee is essentially prepaid service, not a day-1 windfall). If the fee DOES buy a distinct transferable good/service (a welcome kit with resale value genuinely controlled by the customer), that slice separates at SSP. Renewal without a fresh joining fee changes the allocation horizon: the fee usually spreads over the EXPECTED membership life (including renewals when the customer would otherwise pay a new fee), via the material-rights lens below. Always ask: did the setup DELIVER anything to the customer? Provisioning a SIM? No. A broker's onboarding that hands the client a usable research terminal? Arguably yes, at SSP.

### 9.4 Customer options & material rights — the hidden PO

An option to buy additional goods/services is a separate PO ONLY when it grants a **material right** — a discount the customer wouldn't otherwise get (beyond standalone/class pricing). Measure the option's SSP via the incremental discount × expected exercise — **canon (python-verified):** voucher for 40% off next year's ₹50,000 renewal when standard discount is 10%, 60% expected usage → option SSP = 30pp × 50,000 × 60% = **₹9,000**; allocate today's consideration between today's goods (relative SSP) and this future-discount PO. Loyalty points live in the same family (the ₹110,000/₹10,000/₹8,000 canon): points are a material right with SSP = value × expected redemption; revenue deferred as a **contract liability**, released per redemption — **₹10,000 deferred on ₹110,000 consideration; 8,000 points actually redeemed → release ₹8,000 now**. Expired expectations settle into breakage (next).

### 9.5 Breakage — revenue from things customers never use

**Breakage** = the consideration for unexercised rights (unredeemed points, unused gift cards, unclaimed prepaids). If you can reasonably expect breakage, recognize it **in proportion to the pattern of exercise** — as customers redeem, release the expected-never-redeemed slice at the same rate (guided by the variable-consideration constraint, so early books stay conservative); if breakage is NOT estimable, release when redemption becomes **remote**. Escape valve: unclaimed amounts governed by law (dormant-escheat rules, government-mandated remittances) are **liabilities to the state, never revenue**. Retail India's prepaid instruments carry their own RBI/regulatory overlays — map them before celebrating breakage.

## 🧪 LAB — Edge Cases in a Row (10 min)

1. **ShoeCo** places 40,000 pairs at 200 dealers, retains restock/recall rights, dealers pay on retail sale; year-end dealer inventory days jumped from 45 to 110. Revenue status of the Q4 push?
2. **SteelBarn** bills ₹80L for custom-cut girders; buyer's site crane broke — buyer asked SteelBarn to hold the batch (segregated, tagged, dispatch-ready in the yard; SteelBarn cannot substitute). Verdict?
3. **FleetClub** charges ₹15,000 initiation + ₹3,000/month × 24, and initiation work is pure paperwork/provisioning. Expected membership 36 months. Day-1 and monthly revenue?
4. **StyleKart** gives shoppers ₹100 coupons: 25% off next purchase above ₹2,000 (usual festival discount 5%); expected usage 50%; quarter sales ₹2.0cr with coupons issued. What's the option SSP per coupon issued with an average ₹8,000 basket, and the deferral logic per basket?
5. **GiftKart** card pool: ₹50L balances, historical 6% never redeemed. Current-year redemptions ₹20L at a steady random pattern. Breakage release this year?

**Why this matters:** five edge verdicts in one sitting — channel-stuffing, fortress tests, fee spreading, option valuation, breakage pacing — the complete fringe toolkit.

**🔑 Lab answers:**
1. **Not revenue** — consignment indicators (recall rights + pay-on-resale) mean control never passed; the inventory-days spike is the stuffing fingerprint. Recognize as dealers sell through; flag Q4 push as channel risk in review.
2. **Bill-and-hold passes** — customer-requested custody, segregated/tagged/ready stock, no re-direction possible → recognize revenue now (plus a fair custody-fee PO if charges apply over the hold; delivery when physically transferred).
3. Initiation carries nothing separately-distinct → pool it: total = 15,000 + 72,000 = ₹87,000 over **36 months = ₹2,417/month**; day-1 revenue ₹0 beyond the first month slice.
4. Option SSP per coupon = incremental 20pp × 8,000 × 50% = **₹800 per coupon**; per ₹8,000 basket sold with one coupon: defer 8,000 × 800/(8,000 + 800) = **₹727** as contract liability (verify: 8,000×(800/8,800)=727.27), recognize ₹7,273 now; liability releases on coupon use (or breakage at the end).
5. Expected breakage 6% → estimated ₹3L never-to-redeem attached to the pool. Release proportionately with redemptions: this year's release = 20L × 6% = **₹1.2L breakage revenue** (pattern-based, constraint-respecting; the remaining expected breakage releases as redemptions continue).

## 💪 Exercises

1. Write the two-sentence channel-stuffing detector for the board-pack in plain English.
2. A customer asks you to hold goods — but your warehouse mixes them with identical stock, unmarked. Fortress verdict?
3. Why does ₹15,000 of initiation paperwork fail to be a PO, in the exact words of the distinct tests (RR3 callback)?
4. Show the split on a ₹1.0L shopping cart when the customer redeems 1,000 points (from the ₹10,000-deferred/10,000-points canon pool).
5. GiftKart's pool has ₹4L sitting in a state that escheats dormant balances after 3 years. What changes?

### ✅ Selected answers

1. "Revenue grew only where dealer inventory didn't: when sell-in and sell-through diverge, the channel is absorbing stock, and some of Q4's topline is next year's return pile. Consignment indicators + dealer inventory days are the two numbers to watch; neither lies for long."
2. **Fails test 2** — goods not identified separately as belonging to the customer; substitutable stock means you could still direct it elsewhere, also failing test 4. Revenue waits for genuine delivery.
3. It fails "capable of being distinct" (provisioning doesn't benefit the customer on its own — the benefit STARTS when the service starts) and in context it merely conditions the real service — so the fee rides into the contracted service period.
4. Points SSP was ₹1 each: release = deferred-per-point × redemption = (10,000/10,000) × 1,000 = **₹1,000** point-revenue; recognize the ₹99,000 cash-side as normal sale revenue; the remaining liability pool stands at ₹9,000 expected-redemption value pending future redemptions and breakage.
5. The escheated slice is a **liability to the state, not revenue**, at the point dormancy law crystallizes the obligation — breakage estimation must exclude legally-remittable amounts; recognize breakage only on slices that can never be claimed by anyone.

## ❓ Quiz

**Q1.** Dealer-stock sold on pay-on-resale terms with manufacturer recall rights is recognized as revenue:
(a) on shipment to the dealer
(b) when dealers sell through — consignment indicators mean control never passed; shipment was logistics
(c) when the quarter closes
(d) when invoices age 30 days

**Q2.** Bill-and-hold revenue requires, cumulatively:
(a) just warehousing fees to be charged separately
(b) a customer request with substance, goods separately identified, physically ready for transfer, and no ability to use or redirect them — all four criteria, always
(c) a written side letter
(d) auditor approval

**Q3.** The ₹9,000 voucher SSP comes from:
(a) 40% × ₹50,000 × 60%
(b) 30pp incremental discount × ₹50,000 expected purchase × 60% expected use — material rights price only the discount ABOVE standard rates, times expected exercise
(c) 10% × ₹50,000
(d) ₹9,000 face value of the coupon

### ✅ Answers

1. **(b)** — possession is not control, take two; the onward sale is the trigger.
2. **(b)** — the fortress is cumulative; miss one test and recognition waits for real delivery.
3. **(b)** — only the incremental discount above standard rates, times expected exercise, prices the right.

## ✅ Mastery checklist

- [ ] I can split consignment from sale and spot channel-stuffing by the inventory-days fingerprint
- [ ] I can run the four bill-and-hold fortress tests
- [ ] I can spread upfront fees over expected relationship life (₹1,000/mo gym canon)
- [ ] I can build material-rights SSPs (₹800 coupon; ₹10,000 points pool; release ₹8,000/₹1,000)
- [ ] I can release breakage proportionately and fence off escheatable balances

**Next:** RR10 takes the engine to construction sites — POC in anger: claims and variations, mobilization advances, retention money, onerous contracts (the immediate-loss law), and the milestones-invoice trap, all on the ₹10cr/₹0.5cr-loss canon set.
