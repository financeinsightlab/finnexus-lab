# 🎯 AC5 · Cash Flow Statement Mastery — Profit Is Opinion, Cash Is Fact
> Companies don't die of losses; they die of *empty drawers*. The cash flow statement exists because profits can be dressed (receivables, stock games, capitalized fantasies) while cash is a serial-numbered fact. One page, three boxes — **Operating, Investing, Financing** — and the drawer at the end must match the one on the photo. We build ShopKart's FY25 flows, untangle working capital, ace the famous interview walk-throughs, and meet Free Cash Flow.

## 🎯 Objectives
- Reconcile PAT → CFO under the **indirect method**: non-cash add-backs, financing removals, and the working-capital untangle.
- Read the direct method as a *cash ledger view* — same destination, different road (Ind AS 7 allows both; India reports mostly indirect).
- Walk the **three-statement link drill** with total confidence (the +₹10 depreciation nuke).
- Compute **FCFF and FCFE** from a cash flow statement without a formula sheet.
- Diagnose companies by flow signature: growing profit with starving CFO, the capex treadmill, dividend-paying on borrowed money.

## 📘 Concepts

### 5.1 The three boxes — and the rule of cash at the bottom
```text
CFO (cash engine)  ±  CFI (assets bought/sold)  ±  CFF (money to/from owners & lenders)
= ΔCash  →  opening cash + ΔCash = closing cash   (The BS photo's cash line — must tie exactly.)
```

### 5.2 Indirect build — ShopKart FY25 (₹L)
Start at PBT's neighborhood and walk home:

```text
EBITDA (operations cash power)                        26.00
Working-capital moves (operating accounts only):
  Stock up   (41.7 → 44.2)   cash HIDDEN in shelves    −2.5
  Debtors up (30.0 → 31.5)   customers owe more        −1.5
  Prepaid up (0 → 1.5)       rent etc. prepaid         −1.5
  Creditors up (25.4 → 26.0) suppliers fund us more    +0.6
  Statutory payables up      +0.3
Tax paid                                             −4.45
CFO = 16.95   ✓ (= 26 − 4.6 ΔWC − 4.45)                 16.95
CFI — Delivery van purchase                            −5.00
CFF — Interest paid −2.30 · OD repaid −2.00 · term loan +5.00
      · loan principal repaid −1.00 · dividend −2.65   −2.95
ΔCash = +9.00  →  3.00 opening → 12.00 closing  ✓ (ties to the photo!)
```

Read it once like a detective: a ₹13.25L profit converted into ₹16.95L operating cash because depreciation (₹6) is money that never left the drawer, and creditors financed part of the WC swell. That conversion — CFO/PAT = 1.28 — is a healthy *quality-of-earnings* pulse. Rule of thumb: persistent CFO/PAT < 1 means the profits live in warehouses, not banks.

### 5.3 The untangle rules (never flip these again)
| Move | Cash effect | Instinct |
|---|---|---|
| Asset (non-cash) increases | **−** | money went INTO the shelf/customer/prepay |
| Asset decreases | **+** | money crawled back OUT |
| Liability increases | **+** | someone else is financing us |
| Liability decreases | **−** | we repaid that kindness |

Working capital = operating current accounts only; the OD (a financing instrument) sits in CFF. Never let it ride the ΔWC.

### 5.4 The direct view — same destination, different road
The darling of textbook questions: summarize literal cash movements.
Demo — **FruitCart FY** (₹L): sale collections 100 (incl. 3 collected from last year's slice), supplier payments 62, wages 12, rent 6, tax 4 ⇒ CFO = 100 − 62 − 12 − 6 − 4 = **16**. Indirect for the same outfit: PAT 14 + dep 2 − ΔWC (−2 inventory) + ... = 16 — roads meet, always. In interviews: *mentioning* that Ind AS 7 allows both, and that indirect dominates Indian reports, scores the maturity point.

### 5.5 The interview nuke — "+₹10 depreciation, walk all three statements"
P&L: PBT −10 ⇒ tax −2.5 (25%) ⇒ **PAT −7.5**. Cash: PAT −7.5, add back +10 (non-cash) ⇒ **CFO +2.5** (the tax saved ×25% is real cash). BS: net block −10, cash +2.5, RE −7.5 ⇒ **still balances** (assets −7.5 net, equity −7.5 ✓). One line, three statements, full marks — because the depreciation was *inside* the machine already; raising it just draws more of the bill into this year's P&L while the taxman co-signs ₹2.5 of relief. Variants worth owning: capex +10 (CFO flat, CFI −10, block +10), WC bloat (CFO −5, debtors +5).

### 5.6 Free Cash Flow — the capital's appetite
** FCFF** (cash for ALL capital providers) = CFO + interest×(1−tax) − capex = 16.95 + 2.3×0.7483 − 5.0 = **13.67L**. **FCFE** (cash truly the equity's) = CFO − capex − net debt repaid = 16.95 − 5.0 − (2.0 + 1.0 − 5.0) = **13.95L** (the new loan cushioned this year). FCF is what valuations actually buy — a P&L enthusiast and a valuation professional part ways exactly here. Capex-heavy growth eats FCF by design; decades of evidence say markets eventually price the cash, not the butter.

### 5.7 Flow signatures — diagnostics by pattern
- Profit ↑, CFO < PAT persistently → toilet-paper profits: receivable/stock inflation (AC10).
- CFI negative every year + CFO declining → the treadmill company: aging assets needing ever-fresh cash.
- CFF financing dividends while CFO < dividends → paying owners with the bank's money — legal, loud sirens.
- Great company badge: CFO ≈ PAT + D&A over 5 years, CFI sensible, CFF boring.

## 🧪 LAB — Flow forge (10 min)
1. Operating profit (PBT) 30, dep 8, tax paid 8, WC moves: stock +5, debtors −2, creditors +4. CFO?
2. Demo co: interest on OD 3 (classification: financing), capex 10, dividend 5, OD opening 20 → closing 14. CFF?
3. Closing cash: opening 7, CFO 22, CFI −15, CFF −4. Closing?
4. GymBro Ltd reports PAT 50, CFO 18, dividends 20 funded by a fresh loan. Write the one-line diagnosis.
5. Indirect method mishap drill: an intern ADDED the stock increase and SUBTRACTED depreciation. Red-flag their two instincts in one line each.

**Why this matters:** this lab is literally the five questions that appear, in this order, across most corporate-finance internship screens. Cheap insurance.

**🔑 Lab answers:** (1) WC cash effect: stock increase −5, debtors fall +2, creditors rise +4 ⇒ net **+1 (source)**; CFO = 30 + 8 (dep add-back) + 1 − 8 (tax paid) = **31** (2) −3 (interest) − 5 (div) − 6 (OD) = **−14** (3) 7 + 22 − 15 − 4 = **10** (4) "Dividend paid on borrowed money while profits aren't converting to cash — siren signature" (5) assets-up is ALWAYS minus (shelves are cash-freezers); depreciation is ALWAYS added back (the drawer never saw it leave).

## 💪 Exercises
1. Full indirect: PAT 42, D&A 11, interest 6 (to financing), tax adjustment 0; stock +9, debtors +4, prepaid −1, creditors +7, payables +2. CFO?
2. Flow signature quiz: 4 companies — write the one-line verdict on each: (a) PAT 20, CFO 19, CFI −8, CFF −5; (b) PAT 20, CFO −12, CFI −1, CFF +15; (c) PAT −10, CFO +4, CFI −2, CFF 0; (d) PAT 20, CFO 21, CFI −21, CFF −1.
3. +₹10 capex variant of the nuke: walk the three statements (hint: no P&L touch in year 1).
4. Compute FCFF and FCFE for ShopKart FY25 from 5.6, and explain in two lines why FCFE > FCFF this year.
5. The working-capital maze: debtors up 8, stock down 6, creditors down 5, prepaid up 1. Net ΔWC cash effect?
6. Direct-road drill: collections 240, supplier payments 170, opex cash 48, interest paid (operating bucket) 5, tax 9 ⇒ CFO. And: what's the indirect equivalent interest treatment called out in our canon (and why is classification a real conversation)?
7. Five-year signature: PAT {10, 12, 14, 18, 22} vs CFO {11, 13, 15, 17, 21}. Quality verdict? Now swap CFO to {8, 9, 7, 6, 4} — one-line red-flag re-issue.

### ✅ Selected answers
1. CFO = 42 + 11 + 6 − (9 + 4 − 1 − 7 − 2) = 59 − 3 = **56**.
2. (a) Healthy engine, sane reinvestment, quiet financing — green badge (b) profits not converting, gap funded by lenders — siren (c) loss but cash-generative (dep-loaded? shrinking WC?) — troubled but liquid; viability question, not liquidity (d) CFO strong but capex eats it all (FCF ≈ 0): growth or treadmill — ask what the ₹21 bought.
3. P&L: nothing (yet). CF: CFI −10, cash −10. BS: block +10, cash −10, still balances — profit untouched, cash lighter. THEN from next year: +dep drags PAT annually (the nuke's echo).
4. From 5.6: FCFF 13.67 · FCFE 13.95. FCFE sits higher because the fresh ₹5L term loan (in CFF) cushioned the debt repay (-3) — borrowings sweetened equity's year; next year's repayments will bill it back. Financing can flatter FCFE; operations can't fool FCFF.
5. −8 + 6 − 5 − 1 = **−8** net drain.
6. CFO = 240 − 170 − 48 − 5 − 9 = **8**. Classification: Ind AS 7 lets non-financial entities treat interest paid as operating OR financing (choice disclosed and consistently applied); our canon parks it in CFF so CFO reads pre-financing — apples-vs-apples with peers is a policy choice.
7. First series: CFO tracks PAT faithfully — high quality of earnings. Swap: profit compounding while cash decays → receivable/stock games or channel-stuffing in progress → forensic audit before any multiple discussion.

## ❓ Quiz
1. ShopKart FY25's CFO is ₹16.95L against PAT ₹13.25L chiefly because:
   - (a) creditors were underpaid
   - (b) the ₹6L depreciation is a non-cash charge added back, and working capital ate only ₹4.6L of it — quality conversion (CFO/PAT ≈ 1.28) is the pulse of earnings you can bank
   - (c) capital was raised
2. Depreciation rises by ₹10 (tax rate 25%). The three-statement walk gives:
   - (a) PAT −10, CFO −10, cash −10
   - (b) PAT −7.5, CFO +2.5, BS balances with block −10 / cash +2.5 / RE −7.5 — depreciation is an inside charge: only the tax shield moves in cash
   - (c) PAT −7.5, CFO −7.5, BS balances
3. Persistent CFO < PAT with ever-growing receivables most strongly suggests:
   - (a) prudent banking
   - (b) toilet-paper profits — earnings that live in warehouses and invoices rather than the drawer; quality-of-earnings red flag number one (AC10's opening casefile)
   - (c) excellent collections

### ✅ Answers
1. **(b)** — (c) would land in CFF, not CFO; and supplier credit rose only 0.9, so the conversion hero is the non-cash add-back, not stretched creditors.
2. **(b)** — the nuke is the standard interview gate because it forces ALL the plumbing at once.
3. **(b)** — the pulse test: CFO/PAT < 1 persistently = paper profits; Satyam veterans nod grimly.

## ✅ Mastery checklist
- [ ] Indirect CFO from any set of teasers in under a minute, taxonomy never flipped
- [ ] Direct vs indirect roads narrated (and Ind AS 7's interest-choice disclosed)
- [ ] The 3-box arithmetic always ties to the photograph's cash line
- [ ] +₹10 depreciation & capex walks delivered with balance proof
- [ ] FCFF/FCFE built from flows without a formula sheet
- [ ] Flow signatures diagnosed (toilet-paper profits, treadmill CFI, borrowed dividends)

**Next:** **AC6 · Revenue, Receivables & Provisions** — the five-step contract machine (Ind AS 115), aging ladders, the ECL provisioning drill (our ₹1.14L), write-loss honesty, and the early-pay mathematics where 2% is actually 37.2% annualized. THE revenue module — handle with care! 🧾
