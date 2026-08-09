# 🎯 AC1 · Double-Entry DNA — The Equation That Runs Civilization
> Every company on Earth runs one law: **Assets = Liabilities + Equity**, and one grammar: **every transaction keeps it true**. Debits and credits are not "plus and minus" — they're the left hand and right hand of a scale that never tilts. We learn the grammar by running ShopKart's first week, transaction by transaction, into journals, T-accounts, and a trial balance that balances to the rupee.

## 🎯 Objectives
- Own the accounting equation and extend it: Assets = Liabilities + Capital + (Revenue − Expenses − Drawings).
- Translate ANY business event into its two (or more) accounts, with debit/credit placed by rule, not instinct.
- Master the **DEAD/CLIC memory engine** and the golden rules (personal, real, nominal).
- Post journals to **T-accounts**, balance them, and extract a **trial balance** that proves arithmetical health.
- Distinguish what a TB *does* prove (arithmetic) from what it can't (omission, principle, compensating errors).

## 📘 Concepts

### 1.1 The equation — a scale, not a formula
A business owns things (assets); every rupee of them is *claimed* — by outsiders (liabilities) or by the owner (equity). Claims always equal possessions, because the same rupee cannot be both owed and unclaimed. Watch ShopKart's first week prove it — **T1: Owner introduces ₹50,00,000 cash.**

```text
T1:  Cash +50,00,000 (asset up)   ⇔   Capital +50,00,000 (equity up)
Scale: Assets 50L  =  Liabilities 0 + Equity 50L   ✓ level
```

From here on, EVERY move must keep the scale level — that constraint *is* double-entry bookkeeping.

### 1.2 Debit and Credit — placement grammar
Two words, universally misunderstood. Forget plus/minus. Instead:

```text
           DEBIT (left)                         CREDIT (right)
   DEAD: Drawings, Expenses, Assets   →   INCREASE on this side
   CLIC: Capital, Liabilities, Incomes, Creditors → increase HERE
   (every account DECREASES on its opposite side)
```

Golden rules behind it (the CA-exam vocabulary):
- **Personal accounts** (people, firms): debit the receiver, credit the giver.
- **Real accounts** (things — cash, van, stock): debit what comes in, credit what goes out.
- **Nominal accounts** (revenues, expenses): debit all expenses/losses, credit all incomes/gains.

DEAD/CLIC is just those three rules compressed for speed. Use whichever sings louder, but be consistent — interviewers probe for the RULE, not the remembered journal entry.

### 1.3 ShopKart week one — nine transactions into the equation
(₹ in lakh for sanity; 1L = 1,00,000)

| # | Transaction | Accounts hit | Equation check |
|---|---|---|---|
| T2 | Bank OD drawn ₹20L cash | Cash +20 / OD +20 | A=70 = L 20 + E 50 ✓ |
| T3 | Buy delivery van ₹15L cash | Van +15 / Cash −15 | A=70 ✓ (asset swap) |
| T4 | Inventory on credit ₹10L | Stock +10 / Creditors +10 | A=80 = 30+50 ✓ |
| T5 | Sell stock costing ₹4L for ₹6L cash | Cash +6 / Stock −4 / Profit +2 | A=82 = 30 + E 52 ✓ |
| T6 | Pay creditors; 2% early discount | Cash −9.8 / Creditors −10 / Discount income +0.2 | A=72.2 = 20 + 52.2 ✓ |
| T7 | Free samples ₹0.5L (expense) | Samples exp +0.5 / Cash −0.5 | A=71.7 = 20 + 51.7 ✓ |
| T8 | Owner draws ₹1L | Drawings +1 / Cash −1 | A=70.7; Equity 50+1.7−1=50.7 ✓ |

Read the table like a hawk: some transactions move numbers *within* assets (T3), some pull liabilities with them (T6), and profit is just equity growing through operations (T5, T6-discount). The scale never once tilts. **That is the entire theory of accounting** — the rest of this course is vocabulary for the moves.

### 1.4 Journals and T-accounts — the paperwork of the equation
Journal entry format (book of original entry) — T5 in full dress:

```text
Sale leg (revenue):   Dr  Cash A/c                  6,00,000
                          Cr  Sales A/c                     6,00,000
COGS leg (matching):  Dr  Cost of Goods Sold A/c    4,00,000
                          Cr  Stock A/c                     4,00,000
(Being goods sold for cash ₹6L; stock relieved at cost ₹4L — one sale, two postings: the earning AND its matching cost)
```

Post these to **T-accounts** (the ledger): Cash's T-account collects T1+50, T2+20, T3−15, T5+6, T6−9.8, T7−0.5, T8−1 ⇒ **balance ₹49.7L**. Every account gets one; the ledger IS the equation exploded into columns. This is bookkeeping's daily work — done today by Tally/Zoho/SAP, but the *idea* hasn't changed since 1494 (Luca Pacioli, the father of double-entry).

### 1.5 The trial balance — arithmetic's certificate
Sum every ledger balance, split by DEAD (debits) and CLIC (credits):

| Account | Dr ₹L | Cr ₹L |
|---|---|---|
| Cash | 49.7 | |
| Stock | 6.0 | |
| Van | 15.0 | |
| Drawings | 1.0 | |
| Capital | | 50.0 |
| Bank OD | | 20.0 |
| Sales / COGS / discount / samples | 4.5 | 6.2 |
| **Total** | **76.2** | **76.2** ✓ |

(COGS 4 + samples 0.5 on the left; sales 6 + discount 0.2 on the right — nominal accounts ride the same TB before closing.) **A balanced TB proves only one thing: arithmetic discipline.** It cannot catch: an entire **omitted transaction**, an entry on the **wrong account** (paid rent to "Rebairs A/c"), an entry with **wrong principle** (van expensed to repairs), or **compensating errors** canceling out. AC2's adjustments + AC10's forensics live exactly in those blind spots.

### 1.6 Why this DNA matters for everything after AC1
- Balance sheets (AC4) are the equation FRAMED as a report.
- Cash flows (AC5) untangle why cash ≠ profit — exactly the T5-vs-T6 gap you just watched.
- "Walk me through a transaction" is a top-5 finance interview staple: candidates recite rules; hired candidates *run the equation out loud*.

## 🧪 LAB — Journal gym (10 min)
Write the journal entry (accounts + Dr/Cr + amount), then track the equation:
1. ShopKart buys a laptop for billing, ₹80,000 cash.
2. Borrows ₹10L more on the OD.
3. Sells stock (cost ₹2L) for ₹3L **on credit** to a supermarket.
4. Supermarket returns ₹20,000 of goods (cost ₹15,000).
5. Pays November salaries ₹4L by bank.

**Why this matters:** 95% of bookkeeping errors in live Tally data are exactly these five patterns miscoded; muscle here is employability.

**🔑 Lab answers:** (1) Dr Laptop (asset) 80,000 / Cr Cash 80,000 — asset swap, equation unmoved (2) Dr Cash 10,00,000 / Cr Bank OD 10,00,000 — A↑ L↑ (3) two entries: Dr Debtors 3,00,000 / Cr Sales 3,00,000; Dr COGS 2,00,000 / Cr Stock 2,00,000 — profit flows to equity via RE (4) Dr Sales Returns 20,000 / Cr Debtors 20,000; Dr Stock 15,000 / Cr COGS 15,000 (5) Dr Salary Expense 4,00,000 / Cr Bank 4,00,000 — equity shrinks through expenses.

## 💪 Exercises
1. Classify each as personal/real/nominal, then state the Dr/Cr rule: (a) Bank OD (b) Salary Payable (c) Discount Received (d) Delivery Van (e) Supermarket (debtor).
2. Owner brings his personal Scorpio (₹12L) as business vehicle. Entry + which golden rule(s) fire?
3. Equation drill: A=₹85L, L=₹37.5L ⇒ E? If the owner then draws ₹2L cash, new E and Cash?
4. T-account marathon: open Cash with T1 (50), T2 (20), buy furniture ₹8L cash, sell old shelf for ₹1L cash, pay rent ₹1.5L. Balance it.
5. TB autopsy: a trainee's TB balances, yet (i) a ₹50,000 cash sale is missing entirely, (ii) rent ₹12,000 was debited to Repairs, (iii) van purchase ₹15L was debited to Vehicle Expenses. Which does the TB *detect*? Classify each blind spot by error type.
6. DEAD/CLIC rapid: state increase-side for — Creditors, Samples Expense, Stock, Capital, Sales Returns, Cash, Drawings, Provision for Doubtful Debts.
7. Extend the equation: year-end profit ₹10.6L and drawings ₹2L, opening capital ₹50L — closing capital if no new capital introduced?

### ✅ Selected answers
1. (a) Personal (bank) — credit the giver: OD increases when bank *gives* ⇒ Cr (b) Personal (representative) ⇒ Cr when it grows (c) Nominal income ⇒ Cr (d) Real ⇒ Dr in, Cr out (e) Personal ⇒ Dr the receiver.
2. Dr Vehicle A/c 12,00,000 / Cr Capital A/c 12,00,000 — real account (vehicle comes IN) + personal (owner *gives* ⇒ credit the giver). Equity grows without cash ✓.
3. E = 85 − 37.5 = ₹47.5L; drawings: E → ₹45.5L, Cash −2L (A → 83L; scale stays level ✓).
4. Cash: 50 + 20 − 8 + 1 − 1.5 = **₹61.5L debit balance**.
5. TB detects **none of the three**: (i) omission error (both sides missing) (ii) error of *commission* — wrong account, same side (iii) error of *principle* — capital item expensed. This trio is why TBs certify arithmetic, not truth.
6. Cr · Dr · Dr · Cr · Dr (contra-revenue) · Dr · Dr · Cr.
7. Closing capital = 50 + 10.6 − 2 = **₹58.6L** — the RE pipeline already previews AC4's articulation.

## ❓ Quiz
1. Owner introduces ₹50,00,000 cash into ShopKart. The equation moves:
   - (a) Cash up, Revenue up
   - (b) Assets up ₹50L (Cash), Equity up ₹50L (Capital) — every transaction keeps Assets = Liabilities + Equity; capital-introduction touches no income account
   - (c) Cash up, Liabilities up
2. ShopKart buys a delivery van for ₹15L cash. In the T-accounts:
   - (a) Expense up, Cash down
   - (b) one asset (Van) debited, another (Cash) credited — an asset SWAP inside the equation; nothing about profit moved, and the TB stays level by construction
   - (c) Asset up, Capital up
3. A trial balance that balances PROVES:
   - (a) the books are fully correct
   - (b) arithmetical discipline only — omissions, wrong accounts, wrong principles and compensating errors all sail through a balanced TB
   - (c) profit is correctly computed

### ✅ Answers
1. **(b)** — equity is the owner's claim; revenue is earned by selling, not by investing.
2. **(b)** — swaps are the quietest legal moves in accounting; and expensing a van (a) would be a principle error AC8 hunts.
3. **(b)** — a TB is a checksum, not an audit. Forensics (AC10) begins exactly where the TB ends.

## ✅ Mastery checklist
- [ ] The equation runs my thought before any account name does
- [ ] DEAD/CLIC and the 3 golden rules both at recall speed
- [ ] I journal, post to T-accounts, and balance without a datasheet
- [ ] Asset-swaps disclose themselves as "equation unmoved" instantly
- [ ] I can state the four TB blind spots by name with one example each
- [ ] ₹ figures check to the rupee (scale level after EVERY transaction)

**Next:** **AC2 · The Accounting Cycle & Accrual Religion** — why ₹15L of "cash out" isn't ₹15L of expense, the four adjustments (accrued, prepaid, depreciation, provision), the trial-balance-to-statement pipeline, and the journal that turns CA office work from magic into method. The religion awaits! 🔄
