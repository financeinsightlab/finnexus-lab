# 🎯 AC2 · The Accounting Cycle & Accrual Religion
> Cash is a fact; profit is a *measurement*. The accrual system — record income when EARNED, expenses when CONSUMED, regardless of when cash knocks — is the single biggest idea separating a shop diary from financial statements the world can trust. We run the full cycle: transactions → journals → ledger → adjustments → adjusted TB → statements → closing entries → next year.

## 🎯 Objectives
- Contrast **cash vs accrual** accounting with the matching principle as the referee (and know India's rulebook: Companies Act mandates accrual; tax law dances its own dance).
- Execute the four canonical **adjustments**: accrued expenses, prepaid expenses, accrued income, income received in advance — plus depreciation and creating provisions.
- Run the full cycle in order and identify which stage each document belongs to.
- Prepare **closing entries**: sweep nominal accounts to P&L, carry real & personal balances forward.
- Read a **suspense account** for what it is — a confession that the books were broken.

## 📘 Concepts

### 2.1 The matching principle — accrual's beating heart
ShopKart pays December's *and* January's rent (₹3L) on 25th December. Cash view: December expense ₹3L. Accrual view: ₹1.5L December expense + ₹1.5L **prepaid asset** consumed in January. The matching principle demands expenses sit in the *period they helped create revenue* — not the period cash walked. Its twins:

| Situation | Adjusting treatment | Effect |
|---|---|---|
| Expense incurred, not yet paid (salary ₹2L unpaid) | Dr Salary 2L / Cr **Accrued Liability** 2L | expense now, cash later |
| Paid ahead of use (rent ₹1.5L prepaid) | Dr **Prepaid Asset** 1.5L / Cr Rent Exp 1.5L | expense deferred |
| Income earned, not yet received (interest ₹0.3L due) | Dr **Accrued Income** 0.3L / Cr Interest Income 0.3L | income now, cash later |
| Received before earning (₹2L advance from customer) | Dr Cash 2L / Cr **Advance from Customers (liability)** 2L | income deferred |

Four families, one reflex: **follow the value, not the cash.** GST complicates the payment trail but not the principle — GST is a liability-throughput (input/output), never P&L for a registered trader.

### 2.2 The eight-stage cycle — where documents live
```text
1 Transactions → 2 Journal (book of original entry) → 3 Ledger posting
→ 4 UNADJUSTED Trial Balance → 5 ADJUSTING entries (2.1's families + depreciation)
→ 6 ADJUSTED Trial Balance → 7 Financial Statements (P&L + BS) → 8 Closing entries
```
Interview classic: "Adjustments happen BEFORE statements but AFTER the first TB" — and each adjustment is a **paired** entry (one balance-sheet leg + one P&L leg, always; never two of the same side of the house).

### 2.3 ShopKart FY25 — one adjustment battery, end to end
Unadjusted highlights (₹L): Cash 12, Stock 40, Expenses paid: salaries 22, rent 16.5, marketing 6; Van 15 (bought 1 Apr), Revenue 280, COGS 198.8. Adjustments at year-end:

```text
A1 Salaries for March unpaid ₹2L:             Dr Salaries 2 / Cr Salary Payable 2
A2 Rent for April paid in March ₹1.5L:        Dr Prepaid Rent 1.5 / Cr Rent 1.5
A3 Depreciation on van (SLM, 8-yr life,
   ₹1L salvage): (15−1)/8 = ₹1.75L:           Dr Depreciation 1.75 / Cr Accum. Dep. 1.75
A4 Interest accrued on OD ₹0.3L:              Dr Interest Exp 0.3 / Cr Interest Payable 0.3
```

Impact map: salaries 22→24, rent 16.5→15, depreciation appears 1.75, interest expense +0.3; balance sheet inherits Salary Payable 2, Prepaid Rent 1.5, Accumulated Depreciation 1.75, Interest Payable 0.3. **Every adjustment touches one P&L account and one balance-sheet account** — verification trick and interview answer in one.

### 2.4 Depreciation as an adjustment — matching in its purest form
The van's ₹15L wasn't "spent this year" in value terms; it will serve 8 years. Depreciation allocates the **consumption** (1.75/yr) — nothing about cash moved this March. Accumulating it in a **contra-asset** (Accumulated Depreciation) preserves the asset's cost history while netting the book value (15 − 1.75 = ₹13.25L block). AC8 goes full-depth; today you only need: dep = match-the-machine-to-the-years.

### 2.5 Closing the books — sweep and carry
Nominal accounts (revenues, expenses) die into the P&L; real & personal balances (assets, liabilities, capital) live on:

```text
Sales 280 / Sundry incomes 2.2  → cr P&L 282.2
P&L's expense side: COGS 198.8 + Salaries 24 + Rent 15 + Marketing 6 + Admin 4.2
  + Utilities 3 + Dep 1.75 + Interest 2.3 = 255.05  →  Profit = 27.15? —
Wait — align with AC3's canonical ladder (EBITDA 26, D&A 6, EBIT 20): in AC3 the
D&A figure is a fuller ₹6L across ALL assets (warehouse fit-outs + vans + IT), so the
P&L charge here uses the AC3 canon ₹6L, not just this van's 1.75. Consistency rule:
example batteries scale down for teaching; AC3 states the signed canon.
```

(That comparison—*teaching micro-battery vs full canon*—is exactly how auditors' "expectation vs books" difference analytics work; hold the thought, AC10 will use it.) Post-closing: expense/revenue accounts stand at zero, the P&L balance rides into Reserves within equity, and April 1 opens with a clean nominal slate.

### 2.6 The suspense account — a confession booth
When debits ≠ credits mid-cycle, books are *forced* to balance by parking the difference in a **Suspense A/c** while the error is hunted. Seeing a suspense balance in a trial balance = the ledger telling you it's bleeding (one-sided postings, cast errors). Fix the root, kill the suspense — never let it age into the statements. Interview answer: "Suspense is where arithmetic goes to wait for its lawyer."

## 🧪 LAB — Adjustment ward (10 min)
State the adjusting entry (accounts, Dr/Cr, amount) for 31 March:
1. Warehouse workers' March wages ₹1.2L unpaid.
2. Insurance premium ₹1.8L paid in October covering 12 months from 1 Oct.
3. Interest earned on a fixed deposit ₹45,000, bank credits it 3 April.
4. A supermarket paid ₹3L advance in March for April supplies.
5. Old computer (cost ₹2.4L, 3-yr SLM, NIL salvage) — full-year charge?

**Why this matters:** these five ARE the year-end journal run of every Indian SME's accountant on 31 March. Speed here is literally a payslip skill.

**🔑 Lab answers:** (1) Dr Wages 1.2 / Cr Wages Payable 1.2 (2) 6 months consumed (Oct–Mar) = 0.9; Dr Prepaid Insurance 0.9 / Cr Insurance Expense 0.9 (3) Dr Accrued Interest 0.45 / Cr Interest Income 0.45 (₹45,000 = 0.45L ✓) (4) Dr Cash 3 / Cr Advance from Customers 3 — income waits for delivery (5) dep = 2.4/3 = 0.8/yr → Dr Depreciation 0.8 / Cr Accumulated Depreciation 0.8.

## 💪 Exercises
1. Classify cash-vs-accrual: (a) Dec sales on 45-day credit (b) insurance premium covering next FY (c) salary for last week of March paid 2 April — which P&L year (FY25 or FY26) does each hit, under accrual?
2. Adjustment design: ShopKart's delivery rider fuel card runs ₹0.9L/month, March bill arrives 5 April. Entry at 31/3?
3. Prepaid unwind: ₹1.5L April rent paid in March (A2). Write APRIL's reversing/consumption entry.
4. Cycle-order drill: arrange — posting to ledger, adjustments, unadjusted TB, journals, closing entries, statements, transactions, adjusted TB.
5. Suspense scenario: TB shows Dr 77.4 vs Cr 76.9. What must exist? Where, and what are the two most common causes?
6. Principle probe: customer advance is a liability — defend this to a skeptical shopkeeper who claims "advance is my income, money's already in my drawer."
7. Adjusted-TB numbers check: from the AC2 battery, compute the SWAP snippet — final balances for Salaries, Rent, Prepaid Rent, Salary Payable, and state which side each sits on.

### ✅ Selected answers
1. (a) FY25 revenue (earned in Dec; receipt timing irrelevant) (b) FY25 only the *consumed* slice, rest is FY26's — via Prepaid (c) FY25 expense, since March effort created it: Dr Salary / Cr Salary Payable at 31/3.
2. Dr Fuel Expense 0.9 / Cr Fuel Card Payable 0.9 — the liability exists at year-end even if the invoice is shy.
3. Dr Rent Expense 1.5 / Cr Prepaid Rent 1.5 (asset → expense handover as the month is consumed).
4. Transactions → Journals → Ledger → Unadjusted TB → Adjustments → Adjusted TB → Statements → Closing entries.
5. A ₹0.5L **Suspense A/c on the credit side** exists to force balance; common causes: one-sided posting and casting (addition) errors in ledger balances. It must be zeroed before statements — suspense has no statement face.
6. Delivery/`performance` is the trigger of income: until goods ship, ShopKart OWES either goods or the money back — an obligation, not revenue. (This is Ind AS 115's contract-liability core wearing a lungi — AC6 formalizes.)
7. Salaries (Dr) 24 · Rent (Dr) 15 · Prepaid Rent (Dr asset) 1.5 · Salary Payable (Cr liability) 2 — each one P&L leg + one BS leg, exactly as the religion demands.

## ❓ Quiz
1. ShopKart pays ₹3L on 25 December covering December and January rent. Accrual accounting records December expense of:
   - (a) ₹3,00,000
   - (b) ₹1,50,000 — expense follows consumption; the other ₹1.5L sits as a Prepaid ASSET until January burns it (matching principle)
   - (c) zero, cash year differs
2. Every adjusting entry touches:
   - (a) two balance-sheet accounts
   - (b) one P&L account and one balance-sheet account — the religion's fingerprint; rent-prepaid defers expense into an asset, accrued salary creates expense with a liability
   - (c) two nominal accounts
3. A Suspense A/c appearing in a trial balance means:
   - (a) the books are certified healthy
   - (b) debits ≠ credits somewhere and the difference was force-parked — fix the root error and zero it; suspense must never reach the statements
   - (c) a new equity reserve

### ✅ Answers
1. **(b)** — cash timing is trivia; consumption is scripture. Option (a) is the cash-bias shopkeeper reflex.
2. **(b)** — one leg measures, the other holds. Two-BS-legs or two-P&L-legs adjustments are category errors.
3. **(b)** — suspense is an IOU *from the ledger to arithmetic*; honorable books repay it before anyone reads the statements.

## ✅ Mastery checklist
- [ ] Cash vs accrual argued from the matching principle, not from memory
- [ ] All four adjustment families journaled cold, with the one-P&L + one-BS fingerprint
- [ ] Depreciation explained as matching (allocation), not as valuation
- [ ] The 8-stage cycle recited in order — I know which documents live where
- [ ] Closing entries: nominals swept to P&L; reals/personals carried forward
- [ ] Suspense accounts make me suspicious, instantly

**Next:** **AC3 · Income Statement Engineering** — the revenue→PAT ladder in full armour: gross margin forensics, EBITDA and why bankers worship it, EBIT vs PBT vs PAT, and EPS. ShopKart's ₹280L year gets its official P&L! 📈
