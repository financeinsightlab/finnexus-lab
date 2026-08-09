# 🎯 RT2 · DuPont Surgery — Five Levers, One ROE

> ROE is the most quoted ratio in markets and the least understood. DuPont decomposition cuts it open: tax efficiency × interest burden × operating margin × asset sweat × leverage = ROE. This module teaches you to run the dissection, diagnose *which* lever moved, and spot the oldest trick in finance — borrowing your way to a beautiful ROE.

---

## 🎯 Objectives

- Build the 3-way DuPont (margin × turnover × leverage) and the full 5-way version
- Diagnose ROE movements lever-by-lever on real cases
- Compute sustainable growth g* = ROE × retention and test growth plans against it
- Distinguish earned ROE (margin/turnover) from borrowed ROE (leverage) — with the danger thresholds
- Extend to ROCE for cross-leverage peer comparison

---

## 📘 Concepts

### 2.1 The identity — arithmetic of honesty

ROE = Net profit / Equity. Multiply top and bottom by Sales and Assets and nothing changes mathematically — but everything changes analytically:

**ROE = (PAT/Sales) × (Sales/Assets) × (Assets/Equity) = margin × turnover × leverage.**

ShopKart FY22: 4.73% × 2.69 × 1.79 = **22.8%**. The identity always closes — if your three levers don't multiply to your ROE, a component is wrong. That makes DuPont both an X-ray and an error-checker.

### 2.2 The 5-way dissection — who gets paid before shareholders

Drill the margin further and the whole P&L waterfall appears:

**ROE = (PAT/PBT) × (PBT/EBIT) × (EBIT/Sales) × (Sales/Assets) × (Assets/Equity)**

| Lever | Name | ShopKart | Meaning |
|---|---|---|---|
| PAT/PBT | Tax burden | 13.25/17.7 = **0.748** | 25.2% effective tax rate |
| PBT/EBIT | Interest burden | 17.7/20.0 = **0.885** | Interest eats 11.5% of operating profit |
| EBIT/Sales | Operating margin | 20.0/280 = **7.14%** | Core profitability before financing |
| Sales/Assets | Asset turnover | 280/103.95 = **2.69×** | Sweat |
| Assets/Equity | Leverage | 103.95/58.1 = **1.79×** | Amplifier |

Multiply all five: 0.748 × 0.885 × 0.0714 × 2.69 × 1.79 = **22.8%** ✓. Now ROE movements are *diagnosable*: ROE up because margin expanded (earned) or because leverage crept from 1.6 to 2.6 (borrowed)? Completely different securities, same direction of ROE.

### 2.3 Earned vs borrowed ROE — the SNL Gagan lesson

**Earned ROE** comes from levers 1–4: pricing power, cost control, asset sweat. It survives recessions. **Borrowed ROE** comes from lever 5: hold margin and turnover flat, double leverage, and ROE jumps — as does the probability of death in the next downturn. Worked example: margin 4.73%, turnover 2.69 → unlevered return on assets ≈ 12.75%. At leverage 1.79×, ROE ≈ 22.8%. Push leverage to 3.5×: ROE ≈ 44.6% — poetic, until sales dip 10%, EBIT falls to ₹18L against a now-₹7L interest bill: coverage 2.6×, covenant breach, death spiral. The professional question is never "how high is the ROE?" but **"which lever is doing the lifting — and can it carry the weight in a bad year?"** SNL Gagan, A.K. Capital, Morgan Venditti (BF3/IN2 6): every leverage death was a beautiful ROE the year before.

### 2.4 Sustainable growth — the speedometer

**g* = ROE × retention ratio.** ShopKart: 22.8% × 60% retention (40% payout) = **13.7%** sustainable growth. Grow faster than g* and something must give: raise equity, add debt (leverage lever), squeeze working capital (Module 3's growth tax), or improve margins. The analyst's move: compare management's *guidance* to g*. A 13.7% g* company guiding 30% growth with no equity raise is either planning leverage or planning disappointment — find out which before you invest, lend, or join.

### 2.5 ROCE — the leverage-blind cousin

**ROCE = EBIT / Capital Employed** (equity + debt, i.e. total assets − current liabilities). Because the numerator is pre-financing and the denominator includes all long-term capital, ROCE lets you compare a debt-heavy firm with a debt-free one on raw operating skill. ShopKart: EBIT ₹20.0L / average capital employed (avg equity ₹58.1L + debt ₹19L ≈ ₹77.1L) = **25.9%** — healthily above any plausible ~10% WACC: genuine value creation, not leverage cosmetics. Rule of craft: **ROE for shareholders, ROCE for operators, and the spread between ROCE and after-tax cost of debt for judging whether leverage is actually helping** (RT4 formalizes this spread).

---

## 🧪 LAB — Dissect Two ROEs, Convict One (10 min)

**Setup (peer set, avg balances):**

| | ShopKart | QuickBasket |
|---|---|---|
| PAT | ₹13.25L | ₹9.0L |
| PBT | ₹17.7L | ₹10.8L |
| EBIT | ₹20.0L | ₹13.5L |
| Sales | ₹280L | ₹180L |
| Avg assets | ₹103.95L | ₹108L |
| Avg equity | ₹58.1L | ₹27L |

**Do this:**
1. Run the full 5-way DuPont on both companies. Verify both multiply to their ROEs.
2. QuickBasket's ROE is *higher* (33.3% vs 22.8%). Identify exactly which levers create the gap and which destroy value.
3. Compute each firm's interest coverage and judge which ROE you'd rather own through a recession.
4. Compute both firms' sustainable growth at 40% payout. QuickBasket guides 25% growth — what must happen for that to be true?

**Why this matters:** This is the exact surgery analysts perform when a CEO boasts about ROE on CNBC. Two companies, one ratio, opposite quality. Mastering the five levers means you will never again be impressed — or alarmed — by a headline ROE without knowing its recipe.

**🔑 Lab answers:**
1. **ShopKart:** 0.748 × 0.885 × 0.0714 × 2.69 × 1.79 = 22.8% ✓. **QuickBasket:** tax 9.0/10.8 = 0.833; interest burden 10.8/13.5 = 0.800; op margin 13.5/180 = 7.5%; turnover 180/108 = 1.67×; leverage 108/27 = 4.0×. Product: 0.833 × 0.800 × 0.075 × 1.67 × 4.0 = **33.3%** ✓.
2. QuickBasket *wins* on tax burden (0.833) and operating margin (7.5% vs 7.1%) — genuinely earned. But it *loses* badly on turnover (1.67 vs 2.69 — lazy assets) and covers everything with **4.0× leverage** vs 1.79×. The ROE gap is mostly an amplifier, not skill.
3. Coverage: ShopKart 20.0/2.30 = 8.7×. QuickBasket: infer interest from the burden: PBT = EBIT − interest → interest = 13.5 − 10.8 = ₹2.7L; coverage = 13.5/2.7 = **5.0×** — okay today, but with 4× leverage a 25% EBIT dip (recession) cuts it to ~3.75× while covenants typically bite near 2–3×. **Own ShopKart's ROE through a recession.**
4. g*: ShopKart 22.8% × 0.60 = **13.7%**; QuickBasket 33.3% × 0.60 = **20.0%**. A 25% guide exceeds even its leveraged g* — so it needs *more* leverage (from 4.0×!), an equity raise, or asset-sweat improvement (turnover toward ShopKart's 2.69 would do it honesty). Ask management which lever — the answer tells you whether the guide is a plan or a prayer.

---

## 💪 Exercises

1. **Identity repair.** An analyst reports: margin 5%, turnover 2×, leverage 2×, ROE 25%. Reconcile.
2. **Lever diagnosis.** ShopKart FY22 ROE 22.8%. Next year: margin holds, turnover improves to 2.9, leverage unchanged. Estimate the new ROE.
3. **The borrower's boast.** Firm A: ROE 30%, leverage 1.5×, coverage 9×. Firm B: ROE 30%, leverage 5×, coverage 2.2×. Same ROE — write two sentences a credit officer would write about each.
4. **Tax lever.** QuickBasket's effective tax rate is 16.7% vs ShopKart's 25.2%. Give two legitimate and one suspicious reason for the gap (IN2 5/RT6 link).
5. **g\* planning.** ShopKart wants 18% growth without new equity, payout fixed at 40%. What ROE must it generate? If ROE stays 22.8%, what payout funds 18% growth?

### ✅ Selected answers

1. 5% × 2 × 2 = 20%, not 25% — the reported ROE doesn't close. Either a lever is misreported or equity/assets aren't on the same (average) basis. Never publish DuPont you haven't multiplied back.
2. ROE scales with turnover: 22.8% × (2.9/2.69) = **24.6%** — earned improvement, +1.8pp from pure sweat.
3. Firm A: *"30% ROE built on modest 1.5× leverage with 9× coverage — returns survive a severe downturn; approve with headroom."* Firm B: *"30% ROE is a leverage artifact: at 5× leverage and 2.2× coverage, a ~20% EBIT decline triggers distress; the ROE is rented, not owned. Decline or reprice risk sharply."*
4. Legitimate: 80IA-type incentives/SEZ units; carried-forward losses shielding current profits. Suspicious: aggressive deferred-tax positioning or one-off "tax credits" timed to flatter the year — RT6's forensic screens catch the pattern (tax paid in cash far below P&L tax).
5. g* = ROE × retention → needed ROE = 18%/0.60 = **30%** (a big ask from 22.8%). Alternatively retention = 18%/22.8% = **79%** — i.e., cut payout from 40% to ~21%. Growth is a budget: someone always pays.

---

## ❓ Quiz

**Q1.** ShopKart's 5-way DuPont multiplier chain that produces its 22.8% ROE is:
(a) margin × leverage × coverage
(b) tax burden × interest burden × operating margin × asset turnover × leverage
(c) ROA × P/E × payout
(d) current ratio × quick ratio × D/E

**Q2.** Two firms post identical 30% ROE. Firm A uses 1.5× leverage with 9× interest coverage; Firm B uses 5× leverage with 2.2× coverage. The professional conclusion:
(a) Both are equally attractive since ROE matches
(b) A's return is earned and recession-resistant; B's is an amplifier artifact with thin survival margin
(c) B is better — leverage proves management confidence
(d) Compare P/E ratios to decide

**Q3.** ShopKart (ROE 22.8%, payout 40%) wants growth above its sustainable rate without issuing equity. Its only honest options are:
(a) Nothing — growth is capped mathematically
(b) Improve margins or asset sweat, raise leverage deliberately, or cut the payout
(c) Revalue assets upward
(d) Switch to aggressive revenue recognition

### ✅ Answers

1. **(b)** — the five levers trace the entire P&L-to-balance-sheet journey: what's left after tax, after interest, core margin, asset sweat, amplification. 0.748 × 0.885 × 0.0714 × 2.69 × 1.79 = 22.8% — and the identity must close, or your inputs are wrong.
2. **(b)** — identical ROE, opposite quality. A's survives a 50% profit shock; B's dies in a 20% one. DuPont's entire purpose is preventing "30% = 30%" thinking.
3. **(b)** — g* = 13.7% is the *self-funded* ceiling; exceeding it means changing an input: better margins/turnover (raises ROE), more leverage (raises ROE, riskily), or lower payout (raises retention). Options (c)/(d) are accounting cosmetics — RT6 teaches how to catch companies that choose them anyway.

---

## ✅ Mastery checklist

- [ ] I can build the 3-way and 5-way DuPont from raw P&L + balance sheet items
- [ ] I always verify my levers multiply back to the reported ROE
- [ ] I can name which lever moved when ROE changes — and judge earned vs borrowed
- [ ] I compute g* = ROE × retention and stress guidance against it
- [ ] I use ROCE to compare operators across different leverage

**Next:** RT3 sweats the assets — **turnover ratios and the cash conversion machine**: DIO, DSO, DPO, the 74-day cycle, and why growth itself sends a working-capital tax bill.
