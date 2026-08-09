# 🔢 PP5 · Digits, At-Least & Ranking: The Edge-Case Module

> Ask a hall full of aspirants: "how many 4-digit numbers from {0,1,2,3,4}, no repeats?" and hear a hundred voices shout "5! = 120!" — while 24 of those "numbers" are zero-led FAKES like 0312, which is a 3-digit number in a costume. Welcome to the edge-case module: digit formation with fussy slots, the beautiful 2ⁿ − 1 subset law ("choose at least one promo"), ranking a word in dictionary order, and a cameo from derangements (gift exchanges where SELF-gifting is illegal). Edge cases are where exams harvest marks from the hasty — today we harvest back.

---

## 🎯 Objectives

- Fill **fussy slots first**: zero-first forgery, even/divisibility demands on the units place.
- Count numbers with AND without repetition under digit constraints.
- Apply the **subset law**: ways to choose ANY number of distinct items = 2ⁿ; "at least one" = 2ⁿ − 1.
- **Rank a word** in its alphabetical list (count all words that beat it).
- Meet **derangements !n**: arrangements where NOTHING stays home (0, 1, 2, 9, 44, 265).

---

## 📘 Concepts

### 5.1 The zero-first forgery (fussy slot FIRST)

4-digit numbers from {0,1,2,3,4}, no digit repeats:

```
WRONG: 5! = 120   (0123 & friends are NOT 4-digit numbers!)
RIGHT: [thousands][hundreds][tens][units]
           4     x    4    x   3   x   2   = 96
(thousands: 1-4 only; then 4 digits remain incl. 0)
CHECK: 5! - 4! = 120 - 24 = 96 ✔ (24 fakes had 0 parked up front)
```

**Law:** when one slot plays by tighter rules (leftmost ≠ 0, units must be even), fill THAT slot first. The crowd fills left-to-right; toppers fill fussy-to-free.

### 5.2 Even & divisible constraints (units slot fussy)

3-digit EVEN numbers from {1,2,3,4,5}, no repeats:

```
[units] must be 2 or 4 -> 2 choices
[hundreds][tens] from the remaining 4 digits -> 4 x 3 = 12
ANSWER = 2 x 12 = 24   (fussy units filled FIRST)
```

Divisible-by-5 variant: units must be 5 → 1 × 4 × 3 = **12**. Same skeleton; the fussy slot changes costume.

### 5.3 The 2ⁿ subset law (the most elegant thing in counting)

ShopKart offers 5 different promo add-ons, and a customer may pick ANY of them — all, some, none. Each add-on is IN or OUT:

```
[p1][p2][p3][p4][p5] = 2 x 2 x 2 x 2 x 2 = 32 baskets
Choosing AT LEAST ONE = 32 - 1 (the all-OUT basket) = 31
```

Classic twin: invite at least one of 5 friends to dinner = 2⁵ − 1 = **31**. The law works on any DISTINCT-item "any number" question: sauces, offers, clauses, friends.

### 5.4 Ranking a word (count everything ahead of it)

Rank of TRAK in the dictionary of all words from {A, K, R, T} (sorted: A, K, R, T):

```
T _ _ _ : words starting with A, K, R = 3 x 3! = 18
T R _ _ : second letter A or K beats R  = 2 x 2! = 4
T R A _ : nothing before A beats it      = 0
Last slot fixed                          + 1 (TRAK itself)
RANK = 18 + 4 + 0 + 1 = 23  (of 24 words; only TRKA comes after)
```

Method: walk left to right; at each slot count the alphabetically-smaller letters still available, multiply by the factorial of what remains. Add 1 at the finish line.

### 5.5 Derangements cameo (nothing in its own seat)

ShopKart Secret Santa: nobody may draw their OWN name. Such arrangements are **derangements**, written !n:

```
!1 = 0    !2 = 1    !3 = 2    !4 = 9    !5 = 44    !6 = 265
```

For 4 staff: total gift-loops 4! = 24, but only **9** are self-gift-free. Exams ask the 4–5 person versions; deeper members of the family are dashboard trivia. (PP7 runs the 6-staff Santa at 265.)

---

## 🧪 LAB — Edge-case drills (10 min)

Fussy slot first. Subsets as IN/OUT boxes.

1. Coupon codes: 3-digit codes from 0–9, repetition allowed, but codes must be genuine 3-digit (no leading zero). Count?
2. 4-digit EVEN numbers from {0,1,2,3,4}, no repeats. (Two families: units = 0 vs units ∈ {2,4} — handle both, then add.)
3. New-store launch: customers may take any combination of 6 free sachets. At-least-one baskets?
4. Delivery OTP drill: 4-digit OTPs, digits may repeat. Count. Then the no-repeat version.
5. Rank drill: rank of KART among words from {A, K, R, T}.

**Solutions (hide till done):** 1) 9 × 10 × 10 = **900** · 2) units = 0 → 1 × 4 × 3 × 2 = 24; units ∈ {2,4} (2 choices) → thousands from the 3 remaining nonzero digits, then 3 × 2 → 2 × 3 × 3 × 2 = 36; total 24 + 36 = **60** (cross-check: odd units {1,3} = 2 × 3 × 3 × 2 = 36, and 60 + 36 = 96 = the Q's sibling total ✔) · 3) 2⁶ − 1 = **63** · 4) 10⁴ = **10,000**; 10 × 9 × 8 × 7 = **5,040** · 5) walk KART (sorted A<K<R<T): slot 1 → A is smaller: 1 × 3! = 6; slot 2 → A, nothing smaller remains: 0; slot 3 → R, nothing smaller of {R,T}: 0; +1 → **7** (ranks 7–12 are the K-family; KART heads it ✔).

---

## 💪 Exercises

1. 6 distinct dipping sauces; a customer takes AT LEAST one. Baskets?
2. 4-digit numbers from {0,1,2,3,4}, no repeat — recompute both ways (slots-first AND total-minus-fakes).
3. Rank of TRAK — redo the walk from memory; then rank TRKA.
4. 4 staff, Secret Santa with self-gifting ILLEGAL. Valid draws?
5. 3-digit even numbers from {1,2,3,4,5}, no repeats — fussy unit first.

### ✅ Selected answers

1. 2⁶ − 1 = **63**.
2. 4 × 4 × 3 × 2 = **96**; check: 5! − 4! = 120 − 24 = 96 ✔ (the 24 zero-led fakes).
3. TRAK = **23** (T-block 3 × 3! = 18, slot 2: {A,K} smaller than R → 2 × 2! = 4, slot 3: nothing smaller → 0, +1). TRKA = **24**: same 18 + 4, then slot 3 holds K over available {A,K} → 1 × 1! = 1, +1 → 18 + 4 + 1 + 1 — the dictionary's very last word ✔.
4. !4 = **9**.
5. Units ∈ {2,4} → 2 × 4 × 3 = **24**.

---

## ❓ Quiz

**Q1.** Choose at least one of 5 different promo offers — how many ways?
- (a) 32
- (b) **31 — each offer is IN/OUT (2⁵ = 32 subsets); the all-OUT basket buys nothing, so refund 1: 2ⁿ − 1 is the at-least-one law**
- (c) 25
- (d) 16

**Q2.** 4-digit numbers from {0,1,2,3,4}, no repeat:
- (a) 120
- (b) **96 — thousands slot first (only 1–4 allowed), then 4 × 3 × 2; blind 5! = 120 smuggles in 24 zero-led fakes, so 5! − 4! checks the same answer**
- (c) 100
- (d) 24

**Q3.** The swap-test's verdict when swapping two picks CHANGES the outcome:
- (a) combination
- (b) **permutation — order matters by definition of the test; if nothing changed on swap, it would be a selection (nCr) instead**
- (c) subtraction
- (d) a guess

### ✅ Answers

1. **(b)** — IN/OUT boxes per item; refund the empty basket. At-least-one questions are 5-second questions forever now.
2. **(b)** — fussy slot first, always. The crowd counts 120; analysts count 96 and CHECK with 5! − 4!.
3. **(b)** — one swap, whole classification. Change = permute; no change = combine.

---

## ✅ Mastery checklist — PP5

- [ ] Zero-first forgery named and defeated (96, both methods)
- [ ] Even/divisible units-slot method stated (24 evens)
- [ ] 2ⁿ / 2ⁿ − 1 subset law used on promos, sauces, friends
- [ ] Word-rank walk executed (TRAK = 23, TRKA = 24)
- [ ] Derangement table written cold: 0, 1, 2, 9, 44, 265
- [ ] "Fussy slot first" reflex installed (LAB OTP + coupon)

---

**Next:** ⚡ **PP6 · Traps, Triage & the P&C Mock Arena** — the 5 named traps (ORDER AMNESIA, DOUBLE-COUNT HANGOVER, ZERO-FIRST FORGERY, REPEAT-REFLEX MISS, CIRCLE LINE-UP CONFUSION), the 7-gate pre-solve radar, and a 10-question timed paper with negative marking. Exam-speed, unlocked.
