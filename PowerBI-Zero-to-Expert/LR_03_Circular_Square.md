# ⚫ LR3 · Circular & Square Seating: The Direction Game

> Circular seating is where good linear solvers go to donate marks — because the moment chairs face the center, **left becomes clockwise** and everyone's instincts lie. One law fixes this module forever: facing the center, your LEFT hand points clockwise around the table; facing outward, it points counter-clockwise. Master that single flip plus opposite-seat math, and circles become the FASTEST puzzles in the paper (no ends means fewer clues to break symmetry). Squares add one garnish: corners vs edges.

---

## 🎯 Objectives

- Own the **center-facing rule**: left = clockwise, right = counter-clockwise.
- Own the **outward flip**: everything mirrors when chairs face away.
- Use **opposite-seat math**: in N seats, opposite of seat k = k + N/2 (k ≤ N/2).
- Solve full 6/8-person circular puzzles with the LR1 routine intact.
- Handle **square tables**: corner seats vs edge-middle seats as distinct zones.

---

## 📘 Concepts

### 3.1 The two laws of the circle (say them, then never fail them)

```
LAW 1 · FACING CENTER (default in exams):
        LEFT  = CLOCKWISE  ·  RIGHT = COUNTER-CLOCKWISE
LAW 2 · FACING OUTWARD:
        everything mirrors — LEFT = COUNTER-CLOCKWISE
```

Memory trick: stand up, face an imaginary campfire; your left hand sweeps around the ring in the direction clocks run. (Scouts learned this at age 12; exams re-test it at 22.)

**Annotation habit:** draw the circle, number seats 1..N CLOCKWISE, and write \"L=clk\" at the top for center-facing. That 3-second note substitutes for a brain that lies under pressure.

### 3.2 Opposite-seat math (the free checkpoints)

In an EVEN circular arrangement of N seats, seat k's **opposite = (k + N/2) mod N** (with 0 → N). 6 seats: opposite of 3 = 6; of 1 = 4. 8 seats: opposite of 3 = 7. \"A sits opposite B\" = a free relative clue with NO direction needed — use it early: opposites anchor the circle like two nails.

**Symmetry discount:** circles have no ends, so the FIRST placement is arbitrary by symmetry — place the most-mentioned person at seat 1 without loss, always. That's why circles chain faster! (Rectangle/square without a marked top side: same freedom for the first SEAT POSITION only if no corner-face rules break it.)

### 3.3 FULL WALKTHROUGH — ShopKart's 6-seat review circle (all facing center)

Clues:
1. Arjun sits second to the LEFT of Simran.
2. Deepa sits opposite Arjun.
3. Farhan sits immediately to the LEFT of Priya.
4. Rohan sits adjacent to Simran.

**FRAME:** seats 1–6 clockwise, L = clockwise, symmetry → place SI at seat 1.
**CHAIN:**
- Clue 1: AJ = two LEFT (clockwise) of 1 → 1→2→**3** ✔
- Clue 2: DP = opposite(3) = 3+3 = **6** ✔
- Remaining {PR, FH, RO} for seats {2, 4, 5}:
- Clue 3: FH immediately LEFT (clockwise) of PR → adjacent clockwise pair (FH,PR) within {2,4,5}: only (4,5) fits → FH = 4, PR = 5 ✔
- Clue 4: RO adjacent to SI(1): neighbors are 2 or 6; 6 = Deepa → RO = 2 ✔
**VERIFY:** all 4 clues ✔.

```
(clockwise) 1-SI  2-RO  3-AJ  4-FH  5-PR  6-DP
```
Questions: \"2nd to the RIGHT of AJ?\" → right = COUNTER-clockwise: 3→2→1 = **Simran**. \"Opposite PR?\" → 5+3 = 8 → wraps to 2 = **Rohan**. \"Who sits between FH and DP (short path)?\" → nail: seats 4&6 path via 5: **Priya**.

### 3.4 Facing outward (the one-line mirror)

Same circle, chairs turned away: every left/right clause inverts. Same solution skeleton, mirrored reading. Exams sprinkle ONE outward person occasionally (\"everyone faces center except Gauri\") — the LR2 (flipped) tag earns its keep again.

### 3.5 Square & rectangle tables (corners vs edges)

Square with 8 seats (2 per side): **corner sitters** (4) often face inward diagonally or along walls, **edge sitters** (4) face center squarely. Exam conventions (they'll STATE it — read it!): \"four sit at corners facing center\" + \"four sit mid-edge facing center\" → corners are directional-flavored, edges are center-flavored. Zones first: corner/edge placement clues (\"AJ sits at a corner\") shrink brackets instantly. Same between-count laws along the perimeter; distance along edges can go either way around — count BOTH directions, take the shorter.

---

## 🧪 LAB — Circle reps (10 min)

Using the solved circle (1-SI 2-RO 3-AJ 4-FH 5-PR 6-DP):

1. Who sits 3rd to the LEFT of PR(5)? (Left = clockwise: 5→6→1→**2**?)
2. Opposite of FH?
3. Insert NEW 8-seat rule: seats 1–8 clockwise, same facing; \"AJ opposite SI\" and \"AJ third to the LEFT of DP.\" If SI=1, find AJ and DP — is this even consistent?
4. Gauri alone faces OUTWARD in our 6-circle (taking RO's seat 2): who is on GAURI's immediate left now?
5. Square day: 8 seats (4 corners + 4 edges, all face center). \"Priya at an edge, facing Deepa directly across.\" What zone must Deepa be in?

**Answer key:** 1) 5→6→1→2 = **Rohan** ✔. 2) FH(4) + 3 = 7 → wraps to 1 = **Simran**. 3) SI=1 → AJ = opposite = 5. AJ third-LEFT(clockwise) of DP → DP = AJ−3... going anti-clockwise 3 → seat 5→4→3→2 = DP=2. Consistent ✔ (verify: third clockwise FROM DP(2): 2→3→4→5 = AJ ✔). 4) GA at 2 facing outward → her LEFT = counter-clockwise → seat 1 = **Simran**?? — careful: she sits at seat 2; her immediate-left along the ring = the adjacent seat at 1 (counterclockwise direction) ✔ **Simran**. 5) **The edge directly opposite** (edge-opposites are edge-edge in square facing-center layouts) — Deepa is an EDGE sitter, not a corner.

---

## 💪 Exercises

1. Law check: facing center, \"right\" sweeps which way? Say it.
2. 10-person circle, all center-facing: opposite of seat 7?
3. In the 6-circle: number of people between RO and FH along the SHORT path; name them.
4. Build the SI/AJ/DP triangle (LAB-3) fully in 30 s; narrate each step.
5. Square: 8 people, corners face center diagonally. \"FH sits at a corner, left-adjacent to PR at the neighboring corner\" — how many corner-to-corner legal spots exist for PR once FH is fixed?

### ✅ Selected answers

1. **Counter-clockwise.** (Say it until the campfire image fires.)
2. 7 + 5 = 12 → 12 − 10 = **2**.
3. RO(2) → FH(4): path 2→3→4 = **one person: Arjun**. (Long path: 5,6,1 — never take it.)
4. Symmetry SI=1 → opposite AJ=5 → third-clockwise from DP lands on 5 → DP = 2 ✔ 30 seconds is the target.
5. Exactly **2** — PR can be the corner immediately clockwise or counter-clockwise of FH (adjacent-corner pairs); the direction clause (\"left-adjacent\") then cuts it to **1**. Two-stage logic: zone symmetry first, direction second.

---

## ❓ Quiz

**Q1.** In a circle facing the CENTER, \"second to the LEFT of X\" is found by moving:
- (a) Counter-clockwise two seats
- (b) **CLOCKWISE two seats — facing-center flips intuition: LEFT = clockwise. Facing outward mirrors it back. The campfire test never lies**
- (c) Clockwise one seat
- (d) Either way two seats

**Q2.** In an 8-seat circle, Priya sits at seat 3. Simran sits opposite her. Simran's seat is:
- (a) 6
- (b) **7 — opposite of k = k + N/2 = 3 + 4; opposite clues anchor circles early because they need NO direction at all**
- (c) 5
- (d) 8

**Q3.** The correct FIRST placement in a symmetric circle (all face center, no marked north) is:
- (a) Carefully chosen after full analysis
- (b) **ANYWHERE for the most-mentioned person — circles have no ends, so symmetry makes the first lock FREE; seat 1, anchor by opposites, chain fast**
- (c) At the bottom of the page
- (d) Skipped until needed

### ✅ Answers

1. **(b)** — campfire law. Write \"L = clk\" on the frame; this one tag saves every sub-question downstream.
2. **(b)** — k + N/2 (wrap when it overflows). Opposite pairs are the circle's free nails — place them before direction clues.
3. **(b)** — no-ends = rotational freedom = the first placement costs nothing and buys everything. Speed comes from taking free gifts without ceremony.

---

## ✅ Mastery checklist — LR3

- [ ] Center-facing & outward laws stated cold; \"L=clk\" written per frame
- [ ] Opposite formula (k + N/2) runs for N = 6, 8, 10
- [ ] Symmetry-first placement used without hesitation
- [ ] Short-path betweenness chosen over long-path, always
- [ ] (flipped) tag on any outward/exceptions person
- [ ] Square: corner-vs-edge zones separated before chaining

---

**Next:** 🏢 **LR4 · Floors, Boxes & Ordering Chains** — 7-floor building puzzles, box-stacking stacks, age/height ordering circuits, and \"exactly three floors between\" guarantees — the vertical cousins of seating, with the same routine and one new tool: the comparison chain.
