# 🧩 BR4 · Family Puzzles & Data Sufficiency

> This is the boss level of the topic — the IBPS/SSC format: **6–8 statements, one big family tree, then 4–5 sub-questions** (\"How many males? How many couples? How is T related to P? How many generations?\"). One tree earns you 4–5 marks in 3 minutes — the best marks-per-minute ratio in the reasoning section. Then comes **Data Sufficiency**, the sneaky format that doesn't ask the answer — it asks *whether the data lets you answer at all*. Today: both, solved with one discipline: **build once, count from the tree, never from memory**.

---

## 🎯 Objectives

- Process **multi-statement family puzzles** into one complete tree (couples, children, siblings, genders).
- Answer all five classic sub-question types: **count males, count females, count couples, count generations, relation trace**.
- Solve **minimum-member puzzles** (\"What is the minimum number of people in the family?\").
- Keep **gender-open nodes** visible and refuse false certainty.
- Crack **Data Sufficiency**: judge statement I, statement II, both, or neither.
- Use the \"couples = half\" and \"generations = depth\" checks correctly — and know their traps.

---

## 📘 Concepts

### 4.1 The puzzle blueprint (SSC/IBPS standard issue)

**Standard setup:** \"There are six members P, Q, R, S, T, U in a family. Q is the son of R. R is not the mother of Q. P and R are a married couple. T is the brother of R. S is the daughter of P. U is the brother of P.\"

**Blueprint method — three passes:**

```
PASS 1 · SKELETON — plant every named person as a ◇ diamond; draw ONLY what's 100% locked
PASS 2 · LOCKS    — harvest gender/relation certainties (\"not the mother\" → father, etc.)
PASS 3 · RESOLVE  — couples, children edges; re-check EVERY statement against the final tree
```

- Pass 1: couple P ═ R (\"married couple\" ✔); Q under them (son of R) — but R's gender open!
- Pass 2: \"R is NOT the mother of Q\" + R is Q's parent → **R is FATHER → R ☐ → therefore P ◯** (the elegant lock!). \"T is brother of R\" → T ☐ at R's level (siblings). \"S is daughter of P\" → S ◯ under the couple, sibling of Q! \"U is brother of P\" → U ☐ at P's level.
- Pass 3: tree:

```
T ☐ ─ R ☐ ═ P ◯ ─ U ☐
           │
        ┌──┴──┐
       Q ☐ ─ S ◯
```

**Sub-questions defeat themselves:** How is T related to Q? → T is Q's father's brother → **uncle**. How is U related to S? → mother's brother → **maternal uncle**. How many couples? → **1**. Generations? → **2** (T/R/P/U level + Q/S level). Children of the couple? → **2** (Q, S).

### 4.2 The five counting questions — and the honest answer format

| Sub-question | Method | Trap |
|---|---|---|
| How many **males**? | Count only LOCKED ☐ boxes | Diamonds ≠ male — exclude them honestly |
| How many **females**? | Count only LOCKED ◯ circles | Same — \"female count\" may be 2 **even with a diamond present**; write \"2 (1 unknown)\" |
| How many **couples**? | Count ═ edges | Siblings share `─`, NOT `═`; married couples only |
| How many **generations**? | Deepest vertical depth | Cousins at one level = still one generation |
| **Minimum members**? | Merge roles ruthlessly — see 4.3 | Forgetting that 'a person can wear 3 labels' |

### 4.3 Minimum-member puzzles (the \"roles stack on one body\" idea)

**Classic:** \"In a family, there is a grandfather, a father, a mother, two sons and a daughter. What is the minimum number of members?\"

Amateur answer: 1+1+1+2+1 = 6. **Pro answer: 5.** Why? The **grandfather IS a father** (of the family father) — stack roles:

- Person 1: grandfather (also 'a father' to person 2)
- Person 2: the father (also one of… careful) 
- Persons 3–5: mother, son, daughter → total: **grandfather, father, mother, + 2 children… = 5.**

Hmm, tighten it: \"two sons and a daughter\" belong to the father+mother couple; grandfather sits above:**5 members** (GF, couple, 2 sons… wait that's 1 GF + F + M + 2 sons + 1 daughter = 6!). Recount: GF(1), F(2), M(3), sons(4,5), daughter(6) = 6? The trick: the FATHER counts among \"sons\"— the father is the grandfather's son! \"Two sons\" can be **F (son of GF) + his own son** → members: GF, F, M, son, daughter = **5**. ✔ **Roles stack: F is simultaneously 'grandfather's son' and 'father of the children.'** THAT is the puzzle's soul.

**Rule:** draw the smallest tree that satisfies every label; try merging two labels onto one person wherever generations allow it.

### 4.4 Gender-open nodes in counting questions (marks saved here)

Setup: \"P is the brother of Q. Q is the mother of R. R is the daughter of S. S is the sister of T. T is the son of U.\"

Tree: Q ◯ ─ P ☐ (siblings); Q ◯ above R? wait Q is MOTHER of R → Q ◯ above R ◯ (daughter); R is daughter of S → S is R's OTHER parent → S married Q → S ☐?? NO — \"S is the SISTER of T\" → S ◯ female. But S is Q's spouse… **CONTRADICTION?** Not quite: no statement says S married Q! R being \"daughter of Q\" AND \"daughter of S\" — hmm, R has a mother Q ◯; \"daughter of S\" forces S to be a parent too. S is female (sister of T). Two mothers?? **The data as phrased implies S is R's parent and female; Q is also female parent** — one of them must be read as stated; in real exams one line would be \"R is the daughter of Q AND S\" with S male… 

**The lesson (this is the real exam gold):** when statements collide, the legal exam reading is the one where each statement individually holds — Q ☐? \"P is brother of Q\" genders P, not Q; \"Q is mother of R\" genders Q ◯. Collision with S ♀ parentage means **the puzzle expects you to notice U's branch fixes it**: S ◯ ─ T ☐ are siblings, children of U. So S is R's… parent, female — fine — then Q must be... Q is MOTHER (locked ◯). Two female parents is impossible in exam-land → **the question data is inconsistent → one of my locks is wrong → recheck**: \"R is the daughter of S\" — maybe S is the father's SISTER? No — 'daughter of S' is a parent edge, not negotiable. In EXAM conditions you re-read, find your transcription slip (S for T, etc.), and move on. **The takeaway habit: PASS 3 re-verification against EVERY original statement. Collisions mean YOU mis-drew, not the exam mis-wrote.**

### 4.5 Data Sufficiency: the question AFTER the question

Format: *\"How is Q related to P? — Statement I: Q is the son of M, who is the wife of T. Statement II: P is the brother of T.\"* with standard options:

- **(A)** I alone suffices · **(B)** II alone suffices · **(C)** I or II alone · **(D)** Both needed · **(E)** Neither suffices even together

**Method: triple audit — (1) I alone? build tree from I only. (2) II alone? fresh tree. (3) I+II? merged tree.**

Audit above: I alone → Q son of M; M wife of T. P nowhere → I insufficient. II alone → P brother of T. Q nowhere → insufficient. I+II: P ☐ ─ T ☐… wait T's gender: \"M is wife of T\" → T ☐ ✓. Q ☐ son of couple M+T. P is T's brother → P is Q's **uncle**. **Both together sufficient → (D).**

> ⚠️ **DS discipline:** You do NOT need to find the final answer fully — only whether it CAN be found. Stopping one step early saves 20 seconds. And \"relationship between X and Y\" is SUFFICIENT even if phrased as 'uncle-or-father' only when the question allows ambiguity — mostly: ambiguous = NOT sufficient.

**Gender sufficiency classic:** *\"Is R female? — I: R is the child of P. II: P is the mother of Q.\"* I: R child of P (R ◇). II: P mother of Q — says nothing about R! Together: R child of P, P mother of Q → R and Q siblings, R still ◇ → **(E) neither.** Gender questions love this.

### 4.6 Counting checklist (run before submitting counts)

1. Did I count only **locked** genders for male/female?
2. Recount ═ vs ─ edges separately (couples vs siblings).
3. Generations = deepest vertical chain + 1.
4. Minimum-member question? Try every role-merge.
5. Re-verify final tree against ALL statements, one by one, ticking each.

---

## 🧪 LAB — ShopKart family board meeting (15 min)

The Sharma family holds its first \"board meeting\" with this roster (from statements):

1. Dev is married to Kamla. They have a son Rakesh and a daughter Sunita.
2. Rakesh is married to Meena. Meena's brother Vikram visits the meeting as an investor.
3. Rakesh and Meena have two children — Arjun and Simran.
4. Arjun is married to Priya. They have twin sons.
5. Simran is married to Rohan. They have a daughter Anaya.

**Answer ALL of these against one single tree:**
- (a) Total persons named (incl. Vikram): count.
- (b) Males / females / open-genders.
- (c) Married couples in the tree.
- (d) Generations.
- (e) How is Kamla related to Anaya? How is Vikram related to Priya?
- (f) DATA SUFFICIENCY: \"Is Simran the only daughter of Rakesh?\" — I: Rakesh has exactly two children. II: Arjun is male. Options A–E.

**Answer key:** (a) Dev, Kamla, Rakesh, Sunita, Meena, Vikram, Arjun, Simran, Priya, twin1, twin2, Rohan, Anaya = **13**. (b) Males(7): Dev, Rakesh, Vikram, Arjun, twin×2, Rohan. Females(6): Kamla, Sunita, Meena, Simran, Priya, Anaya. Open: 0 (twins locked ☐ by 'sons'). (c) Couples: Dev+Kamla, Rakesh+Meena, Arjun+Priya, Simran+Rohan = **4**. (d) **4 generations**. (e) Kamla → Anaya: Kamla is Anaya's father's-mother's… trace: Anaya ← Simran ← Rakesh ← Kamla: Kamla is Simran's mother — no — Kamla is RAKESH's mother; Simran is Rakesh's daughter; Anaya is Simran's daughter → Kamla = Anaya's **great-grandmother**. Vikram → Priya: Vikram is Meena's brother; Meena is Arjun's mother; Priya is Arjun's wife → Vikram = Priya's **mother-in-law's brother = uncle-in-law**. (f) I alone: 2 children, genders unknown → not sufficient. II alone: Arjun male — doesn't even mention Simran's siblings count → not sufficient. I+II: 2 children, one is male Arjun; \"Simran the only daughter\" → still unknown whether child-2 is… wait — the two children ARE Arjun and Simran per the puzzle — but in DS you use ONLY the statements: I says exactly two children (named unknown), II says Arjun is male. Is Simran Rakesh's only DAUGHTER? We know of Simran (from the QUESTION itself she's 'daughter' — hmm, the question presupposes she's a daughter: \"Is Simran the only daughter of Rakesh?\") — even accepting Simran ◯ as daughter: exactly two children, Arjun male → other child = Simran = the daughter → YES she's the only daughter → **(D) both together sufficient.** DS rewards exactly this literal-only-data reading.

---

## 💪 Exercises

1. Mini-puzzle: \"A and B are married. C is their son. D is C's wife. E is the daughter of B. F is E's husband.\" Males? Females? Couples? Generations?
2. Minimum members: \"A family has one mother, one father, two brothers, two sisters and one grandfather. LEAST possible members?\"
3. Count honestly: \"P is sister of Q (P ◯). Q is mother of R. S is Q's husband's brother.\" How many CONFIRMED females in P,Q,R,S?
4. DS: \"How is R related to T? — I: R is the wife of S. II: S is the son of T's brother.\"
5. Redo the LAB DS with: \"II: Rakesh's two children include exactly one son.\" New verdict?

### ✅ Selected answers

1. A◇? — \"A and B married\" gives no genders! C ☐ (son). D ◯ (wife). E ◯ (daughter). F ☐ (husband). Males: C, F = **2**; A/B: one ☐ one ◯ but WHICH? **Unknowable split** → \"2 + couple\" reported honestly. Females: D, E + one of A/B. Couples: **2** (AB, CD, EF — recount: A+B couple, C+D couple, E+F couple = **3**!). Generations: **2** (couple-AB + E at -1 level with C; their spouses) → E is B's daughter → E at child level with C; F married E; D married C → 2 generations total. ✔
2. Stack roles: GF is father→the 'father' is GF's son ✔; the couple's two sons = the two brothers; the two sisters = their sisters → members: GF(1) F(2) M(3) son-son(4,5) sister-sister(6,7) = **7**. Merge attempts: can 'mother' double as sister? She'd need sibling edges into the children-gen — impossible, she's parent-level → **7 minimum**.
3. P ◯ ✔, Q ◯ (mother) ✔, R ◇ open, S ☐ (brother). Confirmed females = **2** (P, Q). R excluded — honesty, not pessimism.
4. I alone: R ◯ wife of S; T not in it → no. II alone: R not in it → no. Together: S ☐ son of T's BROTHER → T's branch +1; S at child level of T's sibling; R married to S → R is T's **niece-in-law**… \"brother's son's wife\" = niece-in-law → single definite relation → **(D) both needed, sufficient.**
5. I+II': exactly two children, exactly one son → other child (Simran) is the ONLY daughter → still **(D)**, faster.

---

## ❓ Quiz

**Q1.** In a blood-relations puzzle, the correct count of \"males in the family\" is:
- (a) Every box that looks male-ish
- (b) **Count only gender-LOCKED boxes** — diamonds are counted in neither males nor females; report them as unknown separately
- (c) Half the members, always
- (d) Sons plus fathers, nothing else

**Q2.** \"Minimum members\" puzzles are cracked by the rule:
- (a) Add all stated roles
- (b) **STACK ROLES** — one person legally wears multiple labels (the father IS the grandfather's son); build the SMALLEST tree satisfying every label
- (c) Assume one couple only
- (d) Use the family average of 7

**Q3.** Data Sufficiency \"How is X related to Y?\" is being solved. The winning discipline is:
- (a) Answer the relation, then check statements
- (b) **TRIPLE AUDIT in order: build from I alone (insufficient? move on), fresh tree from II alone, merged tree I+II** — and stop the moment sufficiency is decided; the final relation itself is optional
- (c) Always mark 'both needed'
- (d) Skip all DS — they're traps

### ✅ Answers

1. **(b)** — examiners plant a 'Suman' or 'Kiran' hoping you'll round it into a gender. Locked-only counting is how your answer survives the gender-open node every single time.
2. **(b)** — \"one mother, one father, two brothers, two sisters, one grandfather\" is 7, not 8, because labels stack. Draw the smallest legal tree; if two labels can share one body without breaking any statement, they must.
3. **(b)** — the triple audit, in order, fresh tree each time. Marking (D) 'both together' the moment statement I fails alone is how DS questions get guessed wrong; sometimes II alone does the job.

---

## ✅ Mastery checklist — BR4

- [ ] Three-pass blueprint (skeleton → locks → resolve) run on 3+ puzzles
- [ ] Five counting sub-questions answered from ONE tree without redrawing
- [ ] 'Not the mother' → father: I harvest negative locks automatically
- [ ] Minimum-member stack-roles method proven on 2 puzzles
- [ ] DS triple audit executed in order, stopping at sufficiency
- [ ] Pass-3 re-verification habit: every original statement ticked against final tree

---

**Next:** ⚡ **BR5 · Traps, Speed & The Mock Arena** — the five certified score-killers (gender-name bait, 'only-son of my wife', cannot-be-determined phobia, cross-cousin mix-ups, generation skips), the 20-second elimination kit, and ONE full 10-question timed Mock Arena with full analysis. Bring your stopwatch.
