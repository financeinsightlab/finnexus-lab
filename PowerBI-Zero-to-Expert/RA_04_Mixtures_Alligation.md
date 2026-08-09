# 🥛 RA4 · Mixtures & Alligation: The Blend Business

> ShopKart's house-brand poha is ₹36/kg grain and ₹56/kg premium flakes crossing at ₹45 — the alligation cross prints 11:9 in five seconds. Bathe 40 litres of milk in repeated replacement (4 litres swapped for water, three times) and exactly 29.16 litres of milk remain — the 0.9³ formula, not page-long arithmetic. Mixtures are ratios with VOLUMES; alligation is ratios with DISTANCES; and the replacement law is compound interest in negative territory (NS6/INT handshakes everywhere). Blend week, bro.

---

## 🎯 Objectives

- Run the **alligation cross** for any two components + target mean (prices, concentrations, marks).
- Apply the **replacement formula**: remaining = V × (1 − x/V)ⁿ, exactly.
- Compute **two-vessel marriages** (mixing equal or weighted quantities).
- Solve **water-adding / pure-adding** adjustments to hit a target ratio.
- Price mixtures for a target profit (PL4 → RA4 graduation).

---

## 📘 Concepts

### 4.1 The alligation cross (inverse distances)

```
Blend cheaper (36/kg) with dearer (56/kg) for a mean of 45/kg:
        cheaper qty : dearer qty  =  (56 - 45) : (45 - 36) = 11 : 9
RULE: quantity ratios run INVERSE to price-distances from the mean.
CHECK: (11 x 36 + 9 x 56) / 20 = (396 + 504) / 20 = 900/20 = Rs 45 ✔
```

Works on ANY mean problem: concentrations (spirit%), average marks of merged classes, alloy purities, interest blends (RA/INT course handshake). One cross, infinite costumes.

### 4.2 The replacement law (the milk classic)

From 40 L pure milk, 4 L is drawn and replaced with water — repeated 3 times:

```
Milk remaining = 40 x (1 - 4/40)^3 = 40 x 0.729 = 29.16 L
Water = 40 - 29.16 = 10.84 L
FORMULA: after n replacements of x L from V L of pure liquid,
pure left = V (1 - x/V)^n      (compound decay, our CI engine in exile)
```

Each replacement removes x L of the CURRENT MIX (not pure milk) — that's why it's geometric decay, not linear subtraction. 40 − 12 = 28 is the fresher's wrong answer; 29.16 is physics.

### 4.3 Two-vessel marriages

Vessel A has milk:water 5:3, vessel B has 7:5. Equal quantities mixed — final ratio?

```
Milk fraction in A = 5/8;  in B = 7/12
Take 24 L from each (LCM of 8 and 12):
Milk = 15 + 14 = 29 L, Water = 9 + 10 = 19 L  ->  milk:water = 29:19 ✔
```

Method: convert to common-total parts, add the numerators. Weighted mixing? Scale each vessel by its quantity first — same recipe.

### 4.4 Water-adding & strength-fixing

A 40 L mix has milk:water 5:3 (25 milk, 15 water). How much WATER must be added for ratio 5:7?

```
Milk stays 25 L (water-adding never touches milk)
Target: 25 / total-water-parts... directly: 25 : (15 + w) = 5 : 7
-> 15 + w = 35 -> w = 20 L ✔      CHECK: 25:35 = 5:7 ✔
```

The component you DON'T touch is the anchor — hold it fixed and solve one ratio equation. Pure-adding works the mirror way (anchor the water, add milk).

---

## 🧪 LAB — Blend reps (12 min)

Cross for means. Anchor for additions. Formula for replacements.

1. Alligation: dal at ₹72/kg blends with ₹128/kg for a ₹96 mean. Ratio?
2. Spirit blend: 30% and 60% spirit solutions for a 45% tincture. Ratio?
3. Replacement: 60 L of pure juice; 6 L replaced with water, 4 times. Juice left? (Formula, exact.)
4. Anchor drill: a 36 L mix at 7:5 milk:water (milk-share 58.3%) must reach 7:2 (77.8%). Which component gets added, milk or water — and how much?
5. Two vessels: 3:2 and 5:4 milk:water; 9 L from the first, 18 L from the second are mixed. Final milk:water?

**Solutions (hide till done):** 1) (128−96):(96−72) = 32:24 = **4:3** (cheaper:dearer) ✔ · 2) (60−45):(45−30) = 15:15 = **1:1** ✔ · 3) 60 × (1 − 6/60)⁴ = 60 × 0.9⁴ = 60 × 0.6561 = **39.366 L** ✔ (never 60 − 24 = 36!) · 4) water is the anchor at 5/(12) × 36 = 15 L; milk 21 L; new milk = 21 + m with 15 water in 7:2 → (21+m)/15 = 7/2 → 21 + m = 52.5 → **add 31.5 L milk** ✔ · 5) first: milk 3/5×9 = 5.4, water 3.6; second: milk 5/9×18 = 10, water 8 → totals 15.4 : 11.6 = **77:58** ✔ (as decimals dividing to 1:0.7527 ≈ 15.4:11.6; ×5 = 77:58 exact).

---

## 💪 Exercises

1. Two rice grades ₹40 and ₹65 must blend at ₹55/kg sold to gain... first, the blend ratio for mean CP ₹50.
2. A teacher merges sections averaging 70 and 82 marks into a 76-average class. Section-size ratio?
3. 50 L of milk at 100% purity has 5 L replaced with water, twice. Concentration of milk in the final mix?
4. A 90 L alloy holds zinc:copper 2:3. How much ZINC to add for 1:1?
5. FF ghee comparison: vessel X cream:ghee 1:4, vessel Y 3:7; 10 L of X and 20 L of Y mixed — cream fraction in the blend?

### ✅ Selected answers

1. (65−50):(50−40) = 15:10 = **3:2** (cheaper:dearer) — then selling at ₹55 gives ₹5 margin on ₹50 → exam-law 10% ✔ (the price chain PL3 would applaud).
2. (82−76):(76−70) = 6:6 = **1:1** — equal sections (the cross marks people too, not just prices).
3. 50 × (1 − 5/50)² = 50 × 0.81 = 40.5 L milk → concentration = 40.5/50 = **81%** ✔ (NEVER 100 − 20 = 80).
4. Copper anchor 54 L; zinc 36 L + z → (36+z)/54 = 1 → z = **18 L** ✔ (verify: zinc 54, copper 54 → 1:1; new total 108 L).
5. Cream: 1/5×10 + 3/10×20 = 2 + 6 = 8 of 30 L → **8/30 = 4/15 ≈ 26.7%** ✔ — weighted-fraction mixing, one line per vessel.

---

## ❓ Quiz

**Q1.** 40 L pure milk; 4 L drawn-and-replaced with water, 3 times. Milk remaining:
- (a) 28 L
- (b) **29.16 L — V(1 − x/V)ⁿ = 40 × 0.9³ = 40 × 0.729; each pull takes the CURRENT mix, so decay is geometric, never linear (the fresher's 28 L died of straight-line subtraction)**
- (c) 29.6 L
- (d) 32 L

**Q2.** ₹36/kg and ₹56/kg grains for a ₹45 mean — the blend ratio:
- (a) 9:11
- (b) **11:9 — the cross says quantities run inverse to distances from the mean: (56−45):(45−36) = 11:9, with (11×36 + 9×56)/20 = ₹45 verifying behind the curtain**
- (c) 4:5
- (d) 1:1

**Q3.** Vessels A (5:3) and B (7:5) milk:water — equal quantities mixed gives:
- (a) 6:4
- (b) **29:19 — common-total method: take 24 L each (LCM 8, 12), milk 15 + 14 = 29, water 9 + 10 = 19; fractions marry at common totals, never by adding ratios like 12:8**
- (c) 29:21
- (d) 3:2

### ✅ Answers

1. **(b)** — the replacement formula; geometric decay is the entire physics of repeated mixing.
2. **(b)** — inverse-distances law; blend questions die against a five-second cross.
3. **(b)** — adding ratios term-to-term is the classic self-goal; common totals are the only legal aisle.

---

## ✅ Mastery checklist — RA4

- [ ] Alligation cross executed + verified (11:9; 4:3; 1:1)
- [ ] Replacement law applied exactly (29.16 L; 39.366 L; 81%)
- [ ] "Never linear" mantra installed (geometric decay reasoning)
- [ ] Two-vessel common-total method run (29:19)
- [ ] Anchor-fraction solving for additions (add 20 L water; 18 L zinc; 31.5 L milk)
- [ ] Price-blend chains into profit% (₹50 blend → ₹55 tag → 10%)

---

**Next:** ⚡ **RA5 · Ratio Traps & the Mock Arena** — the five traps (WHOLE-PART FLIP, UNIT SNEAK, MIDDLE-TERM MISMATCH, TIME DILUTION, ADD-SPLIT CONFUSION), the 5-gate radar, and a 10-question paper. Then RA6 prices the Gurugram expansion equity, partner by partner.
