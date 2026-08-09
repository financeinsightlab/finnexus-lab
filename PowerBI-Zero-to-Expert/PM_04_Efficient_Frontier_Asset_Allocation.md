# 🎯 PM4 · The Efficient Frontier & Asset Allocation — Markowitz's Map
> Given every risky portfolio you could build, which ones are even worth considering? Markowitz drew the answer in 1952: a bullet-shaped frontier where every point is the maximum return for its risk level — everything below it is incompetence, everything beyond it is fantasy. Adding a risk-free asset turns the map into a straight highway (the Capital Allocation Line): lend at Rf when timid, borrow when brave, but everyone drives through the SAME tangency portfolio. PM4 builds the map, the highway, the two-fund doctrine, and then the practical allocation frameworks (age rules, glide paths, goal-based) that translate theory into a ₹-sign — because the allocation decision drives ~90% of the journey's variance, and stock-picking argues about the remainder.

## 🎯 Objectives
- Sketch the minimum-variance bullet and efficient frontier — and explain why only the upper half is rational.
- Derive the tangency portfolio with a risk-free asset: everyone holds T-bills + THE same risky book, varying only proportions (Two-Fund Separation).
- Read the CAL slope = Sharpe: steeper fights start at better tangencies; the risk-tolerance dial moves ALONG, the frontier design moves THE line.
- Convert theory into allocation frameworks: 100−age, goal-based buckets, glide paths — and their honest limits.
- Quantify why allocation dominates: Brinson's ~90% of variance result, and where active choices may legitimately add.

## 📘 Concepts

### 4.1 The map — bullet, frontier, and the rational half
Plot every portfolio (σ on x, return on y) from the correlation mosaic of PM1: the feasible set forms a **bullet** (nose at the minimum-variance point — the lowest possible σₚ). Its upper edge is the **efficient frontier**: for every σ, the max return — every point below is a portfolio you can strictly improve (same risk more return, or same return less risk), so rational investors choose ONLY from the upper edge. Institutions run this with optimizer software across asset classes (equity/debt/gold/REIT/international); the inputs (expected returns, σ, ρ) decide the map — garbage expected-return fantasies produce beautiful, wrong frontiers ("optimization is error-maximization" — inputs' estimation error amplifies into corner portfolios; hence constraints and judgment reign over naked solver output).

### 4.2 The highway — risk-free asset + tangency
Add lending/borrowing at Rf: draw lines from (0, Rf) tangent to the bullet — the **steepest line touches at the tangency portfolio T**, the highest-Sharpe risky combination. Magic (Two-Fund Separation): **every optimal portfolio = T-bills/liquid + T**, mixed by risk tolerance — the cautious hold 30% T + 70% bills; the brave lever 120% T; but NO rational investor remixes the risky ingredients away from T, because T has the best Sharpe and only the Proportion changes where you sit on the risk axis. Practical echoes: (a) one well-built diversified core (T-candidate: index-blend + TMF + gold) serves everyone — allocations, not products, personalize; (b) the CAL slope IS T's Sharpe: a better frontier (higher Sharpe core) moves EVERYONE's line up, so improving the core beats agonizing over tilts; (c) real-world borrowing costs > Rf kink the highway — leverage is asymmetric, so the "brave" end of the line under-delivers vs theory.

### 4.3 From map to mandate — the allocation frameworks that live in the wild
- **Age heuristics:** equity ≈ 100 − age — crude but directionally human-capital-aware (a 25-year-old's salary stream IS a bond), adjust for obligations (a 25-year-old supporting parents owns LESS equity than the rule says).
- **Goal-based buckets:** money for <3y ⇒ liquid/TMF (FI5, zero equity democracy); 3-7y ⇒ blended; 7y+ ⇒ equity engines — each bucket priced by ITS horizon's worst-case, not the household average (IN2 7's pyramid formalized).
- **Glide paths:** allocation de-risks on schedule as the goal nears (retirement target-date style: 80% equity at 30 gliding to 35-40% by 60) — automates the "sell high, age carefully" discipline no willpower needs to repeat.
- **Static strategies (60/40, all-weather):** accept one frontier point and re-center on schedule (PM6's machine). Honest limits: expected returns GUESS wrong (frontiers wobble), correlations regime-shift (PM1's panic tax), and nobody's utility is a math function — a 30% equity investor who panic-sells at −15% should have been at 15% equity with a better-designed seatbelt all along (BF6 approves).

### 4.4 The 90% finding — allocation's dominance, honestly framed
Brinson, Hood & Beebower (1986): ~**90% of return-VARIABILITY** across balanced funds is explained by the policy allocation (the equity/debt split), with market timing and security selection scribbling in the margins. Careful with the folklore: it's 90% of VARIANCE-difference across funds/cycles, NOT 90% of your return level — but the desk takeaway stands unchallenged: **the split decision is the biggest lever you'll ever pull**; choosing 70/30 vs 40/60 outweighs a decade of stock-picking arguments, and it costs nothing while stock-picking costs TERs, taxes, tuition, and time (IN2 5's tollbooths). Get the split roughly right with the frontier logic, then spend your life-energies where marginal effort pays: savings rate, time in market, and behavior (PM7 ties the bow).

### 4.5 India-calibrated frontier sketch — the working numbers
Desk inputs (long-run, post-2005-ish history, INR): NIFTY-50 TRI ~12%, σ ~16-18; mid/small TRI ~14-15%, σ ~22-26 (with crash manners far worse than σ admits); 10y govvies ~7%, σ ~7; gold INR ~9-10%, σ ~14 (with ρ-economic gifts in crisis); cash/liquid ~5.5-6%, σ ~0.5. Sane-model frontier family for a 3-sleeve world (equity/gold/govvies): min-variance near (σ≈5.5, R≈8%) at ~20/15/65; balanced sweet spot (σ≈9-10, R≈9.5-10.5%) at ~55/15/30; growth point (σ≈14-15, R≈11+%) at 90/5/5. Your numbers WILL differ with estimation windows — the lesson is the SHAPE: diversification bends the line upward, gold/govvies earn seats despite lower returns courtesy of PM1's cross-term, and the all-equity point buys +1-2% return for +4-5% σ — a trade whose price only drawdown season invoices.

## 🧪 LAB — Map room (10 min)
1. Rationality police: portfolio X at (σ 12%, R 8.5%) and portfolio Y at (σ 12%, R 10%): which frontier half does X occupy, and what does mixing logic say about its builder?
2. CAL construction: T at (σ 14%, R 11.5%), Rf 6%: the line's slope (=Sharpe?) and the required σ for a wanted R 9%.
3. Split verdict: two savers, same corpus ₹50L, same horizon: A agonizes fund-picks weekly at 50/50 split, B automates 75/25 engine: use Brinson logic + IN2 6 drag math to call their decade.
4. Glide path script: age 32, target house at 38: write the 6-year glide (equity share per year-end) with the trigger discipline attached.
5. Frontier audit with panic tax: balanced point (55/15/30) stress: equity −30%, gold +8%, govvies +4% (+yield rally): the book's year? And the Brinson sentence this teaches about defense sleeves.

**Why this matters:** item 3 is the quietest wealth gospel in the course; item 5 shows the "boring" sleeves paying their salaries in the one year that decides decades.

**🔑 Lab answers:** (1) X sits BELOW the frontier (same σ as Y, less return) — strictly dominated; its builder either optimized with fantasy inputs, refuses rebalancing (PM6), or overpaid for "active" that delivered lawn-mowing instead of landscaping: on a rational map, X does not exist (2) slope = (11.5 − 6)/14 = **0.39 Sharpe**; wanted R 9% → 9 = 6 + 0.39×σ → σ = (9−6)/0.39 = **7.7%** (≈55% T + 45% bills/cash) — the highway lets you ORDER risk at market price, no more, no less (3) decade call: Brinson says ~90% of outcome difference written by the SPLIT (B's 75/25 vs A's 50/50 compounds the equity premium) while A's picking-agonies add TER/tax/timing mistakes (IN2 5: each churn pays toll); verdict: B's automate-and-live wins the base rate — A can only overturn it with proven edge, which weekly agonizing is not evidence of (BF6 logs) (4) glide: 32: 85% → 33: 75% → 34: 65% → 35: 50% → 36: 35% → 37: 20% → 38: 5-10% equity, remainder migrating each year into locked TMF/FD rungs matching the booking month; trigger discipline: moves happen on SCHEDULE (April), only accelerated if a sleeve ±20% shock forces it (5) book year = 0.55×(−30) + 0.15×(+8) + 0.30×(+4) = −16.5 + 1.2 + 1.2 = **−14.1%** vs pure equity's −30%: defense sleeves halved the wound — Brinson sentence: the 45% "boring" sleeves didn't raise average returns, they PAID for staying-in-the-market, which is where all returns actually come from (BF6's weld at −16% vs −30%: the panic-sell probability halves).

## 💪 Exercises
1. Bullet plot: with two assets (σ 15/R 12; σ 25/R 15; ρ 0.2): compute σₚ at 100/0, 80/20, 60/40, 40/60, 20/80, 0/100 — plot mentally the bullet, mark the MVP zone, and explain why the nose bends BACKWARD (lower σ than the safe asset alone?).
2. Error-maximization note: 5 lines on why small input changes (equity R 11% → 13%) flip optimizer corner outputs (0% gold → 30%), and the guardrails practitioners bolt on (constraints, resampling, judgment).
3. Two-fund sermon: write the 6-line sermon to a product-collector friend: why one T-candidate core + bills beats their 9-fund collection, with Sharpe and fee-drag as witnesses (IN2 6's ₹15.84L echo).
4. Bucket engineering: household goals: emergency (anytime), car (2y), MBA (6y), retirement (24y): assign buckets/instruments/expected-return classes, and state the horizon worst-case logic for each in one line each.
5. Glide-path stress: run exercise 4's MBA bucket through a −25% equity year arriving at year 5 of 6: with and without the glide, quantify the shortfall and the lesson scheduled for every parent.
6. Frontier with leverage kink: explain in 4 lines how borrowing at 10% (not Rf 6%) kinks the CAL at T, what that does to levered points' delivered Sharpe, and why "borrow to buy at the dip" seduces the CADL line and bleeds the real one.
7. Interview forge: "If allocation explains 90%, why hire YOU?" — 6 numbered lines (variance-vs-level nuance, the 10% that still pays fees in crores at AUM scale, behavior/override protection, custom horizons+liabilities, tax/glitch management, and the one promise you refuse to make).

### ✅ Selected answers
1. σ/R by mix: 100/0: (15, 12%); 80/20: σ² = 0.64×0.0225 + 0.04×0.0625 + 2×0.16×0.2×0.0375 = 0.0144+0.0025+0.0024 = 0.0193 → (13.9, 12.6%); 60/40: 0.0181+0.01+0.0048×... compute: 0.36×0.0225=0.0081 + 0.16×0.0625=0.01 + 2×0.24×0.2×0.0375=0.0036 → 0.0217 → (14.7, 13.2%); 40/60: 0.0036+0.0225+0.0048+... = 0.0036+0.0225+2×0.24×0.2×0.0375=0.0072 → 0.0333 → (18.25, 13.8%); 20/80: (20.8, 14.4%); 0/100: (25, 15%). MVP near the heavy-low-σ side; nose bends because ρ 0.2 makes mixing create σ BELOW the ingredient line — the free-lunch bulge drawn with your own hand.
4. Emergency → liquid fund/FD (R 6% class): worst-case logic = zero principal-risk tolerance, horizon "tonight". Car 2y → TMF/FD 2y rungs (7% class): horizon worst-case = MTM mark if forced early — duration matched so worst case ≈ coupon. MBA 6y → balanced engine 60/40 gliding from year 4 (9% class): worst-case logic = a −25% shock at year 5 costs ~12-14% of the bucket with glide vs ~25% without — schedule the de-risking BEFORE you'll want it. Retirement 24y → equity engines ~85-90% (12% class): worst-case logic = 24y swallows 3-4 bear cycles whole; volatility is toll, not risk.
7. 1) Brinson prices VARIANCE across funds, not your terminal rupees — allocation is the runway, not the flight. 2) The "last 10%" at ₹5,000 Cr AUM is 2 ranks of fee-justification, done professionally. 3) Behavior: the advisor's real product is stopping the client's worst Tuesday (BF6's value-add priced in prevented panic). 4) Liabilities: immunization, glide design, and cash-flow timing are engineering, not picking (FI7/PM4 welds). 5) Tax and tollbooth management (IN2 5's harvest discipline) adds 0.5-1%/yr WITHOUT market calls — the respectable alpha. 6) Refuse: promising return forecasats — I promise architecture, discipline, cost control, and honest measurement; whoever sells forecasats sells lottery tickets in a suit.

## ❓ Quiz
1. Two-Fund Separation says a timid and a brave investor both should:
   (a) hold completely different risky books
   (b) hold the SAME tangency risky book, changing only its share against bills/cash — personalization happens along the risk dial (proportion), not inside the engine room; product-collecting is not customization, it's fog
   (c) pick stocks suited to personality
2. Brinson's ~90% finding legitimately teaches:
   (a) stock-picking is worthless
   (b) the policy SPLIT (equity/debt/gold) writes ~90% of return variability — so get the frontier-side split roughly right first and agonize over picking later; the finding prices variance across funds, so it crowns architecture before it buries selection
   (c) markets are random
3. The CAL's slope equals:
   (a) beta
   (b) the tangency book's Sharpe — steeper line, better core; every investor's whole map upgrades when the risky engine's per-unit-price improves, which is why building the engine outranks tilting it
   (c) the risk-free rate

### ✅ Answers
1. **(b)** — one great engine, many volume knobs.
2. **(b)** — architecture first; asterisks read aloud.
3. **(b)** — the highway's grade IS the engine's grade.

## ✅ Mastery checklist
- [ ] I can sketch and defend the bullet, MVP, and the rational half.
- [ ] I compute CAL points and Sharpe slopes on demand.
- [ ] I preach two-fund separation with Sharpe and fee-drag witnesses.
- [ ] I build buckets/glide paths with horizon worst-case logic.
- [ ] I quote Brinson correctly — variance, honestly framed — and still price the last 10%.

**Next:** PM5 · Measuring Performance — the full tribunal: Sharpe, Sortino, Treynor, IR, alpha verification, max drawdown and Calmar — grading any fund like a professional allocator.
