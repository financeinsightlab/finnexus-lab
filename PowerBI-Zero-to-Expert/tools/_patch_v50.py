#!/usr/bin/env python3
# Patch build_app_v49.py -> build_app_v50.py
#   + Accounting & Reporting course 3: Leases Ind AS 116 (ls1..ls12)
# QUIZ entries auto-extracted from the md files (single source of truth).
import os, re, json

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = os.path.join(BASE, "tools", "build_app_v49.py")
dst = os.path.join(BASE, "tools", "build_app_v50.py")
t = open(src, encoding="utf-8").read()

def rep(old, new, n=1):
    global t
    c = t.count(old)
    assert c == n, f"anchor count {c} != {n} for: {old[:70]!r}"
    t = t.replace(old, new)

# ---------- 1. QUIZZES from md ----------
MD_FILES = [
 "LS_01_Rent_Became_Debt.md", "LS_02_Definition_and_Exemptions.md",
 "LS_03_Lease_vs_Service.md", "LS_04_Initial_Measurement.md",
 "LS_05_Subsequent_Remeasurement.md", "LS_06_Modifications.md",
 "LS_07_Sale_and_Leaseback.md", "LS_08_Lessor_Accounting.md",
 "LS_09_Subleases_Incentives.md", "LS_10_Disclosures_and_Ratios.md",
 "LS_11_Industry_Plays.md", "LS_12_Capstone_Lease_Ledger.md",
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
    sid = "ls" + str(int(f[3:5]))
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
rep('OUT = os.path.join(BASE, "PowerBI_Course_App_v49.html")',
    'OUT = os.path.join(BASE, "PowerBI_Course_App_v50.html")')

NEW_SECTIONS = """
LS_SECTIONS = [
    ("LS_01_Rent_Became_Debt.md", "ls1", "LS1 · When Rent Became Debt", "\\U0001F4C9", "IAS 17 illusion, AirSutra 240cr->166cr both sides, EBITDA mirage, front-loading"),
    ("LS_02_Definition_and_Exemptions.md", "ls2", "LS2 · The Definition Gauntlet", "\\U0001F50D", "3 locks, identified asset, substantive substitution, fiber knife, 2 exemptions"),
    ("LS_03_Lease_vs_Service.md", "ls3", "LS3 · Lease vs Service: The Split", "\\U0001F9E9", "components split 30L->21.43/8.57, expedient 70.01 vs 93.35, lessor no merge"),
    ("LS_04_Initial_Measurement.md", "ls4", "LS4 · Day-One Measurement", "\\U0001F4CF", "5 buckets, IBR hunt, liability 38.90, ROU build 42.00, annuity due 16.70"),
    ("LS_05_Subsequent_Remeasurement.md", "ls5", "LS5 · Life After Day One", "\\U0001F501", "accretion table, front-load 11.28/8.61, EBITDA re-badge, 3 remeasure doors"),
    ("LS_06_Modifications.md", "ls6", "LS6 · Modifications: The Three Doors", "\\U0001F527", "3 doors, scope decrease gain 0.79, reprice +7.02, separate 11.19"),
    ("LS_07_Sale_and_Leaseback.md", "ls7", "LS7 · Sale & Leaseback", "\\U0001F504", "115 gate, ROU 24.5cr, gain 19.5cr, above-market=loan, failed sale"),
    ("LS_08_Lessor_Accounting.md", "ls8", "LS8 · Lessor: The Two Doors Stay", "\\U0001F3E6", "2 doors survive, NI 84.29 @9% income 7.59, manufacturer 6L, SL 9.5"),
    ("LS_09_Subleases_Incentives.md", "ls9", "LS9 · Subleases & Sweeteners", "\\U0001FA86", "ROU-reference, NI 29.16 loss 1.96, negative carry, incentives, COVID expedient"),
    ("LS_10_Disclosures_and_Ratios.md", "ls10", "LS10 · Disclosures, Ratios & Covenants", "\\U0001F4CA", "bridge 50->38.90 (-11.10), ICR 8.0->4.97, D/EBITDA 1.67->2.22, frozen GAAP"),
    ("LS_11_Industry_Plays.md", "ls11", "LS11 · Industry Plays", "\\U0001F3EC", "aviation SLB, mall 31.12 vs 12, escalation doors, REIT smoothing, towers/fiber"),
    ("LS_12_Capstone_Lease_Ledger.md", "ls12", "LS12 · CAPSTONE: The Lease Ledger", "\\U0001F3C6", "6 files, conductor table, EBITDA bridge, covenant memo, 10-Q forge"),
]
"""
rep('    ("RR_12_Capstone_Revenue_Chamber.md", "rr12", "RR12 · CAPSTONE: The Revenue Chamber", "\\U0001F3C6", "6 files, 10-exhibit PIT/OT trial, canon conductor, chamber memo, forge"),\n]\n',
    '    ("RR_12_Capstone_Revenue_Chamber.md", "rr12", "RR12 · CAPSTONE: The Revenue Chamber", "\\U0001F3C6", "6 files, 10-exhibit PIT/OT trial, canon conductor, chamber memo, forge"),\n]\n' + NEW_SECTIONS)

rep(' + WM_SECTIONS + CB_SECTIONS + IA_SECTIONS + RR_SECTIONS\n',
    ' + WM_SECTIONS + CB_SECTIONS + IA_SECTIONS + RR_SECTIONS + LS_SECTIONS\n')

rep('"tv": [], "wm": [], "cb": [], "ia": [], "rr": []}',
    '"tv": [], "wm": [], "cb": [], "ia": [], "rr": [], "ls": []}')
rep('"tv": 0, "wm": 0, "cb": 0, "ia": 0, "rr": 0}',
    '"tv": 0, "wm": 0, "cb": 0, "ia": 0, "rr": 0, "ls": 0}')

rep('    if sid == "rr1":\n        _gcur = "rr"\n',
    '    if sid == "rr1":\n        _gcur = "rr"\n    if sid == "ls1":\n        _gcur = "ls"\n')

rep('    ("rr",    "💰 Revenue Recognition", "far"),\n',
    '    ("rr",    "💰 Revenue Recognition", "far"),\n    ("ls",    "🔑 Leases", "far"),\n')

rep('POC warfare → the Revenue Chamber!) — every track basic→advanced, finance-flavored · 978 auto-graded quiz questions ·',
    'POC warfare → the Revenue Chamber · 🔑 Leases — rent became debt: the ROU revolution, the Rs 38.9L canon, SLB machinery → the Lease Ledger!) — every track basic→advanced, finance-flavored · 1014 auto-graded quiz questions ·')

rep('<div class="stat"><b data-count="326">0</b><span>Sections</span></div>',
    '<div class="stat"><b data-count="338">0</b><span>Sections</span></div>')
rep('<div class="stat"><b data-count="322">0</b><span>Hands-on labs</span></div>',
    '<div class="stat"><b data-count="334">0</b><span>Hands-on labs</span></div>')
rep('<div class="stat"><b data-count="978">0</b><span>Quiz questions</span></div>',
    '<div class="stat"><b data-count="1014">0</b><span>Quiz questions</span></div>')

rep(' 326 sections across 49 courses: ',
    ' 338 sections across 50 courses: ')
rep('Wealth Management, Capital Budgeting, Ind AS-IFRS & Revenue Recognition (incl.',
    'Wealth Management, Capital Budgeting, Ind AS-IFRS, Revenue Recognition & Leases (incl.')

rep('"m10": [', QUIZ + '"m10": [')

open(dst, "w", encoding="utf-8").write(t)
print("patched ->", dst, "| quiz entries:", sum(len(v) for v in quiz.values()))
