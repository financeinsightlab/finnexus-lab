# Py1 · Python Basics for Finance: Your First Line of Code → Your First EMI Calculator

> *Everybody says "learn Python". Almost nobody teaches it FOR FINANCE. Here every single example is money: interest, EMIs, trial balances, variances. By the end you'll have coded a real loan calculator from scratch — with formulas you already understand from E6.*

## 🎯 Objectives
Get Python running TODAY (3 options) · numbers, variables, f-strings with ₹ · lists & dicts (mini trial balance) · if/else (variance logic) · loops (running balances) · code the EMI formula from E6 by hand.

---

## 📘 1.1 Setup — pick ONE, running in 5 minutes

| Option | How | Best for |
|---|---|---|
| **Google Colab** (easiest) | `colab.research.google.com` → New Notebook → type code → Ctrl+Enter. Zero install, runs in browser, free. | This course, quick experiments |
| python.org + IDLE | Download from python.org → install (✅ tick "Add python.exe to PATH") → open IDLE → File → New File | Offline laptop work |
| VS Code + Python extension | code.visualstudio.com + "Python" extension | Serious projects (Py06) |

Test it: type this and run:

```python
print("Namaste, Finance! 🐍")
print(2 + 3)
```

If you see `5`, you're a programmer now. Onward.

## 📘 1.2 Numbers — the finance four operators

```python
revenue = 1_797_854          # underscores make big numbers readable — ₹17,97,854
cogs    = 898_900
profit  = revenue - cogs     # subtraction
margin  = profit / revenue   # / always gives a decimal (float)
half    = 1000 // 3          # // integer division → 333
remainder = 1000 % 3         # % modulo → 1 (day-count, week tricks)
double  = 2 ** 10            # ** power — compounding lives here

print(type(margin))          # <class 'float'>
print(round(margin, 4))      # 0.5
```

⚠️ Two classic traps: `/` returns float even when divisible (`10/2` → `5.0`); floats can't represent every decimal exactly (`0.1+0.2` → `0.30000000000000004`) — Py05 shows the `Decimal` fix for money-critical code.

## 📘 1.3 f-strings — professional ₹ output

```python
name, emi = "HDFC Home Loan", 105_008.8956
print(f"{name}: EMI = ₹{emi:,.2f}")        # HDFC Home Loan: EMI = ₹105,008.90
print(f"Margin = {margin:.1%}")            # Margin = 50.0%
```

`f"..."` drops values straight inside the string; `{x:,.2f}` = thousand separators + 2 decimals; `{x:.1%}` = percentage. This is how your reports stop looking like homework.

## 📘 1.4 Variables & types

```python
account = "Sales Revenue"   # str  (text)
amount  = 1797854           # int  (whole)
rate    = 0.095             # float
is_income = amount > 0      # bool (True/False)

# convert explicitly when needed:
n = int("5000"); p = float("9.5"); s = str(42)
```

## 📘 1.5 Lists — a row of monthly numbers

```python
rev = [1797854, 1823400, 1900112, 1759939]   # Jan–Apr revenue
print(rev[0])       # first item → 1797854 (Python counts from 0!)
print(rev[-1])      # last item  → 1759939
print(rev[1:3])     # slice      → [1823400, 1900112]
rev.append(2015000) # May arrives
print(len(rev), sum(rev), max(rev), min(rev))
print(sum(rev) / len(rev))                   # simple average
```

Loops print a mini report:

```python
for i, r in enumerate(rev, start=1):
    print(f"Month {i}: ₹{r:,.0f}")
```

## 📘 1.6 Dicts — a pocket trial balance

```python
tb = {"Sales Revenue": 1797854, "COGS": 898900, "Rent": 85000, "Other Income": 45200}
print(tb["Rent"])                     # lookup → 85000
tb["Salaries"] = 410000               # add a new account
income_total = tb["Sales Revenue"] + tb["Other Income"]
for account, amt in tb.items():
    print(f"{account:<15} ₹{amt:>12,.0f}")   # aligned columns, like a ledger
```

## 📘 1.7 if / elif / else — the finance brain

```python
actual, budget, acc_type = 92_000, 100_000, "OpEx"
variance = actual - budget

if acc_type in ("Revenue", "Other Income"):
    favourable = variance >= 0
else:
    favourable = variance <= 0        # costs under budget = good (S5/T6 rule!)

print("Favourable ✅" if favourable else "Unfavourable ❌", f"(₹{variance:,.0f})")
```

## 📘 1.8 while loops — running balances

```python
balance, month = 0.0, 0
monthly_cashflow = 25_000
while balance < 500_000:              # save until we hit ₹5L emergency fund
    balance += monthly_cashflow * (1 + 0.06/12)   # earn 6% while saving
    month += 1
print(f"₹5L fund ready in {month} months → balance ₹{balance:,.0f}")
```

## 📘 1.9 The E6 EMI formula — coded by hand

From Excel you know `PMT(rate/12, months, -principal)`. Here's the actual math:

```python
P, annual, years = 5_000_000, 0.095, 5        # HDFC loan L1 (Finance_Loans.csv!)
r, n = annual / 12, years * 12
emi = P * r * (1 + r) ** n / ((1 + r) ** n - 1)
total_paid  = emi * n
print(f"EMI        ₹{emi:,.2f}")
print(f"Total paid ₹{total_paid:,.0f}")
print(f"Interest   ₹{total_paid - P:,.0f}")   # ≈ ₹13L on ₹50L — SEE the cost of debt
```

---

## 🧪 LAB Py1 — First-contact finance scripts (45 min)

1. Run the EMI script; change to loan L2 (₹12,00,000 @ 8.75%, 3 yrs) → EMI + total interest.
2. All 5 loans: make a dict `loans` of LoanID → (principal, rate, years) tuples or nested dicts; loop and print each EMI in one aligned table. *Hint: paste the EMI formula INSIDE the loop.*
3. Compound vs simple: principal ₹1,00,000 @ 12% for 5 years — print both (`P*r*t` vs `P*(1+r)**t`) and the difference.
4. Mini TB: dict with Revenue 17,97,854 / Other Income 45,200 / COGS 8,98,900 / OpEx 4,95,000 → loop with sign rules (income +, costs −) → print Net Profit.
5. Savings `while` loop: how many months to save ₹10L at ₹20,000/month growing 0.5% monthly (SIP-ish)?

## 💪 Exercises
1. GST calculator: amount → add 18% GST, print base, GST, total separately.
2. TDS check: if monthly salary > ₹50,000 print "TDS applicable" else "Below threshold" (conceptual).
3. `round(2.675, 2)` gives 2.67 — print it, explain in one sentence (float representation), then note the E6/Py05 `Decimal` cure is coming.
4. Slice: given 24 monthly revenues, print Q1, last 6 months, every alternate month.
5. Dict merge: combine Jan dict and Feb dict of expenses into one with `.update()` — what happens to duplicate keys?

### ✅ Selected answers
- Ex 3: floats are binary — 2.675 can't be stored exactly, so rounding shows the stored approximation. Money-critical work uses `Decimal("2.675")` (Py05).
- Ex 4: `rev[0:3]`, `rev[-6:]`, `rev[::2]` (start:stop:step).

## ❓ Quiz
1. What do `/` and `**` return/do?
2. Why `f"₹{emi:,.2f}"` instead of plain `print(emi)`?
3. dict vs list for a trial balance — why does the dict win?
4. In a `while` loop, what must you never forget when the condition involves a balance?

### ✅ Answers
1. `/` always returns a float; `**` is exponentiation — the heart of compounding.
2. Human-grade output: thousand separators + exactly 2 decimals — reports, not debug noise.
3. Accounts are looked up BY NAME (`tb["Rent"]`), no index memorizing; duplicate-name safety and natural code.
4. Update the loop variable INSIDE the loop (`balance += …`) — otherwise an infinite loop spins forever.

## ✅ Mastery checklist
- [ ] Python running (Colab or local) — first script executed
- [ ] EMI formula hand-coded and verified against all 5 bank loans
- [ ] lists/dicts/if/while used in a finance mini-report
- [ ] Can explain floats vs ints and the ₹ f-string patterns

**Next: Py2 — functions, dates, files: turn scripts into reusable tools and build a full amortization schedule. 🧰**
