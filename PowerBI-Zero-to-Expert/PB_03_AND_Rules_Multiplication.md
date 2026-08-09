# ✖️ PB3 · AND Rules: The Multiplication Theorem

> Two coins: both heads? Two cards: both aces? The **AND-side** of probability runs on multiplication — but with one clause that decides your mark: **do the events leave each other alone (independent), or does the first event STARVE the second (dependent)?** Coins never gossip; cards dealt without replacement absolutely do. Today: the two multiplication laws, the starvation mechanics of without-replacement draws, and the bridge formula P(A∩B) = P(A) × P(A|B) that walks us into conditional probability next module.

---

## 🎯 Objectives

- Apply the **independent-multiplication law**: P(A∩B) = P(A) × P(B).
- Apply the **dependent law**: P(A∩B) = P(A) × P(A|B) — the without-replacement engine.
- Contrast **with-replacement vs without-replacement** numerically (1/169 vs 1/221).
- Chain three or more draws without losing numerator/denominator discipline.
- Model ShopKart inspection scenarios as dependent draws.

---

## 📘 Concepts

### 3.1 Independent events: coins don't gossip

Two coin tosses: the first result can't whisper to the second. **Independent** events multiply clean:

```
P(both heads) = 1/2 x 1/2 = 1/4
P(die shows 6 AND coin shows head) = 1/6 x 1/2 = 1/12
P(three heads in a row) = (1/2)^3 = 1/8
```

Test for independence: does one outcome change the other's odds? Coin after coin — no. Die with coin — no. Multiply and move on.

### 3.2 Dependent draws: the without-replacement starvation

Two cards from a deck, both aces, drawn WITHOUT replacement (the card leaves):

```
P(1st ace) = 4/52
P(2nd ace | 1st was ace) = 3/51   <- one ace GONE, one card GONE
P(both aces) = 4/52 x 3/51 = 12/2652 = 1/221
```

WITH replacement (card goes back in): 4/52 × 4/52 = 1/169. Same question, different universe — **replacement is the entire question**. Numerator starves (3 aces left) AND denominator starves (51 cards left). Both move together, always.

### 3.3 The bridge formula: P(A∩B) = P(A) × P(A|B)

The dependent law is really a definition wearing a hard hat: **P(A and B) = P(A) × P(B given A)**. Flip it and you get conditional probability itself — P(B|A) = P(A∩B)/P(A) — which is PB4's entire kingdom. The bag classic, applied:

```
Bag: 5 red, 4 blue. Two drawn without replacement, both red:
P = 5/9 x 4/8 = 20/72 = 5/18
```

### 3.4 Chains of three (no panic, just starvation)

Same bag, three draws all red:

```
P = 5/9 x 4/8 x 3/7 = 60/504 = 5/42
```

Each draw starves both counters by one. Write all three fractions BEFORE multiplying; cancelling early (60/504 → 5/42) keeps arithmetic friendly. (PB5 will redo this in ONE line with combinations — and get the same 5/42. Two roads, one truth — that's how you self-check.)

### 3.5 ShopKart hamper inspection (worked)

QA inspects 2 festive hampers from a batch of 10 that secretly contains 2 defectives. P(both inspected are defective)?

```
P = 2/10 x 1/9 = 2/90 = 1/45 ≈ 2.2%
```

And the flipped question — P(both good) = 8/10 × 7/9 = 56/90 = 28/45. (1/45 + 28/45 + mixed-cases should tile the whole universe — sanity-tiling in the LAB.)

---

## 🧪 LAB — AND-side reps (10 min)

Replacement status declared BEFORE computing. Always.

1. Three coins: P(all heads)? Then four coins.
2. Die + coin: P(odd die AND tail)?
3. Two cards, no replacement: P(both kings)?
4. Two cards, WITH replacement: P(both aces)?
5. Bag (5 red, 4 blue): P(first red, second blue) without replacement — order fixed.

**Solutions (hide till done):** 1) (1/2)³ = **1/8**; (1/2)⁴ = **1/16** · 2) 3/6 × 1/2 = **1/4** · 3) 4/52 × 3/51 = **1/221** (same math as aces) · 4) 4/52 × 4/52 = **1/169** — replacement keeps the world restored · 5) 5/9 × 4/8 = **20/72 = 5/18** — red first concentrates blue's share (4 blues over 8 remaining).

---

## 💪 Exercises

1. A family has 3 children (assume independent, 50-50 each). P(all boys)?
2. Two dice: P(first die 6 AND second die 6)? Then P(both dice even)?
3. Two aces drawn without replacement — recompute and state, in one line, why it's 1/221 and not 1/169.
4. Bag of 5 red + 4 blue: three draws all red — the full three-factor chain with early-cancel.
5. ShopKart inspection: 10 hampers, 2 defective, inspect 2. P(both GOOD) and P(exactly one defective) — then tile the universe.

### ✅ Selected answers

1. (1/2)³ = **1/8**.
2. 1/6 × 1/6 = **1/36**; both even = 3/6 × 3/6 = **1/4** (dice are independent — replacement is built into separate dice).
3. Second draw starves: 3 aces in 51 cards → 1/221; with replacement the deck resets → 1/169.
4. 5/9 × 4/8 × 3/7 = 60/504 = **5/42** (cancel 60 and 504 by 12 early — friendly numbers arrive sooner).
5. Both good: 8/10 × 7/9 = **28/45**; exactly one defective: (2/10 × 8/9) + (8/10 × 2/9) = 16/90 + 16/90 = **16/45**; tile: 1/45 + 28/45 + 16/45 = 45/45 ✔ — the universe check passes.

---

## ❓ Quiz

**Q1.** Two fair coins tossed: P(both heads) =
- (a) 1/3
- (b) **1/4 — independent events MULTIPLY: 1/2 × 1/2; the first coin can't gossip with the second, so each faces fresh 50-50 odds**
- (c) 1/2
- (d) 2/3

**Q2.** Two cards drawn WITHOUT replacement, both aces:
- (a) 1/169
- (b) **1/221 (4/52 × 3/51) — the second pick starves TWICE: one ace gone AND one card gone; silent replacement would have given 1/169 — the exam's favorite costume-swap**
- (c) 1/52
- (d) 4/51

**Q3.** Bag with 5 red + 4 blue; two drawn without replacement, both red:
- (a) 25/81
- (b) **5/18 (5/9 × 4/8 = 20/72) — dependent draws shrink numerator and denominator together; (5/9)² would pretend the ball hopped back in**
- (c) 1/2
- (d) 5/9

### ✅ Answers

1. **(b)** — independence test: does one outcome move the other's odds? Coins: never. Multiply.
2. **(b)** — replacement status IS the question. Declare it before computing, and both counters starve together.
3. **(b)** — the bridge formula doing honest work: P × P(given-it-happened). PB5's one-line combo shortcut confirms 5/42's little sibling here.

---

## ✅ Mastery checklist — PB3

- [ ] Independent multiplication applied (1/4, 1/12, 1/8, 1/16)
- [ ] Without-replacement starvation stated for BOTH numerator and denominator
- [ ] With vs without contrast quantified (1/169 vs 1/221)
- [ ] Bridge formula written: P(A∩B) = P(A)·P(A|B)
- [ ] Three-draw chains chained with early-cancel (5/42)
- [ ] Universe tiling used as self-audit (45/45 hamper check)

---

**Next:** 🕵️ **PB4 · Conditional Probability & Bayes** — the question that rewrites reality: "GIVEN that it happened, now what's the chance?" Conditions shrink universes (king-given-red = 1/13), the two-children classic breaks brains (1/3, not 1/2), and Bayes' natural-frequency method unmasks the fraud detector's dirtiest secret. See you inside the condition.
