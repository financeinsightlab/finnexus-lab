# 🎯 CB5 · Special Problems — Unequal Lives, Rationing, Replacement, Lease-vs-Buy

> Raw NPV works beautifully when projects are the same size, same life, and unlimited funds exist. Real committees compare a 3-year machine against a 5-year one, with ₹35L to spend across five proposals. This module installs the four specialist rulings: EAA, PI + bundle logic, defender-challenger replacement, and lease-vs-buy.

---

## 🎯 Objectives

- Compare unequal lives with Equivalent Annual Annuity (EAA) — never raw NPV
- Ration scarce capital: PI ranking, then the indivisibility fix (bundle search)
- Run defender-vs-challenger replacement on incremental flows only
- Price lease-vs-buy with after-tax disciplines (same CF treatment both legs)
- Close with the ShopKart machine trio EAA exercise

---

## 📘 Concepts

### 5.1 Unequal lives — the EAA rule

Comparing a 3-year machine (NPV +₹1.21L) with a 5-year machine (NPV +₹1.54L) raw is unfair: the second machine simply works longer. **EAA = NPV / annuity(r, life)** — converts each to its yearly-equivalent salary: A: 1.21/2.4018 = **0.502**; B: 1.535/3.6048 = **0.426** → **A pays ₹50.2k/yr-equivalent vs B's ₹42.6k → buy A** (repeatability assumed: same machine, same cycle re-bought). EAA conditions: replacement-repeat context, no tech-obsolescence cliff, and prices/rates broadly stable — if Machine A won't exist in 3 years (tech shift), EAA's repeat-assumption needs an explicit override. Rule of craft: **lives differ → EAA; lives match → NPV; funds scarce → PI + bundles (next section).**

### 5.2 Capital rationing — PI first, bundles always

Budget ₹35L, proposals (indivisible): P1 (−12, NPV +3.2), P2 (−10, +2.4), P3 (−8, +1.6), P4 (−10, +0.8), P5 (−6, +1.1). **PI = (cost + NPV)/cost**: 1.267 / 1.24 / 1.20 / 1.08 / 1.183. Greedy by PI: P1 + P2 + P3 = ₹30L, NPV 7.2 — ₹5L idle (can't buy P5 at ₹6L). **The indivisibility fix:** search total-budget bundles: P2+P3+P4+P5 = ₹34L → NPV 5.9; P1+P2+P5 = ₹28L → 6.7; P1+P2+P3+partial? Indivisible means bundles only. Winner stays **P1+P2+P3 (NPV 7.2, ₹5L unspent)**. Lessons: PI is the *ranking heuristic*, the **bundle NPV is the crown** — and "unspent budget" is not a failure if the marginal projects (P4: PI 1.08, borderline) add thin value at management bandwidth cost. Rationing converts *"which projects?"* into *"which COMBINATION?"* — a subtle shift real committees fumble annually.

### 5.3 Replacement — defender vs challenger, incremental only

Old machine (defender): runs 3 more years, OCF ₹1.2L/yr, sell NOW for ₹2L (else ₹0.3L salvage at end). Challenger: −₹8L, OCF ₹3.1L/yr × 5y. Incremental: t=0: −8 + 2 = **−6**; years: ΔOCF = 3.1 − 1.2 = **+1.9** × 3.6048 = 6.85; NPV = 6.85 − 6 = **+₹0.85L → replace**. Marginally adjust for the forgone ₹0.3L defender salvage in year 3: 0.3 × 0.7118 = 0.21 → **+₹0.64L adjusted — still replace**. Two replacement traps: **(1) sunk-love** — "the old one isn't fully depreciated!" — book value is a tax schedule, not an economic claim (its sale price and shield effects are what count); **(2) life-mismatch** — comparing defender's 3 years against challenger's 5 requires the EAA lens (ΔOCF annuity logic here embeds it).

### 5.4 Lease-vs-buy — same discipline, two legs

Lease: annual payment L per year (tax-deductible → after-tax L×(1−t)), no capex, no salvage, no dep-shield. Buy: capex now, dep shields, salvage, maintenance. Compare at the **after-tax BORROWING rate** (Kd(1−t) = 8.98% canon — lease is debt-like financing, so its competing rate is debt, not WACC): ShopKart van: buy ₹12L, dep 5y SL to 2L, salvage 2.5L vs lease ₹2.6L/yr × 5y end-year. Lease PV cost = 2.6 × 0.7483 (after-tax) × 3.953 [annuity factor at 8.98%, 5y] = **₹7.69L**. Buy PV cost = 12 − dep-shield (2 × 0.2517 × 3.953 = 1.99) − salvage-after-tax (2.5 − 0.5×0.2517 = 2.374, × DF5 0.6505 = 1.544) = 12 − 1.99 − 1.544 = **₹8.47L**. **Lease wins by ₹0.78L** here (and often loses when the residual is valuable — run the legs, don't vibe). Ownership still wins its strategic cases: control, customization, and avoiding lessor-margin when capital is cheap.

---

## 🧪 LAB — Committee Simulation Pack (10 min)

**Setup:** Three rigs on the ShopKart table (hurdle 12% for operations; 8.98% after-tax debt for financing comparisons):
- **Rig 1 (unequal lives):** Fryer X: −₹4L, OCF ₹2.1L × 3y (factor 2.4018) / Fryer Y: −₹6L, OCF ₹2.2L × 5y (factor 3.6048).
- **Rig 2 (rationing):** Budget ₹20L: A (−8, NPV +2.8), B (−6, +2.0), C (−6, +1.5), D (−5, +0.9), E (−4, +1.0). All indivisible.
- **Rig 3 (replacement):** POS defender: OCF ₹0.9L × 3y, sell-now ₹1.5L / Challenger: −₹5L, OCF ₹2.4L × 5y, salvage 0.

**Do this:**
1. Rig 1: NPVs, then EAAs — winner and the condition attached to it.
2. Rig 2: PIs, then the optimal BUNDLE under ₹20L (check bundles exhaustively).
3. Rig 3: should ShopKart replace the POS now? (incremental outlay, ΔOCF annuity + note the life-mismatch caveat you'd attach).
4. Which rig's conclusion would a naive raw-NPV committee most likely botch, and how?
5. The CFO adds: "assume fryers don't repeat — one-off demand window of 5 uncertain years." Which decision flips, and why?

**Why this matters:** These three rigs are the exact sub-questions committees actually vote on — machines of different lives, six proposals against one budget, one aging machine versus a shiny new one. Nail the rulings and you neutralize the two most common committee errors in India: raw-NPV cross-life comparisons and PI-blind budget respect.

**🔑 Lab answers:**
1. X: NPV = 2.1×2.4018 − 4 = **+1.044** → EAA = 1.044/2.4018 = **0.435**. Y: NPV = 2.2×3.6048 − 6 = **+1.931** → EAA = 1.931/3.6048 = **0.536**. **Buy Y** (EAA 53.6k > 43.5k) — with the condition: the underlying demand genuinely persists ≥5 years and Y's tech doesn't strand (EAA assumes repeatable cycles or matched horizons; here the lives mismatch WITH the repeatability question — flag it).
2. PIs: A (8+2.8)/8 = 1.35; B 1.333; C 1.25; D 1.18; E 1.25. Greedy PI: A+B+C = 20L exactly → **NPV 6.3**. Bundles: A+B+C (20, 6.3) ✓; A+B+D+E (23 >20 ✗); B+C+D+E = 21 ✗; A+C+D (19, 5.2); A+B+E (18, 5.8); B+C+E+D (21 ✗); A+C+E (18, 5.3). **Optimal: A+B+C = ₹20L, NPV ₹6.3L** — full deployment, perfect rank-match: this round the heuristic and the audit agree; report both anyway (committees trust the spreadsheet that shows the rival math).
3. Incremental: −5 + 1.5 = **−3.5**; ΔOCF = 2.4 − 0.9 = **1.5 × 3.6048 = 5.41** → NPV = **+₹1.91L → REPLACE NOW.** Caveat attached: lives mismatch (defender 3y vs challenger 5y) — the +1.91 uses the challenger's full 5-year annuity while the defender dies at year 3; even stripping years 4-5 of the Δ: 1.5×ann(12,3)=1.5×2.4018 = 3.60 > 3.5 → **still replace (+0.10): verdict robust** — that's how to present a borderline-robust answer.
4. **Rig 1** — raw NPV picks Y (+1.931 > +1.044) for the RIGHT final answer here but the WRONG reason (longer machine = more total NPV, not better value/yr); in variants where the short machine is juicier per-year, raw NPV systematically disfavors it — the reasoning error is what kills next quarter's vote. **Rig 2 risks the mirror failure**: PI-greedy-and-stop can declare victory while a bundle audit proves a fatter combination exists (the ₹35L canon: 7.2 beats 5.9 despite less budget used).
5. With NON-repeatable fryers and a 5-year demand window: X (3y life) leaves 2 years of unearned demand (or forced buy of an unpriced second unit) → Y becomes nearly mandatory regardless of EAA: **EAA's repeatability clause is the entire point** — when the window is one-off, match machine life to window length (or price the gap), don't compare annuities of fantasy repeats.

---

## 💪 Exercises

1. **EAA drill.** Machine P: NPV +₹2.0L, 4y, factor 3.0373 / Machine Q: NPV +₹2.6L, 6y, factor 4.1114. Winner?
2. **Ration.** Budget ₹15L: A (−6, +2.0), B (−5, +1.5), C (−4, +1.0), D (−5, +1.3). Optimal bundle?
3. **Replacement timing.** The defender has 1 year left with high salvage next year. Challenger NPV-incremental is −₹0.4L now but +₹0.9L if the swap waits 1 year. The option logic?
4. **Lease-vs-buy setup.**: buy ₹20L (SL 5y to 4L, salvage 5L) vs lease ₹4.3L/yr × 5y end-year. After-tax debt 8.98% (factor 3.953, DF5 = 0.6505). Verdict?
5. **Trap-spot.** Each is which error? (a) choosing a 6y machine over a 3y one by raw NPV; (b) funding projects down the PI list until budget hits and declaring victory at ₹7L total NPV while a bundle audit shows ₹8.1L exists; (c) defending the old machine because "depreciation isn't finished"; (d) comparing lease vs buy at 12% WACC.

### ✅ Selected answers

1. EAA(P) = 2.0/3.0373 = **0.658**; EAA(Q) = 2.6/4.1114 = **0.632** → **P wins** despite the smaller NPV: per-annum value is the only fair cross-life ruler (repeatability assumed — state it).
2. PIs: A 1.333; B 1.30; C 1.25; D 1.26. Greedy: A+B+C = 15L, NPV 4.5. Bundles: A+B+D = 16 ✗; A+C+D = 15 (4.3); B+C+D = 14 (3.8); A+B+C ✓ **= ₹15L, NPV ₹4.5L optimal** (greedy = optimal here; the audit shows no bundle beats it — proof obligations met).
3. This is the **delay option (CB4) in replacement clothing**: swapping today has NPV −0.4; the *option* to swap in one year is worth +0.9 → wait captures +1.3 net swing. The error would be deciding on today's static NPV and mothballing the thought: replacement timing is a menu, and menus have value — put the +0.9 on the calendar, not the shelf.
4. Lease cost = 4.3 × 0.7483 × 3.953 = 3.218 × 3.953 = **12.72**. Buy cost = 20 − shield (3.2×0.2517×3.953 = 3.184) − salvage-net (5 − (5−4)×0.2517 = 4.748 × 0.6505 = 3.089) = 20 − 3.184 − 3.089 = **13.73**. **Lease wins by ₹1.01L** — with the control/customization caveat: rule when the residual is worth much more than lessor assumptions, or fleet policy demands ownership.
5. (a) unequal-life raw-NPV error → EAA; (b) PI-blindness → bundle audit; (c) sunk/depreciation defense → incremental logic: book value is a tax schedule, not a claim; (d) wrong discount leg: lease-vs-buy is a DEBT-LIKE financing comparison → after-tax Kd (8.98%), not WACC — mismatched legs flip verdicts and routinely do in sloppy treasury notes.

---

## ❓ Quiz

**Q1.** Fryer Y beats Fryer X for the shop floor because:
(a) its raw NPV is bigger (1.931 vs 1.044)
(b) its EAA (53.6k/yr) beats X's (43.5k) — cross-life comparisons must be made in annual-equivalent terms under repeatability
(c) it costs more, so it must be better
(d) 5-year machines always win

**Q2.** With a ₹20L budget and indivisible projects, the correct ruling on the five proposals was:
(a) PI rank, fill greedily, stop
(b) PI ranking PLUS exhaustive bundle audit — the crown goes to the combination with max total NPV (A+B+C = ₹20L, +₹6.3L); PI is the heuristic, bundle NPV is the crown
(c) fund the largest NPV single project
(d) split every project pro-rata

**Q3.** The POS replacement (+₹1.91L incremental) was justified even after the life-mismatch caveat because:
(a) new machines are shiny
(b) even using ONLY the defender's remaining 3 years of ΔOCF (3.60 PV), it still covers the ₹3.5L incremental outlay — the verdict is robust to the objection, which is how borderline answers must be presented
(c) depreciation was fully used
(d) the lease option covered the gap

### ✅ Answers

1. **(b)** — raw NPV cross-life is the classic committee fumble (longer machines collect bigger totals trivially); EAA converts value to per-year salary terms. And the answer states its universal caveat: repeatability/homologous windows — conditions, not vibes.
2. **(b)** — the ₹20L case is the polite one (greedy = optimal); the Lab-exercise variant (₹35L canon: P1+P2+P3 beat P2+P3+P4+P5's fuller desk by 7.2 vs 5.9) is where bundle audits earn their keep. Unspent budget is not failure; suboptimal bundling is.
3. **(b)** — attacking your own conclusion before the opposition does is the sign of a department, not a deck: strip the contested years, recompute, and the verdict survives — so present both lines. Replace. And the same lens (delay option) guards you when tomorrow robustly beats today.

---

## ✅ Mastery checklist

- [ ] I never compare machines of unequal life on raw NPV — EAA or matched windows, always
- [ ] I ration with PI ranking + exhaustive bundle audits (crown = bundle NPV)
- [ ] I replace on incremental flows (defender sell-now + ΔOCF) with robustness strips
- [ ] I price lease-vs-buy at after-tax Kd with shields and salvage netted honestly
- [ ] I attach repeatability/tech-window conditions to every EAA verdict

**Next:** CB6 governs the machine after approval — **execution & post-audit**: sanction memos, overrun physics (2× norms), sponsor incentives vs optimism bias, and the ShopKart program's month-12 audit: did the ₹22.5L deliver?
