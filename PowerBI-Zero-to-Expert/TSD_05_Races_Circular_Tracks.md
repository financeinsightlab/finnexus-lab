# 🎯 TSD5 · Races & Circular Tracks
> "A beats B by 20 m" is not commentary — it's a **speed ratio in gift wrap**: in equal time, A ran 100, B ran 80 ⇒ 5:4. Then the stadium loops: same-direction meetings every track ÷ (speed gap), opposite every track ÷ (speed sum), and — the LCM law — back together AT the start line every LCM of the lap times.

## 🎯 Objectives
- Decode race language: "beats by X m / X s", "dead heat", "head start" — into distance/time/speed ratios instantly.
- Solve same-distance different-time and same-time different-distance conclusions.
- Master **circular meeting laws**: same direction → meet every C/(u−v); opposite → every C/(u+v); at STARTING POINT together → LCM(lap times).
- Handle 3+ runners by least common multiples without melting.
- Keep the race-start confusion (head start in m vs in s) disarmed.

## 📘 Concepts

### 5.1 Race language = ratio language
```text
In a 100 m dash, A beats B by 20 m.
Same clock ⇒ distance ratio = speed ratio:  S_A : S_B = 100 : 80 = 5 : 4
```

The by-margin lives at the finish line: when A crosses 100 m, B is at 80. Every gift-wrap unrolls the same way:
- "A beats B by **10 m** in a 100 m race" ⇒ 100:90 = 10:9.
- "A beats B by **4 s**" ⇒ time difference over the same distance — speeds invert as time ratio.
- **Trilogy drill:** A beats B by 20 m; B beats C by 25 m (both 100 m) ⇒ A:B:C = 100:80, and B:C = 100:75 ⇒ scale to common B: A:B = 5:4, B:C = 4:3 ⇒ A:B:C = **5:4:3** ⇒ A beats C by 2 parts = 40 m? Check: A at 100 ⇒ C at 60 ⇒ **by 40 m** ✓ — chained margins multiply, never add naively (20+25 = 45 ✗).

### 5.2 Head starts — distances vs clocks
A gives B a start of 20 m in 100 m ⇒ B runs only 80; if their speeds are 5:4, B's 80 m takes as long as A's 100 ⇒ **dead heat**. Give head start in **seconds** instead: B runs alone for t₀; the finish margin depends on both speeds — always convert into distances-with-same-clock before concluding. The trap family thrives on students mixing the two start-types; name it on sight: **meters-start** or **seconds-start**.

### 5.3 Circular meetings — the relative-length law
Track C = 400 m. Two runners, **8 m/s and 5 m/s**:

```text
Same direction: faster gains (8 − 5) = 3 m/s → laps the slower every 400/3 ≈ 133.3 s
Opposite directions: approach (8 + 5) = 13 m/s → meet every 400/13 ≈ 30.8 s
```

One law, two gears: meetings happen each time the gap/approach eats **one full track length** — relative speed rule, exactly like trains, but the "length" both bodies must jointly cover is the LOOP. (Start together ⇒ next "meeting" ignores t=0.)

### 5.4 The LCM law — together at the START LINE
Lap times: 400/8 = 50 s and 400/5 = 80 s. They next stand TOGETHER AT THE START when both complete whole laps:

```text
LCM(50, 80) = 400 s → fast did 8 laps, slow 5 laps; first reunion at the start line = 400 s
```

Distinguish the two reunion types ruthlessly: **anywhere on the track** (relative-length law: 133.3 s here) vs **at the starting point** (LCM law). Exams bank on your confusing them — the word "starting point" is the switch. Three runners? Lap times 50, 80, 100 s ⇒ LCM(50, 80, 100) = 400 s — same machine, one more gear.

### 5.5 Race-track mashups (the classics' favorites)
- A runs 400/8 and B 400/5 loops same direction: "when does A first gain one full lap?" = 133.3 s — same as meeting.
- Cyclists opposite: meet 6 times in an hour ⇒ 3600/6 = 600 s per meeting ⇒ (u+v) = C/600.
- Ratio races: A:B speeds 7:5, circular track — how many meetings before A laps B twice? Each lap-gain = one meeting ⇒ 2 meetings at times C/(u−v) and 2C/(u−v).

## 🧪 LAB — The stadium (10 min)
1. A beats B by 25 m in a 200 m race. Speed ratio? Where is B when A crosses 150 m?
2. A:B = 3:2 and B:C = 5:4 in 100 m races ⇒ A:B:C and A's margin over C?
3. Track 300 m, joggers 6 and 4 m/s same direction — first meeting time? First at-start reunion?
4. Same loop, opposite directions — meeting interval? Six meetings need how long?
5. Head start audit: A (5 m/s) gives B (4 m/s) 15 m on a 100 m dash. Winner and margin?

**Why this matters:** races/circles are exam-freebies — but only for people who never confuse the two reunion laws or the two head-start species.

**🔑 Lab answers:** (1) 200:175 = **8:7**; at A=150 ⇒ B = 150×7/8 = **131.25 m** (2) A:B = 15:10, B:C = 10:8 ⇒ **15:10:8**; A at 100 ⇒ C at 100×8/15 = 53.3 ⇒ **by 46.7 m** — chained margins multiply through the ratios, never add (3) meetings every 300/2 = **150 s**; at-start LCM(50, 75) = **150 s** — same here by coincidence of the numbers; compute both always (4) 300/10 = **30 s**; six meetings = **180 s** (5) A needs 100/5 = 20 s for the full course; B, with the 15 m start, must cover 85 m and needs 85/4 = 21.25 s — A finishes 1.25 s earlier. In distance terms: when A crosses (t = 20 s), B stands at 15 + 80 = 95 m ⇒ **A wins by 5 m.** Same-clock choreography settles every head-start question.

## 💪 Exercises
1. "Beats by 40 m" on 200 m ⇒ ratio? If the loser's time was 50 s, both speeds?
2. Trilogy: A beats B by 10 m (100 m), B beats C by 10 m (100 m). A over C — margin? (Answer to 1 decimal.)
3. A gives B a 20 m start AND still wins by 10 m on 200 m. Ratio of speeds?
4. Track 500 m: cyclists 12 and 8 m/s same direction ⇒ lap-gain time? At-start reunion (lap times 41.67 & 62.5 s — CAREFUL: LCM needs clean seconds; rescale to 9 & 6 m/s first and compare)?
5. Three runners on 400 m: 8, 5, 4 m/s same direction. When are all three first together ANYWHERE… actually that's the LCM problem in disguise: first together at start = LCM(lap times). Lap times and LCM?
6. Seconds-start: A gives B 5 s start on 100 m; speeds: A 10 m/s, B 8 m/s. Who wins, by what distance? (Compute B's head position after the 5 s first.)
7. Opposite-direction meeting harvest: two skaters meet every 24 s on a 480 m rink. Speeds sum? If one is 12 m/s, the other? Meetings in 4 minutes?

### ✅ Selected answers
1. 200:160 = **5:4**; loser 160 m/50 s = 3.2 m/s ⇒ winner 4 m/s (**times: 100 m→… winner's 200 m takes 50 s too — same clock! speeds 4 and 3.2 m/s**).
2. A:B = 10:9, B:C = 10:9 ⇒ C at 81 when A at 100 ⇒ **margin 19 m** (10+10 = 20 would be the naive felony).
3. A runs 200, B runs 180 − yet is 10 behind ⇒ when A finishes, B is at 170 ⇒ B's effective run per A's 200 = 170 ⇒ ratio **20:17** (the start AND the deficit both belong in the same-clock picture).
4. Lap-gain = 500/4 = **125 s**; lap times: 500/12 = 41.67 s, 500/8 = 62.5 s ⇒ at-start LCM(41.67, 62.5) — multiply by 12: LCM(500, 750) = 1500 ⇒ **125 s** (same — geometry conspires). With 9 & 6 m/s: lap-gain 500/3 = 166.7 s; lap times 55.56 & 83.33; ×18: LCM(1000, 1500) = 3000 → 166.7 s. Patterns: for two same-direction runners the at-start reunion EQUALS the lap-gain time whenever… always! (Faster gains one lap exactly when it has run LCM/when both whole-lap? — true when lap times are commensurate, which ratios guarantee.)
5. Laps: 50 s, 80 s, 100 s ⇒ **LCM = 400 s** — first all-together at start at 400 s (8 laps / 5 laps / 4 laps).
6. B's 5-second start = 40 m banked (8 × 5). Timelines: B runs the full 100 m and finishes at t = 100/8 = 12.5 s; A starts at t = 5 and finishes at t = 5 + 100/10 = 15 s ⇒ **B wins by 2.5 s.** Distance margin: when B crosses at 12.5 s, A has run only 7.5 s × 10 = 75 m ⇒ **B wins by 25 m.** Seconds-starts flip favorites — choreography first, conclusions second.
7. Sum = 480/24 = **20 m/s**; partner = **8 m/s**; meetings in 240 s = **10** (every 24 s).

## ❓ Quiz
1. In a 100 m race A beats B by 20 m. Their speed ratio:
   - (a) 6:5
   - (b) 5:4 — same clock, so the finish-line distances ARE the ratio (100:80); the by-margin unrolls in one line
   - (c) 4:3
2. Two runners (8 and 5 m/s) run a 400 m loop in the SAME direction. They first meet after:
   - (a) 30.8 s
   - (b) 133.3 s — the faster must gain one full lap at the 3 m/s gap: 400/3 (opposite directions would be the 400/13 = 30.8 s answer)
   - (c) 400 s
3. Lap times on a circuit: 50 s and 80 s. Both riders first stand together AT THE STARTING POINT after:
   - (a) 400/3 s
   - (b) 400 s — the at-the-start reunion needs whole laps from BOTH: LCM(50, 80); the word "starting point" switches the law from relative-length to LCM
   - (c) 130 s

### ✅ Answers
1. **(b)** — margins are distances at the same clock; gift wrap off, ratio out.
2. **(b)** — direction chooses the gear: gap for same, sum for opposite; (a) grabbed the wrong gear.
3. **(b)** — LCM law; (a) is a meeting ANYWHERE (relative length), (c) is an average's fever dream.

## ✅ Mastery checklist
- [ ] "Beats by X m" → ratio in one line; trilogies chain by a common middle (never add margins)
- [ ] Meters-start vs seconds-start named and solved as same-clock choreography
- [ ] Circular: same dir C/(u−v), opposite C/(u+v) — gear choice spoken aloud
- [ ] At-start reunion = LCM(lap times), distinguished from anywhere-meetings
- [ ] 3-runner LCMs computed without fear (50/80/100 → 400 s canon)
- [ ] Finish-line pictures drawn for any head-start: who is where when someone crosses

**Next:** **TSD6 · Traps, Triage & Mock Arena** — UNIT MIX-UP, AVERAGE-OF-SPEEDS MIRAGE, DIRECTION FLIP, PLATFORM DOUBLE-COUNT, RACE-START CONFUSION: all five named, a 5-gate radar, and the 10-question TSD-01 paper with negative marking. Helmets on! ⚡
