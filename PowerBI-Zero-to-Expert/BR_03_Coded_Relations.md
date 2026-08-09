# 🔐 BR3 · Coded Blood Relations: Symbols Are Just English in a Mask

> Now the exam swaps its costume. Instead of \"A is the mother of B,\" you get **\"A × B means A is the mother of B\"** — and whole questions become expressions like `P × Q − R`. Toppers love this format because it is *more* mechanical than plain chains: one decode table, one tree, one answer. Students who skip the decode-table step donate these marks to you. Today you become the glutton who collects them — in under 60 seconds per question.

---

## 🎯 Objectives

- Build a **decode table** from symbol definitions before touching any expression.
- Read **expression chains** like `A + B × C − D` with strict left-to-right order.
- Translate both directions: forward (what does `M − N` mean?) and **reverse** (which expression means \"P is the uncle of R?\").
- Keep **gender-diamonds** alive through symbols — codes hide genders more than English does.
- Use the **verify-backwards** trick for reverse questions in MCQs.
- Hit the 45–60 second arena pace on 3-symbol expressions.

---

## 📘 Concepts

### 3.1 The decode table: your first 15 seconds buy the whole question

Given: *\"A + B means A is the father of B; A − B means A is the sister of B; A × B means A is the mother of B; A ÷ B means A is the brother of B.\"*

Before ANY expression, spend 15 seconds on this grid in your rough work:

```
+  →  A is FATHER of B    (A ☐ above B)
−  →  A is SISTER of B    (A ◯ ─ B, same level)
×  →  A is MOTHER of B    (A ◯ above B)
÷  →  A is BROTHER of B   (A ☐ ─ B, same level)
```

**Two gifts hidden in codes:** (1) Each operator reveals the **operator's own gender** (+/÷ make A male; −/× make A female). (2) Each reveals **vertical vs horizontal** — who climbs down a generation. Your decode table collects both gifts before the question even starts.

### 3.2 Reading expression chains: strict left-to-right, one edge at a time

**Problem:** If `P × Q − R ÷ S`, how is P related to S?
Read as English, left to right:
- `P × Q` → P is **mother** of Q (P ◯ above Q)
- `Q − R` → Q is **sister** of R (Q ◯ ─ R …so R's gender still open ◇)
- `R ÷ S` → R is **brother** of S (R ☐ unlocked! ─ S ◇/answer target)

Tree:

```
        P ◯
        │
   ┌────┴────┐
   Q ◯ ─ R ☐ ─ S ◇   (Q, R, S are siblings; P is their mother)
```

Answer: **P is S's mother.** Gender of S unknown — but the question asked P's relation to S, and mother needs no S-gender. ✔

> ⚠️ **Precedence trap:** Blood-code expressions have **NO BODMAS**! `×` does not jump the queue. Evaluate strictly left→right. Exams assume it, and bracket-phrased questions say so explicitly (\"P × (Q − R)\" appears in tougher papers — treat the bracket as a mini-question first).

### 3.3 Direction senses: \"mother OF\" vs reading backwards

In `A × B` = \"A is the **mother OF** B\": the FIRST letter carries the label. Reverse-reading accidents: reading it as \"A is the child of B\" flips every generation. Killing ritual: before building, say the definition aloud once with the letters: *\"cross: LETTER-ONE mothers LETTER-TWO.\"*

**Sneaky exam variant (mixed forms):** some papers split direction by operator: \"A % B means B is the son of A\" — same logic, definition reversed for a few operators only. Your decode table must record **exact words each time** — never reuse yesterday's table from habit.

### 3.4 The reverse question: \"Which expression means P is the maternal uncle of R?\"

The champion's move is **build-target-first**:

1. Draw the TARGET tree first: P ☐ must be the BROTHER of R's MOTHER →

```
        G ◇ (grandparent)
        │
    P ☐ ─ M ◯ (R's mother)
              │    ← M above R
              R ◇
```

2. Now **generate** the expression from symbols you were given: if `×`=mother-of and `÷`=brother-of: `M × R` makes M the mother… then `P ÷ M` makes P brother of M → combined `P ÷ M × R` (read L→R: P brother-of M; M mother-of R). ✔
3. Match your generated string against options. 30 seconds, zero trial-and-error.

When stuck, **verify-backwards**: pick option B, decode it fully into a tree, ask \"is P R's mother's brother?\" Four quick trials max — still ~1 min.

### 3.5 Gender diamonds inside codes (the #1 silent killer)

In `P ÷ Q − R`: P ☐ brother-of Q; Q ◇?? — no wait: `Q − R` means Q is SISTER of R → Q ◯ revealed by operator 2. Operators genders: first-position letters get gendered by THEIR operators; letters in second position stay diamond until something later touches them. **Check R: nothing genders R → R is ◇.** If the question asks \"R is P's…?\" the honest answer is **nephew OR niece → cannot be determined**. BR4 & BR5 drill this to reflex.

### 3.6 Speed benchmarks (BR3 arena)

| Task | Safe pace |
|---|---|
| 4-operator decode table | 15 s (invested, saved later) |
| 3-symbol expression → tree | 25 s |
| Trace + answer | 10 s |
| Reverse-build (uncle/aunt targets) | 30–45 s |
| **Whole coded question, realistic** | **45–60 s** |

---

## 🧪 LAB — ShopKart org-code (10 min)

ShopKart's training quiz for new joiners uses these offices-in-code (practice set):
`+` = father-of · `−` = sister-of · `×` = mother-of · `÷` = brother-of

1. `R + A` — write the known facts about R and A (genders, levels).
2. Given the Sharma family matches: `Dev + R` `R + A` `M × A` `S ÷ R` `P − Sim?` — hmm, let's keep letters: `Dev + R`, `R + Aj`, `Me × Aj`, `Su ÷ R`, `Ro × An`. Draw the single tree. How is Su related to Aj? How is Me related to An… (only if the tree allows — check!)
3. How is R related to An in `R + Aj`; `Aj ×` … nope — think: does the given chain connect R to An at all?
4. Reverse: with the same operators, build an expression for \"Su is the paternal aunt of Kab.\" (Hint: Kab must hang under R+…; what operator puts Aj as Kab's father AND links Su to R?)
5. In `Ro × An`, what is still unknown about An?

**Answer key:**
1. R is Aj's father → R ☐, one level above A◇ (`+` genders only R; A stays diamond).
2. Tree: Dev ☐ above (R ☐ ═ Me ◯ — since both produce Aj), Su ☐ ─ R (brothers), Aj hangs under R+Me as R's SON? wait — `Me × Aj` = Me MOTHER-of Aj, and `R + Aj` = R FATHER-of Aj → couple R+Me, child Aj ◇; `Ro × An`: Ro MOTHER of An — floating tree, NOT connected to the main one!
   **Su is Aj's uncle** (father's brother → chacha). **Me vs An: CANNOT be connected** — two floating trees; that's question 3's whole lesson.
3. **No relation derivable** — separate trees. Exams call this \"no relation/data inadequate.\" Say it confidently.
4. Su ÷ R + Aj → … need Aj to father Kab? Aj's gender unknown! To force paternal-aunt-of-Kab from Su, Su must be SISTER of Kab's FATHER, but ÷ makes Su male (brother). **Impossible with THESE operators** → correct answer in MCQ = \"none of these.\" Spotting impossibility is an answer, too.
5. An's **gender** — ÷/− never touched An. Diamond stays.

---

## 💪 Exercises

1. Decode-table drill: `+`=son-of, `−`=daughter-of, `×`=husband-of, `÷`=wife-of. Gender of A in `A + B`? In `A × B`? In `B ÷ A`?
2. `P + Q − R × S` (operators from the LAB set): full tree + \"how is S related to P?\"
3. If `K ÷ L + M`, write every fact now known about each of K, L, M.
4. Reverse with LAB operators: expression for \"M is the niece of Q.\" What's the minimum symbol count you'll need, and why?
5. Timed: three 3-symbol questions of your own invention, swap with a friend, total ≤ 6 min.

### ✅ Selected answers

1. `+`=son-of → A ☐ child of B. `×`=husband-of → A ☐ spouse. `B ÷ A` = B is wife OF A → A ☐. (Definition-first-letter rule wins every time.)
2. P father-of Q (P ☐ above Q); Q sister-of R (siblings Q◯─R◇); R MOTHER-of S (R ◯ above S) → S is P's **grandchild (gender open)**: daughter… — R is Q's sister, Q is P's child → R is also P's child (sibling same parents) → S hangs under R → **S = P's grandchild**. \"Granddaughter\" only if S's gender locks — it never does → \"grandchild\" or MCQ's equivalent \"son/daughter of P's child.\"
3. K is **brother** of L (K ☐). L is **father** of M (L ☐, above M). M ◇ (never gendered). K is M's **uncle**.
4. Niece = child-of-Q's-sibling, specifically female. Need: Q with a sibling (one operator), that sibling genders a parent-edge to M (second operator genders M ◯ ONLY if M sits first-position of − or ×… M must BE 'sister-of/daughter-of' something). Min **2 operators**, e.g. with LAB set: `M − X` … plus M connecting under X's parent — realistic form: `M − S` with `S` as sibling of… it takes 3 properly (`M − A ÷ Q` family). The point: count the EDGES your target tree needs — niece needs a sibling-edge + a parent-edge + a gender lock = **≥ 2, usually 3**.
5. Log total time; under 6 min pairs you with BR5's arena pace.

---

## ❓ Quiz

**Q1.** You're handed 4 symbol definitions. Before reading the actual question, the professional's first move is:
- (a) Check the options first
- (b) **Write the full decode table** — every operator's exact words, first-letter rule, gender + level gifts
- (c) Draw a tree of your own family
- (d) Read the expression aloud

**Q2.** `P × Q − R` where × = mother-of, − = brother-of. R is P's:
- (a) Son, for sure
- (b) **Son or daughter — gender NOT fixed** — Q is brother of R, so R is P's child too, but R sits in the second slot of `−` and nothing genders it
- (c) Nephew
- (d) Brother

**Q3.** \"Which expression means P is the MATERNAL uncle of R?\" — fastest accurate method:
- (a) Test each option's full tree one by one
- (b) **BUILD THE TARGET first** — P must be brother of R's mother — then write the expression my own tree demands, and match it to an option
- (c) Read options backwards
- (d) Guess the middle option

### ✅ Answers

1. **(b)** — the decode table is a 15-second investment that buys ALL sub-questions. Skipping it is how `×` becomes 'father' at hour two of the exam. First-letter rule: the first letter in the expression wears the definition's label.
2. **(b)** — P mothers Q; Q is brother-of R → Q, R siblings → R is ALSO P's child; but R sits in the second slot of `−`, which genders only the FIRST letter (Q). R stays ◇ → **son or daughter**. Gender-honesty is BR3's whole game.
3. **(b)** — target-first: maternal uncle = mother's brother. Draw it, generate the string, match. Reverse-guessing options is 4× slower and leaks gender errors.

---

## ✅ Mastery checklist — BR3

- [ ] Decode table drawn FIRST, with gender + level gifts noted
- [ ] Left→right reading; no BODMAS fantasies
- [ ] First-letter-wears-the-label rule quoted to myself per operator switch
- [ ] Reverse questions: I build target FIRST, then generate + match
- [ ] Diamonds kept: I can name exactly WHICH letters stay ungendered and why
- [ ] 45–60 s pace hit on at least 3 consecutive coded questions

---

**Next:** 🧩 **BR4 · Family Puzzles & Data Sufficiency** — the big multi-statement families of IBPS/SSC: 6 statements → 1 tree → 4 sub-questions (count males, count generations, minimum members, \"how is P related to Q\") — plus the Data Sufficiency yes/no format that decides nothing right after you've drawn everything.
