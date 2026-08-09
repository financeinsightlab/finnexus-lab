# 🎯 DP8 · The Exit Door — Disposals, Retirements, and Held-for-Sale

> Everything that climbs onto the balance sheet must eventually climb off — through a sale, a scrap ceremony, or a long, quiet abandonment. Ind AS 16 para 67 says the carrying amount is derecognized ON DISPOSAL or when NO FUTURE ECONOMIC BENEFITS are expected — and the resulting gain or loss lands in profit or loss, but emphatically NOT in revenue (para 68). Neighbour standard Ind AS 105 adds its own protocol: the day an asset is classified HELD FOR SALE, depreciation STOPS, measurement shifts to lower-of-carrying-or-fair-value-less-costs-to-dispose, and the asset moves to a special display. Exit discipline is where tidy books separate from horror stories — dead machines don't vote, but they still eat depreciation if you forget to bury them.

---

## 🎯 Objectives

- Apply the two derecognition triggers: disposal, or no expected future benefits
- Compute the disposal result (₹4L canon) — and explain why it is never revenue
- Date the disposal by control transfer (Ind AS 115 handshake) and measure deferred consideration at fair value
- Handle retirements and abandonments: the clock that keeps running
- Run the Ind AS 105 held-for-sale protocol: criteria, lower-of measurement, depreciation stop, failed-sale return

## 📘 Concepts

### 8.1 The two triggers — gone from the estate, or gone from the future

Derecognize the carrying amount of an item of PPE (a) on disposal — sale, donation, exchange, scrapping with consideration — or (b) when no future economic benefits are expected from its use OR disposal: the burnt warehouse, the banned technology, the mould for a discontinued product. Interim state between the two: an asset retired from active use but NOT yet classified held-for-sale — say a standby line in a shuttered shed — STAYS on the books, fully in the depreciation regime until its clock dies naturally. Retirement is not an exit; the exit list has exactly two doors.

### 8.2 The disposal result — gain ₹4L that must not call itself revenue (python-verified)

Machine carrying amount **₹18L**, sold for **₹22L** net → **gain ₹4L** = net disposal proceeds − carrying amount, recognized in profit or loss when control passes under the Ind AS 115 handshake (delivery, risks, payment terms — the RR course's control doctrine re-used, another standards-crosswalk in your toolkit). But para 68 draws a chalk line: the gain is NOT revenue. A steel company's income statement showing machine-sale proceeds inside "Revenue from operations" is a category error with consequences: margins, covenants, bonus pools all read revenue. Presentation home: other income (hoisted separately when material). Sales tax/GST mechanics aside, the consideration's fair value, deferred terms discounted (a ₹22L promise in year 2 is worth less than ₹22L today — TVM course canon), and any disposal costs complete the number.

### 8.3 Abandonment — the unglamorous exit

A production line quietly stranded by the demand shift, sitting in the dark corner: management intends never to run or sell it. No proceeds forthcoming → no sale; if no future benefits remain (including spares-cannibalization), this is trigger (b): derecognize at carrying amount, the full balance hits P&L as a loss (technically an accelerated burial). The companion error to police: LEAVING it on the books to bleed depreciation so no single year takes a big hit — spreading the corpse's smell across years. Ind AS 36 usually reaches such assets first (DP9's impairment is the proper early-warning channel); the derecognition door is for confirmed-zero futures.

### 8.4 The held-for-sale protocol — Ind AS 105's lowered bridge

Classify a non-current asset as held for sale when its carrying amount will be recovered principally through a SALE transaction rather than continuing use — with both tests passed: (a) it is available for IMMEDIATE sale in its present condition, subject only to usual terms; and (b) the sale is HIGHLY PROBABLE — management committed to a plan, active programme to locate a buyer launched, price reasonable in relation to current fair value, completion expected within ONE YEAR. From classification day:

- **Depreciation stops.** Cold. The clock's stop-switch.
- Measure at the **LOWER of carrying amount and fair value less costs to dispose (FVLCD)**.
- Canon (python-verified): machine carrying **₹25L**. If FVLCD ₹23L → carry at **₹23L**, ₹2L write-down through P&L. If FVLCD ₹28L → carry at **₹25L**, no write-up (prudence asymmetry, the NRV cousin from IC4). Either way: no more depreciation while classified — the ₹2.5L/yr it would have charged is disallowed.

Sale fails / plan abandoned? Exit the classification: remeasure at the LOWER of (a) the carrying amount BEFORE classification adjusted for the depreciation that would have run, and (b) recoverable amount at the change-of-mind date — no free rides for having paused the clock.

### 8.5 Presentation glow — exits in the statements

Held-for-sale assets appear separately from other assets; disposal gains/losses live in P&L outside revenue; the PPE movement note (DP11) shows disposals at both gross and accumulated-depreciation level, letting analysts reconcile the opening block to closing; anything material gets its own disclosure paragraph. Marks of tidy books: exits reconcile, surpluses transfer per DP6, and no "assets not in use" ghost category persists year after year.

## 🧪 LAB — Exit Processing (10 min)

Aravali Castings, year-end clean-up:

1. Lathe (carrying ₹18L) sold and delivered for ₹22L, full payment received. Disposal treatment and P&L line?
2. CNC mill (carrying ₹25L): board commits to sale plan, broker engaged, priced at ₹26L fair; expected deal in 5 months; estimated selling costs ₹3L. Classify and measure.
3. Same mill next quarter: market sours, only achievable price ₹24L less ₹3L costs. Re-measure, and may depreciation restart?
4. Obsolete threading machine (carrying ₹2L): product discontinued, spares value nil; no buyer anywhere. Trigger and result?
5. Shuttered workshop building retained for possible future expansion (never listed for sale). Held-for-sale?

**Why this matters:** exit accounting compresses three standards (16, 105, 115) into one checklist; auditors apply it line by line — so should you.

**🔑 Lab answers:**
1. Control passed on delivery; **derecognize carrying ₹18L; gain ₹4L to P&L, presented outside revenue** (other income, separately disclosed if material). 2. Criteria met (available, actively marketed, reasonable price, <1 yr) → **held-for-sale; depreciation STOPS; measure at lower of 25 and (26 − 3) = 23 → carry ₹23L, ₹2L P&L write-down**. 3. FVLCD now 24 − 3 = **₹21L**: further write-down of ₹2L to ₹21L (P&L again); depreciation does NOT restart while classification holds. 4. No future benefits from use or disposal → **trigger (b): derecognize, ₹2L loss in P&L** burial now, not a slow bleed. 5. **No** — not available for immediate sale as-is with an active programme; intention-to-maybe is not a plan; stays PPE, depreciates on, checks impairment indicators each year.

## 💪 Exercises

1. Your controller books the ₹22L lathe sale inside revenue "because it's an inflow and we have a mixed business." Write the two-line correction an analyst would send.
2. Mill from the lab: what happens on a failed sale when management cancels the plan? Walk the remeasurement rule.
3. Depreciation while held for sale "feels conservative" to a junior. Explain why the standard stops it — what does continuing-use depreciation assume that a sale-recovery asset no longer satisfies?
4. A company avoids classifying its permanently idle ₹40L plant as held-for-sale for four years, keeping full depreciation running (and no impairment). What is the honest book missing — name the standard that should have spoken first?

### ✅ Selected answers

1. Gains on disposal of PPE are excluded from revenue by Ind AS 16.68 — classify the NET gain ₹4L (22 − 18) in other income, separately if material. Putting gross proceeds in revenue inflates the operating margin covenant every lender reads and reverses the substance economy: you sold a tool, not a product.
2. Exit classification and remeasure at the LOWER of (a) its carrying amount before classification as held-for-sale, adjusted for depreciation that WOULD have run since, and (b) its recoverable amount at the date of the decision not to sail. Any adjustment lands in P&L — the clock-pause loan gets settled.
3. Depreciation assumes the carrying amount is recovered through USE over a life. Held-for-sale flips the recovery channel to sale; spreading consumption that will never occur understates (or overstates) the number, so measurement switches to lower-of-CA-and-FVLCD and the clock stops.
4. Ind AS 36 impairment — indicators (idleness, obsolescence) demand a recoverable-amount test long before the shelf rots; four years of dep without an impairment test is exactly the slow-bleed trick DP9 teaches you to catch.

## ❓ Quiz

**Q1.** A lathe (carrying ₹18L) sold and delivered for ₹22L:
(a) revenue ₹22L, cost of goods sold ₹18L
(b) gain ₹4L in profit or loss — net proceeds minus carrying amount, dated by the Ind AS 115 control handshake, presented OUTSIDE revenue (other income), because gains on disposal of PPE are forbidden from masquerading as operating revenue
(c) gain ₹4L to revaluation surplus
(d) recognize only when the five-year warranty expires

**Q2.** Held-for-sale classification trigger + measurement (Ind AS 105):
(a) management intention alone; keep depreciating
(b) available for immediate sale in present condition AND highly probable sale (committed plan, active marketing, reasonable price, completion within one year) → measure at LOWER of carrying amount and FVLCD, depreciation STOPS — ₹25L asset carries at ₹23L when FVLCD is ₹23L, never written UP to ₹28L when the wind improves
(c) board resolution alone; fair value through OCI
(d) signed sale agreement only; measure at carrying amount

**Q3.** Burying an abandoned machine (carrying ₹2L, zero salvage, zero future benefits):
(a) keep depreciating quietly for ten years
(b) the no-future-benefits trigger of para 67 — derecognize the carrying amount now and recognize the full ₹2L loss in P&L: no future benefits from use OR disposal means the asset died; delaying the funeral is spreading the smell, and the impairment standard should have spoken even earlier
(c) reclassify as inventory at ₹2L
(d) move to a suspense account

### ✅ Answers

1. **(b)** — derecognize, net gain to P&L outside revenue: exits are events, not operations.
2. **(b)** — criteria + lower-of + clock-stop: the protocol is exact.
3. **(b)** — the funeral now rule: zero-benefit assets get derecognized, not preserved.

## ✅ Mastery checklist

- [ ] I can apply the two derecognition triggers without hesitation
- [ ] I can compute the ₹4L-style disposal result and place it outside revenue
- [ ] I know deferred consideration discounts and the 115 control handshake
- [ ] I can run the full Ind AS 105 protocol: criteria, lower-of, clock-stop, failed-sale return
- [ ] I can explain why retirement is not an exit and abandonment is a burial

---

**Next:** **DP9 · Three Neighbour Standards** — the asset's three constant companions: Ind AS 36 impairment (the ₹100L machine's ₹20L hit and the ₹15L capped reversal), Ind AS 20 government grants (₹9.6L net either way), and Ind AS 23 borrowing costs (₹30L interest, ₹20L capitalized, ₹4L expensed — the permit-halt doctrine).
