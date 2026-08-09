# 🚧 PP4 · Restrictions & Circles: Together, Apart & Round the Table

> Real counting problems come with CONDITIONS. At the ShopKart Diwali dinner, Ajay and Farhan insist on sitting together (best friends, obviously), while two rival store managers refuse to be neighbors. Then Rakesh announces a ROUND table — and every rotation of the same seating is the same dinner! Restrictions are where exam-setters hunt the careless, and where your block method, complement law, and the (n−1)! circular law earn their salary. Today: counting with handcuffs on.

---

## 🎯 Objectives

- Apply the **block method** for TOGETHER constraints: glue, count entities, multiply internal shuffles.
- Apply the **apart law**: APART = TOTAL − TOGETHER (complement, PC2's refund).
- Run the **gap method** when items must NOT be adjacent (no two girls together).
- Master **circular permutations**: (n−1)! for rings, (n−1)!/2 for beads/necklaces.
- Handle restrictions INSIDE circles (adjacent pairs, apart pairs).

---

## 📘 Concepts

### 4.1 The block method (TOGETHER = glue)

6 staff in a row; Ajay, Farhan, Harsha (the chai trio) must sit together.

```
STEP 1 - GLUE the trio into ONE mega-person.
STEP 2 - count entities: mega + 3 others = 4 entities -> 4! = 24
STEP 3 - un-glue inside: the trio shuffles internally: 3! = 6
ANSWER  = 24 x 6 = 144 seatings
```

Three verbs, every together-problem: **GLUE → COUNT → UN-GLUE.** Works for any block size: 7 people with a 3-block → 5! × 3! = 120 × 6 = **720**.

### 4.2 The apart law (NOT together = refund)

Same 6 staff; now the trio must NOT all sit together.

```
APART = TOTAL - TOGETHER = 6! - 144 = 720 - 144 = 576
```

That's PC2's division-multiplier wearing a counting costume: when the FORBIDDEN case is easier to count, count everything and subtract. One line, whole chapter of fear deleted.

### 4.3 The gap method (no two X adjacent — a different beast!)

Careful, bro: "no two girls together" is NOT total − (all girls together). Use **gaps**:

```
5 boys, 3 girls, no two girls adjacent:
STEP 1 - arrange the boys first:  5! = 120
STEP 2 - boys create 6 gaps:   _ B _ B _ B _ B _ B _
STEP 3 - place girls in 3 different gaps: 6P3 = 120
ANSWER  = 120 x 120 = 14,400
```

Girls in DISTINCT gaps → never neighbors. Rule of thumb: arrange the UNRESTRICTED army first, then slot the restricted ones into gaps. (For circular versions, gaps shrink by one — exams love that twist.)

### 4.4 Circular permutations (the ring law)

8 staff around a round Diwali table. Count seatings wrong and you're 8× over:

```
Rotation is free: ABCDEFGH, BCDEFGHA, ... = the SAME dinner.
Fix ONE person (anchor Rakesh), arrange the other 7:
ANSWER = (n - 1)! = 7! = 5,040
```

The anchor doesn't restrict anyone — it just kills the n rotational clones baked into n!. **One fixed, rest free.**

### 4.5 Beads & necklaces (halve it again)

A necklace has no head AND no "clockwise" — flip it over and it's the same necklace:

```
8 distinct beads on a string = (n-1)! / 2 = 7! / 2 = 2,520
```

Garlands and bracelets: always the /2. Exam smell-words: necklace, garland, beads, bracelet.

### 4.6 Restrictions inside circles

**Adjacent pair in a circle:** 8 staff, Priya–Rohan together at the round table.

```
Glue the pair -> 7 entities around the table: (7-1)! = 6! = 720
Un-glue inside the pair: x 2!
ANSWER = 720 x 2 = 1,440
```

**Apart pair in a circle:** 7! − 1,440 = 5,040 − 1,440 = **3,600**. Circular + restriction = the same verbs, just (n−1)! as your TOTAL.

---

## 🧪 LAB — Restriction drills (10 min)

Verbs out loud: GLUE, COUNT, UN-GLUE, REFUND.

1. Store banner: 5 staff in a photo row; Rakesh and Ajay must stand together. Photos?
2. Same 5; now Rakesh and Ajay refuse adjacency. Photos?
3. 6 managers around a circular review table. Seatings?
4. Store-opening garland: 6 different flowers. Strings?
5. Anchor check: in Q3's circle, Farhan must sit next to Simran. Seatings?

**Solutions (hide till done):** 1) 4! × 2! = **48** · 2) 5! − 48 = **72** · 3) 5! = **120** · 4) 5!/2 = **60** · 5) glue pair → 5 entities: 4! × 2 = **48**.

---

## 💪 Exercises

1. 5 people in a row, 2 specific friends together — count (GLUE-COUNT-UNGLUE out loud).
2. 6 people around a round table — count, and explain the anchor in one line.
3. A 6-bead bracelet of distinct beads — count, and justify the ÷2 in one line.
4. 7 staff in a row, the chai trio together — count.
5. Word drill: D-E-L-H-I with the vowels (E, I) together. (Block the vowels; treat them as one entity.)

### ✅ Selected answers

1. 4! × 2! = **48**.
2. 5! = **120** — anchoring one person deletes the 6 rotational clones.
3. 5!/2 = **60** — flipping the bracelet maps every string to a mirror twin, so halve the ring count.
4. 5! × 3! = **720**.
5. Block [EI] + D, L, H = 4 entities → 4! = 24; vowel block flips → × 2! = **48**.

---

## ❓ Quiz

**Q1.** 6 people in a row, 3 specific friends must sit TOGETHER:
- (a) 720
- (b) **144 — glue the trio into one block (4 entities → 4! = 24), then un-glue the internal 3! = 6 shuffles: 24 × 6**
- (c) 36
- (d) 288

**Q2.** 8 staff around a ROUND table:
- (a) 40,320
- (b) **5,040 — (n−1)!: anchor Rakesh, arrange the other 7; rotations of the same circle are the same dinner**
- (c) 2,520
- (d) 720

**Q3.** "A and B must NOT sit together" — the fastest attack is:
- (a) list every seating by hand
- (b) **total minus together — count ALL arrangements, subtract the block count; the complement turns a phobia constraint into one subtraction (576 in the trio case)**
- (c) seat A first and hope
- (d) skip the question forever

### ✅ Answers

1. **(b)** — GLUE → COUNT → UN-GLUE. Three verbs beat three pages of casework.
2. **(b)** — the anchor costs nothing and kills n clones. (n−1)! forever.
3. **(b)** — APART = TOTAL − TOGETHER is the single most examinable line in restricted counting.

---

## ✅ Mastery checklist — PP4

- [ ] Block method executed: 144 (row-trio) and 1,440 (circle-pair)
- [ ] Apart law applied by subtraction, not casework
- [ ] Gap method run: 14,400 (5 boys, 3 girls, no two girls together)
- [ ] Circular law (n−1)! derived via anchor, not memorized blindly
- [ ] Beads/necklace halving justified in one line
- [ ] Restrictions inside circles handled (3,600 apart-pair)

---

**Next:** 🔢 **PP5 · Digits, At-Least & Ranking** — the zero-first forgery (why blind 5! = 120 smuggles in fakes), the 2ⁿ−1 subset law ("choose at least one promo"), ranking a word alphabetically, and the derangement cameo (4 Secret Santas, 9 valid gift loops). Number-formation + selection edges, conquered.
