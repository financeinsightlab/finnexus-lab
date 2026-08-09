# 🎯 RT1 · The Ratio System — One Detective Kit for Every Company

> Ratios are the X-rays of finance: two numbers from the statements, one honest question, and a comparison that gives the answer meaning. This course turns you into a ratio professional — Module 1 builds the system itself: the five families, the three comparisons that make any ratio meaningful, and the five traps that fool beginners.

---

## 🎯 Objectives

- Explain why ratios beat raw numbers (scale-proofing) and where they mislead
- Map the five ratio families: liquidity, solvency, activity, profitability, valuation
- Apply the three standards of comparison: own history, peers, and the benchmark table
- Learn the five universal pitfalls: averages vs snapshots, negative denominators, accounting mix, one-ratio verdicts, seasonal windows
- Run ShopKart's full headline panel as your baseline

---

## 📘 Concepts

### 1.1 Why ratios exist — scale-proof X-rays

Is ₹13.25 crore of profit good? Impossible to say — for a paan stall it's a fantasy, for Reliance it's a rounding error. Raw numbers carry **scale**; decisions need **meaning**. Divide profit by sales (4.73%) or by the equity that produced it (22.8%) and the number becomes comparable across size, sector, and time. That division-with-a-question is a ratio. ShopKart's ₹13.25L on ₹280L sales is a **4.73% net margin** — thin, but typical for grocery retail, and on ₹58.1L of average equity it is a **22.8% ROE** — genuinely strong. Same profit, two ratios, two different conversations. That duality is the entire skill: **every ratio answers exactly one question about the business**.

### 1.2 The five families — one per question

| Family | Question it answers | Headline ratios |
|---|---|---|
| 💧 **Liquidity** | Can it pay bills due this year? | Current ratio, quick, cash ratio |
| 🏛️ **Solvency & coverage** | Can it service its debt over time? | Debt/Equity, Debt/EBITDA, interest coverage |
| 🔄 **Activity / efficiency** | How hard do assets work? | Inventory days, receivable days, payables days, asset turnover |
| 💰 **Profitability** | How much profit per rupee of sales / capital? | Gross/EBIT/net margins, ROA, ROE, ROCE |
| 🏷️ **Valuation** | What does the market pay for it? | P/E, P/B, EV/EBITDA, dividend yield (CF3/IN2 4) |

Liquidity + solvency ask about **survival**; activity asks about **sweat**; profitability asks about **reward**; valuation asks about **price**. A complete analyst never quotes one family alone — a great ROE bought with suicidal leverage (solvency) is a trap, not a triumph.

### 1.3 The three comparisons — a ratio alone is a rumor

A ratio in isolation says almost nothing. It becomes evidence only against a standard — and professionals use three:

1. **Time trend** — the company vs its own past (ShopKart's DSO 2019→2022: 41→43→44→45 — slowly worsening discipline)
2. **Peer / sector** — vs competitors or sector medians (grocery net margins run 2–6%; airlines run negative; software runs 20%+ — the same 4.73% means different things in each)
3. **Benchmark logic** — vs ratios that must hold arithmetically or economically (payables days vs supplier terms; interest coverage vs the 2× distress line; ROE vs cost of equity)

Your default move when anyone quotes a ratio: **"versus what?"** It kills more bad analysis than any formula.

### 1.4 The five universal pitfalls

1. **Snapshot vs average** — balance-sheet items swing inside the year (inventory peaks before Diwali). Proper ratios use **average** balances ((opening + closing)/2); shop formula credit-sales-with-year-end-receivables is a classic amateur error.
2. **Negative or tiny denominators** — a loss-making company's P/E, a near-zero-equity D/E: the arithmetic explodes into nonsense. Report the driver, not the ratio.
3. **Accounting mix** — ratios blend timing choices: one firm revalues assets, another doesn't; one capitalizes leases, another expenses. Compare like with like.
4. **One-ratio verdicts** — a high current ratio can mean safety *or* ₹40L of unsellable inventory. Triangulate across families before judging.
5. **Window dressing** — year-end balance sheets get combed for the annual photo: pay down overdrafts on March 30, collect receivables hard in the last week. The CF8 skeptic move: check quarterly statements and cash flow, not just the March selfie.

### 1.5 ShopKart's baseline panel (your home case all course)

| Family | Ratio | FY22 | Quick read |
|---|---|---|---|
| Liquidity | Current ratio | 2.06 | Comfortable |
| Solvency | Debt / avg Equity | 0.30 | Lightly levered |
| Coverage | EBIT / Interest | 20.00/2.30 = **8.7×** | Very safe |
| Activity | CCC (DIO 81 + DSO 45 − DPO 52) | **74 days** | Retail-typical, WC-heavy |
| Profitability | Net margin | 13.25/280 = **4.73%** | Thin, sector-normal |
| Profitability | ROE (avg equity ₹58.1L) | **22.8%** | Strong |
| Sustainability | g* = ROE × retention (60%) | **13.7%** | Can fund ~13–14% growth internally |

Seven numbers, five families, one coherent story: a thin-margin, high-sweat, lightly-levered retailer compounding equity nicely. Every module that follows takes one family to professional depth — and Module 7 makes you defend the whole panel in the dark.

---

## 🧪 LAB — Build the Baseline Panel From Scratch (10 min)

**Setup:** From FA course canons: FY22 sales ₹280L; net profit ₹13.25L; PBT ₹17.7L; interest ₹2.3L; debt ₹19L; average equity ₹58.1L; average total assets ₹103.95L (both calculated (opening+closing)/2); payout 40%.

**Do this:**
1. Compute **net profit margin**, **ROE** (avg equity), **ROA** (net profit / avg assets).
2. Compute the **asset turnover** (sales / avg assets) and **leverage multiplier** (avg assets / avg equity). Multiply margin × turnover × leverage — does it reproduce your ROE? (Preview of Module 2's DuPont surgery.)
3. Compute **interest coverage** = (PBT + interest) / interest. Judge: safe, watchlist, or distress?
4. ShopKart's banker requires minimum interest coverage of 4×. What is the maximum interest expense ShopKart could carry at current EBIT?

**Why this matters:** A first-pass panel is how professionals open any company file: margin and returns for reward, coverage for survival, and the DuPont identity to verify the arithmetic holds together. If your ratios don't multiply back to ROE, a number somewhere is wrong — catch it now, before the board does.

**🔑 Lab answers:**
1. NPM = 13.25/280 = **4.73%**; ROE = 13.25/58.1 = **22.8%**; ROA = 13.25/103.95 = **12.75%**.
2. Turnover = 280/103.95 = **2.69×**; leverage = 103.95/58.1 = **1.79×**. Check: 4.73% × 2.69 × 1.79 = **22.8%** ✓ the identity closes.
3. EBIT = 17.7 + 2.30 = ₹20.0L. Coverage = 20.0/2.30 = **8.7×** — comfortably safe (anything above ~4–5× is sleep-well territory for a stable retailer).
4. Max interest = EBIT/4 = 20.0/4 = **₹5.0L** — more than double the current ₹2.3L, so the bank covenant has huge headroom.

---

## 💪 Exercises

1. **Family sort.** Classify each into a family: (a) interest coverage, (b) inventory days, (c) P/E, (d) quick ratio, (e) ROCE, (f) Debt/EBITDA.
2. **Comparison triage.** An analyst says: "ShopKart's current ratio is 2.06 — excellent." List the three comparisons they skipped and what each might reveal.
3. **Pitfall ID.** Match each scenario to one of the five pitfalls: (a) a firm values inventory at March-end prices after a festive clearance; (b) ROE quoted at 240% for a firm whose equity was nearly wiped by past losses; (c) a textile mill looks liquid on March 31 but is gasping every September; (d) a high quick ratio driven by one unpaying giant customer; (e) ROA comparisons across a firm that revalued land vs one that didn't.
4. **Compute.** ShopKart FY21: sales ₹240L, net profit ₹9.7L, avg equity ₹51.6L. Compute NPM and ROE, then comment on the FY21→FY22 direction of both.
5. **Panel story.** In three sentences, narrate ShopKart's baseline panel (Exercise: the table in 1.5) as if briefing a lender: reward, survival, sweat.

### ✅ Selected answers

1. (a) solvency/coverage, (b) activity, (c) valuation, (d) liquidity, (e) profitability, (f) solvency.
2. **Time trend** — 2.06 might be down from 2.8 (deteriorating, despite the healthy level); **peer** — if grocery peers run 1.4, ShopKart may be hoarding lazy assets rather than being "excellent"; **benchmark logic** — 2.06 is only excellent if the current assets are *real* (inventory that sells, receivables that pay) and the current liabilities aren't hiding short-term debt.
3. (a) snapshot-vs-average, (b) tiny/negative denominator, (c) seasonal window, (d) one-ratio verdict, (e) accounting mix.
4. FY21 NPM = 9.7/240 = **4.04%**; ROE = 9.7/51.6 = **18.8%**. FY22 improved on both (4.04→4.73%, 18.8→22.8%): margin expanded *and* returns rose — the FY22 panel isn't just good, it's improving, which is the best kind of good.
5. *"ShopKart earns a thin but sector-normal 4.73% net margin, sweated hard: 2.69× asset turns and a 74-day cash cycle typical of grocery. Survival is comfortable — 2.06 current ratio, 0.30 D/E, 8.7× interest coverage. Reward is strong: 22.8% ROE, sustaining ~13.7% self-funded growth. Lend."*

---

## ❓ Quiz

**Q1.** The primary reason analysts prefer ratios over raw statement numbers is:
(a) Ratios are harder to manipulate
(b) Ratios strip out scale, making companies comparable across size and time
(c) Ratios eliminate accounting choices
(d) Ratios are required by SEBI

**Q2.** ShopKart's interest coverage is 8.7×. The best interpretation is:
(a) The company has 8.7× more debt than equity
(b) EBIT covers the annual interest bill 8.7 times over — comfortable debt-service headroom
(c) The company pays 8.7% interest on its debt
(d) Its profits are 8.7× its sales

**Q3.** A company shows a healthy current ratio of 2.5, but 70% of its current assets are slow-moving inventory. This is the pitfall of:
(a) Snapshot vs average balances
(b) The one-ratio verdict — liquidity looks strong only until you open the composition
(c) Negative denominators
(d) Valuation mismatch

### ✅ Answers

1. **(b)** — ₹13.25L means nothing alone; 4.73% margin or 22.8% ROE is comparable across a paan stall and a conglomerate. Ratios can still be manipulated (window dressing) and don't remove accounting choices — they just expose them more clearly.
2. **(b)** — coverage = EBIT/interest = 20.0/2.30 = 8.7. It's about *servicing* debt, not its size (that's D/E 0.30) or its price (that's the interest rate). Above ~4×, lenders breathe easy.
3. **(b)** — the ratio is arithmetically right and analytically wrong: liquidity lives in composition. The quick ratio (Module 4) exists precisely to strip that inventory out, and activity ratios (Module 3) test whether the "inventory" is product or a museum.

---

## ✅ Mastery checklist

- [ ] I can name the five ratio families and the question each answers
- [ ] I reflexively ask "versus what?" — trend, peer, or benchmark — when quoted any ratio
- [ ] I can list the five universal pitfalls and spot them in scenarios
- [ ] I computed ShopKart's panel: NPM 4.73%, ROE 22.8%, coverage 8.7×, CCC 74 days
- [ ] I verified margin × turnover × leverage reproduces ROE

**Next:** RT2 opens the profitability family with the surgeon's tool — **DuPont decomposition**: five levers, one ROE, and the exact diagnosis of *where* returns are made or faked.
