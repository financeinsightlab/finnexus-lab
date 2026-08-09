# 🎯 FI6 · Corporate Bonds & Credit Spreads — Pricing Fear, Collecting Rent
> Fixed income’s whole game in one line: the extra yield over the G-Sec is RENT the borrower pays you for carrying their fear — collect enough rent for enough years, and one default can still confiscate a decade of it. FI6 gives you the ratings ladder, the spread ladder (AAA +60–90bp · BBB +500–800bp), the two-engine damage model (rate duration + spread duration), the default arithmetic that ended DHFL’s story (₹10L at 2.4% spread earning ₹24,000/yr — one 60%-LGD default burns ₹6L = 25 YEARS of spread), and the FA-lens credit checks that keep you on the collecting side of history.

## 🎯 Objectives
- Read ratings AAA→D as probability-of-default tiers, and explain migration (downgrades) as the silent spread event.
- Compute spread = corporate YTM − matched G-Sec, and price spread-widening damage: ΔP ≈ −ModD × Δspread.
- Run default arithmetic with recovery/LGD and compare expected loss against spread income — the 25-year lesson.
- Audit Indian credit war stories (IL&FS 2018, DHFL, Franklin 2020) into repeatable red-flag checks.
- Build a retail NCD checklist: covenants, security, DSCR floor, rating stability, liquidity — before the coupon is allowed to matter.

## 📘 Concepts

### 6.1 Ratings — a probability, not a personality
AAA/AA/A/BBB are investment-grade tiers (CRISIL, ICRA, CARE, India Ratings, Acuite); BB and below = “high yield” where analysis must pay for itself. Read a rating as a rough historical default-probability class, then demand the migration history: **rating DRIFT is the spread event in slow motion** — each notch down (AA → A) typically reprices +100–200bp wider, and FI3 says a ModD-4 bond loses ~4–8% on the letter alone, default never required. The scarcest commodity in credit is an upgrade; the taxicab to losses is full of “surprising” downgrades that the ratios announced a year early.

### 6.2 The spread ladder — quoting fear in basis points
Canon ladder (illustrative, matched 5y G-Sec 7.1%): **AAA ≈ +60–90bp** (7.7–8.0%), **AA ≈ +150–250bp** (8.6–9.6%), **A ≈ +300–500bp**, **BBB ≈ +500–800bp**. Spreads breathe: they tighten when liquidity flows (credit bull) and GAP when fear arrives — 2008, IL&FS-2018, March-2020 all printed spread explosions where “good” AA paper repriced faster than equities fell. Two engines then move every corporate bond price: **ΔP ≈ −ModD × (ΔG-Sec yield + Δspread)** — twins, separately traded, separately forecast; desks quote positions in rate duration AND spread duration for this reason.

### 6.3 Default arithmetic — the cold ledger
Expected annual loss ≈ PD × LGD (loss given default = 1 − recovery). Canon trade: ₹10L AA- NCD at 9.5% while the matched G-Sec pays 7.1% — spread 2.4% = **₹24,000/yr of fear-rent**. One default with 60% LGD loses **₹6,00,000 = 25.0 years of spread**. Conclusion that builds careers: **credit is not priced by the coupon but by (survivalⁿ × recovery)** — across a portfolio you need either (a) spreads far above expected loss plus a margin for model-arrogance, or (b) diversification × selection skill proven against the FA forensic toolkit. FI6’s house rule: below AA, you are no longer an investor — you are an analyst with a salary denominated in basis points.

### 6.4 War stories, compressed into flags
- **IL&FS 2018:** AAA at dawn, D by quarter-end — flag: short-term money funding long infrastructure (ALM mismatch), auditor comfort ending, group-company spiderweb (FA5’s related-party pages).
- **DHFL 2019:** AAA papers priced at AA+ yields for months — the bond market sniffed before the rating agencies moved; flag: when a bond TRADES wide of its rating, believe the trade.
- **Franklin shut-down 2020:** a credit-risk fund froze redemptions when illiquid bonds couldn’t be sold — flag: in spreads, YOU may be liquid while your BONDS are not; liquidity premium is real money in a crisis.
Template check before any NCD: DSCR comfort (FA6), CFO/PAT conversion (FA5), auditor continuity (FA1), pledge/sibling exposure, maturity-vs-funding match, and the market-yield-vs-rating lie detector.

### 6.5 The retail NCD checklist — coupon reads LAST
1. Security & seniority: secured > unsecured; who claims what in wind-up?
2. Covenants: DSCR/leverage floors, dividend locks, cross-default triggers — covenants are the alarm system; a bond without them prays instead.
3. Cash engine: FA6’s DSCR ≥ 1.5× through a stress case, CFO-positive, receivables clean.
4. Rating quality: two agencies, recent rationale document READ (the rationale is the analyst’s homework, free), and no negative watch.
5. Market truth: yield vs same-rating peers — a 9.8% “A+” in a sea of 8.6% A+’s is the market whispering its private grade.
6. Liquidity & size: ₹100Cr+ issues trade; ₹10Cr private placements may only trade DOWN (Franklin).
Only after six YESes may the coupon enter the conversation. Reversed order is how 9.5% becomes 0%.

## 🧪 LAB — Spread desk (10 min)
1. Spread compute: 5y G-Sec 7.1%; Zenith Ports 5y NCD YTM 8.3%. Spread? Rating guess from the ladder?
2. Widening damage: Zenith (ModD 4.0) sees spreads gap +150bp in a risk-off week while G-Secs rally −20bp. Net price move both ways and net?
3. The 25-year trade: HAL Textiles offers 9.8% vs G-Sec 7.4% on ₹5L. Spread income/yr? If HAL defaults in year 2 at 60% LGD, years of spread confiscated? Write the verdict for a retiree client.
4. Lie detector: AgroBuild NCD rated A+ trades at 10.6% while A+ peers quote 8.4–8.9%. Three hypotheses ranked, with the action for each.
5. Checklist gauntlet: a “secured AA 9.4% NCD” fails which checklist items if: rating from one agency, rationale 15 months old, private placement size ₹8Cr, issuer CFO-negative 2 years? Verdict in one line.

**Why this matters:** item 2 is the weekly reality of every credit fund NAV; items 3–4 are the exact calculations that separate rent-collectors from confiscation-donors.

**🔑 Lab answers:** (1) 8.3 − 7.1 = **+120bp** — between AAA and AA rungs (call it AA-ish priced cautiously; the market may know something the letter doesn’t) (2) rate engine: −4.0 × (−0.20%) = **+0.8%**; spread engine: −4.0 × (+1.50%) = **−6.0%**; net ≈ **−5.2% in a week** — credit paper can bleed while “risk-free” rallies; that is the two-engine lesson, priced (3) spread 2.4% → **₹12,000/yr**; default ₹5L × 60% = **₹3,00,000 = 25.0 years of rent** — retiree verdict: the coupon is 9.8% but the CONTRACT is “work 25 years to afford one bad night”: only ownable inside a diversified, analyst-run sleeve, never as a retirement single-name (4) 1) market smells downgrade (ratios deteriorating — CHECK FA5 flags first); 2) illiquidity premium on a tiny issue (verify size/trades); 3) mispricing = opportunity (only AFTER 1 and 2 are cleared). Actions: forensics → size check → and only then, maybe, a small spread-harvest ticket (5) fails items 3 (cash engine), 4 (stale solo rating), 6 (₹8Cr liquidity); the word “secured” argues but cannot compensate all three — **verdict: pass; a 9.4% that fails the checklist isn’t a yield, it’s a dare**.

## 💪 Exercises
1. Ladder builder: with 5y G-Sec at 7.0%, quote fair YTM ranges for AAA/AA/A/BBB using the canon ladder, and identify the bucket where spread-hunters (FI1) legally operate.
2. Twin-engine P&L: NCD ModD 5.2, week sees G-Sec +30bp and spread +90bp: % move, and the attribution line a fund factsheet should print.
3. Expected-loss table: PD 3%/yr, LGD 60%, spread offered 2.6%: expected loss vs spread — plus the TWO margins (for model error, for clustering) you’d demand before calling it investable.
4. Rating-migration trade: AA bought at +170bp; agency places “watch negative”. If downgrade lands (to A, +350bp) on a ModD 4.4 bond, compute the mark; then write the pre-emptive desk rule this teaches.
5. Recovery geography: same default, two holdings — secured NCD recovers 70%, unsecured recovers 25%: on ₹10L each, LGD rupees for both, and the one-line covenant/seniority lesson.
6. Franklin memo: explain to a relative, in 6 lines, why a fund of “good bonds” could freeze withdrawals, naming the specific mismatch and the two warning signs visible in advance.
7. NCD verdict card: build a YES/NO card for this offer — “BB+ 12.5% 3y, secured, growing NBFC, DSCR 1.1, pledging 40% promoter holding, single B rated agency” — run all six checklist items and sign a verdict with reasons.

### ✅ Selected answers
1. AAA 7.6–7.9%, AA 8.5–9.5%, A 10.0–12.0%, BBB 12.0–15.0%. Legal spread-hunting sits in **A-to-BBB with forensic-grade selection** — above it the rent rarely pays the analysis, below it defaults start paying your P&L visits.
3. Expected loss = 3% × 60% = **1.8%/yr** vs spread 2.6% → margin only 0.8%/yr. Demands: +0.7–1.0% for model error (PDs ayear-early are fiction in stress) and +0.5%+ for CLUSTERING (defaults arrive in correlated bunches — IL&FS season) → fair ask ≈ 3.3–3.6%+ before this paper clears, or smaller sizing inside a wide basket.
4. Mark: Δspread +180bp × ModD 4.4 ≈ **−7.9%** from the rating letter alone — no default, just a new opinion. Desk rule: **size positions so that a one-notch migration is a bruise (<2% of book), never a funeral**; sell discipline triggers on “watch negative”, not on the completed downgrade the price already ate.
6. The fund promised daily exit while owning bonds that traded monthly (asset–liability liquidity mismatch); when redemptions arrived together, selling good bonds meant fire prices, so the gate came down. Warnings visible: portfolio weighted toward small unrated/tiny issues, and yields far above peers (“extra return” was actually unpriced illiquidity). Daily liquidity is the FUND’s promise; the BONDS never signed it.
7. NO — fails item 3 (DSCR 1.1 through stress ≈ underwater), item 4 (solo low-tier rater), soft-fails item 5 (12.5% screams the market’s private grade is worse than BB+), and promoter pledging at 40% is the FA5 sibling-flag in a new costume. The coupon is not compensation; it is confession. File under dare, not debt.

## ❓ Quiz
1. An AA- NCD’s 2.4% spread pays ₹24,000/yr on ₹10L; one default at 60% LGD confiscates:
   (a) 2 years of spread
   (b) 25.0 years of spread — ₹6,00,000 of principal against ₹24,000 of annual rent: credit must be priced by survival-and-recovery across the book, never by the coupon’s smile; that is why below-AA you are an analyst, not an investor
   (c) 6 years of spread
2. Zenith Ports (ModD 4.0) in a week of G-Sec −20bp and spread +150bp prints roughly:
   (a) +0.8%
   (b) −5.2% net — the rate engine gifted +0.8% while the spread engine billed −6.0%: corporate bonds answer to TWO dials, and the fear dial can override the RBI dial in a single week
   (c) −1.5%
3. A “secured AA 9.4%” NCD whose issuer is CFO-negative with a stale solo rating and an ₹8Cr issue size should be:
   (a) bought for the security cover
   (b) passed — the checklist runs security AFTER cash engine, rating quality and liquidity: 3 of 6 flags failed means the 9.4% is a dare dressed as yield; coupons are read last because they are paid by everything listed earlier
   (c) bought small for diversification

### ✅ Answers
1. **(b)** — 600,000 ÷ 24,000 = 25.0 exactly; (a) and (c) are what coupon-shopping feels like before the ledger arrives.
2. **(b)** — twin engines, opposite signs, fear won the week.
3. **(b)** — order discipline IS the credit skill: engine, rater, liquidity, then coupon.

## ✅ Mastery checklist
- [ ] I translate ratings into PD tiers and always pull the rationale + migration history.
- [ ] I can compute spreads and price both engines of a corporate bond separately.
- [ ] I can run PD × LGD expected-loss math and demand honest margins over it.
- [ ] I carry the IL&FS/DHFL/Franklin flags as reflexes (mismatch, market-vs-rating, liquidity).
- [ ] My checklist ends at the coupon — never begins there.

**Next:** FI7 · Bond Portfolio Engineering — ladders, barbells, immunization, and rolling a desk that survives every rate season.
