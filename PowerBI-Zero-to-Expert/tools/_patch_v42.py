#!/usr/bin/env python3
# Patch build_app_v41.py -> build_app_v42.py : + Corporate Finance (cf1..cf8) + Behavioural Finance (bf1..bf6)
import os
BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = os.path.join(BASE, "tools", "build_app_v41.py")
dst = os.path.join(BASE, "tools", "build_app_v42.py")
t = open(src, encoding="utf-8").read()

def rep(old, new, n=1):
    global t
    c = t.count(old)
    assert c == n, f"anchor count {c} != {n} for: {old[:70]!r}"
    t = t.replace(old, new)

rep('OUT = os.path.join(BASE, "PowerBI_Course_App_v41.html")',
    'OUT = os.path.join(BASE, "PowerBI_Course_App_v42.html")')

CF_BF = '''
CF_SECTIONS = [
    ("CF_01_CFO_Decision_Engine.md", "cf1", "CF1 · The CFO's Decision Engine", "\\U0001F3E6", "goal of firm, 3 drawers, spread & EVA, agency war"),
    ("CF_02_Cost_of_Capital.md", "cf2", "CF2 · Cost of Capital: WACC From Zero", "\\U0001F4B2", "CAPM Ke 13.6%, shielded Kd 9.1%, canon WACC 12.6%"),
    ("CF_03_Capital_Structure.md", "cf3", "CF3 · Capital Structure", "\\U0001F9E9", "MM pizza, VL = VU + tD, distress costs, pecking order"),
    ("CF_04_Leverage_Amplifiers.md", "cf4", "CF4 · Leverage Amplifiers", "\\U0001F4D0", "DOL 4.06 x DFL 1.13 = 4.59, BE Rs 211L, MOS 24.6%"),
    ("CF_05_Dividend_Doctrine.md", "cf5", "CF5 · Dividend Doctrine", "\\U0001F4B8", "residual payout, ex-date physics, buyback optics, bonus fog"),
    ("CF_06_Working_Capital_Treasury.md", "cf6", "CF6 · Working Capital Treasury", "\\U0001F3EA", "CCC 74 days priced, EOQ 980, terms table, 13-week rule"),
    ("CF_07_Valuation_Front_Door.md", "cf7", "CF7 · Valuation Front Door", "\\U0001F48E", "DCF EV Rs 194L to Rs 37.4/share, TV gravity, multiples"),
    ("CF_08_Capstone_CFO_War_Room.md", "cf8", "CF8 · CAPSTONE: CFO War Room", "\\U0001F3C6", "3-project triage, Rs 28L funding stack, covenant math"),
]

BF_SECTIONS = [
    ("BF_01_Two_Systems_One_Investor.md", "bf1", "BF1 · Two Systems, One Investor", "\\U0001F9E0", "S1/S2, heuristics engine, Mr Market, process > personality"),
    ("BF_02_Bias_Hall_I.md", "bf2", "BF2 · Bias Hall of Fame I", "\\U0001F3AD", "overconfidence (SEBI 9/10!), anchoring, echo chambers"),
    ("BF_03_Bias_Hall_II.md", "bf3", "BF3 · Bias Hall of Fame II", "\\U0001F3A2", "loss aversion 2.25x, prospect curve, framing, jars"),
    ("BF_04_Herds_Bubbles_Anomalies.md", "bf4", "BF4 · Herds, Bubbles & Anomalies", "\\U0001F388", "5-stage mania anatomy, drawdown math, anomaly zoo"),
    ("BF_05_Self_Mastery_Playbook.md", "bf5", "BF5 · Self-Mastery Playbook", "\\U0001F6E1\\uFE0F", "7-gate checklist, cooling periods, journal, caps law"),
    ("BF_06_Capstone_Behavioral_Audit.md", "bf6", "BF6 · CAPSTONE: The Behavioral Audit", "\\U0001F3C6", "12-trade autopsy, IPS one-pager, interview forge"),
]
'''
rep('    ("AC_10_Capstone_Forensics_Interview_Forge.md", "ac10", "AC10 · CAPSTONE: Books-to-Board & Forensics", "\\U0001F3C6", "JE-to-TB sprint, QoE red flags, interview forge"),\n]\n',
    '    ("AC_10_Capstone_Forensics_Interview_Forge.md", "ac10", "AC10 · CAPSTONE: Books-to-Board & Forensics", "\\U0001F3C6", "JE-to-TB sprint, QoE red flags, interview forge"),\n]\n' + CF_BF)

rep(' + TW_SECTIONS + AC_SECTIONS\n', ' + TW_SECTIONS + AC_SECTIONS + CF_SECTIONS + BF_SECTIONS\n')

rep('"sd": [], "tw": [], "ac": []}', '"sd": [], "tw": [], "ac": [], "cf": [], "bf": []}')
rep('"sd": 0, "tw": 0, "ac": 0}', '"sd": 0, "tw": 0, "ac": 0, "cf": 0, "bf": 0}')

rep('    if sid == "ac1":\n        _gcur = "ac"\n',
    '    if sid == "ac1":\n        _gcur = "ac"\n    if sid == "cf1":\n        _gcur = "cf"\n    if sid == "bf1":\n        _gcur = "bf"\n')

rep('    ("ac",    "📒 Accounting", "fin"),\n',
    '    ("ac",    "📒 Accounting", "fin"),\n    ("cf",    "🏦 Corporate Finance", "fin"),\n    ("bf",    "🧠 Behavioural Finance", "fin"),\n')

rep('NEW! 📒 Accounting — 10 modules: journal entries → statements → cash flow → forensics & board packs!)',
    'NEW! 📒 Accounting · 🏦 Corporate Finance · 🧠 Behavioural Finance — journal entries to CFO war rooms to bias-proofing your own brain!)')
rep(' · 648 auto-graded quiz questions · ShopKart', ' · 690 auto-graded quiz questions · ShopKart')

rep('<div class="stat"><b data-count="216">0</b><span>Sections</span></div>',
    '<div class="stat"><b data-count="230">0</b><span>Sections</span></div>')
rep('<div class="stat"><b data-count="212">0</b><span>Hands-on labs</span></div>',
    '<div class="stat"><b data-count="226">0</b><span>Hands-on labs</span></div>')
rep('<div class="stat"><b data-count="648">0</b><span>Quiz questions</span></div>',
    '<div class="stat"><b data-count="690">0</b><span>Quiz questions</span></div>')

rep(' 216 sections across 35 courses: ',
    ' 230 sections across 37 courses: ')
rep('Time Speed & Distance, Time & Work & Accounting (incl.',
    'Time Speed & Distance, Time & Work, Accounting, Corporate Finance & Behavioural Finance (incl.')

QUIZ = '''"cf1": [
  {"q":"ShopKart's ROCE is 29.7% against a 12.6% WACC on Rs 67.4L capital employed. The firm:",
   "o":["breaks even","creates ~Rs 11.5L of value - the +17.1% spread x capital = profit above what the same risk earns elsewhere; retention at these spreads is compounding","destroys value - WACC is high","creates Rs 20L of value"], "a":1,
   "w":"Spread x capital is the EVA; confusing the cost of capital with a verdict is the classic error."},
  {"q":"A rights issue, a dividend, and a store closure walk in. Their drawers:",
   "o":["investment, payout, financing","financing, payout, investment (a DIS-investment still files under investment) - every headline is these three verbs in costume","payout, financing, investment","payout, investment, financing"], "a":1,
   "w":"Ninety percent of corporate news sorts this fast once the drawers are installed."},
  {"q":"'Maximize profit' fails as a corporate goal because it ignores:",
   "o":["marketing","timing, risk, and capital consumed - Rs 10L in year 5 is not Rs 10L today, 2x profit at 2x ruin-odds is arson, and profit never asks what the capital cost","branding","employees"], "a":1,
   "w":"Three failures; interviews ask for them verbatim, in any costume."}],
"cf2": [
  {"q":"ShopKart's CAPM build (rf 7%, beta 1.1, ERP 6%) prices equity at:",
   "o":["12.1%","13.6% - risk-free anchor plus beta-titled market premium; equity stands last on the claims staircase and invoices accordingly","9.1%","8.2%"], "a":1,
   "w":"7 + 6.6; option (a) is debt, option (c) is debt-after-shield - three rungs, three prices."},
  {"q":"After-tax cost of ShopKart's debt (12.1% gross, 25.17% tax):",
   "o":["12.1%","~9.1% - interest cuts taxable profit, so the exchequer co-pays about a quarter of every rupee of interest; the shield is real only where profits exist to shield","15.2%","3.0%"], "a":1,
   "w":"Shield = rate x tax; memorize it as 'the government co-signs a quarter of the coupon'."},
  {"q":"The canon WACC (76.9% equity at 13.6%, 23.1% debt at 9.1%):",
   "o":["10.5%","~12.6% - the hurdle every NPV, EVA and DCF ahead will bow to; a 130bp error here rewrites crores of valuation downstream","14.8%","16.4%"], "a":1,
   "w":"Weighted by how the firm is actually funded; (a) reversed the weights, (c) used the beta-1.3 shadow cell."}],
"cf3": [
  {"q":"MM-with-taxes prices leverage's gift as:",
   "o":["VL = VU - tD","VL = VU + t x D - Rs 40L debt at 25% tax adds Rs 10L of shield value; equity holders capture it, which is why cheap-looking debt seduces until distress costs crash the calc","VL = VU (structure never matters)","VL = VU + D"], "a":1,
   "w":"(c) is the tax-free MM world; (a) flips the sign and bankrupts the algebra."},
  {"q":"The correct real-world funding sequence is:",
   "o":["equity, then debt, then accruals","internal accruals, then debt, then equity - accruals carry no signal or banker; debt keeps control and banks the shield; outside equity pays dilution PLUS the adverse-selection whisper (ShopKart's RE then loan path, exact)","debt, then equity, then accruals","equity only when risky"], "a":1,
   "w":"Sequence logic survives every cycle; exceptions need documented reasons (distress, mega-options)."},
  {"q":"A promoter pledging 70% of personal holdings should make an analyst:",
   "o":["bullish - skin in the game","add a spirals test to the checklist: price fall, margin call, forced sale, deeper fall; pledging is leverage ON TOP of leverage, classic India midcap pathology","indifferent - it is personal","ask for collateral"], "a":1,
   "w":"(a) reads commitment where there is compulsion; the spiral is mechanical, not personal."}],
"cf4": [
  {"q":"ShopKart's DCL of 4.59 means a 10% sales dip moves PBT by:",
   "o":["-10%","~-45.9% - the two gears multiply: every sales rupee contributes 29 paise, fixed costs pretend not to notice; 17.7 falls to ~Rs 9.58L","-4.59%","+45.9%"], "a":1,
   "w":"(a) forgets the gears exist; (c) confuses the gear with the result."},
  {"q":"Break-even sales (ex-interest) with fixed Rs 61.2L and CM 29%:",
   "o":["Rs 177L","~Rs 211L - the zero-EBIT watermark; margin of safety (280-211)/280 = 24.6% is the honest headline every lender actually reads","Rs 61.2L","Rs 280L"], "a":1,
   "w":"BE = fixed / CM; options (a) and (c) divided the wrong way."},
  {"q":"The pairing rule says high-DOL industries should run:",
   "o":["high DFL - stack gears","low DFL - a fixed-cost cathedral must not also carry fixed coupons; stacking both gears is how airlines die on schedule, while low-DOL traders can carry debt safely","zero sales growth","high inventory"], "a":1,
   "w":"The entire module in one rule: choose ONE gear to worship, never both."}],
"cf5": [
  {"q":"On ex-date, a Rs 30 share paying a Rs 1 dividend opens near Rs 29 because:",
   "o":["the market hates dividends","cash left the company's drawer and entered yours - a price-drop identity, not punishment; the factory is unchanged minus Rs 1 in the till; reading it as a crash is the classic retail tell","HFTs front-ran it","dividend tax hits at open"], "a":1,
   "w":"Ex-date physics is an identity; sentiment readings of it are comedy."},
  {"q":"A firm with a Rs 55L queue of above-WACC projects and Rs 50L PAT should, by doctrine, pay:",
   "o":["50% payout","roughly zero - payout is the residual of investment policy: retain while spreads are positive, return explicitly what is not needed; retention is a claim that must keep proving itself each year","as much as peers","100% payout"], "a":1,
   "w":"Residual doctrine; (c) is clientele cosplay, (a) is a costume number."},
  {"q":"A 1:1 bonus issue makes shareholders:",
   "o":["twice as rich","exactly as rich - shares double, price halves, reserves re-label as capital with net worth untouched; par-value cosmetics plus liquidity psychology, never value creation","twice as poor","half as rich"], "a":1,
   "w":"Cosmetics legal, mood-lit, value-free; value comes only from spreads x capital."}],
"cf6": [
  {"q":"ShopKart's CCC ~74 days priced at a 12% OD implies cutting 10 days saves yearly:",
   "o":["Rs 0.065L","~Rs 0.65L - each frozen day costs daily-COGS x 12% run-rate, forever; ten saved days is the cheapest PAT on Earth: no customer asked, no sale risked, pure clock-speed","Rs 6.5L","Rs 0.0065L"], "a":1,
   "w":"Clock-speed is a free return stream; (c) misplaced the decimal by one glorious zero."},
  {"q":"The net-benefit template for relaxing credit terms MUST include:",
   "o":["sales growth only","margin gained - incremental funding cost - expected defaults, all three or don't pilot (canon: +6.50 - 0.44 - 0.34 = +Rs 5.7L); single-line sales-vibes pilots rot receivables quietly","competitor behavior","the festive season"], "a":1,
   "w":"Three rows or no pilot; defaults swing the verdict faster than rates do."},
  {"q":"The square-root law EOQ (D=12,000, S=Rs 800, H=Rs 20) lands at:",
   "o":["346 units","980 units - root of (2 x 12,000 x 800 / 20) = root of 960,000; the cost curve is mercifully flat around it, so festivals, perishables and MOQs are judgment-skin over the EOQ skeleton","1,386 units","707 units"], "a":1,
   "w":"(a) halved demand, (c) forgot the divide-by-H, (d) changed the inputs."}],
"cf7": [
  {"q":"ShopKart's DCF pipeline ends: EV Rs 194L - net debt Rs 7L, over 5L shares, per share:",
   "o":["Rs 30.0","~Rs 37.4 - discount the unlevered cash at 12.6%, add the Gordon terminal grown at 3%, strip the debt, divide by claimants; vs the Rs 30 ticker the margin of safety opens IF inputs survive cross-examination","Rs 19.4","Rs 44.2"], "a":1,
   "w":"(a) confused market price with value; (c) is one year's PV, not the pipeline."},
  {"q":"The single most dangerous line in any DCF is:",
   "o":["year-1 revenue","terminal value - 67% of EV here lived inside (WACC - g); demand g at or under GDP, TV/EV under ~75%, and the reinvestment math behind the growth; most valuation crimes are committed in the hereafter","depreciation","WACC itself"], "a":1,
   "w":"The hereafter is where decks go to lie; everything else is small print."},
  {"q":"Choosing between P/E and EV/EBITDA to compare two differently-levered retailers:",
   "o":["P/E - simpler","EV/EBITDA - EV repacks debt into the price and EBITDA strips financing and D&A timing, neutralizing the leverage difference; P/E would crown the high-debt firm 'cheap' because interest ate its visible earnings","EV/Sales - always","P/B - niftiest"], "a":1,
   "w":"Same stores deserve the same clean lens; simplicity that hides leverage is not a feature."}],
"cf8": [
  {"q":"Project A (capex 40, FCFF 12 x 5y, WACC 12.6%) shows NPV +Rs 2.6L, IRR ~15.2%:",
   "o":["reject - margin too thin","accept with monitoring - positive spread is positive value; thinness is a WATCH-LIST instruction (CCC creep, ramp pace), not a rejection reason; IRR 250bp above hurdle covers honest forecast error","accept and forget","reject - IRR < 20%"], "a":1,
   "w":"(a) outsources judgment to a vibe; (c) outsources it to amnesia; (b) is doctrine plus discipline."},
  {"q":"The billboard 'it earns 12.5%, basically at hurdle' is killed by:",
   "o":["billboard ugliness","sub-WACC is sub-WACC - negative spread destroys value at any closeness; equity pays 13.6% for its risk and the deck wants 12.5%; close-romanticism fills CFO desks with compounding regrets","inflation","brand equity wins"], "a":1,
   "w":"Value is spread arithmetic, not grade-school rounding; sub-hurdle is destruction in a tuxedo."},
  {"q":"Funding the expansion with the recallable-any-day OD instead of a term loan would:",
   "o":["save 1% - do it","commit the funding-mismatch felony: 8-year assets on 8-day money, every renewal a coin-flip THROUGH the trough (lenders flee exactly in recessions); match tenor, sleep, then compare rates","be illegal","be tax-efficient"], "a":1,
   "w":"Mismatch first, rate second, always in that order; (a) is how the story starts."}],
"bf1": [
  {"q":"Most harmful money decisions are signed by:",
   "o":["System 2 - too much analysis","System 1 - fast pattern-matching hijacked by a flashing screen; you cannot uninstall it, only refuse it the wheel at decision time (checklists exist to be the bouncer)","bad luck","the demat app"], "a":1,
   "w":"Blame the driver, not the weather; (c) is System 1's favorite alibi."},
  {"q":"Graham's Mr. Market parable teaches that daily price quotes are:",
   "o":["orders","offers from a moody partner - his mood is his problem; your valuation band is your answer; transact only when the quote serves YOUR arithmetic; margin of safety is a doorbell, not a panic alarm","consensus truth","insider signals"], "a":1,
   "w":"(a) and (c) are the retail reflex this course retires permanently."},
  {"q":"Heuristics become harmful specifically in markets because markets supply:",
   "o":["too much data","noisy signals plus delayed feedback plus adversarial counterparties - a compression genius trained on survival fog meets a domain where noise pays randomly; the more intuitive a trade feels, the more audit it deserves","low fees","high returns"], "a":1,
   "w":"Volume of data is not quality of feedback; fog plus flashing lights equals tuition."}],
"bf2": [
  {"q":"The SEBI F&O finding (9-in-10 retail losers, average loss ~Rs 1.1L) is best explained by:",
   "o":["retail stupidity","overconfidence's three faces meeting leverage plus noise: better-than-average entry, precision-fake targets, control illusions - multiplied by churn costs; firmware-correct humans, firmware-hostile arena","broker fraud everywhere","regulation failure"], "a":1,
   "w":"Blame architecture, offer process; contempt and conspiracy both skip the homework."},
  {"q":"A stock 'cheap at Rs 640 because 52-week-high Rs 1,200' is enslaved to:",
   "o":["value investing","an anchor - the high is calendar-written, not value-written; intrinsic says what it says regardless of old quotes; the same bug, weaponized, is the Rs 999 MRP making Rs 599 feel donated","mean reversion law","a quality signal"], "a":1,
   "w":"Reversion happens sometimes, anchoring happens always; the calendar is not an analyst."},
  {"q":"The only cure for hindsight bias that survives memory is:",
   "o":["more experience","the timestamped journal - thesis, numbers, expected range, kill-switch, all inked BEFORE acting; memory redraws charts, ink doesn't, and the journal doubles as your honest hit-rate ledger","meditation","mentor groups"], "a":1,
   "w":"Experience without timestamps becomes older bias, not wiser judgment."}],
"bf3": [
  {"q":"Refusing the +110/-100 coin flip while hugging a -38% loser 'to breakeven' is:",
   "o":["rational prudence","the reflection effect - risk-averse in the gains frame, risk-SEEKING in the losses frame, both pivoted on the buy-price reference; loss aversion (~2.25x) is the same engine in both costumes; pros pre-commit because intuition flips at zero","proof markets are rigged","a diversification error"], "a":1,
   "w":"One bug, two costumes, one reference point; rules beat reflexes at zero-crossings."},
  {"q":"A '1% of AUM fee' pitch must be reframed before judging because:",
   "o":["percentages are lies","frames change verdicts on identical facts - the absolute math (Rs 25,000/yr on Rs 25L, compounding to lakhs over decades) plus the gain/loss costume check is the 90-second anti-marketing protocol; compute the invoice, not the costume","SEBI bans it","agents overcharge"], "a":1,
   "w":"Frames are legal anesthesia; absolutes and re-labeling are the surgery-light."},
  {"q":"The sunk-cost protocol's deciding question is:",
   "o":["how much did I pay?","would I buy it TODAY at today's price with today's information? - yes: hold or add by thesis; no: exit and bank the salvage; the receipt is history's invoice, not tomorrow's asset; every breakeven-exit plan is a shrine, not a strategy","what does the group think?","did it beat the Nifty?"], "a":1,
   "w":"(a) is the shrine, (c) is availability wearing a social costume."}],
"bf4": [
  {"q":"Drawdown arithmetic: a 2x-leveraged book taking a market -30% leaves equity needing, just to recover:",
   "o":["+30%","+150% - leverage doubled the wound to -60% on equity; recovery = 60/40; this computation, done BEFORE trading, converts risk appetite from a vibe into a sizing law (f/(1-f) never forgives)","+60%","+130%"], "a":1,
   "w":"Recovery is f/(1-f) on the SURVIVING base; leverage edits the base, brutally."},
  {"q":"The five-stage anatomy's euphoria fingerprints include:",
   "o":["insiders buying, media silent","mutated valuation language (eyeballs/paradigm), retail flooding with grey-market sparkle, leverage joining the guests, and lock-in expiries sitting on the calendar like scheduled stage-4 alarms; the costume changes every decade, the anatomy doesn't","CFO-led prudence","low retail interest"], "a":1,
   "w":"(a) and (c) are stage-4/5 weather; learn to read stage-3 skies before flying investments in them."},
  {"q":"Anomalies worth respecting share which trait:",
   "o":["biggest backtest fit","a stubborn BEHAVIORAL engine underneath (career-cover herding, loser-affection, patience scarcity) plus exploitation that stays painful - because pure screen-arbitrage dies by crowding, and subscriptions to its corpse get sold to you","formula complexity","regulator endorsement"], "a":1,
   "w":"Mechanisms outlive spreadsheets; the rest is marketing with Greek letters."}],
"bf5": [
  {"q":"The 7-gate checklist works primarily because it:",
   "o":["improves stock picks magically","removes negotiation between System 1 and the moment - each gate targets a named bias (base rate vs availability, disconfirm vs confirmation, journal vs hindsight), and any two blank means NO TRADE; laminated cards out-argue adrenaline","impresses employers","boosts IQ"], "a":1,
   "w":"Gates are bouncers, not oracles; pick quality is research, behavior quality is the card."},
  {"q":"SIP-as-commitment works (beyond averaging) because it:",
   "o":["times the market better","makes the good behavior AUTOMATIC and the sabotage effortful - purchase happens with no mood vote, volatility becomes a discount calendar (125 units at NAV 40 vs 83 at 60), and pausing becomes a written, reviewable act instead of a stage-3 reflex","guarantees returns","insures the NAV"], "a":1,
   "w":"Systems outperform moods; averaging is the dividend, automation is the factory."},
  {"q":"Position-size law's deepest function is:",
   "o":["maximizing CAGR","buying the right to be wrong repeatedly without dying - account-level caps (5% stock, 20% sector, sealed explore sleeve, leverage at or under 1.2x) survive every other bias failing at once; amputation math (-50 needs +100) can't be outsmarted, only sized around","SEBI compliance only","picking winners"], "a":1,
   "w":"Courage is a mood; caps are concrete; concrete outlasts mood in every drawdown on record."}],
"bf6": [
  {"q":"ProfitPrem's ~Rs 1.9L tuition on a churned Rs 6L year decomposes mostly into:",
   "o":["bad luck and slippage","already-named biases priced individually - herding into pops, house-money F&O, sunk-cost averaging, mood-paused SIPs - each with an invoice AND a gate that would have blocked it; 'unlucky' fails the receipt test when the mechanism is this legible","market manipulation","exchange outages"], "a":1,
   "w":"Legibility is the course's point: mechanisms first, receipts second, excuses never."},
  {"q":"The IPS annual-amendment + 30-day-cool rule exists because:",
   "o":["paperwork is fun","rules drafted in stage-1 calm get lobbied by stage-3 adrenaline - a constitution must refuse same-week amendments; flexibility is how discipline dies in fancy dress, so amendments wait their calendar while stays hold their line","SEBI requires it","tax planning"], "a":1,
   "w":"Constitutions out-argue adrenaline precisely because they arrived earlier, in writing."},
  {"q":"The best answer-spine for 'What is your biggest bias?':",
   "o":["'I read a lot, mostly cured'","name, invoice, gate - 'availability cost me a paused SIP (~Rs 38k opportunity); 24h cooling plus base-rate lookup now gate every urge' - self-awareness with RECEIPTS and MECHANISM beats every confident shrug in interview history","'I have none left'","'I meditate'"], "a":1,
   "w":"(a) and (c) are overconfidence's encore; receipts are graduation."}],
"m10": ['''
rep('"m10": [', QUIZ)

open(dst, "w", encoding="utf-8").write(t)
print("WROTE", dst, len(t), "bytes")
