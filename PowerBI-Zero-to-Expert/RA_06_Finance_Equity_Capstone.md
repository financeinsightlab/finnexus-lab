# 🎯 RA6 · FINANCE: Ratios in Money + Capstone
> The whole course, cashed out. Partnership deeds that pay in layers, ROCE that prices sweat, a D/E ceiling that keeps the 12% OD line honest, and a marketing budget that tiles to the last rupee — then the grand **Gurugram Store Deed Pack** capstone.

## 🎯 Objectives
- Read a partnership deed as **three payment layers** — interest on capital, working-partner salary, residual profit — and never flatten them into one bare ratio.
- Compute per-partner **ROCE** and explain why the working partner *should* show a higher return.
- Audit leverage with **D/E = debt ÷ equity** and hold it under the house ceiling of 1.0.
- Allocate any budget by a ratio so the parts **tile back exactly** to the whole.
- Prove the **interest-neutrality property**: when the residual ratio equals the capital ratio, the interest rate is a decorative number.
- **Capstone:** assemble the full Gurugram Store Deed Pack from scratch.

## 📘 Concepts

### 6.1 The Gurugram deed — layers first, ratio second
ShopKart's Gurugram dark store runs on a three-partner deed: **Arjun ₹8,00,000 · Bhavna ₹16,00,000 · Charan ₹4,00,000** — capital ratio **2 : 4 : 1** (₹28,00,000 total). The deed says: interest on capital at **10% p.a.**, Arjun (the working partner) draws a **salary of ₹30,000/year**, and the **residual profit splits 2 : 4 : 1**. Year-1 profit before distributions: **₹5,90,000**.

```text
Layer 1 — interest on capital (10%):  80,000 / 1,60,000 / 40,000   = 2,80,000
Layer 2 — Arjun's salary:             30,000 /        0 /      0   =    30,000
Layer 3 — residual 2,80,000 @ 2:4:1:  80,000 / 1,60,000 / 40,000   = 2,80,000
                         TOTALS:     1,90,000 / 3,20,000 / 80,000   = 5,90,000 ✓
```

The rookie move is splitting all ₹5.9L by 2:4:1 — that pays Arjun ₹1,68,571 and **robs him of ₹21,429**, because his capital is small but his salary lives outside the ratio. Deeds pay in **layers**: peel each layer, split only what the layer commands, then stack.

### 6.2 ROCE — pricing sweat honestly
Return on capital employed per partner = total payout ÷ capital:

- **Arjun:** 1,90,000 ÷ 8,00,000 = **23.75%**
- **Bhavna:** 3,20,000 ÷ 16,00,000 = **20.00%**
- **Charan:** 80,000 ÷ 4,00,000 = **20.00%**

Identical money-rates for the sleeping partners, a premium for the working one — exactly what the deed intended. ROCE is the ratio that tells each partner what their *rupee* earned, regardless of how many rupees they parked. When Bhavna asks why Arjun "got a better deal," the table answers: same 20% on money, plus 3.75 points of priced sweat.

### 6.3 D/E — the leverage ceiling
The store carries a fit-out loan of **₹24,00,000** against partner equity of **₹36,00,000** (capital ₹28L + retained surplus ₹8L):

```text
D/E = 24 : 36 = 2 : 3 = 0.67
```

House ceiling: **1.0** (conservative retail). At 0.67 the store has headroom, so the **12% OD line stays reserved for working capital** — inventory and festival season, not more fixed assets. D/E is governance, not just a quotient: it decides who gets the cheap money and who waits.

### 6.4 Revenue-tile allocation — the ₹500 rule
Marketing grants **₹1,40,000** to be split across the six ShopKart channels by FY25 revenue share (**KB 54 : LN 46 : Rohini 42 : Dwarka 38 : Saket 34 : Online 66**, total ₹280L). Price one revenue-lakh tile: 1,40,000 ÷ 280 = **₹500 per revenue-lakh**.

| Store | Revenue tiles | Marketing |
|---|---|---|
| Karol Bagh | 54 | ₹27,000 |
| Laxmi Nagar | 46 | ₹23,000 |
| Rohini | 42 | ₹21,000 |
| Dwarka | 38 | ₹19,000 |
| Saket | 34 | ₹17,000 |
| Online | 66 | ₹33,000 |
| **Total** | **280** | **₹1,40,000 ✓** |

Every part is an exact multiple of ₹500 and the column tiles back to ₹1,40,000 with **zero rounding dust** — allocation that tiles to the rupee is the analyst signature.

### 6.5 The interest-neutrality property (a beautiful invariant)
Bhavna proposes raising interest on capital from 10% to 12%. Does anyone gain? Re-run the stack at 12%:

```text
Interest layer (12%):  96,000 / 1,92,000 / 48,000 = 3,36,000
Salary:                30,000
Residual 2,24,000 @ 2:4:1: 64,000 / 1,28,000 / 32,000
TOTALS:               1,90,000 / 3,20,000 / 80,000  — unchanged!
```

**Theorem:** if the residual split ratio equals the capital ratio, interest-on-capital at rate r pays each partner r·Cᵢ from one pocket and (P − r·Cᵢ − salary…) returns through the same ratio into the other pocket. The rate redistributes **nothing**; it only relabels income. (Salary, being outside the ratio, is the only lever that truly moves money between partners.) When a partner fights over the interest rate in a symmetric deed, show them this table and order chai instead.

### 6.6 CAPSTONE BRIEF — the Gurugram Store Deed Pack
Year 2 closes with profit **₹9,00,000**, and the partners vote Arjun's salary up to **₹60,000** for running a second shift. Assemble the pack:

1. **Layer table** @10% interest, ₹60k salary, residual 2:4:1 → payouts:
   - Interest: 80,000 / 1,60,000 / 40,000 = 2,80,000
   - Salary: 60,000 → Arjun
   - Residual 5,60,000 @ 2:4:1 = 1,60,000 / 3,20,000 / 80,000
   - **Totals: Arjun ₹3,00,000 · Bhavna ₹4,80,000 · Charan ₹1,20,000** (check: 9,00,000 ✓)
2. **ROCE row:** 300/800 = **37.5%**, 480/1600 = **30%**, 120/400 = **30%** — sweat premium widened to 7.5 points, exactly the salary ÷ capital effect (60,000 ÷ 8,00,000).
3. **D/E line:** loan amortized to ₹20L, equity now ₹36L + ₹2L retained = ₹38L → D/E = 20:38 = **0.53** — green.
4. **Marketing re-allocation:** year-2 grant ₹1,68,000 at the same ₹500-tile logic → 280 tiles now cost ₹600 each: **32,400 / 27,600 / 25,200 / 22,800 / 20,400 / 39,600** (= 1,68,000 ✓).
5. **Neutrality footnote:** any interest-rate amendment changes labels, not payouts — recommend leaving 10% untouched and revisiting only the salary lever.

## 🧪 LAB — Capstone drills (10 min)
1. A deed pays 8% interest, no salary, residual = capital ratio 3:5, profit ₹2,00,000. Show neutrality: compute both partners' totals, then re-run at ANY other rate in 20 seconds. What changes?
2. Capital 5:3, profit ₹4,40,000, salary ₹80,000 to the 5-partner, interest 10%. Build the three-layer table (capitals ₹5,00,000 / ₹3,00,000).
3. D/E audit: debt ₹45L, equity ₹30L. Ceiling 1.0 — pass or escalate? What's the maximum new debt allowed?
4. Split ₹2,10,000 by the six-store revenue ratio. Price the tile first.
5. Arjun wants salary ₹1,20,000 in year 2 (profit stays ₹9,00,000). Recompute his total and his ROCE. What did the raise really transfer — and from whose pocket?

**Why this matters:** every family business, LLP and startup ESOP pool in India is a deed like this. Layers + ROCE + tiling covers 90% of the money conversations you'll ever audit.

**🔑 Lab answers:** (1) Nothing changes — totals stay fixed (interest 3:5 of 16,000… totals: p₁ = interest 3/8·8%±… shortcut: neutrality invariant, totals ₹75,000 / ₹1,25,000 at any rate) (2) interest 50,000/30,000; salary 80,000; residual 2,80,000 @5:3 = 1,75,000/1,05,000 → **3,05,000 / 1,35,000** (3) D/E = 1.5 → escalate; max sustainable debt = ₹30L, so shock absorber is gone — no new debt (4) tile = 2,10,000/280 = ₹750 → 40,500 / 34,500 / 31,500 / 28,500 / 25,500 / 49,500 (5) Arjun: 80,000 + 1,20,000 + residual (9,00,000−2,80,000−1,20,000=5,00,000 @ 2/7 → 1,42,857) = **₹3,42,857**, ROCE **42.9%**; the ₹60,000 raise cost Arjun nothing net — wait, compute the transfer: Bhavna and Charan fund it via the shrunken residual in 4:1 proportions (₹17,143 from Bhavna, ₹4,286 from Charan, and ₹38,571 from… actually re-split carefully: old residual Arjun-share 1,60,000 → new 1,42,857: Arjun loses 17,143 of residual and gains 60,000 salary → net +42,857; Bhavna 3,20,000→2,85,714 (−34,286); Charan 80,000→71,429 (−8,571); transfers tile: 42,857 = 34,286 + 8,571 ✓).

## 💪 Exercises
1. Capital ₹12,00,000 split 1:1:2 among three partners; 10% interest; profit ₹6,00,000; no salary. Build the layer table and totals.
2. In Q1, partner 3 (the "2") demands the interest rate be 15%. Prove neutrality in one line.
3. ROCE audit: A invests ₹4,00,000 and earns ₹96,000; B invests ₹6,00,000 and earns ₹1,26,000. Who runs the better rupee?
4. Debt ₹36L, equity ₹48L, ceiling 1.0. How much MORE debt can the store take before escalation?
5. Grant ₹70,000 split by store revenue ratio. Tile price and Karol Bagh's share?
6. Deed 2:4:1 as in 6.1, but year-3 profit DROPS to ₹2,60,000 (interest 10%, salary ₹60,000). Residual turns negative — distribute the layers and state each partner's total.

### ✅ Selected answers
1. Interest: 30,000 / 30,000 / 60,000 = 1,20,000 (capitals 3L/3L/6L); residual 4,80,000 @1:1:2 = 1,20,000/1,20,000/2,40,000; **totals 1,50,000 / 1,50,000 / 3,00,000** = 6,00,000 ✓
2. Partner i gets r·Cᵢ + (P − r·ΣC)·(Cᵢ/ΣC) = r·Cᵢ − r·Cᵢ + P·(Cᵢ/ΣC) = P·shareᵢ — rate cancels, totals pinned at 1,50,000/1,50,000/3,00,000. ∎
3. A: 96,000/4,00,000 = **24%**; B: 1,26,000/6,00,000 = **21%** → A's rupee works harder; B's pile is bigger. ROCE before ₹, always.
4. D/E now = 0.75; headroom to 1.0 ⇒ max debt ₹48L → **₹12L more**.
5. Tile = 70,000/280 = ₹250 → KB = 54 × 250 = **₹13,500** (and LN 11,500 · Rohini 10,500 · Dwarka 9,500 · Saket 8,500 · Online 16,500 = 70,000 ✓).
6. Interest 2,80,000 + salary 60,000 = 3,40,000 > profit 2,60,000 → residual = **−80,000 split 2:4:1** = −22,857 / −45,714 / −11,429 → totals **87,143 / 1,74,286 / −1,429** (Charan marginally negative; deeds must state whether losses in the residual claw back interest — the famous "interest vs loss" deed war; answer per deed text).

## ❓ Quiz
1. Gurugram deed: Arjun's year-1 total earning:
   - (a) ₹80,000
   - (b) ₹1,90,000 — interest 80,000 + working salary 30,000 + residual 80,000; layers first, ratio second; the bare capital ratio misses ₹1,10,000 of his pay
   - (c) ₹1,60,000
2. ₹24L debt against ₹36L equity gives a D:E of:
   - (a) 0.24
   - (b) 0.67 — 24:36 = 2:3; under the 1.0 conservative ceiling so the 12% OD line stays reserved for working capital
   - (c) 1.50
3. Marketing ₹1,40,000 split by store revenue 54:46:42:38:34:66 pays Karol Bagh (54):
   - (a) ₹54,000
   - (b) ₹27,000 — per-revenue-lakh ₹500 (1,40,000/280); all six figures tile back to ₹1,40,000 exactly
   - (c) ₹11,662

### ✅ Answers
1. **(b)** — the deed pays in three floors; only the residual obeys the bare ratio.
2. **(b)** — D/E is governance: 2:3 leaves headroom for inventory season.
3. **(b)** — tile price ₹500; tiling to the rupee is the signature.

## ✅ Mastery checklist
- [ ] I peel deeds into interest / salary / residual before touching any ratio
- [ ] I compute per-partner ROCE and can defend the working partner's premium
- [ ] I audit D/E against the ceiling and say *escalate* without flinching
- [ ] My allocations tile back to the whole with zero rounding dust
- [ ] I can prove interest-neutrality in one line when residual ratio = capital ratio
- [ ] I shipped the Gurugram Store Deed Pack without a calculator panic

🏆 **COURSE COMPLETE — Ratio & Proportion!** Six modules: terms vs wholes, the k-constant, partnership layers, alligation crosses, the five named traps — and now deeds, ROCE, leverage and tiling budgets. Ratios stopped being exam fodder; they're how money actually gets divided in this country.

**Next:** **🏦 Simple & Compound Interest** — the two engines that move every rupee you'll ever lend, borrow or park. The 1.1-ladder, the jewel formula, and the Rule of 72 await. Bring a calculator; leave with a mindset! 🚀
