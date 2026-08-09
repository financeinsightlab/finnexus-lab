#!/usr/bin/env python3
# Patch build_app_v48.py -> build_app_v48.py
#   + Accounting & Reporting course 2: Revenue Recognition Ind AS 115 (rr1..rr12)
# QUIZ entries auto-extracted from the md files (single source of truth).
import os, re, json

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = os.path.join(BASE, "tools", "build_app_v48.py")
dst = os.path.join(BASE, "tools", "build_app_v49.py")
t = open(src, encoding="utf-8").read()

def rep(old, new, n=1):
    global t
    c = t.count(old)
    assert c == n, f"anchor count {c} != {n} for: {old[:70]!r}"
    t = t.replace(old, new)

# ---------- 1. QUIZZES from md ----------
MD_FILES = [
 "RR_01_Five_Step_Model.md", "RR_02_Contract_Identification.md",
 "RR_03_Performance_Obligations.md", "RR_04_Transaction_Price.md",
 "RR_05_Allocation_SSP.md", "RR_06_Over_Time_Point_in_Time.md",
 "RR_07_Contract_Positions_Costs.md", "RR_08_Licenses_Agent_Warranty_Returns.md",
 "RR_09_Consignment_BillHold_Options.md", "RR_10_Construction_Long_Term.md",
 "RR_11_SaaS_Telecom_RealEstate.md", "RR_12_Capstone_Revenue_Chamber.md",
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
    sid = "rr" + str(int(f[3:5]))
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
rep('OUT = os.path.join(BASE, "PowerBI_Course_App_v48.html")',
    'OUT = os.path.join(BASE, "PowerBI_Course_App_v49.html")')

NEW_SECTIONS = """
RR_SECTIONS = [
    ("RR_01_Five_Step_Model.md", "rr1", "RR1 · The Five-Step Model", "\\U0001F6E0\\uFE0F", "5-step engine, control doctrine, IAS 18/11 autopsy, bundle Rs 15k/9k/375"),
    ("RR_02_Contract_Identification.md", "rr2", "RR2 · Step 1: Identify the Contract", "\\U0001F91D", "5 criteria, collect=probable, combinations, 3 modification doors"),
    ("RR_03_Performance_Obligations.md", "rr3", "RR3 · Step 2: Performance Obligations", "\\U0001F3AF", "distinct x2 tests, welding indicators, series rule, set-ups, stand-ready"),
    ("RR_04_Transaction_Price.md", "rr4", "RR4 · Step 3: Transaction Price", "\\U0001F4B5", "EV 13L vs most-likely 20L, constraint, SFC 100->116.64L, non-cash, netting"),
    ("RR_05_Allocation_SSP.md", "rr5", "RR5 · Step 4: Allocation & SSP", "\\U0001F370", "relative-SSP hammer, 3 lanes + residual guardrail, telecom Rs 12,000 + 500/mo"),
    ("RR_06_Over_Time_Point_in_Time.md", "rr6", "RR6 · Step 5: Over Time vs Point in Time", "\\u23F1\\uFE0F", "3 OT criteria, input/output measures, materials exclusion Rs 123.33L, expedient"),
    ("RR_07_Contract_Positions_Costs.md", "rr7", "RR7 · Contract Assets, Liabilities & Costs", "\\u2696\\uFE0F", "conditionality knife, asset Rs 9,000, ECL crossover, obtain/fulfil gates"),
    ("RR_08_Licenses_Agent_Warranty_Returns.md", "rr8", "RR8 · Licenses, Agent, Warranties & Returns", "\\U0001F4DD", "access vs use, royalty exception, agent net Rs 15, warranty split, returns canon"),
    ("RR_09_Consignment_BillHold_Options.md", "rr9", "RR9 · Consignment, Bill-and-Hold & Options", "\\U0001F3F7\\uFE0F", "channel-stuffing, B&H fortress, gym fee Rs 1,000/mo, option SSP 9,000, breakage"),
    ("RR_10_Construction_Long_Term.md", "rr10", "RR10 · Construction & Long-Term Contracts", "\\U0001F3D7\\uFE0F", "POC 40%->4.0cr, unsigned=zero, retention, onerous law +0.167cr tonight"),
    ("RR_11_SaaS_Telecom_RealEstate.md", "rr11", "RR11 · Industry Engines", "\\U0001F3ED", "SaaS Rs 12,500/mo, telecom churn, T&M vs fixed-bid, RERA PIT, escrow 70%"),
    ("RR_12_Capstone_Revenue_Chamber.md", "rr12", "RR12 · CAPSTONE: The Revenue Chamber", "\\U0001F3C6", "6 files, 10-exhibit PIT/OT trial, canon conductor, chamber memo, forge"),
]
"""
rep('    ("IA_12_Capstone_Standards_Tribunal.md", "ia12", "IA12 · CAPSTONE: The Standards Tribunal", "\\U0001F3C6", "5 live files, OCI-or-P&L drill, equity bridge Rs 1,413cr, interview forge"),\n]\n',
    '    ("IA_12_Capstone_Standards_Tribunal.md", "ia12", "IA12 · CAPSTONE: The Standards Tribunal", "\\U0001F3C6", "5 live files, OCI-or-P&L drill, equity bridge Rs 1,413cr, interview forge"),\n]\n' + NEW_SECTIONS)

rep(' + WM_SECTIONS + CB_SECTIONS + IA_SECTIONS\n',
    ' + WM_SECTIONS + CB_SECTIONS + IA_SECTIONS + RR_SECTIONS\n')

rep('"tv": [], "wm": [], "cb": [], "ia": []}',
    '"tv": [], "wm": [], "cb": [], "ia": [], "rr": []}')
rep('"tv": 0, "wm": 0, "cb": 0, "ia": 0}',
    '"tv": 0, "wm": 0, "cb": 0, "ia": 0, "rr": 0}')

rep('    if sid == "ia1":\n        _gcur = "ia"\n',
    '    if sid == "ia1":\n        _gcur = "ia"\n    if sid == "rr1":\n        _gcur = "rr"\n')

rep('    ("ia",    "📜 Ind AS & IFRS", "far"),\n',
    '    ("ia",    "📜 Ind AS & IFRS", "far"),\n    ("rr",    "💰 Revenue Recognition", "far"),\n')

rep('(NEW! 📜 Ind AS & IFRS — the standards constitution: framework → presentation → adoption → fair value → financial instruments → ECL → FX → employee benefits → EPS/segments → the daily six → the Standards Tribunal!) — every track basic→advanced, finance-flavored · 942 auto-graded quiz questions · ShopKart',
    '(NEW! 📜 Ind AS & IFRS — framework → fair value → financial instruments → ECL → the Tribunal · 💰 Revenue Recognition — the king standard: 5 steps, SSP slicing, PIT/OT clock, POC warfare → the Revenue Chamber!) — every track basic→advanced, finance-flavored · 978 auto-graded quiz questions · ShopKart')

rep('<div class="stat"><b data-count="314">0</b><span>Sections</span></div>',
    '<div class="stat"><b data-count="326">0</b><span>Sections</span></div>')
rep('<div class="stat"><b data-count="310">0</b><span>Hands-on labs</span></div>',
    '<div class="stat"><b data-count="322">0</b><span>Hands-on labs</span></div>')
rep('<div class="stat"><b data-count="942">0</b><span>Quiz questions</span></div>',
    '<div class="stat"><b data-count="978">0</b><span>Quiz questions</span></div>')

rep(' 314 sections across 48 courses: ',
    ' 326 sections across 49 courses: ')
rep('Wealth Management, Capital Budgeting & Ind AS-IFRS (incl.',
    'Wealth Management, Capital Budgeting, Ind AS-IFRS & Revenue Recognition (incl.')

rep('"m10": [', QUIZ + '"m10": [')

open(dst, "w", encoding="utf-8").write(t)
print("patched ->", dst, "| quiz entries:", sum(len(v) for v in quiz.values()))
