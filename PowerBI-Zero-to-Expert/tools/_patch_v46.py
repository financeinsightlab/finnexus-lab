#!/usr/bin/env python3
# Patch build_app_v45.py -> build_app_v46.py : + Ratio Analysis (rt1..rt7) + Time Value of Money (tv1..tv7)
import os
BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = os.path.join(BASE, "tools", "build_app_v45.py")
dst = os.path.join(BASE, "tools", "build_app_v46.py")
t = open(src, encoding="utf-8").read()

def rep(old, new, n=1):
    global t
    c = t.count(old)
    assert c == n, f"anchor count {c} != {n} for: {old[:70]!r}"
    t = t.replace(old, new)

rep('OUT = os.path.join(BASE, "PowerBI_Course_App_v45.html")',
    'OUT = os.path.join(BASE, "PowerBI_Course_App_v46.html")')

NEW_SECTIONS = '''
RT_SECTIONS = [
    ("RT_01_The_Ratio_System.md", "rt1", "RT1 · The Ratio System", "\\U0001F9EE", "5 families, 3 comparisons, 5 pitfalls, ShopKart panel"),
    ("RT_02_DuPont_Surgery.md", "rt2", "RT2 · DuPont Surgery", "\\U0001FA7A", "5-way 22.80%, earned vs borrowed ROE, g* 13.7%"),
    ("RT_03_Turnover_Cash_Machine.md", "rt3", "RT3 · Turnover & the Cash Machine", "\\U0001F504", "DIO/DSO/DPO, CCC 74d, growth tax Rs 17.0L"),
    ("RT_04_Bank_NBFC_Ratios.md", "rt4", "RT4 · Bank & NBFC Ratios", "\\U0001F3E6", "NIM 3.4, NNPA 0.70, PPOP, CRAR glide, ALM-first"),
    ("RT_05_Sector_Ratio_Packs.md", "rt5", "RT5 · Sector Ratio Packs", "\\U0001F3EA", "GMROI 1.84, ARPU/churn/CAC, Rule of 40, RevPAR"),
    ("RT_06_Ratio_Forensics.md", "rt6", "RT6 · Ratio Forensics", "\\U0001F575", "accruals -3.6 vs +9, Satyam test, DSRI 1.87, 6 costumes"),
    ("RT_07_Capstone_Ratio_Room.md", "rt7", "RT7 · CAPSTONE: The Ratio Room", "\\U0001F3C6", "Panels X/Y/Z, 5-pass protocol, verdicts, forge"),
]

TV_SECTIONS = [
    ("TV_01_The_One_Law.md", "tv1", "TV1 · The One Law", "\\u23F3", "FV/PV arrow, 3.1058L canon, J-curve, 72-rule"),
    ("TV_02_Annuities.md", "tv2", "TV2 · Annuities & Perpetuities", "\\U0001F4B8", "SIP 98.93L, pension 59.8L, Gordon 62.5, corpus 4.27Cr"),
    ("TV_03_Loans_EMI_Architecture.md", "tv3", "TV3 · Loans & EMI Architecture", "\\U0001F3E0", "EMI 26,992, split 22,500/4,492, flat 17.27%, prepay saves 10.4L"),
    ("TV_04_NPV_IRR.md", "tv4", "TV4 · NPV & IRR", "\\u2696\\uFE0F", "+0.81L / 15.24%, 3 traps, MIRR 13.77, XIRR"),
    ("TV_05_Rates_Frequencies.md", "tv5", "TV5 · Rates & Frequencies", "\\U0001F4DF", "EAR 12.68/12.75, real -1.37% FD, cc 51.1%"),
    ("TV_06_TVM_In_Markets.md", "tv6", "TV6 · TVM in Markets", "\\U0001F4C8", "bond 924.18, Gordon mirror, DCF 72% terminal, doses"),
    ("TV_07_Capstone_TVM_Desk.md", "tv7", "TV7 · CAPSTONE: The TVM Desk", "\\U0001F3C6", "Sharma file, 6-move protocol, defuse, forge"),
]
'''
rep('    ("PM_07_Capstone_Portfolio_Desk.md", "pm7", "PM7 · CAPSTONE: The Portfolio Desk", "\\U0001F3C6", "3 lives, Rs 19.3Cr engine, 50y SWP, IPS law, forge"),\n]\n',
    '    ("PM_07_Capstone_Portfolio_Desk.md", "pm7", "PM7 · CAPSTONE: The Portfolio Desk", "\\U0001F3C6", "3 lives, Rs 19.3Cr engine, 50y SWP, IPS law, forge"),\n]\n' + NEW_SECTIONS)

rep(' + EC_SECTIONS + PM_SECTIONS\n', ' + EC_SECTIONS + PM_SECTIONS + RT_SECTIONS + TV_SECTIONS\n')

rep('"dv": [], "fa": [], "fi": [], "in2": [], "ec": [], "pm": []}',
    '"dv": [], "fa": [], "fi": [], "in2": [], "ec": [], "pm": [], "rt": [], "tv": []}')
rep('"dv": 0, "fa": 0, "fi": 0, "in2": 0, "ec": 0, "pm": 0}',
    '"dv": 0, "fa": 0, "fi": 0, "in2": 0, "ec": 0, "pm": 0, "rt": 0, "tv": 0}')

rep('    if sid == "pm1":\n        _gcur = "pm"\n',
    '    if sid == "pm1":\n        _gcur = "pm"\n    if sid == "rt1":\n        _gcur = "rt"\n    if sid == "tv1":\n        _gcur = "tv"\n')

rep('    ("pm",    "🧺 Portfolio Management", "fin"),\n',
    '    ("pm",    "🧺 Portfolio Management", "fin"),\n    ("rt",    "🔍 Ratio Analysis", "fin"),\n    ("tv",    "⏳ Time Value of Money", "fin"),\n')

rep('NEW! 📒 Accounting · 🏦 Corporate Finance · 🧠 Behavioural Finance · 📉 Derivatives · 📊 Financial Statement Analysis · 🛡️ Fixed Income · 🇮🇳 Indian Market · 🌍 Economics · 🧺 Portfolio Management — from journal entries to macro desks and three lives on the portfolio table!)',
    'NEW! 📒 Accounting · 🏦 Corporate Finance · 🧠 Behavioural Finance · 📉 Derivatives · 📊 Financial Statement Analysis · 🛡️ Fixed Income · 🇮🇳 Indian Market · 🌍 Economics · 🧺 Portfolio Management · 🔍 Ratio Analysis · ⏳ Time Value of Money — from journal entries to the ratio room and the desk that prices time itself!)')
rep(' · 822 auto-graded quiz questions · ShopKart', ' · 864 auto-graded quiz questions · ShopKart')

rep('<div class="stat"><b data-count="274">0</b><span>Sections</span></div>',
    '<div class="stat"><b data-count="288">0</b><span>Sections</span></div>')
rep('<div class="stat"><b data-count="270">0</b><span>Hands-on labs</span></div>',
    '<div class="stat"><b data-count="284">0</b><span>Hands-on labs</span></div>')
rep('<div class="stat"><b data-count="822">0</b><span>Quiz questions</span></div>',
    '<div class="stat"><b data-count="864">0</b><span>Quiz questions</span></div>')

rep(' 274 sections across 43 courses: ',
    ' 288 sections across 45 courses: ')
rep('Economics & Portfolio Management (incl.',
    'Economics, Portfolio Management, Ratio Analysis & Time Value of Money (incl.')

QUIZ = '''"rt1": [
  {"q":"The primary reason analysts prefer ratios over raw statement numbers is:",
   "o":["They are harder to manipulate","They strip out scale, making companies comparable across size and time","They eliminate accounting choices","SEBI requires them"], "a":1,
   "w":"Rs 13.25L alone is noise; a 4.73% margin or 22.8% ROE is evidence."},
  {"q":"ShopKart's interest coverage of 8.7x means:",
   "o":["Debt is 8.7x equity","EBIT covers the annual interest bill 8.7 times - comfortable debt-service headroom","The interest rate is 8.7%","Profit is 8.7x sales"], "a":1,
   "w":"Coverage = 20.0 / 2.30 = 8.7: it measures servicing, not size or price."},
  {"q":"Current ratio 2.5, but 70% of current assets are slow inventory. The pitfall is:",
   "o":["snapshot vs average balances","the one-ratio verdict - liquidity is real only after you open the composition","negative denominators","valuation mismatch"], "a":1,
   "w":"The quick ratio exists to strip that inventory out."}],
"rt2": [
  {"q":"The 5-way DuPont chain that builds ROE is:",
   "o":["margin x leverage x coverage","tax burden x interest burden x operating margin x asset turnover x leverage","ROA x P/E x payout","current ratio x quick ratio x D/E"], "a":1,
   "w":"0.748 x 0.885 x 0.0714 x 2.69 x 1.79 = 22.8% - and it must multiply back."},
  {"q":"A and B both post 30% ROE; A runs 1.5x leverage with 9x coverage, B runs 5x with 2.2x. Verdict:",
   "o":["equally attractive - ROE matches","A's return is earned and recession-resistant; B's is an amplifier artifact with thin survival margin","B is better - leverage shows confidence","compare P/E ratios first"], "a":1,
   "w":"Identical ROE, opposite quality - DuPont exists to kill 30% = 30% thinking."},
  {"q":"Growing above g* (22.8% ROE, 40% payout) without new equity requires:",
   "o":["nothing - it is mathematically capped","better margins or asset sweat, deliberate leverage, or a payout cut","revaluing assets upward","aggressive revenue recognition"], "a":1,
   "w":"g* is a budget: fund growth by moving a lever, never by cosmetics."}],
"rt3": [
  {"q":"ShopKart's cash conversion cycle (DIO 81, DSO 45, DPO 52) equals:",
   "o":["178 days","74 days - inventory plus receivable days minus the supplier-credit offset","126 days","29 days"], "a":1,
   "w":"Suppliers fund 52 of the 126 gross days; 74 sit on ShopKart's own book."},
  {"q":"Sales grow Rs 84L with a 74-day CCC. The working-capital growth tax is about:",
   "o":["zero - profit funds growth","Rs 17.0L of new cash trapped in the cycle, on top of any capex","Rs 84L of new debt","Rs 2.3L of extra interest"], "a":1,
   "w":"Delta sales x CCC/365 - fund the tax before celebrating the growth."},
  {"q":"Why do DIO and DPO use COGS while DSO uses sales?",
   "o":["tradition, no reason","like-by-like: inventory and payables sit at cost while receivables genuinely arise from invoiced sales - mixing margin into DIO would flatter the cycle","SEBI mandates it","COGS is easier to find"], "a":1,
   "w":"Sales-for-DIO inflates the denominator by the gross margin."}],
"rt4": [
  {"q":"CityFirst: GNPA 2.8% and PCR 75% give an NNPA of:",
   "o":["2.1%","0.70% - GNPA x (1 - PCR), the unprovided rot future profits must absorb","3.5%","0.28%"], "a":1,
   "w":"GNPA is the admissions register; NNPA is the unpaid bill."},
  {"q":"A bank accretes capital at 13.5% while growing RWA at 18%, CRAR 16%. The professional forecast:",
   "o":["CRAR rises with profits","CRAR glides down toward comfort levels in roughly four years - plan a capital raise about two years before it bites","nothing - CRAR is static","the bank must merge immediately"], "a":1,
   "w":"16% x (1.135/1.18) each year does the prophesying."},
  {"q":"Why is D/E nearly useless for comparing banks?",
   "o":["banks hide debt figures","debt is a bank's raw material - healthy banks run 8-12x leverage by design, so CRAR carries the solvency question instead","RBI bans it","bank equity cannot be measured"], "a":1,
   "w":"For lenders, leverage is the product, not the sin."}],
"rt5": [
  {"q":"ShopKart's GMROI 1.84 beats FreshWala's 1.40 despite a lower gross margin because:",
   "o":["GMROI ignores margins","inventory turns 4.51x vs 2.7x - turn velocity out-multiplies margin richness","FreshWala has more stores","different reporting periods"], "a":1,
   "w":"GMROI = (GM/COGS) x turns: 0.4085 x 4.51 = 1.84."},
  {"q":"CloudKart: 45% growth with -12% FCF margin. Rule-of-40 verdict:",
   "o":["57 - elite","33 - fail: the sum must clear 40 however you buy the growth","45 - exactly at the line","the Rule does not apply above 40% growth"], "a":1,
   "w":"The Rule prices the fuel of growth, not just the speed."},
  {"q":"SafeShield's combined ratio of 103% (72% losses + 31% expenses) means:",
   "o":["3% underwriting profit","underwriting loses 3 paise per premium rupee and float investment income must save the P&L","shut it immediately","premiums are exactly 3% too high"], "a":1,
   "w":"Insuring skill vs investing luck - the combined ratio separates them."}],
"rt6": [
  {"q":"Vantage Agro posts CFO/PAT of 0.35 with accruals of +14.4%. This says:",
   "o":["working capital timing - ignore it","profits are running roughly 3x their cash shadow - the manufactured-earnings fingerprint","the firm underinvests in growth","tax rates fell"], "a":1,
   "w":"The two cheapest fraud screens in the toolkit; Vantage fails both."},
  {"q":"The Satyam interest test flags Rs 900L cash earning an implied 1.6% because:",
   "o":["law requires FDs","real cash earns a market-rate heartbeat; a 1.6% yield against a 6.5% FD floor means the cash may exist only in the chairman's letter","interest income is an expense","6.5% is the statutory treasury yield"], "a":1,
   "w":"Interest income is cash's witness - always call the witness."},
  {"q":"A persistent 4-5% effective tax rate (vs ~25% statutory) is a loud flag because:",
   "o":["low tax is always fraud","fake profits are tax-free by construction - nobody volunteers real tax on manufactured income, so the cash-tax line becomes the confessional","it proves auditor honesty","it proves export incentives conclusively"], "a":1,
   "w":"Legitimate shields declare themselves in deferred-tax notes."}],
"rt7": [
  {"q":"Panel X: ROE 23.7% to 40.6% while CFO/PAT collapses to 0.41 and tax falls to 9.8%. Verdict:",
   "o":["conviction - rare ROE growth","avoid / short-candidate - leverage-and-margin bloat performed by storytellers while every witness (cash, tax, auditor) contradicts","watch - one more quarter","buy the bonds instead"], "a":1,
   "w":"When storytellers and witnesses disagree, believe the witnesses."},
  {"q":"Panel Y's 0.90 CFO/PAT is honest while Panel X's 0.41 is forensic because:",
   "o":["both are equally suspicious","Y's gap is sovereign payment timing that reverses (5y average near 1, full tax paid, DSRI 1.06); X's gap widens monotonically - timing that never heals","Y's auditors are bigger","Y bills in dollars"], "a":1,
   "w":"A single year is a snapshot; the 5-year average is the X-ray."},
  {"q":"SteadyBrew guides 15% growth against a g* of 17.6%. Reading:",
   "o":["no ambition - short it","the guidance fits inside the self-funded ceiling with 2.6pp headroom - the signature of a plan that intends to be kept","mathematically dishonest","g* is irrelevant to guidance"], "a":1,
   "w":"Guide inside your arithmetic and the market can underwrite you."}],
"tv1": [
  {"q":"Rs 1L at 12% for 10 years compounds to:",
   "o":["Rs 2.2L","Rs 3.1058L - 1.12^10; every year the base itself is bigger","Rs 3.4L","Rs 12L"], "a":1,
   "w":"Reverse the arrow: Rs 1L due in 10y is worth Rs 32,197 today at 12%."},
  {"q":"The Rule of 72 at 8% puts doubling at about:",
   "o":["8 years","9 years (72/8; exact 9.01) - deadly accurate in the 6-12% band","10 years","7.2 years"], "a":1,
   "w":"For tripling use 114; the 72 family is a field instrument with error bars."},
  {"q":"Rs 13L in 5 years vs Rs 8L today at a 9% hurdle - the honest verdict:",
   "o":["take the 8 now - bird in hand","take the 13 later: its PV is Rs 8.45L, and the choice only flips above the 10.2% breakeven rate","coin flip","take 8 now - inflation"], "a":1,
   "w":"Convert every rupee to the same address before choosing."}],
"tv2": [
  {"q":"A Rs 10,000/month SIP for 20 years at 12% builds a corpus of:",
   "o":["Rs 24L","Rs 98.93L on Rs 24L contributed - the engine pays four times the feeder","Rs 50L","Rs 1.5Cr"], "a":1,
   "w":"Annuity FV factor at 1%/month for 240 months = 989.26."},
  {"q":"The price of a Rs 1L/year perpetuity at a 12% hurdle is:",
   "o":["Rs 12L","Rs 8.33L - 1/0.12; the first honest price of forever","Rs 1L","infinite"], "a":1,
   "w":"Growing 3% forever instead: 1/(0.12-0.03) = Rs 11.11L."},
  {"q":"College fees of Rs 2L/year for 4 years at 9%: year-start (due) vs year-end (ordinary) cost:",
   "o":["identical","due costs 6.48 x 1.09 = Rs 7.06L PV vs Rs 6.48L ordinary - the start-date shifts a full year of discounting","due is cheaper","depends on the college"], "a":1,
   "w":"Annuity-due = ordinary x (1+r); colleges know this math - sign accordingly."}],
"tv3": [
  {"q":"The first EMI on Rs 30L at 9% for 20 years (EMI Rs 26,992) splits as:",
   "o":["Rs 13,496 / Rs 13,496","Rs 22,500 interest / Rs 4,492 principal - each installment pays that month's interest on the outstanding first","Rs 4,492 interest / Rs 22,500 principal","entirely principal in year 1"], "a":1,
   "w":"Front-loading: at month 147 (year 13) principal finally beats interest."},
  {"q":"A dealer offers '10% flat for 5 years' on Rs 10L. The true reducing APR is about:",
   "o":["10% - flat and reducing are aliases","17.27% - you pay interest on the original principal for 60 months while returning it monthly","12.5%","20%"], "a":1,
   "w":"Thumb rule: reducing = flat x about 1.8; always demand the APR."},
  {"q":"Rs 5L spare, 5 years into the home loan (15 left). Highest-value use:",
   "o":["prepay and cut the EMI for comfort","prepay and cut TENURE keeping the EMI - deletes ~4.8 years and saves ~Rs 10.4L of interest, about 2.1x the prepayment","FD at 7%","gold"], "a":1,
   "w":"Tenure cuts attack the exponent; EMI cuts only save ~Rs 3.4L on the same Rs 5L."}],
"tv4": [
  {"q":"Machine: -Rs 10L, +Rs 3L/year for 5 years, hurdle 12%. NPV and IRR are:",
   "o":["NPV -0.81L, IRR 10% - reject","NPV +0.81L, IRR 15.24% - accept: it pays its 12% rent on time and tips Rs 81k besides","NPV +5L, IRR 30%","NPV 0, IRR 12%"], "a":1,
   "w":"3 x annuity(12%,5) = 3 x 3.6048 = 10.81 - 10 = +0.81."},
  {"q":"Project A (IRR 60%, NPV Rs 4.29L) vs Project B (IRR 36%, NPV Rs 10.71L); fund only one:",
   "o":["A - highest IRR always wins","B - it creates 2.5x the rupees; percentages cannot be spent, and incremental IRR of 30% confirms the upgrade","A - smaller is safer","reject both - judges disagree"], "a":1,
   "w":"Maximize NPV in rupees; IRR only narrates."},
  {"q":"A project with cash signs - + - shows NPV positive at 10% but negative at both 2% and 30%. Response:",
   "o":["quote the higher IRR","dismiss IRR (two sign changes give multiple roots) and rule with NPV at the hurdle plus sensitivity analysis","average the two IRRs","lower the hurdle until IRR behaves"], "a":1,
   "w":"Every sign flip can add a root; NPV is unique at a given hurdle."}],
"tv5": [
  {"q":"'12% per annum' compounded monthly gives an effective annual rate of:",
   "o":["12.00%","12.68% - (1.01)^12 - 1; frequency is the payload","12.12%","12.55%"], "a":1,
   "w":"The ladder: 12.00 annual / 12.36 half / 12.55 quarter / 12.68 monthly / 12.75 continuous."},
  {"q":"A 6.5% FD in the 30% slab with 6% inflation delivers a real post-tax return of:",
   "o":["+0.5%","-1.37% - post-tax 4.55% loses to inflation; the safe FD erodes purchasing power by design","+0.47%","+6.5%"], "a":1,
   "w":"Real = 1.0455/1.06 - 1. Safety is purchasing power, not zero volatility."},
  {"q":"A credit card at 'just 3.4% per month' actually costs per year:",
   "o":["40.8%","49.6% - (1.034)^12 - 1; the monthly quote hides a bonfire, so prepaying the card earns a guaranteed 49.6%","3.4%","depends on the bill cycle"], "a":1,
   "w":"Lenders quote the tiny monthly number because the annual truth would kill the product."}],
"tv6": [
  {"q":"The FI canon bond (Rs 1,000, 8% coupon, 5y) prices at Rs 924.18 under 10% YTM because:",
   "o":["coupons shrink by regulation","the market demands 10% on an 8% promise - discounting every rupee at 10% prices the shortfall below par","par value depreciates","duration subtracts 7.58% directly"], "a":1,
   "w":"At 9% YTM the same formula prints Rs 961.10 - one formula, the whole seesaw."},
  {"q":"In the five-stage DCF (FCF +12%/yr, WACC 12%, terminal g 4%), the terminal value supplies about:",
   "o":["25% of EV","72% of EV - most DCF value sits beyond the visible horizon, so underwrite WACC and terminal g first","50% of EV","zero - terminals are optional"], "a":1,
   "w":"139.3 / 192.9 = 72%: the afterlife writes the cheque."},
  {"q":"Same Rs 4.27Cr retirement at 12%: age 32 (28y) needs Rs 15,630/mo vs age 40 (20y) Rs 43,160/mo. Lesson:",
   "o":["older savers earn more, it evens out","the 8-year head start cuts the dose to 36% - time is the exponent, and delay is the most expensive tuition in finance","inflation explains the gap","the 40-year-old should simply take more risk"], "a":1,
   "w":"Factors 2,731 vs 989: the same corpus costs 64% less when time lifts."}],
"tv7": [
  {"q":"The Sharma household plan that breathes (44-45% of salary) totals about:",
   "o":["Rs 77k - flat doses only","Rs 67.9k - house 26.3k + college 18.45k + stepped retirement 6.5k + car EMI 16.6k","Rs 40k - skip the goals","Rs 1.5L - everything at once"], "a":1,
   "w":"The 10% step-up escalator lets today breathe while later, larger installments compound."},
  {"q":"The dealer's '7.5% flat' on Rs 8L / 5 years actually costs about:",
   "o":["7.5% - printed on the brochure","13.5% reducing - flat x ~1.8; Rs 18,333/mo and ~Rs 2.9L interest vs Rs 1.96L at honest 9%","9% - same as the bank","15% by RBI formula"], "a":1,
   "w":"Flat quotes are technically true and commercially fatal."},
  {"q":"'Guaranteed Double in 12 years' is defused by which arithmetic?",
   "o":["a credible return","72/12 = 6% - below inflation and taxable: a guarantee to stand still in purchasing power; long goals need growth assets","it is fraud, always","it suits the 6-year house fund"], "a":1,
   "w":"Not fraud - an honest, legal, bad deal. Decline politely with math."}],
'''
rep('"m10": [', QUIZ + '"m10": [')

open(dst, "w", encoding="utf-8").write(t)
print("patched ->", dst)
