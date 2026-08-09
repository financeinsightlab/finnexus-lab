# 🌉 PB5 · Counting Power-Ups: The PP Bridge

> A committee of 5 is picked from 6 men + 4 women — what's the chance it has EXACTLY 2 women? Freshers freeze; you smile, because numerator and denominator are both last course's homework: (4C2 × 6C3) / 10C5 = 120/252 = **10/21**. Probability questions at exam-grade are **counting questions with a denominator** — and the only law you must never break: **count favorable and total with the SAME rules.** Combos upstairs, combos downstairs. This module fuses P&C and probability into one weapon — plus wraps up with odds language so you can read bookmaker-speak.

---

## 🎯 Objectives

- Enforce the **same-rules law**: numerator and denominator counted by the same method.
- Run **combination engines** for selection probabilities (committees, ball bags, samples).
- Counter-attack "at least one" with **complement counting**: 1 − P(none).
- Compute **probability from arrangements** (order worlds: together, alternation).
- Translate **odds ↔ probability** (odds in favor = p : (1−p)).

---

## 📘 Concepts

### 5.1 The same-rules law (the whole module in one line)

```
P(A) = favorable / total
favorable and total MUST come from the same universe-counting:
  picking a group? -> nCr / nCr
  arranging a line? -> nPr / nPr  (or n! / n!)
Mixing them (perms upstairs, combos downstairs) = the classic self-goal.
```

Why it works: whatever order-ghost multiplier r! you could add to the total gets added to favorable too — ghosts cancel in the fraction.

### 5.2 Combination engines (selection worlds)

**Committee (exactly 2 women in 5 from 6M+4W):**

```
favorable = 4C2 x 6C3 = 120   total = 10C5 = 252
P = 120/252 = 10/21 ≈ 0.476
```

**Bag rerun (3 drawn from 5 red + 4 blue, all red):**

```
favorable = 5C3 = 10   total = 9C3 = 84
P = 10/84 = 5/42   <- PB3's starvation chain (5/9 x 4/8 x 3/7) lands the SAME 5/42.
```

Two derivations, one answer: that's not redundancy, that's a built-in audit trail. When sequential-without-replacement (PB3) and combo-counting (here) agree, you can bet your mark on it.

### 5.3 At-least-one: the complement counter-attack

10 festive hampers, 2 secretly defective, QA samples 3. P(at least one defective)?

```
P = 1 - P(sample is ALL good)
  = 1 - 8C3 / 10C3
  = 1 - 56/120 = 64/120 = 8/15 ≈ 0.533
```

The "at least one" phrase toggles the PB2 complement reflex with P&C numerators — the two courses' handshake in a single line. Direct counting (exactly 1 + exactly 2 defective) must agree: (2C1×8C2 + 2C2×8C1)/10C3 = (56 + 8)/120 = 64/120 ✔ — it does.

### 5.4 Probability from arrangements (order worlds)

6 staff line up at random for the annual photo. P(the chai trio stands together)?

```
favorable (order world): PP4's block method -> 4! x 3! = 144
total (order world): 6! = 720
P = 144/720 = 1/5
```

Notice: this one lives in **permutation land** on both floors — because "line up at random" is an arrangement universe. Same-rules law respected, easy mark banked.

### 5.5 Odds language (bookmaker ↔ analyst)

```
odds in favor of A  = P(A) : P(not A)      P = 10/21 -> odds 10:11
odds from odds      = a/(a+b)              10:11 -> P = 10/21
```

Exam phrasings: "odds in favor are 3:2" → P = 3/5. "Odds against 4:1" → P = 1/5. Translate to fractions before touching any theorem — odds are just probability wearing sunglasses.

---

## 🧪 LAB — Bridge drills (12 min)

Same-rules check first. Complement on "at least one".

1. Committee reboot: 5 picked from 6M + 4W — P(exactly 3 men)?
2. Two staff picked from the 6M + 4W pool at random — P(both women)?
3. Hamper QA: 10 hampers, 2 defective, sample of 2 — P(both good)? And P(at least one defective)?
4. Photo line: 6 staff at random — P(Ajay stands at an END)? (Order world.)
5. Odds drill: odds in favor 3:2 → P? Odds against 4:1 → P?

**Solutions (hide till done):** 1) (6C3 × 4C2)/10C5 = 120/252 = **10/21** — same figure as exactly-2-women by design: a 5-seat slate holding 3 men IS a slate holding 2 women, one partition seen from both sides ✔ · 2) 4C2/10C2 = 6/45 = **2/15** · 3) 8C2/10C2 = 28/45; at least one bad = 1 − 28/45 = **17/45** (tile-check: 28/45 + 16/45 + 1/45 = 45/45 ✔) · 4) fix Ajay on an end (2 ways), arrange the rest 5! = 120 → 240 arrangements; total 720 → 240/720 = **1/3** (sleeker: by slot symmetry Ajay lands on an end 2 of 6 positions → 2/6 = 1/3 directly) · 5) 3/5; 1/5.

---

## 💪 Exercises

1. From 6M + 4W, a committee of 5 is formed. P(it includes all 4 women)?
2. Two bulbs picked from 4 (1 secretly dead). P(both picked are good)?
3. Two cards drawn at random without replacement — redo P(both aces) the COMBO way and confirm 1/221.
4. 5 guests sit at random in a row. P(two specific friends sit together)? (Order world; PP4 verbs.)
5. A bookmaker offers odds 7:2 against ShopKart's raffle horse. Convert to probability; then say what P means in the percentage tongue.

### ✅ Selected answers

1. All 4 women in → 5th seat from the men: 6C1 = 6; total 252 → 6/252 = **1/42** ≈ 2.4%.
2. 3C2/4C2 = 3/6 = **1/2**.
3. 4C2/52C2 = 6/1326 = **1/221** ✔ — combo engine matches PB3's starvation chain exactly (audit trail locked).
4. Block the friends: 4! × 2! = 48; total 5! = 120 → 48/120 = **2/5** (sanity: neighbor-pair chance in n! world is 2(n−1)!/n! = 2/n).
5. 2/(7+2) = **2/9 ≈ 22.2%** — "against 7:2" means losing side 7, winning side 2; translate first, pontificate later.

---

## ❓ Quiz

**Q1.** 3 balls drawn from 5 red + 4 blue, ALL red:
- (a) 1/12
- (b) **5/42 (5C3/9C3 = 10/84) — numerator and denominator counted under the SAME combination rules; and PB3's sequential chain (5/9 × 4/8 × 3/7) lands the identical answer — two roads, one truth**
- (c) 5/9
- (d) 1/9

**Q2.** 10 hampers, 2 defective; a sample of 3 — P(at least one defective):
- (a) 3/10
- (b) **8/15 — complement the all-good case: 1 − 8C3/10C3 = 1 − 56/120 = 64/120; the direct (exactly-1 + exactly-2) agrees at 64/120, so the counter-attack is certified**
- (c) 1/6
- (d) 56/120

**Q3.** The cardinal rule of counting-based probability:
- (a) any fraction under 1 is legal
- (b) **favorable/total with BOTH floors counted by the SAME method — combos with combos, arrangements with arrangements; the r! ghosts cancel in the fraction only when they appear on both floors**
- (c) total divided by favorable
- (d) always use permutations

### ✅ Answers

1. **(b)** — same-rules law in action, plus a self-audit via the second derivation.
2. **(b)** — "at least one" = complement, with P&C numerators now. The dual-check is what separates confidence from hope.
3. **(b)** — mixing perms over combos is the classic self-goal; the ghosts only cancel when present on both floors.

---

## ✅ Mastery checklist — PB5

- [ ] Same-rules law stated + ghost-cancellation logic understood
- [ ] Committee engine run (10/21; both-women 2/15; all-women 1/42)
- [ ] Complement counter-attack executed (8/15; 17/45)
- [ ] Arrangement-world probabilities computed (1/5 trio; 2/5 friends; 1/3 ends)
- [ ] Sequential-vs-combo dual derivation matched (1/221, 5/42)
- [ ] Odds ↔ probability translated (3:2 → 3/5; 7:2 against → 2/9)

---

**Next:** ⚡ **PB6 · Traps, Triage & the Probability Mock Arena** — the 5 named traps (BASE-RATE BLINDNESS, REPLACEMENT AMNESIA, DOUBLE-COUNT UNION, GAMBLER'S FALLACY, AT-LEAST-ONE BRUTE FORCE), the 7-step pre-solve scan, and a 10-question paper with negative marking. The exam-hall simulation, probability edition.
