#!/usr/bin/env python3
# Patch build_app_v46.py -> build_app_v47.py
#   + Wealth Management (wm1..wm7) + Capital Budgeting (cb1..cb7)
# QUIZ entries are auto-extracted from the md files (single source of truth).
import os, re, json

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
src = os.path.join(BASE, "tools", "build_app_v46.py")
dst = os.path.join(BASE, "tools", "build_app_v47.py")
t = open(src, encoding="utf-8").read()

def rep(old, new, n=1):
    global t
    c = t.count(old)
    assert c == n, f"anchor count {c} != {n} for: {old[:70]!r}"
    t = t.replace(old, new)

# ---------- 1. QUIZZES from md ----------
MD_FILES = [
 "WM_01_The_Wealth_Machine.md", "WM_02_Risk_Profiling_Allocation.md",
 "WM_03_Instrument_Shelf_Fee_Drag.md", "WM_04_Tax_Architecture.md",
 "WM_05_Insurance_Protection.md", "WM_06_Retirement_Withdrawal_Estate.md",
 "WM_07_Capstone_Wealth_Desk.md",
 "CB_01_The_Capital_Decision.md", "CB_02_Estimating_Project_Cash_Flows.md",
 "CB_03_Cost_of_Capital.md", "CB_04_Uncertainty_Real_Options.md",
 "CB_05_Unequal_Lives_Rationing_Replacement.md", "CB_06_Execution_Post_Audit.md",
 "CB_07_Capstone_Capital_Committee.md",
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
    sid = ("wm" if f.startswith("WM") else "cb") + str(int(f[3:5]))
    quiz[sid] = parse_quiz(f)
assert len(quiz) == 14 and sum(len(v) for v in quiz.values()) == 42

qlines = []
for sid, entries in quiz.items():
    qlines.append(f'"{sid}": [')
    for e in entries:
        qlines.append("  " + json.dumps(e, ensure_ascii=True) + ",")
    qlines.append("],")
QUIZ = "\n".join(qlines) + "\n"

# ---------- 2. builder surgery ----------
rep('OUT = os.path.join(BASE, "PowerBI_Course_App_v46.html")',
    'OUT = os.path.join(BASE, "PowerBI_Course_App_v47.html")')

NEW_SECTIONS = """
WM_SECTIONS = [
    ("WM_01_The_Wealth_Machine.md", "wm1", "WM1 · The Wealth Machine", "\\U0001F4B0", "4 gears, save-first law, wishes->goals, FI 28x/25x, Verma dashboard"),
    ("WM_02_Risk_Profiling_Allocation.md", "wm2", "WM2 · Risk Profiling & Allocation", "\\U0001F9ED", "capacity x willingness x required tie-break, 60/30/10 glidepath, core-satellite AAP"),
    ("WM_03_Instrument_Shelf_Fee_Drag.md", "wm3", "WM3 · The Instrument Shelf & Fee Drag", "\\U0001F4E6", "6 shelves, drag canon: 1% fee = 19.8% of 30y corpus, 9% factor 1,829, realty math"),
    ("WM_04_Tax_Architecture.md", "wm4", "WM4 · Tax Architecture", "\\U0001F9FE", "regime arithmetic, 80C->NPS->80D->HRA order, Rs 62,400 stack, TLH March"),
    ("WM_05_Insurance_Protection.md", "wm5", "WM5 · Insurance & Protection", "\\U0001F6E1\\uFE0F", "Separation Law, 12x anchor Rs 2Cr, health stack 10L+90L, CSR 98 / solvency 1.8"),
    ("WM_06_Retirement_Withdrawal_Estate.md", "wm6", "WM6 · Retirement, Withdrawal & Estate", "\\U0001F3D6\\uFE0F", "SWR 3-3.5%, 3-bucket defense, SWP 24-29k vs annuity 1.9L tax, estate layer"),
    ("WM_07_Capstone_Wealth_Desk.md", "wm7", "WM7 · CAPSTONE: The Wealth Desk", "\\U0001F3C6", "Mehta file judged, dose ladder Rs 32.6k vs Rs 65k, protection Rs 1.85L/yr, forge"),
]

CB_SECTIONS = [
    ("CB_01_The_Capital_Decision.md", "cb1", "CB1 · The Capital Decision", "\\U0001F4D0", "incremental-flow law, 4 poisons, sunk vs opportunity, phantom Rs 17.5L"),
    ("CB_02_Estimating_Project_Cash_Flows.md", "cb2", "CB2 · Estimating Project Cash Flows", "\\U0001F4B5", "OCF/capex/WC blocks, dep shield 0.50L, honest -0.83, cold-chain breakeven"),
    ("CB_03_Cost_of_Capital.md", "cb3", "CB3 · The Cost of Capital", "\\u2696\\uFE0F", "WACC 12.14% (0.70x13.5 + 0.30x8.98), Hamada 1.083, divisional 13.59, hurdle games"),
    ("CB_04_Uncertainty_Real_Options.md", "cb4", "CB4 · Uncertainty & Real Options", "\\U0001F3B2", "sensitivity E[NPV] -0.26L, abandonment put, pilot option +16.4, delay +12.4"),
    ("CB_05_Unequal_Lives_Rationing_Replacement.md", "cb5", "CB5 · Unequal Lives, Rationing & Replacement", "\\U0001F500", "EAA 0.435 vs 0.536, rationing A+B+C 6.3, POS +1.91, lease 7.69 vs 8.47"),
    ("CB_06_Execution_Post_Audit.md", "cb6", "CB6 · Execution & Post-Audit", "\\U0001F4CB", "sanction memo, 2x overrun physics, sponsor ledger, audit: WC 19L / CCC 80d"),
    ("CB_07_Capstone_Capital_Committee.md", "cb7", "CB7 · CAPSTONE: The Capital Committee", "\\U0001F3C6", "Doors 1/2/3, defuser roots -8%/+41%, bundle 2+3 = +8.69L, chair memo, forge"),
]
"""
rep('    ("TV_07_Capstone_TVM_Desk.md", "tv7", "TV7 · CAPSTONE: The TVM Desk", "\\U0001F3C6", "Sharma file, 6-move protocol, defuse, forge"),\n]\n',
    '    ("TV_07_Capstone_TVM_Desk.md", "tv7", "TV7 · CAPSTONE: The TVM Desk", "\\U0001F3C6", "Sharma file, 6-move protocol, defuse, forge"),\n]\n' + NEW_SECTIONS)

rep(' + EC_SECTIONS + PM_SECTIONS + RT_SECTIONS + TV_SECTIONS\n',
    ' + EC_SECTIONS + PM_SECTIONS + RT_SECTIONS + TV_SECTIONS + WM_SECTIONS + CB_SECTIONS\n')

rep('"ec": [], "pm": [], "rt": [], "tv": []}',
    '"ec": [], "pm": [], "rt": [], "tv": [], "wm": [], "cb": []}')
rep('"ec": 0, "pm": 0, "rt": 0, "tv": 0}',
    '"ec": 0, "pm": 0, "rt": 0, "tv": 0, "wm": 0, "cb": 0}')

rep('    if sid == "tv1":\n        _gcur = "tv"\n',
    '    if sid == "tv1":\n        _gcur = "tv"\n    if sid == "wm1":\n        _gcur = "wm"\n    if sid == "cb1":\n        _gcur = "cb"\n')

rep('    ("tv",    "⏳ Time Value of Money", "fin"),\n',
    '    ("tv",    "⏳ Time Value of Money", "fin"),\n    ("wm",    "💎 Wealth Management", "fin"),\n    ("cb",    "🏗️ Capital Budgeting", "fin"),\n')

rep(' · 🔍 Ratio Analysis · ⏳ Time Value of Money — from journal entries to the ratio room and the desk that prices time itself!)',
    ' · 🔍 Ratio Analysis · ⏳ Time Value of Money · 💎 Wealth Management · 🏗️ Capital Budgeting — the complete 13-course Finance Core: from journal entries to the wealth desk and the capital committee!)')
rep(' · 864 auto-graded quiz questions · ShopKart', ' · 906 auto-graded quiz questions · ShopKart')

rep('<div class="stat"><b data-count="288">0</b><span>Sections</span></div>',
    '<div class="stat"><b data-count="302">0</b><span>Sections</span></div>')
rep('<div class="stat"><b data-count="284">0</b><span>Hands-on labs</span></div>',
    '<div class="stat"><b data-count="298">0</b><span>Hands-on labs</span></div>')
rep('<div class="stat"><b data-count="864">0</b><span>Quiz questions</span></div>',
    '<div class="stat"><b data-count="906">0</b><span>Quiz questions</span></div>')

rep(' 288 sections across 45 courses: ',
    ' 302 sections across 47 courses: ')
rep('Economics, Portfolio Management, Ratio Analysis & Time Value of Money (incl.',
    'Economics, Portfolio Management, Ratio Analysis, Time Value of Money, Wealth Management & Capital Budgeting (incl.')

rep('"m10": [', QUIZ + '"m10": [')

open(dst, "w", encoding="utf-8").write(t)
print("patched ->", dst, "| quiz entries:", sum(len(v) for v in quiz.values()))
