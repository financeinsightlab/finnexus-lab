# 🎯 TV1 · The One Law — Why a Rupee Today Commands a Rupee Tomorrow
> Every formula in finance — EMI tables, bond prices, DCFs, lottery choices, your retirement — is one law wearing different clothes: **money has a time address, and moving money through time costs (or pays) an exchange rate called the interest rate.** ₹1L today at 12% becomes ₹3.106L in 10 years; therefore ₹1L promised in 10 years is worth only ₹32,197 today. Same arrow, two directions. TV1 installs the law, the (1+r)^n engine, the compounding's shape (slow, then violent), and the intuition that lets you sniff every wrong comparison in business before a calculator comes out.

## 🎯 Objectives
- State the law: value depends on time-address; comparisons require same-address dollars/rupees — never compare raw ₹ across years.
- Command the engine: FV = PV(1+r)ⁿ (canon: ₹1L @12% 10y = **₹3.106L**) and PV = FV/(1+r)ⁿ (₹1L in 10y @12% = **₹32,197**).
- Read compounding's shape: linear start, exponential escape — why year-20 growth is 6.7× year-10 growth (the J-curve of wealth).
- Use the Rule of 72/69.3 for instant doubling/halving math (72/12 = 6y, 72/8 = 9y, 72/4 = 18y).
- Spot the four amateur time-crimes: comparing raw money across years, ignoring frequency, real-nominal mixing, and additivity-of-rates error.

## 📘 Concepts

### 1.1 The law — time addresses and the exchange rate between them
₹1L in hand has three powers a promised ₹1L lacks: **optionality** (investable NOW — its deployment starts this minute), **certainty** (promises carry default and delay risk), **inflation-cover** (today's purchasing power vs tomorrow's). The market's price for moving money through time is the interest rate r — sometimes visible (FD, loans), sometimes hidden (supplier credit, deferred payments, lottery installments, "zero-cost" EMIs). Once time-addresses are respected, a golden rule runs all finance: **never compare or add rupees from different addresses without converting** — every wrong decision in this course's history (bad loan choices, false project approvals, lottery-ticket fallacies) begins with adding ₹ of different years.

### 1.2 The engine — (1+r)ⁿ in both directions
**FV = PV × (1+r)ⁿ** — push ₹1L forward at 12%: after 1y ₹1.12L, after 5y ₹1.762L, after 10y **1.12¹⁰ = ₹3.1058L**. Reverse gear: **PV = FV ÷ (1+r)ⁿ** — pull a promised ₹1L back from 10y at 12%: 1/1.12¹⁰ = 0.32197 → **₹32,197**. The two are the same arrow aimed oppositely; every TVM problem is deciding which direction the question faces. Battle discipline: write the timeline FIRST (t=0 → t=n with every ₹ on its address) — 90% of TVM errors are timeline errors, not formula errors.

### 1.3 Compounding's shape — slow, then violent
₹1L at 12%: year 5 = 1.76L (+76k in 5y), year 10 = 3.11L, year 15 = 5.47L, year 20 = 9.65L, year 30 = **29.96L**. Notice: the FIRST decade adds ₹2.1L absolute; the SECOND adds ₹6.5L; the third ₹20.3L — growth rebases on a bigger base each year, so time (not rate-tweaking) is compounding's primary fuel: each year in the market matters more than each extra percentage point, at career lengths. The shape explains three canons: (a) start-early beats invest-more (₹10k/mo from 25y beats ₹20k/mo from 35y at the same 12%: 40y vs 30y engines — the first extra decade out-earns the doubled dose), (b) interrupting compounding (BF6's pause-weld) costs the LAST years of the curve, (c) patience is not a virtue in finance — it is the mechanism itself.

### 1.4 Rule of 72 & its sharper twin
Doubling time ≈ 72 ÷ r% (½ the course's daily use): 12% → **6 years**, 8% → 9, 6% → 12, 4% → 18, 24% → 3. Halving for inflation works identically (EC4's silent tax: at 6% inflation ₹ halves in ~12y). Sharper for geeks: 69.3 (=ln 2 × 100) is exact for continuous compounding; 72 wins by divisibility. Boundary honesty: the rule's error grows past ~25% (use the actual log there) — and the habit matters more than the digits: any rate quoted in your presence should auto-translate into a doubling time in your head before the sentence ends.

### 1.5 The four amateur time-crimes — and their corrections
1. **Raw-money comparison:** "₹50L flat vs ₹1Cr in 30 years? The crore is double!" — convert both to one address (₹1Cr in 30y at 8% = ₹9.9L today; flat-₹50L wins) — address conversion first, verdict second.
2. **Frequency blindness:** "12% is 12%" — 12% annual vs 12% compounded monthly = 12.68% — frequency is part of the rate (TV5's chapter).
3. **Real-nominal mixing:** "7% FD with 6% inflation = 1% gain" — close but imprecise: exact real = 1.07/1.06 − 1 = 0.94% — subtraction is the street estimate, division is the law (EC4's weld).
4. **Rate additivity:** two years at +50% then −50% ≠ zero: 1.5 × 0.5 = 0.75 → **−25%** — growth factors multiply; only logs add. Mean-reverting intuition (BF6's recovery table) is the same crime family: percentages never average arithmetically through time.

## 🧪 LAB — Engine room (10 min)
1. Push forward: ₹2.5L at 10% for 8 years — build the timeline, compute FV, and sanity-check with the doubling rule.
2. Pull back: ₹10L promised in 6 years, discount 11%: PV? And the one line that explains to a client why the "₹10L" promise quote is marketing.
3. Choice court: ₹8L now vs ₹13L in 5 years — at r 9%, which wins? Show both addresses' math and the psychological trap in the framing.
4. J-curve audit: continue ShopKart-founder's ₹1L 12% table: compute years 10/20/30 ABSOLUTE additions per decade and state the fuel law in one sentence.
5. Crime scene: friend compares prepaying a 9% loan vs investing at 12% — identify the time-crime risk embedded in the comparison and the two adjustments needed (risk-adjustment + tax/guarantee asymmetry).

**Why this matters:** item 3 is the exact structure of IPO-refund-timing, insurance-maturity, and "double-your-money" pitches; item 5 is the household CFO question of the decade.

**🔑 Lab answers:** (1) FV = 2.5 × 1.10⁸ = 2.5 × 2.1436 = **₹5.36L**; doubling check: 72/10 = 7.2 years per double → 8y slightly more than one double ✓ shape fits (2) PV = 10/1.11⁶ = 10/1.8704 = **₹5.35L** — "₹10L maturity!" is an address-shifted number wearing a today's robe; every maturity-benefit pitch quotes future rupees beside today's costs — jurys are told to convert addresses (3) ₹13L in 5y at 9%: PV = 13/1.09⁵ = 13/1.5386 = **₹8.45L** — beats ₹8L now by a ₹45k margin; verdict: take the deferred ₹13L (at a 9% hurdle; flips above the ~10.2% breakeven: solve 13/8 = (1+r)⁵ → r = 10.2%); the trap: raw-money framing "8 now vs 13 later" hides the rate at which the choice pivots — compute the breakeven rate, not the feeling (4) additions: decade 1: +₹2.11L; decade 2: +₹6.54L; decade 3: +₹20.3L — fuel law: **time multiplies better than dose** — the base you're compounding on is the accumulated years, and the later decades are where all the money is (5) crimes: comparing a GUARANTEED 9% saving (prepayment is risk-free debt-return) with an unguaranteed 12% expectation (markets owe you nothing); adjustments: risk-adjust the 12% toward its own volatility-cost and tax both sides identically (loan interest saved is post-tax-free 9%; equity is 12.5% LTCG-adjustable) — after conversion, the choice gets honest instead of romantic.

## 💪 Exercises
1. Timeline habit: draw (write) the full timeline for: invest ₹3L today, add ₹1L at year 2, withdraw all at year 6 at 10%: FV of each tranche + total, each rupee on its address.
2. Reverse-arbitration: insurance pitch: "pay ₹1L/yr for 10 years, get ₹18L at year 12": PV both legs at 8% and verdict in two lines with the address-law citation.
3. Breakeven hunter: dealer offers car discount ₹40k today vs 0%-interest EMI over 3 years (else market loan 9%): convert the EMI benefit to today's ₹ and declare the winner with the pivot-rate.
4. J-curve memo: write the 5-line family letter explaining why ₹5,000/mo started at age 22 can beat ₹15,000/mo started at 32 (compute both at 12% to age 60) — the engine's dose-vs-time law.
5. Rate-pivot audit: at what hurdle rate is ₹50L today equal to ₹95L in 8 years? Solve, then explain which home-business offers (real estate pre-launch deals etc.) hide this exact comparison inside their brochures.
6. Real-exact drill: compute exact real returns: 9% nominal with 5.5% inflation; 12% with 6%; 7% with 7% — the three cells and the subtraction-error magnitude at each.
7. Interview forge: "Is rent money dead money?" — 6 numbered TVM lines (opportunity cost of the down-payment leg, investment alternative of the surplus, inflation-hedge of owned asset, mobility optionality priced, the behavioral forced-saving counter, and your TVM-correct verdict algorithm).

### ✅ Selected answers
1. Tranche A: 3 × 1.10⁶ = 3 × 1.7716 = ₹5.315L; tranche B (added year 2, compounds 4y): 1 × 1.10⁴ = ₹1.464L; total = **₹6.78L** — each tranche gets its OWN exponent; the addressing discipline is the exercise.
3. EMI benefit ≈ interest saved: financing ₹4.5L-40k-discount-equivalent at 9% for 3y costs ~₹63-65k interest (₹4.5L × 14% cumulative-ish) — but the dealer's 0% EMI usually carries a higher sticker (the discount withdrawn): net comparison: EMI saves ≈ ₹65k interest vs forgo ₹40k discount + possible processing fees: **0% EMI wins only if the sticker is unchanged and fees < ₹25k**; pivot-rate: ~5.5-6% — quotes pivot there, not at "feels free".
6. Exact: 9/5.5: 1.09/1.055 − 1 = **3.32%** (subtraction says 3.5 — error 0.18pp); 12/6: 1.12/1.06 − 1 = **5.66%** (street 6.0 — error 0.34pp); 7/7: 0.00% exactly (street says 0 too — boundary case); pattern: subtraction overstates real return, error grows with (rate × inflation) product — doctrine: exact division for reporting, street subtraction for hallway talk.
7. 1) The down-payment leg: ₹30L blocked in a house vs deployed at 12% has a ₹-addressed opportunity cost (₹93L foregone in 10y — whichever direction you cut it, address it). 2) The monthly-surplus leg: rent ₹35k vs EMI ₹70k lets the renter ENGINE the ₹35k difference (SIP math: ₹35k/mo × 20y × 12% ≈ ₹3.46Cr via the annuity factor 989). 3) The hedge leg: ownership fixes shelter-cost inflation and eliminates landlord risk — a real option with real value. 4) Mobility option: renting = career flexibility priced (job moves at will) — in volatile careers, worth several lakhs. 5) The discipline counter: EMI is forced-saving — renters' surplus SIPS often exist only on spreadsheets (BF6's honesty). 6) Verdict algorithm: compute rent-ratio (price/annual rent): > 25-30× favors renting+investing in India metros; < 20× favors buying — but run BOTH wealth-paths at identical assumptions before the family verdict; dead money is whichever side you collected on a spreadsheet you refused to write.

## ❓ Quiz
1. ₹1L promised in 10 years, 12% hurdle, is worth today:
   (a) ₹6.9L
   (b) ₹32,197 - 1/1.12^10 = 0.32197; the same engine in reverse, and the number that deflates every maturity-benefit pitch that quotes future rupees in today's jacket
   (c) ₹21,900
2. Compounding's shape teaches the counterintuitive law:
   (a) invest more beats start early
   (b) time multiplies better than dose - the second decade adds 3x the first on the same streams, so a head start out-earns a doubled contribution at career lengths; interrupting compounding taxes the fat years at the END of the curve, not the thin ones at the start
   (c) rates matter more than years
3. Two years of +50% then −50% leaves you at:
   (a) zero
   (b) −25% — growth factors multiply (1.5 × 0.5 = 0.75); percentages never average arithmetically through time, and every recovery table in behavior finance is this law's portrait
   (c) +25%

### ✅ Answers
1. **(b)** — the address conversion is the verdict.
2. **(b)** — the engine's fuel is years, not percentages.
3. **(b)** — 1.5 × 0.5 = 0.75; multiplication is the law of returns.

## ✅ Mastery checklist
- [ ] I never compare raw rupees across years — timelines first, always.
- [ ] I push/pull any amount through time with (1+r)ⁿ in both directions.
- [ ] I auto-translate every quoted rate into a doubling time.
- [ ] I run exact-ratio real-rate math and size the street error.
- [ ] I can name and disarm the four time-crimes on sight.

**Next:** TV2 · Annuities — streams of equal money: SIPs, EMIs, perpetuities, and the growing-perpetuity that prices stocks, rents, and pensions.
