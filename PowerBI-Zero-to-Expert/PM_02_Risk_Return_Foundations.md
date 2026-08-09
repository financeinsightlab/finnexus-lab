# 🎯 PM2 · Risk & Return Foundations — The Arithmetic That Punishes Amnesia
> Three years: +30%, −10%, +25%. Average return? Schools say 15%. Your money says 13.5% — and your money is right. The gap is volatility's private tax: losses demand larger recoveries (the BF6 canon: −50% needs +100%), so compounding punishes variance even when the average looks identical. PM2 installs the measurement foundations every later module runs on: holding-period and annualized returns, arithmetic vs geometric, variance/standard deviation as the toll, drawdown's special cruelty, and the Sharpe ratio — return per unit of toll — as the first honest grade.

## 🎯 Objectives
- Compute holding-period, annualized (CAGR), and rolling returns; XIRR's job on cash-flow-laden real life.
- Convert arithmetic to geometric and back: G ≈ A − σ²/2 (the volatility drag formula, canon 15% → 13.5%).
- Measure risk: variance, σ, downside deviation, and max drawdown — and rank what each misses.
- Grade with the Sharpe ratio: (R − Rf)/σ — canon: 14% at σ 16% with Rf 7% → 0.44 beats 12% at σ 14% → 0.36.
- Build the return/risk language discipline: never quote one without the other and a benchmark TRI.

## 📘 Concepts

### 2.1 Returns — every flavor, each with one legal use
- **Holding-period:** (end − start + income)/start — one buy, one sell, done.
- **CAGR:** (end/start)^(1/years) − 1 — lumpy series smoothed into one honest compound rate; the ONLY version wealth talk should use.
- **Rolling returns:** every possible 3y/5y window historically — kills the "lucky endpoint" trick brochures live on (a fund at "15% CAGR" may have delivered a 3y range of −4% to +31%; rolling windows publish the whole distribution).
- **XIRR:** money-weighted return with real cash flows (SIPs, bonuses-in, redemptions-out) — YOUR personal return, which the fund's time-weighted number cannot tell you (IN2 6's engine measurement).
- **TWRR:** the fund manager's own record, flows excluded — fair for grading skill, useless for measuring your wallet.
Choose the wrong one off a factsheet and you'll grade a manager on your timing or grade yourself on his luck.

### 2.2 Arithmetic vs geometric — the drag formula
AM = simple average of period returns; GM = compounded truth. Canon: +30, −10, +25: AM = 15%, GM = (1.30 × 0.90 × 1.25)^(1/3) − 1 = **13.5%**. The drag: **G ≈ A − σ²/2** (with σ in decimals) — with σ measured on the RETURN series itself: the series {+30,−10,+25} has σ ≈ 22% → drag ≈ 2.4% ≈ the 1.5pp observed; the point stands: bigger swings, bigger haircut (a ±50% series taxes ~6pp off AM). Battle translations: (a) two products at the same AM: the smoother one ends richer — volatility is a FEE; (b) leveraged products amplify σ and thus the drag — 2× daily-leveraged series decay structurally (BF6's warning lives here mathematically); (c) every return claim must state AM vs GM — AM is advertising, GM is accounting.

### 2.3 σ and its cousins — measuring the toll
**Variance/σ:** average squared deviation, annualized (daily σ √252) — the machine-readable toll that feeds every PM formula (σₚ, Sharpe, frontier). Cousins worth their rooms: **downside deviation** (count only losing periods — Sortino's numerator-fit), **beta** (PM3's systematic ratio), **tracking error** (active σ vs benchmark — PM5's IR denominator), and the cruel one: **max drawdown** (worst peak-to-trough — NAV 100 → 148 → 96 = **35.1% MDD**) which measures the investor's lived horror, invisible to σ (two funds, same σ 14%: one's path was −50% in 2008, one never fell past −20%: same sigma, different survivors). Desk hierarchy: σ for formulae, MDD for clients, downside-dev for behavior-corrected comparisons (BF6's human still lives in the loop).

### 2.4 The Sharpe ratio — the first honest grade
**Sharpe = (R − Rf) / σ** — excess return per unit of total volatility. Canon duel: Fund A 14% @ σ 16%, Fund N (NIFTY-like) 12% @ σ 14%, Rf 7% (T-bill class): A = 7/16 = **0.44**, N = 5/14 = **0.36** — A's higher return REAL and earned per unit of toll. Judgment bands (equity, India era): ~0.3-0.5 ordinary, 0.5-0.7 good, 1.0+ exceptional-and-probably-temporary (high Sharpe attracts size, size kills Sharpe — capacity's revenge). Limits, honestly: Sharpe hates σ-invisible bets (option sellers print beautiful Sharpes until one Tuesday), it penalizes GOOD upside volatility equally, and a π (pi) on its quality masks a cliff — which is why PM5 adds Sortino, max-DD, and Calmar to the tribunal.

### 2.5 The Benchmark Commandments — measure against the right mirror
Commandment one: TRI (total-return index) or nothing — price indices shave ~1.2-1.5%/yr of dividends (IN2 3's version trap). Two: match risk class (a smallcap fund vs NIFTY-50 TRI is self-flattery). Three: disclose net-of-everything (fees, taxes, note-stack — IN2 5's tollbooths belong in personal benchmarks too). Four: period ≥ one full cycle (bull-only grade = calf-only boxing record). Five: ROLLING window distributions over endpoints (lucky exits banned). A number not measured by commandments is marketing wearing a lab coat — the tribunal (PM5) exists because brochures grade themselves.

## 🧪 LAB — Measurement bay (10 min)
1. GM drill: series +12%, −18%, +24%: AM and GM — compute both, name the drag's source in one line.
2. σ-annualize: daily σ 1.1% → annual? And the two assumptions σ-annualization quietly makes (independence, normality).
3. Sharpe duel: fund 16% @ σ 19% vs T-bill 7%: Sharpe? Then the same fund's ADVERTISED "9% over T-bills" line — convert it into per-unit-of-risk honest language.
4. MDD forensics: NAV path 100 → 130 → 91 → 115: MDD? Recovery gain needed from trough to reclaim peak? (BF6 recovery table weld.)
5. Mirror court: flexicap fund graded "beating NIFTY by 3pp" on price-NIFTY over 2 bull years: list the three commandments broken and the corrected verdict sentence.

**Why this matters:** item 3 turns every ad into a grade; item 4's recovery arithmetic is why drawdowns own the behavioral letter (BF6) — and why σ alone never tells it.

**🔑 Lab answers:** (1) AM = (12 − 18 + 24)/3 = **6%**; GM = (1.12 × 0.82 × 1.24)^(1/3) − 1 = (1.1385)^(1/3) − 1 = **4.4%** — the −18% year levied a tax the average hid (drag ≈ 1.6pp ≈ σ²/2 logic) (2) 1.1 × √252 = **17.5% annual**; assumptions: daily returns independent (no momentum/crash clustering — 2020 laughs), and variance-covariance stationarity (the machine doesn't retune mid-year); fine for plumbing, fragile for tails (3) Sharpe = (16 − 7)/19 = **0.47** — GOOD band; honest ad: "₹100 of risk buys 47 paise of excess return annually" — suddenly comparable to the index's 0.36, and the 9%-over-T-bill line is exposed as toll-free storytelling (4) MDD = (130 − 91)/130 = **30.0%**; trough-to-peak recovery needs 130/91 − 1 = **+42.9%** — drawdown's asymmetric revenge: a 30% hole demands 43% of climbing (the BF6 table's teeth) (5) broken: TRI mirror (dividends stolen from the comparison), cycle honesty (bull-only window), rolling distributions (endpoint-luck) — corrected sentence: "versus NIFTY-TRI over a full cycle on rolling 3y windows, the fund added ~0.5-1pp net — grade: competent, not miraculous."

## 💪 Exercises
1. Drag table: build AM/GM/σ for series: (a) +10,+10,+10 (b) +25,+10,−5 (c) +40,+5,−15: show drag grows with σ, all same-ish AM.
2. Rolling audit: fund's 5y TER-adjusted CAGR is 13%; its rolling 5y range historically is 4% to 22%: write the honest one-liner a factsheet should print and the investor question it answers.
3. Downside deviation set: monthly returns {2, −1, 3, −4, 1, −2}%: compute σ and downside-deviation (threshold 0%), and explain in 2 lines which one Sortino rewards managers for minimizing (and why clients feel the same).
4. Leveraged-decay demo: index series +10%, −10%, +10%, −10%: gross index CAGR vs a theoretical 2× daily-leveraged product on the same path (approximate): quantify the decay and name the formula that predicted it.
5. MDD vs σ tribunal: two funds, both σ 15%: X path: +12,+12,−25,+18; Y path: +4,+8,−6,+9: same σ-is? Which survives the client, and which metric saw it coming (compute MDDs).
6. Sharpe-capacity paragraph: explain in 5 lines why a 1.2-Sharpe small-cap fund refinancing into ₹20,000 Cr AUM sees its own alpha taxed — and the investor rule that trades on this law.
7. Interview forge: "What's a good return?" — the panel-trap question: answer in 6 numbered lines (per-unit-risk, real vs nominal, TRI mirror, cycle span, liquidity, taxes) ending with the one number you personally quote.

### ✅ Selected answers
2. "5y CAGR 13%; 5y rolling windows historically delivered 4%-22% — plan on the range, hope for the mean." It answers: what could MY specific window plausibly hand me — the only question terminal wealth actually asks, and the one endpoint CAGR exists to hide.
4. Path: 1.1 × 0.9 × 1.1 × 0.9 = 0.9801 → index CAGR ≈ **−1.0%** over 4 periods; leveraged 2× daily: 1.2 × 0.8 × 1.2 × 0.8 = 0.9216 → **−3.9%** — SAME directional chop, worse decay; the σ²/2 drag scales with variance: double σ, quadruple the variance tax; leveraged ETPs bleed in sideways tapes BY DESIGN — compounding eats leverage twice.
6. High Sharpe is written on idiosyncratic edges — a smart small-cap desk exploiting neglected names; its own publicity recruits AUM; size forces it to buy bigger, more-covered names (else it moves prices against itself); the edge dilutes toward the market's; Sharpe mean-reverts. Investor rule: harvest capacity-constrained strategies EARLY in their lifecycle, set AUM triggers (exit-review at 4-5× starting AUM), and never buy last year's Sharpe with this year's corpus.
7. 1) Good = excess return per unit of σ (Sharpe), not raw %. 2) Real terms: above inflation + a growth share (EC4's silent tax re-priced). 3) Versus TRI of the matched risk-class, not price-NIFTY poetry. 4) Across a full cycle incl. a bear chapter. 5) Net of liquidity — a 15% return you cannot exit is 10% honest. 6) Net of taxes & note-stack (IN2 5's arithmetic). Personal quote: "**real, net, TRI-beating Sharpe over a full cycle**" — every word load-bearing; drop any and the number lies politely.

## ❓ Quiz
1. Series +30%, −10%, +25%. The TRUE compounded annual return is:
   (a) 15.0%
   (b) 13.5% — AM lies by the volatility drag (≈σ²/2): the −10% year taxes the compound path; every wealth number must be GM, and every σ is a fee whether invoiced or not
   (c) 13.9%
2. Fund MDD 30% (peak 130 → trough 91). Recovery-required is:
   (a) 30%
   (b) 42.9% — drawdowns demand asymmetric recoveries; that asymmetry is why max-DD, not σ, predicts which clients stay solvent in spirit through a bear
   (c) 35%
3. Fund A: 14% @ σ 16; index: 12% @ σ 14; Rf 7%. The honest duel winner is:
   (a) A on raw return
   (b) A on Sharpe too — 0.44 vs 0.36; A earned its extra toll. But note the judgment: if A's σ hides option-selling tails, PM5's tribunal (Sortino/MDD/Calmar) convenes before any capital moves
   (c) the index on lower risk

### ✅ Answers
1. **(b)** — drag is physics, not pessimism.
2. **(b)** — 130/91 − 1 = 42.9%; ladders down are steeper than ladders up.
3. **(b)** — per-unit-of-toll is the duel's rule; tails get their own hearing.

## ✅ Mastery checklist
- [ ] I choose HPR/CAGR/rolling/XIRR/TWRR correctly for every question asked.
- [ ] I convert AM→GM with the drag formula and quote GM by default.
- [ ] I measure σ, downside-dev, and MDD — and name what each one misses.
- [ ] I grade any fund by Sharpe with judgment bands and tail suspicion.
- [ ] I enforce the Benchmark Commandments on every return claim, mine included.

**Next:** PM3 · CAPM & Beta — the one model every market person quotes: β, the SML, required returns, and alpha's honest definition.
