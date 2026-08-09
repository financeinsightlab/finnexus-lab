# 🪑 LR2 · Seating: Linear Rows

> The most common puzzle on Earth (every bank prelim opens with one): N people in a row, 5–6 clues, find arrangements and answer 3–5 questions. With LR1's routine this is assembly-line work: frame the slots battery, load direct clues, chain the rest. Today you solve a full 8-person ShopKart row LIVE, learn the facing-direction flip, and master two-row face-to-face variants — the three formats that cover 90% of linear seating.

---

## 🎯 Objectives

- Frame single-row problems with **numbered slots + a facing arrow**.
- Chain relative/negative clues into unique locks using between-count law.
- Handle **facing-north vs facing-south** (left/right flip trap).
- Solve **two-row facing** puzzles (pairs \"A faces B\").
- Answer position questions (4th from right, who-sits-between) in seconds.

---

## 📘 Concepts

### 2.1 Frame anatomy (the battery)

```
Facing NORTH (all same way — say, looking at our page top):
Left end → [1][2][3][4][5][6][7][8] → Right end
4th from the RIGHT = position (8 − 4 + 1) = 5   ← position-flip formula:
k-th from right = N − k + 1
```

Facing notes: same-facing = left/right as drawn. **Mixed facing flips individuals:** a person facing SOUTH has left-right MIRRORED (his \"immediate left\" is your picture's right). Exams test this one line with one clue; mark the flipped person instantly when told.

### 2.2 FULL WALKTHROUGH — the ShopKart staff photo row (8 staff, facing north)

Clues (7 total):
1. Arjun is third from the left end.
2. Exactly two people sit between Arjun and Simran.
3. Deepa is second to the right of Simran.
4. Priya sits at an extreme end.
5. Rohan sits immediately to the right of Priya.
6. Farhan sits immediately to the right of Arjun.
7. Gauri sits next to Deepa.

**FRAME:** slots 1–8, arrow ← toward 1.

**LOAD (Step 2):** clue 1 → AJ = 3.
**CHAIN (Step 3):**
- Clue 2: |AJ − SI| = 3 → SI = 6 (slot 0 illegal) ✔ locked
- Clue 3: DP = 2nd right of 6 → DP = 8 ✔
- Clue 4: PR at an end → slots 1 or 8; 8 taken → PR = 1 ✔
- Clue 5: RO = PR + 1 = 2 ✔
- Clue 6: FH = AJ + 1 = 4 ✔
- Remaining {GA, HA} for slots {5, 7}: clue 7 — GA next to DP(8) → GA = 7; HA = 5 (elimination, free!)
**VERIFY (Step 4):** re-read all 7 ✔✔✔✔✔✔✔

```
1-PR  2-RO  3-AJ  4-FH  5-HA  6-SI  7-GA  8-DP
```
Questions: \"4th from the right?\" → 8−4+1 = 5 → **Harish**. \"How many sit between Priya and Farhan?\" → |1−4|−1 = **2** (slots 2,3). \"Who sits at the row's middle seats?\" → 4 & 5: **Farhan & Harish**. 12 seconds per question once the battery is full.

### 2.3 Two facing rows (the face-pair pattern)

4 staff face 4 staff — \"each person faces exactly one other.\" Rows A (south-facing) and B (north-facing). Key: **\"X faces Y\" = same column, consecutive across the gap**, and left/right of X is seen from X's facing — **row-2's left-right visually MIRRORED from row-1's**. Procedure: solve one row's internal clues, use face-links as rook-moves across rows. Demo seed: AJ faces SI; FH sits immediate right of AJ (in AJ's view — check AJ's facing before counting!).

### 2.4 The mixed-facing flip (the trap that eats careless markers)

\"Gauri faces south; all others north. Gauri's immediate-left neighbor is…\" → GA's left = picture's RIGHT. **Rule: before ANY left/right clue about a flipped person, write (flipped) above their head.** One mark, zero sorrow.

### 2.5 Speed benchmarks (LR2)

| Item | Warm-up | Exam target |
|---|---|---|
| Frame + load | 45 s | 20 s |
| Full 7-clue chain | 3 min | 60–75 s |
| Per sub-question | 30 s | 10–12 s |
| Whole puzzle + 4 Qs | 6 min | **≤ 3.5 min** |

---

## 🧪 LAB — Extend the battery (10 min)

Using the staff row solved in 2.2:

1. Three NEW clues for a REVISED photo: \"AP1: Harish is 2nd from the right.\" What minimal change from the old solution does this force? (Find the contradiction location — where does the chain break?)
2. Answer without re-drawing: neighbors of Simran? Immediate-left of Farhan?
3. Flip drill: if Gauri alone faced SOUTH, who sits to GAURI'S immediate left?
4. Two-row mini: Row X (faces north): PR _ AJ _ ; Row Y (faces south) directly opposite: SI faces AJ's slot. Write each person's column number assuming X-row: PR(1) ?(2) AJ(3) ?(4), Y-row slots labeled oppositely — who could sit at Y-2?

**Answer key:** 1) Old HA=5 vs new HA=2nd-from-right = 7: chain breaks at \"Gauri next to Deepa\" (7) — constraint conflict → the photo changed MORE than one clue; locate the contradiction and re-chain from step where HA is loaded. 2) SI's neighbors: HA(5) & GA(7); left-of-FH(4) = AJ(3). 3) GA(7) flipped → her immediate-left = picture-right → DP(8) ✔ (marked \"(flipped)\" mentally). 4) Y-2 is whatever faces X-2; with SI at Y-3 and no other clues, Y-2 ∈ {RO, DP, FH, GA, HA} — OPEN state notation, question-legal 'cannot be determined' remains possible without more clues (definite-vs-possible integrity!).

---

## 💪 Exercises

1. Position-flip: in a 10-person row, who is 6th from the right? Who is 3rd from left of that person?
2. \"Exactly three people between FH and GA\" — position difference?
3. In the staff row: total people between RO and GA; and who is at |position| 8−5+1?
4. Compose a legitimate 8-slot chain question using the FINAL picture; give it to a friend (target: their solve ≤ 75 s).
5. Mixed facing: if BOTH ends faced inward (PR@1 faces right, DP@8 faces left), DP's immediate-right neighbor is whom?

### ✅ Selected answers

1. 10−6+1 = **5th position**; 3rd-to-left of it = **position 2** (facing north).
2. |FH − GA| = **4** (3 between + 1).
3. |2 − 7| − 1 = **4 people** (slots 3,4,5,6); 8−5+1 = 4 → **Farhan**.
4. Friend solves in ≤75 s → your walkthrough genes are clean; failures reveal which clue you phrased loosely.
5. DP faces left (inward) — her immediate-right = picture-LEFT → **Gauri(7)** ✔ flipped before counting, as always.

---

## ❓ Quiz

**Q1.** In an 8-slot row, \"4th from the right end\" is position number…
- (a) 4
- (b) **5 — the flip formula N − k + 1 = 8 − 4 + 1; (in the staff battery, that's Harish)**
- (c) 6
- (d) Depends on facing

**Q2.** The correct chaining priority after loading direct clues is:
- (a) The clue mentioning the most people first, since it's richest
- (b) **The clue that LOCKS a position given what I already fixed — most-constrained chaining: |AJ−SI|=3 with AJ=3 leaves ONE legal side, so SI=6 locks instantly; re-scan all clues after every lock**
- (c) Negative clues always first
- (d) Conditional clues always first

**Q3.** Gauri alone faces south in a north-facing row. \"Gauri's immediate-left neighbor\" is found at:
- (a) The slot to her picture-left
- (b) **The slot to her PICTURE-RIGHT — mixed-facing flips that person's left/right; mark `(flipped)` above her head BEFORE reading any left/right clue about her**
- (c) The right end always
- (d) Cannot be determined

### ✅ Answers

1. **(b)** — N − k + 1 forever. Question answered in 3 seconds while others count on fingers.
2. **(b)** — chaining = \"what locks given my current fixes?\" Each lock re-activates parked relatives and negatives. The most-mentioned person is a hint, not a law — locks rule.
3. **(b)** — picture-right, because SHE sees it mirrored. The (flipped) tag written at frame-time is LR2's cheapest mark insurance.

---

## ✅ Mastery checklist — LR2

- [ ] Battery frame + N−k+1 position flips in ≤20 s
- [ ] Full 7-clue 8-person chain done in ≤75 s with every-clue verify
- [ ] Sub-question pace: position/between/neighbors ≤12 s each
- [ ] Mixed-facing (flipped) tag habit installed
- [ ] Two-row face-pair logic: solve internal, then rook-links across
- [ ] Contradiction-location reading when a clue conflicts (LAB Q1 drill)

---

**Next:** ⚫ **LR3 · Circular & Square Seating** — the facing-center flip (left = CLOCKWISE!), opposite-seat math, corners-vs-edges square logic, facing-OUTWARD variants (flip again), and a full 6-person shop-meeting circle solved live. The direction game graduates.
