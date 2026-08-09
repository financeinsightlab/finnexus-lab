#!/usr/bin/env python3
# Patch build_app_v36.py -> build_app_v37.py : adds Simple & Compound Interest course (si1..si6)
import io, re, sys

SRC = "tools/build_app_v36.py"
DST = "tools/build_app_v37.py"

s = io.open(SRC, encoding="utf-8").read()
orig_len = len(s)

def rep(old, new, n=1):
    global s
    c = s.count(old)
    assert c == n, f"anchor count {c} != {n} for: {old[:80]!r}"
    s = s.replace(old, new)

# 1) output version
rep('PowerBI_Course_App_v36.html', 'PowerBI_Course_App_v37.html')

# 2) new sections list after RA_SECTIONS
ra_tail = '    ("RA_06_Finance_Equity_Capstone.md", "ra6", "RA6 · FINANCE: Ratios in Money + Capstone", "\\U0001F4BC", "Deed layers, ROCE, D/E, Expansion Equity Pack"),\n]\n'
int_list = ra_tail + '''
INT_SECTIONS = [
    ("INT_01_Simple_Interest_Engine.md", "si1", "INT1 · The Simple Interest Engine", "\\U0001F3E6", "SI = PRT/100, reverse gears, credit stacks, engine-ID"),
    ("INT_02_Compound_Engine.md", "si2", "INT2 · The Compound Engine", "\\U0001F9E8", "1.1-ladder, jewel formula CI-SI = P(r/100)^2, autopsy"),
    ("INT_03_Frequencies_Fractions_72.md", "si3", "INT3 · Frequencies, Fractions & 72", "\\U0001F4C6", "gear-shifts, hybrid tails, 72 club, depreciation mirror"),
    ("INT_04_Installments_Classics.md", "si4", "INT4 · Installments & Time Classics", "\\U0001F4B3", "discounting PV, roll-forward audit, R.T = 100(k-1), k-fold chains"),
    ("INT_05_Traps_Triage_Mock.md", "si5", "INT5 · Traps, Triage & Mock Arena", "\\u26A1", "5 named traps, 5-gate radar, INT-01 arena"),
    ("INT_06_Finance_Treasury_Capstone.md", "si6", "INT6 · FINANCE: Treasury & Debt + Capstone", "\\U0001F4BC", "FD ladders, 42.6% unmask, EMI braid, Treasury Memo"),
]
'''
rep(ra_tail, int_list)

# 3) pipeline
rep(' + PL_SECTIONS + RA_SECTIONS\n', ' + PL_SECTIONS + RA_SECTIONS + INT_SECTIONS\n')

# 4) nav dicts
rep('"pl": [], "ra": []}', '"pl": [], "ra": [], "si": []}')
rep('"pb": 0, "pl": 0, "ra": 0}', '"pb": 0, "pl": 0, "ra": 0, "si": 0}')

# 5) group cursor
rep('    if sid == "ra1":\n        _gcur = "ra"\n',
    '    if sid == "ra1":\n        _gcur = "ra"\n    if sid == "si1":\n        _gcur = "si"\n')

# 6) GROUP_META
rep('    ("ra",    "⚖️ Ratio & Proportion", "apt"),\n]',
    '    ("ra",    "⚖️ Ratio & Proportion", "apt"),\n    ("si",    "🏦 Simple & Compound Interest", "apt"),\n]')

# 7) hero blurb + quiz count
rep('NEW! ⚖️ Ratio & Proportion) — every track basic→advanced, finance-flavored · 543 auto-graded quiz questions',
    'Ratio & Proportion · NEW! 🏦 Simple & Compound Interest) — every track basic→advanced, finance-flavored · 561 auto-graded quiz questions')

# 8) hero stat counters
rep('<b data-count="181">0</b><span>Sections</span>', '<b data-count="187">0</b><span>Sections</span>')
rep('<b data-count="177">0</b><span>Hands-on labs</span>', '<b data-count="183">0</b><span>Hands-on labs</span>')
rep('<b data-count="543">0</b><span>Quiz questions</span>', '<b data-count="561">0</b><span>Quiz questions</span>')

# 9) certificate line
rep(' 181 sections across 30 courses:', ' 187 sections across 31 courses:')
rep('Probability, Profit & Loss & Ratio & Proportion (incl.',
    'Probability, Profit & Loss, Ratio & Proportion & Simple & Compound Interest (incl.')

# 10) QUIZZES — insert si1..si6 before "m10"
qz = '''
"si1": [
  {"q":"ShopKart parks Rs 25,000 at 10% SI for 15 years - total interest:",
   "o":["Rs 25,000","Rs 37,500 - 25,000 x 10 x 15 / 100; flat P.R.T arithmetic, no compounding anywhere","Rs 12,500","Rs 15,000"], "a":1,
   "w":"SI = PRT/100, one multiplication. 12,500 stopped at year 5; 25,000 misread P as interest."},
  {"q":"A deposit earned Rs 6,250 SI on Rs 25,000 in 5 years - the rate:",
   "o":["10%","5% - R x T = 100 x SI / P = 25, so R = 25/5; reverse the same formula, never a new one","6.25%","2.5%"], "a":1,
   "w":"Rearrange the same line: R = 100.SI/(P.T)."},
  {"q":"The visual signature of simple-interest growth:",
   "o":["a rising curve, steeper each year","a straight line - equal absolute interest added every year (arithmetic growth)","flat until year 5, then a jump","a curve flattening over time"], "a":1,
   "w":"The curve belongs to CI. Equal increments = flat engine."}],
"si2": [
  {"q":"Rs 2,000 at 10% for 2 years: CI minus SI equals:",
   "o":["Rs 2","Rs 20 - P(r/100)^2 = 2,000 x 0.01; the jewel prices interest-on-interest directly","Rs 40","Rs 200"], "a":1,
   "w":"The gap IS interest on year-1's Rs 200."},
  {"q":"Rs 1,00,000 at 10% CI for 3 years matures at:",
   "o":["Rs 1,30,000","Rs 1,33,100 - 1.1 x 1.1 x 1.1 = 1.331 on the re-based pile; SI would underpay by 3,100","Rs 1,33,000","Rs 1,21,000"], "a":1,
   "w":"Three re-basings; 1,30,000 is the flat-engine fantasy."},
  {"q":"Fastest tell that an account compounds rather than runs simple:",
   "o":["the rate is above 8%","year-2's interest is BIGGER than year-1's - the base re-bases every cycle","interest credit is monthly","the passbook shows a digital badge"], "a":1,
   "w":"Growing yearly increments at a constant rate = re-basing = compound."}],
"si3": [
  {"q":"Rs 10,000 at 10% p.a. compounded HALF-YEARLY for 1 year grows to:",
   "o":["Rs 11,000","Rs 11,025 - two rests at 5%; the second serving adds the Rs 25","Rs 11,050","Rs 10,500"], "a":1,
   "w":"Rate/2, periods x2. The gear shift is worth money."},
  {"q":"Rule of 72: money doubles in 6 years. The rate:",
   "o":["6%","12% - 72/6; the club pairs always multiply to 72 (12x6, 8x9, 24x3)","7.2%","10%"], "a":1,
   "w":"Rate x years = 72, recited as pairs."},
  {"q":"A Rs 2,00,000 delivery van depreciates 10% a year (reducing balance). Value after 3 years:",
   "o":["Rs 1,40,000","Rs 1,45,800 - x0.9^3 = x0.729; depreciation is CI with a negative rate, never flat subtraction","Rs 1,34,000","Rs 1,50,000"], "a":1,
   "w":"1,40,000 melted flat 20,000 x 3; mirrors compound too."}],
"si4": [
  {"q":"A fridge sells on 2 annual installments of Rs 8,820 each at 5% CI - the fair cash price (principal):",
   "o":["Rs 17,640 (just add the installments)","Rs 16,400 - 8,820/1.05 = 8,400 and 8,820/1.1025 = 8,000; discount the future, never add it","Rs 16,800","Rs 16,000"], "a":1,
   "w":"Installment-addition trap. Timestamp every rupee, then add."},
  {"q":"Under SI, money doubles in 10 years. The rate:",
   "o":["7.2%","10% - doubling means interest = P, so R x T = 100(k - 1) = 100","20%","12%"], "a":1,
   "w":"7.2% is the CI answer (72 club) for the OTHER engine."},
  {"q":"CI doubles every 4 years. In 16 years money multiplies by:",
   "o":["x4","x16 - 16/4 = 4 doublings, 2^4 = 16; k-folds are powers, not multiples","x8","x64"], "a":1,
   "w":"Windows stack in the exponent: 2, 4, 8, 16. Adding doublings is the classic blunder."}],
"si5": [
  {"q":"Arena re-run: Rs 5,00,000 at 10% SI for 9 months earns interest of:",
   "o":["Rs 50,000","Rs 37,500 - 9 months = 0.75 years converts BEFORE P x R x T; the time-conversion ambush is the whole question","Rs 45,000","Rs 3,750"], "a":1,
   "w":"Disarm units, then multiply: 5,00,000 x 10 x 0.75/100."},
  {"q":"'10% per annum compounded half-yearly' for 1 year on Rs 10,000 vs plain annual - the extra earned:",
   "o":["Rs 0","Rs 25 - 11,025 - 11,000; the second serving of 5% that frequency-blind solvers never see","Rs 100","Rs 250"], "a":1,
   "w":"Frequency is a gear, not a garnish; gear-shifts compound quietly."},
  {"q":"The radar's FIRST gate before any interest arithmetic:",
   "o":["divide the rate by the frequency","ENGINE-ID - simple or compound, spoken aloud from the question's language; a wrong engine invalidates every dial after it","find the amount first","compute the doubling time"], "a":1,
   "w":"Engine first, frequency second, time-shape third, noun fourth, sanity fifth."}],
"si6": [
  {"q":"A credit card charging 3% PER MONTH really costs per year:",
   "o":["36%","42.6% - 1.03^12 = 1.4258; monthly rests compound twelve times and the nominal APR hides 6.6 points","39%","30%"], "a":1,
   "w":"(1+m)^12 - 1 whenever a rate wears /month on its sleeve."},
  {"q":"Rs 25,00,000 parked at 7.1% p.a. with quarterly rests for one year matures at about:",
   "o":["Rs 26,77,500","Rs 26.82 lakh - x1.01775^4 = x1.072913 gives 26,82,282; the quarterly gear beats flat 7.1% by Rs 4,782","Rs 26,10,000","Rs 27,05,000"], "a":1,
   "w":"26,77,500 used flat arithmetic; rests compound within the year."},
  {"q":"ShopKart's Rs 5,00,000 van loan at 12% (EMI Rs 11,122): the first month's interest strand is:",
   "o":["Rs 11,122","Rs 5,000 - balance x monthly 1% = 5,000; principal takes the remaining 6,122 and the braid begins","Rs 6,122","Rs 5,500"], "a":1,
   "w":"Interest on outstanding FIRST; the EMI residue attacks principal."}],
"m10": ['''
rep('"m10": [', qz)

io.open(DST, "w", encoding="utf-8").write(s)
print(f"patched {SRC} -> {DST}: {orig_len} -> {len(s)} bytes")
