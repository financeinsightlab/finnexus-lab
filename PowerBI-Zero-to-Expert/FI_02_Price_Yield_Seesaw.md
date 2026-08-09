# 🎯 FI2 · The Price–Yield See-Saw — Where Rates Become Physics
> RBI moves the repo rate 0.25% and somewhere a 10-year bond silently swings 2%. No vote, no headline — just the discount engine re-pricing every future rupee of every bond in the country. FI2 gives you the canon table (8% coupon, 5-year bond at yields 6%→10%), the asymmetry secret (gains beat losses), and the transmission chain from Mint Street to your debt-fund NAV. After this, you’ll never again say “rates rose, so bonds fell” without knowing EXACTLY how much and why.

## 🎯 Objectives
- Price the canon bond (8% annual, 5y, FV ₹1,000) at any yield and reproduce the master table from memory.
- State and use the inverse law with numbers: +1% yield ⇒ −3.89% price on this bond; −1% ⇒ +4.10%.
- Explain the asymmetry: why −2% yields (+8.42%) pays MORE than +2% yields (−7.58%) costs — convexity’s first appearance.
- Trace RBI → overnight rates → G-Sec curve → corporate yields → NAV in five links.
- Identify who actually gets hurt by rate moves (traders/MTM books) vs who is untouched (hold-to-maturists with surviving credit).

## 📘 Concepts

### 2.1 The master table — learn it like a phone number
Canon bond: **8% annual coupon, 5 years, FV ₹1,000**, priced as Σ 80/(1+y)^t + 1,000/(1+y)^5:

| YTM | Price | Move from par |
|---|---|---|
| 6% | **₹1,084.25** | +8.42% |
| 7% | **₹1,041.00** | +4.10% |
| 8% | ₹1,000.00 | par |
| 9% | **₹961.10** | −3.89% |
| 10% | **₹924.18** | −7.58% |

Every cell is the same DCF; the only change is the market’s demanded y. Read the table until you can recite it — FI3 turns it into one derivative (duration) and FI8 trades it.

### 2.2 The inverse law, mechanized
When the market yields more than the contract’s 8%, the bond must make up the difference by selling cheaper — discount × pull-to-par = the buyer’s bonus. When the market yields less, the fixed ₹80 is premium goods and buyers bid above par. **Price adjusts so the TOTAL return matches the market’s y** — the bond has no choice; arbitrage between this bond and new 9% issues forces it instantly. The further away the cash (year 5’s ₹1,080), the harder a rate move hits it — which is why LONG bonds swing harder than short ones.

### 2.3 The asymmetry secret — convexity in one row
Yields −2%: you gain **+8.42%**. Yields +2%: you lose **−7.58%**. Same distance, UNEQUAL payoffs — the see-saw is secretly generous, tilting toward the holder. Reason: the price function is a curve, not a line; big yield drops stack compounding discounts on far cash flows, while big yield rises run into the floor that the bullet payment provides. FI3 names the curve-bend (convexity) and puts a number on it; for now tattoo the intuition: **bonds hurt less on the way down than they gift on the way up.**

### 2.4 The transmission chain — Mint Street to your NAV
1. RBI sets the **repo** (rate at which banks borrow overnight).
2. Money-market & T-bill yields re-price within hours (they ARE the short end).
3. G-Sec yields re-price along the curve by expectation arithmetic: the 10y yield ≈ the path the market expects for short rates + a term premium.
4. Corporate bonds re-price as G-Sec + credit spread (FI6) — the spread may even widen on the news.
5. Debt-fund NAVs and YTM quotes refresh tonight; hold-to-maturists feel nothing but their report date.
One 0.25% repo surprise typically moves a 5y G-Sec yield ~0.2–0.3% and its price ~1–1.5% — your canon table does the arithmetic.

### 2.5 Who bleeds, who shrugs
- **Traders & MTM books** (debt funds, treasuries): the table is tonight’s NAV print. +1% yields on a 5y-duration book ≈ −4% NAV — real clients, real redemptions.
- **Hold-to-maturists with good credit:** cash flows unchanged; the interim price is weather on a mountain you don’t plan to sell. Corollary: the only true “rate risk” for them is REINVESTMENT risk (coupons redeployed at lower yields) — FI7 balances the two.
- **Borrowers (floating):** opposite sign entirely — falling yields are their rally (CF2’s DFL machine).

## 🧪 LAB — See-saw gym (10 min)
1. Reproduce the 9% cell from scratch: discount 80 × 5 coupons + 1,000 at 9% (annuity factor 3.8897, PV factor 0.6499). Show both pieces.
2. Without full calculation: yield jumps 8% → 8.5%. Is the price above or below ₹980? Use the table’s slope logic.
3. News drill: “RBI surprises with a 50bp CUT.” Your 5y bond’s yield falls 8% → 7.5%. Estimate price by splitting the table (7% cell = 1,041.00).
4. Asymmetry proof: compute the average gain (+8.42) and loss (−7.58) magnitudes for ±2%. Who gets the better deal — the buyer at par today or the short-seller?
5. NAV desk: a debt fund holds only your canon bond (5y). RBI hiking cycle lifts its yield 8% → 9% over a quarter. Approximate NAV return including coupons earned, and state what a panicking redeemer misunderstands.

**Why this matters:** every rate decision you'll ever hear lands on this table within hours; item 5 is the conversation that separates an investor from a redeemer-at-the-bottom.

**🔑 Lab answers:** (1) coupons 80 × 3.8897 = **₹311.17** + principal 1,000 × 0.6499 = **₹649.93** → **₹961.10** ✓ the table cell, rebuilt (2) halfway on yield but convexity means slightly MORE than halfway on price: between 961.10 and 1,000, sits ≈ **₹980** — so at 8.5% it is right around ₹980, a hair above the straight-line guess (3) interpolate 7%→8%: 1,041 → 1,000, so 7.5% ≈ **₹1,020–1,021** (curve-corrected); a 50bp surprise ≈ **+2% overnight** — years of coupon delivered in a day (4) +8.42 vs −7.58 → the LONG holder gets the better deal by ~0.84pp; convexity pays owners and bills shorts — FI3 prices this kindness (5) MTM −3.89% + a quarter’s coupon ~2% ≈ **−1.9% quarterly print**; the redeemer misunderstands that (a) new cash now buys 9% — the fund’s forward YTM ROSE, and (b) if they hold toward duration-length, pull-to-par heals the mark — panic-selling converts a paper see-saw into a realized loss at the exact trough.

## 💪 Exercises
1. Master-table rebuild: write the discount formula, then compute the 6% and 10% cells showing coupon-annuity and principal pieces separately (check: 336.99 + 747.26 and 303.26 + 620.92).
2. Inverse-law comic: draw the price curve (y-axis price, x-axis yield 5–11%) using the five canon cells, mark the convexity visibly, and caption it with the asymmetry numbers.
3. Long-vs-short swing: your canon 5y vs a 10y 8% bond; yields +1% to both. The 10y falls ~6.7%. Explain in 3 lines why the LONGER bond bleeds more (where does its cash mass live?).
4. Transmission trace: write the five-link chain for a 25bp repo HIKE, ending with the specific line a news anchor will misread tomorrow (“bond markets crashed” — did wealth crash, or did prices re-mark?).
5. Reinvestment mirror: your father holds the bond to maturity and yield falls to 6%: his PRICE gain is real but his COUPON reinvestment is now cheap — quantify his mixed feelings in 4 lines using the table.
6. Client call script: equity down 2% same day yields rose 1% — the client wails “even my SAFE fund lost!” Write the 6-line advisor script: MTM vs credit, new-money yield, duration-to-hold math, and the one number to stop staring at.
7. Curve-reading warm-up: 2y yield 6.8%, 10y yield 7.2% — which shaped curve is this, and what does the see-saw do to each if ALL yields +0.5% in parallel (who falls more %)?

### ✅ Selected answers
1. At 6%: 80 × [(1−1.06⁻⁵)/0.06] = 80 × 4.2124 = **₹336.99** + 1,000 × 0.7473 = **₹747.26** → **₹1,084.25**. At 10%: 80 × 3.7908 = **₹303.26** + **₹620.92** → **₹924.18**. The PRINCIPAL piece does most of the travelling — that’s why maturity drives sensitivity.
3. The 10y bond’s cash mass lives years later; deep cash gets discounted by (1+y)^10 instead of (1+y)^5, so a +1% compounds against it twice as long. Duration (FI3) is literally the weighted distance to your money — 5y bond ~4.3, 10y ~6.7, so ~6.7% vs ~4.0% damage on the same shock.
5. Price gain: at 6% the bond shows 1,084.25 (+8.42%) if sold — real. But every ₹80 coupon now redeploys at 6% not 8%: over the 4 remaining years he earns ~₹10 less per coupon per year on reinvested cash. Hold-to-maturity total return is roughly FIXED at purchase YTM — price gifts and reinvestment thefts are the same coin flipped.
7. Upward/normal slope (long pays more than short — term premium alive). Parallel +0.5%: prices fall MORE on the 10y (longer duration, ~3.3% hit) than the 2y (~0.9%) — same shock, different DNA. Simultaneously the curve may steepen or flatten — FI4 gives that second dimension its own vocabulary.

## ❓ Quiz
1. RBI hikes and your canon bond’s yield moves 8% → 9%. Price lands at:
   (a) ₹980.55
   (b) ₹961.10 (−3.89%) — 311.17 coupons + 649.93 principal; the see-saw is arithmetic, not sentiment
   (c) ₹943.34
2. Yields −2% vs +2% on the same bond shows +8.42% vs −7.58% because:
   (a) SEBI cushions falls
   (b) the price-yield curve bends (convexity): far cash flows compound-gain more on yield drops than they discount-lose on rises — the holder’s secret structural kindness, priced properly in FI3
   (c) coupons are reinvested quickly
3. A hold-to-maturity investor with sound credit sees yields jump 1%. Her correct reaction:
   (a) sell before more damage
   (b) nothing changed about her contracted cash flows; the MTM dip is weather, and her newly arriving coupons now reinvest RICHER — the true risk she manages is credit (FI6), not the see-saw
   (c) convert everything to equity

### ✅ Answers
1. **(b)** — cell rebuilt in the lab; (a) and (c) are slope-guessing without the annuity.
2. **(b)** — the kindness is geometry, not regulation; shorts pay it, holders collect it.
3. **(b)** — selling converts weather into realized loss (and (c) abandons the contract for mood).

## ✅ Mastery checklist
- [ ] I can reproduce the master table’s five cells and explain each from the discount formula.
- [ ] I quote the inverse law with numbers (−3.89% / +4.10%), not adjectives.
- [ ] I can explain convexity’s asymmetry (+8.42 vs −7.58) in one sentence.
- [ ] I can trace any RBI decision through the five links to a NAV print.
- [ ] I know who actually bleeds on rate moves — and who only thinks they do.

**Next:** FI3 · Duration & Convexity — one number that predicts the see-saw: Macaulay 4.312, modified 3.993, the +1% shock priced BEFORE it happens.
