# 🔄 AV3 · The Group-Change Engine: Members In, Out & Replaced

> "A teacher joins the class and the average rises…", "One worker leaves and the average drops…", "Two groups merge…" — this pattern is the single most-tested average machine in Indian exams (and interviews love it too: "your store network's average basket just changed"). Golden properties die when the GROUP SIZE changes; the **totals-before-and-after engine** never does. One engine, every question.

---

## 🎯 Objectives

- Convert every group-change problem into **total BEFORE → event → total AFTER**.
- Use the **new-member formula**: new = (n+1)×newAvg − n×oldAvg.
- Use the **replacement formula**: replaced-old + n×(change in avg).
- Merge groups with the **combined-average formula** — and learn when simple averaging of averages is WRONG.
- Apply all four to ShopKart staffing/sales scenarios fluently.

---

## 📘 Concepts

### 3.1 The engine: totals are the truth (set it up in 10 seconds)

Every group problem is 5 steps:
1. **BEFORE total** = oldAvg × oldN
2. Read the **event** (join/leaves/replace/merge)
3. **AFTER total** = newAvg × newN (when known)
4. The **difference** IS the question's answer
5. Verify: does the answer direction (+/−) make sense? (sanity check — Module 6 goes deeper)

The engine never guesses; it *accounts*. Averages are summaries; **totals are the ledger**. (ShopKart's finance team approves this framing 😄.)

### 3.2 Member joins (new-member formula)

A class of 30 students averages 60 marks. When the teacher's marks join, the average of all 31 becomes **61**. Teacher's marks?
```
Total without teacher  = 30 × 60 = 1800
Total with teacher     = 31 × 61 = 1891
Teacher's marks        = 1891 − 1800 = 91  ✔️
```
**Formula:** `new member value = (n+1) × newAvg − n × oldAvg`

**Lightning shortcut (deviation view):** The increase per person = 61 − 60 = 1, spread across all 30 old members = 30 "extra" marks gifted. So the teacher brought avg + gift = 60 + 1 + 30 = **91**. Same answer, 5 seconds, no big multiplication. Understand both — shortcut for exams, formula as backup.

**Sense check:** avg rose → the newcomer must be ABOVE the old average. 91 > 60 ✓.

### 3.3 Member leaves (and the leaving total)

Ten ShopKart riders average 50 deliveries/day. One rider leaves; the rest average 51. How many deliveries did the leaver have?
```
Total before = 10 × 50 = 500
Total after  = 9 × 51 = 459
Leaver's count = 500 − 459 = 41  ✔️
```
Formula: `leaver value = n×oldAvg − (n−1)×newAvg`.
**Deviation shortcut:** the 9 remaining each gained +1 → freed 9 from their pockets: leaver had 50 − 9 = **41** ✓. When the average RISES on a departure, the leaver must have been BELOW average (dragging it down) ✓.

### 3.4 Replacement swap (the two-in-one move)

The average age of 8 team members is 24. A 30-year-old is replaced by a new member and the average becomes 25.5. New member's age?
```
Total change = 8 × (25.5 − 24) = 8 × 1.5 = 12 years gained
New member = replaced (30) + 12 = 42  ✔️
```
**Formula:** `new member = old member + n×(avg change)`  (+ when avg rises, − when it falls).
Why it works: only the swap changes the total; the whole group's gain = the new person's advantage over the old. One line, ₹1,00,000 worth of exam time saved.

### 3.5 Merging groups (combined average — and the illegal shortcut)

Class A: 20 students, avg 12. Class B: 30 students, avg 20. Combined average?
```
Combined total = 20×12 + 30×20 = 240 + 600 = 840
Combined n = 50
Combined avg = 840 ÷ 50 = 16.8  ✔️
```
**Formula:** `combined avg = (n₁·a₁ + n₂·a₂) ÷ (n₁ + n₂)`

🚫 **The illegal shortcut students keep taking:** (12 + 20)/2 = 16 — WRONG! That "average of averages" would only be correct if **both groups had equal size**. Sizes differ → must weight (that's literally Module 4's weighted average). The legal shortcut exists though — Module 4.4's line method: combined avg MUST sit between 12 and 20, closer to 20 (B is bigger) — 16.8 sits correctly ✓.

**Merge sanity table (train your gut):**

| Group sizes | Combined avg sits… |
|---|---|
| Equal | exactly midway |
| Bigger group matters | closer to the bigger group's average |
| One tiny group | barely pulled off the big group's average |

---

## 🧪 LAB — ShopKart shifts & stores (20 min)

Scenario: Five stores average ₹15,000 daily sales; a new premium store opens with ₹21,000 daily sales.

A. New network average? (use formula + deviation shortcut; confirm both agree)
B. A week later the LOWEST store (₹9,000/day) is shut for renovation. Average of the remaining 5? (careful: which average is before-value now? Compute the network total first!)
C. For the renovation decision: if instead the ₹9,000 store were REPLACED by a new ₹18,000 store (same network size of 6 as after A), what's the new average via the replacement formula?
D. Sanity-ladder: order the three outcomes (shut vs replace vs nothing changed) — which must be highest, lowest, and why, in one line each.

---

## 💪 Exercises

1. The average of 15 numbers is 40. A 16th number joins and the average becomes 41. Find the 16th number. (formula AND shortcut, both)
2. The average weight of 6 persons increases by 2.5 kg when a person weighing 80 kg is replaced by a new person. Find the new person's weight.
3. Two sections: X (25 students, avg 68) and Y (15 students, avg 78). Combined average?
4. 12 employees average ₹42,000/month. One leaves and the average of the remaining falls to ₹40,000. What was the leaver's salary?

### ✅ Selected answers

**LAB:** A) New total = 75 + 21 = 96; avg = 96/6 = **₹16,000** (shortcut: +6k over 6 stores = +1k each ✓). B) Network total after A = 96; remove 9 → total 87 over 5 → **₹17,400/day**. C) Replacement: change = 6 × (avg_new − 16) and new avg = 96 − 9 + 18 = 105 → 105/6 = **₹17,500**; check: replaced 9 + 6×(1.5) = 18 ✓. D) Replace > shut-down > nothing: replacement ADDS value, shutdown removes a drag (lower addition), doing nothing stays at 16k ✓.
**Exercises:** 1) Total 600 → 656; 16th = **56**; shortcut 40 + 1 + 15 = 56 ✓ 2) gain = 6 × 2.5 = 15 → new = **95 kg** 3) (1700 + 1170)/40 = 2870/40 = **71.75** 4) 12×42 = 504; 11×40 = 440; leaver = **₹64,000**.

---

## ❓ Quiz

1. When group size changes, golden properties break, so we use…
2. A leaver causes the group's average to RISE. The leaver's value must be…
3. "Average of averages" (a₁ + a₂)/2 is legal ONLY when…

### ✅ Answers

1. **The totals engine**: before-total → event → after-total → difference = answer (with sense-check). Totals are the ledger; averages are summaries.
2. **Below the old average** — removing a value below the pivot raises the beam; deviation shortcuts (remaining members gained) prove it in 5 seconds.
3. **Both groups have equal size.** Otherwise use weighted combining (n₁·a₁ + n₂·a₂)/(n₁+n₂) — Module 4 makes this permanent instinct.

---

## ✅ Mastery checklist — AV3

- [ ] Totals engine set up in ≤10 s on any group problem
- [ ] New-member + leaver formulas fluent, shortcut versions too
- [ ] Replacement one-liner: new = replaced ± n×(avg change)
- [ ] Combined average formula + merge-sanity gut (closer to bigger group)
- [ ] I never divide two averages again unless sizes are equal 🚫

---

**Next:** 🎯 **AV4 · Weighted Averages & Speed Shortcuts** — the assumed-mean mental math, deviation stacking, the two-group line shortcut, and why the "simple average" lies to you in offices and exams alike.
