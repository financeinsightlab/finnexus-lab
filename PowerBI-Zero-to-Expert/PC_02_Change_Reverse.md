# 🔁 PC2 · Percentage Change & The Reverse

> Two formulas run half of every aptitude paper, and both live here: the **forward formula** (\"grew from 236 to 280 — by what %?\") and the **reverse formula** (\"after a 30% discount it's ₹2,100 — what was the MRP?\"). The forward formula students know. The reverse formula is where half the exam hall bleeds — because \"minus then plus\" is NOT symmetric. Master both today, plus the famous **recovery ladder**: the exact +% you need to undo any −% (investors' life skill, borrowed for free).

---

## 🎯 Objectives

- Compute %-change cleanly: **(new − old) ÷ old × 100**, base = old.
- Solve reverse questions with the **multiplier method**: divide by (100 ± x)/100 — never add-back-x.
- Wield the **recovery ladder**: −x% needs \\+y% where y = 100x/(100−x).
- Handle up-then-down chains safely (multipliers, not additions).
- Read \"grew TO 118%\" vs \"grew BY 18%\" without flinching (the TO/BY knife).

---

## 📘 Concepts

### 2.1 The forward formula (polished to reflex)

```
%-change = (new − old) ÷ old × 100          base = OLD, always
growth FACTOR = new ÷ old                    (to-form: 1.186 means grew TO 118.6%)
```

ShopKart FY24 ₹236L → FY25 ₹280L: change = 44/236 = **+18.6%**; factor = 280/236 = **1.186** — \"grew TO 118.6% of last year\" and \"grew BY 18.6%\" are the SAME fact in TO/BY costumes. Knife-cut: **TO includes the original 100; BY is only the delta.** Exams swap them hoping you'll mis-hear.

**Revenue check with Q2-FY26 (GL story):** ₹71.8L vs ₹59.3L: 12.5/59.3 = **+21.1%** ✔ (the \"+21% YoY\" quote). Net ₹3.85L vs ₹1.09L: 2.76/1.09 = **+253% ≈ +252%** ✔ with the small-base caveat attached, as always.

### 2.2 The reverse problem (where 50% of the hall bleeds)

**Classic trap:** \"After a 30% discount, the price is ₹2,100. Find the marked price.\"

The wrong reflex: \"add 30% back → 2,100 × 1.3 = ₹2,730\" ❌. Why wrong? 30% of WHAT? The discount was 30% of the ORIGINAL — adding 30% of the REDUCED number overshoots.

**The multiplier method (the professional's reverse):**

```
After −30% → you hold 70% of the original   (multiplier 0.70)
Original = held value ÷ multiplier = 2,100 ÷ 0.70 = ₹3,000 ✔
Check forward: 3,000 − 30% = 3,000 − 900 = 2,100 ✔ closes the loop
```

The universal reverse law: **after +x% exists 1.x of original; after −x% exists 0.(100−x) of original. Reverse = DIVIDE BY THE MULTIPLIER.** Table of multipliers: +25% → ÷1.25 · +20% → ÷1.2 · −20% → ÷0.8 · −30% → ÷0.7 · −12.5% → ÷0.875 (÷7/8 → ×8/7 ✔ fraction swap!).

**Another classic:** \"Price rose 25% to ₹4,500 — original?\" 4,500 ÷ 1.25 = 4,500 × 4/5 = **₹3,600** (÷1.25 = ×0.8 = ×4/5 — fraction costumes again!).

### 2.3 The recovery ladder (investor wisdom = exam marks)

To undo −x%, the +y% needed is **y = 100x ÷ (100 − x)**:

| Loss | Recovery needed | Because |
|---|---|---|
| −10% | **+11.1%** | 100×10/90 = 1/9 ÷ 0.9 = ×10/9 |
| −20% | **+25%** | ×5/4 (÷0.8) |
| −25% | **+33.3%** | ×4/3 |
| −33.3% | **+50%** | ×3/2 |
| −50% | **+100%** | ×2 (double!) |

Feel the asymmetry: losses are heavier than equal gains — because the base SHRANK. ₹100 − 50% = ₹50; +50% on ₹50 = ₹75, not ₹100. This is why fund ads quote average returns (AV7's CAGR trap!) and why the recovery table matters in every money conversation. Memorize the 5-row ladder — exams pick from it directly.

### 2.4 Up-then-down and down-then-up (short chains)

Multipliers multiply; percents never add:

- +25% then −20%: ×1.25 × 0.8 = ×1.00 → **net ZERO** (prep for PC3's full successive engine).
- +20% then −20%: ×1.2 × 0.8 = ×0.96 → **net −4%** (NOT zero! deep dive next module).
- −50% then +50%: ×0.5 × 1.5 = ×0.75 → **net −25%**.

Rule of chains: convert each step to its multiplier, multiply them, read the net. NEVER net the percents themselves.

### 2.5 Multiplier-first architecture (the mental model for everything upcoming)

Every percent action is a multiply: **new = old × (1 ± x/100)**. Forward questions = multiply; reverse = divide; chains = multiply multipliers; recovery = the multiplier that restores 1. Keep ONE architecture in your head and PC becomes one topic, not fifty question \"types.\"

---

## 🧪 LAB — Forward & reverse reps (10 min)

1. Forward: ShopKart Q1-FY25 58 → Q1-FY26 68 (plan): %-change? growth factor? TO/BY statements?
2. Reverse: A shop sells a kurta at ₹1,840 after 20% off. MRP?
3. Reverse: After a 12% GST-inclusive bill of ₹56,000, what's the pre-tax base? (÷1.12!)
4. Recovery: Your mutual fund fell 33.3%. Needed recovery %?
5. Chain: price +30%, then later −23%: multiplier & net?

**Answer key:** 1) 10/58 = **+17.2%**; factor 1.172; \"TO 117.2%\" / \"BY 17.2%\". 2) 1,840 ÷ 0.8 = **₹2,300** ✔ forward-check 2,300−460=1,840 ✔. 3) 56,000 ÷ 1.12 = **₹50,000** ✔ (not 56,000 − 12% = 49,280 ❌ — the base was pre-tax!). 4) **+50%** (ladder row 4). 5) 1.3 × 0.77 = **1.001** → net **+0.1%** — \"nearly flat\" beats guessing \"+7%\" every time.

---

## 💪 Exercises

1. Ram's salary rose from ₹40,000 to ₹46,000. %-rise? factor? TO-statement?
2. \"The discounted fare is ₹3,150 after 25% off\" — base fare?
3. A property appreciated TO 140% in 5 years. BY how much? Original ₹80L → now?
4. Stock −40%. Recovery to breakeven = ?% (ladder memory).
5. Inclusive-18% price ₹2,360: base? (Careful — it's not ₹2,360 − 18%!)

### ✅ Selected answers

1. 6,000/40,000 = **+15%**; factor 1.15; \"salary is now TO 115% of old salary.\"
2. 3,150 ÷ 0.75 = **₹4,200** ✔ (0.75 = surviving multiplier after −25%).
3. BY **+40%** (140−100); now = 80 × 1.4 = **₹112L**.
4. **+66.7%** (100×40/60 = ×5/3 — extend the ladder by the formula when memory gaps).
5. 2,360 ÷ 1.18 = **₹2,000** ✔ — ÷(1+r) removes inclusive tax; subtracting r% of the inclusive price double-counts the base error.

---

## ❓ Quiz

**Q1.** \"After a 30% discount the price is ₹2,100. MRP?\" The correct engine is:
- (a) 2,100 + 30% = 2,730
- (b) **2,100 ÷ 0.70 = ₹3,000** — after −30% you're holding 0.70 × original; reversing means DIVIDING by the surviving multiplier, never adding the % back
- (c) 2,100 × 1.3 then × 0.7
- (d) Cannot be found

**Q2.** Your portfolio crashes −50%. The recovery needed to merely break even is:
- (a) +50%
- (b) **+100%** — the base halved, so it must DOUBLE: y = 100x/(100−x) = 100×50/50 = 100%. Losses are heavier than equal gains
- (c) +75%
- (d) +25%

**Q3.** \"Revenue grew TO 118.6% of last year\" vs \"grew BY 18.6%\" — the two statements are:
- (a) Different facts
- (b) **THE SAME FACT in TO/BY costumes** — TO includes the original 100%; BY is only the delta; exams swap them to catch ear-readers
- (c) TO is bigger growth
- (d) BY ignores the base

### ✅ Answers

1. **(b)** — the reverse law. Add-back-x fails because x% of the REDUCED number ≠ x% of the ORIGINAL. ÷0.70 closes the loop: 3,000 − 900 = 2,100 ✔.
2. **(b)** — the ladder's dramatic row: −50% ↔ +100%. ₹100→50→needs ×2. This single insight upgrades you as an investor AND a test-taker.
3. **(b)** — TO = new/old (factor); BY = (new−old)/old (delta). 280/236 = 1.186 TO; 44/236 = 18.6% BY. One coin, two faces. Hear the swap in speech, too.

---

## ✅ Mastery checklist — PC2

- [ ] Forward formula with old-as-base, stated aloud before computing
- [ ] TO vs BY knife-cut demonstrated on 280/236
- [ ] Reverse via ÷-multiplier (0.7/0.8/1.25/1.18) with forward check-back
- [ ] Recovery ladder (5 rows) recited; extension formula for any row
- [ ] Short multiplier chains: +25−20 = 0; +20−20 = −4; −50+50 = −25 from memory
- [ ] \"One architecture\": new = old × multiplier explains every PC2 question I meet

---

**Next:** ⛓️ **PC3 · Successive Changes & Chains** — the a+b+ab/100 engine, why +20%+20% ≠ 40%, depreciation & population chains, price-rise-then-cut classics, and the exam's beloved \"two equal raises and a cut\" puzzles — all powered by the multiplier, so you never add percents again.
