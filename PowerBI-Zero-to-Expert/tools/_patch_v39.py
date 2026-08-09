#!/usr/bin/env python3
# Patch build_app_v38.py -> build_app_v39.py : adds Time, Speed & Distance course (sd1..sd7)
import io

SRC = "tools/build_app_v38.py"
DST = "tools/build_app_v39.py"

s = io.open(SRC, encoding="utf-8").read()
orig_len = len(s)

def rep(old, new, n=1):
    global s
    c = s.count(old)
    assert c == n, f"anchor count {c} != {n} for: {old[:80]!r}"
    s = s.replace(old, new)

rep('PowerBI_Course_App_v38.html', 'PowerBI_Course_App_v39.html')

sy_tail = '    ("SY_06_Finance_Compliance_Capstone.md", "sy6", "SY6 · FINANCE: Compliance Logic + Capstone", "\\U0001F4CB", "rule registers, verdicts, Policy-Logic Audit"),\n]\n'
tsd_list = sy_tail + '''
TSD_SECTIONS = [
    ("TSD_01_Speed_Engine_Units.md", "sd1", "TSD1 · The Speed Engine & Unit Wars", "\\U0001F684", "D = S x T, x5/18 bridge, late-man inverse flips, promise radius"),
    ("TSD_02_Average_Speed_Harmonic.md", "sd2", "TSD2 · Average Speed — The Harmonic Reality", "\\u2696\\uFE0F", "2xy/(x+y), distance vs time equal legs, layover parasite"),
    ("TSD_03_Trains_Relative_Speed.md", "sd3", "TSD3 · Trains & Relative Speed", "\\U0001F686", "length law, platforms, opposite-add/same-subtract"),
    ("TSD_04_Boats_Streams.md", "sd4", "TSD4 · Boats & Streams", "\\U0001F6A4", "x +/- w gears, back-solve halves, round-trip current tax"),
    ("TSD_05_Races_Circular_Tracks.md", "sd5", "TSD5 · Races & Circular Tracks", "\\U0001F3DF", "margin ratios, head starts, relative-length meets, LCM law"),
    ("TSD_06_Traps_Triage_Mock.md", "sd6", "TSD6 · Traps, Triage & Mock Arena", "\\u26A1", "5 named traps, 5-gate radar, TSD-01 arena"),
    ("TSD_07_Finance_Fleet_Costing_Capstone.md", "sd7", "TSD7 · FINANCE: Fleet Costing + Capstone", "\\U0001F4B8", "Rs 4/km + Rs 150/h tariff, batching dividend, fleet sheet"),
]
'''
rep(sy_tail, tsd_list)

rep(' + INT_SECTIONS + SY_SECTIONS\n', ' + INT_SECTIONS + SY_SECTIONS + TSD_SECTIONS\n')

rep('"si": [], "sy": []}', '"si": [], "sy": [], "sd": []}')
rep('"si": 0, "sy": 0}', '"si": 0, "sy": 0, "sd": 0}')

rep('    if sid == "sy1":\n        _gcur = "sy"\n',
    '    if sid == "sy1":\n        _gcur = "sy"\n    if sid == "sd1":\n        _gcur = "sd"\n')

rep('    ("sy",    "🔗 Syllogisms", "apt"),\n]',
    '    ("sy",    "🔗 Syllogisms", "apt"),\n    ("sd",    "🚄 Time, Speed & Distance", "apt"),\n]')

rep('Simple & Compound Interest · NEW! 🔗 Syllogisms) — every track basic→advanced, finance-flavored · 579 auto-graded quiz questions',
    'Simple & Compound Interest · Syllogisms · NEW! 🚄 Time Speed & Distance) — every track basic→advanced, finance-flavored · 600 auto-graded quiz questions')

rep('<b data-count="193">0</b><span>Sections</span>', '<b data-count="200">0</b><span>Sections</span>')
rep('<b data-count="189">0</b><span>Hands-on labs</span>', '<b data-count="196">0</b><span>Hands-on labs</span>')
rep('<b data-count="579">0</b><span>Quiz questions</span>', '<b data-count="600">0</b><span>Quiz questions</span>')

rep(' 193 sections across 32 courses:', ' 200 sections across 33 courses:')
rep('Probability, Profit & Loss, Ratio & Proportion, Simple & Compound Interest & Syllogisms (incl.',
    'Probability, Profit & Loss, Ratio & Proportion, Simple & Compound Interest, Syllogisms & Time Speed & Distance (incl.')

qz = '''
"sd1": [
  {"q":"54 km/h expressed in m/s:",
   "o":["12 m/s","15 m/s - 54 x 5/18; the train chapter's master key (a 150 m train crosses a pole in exactly 10 s at this speed)","18 m/s","25 m/s"], "a":1,
   "w":"x5/18 always; x18/5 to go home. Picking 12 means the fraction flipped."},
  {"q":"Walking at 3/4 of his usual speed, a man is 20 minutes late. His usual time:",
   "o":["80 min","60 min - speed ratio 3:4 flips the time ratio to 4:3; the extra 1/3 = 20 min means the usual 3/3 = 60","45 min","100 min"], "a":1,
   "w":"Inverse proportionality: the time ratio is the speed ratio upside-down."},
  {"q":"ShopKart's rider averages 24 km/h with a 10-minute promise. The delivery radius:",
   "o":["2.4 km","4 km - 24 x 10/60; one multiplication that prices an entire dark-store network","6 km","12 km"], "a":1,
   "w":"Hours in the speed demand hours in the time: 10/60, not 10."}],
"sd2": [
  {"q":"A van does 120 km out at 40 km/h and 120 km back at 60 km/h. Average speed:",
   "o":["50 km/h","48 km/h - total 240 km over 3+2 = 5 h, or harmonic 2xy/(x+y); the slow leg owns more clock","45 km/h","52 km/h"], "a":1,
   "w":"Averaging the speeds averages the wrong thing - time weights the truth."},
  {"q":"A rider drives one hour at 48 km/h, then covers 48 km at 32 km/h. Honest whole-day average:",
   "o":["40 km/h","38.4 km/h - 48 km in 1 h plus 48 km in 1.5 h = 96 km / 2.5 h; the stretch repeated, not the clock","43.2 km/h","36 km/h"], "a":1,
   "w":"Equal distances vote harmonic; equal hours vote arithmetic."},
  {"q":"'A rider averages 30 km/h except for a 1-hour wait.' True trip average if riding covered 90 km?",
   "o":["30 km/h","22.5 km/h - riding was 90/30 = 3 h, plus 1 h layover = 4 h for 90 km; the layover parasite taxes every denominator","27 km/h","25 km/h"], "a":1,
   "w":"Total / total, always - the wait sits inside the denominator."}],
"sd3": [
  {"q":"A 150 m train at 54 km/h crosses a 250 m platform in:",
   "o":["16.67 s","26.67 s - length menu 150+250 = 400 m at 15 m/s; the rear's exit is part of the crossing","10 s","33.33 s"], "a":1,
   "w":"Pole = L only; platform = L + P. Menu first, division second."},
  {"q":"Two 150 m trains at 50 and 40 km/h approach head-on. They clear each other in:",
   "o":["108 s","12 s - relative 90 km/h = 25 m/s over both bodies (300 m): opposite = add speeds, lengths always add","6.67 s","24 s"], "a":1,
   "w":"108 s is the same-direction sibling (relative 10 km/h); head-on means the gears add."},
  {"q":"Same two trains, same direction (50 chasing 40). Overtake time:",
   "o":["12 s","108 s - relative 10 km/h = 2.78 m/s over 300 m; same direction SUBTRACTS speeds and the longer clock is the trap-tax for adders","54 s","36 s"], "a":1,
   "w":"Subtraction geometry; lengths still add - both bodies must clear."}],
"sd4": [
  {"q":"Boat runs 12 km/h in still water, stream 3 km/h. Downstream and upstream speeds:",
   "o":["12 and 9","15 and 9 - the river is a moving floor: down = x + w, up = x - w; anchor pair 12 & 3 pays out forever","15 and 12","18 and 6"], "a":1,
   "w":"Gears: plus down, minus up; the still-water muscle sits in the middle."},
  {"q":"A boat logs downstream 24 km/h and upstream 16 km/h. Still-water speed and current:",
   "o":["20 and 8","20 and 4 - midpoint is the boat (d+u)/2, half the gap is the river (d-u)/2","22 and 2","24 and 8"], "a":1,
   "w":"The back-solve halves: (24+16)/2 and (24-16)/2."},
  {"q":"Same 30 km round trip: still-water average 12 km/h. With a 3 km/h current, the loop-average:",
   "o":["12 km/h - current balances out","11.25 km/h - the 9 km/h up-leg bleeds more clock than the 15 km/h down-leg saves (harmonic 2x15x9/24); the river ALWAYS taxes the loop","12.5 km/h","10.5 km/h"], "a":1,
   "w":"T = 2dx/(x^2 - w^2) > 2d/x whenever w > 0. Balances-out never survives arithmetic."}],
"sd5": [
  {"q":"In a 100 m race A beats B by 20 m. Their speed ratio:",
   "o":["6:5","5:4 - same clock, so finish-line distances ARE the ratio (100:80); the by-margin unrolls in one line","4:3","5:3"], "a":1,
   "w":"Margins are distances at the same clock. Gift wrap off, ratio out."},
  {"q":"Two runners (8 and 5 m/s) run a 400 m loop in the SAME direction. They first meet after:",
   "o":["30.8 s","133.3 s - the faster must gain one full lap at the 3 m/s gap: 400/3 (opposite directions would be 400/13 = 30.8 s)","400 s","80 s"], "a":1,
   "w":"Direction chooses the gear: gap for same, sum for opposite."},
  {"q":"Lap times on a circuit: 50 s and 80 s. Both riders first stand together AT THE STARTING POINT after:",
   "o":["400/3 s","400 s - the at-start reunion needs whole laps from BOTH: LCM(50, 80); 'starting point' switches the law from relative-length to LCM","130 s","65 s"], "a":1,
   "w":"Anywhere-meeting ≠ at-start meeting - the word switches the machine."}],
"sd6": [
  {"q":"Arena re-run: rider 48 km/h out and 32 km/h back over the same stretch - day average:",
   "o":["40 km/h","38.4 km/h - the stretch repeated, not the clock: harmonic 2x48x32/80; the strength gate kills the arithmetic-mean mirage","36 km/h","42 km/h"], "a":1,
   "w":"Mirage season is year-round; harmonic or bust on equal distances."},
  {"q":"A 150 m train at 54 km/h crosses a man walking ALONG the track at 6 km/h. Time:",
   "o":["10 s","12.5 s - relative = 54 - 6 = 48 km/h = 13.33 m/s over the train's own 150 m (man is a point; chase means subtract)","8.33 s","15 s"], "a":1,
   "w":"10 s forgot the man moves; 8.33 ADDED speeds on a chase - TRAP 3 in 4K."},
  {"q":"The TSD radar's LAST gate is SANITY because:",
   "o":["it sounds dramatic","unit/direction/menu errors survive calculation but fail family smell-tests (same-direction slower, upstream dearer, pole quickest) - the last cheap catch before submission","papers demand a fifth gate","it replaces gate 1 when time is short"], "a":1,
   "w":"Gates 1-3 prevent, gate 4 qualifies, gate 5 arrests. Five seconds, five gates."}],
"sd7": [
  {"q":"Tariff Rs 4/km + Rs 150/h: a single-order run of 8 km and 20 minutes costs:",
   "o":["Rs 72","Rs 82 - fuel 8x4 = 32 plus time 20/60 x 150 = 50; two meters, one route, the lonely tax in full","Rs 90","Rs 48"], "a":1,
   "w":"Both meters bill every sortie; forgetting one is how margins leak."},
  {"q":"A pair-run covers 12 km in 30 minutes on the same tariff. Cost per order and dividend vs singles:",
   "o":["Rs 73, 11%","Rs 61.50, 25% - run cost 48+75 = 123 shared by 2 orders; batching splits both meters and returns a quarter of every single-run rupee","Rs 61.50, 12%","Rs 55, 33%"], "a":1,
   "w":"The run gets pricier while each ORDER gets cheaper - per-order is the only denominator that votes."},
  {"q":"With contribution Rs 217.5 per order, delivery at Rs 82 (single) vs Rs 61.5 (pair) eats:",
   "o":["25% vs 18%","37.7% vs 28.3% - batch policy is margin policy: the cost dividend returns about 9.4 points of contribution to every order","41% vs 30%","30% vs 22%"], "a":1,
   "w":"Delivery eats contribution, and dispatch is the dial. CFOs read this column first."}],
"m10": ['''
rep('"m10": [', qz)

io.open(DST, "w", encoding="utf-8").write(s)
print(f"patched {SRC} -> {DST}: {orig_len} -> {len(s)} bytes")
