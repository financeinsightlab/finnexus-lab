# 🎯 RT5 · Sector Ratio Packs — Every Industry Has Its Own Pulse

> A 4.7% net margin disgraces a software firm and honors a grocer. Generic ratios get you to the stadium; sector ratios tell you who's winning the match. This module hands you the five packs analysts actually carry — retail, telecom/subscription, SaaS, insurance, hospitality — and the skill of reading a business model straight off its bespoke numbers.

---

## 🎯 Objectives

- Use retail's pack: SSSG, revenue per sq ft, GMROI, and the inventory-turns × margin engine
- Use subscription packs: ARPU, churn, CAC payback, LTV/CAC for telecom and consumer apps
- Use SaaS gauges: Rule of 40 on top of ProjectHub canons (NRR 116%, payback 14mo)
- Use insurance's combined ratio and hospitality's RevPAR/GOPPAR
- Diagnose any sector pack component-wise: growth vs quality vs unit economics

---

## 📘 Concepts

### 5.1 Retail — SSSG and the GMROI engine

**Same-Store Sales Growth (SSSG)** strips new-store noise: only stores open 12+ months count. ShopKart reports 8% SSSG — decompose it: **ticket +5% × footfall +2.9% ≈ +8%** (1.05 × 1.029 = 1.080). Growth from tickets (mix/price) is quality; growth from footfall alone with falling tickets = discounting addiction. **Revenue per sq ft** tests real-estate productivity. And the merchant's bottom line: **GMROI = gross margin / average inventory (at cost)**. ShopKart: GM ₹81.2L (29% of ₹280L) / avg inventory ₹44.1L = **1.84** — every rupee parked in inventory returns ₹1.84 of gross margin per year. GMROI decomposes beautifully: (GM/COGS) × inventory turns = 0.4085 × 4.51 = **1.84** ✓ — margin and turns are the two dials; a 29% margin with 4.5 turns beats a 40% margin with 2 turns. The unforgiving rule: **GMROI < 1 means the shelves destroy cash.**

### 5.2 Telecom & consumer subscription — ARPU, churn, CAC

TelcoNow's pack: **ARPU ₹180/month** (price), **churn 2.1%/month** (leak), **CAC ₹500** (cost to acquire). Unit economics: contribution per user = 180 × 55% = **₹99/month** → **CAC payback = 500/99 ≈ 5.1 months** — healthy (under 12). Stress it: if price wars compress contribution margin to 38.6%, payback stretches to 500/69.5 ≈ **7.2 months** — same ARPU, worse machine. **LTV ≈ contribution / churn = 99/0.021 ≈ ₹4,714** → **LTV/CAC ≈ 9.4×** (sustainable >3×). The sector skill: never quote ARPU without churn — a ₹180 ARPU leaking 2.1%/month has a half-life of ~33 months; ARPU is revenue, but *churn decides how long you keep it*.

### 5.3 SaaS — Rule of 40 rides on the ProjectHub canon

CF8's ProjectHub already taught NRR 116%, logo churn 31.6%/quarter-peak, CAC payback 14mo, Magic Number 1.6. Add the pack's summary judgment: **Rule of 40 = growth% + FCF margin% ≥ 40**. Scoreboard: ProjectHub at 28% growth + 15% FCF = **43 — pass**. Counter-example: a hype SaaS at 45% growth − 12% FCF = **33 — fail**: blazing growth, but the engine burns more fuel than the destination is worth. The Rule forces the trade-off conversation: you may buy growth with cash burn, but the *sum* must clear 40. DF9's efficiency frontier (DV8) is the same idea with seatbelts.

### 5.4 Insurance — the combined ratio truth-teller

**Combined ratio = loss ratio + expense ratio** (claims paid + operating costs, per premium rupee). SafeShield General: 72% + 31% = **103%** — underwriting loses 3 paise per premium rupee; only investment income on the float saves the P&L. Below 100% = the insurer profits from *insurance*; above 100% = it profits from *investing premiums* while hoping claims behave. Read trend + mix: a 103% driven by expense build-out in a young insurer can be strategy; a 103% driven by worsening loss ratios in a mature one is decay. For life insurers swap in **VNB margin** (value of new business / premium) — the embedded profit per policy sold.

### 5.5 Hospitality & aviation — RevPAR, GOPPAR, load factors

**RevPAR = occupancy × ADR** (room rate) — Sunrise Hotels: 65% × ₹4,200 = **₹2,730** per available room-night. RevPAR rises through price or heads-in-beds; GOPPAR (gross operating profit per available room) deducts costs — a hotel can win RevPAR and lose GOPPAR by buying occupancy with OTA commissions (IN2 2's TRAI-of-travel: the platform tax). Aviation's twin: **RASK/CASK** (revenue vs cost per available seat km) with load factor as the occupancy analog. Pack-reading rule: **volume gauge × price gauge = revenue gauge; then ask what the volume cost.**

---

## 🧪 LAB — Five Packs, Five Verdicts (10 min)

**Setup:**
1. **Retail:** ShopKart GMROI 1.84; rival FreshWala: GM 34% of sales (₹95.2L on ₹280L), avg inventory ₹68L.
2. **Telecom:** TelcoNow lab variant — ARPU ₹180, churn 2.1%/mo, CAC ₹500, contribution margin 55%.
3. **SaaS:** CloudKart: growth 45%, FCF margin −12%.
4. **Insurance:** SafeShield: loss ratio 72%, expense ratio 31%.
5. **Hotels:** Sunrise: occupancy 71%, ADR ₹3,800; competitor set average RevPAR ₹2,850.

**Do this:**
1. Compute FreshWala's GMROI and compare with ShopKart's 1.84 — who runs the better shelf?
2. TelcoNow: CAC payback and LTV/CAC at 55% margin; then at 38.6% margin — verdict on a price war?
3. Score all five firms: pass/fail vs their pack's health line (GMROI ≥ 1, payback ≤ 12mo, Rule ≥ 40, combined ≤ 100, RevPAR index ≥ 100).
4. Sunrise's manager proposes cutting ADR to ₹3,500 to push occupancy to 78%. Does RevPAR improve? What else must be checked?

**Why this matters:** Packs are how buy-siders compare companies that share a sector but not a strategy. This lab is deliberately five mini-files — because that's the real job: five dashboards, five different definitions of "healthy," one analyst expected to read them all fluently.

**🔑 Lab answers:**
1. FreshWala GMROI = 95.2/68 = **1.40** vs ShopKart **1.84** — despite a *richer* margin (34% vs 29%), FreshWala's lazy inventory (turns = 184.8/68 = 2.7 vs ShopKart's 4.51) makes every shelf-rupee earn less. Margin without turns is vanity.
2. At 55%: payback 500/99 = **5.1mo**, LTV/CAC = 4,714/500 = **9.4×** — a money machine. At 38.6%: contribution ₹69.5 → payback **7.2mo**, LTV = 69.5/0.021 = ₹3,310, LTV/CAC **6.6×** — still passable on this 2.1% churn, but the payback drift shows how price wars eat the cushion; below ~3:1 LTV/CAC the machine stops compounding.
3. FreshWala 1.40 **pass** (but worse than ShopKart); TelcoNow 5.1mo **pass**; CloudKart 45 − 12 = **33 fail**; SafeShield 103% **fail** on underwriting (needs investment income to survive); Sunrise index = 2,698/2,850 = **94.7 — fail** vs comp set.
4. New RevPAR = 0.78 × 3,500 = **₹2,730** vs today's 0.71 × 3,800 = **₹2,698** — a mere ₹32 gain (+1.2%) for 7pp more wear, F&B load, and staff cost. Check **GOPPAR**: if service costs scale with occupancy, the tiny RevPAR win likely becomes a GOPPAR loss. Volume bought with price must clear the cost-per-occupied-room hurdle, not just the RevPAR hurdle.

---

## 💪 Exercises

1. **SSSG decompose.** FreshWala posts SSSG +6%: ticket −2%, footfall +8.2%. Interpret quality vs ShopKart's +5% ticket / +2.9% footfall.
2. **Merchant math.** A category earns 22% GM on sales with 6.2 inventory turns. Compute GMROI (hint: GM/COGS first). Should the merchant keep or kill it if capital is scarce?
3. **Churn physics.** TelcoNow halves churn to 1.05%/mo at 55% margin. Recompute LTV and LTV/CAC. What is 1pp of monthly churn worth per user?
4. **Rule of 40 triage.** Rank: (a) growth 30%, FCF 5%; (b) growth 12%, FCF 30%; (c) growth 60%, FCF −25%. Which sum passes, and what does each profile imply about stage?
5. **Airline pack.** FlyDesi: RASK ₹4.6, CASK ₹4.4, load factor 84%. Compute the spread per seat-km and name the two levers if oil pushes CASK to ₹4.65.

### ✅ Selected answers

1. FreshWala is *buying* traffic with price: −2% ticket +8.2% footfall means promotions pull crowds but baskets shrink — margin-dilutive growth; ShopKart's +5%/+2.9% mix says customers pay *more* per visit and slightly more visit: compounding quality. SSSG without decomposition is a rumor.
2. GM/COGS = 0.22/0.78 = 0.282; GMROI = 0.282 × 6.2 = **1.75** — comfortably above 1. **Keep.** The 22% margin looks modest until 6.2 turns multiplies it: turns are the quiet multiplier in every merchant equation.
3. LTV = 99/0.0105 ≈ **₹9,429** — churn halved, LTV **doubled** (churn sits in the denominator; nothing else changed). LTV/CAC = 18.9×. Since LTV = 99/churn, each basis point of churn is worth ~₹45–95 per user lifetime depending on the base — retention improvements routinely beat acquisition spending on pure math (PM7's SIP-top-up logic, applied to customers).
4. (a) 35 — near-miss, growth-leaning; typical scale-up pushing for the 40 line. (b) 42 — **pass**: a mature compounder; low growth but cash-gushing. (c) 35 — classic blitz-scaler; acceptable only while the burn is buying durable share (check NRR!) and the cash runway exists. The Rule reads *stage*, not just score.
5. Spread = ₹0.20 per seat-km (4.6 − 4.4) on an 84% load — thin but positive. If CASK hits 4.65, levers: **price/yield** (raise fares ~₹0.05+ via better mix, ancillaries) and **volume** (push load toward 88–90% to dilute fixed costs across more paying seat-kms). RASK − CASK is aviation's entire P&L in one subtraction.

---

## ❓ Quiz

**Q1.** ShopKart beats FreshWala's GMROI (1.84 vs 1.40) despite a *lower* gross margin (29% vs 34%) because:
(a) GMROI ignores margins entirely
(b) ShopKart's inventory turns 4.51× vs ~2.7× — turn velocity out-multiplies margin richness in the GMROI engine
(c) FreshWala has more stores
(d) ShopKart reports annually, not quarterly

**Q2.** CloudKart posts 45% growth with −12% FCF margin. Its Rule-of-40 score and verdict:
(a) 57 — elite compounder
(b) 33 — fail: growth is being purchased with burn, and the sum doesn't clear the 40 line
(c) 45 — exactly at the threshold
(d) The Rule of 40 doesn't apply to companies growing above 40%

**Q3.** SafeShield's combined ratio of 103% (72% losses + 31% expenses) means:
(a) The insurer earns a 3% underwriting profit
(b) It loses 3 paise per premium rupee on underwriting and depends on investment income from the float to stay profitable
(c) It must be shut immediately
(d) Its premiums are 3% too high, always

### ✅ Answers

1. **(b)** — GMROI = (GM/COGS) × turns. ShopKart 0.4085 × 4.51 = 1.84 vs FreshWala 0.515 × 2.7 = 1.40. Rich margins on sleepy shelves lose to modest margins on fast shelves — the merchant's version of "turnover is the quiet multiplier."
2. **(b)** — 45 + (−12) = 33 < 40. The Rule is deliberately generous about *how* you clear it (growth, profit, or a mix) and unforgiving about the total. Option (d) is the classic confusion — the Rule exists precisely *for* high-growth firms, to test whether the growth is worth its fuel.
3. **(b)** — above 100% = red underwriting; float income is the planned patch. Combined ratio is insurance's honesty metric because it separates *insuring skill* from *investing luck* — a 103% with great float returns can still be a mediocre insurer riding a bull market.

---

## ✅ Mastery checklist

- [ ] I decompose SSSG into ticket × footfall and judge growth quality
- [ ] I compute GMROI both ways (GM/avg inventory and GM/COGS × turns) — 1.84 for ShopKart
- [ ] I run ARPU/churn/CAC/LTV payback math and stress margins for price wars
- [ ] I score Rule of 40 and combined ratio without mixing their health lines (40 vs 100)
- [ ] I compute RevPAR and demand the GOPPAR check before praising occupancy bought with price cuts

**Next:** RT6 turns the toolkit into a forensic kit — **ratio forensics**: the six costume families, DSRI and the accruals screen, the Satyam interest test, and the CFO/PAT tripwire that catches fraud years before the confession.
