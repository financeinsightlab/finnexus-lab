# 🎯 FI1 · Bond Anatomy — The IOU That Trades Like a Stock
> A fixed deposit is a promise you hold. A bond is a promise you can SELL — and that single difference creates price, yield, duration, and an entire ₹50-lakh-crore Indian debt market that quietly finances the country while equity hogs the TV. FI1 opens every bond's casing: face value, coupon, maturity, yield, accrued interest, clean vs dirty price. Master these seven organs and every later module (see-saws, durations, spreads, desks) is just arithmetic on top of anatomy.

## 🎯 Objectives
- Read any bond's spec line — FV, coupon, frequency, maturity, seniority — and restate its cash-flow timeline from memory.
- Distinguish coupon rate (fixed contract) from current yield and yield-to-maturity (market truths).
- Price a simple annual-coupon bond by discounting, and explain why the bond equals par only when YTM = coupon.
- Compute accrued interest under both Indian day-count conventions (actual/actual G-Sec vs 30/360 corporate) and quote clean vs dirty price.
- Explain the four investor tribes (hold-to-maturity, trader, liability-matcher, spread-hunter) and why the same bond is a different product to each.

## 📘 Concepts

### 1.1 What a bond legally is
A bond is a **negotiable loan contract, sliced and standardized**. The borrower (government, PSU, corporate) receives principal today and signs three promises: periodic **coupon** (interest), return of **face value** at **maturity**, and the contract's covenants. Unlike your FD, the certificate itself trades: if rates move or the borrower's story changes, the price of the promise moves even though the promise text never does. Canonical spec for this course: **Alpha Infra NCD — FV ₹1,000, coupon 9% annual, 5 years, senior secured**; timeline = five ₹90 coupons + ₹1,000 maturity bullet.

### 1.2 Coupon vs current yield vs YTM — the three rates that refuse to be one
- **Coupon rate:** contract rate on face value — fixed for life (9% of ₹1,000 = ₹90, whatever the weather).
- **Current yield:** coupon ÷ today’s price. Buy that NCD at ₹940 → 90/940 = **9.57%**: better than coupon because you paid less for the same ₹90.
- **YTM (yield to maturity):** the IRR of all remaining cash flows at today’s price — includes the pull-to-par gain/loss on the ₹1,000 bullet. It is THE market truth: every trader quote, every spread, every duration in FI2–FI8 is spoken in YTM.
Bond pricing is just the CF8 DCF machine wearing a fixed-income badge: **Price = Σ coupon/(1+y)^t + FV/(1+y)^n**. When y = coupon, the two flows balance at exactly ₹1,000 — par; when y > coupon, price must fall below par to hand the buyer the missing return.

### 1.3 Clean price, dirty price, accrued interest
Bonds trade **clean** (quoted price) but settle **dirty** (cash paid) — the gap is **accrued interest**: the seller’s earned-but-unpaid slice of the running coupon.
- **Actual/actual (Indian G-Secs):** coupon × days held/days in period. Sell Alpha Infra 121 days into a 365-day coupon year → 90 × 121/365 = **₹29.84** accrued.
- **30/360 (most Indian corporates):** months count as 30 days → 4 months = 120/360 → **₹30.00**.
Quoted ₹940 + accrued ₹30 = **dirty ₹970** = what actually leaves the buyer’s account. Amateurs compare dirty prices and hallucinate a sudden “jump” around coupon dates; professionals compare clean prices and let the accrual engine tick silently.

### 1.4 The four investor tribes
- **Hold-to-maturist:** wants the coupon stream; price swings are noise (as long as credit survives).
- **Trader:** wants the price swing itself; coupon is the carrying cost/reward.
- **Liability-matcher:** has a future bill (pension, school fee) and buys bonds whose cash flows land on the bill date — FI7’s immunization.
- **Spread-hunter:** buys credit the market fears, correctly — FI6’s profession.
Same instrument, four products. Your FIRST question on any bond desk: *which tribe am I today?* The answer selects which numbers matter and which are weather.

### 1.5 Bond vs FD — the honest scoreboard
FD: fixed value, premature-break penalty, deposit insurance up to ₹5L (DICGC), zero liquidity menu. Bond: tradable (sell tomorrow at market), transparent yield curve to stand on, credit risk from “sovereign” to “hope”, and mark-to-market swings the FD never shows you (they exist economically — the FD just refuses to report them). Bonds are not “risky FDs”; FDs are bonds wearing a blindfold.

## 🧪 LAB — Open-casing session (10 min)
1. Write Alpha Infra’s full cash-flow timeline (FV ₹1,000, 9% annual, 5y, bought at issue). Total cash received?
2. Price it at YTM 9%. At YTM 11% — is it above or below par, and roughly how far (discount logic only, no full calc needed)?
3. Current yield check: price falls to ₹920 — coupon 9%, current yield?
4. Accrued drill: sell 6 months + 0 days after last coupon under 30/360. Accrued? Dirty if clean is 985?
5. Tribe ID: retiree buying 10y G-Sec for the interest vs hedge fund buying the same G-Sec expecting a RBI cut — same bond; whose P&L screams louder on a +0.5% yield day, and why?

**Why this matters:** items 3–5 are the daily spoken language of every debt desk, bank treasury, and debt-fund factsheet you will ever read — and item 2 is the law FI2 turns into a weapon.

**🔑 Lab answers:** (1) five coupons of ₹90 at t=1..5 plus ₹1,000 at t=5 → **₹450 interest + ₹1,000 principal = ₹1,450 total** (2) at YTM = coupon the discounting hands back exactly **₹1,000 = par**; at 11% > 9% the market demands more than the contract pays, so the bond must sell **below par** (~₹963 by the FI2 table logic) — the price cut IS the extra yield (3) 90/920 = **9.78%** — current yield says “cheap”, but only YTM adds the pull-to-par truth (4) ₹90 × 180/360 = **₹45 accrued** → dirty 985 + 45 = **₹1,030**; the buyer prepaid the seller’s half-year of interest and gets it back inside the next full coupon (5) the FUND screams: it lives on MTM, and a 10y bond near duration ~7 reprices ≈ 7 × 0.5% = **~3.5% overnight** — the retiree’s income stream did not move one rupee.

## 💪 Exercises
1. Spec-sheet autopsy: take this real-style quote — “SKL Housing 2030, FV 1,000, 8.65% semi-annual, AA-” — and restate: cash flows, timeline, seniority questions to ask, and the two day-count accruals if sold 3 months in.
2. Three-rate seminar in 6 lines: explain coupon, current yield, YTM to a cousin using the Alpha Infra numbers (₹90, ₹940, 9.57%) and identify which one the market actually trades on.
3. Par police: three bonds — coupon 8% priced at par; coupon 8% priced at 1,050; coupon 8% priced at 950. State each YTM’s relation to 8% and the one-line reason.
4. Accrual engine: Alpha Infra, trade date 90 days into the coupon year, clean price 965, corporate 30/360: accrued, dirty, and the check that the buyer “gets back” the prepaid interest next coupon.
5. Coupon-date illusion: a bond’s dirty price graph drops ₹90 on every coupon date yet no investor lost money — explain in 3 lines what both the clean and dirty graphs prove.
6. Tribe translator: write the one-line “what matters” dashboard for each of the four tribes holding the SAME 2030 NCD (income? MTM? date-match? spread?).
7. FD-vs-bond memo: your uncle keeps ₹10L in FDs because “bonds gamble.” Write a respectful 6-line reply covering liquidity, DICGC ₹5L, hidden FD repricing, and where each instrument genuinely wins.

### ✅ Selected answers
1. Cash flows: ₹43.25 every 6 months for 5y + ₹1,000 at 2030 end (semi-annual coupon = 8.65%/2 × FV). Ask: secured or unsecured? exact covenants? call/put options embedded? Accrual 3 months: 30/360 → 86.50 × 90/180 = **₹43.25** (a full half coupon — same logic, half period); actual/actual with 182-day halves → 43.25 × 91/182 ≈ ₹21.63 per quarter slice.
3. Par → YTM = 8% exactly. ₹1,050 → YTM **below** 8% (you overpaid for ₹80; the loss-to-par is the haircut). ₹950 → YTM **above** 8% (the discount is your bonus). One-liner: price and yield sit on opposite ends of the see-saw — FI2 makes it exact.
6. Hold-to-maturist: “coupon vs my income plan.” Trader: “YTM change × duration.” Liability-matcher: “does the cash flow land on the bill date?” Spread-hunter: “yield premium vs the issuer’s true default math.”
7. FD wins on: simplicity, DICGC cover to ₹5L, no visible MTM anxiety, forced discipline. Bonds win on: tradability without breaking, transparent market pricing, your choice of risk (sovereign to AA), and the ability to actually earn when rates fall. The gamble isn’t the bond — it’s buying a bond without knowing which tribe you are. ₹10L answer: often a mix (FD ladder for near bills, quality bonds/debt funds for the rest).

## ❓ Quiz
1. Alpha Infra’s ₹90 coupon with the bond trading at ₹940 means its current yield is:
   (a) exactly 9.00%
   (b) 9.57% — 90/940; the same ₹90 on a cheaper ticket, while YTM adds the pull-to-par on top — coupon is the contract, current yield is the counter, YTM is the truth
   (c) 8.43%
2. A bond trades at par precisely when:
   (a) markets are calm
   (b) YTM equals the coupon rate — the discount engine at coupon-speed hands back exactly face value; above par means the market’s required yield is BELOW coupon, below par means above — the see-saw is exact, not psychological
   (c) the issuer is AAA
3. Clean ₹985 + accrued ₹45 (30/360, half-year held) settles at:
   (a) ₹985 — accrual is fictional
   (b) ₹1,030 — the buyer pays the seller’s earned half-coupon tonight and recovers it inside the next full ₹90 courier; dirty price is the real cash invoice, clean is just the quotable one
   (c) ₹940

### ✅ Answers
1. **(b)** — 90/940 = 9.574%; (c) inverted the fraction.
2. **(b)** — par is where contract rate equals required rate; AAA is a credit statement, not a pricing law.
3. **(b)** — accrued is real money owed at settlement; the coupon-date “drop” illusion dies right here.

## ✅ Mastery checklist
- [ ] I can write any bond’s full cash-flow timeline from its spec line in under a minute.
- [ ] I can state coupon, current yield, and YTM for a price quote and say which one the market trades on.
- [ ] I can compute accrued interest under both actual/actual and 30/360 and bridge clean to dirty.
- [ ] I can explain why coupon-date “price drops” are accounting illusions.
- [ ] I can name my tribe before touching any bond — and say which numbers that tribe watches.

**Next:** FI2 · The Price–Yield See-Saw — where anatomy becomes physics: exact prices at 6%, 8%, 10%, the asymmetric payoffs, and the law every rate decision in India transmits through.
