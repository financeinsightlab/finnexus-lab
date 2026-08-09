# 📈 DI4 · Line Charts: Slopes Tell the Growth Story

> Line charts are trend-land: where tables show states, lines show **journeys**. Exams love them because one picture hides growth-rate math, crossover logic and unit traps at once. Toppers love them because the reflexes are few: **read steepness honestly, honor the axis, and let intersections answer \"when equal?\" questions for free.** Today we run ShopKart's 12-month Online sales line — the vertical Priya built — and its YoY twin.

---

## 🎯 Objectives

- Read values AND slopes from line charts; connect steepness ↔ absolute growth.
- Compute **month-on-month % growth** straight off a line.
- Solve **crossover** questions (\"when did A overtake B?\") at sight.
- Defuse the **double y-axis trap** — the line-chart specialist wound.
- Use **step-read ≠ area-read**: point values are monthly, never \"the space under the line\".
- Map line charts to your Time Series course knowledge for 2× marks efficiency.

---

## 📘 Concepts

### 4.1 The ShopKart Online line (FY25 monthly, ₹ lakh)

Priya's Online vertical, month by month (ties to DI2's quarterly totals):

| Month | Apr | May | Jun | Jul | Aug | Sep | Oct | Nov | Dec | Jan | Feb | Mar |
|---|---|---|---|---|---|---|---|---|---|---|---|---|
| Online ₹L | 4 | 4 | 4 | 4.5 | 4.5 | 5 | 6 | 5.5 | 6.5 | 7 | 7.5 | 7.5 |

Quarter check: Q1 = 12 ✔ · Q2 = 14 ✔ · Q3 = 18 ✔ · Q4 = 22 ✔ · FY = 66 ✔ — chart and table singing the same song (DI2 consistency reflex).

### 4.2 Slope = story (steepness reading, honestly)

**Steepest climbs:** Sep→Oct: 5 → 6 (+1.0, **+20%**) · Nov→Dec: 5.5 → 6.5 (+1.0, +18.2%) · Jan→Feb: 7→7.5 (+0.5, 7.1%). Same +1.0 lakh jump, different % — the small-base law (DI2/DI3) again, now wearing a slope costume.

- **Steepness ∝ ABSOLUTE change per step** (only if axis is uniform and starts honestly!).
- % growth = jump ÷ FIRST value — the slope LOOKS equal for +1 jumps; the % isn't. Eyes see slope; formulas see ratio. Trust formula.
- A gentle but LONG rise (Jan→Mar plateau) ≠ decline — \"flat\" is also data (7.5 held two months: stable, saturated or ceiling? That's interpretation — for the GD/interview courses; here: state the plateau, don't moralize it).

### 4.3 Crossovers: \"when did A overtake B?\" — free marks

Plot the second line — Kirana-store KB monthly (₹L): 4, 4, 4.5, 4.5, 4.5, 4.5, 5, 5.5, 6, 6, 6, 6.5 (quarter sums 12.5/13.5/16.5/18.5 ≈ let it be illustrative). **The crossover point = where the two lines MEET: values equal there.** Questions like \"in which month did Online overtake KB?\" require NO calculation: find the intersection, read the month after it. Between-point crossing = \"during that interval\" (exam answers accept approx month).

### 4.4 The double y-axis trap (line charts' specialist trap)

Two lines, **two different y-axes** (left: sales ₹L for Online; right: marketing spend ₹ for the same months). Slip to avoid: reading BOTH lines on the same axis — crossing comparisons become meaningless. **Reflex: match legend → line → AXIS before reading ANY value.** If one axis is % and the other ₹, \"where do the lines cross?\" becomes a NONSENSE question — answer accordingly when the exam dares it (or re-read: they ask \"when were the RATIO-linked values equal\", compute per-axis).

### 4.5 Point-read ≠ area-read (+ the Time Series bridge)

Line chart questions ask for **point values** (a month), **jumps** (month pairs), or **period sums** (Q1 = Apr+May+Jun = 12 — sum of POINTS, not \"area under the line\" — area under jagged monthly lines has no exam meaning). Your Time Series course adds pro vision: a 3-month moving average of the Online line (SMA-3: Jun = (4+4+4)/3 = 4.0; Jul = 4.17; Oct = 5.17; Nov = 5.5; Dec = 5.67; Mar = 7.5) smooths the staircase into the trend Priya's dashboard shows — and DI questions DO ask \"average of Q3 months\" = 6.0 ✔ same engine, new clothes.

---

## 🧪 LAB — Run the line (10 min)

1. Write the 12 monthly values as a quick staircase sketch. Mark the two steepest segments.
2. Compute BOTH +1.0 jumps' %s. Which is higher and why (one line)?
3. \"Average monthly Online sales in FY\" — one division.
4. KB-line crossover: Online (starts 4) vs KB (starts 4): when does Online FIRST go clearly above, and in which quarter does the gap peak?
5. Double-axis drill: if marketing spend (right axis, ₹ thousands: 40, 40, 45, 45, 45, 50, 60, 55, 65, 70, 75, 75) rides a second line — can you compare \"Online sales (₹L) is higher than marketing (₹k)\"? What conversion makes the comparison legal?

**Answer key:** 2) Sep→Oct 20% > Nov→Dec 18.2% — same absolute jump, smaller base wins (1/5 vs 1/5.5). 3) 66 ÷ 12 = **₹5.5L**. 4) First clean above: Oct (6 vs 5); gap peaks in Mar (7.5 vs 6.5 → but Q4 sums 22 vs 18.5 ✔). 5) Only after ONE-UNIT conversion: ₹L × 100 = ₹k → March: 750k vs 75k → Online 10×. Legal. (Unconverted = the classic \"who scored higher, Raj (90%) or Simran (85/100)?\" category error.)

---

## 💪 Exercises

1. Q4 average of Online vs full-year average — gap?
2. Slope audit: axis step = 1.0; Dec→Jan looks \"small\". Real jump? % jump?
3. Crossover Q: two lines meet in Sep. What does the meeting MEAN (one precise sentence)?
4. Area fallacy: \"Total Online sales = area under the line\" — attack in one line.
5. SMA-3 for Oct, Nov, Dec from the monthly values (AV + TS bridge).

### ✅ Selected answers

1. Q4 avg = 22/3 = **7.33L**; FY avg = 5.5L; gap = +1.83L (Q4 runs 33% above the year average — 7.33/5.5 = 1.333 ✔).
2. Dec→Jan: 6.5 → 7 = +0.5 = **7.7%**. Looks flat because the climb is small vs the axis — READ numbers, not vibes.
3. \"In September the two series have EQUAL values (whatever they measure), at the meeting point's y-level.\" Crossing ≠ merging businesses — it equals equality, once.
4. \"Monthly points are counts at instants; the LINE only connects them for the eye — sum the 12 POINTS (66), areas measure nothing here.\"
5. Oct SMA-3 = (4.5+5+6)/3 = 5.17; Nov = (5+6+5.5)/3 = 5.5; Dec = (6+5.5+6.5)/3 = 6.0 — clean upward drift hidden under the staircase. TS course pays off again.

---

## ❓ Quiz

**Q1.** Two adjacent jumps on a line look equally steep: 5→6 and 5.5→6.5. Their %-growths are:
- (a) Equal — same slope, same %
- (b) **DIFFERENT — 20% vs 18.2%; % divides by the FIRST value, and equal slopes on different bases are never equal ratios**
- (c) Unknowable from a chart
- (d) Both 10%

**Q2.** The crossover point of two same-axis lines means:
- (a) The companies merged
- (b) **The two series have EQUAL values at that x-point — 'when did A overtake B?' resolves to the month right after the intersection, zero calculation**
- (c) The chart is broken
- (d) Both series are rising

**Q3.** A line chart has two y-axes. Before reading any value, the professional's move is:
- (a) Read the left one only
- (b) **Match legend → line → AXIS for every series** — reading a right-axis line on the left axis corrupts every downstream question silently
- (c) Average the axes
- (d) Skip the set

### ✅ Answers

1. **(b)** — small-base law on slopes. Eyes read steepness (absolute); formulas read ratio (÷ first value). When they disagree, the formula holds the mark.
2. **(b)** — intersection = equality + the \"overtake\" month is the next point. Free 15 seconds, spend them smiling.
3. **(b)** — the double-axis discipline. One legend-line-axis triple per series, THEN any arithmetic. Cross-axis comparisons without unit conversion are category errors.

---

## ✅ Mastery checklist — DI4

- [ ] Point values + jumps + period-sums distinguished; no area fantasies
- [ ] Slope honesty: steepness ↔ absolute, % = ÷ first value, both computed in LAB
- [ ] Crossovers read in ≤ 15 s with the equality rule
- [ ] Double-axis triple-check (legend-line-axis) before value reads
- [ ] SMA overlay links DI4 to AV/TS (Oct/Nov/Dec SMA-3 from memory)
- [ ] Plateaus described as \"flat/stable\" — no invented stories

---

**Next:** 🥧 **DI5 · Pie Charts** — the 360° playground: degrees↔percent↔values conversion table, single + multi-pie rules, donuts (= pies in disguise), and ShopKart's FY25 store-mix pie + the FY25 expense pie where our ₹6.7L net margin story becomes 8.6° of pure insight.
