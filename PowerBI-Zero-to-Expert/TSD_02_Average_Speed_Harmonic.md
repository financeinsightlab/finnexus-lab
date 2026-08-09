# 🎯 TSD2 · Average Speed — The Harmonic Reality
> Drive to work at 40, back at 60, and your average is **48** — not 50. Equal *distances* weight slow legs heavier because you *live longer* in them. We install the harmonic machine **2xy/(x+y)**, its equal-distance vs equal-time truth table, and the multi-leg chains that pricing teams actually use.

## 🎯 Objectives
- Define average speed as **total distance ÷ total time** — the only definition — and spot when naive averaging lies.
- Deploy the **equal-distance harmonic law**: for two legs x and y, avg = 2xy/(x+y).
- Contrast with **equal-time legs** (where the arithmetic mean IS correct) — and test which world you're in.
- Extend to three legs (3/(1/x + 1/y + 1/z)) and weighted mixes.
- Price rider/fleet productivity honestly: legs, layovers and the death of "55 km/h average" slide-deck claims.

## 📘 Concepts

### 2.1 The only definition
```text
Average speed = TOTAL DISTANCE / TOTAL TIME.
```
Not the mean of the speeds — because time is the denominator, and slow legs hold you longer. A leg at 40 km/h owns more of your life than the same stretch at 60. That's the entire mystery inside one sentence.

### 2.2 Equal distances — the harmonic machine
Delhi warehouse leg: 120 km out at **40 km/h** (3 h), 120 km back at **60 km/h** (2 h):

```text
Total distance = 240 km; total time = 5 h → avg = 48 km/h (NOT 50)
Machine: avg = 2xy/(x+y) = 2×40×60/100 = 48 ✓
```

The slow leg got 3 hours of voting rights; the fast leg only 2 — the average sits closer to the slower speed, always. Anchor pair to memorize: **40 & 60 → 48**; the derivation in one line: 2d / (d/x + d/y) = 2xy/(x+y) — the d cancels, which is WHY the machine needs no distance.

### 2.3 Equal time — the arithmetic world is real too
Rider drives 1 h at 48 km/h and 1 h at 32 km/h: distance = 80 km in 2 h → avg = **40 km/h** = (48+32)/2 — arithmetic mean VALID. Truth table:

| Legs equal in… | Correct average | Example |
|---|---|---|
| **Distance** | harmonic 2xy/(x+y) | 48 & 32 → 2×48×32/80 = **38.4** |
| **Time** | arithmetic (x+y)/2 | 48 & 32 → **40** |

Same two speeds, two different truths (38.4 vs 40). The exam's entire game: hide which one applies. Instinct to grow: *ask "what repeats — the stretch or the clock?"*

### 2.4 Rider day-chains & the layover parasite
ShopKart rider: morning slot 2 h at 38.4 avg (76.8 km)… let's keep brutal honesty: total distance ÷ total time INCLUDING layovers. A rider rides 3 h covering 90 km but waits 1 h at dark stores: trip-average = 90/4 = **22.5 km/h**, not 30. Utilization math kills fake averages: promise engines, rider payroll and fuel bills all price the *with-layover* number (TSD7 charges ₹150/hour exactly this way). Spot the layover parasite wherever "average speed" is quoted without its denominator.

### 2.5 Three legs & the evening remix
Equal distances in threes: avg = 3/(1/x + 1/y + 1/z). Rider shift: three 20 km stints at 40, 30, 24:

```text
Time = 20/40 + 20/30 + 20/24 = 0.5 + 0.667 + 0.833 = 2 h
avg = 60/2 = 30 km/h  →  machine check: 3/(1/40+1/30+1/24) = 3/0.125 = 30 ✓
```

Mixed legs (distances AND times unequal) fall back to the only definition: total ÷ total. The machines are shortcuts; the definition is the law.

### 2.6 The round-trip trap-lexicon (trap module preview)
- "Averages 45 km/h" over a return journey — demand per-leg data: equal distances? weights?
- "Up at 20, down at 60" — 2×20×60/80 = **30**, not 40 (hills punish descending joy).
- "Half the journey at 30, then the rest at 45" — *by distance*: 2×30×45/75 = 36. *By time*: (d/… no: by time it'd be stated in hours) — the wording "half the journey" = distance-half ⇒ harmonic.

## 🧪 LAB — The weighbridge (10 min)
1. Round trip 60 km each way: 30 km/h out, 60 km/h back. Average?
2. Two EQUAL-TIME hours at 25 and 55. Average?
3. Three equal-distance legs at 60, 40, 24 → average? (Machine or totals.)
4. Rider rides 4 h covering 150 km but waits 45 min at stores. True trip average?
5. A salesman covers half his tour distance at 50 and the rest at 75. Average? And what if he'd spent half his tour TIME at each (total 4 h)?

**Why this matters:** averages are quoted in every ops review; the harmonic flip is the cheapest bluff-catch in business.

**🔑 Lab answers:** (1) 2×30×60/90 = **40 km/h** (2) time-equal ⇒ (25+55)/2 = **40 km/h** — same answer, utterly different machine (3) 3/(1/60+1/40+1/24) = 3/0.0667 = **45 km/h** (4) 150/4.75 = **31.58 km/h** (5) distance-half ⇒ 2×50×75/125 = **60 km/h**; time-half ⇒ (50+75)/2 = **62.5 km/h** (distances 100 & 150 over the 4 h).

## 💪 Exercises
1. Out at 36, back at 72 (same route). Average via machine AND via full totals for a 72 km leg — both roads, same city.
2. Rider legs (equal 10 km each): 50, 25, 20 km/h. Average?
3. Morning: 1 h at 15 km/h (gridlock). Evening: 1 h at 45 km/h. Day average? Now redo if instead each direction was a fixed 15 km. Comment in one line.
4. Fleet claim audit: "Our vans average 55 km/h." Data: 2 h at 65 and then 3 h idle at the depot. Honest average for the 5-h shift?
5. A train runs d km at speed x and the NEXT d km at half that speed. Show in one line that the average is 4x/3… wait — is it? Compute for x = 60: legs 60 & 30 → avg = 2×60×30/90 = 40. Which means the general claim should be 4x/3 … 4(60)/3 = 80 ✗. What's the right general formula, and why did the plausible-looking one die?
6. Distance-half split again but speeds 20 & 60: average? Then verify by totals on a 120 km journey.
7. Equal-time day: 2 h at 42, 1 h idle (0), 1 h at 30. True average across all 4 h? (Idle counts — layover parasite!)

### ✅ Selected answers
1. Machine: 2×36×72/108 = **48 km/h**. Totals: 72/36 = 2 h + 72/72 = 1 h ⇒ 144/3 = 48 ✓.
2. 3/(1/50+1/25+1/20) = 3/0.11 = **27.3 km/h** (times 0.2+0.4+0.5 h ⇒ 30/1.1 ✓).
3. Equal-time: (15+45)/2 = **30 km/h**. Equal-distance (15 km each): 2×15×45/60 = **22.5 km/h**. The same city, the same two speeds, and your "average" is a costume that depends on what repeated.
4. 130 km over 5 h = **26 km/h** — idle hours eat averages alive; quote average-with-denominator or quote nothing.
5. Legs x and x/2: avg = 2×x×(x/2)/(x + x/2) = x²/(1.5x) = **2x/3** = 40 at x=60 ✓. The 4x/3 claimant mixed harmonic with something unholy (probably (x + x/2)×… their slip: they averaged SPEEDS and flipped — that's the lesson: machines carry the division inside them).
6. 2×20×60/80 = **30 km/h**; totals: 60/20 = 3 h + 60/60 = 1 h ⇒ 120/4 = 30 ✓.
7. Distance = 84 + 0 + 30 = 114 km over 4 h ⇒ **28.5 km/h**. Idle legs still vote.

## ❓ Quiz
1. A van does 120 km out at 40 km/h and 120 km back at 60 km/h. Its average speed:
   - (a) 50 km/h
   - (b) 48 km/h — total 240 km over 3 + 2 = 5 h; equivalently the harmonic 2xy/(x+y); the slow leg owns more clock, so the truth sits below the naive mean
   - (c) 45 km/h
2. A rider drives one hour at 48 km/h and then covers 48 km at 32 km/h… the honest average for the WHOLE day:
   - (a) 40 km/h
   - (b) 38.4 km/h — leg 1: 48 km in 1 h; leg 2: 48 km in 1.5 h; total 96 km / 2.5 h = 38.4 (it's the equal-DISTANCE world: the 48-km stretch repeated, not the hour)
   - (c) 43.2 km/h
3. "A rider averages 30 km/h except for a 1-hour wait." True trip average if the riding covered 90 km?
   - (a) 30 km/h
   - (b) 22.5 km/h — riding time was 90/30 = 3 h, plus 1 h layover = 4 h for 90 km; the layover parasite taxes every denominator
   - (c) 27 km/h

### ✅ Answers
1. **(b)** — time weights legs; (a) averaged speeds, not reality.
2. **(b)** — identical distances ⇒ harmonic; 40 would need equal times, which the problem never granted.
3. **(b)** — total ÷ total, always; the wait is inside the denominator whether you like it or not.

## ✅ Mastery checklist
- [ ] Total distance ÷ total time is my definition of average — no alternatives
- [ ] Equal-distance ⇢ harmonic 2xy/(x+y); equal-time ⇢ arithmetic — and I check the wording ("half the journey" = distance)
- [ ] Anchors: 40&60→48 · 20&60→30 · 48&32→38.4 (distance) vs 40 (time)
- [ ] Three-leg extension 3/(1/x+1/y+1/z) installed
- [ ] Layover parasite: idle minutes go in the denominator and I say so in meetings
- [ ] Upsell skill: I can catch a fake "average speed" slide in under 10 seconds

**Next:** **TSD3 · Trains & Relative Speed** — poles, platforms, bridges; two trains in opposite and same directions; the length-addition law. 54 km/h, 15 m/s, GO! 🚆
