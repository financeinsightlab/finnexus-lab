#!/usr/bin/env python3
# Patch build_app_v51.py -> build_app_v52.py
#   + Accounting & Reporting course 5: Depreciation & PP&E Ind AS 16 (dp1..dp12)
# QUIZ entries auto-extracted from the md files (single source of truth).
import os, re, json

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = os.path.join(BASE, "tools", "build_app_v51.py")
dst = os.path.join(BASE, "tools", "build_app_v52.py")
t = open(src, encoding="utf-8").read()

def rep(old, new, n=1):
    global t
    c = t.count(old)
    assert c == n, f"anchor count {c} != {n} for: {old[:70]!r}"
    t = t.replace(old, new)

# ---------- 1. QUIZZES from md ----------
MD_FILES = [
 "DP_01_PPE_and_the_Second_Clock.md", "DP_02_The_Cost_Build_Up.md",
 "DP_03_Five_Machines_Inside_One.md", "DP_04_The_Three_Clock_Faces.md",
 "DP_05_The_Revaluation_Model.md", "DP_06_Living_with_Revaluation.md",
 "DP_07_The_Spending_After.md", "DP_08_The_Exit_Door.md",
 "DP_09_Three_Neighbour_Standards.md", "DP_10_Industry_Plays.md",
 "DP_11_Disclosures_and_Radar.md", "DP_12_Capstone_The_Clock_Audit.md",
]

def clean(s):
    return re.sub(r"\s+", " ", s.replace("**", "").replace("`", "")).strip()

def parse_quiz(fname):
    txt = open(os.path.join(BASE, fname), encoding="utf-8").read()
    m = re.search(r"## ❓ Quiz(.*?)(?:\n## |\Z)", txt, re.S)
    assert m, f"no quiz block in {fname}"
    body = m.group(1)
    am = re.search(r"### ✅ Answers(.*)", body, re.S)
    assert am, f"no answers block in {fname}"
    qpart, apart = body[:am.start()], am.group(1)
    answers = {}
    for x in re.finditer(r"(?m)^(\d)\.\s+\*\*\(([abcd])\)\*\*\s*[-—–]\s*(.+?)\s*$", apart):
        answers[int(x.group(1))] = (x.group(2), x.group(3))
    assert len(answers) == 3, f"{fname}: {len(answers)} answers"
    qblocks = re.split(r"(?m)^\*\*Q([123])\.\*\*\s*", qpart)
    assert len(qblocks) == 7, f"{fname}: {len(qblocks)} qblocks"
    out = []
    for i in (1, 3, 5):
        n, block = int(qblocks[i]), qblocks[i + 1]
        cut = block.find("\n(a)")
        assert cut > 0, f"{fname} Q{n}: no options marker"
        qtext, rest = block[:cut], block[cut:]
        parts = re.split(r"\(([abcd])\)\s*", rest)
        assert len(parts) == 9, f"{fname} Q{n}: split gave {len(parts)} parts -> {rest[:80]!r}"
        opts = [parts[j].strip() for j in (2, 4, 6, 8)]
        letter, w = answers[n]
        aidx = "abcd".index(letter)
        assert aidx == 1, f"{fname} Q{n}: correct answer not (b)!"
        out.append({"q": clean(qtext), "o": [clean(o) for o in opts], "a": aidx, "w": clean(w)})
    return out

quiz = {}
for f in MD_FILES:
    sid = "dp" + str(int(f[3:5]))
    quiz[sid] = parse_quiz(f)
assert len(quiz) == 12 and sum(len(v) for v in quiz.values()) == 36

qlines = []
for sid, entries in quiz.items():
    qlines.append(f'"{sid}": [')
    for e in entries:
        qlines.append("  " + json.dumps(e, ensure_ascii=True) + ",")
    qlines.append("],")
QUIZ = "\n".join(qlines) + "\n"

# ---------- 2. builder surgery ----------
rep('OUT = os.path.join(BASE, "PowerBI_Course_App_v51.html")',
    'OUT = os.path.join(BASE, "PowerBI_Course_App_v52.html")')

NEW_SECTIONS = """
PPE_SECTIONS = [
    ("DP_01_PPE_and_the_Second_Clock.md", "dp1", "DP1 · PP&E and the Second Clock", "\\U0001F3ED", "3 adjectives + 2-bolt lock, scope fence, generator vs spanner, materiality gate"),
    ("DP_02_The_Cost_Build_Up.md", "dp2", "DP2 · The Cost Build-Up", "\\U0001F9F1", "Rs 59L cage line-by-line, exclusion wall, 2022 testing amendment, swap gain 5L"),
    ("DP_03_Five_Machines_Inside_One.md", "dp3", "DP3 · Five Machines Inside One", "\\U0001F9E9", "Rs 90L crane = 5 clocks dep 7.3L vs composite 6.0L (1.3L lie), overhaul components"),
    ("DP_04_The_Three_Clock_Faces.md", "dp4", "DP4 · The Three Clock Faces", "\\U000023F3", "SL 6.75L, WDB rate 25.01% derived, UoP Rs 20/unit, change-in-estimate 10->5"),
    ("DP_05_The_Revaluation_Model.md", "dp5", "DP5 · The Revaluation Model", "\\U0001F4C8", "class election, 40->50: 10 OCI net 7.5 + DTL 2.5, downward P&L-first rules"),
    ("DP_06_Living_with_Revaluation.md", "dp6", "DP6 · Living with Revaluation", "\\U0001F501", "dep 10 vs 8 wedge, para-41 transfer 2L/yr, disposal gain 2 + surplus->RE"),
    ("DP_07_The_Spending_After.md", "dp7", "DP7 · The Spending After", "\\U0001F527", "servicing wall, cylinder swap: capitalize 6, derecognize 1.6, five tests"),
    ("DP_08_The_Exit_Door.md", "dp8", "DP8 · The Exit Door", "\\U0001F6AA", "disposal gain 4 not revenue, HFS lower-of 25/23, dep stops, abandonment burial"),
    ("DP_09_Three_Neighbour_Standards.md", "dp9", "DP9 · Three Neighbour Standards", "\\U0001F6E1", "impair 20 / capped reversal 15, grant 9.6 both doors, interest 20 cap + 4 exp"),
    ("DP_10_Industry_Plays.md", "dp10", "DP10 · Industry Plays", "\\U0001F6EB", "airliner 52.8cr/yr, power 18cr/yr, land never clocks, laptop pool 20L/yr"),
    ("DP_11_Disclosures_and_Radar.md", "dp11", "DP11 · Disclosures & the Ratio Radar", "\\U0001F4CA", "gross 215 / accdep 138 / NBV 77, 3.0x-4.0yr-1.5 radar, six fraud signatures"),
    ("DP_12_Capstone_The_Clock_Audit.md", "dp12", "DP12 · CAPSTONE: The Clock Audit", "\\U0001F3C6", "6 exhibits, conductor table, 11.4L memo, partner cross, 10-Q forge"),
]
"""
rep('    ("IC_12_Capstone_Stockroom_Trial.md", "ic12", "IC12 · CAPSTONE: The Stockroom Trial", "\\U0001F3C6", "6 files, conductor table, 9.08L memo, 10-Q forge"),\n]\n',
    '    ("IC_12_Capstone_Stockroom_Trial.md", "ic12", "IC12 · CAPSTONE: The Stockroom Trial", "\\U0001F3C6", "6 files, conductor table, 9.08L memo, 10-Q forge"),\n]\n' + NEW_SECTIONS)

rep(' + WM_SECTIONS + CB_SECTIONS + IA_SECTIONS + RR_SECTIONS + LS_SECTIONS + INV_SECTIONS\n',
    ' + WM_SECTIONS + CB_SECTIONS + IA_SECTIONS + RR_SECTIONS + LS_SECTIONS + INV_SECTIONS + PPE_SECTIONS\n')

rep('"tv": [], "wm": [], "cb": [], "ia": [], "rr": [], "ls": [], "ic": []}',
    '"tv": [], "wm": [], "cb": [], "ia": [], "rr": [], "ls": [], "ic": [], "dp": []}')
rep('"tv": 0, "wm": 0, "cb": 0, "ia": 0, "rr": 0, "ls": 0, "ic": 0}',
    '"tv": 0, "wm": 0, "cb": 0, "ia": 0, "rr": 0, "ls": 0, "ic": 0, "dp": 0}')

rep('    if sid == "ic1":\n        _gcur = "ic"\n',
    '    if sid == "ic1":\n        _gcur = "ic"\n    if sid == "dp1":\n        _gcur = "dp"\n')

rep('    ("ic",    "📦 Inventory & COGS", "far"),\n',
    '    ("ic",    "📦 Inventory & COGS", "far"),\n    ("dp",    "🏭 Depreciation & PP&E", "far"),\n')

rep('NRV brakes → the Stockroom Trial!) — every track basic→advanced, finance-flavored · 1050 auto-graded quiz questions ·',
    'NRV brakes → the Stockroom Trial · 🏭 Depreciation & PP&E — the slow clock: the Rs 59L cage, the Rs 90L five-clock crane, the derived 25.01% WDB rate, the OCI stair → the Clock Audit!) — every track basic→advanced, finance-flavored · 1086 auto-graded quiz questions ·')

rep('<div class="stat"><b data-count="350">0</b><span>Sections</span></div>',
    '<div class="stat"><b data-count="362">0</b><span>Sections</span></div>')
rep('<div class="stat"><b data-count="346">0</b><span>Hands-on labs</span></div>',
    '<div class="stat"><b data-count="358">0</b><span>Hands-on labs</span></div>')
rep('<div class="stat"><b data-count="1050">0</b><span>Quiz questions</span></div>',
    '<div class="stat"><b data-count="1086">0</b><span>Quiz questions</span></div>')

rep(' 350 sections across 51 courses: ',
    ' 362 sections across 52 courses: ')
rep('Wealth Management, Capital Budgeting, Ind AS-IFRS, Revenue Recognition, Leases & Inventory-COGS (incl.',
    'Wealth Management, Capital Budgeting, Ind AS-IFRS, Revenue Recognition, Leases, Inventory-COGS & Depreciation-PPE (incl.')

rep('"m10": [', QUIZ + '"m10": [')

open(dst, "w", encoding="utf-8").write(t)
print("patched ->", dst, "| quiz entries:", sum(len(v) for v in quiz.values()))
