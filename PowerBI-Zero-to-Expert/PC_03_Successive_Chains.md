# ⛓️ PC3 · Successive Changes & Chains

> Single changes are done. Now the exam stacks them: \"price up 20%, then up 10%\" …\"population grows 10% yearly for 2 years\" …\"machine depreciates 10% per year.\" Students add percents (+20% +10% = +30%? ❌). Toppers multiply multipliers (+20% then +10% = **+32%**). This module gives you the famous **successive formula**, the compounding chains that secretly prepare you for Compound Interest, and the net-zero paradoxes that make examiners grin.

---

## 🎯 Objectives

- Own the successive formula: **net% = a + b + ab/100** — with signs!
- Prefer the **multiplier ladder** when steps get long or the formula gets ugly.
- Run **growth chains** (population, sales) and **decay chains** (depreciation).
- Solve the classic \"raise then equal cut\" paradoxes via net factor.
- Extend to **three changes** and reverse-successive questions.

---

## 📘 Concepts

### 3.1 The successive formula (two changes, one line)

```
net% = a + b + (a × b ÷ 100)          ← signs included (− for cuts/decay)
```

**Why it works:** +a% then +b% = ×(1 + a/100) × (1 + b/100) = 1 + a/100 + b/100 + ab/10,000 → the ab/100 term is the \"compounding\" — the second change acting on the ALREADY changed base.

- +20% then +10%: 20 + 10 + (200/100) = **+32%** (not 30).
- +25% then −20%: 25 − 20 + (25 × −20)/100 = 5 − 5 = **0%** — the perfect healer! (1.25 × 0.8 = 1.00 ✔ recovery-ladder row!)
- +20% then −20%: 20 − 20 + (−400)/100 = **−4%** — order doesn't matter (0.8×1.2 same), the net LOSS persists. Symmetric ±x% always nets **−x²/100**: ±10% → −1%; ±15% → −2.25%; ±25% → −6.25%.

### 3.2 The multiplier ladder (when formula gets heavy)

For exam speed, jumps between forms: two quick changes → formula; repeated/odd changes → multiplier ladder:

- Twice +10%: 1.1 × 1.1 = **1.21 → +21%** (this IS 2-year compound growth at 10% — PC6's CI preview).
- Thrice +10%: 1.1³ = **1.331 → +33.1%** (memorize 1.1² = 1.21, 1.1³ = 1.331, 1.1⁴ = 1.4641 — four exam favorites).
- +50%, −50%, +50%: 1.5 × 0.5 × 1.5 = **1.125 → +12.5%** — ladder crushes what formula fears.

### 3.3 Growth & decay chains (the classics family)

**Population/sales growth:** \"ShopKart's online GMV grows 20% yearly. From ₹50L, after 2 years?\" → 50 × 1.2² = 50 × 1.44 = **₹72L**. Reverse: \"grew from 50 to 72 in 2 equal yearly steps → rate?\" → 72/50 = 1.44 → √1.44 = 1.2 → **20%/year** (square-root of the factor — the 2-yr rate-finding trick!).

**Depreciation:** \"A ₹1,00,000 delivery bike loses 10% value yearly. Value after 2 years?\" → ×0.9² = **₹81,000** (total loss 19%, NOT 20% — decay compounds too). Book-value questions in bank exams are this exact frame.

**The connective tissue:** growth chain = ×(1+r)^n · decay chain = ×(1−r)^n. PC6 will rename these \"compound interest\" and \"depreciating assets\" — you'll already own them.

### 3.4 Reverse-successive (exam dessert)

\"After successive discounts of 20% and 10%, a jacket costs ₹1,440. MRP?\" → surviving multiplier = 0.8 × 0.9 = 0.72 → MRP = 1,440 ÷ 0.72 = **₹2,000** ✔ (PC2's divide-by-multiplier, now for chains). Forward verify: 2,000 − 400 = 1,600; −160 = 1,440 ✔.

\"Single discount equivalent to 20% + 10%?\" → 1 − 0.72 = **28%** (not 30!) — the double-discount illusion ShopKart's marketing uses and your capstone will audit (PC6). Rule: successive-discount equivalent = 1 − product of survivors.

### 3.5 When equal changes end flat — or don't (paradox corner)

- +50% then −33.33%: ×1.5 × 2/3 = ×1.00 → **net 0**. Pair +x with −(100x/(100+x))% and you're flat — the mirror of PC2's ladder, forward direction.
- Two successive 10% hikes followed by one 20% cut: 1.21 × 0.8 = 0.968 → **−3.2%** (three-step nets: ladder wins).

---

## 🧪 LAB — Chain drills on ShopKart (10 min)

1. Online grew +20% in Q1→Q2-FY26 (13.2), then +25% in Q2→Q3-FY26. Net over Q1-FY26?
2. Freeze: Fresh Farms raised input prices +12%, ShopKart froze shelf prices (0%), then FF cut −10.7%. Single-net equivalent?
3. ShopKart delivery fleet ₹40L, depreciates 15%/yr. Book value after 2 years?
4. Successive discounts 30% + 20% on a ₹1,000 mixer in the Diwali sale. Net discount %? Final price?
5. Reverse: after two 10% hikes, salary = ₹96,800. Two years ago it was…?

**Answer key:** 1) ×1.2 × 1.25 = ×1.5 → **+50%** (formula: 20+25+500/100 = 50 ✔). 2) 1.12 × 1 × 0.893 = **≈1.0 → net ≈ 0** (12 − 10.7 − 1.284 ≈ 0.0 ✔ — the perfect-healer pair in the wild!). 3) 40 × 0.85² = 40 × 0.7225 = **₹28.9L** (loss 27.75% over 2 yrs). 4) survivor 0.7×0.8 = 0.56 → net discount **44%**; price **₹560**. 5) 96,800 ÷ 1.21 = **₹80,000** ✔.

---

## 💪 Exercises

1. Formula-only: +15% then +20%. Net?
2. A town's population: 10% growth yearly, 2 years, from 2,00,000. End value? Then find the equivalent 2-year single %.
3. Machine ₹5,00,000 depreciates 20%/yr. Yearly book values for 3 years — ladder them all.
4. \"+40% then cut back to start\" — what % cut? (healer-pair formula)
5. Single discount equal to three successive: 10%, 20%, 25%?

### ✅ Selected answers

1. 15 + 20 + 300/100 = **+38%** (check: 1.15 × 1.2 = 1.38 ✔).
2. 2,00,000 × 1.21 = **2,42,000**; equivalent single = **+21%**.
3. 5,00,000 → 4,00,000 → 3,20,000 → **2,56,000** (×0.8 each; −48.8% total, not −60%!).
4. Cut = 100×40 ÷ 140 = **28.57%** (healer: ÷1.4 = ×5/7).
5. Survivor = 0.9 × 0.8 × 0.75 = 0.54 → equivalent single = **46% off** (54% survives).

---

## ❓ Quiz

**Q1.** Price +20%, then +10% again. The net change is:
- (a) +30%
- (b) **+32% — because the second change acts on the ALREADY raised base; net = a + b + ab/100 = 20 + 10 + 2 = 32** (never add percents — multiply multipliers)
- (c) +22%
- (d) +200%

**Q2.** \"Two successive years of 10% growth\" on ₹50L gives after 2 years:
- (a) ₹60L
- (b) **₹72L — ×1.1² = ×1.21; compounding adds the extra ₹2L of 'growth on growth'** — and this exact ladder IS Compound Interest (PC6 calls it by name)
- (c) ₹70L
- (d) ₹55L

**Q3.** A ₹1,00,000 asset depreciates 10%/year. After 2 years its value is:
- (a) ₹80,000
- (b) **₹81,000 — decay compounds too: ×0.9² = 0.81; total loss 19%, not 20%** — the 'straight-subtraction' answer (80k) is the exam's decoy
- (c) ₹90,000
- (d) ₹85,000

### ✅ Answers

1. **(b)** — the ab/100 compounding term (2 points of pure 'growth on growth'). Multiplier check: 1.32 = 1.2 × 1.1. Choose formula for 2 steps, ladder for more.
2. **(b)** — 1.1² = 1.21 forever. Memorize the 1.1 powers (1.21, 1.331, 1.4641); CI questions will repay you in PC6 and the Interest course.
3. **(b)** — ×0.9 × 0.9 = 0.81. Book-value chains in bank exams are always this frame; the additive decoy (−20% → 80,000) sits in options waiting.

---

## ✅ Mastery checklist — PC3

- [ ] Successive formula with signs runs cold (two changes ≤ 10 s)
- [ ] Multiplier ladder preferred for 3+ steps (and I can SAY why)
- [ ] ±x% symmetric net = −x²/100 table internalized (±10 → −1% …)
- [ ] Growth/decay chains: ×(1±r)^n frames population, sales, depreciation
- [ ] 2-year rate-finding trick: √(factor) → rate
- [ ] Reciprocal healers: +x% undone by −100x/(100+x)% (both directions)

---

**Next:** ⚖️ **PC4 · Comparison Classics & Applied %** — \"A is x% MORE than B\" vs \"B is x% LESS than A\" (the base flip that flips answers), election-vote math, the price-rise-consumption-cut rule x/(100+x), marks-and-fail questions, and salary/expense chains — the everyday classics where the Law of the Base pays for your dinner.
