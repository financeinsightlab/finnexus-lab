#!/usr/bin/env python3
# Patch build_app_v39.py -> build_app_v40.py : adds Time & Work course (tw1..tw6)
import io

SRC = "tools/build_app_v39.py"
DST = "tools/build_app_v40.py"

s = io.open(SRC, encoding="utf-8").read()
orig_len = len(s)

def rep(old, new, n=1):
    global s
    c = s.count(old)
    assert c == n, f"anchor count {c} != {n} for: {old[:80]!r}"
    s = s.replace(old, new)

rep('PowerBI_Course_App_v39.html', 'PowerBI_Course_App_v40.html')

tsd_tail = '    ("TSD_07_Finance_Fleet_Costing_Capstone.md", "sd7", "TSD7 · FINANCE: Fleet Costing + Capstone", "\\U0001F4B8", "Rs 4/km + Rs 150/h tariff, batching dividend, fleet sheet"),\n]\n'
tw_list = tsd_tail + '''
TW_SECTIONS = [
    ("TW_01_Rate_Engine_LCM.md", "tw1", "TW1 · The Rate Engine — LCM Units & Man-Days", "\\u23F1\\uFE0F", "1/n flips, LCM tank, M1D1 = M2D2 invariant"),
    ("TW_02_Efficiency_Wages.md", "tw2", "TW2 · Efficiency & Wages", "\\U0001F4B0", "flow ratios, inverse days, pay-by-work-done splits"),
    ("TW_03_Alternates_Leavers_Joiners.md", "tw3", "TW3 · Alternates, Leavers & Joiners", "\\U0001F501", "cycle + day-walk, two stopwatches, bank-then-price"),
    ("TW_04_Pipes_Cisterns_Leaks.md", "tw4", "TW4 · Pipes, Cisterns & Leaks", "\\U0001F527", "signed flows, net-flow fill times, leak autopsy"),
    ("TW_05_Traps_Triage_Mock.md", "tw5", "TW5 · Traps, Triage & Mock Arena", "\\u26A1", "5 named traps, 5-gate radar, TW-01 arena"),
    ("TW_06_Finance_Staffing_Capstone.md", "tw6", "TW6 · FINANCE: Festive Staffing Pack + Capstone", "\\U0001F4CB", "crew-vs-penalty corner, biller rosters, staffing pack"),
]
'''
rep(tsd_tail, tw_list)

rep(' + SY_SECTIONS + TSD_SECTIONS\n', ' + SY_SECTIONS + TSD_SECTIONS + TW_SECTIONS\n')

rep('"sy": [], "sd": []}', '"sy": [], "sd": [], "tw": []}')
rep('"sy": 0, "sd": 0}', '"sy": 0, "sd": 0, "tw": 0}')

rep('    if sid == "sd1":\n        _gcur = "sd"\n',
    '    if sid == "sd1":\n        _gcur = "sd"\n    if sid == "tw1":\n        _gcur = "tw"\n')

rep('    ("sd",    "🚄 Time, Speed & Distance", "apt"),\n]',
    '    ("sd",    "🚄 Time, Speed & Distance", "apt"),\n    ("tw",    "⏱️ Time & Work", "apt"),\n]')

rep('Syllogisms · NEW! 🚄 Time Speed & Distance) — every track basic→advanced, finance-flavored · 600 auto-graded quiz questions',
    'Syllogisms · Time Speed & Distance · NEW! ⏱️ Time & Work) — every track basic→advanced, finance-flavored · 618 auto-graded quiz questions')

rep('<b data-count="200">0</b><span>Sections</span>', '<b data-count="206">0</b><span>Sections</span>')
rep('<b data-count="196">0</b><span>Hands-on labs</span>', '<b data-count="202">0</b><span>Hands-on labs</span>')
rep('<b data-count="600">0</b><span>Quiz questions</span>', '<b data-count="618">0</b><span>Quiz questions</span>')

rep(' 200 sections across 33 courses:', ' 206 sections across 34 courses:')
rep('Syllogisms & Time Speed & Distance (incl.',
    'Syllogisms, Time Speed & Distance & Time & Work (incl.')

qz = '''
"tw1": [
  {"q":"A does a job in 12 days, B in 18. Together (LCM tank of 36 units):",
   "o":["15 days","7.2 days - flows 3 + 2 = 5 u/d against the 36-unit tank; rates add, days divide, and 12 + 18 = 30 stays the founding felony","6 days","30 days"], "a":1,
   "w":"Smell-test: must beat 12 (A solo) and lose to 6 (halving A). 7.2 sits between."},
  {"q":"A shelf-reset needs 150 man-days. With 25 men it takes:",
   "o":["12 days","6 days - M1D1 = M2D2: the man-day bill is fixed; headcount moves the calendar, not the invoice","5 days","10 days"], "a":1,
   "w":"At Rs 2,500/man-day the job costs Rs 3.75L however you staff it."},
  {"q":"A (12 d) works 4 days alone, then B (18 d) joins to finish. Total time:",
   "o":["8 days","8.8 days - tank 36: A banks 12, joint flow 5 u/d clears the remaining 24 in 4.8; 4 + 4.8","9.6 days","10 days"], "a":1,
   "w":"Phase-wise tank bookkeeping: bank first, then joint flow."}],
"tw2": [
  {"q":"'A is 3:2 against B in efficiency' means their day-ratios are:",
   "o":["3:2 as well","2:3 - efficiency divides the calendar: better workers finish in fewer days, so times sit inverse to flows","9:4","3:5"], "a":1,
   "w":"Tank proof: flows 3+2, together 6 days = 30 units; A 10 d, B 15 d."},
  {"q":"Shelf-dressing pool of Rs 750; two workers (flows 3:2), same attendance. Senior's cheque:",
   "o":["Rs 375","Rs 450 - money follows work-done: 3/5 of the pool; equal attendance makes wage ratio = flow ratio (450:300 canon)","Rs 500","Rs 600"], "a":1,
   "w":"Pools buy units of work, not hours of presence."},
  {"q":"A does a job in 10 days; B is 25% MORE efficient. B's calendar:",
   "o":["12.5 days","8 days - divide days by 1.25: 10/1.25; more efficient means fewer days, and 12.5 adds the percentage in the wrong direction","7.5 days","9 days"], "a":1,
   "w":"x1.25 rate = /1.25 time. Say the direction before dividing."}],
"tw3": [
  {"q":"A (10 d) and B (20 d) work alternate days, A starting (tank 20, flows 2 and 1). Total time:",
   "o":["13.33 days","13 days - six 2-day cycles bank 18; day 13 is A's hammer adding the final 2 units; fractional calendars ignore discrete daily lumps","15 days","12 days"], "a":1,
   "w":"Cycles first, then the day-walk. Averages decapitate in this chapter."},
  {"q":"A (12 d) and B (18 d) work together for 4 days, then A leaves. Total PROJECT time:",
   "o":["8 days","12 days - tank 36: bank 4x5 = 20 units; B finishes 16 at 2 u/d in 8; the 4 banked days still count on the project's stopwatch","16 days","10 days"], "a":1,
   "w":"B's solo stretch is 8; the project's clock reads 12. Two stopwatches."},
  {"q":"On that same leaver problem, B's man-days billed vs A's (flows 2 and 3):",
   "o":["equal - teamwork","B: 24, A: 12 - B attended all 12 days (24 units), A only 4 (12 units); the checksum 24 + 12 = 36 never lets a unit ghost the ledger","B: 16, A: 20","B: 18, A: 18"], "a":1,
   "w":"Ledger: tenure x flow each; the bill prices attendance times rate."}],
"tw4": [
  {"q":"Pipes fill in 12 h and 18 h; a tap empties in 20 h. Together (180-unit tank):",
   "o":["11.25 days","11.25 h - net flow 15 + 10 - 9 = 16 u/h; the emptier carries its minus into the table, and 180/16 is the only line needed","5.29 h","7.29 h"], "a":1,
   "w":"5.29 h is the sign-flip's trophy; 7.29 h forgot nothing - it added the leak as help."},
  {"q":"A tap fills a tank in 12 h; with a leak it takes 24 h. The leak alone empties a full tank in:",
   "o":["36 h","24 h - with-leak net = 7.5 u/h, so the leak swallows 15 - 7.5 = 7.5 u/h; drain solo = 180/7.5 = 24 (a two-line autopsy)","12 h","18 h"], "a":1,
   "w":"Leak strength = solo fill flow minus with-leak net."},
  {"q":"Filler (6 h) versus emptier (4 h) on one tank - after 12 hours the tank is:",
   "o":["half full","still empty - net = 30 - 45 = -15 u/h; the drain outruns the tap, so it NEVER fills (write 'never', not a negative time)","full","one-third full"], "a":1,
   "w":"Net sign is the verdict; a drowning tank does not negotiate."}],
"tw5": [
  {"q":"Arena re-run: A: 15 days, B: 20 days, together:",
   "o":["35 days","60/7 = 8.57 days - tank 60: 4 + 3 = 7 u/d; ADD-THE-DAYS dies because two workers never take longer than the slower one solo","8 days","12 days"], "a":1,
   "w":"Flows are the only things allowed to add in this chapter."},
  {"q":"A 240 man-day job is staffed with 20 auditors (12 days). Would 30 auditors cost LESS?",
   "o":["yes - 30 is more efficient","no - man-days is the invariant: 30 auditors finish in 8 days but still burn 240 man-days and Rs 6,00,000; headcount moves the calendar, not the invoice","yes, by exactly one-third","no - more auditors is always slower"], "a":1,
   "w":"MAN-DAY DILUTION is the belief that headcount discounts the bill."},
  {"q":"Pipes 12 h and 18 h fill, tap empties in 20 h - forgetting the tap's minus gives 7.29 h. Truth:",
   "o":["7.29 h was correct","11.25 h - SIGN FLIP identified: the emptier subtracts (net 15+10-9 = 16 on the 180-tank); sanity gate: an emptier must make filling SLOWER","16 h","9 h"], "a":1,
   "w":"Signs spoken before summing; sanity after."}],
"tw6": [
  {"q":"Festive reset = 120 man-days, 10-day deadline, Rs 5,000/day late-penalty, Rs 2,500/man-day. The 8-staff plan (15 days) costs:",
   "o":["Rs 3,00,000","Rs 3,25,000 - labor is the invariant (120 x 2,500) but the calendar breaches: 5 days x 5,000; the fictional headcount saving just got invoiced","Rs 3,12,500","Rs 3,50,000"], "a":1,
   "w":"Read both meters: labor line AND penalty meter."},
  {"q":"The optimal plan for the same contract:",
   "o":["15 staff, 8 days - fastest is safest","12 staff, exactly 10 days - ceil(man-days / deadline) = 12: same labor, zero penalty, no idle slack; the deadline-on-time corner owns the Pareto seat","10 staff with overtime","8 staff and apologize"], "a":1,
   "w":"Crashing past the deadline buys slack, not savings."},
  {"q":"Diwali floor: 560 bills/day at 40 bills per biller means:",
   "o":["12 billers","14 simultaneous billers - one ratio line staffs the floor (560/40); rostering to payroll-day names (about 25 plus floaters over two shifts) is the second, separate ledger","28 billers","40 billers"], "a":1,
   "w":"Simultaneous vs employed-per-day: staffing's two stopwatches."}],
"m10": ['''
rep('"m10": [', qz)

io.open(DST, "w", encoding="utf-8").write(s)
print(f"patched {SRC} -> {DST}: {orig_len} -> {len(s)} bytes")
