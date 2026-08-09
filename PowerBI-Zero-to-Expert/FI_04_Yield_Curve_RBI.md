# 🎯 FI4 · The Yield Curve & the Central Bank — The Economy's ECG
> Plot tonight’s government-bond yields from 91 days to 40 years and you get a single line that has predicted Indian slowdowns, telegraphed RBI’s next moves, and quietly told every CFO when to borrow long. FI4 teaches you to read that ECG: what normal/flat/inverted slopes whisper, why the short end obeys RBI while the long end answers to expectation + term premium, and how to translate a curve shape into borrow/invest/lend decisions. The curve is free, updates daily, and lies less than any panel show.

## 🎯 Objectives
- Sketch and interpret the three canonical shapes — normal (upward), flat, inverted — and the rare humped curve.
- Decompose any long yield into expectations of future short rates + term premium, with arithmetic.
- Trace how RBI’s repo/CRR/OMO toolkit pins the short end and transmits along the curve.
- Read spreads (10y–2y, 10y–91d) as a live macro signal — including the inversion→slowdown track record.
- Convert a curve view into concrete action: borrower tenor choice, investor duration choice, banker margin view.

## 📘 Concepts

### 4.1 Meet the ECG
The **government yield curve** connects maturities (x) to yields (y) for risk-free paper. India’s daily print comes from traded G-Secs — 91/182/364-day T-bills, then 2y, 5y, 10y (the benchmark), 30y, 40y. Two practical sub-curves: the **gilt curve** (risk-free spine) and the **corporate curve** stacked above it by credit spread (FI6). Everything in this module is about the spine’s SHAPE — and shape is information.

### 4.2 The four shapes and their speeches
- **Normal (upward):** long > short — investors demand extra yield for locking money (term premium), growth & inflation expected alive.
- **Flat:** the market expects no rate change — or a hike-then-cut path cancelling out; indecision at scale.
- **Inverted:** short > long — the market expects RBI to CUT (slowdown/disinflation ahead); historically the loudest single recession siren in bond-land because it banks on the future, loudly, with money.
- **Humped:** mid-tenors peak — usually a policy transition (hikes begun, cuts priced later).
Illustrative canon for this module: short 6.6% → 2y 6.9% → 5y 7.1% → 10y 7.3% → 30y 7.5% = a clean normal curve with ~+90bp of slope; we’ll run the inversion case in the lab.

### 4.3 Expectations + term premium — decode any point
A 2-year yield ≈ average of expected 1-year rates over the two years + a small locking premium. So if today’s 1y = 6.9% and the 2y = 7.3%, the market-implied forward says **next year’s 1y ≈ 2×7.3 − 6.9 = 7.7%** (before premium) — the curve publishes the crowd’s forecast for free. Term premium (extra yield demanded for duration risk, historically ~50–150bp at the 10y) is why “expectations” alone under-explains the long end — the far right of the curve always carries danger-pay.

### 4.4 RBI’s hand — pinning the short end
Repo sets the overnight anchor (banks borrow from RBI at repo; lend surplus at the reverse-repo window). CRR shifts system liquidity; OMO buys/sells govvies to add/drain it; the corridor frames overnight rates. Because short G-Sec yields must align with overnight money (else arbitrage), the **short end is policy’s puppet**, while the **long end is the market’s essay on the future**. Transmission lag: T-bills re-price in hours, bank lending rates in weeks-months, the real economy in quarters. Watch what RBI says vs what the 2-year does — when they diverge, the 2-year is usually the honest one.

### 4.5 Curve → decisions
- **CFO/borrower:** steep curve = short borrowing looks cheap but rolls into the very hikes the curve forecasts; flat curve = lock long, the insurance is free-ish. (ShopKart’s CF8 desk chose fixed-rate tenure exactly this way.)
- **Investor:** steep + stable outlook → “roll-down” carry (buy 5y, sell at 4y as yields slide down the slope); inversion → short-duration parking beats heroic duration bets.
- **Banker:** NIM breathes with slope (borrow short, lend long) — flat/inverted curves squeeze spreads, a public data point for FA6’s credit lens.
One curve, three professions, one skill: read the slope before it reads you.

## 🧪 LAB — ECG reading room (10 min)
1. Forward audit: 1y = 7.0%, 2y = 7.6%, term premium at 2y ≈ 10bp. What next-year 1y rate is the market pricing?
2. Shape call: T-bill 7.1%, 2y 7.0%, 5y 6.9%, 10y 6.9%. Name the shape and the macro whisper.
3. Roll-down trade: normal canon curve (5y 7.1%, 4y 6.9%). You buy the 5y and yields stay put — one year later your bond is a 4y at 6.9%. Estimate the bonus from slide-down vs pure carry (7.1%) using a ModD ≈ 4 for the remaining 4y.
4. Inversion arithmetic: 91d at 7.4%, 10y at 6.8% = −60bp spread. Write the three-step story (policy now → expected later → what long money believes).
5. Desk decision: your treasurer can borrow 3y fixed at 7.6% or float at 7.2% resetting yearly, with the curve from item 1 pricing rising rates. Choose in 4 lines with the forward math as witness.

**Why this matters:** item 3 is the trade every Indian gilt fund quietly runs in steep seasons; item 5 is a real CFO fork priced with free market data instead of committee vibes.

**🔑 Lab answers:** (1) 2 × 7.6 − 7.0 − 0.10 premium = **≈ 7.7(a)+. wait — compute: 15.2 − 7.0 − 0.1 = 8.1%** — the curve is publicly pricing a sharp hike path; a CFO ignoring that forecast borrows blind (2) **inverted** — money expects cuts: short is pinned high by TODAY’s tight policy, long is already pricing tomorrow’s easier money; history marks this the economy’s yellow card (3) carry 7.1% + price bump: yield slide 7.1 → 6.9 = −20bp × ModD 4 ≈ **+0.8%** → total ≈ **7.9% with zero forecasts** — the slope itself paid you; roll-down is harvesting geography, not prophecy (4) policy is tight NOW (7.4% bills) → market expects cuts LATER → willing long money accepts 6.8% because it believes the average future short rate is lower still; inversion is a bet with a bond behind it (5) float costs 7.2% today but reprices toward the curve’s priced path (≈8%+ next year per item 1): expected 3y floating average ≈ or above the 7.6% fix; fixed also buys certitude for covenants — **lock the 7.6%**; when the ECG prices hikes, floating is optimism you pay rent on.

## 💪 Exercises
1. ECG sketchbook: draw all four shapes with labelled axes and one-sentence macro whispers; add a believed-forward mini-scale under each short-to-long gap.
2. Expectations engine: 1y 6.5%, 2y 7.0%, 3y 7.3% (ignore premia): extract the forward 1y rates for year-2 and year-3, and narrate the policy path the market believes.
3. Hunter of premia: same numbers, but assume a +10bp per year term premium ladder (0/10/20bp) — re-extract forwards and explain in 3 lines why “the curve predicts” always needs an asterisk.
4. Inversion post-mortem: write the standard story connecting an inverted domestic curve, tight liquidity, slowing credit growth, and the lag to GDP prints — ending with the ONE reason inversions sometimes cry wolf.
5. Roll-down brochure: pitch (or refuse) a 5y-on-a-steep-curve carry trade to a conservative client using only: carry, slide math, ModD risk if the curve parallel-shifts +50bp, and the horizon required to heal.
6. RBI-watcher’s diary: repo pinned 10 straight meetings while the 2y yield fell 80bp. Explain the disagreement, who is betting what, and the two scenarios that resolve it.
7. NIM autopsy: mini-bank borrows at 1y + 100bp, lends at 5y + 200bp. Compute its spread under the normal canon curve vs the item-2 inverted curve of the lab, and conclude what flat curves do to banking profits and lending appetite.

### ✅ Selected answers
2. Forwards: year-2 ≈ 2×7.0 − 6.5 = **7.5%**; year-3 ≈ (3×7.3 − 2×7.0) = **7.9%** — the curve believes in two hikes or a longer high plateau; the 10y version of this math is how “cuts are priced” becomes a number rather than a vibe.
5. Carry 7.1% | slide ≈ +0.8% | parallel +50bp shock costs ≈ 4 × 0.5 = **−2.0% MTM** | healing: pull-to-par plus accrual covers the shock in ~ (2.0/7.1×12) ≈ **3.4 months** of coupons, full safety only if horizon ≳ 4y. Verdict for a conservative 5y-horizon client: yes-with-sizing; for 1y money: no — roll-down is polite leverage on slope, and leverage always names its exit conditions.
6. RBI preaches “higher for longer”, the 2y buys cuts: someone is wrong by year-end. Scenario A — inflation cools, RBI delivers, the 2y rallies further and the prophets count money; Scenario B — inflation persists, the 2y reprices UP ~80bp (≈ −1.4% on ModD ~1.8), and the market writes RBI’s speech for it. Diary lesson: the curve is a BET table, not an oracle; treat big divergences as the two best scenarios, fully costed.
7. Normal: NIM ≈ (7.1 + 2.0) − (6.9 + 1.0) = **+1.2%**. Inverted (lab): (6.9 + 2.0) − (7.1 + 1.0) = **+0.8%** and worsening if short funding resets higher first — flat/inverted seasons press bank margins, press loan growth, and that pressure is visible in results two quarters later: the curve leaks the banking sector’s earnings season in advance.

## ❓ Quiz
1. With 1y = 7.0% and 2y = 7.6% (premium ~10bp), the market-implied next-year 1y is:
   (a) 7.3%
   (b) ≈8.1% — 15.2 − 7.0 − 0.1: the curve publishes the crowd’s hike forecast for free, and a borrower who ignores it is buying optimism at retail
   (c) 7.0%
2. An inverted curve (short yields ABOVE long) is taken seriously mainly because:
   (a) SEBI mandates warnings
   (b) it is a money-backed bet that today’s tight policy will be cut into tomorrow’s slowdown — long buyers accept less yield NOW because they expect far less yield LATER; the bet has a genuine track record of preceding slowdowns
   (c) banks like flat margins
3. RBI’s firmest grip on the curve sits at:
   (a) the 30-year point
   (b) the overnight–91-day short end — the repo corridor plus liquidity ops arbitrage-pins short money to policy; the long end floats free as the market’s essay on the future, which is why 2y vs RBI disagreements are the best show in macro
   (c) the 10y benchmark auction

### ✅ Answers
1. **(b)** — (a) forgot the doubled 2y math; (c) priced status quo, which the 2y point itself contradicts.
2. **(b)** — track record + money at stake; (c) is backwards: flat curves squeeze banks.
3. **(b)** — the corridor arbitrages the short end into obedience; everything right of it grades RBI’s credibility daily.

## ✅ Mastery checklist
- [ ] I can name and whisper-interpret normal, flat, inverted, and humped curves.
- [ ] I can extract implied forward rates and subtract term premium honestly.
- [ ] I can trace a repo decision to short yields within hours and to the economy within quarters.
- [ ] I can compute a roll-down return and price its duration risk.
- [ ] I can convert a curve shape into borrower, investor, and banker actions.

**Next:** FI5 · Government Securities Deep Dive — T-bills, dated G-Secs, SDLs, auctions, RBI Retail Direct, and why “zero default risk” is not “zero risk.”
