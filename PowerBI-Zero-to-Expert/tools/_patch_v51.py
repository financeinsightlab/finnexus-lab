#!/usr/bin/env python3
# Patch build_app_v50.py -> build_app_v51.py
#   + Accounting & Reporting course 4: Inventory & COGS Ind AS 2 (ic1..ic12)
# QUIZ entries auto-extracted from the md files (single source of truth).
import os, re, json

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = os.path.join(BASE, "tools", "build_app_v50.py")
dst = os.path.join(BASE, "tools", "build_app_v51.py")
t = open(src, encoding="utf-8").read()

def rep(old, new, n=1):
    global t
    c = t.count(old)
    assert c == n, f"anchor count {c} != {n} for: {old[:70]!r}"
    t = t.replace(old, new)

# ---------- 1. QUIZZES from md ----------
MD_FILES = [
 "IC_01_The_Shelf_That_Owns_the_PnL.md", "IC_02_What_Counts_as_Cost.md",
 "IC_03_Cost_Formulas.md", "IC_04_NRV_Write_Downs.md",
 "IC_05_Overhead_Absorption.md", "IC_06_Cost_Sheet_COGS.md",
 "IC_07_Borderlands.md", "IC_08_In_Transit_Shrinkage_Consignment.md",
 "IC_09_Disclosures_Manipulation_Radar.md", "IC_10_Industry_Plays.md",
 "IC_11_Systems_Perpetual_Cutoff.md", "IC_12_Capstone_Stockroom_Trial.md",
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
    sid = "ic" + str(int(f[3:5]))
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
rep('OUT = os.path.join(BASE, "PowerBI_Course_App_v50.html")',
    'OUT = os.path.join(BASE, "PowerBI_Course_App_v51.html")')

NEW_SECTIONS = """
INV_SECTIONS = [
    ("IC_01_The_Shelf_That_Owns_the_PnL.md", "ic1", "IC1 · The Shelf That Owns the P&L", "\\U0001F4E6", "COGS bridge 40+260-60=240, Rs 1-law, scope fence, DIO reading"),
    ("IC_02_What_Counts_as_Cost.md", "ic2", "IC2 · What Counts as Cost", "\\U0001F9FE", "3 buckets, Rs 141 autopsy, exclusion wall, FOH 200/160, whisky 1cr/yr"),
    ("IC_03_Cost_Formulas.md", "ic3", "IC3 · Cost Formulas", "\\U0001F504", "FIFO 8000 vs WAC 9000 (46.7%/40.0%), LIFO funeral, specific ID fence"),
    ("IC_04_NRV_Write_Downs.md", "ic4", "IC4 · NRV Write-Downs", "\\U0001F4B2", "lower-of item-by-item, 460 vs 500, 8,000 down / 7,000 capped back"),
    ("IC_05_Overhead_Absorption.md", "ic5", "IC5 · Overhead Absorption", "\\U0001F3ED", "normal capacity 24L/12k=200, joint 46L->32.2/13.8, whey clip, loss doctrine"),
    ("IC_06_Cost_Sheet_COGS.md", "ic6", "IC6 · The Cost Sheet", "\\U0001F4CA", "chain 240->320->400->390->400, retail method 10L, standards 140/141"),
    ("IC_07_Borderlands.md", "ic7", "IC7 · The Borderlands", "\\U0001F33E", "harvest deemed cost 8.0L, broker-traders NRV, developer stack 13cr->12.5"),
    ("IC_08_In_Transit_Shrinkage_Consignment.md", "ic8", "IC8 · Transit, Shrinkage & Consignment", "\\U0001F69A", "FOB truck 25L clause-law, shrink 3L, consignment 12L, returns 1.88L"),
    ("IC_09_Disclosures_Manipulation_Radar.md", "ic9", "IC9 · The Manipulation Radar", "\\U0001F6A8", "shelter 9.6L swing, museum 5L dodge, disclosure corkboard, pledges"),
    ("IC_10_Industry_Plays.md", "ic10", "IC10 · Industry Plays", "\\U0001F3EA", "FEFO/promos, steel 50,000/t (47.5cr+50L), pharma batches, solitaires"),
    ("IC_11_Systems_Perpetual_Cutoff.md", "ic11", "IC11 · Systems, Counts & Cut-Off", "\\U0001F4CB", "perpetual vs periodic, 3-body recon, 2-way count tests, last-GRN walls"),
    ("IC_12_Capstone_Stockroom_Trial.md", "ic12", "IC12 · CAPSTONE: The Stockroom Trial", "\\U0001F3C6", "6 files, conductor table, 9.08L memo, 10-Q forge"),
]
"""
rep('    ("LS_12_Capstone_Lease_Ledger.md", "ls12", "LS12 · CAPSTONE: The Lease Ledger", "\\U0001F3C6", "6 files, conductor table, EBITDA bridge, covenant memo, 10-Q forge"),\n]\n',
    '    ("LS_12_Capstone_Lease_Ledger.md", "ls12", "LS12 · CAPSTONE: The Lease Ledger", "\\U0001F3C6", "6 files, conductor table, EBITDA bridge, covenant memo, 10-Q forge"),\n]\n' + NEW_SECTIONS)

rep(' + WM_SECTIONS + CB_SECTIONS + IA_SECTIONS + RR_SECTIONS + LS_SECTIONS\n',
    ' + WM_SECTIONS + CB_SECTIONS + IA_SECTIONS + RR_SECTIONS + LS_SECTIONS + INV_SECTIONS\n')

rep('"tv": [], "wm": [], "cb": [], "ia": [], "rr": [], "ls": []}',
    '"tv": [], "wm": [], "cb": [], "ia": [], "rr": [], "ls": [], "ic": []}')
rep('"tv": 0, "wm": 0, "cb": 0, "ia": 0, "rr": 0, "ls": 0}',
    '"tv": 0, "wm": 0, "cb": 0, "ia": 0, "rr": 0, "ls": 0, "ic": 0}')

rep('    if sid == "ls1":\n        _gcur = "ls"\n',
    '    if sid == "ls1":\n        _gcur = "ls"\n    if sid == "ic1":\n        _gcur = "ic"\n')

rep('    ("ls",    "🔑 Leases", "far"),\n',
    '    ("ls",    "🔑 Leases", "far"),\n    ("ic",    "📦 Inventory & COGS", "far"),\n')

rep('SLB machinery → the Lease Ledger!) — every track basic→advanced, finance-flavored · 1014 auto-graded quiz questions ·',
    'SLB machinery → the Lease Ledger · 📦 Inventory & COGS — the shelf that owns the P&L: FIFO-vs-WAC margins, the Rs 141 autopsy, NRV brakes → the Stockroom Trial!) — every track basic→advanced, finance-flavored · 1050 auto-graded quiz questions ·')

rep('<div class="stat"><b data-count="338">0</b><span>Sections</span></div>',
    '<div class="stat"><b data-count="350">0</b><span>Sections</span></div>')
rep('<div class="stat"><b data-count="334">0</b><span>Hands-on labs</span></div>',
    '<div class="stat"><b data-count="346">0</b><span>Hands-on labs</span></div>')
rep('<div class="stat"><b data-count="1014">0</b><span>Quiz questions</span></div>',
    '<div class="stat"><b data-count="1050">0</b><span>Quiz questions</span></div>')

rep(' 338 sections across 50 courses: ',
    ' 350 sections across 51 courses: ')
rep('Wealth Management, Capital Budgeting, Ind AS-IFRS, Revenue Recognition & Leases (incl.',
    'Wealth Management, Capital Budgeting, Ind AS-IFRS, Revenue Recognition, Leases & Inventory-COGS (incl.')

rep('"m10": [', QUIZ + '"m10": [')

open(dst, "w", encoding="utf-8").write(t)
print("patched ->", dst, "| quiz entries:", sum(len(v) for v in quiz.values()))
