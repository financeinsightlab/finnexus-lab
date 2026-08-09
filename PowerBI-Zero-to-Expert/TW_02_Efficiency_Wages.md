# 🎯 TW2 · Efficiency & Wages — Pricing Work-Done
> "A is twice as efficient as B" is a **rate ratio wearing plain clothes**: 2:1 flows, inverse day-ratios — and at payday, money splits by **work contributed**, not by days attended. ₹750 for the pair becomes ₹450:₹300, and the industrious apprentice finally gets paid what the tank says he earned.

## 🎯 Objectives
- Convert efficiency statements into rate ratios and *inverse* day-ratios (twice as good ⇒ half the days).
- Run two-worker efficiency problems through the tank with one unknown rate.
- Split **wages by work-done**: same-clock ⇒ wage ratio = rate ratio; worked days differ ⇒ wage = rate × days each.
- Distinguish per-day wages from per-JOB contracts — the two payroll universes.
- Keep the "equal split feels fair" reflex where it belongs: in the bin.

## 📘 Concepts

### 2.1 The efficiency flip — ratios with a twist
```text
"A is twice as efficient as B"  →  flows 2 : 1  →  days inverse: if A takes 6 d, B takes 12 d
"A is 50% more efficient"       →  flows 3 : 2  →  days 2 : 3 (A's days are 2/3 of B's)
```

The twist is the inversion: efficiency divides the calendar. Put it in a tank immediately — "A twice B, together finish in 4 days": tank = 4 × (2+1) = 12 units ⇒ A alone = 6 d, B alone = 12 d. One tank line from ratio to individual calendars.

### 2.2 Efficiency-vs-days cross-examinations
Exams serve the ratio disguised as a day-count: "A does a job in 10 days; B is 25% more efficient than A; B's time?"

```text
A flow = 1/10; B flow = 1.25 × 1/10 = 1/8 → B = 8 days
```

Inverse-disk check: B's days = A's ÷ 1.25 = 10/1.25 = 8 ✓ — "X% more efficient ⇒ divide days by (1 + X/100)"; "X% LESS efficient ⇒ DIVIDE by (1 − X/100)" (B 25% less efficient than a 10-day A ⇒ B = 10/0.75 = 13.33 days, not 12.5 — the asymmetry club from TSD1 sends regards).

### 2.3 The payday law — money follows work-done
Two laborers work the same number of days on one job; wages should split as their **rates**:

```text
Flows 3:2, job bill ₹750 → first gets 3/5 × 750 = ₹450, second ₹300 ✓
```

Work-done = rate × days attended; the wage pool splits by work-done. Same-days case (the classic) ⇒ rate ratio = wage ratio directly. Different-days case: a 3-flow man for 4 days (12 u) beside a 2-flow man for 6 days (12 u) ⇒ **equal pay** — the tank calls it a draw even though the calendars disagree. Unfair-feeling? No — identical contribution.

### 2.4 The two payroll universes — don't mix the meters
- **Per-day wage:** bill = quoted day-rate × attendance. Efficiency invisible in the invoice (visible only in the *value* received).
- **Per-JOB contract:** fixed pool ⇒ split by work-done (2.3). Efficiency is literally money.
Mixing them births the classic error: paying the fast man the same day-wage for *fewer* days on a job-contract — he got punished for speed. The tank-ledger never confuses meters because it prices **units of work**, and units are the universe-neutral currency.

### 2.5 ShopKart payday drill (canon)
Diwali window-dressing contract, ₹750 lump: senior (3-flow) + apprentice (2-flow) work 2 days side by side.

```text
Work logged: 6 u + 4 u → split ₹450 : ₹300 ✓  (canon)
```

Twist: apprentice skips day 2 ⇒ logged 6 u : 2 u ⇒ split ₹562.50 : ₹187.50. The pool doesn't care about attendance *feelings*; it buys units. (Foreman's translation: "you are paid for tank, not time" — a sentence worth a salary negotiation somewhere.)

## 🧪 LAB — The payroll desk (10 min)
1. "A is 3× as efficient as B; together: 6 days." Solo calendars?
2. A in 12 days; B is 50% more efficient — B solo? If instead B were 50% LESS efficient — B solo?
3. Flows 4:3, job pool ₹1,400, same days attended — split?
4. Same flows, but the 4-flow man works 5 days and the 3-flow man works 8 days — split ₹1,400 now.
5. A does 1/3 of a tank alone and B finishes the rest; pool ₹2,400. Split by work-done. Then price it if instead they worked TOGETHER throughout (flows 1:1) — same pool.

**Why this matters:** wage-split problems are guaranteed 2-markers in TCS/SSC families and a real argument-solver in every family business ever.

**🔑 Lab answers:** (1) tank 24: flows 3+1 = 4 u/d ⇒ A: 8 days, B: 24 days (2) B = 12/1.5 = **8 days**; less-efficient variant: 12/0.5 = **24 days** (3) ₹800 : ₹600 (4) logged 20 u : 24 u ⇒ ₹1,400 × 20/44 : 24/44 = **₹636.36 : ₹763.64** — the slower grinders out-earn the sprinter on attendance (5) ₹800 : ₹1,600; together: identical flows ⇒ **₹1,200 : ₹1,200** — same pool, same team, different attendance choreography, different cheques.

## 💪 Exercises
1. B is 60% as efficient as A. A finishes in 15 days ⇒ B? (Careful which inversion you reach for.)
2. Together 5 days, flows 2:3 — solo days for each?
3. A is 40% more efficient than B; B takes 21 days ⇒ A?
4. Pool ₹900, flows 5:4, the 5-flow attends 3 days, the 4-flow attends 6 — split?
5. Contract ₹3,000 for a 3-man crew (flows 1:2:3), all present the same 2 days. Each man's cheque?
6. A works days 1–4 (flow 5 u/d), B days 3–6 (flow 4 u/d) on the same 40-unit tank; pool ₹1,000. Who earns what — and does the tank actually finish inside those 6 days?
7. The fairness essay (3 lines): why does "equal pay for equal days" fail as a principle on job contracts? Use the 20 u : 24 u lab case as your exhibit.

### ✅ Selected answers
1. B's flow = 0.6 × A ⇒ B's days = 15/0.6 = **25 days** (NOT 9 — that's the efficiency-flip going the wrong way; check: is B slower? then B's calendar must be LONGER ✓).
2. Tank = 5 × 5 = 25 ⇒ A (2-flow): 12.5 days, B (3-flow): 8.33 days.
3. A = 21/1.4 = **15 days**.
4. Logged 15 u : 24 u ⇒ split 900 × 15/39 : 24/39 = **₹346.15 : ₹553.85**.
5. Shares 1/6 : 2/6 : 3/6 (same attendance ⇒ flow ratio = wage ratio) ⇒ **₹500 : ₹1,000 : ₹1,500**.
6. A logs 20 u, B logs 16 u ⇒ tank 36 u — **fails: 40-tank unfinished by 4 units** (B would bill day 7 solo to close). Split by logged work: 1,000 × 20/36 : 16/36 = **₹555.56 : ₹444.44** — contracts should bill completion separately: the lesson is the tank ledger exposes unfinished business before the client does.
7. Equal-days-equal-pay prices attendance; job contracts purchase *work-done*; the 20:24 case shows attendance and contribution actively disagreeing — pay by tank or the fast leave and the slow linger (adverse selection, payroll edition).

## ❓ Quiz
1. "A is 3:2 against B in efficiency" means their day-ratios are:
   - (a) 3:2 as well
   - (b) 2:3 — efficiency divides the calendar: the better worker races through in fewer days, so times sit inverse to flows (put it in a tank: flows 3+2, together 6 days ⇒ 30 units ⇒ A 10 d, B 15 d)
   - (c) 9:4
2. Shelf-dressing job pays ₹750 as one pool; two workers (flows 3:2) attend the same days. The senior's cheque:
   - (a) ₹375
   - (b) ₹450 — money follows work-done: 3/5 of the pool; equal-attendance makes the wage ratio the flow ratio, and ₹450:₹300 is the canon split
   - (c) ₹500
3. A does a job in 10 days; B is 25% MORE efficient. B's calendar:
   - (a) 12.5 days
   - (b) 8 days — divide days by (1 + 25/100) = 1.25: 10/1.25; "more efficient ⇒ fewer days," and 12.5 is the answer of someone who ADDED the percentage to the calendar instead
   - (c) 7.5 days

### ✅ Answers
1. **(b)** — the twist is the point; tanks make it mechanical so the twist never bites twice.
2. **(b)** — work-done is the only fair ledger when the paycheck is a pool; attendance is a costume.
3. **(b)** — inversion both times: 1.25× rate ⇒ ÷1.25 time; (a) is the direction-flip felony, (c) invented 33%.

## ✅ Mastery checklist
- [ ] Efficiency ratio → flow ratio → inverse day-ratio: the two-step is reflex
- [ ] X% more/less efficient solved by dividing (1 ± X/100) — direction verbalized first
- [ ] Tank-first for ratio problems; solo calendars fall out of the same tank
- [ ] Payday law: pool splits by rate × days-attended — logged units, not vibes
- [ ] Per-day vs per-job universes named, and I never bill one universe in the other's meter
- [ ] Adverse-selection speech ready: mis-price work-done and your best people walk

**Next:** **TW3 · Alternates, Leavers & Joiners** — day-on-day-off cycles with the off-by-one guillotine, "A leaves after 4 days" bookkeeping, and the finishing touches of tank accounting. Who swings the hammer on day 13? 🔁
