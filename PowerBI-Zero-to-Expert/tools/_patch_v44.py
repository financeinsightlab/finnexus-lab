#!/usr/bin/env python3
# Patch build_app_v43.py -> build_app_v44.py : + Fixed Income (fi1..fi8) + Indian Market (in21..in27)
import os
BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = os.path.join(BASE, "tools", "build_app_v43.py")
dst = os.path.join(BASE, "tools", "build_app_v44.py")
t = open(src, encoding="utf-8").read()

def rep(old, new, n=1):
    global t
    c = t.count(old)
    assert c == n, f"anchor count {c} != {n} for: {old[:70]!r}"
    t = t.replace(old, new)

rep('OUT = os.path.join(BASE, "PowerBI_Course_App_v43.html")',
    'OUT = os.path.join(BASE, "PowerBI_Course_App_v44.html")')

NEW_SECTIONS = '''
FI_SECTIONS = [
    ("FI_01_Bond_Anatomy.md", "fi1", "FI1 · Bond Anatomy", "\\U0001F9EC", "FV/coupon/YTM, accrued 29.84 vs 30.00, clean vs dirty, tribes"),
    ("FI_02_Price_Yield_Seesaw.md", "fi2", "FI2 · The Price-Yield See-Saw", "\\U0001F3A2", "canon table 1000/961.10/1084.25, asymmetry, RBI chain"),
    ("FI_03_Duration_Convexity.md", "fi3", "FI3 · Duration & Convexity", "\\U0001F4CF", "MacD 4.312, ModD 3.993, conv 21.05, pred 961.13"),
    ("FI_04_Yield_Curve_RBI.md", "fi4", "FI4 · Yield Curve & the Central Bank", "\\U0001F4C8", "shapes, forwards 8.1%, term premium, roll-down, NIM"),
    ("FI_05_GSec_Deep_Dive.md", "fi5", "FI5 · Government Securities Deep Dive", "\\U0001F3DB\\uFE0F", "T-bill 98.40 to 6.52%, auctions, Retail Direct, 3 risks"),
    ("FI_06_Corporate_Bonds_Spreads.md", "fi6", "FI6 · Corporate Bonds & Credit Spreads", "\\U0001F4B3", "spread ladder, twin engines, 25-year default ledger"),
    ("FI_07_Portfolio_Engineering.md", "fi7", "FI7 · Bond Portfolio Engineering", "\\U0001F3D7\\uFE0F", "ladders, barbells, immunization Rs 40L lock, ModD dial"),
    ("FI_08_Capstone_Bond_Desk.md", "fi8", "FI8 · CAPSTONE: The Bond Desk", "\\U0001F3C6", "Rs 50L book, YTM 7.524%, ModD 5.218, two storms, forge"),
]

IN2_SECTIONS = [
    ("IN2_01_Market_Machine.md", "in21", "IN2 1 · The Market Machine", "\\u2699\\uFE0F", "order to demat, CCP novation, T+1, order types, circuits"),
    ("IN2_02_SEBI_Rulebook.md", "in22", "IN2 2 · SEBI & the Rulebook", "\\u2696\\uFE0F", "1992 origin, UPSI presumption, SAT/SCORES, F&O guardrails"),
    ("IN2_03_Indices_Money_Flows.md", "in23", "IN2 3 · Indices & the Money Flows", "\\U0001F4CA", "divisor doctrine, Sensex 800x, SIP Rs 25k Cr bid, tribes"),
    ("IN2_04_IPOs_Listings.md", "in24", "IN2 4 · IPOs & Listings", "\\U0001F4DC", "DRHP drill, quotas, anchors, OFS 90%, pop discipline"),
    ("IN2_05_Taxes_Cost_Stack.md", "in25", "IN2 5 · Taxes & the Cost Stack", "\\U0001F4B8", "STCG 20% / LTCG 12.5%, note Rs 1,50,202.47, set-offs"),
    ("IN2_06_Retail_Playbook.md", "in26", "IN2 6 · The Retail Playbook", "\\U0001F9ED", "drag Rs 15.84L, SIP step-ups, ladder, scam checklist"),
    ("IN2_07_Capstone_India_Desk.md", "in27", "IN2 7 · CAPSTONE: The India Desk", "\\U0001F3C6", "Priya desk: 70/25/5 engine, note audit, IPS signed, forge"),
]
'''
rep('    ("FA_07_Capstone_Full_Autopsy.md", "fa7", "FA7 · CAPSTONE: The Full Company Autopsy", "\\U0001F3C6", "ShopKart one-pager, FruitCart 7-flag courtroom, duel verdicts"),\n]\n',
    '    ("FA_07_Capstone_Full_Autopsy.md", "fa7", "FA7 · CAPSTONE: The Full Company Autopsy", "\\U0001F3C6", "ShopKart one-pager, FruitCart 7-flag courtroom, duel verdicts"),\n]\n' + NEW_SECTIONS)

rep(' + DV_SECTIONS + FA_SECTIONS\n', ' + DV_SECTIONS + FA_SECTIONS + FI_SECTIONS + IN2_SECTIONS\n')

rep('"ac": [], "cf": [], "bf": [], "dv": [], "fa": []}',
    '"ac": [], "cf": [], "bf": [], "dv": [], "fa": [], "fi": [], "in2": []}')
rep('"ac": 0, "cf": 0, "bf": 0, "dv": 0, "fa": 0}',
    '"ac": 0, "cf": 0, "bf": 0, "dv": 0, "fa": 0, "fi": 0, "in2": 0}')

rep('    if sid == "fa1":\n        _gcur = "fa"\n',
    '    if sid == "fa1":\n        _gcur = "fa"\n    if sid == "fi1":\n        _gcur = "fi"\n    if sid == "in21":\n        _gcur = "in2"\n')

rep('    ("fa",    "📊 Financial Statement Analysis", "fin"),\n',
    '    ("fa",    "📊 Financial Statement Analysis", "fin"),\n    ("fi",    "🛡️ Fixed Income", "fin"),\n    ("in2",   "🇮🇳 Indian Market", "fin"),\n')

rep('NEW! 📒 Accounting · 🏦 Corporate Finance · 🧠 Behavioural Finance · 📉 Derivatives · 📊 Financial Statement Analysis — from journal entries to trading desks and forensic autopsies!)',
    'NEW! 📒 Accounting · 🏦 Corporate Finance · 🧠 Behavioural Finance · 📉 Derivatives · 📊 Financial Statement Analysis · 🛡️ Fixed Income · 🇮🇳 Indian Market — from journal entries to bond desks and the full Indian market machine!)')
rep(' · 735 auto-graded quiz questions · ShopKart', ' · 780 auto-graded quiz questions · ShopKart')

rep('<div class="stat"><b data-count="245">0</b><span>Sections</span></div>',
    '<div class="stat"><b data-count="260">0</b><span>Sections</span></div>')
rep('<div class="stat"><b data-count="241">0</b><span>Hands-on labs</span></div>',
    '<div class="stat"><b data-count="256">0</b><span>Hands-on labs</span></div>')
rep('<div class="stat"><b data-count="735">0</b><span>Quiz questions</span></div>',
    '<div class="stat"><b data-count="780">0</b><span>Quiz questions</span></div>')

rep(' 245 sections across 39 courses: ',
    ' 260 sections across 41 courses: ')
rep('Accounting, Corporate Finance, Behavioural Finance, Derivatives & Financial Statement Analysis (incl.',
    'Accounting, Corporate Finance, Behavioural Finance, Derivatives, Financial Statement Analysis, Fixed Income & Indian Market (incl.')

QUIZ = '''"fi1": [
  {"q":"Alpha Infra's Rs 90 coupon with the bond trading at Rs 940 means its current yield is:",
   "o":["exactly 9.00%","9.57% - 90/940; the same Rs 90 on a cheaper ticket, while YTM adds the pull-to-par on top; coupon is the contract, current yield is the counter, YTM is the truth","8.43%","10.44%"], "a":1,
   "w":"(c) inverted the fraction; (a) forgot the price moved."},
  {"q":"A bond trades at par precisely when:",
   "o":["markets are calm","YTM equals the coupon rate - the discount engine at coupon-speed hands back exactly face value; above par means required yield is BELOW coupon, below par means above; the see-saw is exact, not psychological","the issuer is AAA","coupon is zero"], "a":1,
   "w":"AAA is a credit statement, not a pricing law."},
  {"q":"Clean Rs 985 + accrued Rs 45 (30/360, half-year held) settles at:",
   "o":["Rs 985","Rs 1,030 - the buyer pays the seller's earned half-coupon tonight and recovers it inside the next full Rs 90 courier; dirty is the real cash invoice, clean is just the quotable one","Rs 940","Rs 1,075"], "a":1,
   "w":"Accrued is real money owed at settlement."}],
"fi2": [
  {"q":"RBI hikes and your canon bond's yield moves 8% to 9%. Price lands at:",
   "o":["Rs 980.55","Rs 961.10 (-3.89%) - 311.17 coupons + 649.93 principal; the see-saw is arithmetic, not sentiment; the table lives in FI2 for a reason","Rs 943.34","Rs 920.10"], "a":1,
   "w":"Rebuild the cell: annuity 3.8897 x 80 + PV 0.6499 x 1000."},
  {"q":"Yields -2% vs +2% on the same bond shows +8.42% vs -7.58% because:",
   "o":["SEBI cushions falls","the price curve bends (convexity): far cash flows compound-gain more on yield drops than they discount-lose on rises - the holder's secret structural kindness, priced in FI3","coupons auto-reinvest","FDs compete away losses"], "a":1,
   "w":"Geometry, not regulation; shorts pay it, holders collect it."},
  {"q":"A hold-to-maturity investor with sound credit sees yields jump 1%. Her correct reaction:",
   "o":["sell before more damage","nothing changed about her contracted cash flows; the MTM dip is weather and arriving coupons now reinvest RICHER - the true risk she manages is credit, not the see-saw","convert everything to equity","write to SEBI"], "a":1,
   "w":"Selling converts weather into a realized loss at the trough."}],
"fi3": [
  {"q":"The canon bond (MacD 4.312 at y 8%) carries modified duration:",
   "o":["4.312","3.993 - divided by (1+y): Macaulay is the clock, modified is the damage meter, meaning +1% yields cost about -3.99% price","4.634","2.156"], "a":1,
   "w":"4.312 / 1.08 = 3.993; the desk quotes modified."},
  {"q":"Convexity 21.05 predicts +1% at -3.887% and the market prints -3.890%. The lesson:",
   "o":["duration failed","duration + convexity nails big moves within paise (961.13 predicted vs 961.10 actual) - duration is the straightedge, convexity the curve's confessed bend","convexity failed","models are useless"], "a":1,
   "w":"Two paise of error on a 1% shock: that is a corrected model."},
  {"q":"The twitchiest bond in any room is usually:",
   "o":["short maturity, fat coupon","long maturity, low coupon - cash gravity parked farthest out, so every rate step compounds against deeper money; zero-coupons are the extreme: duration EQUALS maturity","the AAA one","the floating one"], "a":1,
   "w":"Gravity distance rules; credit rating changes default risk, not rate physics."}],
"fi4": [
  {"q":"With 1y = 7.0% and 2y = 7.6% (premium ~10bp), the implied next-year 1y is:",
   "o":["7.3%","about 8.1% - 15.2 minus 7.0 minus 0.1: the curve publishes the crowd's hike forecast for free; a borrower ignoring it buys optimism at retail","7.0%","6.9%"], "a":1,
   "w":"The forward is the curve's opinion, priced."},
  {"q":"An inverted curve (short yields ABOVE long) is taken seriously mainly because:",
   "o":["SEBI mandates warnings","it is a money-backed bet that today's tight policy gets cut into tomorrow's slowdown - long buyers accept less yield NOW expecting far less LATER; the bet genuinely precedes slowdowns","banks like flat margins","rating agencies demand it"], "a":1,
   "w":"Flat curves squeeze banks - (c) is backwards."},
  {"q":"RBI's firmest grip on the curve sits at:",
   "o":["the 30-year point","the overnight-91-day short end - the repo corridor arbitrage-pins short money to policy while the long end floats free as the market's essay on the future","the 10y benchmark auction","SDL spreads"], "a":1,
   "w":"The corridor owns the short end; credibility owns the rest."}],
"fi5": [
  {"q":"A 91-day T-bill at Rs 98.40 annualizes to:",
   "o":["6.29%","6.52% - 1.60 earned on the 98.40 PAID scaled 365/91: discount instruments quote price, professionals answer in yield, and the PAID-price base is where rookies slip","6.52% earned on Rs 100","1.63%"], "a":1,
   "w":"(a) used 100 as base - the classic error."},
  {"q":"Zero-default-risk G-Secs still carry:",
   "o":["no risks worth naming","price (MTM/duration), reinvestment, and inflation risk - the sovereign kills the default question so the other three can be heard; a 10y gilt's ModD ~7 marks -7% in a +1% cycle","only liquidity risk","currency risk only"], "a":1,
   "w":"Safest paper in India once printed a -4% year."},
  {"q":"For a Rs 5L goal exactly 3 years away, the strongest sovereign-leaning choice is:",
   "o":["open gilt fund ModD 6.8","a 3-year target-maturity fund (or direct 3y gilts) - horizon locked to duration, roll-down working FOR you, cost near zero; the ModD 6.8 fund is a rate bet strapped to a house booking","364-day T-bill rolled yearly","equity hybrid fund"], "a":1,
   "w":"Match duration to horizon first, minimize cost second."}],
"fi6": [
  {"q":"An AA- NCD's 2.4% spread pays Rs 24,000/yr on Rs 10L; one default at 60% LGD confiscates:",
   "o":["2 years of spread","25.0 years of spread - Rs 6,00,000 of principal against Rs 24,000 of annual rent: credit is priced by survival-and-recovery across the book, never by the coupon's smile","6 years of spread","9 years of spread"], "a":1,
   "w":"600,000 / 24,000 = 25.0 exactly; the cold ledger."},
  {"q":"Zenith Ports (ModD 4.0) in a week of G-Sec -20bp and spread +150bp prints roughly:",
   "o":["+0.8%","-5.2% net - the rate engine gifted +0.8% while the spread engine billed -6.0%: corporate bonds answer to TWO dials and the fear dial can override the RBI dial in a week","-1.5%","-3.2%"], "a":1,
   "w":"Twin engines, opposite signs; fear won the week."},
  {"q":"A secured AA 9.4% NCD, issuer CFO-negative, stale solo rating, Rs 8Cr issue:",
   "o":["buy for the security cover","pass - the checklist runs security AFTER cash engine, rating quality and liquidity: 3 of 6 flags failed means 9.4% is a dare dressed as yield; coupons are read last","buy small for diversification","buy on dips"], "a":1,
   "w":"Order discipline IS the credit skill."}],
"fi7": [
  {"q":"Your 5-rung ladder shows ModD 2.66. A parallel +50bp prints about:",
   "o":["-2.66%","-1.33% - half the shift times the book's dial; the ladder's design promise: weather exists, disasters do not, because no single rate season anchors the story","-0.66%","-5.32%"], "a":1,
   "w":"(a) forgot the shift size; (c) halved twice."},
  {"q":"Immunizing a Rs 40L 6-year liability works because:",
   "o":["gilt funds guarantee returns","matching asset ModD (~6) to liability distance makes price risk and reinvestment risk trade punches - the lock is mechanical, re-keyed yearly as durations drift","the liability is nominal","RBI backstops it"], "a":1,
   "w":"Guarantees live in duration-matching, not on factsheets."},
  {"q":"A 60/40 spine-muscle book (ModD 4.0 and 3.2) runs a dial of:",
   "o":["2.4","3.68 - 0.6x4.0 + 0.4x3.2: the weighted dial is the one number committees ask pre-trade, so +1% prints (-3.68%) were agreed before occurring","7.2","3.6"], "a":1,
   "w":"Dials average; they never add."}],
"fi8": [
  {"q":"The canon Rs 50L book's portfolio YTM and dial are:",
   "o":["7.1% and 6.5","7.524% and 5.218 - holding-weighted across all five sleeves (income Rs 3,76,200, slack Rs 26,200 over mandate); desks are audited on weighted numbers, never the best sleeve","8.2% and 4.2","7.0% and 5.0"], "a":1,
   "w":"(a) is just the spine; (c) is just the AAA basket."},
  {"q":"The +1% shock and the AA default cost, respectively:",
   "o":["-Rs 5L and -Rs 3L","-Rs 2.61L MTM (8.3 months of income, healing via pull-to-par plus richer reinvestment) and -Rs 1.8L realized (5.7 months; survivable only because the 6% single-name cap was law)","-Rs 1.0L and -Rs 2.6L","-Rs 3.9L and -Rs 0.9L"], "a":1,
   "w":"Both figures were pre-signed at onboarding - a desk, not a prayer."},
  {"q":"The strongest defence of the Rs 5L liquid buffer at 6.3% is:",
   "o":["it keeps the factsheet green","Rs 9,500/yr of explicit drag bought dry powder that rebuilt income at +250bp spreads - insurance priced as a small known loss to fund a large timed opportunity","liquid funds are tax-free","SEBI requires it"], "a":1,
   "w":"4.6x payback in one repair season."}],
"in21": [
  {"q":"Your shares legally live at:",
   "o":["the broker","the depository (NSDL/CDSL) as a ledger entry in YOUR demat - brokers are access pipes, exchanges match engines, clearing corps guarantors; a broker's death interrupts trading for days, ownership for zero minutes","the exchange","the RBI"], "a":1,
   "w":"The vault question is the first question of market structure."},
  {"q":"Full T+1 settlement in India (January 2023) mainly bought investors:",
   "o":["lower taxes","less counterparty exposure and faster capital turnaround - first major market on earth to do it; money and shares exchange next evening and margin locked in the system shrinks","higher brokerages","more IPOs"], "a":1,
   "w":"Settlement compression is risk compression."},
  {"q":"A stock locked at the 20% lower price band is best described as:",
   "o":["illegal to trade","tradeable ONLY at the band floor and only if a buyer arrives - brakes stop the cascade AND your exit; position sizing decided before the news is the only protection","halted for the quarter","delisted"], "a":1,
   "w":"Lower-circuit mornings are sizing exams set long before exam day."}],
"in22": [
  {"q":"Modern insider-trading law bites hardest because:",
   "o":["SEBI reads private chats","possession of UPSI by a connected person creates a rebuttable presumption of guilt - the practical burden flips, so process (windows, pre-clearance, trading plans) is the only real defence","insiders must disclose salary","SAT never upholds SEBI"], "a":1,
   "w":"Innocence must be PROVABLE, not felt."},
  {"q":"The right first escalation for a wrong square-off with an emailed admission is:",
   "o":["consumer court","broker desk in writing, then SCORES with contract notes and the admission, then exchange arbitration for the money - the ladder works when rungs are climbed in order with paper","social media outrage","a police FIR first"], "a":1,
   "w":"SEBI polices conduct; arbitration writes cheques."},
  {"q":"SEBI's F&O guardrails (bigger lots, fewer expiries) formalize which doctrine?",
   "o":["banning retail risk entirely","reprice friction so only capital-serious participants remain - the study said 9-in-10 retail lose about Rs 1.1L on average; since 1992: measure the carnage, raise the ante, shrink the casino, recalibrate","boosting exchange volumes","matching US rules"], "a":1,
   "w":"Friction as consumer protection - same instinct that banned badla."}],
"in23": [
  {"q":"When a NIFTY stock does a 2:1 split, the index divisor:",
   "o":["doubles immediately","is untouched - price halves, shares double, free-float cap self-cancels; the divisor moves only where cap math doesn't (composition swaps, bonus/rights) so the series moves ONLY on real price moves","halves immediately","rises 5%"], "a":1,
   "w":"Market-cap math self-neutralizes splits."},
  {"q":"The deepest change in India's crash-resilience since the 2010s is:",
   "o":["more FIIs","the SIP bid - Rs 25,000+ Cr/month of sticky, date-driven domestic buying absorbing FII exits; rented foreign money no longer sets the floor alone","faster exchanges","more trading holidays"], "a":1,
   "w":"Stickiness beats depth at panic o'clock."},
  {"q":"Passive index funds add the new NIFTY inclusion:",
   "o":["when they judge it cheap","at the cutoff, in exact index weights - no opinion, pure obedience; that mechanical bid creates the inclusion-week pop and the post-cutoff give-back","gradually over months","only on green days"], "a":1,
   "w":"Rules, not views; both the cost advantage and the footprint."}],
"in24": [
  {"q":"OFS-heavy IPOs (90% offer-for-sale) primarily mean:",
   "o":["the company gets growth capital","insiders are exiting at the discovered price - 90 paise of every bid-rupee goes to promoter/PE pockets; the thesis must justify buying what officers professionally sell at max-band optimism","SEBI rejected the fresh issue","anchors demanded it"], "a":1,
   "w":"Follow the money: fresh feeds factories, OFS feeds founders."},
  {"q":"NII subscription of 190x mostly reflects:",
   "o":["190x genuine demand","leveraged IPO financing that unwinds at allotment - paper demand theatre; the muscle metric is REAL QIB money, slow and fully-paid","smart retail","anchor conversions"], "a":1,
   "w":"3-day financing is weather, not climate."},
  {"q":"A disciplined listing-pop trade requires:",
   "o":["conviction in the brand","pre-sized lottery framing with a pre-written exit rule (sell at pop or hard stop at issue) - riding it without an FA7 thesis converts a lottery win into an unexamined position at peak crowd","the biggest application possible","grey-market tips"], "a":1,
   "w":"Discipline before the open; size is the only real edge."}],
"in25": [
  {"q":"A Rs 3L equity gain realized at 15 months (your only trade) is taxed at:",
   "o":["20% on all of it","Rs 21,875 + cess - LTCG honours the Rs 1.25L exemption first, then 12.5%: 3 months of patience past the 12-month line was worth Rs 38,125 vs the STCG version","10% over Rs 1L","zero always"], "a":1,
   "w":"(c) is the pre-2024 ghost; the date line moves rates."},
  {"q":"The canon contract note (Rs 1.5L buy) proves which doctrine?",
   "o":["STT is the only real cost","your break-even is buy price PLUS both trips' tolls (~0.26-0.30% round-trip delivery) - six small lines totalling Rs 202.47 that no screen flashes","GST applies on full trade value","stamp duty is negotiable"], "a":1,
   "w":"Toll arithmetic before alpha arithmetic."},
  {"q":"STCL of Rs 45,000 with LTCG of Rs 50,000 in the same year means:",
   "o":["losses cancel salary","set-off leaves Rs 5,000 LTCG (under exemption, near-zero tax), and unabsorbed loss carries 8 years ONLY if the ITR is filed by the due date - losses are assets with expiry rules","STCL dies instantly","LTCG becomes tax-free forever"], "a":1,
   "w":"Belated returns euthanize the carry-forward."}],
"in26": [
  {"q":"Rs 10L for 20 years at 12% gross: direct (TER ~0.1%) vs regular (~1.1%) leaves:",
   "o":["about the same","Rs 96.46L vs Rs 80.62L - Rs 15.84L, a 158%-of-principal tribute delivered one invisible basis-point at a time; fees compound exactly like returns, except their owner is not you","Rs 86L vs Rs 84L","Rs 90L vs Rs 89L"], "a":1,
   "w":"(c) is the marketing-brochure version of the same theft."},
  {"q":"A tips group claiming 90% accuracy, SEBI-registered WZ1234 gets neutralized by:",
   "o":["asking their office address","verifying the registration on SEBI's own portal plus demanding the AUDITED net record plus calling via the official listed number - fraud collapses at independent verification","negotiating fees down","reading their testimonials"], "a":1,
   "w":"The verification triad; honest RAs welcome the drill."},
  {"q":"The most underrated wealth lever in a 20-year SIP plan is:",
   "o":["catching the bottom","the +10%/yr step-up - salary-linked contribution growth beats hours of fund-picking (Rs 3.4Cr+ class vs Rs 1.98Cr flat); you cannot research past an engine you refused to refuel","weekly rebalancing","sector rotation"], "a":1,
   "w":"Contributions scale with you; edges do not scale with hours."}],
"in27": [
  {"q":"Priya's correct order of operations is:",
   "o":["IPO first, cover later","protection, then emergency stack, then investing engine, then speculation sleeve - every inversion converts a fixable shock into a liquidation at market-bottom prices","SIP and tips in parallel","stocks first for alpha"], "a":1,
   "w":"Sequence is strategy; the pyramid stands or falls in order."},
  {"q":"Her 100-share buy at Rs 1,500 settles at Rs 1,50,202.47 because:",
   "o":["broker added hidden fees","six statutory stack lines (STT 150 + stamp 22.50 + brokerage 20 + txn 5.25 + SEBI 0.15 + GST 4.57) make effective price Rs 1,502.02 - the note is the machine's receipt","STT is 1%","GST ate the rest"], "a":1,
   "w":"Auditing line-by-line is the cheapest professional habit."},
  {"q":"The single engine-killer the IPS welds shut is:",
   "o":["picking the wrong flexicap","the SIP pause button in a -20% tape - interruptions of compounding outweigh every other retail error combined, so the document outranks the mood","choosing direct over regular","skipping one rebalancing"], "a":1,
   "w":"Fund choice tunes the engine; the weld keeps it running."}],
'''

rep('"m10": [', QUIZ + '"m10": [')

open(dst, "w", encoding="utf-8").write(t)
print("patched ->", dst, len(t), "bytes")
