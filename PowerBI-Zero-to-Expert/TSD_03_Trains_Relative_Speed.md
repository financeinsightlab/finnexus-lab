# 🎯 TSD3 · Trains & Relative Speed
> A train is a moving length, and crossing means eating **every meter** of it. Poles get one length, platforms get two, moving trains get both lengths AND a relative speed. Six canonical problems, two direction rules, and the ×5/18 key from TSD1 — welcome to the highest-scoring 2-mark factory in aptitude.

## 🎯 Objectives
- State the **length law**: distance covered while crossing = train length (+ object length if the object has one).
- Solve pole/point crossings (L = S×T), platform/bridge crossings ((L+P)/S = T) in one line each.
- Run **two-train crossings**: opposite directions ADD speeds; same direction SUBTRACTS — both lengths always add.
- Avoid the direction flips and platform double-counts that feed the trap module.
- Read person-in-train variants as the same machine wearing a hat.

## 📘 Concepts

### 3.1 The length law — crossing eats the whole body
A point-object (pole, signal post, standing man) is *zero-length*: the train crosses it once its entire body passes:

```text
Train crosses a pole: distance = L (its own length) → L = S × T
Canon: 150 m train at 54 km/h (= 15 m/s): T = 150/15 = 10 s
```

An object WITH length (platform, bridge, tunnel) adds to the menu: the front enters, the rear exits — distance = **L + P**:

```text
150 m train, 250 m platform, 15 m/s: T = (150+250)/15 = 400/15 = 26.67 s
```

One line, no drama: **add lengths, divide by speed** — with 54 km/h → 15 m/s doing the unit work in the doorway.

### 3.2 Two trains, opposite directions — speeds ADD
Two 150 m trains, 50 and 40 km/h, head-on:

```text
Relative speed = 50 + 40 = 90 km/h = 25 m/s
Crossing length = 150 + 150 = 300 m → T = 300/25 = 12 s
```

Both motions shrink the gap — the relative speed is the sum, and both bodies must clear each other, so lengths always add. The whole chapter is that sentence with costumes.

### 3.3 Two trains, same direction — speeds SUBTRACT
Fast train 50 km/h, slow 40 km/h, both 150 m; fast rear starts at slow's rear... same setup, chase not meeting:

```text
Relative speed = 50 − 40 = 10 km/h = 2.78 m/s
Crossing length = 300 m → T = 300/2.78 ≈ 108 s
```

A 5× longer time for a 2× smaller relative speed — that's why "same direction" problems punish anyone who forgets to subtract. And the direction lexicon: **opposite = add speeds; same = subtract speeds; lengths add ALWAYS.**

### 3.4 Passengers on trains — the elegant variants
- **Man sitting in train A (150 m), train B (300 m) passes opposite:** the man crosses B's length at the relative speed ⇒ T = 300/(S_A + S_B). The passenger's own train length is *irrelevant* — he is a point!
- **Train B overtakes (same direction):** T = 300/(S_A − S_B) — still only B's body, because the man's a point.
- Menu logic: **what passes the observer = that object's length; relative speed per direction rule.** The "two trains" canon is just the special case where the observer is the other whole train.

### 3.5 Setup protocol (the 20-second frame)
1. Observer + object: who has length? (pole: 0 · platform: P · train: L₂)
2. Length menu: L₁ (+ object lengths that must be cleared).
3. Speed: single train → its own; two moving → direction rule (opp + / same −), then ×5/18 if answers want seconds.
4. T = menu ÷ speed. Sanity: poles should be the FASTEST crossing of any setup; platforms longer; same-direction chases astronomically longer.

## 🧪 LAB — The rail yard (10 min)
1. 180 m train at 72 km/h — pole time? 220 m bridge time?
2. Two 120 m metro cars at 45 & 35 km/h head-on — crossing time?
3. Same two metros, same direction (45 chasing 35) — overtake time? (120+120 m / (10 × 5/18).)
4. Man in a 100 m train at 60 km/h; a 200 m goods train approaches at 40 km/h head-on. How long does the goods train take to pass HIM?
5. Platform puzzle: a 25 m/s train crosses a pole in 8 s and a platform in 20 s. Train length? Platform length?

**Why this matters:** train problems are pure gift marks when the protocol is reflex; panicked setups are the only enemy.

**🔑 Lab answers:** (1) 72 km/h = 20 m/s; pole 180/20 = **9 s**; bridge (180+220)/20 = **20 s** (2) relative 80 km/h = 22.22 m/s; 240/22.22 = **10.8 s** (3) relative 10 km/h = 2.78 m/s; 240/2.78 = **86.4 s** — note the ~8× tax (4) only B's 200 m pass him at 100 km/h = 27.78 m/s ⇒ **7.2 s** (5) L = 25×8 = **200 m**; platform = 25×20 − 200 = **300 m** ✓.

## 💪 Exercises
1. 240 m Rajdhani at 90 km/h: pole time? 360 m platform time?
2. Two freight trains, 180 m & 220 m, speeds 54 & 36 km/h head-on. Crossing time in seconds?
3. Same freights, same direction (54 chasing 36). Time for the fast one to fully overtake?
4. A 150 m train crosses a man walking AGAINST it at 6 km/h in 9 s. Train's speed? (Length ÷ time = relative speed in m/s; convert, then subtract the man's walk.)
5. …same train crosses a man walking ALONG at 6 km/h in 11.25 s. Verify the SAME train speed from the other direction — exams love handing you both doors into one truth, and consistency is your free self-audit.
6. Platform-reverse: a train crosses a pole in 10 s at 18 m/s; then crosses a platform in 30 s. Platform length? If someone answers 540 m, name their trap.
7. Person-in-train: you're in a parked 200 m train; another 150 m train rolls past you at 72 km/h. Viewing time of the passing train?

### ✅ Selected answers
1. 90 km/h = 25 m/s; pole 240/25 = **9.6 s**; platform (240+360)/25 = **24 s**.
2. Relative 90 km/h = 25 m/s; (180+220)/25 = **16 s**.
3. Relative 18 km/h = 5 m/s; 400/5 = **80 s**.
4. Relative = 150/9 = 16.67 m/s = 60 km/h ⇒ train = 60 − 6 = **54 km/h** (walkers are adjectives — subtract them off).
5. Relative = 150/11.25 = 13.33 m/s = 48 km/h ⇒ train = 48 + 6 = **54 km/h** — IDENTICAL, as one truth demands. Two doors, one train: against-walks add the man's speed, along-walks subtract it, and both equations must land on the same V. If a paper's two legs ever disagree, answer the leg it asked and let the examiner own the arithmetic.
6. L = 180 m; platform = 18×30 − 180 = **360 m**. The 540 m answer ate the platform-duration whole — forgot the rear must exit: the 30 s covers L+P, not P.
7. Only the passing train's body: 150 m at 20 m/s ⇒ **7.5 s**.

## ❓ Quiz
1. A 150 m train at 54 km/h crosses a 250 m platform in:
   - (a) 16.67 s
   - (b) 26.67 s — length menu 150+250 = 400 m at 15 m/s (54 × 5/18); the rear's exit is part of the crossing
   - (c) 10 s
2. Two 150 m trains at 50 and 40 km/h approach head-on. They clear each other in:
   - (a) 12 s — relative 90 km/h = 25 m/s over both bodies (300 m): opposite = add speeds, lengths always add
   - (b) 108 s
   - (c) 6.67 s
3. Same two trains, same direction (50 chasing 40). Overtake time:
   - (a) 12 s
   - (b) 108 s — relative 10 km/h ≈ 2.78 m/s over 300 m; same direction SUBTRACTS speeds, and the ~9× longer clock is the trap-tax for adders
   - (c) 54 s

### ✅ Answers
1. **(b)** — (c) is the pole time; (a) ate the platform length alone. Length menu first, always.
2. (a) — the direction rule plus both bodies; (b) is the same-direction sibling; (c) used one length only.
3. **(b)** — subtraction geometry; if 108 s "feels long," you just felt relative speed.

## ✅ Mastery checklist
- [ ] Pole crossing = L only; platform = L + P; announced before computing
- [ ] Two-moving menu: lengths ALWAYS add; speeds add (opposite) or subtract (same)
- [ ] ×5/18 sits at the doorway whenever seconds are demanded
- [ ] Person-in-train variants: the observer is a point — only the passing body counts
- [ ] Protocol (observer→lengths→speed→T) recited; 20 s per setup
- [ ] Consistency-check instinct: two statements about one train must yield one speed

**Next:** **TSD4 · Boats & Streams** — downstream/upstream gears, still-water ↔ stream back-solving, the round-trip tax that current always charges, and the same-time split. The river flows; the ratios rule! 🚤
