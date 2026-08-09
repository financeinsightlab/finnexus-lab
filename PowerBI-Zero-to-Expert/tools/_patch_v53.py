#!/usr/bin/env python3
# Patch build_app_v52.py -> build_app_v53.py
#   + Accounting & Reporting course 6: Deferred Tax Ind AS 12 (dt1..dt12)
# QUIZ entries auto-extracted from the md files (single source of truth).
import os, re, json

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = os.path.join(BASE, "tools", "build_app_v52.py")
dst = os.path.join(BASE, "tools", "build_app_v53.py")
t = open(src, encoding="utf-8").read()

def rep(old, new, n=1):
    global t
    c = t.count(old)
    assert c == n, f"anchor count {c} != {n} for: {old[:70]!r}"
    t = t.replace(old, new)

# ---------- 1. QUIZZES from md ----------
MD_FILES = [
 "DT_01_The_Two_Clocks.md", "DT_02_Tax_Base_and_Temporary_Differences.md",
 "DT_03_Recognition_Discipline.md", "DT_04_The_Depreciation_Gap.md",
 "DT_05_Provisions_and_the_Timing_Map.md", "DT_06_OCI_and_Backwards_Tracing.md",
 "DT_07_Loss_Carryforwards_and_MAT.md", "DT_08_Groups_and_Undistributed_Profits.md",
 "DT_09_Business_Combinations_Gateway.md", "DT_10_India_Deep_Dive.md",
 "DT_11_Presentation_Rate_Change_and_the_Reconciliation.md", "DT_12_Capstone_The_Shadow_Ledger.md",
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
    sid = "dt" + str(int(f[3:5]))
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
rep('OUT = os.path.join(BASE, "PowerBI_Course_App_v52.html")',
    'OUT = os.path.join(BASE, "PowerBI_Course_App_v53.html")')

NEW_SECTIONS = """
DT_SECTIONS = [
    ("DT_01_The_Two_Clocks.md", "dt1", "DT1 · The Two Clocks", "\\U000023F1", "book vs taxable profit, bridge 95->23.75+1.25=25.0 invariance, permanent wedge"),
    ("DT_02_Tax_Base_and_Temporary_Differences.md", "dt2", "DT2 · Tax Base × Temporary Differences", "\\U0001F4D0", "four-cell map: machine DTL 5, warranty DTA 2.5, advance 2.5, BS beats bridge"),
    ("DT_03_Recognition_Discipline.md", "dt3", "DT3 · Recognition Discipline", "\\U0001F512", "DTL presumption vs DTA probable-profit gate, IRE anti-recursion, goodwill carve-out"),
    ("DT_04_The_Depreciation_Gap.md", "dt4", "DT4 · The Depreciation Gap", "\\U00002699", "DTL biography 1.25 climb to 5.0 then home, fleet snowball, WDV blocks +180-day gate"),
    ("DT_05_Provisions_and_the_Timing_Map.md", "dt5", "DT5 · Provisions & the Timing Map", "\\U0001F5FA", "warranty 2.0 / ECL 2.0 / 43B 4.0 / NRV 1.5 DTA family, timing compass"),
    ("DT_06_OCI_and_Backwards_Tracing.md", "dt6", "DT6 · OCI & Backwards Tracing", "\\U0001F317", "tax follows the item: reval 2.5 / FVOCI 2.0 / DBO 1.5 to OCI, hereditary staging"),
    ("DT_07_Loss_Carryforwards_and_MAT.md", "dt7", "DT7 · Loss Carryforwards & MAT", "\\U0001F4C9", "8-yr vs forever clocks, loss DTA 40->10 gate, release 6, MAT pay 15 bank 7"),
    ("DT_08_Groups_and_Undistributed_Profits.md", "dt8", "DT8 · Groups & Undistributed Profits", "\\U0001F3E2", "outside-basis gaps, 2-condition exemption, JV 0 vs 5cr on one resolution"),
    ("DT_09_Business_Combinations_Gateway.md", "dt9", "DT9 · The Business-Combination Gateway", "\\U0001F91D", "step-up DTL 10 -> goodwill +10, dormant DTAs -7, unwind 2.5/yr annuity"),
    ("DT_10_India_Deep_Dive.md", "dt10", "DT10 · India Deep Dive", "\\U0001F3DB", "25.168% stapled rate, 115BAA fork, WDV/180-day, 43B gate, MAT scale, transition layer"),
    ("DT_11_Presentation_Rate_Change_and_the_Reconciliation.md", "dt11", "DT11 · Presentation, Rate Change & Reconciliation", "\\U0001F4D1", "offset zoning, DTL 10->8.8 release 1.2, crown jewel 125->123.8 ETR 24.76%"),
    ("DT_12_Capstone_The_Shadow_Ledger.md", "dt12", "DT12 · CAPSTONE: The Shadow Ledger", "\\U0001F3C6", "6 exhibits, current 22 + deferred 9 = 31.0 invariance, net DTL 0.5, 10-Q forge"),
]
"""
rep('    ("DP_12_Capstone_The_Clock_Audit.md", "dp12", "DP12 · CAPSTONE: The Clock Audit", "\\U0001F3C6", "6 exhibits, conductor table, 11.4L memo, partner cross, 10-Q forge"),\n]\n',
    '    ("DP_12_Capstone_The_Clock_Audit.md", "dp12", "DP12 · CAPSTONE: The Clock Audit", "\\U0001F3C6", "6 exhibits, conductor table, 11.4L memo, partner cross, 10-Q forge"),\n]\n' + NEW_SECTIONS)

rep(' + WM_SECTIONS + CB_SECTIONS + IA_SECTIONS + RR_SECTIONS + LS_SECTIONS + INV_SECTIONS + PPE_SECTIONS\n',
    ' + WM_SECTIONS + CB_SECTIONS + IA_SECTIONS + RR_SECTIONS + LS_SECTIONS + INV_SECTIONS + PPE_SECTIONS + DT_SECTIONS\n')

rep('"tv": [], "wm": [], "cb": [], "ia": [], "rr": [], "ls": [], "ic": [], "dp": []}',
    '"tv": [], "wm": [], "cb": [], "ia": [], "rr": [], "ls": [], "ic": [], "dp": [], "dt": []}')
rep('"tv": 0, "wm": 0, "cb": 0, "ia": 0, "rr": 0, "ls": 0, "ic": 0, "dp": 0}',
    '"tv": 0, "wm": 0, "cb": 0, "ia": 0, "rr": 0, "ls": 0, "ic": 0, "dp": 0, "dt": 0}')

rep('    if sid == "dp1":\n        _gcur = "dp"\n',
    '    if sid == "dp1":\n        _gcur = "dp"\n    if sid == "dt1":\n        _gcur = "dt"\n')

rep('    ("dp",    "🏭 Depreciation & PP&E", "far"),\n',
    '    ("dp",    "🏭 Depreciation & PP&E", "far"),\n    ("dt",    "🧾 Deferred Tax", "far"),\n')

rep('the OCI stair → the Clock Audit!) — every track basic→advanced, finance-flavored · 1086 auto-graded quiz questions ·',
    'the OCI stair → the Clock Audit · 🧾 Deferred Tax — the shadow ledger: two clocks, the 25.0 invariance, DTL biographies, loss coupons & MAT → the Shadow Ledger!) — every track basic→advanced, finance-flavored · 1122 auto-graded quiz questions ·')

rep('<div class="stat"><b data-count="362">0</b><span>Sections</span></div>',
    '<div class="stat"><b data-count="374">0</b><span>Sections</span></div>')
rep('<div class="stat"><b data-count="358">0</b><span>Hands-on labs</span></div>',
    '<div class="stat"><b data-count="370">0</b><span>Hands-on labs</span></div>')
rep('<div class="stat"><b data-count="1086">0</b><span>Quiz questions</span></div>',
    '<div class="stat"><b data-count="1122">0</b><span>Quiz questions</span></div>')

rep(' 362 sections across 52 courses: ',
    ' 374 sections across 53 courses: ')
rep('Wealth Management, Capital Budgeting, Ind AS-IFRS, Revenue Recognition, Leases, Inventory-COGS & Depreciation-PPE (incl.',
    'Wealth Management, Capital Budgeting, Ind AS-IFRS, Revenue Recognition, Leases, Inventory-COGS, Depreciation-PPE & Deferred Tax (incl.')

rep('"m10": [', QUIZ + '"m10": [')

open(dst, "w", encoding="utf-8").write(t)
print("patched ->", dst, "| quiz entries:", sum(len(v) for v in quiz.values()))
