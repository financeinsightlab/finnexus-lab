# 🎯 TSD7 · FINANCE: Delivery Fleet Costing + Capstone
> Speed is money wearing a helmet. Price motion with the two-variable tariff — **₹4/km fuel + ₹150/hour rider** — and the whole course turns CFO: single-order runs cost ₹82, batch-2 drops ₹61.50, batch-3 ₹58.83, and the drop-mix decision saves ₹1.17L a month at one dark store. Deliverable: the signed **ShopKart Fleet Costing Sheet**.

## 🎯 Objectives
- Convert any route into ₹ via the **time+kms tariff**: cost = 4×(km) + 150×(hours).
- Prove the **batching dividend**: cost per ORDER falls as drops share a run — compute single vs pair vs trio.
- Link promise-radius (TSD1) to cost: bigger zone ⇒ longer runs ⇒ costlier orders — price the trade along the curve.
- Charge layovers honestly: door-wait minutes are inside the hourly meter (TSD2's parasite).
- **Capstone:** build the fleet cost sheet, the drop-mix P&L, and one recommendation to the COO.

## 📘 Concepts

### 7.1 The tariff — motion, priced
```text
Rider scooty: fuel ₹4 per km · rider time ₹150 per hour (wage + benefits load)
Cost(run) = 4 × total_km  +  150 × (total_hours)      ← hours INCLUDING waits
```

Everything TSD taught — speeds, radii, relative meetings — now feeds these two variables. Slower rider ⇒ cheaper fuel bill? No: same km, MORE hours ⇒ the hourly meter always punishes slowness at ₹150/h.

### 7.2 The canonical runs — single, pair, trio
Zone radius 4 km, cruising 24 km/h:

```text
SINGLE (1 order, there & back): 8 km round, 20 min
  Fuel 8×4 = ₹32 · Time 20/60×150 = ₹50 → ₹82 per order   ← the lonely tax

PAIR (2 orders, shared sortie): 12 km loop, 30 min
  Fuel ₹48 · Time ₹75 → ₹123 per run → ₹61.50 per order  → saves ₹20.5 = 25%

TRIO (3 orders): 16 km loop, 45 min
  Fuel ₹64 · Time ₹112.50 → ₹176.50 per run → ₹58.83 per order → saves 28.3%
```

The dividend decays (25% → 28.3%) because route length and minutes grow with each added drop — **batching pays, but with diminishing doorsteps**. The law behind the table: per-order cost = [4·km + 150·t]/n, and km, t both grow with n slower than n does — the same harmonic kindness we met on rivers.

### 7.3 Paying the layover parasite its wages
Single run + 3-minute customer-door wait: time = 23 min ⇒ cost = 32 + 57.5 = **₹89.5** (+₹7.5). Ten such waits a day per rider ≈ ₹75/day ≈ **₹1,950/month per rider** — an invisible salary the P&L pays the doorbell. Ops levers that attack the wait (OTP-at-gate, building access lists) are finance levers, full stop. Rule: the hourly meter never pauses; every rupee of wait lands in cost-per-order.

### 7.4 The radius–promise–cost triangle
| Promise | Radius @24 km/h | Round km | Run cost (single) | ₹/order |
|---|---|---|---|---|
| 10 min | 4 km | 8 | ₹82 | ₹82 |
| 15 min | 6 km | 12 | 48 + 60 = **₹108** | ₹108 |
| 8 min | 3.2 km | 6.4 | 25.6 + 40 = **₹65.6** | ₹65.6 |

Wider promises charge more per drop (further rides); tighter promises demand MORE dark stores (real-estate bill). The CFO question is never "how fast" but **which cell of this table minimizes total system cost** — delivery ₹ + store count + lost sales from slower promises. TSD doesn't answer it alone; it hands finance the honest per-cell numbers.

### 7.5 Motion meets margin — the contribution squeeze
ShopKart canon: AOV ₹750, gross margin 29% ⇒ contribution ≈ ₹217.5 per order:

```text
Single run ₹82   eats 82/217.5  = 37.7% of contribution
Pair run ₹61.5   eats 61.5/217.5 = 28.3% of contribution
```

Batch policy is **margin policy**: the 25% cost dividend returns 9.4 points of contribution to the order. Every dark-store dashboard that quotes "delivery cost/order" is quoting this line — now you can rebuild it from a stopwatch and a fuel card.

### 7.6 CAPSTONE BRIEF — the ShopKart Fleet Costing Sheet
One dark store: **250 orders/day, 26 days/month = 6,500 orders**.

**Sheet A — run economics:** the 7.2 table (82 / 123→61.50 / 176.50→58.83) + waits from 7.3.
**Sheet B — drop-mix P&L:** dispatch policy: 15% singles, 60% paired, 25% trio-averaged:
```text
₹/order = 0.15×82 + 0.60×61.50 + 0.25×58.83 = 12.30 + 36.90 + 14.71 = ₹63.91
Month = 6,500 × 63.91 = ₹4,15,415
Single-only world = 6,500 × 82 = ₹5,33,000
Batch dividend = ₹1,17,585/month ≈ ₹1.17L (−22%)
```
**Sheet C — utilization:** rider shift 8 h, productive ride time 6.5 h ⇒ 81% utilization; hourly billing runs only on all 8 clock hours (₹1,200/day labor per rider — verify against runs: if riders log fewer sortie-hours than 8, the meter still ran; utilization is a finance metric).
**Sheet D — recommendation (the two-liner you'd sign):** enforce pair-or-better dispatch above 60% of orders (dividend ≈ ₹1.17L per store per month), install OTP-at-gate to claw the ~₹1,950/rider wait parasite, and review the 10-min promise cell yearly against the ₹108 column of the 15-min world.

## 🧪 LAB — The fleet office (10 min)
1. Cost a single run: 10 km round, 30 min with 4 min of door waits inside it.
2. Pair run: 14 km, 36 min — per-order cost and dividend vs the Q1 single.
3. A rider does 18 sorties × ₹74 average cost for 160 orders served… what's ₹/order? (Careful: divide by ORDERS, not sorties!)
4. Utilization audit: riders bill 8 h but telematics shows 5.9 h moving+riding. Utilization %, and the monthly 'idle salary' at ₹150/h, 26 days.
5. Promise economics: marketing wants a 7-min promise in a 5.5 km-radius zone. Required average speed? If riders actually average 22 km/h, is the promise honest?

**Why this matters:** this lab IS the capstone's sheet A — if these five settle cold, the CFO meeting is a formality.

**🔑 Lab answers:** (1) fuel 40 + 30/60×150 = 40+75 = **₹115** (waits inside, as always) (2) 56 + 90 = 146 → **₹73/order**; dividend = 1 − 73/115 = **36.5%** (pairing shines brighter when singles were slow) (3) 18×74 = ₹1,332 ÷ 160 orders = **₹8.33/order** — sanity check before publishing: 160 orders over 18 sorties ≈ 8.9 orders per sortie, perfectly plausible for a milk-run B2B route; report ₹8.33/order with the sortie-mix assumption attached (4) util = 5.9/8 = **73.75%**; paid-idle = 2.1 h × 150 × 26 = **₹8,190/month/rider** (5) needed speed = 5.5/(7/60) = **47.1 km/h** — inside city traffic that's a fantasy (and a safety memo); at 22 km/h the honest promise is 5.5/22 h = **15 minutes** ✓.

## 💪 Exercises
1. Cost ladder: single runs of 6 km/15 min, 8 km/20 min (canon), 12 km/35 min — ₹ each?
2. Trio run variant: 18 km, 50 min, with 6 min of door waits — per-order cost? (Waits are already inside the 50 — resist double-paying.)
3. Break-even mix: singles 82, pairs 61.5 — what mix % of pairs drives ₹/order below ₹70? (Solve 82(1−p) + 61.5p ≤ 70.)
4. The speed-wage squeeze: same 8 km round at 30 km/h saves how much vs 24 km/h — and what's the win % on the single-run cost?
5. Utilization bridge: rider month: 26 days × 8 h = 208 h billed; productive 170 h. Utilization %, billed-labor cost, and productive-hour effective rate (true cost per productive hour)?
6. Zone redesign: store shifts promise 10→12 min, radius 4→4.8 km, round 8→9.6 km (24 min). Single-run cost now? Pairs assumed 14 km/34 min – new per-order?
7. Margin squeeze audit: AOV ₹750, margin 29%. At what delivery cost/order does delivery eat EXACTLY one-third of contribution?

### ✅ Selected answers
1. 24+37.5 = **₹61.5**; **₹82**; 48+87.5 = **₹135.5**.
2. 72 + 125 = 197 → **₹65.67/order** (the 6 min rides inside the 50 — the parasite is paid exactly once).
3. 82 − 20.5p ≤ 70 → p ≥ 12/20.5 = **58.5% pairs** — dispatch policy translated into one inequality.
4. New time 8/30 h = 16 min: cost = 32 + 40 = **₹72**; save ₹10 = **12.2%** — speed pays the hourly meter but never the fuel meter.
5. Util = 170/208 = **81.7%**; billed = 208×150 = **₹31,200**; effective = 31,200/170 = **₹183.5 per productive hour** — the number telematics dashboards should print in red.
6. Single: 38.4 + 60 = **₹98.4** (wait: 9.6km×4 = 38.4 + 24/60×150 = 60 ✓); pair: 56 + 85 = 141 → **₹70.5/order**. Wider zones raise BOTH columns — pricing follows the triangle from 7.4.
7. Contribution = 750×0.29 = 217.5 → delivery = 217.5/3 = **₹72.5/order** — anything dearer eats more than a third; the pair-economics cell (₹61.5) stays inside, singles (₹82) breach — the margin tells you the mix target all by itself.

## ❓ Quiz
1. Tariff ₹4/km + ₹150/h: a single-order run of 8 km and 20 minutes costs:
   - (a) ₹72
   - (b) ₹82 — fuel 8×4 = 32 plus time 20/60×150 = 50; two meters, one route, and the lonely tax in full
   - (c) ₹90
2. A pair-run covers 12 km in 30 minutes on the same tariff. Cost per order and dividend vs singles:
   - (a) ₹73, 11%
   - (b) ₹61.50, 25% — run cost 48+75 = ₹123 shared by 2 orders; batching splits both meters and returns a quarter of every single-run rupee
   - (c) ₹61.50, 12%
3. With contribution ₹217.5 per order, delivery at ₹82 (single) vs ₹61.5 (pair) eats:
   - (a) 25% vs 18%
   - (b) 37.7% vs 28.3% — batch policy is margin policy: a cost dividend returns ≈9.4 points of contribution to every order
   - (c) 41% vs 30%

### ✅ Answers
1. **(b)** — (a) forgot a meter; (c) paid for waits that never happened (keep the parasite honest, not imaginary).
2. **(b)** — the run gets pricier (123 > 82) while each ORDER gets cheaper; per-order is the only denominator that votes.
3. **(b)** — delivery eats contribution, and dispatch is the dial; CFOs read the course's final table in this column.

## ✅ Mastery checklist
- [ ] The two-meter tariff (₹4/km + ₹150/h, waits inside) prices any route in one line
- [ ] Canon run table (82 / 61.50 / 58.83) recited with dividends (25%, 28.3%)
- [ ] Per-ORDER denominator is my reflex; per-sortie costs never sneak past
- [ ] Promise–radius–cost triangle: I can rebuild the 8/10/15-min cells on demand
- [ ] Utilization & true productive-hour rate computed from billed vs telematics hours
- [ ] I shipped the 4-sheet Fleet Costing deliverable with a signed two-line recommendation

🏆 **COURSE COMPLETE — Time, Speed & Distance!** From one triangle (D = S×T) through harmonic truths, train protocols, river gears, stadium LCMs and all five traps — to a fleet P&L that saves ₹1.17L/month. Motion, priced.

**Next:** **⏱️ Time & Work** — the LCM engine that runs India's favorite chapter: rates that add, efficiency ratios, alternate days, leaving-and-joining, pipes that fill and leak — and a festive staffing pack at the end. Clock's ticking! 🚀
