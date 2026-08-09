# 🎯 FI5 · Government Securities Deep Dive — Zero Default Risk ≠ Zero Risk
> The safest paper in India once delivered a −4% year to investors who swore they’d bought safety. Government securities carry no default risk — the sovereign prints the rupees it owes — but they carry FULL price risk, and FI3’s duration meter runs just as hot on a gilt as on a shaky NCD. FI5 walks the whole govvie shelf: T-bills, dated securities, SDLs, strips, floating-rate bonds; how auctions really allot; how a salaried person buys one tonight via RBI Retail Direct or a gilt fund; and the three honest risks that survive the word “sovereign.”

## 🎯 Objectives
- Map the govvie shelf: 91/182/364-day T-bills, dated G-Secs 2–40y, State Development Loans, STRIPS, FRBs — and assign each a habitat (parking, core, long, inflation-hedge).
- Convert a T-bill discount price into yield with the Indian convention (y = (100−P)/P × 365/days) — canon: ₹98.40 → 6.52%.
- Explain primary auctions (competitive vs non-competitive bidding) and the retail routes: RBI Retail Direct, exchanges, gilt funds.
- Separate “no default risk” from the three surviving risks: price/MTM risk, reinvestment risk, inflation risk.
- Choose between direct gilts, target-maturity funds, and plain gilt funds for a given investor horizon, with the tax/cost angle named.

## 📘 Concepts

### 5.1 The shelf — six shelves, one sovereign
- **T-bills (91/182/364 days):** zero-coupon, sold at discount, redeemed at ₹100 — the money-market shelf where banks park and RBI pins the short end.
- **Dated G-Secs (2–40 years):** fixed semi-annual coupons on ₹100 face — the curve bricks FI4 plotted.
- **SDLs (State Development Loans):** state-government borrowings, same machinery, typically ~25–60bp above central paper — state-risk nuance on a sovereign frame.
- **STRIPS:** coupons stripped from principal, creating true zero-coupon gilts — duration tools in pure form (FI3’s MacD = maturity case, government edition).
- **FRBs & inflation-linked:** floating coupons resetting off a base — duration near zero; the solution when you fear RATE risk more than you love carry.
- **CMBs (Cash Management Bills):** sub-91-day plugs for the government’s short mismatches — the shortest shelf of all.

### 5.2 T-bill pricing — the discount language
T-bills quote as a PRICE, and you reverse-engineer the yield: **y = (100 − P)/P × 365/days**. Canon: a 91-day bill at **₹98.40** → (100 − 98.40)/98.40 × 365/91 = 1.60/98.40 × 4.0110 = **6.52% annualized**. Two traps: the return is earned on the ₹98.40 you PAID (not on 100), and the 365-day annualization convention matters when comparing against coupon yields. Once fluent, a T-bill auction result reads like a sentence: “91-day cut-off 6.49%” = money is slightly cheaper than last week.

### 5.3 Auctions & the retail door
RBI auctions govvies weekly. **Competitive bidders** (banks, PDs, funds) submit yield/price and get filled at their bid above cut-off risk; **non-competitive bidders** (up to 5% of issue, retail-sized) submit amounts only and receive the weighted-average cut-off — the market prices for you. Retail doors today: **RBI Retail Direct** (open a gilt account with RBI, bid non-competitively, hold to maturity — zero fund fees), exchange platforms, and **gilt funds/target-maturity funds** for those who want NAV convenience over certificate intimacy. Direct suits the hold-to-maturist; funds suit the laddering-and-liquidity crowd.

### 5.4 The three surviving risks
1. **Price/MTM risk:** a 10y gilt’s ModD ~6.5–7 — a +1% cycle is a −7% mark on “risk-free” paper; 2022’s hiking cycle printed exactly that lesson on gilt-fund factsheets.
2. **Reinvestment risk:** coupons arriving in falling-rate seasons redeploy poorer (FI2’s mirror).
3. **Inflation risk:** the sovereign guarantees nominal rupees; it does not guarantee what rupees BUY — a 7.1% coupon in an 8% inflation year is a negative-real contract, honoured perfectly.
The sovereign removed the DEFAULT question so the other three questions could finally be heard. Professionals price all three; brochures mention only their absence.

### 5.5 Direct vs gilt fund vs target-maturity
- **Direct (Retail Direct):** zero expense, full control, hold-to-maturity discipline; interest taxed at slab, and you must ladder yourself.
- **Gilt fund (open-ended):** daily liquidity, professional roll-down harvesting, expense ~0.4–0.9%, ModD disclosed — but NAV weather included; post-2023 debt taxation = slab rates regardless of horizon.
- **Target-maturity fund:** fund wrapper + a defined maturity year (hold to it ≈ direct ownership with glide-path visibility) — the hybrid that killed the “direct vs fund” argument for most retail money: index-like cost, roll-down mechanics, a maturity you can match to a liability.
Choice rule: match the product’s effective duration to your horizon (FI3’s mandate), then minimize cost — safety theatre beyond that is expense, not safety.

## 🧪 LAB — Govvie desk indents (10 min)
1. Price-to-yield: a 364-day T-bill prints at ₹93.90. Annualized yield?
2. Auction fill: cut-off on the 91-day comes at 6.49%; you bid non-competitively ₹2L. What yield do you get and what price approximately (invert the canon math)?
3. Risk sorting: label each as default / price / reinvestment / inflation risk: (a) 30y gilt in a +1.5% cycle, (b) monthly coupon redeployment during an easing cycle, (c) 7% coupon with 8% CPI, (d) the Centre’s dated bond itself.
4. FRB asylum: your gilt fund (ModD 6.8) terrifies you ahead of an expected +100bp cycle. Sketch the switch to FRBs: what happens to ModD, expected return, and what you GIVE UP if rates instead fall.
5. Product match: sister’s ₹5L, goals = house booking in 3y. Choose: direct 3y gilts via Retail Direct / a 3y target-maturity fund / an open gilt fund (ModD 6.8) / a liquid fund. Rank the menu with reasons.

**Why this matters:** item 2 is tonight’s real desk skill, and item 5 is the exact conversation where households either build wealth safely or buy duration they never ordered.

**🔑 Lab answers:** (1) (100 − 93.90)/93.90 × 365/364 = 6.10/93.90 × 1.0027 = **6.51%** (2) non-competitive = cut-off **6.49%** at the weighted-average price ≈ 100/(1 + 0.0649 × 91/365) ≈ **₹98.41** — you ride the institution-set price; your ₹2L allots in full within the 5% bucket (3) (a) price — the bond cannot default and can still mark −10%, (b) reinvestment, (c) inflation — honoured in rupees, taxed by purchasing power, (d) none of the four by default; the sovereign’s printing press pays, with inflation as its invoice (4) FRB coupons RESET with rates: ModD collapses toward the reset period (~0.1–0.5); +100bp barely moves price, coupon income steps UP; give-up: if rates FALL you inherit falling coupons and zero capital rally — you sold your convexity stub for sleeping pills (5) **1st: 3y target-maturity** (horizon locked, roll-down helps, cost tiny); **2nd: direct 3y gilts** (zero cost, needs self-administration); **3rd: liquid fund** (safe but wastes the 3y horizon); **last: open gilt fund ModD 6.8** — a +1% accident (−6.8% MTM) landing one year before a house booking is how tuition gets paid.

## 💪 Exercises
1. Yield sprint: convert these 91-day prints — ₹98.55, ₹98.30, ₹98.10 — and state in one line what the falling price trend says about money conditions.
2. SDL spread read: a 10y SDL quotes 7.62% vs the 10y G-Sec at 7.18%. What is the spread saying, and which two investor tribes (FI1) can exploit it honestly?
3. STRIPS desk: you need ₹20L exactly in 8y for a goal. Explain why an 8y coupon-strip beats a coupon G-Sec for this job, using reinvestment risk as the witness; price it roughly at 7.2% yield.
4. The −4% year: reconstruct how “risk-free” delivered a negative calendar year in a hiking cycle — write the 4-step MTM story and the two client sentences that would have prevented the shock.
5. Retail Direct run-book: from opening the account to holding a 3y dated G-Sec to maturity — list the steps, the cash-flow dates you’ll receive, and the tax touchpoints (interest at slab; gains if sold early).
6. CMB context: why does a government with steady tax receipts still issue sub-91-day paper? Two-line treasury answer.
7. Ladder blueprint: ₹10L for a retiree wanting sovereign-only income: design a 1/2/3/4/5y ladder of dated G-Secs + T-bill sleeve, name each rung’s job, and state the ladder’s rolling rule.

### ✅ Selected answers
1. 98.55 → (1.45/98.55) × 4.011 = **5.90%**; 98.30 → (1.70/98.30) × 4.011 = **6.94%**; 98.10 → (1.90/98.10) × 4.011 = **7.77%**. Falling prices = rising yields = money getting tighter (hiking season or liquidity drainage) — four price points, and the whole policy story leaks.
3. The strip pays NOTHING until year 8 — so there is no coupon to reinvest at who-knows-what rates; your 7.2% is locked on every rupee till the bullet arrives. Rough price at 7.2% annual compounding: 20,00,000/1.072⁸ ≈ 20,00,000/1.744 ≈ **₹11.5L today** — certainty bought with patience, the liability-matcher’s dream instrument.
4. (1) Client buys long gilt fund for “safety” at ModD ~7. (2) Cycle hikes +100–150bp. (3) MTM −7 to −10% vs accrual +6-7% → print ≈ −1 to −4%. (4) Redemption letter written at the bottom. Prevention: “safety” in bonds is TWO words — no default + matched duration; and “a −7% MTM on duration-7 paper is physics, not fraud.”
7. Rungs: ₹2L in 364-day T-bill (nearly-cash buffer), ₹2L each in 2/3/4/5y dated G-Secs (income + pull-to-par). Rule: when a rung matures, redeploy at the NEW 5y point — the ladder perpetually climbs; average ModD stays ~2.5, income smooths, no single year’s rate decides the retiree’s decade.

## ❓ Quiz
1. A 91-day T-bill at ₹98.40 annualizes to:
   (a) 6.29%
   (b) 6.52% — 1.60 earned on the 98.40 PAID, scaled 365/91: discount instruments quote price, professionals answer in yield, and the PAID-price base is where the rookies slip
   (c) 6.52% earned on ₹100
2. “Zero default risk” G-Secs still carry:
   (a) no risks worth naming
   (b) price (MTM/duration), reinvestment, and inflation risk — the sovereign kills the default question precisely so the other three can be heard; a 10y gilt’s ModD ~7 means +1% cycles mark −7% on the safest paper in the country
   (c) only liquidity risk
3. For a ₹5L goal exactly 3 years away, the strongest sovereign-leaning choice is:
   (a) an open gilt fund with ModD 6.8
   (b) a 3-year target-maturity fund (or direct 3y gilts) — horizon locked to duration, roll-down working FOR you, cost near zero; the ModD-6.8 fund is a rate bet strapped to a house booking
   (c) a 364-day T-bill rolled yearly

### ✅ Answers
1. **(b)** — (a) used 100 as the base; (c) repeats the sin the formula exists to kill.
2. **(b)** — three risks survived the sovereign; price risk is the one that ambushes brochure-readers.
3. **(b)** — match duration to horizon first, then minimize cost; (a) is physics risk on appointment money.

## ✅ Mastery checklist
- [ ] I can assign any govvie instrument its shelf and habitat in one line.
- [ ] I can convert T-bill prices to annualized yields on the Indian convention without notes.
- [ ] I can walk a retail investor from RBI Retail Direct signup to holding to maturity.
- [ ] I can name and diagnose the three risks that survive “sovereign”.
- [ ] I can choose direct gilt vs gilt fund vs target-maturity for a stated horizon.

**Next:** FI6 · Corporate Bonds & Credit Spreads — where the extra yield lives: ratings, the spread ladder, spread-duration damage, and the IL&FS/DHFL lessons that made credit analysis a survival skill.
