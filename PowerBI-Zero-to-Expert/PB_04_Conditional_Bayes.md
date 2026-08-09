# 🕵️ PB4 · Conditional Probability & Bayes: Probability Inside a Condition

> "What's the chance this flagged ShopKart vendor is ACTUALLY fraudulent?" If you answer 90% because "the detector is 90% accurate" — welcome to the most expensive misconception in analytics. **Conditional probability** is probability with your sample space surgically shrunk by a GIVEN: P(A | B) reads "chance of A, given B already happened." It's the engine behind fraud screens, credit scores, medical tests — and a beautiful little formula whose natural-frequency version you can run on a napkin. Let's go break some intuitions, starting with a red card.

---

## 🎯 Objectives

- Read and apply the **condition-shrinks-the-universe** rule before any formula.
- Use the formal definition: **P(A|B) = P(A∩B) / P(B)**.
- Test **independence** cleanly: does the condition move the odds at all?
- Run the **natural-frequency method** (counts per 1,000) instead of drowning in Bayes algebra.
- Expose **base-rate blindness** — why a 90%-accurate screen can still be wrong 2 times out of 3.

---

## 📘 Concepts

### 4.1 The condition shrinks the universe

A card is drawn and you're TOLD it's red. P(king | red)?

```
New universe: only the 26 red cards (the GIVEN deleted the rest)
Winners inside: 2 red kings
P(king | red) = 2/26 = 1/13
```

Notice P(king) is also 1/13 — the condition moved nothing (we'll use that in 4.3). Try the other direction: P(heart | face) = 3/12 = 1/4, which DOES equal P(heart) = 13/52 — suits are perfectly balanced, so face/red conditions leave each other's odds unmoved. But swap in an uneven overlap — P(ace | face) = 0/12 = 0 versus P(ace) = 1/13 — and the condition bulldozes the answer. Conditions rewrite probabilities WHENEVER they overlap unevenly with your event.

### 4.2 The formal law (and its source)

```
P(A | B) = P(A and B) / P(B)
```

It's PB3's bridge flipped: P(A∩B) = P(B) × P(A|B). Example: die shows an even number; P(it's a 6 | even) = P(6)/P(even) = (1/6)/(1/2) = **1/3** — matches the shrunken universe {2,4,6}. Always prefer the shrunken-universe count when the grid is small; keep the formula for when counts are hidden inside other probabilities.

### 4.3 The independence test

If P(A | B) = P(A), then B's info is USELESS for A → A and B are **independent**. King-vs-red: 1/13 = 1/13 → independent. Rain in Delhi vs your coin flip: obviously independent. First-card-ace vs second-card-ace (no replacement): 3/51 ≠ 4/52 → dependent. One equality check = the entire independence machinery.

### 4.4 The two-children classic (BR-course handshake)

A Sharma-family conversation: "We have two children; at least one is a boy." P(both boys)?

```
Full space: BB, BG, GB, GG (equal quarters)
GIVEN at least one boy -> delete only GG
Survivors: BB, BG, GB -> P(BB) = 1/3
```

Change the info to "the ELDER is a boy": survivors shrink to BB, BG → **1/2**. One extra word of specificity edited the survivor pool differently — same family, different information, different probability. Conditions edit the sample space, not your confidence. (Blood Relations students: same "given" discipline as "pointing to a photograph" chains.)

### 4.5 Bayes by natural frequencies (the fraud-detector reveal)

ShopKart's vendor screen: **2%** of vendors are fraudulent; the scanner catches **90%** of fraud (sensitivity) but false-alarms on **5%** of clean vendors. A vendor is FLAGGED. P(truly fraudulent | flagged)?

Natural frequencies per 1,000 vendors (counts, not percents — percents lie on napkins, counts don't):

```
Fraudulent: 20  -> caught: 18 (90%), missed: 2
Clean:    980  -> false alarms: 49 (5%)
Flagged total = 18 + 49 = 67 TRUE-AND-FALSE flags
P(fraud | flagged) = 18/67 ≈ 26.9% ≈ 27%
```

A "90% accurate" machine, yet 2 of 3 flagged vendors are INNOCENT. Not the machine's fault — the **base rate** (2%) built a 49-strong innocent crowd next to the 18 real catches. **Law:** when the thing you hunt is rare, even good tests mostly flag the innocent. Every audit head, doctor, and credit officer learns this once — memorably.

---

## 🧪 LAB — Condition drills (12 min)

Shrink the universe first. Counts per 1,000 for Bayes.

1. Card drawn is a HEART. P(it's the queen)?
2. Die shows a number above 2. P(even | above 2)?
3. Two children; the elder is a boy. P(both boys)?
4. Recompute the vendor screen with a 10% false-alarm rate (keep 2% base, 90% catch). What happens to 18/67?
5. Independence verdict, one card: is "being a face card" independent of "being red"? (Compare P(face) vs P(face | red).)

**Solutions (hide till done):** 1) universe = 13 hearts holding 1 queen → **1/13** · 2) universe {3,4,5,6}; evens {4,6} → 2/4 = **1/2** · 3) survivors BB, BG → **1/2** (specificity shrank the pool further than "at least one") · 4) 980 × 10% = 98 false alarms; 18/(18+98) = 18/116 ≈ **15.5%** — double the false-alarm rate and the screen's credibility halves; alarm hygiene matters as much as sensitivity · 5) P(face) = 12/52 = 3/13; P(face | red) = 6/26 = 3/13 → EQUAL → **independent** (red's 50-50 split is mirrored inside faces).

---

## 💪 Exercises

1. A card is drawn and turns out to be black. P(it's a spade | black)?
2. A die shows a prime. P(it's 2 | prime)?
3. ShopKart coupon fraud screen: base rate 10%, sensitivity 90%, false-alarm 10%. Per-1,000 natural-frequency table → P(fraud | flagged)?
4. Write the two reversed conditionals from the fraud screen and explain, in one line, why confusing them is dangerous.
5. Verdict with proof: are "first card ace" and "second card king" (no replacement) independent?

### ✅ Selected answers

1. Universe = 26 blacks holding 13 spades → **1/2**.
2. Primes on a die {2,3,5} → 1 of 3 → **1/3**.
3. Fraud 100 → caught 90; clean 900 → false alarms 90; flagged 180 → 90/180 = **1/2** — a fatter base rate (10% vs 2%) rescued the screen's credibility: 27% → 50%.
4. P(flag | fraud) = 90% vs P(fraud | flag) ≈ 27% — the screen's brochure quotes the first; risk decisions live on the second; swapping them is how innocent vendors get banned.
5. P(2nd king) = 4/52… by symmetry 1/13; P(2nd king | 1st ace) = 4/51 ≠ 1/13 → **dependent** (the ace's escape enriched every other rank slightly).

---

## ❓ Quiz

**Q1.** A drawn card turned out RED. P(it is a king | red):
- (a) 4/52
- (b) **1/13 — the condition shrinks the universe to 26 red cards holding 2 kings: 2/26; the full deck is now officially irrelevant**
- (c) 2/13
- (d) 1/52

**Q2.** A family has two children, AT LEAST one a boy. P(both boys):
- (a) 1/2
- (b) **1/3 — the given deletes only the GG cell, leaving BB, BG, GB; one of three; conditions edit the sample space, never your swagger**
- (c) 1/4
- (d) 2/3

**Q3.** Fraud base rate 2%; screen catches 90% of fraud, false-alarms 5% of clean. A flagged vendor is truly fraudulent with probability about:
- (a) 90%
- (b) **27% — per 1,000: 18 real catches vs 49 false alarms, 18/67; the rare-thing law: even good tests mostly flag the innocent when the base rate is thin**
- (c) 95%
- (d) 2%

### ✅ Answers

1. **(b)** — shrink the universe to the given, then count winners inside it. Formula optional, survival-pool mandatory.
2. **(b)** — specificity is everything: "at least one" (1/3) vs "the elder" (1/2) is the same family wearing different information.
3. **(b)** — natural frequencies beat algebra on napkins: counts of 18 and 49 tell the whole base-rate story.

---

## ✅ Mastery checklist — PB4

- [ ] Universe-shrink reflex: given stated → universe redrawn → counted
- [ ] Formal law applied (die-even → 1/3) and matched against shrunk-universe
- [ ] Independence tested by comparing P(A) vs P(A|B)
- [ ] Two-children pair distinguished (1/3 vs 1/2)
- [ ] Natural-frequency Bayes run: 18/67 ≈ 27% and the 10%-alarm variant (15.5%)
- [ ] Reversed-conditionals danger stated (brochure vs risk figure)

---

**Next:** 🌉 **PB5 · Counting Power-Ups: The PP Bridge** — probability questions where favorable AND total both need P&C firepower: committees (10/21), all-red draws redone in one line, the at-least-one complement counter-attack (8/15), and probability-from-arrangements (1/5). Your PP7 counting meets its denominator. This is where the two courses fuse.
