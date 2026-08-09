# 🏢 LR4 · Floors, Boxes & Ordering Chains

> Take a linear row and stand it upright: congratulations, you've invented floor puzzles (7 people live on 7 floors), box puzzles (6 cartons stacked in the ShopKart godown), and shelf puzzles. Add \"A is taller than B but shorter than C\" and you get ordering chains — the pure-logic sibling. All three run on LR1's routine with vertical slots; the only new gadget is the **comparison chain** for inequalities and the **midpoint trick** for \"exactly between.\" Today: one full floor puzzle live, box-stacking rules, and the transitivity machines.

---

## 🎯 Objectives

- Frame vertical batteries: floors 1..7 (bottom→top) and stacks 1..N.
- Chain floor clues with **between-count law, vertical edition** (difference − 1, unchanged!).
- Deploy **\"immediately above/below\"** as difference-1 locks.
- Solve **box-stacking** with attribute-matching (item + position).
- Crack **ordering chains** (taller/older/heavier) with transitivity + the midpoint trick.

---

## 📘 Concepts

### 4.1 Vertical framing rules (30 seconds, once per puzzle)

```
TOP    [7]
       [6]
       [5]
       [4]
       [3]
       [2]
BOTTOM [1]   ← \"ground floor\" = 1 ... read the FRAME-notes in the question!
```

Three frame audits before Load: (a) does floor numbering start at 1 (ground) or 0? (b) \"above\" = higher number — say it; (c) stacks: is position 1 the TOP or BOTTOM? (exams vary; the question always tells you — read it out loud). Direction audits are your seatbelt, exactly like LR2's facing arrows.

### 4.2 FULL WALKTHROUGH — ShopKart staff housing, 7 floors

Clues:
1. Arjun lives on floor 6.
2. Exactly two people live between Arjun and Simran.
3. Priya lives immediately above Simran.
4. Deepa lives on floor 1.
5. Gauri lives above Arjun — wait, first: (5. Rohan lives immediately above Deepa.)

Updated full clue-list: **1) AJ=6 · 2) two between AJ & SI · 3) PR immediately above SI · 4) DP = 1 · 5) RO immediately above DP · 6) GA above AJ.**

**FRAME:** floors 1–7 vertical. **LOAD:** AJ = 6; DP = 1.
**CHAIN:**
- Clue 5: RO = 2 (immediately above 1) ✔
- Clue 2: |AJ − SI| = 3 → SI = 3 (floor 9 illegal) ✔
- Clue 3: PR = 4 ✔
- Remaining {FH, GA} for floors {5, 7}; clue 6: GA above AJ(6) → GA = 7, FH = 5 ✔
**VERIFY:** 6/6 clues ✔.

```
7-GA  6-AJ  5-FH  4-PR  3-SI  2-RO  1-DP
```
Questions: \"How many live between Priya and Gauri?\" → |4−7|−1 = **2** (floors 5, 6). \"Who lives exactly midway between Simran and Farhan?\" → SI=3, FH=5 → midpoint floor 4 = **Priya** ✔ (midpoint = (3+5)/2). \"Two floors below Arjun?\" → **Priya**.

### 4.3 The midpoint trick (\"exactly between\")

\"X lives exactly midway/equidistant between Y and Z\" → X's floor = **average of the two endpoint floors** (needs an integer → endpoints same parity!). Free lock: (SI 3 + FH 5)/2 = 4. Also inverse: \"who is equidistant from A and B\" = average-check every OPEN slot. Same parity = unique candidate exists.

### 4.4 Box-stacking puzzles (floor + attribute)

Add an attribute dimension: 6 cartons stacked (positions 1 bottom – 6 top), each an item: rice, atta, oil, sugar, tea, salt. Clues mix POSITION (\"oil is two boxes above salt\") with ITEM attributes (\"the rice carton is immediately below the tea carton\"). Method: TWO parallel rails on one frame — run positions as a floor puzzle while item chains hang:

```
Pos:   6    5    4    3    2    1
Item:  ?    ?    ?    ?    ?    ?
```

Item-pairs like \"rice immediately below tea\" = a movable BLOCK [tea above rice] of height 2 that you slide along the stack — block-sliding is THE box-puzzle signature move (same as \"two adjacent seats\" blocks in rows).

### 4.5 Ordering chains (taller, older, heavier, richer — one engine)

\"AJ > RO, RO < SI, SI > DP, PR < DP, FH > SI\" (heights). Convert every \"<\" into \">\" direction consistently, then chain transitively:

```
AJ > RO · SI > RO · SI > DP · DP > PR · FH > SI
Chain: FH > SI > DP > PR  and  FH > SI > RO ; AJ > RO (loose branch)
Tallest: FH ✔ · Bottom: strictly PR or RO? PR < DP and RO < SI — no link between RO and DP/PR branches → RO vs PR UNORDERED → \"who is shortest?\" is CBD until a linking clue arrives (honesty rule!).
```

**Chain rules:** (1) one direction only (\"is taller than\" = >); (2) transitivity is your multiplier; (3) unlinked branches = honest 'cannot be determined'; (4) \"second shortest\" = the element with EXACTLY one chain-member below it in the CONNECTED chain — watch unlinked strays.

---

## 🧪 LAB — Vertical reps (10 min)

1. In the staff housing: who is 2nd above FH? Who exactly between GA and PR?
2. Box-stack starter (6 positions, 1=bottom): \"tea immediately above rice; sugar at top (6); oil somewhere below rice.\" Write the block + current openness map (choose legal spots for the block).
3. Ordering: ages — RO older than HA; SI younger than HA but older than PR; AJ older than RO. Full chain? Youngest?
4. Midpoint: floors 2 and 6 — who CAN sit \"exactly between\" (which floor)? Same for floors 2 and 5 — legal?
5. Frame audit: a question says \"box 1 is the topmost.\" Write the vertical frame accordingly.

**Answer key:** 1) FH(5)+2 = 7 = **Gauri**; between GA(7) & PR(4): floors 5,6 = **FH, AJ** (2 people). 2) Block [tea-over-rice] height-2 slides over open positions; oil below rice means block's base ≥ 2 … open map: positions {1,2,3,4,5} minus top-6-sugar: block ∈ {(1,2),(2,3),(3,4),(4,5)} with oil strictly below block-base → legal bases: 2,3,4,5 (base 1 leaves oil nowhere) → annotate. 3) AJ > RO > HA > SI > PR ✔ full chain; youngest = **Priya** (all five linked, no strays). 4) Floors 2,6 → mid = 4 ✔ legal; 2,5 → 3.5 ✘ NO integer midpoint → \"exactly between\" impossible → catch-and-eliminate material! 5) Frame flipped: TOP [1] … [6] BOTTOM — chains invert; audit first, chain second.

---

## 💪 Exercises

1. Between-law vertical: \"three people stack between GA and RO\" → floor difference?
2. Housing: who lives 3rd below GA? 1st above DP? Neighbors of SI?
3. Order chain: profits — KB > LN, Rohini > KB, Saket < LN, Online > Saket. Can you rank all five? What links are missing?
4. Box-block: block [oil-above-salt] AND block [tea-above-rice] in 6 slots, no overlap: list two legal pair-placements.
5. Compose one \"equidistant\" question on the staff housing whose answer is FH — write it, verify the average.

### ✅ Selected answers

1. Difference of **4** (three between means |k − l| = 4).
2. GA(7)−3 = 4 = **Priya**; DP(1)+1 = 2 = **Rohan**; SI(3) neighbors = **RO(2) & PR(4)**.
3. Online vs others unlinked (only \"Online > Saket\") → partial: Rohini > KB > LN > Saket carries 4; Online's rank vs KB/Rohini = **CBD until linked** (rank honesty!).
4. e.g., salt-block at (1-bottom…): (salt 1, oil 2) + (rice 3, tea 4); alt (rice 1, tea 2) + (salt 4, oil 5) ✔ two block slides, zero collisions.
5. \"Who lives exactly midway between Priya(4) and Gauri(7)?\" — average = 5.5 ✘ nope; pick \"SI(3) & GA(7)\" → mid 5 = **FH** ✔ question certified.

---

## ❓ Quiz

**Q1.** \"Exactly two people live between Arjun(6) and Simran\" means Simran's floor is:
- (a) 8 or 4
- (b) **3 — difference of 3 (two between), downward (9 illegal): vertical between-count law is the same |diff|−1 engine as rows**
- (c) 4 only
- (d) 2

**Q2.** \"Priya lives exactly midway between Simran(3) and Farhan(5)\" is confirmed by:
- (a) Her being senior staff
- (b) **The midpoint trick: (3 + 5)/2 = 4 = Priya's floor; endpoints need SAME parity for a legal midpoint — floors 2 & 5 can never flank an 'exactly between' person**
- (c) Her being adjacent to both
- (d) Guessing floor 4

**Q3.** In an ordering chain (FH > SI > DP > PR, plus loose AJ > RO), the honest answer to \"who is shortest?\" is:
- (a) PR, the bottom of the big chain
- (b) **CANNOT-BE-DETERMINED until RO links to the DP/PR branch — unlinked branches never get ranks by vibes; the honesty rule scores the mark**
- (c) RO, the stray
- (d) SI

### ✅ Answers

1. **(b)** — row-laws wear hard hats vertically. Difference 3, direction legality check (floor 9 doesn't exist) → 3.
2. **(b)** — average of endpoints; parity audit first. \"Exactly between\" questions are midpoint-locks in disguise — collect them greedily.
3. **(b)** — AJ > RO hangs off the chain; RO could be above or below DP/PR. CBD with a reason beats PR by vibes every single time.

---

## ✅ Mastery checklist — LR4

- [ ] Vertical frame audits: numbering base, above=higher, top/bottom convention read aloud
- [ ] Between-count + difference-1 locks reused vertically without translation errors
- [ ] Midpoint trick incl. the parity legality check
- [ ] Box-stacks: two-rail frame + block-sliding demonstrated (LAB-2)
- [ ] Ordering chains: one-direction conversion, transitivity, stray-branch CBD honesty
- [ ] Staff housing puzzle rebuilt cold in ≤ 60 s

---

**Next:** 📅 **LR5 · Scheduling, Selection & Matching Grids** — 7-day week puzzles (our ShopKart off-day roster), if-then committee selection (\"if AJ goes, SI goes\"), and the triple-attribute matching grid (person × city × role) with the classic elimination grid. Three final formats before the Arena.
