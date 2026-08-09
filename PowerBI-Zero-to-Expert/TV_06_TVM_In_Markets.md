# 🎯 TV6 · TVM in Markets — Bonds, Stocks, and the Goal Engine

> Every price in every market is a TVM answer: a bond is an annuity plus a zero, a stock is a growing perpetuity with opinions, and your life goals are FV targets with SIP doses. This module connects TV1–TV5 to the securities of FI and CF8 and the planning engine of PM — the day the math becomes money.

---

## 🎯 Objectives

- Price a bond as annuity + single sum — the exact FI bridge, ₹924.18 and back
- Price equity with Gordon growth and read implied expectations out of market prices
- Run a mini-DCF as TVM's full orchestra — and see why growth-matched discounting flattens PVs
- Build the goal engine: target FV → inflation-adjust → choose rate → compute SIP dose
- Habit: step-up SIPs, real-rate planning, and sequence-awareness from PM7

---

## 📘 Concepts

### 6.1 Bonds — the academy reunion

**Price = C × annuity(r, n) + F / (1+r)ⁿ.** FI2's canon bond: ₹1,000 face, 8% coupon, 5 years, YTM 10% → 80 × 3.7908 + 1,000/1.6105 = 303.26 + 620.92 = **₹924.18**. Every FI insight is TVM in disguise: price < par because the market demands 10% while the coupon pays 8% — discounting *is* the seesaw; duration is just the weighted average *time-address* of the payments; convexity is simply the natural curvature of (1+r)ⁿ itself. Flex-test yourself: YTM falls to 9% → price = 80 × annuity(9%,5) + 1,000/1.5386 = 80 × 3.8897 + 649.93 = **₹961.10** — the FI table row, reproduced from one formula. If you can rebuild the FI course's anchor prices from scratch, TVM owns a permanent seat in your toolkit.

### 6.2 Equities — Gordon and the expectations mirror

A stock is a growing perpetuity of dividends/free cash: **P = D₁ / (r − g)**. D₁ = ₹5, r = 12%, g = 4% → **₹62.5**. Run it backwards — the **implied-expectations mirror**: market price ₹90 with D₁ ₹5 → implied (r − g) = 5.56% → either the market accepts ~9.6% returns (cheap?) or believes g ≈ 6.4% (optimism?). You don't just price stocks; you *interrogate* them: at any price, what must be true? Sensitivity is the personality of the formula: at g → r, the denominator → 0 and price → ∞ — which is why "growth at any price" eras end in funerals, and why a 1pp wobble in g near the ceiling moves prices 30%+. CF8's DCF discipline grew from this seed: Gordon is DCF's closed-form, DCF is Gordon's honest multi-stage cousin.

### 6.3 Mini-DCF — the full orchestra

Five-year explicit FCF + terminal value, discounted at WACC 12%: FCF₁ = ₹12L growing 12% for 5 years (12.00 → 18.89), then terminal g 4%: TV₅ = 18.89 × 1.04 / (0.12 − 0.04) = **₹245.6L**. PVs: notice the magic — with stage-1 growth *equal* to the discount rate, each year's PV is flat ₹10.71L (growth in numerator cancels time in denominator), five of them = ₹53.6L; terminal PV = 245.6/1.7623 = **₹139.3L**; **EV ≈ ₹192.9L**. Two lessons in one table: (1) **the terminal value is the valuation** (72% here — exactly CF8's warning: most DCF value sits beyond the visible horizon, so the g and WACC you pick for the afterlife decide everything); (2) growth-matched discounting shows why high-growth-at-high-WACC companies move glacially in price until the terminal story changes.

### 6.4 The goal engine — salaries into corpus, systematically

Every life goal runs the same four-stroke engine: **(1) target in future ₹** — inflate today's cost by goal-specific inflation (education ~8-10%, not CPI 6%: college target = 20L × 1.06⁹ ≈ **₹33.8L** in 9y); **(2) pick the return by horizon** — long horizons earn equity's 12%, short horizons take debt's 7-9% (PM7's glidepath is this line with a seatbelt); **(3) dose = FV / annuity-FV factor** — college: factor (11%, 108mo) = 183.3 → **₹18,450/mo**; house ₹25L in 6y at 9%: factor 95.0 → **₹26,300/mo**; **(4) automate + step-up**. Retirement canon reunion: ₹4.27Cr corpus (TV2), dose ₹43,160/mo over 20y — but a 32-year-old with **28 years** needs only **₹15,630/mo** (factor 2,731 vs 989): **starting 8 years earlier cuts the dose to 36%.** Time isn't one factor among many; it's the exponent.

### 6.5 Step-ups and sequence — the two pro upgrades

**Step-up SIP:** raise the dose with salary growth (~10%/yr): the ₹15,630 flat-dose retirement is reached with a **starting dose of just ~₹6,500 stepping 10%/year** (the escalator's later, larger installments do the heavy lifting) — the single most underused weapon in Indian personal finance, because it matches the human career curve. **Sequence risk** (PM7's SWP canon): the *order* of returns matters at withdrawal — retiring into a −30% year with fixed withdrawals is mathematically different from the same average earned in calm order; hence glidepaths, buckets, and the 50-year Ramesh sanity check (₹3Cr, 7%, ₹1L/mo forever ✓). And the habits that make it all survive contact with reality: real-rate planning (retirement modeled in today's rupees at real ~5%), annual rebalancing (PM6), and never borrowing at EAR 42–51% to invest at expected 12% (TV3 + TV5's joint veto). TVM in markets is where formulas become a life plan.

---

## 🧪 LAB — Price Everything on the Desk (10 min)

**Setup, four tickets:**
1. **Bond desk:** same 8%/5y/₹1,000 bond. Rebuild FI's table: price at YTM 11%, and at 8%.
2. **Equity desk:** DiviGrow pays D₁ = ₹7, g = 5%, your hurdle 13%. Fair price? Market trades at ₹120 — read the mirror.
3. **DCF desk:** venture's FCF₁ = ₹12L growing 12%/yr (5y), terminal g 4%, WACC 12%. Reproduce EV ≈ ₹192.9L; then test g_term = 3% and WACC 13% — report both new EVs; comment on who really runs the valuation.
4. **Goal desk:** Aarohi (30) targets: car ₹12L in 4y (7% return), daughter's college ₹33.8L in 9y (11%), retirement ₹4.27Cr in 30y (12%, flat dose). Compute all three doses and the month's total; then re-run retirement with a 10% step-up — starting dose?

**Why this matters:** Four tickets, four asset classes, one engine. This is the actual daily workflow of treasury analysts, equity associates, and wealth managers — and now of your own household. If you can price these four without notes, TVM has finished its installation.

**🔑 Lab answers:**
1. YTM 11%: 80 × annuity(11%,5) + 1,000/1.6851 = 295.67 + 593.45 = **₹889.12**; YTM 8%: coupon = YTM → **₹1,000.00 (par)** ✓ — the seesaw's fulcrum always pins price to face when rates equal the coupon.
2. Fair = 7 / (0.13 − 0.05) = **₹87.5**. Mirror at ₹120: implied (r − g) = 7/120 = 5.83% → market either accepts r ≈ 10.8% (below your hurdle — rich for you) or believes g ≈ 7.2% (> your 5% — optimism priced in). Enough disagreement to pass, at your assumptions.
3. g_term 3%: TV₅ = 18.89×1.03/(0.09) = **₹216.2L** → PV 122.7 → **EV ≈ ₹176.2L (−8.7%)**. WACC 13%: stage-1 PVs shrink to 10.62, 10.53, 10.43, 10.34, 10.25 (sum 52.2); TV₅ = 18.89×1.04/(0.09) = 218.3 → PV@1.13⁵ = 118.5 → **EV ≈ ₹170.6L (−11.5%)**. One-pp moves in the *afterlife* assumptions swing value ~10% — **the terminal runs the valuation**; the explicit stage gets the airtime while the terminal writes the cheque. Underwrite WACC and g before arguing about year 3.
4. Car: factor = [(1 + 0.07/12)⁴⁸ − 1] / (0.07/12) = (1.32206 − 1)/0.005833 = **55.2** → dose = 12L/55.2 ≈ **₹21,700/mo**. College: **₹18,450/mo** (factor 183.3). Retirement 30y: factor = [(1.01)³⁶⁰ −1]/0.01 = (35.95 − 1)/0.01 = **3,495** → **₹12,220/mo**. Total ≈ **₹52,370/mo**. Step-up retirement: the 30y / 12% / 10%-step escalator delivers 2.503× a flat-start dose → starting dose = 12,220/2.503 ≈ **₹4,880/mo to start** (verified: on the 28y curve the ratio is 2.405 → ₹6,500 start). The escalator makes the impossible look like a rounding error in the salary slip.

---

## 💪 Exercises

1. **Bond rebuild.** Price a ₹1,000, 7% coupon, 4-year bond at YTM 7.5%, then at 6.5%. Which direction and why, in one line?
2. **Mirror interrogation.** A dividend stock trades ₹200, D₁ = ₹4. If your hurdle is 12%, what g must you believe to buy? What if you believe g = 1% — what return are you accepting?
3. **Terminal autopsy.** In §6.3's DCF, what share of EV sits beyond year 5? Your PM argues "near-term cash matters most" — respond with the number and one sentence.
4. **Dose triage.** Three goals, one ₹45k/mo budget: car ₹12L/4y @7% (needs ₹21.7k), college ₹33.8L/9y @11% (₹18.45k), retirement ₹4.27Cr/30y @12% (₹12.22k). Total required ₹52.4k. Decide the allocation with reasons — which goal flexes and why?
5. **Step-up proof.** Why does a 10% step-up cut the *starting* dose so dramatically? Explain with the fuel law (TV1) in two sentences.

### ✅ Selected answers

1. YTM 7.5%: 70 × annuity(7.5%,4) + 1,000/1.3355 = 234.45 + 748.80 = **₹983.25** (discount: coupon 7% < 7.5% demanded). YTM 6.5%: 70 × 3.4258 + 1,000/1.2865 = 239.81 + 777.32 = **₹1,017.13** (premium). One line: when the market's charge (YTM) exceeds the coupon, price dips below par to compensate — and vice versa; the seesaw always balances at par when they're equal.
2. Buy requires r − g ≤ D₁/P = 4/200 = 2% → at r = 12%, **g ≥ 10% forever** — a heroic belief for most dividend payers (perpetual g above ~nominal GDP growth is fantasy; nobody outgrows the economy eternally). If g = 1%: accepted r = 2% + 1% = **3%** — you'd be lending at sub-FD returns in equity risk clothing. The mirror spares you the sermon by showing the price of the story.
3. Terminal share = 139.3/192.9 = **72%**. Response: *"72% of this EV lives beyond year 5 — so 'near-term matters most' is true for risk but false for value; we underwrite the terminal assumptions first, or we're pricing wallpaper."*
4. Flex the **car** (smallest, most postponable goal at the shortest horizon — push it to 5-6 years at 10% down, or buy at ₹9L: dose drops to ~₹16k), fund college fully (fixed date, education inflation real), fund retirement fully (the exponent is running for you NOW; every skipped year at 30 needs 2.8× dose at 40 — TV2/TV6 canon). Allocations: car ₹16k + college ₹18.45k + retirement ₹10.5k ≈ ₹45k — with the promise to restore retirement via the 10% step-up escalator. Goals negotiate by horizon-elasticity, not by sentiment.
5. Because dose fights time only when it arrives early — the escalator's later (bigger) installments still compound 15-25 years, so a rising stream with a small start ≈ a much larger flat stream. Time multiplies better than size (fuel law): the step-up lets *career growth* supply what early-years-you cannot.

---

## ❓ Quiz

**Q1.** The FI canon bond (₹1,000 face, 8% coupon, 5y) priced at 10% YTM equals ₹924.18 because:
(a) Coupons shrink when YTMs rise, by regulation
(b) The market demands 10%; the bond pays 8% — discounting every promised rupee at 10% prices the shortfall at ₹75.8 below par
(c) Par value depreciates annually
(d) Duration subtracts 7.58% directly

**Q2.** In the five-stage DCF (FCF growing 12%, WACC 12%, terminal g 4%), the terminal value supplies ___ of enterprise value:
(a) About 25%
(b) About 72% — most DCF value sits beyond the visible horizon, so WACC and terminal-g deserve the fiercest underwriting
(c) About 50%
(d) Zero — terminals are optional

**Q3.** Same ₹4.27Cr retirement target at 12%: starting at age 32 (28y) needs ₹15,630/mo while starting at 40 (20y) needs ₹43,160/mo. The multiplier lesson is:
(a) Older savers earn more, so it evens out
(b) The 8-year head start cuts the dose to 36% — time is the exponent; delay is the most expensive tuition in finance
(c) Inflation explains the entire difference
(d) The 20-year saver should just pick higher-risk funds

### ✅ Answers

1. **(b)** — price = 80 × 3.7908 + 620.92 = 924.18: the discount rate isn't a penalty, it's the referee making an 8% promise worth exactly a 10% return. At 9% YTM the same arithmetic prints ₹961.10 — one formula, the whole FI seesaw table.
2. **(b)** — 139.3/192.9 ≈ 72%. The explicit years inform *confidence*, the afterlife sets *value* — which is why analyst fights should happen over WACC and terminal g, not over year-2 margins. Gordon's denominator (r − g) is small, honest, and ruthless.
3. **(b)** — factor 2,731 vs 989: the same corpus costs 64% less per month when time does the lifting. Option (d) is the classic cope — demanding 15-16% returns for 20 years is how retirees end up in the BF4 carnival, not in comfort. Start now, step up 10%, and let the exponent pay the bill.

---

## ✅ Mastery checklist

- [ ] I price bonds as annuity + single sum and reconcile with FI (₹924.18 @10%, ₹961.10 @9%)
- [ ] I run Gordon both directions: pricing AND implied-expectations mirroring
- [ ] I build a stage-1 + terminal DCF and report the terminal's EV share
- [ ] I run the goal engine: inflate → rate by horizon → dose = FV / factor
- [ ] I deploy step-ups and real-rate planning; I respect sequence risk at withdrawal

**Next:** TV7 — the **CAPSTONE: The TVM Desk.** One family, one salary, four goals, one loan, two pitches to defuse — and the interview forge that certifies you can price time for a living.
