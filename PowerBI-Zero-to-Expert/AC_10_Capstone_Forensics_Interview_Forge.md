# 🎯 AC10 · CAPSTONE — Books-to-Board & Forensics (Interview Forge)
> Nine modules of vocabulary meet their job test. Phase 1: post ShopKart's January to a trial balance with your own hands. Phase 2: assemble the three FY25 statements from the canon — every number interlocked. Phase 3: forensics — the QoE casefile where honest-looking statements harbor quiet crimes. Phase 4: the interview forge — rapid-fire until the plumbing speaks before you do.

## 🎯 Objectives
- Close a mini-cycle end-to-end: JEs → ledger → TB — with the one-P&L-leg-one-BS-leg fingerprint intact.
- Re-derive ShopKart FY25's P&L + BS + CFS from canon numbers and defend every articulation joint.
- Apply the **QoE red-flag radar**: closing-stock games, capitalized opex, ECL cookie jars, receivable bloat, related-party round-trips, extended-terms "sales push".
- Survive the classic interview rapid-fire: 3-statement walks, negative equity, EBITDA vs CFO, provision vs reserve, "is depreciation a source of funds?"

## 📘 Concepts (the four phases)

### Phase 1 · January mini-cycle — the 10-JE sprint (₹'000)
Post to cash books, then the trial balance. Race the answer key at the bottom of this section.

```text
J1 Owner adds capital 500 cash → Dr Cash / Cr Capital
J2 Buy stock on credit 300 → Dr Stock / Cr Creditors
J3 Sell stock costing 180 for 260 cash → Dr Cash / Cr Sales 260 · Dr COGS 180 / Cr Stock 180
J4 Pay January rent 15 → Dr Rent / Cr Cash
J5 Buy POS terminal 60 cash (capitalize) → Dr Fixed Asset / Cr Cash
J6 Early-pay discount: settle creditor 100 for 98 → Dr Creditors 100 / Cr Cash 98 / Cr Discount Income 2
J7 Salary paid 30 → Dr Salaries / Cr Cash
J8 Customer advance for Feb supplies 40 → Dr Cash / Cr Advance from Customers (liability)
J9 Dep on the terminal, 1 month (3-yr SLM, NIL salvage: 60/36 = 1.67) → Dr Dep / Cr Accum Dep
J10 Provision for disputed refund, probable 8 → Dr P&L (Legal/Provision exp) / Cr Provision
```

**Trial Balance — the junior's first draft (₹'000):** this draft is *deliberately flawed in two places*. Audit it with the three-step control below before reading the verdict — finding both cracks is the exercise.

| Account | Dr | Cr |
|---|---|---|
| Cash | 637 | |
| Stock (300−180) | 120 | |
| Fixed asset | 60 | |
| Accum. depreciation | | 1.67 |
| Capital | | 500 |
| Creditors (300−100) | | 200 |
| Advance from customers | | 40 |
| Provision (liability) | | 8 |
| Sales / Discount income | | 262 |
| COGS | 180 | |
| Provision expense (from J10) | 8 | |
| Rent / Salaries | 45 | |
| Depreciation expense | 1.67 | |
| **Total** | **1,043.67** | **1,043.67** ✓ (junior typed the same number twice — always add the columns yourself) |

**The audit, in three controlled steps:**
1. **Column-add control (never trust typed totals):** add the *printed* Dr column yourself: 637+120+60+180+8+45+1.67 = **1,051.67**. The Cr column: 1.67+500+200+40+8+262 = **1,011.67**. The draft's "equal" totals of 1,043.67 were typed, not earned — first red flag caught by nothing fancier than addition.
2. **Line-reconciliation control (the cash trap):** recompute cash from its own lines only: J1 +500, J3 +260, J4 −15, J5 −60, J6 −98, J7 −30, J8 +40 ⇒ **597**, not the draft's 637. The junior counted **J8's customer advance twice** — the classic settlement-day mispost (40 phantom).
3. **Balance the truth:** corrected Dr = 1,051.67 − 40 = **1,011.67** = Cr ✓ — and *now* the balance is earned, not typed.

**Red-pen verdict:** sprint cash = **₹597 ('000)**; the draft overstated it by the double-counted advance; and the typed matching totals masked it until somebody added the columns. Two independent catches — arithmetic addition and line-level reconciliation — are why month-end closers reconcile bank statements *before* boards eat. Scale this sprint ×1,000 and you have the daily life of an accounting manager.

> 🧠 **Memorable corollary:** with the cash corrected to 597 and the columns honestly totalled, the sprint lands Dr (597+120+60+180+8+45+1.67) = Cr (1.67+500+200+40+8+262) = **1,011.67 = 1,011.67** ✓. Balance is the floor of honesty, never the ceiling — AC1.5's four blind spots return wearing grown-up clothes.

### Phase 2 · The ShopKart FY25 interlock — canon, re-derived
- **P&L:** Revenue 280 → COGS 198.8 → GP 81.2 → opex 55.2 → EBITDA 26.0 → D&A 6 → EBIT 20 → interest 2.3 → PBT 17.7 → tax 4.45 → **PAT 13.25**.
- **Articulation:** RE: 2.8 + 13.25 − 2.65 dividend = **13.4** closing ✓. Equity: 50 + 13.4 = **63.4**.
- **BS:** Net block 21.5 · Stock 44.2 · Debtors 31.5 · Prepaid 1.5 · Cash 12.0 = 110.7 ⇔ OD 15, loan 4, creditors 26, payables 2.3, equity 63.4 ✓.
- **CFS:** CFO 16.95 (EBITDA 26 − ΔWC 4.6 − tax 4.45) · CFI −5 · CFF −2.95 ⇒ **+9 = 3 → 12** ✓.
- **Interlock questions any examiner asks:** (i) where did PAT thicken the photo? RE + prepaid/stock/debtor bloats it funded (ii) why is CFO > PAT? dep +6 added back while WC ate only 4.6 (iii) what did the new term loan pay for? the van (CFI −5); (iv) why did cash rise by MORE than PAT? CFO conversion + financing — trace (16.95, −5, −2.95) aloud.

### Phase 3 · The QoE casefile — six red flags, each with a ShopKart-flavored autopsy
1. **Closing-stock inflation:** FY25 audit-corner — system says 44.2, count says 43.1 ⇒ part is shrinkage truth, but a 44.2 kept with *no count* inflates PBT by the same amount. Rule: no profit talk before count report.
2. **Capitalized opex:** marketing campaigns booked as "brand assets." Probe: future-benefit evidence? A ₹30L campaign capitalized shifts EBITDA +30 — the classic EBITDA-anesthesia.
3. **ECL cookie jar:** provision jumping to 3% of receivables in a rich year, then released to soften a bad one — provisions must follow AGING, not mood. (Our canon: 1.4% → smooth.)
4. **Receivable bloat vs revenue:** Vendor X: receivable days 27 → 41 on revenue +8% — either terms silently stretched or channel stuffed. The one question: "Show me top-20 debtors' aging vs last year."
5. **Related-party round-trips:** sales to a sister concern at above-market pricing, settled by year-end reversals. The notes page nobody reads is the page that never lies.
6. **Extended-terms sales push:** revenue "growth" bought by 90-day terms — hits CFO/PAT (plunges below 1) before any analyst meeting admits it.
*Cross-verification toolkit:* count stock, age debtors, match related parties, tie CFO/PAT across 5 years, and read accounting-policy changes with the face of a skeptic.

### Phase 4 · The interview forge — rapid-fire answers (train until bored)
- **"If depreciation goes up ₹10…"** — PBT −10, tax −2.5, PAT −7.5; CFO +2.5 (tax shield cash); BS: block −10, cash +2.5, RE −7.5. Balances. ✓ (AC5.5)
- **"Can equity be negative?"** — yes: accumulated losses/writedowns eat capital+reserves; net worth < 0 ⇒ technical insolvency for lending; recovery roads: profit rebuild, capital infusion, restructuring.
- **"EBITDA vs CFO?"** — EBITDA measures operating *earning power* before structure/tax/D&A; CFO is what's left after working-capital hunger and tax; the WC gap is exactly where profits die of thirst. Quote our ₹26 vs ₹16.95.
- **"Provision vs reserve?"** — charge against profits, present-probable-measurable, above the PAT line vs appropriation of profits, below it. One sentence each, example attached.
- **"Is depreciation a source of funds?"** — allocations preserve, earnings+borrowings source; only the tax shield touches cash (AC8.5).
- **"Why does a balanced TB not prove honesty?"** — four blind spots: omission, commission, principle, compensating (AC1.5).

### The Capstone Deliverable — the ShopKart Board Pack (one page)
Boards read four blocks; assemble yours:
1. **P&L rung-ratios:** GM 29% (−2pp YoY: procurement or promo — decide which meeting), EBITDA 9.29%, NPM 4.73%. 
2. **BS health line:** WC ₹45.9L · CR 2.06 · D/E 0.30 · coverage 8.7× — "liquid, unlevered, bankable" in the chairlift pitch.
3. **Cash quality:** CFO/PAT 1.28 ✓, FCF ₹13.67L — dividend ₹2.65L is 19% of FCFE; dividend policy defensible without financing gymnastics.
4. **Watch list (the honest block):** receivable days 41 (watch Q1), stock days 81 (roll GMROI study), shrinkage 0.55% (healthy).

## 🧪 LAB — The forge fire (10 min)
1. 30-sec articulation: open RE 0.5, PAT 4.0, dividend 1.0 → closing RE?
2. Quality pulse: PAT 22, CFO 12. One-line worry?
3. Mini-TB: cash 40, stock 15, creditors 20, capital 35 — does it close by construction? (trick!)
4. Forensics: a ₹2L "software upgrade" capex with zero capacity delta — name it.
5. Rapid-fire: "EBITDA ₹30L, WC grew ₹12L, tax ₹3L — CFO?" + "and which banker is happier than the shareholder here?"

**Why this matters:** under ten minutes, the exact five warm-ups an IB interviewer uses to calibrate you — forge here, sleep later.

**🔑 Lab answers:** (1) 0.5 + 4.0 − 1.0 = **3.5** (2) "conversion failing (0.55): receivables or stock are eating the earnings — show me aging before multiples" (3) debits 55 ≠ credits 55 — it DOES close ✓ BUT proves only arithmetic: one omitted sale still leaves it closed (the classic trap: balance ≠ completeness) (4) **capitalized opex** — likely margin-anesthesia; demand future-benefit proof (5) CFO = 30 − 12 − 3 = **₹15L**; the BANKER is happier — interest is sized off EBITDA (coverage 8.7× at ShopKart) and is paid early in the waterfall, while the ₹12L working-capital hunger eats the shareholder's residual first; cash, not rungs, is what services debt.

## 💪 Exercises
1. Sprint variant: recompute Phase 1's TB if J6's settlement had been at FULL value (no discount). Which three lines change, and by how much?
2. Reconstruction: PAT 9, dep 3, WC drain 4, tax 0, capex 5, OD inflow 2, dividend 1 → Δcash, closing cash if opening 2.
3. QoE checklist — write your own five questions you'd ask before trusting ANY retailer's P&L, one per flag-family in Phase 3.
4. The forensic two-column: (a) receivable days 27→41 with revenue +8%; (b) receivable days 27→30 with revenue +30%. Verdict each with one sentence.
5. Negative-equity rescue plan: loss-ridden firm, net worth −₹10L; frame three recovery roads in one line each with their honest price.
6. Mock-interview transcription drill: record yourself answering 3 forge questions aloud in ≤ 20 seconds each; self-mark: was every number right the first time?
7. Board-pack dry run: write the "honest block" (watch list) for FruitCart Co given: CFO/PAT 0.4, debtor days 60→95, stock flat, coverage 3.1×.

### ✅ Selected answers
1. Settling at full 100 instead of discounted 98: Cash = 597 − 2 = **595**; Discount income 2 → 0 (Cr side −2); Creditors line unchanged (a 100-claim settled either way); both columns drop by 2 ⇒ TB balances at **1,009.67 = 1,009.67** ✓.
2. Δcash = (9 + 3 − 4) + (−5) + 2 − 1 = **+4** ⇒ closing **₹6L** — CFO 8 − CFI 5 + CFF +1 ✓ woven.
3. Samples: "Physical count vs books this quarter?" · "Provision > aging-delta or mood-delta?" · "Top-20 debtors' aging vs FY24?" · "Related-party sales at market? Reversals after year-end?" · "CFO/PAT 5-year ribbon?" — the five questions ARE the radar.
4. (a) red flag: receivables racing ahead on tired horses ⇒ terms stretched or channel stuffed (b) green: volume legitimately outpacing the 3-day drift — growth that converts gets applause.
5. (i) Profit rebuild: slow, cleanest, needs operational truth-telling first (ii) Capital infusion: fresh equity dilutes, but cash cures (iii) Scheme/restructure: legal eraser against capital — honest as disclosure only, signals to markets loudly.
6. Self-mark: timing tolerable only when numbers stay exact; any "approximately" in the dep-walk = redo; the forge rejects approximations.
7. "Cash conversion collapsing (0.4) with debtor days leaping 60→95 on flat stock — the sales growth story is being financed by aging credit; BEFORE any expansion narrative: explain the aging, fix collections (SOP + credit limits), and present a 90-day cash bridge — otherwise the coverage 3.1× will slip through the covenant into default-conversation territory by year-end."

## ❓ Quiz
1. Phase 1's sprint taught, at the cash-level check, that:
   - (a) a balanced TB proves the books complete
   - (b) the customer advance (₹40) was double-counted into cash — cash lines reconcile independently first (597, not 637); TB "balance" can coexist with mis-postings; arithmetic checks certify columns, not completeness
   - (c) discounts don't affect cash
2. ShopKart FY25's FY-pack shows CFO/PAT of 1.28 with FCF ₹13.67L. The board's honest read:
   - (a) profits are paper
   - (b) earnings convert to cash at a healthy rate — non-cash dep added back while WC hunger stayed modest — and the ₹2.65L dividend is a fraction of FCF; growth headroom intact, no financing gymnastics
   - (c) unrelated numbers
3. The single question that most reliably separates quality earnings from costume jewelry:
   - (a) "How big is marketing spend?"
   - (b) "Show me CFO versus PAT across five years, with the receivable and stock deltas" — conversion reveals what rungs dress up; the deltas name exactly WHERE the costume sits
   - (c) "Who is the auditor?"

### ✅ Answers
1. **(b)** — double-entry balances by construction; fraud and fumbles both dress inside that clause. Bank reconciliation is respect.
2. **(b)** — quality = cash-confirming profits. When conversion dips below 1 for LONG, the flags start flying, not before.
3. **(b)** — every other flag eventually confesses in conversion; five years leaves no costume unworn.

## ✅ Mastery checklist
- [ ] Mini-cycle posted from JEs to TB with cash-line reconciliation proof
- [ ] FY25 interlock narrated: PAT → RE → BS → CFS without referring back
- [ ] The six QoE flags named, with the one question that hunts each
- [ ] Six rapid-fires answered in ≤ 20 seconds, numbers first
- [ ] Board Pack's four blocks (ratios, health, cash quality, honest watch) drafted solo
- [ ] Balance-never-equals-honesty as a reflex — I reconcile before I believe

🏆 **COURSE COMPLETE — ACCOUNTING!** From the sacred equation through the cycle, the three statements, revenue honesty, stock, machines, claims — to a board pack that survives skeptical rooms. You now speak the language every finance course ahead will be written in: **the statements themselves.**

**Next:** **🏦 Corporate Finance** — the CFO's decision engine: capital structure, cost of capital, leverage amplifiers, WACC's bluff-checks, dividend doctrine, and valuation's front door. The statements you just built become the decisions they'll power! 🚀
