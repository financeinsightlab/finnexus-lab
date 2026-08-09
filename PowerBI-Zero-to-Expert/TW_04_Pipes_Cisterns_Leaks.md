# 🎯 TW4 · Pipes, Cisterns & Leaks
> Time & Work with a tap: fillers push units IN, emptiers pull them OUT — the sign is the whole game. Let the tank be LCM(12, 18, 20) = 180 units: flows 15 + 10 − 9 = 16 u/h ⇒ full in 11.25 h. Then the leak-autopsy, sign-flip traps, and tank problems that are secretly project management wearing plumbing.

## 🎯 Objectives
- Translate any tap: "fills in n h" ⇒ +LCM/n per hour; "empties in n h" ⇒ **−LCM/n** — the sign discipline.
- Combine 2–3 taps (fill/fill/empty) via net flow; time = tank ÷ net.
- Run the **leak autopsy**: fill-time alone vs with-leak ⇒ leak's own strength (the 24-h canon).
- Handle "tap opened later / closed early" phase problems with bank bookkeeping.
- Guard the **SIGN FLIP** gate: net must be positive for filling, positive-time sanity, and "was it a filler?" uttered aloud.

## 📘 Concepts

### 4.1 The signed-flow law
```text
Pipe A fills in 12 h  →  +180/12 = +15 u/h
Pipe B fills in 18 h  →  +180/18 = +10 u/h
Tap C EMPTIES in 20 h →  −180/20 =  −9 u/h      (the minus is the whole religion)
Net = 15 + 10 − 9 = 16 u/h → full tank in 180/16 = 11.25 h ✓
```

Every number from TW1 survives — the LCM tank, the flow table — with ONE addition: **signed units.** Forget the sign and C helps fill the tank (34 u/h ⇒ 5.29 h — the SIGN FLIP's famous wrong answer).

### 4.2 Emptiers against fillers — the classic duels
- Fill 6 h (+30) vs empty 8 h (−22.5) on a 180-tank: net +7.5 ⇒ 24 h to fill ✓ (positive ⇒ fillable, slowly).
- Fill 6 h vs empty 5 h (−36): net −6 ⇒ **never fills** — the drain outruns the tap. Answer format: "never (net −6 u/h)" — negative-time answers (like −30 h) are sign-confused; say NEVER instead. Sanity gate: **net > 0 ⇔ tank fills; net < 0 ⇔ tank drowns.**

### 4.3 The leak autopsy — finding the hole's resume
```text
Tap fills a tank in 12 h. With a leak open, it takes 24 h.
With-leak net = 180/24 = 7.5 u/h ⇒ leak = 15 − 7.5 = 7.5 u/h
Leak alone drains a FULL tank in 180/7.5 = 24 h ✓ canon
```

The autopsy formula: leak strength = solo-fill flow − with-leak net. Same machine for "pipe + waste-pipe", "tap A fills, tap B at the bottom". And the phrase that hides leaks: "due to a leak at the bottom…" — name the leak, give it a negative number, proceed.

### 4.4 Phase choreography — opened later, closed early
"All three taps (15, 10, −9) run 3 h, then C closes; when does the tank fill?"

```text
Phase 1: 3 h × 16 = 48 banked · remaining 132 at +25 u/h ⇒ 5.28 h
Total = 8.28 h — versus 11.25 h with C running all along:
closing the leak IS project acceleration, in plumbing as in life ✓
```

Same bank-then-price ledger as leavers/joiners (TW3); the tank's memory is cumulative, and sign changes ride along inside phase flows.

### 4.5 Plumbing = management with water
- "New inventory arrives 15 u/h, sells 9 u/h net of the 10 u/h restock…" — same signed tank (safety-stock levels).
- Data pipelines filling a Data Warehouse while a delete-job runs (positive/negative ETL rates) — the BA umbrella literally stores these as rates.
Everywhere there is accumulation with sources and sinks, sign-discipline + LCM tank is the cheapest correct model you'll ever build.

## 🧪 LAB — The pump house (10 min)
1. A fills 10 h (+18 on 180-tank), B fills 15 h (+12): together?
2. Add C empties 30 h → net and fill time?
3. Tank full; emptiers D (12 h) and E (18 h) opened together — tank empty in?
4. Leak autopsy: tap fills in 8 h alone; with leak, 12 h. Leak alone drains a full tank in?
5. Choreography: A (+18) and C (−6) run 2 h, then B (+12) joins: fill time for the 180-tank?

**Why this matters:** signed-flow is a one-addition upgrade to everything you own from TW1 — and the exams' favorite upgrade of yours to sabotage.

**🔑 Lab answers:** (1) net 30 ⇒ **6 h** (2) C = −6 ⇒ net 24 ⇒ **7.5 h** (3) −15 −10 = −25 ⇒ **7.2 h** (negatives all, as emptiers should be —200? no: 180/25 = 7.2 ✓) (4) with-leak net = 180/12 = 15; solo flow = 22.5 ⇒ leak = 7.5 ⇒ drains in 180/7.5 = **24 h** — the 8-and-12 family is the 12-and-24 family halved, naturally (5) phase 1: 2 × 12 = 24 banked; phase 2 net = 24 ⇒ remaining 156/24 = 6.5 ⇒ **total 8.5 h**.

## 💪 Exercises
1. Pipes: A fills 4 h, B fills 6 h, C empties 12 h — fill time? (Tank 12.)
2. Two fillers at 15 and 10 u/h (180-tank), and a drain at −9 — how long to HALF-fill? Does half the tank mean half the time here?
3. Filler 6 h vs emptier 4 h: verdict + reason line (the never-fills family).
4. Leak autopsy II: with leak the 10-h tap takes 15 h. Leak alone empties a full tank in ___?
5. All three of the canon trio (15, 10, −9) — but C was open by accident for the first 2 h only, then closed. Fill time? (Compare the 11.25 h leak-all-along answer.)
6. A tank has TWO leaks (each drains in 36 h) and one 12-h filler. Fill time?
7. The boast: "We can open any two of A (4 h), B (8 h), C (empties 6 h)." Enumerate the three pairings with verdicts — and bill the question: which pairing fills FASTEST?

### ✅ Selected answers
1. Tank 12: 3 + 2 − 1 = 4 ⇒ **3 h**.
2. Net 16 u/h ⇒ 90/16 = **5.625 h** for half — yes, exactly half of 11.25 h (constant net flow ⇒ linear tank; the trick is only a trick if flows change mid-tank).
3. Net = 180/6 − 180/4 = 30 − 45 = **−15 u/h ⇒ NEVER fills** — the drain eats the tap with appetite to spare.
4. With-leak net = 180/15 = 12 ⇒ leak = 18 − 12 = 6 ⇒ empties a full tank in 180/6 = **30 h**.
5. Phase 1: 2 × 16 = 32; then net 25 ⇒ 148/25 = 5.92 ⇒ **total 7.92 h** — closing a leak early beats tolerating it (7.92 < 11.25); the delta is the price of procrastinating a fix.
6. Net = 15 − 5 − 5 = 5 ⇒ 180/5 = **36 h** — two leaks halve… no: two full-tank drains at 5 u/h each cost 10; my point: leaks ADD their negatives independently.
7. A+B: 45+22.5 = 67.5 ⇒ **2.67 h** (fastest ✓) · A+C: 45−30 = 15 ⇒ 12 h · B+C: 22.5−30 = −7.5 ⇒ NEVER. One pairing drowns, one crawls, one flies — the tap menu is a strategy question with plumbing.

## ❓ Quiz
1. Pipes fill in 12 h and 18 h; a tap empties in 20 h. Together (180-unit tank):
   - (a) 11.25 days
   - (b) 11.25 h — net flow 15 + 10 − 9 = 16 u/h; the emptier carries its minus into the flow table, and 180/16 is the only line the question ever needed
   - (c) 5.29 h
2. A tap fills a tank in 12 h; with a leak it takes 24 h. The leak alone empties a full tank in:
   - (a) 36 h
   - (b) 24 h — with-leak net = 7.5 u/h, so the leak swallows 15 − 7.5 = 7.5 u/h of the 180-tank every hour: drain solo = 24 h (an autopsy in two lines)
   - (c) 12 h
3. Filler (6 h) versus emptier (4 h) on one tank — after 12 hours the tank is:
   - (a) half full
   - (b) still empty — net = 30 − 45 = −15 u/h; the drain outruns the tap, so it NEVER fills (write "never," not a negative time)
   - (c) full

### ✅ Answers
1. **(b)** — (c) is the sign-flip's score when the emptier's minus is stolen; (a) checked nothing.
2. **(b)** — leak-strength = solo-flow − net; negative bookkeeping does the rest.
3. **(b)** — net sign is the verdict; a drowning tank doesn't negotiate.

## ✅ Mastery checklist
- [ ] Signed flows carved into the table BEFORE adding (emptiers negative, spoken aloud)
- [ ] Net > 0 ⇔ fills; net < 0 ⇒ "never" is a complete sentence in this course
- [ ] Leak autopsy: strength = solo-flow − net; drain-solo = tank ÷ strength
- [ ] Phases (open late/closed early) ride the bank-then-price ledger
- [ ] Half-tank = half-time only under constant net flow — checked before assuming
- [ ] Inventory/ETL/"arriving vs selling" problems file themselves under signed tanks

**Next:** **TW5 · Traps, Triage & Mock Arena** — ADD-THE-DAYS, MAN-DAY DILUTION, LEAVE-LOSS MISREAD, SIGN FLIP, ALTERNATE OFF-BY-ONE. The five named felonies, a 5-gate radar, and Paper TW-01 under negative marking. Bring your tank; leave with a score! ⚡
