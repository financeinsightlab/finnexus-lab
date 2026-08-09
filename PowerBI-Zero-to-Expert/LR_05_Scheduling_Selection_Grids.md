# 📅 LR5 · Scheduling, Selection & Matching Grids

> Three last formats, and your puzzle map is complete. **Scheduling** = a row of days (Monday–Sunday) instead of seats. **Selection** = if-then committee rules where logic itself is the frame. **Matching grids** = person × city × role, solved with a tick-elimination table. Different costumes; LR1's routine underneath each. Today we build ShopKart's weekly off-day roster, run a credit-committee selection, and fill our first attribute grid.

---

## 🎯 Objectives

- Treat day/week/month slots as the row battery (scheduling = LR2 in a calendar).
- Read **relative-day clues** (\"two days after\", \"the day before\") as position locks.
- Solve **if-then selection** puzzles with three laws: inclusion/exclusion chains.
- Run the **elimination grid** for attribute matching (✗ marks do the work).
- Combine grids + positions when schedules carry attributes too (day × person × shift).

---

## 📘 Concepts

### 5.1 Scheduling = rows with day-names (+ weekend quirks)

Frame: `[Mon][Tue][Wed][Thu][Fri][Sat][Sun]` slots 1–7. Same between-law, same immediately-locks. Only extras: week-ends matter (\"no one works both weekend days\"), and \"two days after X\" = position +2.

**FULL WALKTHROUGH — the ShopKart weekly off-day roster:** (7 staff, one off-day each, all distinct)

Clues:
1. Priya's off-day is Monday.
2. Rohan's off is two days after Priya's.
3. Arjun's off is immediately BEFORE Simran's; neither is adjacent to Rohan's.
4. Deepa's off is Sunday.
5. Gauri's off is Tuesday.

**LOAD:** PR=Mon ✔, GA=Tue ✔ (clue 5), DP=Sun ✔ (clue 4).
**CHAIN:**
- Clue 2: RO = Wed ✔
- Clue 3: adjacent-day pair (AJ, SI) with AJ immediately-before-SI: candidates gaps in {Thu,Fri,Sat}: (Thu,Fri)? — but \"neither adjacent to RO(Wed)\": adjacent days to Wed = Tue, Thu → Thu banned → (Fri,Sat) ✔ → AJ=Fri, SI=Sat ✔
- Remaining: FH for Thu ✔ (elimination)
**VERIFY** all 5 ✔:

```
Mon-PR  Tue-GA  Wed-RO  Thu-FH  Fri-AJ  Sat-SI  Sun-DP
```
Q: \"Who covers the shop if Simran is off?\" → Sat off = Simran; off-day logic Qs (\"on Thursday, which pair of the list is present?\" → everyone minus FH: **all but Farhan**).

### 5.2 Selection puzzles (if-then committee laws)

Setup: pick a team of 4 from {AJ, SI, PR, RO, DP, FH} under rules. The three laws:

```
LAW 1 · "If A is picked, B is picked."      A → B    (A without B = DEAD)
LAW 2 · "Either A or B, never both."        A ⊕ B   (exactly one)
LAW 3 · "A and B go together or neither."   A ↔ B    (packaged pair)
```

Method: make an **option-tree of team compositions** honoring laws, then questions like \"which team is valid?\" / \"if X is picked, who must also be?\" answer by checking laws against each option. Convert English precisely: \"If RO is chosen, FH is NOT\" = RO → ¬FH (not symmetric unless stated!). Direction discipline again — the sharpest students misread if-then arrows more than any other LR grammar.

**Demo (ShopKart credit-line committee, 3 of 5):** from {AJ, SI, PR, RO, FH}: rules (i) AJ → SI; (ii) PR ⊕ RO; (iii) exactly one of {DP…(absent set) ignore}. Valid trio example: {AJ, SI, PR} ✔ (AJ brings SI ✔, exactly one of PR/RO ✔) — {AJ, PR, RO}? ✘ violates (i) AJ present without SI AND (ii) PR+RO together. Two kills, one glance.

### 5.3 The matching grid (person × city × role) — ✗ marks do the work

3 candidates {AJ, SI, PR} × cities {Delhi, Jaipur, Gurugram} × roles {Sales, Ops, Finance}; each mapping is one-to-one.

Grid technique: a cross-table; each clue fires ✗s (never ✓ first):

Clues: 1) AJ is not in Jaipur. 2) The Ops person is in Gurugram. 3) SI handles Sales. 4) The Delhi person is not in Finance.

```
        Delhi   Jaipur   Gurugram
AJ        ?       ✗         ?
SI        ?       ?         ?
PR        ?       ?         ?
Roles row (separate mini-grid): SI=Sales ✓ → Sales≠AJ/PR rows...
Clue 2: Ops = Gurugram ✓→ Gurugram≠Sales/Finance → Gurugram=Finance? no wait Ops ∎Gurugram pair.
SI=Sales → SI ≠ Gurugram(Ops) → SI ∈ {Delhi, Jaipur}; AJ ≠ Jaipur → AJ ∈ {Delhi, Gurugram}.
Clue 4: Delhi ≠ Finance. SI: if SI=Delhi → Delhi=Sales ✔(not Finance ✔); then AJ ∈ Gurugram(Ops), PR=Jaipur, roles: PR=Finance ✔ works.
   Case S2: SI=Jaipur(Sales) → AJ ∈ {Delhi, Gurugram}: if AJ=Delhi → Delhi=AJ-role? ≠ Finance, ≠ Sales(SI) → Ops ✗ but Ops=Gurugram conflict → AJ=Gurugram(Ops), PR=Delhi → Delhi-PR=Finance ✗ violates clue 4!
   → Case 2 DEAD → unique: SI-Delhi-Sales · AJ-Gurugram-Ops · PR-Jaipur-Finance ✔
```

The grid discipline: **✗ first, ✓ by elimination, dead-cases killed with named clue-numbers.** One grid = 3 questions answered free (\"who's in Jaipur?\" \"which role does AJ hold?\").

### 5.4 Day × person × shift (attribute schedules)

Scheduling + attributes: same roster frame, third rail for shift (Morning/Evening) — solve roster first, then overlay grid logic for shifts. Layer discipline: **positions before attributes** — anchoring the week shrinks the grid to near-trivia.

---

## 🧪 LAB — Three-format reps (12 min)

1. Roster final state above: which two staff share adjacent off-days AND include a weekend day?
2. Committee: pick 4 of {AJ, SI, PR, RO, DP} with AJ → SI and \"SI and PR together or neither\". Valid quad?
3. Grid: using 5.3's solved mapping — \"the Finance person is in which city, held by whom?\"
4. Compose an either-or clue for the roster that would swap FH and SI legally; check validity.
5. Day-attribute: overlay rule \"Evening shift = whoever has next-day off.\" FH (Thu off) covers which evening?

**Answer key:** 1) (Fri-AJ, Sat-SI) ✔ the weekend-adjacent pair; (Sun-DP, Mon-PR) wraps around the week — mention both! 2) Quad {AJ, SI, PR, RO/DP}: AJ→SI ✔; SI & PR packaged ✔ → {AJ, SI, PR, RO} ✔ (or DP) — laws say nothing about RO/DP → both valid → two valid answers unless another rule fires (openness honestly reported). 3) **Jaipur, by Priya.** 4) e.g., NEW rule \"SI's off is not Saturday\" forces re-chain — with current rules that KILLS the solution (SI ∈ {Sat} only) → the swap-clue must touch AJ too: \"AJ-SI pair not adjacent to RO\" alternatives exhaust → no legal swap exists; rules are sometimes a cage ✔ good discovery. 5) Wednesday evening (the evening before his Thursday off).

---

## 💪 Exercises

1. Roster: off-days immediately Fri-adjacent? Who precedes AJ by exactly 2 days?
2. \"If FH is chosen, RO must be chosen; RO is never chosen with PR.\" FH chosen → who else must/must not be in?
3. Grid mini (2×2×2 sanity test): {DP, FH} × {North, South} × {Day, Night}: DP=North; South=Night. Full mapping?
4. Why are ✗s loaded before ✓s in grids? One honest line.
5. Week-wrap: \"off immediately after\" across Sunday→Monday counts as adjacent — TRUE in most exam readings; what do you do if your chain depends on it?

### ✅ Selected answers

1. Fri-neighbors: Thu-FH, Sat-SI ✔; 2 days before Fri = **Wed = Rohan**.
2. FH → RO → ¬PR; SI/DP open unless size-rules fire → **must: RO · must-not: PR**.
3. DP-North-Day; FH-South-Night ✔ (2-axis elimination did it in one glance).
4. Because ✗s shrink possibilities without inventing facts — ✓s can only close once elimination makes them TRUE (definite-vs-possible integrity).
5. **Check the question's own phrasing** (\"consecutive days of the week\" usually wraps or says 'within the week'); if it stays ambiguous, branch the two readings — the legal answer will be shared by both, or the paper will mean the strict one. Ambiguity-handling = branch, never assume.

---

## ❓ Quiz

**Q1.** In the ShopKart off-roster, \"Arjun immediately BEFORE Simran; neither adjacent to Rohan(Wed)\" resolved to:
- (a) Wed–Thu
- (b) **Fri–Sat — the only adjacent forward-pair left that dodges Wed's neighbors (Tue, Thu); position-before-attribute layering again**
- (c) Sat–Sun
- (d) Thu–Fri

**Q2.** Selection law \"If A is picked, B is picked\" kills exactly which teams?
- (a) Teams with B
- (b) **Teams with A but WITHOUT B — A → B; it says NOTHING about B-without-A. Arrow direction is the most-misread grammar in LR**
- (c) Teams with A and B
- (d) All teams of size 3

**Q3.** In a matching grid, the professional's marking order is:
- (a) ✓ first to lock heroes
- (b) **✗ FIRST — each clue eliminates boxes; ✓s close ONLY by elimination or proven packaging; dead branches killed citing the clue number**
- (c) Alternate ✓ and ✗ randomly
- (d) Colors, no marks

### ✅ Answers

1. **(b)** — adjacent-to-Wed = {Tue, Thu} banned pairs; (Fri, Sat) survives as the only forward-pair. Full-frame constraints beat local guessing.
2. **(b)** — if-then arrows fire one way. B-alone teams? Legal, absent other laws. Misread arrows = free marks for your competition.
3. **(b)** — ✗s are free truth; ✓s must be earned. Grid solved in 5.3: SI-Delhi-Sales, AJ-Gurugram-Ops, PR-Jaipur-Finance — read your own grid like a newspaper after.

---

## ✅ Mastery checklist — LR5

- [ ] Calendar battery framed with weekend marks; day-diffs as position-diffs
- [ ] Off-roster rebuilt in ≤ 75 s with verification
- [ ] If-then / either-or / packaged laws converted to arrow-signs before solving
- [ ] Grid discipline: ✗ first, proven ✓, dead-cases cited by clue number
- [ ] Positions-before-attribute layering on multi-rail puzzles
- [ ] Ambiguity = branch readings, never assume (week-wrap drill done)

---

**Next:** ⚡ **LR6 · Puzzle Traps, Triage & The Mock Arena** — the five named LR traps, the 30-second puzzle-triage (bank / gamble / dump), exam pacing with 3-puzzle sections, and the **10-question LR Mock Arena** spanning every format from LR1–LR5. Bring the stopwatch — this one's the boss fight.
