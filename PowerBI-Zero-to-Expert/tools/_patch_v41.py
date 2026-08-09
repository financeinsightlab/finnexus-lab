#!/usr/bin/env python3
# Patch build_app_v40.py -> build_app_v41.py : add Finance Core umbrella + Accounting (ac1..ac10)
import os, sys

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = os.path.join(BASE, "tools", "build_app_v40.py")
dst = os.path.join(BASE, "tools", "build_app_v41.py")
t = open(src, encoding="utf-8").read()

def rep(old, new, n=1):
    global t
    c = t.count(old)
    assert c == n, f"anchor count {c} != {n} for: {old[:70]!r}"
    t = t.replace(old, new)

# 1) OUTPUT file -------------------------------------------------------------
rep('OUT = os.path.join(BASE, "PowerBI_Course_App_v40.html")',
    'OUT = os.path.join(BASE, "PowerBI_Course_App_v41.html")')

# 2) AC_SECTIONS list after TW_SECTIONS --------------------------------------
AC_SECTIONS_BLOCK = '''
AC_SECTIONS = [
    ("AC_01_Double_Entry_DNA.md", "ac1", "AC1 · Double-Entry DNA", "\\U0001F4D2", "equation, debit=credit grammar, journals, T-accounts, TB"),
    ("AC_02_Accounting_Cycle_Accruals.md", "ac2", "AC2 · The Cycle & Accrual Religion", "\\U0001F504", "cash vs accrual, adjustments, closing, matching"),
    ("AC_03_Income_Statement_Engineering.md", "ac3", "AC3 · Income Statement Engineering", "\\U0001F4C8", "revenue-to-PAT ladder, EBITDA vs EBIT vs PBT, EPS"),
    ("AC_04_Balance_Sheet_Architecture.md", "ac4", "AC4 · Balance Sheet Architecture", "\\U0001F3DB\\uFE0F", "anatomy, working capital, articulation via RE"),
    ("AC_05_Cash_Flow_Mastery.md", "ac5", "AC5 · Cash Flow Statement Mastery", "\\U0001F4A7", "direct vs indirect, CFO/CFI/CFF, 3-statement knot"),
    ("AC_06_Revenue_Receivables_Provisions.md", "ac6", "AC6 · Revenue, Receivables & Provisions", "\\U0001F9FE", "Ind AS 115 five steps, aging & ECL, early-pay 37.2%"),
    ("AC_07_Inventory_COGS_Economics.md", "ac7", "AC7 · Inventory & COGS Economics", "\\U0001F4E6", "FIFO vs WAC, NRV, shrinkage, inventory days & GMROI"),
    ("AC_08_Fixed_Assets_Depreciation_Capex.md", "ac8", "AC8 · Fixed Assets, Depreciation & Capex", "\\U0001F69A", "capitalize vs expense, SLM vs WDV, impairment, disposals"),
    ("AC_09_Liabilities_Provisions_Equity.md", "ac9", "AC9 · Liabilities, Provisions & Equity", "\\u2696\\uFE0F", "debt vs equity, provision triad, dividends & buybacks"),
    ("AC_10_Capstone_Forensics_Interview_Forge.md", "ac10", "AC10 · CAPSTONE: Books-to-Board & Forensics", "\\U0001F3C6", "JE-to-TB sprint, QoE red flags, interview forge"),
]
'''
rep('"crew-vs-penalty corner, biller rosters, staffing pack"),\n]\n',
    '"crew-vs-penalty corner, biller rosters, staffing pack"),\n]\n' + AC_SECTIONS_BLOCK)

# 3) master list --------------------------------------------------------------
rep(' + TSD_SECTIONS + TW_SECTIONS\n',
    ' + TSD_SECTIONS + TW_SECTIONS + AC_SECTIONS\n')

# 4) nav group dicts ----------------------------------------------------------
rep('"sd": [], "tw": []}', '"sd": [], "tw": [], "ac": []}')
rep('"sd": 0, "tw": 0}', '"sd": 0, "tw": 0, "ac": 0}')

# 5) group cursor switch ------------------------------------------------------
rep('    if sid == "tw1":\n        _gcur = "tw"\n',
    '    if sid == "tw1":\n        _gcur = "tw"\n    if sid == "ac1":\n        _gcur = "ac"\n')

# 6) GROUP_META ---------------------------------------------------------------
rep('    ("tw",    "⏱️ Time & Work", "apt"),\n',
    '    ("tw",    "⏱️ Time & Work", "apt"),\n    ("ac",    "📒 Accounting", "fin"),\n')

# 7) UMBRELLA_META ------------------------------------------------------------
rep('    ("apt", "🧮 Aptitude"),\n',
    '    ("apt", "🧮 Aptitude"),\n    ("fin", "💼 Finance Core"),\n')

# 8) hero blurb ----------------------------------------------------------------
rep('Three umbrellas now — ',
    'Four umbrellas now — ')
rep('NEW! ⏱️ Time & Work) — every track basic→advanced, finance-flavored · 618 auto-graded quiz questions',
    'NEW! ⏱️ Time & Work) · 💼 <b>FINANCE CORE</b> (NEW! 📒 Accounting — 10 modules: journal entries → statements → cash flow → forensics & board packs!) — every track basic→advanced, finance-flavored · 648 auto-graded quiz questions')

# 9) hero counters -------------------------------------------------------------
rep('<div class="stat"><b data-count="206">0</b><span>Sections</span></div>',
    '<div class="stat"><b data-count="216">0</b><span>Sections</span></div>')
rep('<div class="stat"><b data-count="202">0</b><span>Hands-on labs</span></div>',
    '<div class="stat"><b data-count="212">0</b><span>Hands-on labs</span></div>')
rep('<div class="stat"><b data-count="618">0</b><span>Quiz questions</span></div>',
    '<div class="stat"><b data-count="648">0</b><span>Quiz questions</span></div>')

# 10) certificate line ---------------------------------------------------------
rep(' 206 sections across 34 courses: ',
    ' 216 sections across 35 courses: ')
rep('Time Speed & Distance & Time & Work (incl.',
    'Time Speed & Distance, Time & Work & Accounting (incl.')

# 11) QUIZZES: ac1..ac10 (insert before "m10") ---------------------------------
QUIZ = '''"ac1": [
  {"q":"Owner introduces \\u20B950,00,000 cash into ShopKart. The equation moves:",
   "o":["Cash up, Revenue up","Assets up \\u20B950L (Cash), Equity up \\u20B950L (Capital) - every transaction keeps Assets = Liabilities + Equity; capital-introduction touches no income account","Cash up, Liabilities up","Cash up, Profit up"], "a":1,
   "w":"Equity is the owner's claim; revenue is earned by selling, not by investing."},
  {"q":"ShopKart buys a delivery van for \\u20B915L cash. In the T-accounts:",
   "o":["Expense up, Cash down","One asset (Van) debited, another (Cash) credited - an asset SWAP inside the equation; nothing about profit moved, and the TB stays level by construction","Asset up, Capital up","Revenue up, Cash down"], "a":1,
   "w":"Swaps are the quietest legal moves in accounting; expensing a van (a) would be a principle error AC8 hunts."},
  {"q":"A trial balance that balances PROVES:",
   "o":["the books are fully correct","Arithmetical discipline only - omissions, wrong accounts, wrong principles and compensating errors all sail through a balanced TB","profit is correctly computed","all postings reached the right accounts"], "a":1,
   "w":"A TB is a checksum, not an audit. Forensics (AC10) begins exactly where the TB ends."}],
"ac2": [
  {"q":"ShopKart pays \\u20B93L on 25 December covering December and January rent. Accrual accounting records December expense of:",
   "o":["\\u20B93,00,000","\\u20B91,50,000 - expense follows consumption; the other \\u20B91.5L sits as a Prepaid ASSET until January burns it (matching principle)","zero, cash year differs","\\u20B92,00,000"], "a":1,
   "w":"Cash timing is trivia; consumption is scripture. (a) is the cash-bias shopkeeper reflex."},
  {"q":"Every adjusting entry touches:",
   "o":["two balance-sheet accounts","One P&L account and one balance-sheet account - the religion's fingerprint; rent-prepaid defers expense into an asset, accrued salary creates expense with a liability","two nominal accounts","two revenue accounts"], "a":1,
   "w":"One leg measures, the other holds. Two-BS-legs or two-P&L-legs adjustments are category errors."},
  {"q":"A Suspense A/c appearing in a trial balance means:",
   "o":["the books are certified healthy","Debits \\u2260 credits somewhere and the difference was force-parked - fix the root error and zero it; suspense must never reach the statements","a new equity reserve","audit is complete"], "a":1,
   "w":"Suspense is an IOU from the ledger to arithmetic; honorable books repay it before anyone reads the statements."}],
"ac3": [
  {"q":"ShopKart FY25: COGS = Opening 41.7 + Purchases 205.0 - Closing 44.2 = \\u20B9198.8L. If closing stock had been OVERSTATED by \\u20B95L:",
   "o":["COGS falls to \\u20B9193.8L honest","COGS falls \\u20B95L and profit INFLATES by the same \\u20B95L - the identity turns inventory fiction into instant PBT; closing-stock overstatement is the oldest profit factory in commerce","only the balance sheet is affected","purchases rise \\u20B95L"], "a":1,
   "w":"The \\u20B95L flows straight to PBT - why auditors exist, and why AC10 forensics counts boxes."},
  {"q":"EBITDA (\\u20B926.0L) sits between gross profit and EBIT because it:",
   "o":["includes depreciation, excludes interest","Strips out D&A, financing, and tax choices - measuring the cash-earning power of OPERATIONS alone; the banker's favorite rung for EV/EBITDA multiples and loan covenants","equals cash flow from operations","is the tax base"], "a":1,
   "w":"(a) is EBIT's definition in disguise; EBITDA is not CFO when working capital is hungry - AC5's lesson."},
  {"q":"ShopKart's EPS (PAT \\u20B913.25L, 5,00,000 shares):",
   "o":["\\u20B926.50","\\u20B92.65 - PAT per claimant; dividend \\u20B90.53 at 20% payout retains \\u20B92.12 for next year's earnings engine (at \\u20B930 market the P/E teaser is 11.3x)","\\u20B96.63","\\u20B913.25"], "a":1,
   "w":"Per-share literacy is the whole retail-investor game; (a) multiplied by 10 somewhere, (c) took the dividend as numerator."}],
"ac4": [
  {"q":"ShopKart FY25 closes: Reserves move from \\u20B92.8L to \\u20B913.4L because:",
   "o":["revenue grew","Articulation: opening RE 2.8 + PAT 13.25 - dividend 2.65 = 13.4 - the P&L pours into the balance sheet through retained earnings; the snapshot is the video's residue","capital increased","assets were revalued"], "a":1,
   "w":"Capital transactions and trading results are different doors into equity; only one of them is open at year-end."},
  {"q":"Working capital (CA 89.2 - CL 43.3 = \\u20B945.9L) while PAT was \\u20B913.25L. The lesson:",
   "o":["accounting error - WC should equal PAT","Profit got REINVESTED into stock, debtors and prepaids instead of idling as cash - 'profit is opinion, cash is fact' is written in working capital, which is why bankers read deltas, not headlines","creditors were overpaid","WC must be cut to match PAT"], "a":1,
   "w":"The delta column of a balance sheet IS the cash's diary; AC5 turns it into the formal statement."},
  {"q":"Buying 8-year-life store fit-outs using the recallable-any-day bank OD is:",
   "o":["smart - OD is cheaper","A funding mismatch - long assets financed on short money; the rate is cheaper but every renewal is a coin-flip; term loans or leases match tenors and kill the spiral risk","illegal","a tax optimization"], "a":1,
   "w":"The 1% you save is your fee for carrying refinancing risk all year; credit officers are paid to find exactly this in 20 seconds."}],
"ac5": [
  {"q":"ShopKart FY25's CFO is \\u20B916.95L against PAT \\u20B913.25L chiefly because:",
   "o":["creditors were underpaid","The \\u20B96L depreciation is a non-cash charge added back, and working capital ate only \\u20B94.6L of it - quality conversion (CFO/PAT \\u2248 1.28) is the pulse of earnings you can bank","capital was raised","tax was deferred"], "a":1,
   "w":"(c) would land in CFF, not CFO; suppliers rose only 0.9 - the conversion hero is the non-cash add-back."},
  {"q":"Depreciation rises by \\u20B910 (tax rate 25%). The three-statement walk gives:",
   "o":["PAT -10, CFO -10, cash -10","PAT -7.5, CFO +2.5, BS balances with block -10 / cash +2.5 / RE -7.5 - depreciation is an inside charge: only the tax shield moves in cash","PAT -7.5, CFO -7.5, BS balances","nothing - depreciation is non-cash"], "a":1,
   "w":"The nuke is the standard interview gate because it forces ALL the plumbing at once."},
  {"q":"Persistent CFO < PAT with ever-growing receivables most strongly suggests:",
   "o":["prudent banking","Toilet-paper profits - earnings that live in warehouses and invoices rather than the drawer; quality-of-earnings red flag number one (AC10's opening casefile)","excellent collections","rapid healthy growth"], "a":1,
   "w":"The pulse test: CFO/PAT < 1 persistently = paper profits; Satyam veterans nod grimly."}],
"ac6": [
  {"q":"\\u20B91,200 hamper contract (\\u20B9900 hamper + \\u20B9300 twelve-month service, allocated from standalone prices). January revenue recognized:",
   "o":["\\u20B91,200 - cash is in the drawer","\\u20B9925 - performance drives recognition: hamper delivered (900, point-in-time) + one month of service (300/12 = 25); the rest sits as a contract liability until served","\\u20B9900","\\u20B91,000"], "a":1,
   "w":"Cash-vs-earned is the loudest confusion in accounting; the five-step machine settles it permanently."},
  {"q":"ShopKart's aging ladder (26 @1%, 7 @4%, 5 @12%) sets a provision of:",
   "o":["\\u20B938L","\\u20B91.14L - expected credit loss is portfolio honesty: 0.26 + 0.28 + 0.60, debtors shown net \\u20B936.86L, and next year the provision moves only by its delta","\\u20B90.60L","\\u20B93.80L"], "a":1,
   "w":"(a) is gross, (c) is only the >60-day bucket; ECL is an estimate of the whole portfolio's shadow."},
  {"q":"Vendor terms: 2/10-net-30. Paying on day 30 instead of availing the discount implies an annualized cost of:",
   "o":["2%","37.2% - (2/98) x (365/20): two percent for twenty days of credit is the most expensive politeness in business; taking the discount beats every bank overdraft on the street","24%","12%"], "a":1,
   "w":"(c) is the naive x12 linearization; compute on the 98 you actually stretch - the base rewards the credit extended."}],
"ac7": [
  {"q":"ShopKart FY25's closing stock (Opening 41.7 + Purchases 205.0 - COGS 198.8):",
   "o":["\\u20B9236.8L","\\u20B944.2L - the tripod identity; auditors corner any fake corner because the other two are checked by independent roads (count + registers)","\\u20B941.7L","\\u20B96.2L"], "a":1,
   "w":"Three-corner recover mastery is the auditor reflex this course hammers."},
  {"q":"In the rising-price basket (70\\u219273\\u219276), FIFO versus WAC reports:",
   "o":["identical profit","HIGHER pretax profit under FIFO (\\u20B9337.50 in the 200-unit basket) - oldest cheapest costs hit COGS first, leaving the recent pricey stock on a healthy BS; the price: more tax today","lower stock value under FIFO","lower profit under FIFO always"], "a":1,
   "w":"Valuation is not physics: identical boxes, different accounts. Policy choice shapes earnings texture."},
  {"q":"NRV markdown on the \\u20B9800-cost hoodie (expected sale \\u20B9750, \\u20B960 selling cost):",
   "o":["\\u20B950","\\u20B9110 - NRV = 750 - 60 = 690, and prudence cuts at the lower of cost vs NRV, per class, never reversing upward until sold","\\u20B9140","\\u20B90 - wait for the sale"], "a":1,
   "w":"(a) forgot selling costs; (c) treated NRV as the price tag unnetted."}],
"ac8": [
  {"q":"Van \\u20B915L, salvage \\u20B91L, 8-year SLM: annual charge and net block after year 2:",
   "o":["\\u20B91.875L, \\u20B911.25L","\\u20B91.75L and \\u20B911.5L - (15-1)/8 straight-lined; two years of matching = 3.5 consumed; accumulation never touches the van's cost history (gross 15 stays)","\\u20B92.5L, \\u20B910L","\\u20B91.75L, \\u20B912.25L"], "a":1,
   "w":"(a) forgot salvage; (c) invented \\u20B92L salvage - read the problem's numbers, not the answer's style."},
  {"q":"A routine van service (\\u20B918,000) versus an engine overhaul that adds three life-years (\\u20B91.6L):",
   "o":["both expenses","Service = expense (restore), overhaul = capitalize (extend beyond original condition) - the battlefield gate is FUTURE BENEFIT, verified with before/after capacity evidence, not with invoices","both capitalize","split each 50:50"], "a":1,
   "w":"Accountants who capitalize services to flatter EBITDA meet auditors with capacity meters; this exact gate is where margin-games die."},
  {"q":"'Depreciation is a source of funds' is:",
   "o":["correct - CFO adds it back","Wrong - it is an ALLOCATION of a past outflow (non-cash); the only cash it ever moves is the tax shield (dep x rate); the add-back says the money never left this year, not that any arrived","correct only for profitable firms","correct only in year 1"], "a":1,
   "w":"Language precision here separates treasury thinkers from exam tourists; the guillotine drops kindly on the prepared."}],
"ac9": [
  {"q":"A customer lawsuit with probable unfavorable outcome estimated at \\u20B91.2L should be:",
   "o":["disclosed in notes only","BOOKED as a provision - present obligation + probable + reliably estimable = Dr P&L, Cr Provision (possible-only claims stay as contingent disclosures; inflows stay silent until virtually certain)","ignored until judgement","paid immediately"], "a":1,
   "w":"Probable + measurable is the booking trigger; the triad exists precisely to stop 'we will see' accounting."},
  {"q":"ShopKart issues 10,000 shares at \\u20B940 (par \\u20B910). The \\u20B930 premium per share lands in:",
   "o":["the P&L as other income","Securities Premium within EQUITY - over-par consideration is capital-claim money, never income; it strengthens net worth without a single rupee of operations","a contingent reserve","retained earnings"], "a":1,
   "w":"Premiums are equity's applause section; booking them as profit is an old scam red-flagged in every fraud syllabus."},
  {"q":"Buying back 10% of shares with \\u20B915L cash while PAT is unchanged leaves EPS:",
   "o":["unchanged - cash left","~11% HIGHER purely arithmetically (PAT spread over 10% fewer shares) - the accretion illusion: beautiful per-share optics with zero operational improvement; dividends never change per-share arithmetic at all","lower - buyback cost money","lower - fewer earners"], "a":1,
   "w":"Per-share metrics react to denominators as well as numerators; ask 'WHAT operated better?' before applauding any optics."}],
"ac10": [
  {"q":"Phase 1's TB sprint taught, at the cash-level check, that:",
   "o":["a balanced TB proves the books complete","The customer advance (\\u20B940) was double-counted into cash - cash lines reconcile independently first (597, not 637); TB 'balance' can coexist with mis-postings; arithmetic checks certify columns, not completeness","discounts don't affect cash","typed totals are trustworthy"], "a":1,
   "w":"Double-entry balances by construction; fraud and fumbles both dress inside that clause. Bank reconciliation is respect."},
  {"q":"ShopKart FY25's FY-pack shows CFO/PAT of 1.28 with FCF \\u20B913.67L. The board's honest read:",
   "o":["profits are paper","Earnings convert to cash at a healthy rate - non-cash dep added back while WC hunger stayed modest - and the \\u20B92.65L dividend is a fraction of FCF; growth headroom intact, no financing gymnastics","unrelated numbers","sell the stock immediately"], "a":1,
   "w":"Quality = cash-confirming profits. When conversion dips below 1 for LONG, the flags start flying, not before."},
  {"q":"The single question that most reliably separates quality earnings from costume jewelry:",
   "o":["How big is marketing spend?","Show me CFO versus PAT across five years, with the receivable and stock deltas - conversion reveals what rungs dress up; the deltas name exactly WHERE the costume sits","Who is the auditor?","What is the P/E?"], "a":1,
   "w":"Every other flag eventually confesses in conversion; five years leaves no costume unworn."}],
"m10": ['''
rep('"m10": [', QUIZ)

open(dst, "w", encoding="utf-8").write(t)
print("WROTE", dst, len(t), "bytes")
