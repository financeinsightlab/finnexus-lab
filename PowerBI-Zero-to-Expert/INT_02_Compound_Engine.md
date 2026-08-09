# 🎯 INT2 · The Compound Engine
> The interest starts earning interest — and the straight line bends into a curve. **A = P(1 + r/100)ⁿ**, the 1.1-ladder, and the jewel formula **CI − SI = P(r/100)²** that prices interest-on-interest in one move. Plus the backward autopsy: recovering the principal from a whisper of a difference.

## 🎯 Objectives
- Drive **A = P(1 + r/100)ⁿ** fluently for annual compounding, with clean ladder arithmetic.
- Explain **re-basing** — why year 2's interest beats year 1's even at the same rate.
- Compute the CI−SI gap in one move with the **jewel formula** P(r/100)² (2 years) and its 3-year extension.
- Run the **backward autopsy**: principal from gap, principal from CI, rate from behavior.
- Keep the Amount-vs-Interest **alias** straight — CI questions answer with interest, not P + I.

## 📘 Concepts

### 2.1 Re-basing — the engine with a memory
Same ShopKart deposit as INT1, same ₹1,00,000 @ 10% — but this bank compounds annually. Watch the base re-set every year:

| Year | Base on Jan 1 | Interest @10% | Balance on Dec 31 | SI would have paid |
|---|---|---|---|---|
| 1 | 1,00,000 | 10,000 | 1,10,000 | 10,000 |
| 2 | 1,10,000 | **11,000** | 1,21,000 | 10,000 |
| 3 | 1,21,000 | **12,100** | **1,33,100** | 10,000 |
| 4 | 1,33,100 | 13,310 | 1,46,410 | 10,000 |
| 5 | 1,46,410 | 14,641 | **1,61,051** ← NS6 canon | 10,000 |

Year 2's interest is **bigger** than year 1's — same rate, bigger base. That is the entire engine and the fastest identification tell in the wild. After 5 years the curve owns ₹11,051 that the flat engine never paid.

### 2.2 The one-line engine and the 1.1-ladder
```text
A = P(1 + r/100)ⁿ
```
At 10%, each year multiplies the pile by **1.1** — the famous 1.1-ladder: ×1.1, ×1.21, ×1.331, ×1.4641, ×1.61051. Three practical habits:

- **Multiply the ladder, don't re-derive it**: powers of 1.1 memorize like a song (1.21, 1.331, 1.4641, 1.61051 — pattern in the digits).
- **CI = A − P** always. The question "find the compound interest" ends in subtraction — ₹1,33,100 is the *amount*; the interest is ₹33,100. (Trap 4 feeds on this alias.)
- **Match n to compounding years** here; INT3 handles split frequencies.

### 2.3 The jewel formula — pricing interest-on-interest
For 2 years, where does CI beat SI? Expand:

```text
A_CI = P(1 + r/100)² = P + 2Pr/100 + P(r/100)²
A_SI = P + 2Pr/100  →  CI − SI = P(r/100)²
```

The gap is **exactly the interest on year-1's interest**. Canonical strikes:

- ₹2,000 @ 10%, 2 y: jewel = 2,000 × (0.1)² = **₹20**. (SI = 400, CI = 420.)
- ₹8,000 @ 5%, 2 y: jewel = 8,000 × (0.05)² = **₹20**. (SI = 800, **CI = 820**, Amount = **₹8,820** — hold this trio; the Arena ambushes the alias.)
- ₹41,000? no need — pattern: square the rate-decimal, multiply by P.

**3-year extension:** CI − SI = P(r/100)² × (3 + r/100). Check ₹2,000 @ 10%, 3 y: 2,000 × 0.01 × 3.1 = **₹62** = 662 − 600 ✓. The (3 + r/100) factor is the "small serving on the small serving."

### 2.4 The backward autopsy — whisper the gap, recover the pile
The jewel formula runs in reverse, which makes it a detective:

- **CI − SI = ₹1,600, 2 y, 10% → P:** 1,600 = P × 0.01 → **P = ₹1,60,000**. (Arena Q7 salutes this.)
- **CI = ₹820, 2 y, 5% → P:** try jewel+siblings — SI₂ = CI − jewel = 820 − P(0.0025); round-trip: if P = 8,000, SI = 800, jewel = 20 ✓ → **P = ₹8,000**, Amount ₹8,820.
- **Rate from behavior:** cumulative interest after 2 y is 4,200 on ₹20,000 with year-1 = 2,000 → year-2 interest 2,200 > 2,000 ⇒ compounding at 2,000/20,000 = 10% (the extra 200 = 10% of 2,000 — jewel logic with naked eye).

### 2.5 Amount vs Interest — the alias armor
Exam-setters and banks both quote the **amount** when your intuition wants the **interest** (and vice versa). Armor: underline the *noun* before computing — "interest" ⇒ end with A − P; "amount"/"sum becomes" ⇒ report A. Our trio from 2.3 shows the wound: P = 8,000, CI = 820, Amount = 8,820 — three numbers, one letter apart, each a different answer sheet.

### 2.6 Why CI is civilization's motor
Every FD, PPF, EPF, mutual-fund CAGR, loan amortization and inflation number in your life is this engine wearing a costume. Learn the ladder and you can audit any of them — INT6 does exactly that with real ShopKart cash.

## 🧪 LAB — Multiplication shift (10 min)
1. ₹50,000 @ 10% CI, 2 y → amount and CI?
2. ₹40,000 @ 10% CI, 2 y → jewel gap vs SI, in one move?
3. CI − SI = ₹400 on 2 y @ 10% → P?
4. CI = ₹1,230, 2 y @ 5% — find P. (Hint: SI and jewel must sum to 1,230; P(0.1 + 0.0025) = CI.)
5. ₹1,00,000 @ 10% CI, 5 y — ladder the amount and name the NS6 canon.

**Why this matters:** items 3–4 are the autopsy moves — 90% of "hard" CI exam questions are the jewel formula wearing a wig.

**🔑 Lab answers:** (1) 50,000 × 1.21 = **₹60,500**; CI = **₹10,500** (2) 40,000 × 0.01 = **₹400** (3) P = 400/0.01 = **₹40,000** (4) P × 0.1025 = 1,230 → P = **₹12,000** (check: SI 1,200 + jewel 30 ✓) (5) ×1.61051 → **₹1,61,051** — the delivery-van FD benchmark.

## 💪 Exercises
1. ₹75,000 @ 10% CI, 2 y — amount, CI, and the jewel gap (three numbers).
2. ₹82,000 @ 10%, 2 y: jewel? (Scale the ₹2,000 case and explain the scaling law.)
3. 3-year gap: ₹5,000 @ 10%, CI − SI = ?
4. Autopsy: CI − SI = ₹250 @ 10% for 2 y. Principal?
5. Autopsy II: CI = ₹4,100 @ 10%, 2 y. Principal and amount?
6. Engine ID: yearly interest row reads 6,000 / 6,600 / 7,260 on a ₹60,000 deposit. Engine, rate, and year-4 interest?
7. Alias drill: P = 8,000 @ 5%, 2 y. Say aloud, with labels: SI, CI, Amount. (The Arena will try to scramble exactly these.)

### ✅ Selected answers
1. 75,000 × 1.21 = **₹90,750**; CI = **₹15,750**; jewel = 75,000 × 0.01 = **₹750** (SI was 15,000; gap ✓).
2. (0.1)² × 82,000 = **₹820** — jewel scales **linearly in P** (and quadratically in r: at 20% it'd be 4× = ₹3,280).
3. P(r/100)²(3 + r/100) = 5,000 × 0.01 × 3.1 = **₹155** (= 6,655 − 6,500 ✓).
4. P = 250/0.01 = **₹25,000**.
5. P(0.2 + 0.01) = 4,100 → P = 4,100/0.21 = **₹19,523.81**… exact: 19,523 17/21 ≈ **₹19,524**; amount = 19,524 × 1.21 ≈ **₹23,624**. (Not every autopsy is clean — report the method, not fake precision.)
6. Increments grow ⇒ **CI**; 6,000/60,000 = **10%**; year-4 = 7,260 × 1.1 = **₹7,986**.
7. **SI = 800 · CI = 820 (jewel 20) · Amount = 8,820.** Say it with labels — that's the whole drill.

## ❓ Quiz
1. ₹2,000 at 10% for 2 years: CI minus SI equals:
   - (a) ₹2
   - (b) ₹20 — P(r/100)² = 2,000 × 0.01; the jewel formula prices the interest-on-interest directly
   - (c) ₹40
2. ₹1,00,000 at 10% CI for 3 years matures at:
   - (a) ₹1,30,000
   - (b) ₹1,33,100 — 1.1 × 1.1 × 1.1 = 1.331 on the re-based pile; SI would underpay you by ₹3,100
   - (c) ₹1,33,000
3. Fastest tell that an account compounds rather than runs simple:
   - (a) the rate is above 8%
   - (b) year-2's interest is BIGGER than year-1's — the base re-bases every cycle
   - (c) the interest is credited monthly

### ✅ Answers
1. **(b)** — the gap IS interest on ₹200 of year-1 interest = ₹20. Option (a) forgot P enters linearly.
2. **(b)** — three re-basings; option (a) is the flat-engine fantasy.
3. **(b)** — growing yearly increments at a constant rate = re-basing = compound. Frequency (c) is INT3's gear, and it compounds *within* the year.

## ✅ Mastery checklist
- [ ] I multiply down the 1.1-ladder (1.21 · 1.331 · 1.4641 · 1.61051) without blinking
- [ ] I always end "find CI" with A − P, noun underlined
- [ ] The jewel formula CI − SI = P(r/100)² is muscle memory (2 y), with the ×(3 + r/100) extension for 3 y
- [ ] I can autopsy P back out of a CI−SI whisper
- [ ] Year-2 interest > year-1 interest is my spoken engine-ID
- [ ] ₹8,000/₹820/₹8,820 alias trio survives my tongue under pressure

**Next:** **INT3 · Frequencies, Fractions & the Rule of 72** — half-yearly gears, quarterly rests, hybrid rate tails, doubling pairs and the depreciation mirror. The engine gets a gearbox! ⚙️
