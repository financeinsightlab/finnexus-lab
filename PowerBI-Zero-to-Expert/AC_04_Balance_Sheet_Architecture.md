# 🎯 AC4 · Balance Sheet Architecture — The Photograph That Must Balance
> The P&L is a video of the year; the balance sheet is the photograph at the final second of March 31. Everything ShopKart owns, everything it owes, and the residue that belongs to the owners — one snapshot, and it MUST balance, because the scale from AC1 never stopped being true. We dissect ShopKart's FY25 photograph block by block, then articulate it back to the P&L like professionals.

## 🎯 Objectives
- Read the two architectures: **sources of funds** (equity + liabilities) = **applications** (assets) — India Schedule III vs the T-form.
- Classify current vs non-current (12-month rule) and order assets by liquidity.
- Compute and interpret **working capital**, capital employed, net worth — with instincts for what "good" looks like in retail.
- Articulate: opening RE + PAT − dividends = closing RE; trace every P&L rupee into the snapshot.
- Spot structural warnings: negative WC, ballooning receivables, equity eating by losses, funding mismatch (short money in long assets).

## 📘 Concepts

### 4.1 ShopKart's FY25 photograph (₹ Lakh) — open vs close
| | Opening (1 Apr) | Closing (31 Mar) |
|---|---|---|
| **Equity**: Capital | 50.0 | 50.0 |
| Reserves (RE) | 2.8 | **13.4** (2.8 + 13.25 − 2.65 ✓) |
| **Non-current liabilities**: Van term loan | 0 | 4.0 |
| **Current liabilities**: Bank OD | 17.0 | 15.0 |
| Trade creditors | 25.4 | 26.0 |
| Statutory/other payables | 2.0 | 2.3 |
| **Total claims** | **97.2** | **110.7** |
| **Fixed assets** (net block): gross 25 → 30, accum. dep 2.5 → 8.5 | 22.5 | 21.5 |
| **Current assets**: Stock | 41.7 | 44.2 |
| Trade debtors | 30.0 | 31.5 |
| Prepaid expenses | 0 | 1.5 |
| Cash & bank | 3.0 | 12.0 ✓ |
| **Total applications** | **97.2** ✓ | **110.7** ✓ |

Two photographs, one year's motion in between: equity grew by retained profit (+10.6), loans swapped shapes (OD −2, term loan +4), machines aged (−1 net of capex), and working capital swelled. Read a balance sheet always as TWO dates — the delta IS the story.

### 4.2 Anatomy drills — each line's job interview answer
- **Net block 21.5** = gross 30 − accumulated depreciation 8.5: machines at cost less consumption. Depreciation accumulated (≥) one full Capex every few years — conglomerates show the ratio as a rough age meter: 8.5/6.0 ≈ 1.4 "years of charge" parked.
- **Stock 44.2** ties to COGS identity (AC7 goes deep).
- **Debtors 31.5** ≈ 41 days of sales (31.5/280×365 = **41.0 days**) — retail lives on cards/cash ex-store, so this is mostly B2B/corporate sales; watch this number like a hawk year over year.
- **Cash 12.0** reconciles to AC5's flow statement to the paisa (articulation preview).
- **OD 15.0 + creditors 26.0 + payables 2.3 = current liabilities 43.3** vs current assets 89.2.

### 4.3 Working capital & its cousins — the living numbers
```text
Working Capital = CA − CL = 89.2 − 43.3 = ₹45.9L   (opening: 74.7 − 44.4 = ₹30.3L)
Current Ratio   = CA / CL = 89.2 / 43.3 = 2.06     (opening 1.68 ✓ improving)
Capital Employed = Equity + non-current debt = 63.4 + 4.0 = ₹67.4L
Net Worth        = Capital + Reserves = ₹63.4L
```

Interpretations with teeth:
- WC grew ₹15.6L in a year of ₹13.25L profit — profit didn't idle as cash; it *became stock and debtors* (plus prepaids). "Profit is opinion, cash is fact" begins right here — exact lead-in to AC5.
- Retail rule-of-thumb: current ratio ~1.5–2 breathes comfortably; >3 hints lazy cash; <1 flirts with supplier-tantrums.
- Funding-match doctrine: **long assets eat long money.** Term loan ₹4L funds the van ✓; paying store fit-outs from the OD would be structural gambling — the OD can be recalled any season.

### 4.4 Articulation — where the P&L hides inside the snapshot
The formal knot: **Opening RE + PAT − Dividends = Closing RE** ⇒ 2.8 + 13.25 − 2.65 = 13.4 ✓. Every P&L rupee lands somewhere: profits thicken equity; expenses that weren't cash yet thicken payables; uncollected sales thicken debtors; unsold purchases thicken stock. Once you see the balance sheet as *the P&L's residue*, you can never be fooled by a company showing "profit" while every asset line hemorrhages — AC10's whole forensic career.

### 4.5 Structural warnings — the photo red flags
1. **Negative working capital**: suppliers and customers financing the business (Amazon's model — deliberate and lethal in the right hands, terror in the wrong ones).
2. **Receivables outpacing revenue**: FY24→25 ShopKart debtors +5% vs revenue +7.7% — healthy; if it doubled, you'd smell channel-stuffing.
3. **Equity shrinkage**: accumulated losses eating capital (negative net worth = technical insolvency for lending purposes).
4. **Funding mismatch**: long assets on short money — the classic SME death spiral every bank credit officer is trained to spot in 20 seconds.

## 🧪 LAB — Snapshot studio (10 min)
1. Given: Cash 8, Stock 60, Debtors 25, Net block 30, Creditors 40, OD 20, Term loan 15, Capital 50, RE = ?. Solve RE via the equation, then build both columns of the BS.
2. From (1): working capital, current ratio, capital employed (treat OD as current).
3. Same firm, one year later: PAT 12, dividends 3, OD down to 14. Recompute closing RE. What else must move to keep the photo balanced? (2 possibilities.)
4. Debtors are ₹22L on ₹240L revenue: debtor-days. Management claims 30-day terms on all sales — forensic comment in one line?
5. A startup buys ₹10L of servers using its OD. Name the mismatch and the two clean funding alternatives.

**Why this matters:** assembling a snapshot from scraps is the single most-tested "practical" in accounting interviews — and the fastest way to internalize articulation.

**🔑 Lab answers:** (1) Assets = 8+60+25+30 = 123; Claims ex-RE = 40+20+15+50 = 125 ⇒ RE = **−2** (accumulated loss — the photo can show negative equity!) (2) CA = 93, CL = 60 ⇒ WC = **33**, CR = **1.55**; CE = 50 − 2 + 15 = **63** (3) Closing RE = −2 + 12 − 3 = **+7**; balance requires assets +9 (e.g., stock/debtors/cash growth) or other liabilities −9 (the OD −6 does part), in any mix — deltas must sum (4) 22/240×365 = **33.5 days** ≈ okay-ish vs 30-day terms — but ask for the AGING; averages hide 120-day rot beneath 5-day hero sales (5) long asset on short money (OD recallable) — alternatives: 3–5 year term loan, or lease; mismatch is the SME death spiral's first step.

## 💪 Exercises
1. Assemble: Gross block 40, Accum dep 10, Stock 30, Debtors 18, Cash 7, Capital 60, RE 14, Creditors 22, Payables 3, OD 6, Term loan 20. Build the full BS, WC, CR, net worth, capital employed — and if the two sides refuse to meet, find the smallest plausible missing line Alex the intern dropped, and complete his sheet.
2. In (1), the firm posts a ₹2L LOSS next year, pays no dividend, and sells the term-loan-refinanced machine for ₹6L at book. Walk the three deltas and rebuild the closing RE.
3. Compute ShopKart's opening vs closing current ratios (numbers given in 4.3) and write the one-line trend verdict a banker would say aloud.
4. Debtor-days drill: debtor balance 41 days vs 30-day terms + 5-day card settlement mix at 60/40 B2B/retail — does the blend reconcile? (Weights!)
5. Negative-equity essay: list two legitimate paths to negative net worth (years of losses; massive one-off write-off) and two *cosmetic* repairs (revaluation reserve, capital restructuring scheme) with a one-line honesty rating for each cosmetic.
6. Funding match: fit-outs ₹20L (8-year life) — price the wrong choice (OD at 12%) vs right choice (8-yr term loan at 11%) over 8 years, focusing on RISK, not rate, in 3 lines.
7. Hidden articulation: "Debtors rose ₹5L, stock fell ₹3L, prepaid rose ₹0.5L, profit was ₹10L, dividends ₹4L." What happened to cash, approximately, ignoring taxes and capex? (Articulation logic.)

### ✅ Selected answers
1. Claims side first: Capital 60 + RE 14 (equity **74**) + Term loan 20 + Creditors 22 + Payables 3 + OD 6 = **125**. Applications as sent: net block (40−10) 30 + Stock 30 + Debtors 18 + Cash 7 = **85**. The sheet is ₹40L light — as printed it *cannot* balance, and forcing it would be the sin this course preaches against. Smallest plausible omission: **other non-current assets ₹40L** (investments / dark-store security deposits) ⇒ assets 125 = claims 125 ✓. With the picture completed: CA = 30+18+7 = 55, CL = 22+3+6 = 31 ⇒ WC = **24**, CR = 55/31 = **1.77**; Net worth = **74**; Capital employed = NW + long-term debt = 74 + 20 = **94**. **Moral: trust but assemble — sent numbers can be broken; the equation is both your builder and your auditor.**
2. RE: 14 − 2 = 12 (loss flows); machine sale at book ⇒ no P&L impact, cash +6, block −6; RE closes 12; assets: +6 cash −6 block net zero from the sale, and the ₹2L loss hides as cash burn or WC bloat somewhere — the photograph must re-balance via the delta accountant hunts.
3. 74.7/44.4 = **1.68 → 2.06** — "liquidity strengthened while profits were retained; bankable trajectory."
4. Blend: 0.6×30 + 0.4×5 = 20 days expected vs 41 actual ⇒ **+21 days of stretch hiding somewhere** — either aging rot in B2B or quietly extended terms to a friendly corporate — worth one email to the AR desk before closing!
5. Legitimate: multi-year losses; one-off impairment/write-offs. Cosmetics: revaluation reserve (restating asset VALUES without cash — honest only if the valuer is) and restructuring (writing off losses against capital — legal eraser, honest as a *disclosure*, useless as health). Ratings: revaluation = amber, restructuring = grey-amber; neither creates cash.
6. OD: bank can recall in any squeeze — asset serves 8 years, funding may vanish in 8 days; the rate saves 1% but buys refinancing risk every renewal. Term loan costs 1% more but the lender can't run mid-project. Risk > rate for long assets — match tenors, sleep well.
7. +10 PAT − 5 debtors + 3 stock − 0.5 prepaid − 4 dividends ≈ **+₹3.5L cash** (articulation!) — profit minus working-capital hunger minus payouts. Welcome to AC5's doorstep.

## ❓ Quiz
1. ShopKart FY25 closes: Reserves move from ₹2.8L to ₹13.4L because:
   - (a) revenue grew
   - (b) articulation: opening RE 2.8 + PAT 13.25 − dividend 2.65 = 13.4 — the P&L pours into the balance sheet through retained earnings; the snapshot is the video's residue
   - (c) capital increased
2. Working capital (CA 89.2 − CL 43.3) = ₹45.9L while PAT was ₹13.25L. The lesson:
   - (a) accounting error — WC should equal PAT
   - (b) profit got REINVESTED into stock, debtors and prepaids instead of idling as cash — "profit is opinion, cash is fact" is written in working capital, which is why bankers read deltas, not headlines
   - (c) creditors were overpaid
3. Buying 8-year-life store fit-outs using the recallable-any-day bank OD is:
   - (a) smart — OD is cheaper
   - (b) a funding mismatch — long assets financed on short money; the rate is cheaper but every renewal is a coin-flip; term loans or leases match tenors and kill the spiral risk
   - (c) illegal

### ✅ Answers
1. **(b)** — capital transactions and trading results are different doors into equity; only one of them is open at year-end.
2. **(b)** — the delta column of a balance sheet IS the cash's diary; AC5 turns it into the formal statement.
3. **(b)** — the 1% you save is your fee for carrying refinancing risk all year; credit officers are paid to find exactly this in 20 seconds.

## ✅ Mastery checklist
- [ ] Any BS assembled from scraps and balanced — deltas explained line by line
- [ ] Current/non-current classification by the 12-month rule, liquidity-ordered
- [ ] WC / current ratio / net worth / capital employed computed and *judged*, not just added
- [ ] Articulation: I trace any P&L rupee to its balance-sheet landing spot
- [ ] The four structural warnings (negative WC, debtor bloat, equity erosion, funding mismatch) reflex-checked on every photo
- [ ] Opening vs closing read as a story — the delta is the disclosure

**Next:** **AC5 · Cash Flow Statement Mastery** — the statement that never lies politely: direct vs indirect, CFO/CFI/CFF, working-capital untangling, and the interview nuke: "depreciation increases by ₹10 — walk me through all three statements." Cash, finally, gets its own press conference! 💧
