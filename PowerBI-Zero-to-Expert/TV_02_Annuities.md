# 🎯 TV2 · Annuities — The Mathematics of Streams
> Single rupees bow to (1+r)ⁿ; REAL life moves in streams — SIPs, EMIs, rents, pensions, premiums. TV2 arms the stream formulas: future value of an annuity (your SIP's destiny — ₹10k/mo at 12% for 20y = ₹98.93L), present value (what a stream is worth today — the EMI machine's engine), annuities-due vs ordinary, perpetuities (₹1L/yr forever at 12% = ₹8.33L), and the growing perpetuity (₹1L growing 3% forever at 12% = ₹11.11L) — the single formula that quietly prices dividend stocks, office rents, and terminal values in every DCF you'll ever build.

## 🎯 Objectives
- FV an ordinary annuity: FV = PMT × [((1+r)ⁿ − 1)/r] — canon ₹10k, 1% monthly, 240 payments → factor 989.26 → **₹98.93L**.
- PV an annuity: PV = PMT × [(1 − (1+r)⁻ⁿ)/r] — and read it as the loan-balance engine (TV3's ignition key).
- Distinguish ordinary vs due (rent starts NOW): due = ordinary × (1+r) — a 1% timing premium in every leasing headline.
- Price perpetuities (C/r) and GROWING perpetuities (C/(r − g)): ₹1L at 12% = ₹8.33L; growing 3%: ₹11.11L — plus the g < r sanity law.
- Recompose streams into wealth plans: SIP step-ups, SWPs, and the retirement-corpus equation 40 × 10.67 = ₹4.27Cr.

## 📘 Concepts

### 2.1 FV of an annuity — the SIP destiny machine
Money arriving as equal PMT per period compounds per-installment: the last payment earns 0 periods of growth, the first earns n−1. The geometric series collapses into **FV = PMT × [((1+r)ⁿ − 1) ÷ r]**. Canon (consistent with IN2 6 and PM7): ₹10k/mo at 12% (1%/mo) for 240 months: (1.01²⁴⁰ − 1)/0.01 = **989.26** → ₹10k × 989.26 = **₹98.93L** on ₹24L contributed — the whole cult of SIP is this one factor. Sanity habit: split the answer into contributions (₹24L) vs engine (₹74.93L): after year ~14 of the 20, the ENGINE adds more per year than the feeder does — the J-curve of TV1 wearing a salary.

### 2.2 PV of an annuity — the loan-balance engine
Reverse view: what is a stream of n equal payments worth TODAY? **PV = PMT × [(1 − (1+r)⁻ⁿ) ÷ r]** — the pensioner's question (worth of ₹1L/yr for 25 years at 8%: factor 10.6748 → **₹10.67L**) and the banker's ignition key: a loan IS the bank selling you an annuity — principal = EMI × annuity factor — TV3's entire EMI machine is this one line rearranged. Desk drill built-in: PV always < PMT × n (because later payments are discounted); the factor shrinks as r rises (higher hurdle = cheaper stream today) — read any "₹-per-month product" by converting its stream to PV before judging.

### 2.3 Ordinary vs due — the first-payment timing war
Ordinary annuity pays at period-END (EMIs, SIP month-ends); annuity-DUE pays at period-START (rent, school fees, subscriptions): every payment lands one period earlier, so **F V_due = FV_ord × (1+r)** — at monthly 1%, dues are worth 1% more per exactly the same nominal stream. Marketing minefield: rent-vs-buy, dealer plans ("pay first EMI today!" — that's a due stream priced as ordinary), insurance policies — the timing word deserves a red circle before any signature. Slogan: same money, different clock — due streams carry a (1+r) surcharge in your favor or theirs depending who pays whom.

### 2.4 Perpetuities and the dividend-growth line
**Level perpetuity: PV = C ÷ r** — ₹1L/yr forever at 12% = **₹8.33L**: the price of an unending fixed stream. **Growing perpetuity (Gordon): PV = C₁ ÷ (r − g)** — ₹1L growing 3%/yr at 12% = 1/(0.09) = **₹11.11L**: the market-darling formula — price dividend stocks (constant-growth models), terminal values in DCFs (CF8's ₹194L EV ended on this line), office rents with escalations, and any "infinite" promise. Two sanity laws: (1) demand g < r (g ≥ r blows the formula into fantasy-∞ — the model's polite way of refusing); (2) the growth-discipline — g in a terminal/perpetuity must be ≤ long-run nominal GDP growth (nobody outgrows the economy forever) — CF8's g = 3% canon obeys it; amateur models assigning 8% terminal growth have already confessed.

### 2.5 Streams into plans — corpus maths end-to-end
Retirement canon (TV7's full build preview): want ₹40L/yr for 25 years post-retirement, r 8%: corpus needed = 40 × 10.6748 = **₹4.269Cr ≈ ₹4.27Cr**. Fund it in 20 years of SIPs at 12%: required PMT = 426.9/989.26 = **₹43,160/mo** (annuity factor run backward — the divide-by-factor reflex: goals ÷ factor = dose). SWP reverse-engineering (Ramesh's PM7 desk): corpus ₹3Cr at 7% drawing ₹1L/mo — how long? ₙ solves the annuity-PV equation → 300+ months and still standing (₹1L × annuity factor 300mo ≈ ₹1.55Cr < 3Cr — the corpus out-arms the stream at that blend). Stream-thinking unified: FV grows streams, PV prices streams, perpetuities price unending streams, Gordons price growing ones — every wealth plan in India is one of the four sentences.

## 🧪 LAB — Stream shop (10 min)
1. Destiny machine: ₹15k/mo for 15 years at 12%: FV + split (contributions vs engine) + the year the engine overtakes the feeder (estimate).
2. Pension price: ₹50k/mo pension for 20 years at 8% (monthly): PV = the capitalized value of pension plans sold door to door — and the pitch-line it deflates.
3. Due-vs-ordinary: college fee ₹2L/yr for 4 years paid START-of-year vs END-of-year at 9%: the two PVs and the surcharge in ₹.
4. Gordon court: stock pays dividend ₹5 next year, grows 4% forever, your hurdle 12%: price? If the market demands ₹90 for it, what g-or-r is it actually pricing (one line, both directions)?
5. Corpus equation: need ₹30L/yr for 30 years post-retirement at 7%, retiring in 25 years, SIP hurdle 11%: compute (a) corpus, (b) monthly dose, then name the two assumptions whose error this machine inherits whole.

**Why this matters:** items 2 and 4 are where annuity math arms you against the two most common mispriced products in Indian households — pension plans and dividend stories.

**🔑 Lab answers:** (1) FV = 15,000 × [(1.01¹⁸⁰ − 1)/0.01] = 15,000 × 499.6 (since 1.01¹⁸⁰ ≈ 5.996) = **₹74.9L**; contributions = 15,000 × 180 = **₹27L**; engine = **₹47.9L ≈ 1.77× contributions**; engine overtakes feeder when annual growth exceeds the ₹1.8L yearly SIP — roughly year 9-10 on this curve (2) PV = 50,000 × [(1 − (1+0.08/12)⁻²⁴⁰)/(0.08/12)] = 50,000 × 119.55 = **₹59.8L** — the annuity's honest price; every "pension forever for one small premium" pitch deflates the same way: convert the promised stream to PV and compare it to the premium asked — the gap is the insurer's margin, now visible (3) ordinary: PV = 2 × annuity(9%,4) = 2 × 3.2397 = ₹6.48L; due: × 1.09 = **₹7.06L** — paying up-front costs you a surcharge of ₹58k of time-address — colleges know this math; sign accordingly (4) price = 5/(0.12 − 0.04) = **₹62.5**; at ₹90 market: implied r − g = 5/90 = 5.56% → either hurdle ~9.6% (optimism) or g ~6.4% (bravado) — the Gordon line is a lie-detector for dividend stories: feed the market price back through it and watch which assumption confesses (5) (a) corpus = 30 × annuity(7%,30) = 30 × 12.409 = **₹3.72Cr**; (b) dose: FV factor 25y at 11% annual = [(1.11²⁵ − 1)/0.11] = (13.585−1)/0.11 = 114.4 → dose = 372/114.4 = ₹3.25L/yr ≈ **₹27,110/mo**; inherited errors: return-assumption (11% vs reality ±2pp moves the dose ±35%) and lifespan/inflation on the ruin-side — the machine computes exactly; it believes whatever you feed it (garbage-risk is human, not mathematical).

## 💪 Exercises
1. Destinies table: fill the 3×3: PMT 5/10/20k × horizons 15/20/25y at 12% monthly SIPs — nine FV cells + the contribution-vs-engine ratio for the corner cells.
2. Loan ignition run: bank quotes ₹25L for ₹40,000/mo over 10 years: what rate is it ACTUALLY pricing? (Solve r numerically by factor-tables/bisection — full reverse-EMI.)
3. Due audit: dealer offers "₹8L car, 36 payments of ₹26,500, first today, rest monthly, 0% interest!" — translate the free-interest claim into its implied discount-vs-cash-price comparison (use 10% hurdle).
4. Perpetuity floor: an endowment pays ₹1.2L/yr forever starting year-10: PV today at 10% (perpetuity at t9 pulled back 9 years) — the two-step timeline habit in one problem.
5. Step-up annuity: extend the machine: ₹10k/mo growing 10%/yr for 20y (annual steps) at 12% — build the recursion yourself (year-1 block grows as a 12-month annuity, its FV rolls forward at 12% while year-2's stream is 10% bigger, and so on): show the method and land in the ₹2.5-2.7Cr class (PM7's canon cross-check).
6. Gordon sensitivity: recompute TV's dividend stock price at r 11/12/13% and g 3/4/5% — the 3×3 grid + the one-line lesson about which direction of error kills investors.
7. Interview forge: "Is a pension plan an investment?" — 6 numbered lines (annuity PV vs premium asked, insurer margin located, IRR of the premium-to-benefit stream, inflation fragility of fixed streams, liquidity/surrender costs, and the TVM-honest verdict with the exception cases).

### ✅ Selected answers
2. PV ₹25L = 40,000 × [(1 − (1+r)⁻¹²⁰)/r]: try r = 1.2%/mo → factor (1 − 1.012⁻¹²⁰)/0.012 = 63.4 → PV ₹25.4L; try 1.3% → factor 60.6 → ₹24.2L → **r ≈ 1.23%/mo = 14.8% nominal-APR (15.8% effective)** — the quote conceals the rate inside the EMI; every "affordable EMI" pitch is a rate in a mask, and dividing payment by factor is the unmasking reflex.
4. Perpetuity value at t9: 1.2/0.10 = ₹12L; pull back 9 years: 12/1.10⁹ = 12/2.3579 = **₹5.09L today** — deferral is just a PV-sandwich: value-at-start-date, then transport to t0; timelines keep the sandwich honest.
6. Price grid (₹5/(r−g)): r = 11%: g 3% → 62.5, g 4% → 71.4, g 5% → 83.3; r = 12%: 55.6 / 62.5 / 71.4; r = 13%: 50.0 / 55.6 / 62.5. Lesson: ±1pp of (r−g) moves the price ±20-40% — terminal-zone inputs dominate valuation (CF8's sensitivity table exists for this) — investors die not on wrong estimates but on UNSIZED confidence in (r−g).

## ❓ Quiz
1. ₹10k/mo for 20 years at 12% (monthly compounding) lands at:
   (a) ₹72.4L
   (b) ₹98.93L — factor 989.26; contributions ₹24L, engine ₹74.93L; after roughly year 14 the engine adds more per year than the feeder, which is why SIP screenshots posted at year 3 prove nothing and SIP screenshots at year 20 prove everything
   (c) ₹1.2Cr
2. A perpetuity paying ₹1L/yr growing 3% forever, hurdle 12%, prices at:
   (a) ₹8.33L
   (b) ₹11.11L — 1/(0.12 − 0.03); the Gordon line behind dividend models, office valuations, and every DCF terminal ever signed; demand g < r and g ≤ nominal GDP growth, or the formula files a protest
   (c) ₹33.3L
3. Endowment "guaranteed ₹50k/mo for 20y" is priced honestly by:
   (a) the insurance brochure
   (b) PV-ing the stream - 50,000 x 119.55 = ₹59.8L at 8%; compare against the premium schedule asked: the gap is the insurer's margin rendered visible, and every pension pitch in India shrinks under this one calculation
   (c) multiplying 50k x 240

### ✅ Answers
1. **(b)** — the factor told its destiny the day the SIP started.
2. **(b)** — (a) forgot growth; (c) divided without g-line sanity.
3. **(b)** — streams are priced, never narrated.

## ✅ Mastery checklist
- [ ] I FV/PV any annuity and split contribution vs engine instantly.
- [ ] I expose masked rates by dividing payment by factor (reverse-EMI reflex).
- [ ] I price ordinary vs due differences and circle the timing word on contracts.
- [ ] I price perpetuities and Gordons with both sanity laws enforced.
- [ ] I convert any life-goal into corpus → dose using annuity factors.

**Next:** TV3 · Loans & EMI Architecture — amortization's anatomy, the flat-rate scam decoded, prepayment alchemy, and the loan-vs-invest algorithm.
