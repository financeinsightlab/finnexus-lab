# 🎯 CF7 · Valuation Front Door — DCF & Multiples Discipline
> Everything before this module was training; valuation is the match. CF7 converts ShopKart's cash flow (FCFF ₹13.67L, AC5) into an enterprise value (₹194L), then a share price (₹37.4 vs the ₹30 ticker), and then slaps you with the two honesty warnings that keep analysts employed: **terminal value is 67% of your answer**, and every multiple lies somewhere if you let it. This is the front door; Course 9 refines, Course 13 wields.

## 🎯 Objectives
- Walk the DCF money-pipeline: FCFF → PV@WACC → EV → −net debt → equity value → per share.
- Construct **terminal value** with the Gordon bridge and audit its gravity (67% of EV — handle with fear).
- Run **sensitivity grids** (WACC × g) and quote ranges, not fake-precision points.
- Wield the multiple toolkit — P/E, EV/EBITDA, EV/Sales — and name when each one lies.
- Deliver the 30-second "walk me through a DCF" interview script without notes.

## 📘 Concepts

### 7.1 The money-pipeline (memorize the verb order)
```text
FCFF 13.67L → grow 10% × 5 yrs: 15.04, 16.54, 18.19, 20.01, 22.01
Discount @ WACC 12.6%:         PV factors .888 .789 .700 .622 .552
                               PV = 13.36+13.05+12.74+12.45+12.16 = 63.8
Terminal: TV = F6/(WACC−g) = 22.01×1.03/(0.126−0.03) = 236.2 → PV = 130.5
Enterprise Value EV = 63.8 + 130.5 = **₹194.3L**
− net debt (19 − 12 cash) = 7 → Equity = 187.3 → ÷ 5L shares = **₹37.4/share**
Market quotes ₹30 ⇒ ~25% upside IF the owners trust the inputs. That 'if' is the job.
```

### 7.2 Terminal-value gravity — the 67% confession
PV of TV (130.5) ÷ EV (194.3) = **67%**: two-thirds of the valuation lives beyond the forecast window, inside two guesses (g and WACC minus g). Rules of engagement: g ≤ long-run GDP (3% for a Delhi retailer is ambition already); when (WACC − g) narrows below ~8%, TV explodes non-linearly — shrinking that gap by 1pp moves TV by ~13%. Any DCF → first question: *"show me the TV as % of EV and the g you bet."*

### 7.3 Sensitivity — ranges or it didn't happen
Bull corner (WACC 11.6%, g 4%): EV ≈ ₹239L → ₹46.5/share. Bear corner (WACC 13.6%, g 2%): EV ≈ ₹164L → **₹31.5/share**. Board sentence: *"the pessimist's corner still clears the ₹30 market — margin of safety endorsed."* Quoting ₹37.4 as 'the value' is fake precision; quoting ₹31–46 with base ₹37 is epistemology with a spine.

### 7.4 Multiples discipline — three horses, three lies
- **P/E = 11.3×** (market ₹30 / EPS 2.65): simple, retail-loved; *lies* when capital structures differ (interest sits above EPS), earnings are negative, or one-offs pollute PAT.
- **EV/EBITDA = 7.5× intrinsic vs 9× peer**: capital-structure-neutral, banker-favorite; *lies* when capex intensity differs (an asset-light 9× and a cold-storage-heavy 9× are not siblings) — EV/EBITDA ignores that D&A will be repurchased in trucks.
- **EV/Sales**: for loss-starved startups only; *lies* whenever margin structure varies (2% grocer vs 40% SaaS — same multiple, different species).
Professional move: quote the DCF range + one clean multiple cross-check; if they violently disagree, hunt the input, not the method.

### 7.5 The 30-second DCF script (interview forge, deliver verbatim-paced)
"Forecast unlevered free cash flows five years — sales build to margin to tax to working capital to capex; discount at risk-matched WACC; add a Gordon terminal grown at sub-GDP; sum = enterprise value; strip net debt and prefs for equity; divide by shares; then sensitivity-grid WACC against terminal growth and quote the range. My first audit target: terminal value as a share of EV — anything above ~75% gets the g questioned to its face."

## 🧪 LAB — The valuer's bench (10 min)
1. Recompute EV if year-5 FCFF were ₹20L flat (no growth — zero-capex-maintenance world): TV = 20/0.126?
2. Per-share if net debt were ₹27L instead of ₹7L (cash spent on a dividend spree)?
3. Grid cell: WACC 12.6% held, g → 4%: new TV and per-share swing from base ₹37.4?
4. Multiple autopsy: Peer P/E 14× on EPS ₹1.9 vs ShopKart-implied P/E 14.1× — but peer carries D/E 1.4. Which single metric replaces P/E for a clean compare, and why?
5. First-question drill: analyst shows EV ₹320L, TV/EV = 81%. Your opening line?

**Why this matters:** 1–3 teach the productive kind of 'what-if' — touching ONE assumption at a time; 4–5 are the exact benches in equity-research internships.

**🔑 Lab answers:** (1) TV = 20/0.126 = **₹158.7L** → PV = 87.7 → EV = 151.4 → per share (151.4−7)/5 = **₹28.9** — no-growth ShopKart is worth LESS than its ticker: the market is literally pricing your growth story, check it twice (2) equity = 194.3 − 27 = 167.3 /5 = **₹33.5** — net-debt is the silent share-price tax (3) TV = 23.0/0.086 = 267.4 → PV 147.7 → EV 211.5 → 40.9/share: 1pp of g ≈ +₹3.5/share, which is why 'optimism about perpetuity' must be argued in paragraphs, not decimals (4) EV/EBITDA — puts debt back in the price (EV) and strips interest+D&A timing — capital-structure-neutral comparison (5) "Show me your g, your WACC−g spread, and the reinvestment rate that growth implies — an 81% TV means the company lives in the forecast-free hereafter… and so does your risk."

## 💪 Exercises
1. Full solo rebuild: FCFF ₹10L growing 12% × 5y, WACC 13%, g 3%, net debt ₹20L, 2L shares — pipeline to per-share, every factor shown.
2. TV autopsy × 2: compute TV and TV/EV for (a) g 2% (b) g 3.5% at WACC 12% on F6 ₹25L — narrate why (b)'s jump smells.
3. Margin-of-safety policy: your fund buys only if bear-corner ≥ market. ShopKart passes? Write the two-line buy-note.
4. Startup trap: pre-revenue 'AI-grocery' firm pitched at EV/Sales 40× using ₹30L *GMV* as 'sales'. Compose the 3-line professional response (GMV ≠ revenue!).
5. Multiple selection matrix: banks, a cyclical steel firm mid-trough, a SaaS firm, and ShopKart — assign the primary multiple per row with the why (banks are the trap!).
6. FCFF forensics: management's DCF uses EBITDA 26 growing 12% as the 'FCF' line (no WC, no capex, no tax). Rebuild their EV-side inflation factor roughly and write the audit footnote.
7. The interview: "Why is EV not market cap?" — answer in exactly two sentences with ShopKart numbers inside.

### ✅ Selected answers
1. F's: 11.2, 12.54, 14.05, 15.73, 17.62; factors @13%: .885, .783, .693, .613, .543 → PV = 9.91+9.82+9.74+9.64+9.57 = 48.7; TV = 18.15/0.10 = 181.5 → PV 98.6; EV = **147.3**; equity = 127.3/2 = **₹63.6/share**.
2. (a) TV = 25.5/0.10 = 255 → TV/EV depends on flows, landmarks ~70%+; (b) 25.9/0.085 = 304.7 — +19% TV from 1.5pp of g: sniffable precisely because no retailer sustains 3.5% forever past GDP gravity; asking 'what reinvestment funds that g?' usually collapses it.
3. 'Bear corner ₹31.5 ≥ market ₹30 ✓; even sandwiching a 200bp WACC miss and 100bp growth miss, we lose nothing permanent. Buy within band, monitor CCC + spreads quarterly.' (Margins of safety are bought at the input table, not at the price chart.)
4. 'GMV passes through; revenue is the commission slice (~8–12%), so EV/Sales 40× becomes EV/Revenue 330×+. Second: unit economics per order before platform poetry. Third: CAC payback cohorts or the deck is novel-length fiction.' GMV-flation is the newest old trick.
5. Banks: P/B (assets ARE the product; EV/EBITDA lies when debt is raw material). Steel mid-trough: EV/EBITDA through-cycle or normalized P/E (spot multiples explode at bottoms). SaaS: EV/Sales with Rule-of-40 sanity (no earnings yet, margins scalable). ShopKart: EV/EBITDA (stable, comparable leverage).
6. Their 'FCF' overstates by roughly: missing tax 4.45 + WC 4.6 + capex 5 ≈ 14/26 ⇒ ~54% inflation before discounting; footnote: 'replace EBITDA with FCFF per AC5 bridge (EBITDA 26 → CFO 16.95 → FCFF 13.67) and rerun their growth claims on the corrected base.'
7. "Market cap prices only equity — headline ₹150L would ignore that ShopKart's ₹19L of debt must be repaid by any buyer; EV = market cap + net debt = price of the whole kitchen, 150 + 7 in canon terms."

## ❓ Quiz
1. ShopKart's DCF pipeline ends: EV ₹194L − net debt ₹7L ⇒ equity value per share (5L shares):
   - (a) ₹30.0
   - (b) ≈ ₹37.4 — discount the unlevered cash at 12.6%, add the Gordon terminal grown at 3%, strip the debt, divide by claimants; vs the ₹30 ticker, the margin of safety opens — *if* the inputs survive cross-examination
   - (c) ₹19.4
2. The single most dangerous line in any DCF is:
   - (a) year-1 revenue
   - (b) terminal value — 67% of EV here lived inside (WACC − g); demand g ≤ GDP, TV/EV under ~75%, and the reinvestment math behind the growth — most valuation crimes are committed in the hereafter
   - (c) depreciation
3. Choosing between P/E and EV/EBITDA to compare two differently-levered retailers:
   - (a) P/E — simpler
   - (b) EV/EBITDA — EV repacks debt into the price and EBITDA strips financing+D&A timing, neutralizing the leverage difference; P/E would crown the high-debt firm 'cheap' because interest ate its visible earnings
   - (c) EV/Sales — always

### ✅ Answers
1. **(b)** — (a) confused market with value; (c) is the year-1 PV, not the pipeline.
2. **(b)** — the hereafter is where decks go to lie; everything else is small print.
3. **(b)** — same store sales deserve the same denominator-clean view; simplicity that hides leverage is not a feature.

## ✅ Mastery checklist
- [ ] DCF pipeline recited as verbs: forecast → discount → terminal → EV → strip debt → per share → grid
- [ ] ShopKart base case rebuilt solo (₹194L EV, ₹37.4/share, ₹31.5–46.5 honest band)
- [ ] TV gravity quantified and policed (67%; g vs GDP; WACC−g explosion guard)
- [ ] P/E vs EV/EBITDA vs EV/Sales lie-catalog recited with one industry each
- [ ] 30-second DCF script delivered in 30±5 seconds, numbers included, no panic
- [ ] BA/GMV/EBITDA-as-FCF fraud patterns flaggable on sight

**Next:** **CF8 · CAPSTONE — The CFO War Room** — a ₹40L expansion decision end-to-end: fresh WACC from statements, three projects' NPV/IRR triage, the pecking-order funding build with covenant math, the board letter, and rapid-fire until WACC bluffs bounce off you! 🏆
