# 🎲 PP1 · The Two Rules of Counting: × for AND, + for OR

> Permutations & Combinations is where aptitude exams separate the memorizers from the counters. Students freeze at 10C3 because nobody taught them the two sentences that generate EVERY formula in this course. Sentence one: **when decisions chain together (this AND that), MULTIPLY.** Sentence two: **when choices compete (this OR that), ADD.** That's it, bro. Every nPr, every nCr, every committee, every round table in the next six modules is these two rules wearing costumes. Install them today and P&C stops being fear and starts being arithmetic.

---

## 🎯 Objectives

- State and apply the **multiplication rule** (AND → ×) and the **addition rule** (OR → +).
- Decide in 2 seconds whether a scenario chains (×) or forks (+).
- Build **slot diagrams** — the rough-shelf sketch that turns word problems into products.
- Master the **factorial ladder** and why **0! = 1** is a law, not a mystery.
- Meet Excel's counting squad: `FACT`, `PERMUT`, `PERMUTATIONA`, `COMBIN`, `COMBINA` (deep dives in PP2/PP3).

---

## 📘 Concepts

### 1.1 The multiplication rule (AND → ×)

**ShopKart uniform problem.** The Delhi head office issues: 3 shirt designs AND 4 pant colors. Every staffer needs one shirt AND one pant. How many distinct uniforms?

```
Slot thinking:   [shirt] x [pant]  =  3 x 4  =  12 uniforms
Why multiply?    Shirt 1 pairs with ALL 4 pants. So does Shirt 2.
                 3 shirts x 4 pants each = 12 rows in the full grid.
```

The **grid test:** if you can draw a table where picking row R still allows every column C, the decisions are independent, and the count is rows × columns. AND-decisions with a grid = multiplication. Always.

**Delivery route chain.** Delhi → Jaipur has 3 highway options; Jaipur → Udaipur has 2. A ShopKart truck going Delhi → Jaipur → Udaipur: 3 × 2 = **6 routes**. Each first-leg choice can pair with every second-leg choice. Chains multiply.

### 1.2 The addition rule (OR → +)

**Canteen coupon night.** The Karol Bagh store canteen offers a free snack: pick ONE item from 4 veg options OR 5 non-veg options. How many possible snacks? 4 + 5 = **9**. You're choosing from ONE combined buffet; the word OR splits it into exclusive trays whose counts ADD.

**The law in one line:** mutually exclusive categories → add. Chained decisions → multiply. The killer exam skill is hearing AND vs OR inside a paragraph: "a shirt and a pant" (×) vs "a veg or a non-veg snack" (+).

### 1.3 Mixed chains: sum of products

**Full snack combo.** Canteen upsells: choose (one of 4 veg OR one of 5 non-veg) AND one of 3 drinks.

```
Tray count (OR):  4 + 5 = 9 snacks
Chain (AND):      9 x 3 = 27 combos
```

Read it as: (4 + 5) × 3. Forks first (add), chain after (multiply). This pattern — small sum inside, one product outside — solves half of all exam counting questions.

### 1.4 Slot diagrams: the rough-shelf sketch

**4-digit UPI PIN, digits may repeat.**

```
[ thousands ][ hundreds ][ tens ][ units ]
     10      x    10      x  10   x   10   =  10,000 PINs
```

One box per decision, choice-count inside, multiply across. If repetition were BANNED: 10 × 9 × 8 × 7 = **5,040** — each slot steals one option from the next. Slots make repetition questions a 10-second job. Draw the boxes first, always.

### 1.5 The factorial ladder (n! = the full line-up count)

Arrange n DISTINCT items in a row: n choices for slot 1, (n−1) for slot 2, ... down to 1. Product = **n!** = n × (n−1) × ... × 2 × 1.

```
0! = 1     1! = 1     2! = 2      3! = 6       4! = 24
5! = 120   6! = 720   7! = 5,040  8! = 40,320  9! = 362,880   10! = 3,628,800
```

**Why is 0! = 1?** Because there's exactly ONE way to arrange an empty shelf: do nothing. It's also load-bearing for formulas — PP3's `nCr = n!/(r!(n−r)!)` only returns a sensible 1 when r = 0 or r = n BECAUSE 0! = 1.

**Growth shock:** 10! ÷ 9! = 10. Each new person multiplies the line-up count by the new n. Factorials explode faster than any salary increment you will ever negotiate. (PC3's successive-changes law waves hello.)

**Excel:** `=FACT(8)` → 40,320.

### 1.6 The ShopKart banner factory (worked example)

Ajay's marketing team builds a Diwali banner: 3 hook lines AND 2 background colors AND 2 sizes. Variants = 3 × 2 × 2 = **12**. Now add OR: a third supplier offers 1 exclusive festive size available only with gold background:

```
In-house variants:      3 x 2 x 2 = 12
Supplier exclusive:     3 x 1 x 1 = 3   (gold only, one size)
Total (fork of chains): 12 + 3 = 15 banners
```

Sum of products again. Forks (OR) add complete chains; chains (AND) multiply slots. One law, infinite costumes.

---

## 🧪 LAB — Counting reps (10 min)

Grab your rough sheet. Slot diagrams mandatory.

1. **Uniform 2.0:** ShopKart adds 2 belt options to the 3 shirts × 4 pants. Total uniforms now?
2. **Store visit OR:** An auditor visits EITHER the Rohini store (1 way) OR the Dwarka store (1 way) OR stays home (1 way). How many outcomes? (Yes — trivial. Land the + reflex.)
3. **Coupon slots:** A promo code is [letter][letter][digit][digit], letters/digits may repeat. How many codes?
4. **Manager passcode:** 4 digits from 0–9, NO digit repeats. Slot it.
5. **Meal deal:** pick (one of 4 veg OR one of 5 non-veg mains) AND (one of 3 drinks) AND (one of 2 desserts). Sum-inside-product.

**Solutions (hide till done):** 1) 3×4×2 = **24** · 2) 1+1+1 = **3** · 3) 26×26×10×10 = **67,600** · 4) 10×9×8×7 = **5,040** · 5) (4+5)×3×2 = **54**.

---

## 💪 Exercises

1. 5 shirts AND 4 trousers AND 2 belts — outfit count?
2. Metro food court: 4 veg counters OR 5 non-veg counters, you eat ONE dish. Choices?
3. Scooter showroom: 3 models AND 5 colors AND 2 variants (standard/deluxe). Total configurations?
4. Compute 7! from memory, then verify against the 8! ladder entry (8! ÷ 8).
5. Toss a coin AND roll a die. Outcomes? Now: toss a coin OR roll a die (one act only). Compare the two answers and state, in one line, why they differ.

### ✅ Selected answers

1. 5 × 4 × 2 = **40** — three chained decisions, one product.
2. 4 + 5 = **9** — OR forks the buffet into exclusive trays.
3. 3 × 5 × 2 = **30** configurations.
4. 7! = **5,040** (check: 40,320 ÷ 8 ✔).
5. Coin AND die: 2 × 6 = **12** grid pairs; coin OR die: 2 + 6 = **8** single outcomes. Chaining multiplies possibilities (both happen together); forking adds them (only one ever happens).

---

## ❓ Quiz

**Q1.** ShopKart uniform: 3 shirts AND 4 pants. Distinct uniforms:
- (a) 10
- (b) **12 — AND-rule: shirt AND pant are chained decisions, so 3 × 4; every shirt meets every pant in the grid**
- (c) 7
- (d) 24

**Q2.** A 4-digit UPI PIN (digits may repeat) has how many possibilities?
- (a) 5,040
- (b) **10,000 — four slots, 10 choices each, repetition allowed: 10⁴; the no-repeat variant is 10 × 9 × 8 × 7 = 5,040 — a different question entirely**
- (c) 40,000
- (d) 1,111

**Q3.** 0! equals:
- (a) 0
- (b) **1 — by LAW: exactly one way to arrange an empty shelf (do nothing); it also keeps nCr = 1 consistent when r = 0 or r = n (PP3 rides on this)**
- (c) undefined
- (d) infinity

### ✅ Answers

1. **(b)** — chained decisions multiply. If it feels like a grid, it's a product.
2. **(b)** — slot-product with repetition: choices^slots. No-repeat pulls one candidate out per slot; always draw the boxes.
3. **(b)** — 0! = 1 is a convention with a job: it makes every coming formula behave at the edges.

---

## ✅ Mastery checklist — PP1

- [ ] AND → ×, OR → + stated without notes
- [ ] Grid test applied to justify a multiplication
- [ ] Slot diagrams drawn BEFORE any arithmetic (UPI PIN proof)
- [ ] Factorial ladder memorized through 10!
- [ ] 0! = 1 explained (empty shelf + nCr edge cases)
- [ ] Sum-of-products (fork of chains) read in one pass (banner factory)

---

**Next:** 🏅 **PP2 · Permutations: Order Rules** — the nPr slot-product, arranging people and words, the repeated-letters law (SHOPKART vs KIRANA vs MISSISSIPPI), and Excel's PERMUT/PERMUTATIONA duo. When ORDER matters, the counting gets louder.
