#!/usr/bin/env python3
# Patch build_app_v44.py -> build_app_v45.py : + Economics (ec1..ec7) + Portfolio Management (pm1..pm7)
import os
BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = os.path.join(BASE, "tools", "build_app_v44.py")
dst = os.path.join(BASE, "tools", "build_app_v45.py")
t = open(src, encoding="utf-8").read()

def rep(old, new, n=1):
    global t
    c = t.count(old)
    assert c == n, f"anchor count {c} != {n} for: {old[:70]!r}"
    t = t.replace(old, new)

rep('OUT = os.path.join(BASE, "PowerBI_Course_App_v44.html")',
    'OUT = os.path.join(BASE, "PowerBI_Course_App_v45.html")')

NEW_SECTIONS = '''
EC_SECTIONS = [
    ("EC_01_Micro_Foundations.md", "ec1", "EC1 · Micro Foundations", "\\u2696\\uFE0F", "opportunity cost, margins, elasticity 0.8, pricing power"),
    ("EC_02_Market_Structures.md", "ec2", "EC2 · Market Structures & the Firm", "\\u265F\\uFE0F", "MR=MC, DWL Rs 800, oligopoly chess, Jio dilemma"),
    ("EC_03_Macro_Scoreboard.md", "ec3", "EC3 · The Macro Scoreboard", "\\U0001F4CA", "GDP 3 ways, real 6.5, CPI vs WPI, jobs triangle"),
    ("EC_04_Money_Banking_Inflation.md", "ec4", "EC4 · Money, Banking & Inflation", "\\U0001F4B5", "multiplier 20x, RBI toolkit, engine diagnosis, half-lives"),
    ("EC_05_Fiscal_Policy_Budget.md", "ec5", "EC5 · Fiscal Policy & the Budget", "\\U0001F3DB\\uFE0F", "4 deficits, multiplier 2x, crowding out, g-r test"),
    ("EC_06_External_Sector_Rupee.md", "ec6", "EC6 · External Sector & the Rupee", "\\U0001F4B1", "BoP, CAD -2%, REER, reserves armor, hedge doctrine"),
    ("EC_07_Capstone_Macro_Desk.md", "ec7", "EC7 · CAPSTONE: The Macro Desk", "\\U0001F3C6", "regime grid, lead-lag ladder, tilts, desk note, forge"),
]

PM_SECTIONS = [
    ("PM_01_Diversification_Free_Lunch.md", "pm1", "PM1 · Diversification: The Free Lunch", "\\U0001F37D\\uFE0F", "sigma 15.33 vs 19, rho<1 law, crisis manners, layers"),
    ("PM_02_Risk_Return_Foundations.md", "pm2", "PM2 · Risk & Return Foundations", "\\U0001F4CF", "AM 15 vs GM 13.5, drag formula, Sharpe debut, MDD"),
    ("PM_03_CAPM_Beta.md", "pm3", "PM3 · CAPM & Beta", "\\U0001F4C8", "beta cards, SML 13.5, alpha 4 taxes, Ke bridge"),
    ("PM_04_Efficient_Frontier_Asset_Allocation.md", "pm4", "PM4 · Efficient Frontier & Allocation", "\\U0001F5FA\\uFE0F", "bullet, CAL, two-fund, Brinson 90%, glides"),
    ("PM_05_Performance_Tribunal.md", "pm5", "PM5 · The Performance Tribunal", "\\u2696\\uFE0F", "Sharpe/Sortino/Treynor/IR 0.5/Calmar, fraud audit"),
    ("PM_06_Rebalancing_Machine.md", "pm6", "PM6 · The Rebalancing Machine", "\\u2699\\uFE0F", "drift canon 76.4, bands Rs 9.2L trim, flow-first"),
    ("PM_07_Capstone_Portfolio_Desk.md", "pm7", "PM7 · CAPSTONE: The Portfolio Desk", "\\U0001F3C6", "3 lives, Rs 19.3Cr engine, 50y SWP, IPS law, forge"),
]
'''
rep('    ("IN2_07_Capstone_India_Desk.md", "in27", "IN2 7 · CAPSTONE: The India Desk", "\\U0001F3C6", "Priya desk: 70/25/5 engine, note audit, IPS signed, forge"),\n]\n',
    '    ("IN2_07_Capstone_India_Desk.md", "in27", "IN2 7 · CAPSTONE: The India Desk", "\\U0001F3C6", "Priya desk: 70/25/5 engine, note audit, IPS signed, forge"),\n]\n' + NEW_SECTIONS)

rep(' + FI_SECTIONS + IN2_SECTIONS\n', ' + FI_SECTIONS + IN2_SECTIONS + EC_SECTIONS + PM_SECTIONS\n')

rep('"dv": [], "fa": [], "fi": [], "in2": []}',
    '"dv": [], "fa": [], "fi": [], "in2": [], "ec": [], "pm": []}')
rep('"dv": 0, "fa": 0, "fi": 0, "in2": 0}',
    '"dv": 0, "fa": 0, "fi": 0, "in2": 0, "ec": 0, "pm": 0}')

rep('    if sid == "in21":\n        _gcur = "in2"\n',
    '    if sid == "in21":\n        _gcur = "in2"\n    if sid == "ec1":\n        _gcur = "ec"\n    if sid == "pm1":\n        _gcur = "pm"\n')

rep('    ("in2",   "🇮🇳 Indian Market", "fin"),\n',
    '    ("in2",   "🇮🇳 Indian Market", "fin"),\n    ("ec",    "🌍 Micro & Macro Economics", "fin"),\n    ("pm",    "🧺 Portfolio Management", "fin"),\n')

rep('NEW! 📒 Accounting · 🏦 Corporate Finance · 🧠 Behavioural Finance · 📉 Derivatives · 📊 Financial Statement Analysis · 🛡️ Fixed Income · 🇮🇳 Indian Market — from journal entries to bond desks and the full Indian market machine!)',
    'NEW! 📒 Accounting · 🏦 Corporate Finance · 🧠 Behavioural Finance · 📉 Derivatives · 📊 Financial Statement Analysis · 🛡️ Fixed Income · 🇮🇳 Indian Market · 🌍 Economics · 🧺 Portfolio Management — from journal entries to macro desks and three lives on the portfolio table!)')
rep(' · 780 auto-graded quiz questions · ShopKart', ' · 822 auto-graded quiz questions · ShopKart')

rep('<div class="stat"><b data-count="260">0</b><span>Sections</span></div>',
    '<div class="stat"><b data-count="274">0</b><span>Sections</span></div>')
rep('<div class="stat"><b data-count="256">0</b><span>Hands-on labs</span></div>',
    '<div class="stat"><b data-count="270">0</b><span>Hands-on labs</span></div>')
rep('<div class="stat"><b data-count="780">0</b><span>Quiz questions</span></div>',
    '<div class="stat"><b data-count="822">0</b><span>Quiz questions</span></div>')

rep(' 260 sections across 41 courses: ',
    ' 274 sections across 43 courses: ')
rep('Accounting, Corporate Finance, Behavioural Finance, Derivatives, Financial Statement Analysis, Fixed Income & Indian Market (incl.',
    'Accounting, Corporate Finance, Behavioural Finance, Derivatives, Financial Statement Analysis, Fixed Income, Indian Market, Economics & Portfolio Management (incl.')

QUIZ = '''"ec1": [
  {"q":"A founder leaves Rs 40L idle for 2 years at 12.6% WACC. The honest P&L line is:",
   "o":["zero - cash is safe","about Rs 10.1L of invisible tuition (40 x 1.126^2 - 40) - opportunity cost is a real employee with a negative salary; safety belongs in yield-bearing parking, never a 0% costume","inflation only","Rs 4L"], "a":1,
   "w":"Idle is not safe; the cost is the road not taken, compounded."},
  {"q":"Order price Rs 58, average cost Rs 61, marginal cost Rs 44. Accept?",
   "o":["no - below average cost","yes - +Rs 14 marginal contribution; averages smear fixed costs across units and lie about single orders; refuse only when the order steals capacity from full-margin demand","only big clients","only with discounts"], "a":1,
   "w":"The margin is the courtroom; averages are hearsay."},
  {"q":"+10% price, -8% volume on a staple means the hike:",
   "o":["failed - volume fell","worked - E 0.8 < 1 makes revenue +1.2% (Rs 100.0k to Rs 101.2k); inelastic demand is pricing power, the economic name for the moat every investor hunts","is neutral","needs retesting"], "a":1,
   "w":"Elasticity converts pricing from gambling into measurement."}],
"ec2": [
  {"q":"A uniform-pricing monopolist (P = 100 - Q, MC = 20) maximizes profit at:",
   "o":["Q=50, P=50","Q=40, P=60 - set MR = MC: 100 - 2Q = 20; the restriction to 40 while P 60 > MC 20 manufactures the Rs 800 deadweight triangle antitrust exists to tax","Q=80, P=20","Q=60, P=40"], "a":1,
   "w":"(a) maximizes revenue (MR=0); (c) is competition's answer."},
  {"q":"Same-quarter 8% hikes across cement majors with flat inputs indicates:",
   "o":["proven cartel","price leadership or legal parallelism - chess without a meeting; cartel needs communication evidence, so price the DISCIPLINE as an investor and leave conspiracy to the regulator","demand collapse","cost push"], "a":1,
   "w":"Discipline is investable signal; conspiracy is a courtroom standard."},
  {"q":"Jio's 2016-19 entry, structurally, was:",
   "o":["irrational pricing","the deliberate dilemma play - choose the ruinous cell with parent-funded loss tolerance, outlast rivals' balance sheets, then collect the consolidated oligopoly; price wars are chess endgames and the winner bleeds longest","a regular price war","regulatory capture"], "a":1,
   "w":"Pockets set the game's horizon; horizon set the equilibrium."}],
"ec3": [
  {"q":"Nominal growth 9%, deflator about 2.3%. Markets price the real number near:",
   "o":["11.3%","about 6.5% (exact 1.09/1.0235) - 6.7% by shortcut; the surgery is routine, and quoting nominal as real is how press releases manufacture inflation-year miracles","4.2%","9%"], "a":1,
   "w":"Scoreboards feed models, not headlines."},
  {"q":"CPI spikes on tomatoes, crude falls, core quiet. RBI's mature reaction:",
   "o":["emergency hike","look through the food spike - rates cannot grow tomatoes; watch core and expectations, tighten only on second-round wage-chasing; supply shocks tax patience, not repo","cut rates fast","raise CRR to 8%"], "a":1,
   "w":"Core and expectations are the policy thermometers."},
  {"q":"Unemployment falls while LFPR falls faster. The correct reading:",
   "o":["recovery","discouragement signature - seekers exited the force, shrinking the numerator not the job gap; the triangle (rate, participation, quality) must heal together","measurement error","sectoral rotation"], "a":1,
   "w":"Participation is the confessor the headline hides."}],
"ec4": [
  {"q":"One Rs 5L deposit at CRR 5% can ultimately support broad money up to:",
   "o":["Rs 5L","Rs 100L - the ceiling 1/0.05 = 20x; loans create deposits which re-lend, bounded by reserves and dragged by leakages; money is mostly lending's footprint, not mint output","Rs 10L","Rs 25L"], "a":1,
   "w":"Ceilings teach the machine's architecture."},
  {"q":"Crude +30%, INR 83 to 86, core CPI 3.8%. The WRONG medicine is:",
   "o":["targeted duty relief","aggressive repo hikes - oil does not respond to RBI, and choking domestic demand while customs invoices inflate punishes the host for the guest's fever; hold-hawk, smooth FX, relieve inputs","hawkish hold with FX smoothing","watch expectations"], "a":1,
   "w":"Diagnose the engine before choosing the wrench."},
  {"q":"At 6% inflation, cash halves its purchasing power in about:",
   "o":["18 years","12 years - rule of 72 (72/6); the silent tax compounds quarterly on the complacent, which is why every PM plan is denominated in tomorrow's rupees","6 years","24 years"], "a":1,
   "w":"The furnace is slow but patients are its fuel."}],
"ec5": [
  {"q":"Spend Rs 100, non-borrowed receipts Rs 75, GDP Rs 500. Fiscal deficit is:",
   "o":["Rs 25, 12.5% of GDP","Rs 25 = 5% of GDP - the borrowing need and its ratio are the desk's first numbers; quality checks (capex share, primary gap) decide whether 5% builds highways or hangovers","Rs 25, 25% of GDP","Rs 175"], "a":1,
   "w":"25/500 = 5%; the fraction's placement is the job."},
  {"q":"India's realistic capex multiplier (~2x) trails the textbook (4x) because:",
   "o":["RBI offsets everything","leakages - imports, taxes, precautionary savings, execution lag - steal the later rounds; multipliers are measured in leakages, and transfers leak fastest","MPC is 0.4 in India","states refuse to spend"], "a":1,
   "w":"The leak-map, not the speech, sizes the multiplier."},
  {"q":"Debt-GDP stays stable whenever:",
   "o":["deficits stop entirely","nominal growth g exceeds effective interest r with modest primary deficits - India runs g ~9-10% vs r ~7.2%; sustainability is a growth policy wearing a calculator, and a deflation stall flips it fastest","ratings agencies approve","exports boom"], "a":1,
   "w":"The whole sovereignty debate in one inequality."}],
"ec6": [
  {"q":"Exports 450 + invisibles 180 - imports 700, GDP 3,500, equals CAD of:",
   "o":["-4% of GDP","-70 = -2.0% of GDP - livable zone IF financed by FDI-class lifers buying capital goods; the same number rented-financed in a gold season is a 2013 application letter","+0.4%","-0.2%"], "a":1,
   "w":"Composition footers convert numbers into risk ratings."},
  {"q":"India's reserves ($650-700B, 10+ months cover) primarily buy:",
   "o":["a permanently stronger rupee","time, calm and policy space during flow panics - armor, not a level; RBI smooths splurges instead of defending numbers, and the 1991 3-weeks-cover contrast is why the pile exists","lower rates abroad","FDI incentives"], "a":1,
   "w":"Armor buys composure; levels are never promised."},
  {"q":"Nominal INR flat, inflation differential +3%. The honest verdict:",
   "o":["exporters gain","REER appreciated about 3% - exporters' dollar prices rose through domestic inflation without a paisa of FX movement; the stable-rupee headline hides a competitiveness tax","nothing changed","importers lose"], "a":1,
   "w":"REER is competition's price tag; nominal is the headline's."}],
"ec7": [
  {"q":"The reliable place to read the FUTURE in the monthly dump is:",
   "o":["GDP - the big number","the LEFT of the ladder - curve, PMI, GST, credit; GDP arrives after the movie and prices nothing; concluding forward from rearview data pays zero","headline CPI alone","editorials"], "a":1,
   "w":"The ladder exists so nobody trades yesterday's newspaper."},
  {"q":"Core CPI rising 3.8 to 4.9 while IIP fades 5.2 to 3.1 places the quadrant at:",
   "o":["goldilocks","stagflation-lite drift - price-heat up with quantity-heat down; RBI keys on core, and hiking-into-slowing-growth punishes both engines, which is why gold and buffer earn sleeves","reflation","disinflation"], "a":1,
   "w":"Engine maps first, quadrant names second, tilts third."},
  {"q":"The 2y at 7.6% above the 10y at 7.0% is best read as:",
   "o":["a bond-market error","policy pinning the front while the long end prices future cuts into growth damage - the money-backed recession whistle of FI4; respect with sizes and kill-switches","liquidity surplus","data lag"], "a":1,
   "w":"Inversion is information with money behind it."}],
"pm1": [
  {"q":"60/40, sigma 15/25, rho 0.3: the portfolio sigma is:",
   "o":["19.0%","15.33% - the cross-term under-fills whenever rho < 1; the 3.67pp discount is the free lunch that costs nothing, and rho = 1 is the honest boundary (exactly 19%)","12.04%","17.2%"], "a":1,
   "w":"(c) is the NEGATIVE-correlation version; accuracy beats optimism."},
  {"q":"Risk the market pays you NOTHING for is:",
   "o":["systematic","idiosyncratic - one firm's fraud is diversifiable with a click, so no premium survives; about 15-20 names kill it, and holding 3-4 stocks is unpaid risk in a costume","duration risk","credit risk"], "a":1,
   "w":"Paychecks attach to what cannot be clicked away."},
  {"q":"The diversification layer the SIP mass-produces is:",
   "o":["geography","time - entry-price diversification monthly, the only layer a salaried investor manufactures at scale; pair with asset-class layers and lunch is served on a date schedule","factor","strategy"], "a":1,
   "w":"The calendar is the broker that never charges."}],
"pm2": [
  {"q":"Series +30%, -10%, +25%. The TRUE compounded annual return is:",
   "o":["15.0%","13.5% - AM lies by the volatility drag (about sigma^2/2): the -10% year taxes the compound path; every wealth number must be GM and every sigma is a fee","13.9%","16.1%"], "a":1,
   "w":"Drag is physics, not pessimism."},
  {"q":"Fund MDD 30% (peak 130 to trough 91). Recovery-required is:",
   "o":["30%","42.9% - drawdowns demand asymmetric recoveries; that asymmetry is why max-DD, not sigma, predicts which clients stay solvent in spirit through a bear","35%","25%"], "a":1,
   "w":"130/91 - 1 = 42.9%; ladders down are steeper."},
  {"q":"Fund A 14% at sigma 16 vs index 12% at sigma 14, Rf 7%. Winner:",
   "o":["A on raw return","A on Sharpe too - 0.44 vs 0.36, A earned its extra toll; if A's sigma hides option-selling tails, the PM5 tribunal convenes before capital moves","index on lower risk","tie at 0.40"], "a":1,
   "w":"Per-unit-of-toll is the duel's rule."}],
"pm3": [
  {"q":"Beta 1.3, Rf 7%, premium 5%: the required return is:",
   "o":["12.0%","13.5% - 7 + 1.3x5, the SML fair wage; deliver 15% and alpha is +1.5% AFTER the line's work is paid, not before","13.0%","16.0%"], "a":1,
   "w":"(a) forgot the amplification; (c) rounded faithlessly."},
  {"q":"The most honest sentence about fund alpha is:",
   "o":["alpha = return above NIFTY","alpha exists only after beta-work, factor tilts, costs and a full cycle take their cuts - most marketed alpha is beta (or smallcap slope) wearing a costume","alpha compounds forever","alpha needs no benchmark"], "a":1,
   "w":"The four tax collectors never sleep."},
  {"q":"Portfolio beta over a book is:",
   "o":["impossible without full covariance","the simple weighted average of constituent betas (no cross-terms) - the book's systematic lever, steerable with overlays; the cross-term drama belongs to sigma, not beta","always below 1","fixed daily"], "a":1,
   "w":"Beta averages; sigma crosses the border."}],
"pm4": [
  {"q":"Two-Fund Separation says timid and brave investors both should:",
   "o":["hold completely different risky books","hold the SAME tangency risky book, changing only its share against bills - personalization lives on the risk dial (proportion), not inside the engine room","pick stocks by personality","own at least 8 funds"], "a":1,
   "w":"One great engine, many volume knobs."},
  {"q":"Brinson's ~90% finding legitimately teaches:",
   "o":["stock-picking is worthless","the policy SPLIT writes ~90% of return variability - get the frontier-side split roughly right first and agonize over picking later; it prices variance across funds, so it crowns architecture first","markets are random","bonds are obsolete"], "a":1,
   "w":"Architecture first; asterisks read aloud."},
  {"q":"The CAL's slope equals:",
   "o":["beta","the tangency book's Sharpe - steeper line, better core; every investor's map upgrades when the risky engine's per-unit price improves, so building the engine outranks tilting it","the risk-free rate","the risk premium"], "a":1,
   "w":"The highway's grade IS the engine's grade."}],
"pm5": [
  {"q":"Fund A 14% R, sigma 16%, Rf 7% vs index 12%, sigma 14%. First-chair verdict:",
   "o":["tie","A leads 0.44 vs 0.36 on Sharpe - more return per unit of toll, honestly; then Treynor, Sortino, IR, Calmar convene because single-chair verdicts hire levered beta in a Sharpe costume","index wins","insufficient data"], "a":1,
   "w":"Chairs vote; no chair rules alone."},
  {"q":"A fund shows Sharpe 0.95 but MDD -48% and undisclosed TE. The card:",
   "o":["HIRE - elite Sharpe","WATCH at best, PASS if flags don't clear - sigma-laundering and endpoint casinos live exactly in that shape (elite sigma-grade, trauma path, opacity); fraud audit precedes capital","HIRE small","HIRE slowly"], "a":1,
   "w":"The tribunal exists because brochures grade themselves."},
  {"q":"IR 0.5 with IC 0.05 needs about:",
   "o":["25 bets/yr","100 independent bets/yr (0.05 x sqrt(100) = 0.5) - skill at scale is a factory of small disciplined calls; two heroic stories is not an IR","400 bets/yr","5 bets/yr"], "a":1,
   "w":"Breadth is the factory's name."}],
"pm6": [
  {"q":"70/30, equity +25%, debt +6%, year-2 closes at:",
   "o":["73.3/26.7","76.4/23.6 - the drift formula w(1+r)/total: +6.4pp in two bull years means band breached and the trim due; year-1's 73.3 (+3.3) was the documented HOLD","70/30","80/20"], "a":1,
   "w":"(a) was year one; the machine's log preserves both."},
  {"q":"The machine's real product is:",
   "o":["contrarian alpha","dial-honesty sold for a small trending-market premium and collected in crash-recovery cycles - insurance-priced discipline; who owns the recovery at the pre-crash dial wins","tax savings only","higher yield"], "a":1,
   "w":"Insurance, priced; the rest is marketing garnish."},
  {"q":"Cheapest repair after a 6.4pp equity breach is:",
   "o":["immediate Rs 9L sale","flow-first: redirect SIP and sweep dividends to the lagging sleeve with an outer hard rail as dual trigger - months of healing at zero tollbooth","switch to 100% debt","do nothing forever"], "a":1,
   "w":"Flows are free rebalances; sales are taxed ones."}],
"pm7": [
  {"q":"Anand's flat Rs 30k/mo over 35y at 12% lands near:",
   "o":["Rs 7.6Cr","Rs 19.3Cr nominal (Rs 1.26Cr contributed; about Rs 2.5Cr in today's rupees) - with +10% step-ups toward Rs 45Cr-class; the last two decades are the payload","Rs 3.4Cr","Rs 12.6Cr"], "a":1,
   "w":"Engine math; (a) is the 10%-board fantasy-cut."},
  {"q":"Ramesh's Rs 3Cr at blended 7% drawing flat Rs 1L/month survives:",
   "o":["about 22 years","50+ years with balance standing at month 600 - the nominal-flat proof; the honest plan adds +6% steps answered by 45-50% equity, a 24-month moat, annual real re-basing","forever, untouched","10 years"], "a":1,
   "w":"Durability proved; honesty steps attached."},
  {"q":"The desk's untouchable rule across all three lives is:",
   "o":["maximum equity always","signature first, markets second - allocation, bands, draw-order and welds are IPS law written in peacetime, reviewable on schedule, override-able only in writing","rebalance only in crashes","follow the best fund"], "a":1,
   "w":"Machinery beats negotiation in every single crash."}],
'''

rep('"m10": [', QUIZ + '"m10": [')

open(dst, "w", encoding="utf-8").write(t)
print("patched ->", dst, len(t), "bytes")
