# ➗ RA2 · Proportion & the k-Constant: One Letter Solves Everything

> Two ratios EQUAL each other — that's a **proportion**: a:b = c:d, with the symmetries of an equation (cross-multiply, invert, swap middles). But the deeper trick the toppers actually run is the **k-constant**: the moment a question says "incomes in the ratio 7:5", you whisper "then incomes are 7k and 5k" — and the whole riddle collapses into one equation in k. Ages problems, savings riddles, coin pouches — all of them die by the same substitution today. Small letter, enormous leverage.

---

## 🎯 Objectives

- Define **proportion** and the cross-product law: a:b = c:d ⟺ ad = bc.
- Compute **fourth proportionals** (3, 4, 6 → 8) and **mean proportionals** (b² = ac → 4, 9 → 6).
- Master the **k-method**: represent ratio quantities as k-multiples and solve.
- Crack the two classic riddle families: **ages** and **income-vs-savings**.
- Apply value-weighting with ratios (coin pouches, mixed rupee counts).

---

## 📘 Concepts

### 2.1 The proportion symmetries

```
a:b = c:d   means   a/b = c/d   and the cross-product law:  a x d = b x c
- Fourth proportional of 3, 4, 6:  3/4 = 6/x  ->  3x = 24 -> x = 8
- Means & extremes: in a:b = c:d, b and c are means, a and d are extremes.
  Product of extremes = product of means. (Same law, old names.)
```

### 2.2 Continued proportion (the b in the middle)

```
a:b = b:c  ->  b^2 = a x c  (b is the MEAN PROPORTIONAL of a and c)
4, x, 9:  x^2 = 36 -> x = 6.   Side-note: 6 is also the geometric mean
of 4 and 9 — the BNS/statistics world salutes from afar.
```

### 2.3 The k-method (the whole module's engine)

Statement: "A and B's ages are in 5:3 and sum to 64."

```
A = 5k, B = 3k  ->  5k + 3k = 64 -> k = 8  ->  ages 40 and 24
BONUS move: "after 6 years?" -> 46 : 30 = 23:15  (ABCD law:
the RATIO moved, the family didn't.)
```

One substitution, one linear equation. Nothing in ratio-land survives this.

### 2.4 Classic family 1 — income & savings riddles

"Incomes are 7:5, expenses 3:2; each saves ₹2,000. Incomes?"

```
Income: 7k and 5k;  Expense: 3m and 2m
7k - 3m = 2,000 ...(i)      5k - 2m = 2,000 ...(ii)
(i) - (ii): 2k - m = 0 -> m = 2k
Sub in (i): 7k - 6k = 2,000 -> k = 2,000
INCOMES = Rs 14,000 and Rs 10,000 ✔ (savings check: 14,000 - 12,000; 10,000 - 8,000 = 2,000 ✔)
```

Two ratios, two letters, two equations, one clean answer. This exact skeleton covers "salary & spending", "marks & cutoffs", "stock & sales" — dozens of exam skins, one skeleton.

### 2.5 Classic family 2 — coin pouches (value-weighting)

A pouch holds 50p : 25p : 10p coins in 2:3:5, worth ₹90 total. How many of each?

```
Coins: 2k, 3k, 5k.  Value: 0.5(2k) + 0.25(3k) + 0.1(5k) = 1.0k + 0.75k + 0.5k = 2.25k
2.25k = 90  ->  k = 40  ->  coins 80, 120, 200
VALUE CHECK: 40 + 30 + 20 = Rs 90 ✔
```

Law: when ratios count OBJECTS but the constraint is RUPEES, weight each k by its unit value first — then the k-method fires.

---

## 🧪 LAB — k-reps (10 min)

Substitute first, solve second, re-check at the end.

1. Fourth proportional to 2, 3, 8?
2. Mean proportional between 2 and 18?
3. Father:son ages 7:4, sum 55. Ages now and the ratio in 5 years?
4. Two engineers earn in 6:5, spend in 4:3, save ₹9,000 each. Salaries?
5. Purse: ₹1 : 50p : 25p coins as 4:6:8, value ₹55. How many of each?

**Solutions (hide till done):** 1) 2/3 = 8/x → x = **12** · 2) x² = 36 → **6** · 3) 7k+4k = 55 → k = 5 → **35 & 20**; +5 years → 40:25 = **8:5** ✔ · 4) 6k − 4m = 9,000; 5k − 3m = 9,000 → subtract: k − m = 0 → m = k → 6k − 4k = 9,000 → k = 4,500 → **₹27,000 & ₹22,500** ✔ · 5) value = 1(4k) + 0.5(6k) + 0.25(8k) = 9k, so the purse total must be a multiple of ₹9 — ₹55 fails the divisibility audit (illegal coin counts), flagging a setter's typo; the clean version is ₹45 → k = 5 → **20, 30, 40 coins** (₹20 + ₹15 + ₹10 = ₹45 ✔). Standing lesson: coin/note riddles always carry totals divisible by the weighted sum — catching an impossible total IS an exam skill.

---

## 💪 Exercises

1. Fourth proportional to 5, 15, 8?
2. Mean proportional between 3 and 27?
3. Daughter:mother ages 1:3; sum 48. After 8 years, the ratio?
4. Rakesh:Arjun monthly income 9:7, spend 4:3, save ₹10,000 each. Incomes?
5. ShopKart petty-cash tin: ₹10 : ₹20 : ₹50 notes as 3:4:2, total ₹640. Count each denomination — and first audit whether ₹640 is even possible.

### ✅ Selected answers

1. 5/15 = 8/x → x = **24**.
2. x² = 81 → **9**.
3. k + 3k = 48 → k = 12 → 12 & 36; +8 → 20:44 = **5:11** ✔.
4. 9k − 4m = 10,000; 7k − 3m = 10,000 → subtract: 2k − m = 0 → m = 2k → 9k − 8k = 10,000 → k = 10,000 → **₹90,000 & ₹70,000** ✔.
5. Value weights: 10(3k) + 20(4k) + 50(2k) = 30k + 80k + 100k = 210k, so admissible totals must be multiples of ₹210 — **₹640 is impossible** (the audit skill from the LAB pays off instantly); the intended clean total is ₹2,100 → k = 10 → **30 notes of ₹10, 40 of ₹20, 20 of ₹50** (₹300 + ₹800 + ₹1,000 = ₹2,100 ✔).

---

## ❓ Quiz

**Q1.** The fourth proportional to 3, 4, 6 is:
- (a) 6
- (b) **8 — 3/4 = 6/x ⇒ 3x = 24; the cross-product law (extremes = means) does every fourth-proportional question in one line**
- (c) 4.5
- (d) 12

**Q2.** Incomes 7:5, expenses 3:2, savings ₹2,000 each. The incomes are:
- (a) ₹12,000 & ₹9,000
- (b) **₹14,000 & ₹10,000 — 7k−3m = 5k−2m gives m = 2k; then 7k − 6k = 2,000, so k = 2,000; the k-method kills the whole riddle family with one substitution**
- (c) ₹21,000 & ₹15,000
- (d) ₹9,000 & ₹7,000

**Q3.** A pouch has 50p:25p:10p coins in 2:3:5 worth ₹90. The count of 50p coins:
- (a) 36
- (b) **80 — value-weight first: 1.0k + 0.75k + 0.5k = 2.25k = 90, so k = 40 and the 50p count is 2k = 80; ratio counts OBJECTS, k gets priced per unit before solving**
- (c) 40
- (d) 120

### ✅ Answers

1. **(b)** — extremes × means symmetry; name the fourth seat and multiply across.
2. **(b)** — two letters, two equations; subtracting them is the universal first move in this family.
3. **(b)** — never solve k on raw counts when the constraint is money; weight by denomination first.

---

## ✅ Mastery checklist — RA2

- [ ] Cross-product law + extremes/means vocabulary
- [ ] Fourth and mean proportionals computed (8; 6)
- [ ] k-method reflex on sum/difference constraints (ages 35 & 20)
- [ ] Income-savings skeleton solved solo (₹14,000 & ₹10,000)
- [ ] Value-weighted pouches cracked (k = 40; note-tin audit lesson)
- [ ] ABCD check on "after N years" variants (23:15; 8:5; 5:11)

---

**Next:** 🤝 **RA3 · Partnerships** — money + months = business: capital × time products, joining mid-year, salary carve-outs before the split, and working-partner logic. The ratio course meets the contract world — ShopKart's own expansion equity, priced fairly.
