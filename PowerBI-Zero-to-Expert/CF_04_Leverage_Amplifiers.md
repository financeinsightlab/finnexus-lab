# 🎯 CF4 · Leverage Amplifiers — DOL, DFL & the Break-Even Cube
> Two firms sell ₹280L. One sleeps, one sweats — the difference is *cost architecture*. Fixed costs and fixed interest are gears: they multiply sales wiggles into profit swings, in both directions. CF4 hands you the dials: **DOL** (operating leverage), **DFL** (financial leverage), **DCL** (the combined amplifier), and the break-even cube every CFO computes before signing any lease with a long shadow.

## 🎯 Objectives
- Split any cost line into fixed vs variable and rebuild a **contribution-format P&L**.
- Compute and interpret DOL = Contribution/EBIT, DFL = EBIT/PBT, DCL = DOL×DFL — percentages made gears.
- Land the break-even sales, margin of safety, and stress PBTs in a scenario grid.
- Decide the *pairing rule*: high-DOL industries must run low DFL (and vice versa) — with India examples.
- Answer the interview classics: "all else equal, sales +10% — profit?" without a calculator.

## 📘 Concepts

### 4.1 Cost architecture — the P&L in contribution dress
ShopKart FY25, rewritten so fixed and variable stand apart:
```text
Sales 280  →  COGS 198.8 (variable)  →  Contribution 81.2  (CM ratio 29%)
Fixed: opex 55.2 + D&A 6 = 61.2      →  EBIT 20
Interest 2.3                         →  PBT 17.7 → tax 4.45 → PAT 13.25
```
The rule that does the heavy lifting: **contribution grows 1:1 with sales (29 paise per ₹), fixed costs don't move.** That asymmetry is the gear.

### 4.2 The three dials (with ShopKart's numbers)
- **DOL = Contribution ÷ EBIT = 81.2 / 20 = 4.06** → each 1% sales move swings EBIT ~4.06%.
- **DFL = EBIT ÷ PBT = 20 / 17.7 = 1.13** → each 1% EBIT move swings PBT another 1.13× (interest is the second fixed gear; low debt ⇒ near-1 gearing).
- **DCL = DOL × DFL = 4.06 × 1.13 = 4.59** → **a 10% sales slip cuts PBT ≈ 45.9%**: 17.7 × (1 − 0.459) = **₹9.58L**. A 10% surge lifts it to 17.7 × 1.459 = **₹25.8L**. Same store, two universes — the gear ratio decides which.

### 4.3 Break-even & margin of safety
BE (ex-interest) = fixed 61.2 ÷ 0.29 = **₹211L**; BE including interest = 63.5 ÷ 0.29 = **₹219L**. **Margin of safety = (280 − 211) / 280 = 24.6%** — sales can fall a quarter before EBIT zeroes; that's the honest sentence behind 'our seasonality is manageable'. NBFC-borrower screens ask for MOS routinely; so should founders before any 5-year lease.

### 4.4 The pairing rule — gears must not stack
Operating leverage is chosen by industry (airlines, hotels, steel, SaaS: fixed-cost cathedrals ⇒ sky-high DOL). **High-DOL businesses must borrow LITTLE** (DFL near 1) — stacking fixed interest on fixed costs compounds ruin; obsessing 'cheap debt' inside a high-DOL firm is how airlines die on schedule. Low-DOL businesses (trading, FMCG distribution: costs mostly variable) can safely carry higher DFL. Read any capital-structure debate through this lens: *what is DOL, and who stacked the second gear?*

### 4.5 Leverage alchemy vs the flat world bridge
Link back to CF3: debt looks accretive because we compare EPS at one sales point. DCL forces the honest question — *accretion at what sales variance?* A levered retail plan with BE at 88% of expected sales and MOS 12% is a coin-flip wearing a spreadsheet; same plan at MOS 30% is a business. Presenting leverage without the BE cube is malpractice; you'll now catch it in any pitch deck.

## 🧪 LAB — Scenario grid sprint (10 min)
1. Rebuild DOL/DFL/DCL from canon (one line each, no notes).
2. Sales +15% festive season: PBT lands where?
3. Sales −20% COVID-style shock: PBT? Still above zero?
4. BE at contribution ratio 29% if fixed costs grow ₹5L (new lease)?
5. Pairing verdict: a hotel chain (DOL ~6) proposes D/E 3.0 (DFL ~2.2). One-line risk counsel.

**Why this matters:** grid questions 2–4 are interview rapid-fire at boutique I-banks; 5 is the credit-committee sentence that earns the chair's nod.

**🔑 Lab answers:** (1) 81.2/20 = **4.06**; 20/17.7 = **1.13**; × = **4.59** (2) 17.7 × (1 + 0.459×1.5) = 17.7 × 1.6885 = **₹29.9L** festive universe (3) 17.7 × (1 − 0.918) = **₹1.45L** — technically alive but covenant-sweating: EBIT = 20 × (1 − 0.812) = 3.76 ⇒ interest coverage = 3.76 / 2.3 = **1.63×** — deep below a 4× floor, alarm bells ringing (4) fixed 66.2 (excl interest) ÷ 0.29 = **₹228L** BE — MOS shrinks to 18.6%: the lease quietly moved the zero-point ₹17L; that is the lever you negotiate BEFORE signing (5) 'gears stacked both ways — a mild occupancy dip times 6 times 2.2 is a collapse; refinance toward cash-flow-matched debt now, not at the refinancing wall.'

## 💪 Exercises
1. Two retailers: Alpha contribution 30%, fixed 75L, EBIT 15L; Beta contribution 40%, fixed 90L, EBIT 30L. DOL each — who sweats a slow quarter more, and why doesn't the fatter margin save them automatically?
2. Recompute ShopKart's DCL if the van term loan were instead a ₹10L loan at 12% (interest 1.2 extra). What did the extra ₹1.2L of fixed interest do to a −10% scenario?
3. Break-even duel: opex restructure cuts fixed by ₹4L but adds ₹2L/yr variable commission (estimate commission as a flat ₹2L hit to contribution at current sales). New CM, new BE vs old — worth it?
4. MOS policy memo: set ShopKart's minimum MOS floor at 25% and convert into the max fixed-cost the next lease may add. Show the algebra.
5. Industry library: rank grocery retail, airlines, toll roads, IT services, sugar mills by expected DOL — then write the single driver sentence under each rank.
6. "DFL below 1 is impossible." Prove with numbers when DFL < 1 actually occurs (hint: other income or negative net interest).
7. Interview machine-gun: sales +8%, DOL 3, DFL 1.25 — % move in PBT? Then the PBT move if sales fell 8% — and the asymmetry lesson in two lines.

### ✅ Selected answers
1. Alpha: 75+15 = contribution 90 ⇒ DOL 6.0; Beta: 90+30 = 120 ⇒ DOL 4.0. Alpha sweats more despite being 'smaller' — the fatter contribution per sale can't outrun the taller fixed tower; DOL reads the tower, not the margin sticker.
2. Interest 3.5 ⇒ PBT 16.5 ⇒ DFL 1.21, DCL 4.91. The −10% case: PBT%Δ = −49.1% ⇒ 16.5 × 0.509 = **₹8.4L** vs ₹9.58L before — ₹1.2L of extra fixed interest bought a permanently steeper slope in BOTH directions.
3. New CM = (81.2 − 2)/280 = **28.29%**; new fixed (ex-interest) = 61.2 − 4 = **57.2** ⇒ BE = 57.2 / 0.2829 = **₹202L** vs ₹211L — WORTH IT at healthy volumes: ₹9L lower watermark. The trade is classic insurance: commission makes every marginal sale thinner (boom quarters give up a little), while survival quarters bleed less (crisis quarters keep you alive) — you buy downside room with upside cents.
4. MOS 25% at sales 280 ⇒ BE ≤ 210 ⇒ fixed ≤ 0.29 × 210 = **₹60.9L**. Current fixed 61.2 ⇒ already brushing the floor — *any* new lease must come with offsetting fixed cuts, or sales growth affidavit. That's how MOS stops being décor.
5. Airlines ≈ toll roads (fixed cathedrals praying for traffic) > IT services (people-heavy fixed benches) > sugar mills (cane price-fixed input + heavy plant) > grocery retail (COGS-dominant, costs flex with sales). One driver each: the FIXED/VARIABLE architecture, never the sector romance; retail's thin margins are a different worry than leverage — don't confuse the two reports.
6. DFL < 1 happens when 'PBT' exceeds EBIT — e.g., net other income/interest RECEIVED > interest paid: treasury-rich firm earns ₹3L on FDs vs ₹1L loan cost ⇒ PBT built above EBIT makes the 'leverage' gear an *amplifier in reverse* — DFL below 1 flags a lender-free fortress (or earnings padded with non-operating income — check composition!).
7. +8% × 3 × 1.25 = **+30% PBT**; downside −8% → **−30%**. In TWO lines: fixed-cost gears are symmetric by formula and asymmetric in life — upside compounds morale, downside compounds covenants; gear for the downside, celebrate the upside.

## ❓ Quiz
1. ShopKart's DCL of 4.59 means a 10% sales dip moves PBT by:
   - (a) 10%
   - (b) ≈ −45.9% — the two gears multiply: every sales rupee contributes 29 paise, fixed costs pretend not to notice; 17.7 falls to ≈ ₹9.58L, which is why seasons are respected, not feared
   - (c) 4.59%
2. Break-even sales (ex-interest) with fixed ₹61.2L and CM 29%:
   - (a) ₹177L
   - (b) ≈ ₹211L — the zero-EBIT watermark; margin of safety (280−211)/280 = 24.6% is the honest headline every lender actually reads
   - (c) ₹61.2L
3. The pairing rule says high-DOL industries should run:
   - (a) high DFL — stack gears
   - (b) low DFL — a fixed-cost cathedral must not also borrow fixed coupons; stacking both gears is how airlines die on schedule, while low-DOL traders can carry debt safely
   - (c) zero sales growth

### ✅ Answers
1. **(b)** — (a) forgets the gears exist; (c) confuses the gear with the result.
2. **(b)** — BE = fixed ÷ CM; options (a) and (c) divided the wrong way.
3. **(b)** — the entire module in one rule: choose ONE gear to worship, never both.

## ✅ Mastery checklist
- [ ] Contribution-format P&L rebuilt from any standard one in 2 minutes
- [ ] DOL/DFL/DCL computed and narrated with ShopKart's 4.06 × 1.13 = 4.59
- [ ] BE ₹211L + MOS 24.6% explained aloud; lease-impact BE re-run on demand
- [ ] Scenario grid (±10/15/20%) produced without a formula sheet
- [ ] Pairing rule applied to 3 named industries with driver sentences
- [ ] 'Leverage pitch without a BE cube = malpractice' — the deck-audit reflex installed

**Next:** **CF5 · Dividend Doctrine — Payouts, Signals & Cosmetic Fireworks** — when the ₹2.65L dividend is wisdom and when it's surrender; ex-date price physics; buybacks, bonuses, splits; and India's post-2020 dividend tax map! 💸
