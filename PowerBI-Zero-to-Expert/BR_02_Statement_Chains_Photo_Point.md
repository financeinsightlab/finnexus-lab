# 🧭 BR2 · Statement Chains & The Photo Point

> Welcome to the two shapes that make up nearly **70% of all blood-relation questions** in SSC, banking (IBPS/SBI), TCS NQT and campus tests: the **statement chain** (\"A is the brother of B. B is the wife of C…\") and the **photo point** (\"Pointing to a photograph, Ramesh said…\"). Both look wordy; both melt under the same 3-step routine you'll master today: **Chain → Tree → Trace**. After this module, a chain question should never take you more than 45 seconds.

---

## 🎯 Objectives

- Convert any **statement chain** into a tree node-by-node, without re-reading.
- Use the **anchor technique**: start where the chain touches YOU or a known person.
- Master **backtracking** for \"How is X related to Y?\" (trace up, then down).
- Crack **photo-pointing classics** with the quote-splitting method.
- Handle **dialogue/introduction** forms (\"Introducing a man, a woman said…\").
- Keep gender-diamonds honest while chaining.

---

## 📘 Concepts

### 2.1 The universal 3-step routine (Chain → Tree → Trace)

```
STEP 1 · CHAIN  — read left to right; each clause adds ONE edge or ONE person
STEP 2 · TREE   — your paper builds itself as you read; names → letters in boxes
STEP 3 · TRACE  — answer = walk from X up to the junction, then down to Y
```

The trace walk is where answers live: **X → up the stairs to the common junction → down to Y**. Name each step of the walk and the relation names itself.

### 2.2 Building chains node-by-node (live demo)

**Classic:** \"A is the brother of B. B is the daughter of C. C is the wife of D. How is A related to D?\"

- Clause 1: A ☐ ─ B (siblings; A male, B diamond so far…)
- Clause 2: B is daughter of C → B is now ◯! Put C ◯? No — C's gender unknown yet, but B hangs below C.
- Clause 3: C is the WIFE of D → C ◯ ═ D ☐, and B is their daughter → B also hangs below the couple. A, being B's sibling, hangs at the SAME level.

```
C ◯ ═ D ☐
     │
  ┌──┴──┐
 A ☐ ─ B ◯
```
Trace A → up to D: A is **D's son**. Done. Notice clause 2 *also* fixed B's gender — the tree collects gifts as it grows.

### 2.3 The anchor technique (when the chain mentions YOU)

Chains like \"The brother of my mother's husband…\" are just chains starting at a named anchor: **YOU**. Plant `ME ◇/☐` first; hang every clause off it:

- \"Brother of my mother's husband\": mother's husband (assume my father, unless step-said) +1; his brother = paternal uncle, +1.
- \"Daughter of my father's only brother\": father +1 → his only brother +1 (my chacha) → his daughter at 0 → **cousin**.

> ⚠️ **Anchor trap:** \"my mother's husband\" is NOT always \"my father\" — if the question later says the family remarried, it's a step-father. Keep the diamond of doubt until the text locks it.

### 2.4 Backtracking for \"How is X related to Y?\" (the junction walk)

1. Find the **lowest common junction** — the couple/person where X's branch and Y's branch meet going UP.
2. Count stairs X→junction, junction→Y.
3. Same-level-endpoints with 1-up-1-down = nephew/uncle zone; 2-up = grandparent zone.

**Drill:** \"How is P related to T?\" where P is the son of Q's sister, and T is the daughter of Q.
- Junction = Q's parents. P: son of Q's sister → Q's sister is +… draw it: Q's sibling's child = **nephew** for Q. T = Q's daughter. P and T: mothers (Q and Q's sister) are siblings → P and T are **cousins**. ✔

### 2.5 The Photo Point — quote-splitting method

**The king of classics:** *\"Pointing to a photograph of a woman, Ramesh said, 'She is the daughter of my grandfather's only son.' How is the woman related to Ramesh?\"*

```
METHOD: cut the quote at the middle, solve the TAIL first.
TAIL:  "my grandfather's only son"  → grandfather +2 → ONLY son = my FATHER (lock: 'only' = no brothers)
HEAD:  "She is the daughter of [MY FATHER]" → father's daughter = MY SISTER
Answer: SISTER ✔ (the 'only' did ALL the work — circle every 'only'!)
```

**Mad-libs table for photo points** (solve tail → attach head):

| Quote tail | Resolves to |
|---|---|
| my grandfather's only son | my father |
| my father's mother | my grandmother |
| my mother's husband | my father (unless step marked) |
| my father's only daughter | me/my sister (speaker female → speaker herself; male speaker → his sister!) |
| my wife's mother | my mother-in-law |
| my husband's only brother's wife | my sister-in-law (saali… no — husb.'s brother's wife = co-sister / nand-bhabhi zone → sister-in-law ✔) |

### 2.6 Introduction & dialogue forms (same engine, new costume)

*\"Introducing a man to her husband, a woman said, 'His brother's father is the only son of my grandfather.' How is the woman related to the man?\"*

- Tail-first: \"only son of my grandfather\" = **her father**.
- Head: \"His [the man's] brother's father\" — a man's brother's father = the man's OWN father.
- Quote = \"The man's father is MY father\" → they share fathers → **siblings → the woman is his SISTER**. ✔

Dialogue version: *A told B, \"The girl I met yesterday was the youngest daughter of the brother-in-law of my friend's mother.\"* — Don't panic: tail-first — friend's mother's brother-in-law (mother's brother or mother's husband's brother) — draw for your friend as the separate tree, keep your own tree apart — BR5 will give this full weapons-grade treatment. Today just note: **two people speaking = two trees, one bridge**.

### 2.7 Speed benchmarks (BR2 targets)

| Item | Warm-up time | Exam target |
|---|---|---|
| 3-clause chain | 2 min | **40 s** |
| Photo point | 90 s | **30 s** |
| Intro-dialogue | 2 min | **50 s** |
| Trace + state answer with stairs | 60 s | **15 s** |

---

## 🧪 LAB — ShopKart notice board chains (12 min)

ShopKart's HR notice introduces the family team (the Sharmas hire family, proudly). Solve every chain by writing the three steps:

1. \"Arjun is the son of Rakesh. Rakesh is the brother of Sunita. Simran is the daughter of Rakesh.\" How is Sunita related to Simran?
2. \"Priya is the wife of Arjun. Arjun is the son of Rakesh.\" How is Priya related to Meena (Rakesh's wife)?
3. Photo point: Pointing to a photo, Rakesh says, \"He is the only son of my mother's only daughter-in-law's husband.\" Who's in the photo? (Slow down — double 'only' ahead — tail-first!)
4. Intro: Introducing Rohan to a vendor, Simran said, \"His father-in-law is the only son of my grandfather.\" How is Rohan related to Simran?
5. Pointing at Anaya, Kabir said, \"She is the daughter of the only sister of the only brother of my mother.\" How is Kabir related to Anaya?

**Answer key:**
1. Sunita = Simran's **paternal aunt (bua)**. Sunita +1, Simran −1 style trace via Rakesh.
2. Priya = **Meena's daughter-in-law** (bahu). One ═ edge below the couple.
3. Tail: \"my mother's only daughter-in-law\" = Rakesh's SISTER-in-law (brother's wife or wife of mother's son… careful — mother's daughter-in-law = mother's son's wife = Rakesh's brother's wife OR Rakesh's OWN wife if Rakesh is her son ✔ come on now — assume Rakesh is her son: daughter-in-law = Meena or his brother's wife; \"ONLY\" → mother's only DIL. Her husband = that son of the mother. \"The ONLY son [again!] of HER husband\" = grandson. If the only DIL is MEENA (Rakesh's wife), her husband = Rakesh → his only son = **ARJUN.** The photo is Arjun! (Double-'only' did double duty.)
4. \"His father-in-law\" = Rohan's wife's father. \"Only son of MY grandfather\" = my father or his only brother… grandfather's only son = **Simran's father Rakesh** (only ⇒ no brothers). So Rohan's wife's father = Rakesh → Rohan's wife = Rakesh's daughter = SIMRAN… wait — Simran is speaking about HIM; his father-in-law being her father means HE MARRIED HER — **Rohan is Simran's HUSBAND** ✔ (matches BR1's LAB family — consistency check passed!).
5. \"Only brother of my mother\" = Kabir's mama (maternal uncle). \"Only sister of [mama]\" = Kabir's MOTHER herself (Priya)… or another sister — 'only' resolves it: mama's only sister = PRIYA (Kabir's mother). \"Daughter of Priya\"?? But Anaya is Simran's daughter… **CONTRADICTION → the data is inconsistent / Kabir is mistaken** — bold \"cannot be determined.\" Spotting inconsistency is a scoring skill; exams reward it.

---

## 💪 Exercises

1. \"A is the mother of B. B is the sister of C. C is the father of D.\" How is A related to D?
2. Pointing to a boy, Neha says, \"He is the only son of my father's only son's wife.\" Neha is a man. Who's the boy?
3. \"Pointing to a photo, a woman said, 'His father is the only son of my father.'\" (Speaker is female.) Relation: photo-person to speaker?
4. X is the wife of Y. Y is the brother of Z's father. How is X related to Z?
5. Speed run: redo LAB Q1 & Q4 silently; log your seconds against the table in 2.7.

### ✅ Selected answers

1. A is D's **grandmother**: C is B's brother (B is *sister* of C ☐/◯ — wait: \"B is the sister of C\" → B ◯, and C is D's FATHER → C ☐), A is mother of B-sibling → A is C's mother → D's **paternal grandmother**. Tree: A ◯ at +2 above C ☐ and B ◯; C ═ (wife) with child D. ✔
2. \"My father's only son\" = Neha HIMSELF (male, only son). \"His wife's only son\" → Neha's own **SON**. (Two 'only's, two locks — no brothers anywhere.)
3. Speaker's father's only son = her BROTHER. \"His (photo's) father is my brother\" → photo-person's father = speaker's brother → the person in the photo is her **nephew/niece** — GENDER OF PHOTO UNKNOWN! \"His father\" gives the photo-person as male ✔ — HIS father means the photo is of a MALE. → **nephew** (speaker is the aunt). Two micro-locks: photo-male + speaker-female.
4. Y is brother of Z's father → Y = Z's paternal uncle; X = Y's wife → **aunt (chachi)** to Z. Clean 1-1-trace.
5. Targets: Q1 ≤ 40 s, Q4 ≤ 50 s. If you beat them two days running, BR3 will feel easy.

---

## ❓ Quiz

**Q1.** Pointing to a photograph, Ramesh said, \"She is the daughter of my grandfather's only son.\" The woman in the photo is Ramesh's:
- (a) Aunt
- (b) **Sister** — grandfather's only son = Ramesh's father; father's daughter = his sister
- (c) Mother
- (d) Cousin

**Q2.** \"A is the mother of B. B is the sister of C. How is A related to C?\" — the full 3-step verdict:
- (a) Aunt — sister's mother is always aunt
- (b) **Mother** — B and C share parents; 'sister-of' locks them as siblings, so A mothers them both
- (c) Grandmother
- (d) Cannot be determined

**Q3.** In \"How is the woman related to ME?\" questions, the fastest safe opening move is to:
- (a) Draw from the woman outwards and hope to reach yourself
- (b) **Place MYSELF as the anchor node first, then hang every clause off ME**
- (c) Assume the woman is female-adjacent and skip drawing
- (d) Count clauses and guess by length

### ✅ Answers

1. **(b)** — tail-first: grandfather's only son = my father ('only' = zero brothers, locked). \"Daughter of my father\" = my **sister**. The word 'only' is a padlock — circle it the instant it appears.
2. **(b)** — \"B is the sister of C\" = B and C are siblings of the same parents. A mothers B → mothers C too → **A is C's mother**. Options pushing 'cannot be determined' here are bait — siblings share parents is a standard exam assumption.
3. **(b)** — the anchor technique. 'Me' chains are just chains with a free starting gift: YOU. Plant ME first, hang clauses, trace.

---

## ✅ Mastery checklist — BR2

- [ ] Chain → Tree → Trace written at the top of my rough sheet before starting
- [ ] Anchor (ME-planted) method used on at least 3 problems
- [ ] Junction-walk trace: I can name each stair while walking X→J→Y
- [ ] Photo points: I split quotes at the middle and solve tails first, every time
- [ ] I CIRCLE every 'only' — it's a lock, not decoration
- [ ] Speed: LAB Q1 in ≤ 40 s, Q4 in ≤ 50 s (logged!)

---

**Next:** 🔐 **BR3 · Coded Blood Relations** — when exams swap English for symbols: `A + B means A is the father of B`. Decode tables, expression chains, and the \"which code means…\" reverse questions — the format where slow readers donate marks to you.
