# 🎰 PB1 · Probability Foundations: The Favorable/Total Engine

> Probability is P&C's younger sibling with a job: take the counting you just mastered and give it a DENOMINATOR. **P(event) = favorable outcomes ÷ total outcomes** — one fraction that runs casinos, insurance companies, your loan EMI, and every "what are the odds?" in your life. Freshers memorise formulas; analysts build the outcome table first and let the fraction fall out. Today we install the engine on the three exam animals — coins, dice, cards — plus the ShopKart raffle. By tonight, "what's the chance?" stops being a vibe and starts being a division.

---

## 🎯 Objectives

- State the classical definition: **P = favorable / total**, and when it's legal (equal-likely outcomes).
- Respect the **0-to-1 scale** and the complement preview: P(not A) = 1 − P(A).
- Master the **die & two-dice grid** (36 cells; sum-7 is the luckiest total).
- Master **deck anatomy**: 52 cards = 4 suits × 13 ranks, 26 red, 12 face, 4 aces.
- Convert probabilities ↔ percentages fluently (PC-course handshake).

---

## 📘 Concepts

### 1.1 The definition — and its one condition

```
P(A) = (count of outcomes where A happens) / (count of ALL outcomes)
CONDITION: every outcome must be EQUALLY LIKELY.
Fair coin, fair die, well-shuffled deck: yes. Loaded die: no.
Rigged spinner at a shady mela stall: absolutely not.
```

**Heads on a fair coin** = 1/2. **A 4 on a fair die** = 1/6. If Fresh Farms ever ships a mangoes-first-loaded sampler, the equal-likely assumption dies — and so does your formula. Always check fairness before dividing.

### 1.2 The 0–1 scale (with the percent bridge)

Probability lives between **0** (impossible — drawing a 15 from a deck) and **1** (certain — drawing SOME card). Bridge to your Percentages course: 1/2 = 50%, 1/6 ≈ 16.7%, 3/4 = 75%. Exams bounce between fractions and percents freely; you should too. And the sneakiest law in the whole course, already peeking: **P(not A) = 1 − P(A)** — we weaponize it fully in PB2.

### 1.3 The die & the 36-cell two-dice grid

One die: 6 equal faces. P(even) = 3/6 = **1/2** (faces 2,4,6). P(prime: 2,3,5) = 3/6 = **1/2**. P(7) = **0**.

Two dice unlock the exam's favorite picture — the **36-cell grid** (6 × 6, every cell equally likely). Sum distribution:

```
Sum:        2  3  4  5  6  7  8  9  10 11 12
Ways:       1  2  3  4  5  6  5  4  3  2  1   (total = 36)
P(sum=7)  = 6/36 = 1/6    <- the mountain peak
P(sum=2)  = 1/36           P(sum=12) = 1/36
P(sum>=10)= (3+2+1)/36 = 6/36 = 1/6
```

Why is 7 the peak? It has the most *roads*: 1-6, 2-5, 3-4, 4-3, 5-2, 6-1. Count the roads, don't recite the number.

### 1.4 Deck anatomy (memorize the skeleton, not 52 facts)

```
52 cards = 4 suits (spades, hearts, diamonds, clubs) x 13 ranks
26 red (hearts + diamonds) | 26 black (spades + clubs)
12 face cards (J, Q, K of every suit) - 6 of them red, 6 black
4 aces, 4 kings | each specific card: exactly 1
P(king) = 4/52 = 1/13    P(heart) = 13/52 = 1/4
P(red face) = 6/52 = 3/26    P(the 7 of spades) = 1/52
```

Exam phrasing "a card is drawn at random" = every card equally likely = your green light to divide.

### 1.5 The ShopKart raffle & spin wheel (worked)

**Diwali raffle:** 200 coupons dropped in the drum, 5 winning coupons. P(your coupon wins) = 5/200 = **1/40 = 2.5%**. **Spin wheel:** 8 equal slices, 3 slices read "₹50 off" → P(₹50 off) = **3/8 = 37.5%**. Marketing sells dreams; the analyst counts slices. Same fraction engine, flashier costume.

---

## 🧪 LAB — Foundation reps (10 min)

Outcome counts first, fraction second, percent third.

1. One die: P(a multiple of 3)?
2. Two dice: P(sum = 11)? P(sum = 7 OR 2)? (List the winning cells.)
3. One card: P(a black face card)?
4. Raffle: 40 tickets, 2 winning tickets — P(yours wins)?
5. Spinner: 8 equal slices, 3 give cashback — P(cashback) as fraction AND percent?

**Solutions (hide till done):** 1) multiples of 3 on a die: 3,6 → 2/6 = **1/3** · 2) sum 11: (5-6, 6-5) = 2/36 = **1/18**; sum 7 or 2: 6+1 = 7 cells → 7/36 · 3) 6 black faces (J,Q,K of spades + clubs) → 6/52 = **3/26** · 4) 2/40 = **1/20** · 5) **3/8 = 37.5%**.

---

## 💪 Exercises

1. One die: P(prime) and P(multiple of 3) — compute both, then state which is bigger and why.
2. Two dice: P(sum = 12) and P(sum ≥ 10). Grid-work required.
3. One card: P(black face). One more: P(NOT an ace). (Complement, out loud.)
4. Raffle: 40 tickets, 2 winners — your chance? And P(you DON'T win)?
5. Two ShopKart spin wheels run back-to-back: wheel A has 3/8 cashback slices, wheel B gives cashback on 2 of 8 slices. Which wheel is friendlier, by how many percentage points?

### ✅ Selected answers

1. P(prime) = 3/6 = **1/2** (2,3,5); P(multiple of 3) = 2/6 = **1/3** (3,6). Prime wins — one more favorable face.
2. P(12) = **1/36**; P(≥ 10) = (3+2+1)/36 = **6/36 = 1/6**.
3. Black face = **3/26**; P(not ace) = 1 − 4/52 = 48/52 = **12/13** (complement in one breath).
4. Win = **1/20**; no-win = **19/20** (the pair must sum to 1 — self-check!).
5. A: 3/8 = 37.5%; B: 2/8 = 25% → **A by 12.5 percentage points** (PC-course mirror trick sealing the read).

---

## ❓ Quiz

**Q1.** A fair die shows an EVEN number with probability:
- (a) 1/3
- (b) **1/2 — three of six faces (2, 4, 6): favorable over total with equal-likely outcomes; the whole course lives inside this one fraction**
- (c) 1/4
- (d) 1/6

**Q2.** Two fair dice: P(sum = 7) =
- (a) 1/8
- (b) **1/6 — six winning cells (1-6 through 6-1) out of the 36-cell grid; 7 is the luckiest total because it owns the most roads**
- (c) 1/9
- (d) 5/36

**Q3.** One card from a well-shuffled 52-deck: P(a red FACE card) =
- (a) 1/26
- (b) **3/26 — 6 red faces (J, Q, K of hearts + diamonds) over 52; deck anatomy is the entire exam career of a card question**
- (c) 6/13
- (d) 1/13

### ✅ Answers

1. **(b)** — favorable/total on an equal-likely set. Never skip the fairness check, then divide and walk.
2. **(b)** — the 36-cell grid is the two-dice universe; sums' ways run 1-2-3-4-5-6-5-4-3-2-1.
3. **(b)** — anatomy first: suits, colors, faces, ranks. Every card question is a counting question in a tuxedo.

---

## ✅ Mastery checklist — PB1

- [ ] P = favorable/total stated + the equal-likely condition named
- [ ] 0–1 scale + percent bridge fluency (1/6 ≈ 16.7%)
- [ ] Two-dice grid drawn from memory (ways per sum: 1..6..1)
- [ ] Deck anatomy recited: 4×13, 26 red, 12 face, 4 aces
- [ ] Complement preview used (not-ace = 12/13)
- [ ] Raffle/spinner real-world mapping done (1/40, 3/8)

---

**Next:** ➕ **PB2 · OR Rules: The Addition Theorem** — when can you add probabilities (exclusive events), when must you refund the overlap (hearts AND faces are 3 real cards!), and the complement law that turns "at least one" nightmares into single subtractions. The OR-side of probability, fully armed.
