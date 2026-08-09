# 🎯 TW3 · Alternates, Leavers & Joiners
> The choreography chapter: A and B swing the hammer **on alternate days**, a worker **leaves** mid-job, a fresher **joins** halfway. All of it is tank bookkeeping — except the alternate-day cycle, where the off-by-one guillotine waits for anyone who computes averages instead of walking the calendar day by day.

## 🎯 Objectives
- Solve alternate-day problems by walking **2-day cycles** (and reciting who owns day 13, not assuming it).
- Master the **bank-then-price** ledger for leavers/joiners: tank credited by whoever showed up.
- Distinguish "time the finisher works" from "total project time" — the leave-loss misread.
- Run man-day crew arithmetic under velocity changes mid-project.
- Fill-and-drain preview: tanks that lose units (TW4 weaponizes the sign).

## 📘 Concepts

### 3.1 The alternate-day machine — cycles + the day-walk
```text
A alone: 10 days · B alone: 20 days · they work on ALTERNATE days, A starts.
Tank = 20 u: A = 2 u/d, B = 1 u/d.
One 2-day cycle banks 2 + 1 = 3 units.
20 units = 6 cycles (18 u, 12 days) + 2 units left → day 13 is A's day: 2 u ⇒ DONE.
Total = 13 days exactly ✓
```

The off-by-one guillotine: the average-per-day crowd computes 20/1.5 = 13.33 days and enshrines it — wrong, because work arrives in **discrete daily lumps** and day 13 is A's hammer, not 0.33 of a person. Protocol: **whole cycles, then walk the remainder day by day.** (If the remainder were 1 unit, still day 13: A does it in half his day ⇒ 12.5 days — remainders CAN be partial-days at the very end; the crime is fractional EARLIER days.)

### 3.2 Leavers — bank, subtract, reprice
```text
A (12 d, 3 u/d) and B (18 d, 2 u/d) work together; after 4 days A leaves.
Bank: 4 × 5 = 20 u · Remaining: 16 u at B's 2 u/d ⇒ 8 more days
Total project time = 4 + 8 = 12 days ✓   (B personally works all 12; A worked 4)
```

Two different "finish times" live here and exams farm the confusion: B's personal tenure (12 days — every day) vs the often-asked "how long did B work AFTER A left" (8). Read the question's stopwatch, then price it. The tank never confuses them; only sentences do.

### 3.3 Joiners — the reverse door
A works alone, B joins after day 5 (A: 20 d ⇒ 1.5 u/d? — tank 20: A = 1 u/d? make it 20-tank A=1 u/d, B: 10 d ⇒ 2 u/d): bank 5, joint 3 u/d ⇒ remaining 15/3 = 5 ⇒ total 10 days. Joiners compress; leavers stretch; the bank line is the same ledger. Man-day version: total man-days billed = 5×1 + 5×3 = 20 ✓ equals tank — always cross-check; work CANNOT leak from the ledger.

### 3.4 Capacities mid-project — ShopKart warehouse reset
The ₹-translation: contractor signs for a 150 man-day reset in 10 days ⇒ staffs 15/day. Day 4, five walk out ⇒ banked 60 man-days; remaining 90 with 10/day ⇒ 9 more days ⇒ total 13 days, **3 days late**. Now price responses with the tariff from the brief (penalty ₹5,000/day): lateness costs 15k; better response — hire 5 temps at day 4 (bank 60, then 15/day again ⇒ remaining 90/15 = 6 ⇒ total exactly 10 ✓, extra invoiced man-days 5×6 = 30 ⇒ ₹75,000). TW6 makes you *choose* the response; TW3 teaches you to *compute* both.

### 3.5 The subtle alt-pair traps (arena preview)
- **3-worker rotation** A,B,C repeat: cycle = 3 days summing their flows; remainder walk day-by-day in rotation order.
- **"B starts" flip:** remainder lands on a different hammer (13th day = B ⇒ 1 u/d ⇒ an extra full day if 2 units remained ⇒ 14 days) — who starts MOVES the finish.
- **Negative crew member** (the destroyer/un-painter): flows subtract (pipe-leak logic sneaking in early — TW4).

## 🧪 LAB — The calendar walk (10 min)
1. A (6 d) and B (12 d) alternate, A starts. Tank, cycle, and total time?
2. Same pair, B starts. Total time? (Watch the remainder change hammers.)
3. A (15 d) & B (30 d) together for 2 days, then A leaves. Total time? B's tenure?
4. A alone (20 d) gets a B (10 d) joining after day 5. Total?
5. Rotation: A (6 d), B (12 d), C (24 d) cycle A→B→C → total time? (Tank 24: 4,2,1; cycle banks 7; remainder walk.)

**Why this matters:** alternates and leavers are the exam's favorite "designed" questions — they test calendar care, not formula memory, which is exactly why trained calendar-walkers cash them in 60 seconds.

**🔑 Lab answers:** (1) tank 12: cycle 3 u ⇒ 4 cycles = 12 ⇒ **8 days exactly** (12 days' worth of calendar? no — 4 cycles × 2 days = 8 ✓) (2) same 8 days here (tank clean-divides) — but if tank were 14: A-start ⇒ 4 cycles (12) + day 9 A (2u) ⇒ 9 d; B-start ⇒ day 9 B banks 1 ⇒ day 10 A ⇒ 10 d — the start-flip bill (3) bank 6 of 30-tank (3×2), left 24 at 1 u/d ⇒ 24 more ⇒ **total 26 days; B's tenure 26 days** (4) bank 5 of 20 (A 1 u/d), joint 3 u/d ⇒ 5 more ⇒ **10 days** (5) 3 cycles = 21 units in 9 days; remainder 3 ⇒ day 10 = A banks 3 ⇒ **10 days**.

## 💪 Exercises
1. A (9 d) & B (18 d) alternate, A starts — tank 18: cycle, total?
2. A (8 d) & B (16 d) alternate, A starts; then solve again with B starting. Report both totals and name the delta's owner.
3. A (10 d), B (15 d), C (30 d) rotation A→C→B (watch the order!) — tank 30: cycle 3+1+2 = 6 ⇒ total?
4. Together-pair A (12 d), B (18 d): A leaves after 4 days. B's post-exit solo time? Total? Man-days billed (A 3 u/d, B 2 u/d, tank 36)?
5. Mid-join compression: job = 60 man-days, crew of 4 (flow 4 man-days/day… i.e., 15 days). After day 3, four more join (total 8). Total calendar?
6. A (6 d) works alone 2 days, then BOTH A and B (12 d) work 2 days, then A leaves. Remaining time for B? Full ledger.
7. The misread drill: "A works for as long as B takes to finish after A leaves." Construct the tank for A (12 d), B (18 d) under this rule: A works x days (joint), B finishes in x more days. Solve for x.

### ✅ Selected answers
1. Tank 18: A 2, B 1; cycles: 6; 6×2 = **12 days**… wait — 18/3 = 6 cycles ⇒ 12 days ✓ (they each worked 6 days ✓ cross-check: 6×2 + 6×1 = 18 ✓).
2. A-start: tank 16: A 2, B 1; 5 cycles (15) + day 11 A (2) ⇒ done ⇒ **11 days**. B-start: 5 cycles + day 11 B (1) + day 12 A (2) ⇒ **12 days**. The starter owns the remainder hammer — off-by-one, monetized as a full day.
3. Rotation A(3)→C(1)→B(2) on 30-tank: 5 cycles = 30 ⇒ **15 days exactly**; rotation order matters only to remainders — clean tanks are merciful.
4. Bank 20; post-exit: 16/2 = **8 days**; total **12 days**; man-days billed = A 4×3 + B 12×2 = 12 + 24 = 36 ✓ (work conserved — the ledger's checksum).
5. Bank 12; remaining 48 at 8/day ⇒ 6 ⇒ **total 9 days** (vs 15 solo-crew — joiners are time machines that bill extra man-days: 12 + 48 = 60 ✓ no leak).
6. A banks 2×6 = 12 of 36… tank: A 6 u/d, B 3 u/d (tank 36): phase-1: 12; phase-2: 2 days × 9 = 18 ⇒ 30 banked; left 6 at B's 3 ⇒ **2 more days**; total 6 days, B tenure 4.
7. Joint phase x days banks 5x of 36; B alone x more banks 2x ⇒ 7x = 36 ⇒ x = **5.14 days** — state the answer as "A works 36/7 ≈ 5.14 days with B, then B works the same tenure alone," total 72/7 ≈ 10.29 days. (Poetic symmetry questions always end in one linear equation — the tank kindly converts poetry to algebra.)

## ❓ Quiz
1. A (10 d) and B (20 d) work alternate days, A starting (tank 20, flows 2 & 1). Total time:
   - (a) 13.33 days
   - (b) 13 days — six 2-day cycles bank 18; day 13 is A's hammer adding the final 2 units; fractional-day answers ignore that work lands in discrete daily lumps
   - (c) 15 days
2. A (12 d) and B (18 d) work together for 4 days, then A leaves. Total project time:
   - (a) 8 days
   - (b) 12 days — tank 36: bank 4×5 = 20 units, B finishes the remaining 16 at 2 u/d in 8; the 4 banked days still count on the PROJECT's stopwatch (B's solo tenure is 8, the project's is 12)
   - (c) 16 days
3. On that same leaver problem, B's man-days billed vs A's (flows 2 and 3):
   - (a) equal — teamwork
   - (b) B: 24, A: 12 — B attended all 12 days (24 units), A only 4 (12 units); the ledger prices attendance × flow, and the work-checksum 24+12 = 36 ✓ never leaks
   - (c) B: 16, A: 20

### ✅ Answers
1. **(b)** — cycles first, then the day-walk; the guillotine only falls on people who average.
2. **(b)** — whose stopwatch? project's ⇒ 12. Option (a) is the leave-loss misread in its natural habitat.
3. **(b)** — tenure×flow each; and the checksum proves no unit ghosted the ledger.

## ✅ Mastery checklist
- [ ] Alternates: cycles + day-walk with remainders on the correct hammer
- [ ] Start-flip changes answers when tanks don't clean-divide — I check both orders
- [ ] Bank-then-price for leavers/joiners; checksum man-days = tank units
- [ ] Project-time vs worker-tenure disambiguated BEFORE answering
- [ ] 3-worker rotations read as one fatter cycle
- [ ] Poetry problems ("as long as B takes…") converted to one linear equation

**Next:** **TW4 · Pipes, Cisterns & Leaks** — the same tank, now literal: fillers add, emptiers subtract, sign flips get named, and the leak-autopsy (fill 12 h → with-leak 24 h ⇒ the leak alone drowns a full tank in 24 h). Plumbing as algebra! 🔧
