# ➕ PB2 · OR Rules: The Addition Theorem & the Mighty Complement

> "What's the chance the card is a king OR a queen?" Easy — add. "Heart OR face card?" Careful, bro — three cards are BOTH, and blind addition counts them twice. The **addition theorem** is probability's OR-gate: exclusive events add clean, overlapping events need a refund. And its partner in crime — the **complement law** P(not A) = 1 − P(A) — is how toppers murder every "at least one" question in one line while the hall writes an essay. Two laws, one module, half the exam.

---

## 🎯 Objectives

- Apply the **exclusive-addition law**: P(A ∪ B) = P(A) + P(B) when A, B can't co-occur.
- Apply the **general (inclusion–exclusion) law**: P(A ∪ B) = P(A) + P(B) − P(A∩B).
- Wield the **complement law**: P(not A) = 1 − P(A) — especially for "at least one".
- Recognize **exhaustive** event sets (all probabilities sum to 1).
- Frame overlaps in ShopKart customer terms (basket-set logic).

---

## 📘 Concepts

### 2.1 Exclusive events: the clean add

**Mutually exclusive** = no outcome belongs to both. King OR queen?

```
P(king or queen) = 4/52 + 4/52 = 8/52 = 2/13
```

No card is simultaneously king and queen, so adding is legal. Test-first habit: ask "can BOTH happen on the same draw?" If the answer is NO — add with joy.

### 2.2 Overlapping events: inclusion–exclusion (the refund)

Heart OR face card? Three cards (J♥, Q♥, K♥) are BOTH. Blind addition counts them twice:

```
P(heart or face) = 13/52 + 12/52 - 3/52 = 22/52 = 11/26
                 = P(A) + P(B) - P(A and B overlap)
```

**Law:** P(A ∪ B) = P(A) + P(B) − P(A∩B). The exclusive version is just the overlap = 0 special case. One law; check overlap before adding. (PP6's DOUBLE-COUNT HANGOVER trap, now in probability robes.)

### 2.3 ShopKart basket overlap (worked)

Loyalty data: 60% of bill-scans contain atta, 50% contain rice, 30% contain BOTH. P(a bill has atta OR rice)?

```
0.60 + 0.50 - 0.30 = 0.80 = 80%
```

Skip the refund and you'd swear 110% of customers buy them — and 110% probabilities are how analysts get laughed out of review meetings. The 30% both-set is the overlap; subtract it ONCE.

### 2.4 The complement law: 1 − P(A) — the "at least one" destroyer

Scenario: throw a die 4 times; P(at least one six)? Counting the hit-cases directly = a horror franchise (exactly 1, exactly 2, ... and their multiplicities). Flip the camera:

```
P(at least one six) = 1 - P(NO sixes in 4 throws)
                    = 1 - (5/6)^4
                    = 1 - 625/1296 = 671/1296 ≈ 0.518
```

One subtraction. The miss-side is one clean product; the hit-side is a zoo. **Exam reflex:** the phrase "at least one" should autocomple COMPLEMENT in your brain before your pen moves.

### 2.5 Exhaustive sets: everything sums to 1

All-miss and any-hit partition the universe → 0.482 + 0.518 = 1 ✔ (self-check your arithmetic every time). Same law runs ShopKart promo splits: 37.5% cashback + 62.5% no-cashback = 100%. If your event groups don't sum to 1, you either dropped a case or double-counted one — the universe doesn't do 110%.

---

## 🧪 LAB — OR-side reps (10 min)

Overlap-check BEFORE adding. Complement when you hear "at least".

1. One card: P(ace OR king)?
2. One card: P(face OR spade)?
3. Two dice: P(sum = 7 OR 11)?
4. Two coins: P(at least one head)? (Complement!)
5. Loyalty rerun: 40% detergent, 35% soap, 15% both — P(detergent OR soap)?

**Solutions (hide till done):** 1) exclusive: 4/52 + 4/52 = **2/13** · 2) 12/52 + 13/52 − 3/52 = 22/52 = **11/26** (3 face-spades refunded) · 3) exclusive sums: 6/36 + 2/36 = 8/36 = **2/9** (a single throw can't be two sums) · 4) 1 − P(TT) = 1 − 1/4 = **3/4** · 5) 0.40 + 0.35 − 0.15 = **0.60**.

---

## 💪 Exercises

1. P(rolling a 3 OR a 5) on one die — justify the add in five words.
2. P(club OR queen) from 52 — full inclusion–exclusion layout.
3. A die is thrown twice: P(at least one 6)? (Complement law only — show the one-liner.)
4. 70% of ShopKart app users browse the grocery tile, 50% browse fashion, 30% browse both. P(browses grocery OR fashion)? And P(browses neither)?
5. Claim-audit: a junior analyst reports P(atta OR rice) = 110%. Write the two-sentence correction you'd send.

### ✅ Selected answers

1. 1/6 + 1/6 = **1/3** — same face can't be both numbers (exclusive).
2. 13/52 + 4/52 − 1/52 = 16/52 = **4/13** (only the Q♣ overlaps).
3. 1 − (5/6)² = 1 − 25/36 = **11/36** (one subtraction vs a casework swamp).
4. 0.70 + 0.50 − 0.30 = **0.90**; neither = 1 − 0.90 = **0.10** (complement chain).
5. Probabilities cap at 100%; your junior added the 30% both-set twice — refund it once and the honest figure is 80%.

---

## ❓ Quiz

**Q1.** P(king OR queen) from 52 cards:
- (a) 2/26
- (b) **2/13 — mutually exclusive (no card is both), so the add is clean: 4/52 + 4/52; the OR-rule's simplest costume**
- (c) 1/13
- (d) 8/13

**Q2.** P(heart OR face card) needs care because:
- (a) plain addition always suffices
- (b) **the overlap double-counts — 3 face-hearts get tallied twice, so 13/52 + 12/52 − 3/52 = 22/52 = 11/26; inclusion–exclusion is the refund mechanic**
- (c) hearts aren't real cards
- (d) face cards refuse to cooperate

**Q3.** The complement law P(not A) = 1 − P(A) shines brightest when:
- (a) events are few and tidy
- (b) **the question says AT LEAST ONE — the hit-side is a zoo of cases, but 1 minus the all-miss product is a single line, e.g. 1 − (5/6)⁴ ≈ 0.518**
- (c) probabilities exceed 1
- (d) you're sorting laundry

### ✅ Answers

1. **(b)** — exclusive events just add; the exclusivity test is the only gate.
2. **(b)** — find the overlap, refund it once. Same trick as PP6's double-count trap in a new uniform.
3. **(b)** — "at least one" → complement, instantly, forever. It's the highest ROI reflex in the whole subject.

---

## ✅ Mastery checklist — PB2

- [ ] Exclusive-add applied (king/queen = 2/13) with the can-both-happen test
- [ ] Inclusion–exclusion executed (heart/face = 11/26; club/queen = 4/13)
- [ ] Basket-overlap framed in customer terms (atta/rice = 80%, not 110%!)
- [ ] Complement law fired on "at least one" (671/1296 aka 0.518; 11/36)
- [ ] Exhaustive check used as arithmetic self-audit (sums to 1)
- [ ] 110%-impossibility spot diagnosed and corrected

---

**Next:** ✖️ **PB3 · AND Rules: The Multiplication Theorem** — independent events (coins don't gossip), dependent draws (without-replacement starvation: both aces = 1/221, not 1/169), and the conditional bridge P(A∩B) = P(A)·P(A|B) that carries us straight into PB4. The AND-side of probability, locked and loaded.
