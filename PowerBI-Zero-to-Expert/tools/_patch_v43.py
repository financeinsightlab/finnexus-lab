#!/usr/bin/env python3
# Patch build_app_v42.py -> build_app_v43.py : + Derivatives (dv1..dv8) + Financial Statement Analysis (fa1..fa7)
import os
BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = os.path.join(BASE, "tools", "build_app_v42.py")
dst = os.path.join(BASE, "tools", "build_app_v43.py")
t = open(src, encoding="utf-8").read()

def rep(old, new, n=1):
    global t
    c = t.count(old)
    assert c == n, f"anchor count {c} != {n} for: {old[:70]!r}"
    t = t.replace(old, new)

rep('OUT = os.path.join(BASE, "PowerBI_Course_App_v42.html")',
    'OUT = os.path.join(BASE, "PowerBI_Course_App_v43.html")')

NEW_SECTIONS = '''
DV_SECTIONS = [
    ("DV_01_Derivatives_101.md", "dv1", "DV1 · Derivatives 101 — Four Families", "\\U0001F4C9", "underlyings, notional, hedger/spec/arb, leverage & MTM"),
    ("DV_02_Forwards_Futures_Mechanics.md", "dv2", "DV2 · Forwards & Futures Mechanics", "\\u2699\\uFE0F", "cost-of-carry pricing, margins, basis & convergence"),
    ("DV_03_Hedging_With_Futures.md", "dv3", "DV3 · Hedging with Futures", "\\U0001F6E1\\uFE0F", "wheat desk Rs 1L saved, basis risk, h* ratios, audit"),
    ("DV_04_Options_Anatomy.md", "dv4", "DV4 · Options Anatomy", "\\U0001F3AF", "calls/puts, capped-vs-unbounded, payoffs, intrinsic+time"),
    ("DV_05_Option_Strategies.md", "dv5", "DV5 · Option Strategies", "\\U0001F9E9", "protective put, covered call, spreads, straddles, IV crush"),
    ("DV_06_Option_Pricing_Greeks.md", "dv6", "DV6 · Option Pricing & The Greeks", "\\U0001F9EE", "parity Rs 2.91, binomial Rs 13.64, BSM dials, delta to rho"),
    ("DV_07_Swaps_Risk_Machinery.md", "dv7", "DV7 · Swaps & Risk Machinery", "\\U0001F504", "float-to-fixed 10.5%, FX locks, notional-vs-exposure, CCP"),
    ("DV_08_Capstone_Risk_Desk.md", "dv8", "DV8 · CAPSTONE: The Risk Desk", "\\U0001F3C6", "festival hedge book, margin protocol, board memo, forge"),
]

FA_SECTIONS = [
    ("FA_01_Analysts_Lens.md", "fa1", "FA1 · The Analyst's Lens", "\\U0001F50D", "lethal reading order, audit opinions, confessional pages"),
    ("FA_02_Common_Size_Trend.md", "fa2", "FA2 · Common-Size & Trend Autopsies", "\\U0001F4D0", "verticals, divergence signature, margin walk, bridges"),
    ("FA_03_Ratios_Liquidity_Solvency.md", "fa3", "FA3 · Ratio Engine I: Liquidity & Solvency", "\\U0001F4A7", "CR 2.06 vs quick 1.00, coverage 8.7x, covenant math"),
    ("FA_04_Ratios_Profitability_Efficiency.md", "fa4", "FA4 · Ratio Engine II: Profitability & Efficiency", "\\u2699\\uFE0F", "DuPont 22.8% = 4.73 x 2.69 x 1.79, ROCE vs ROE, traps"),
    ("FA_05_Earnings_Quality_Forensics.md", "fa5", "FA5 · Earnings Quality & Forensics", "\\U0001F50E", "accruals -3.6%, Beneish M -2.31, Satyam screens, panels"),
    ("FA_06_Credit_Banker_Lens.md", "fa6", "FA6 · The Credit & Banker Lens", "\\U0001F3E6", "DSCR 5.8x, two ledgers, drawing power, bank reverse-read"),
    ("FA_07_Capstone_Full_Autopsy.md", "fa7", "FA7 · CAPSTONE: The Full Company Autopsy", "\\U0001F3C6", "ShopKart one-pager, FruitCart 7-flag courtroom, duel verdicts"),
]
'''
rep('    ("BF_06_Capstone_Behavioral_Audit.md", "bf6", "BF6 · CAPSTONE: The Behavioral Audit", "\\U0001F3C6", "12-trade autopsy, IPS one-pager, interview forge"),\n]\n',
    '    ("BF_06_Capstone_Behavioral_Audit.md", "bf6", "BF6 · CAPSTONE: The Behavioral Audit", "\\U0001F3C6", "12-trade autopsy, IPS one-pager, interview forge"),\n]\n' + NEW_SECTIONS)

rep(' + CF_SECTIONS + BF_SECTIONS\n', ' + CF_SECTIONS + BF_SECTIONS + DV_SECTIONS + FA_SECTIONS\n')

rep('"sd": [], "tw": [], "ac": [], "cf": [], "bf": []}',
    '"sd": [], "tw": [], "ac": [], "cf": [], "bf": [], "dv": [], "fa": []}')
rep('"sd": 0, "tw": 0, "ac": 0, "cf": 0, "bf": 0}',
    '"sd": 0, "tw": 0, "ac": 0, "cf": 0, "bf": 0, "dv": 0, "fa": 0}')

rep('    if sid == "bf1":\n        _gcur = "bf"\n',
    '    if sid == "bf1":\n        _gcur = "bf"\n    if sid == "dv1":\n        _gcur = "dv"\n    if sid == "fa1":\n        _gcur = "fa"\n')

rep('    ("bf",    "🧠 Behavioural Finance", "fin"),\n',
    '    ("bf",    "🧠 Behavioural Finance", "fin"),\n    ("dv",    "📉 Derivatives", "fin"),\n    ("fa",    "📊 Financial Statement Analysis", "fin"),\n')

rep('NEW! 📒 Accounting · 🏦 Corporate Finance · 🧠 Behavioural Finance — journal entries to CFO war rooms to bias-proofing your own brain!)',
    'NEW! 📒 Accounting · 🏦 Corporate Finance · 🧠 Behavioural Finance · 📉 Derivatives · 📊 Financial Statement Analysis — from journal entries to trading desks and forensic autopsies!)')
rep(' · 690 auto-graded quiz questions · ShopKart', ' · 735 auto-graded quiz questions · ShopKart')

rep('<div class="stat"><b data-count="230">0</b><span>Sections</span></div>',
    '<div class="stat"><b data-count="245">0</b><span>Sections</span></div>')
rep('<div class="stat"><b data-count="226">0</b><span>Hands-on labs</span></div>',
    '<div class="stat"><b data-count="241">0</b><span>Hands-on labs</span></div>')
rep('<div class="stat"><b data-count="690">0</b><span>Quiz questions</span></div>',
    '<div class="stat"><b data-count="735">0</b><span>Quiz questions</span></div>')

rep(' 230 sections across 37 courses: ',
    ' 245 sections across 39 courses: ')
rep('Accounting, Corporate Finance & Behavioural Finance (incl.',
    'Accounting, Corporate Finance, Behavioural Finance, Derivatives & Financial Statement Analysis (incl.')

QUIZ = '''"dv1": [
  {"q":"The defining split between options and the other three families is:",
   "o":["options are cheaper","options sell a RIGHT (capped loss = premium) while forwards/futures/swaps impose OBLIGATION on both sides - asymmetry is the product, premium is its price, and this single property is why options exist","options are safer for sellers","options have no expiry"], "a":1,
   "w":"(c) is backwards: sellers carry the unbounded side for the premium."},
  {"q":"Nifty at 25,000, lot 75, margin 10%: the notional controlled per lot is:",
   "o":["Rs 1.87L","Rs 18.75L - with Rs 1.875L posted; a -0.8% index day debits Rs 15,000 = 8% of that margin tonight; leverage is the reason MTM discipline exists and why the 9-in-10 statistic grows","Rs 750","Rs 25,000"], "a":1,
   "w":"(a) is the margin, not the notional; the account moved 10x the index's day."},
  {"q":"A clearing corporation demands daily mark-to-market primarily to:",
   "o":["increase fees","stop losses compounding silently into one expiry-day default bomb - credit risk becomes small daily survivable settlements; the trader-broker-CCP chain holds only if nobody carries a season of someone else's weather","reward day traders","improve liquidity"], "a":1,
   "w":"Risk plumbing beats risk prayer; fees are a side dish."}],
"dv2": [
  {"q":"October wheat at Rs 2,650 vs July spot Rs 2,600 (r 10%, T 0.25) mainly reflects:",
   "o":["traders expecting drought","the cost-of-carry invoice: 2,600 x 1.025 = ~Rs 2,665, net of convenience ~Rs 2,650 - futures price financing and storage, and arbitrage enforces it; expectations that fight the invoice get warehouse-slammed by janitors","government fixing","festival sentiment"], "a":1,
   "w":"Tales move the slope gradient at best; the level is an invoice."},
  {"q":"Daily MTM on a -250-point adverse close (25,000 contract, lot 75) debits:",
   "o":["Rs 250","Rs 18,750 tonight from your margin balance - MTM is not a monthly statement; positions must be sized for the maintenance-survival path, not the initial-debit euphoria","nothing until expiry","Rs 6,250"], "a":1,
   "w":"(c) is the forward's disease; the future cured it with nightly surgery."},
  {"q":"Basis = -50 (spot 2,600, futures 2,650) describes, by expiry:",
   "o":["divergence to -100","contango shrinking to ~0 - carry amortizes daily, futures must converge into spot plus/minus delivery friction; every hedge leans on this law, and 'hold till recovery' meets the same law without mercy","backwardation forming","basis is random"], "a":1,
   "w":"Convergence is law, not hope; it prints like clockwork every expiry."}],
"dv3": [
  {"q":"ShopKart's wheat hedge (long 500q at Rs 2,650, October spot Rs 2,850) ends with effective cost:",
   "o":["Rs 2,600/q - July spot","Rs 2,650/q - the futures ENTRY: the Rs 1.0L futures gain offsets the Rs 1.25L spot rise (14.25L - 1.00L = 13.25L); you lock the carry invoice, and the crash-side rerun pays the identical 13.25L - weather deleted in BOTH directions","Rs 2,850/q - hedging was useless","Rs 2,750/q average"], "a":1,
   "w":"The hedge is not a bet you win; it is a weather you stop having."},
  {"q":"Hedging replaces direction risk with:",
   "o":["zero risk","basis risk - the spot-minus-futures wiggle at lift (grade, location, timing): small, survivable, honest weather vs the naked thunderstorm it replaced; 'perfect hedge' claims are sales decks, not risk memos","opportunity risk only","counterparty risk only"], "a":1,
   "w":"Insurance has a deductible called basis; the honest quote includes it."},
  {"q":"A desk shows +Rs 3L 'hedge profit' on crude futures. The CFO's first move:",
   "o":["bonus the desk","demand the mapping: every contract to its commercial exposure line with quantities and dates - hedge gains without a commercial mother are trading profits in a costume; excitement exceeding loss-relief is speculation","double the program","ignore profits"], "a":1,
   "w":"Hedge books never orphan P&L; celebrate symmetry, investigate orphans."}],
"dv4": [
  {"q":"Buying the 25,000 call at Rs 180 (lot 75) sets your maximum loss at:",
   "o":["unlimited below breakeven","Rs 13,500 - the premium, capped, whatever the crash; that is what the ticket bought: asymmetry - but BE 25,180 means being 'right' below that level still invoices tuition","Rs 18.75L notional","Rs 18,000"], "a":1,
   "w":"(c) confused notional with risk; unbounded losses live on the writer's side."},
  {"q":"A spot-25,000 board quoting 24,800C at Rs 260 decomposes as:",
   "o":["Rs 260 time value","Rs 200 intrinsic + Rs 60 time value - ITM carries real deliverable worth plus clock-juice; ATM options hold ~pure time value (max uncertainty peak), OTM are pure probability tickets decaying toward their probable funeral","Rs 200 time + Rs 60 intrinsic","Rs 260 intrinsic"], "a":1,
   "w":"Decomposition is instantaneous: spot minus K, remainder is the clock."},
  {"q":"Writing (selling) naked options is structurally dangerous because:",
   "o":["premium is too small","income is capped at premium while losses run unbounded (call) or to strike x lot (put) - you are the INSURER: one gap event against an under-reserved writer is how the F&O obituary column gets its weekly material","buyers always win","theta turns negative"], "a":1,
   "w":"Sell insurance only with insurer-grade reserves."}],
"dv5": [
  {"q":"The bull call spread (buy 25,000C @180, sell 25,400C @90, lot 75) hands you:",
   "o":["unlimited upside, max loss Rs 26,250","cost Rs 6,750, max profit Rs 23,250, BE 25,090, risk/reward ~1:3.4 - you sold the tail you didn't believe to fund the move you did; defined risk BOTH directions makes it the desk's favorite straitjacket","free insurance","a delta-zero book"], "a":1,
   "w":"(a) is the fantasy version casinos also sell; wings cap both."},
  {"q":"A covered call faithfully rented out does NOT:",
   "o":["earn premium tonight","protect against crashes - the Rs 1.5 rent cushions Rs 1.5 of a Rs 9 fall; it is a sleepy-tape yield tool that caps your thunder (called at 33 while it prints 36); the crash-bodyguard is the protective put, a different instrument for a different promise","cap the rally","reduce basis"], "a":1,
   "w":"Rent is not armor; armor is priced separately and behaves like insurance should."},
  {"q":"Buying an event straddle at IV 38% usually dies even when the event lands because:",
   "o":["events are rigged","IV crush: the scream was priced into the premium; post-event uncertainty collapses, vega evicts the loft, and a +1.8% spot move under a halved IV is a losing ticket - price implied-vs-realized history BEFORE paying for explosions","straddles cannot profit","theta stops at events"], "a":1,
   "w":"The bill for uncertainty arrives BEFORE the answer; the answer refunds nothing."}],
"dv6": [
  {"q":"Put-call parity (S=100, K=100, r=10%, T=1y, C=Rs 12) prices the fair put at:",
   "o":["Rs 12.00","Rs 2.91 - C - P = S - PV(K): 12 - P = 100 - 90.91; ATM calls legitimately cost MORE than puts when rates are positive - the weld, not the mood, sets the family prices","Rs 9.09","Rs 4.55"], "a":1,
   "w":"(a) assumes a symmetry rates do not permit; (c) forgot the call's Rs 12."},
  {"q":"The one-step binomial prices the K=100 call at Rs 13.64 WITHOUT the real up-probability because:",
   "o":["probability is illegal","the replicating clone (stock + bond) has identical payoffs by construction - arbitrage forces prices to match, so only the RANGE and rates matter; sentiment cancels, the deepest insight in modern pricing (grow the tree tall and BSM blooms)","gamma removes it","the CCP fixes it"], "a":1,
   "w":"Replication is the courtroom; probability forecasts are spectators."},
  {"q":"Your straddle loses Rs 11,550/lot despite the event landing 'as expected' chiefly because:",
   "o":["theta was quiet","vega collected the bill: IV 32 to 18 = 14 vol-points x vega 11 = 154 pts of scheduled evaporation - the event's uncertainty WAS the asset you held, and it expired at the announcement; price implied-vs-realized history before renting explosions","delta betrayed you","rho spiked"], "a":1,
   "w":"The Greeks don't betray; invoices simply arrive at the named hour."}],
"dv7": [
  {"q":"ShopKart's pay-fixed/receive-floating swap (10.5% fixed, MIBOR+3) at MIBOR 8.5% leaves all-in cost at:",
   "o":["11.5%","10.5% - loan pays 11.5 but swap receipts (+Rs 1.0L on Rs 50L) exactly offset; the treaty converts floating risk into a fixed signed number; certainty was purchased in advance, regret both ways priced at signing","9.5%","8.5%"], "a":1,
   "w":"The loan statement shows 11.5; the treasury P&L shows 10.5; only one decides sleep."},
  {"q":"Quoting a Rs 50L swap notional as 'risk exposure' is wrong because:",
   "o":["swaps have no risk","notional is the REFERENCE size; real exposure = the mark-to-market gap (replacement cost, usually a few percent) - defended by netting, collateral, and credit review; headline-notional is media's favorite illiteracy since 2008","exposure is always Rs 50L","only buyers face risk"], "a":1,
   "w":"Exposure lives in the replacement bill, not the reference number."},
  {"q":"The CCP novation chain's deepest selling point is:",
   "o":["lower fees","your counterparty becomes a pre-funded institution (margin + default waterfall) instead of a person with a story - storm-days settle via the rulebook; bilateral chains failed in 2008, margined arenas held in 2020; keep both receipts","faster apps","tax shields"], "a":1,
   "w":"Plumbing that outlives storms is the entire derivatives story."}],
"dv8": [
  {"q":"The Phase-1 festival hedge book's total verified deliverables were:",
   "o":["speculative alpha on hindsight charts","exposure deletion with rupees: wheat Rs 1.0L saved, silver ~Rs 71.5k saved, rate-lock and FX-lock as pre-signed certainties - graded on the exposure column, every lot with a commercial mother, zero orphans; weather was the product sold OUT of the P&L","Rs 30L notional bragging rights","MTM trophies"], "a":1,
   "w":"Insurance is measured on the fire-days column; everything else is costumes."},
  {"q":"The margin stress protocol's core insight is:",
   "o":["hedges never lose","hedges die of MARGIN-CALLS long before prices - worst-path MTM funding must be pre-arranged (wheat -Rs 79.5k path vs Rs 1.0L buffer verified); night-3 memos written calmly during the bleed separate a desk from a group chat","buffers quadruple returns","maintenance margin is optional"], "a":1,
   "w":"Price risk converts to cash-flow risk the moment futures go on; fund the conversion."},
  {"q":"The board memo's spine sentence is:",
   "o":["markets humble everyone","'We stopped having weather - that is a deliverable': savings are insurance outcomes, worst-cases were pre-signed, MTM funding verified unused, kill-criteria unreached; alpha claims belong to a different ledger, banned by policy","the desk beats CNBC","basis is destiny"], "a":1,
   "w":"One sentence that makes calm seasons defensible and storm seasons survivable."}],
"fa1": [
  {"q":"The lethal order reads auditor, notes, MD&A, statements before ratios because:",
   "o":["auditors pay better","statements are management's OUTPUT and their factory comes first - audit exceptions tell you which lines to recompute, policy pages which trends are spliced, related-party pages which 'profits' are family arrangements; ratio-first reading prices costumes before checking bodies","ratios are hard","SEBI requires it"], "a":1,
   "w":"Factory first, claims second, compression last; that's the entire module."},
  {"q":"A statutory auditor resigning mid-tenure makes a professional analyst:",
   "o":["buy the dip","treat it as the loudest alarm in the Indian toolkit - Satyam-legacy markets re-rate on the resignation letter weeks before results; stance = no-position until the reason reconciles with cash-and-records; ask the audit committee first, chart later","wait for results day","upgrade only if big-4"], "a":1,
   "w":"Resignation letters age into headlines; by results day the discount is already priced."},
  {"q":"'Depreciation life for vehicles rewritten 8 to 12 years' signals:",
   "o":["engineering insight","a policy makeup that halves the annual charge and lifts PBT cosmetically (~Rs 0.58L per Rs 15L van) - legitimate only with capacity evidence; without it, life-estimate machinery is weaponized to manufacture margin expansion the trucks never delivered","tax mastery","boring compliance"], "a":1,
   "w":"Lives are estimates with receipts attached; demand the receipts or discount the profit."}],
"fa2": [
  {"q":"ShopKart FY24-25 indices (Revenue 116.7, GP 109.1, Opex 115, EBITDA 98.5) diagnose:",
   "o":["superb operating leverage","growth WITHOUT operating leverage - opex out-ran gross profit while GM slipped 2pp, so EBITDA fell despite +16.7% revenue; a strategic verdict (new-store cohorts ramping on a clock) with one deadline question attached","data error","seasonality"], "a":1,
   "w":"Indices name diseases; names route to the correct doctor (procurement + cohort-ramp here)."},
  {"q":"The margin walk converts 'PAT fell Rs 1.1L' into:",
   "o":["despair","assigned causality: +volume - GM slippage - opex ramp + financing deltas, each rupee-quantified with an owner and a clock - the bridge turns a headline into a discussion and headlines into decisions","a pie chart","a restatement"], "a":1,
   "w":"Bridges are the difference between analyzing and narrating."},
  {"q":"Comparing an own-property retailer with a rent-heavy one on raw EBITDA margins first requires:",
   "o":["more decimals","normalization - impute market rent into the own-property books (or strip lease costs both sides) so opex architectures match; without homogenizing, the gap is a financing disguise dressed as operating genius","sector-average WACC","DuPont first"], "a":1,
   "w":"Compare architectures, then margins; the reverse order is a costume party."}],
"fa3": [
  {"q":"ShopKart's current ratio 2.06 and quick ratio 1.00 together say:",
   "o":["liquidity is fake","real but inventory-dependent - the shelf-full bucket holds while stock converts honestly (81-day CCC, shrinkage 0.55%), but strip the shelves and cover is exactly 1; watch the CCC clock and GMROI, not just the prettier gauge","both must rise","banks panic at 2.06"], "a":1,
   "w":"Depopulate the shelf and the prettier number confesses its makeup case."},
  {"q":"Net-debt/EBITDA at ShopKart (19-12)/26 reads:",
   "o":["0.73","0.27 years of EBITDA - lenders can be repaid from ~3 months of operations; above ~3x banks sweat, above ~5x they bring committees; 0.27x with coverage 8.7x = deliberate headroom paid off in ratio form","gearing 23% exactly","below zero"], "a":1,
   "w":"The covenant unit is payback-years; quote it in the unit the committee dreams in."},
  {"q":"Year-end supplier-paydown + January reload distorts the current ratio because:",
   "o":["payables are evil","ratios photograph a single date - a snapshot engineered by pre-dated actions; the antidote doctrine: slopes over snapshots, quarterly averages over year-ends, and decode any collection blitz at its priced cost before applauding liquidity","CR ignores cash","auditors allow it"], "a":1,
   "w":"Time-series cynicism is the analyst's sunscreen: apply quarterly or burn."}],
"fa4": [
  {"q":"ShopKart's DuPont (4.73% x 2.69 x 1.79 ~ 22.8%) identifies it chiefly as:",
   "o":["a margin machine","a TURNOVER machine - thin margins sprinting at 2.69 asset turns with civilized leverage; the applause belongs to operational velocity (shelves spinning weekly), which is why spoilage, shrinkage and labor discipline own the risk register","a leverage story","a tax story"], "a":1,
   "w":"(c) is the dangerous-uncle species with bigger gears; (a) wears luxury margins nobody claimed."},
  {"q":"Comparing ShopKart's 22.8% ROE with a levered trader's 33% ROE requires FIRST:",
   "o":["a bigger calculator","decomposition inside species - split margin x turns x leverage on both, then compare; the trader's extra points may be pure denominator-thinness wearing excellence's blazer; headline-ROE rankings without DuPont are committee malpractice","their auditor's number","5 years of prices"], "a":1,
   "w":"Same headline does not mean same species; biopsy before applause, always."},
  {"q":"ROCE 29.7% vs WACC 12.6% certifies:",
   "o":["dividend safety","value creation at the FACTORY level - +17.1pp operating spread x Rs 67.4L = EVA ~ Rs 11.5L before financing stories begin; ROCE-vs-WACC grades operations, ROE-vs-Ke grades what owners kept after the treasurer played","low inventory risk","high payout room"], "a":1,
   "w":"Operations are what is left when financing stops talking."}],
"fa5": [
  {"q":"ShopKart's accruals ratio of -3.6% certifies:",
   "o":["problems in receivables","high earnings quality - cash arriving AHEAD of booked profit (non-cash dep flowing back home, WC hunger modest); CFO/PAT 1.28 told the same story in a different ruler: two witnesses agreeing is where forensics rests its case","creative capitalization","window dressing"], "a":1,
   "w":"Negative accruals = cash outrunning opinion; the gold standard dresses plainly."},
  {"q":"A Beneish M-score of -0.9 (DSRI 1.6, TATA +0.09, GM defiance) tells the analyst to:",
   "o":["buy the growth","treat as manipulator-zone until three named pages reconcile (top-20 aging, provision-vs-aging deltas, CFO/PAT 5-year ribbon) - motive components can be innocent; accrual rows rarely are; investigate at normal speed or watch panic speed do it for you","wait for annual numbers","trim 25%"], "a":1,
   "w":"Receipts before verdicts, verdicts before positions."},
  {"q":"The interest-income vs cash-balance mismatch is a feared screen because:",
   "o":["interest is taxable","cash that exists EARNS - claimed Rs 20L earning 2.1% against a 6.5% sweep floor is either lazy (management failing) or NOT THERE (management lying); Satyam's imaginary balances failed this screen years before confessing, and it costs ninety seconds to run","banks report it","rates always vary"], "a":1,
   "w":"Money that earns nothing is either lazy or imaginary; both doors open audits."}],
"fa6": [
  {"q":"ShopKart's DSCR of ~5.7-5.8x places it:",
   "o":["at decline floors","in woo-the-customer territory - numerator (PAT + interest + dep - drawings) over (interest + scheduled principal) at thrice the strong-band floor of 2.0; professionals pair it with the trough print (~3.3x) so committees see headroom as policy, not luck","needing equity cures","at covenant breach"], "a":1,
   "w":"Floors define postures; posture decides pricing; pricing decides who calls whom sir."},
  {"q":"Drawing Power mechanics mean your Rs 30L sanctioned OD gives usable:",
   "o":["Rs 30L always","(stock x 75% + 90-day debtors x 75% - creditors), capped at sanction - the arithmetic ceiling, not the contractual one; treasuries designed against the sanction letter meet the DP page on the worst possible day","Rs 37.5L with margin","Rs 22.5L minus TDS"], "a":1,
   "w":"Sanction letters are ceilings upon ceilings; the true ceiling is three-form multiplication."},
  {"q":"Reading a bank, the PCR (provision coverage ratio) matters most because it tells:",
   "o":["deposit growth speed","provisioning honesty - rot admitted AND medicated (72%) beats rot admitted but left raw (58%): headline GNPA is the symptom, PCR is the prescription-compliance; provision-normalized profits are the only bank profits that travel across analysts uncorrected","branch count","CASA ratio"], "a":1,
   "w":"A bank's balance sheet reads like anyone's: what confessed, what provisioned, what still hidden."}],
"fa7": [
  {"q":"ShopKart's dual verdict, properly phrased, is:",
   "o":["buy everything, lend everything","EQUITY: investable window with a margin-ramp clock and the CF7 band; CREDIT: approve-class (DSCR 5.8/3.3, liquidation cover 1.58x) - same ledger read in two verdict-grammars, each with its own proof standards; the one-page autopsy made both in four minutes","sell: margins fell","wait for the next budget"], "a":1,
   "w":"Windows not adjectives, bands not soundbites, two proof-standards honored at once."},
  {"q":"FruitCart's interest-mismatch (Rs 0.42L on claimed Rs 20L average cash) convicts because:",
   "o":["interest is small anyway","claimed cash must EARN at sweep-floor (~6.5%): 2.1% implies the cash exists mostly on paper - the zero-price Satyam screen turning positive, and with it the file collapses from 'analyze' to 'investigate': existential rows outrank ratio-engines whenever they fire","banks round down","FDs pay 2% now"], "a":1,
   "w":"Money that earns nothing is either lazy or imaginary; both roads leave before valuation talk."},
  {"q":"The identical-P&L duel teaches, in one line:",
   "o":["PAT is luck","earnings are an INPUT, quality is the DIVISOR - accrual-sign, conversion-history, DuPont-species, and covenant posture price the same Rs 13L into a premium story and a committee file; 'same PAT, same price' is the retail reflex this course retires forever","always prefer leverage","turnover always wins"], "a":1,
   "w":"The multiplier is invisible right up until it isn't; screens before multiples, always."}],
"m10": ['''
rep('"m10": [', QUIZ)

open(dst, "w", encoding="utf-8").write(t)
print("WROTE", dst, len(t), "bytes")
