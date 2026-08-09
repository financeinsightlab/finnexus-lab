#!/usr/bin/env python3
# Patch build_app_v47.py -> build_app_v48.py
#   + 5th umbrella "Finance: Accounting & Reporting" (far) with course 1: Ind AS & IFRS (ia1..ia12)
# QUIZ entries auto-extracted from the md files (single source of truth).
import os, re, json

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = os.path.join(BASE, "tools", "build_app_v47.py")
dst = os.path.join(BASE, "tools", "build_app_v48.py")
t = open(src, encoding="utf-8").read()

def rep(old, new, n=1):
    global t
    c = t.count(old)
    assert c == n, f"anchor count {c} != {n} for: {old[:70]!r}"
    t = t.replace(old, new)

# ---------- 1. QUIZZES from md ----------
MD_FILES = [
 "IA_01_The_Standards_World.md", "IA_02_Conceptual_Framework.md",
 "IA_03_Presentation_IndAS1.md", "IA_04_First_Time_Adoption_IndAS101.md",
 "IA_05_Fair_Value_IndAS113.md", "IA_06_Financial_Instruments_Classification.md",
 "IA_07_ECL_Impairment_Engine.md", "IA_08_Foreign_Currency_IndAS21.md",
 "IA_09_Employee_Benefits_ESOP.md", "IA_10_EPS_Segments.md",
 "IA_11_Standards_Tour.md", "IA_12_Capstone_Standards_Tribunal.md",
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
    sid = "ia" + str(int(f[3:5]))
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
rep('OUT = os.path.join(BASE, "PowerBI_Course_App_v47.html")',
    'OUT = os.path.join(BASE, "PowerBI_Course_App_v48.html")')

NEW_SECTIONS = """
IA_SECTIONS = [
    ("IA_01_The_Standards_World.md", "ia1", "IA1 · The Standards World", "\\U0001F4DA", "convergence & carve-outs, roadmap Rs 500cr/250cr phases, principles vs rules, LIFO exhibit"),
    ("IA_02_Conceptual_Framework.md", "ia2", "IA2 · The Conceptual Framework", "\\U0001F9F1", "elements & qualities, neutrality vs prudence, HC vs current value, Ind AS 8 hierarchy"),
    ("IA_03_Presentation_IndAS1.md", "ia3", "IA3 · Presentation of FS (Ind AS 1)", "\\U0001F5C2\\uFE0F", "complete set, 12m gauntlet, DTA always non-current, 2 OCI buckets, 3rd BS rule"),
    ("IA_04_First_Time_Adoption_IndAS101.md", "ia4", "IA4 · First-Time Adoption (Ind AS 101)", "\\U0001F309", "transition 1-Apr-15 vs first yr 16-17, no-hindsight exceptions, deemed cost, recon 966.25"),
    ("IA_05_Fair_Value_IndAS113.md", "ia5", "IA5 · Fair Value (Ind AS 113)", "\\u2728", "exit price canon, L1/L2/L3, 3 techniques, H&BU, Day-1 deferral"),
    ("IA_06_Financial_Instruments_Classification.md", "ia6", "IA6 · FI Classification (Ind AS 109)", "\\U0001F4C7", "2 gates: business model + SPPI, AC/FVOCI/FVTPL, equity one-way door, EIR 10.53%"),
    ("IA_07_ECL_Impairment_Engine.md", "ia7", "IA7 · ECL Impairment (Ind AS 109)", "\\U0001F6DF", "3 stages, 12m vs lifetime, 30-dpd presumption, 27.3cr on 650 = 4.2%, matrix 12.0"),
    ("IA_08_Foreign_Currency_IndAS21.md", "ia8", "IA8 · Foreign Currency (Ind AS 21)", "\\U0001F310", "functional vs presentation, machine Rs 88L frozen, payable Rs 3.5L, FCTR->OCI"),
    ("IA_09_Employee_Benefits_ESOP.md", "ia9", "IA9 · Employee Benefits & ESOPs (19/102)", "\\U0001F474", "PUC unit Rs 16,141, DBO Rs 1.14L, OCI-only remeasurements, ESOP grant-FV"),
    ("IA_10_EPS_Segments.md", "ia10", "IA10 · EPS & Segments (33/108)", "\\U0001F522", "basic 12.00 -> ESOP 11.57 -> diluted 10.34, anti-dilution sieve, 10%/75% rules"),
    ("IA_11_Standards_Tour.md", "ia11", "IA11 · The Standards Tour", "\\U0001F9F0", "37/38/36/23/24/10 tour, onerous Rs 0.7L, CGU -10/-13.3/-6.7, pool cap 9.6%"),
    ("IA_12_Capstone_Standards_Tribunal.md", "ia12", "IA12 · CAPSTONE: The Standards Tribunal", "\\U0001F3C6", "5 live files, OCI-or-P&L drill, equity bridge Rs 1,413cr, interview forge"),
]
"""
rep('    ("CB_07_Capstone_Capital_Committee.md", "cb7", "CB7 · CAPSTONE: The Capital Committee", "\\U0001F3C6", "Doors 1/2/3, defuser roots -8%/+41%, bundle 2+3 = +8.69L, chair memo, forge"),\n]\n',
    '    ("CB_07_Capstone_Capital_Committee.md", "cb7", "CB7 · CAPSTONE: The Capital Committee", "\\U0001F3C6", "Doors 1/2/3, defuser roots -8%/+41%, bundle 2+3 = +8.69L, chair memo, forge"),\n]\n' + NEW_SECTIONS)

rep(' + RT_SECTIONS + TV_SECTIONS + WM_SECTIONS + CB_SECTIONS\n',
    ' + RT_SECTIONS + TV_SECTIONS + WM_SECTIONS + CB_SECTIONS + IA_SECTIONS\n')

rep('"tv": [], "wm": [], "cb": []}',
    '"tv": [], "wm": [], "cb": [], "ia": []}')
rep('"tv": 0, "wm": 0, "cb": 0}',
    '"tv": 0, "wm": 0, "cb": 0, "ia": 0}')

rep('    if sid == "cb1":\n        _gcur = "cb"\n',
    '    if sid == "cb1":\n        _gcur = "cb"\n    if sid == "ia1":\n        _gcur = "ia"\n')

rep('    ("cb",    "🏗️ Capital Budgeting", "fin"),\n',
    '    ("cb",    "🏗️ Capital Budgeting", "fin"),\n    ("ia",    "📜 Ind AS & IFRS", "far"),\n')

rep('    ("fin", "💼 Finance Core"),\n]',
    '    ("fin", "💼 Finance Core"),\n    ("far", "📚 Finance: Accounting & Reporting"),\n]')

rep('<p>Four umbrellas now —', '<p>Five umbrellas now —')
rep('capital committee!) — every track basic→advanced, finance-flavored · 906 auto-graded quiz questions · ShopKart',
    'capital committee!) · 📚 <b>FINANCE: ACCOUNTING & REPORTING</b> (NEW! 📜 Ind AS & IFRS — the standards constitution: framework → presentation → adoption → fair value → financial instruments → ECL → FX → employee benefits → EPS/segments → the daily six → the Standards Tribunal!) — every track basic→advanced, finance-flavored · 942 auto-graded quiz questions · ShopKart')

rep('<div class="stat"><b data-count="302">0</b><span>Sections</span></div>',
    '<div class="stat"><b data-count="314">0</b><span>Sections</span></div>')
rep('<div class="stat"><b data-count="298">0</b><span>Hands-on labs</span></div>',
    '<div class="stat"><b data-count="310">0</b><span>Hands-on labs</span></div>')
rep('<div class="stat"><b data-count="906">0</b><span>Quiz questions</span></div>',
    '<div class="stat"><b data-count="942">0</b><span>Quiz questions</span></div>')

rep(' 302 sections across 47 courses: ',
    ' 314 sections across 48 courses: ')
rep('Wealth Management & Capital Budgeting (incl.',
    'Wealth Management, Capital Budgeting & Ind AS-IFRS (incl.')

rep('"m10": [', QUIZ + '"m10": [')

open(dst, "w", encoding="utf-8").write(t)
print("patched ->", dst, "| quiz entries:", sum(len(v) for v in quiz.values()))
