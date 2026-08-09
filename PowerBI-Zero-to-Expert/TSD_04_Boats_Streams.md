# 🎯 TSD4 · Boats & Streams
> The river is a moving floor: downstream it walks WITH you, upstream AGAINST you. **Down = boat + stream, Up = boat − stream** — two gears, one unknown pair. Back-solve with still-water = (d+u)/2 and stream = (d−u)/2, harvest the round-trip tax (current ALWAYS slows the loop), and split same-time journeys by the speed ratio.

## 🎯 Objectives
- Lock the two gears: **downstream speed = x + w**, **upstream = x − w** (x = still-water speed, w = current).
- Back-solve x and w from observed down/up speeds: **x = (d + u)/2**, **w = (d − u)/2**.
- Price the **round-trip tax**: loop with current is always slower than the same loop in still water — harmonic insight.
- Solve **same-time** splits (down and up legs taking equal time ⇒ distance ratio = speed ratio).
- Translate to floating floors anywhere: escalators, moving walkways, wind-aided cycling.

## 📘 Concepts

### 4.1 The two gears
```text
Boat runs 12 km/h in still water; the Ganga runs 3 km/h.
Downstream (with current): 12 + 3 = 15 km/h
Upstream (against):        12 − 3 =  9 km/h
```

One pair (x, w) controls everything — and problems either hand you the gears (x, w known) or hand you showrooms (observed d, u). Memorize the anchor set: **12 & 3 → 15 ↓ / 9 ↑**.

### 4.2 The back-solve — swimmers in reverse
Given downstream 15 and upstream 9:

```text
x = (15 + 9)/2 = 12 km/h (still-water — the boat's own muscle)
w = (15 − 9)/2 =  3 km/h (current — the river's contribution)
```

The midpoint is the boat; half the gap is the river. Same for swimmers and rafts — a **raft/person floating** has x = 0: it moves at pure stream speed w. (Exam favorite: "the log drifted 6 km in 2 h ⇒ w = 3 km/h.")

### 4.3 The round-trip tax — current always bills you
Loop 15 km each way on the 12-and-3 river:

```text
Down: 15/15 = 1 h · Up: 15/9 = 1.667 h → total 30 km in 2.667 h → avg = 11.25 km/h
Still-water loop would take 30/12 = 2.5 h → avg 12 km/h
```

**The current costs you 11.25 vs 12 — a 6.25% tax.** Why always? Time = d/(x+w) + d/(x−w) = 2dx/(x²−w²) > 2d/x whenever w > 0. The uphill leg eats more clock than the downhill leg saves (harmonic law from TSD2 wearing river clothes). Any "current makes round trips faster/neutral" answer is stillborn.

### 4.4 Same-time splits — the ratio does the work
"Boat goes downstream for the same TIME as upstream; total 48 km; x = 12, w = 3." Equal times t:

```text
distances = 15t and 9t → ratio 15:9 = 5:3 → total parts 8 = 48 km → t-parts: 30 km down, 18 km up
                                       (t = 2 h, since 15×2 = 30 ✓)
```

Equal-time ⇒ the speed ratio IS the distance ratio. Flip variant — equal DISTANCES: time ratio inverts (1/15 : 1/9 = 3:5). The river problems are ratio problems on a moving floor (RA course nods approvingly).

### 4.5 Cousins on other floors
- **Escalators:** person speed x, escalator w; walking WITH = x + w, against = x − w, standing = w alone (the human raft).
- **Tailwind cycling:** same equations; "wind adds 4 km/h" = w = 4.
- **Person in flowing river who's just swimming to a point upstream:** time exists only if x > w — else the floor wins. Sanity gate: **upstream speed must stay positive** — if your numbers give w ≥ x, the setup drowns (or the answer is "never arrives").

## 🧪 LAB — The ghats (10 min)
1. Boat x = 18, stream w = 2 → down? up? 40 km downstream time?
2. Observed: down 24 km/h, up 16 km/h → x? w?
3. Round trip 12 km each way on the Q2 river — total time, and the tax vs still water.
4. Log-drift: a cooler floats 9 km downstream in 1.5 h. What's the current? If the owner's boat (x = 13.5) chases it from the start point, catch-up time? (Trick: raft goes at w; closing speed = x + w − w = x.)
5. Same-time split: boat spends equal time down and up; x = 15, w = 3; total 60 km. Split the distance (and spot the time it took).

**Why this matters:** boats are TSD's second-celebrated 2-marker family; the back-solve formulas ARE the whole chapter, and the tax insight wins interviews.

**🔑 Lab answers:** (1) **20 / 16 km/h**; 40/20 = **2 h** (2) x = 20, w = 4 (3) down 0.5 h + up 0.75 h = **1.25 h**; still-water loop 24/20 = 1.2 h ⇒ tax = 3 min (avg 19.2 vs 20 ✓) (4) w = 9/1.5 = **6 km/h**; chase closing = (13.5 + 6) − 6 = 13.5 = x — the stream carries both boat and cooler equally, so chases on a flowing floor always close at the boat's OWN speed ⇒ catch in 9/13.5 = **0.667 h = 40 min** (5) speeds 18 ↓ / 12 ↑ ⇒ ratio 3:2 ⇒ **36 km down / 24 km up**, and since 36/18 = 2, each leg took **2 h** ✓ — equal-time splits ARE speed-ratio splits.

## 💪 Exercises
1. x = 16, w = 4: down/up speeds; time for 20 km upstream?
2. Down 28 in 1 h; up 20 in 1 h. x and w? Time for 96 km downstream at x-with-no-current? (Why is that question a trap — what's the honest comparison?)
3. Round trip tax table: legs 20 km each way, boat x = 12. Compute total time for w = 0, 2, 4, 6. (Spot the acceleration of the tax as w → x.)
4. Same-distance split version: boat covers the same 24 km down then up; x = 15, w = 3. Time ratio down:up and total time?
5. Escalator: Shubham walks 2 steps/s on a 1 step/s escalator (with it). 60 steps visible — time to the top? And walking against at his same 2 steps/s — does he arrive?
6. The drift paradox: a hat falls into the Yamuna at t = 0; the boat rows UP at x = 10 (w = 2) for 15 min before noticing, then turns around. When does it catch the hat? (Hint: in the river's frame the hat NEVER moved…)
7. Still-water pricing: ferry operator quotes "2 h round trip guaranteed" for a 15 km each-way run. With x = 18, what's the maximum current w he can promise through? (Set up T(w) ≤ 2 and solve.)

### ✅ Selected answers
1. 20 ↓ / 12 ↑ km/h; 20/12 = **1.667 h (1 h 40 min)**.
2. x = 24, w = 4. No-current 96 km: 96/24 = **4 h**. Trap-named: the actual down-time would be 96/28 = 3.43 h — asking "without current" while the river still flows is a hypothetical; always ask which world the question bought.
3. w=0: 40/12 = **3.333 h**; w=2: 20/14 + 20/10 = 1.429 + 2 = **3.429 h**; w=4: 20/16 + 20/8 = 1.25 + 2.5 = **3.75 h**; w=6: 20/18 + 20/6 = 1.111 + 3.333 = **4.444 h**. Tax curve steepens like w² — the upstream leg is where rivers win.
4. Times: 24/18 = 1.333 and 24/12 = 2 → ratio **2:3** (down:up) — inverse of the 3:2 speed ratio ✓; total = **3.333 h**.
5. With: effective 3 steps/s ⇒ **20 s**. Against: effective 2 − 1 = 1 step/s ⇒ arrives in **60 s** (positive ⇒ gate open; at 1 step/s effort he'd freeze forever).
6. River-frame trick: the hat is a fixed point in the water's frame; boat left it 15 min upstream, returns covering the same frame-distance in **15 min**. Answer: **30 min after the hat fell (15 min after turning)** — w never enters the computation! (Ground frame check: 30 min × 2 km/h = 1 km drifted ✓ consistent.)
7. T(w) = 15/(18+w) + 15/(18−w) ≤ 2. Solve: multiply out → 15×36/(324−w²) ≤ 2 → 540 ≤ 648 − 2w² → w² ≤ 54 → **w ≤ 7.35 km/h** — promise ceiling, quantified.

## ❓ Quiz
1. Boat runs 12 km/h in still water, stream 3 km/h. Downstream and upstream speeds:
   - (a) 12 and 9
   - (b) 15 and 9 — the river is a moving floor: down = x + w, up = x − w; the anchor pair 12 & 3 pays out 15 ↓ / 9 ↑ forever
   - (c) 15 and 12
2. A boat logs downstream 24 km/h and upstream 16 km/h. Its still-water speed and the current:
   - (a) 20 and 8
   - (b) 20 and 4 — midpoint is the boat (d+u)/2, half the gap is the river (d−u)/2; the back-solve never misses
   - (c) 22 and 2
3. Same 30 km round trip: in still water a boat averages 12 km/h. With a 3 km/h current (same muscle), the loop-average:
   - (a) 12 km/h — current balances out
   - (b) 11.25 km/h — up-leg at 9 bleeds more clock than down-leg at 15 saves (harmonic: 2×15×9/24); the river ALWAYS taxes the loop
   - (c) 12.5 km/h

### ✅ Answers
1. **(b)** — gears: plus down, minus up; (a) forgot the floor helps downstairs.
2. **(b)** — (a) doubled the gap into w; half-gaps only.
3. **(b)** — T = 30/15 + 30/9 vs 30/12 × … the w² in the denominator of 2dx/(x²−w²) guarantees the tax; "balances out" never survives arithmetic.

## ✅ Mastery checklist
- [ ] Gears locked: down x+w, up x−w; positivity gate (x > w else the floor wins)
- [ ] Back-solve reflex: x = (d+u)/2, w = (d−u)/2 — from any observed pair
- [ ] Round-trip tax: current ALWAYS slows loops; I can show the harmonic proof in two lines
- [ ] Same-time ⇒ distance ratio = speed ratio; same-distance ⇒ time ratio inverts
- [ ] Rafts/logs drift at w alone; chase closing speed = x (stream helps both equally)
- [ ] Escalators and tailwinds file themselves under the same two gears

**Next:** **TSD5 · Races & Circular Tracks** — beat-by-20m speed ratios, dead heats, head starts, and the LCM law of lap meetings: together at every relative-length, back at start every LCM(lap times). The stadium awaits! 🏟️
