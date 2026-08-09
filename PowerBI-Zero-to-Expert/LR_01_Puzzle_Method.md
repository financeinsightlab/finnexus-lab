# 🧩 LR1 · The Puzzle Method: Tabulate, Chain, Verify

> Logical Reasoning puzzles — seating, floors, schedules, matching grids — are the biggest single block in banking exams (IBPS/SBI PO: 15–25 marks!) and a growing chunk of TCS NQT and SSC. And here's the truth that terrifies no one after today: **every puzzle type runs on ONE method**. Convert clues to possibilities on paper, start from the most-constrained clue, chain deductions until all blanks fall, then verify against every clue. Learn this single discipline and 80% of \"impossible\" puzzles become 3-minute pencil work. The other 20%? Same method, longer chains.

---

## 🎯 Objectives

- Replace \"hold it in your head\" with **paper architecture**: slots, tables, possibility marks.
- Classify clues into 4 types: **direct · relative · negative · conditional**.
- Run the **4-Step Puzzle Routine**: Frame → Load → Chain → Verify.
- Master **start-point selection**: the most-constrained (most-mentioned) element first.
- Distinguish **definite vs possible** and never treat a possibility as a fact.

---

## 📘 Concepts

### 1.1 Why puzzles feel hard (and why they're not)

A puzzle gives 5–8 clues about 6–8 people. Your brain cannot simulate 8 objects at once — but your PAPER can hold everything forever. Like Blood Relations: **hands solve, memory watches.** The exam isn't testing intelligence; it's testing whether you *externalize* structure. Every topper writes. Every struggler stares.

Our cast for the whole course — ShopKart's 8 puzzle regulars: **Arjun (AJ), Simran (SI), Priya (PR), Rohan (RO), Deepa (DP), Farhan (FH), Gauri (GA), Harish (HA)** — with guest appearances by the Sharma seniors. Initials only; speed matters.

### 1.2 The four clue types (read each clue, name its type)

| Type | Looks like | How to write it |
|---|---|---|
| **Direct** | \"Arjun sits third from the left end.\" | Fix it in the frame IMMEDIATELY |
| **Relative** | \"Two people sit between Arjun and Simran.\" | Mark as movable pair/bracket: AJ _ _ SI (or SI _ _ AJ) |
| **Negative** | \"Gauri does NOT sit adjacent to Harish.\" | GA ≠⌢ HA constraint note on the side |
| **Conditional** | \"If Priya is at an end, Rohan is next to her.\" | IF PR=end → RO adjacent; parks until PR fixed |

**Between-count law (most misread phrase in LR):** \"two people between X and Y\" → |position difference| − 1 = 2 → **positions differ by 3** (X_ _ Y). \"Immediate\" = difference of exactly 1. \"Somewhere to the left\" = order only, distance unknown.

### 1.3 The 4-Step Puzzle Routine (write it on every rough sheet)

```
STEP 1 · FRAME   — draw the slots/rows/floors/days; label ends, directions
STEP 2 · LOAD    — place ALL direct clues first (free structure!)
STEP 3 · CHAIN   — attack the most-CONSTRAINED element next; each placement
                   fires new fixed points → re-scan clues after EVERY fix
STEP 4 · VERIFY  — re-read EVERY clue against the finished frame; one
                   mismatch means a chain error, not a bad puzzle
```

### 1.4 Start-point selection: the Most-Constrained First rule

Count how many clues mention each person; start with the most-mentioned (or with direct clues). \"Arjun\" appearing in 3 clues = 3 chances to lock him. A person mentioned once is your LAST placement — they fall by elimination. **Chain logic is a waterfall: every lock re-scans all remaining clues, because each new fact activates parked relatives/negatives.** Stuck = you haven't re-read the full clue list since your last lock.

### 1.5 Definite vs Possible (the integrity line)

Only two states allowed on your frame: **LOCKED** (proven) or **OPEN** (possibilities listed as tiny letters under the slot). NEVER place a \"maybe\" as if it were a fact — one assumed placement poisons the whole chain (BR4's honesty rule, LR costume). If two arrangements both satisfy all clues, the question \"which is true?\" answers with what BOTH arrangements share — and \"cannot be determined\" may again be the honest, mark-winning answer.

---

## 🧪 LAB — Method installation drill (10 min)

Clue-set (seating seeds — full puzzle in LR2): AJ is third from left. Two people between AJ and SI. DP is second to the right of SI.

1. Frame: draw 8 slots, number them, mark left/right ends.
2. Type each clue (direct/relative/negative/conditional).
3. Load: which clue places instantly? Place it. What fires next?
4. Between-count check: what position-number difference does \"two between\" force?
5. Chain: place SI, then DP. Who follows WITHOUT any new clue, and why?

**Answer key:** 2) direct, relative, relative. 3) Clue 1 loads: AJ = 3. 4) Difference of 3 → SI = 6 (the only legal side: 3+3=6; 3−3=0 invalid). 5) DP = 8 (second right of 6). Follow-ups free: chain started with ONE direct clue and already 3 of 8 are locked — the routine works before you even \"think.\"

---

## 💪 Exercises

1. Convert: \"four people sit between FH and GA\" — position difference = ?
2. Classify: \"If the row faces south, left and right swap.\" Which clue-type family does a DIRECTION rule belong to?
3. \"PRI sits somewhere to the left of RO.\" Write the minimal honest notation.
4. A puzzle has 5 clues; Harish appears in zero. When does Harish get placed, and how?
5. True/False: \"Trying one case briefly (Case 1 / Case 2) is illegal in speed exams.\"

### ✅ Selected answers

1. Difference of **5** (FH _ _ _ _ GA). Between-count = |diff| − 1, always.
2. It belongs to the **FRAME** — direction/ends/units are architecture set in Step 1, before any clue loads (a facing-direction mistake corrupts the whole puzzle at birth).
3. PRI … RO (order known, gap unknown) — tiny notes on the side; park until activations come.
4. **Last, by elimination** — zero-mention people fill the final empty slots for free.
5. **False.** Two-case branching is legal and often optimal when a fork won't resolve — elderly cousin of BR's verify-backwards. Just kill dead cases FAST and never exceed 2 branches in exams.

---

## ❓ Quiz

**Q1.** \"Two people sit between Arjun and Simran\" forces their position numbers to differ by:
- (a) 2
- (b) **3 — between-count law: |difference| − 1 = 2, so diff = 3; the most-misread phrase in LR**
- (c) 1
- (d) 4

**Q2.** The correct order of the 4-Step Puzzle Routine is:
- (a) Chain → Frame → Verify → Load
- (b) **FRAME → LOAD → CHAIN → VERIFY** — slots first, direct clues next, most-constrained chaining with re-scans, and every clue re-read at the end
- (c) Load → Chain → Frame → Verify
- (d) Guess → Verify → Load → Frame

**Q3.** Your ideal FIRST move on a fresh puzzle (after framing) is to:
- (a) Place whoever is named first in the text
- (b) **Load all DIRECT clues, then start chaining from the MOST-CONSTRAINED (most-mentioned) element** — max clues = max lock chances; zero-mention people fall last by elimination
- (c) Try Case 1/Case 2 randomly
- (d) Solve the last clue first

### ✅ Answers

1. **(b)** — X_ _ Y = three positions apart. \"Immediate\" = 1 apart. \"Somewhere left\" = order only. Say the law aloud once per puzzle.
2. **(b)** — architecture before deductions; verification before celebration. One mismatch at VERIFY = chain error, not a bad puzzle.
3. **(b)** — direct clues are free structure; the most-mentioned person locks fastest; every lock triggers a full clue re-scan. Stuck on a puzzle? You haven't re-read all clues since your last lock.

---

## ✅ Mastery checklist — LR1

- [ ] 4 clue types named on sight; between-count law stated cold
- [ ] Frame→Load→Chain→Verify written on my rough sheet
- [ ] Most-Constrained First demonstrated on the LAB drill
- [ ] Definite vs Possible integrity: LOCKED vs OPEN marks, never mixed
- [ ] Post-lock full re-scan habit installed
- [ ] Re-scans: I know \"stuck = I stopped re-reading\" by heart

---

**Next:** 🪑 **LR2 · Seating: Linear Rows** — single rows, two facing rows, ends-vs-middle logic, north/south facing flips, and a full 8-person ShopKart staff puzzle solved clue-by-clue with the routine doing the driving.
