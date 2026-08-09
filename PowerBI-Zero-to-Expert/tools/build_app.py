# Builds PowerBI_Course_App.html — a single-file interactive course app.
import html, os, re

BASE = os.path.normpath(os.path.join(os.path.dirname(os.path.abspath(__file__)), ".."))
OUT = os.path.join(BASE, "PowerBI_Course_App.html")

SECTIONS = [
    ("00_START_HERE_Roadmap.md", "roadmap", "00 · Start Here — Roadmap", "🚀"),
    ("Module_01_Foundations.md", "m1", "01 · Foundations & First Report", "🏁"),
    ("Module_02_Power_Query.md", "m2", "02 · Power Query", "🧹"),
    ("Module_03_Data_Modeling.md", "m3", "03 · Data Modeling", "⭐"),
    ("Module_04_DAX_Fundamentals.md", "m4", "04 · DAX Fundamentals", "∑"),
    ("Module_05_DAX_Advanced.md", "m5", "05 · DAX Mastery (Advanced)", "🔥"),
    ("Module_06_Visualization_Design.md", "m6", "06 · Visualization & Design", "🎨"),
    ("Module_07_Service_Sharing_Security.md", "m7", "07 · Service, Sharing & Security", "☁️"),
    ("Module_08_Performance_Enterprise.md", "m8", "08 · Performance & Enterprise", "⚡"),
    ("Module_09_Capstone_Projects.md", "m9", "09 · Capstone Projects", "🏆"),
    ("DAX_Cheat_Sheet.md", "cheat", "★ · DAX Cheat Sheet", "📌"),
    ("Resources_Certification_Career.md", "res", "★ · Career, PL-300 & Resources", "🎓"),
]

# ---------------- markdown -> html ----------------
def inline(text):
    text = text.replace("\\*", "\x01")
    codes = []
    def stash(m):
        codes.append(html.escape(m.group(1)))
        return "\x00%d\x00" % (len(codes) - 1)
    text = re.sub(r"`([^`]+)`", stash, text)
    text = html.escape(text)
    text = re.sub(r"\*\*([^*]+)\*\*", r"<strong>\1</strong>", text)
    text = re.sub(r"(?<![\w*])\*([^*\n]+)\*(?!\w)", r"<em>\1</em>", text)
    text = re.sub(r"\[([^\]]+)\]\((https?://[^)\s]+|[^)\s]+)\)",
                  r'<a href="\2" target="_blank" rel="noopener">\1</a>', text)
    text = re.sub(r"\x00(\d+)\x00", lambda m: "<code>" + codes[int(m.group(1))] + "</code>", text)
    return text.replace("\x01", "*")

def md_to_html(md):
    lines = md.split("\n")
    out, i, stack, para = [], 0, [], []

    def flush_para():
        if para:
            out.append("<p>" + inline(" ".join(para)) + "</p>")
            para.clear()

    def flush_lists():
        while stack:
            out.append("</%s>" % stack.pop()[1])

    while i < len(lines):
        line = lines[i]

        if line.strip().startswith("```"):
            flush_para(); flush_lists()
            lang = line.strip()[3:].strip()
            code = []
            i += 1
            while i < len(lines) and not lines[i].strip().startswith("```"):
                code.append(lines[i]); i += 1
            out.append('<pre data-lang="%s"><code>%s</code></pre>'
                       % (html.escape(lang), html.escape("\n".join(code))))
            i += 1
            continue

        s = line.strip()
        if not s:
            flush_para(); flush_lists(); i += 1; continue

        # table
        if s.startswith("|") and i + 1 < len(lines) and re.match(r"^\s*\|?[\s:\-|]+\|?\s*$", lines[i + 1]):
            flush_para(); flush_lists()
            def cells(r): return [c.strip() for c in r.strip().strip("|").split("|")]
            header = cells(s); i += 2
            rows = []
            while i < len(lines) and lines[i].strip().startswith("|"):
                rows.append(cells(lines[i])); i += 1
            t = ["<table><thead><tr>" + "".join("<th>%s</th>" % inline(c) for c in header) + "</tr></thead><tbody>"]
            for r in rows:
                r = (r + [""] * len(header))[:len(header)]
                t.append("<tr>" + "".join("<td>%s</td>" % inline(c) for c in r) + "</tr>")
            t.append("</tbody></table>")
            out.append("".join(t))
            continue

        m = re.match(r"^(#{1,4})\s+(.*)$", s)
        if m:
            flush_para(); flush_lists()
            lvl = len(m.group(1))
            out.append("<h%d>%s</h%d>" % (lvl, inline(m.group(2)), lvl))
            i += 1; continue

        if re.fullmatch(r"-{3,}", s):
            flush_para(); flush_lists()
            out.append("<hr>"); i += 1; continue

        if s.startswith(">"):
            flush_para(); flush_lists()
            out.append("<blockquote>" + inline(s.lstrip("> ")) + "</blockquote>")
            i += 1; continue

        m = re.match(r"^(\s*)([-+*])\s+(.*)$", line)
        m2 = None if m else re.match(r"^(\s*)(\d+)[.)]\s+(.*)$", line)
        if m or m2:
            flush_para()
            g = m or m2
            indent = len(g.group(1))
            tag = "ul" if m else "ol"
            text = g.group(3)
            if not stack or indent > stack[-1][0]:
                out.append("<%s>" % tag); stack.append((indent, tag))
            else:
                while stack and indent < stack[-1][0]:
                    out.append("</%s>" % stack.pop()[1])
                if stack and stack[-1][1] != tag:
                    out.append("</%s>" % stack.pop()[1])
                    out.append("<%s>" % tag); stack.append((indent, tag))
                if not stack:
                    out.append("<%s>" % tag); stack.append((indent, tag))
            out.append("<li>" + inline(text) + "</li>")
            i += 1; continue

        para.append(s)
        i += 1

    flush_para(); flush_lists()
    return "\n".join(out)

# ---------------- build sections ----------------
parts = []
for fname, sid, label, icon in SECTIONS:
    with open(os.path.join(BASE, fname), encoding="utf-8") as f:
        parts.append('<section class="lesson" id="%s" data-title="%s">\n%s\n'
                     '<div class="lesson-foot"><button class="done-btn" data-id="%s">✔ Mark as complete</button></div>\n</section>'
                     % (sid, html.escape(label), md_to_html(f.read()), sid))
sections_html = "\n".join(parts)

nav_items = "".join(
    '<li data-s="%s"><a href="#%s"><span class="ni">%s</span><span class="lbl">%s</span><span class="tick" data-tick="%s"></span></a></li>'
    % (sid, sid, icon, html.escape(label), sid) for _, sid, label, icon in SECTIONS)

CSS = """
:root{--bg:#0e1117;--bg2:#151a23;--panel:#1b2230;--ink:#e8ecf3;--mut:#9aa6bb;--acc:#f2c811;--acc2:#26c6da;--line:#28324a;--code:#0a0d13;}
body.lite{--bg:#f6f7fb;--bg2:#ffffff;--panel:#ffffff;--ink:#182032;--mut:#5a6178;--line:#e2e7f0;--code:#f1f3f8;}
*{box-sizing:border-box}
body{margin:0;background:var(--bg);color:var(--ink);font:16px/1.65 "Segoe UI",system-ui,sans-serif;}
header{position:fixed;inset:0 0 auto 0;height:56px;background:var(--bg2);border-bottom:1px solid var(--line);display:flex;gap:12px;align-items:center;padding:0 16px;z-index:50;}
.brand{font-weight:700;display:flex;align-items:center;gap:8px;white-space:nowrap}.brand .dot{width:12px;height:12px;background:var(--acc);border-radius:3px;display:inline-block}
#search{flex:1;max-width:420px;background:var(--panel);border:1px solid var(--line);border-radius:8px;color:var(--ink);padding:8px 12px;outline:none}
#search:focus{border-color:var(--acc)}
.hbtn{background:var(--panel);border:1px solid var(--line);color:var(--ink);border-radius:8px;padding:7px 10px;cursor:pointer}
.hbtn:hover{border-color:var(--acc)}
.progwrap{margin-left:auto;display:flex;align-items:center;gap:10px;font-size:.85rem;color:var(--mut);white-space:nowrap}
.prog{width:120px;height:8px;background:var(--panel);border-radius:99px;overflow:hidden;border:1px solid var(--line)}
.prog i{display:block;height:100%;width:0%;background:linear-gradient(90deg,var(--acc),var(--acc2));transition:width .3s}
#burger{display:none}
aside{position:fixed;top:56px;bottom:0;left:0;width:290px;overflow-y:auto;background:var(--bg2);border-right:1px solid var(--line);padding:14px 10px;}
aside li{list-style:none;margin:2px 0}
aside a{display:flex;align-items:center;gap:9px;text-decoration:none;color:var(--ink);padding:9px 10px;border-radius:9px;font-size:.92rem}
aside a:hover{background:var(--panel)}
aside a.active{background:var(--panel);box-shadow:inset 3px 0 0 var(--acc)}
aside ul{padding:0;margin:0}
.ni{width:26px;text-align:center}.lbl{flex:1}
.tick{font-style:normal;color:#3ddc84;font-weight:700}
.home-li a{font-weight:600}
main{margin:56px 0 0 290px;padding:28px clamp(16px,4vw,56px) 90px;}
section.lesson{display:none;animation:fade .25s ease}
section.lesson.show{display:block}
@keyframes fade{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
h1{font-size:1.7rem;border-bottom:2px solid var(--acc);padding-bottom:8px;line-height:1.3}
h2{font-size:1.3rem;margin-top:2.2rem;border-left:4px solid var(--acc);padding-left:10px}
h3{font-size:1.1rem;margin-top:1.6rem;color:var(--acc2)}
h4{font-size:1rem;margin-top:1.2rem}
a{color:var(--acc2)}
code{background:var(--code);border:1px solid var(--line);padding:1px 6px;border-radius:6px;font-family:Consolas,"Cascadia Mono",monospace;font-size:.9em;color:#ffd76a}
body.lite code{color:#a25b00}
pre{position:relative;background:var(--code);border:1px solid var(--line);border-radius:12px;padding:16px;overflow-x:auto;line-height:1.5}
pre code{background:none;border:none;padding:0;color:#9fe6c0;font-size:.88rem}
body.lite pre code{color:#0b6e4f}
pre::before{content:attr(data-lang);position:absolute;top:0;right:0;background:var(--line);color:var(--ink);font-size:.65rem;text-transform:uppercase;padding:2px 10px;border-radius:0 11px 0 8px;letter-spacing:.06em}
pre:has([data-lang=""])::before{content:"code"}
.copyb{position:absolute;top:6px;right:64px;background:var(--panel);border:1px solid var(--line);color:var(--ink);border-radius:7px;font-size:.7rem;padding:3px 8px;cursor:pointer}
.copyb:hover{border-color:var(--acc)}
table{border-collapse:collapse;width:100%;margin:14px 0;display:block;overflow-x:auto}
th,td{border:1px solid var(--line);padding:8px 10px;font-size:.9rem;text-align:left;vertical-align:top}
th{background:var(--panel)}
tr:nth-child(even) td{background:rgba(255,255,255,.02)}
body.lite tr:nth-child(even) td{background:#fafbfd}
blockquote{border-left:4px solid var(--acc2);margin:16px 0;padding:10px 14px;background:var(--bg2);border-radius:0 10px 10px 0;color:var(--ink)}
hr{border:none;border-top:1px solid var(--line);margin:2.4rem 0}
li{margin:3px 0}
details.answers{margin:14px 0;background:var(--bg2);border:1px dashed var(--acc);border-radius:10px;padding:10px 16px}
details.answers summary{cursor:pointer;font-weight:700;color:var(--acc)}
.lesson-foot{margin-top:3rem;display:flex;gap:12px;flex-wrap:wrap}
.done-btn{background:var(--panel);border:1px solid var(--line);color:var(--ink);border-radius:10px;padding:11px 18px;font-size:.95rem;cursor:pointer}
.done-btn.done{background:#12351f;border-color:#3ddc84;color:#3ddc84}
body.lite .done-btn.done{background:#e6f9ee}
.pn{display:flex;justify-content:space-between;gap:10px;margin-top:1.4rem}
.pn a{background:var(--panel);border:1px solid var(--line);border-radius:10px;padding:10px 16px;text-decoration:none;color:var(--ink)}
.pn a:hover{border-color:var(--acc)}
.hero{background:linear-gradient(135deg,#1b2230,#12161f);border:1px solid var(--line);border-radius:18px;padding:clamp(20px,4vw,44px);margin-bottom:22px}
.hero h1{border:none;margin:0 0 10px;font-size:clamp(1.6rem,4vw,2.3rem)}
.hero h1 span{color:var(--acc)}
.hero p{color:var(--mut);max-width:640px}
body.lite .hero{background:linear-gradient(135deg,#fff,#eef2fb)}
.cta{background:var(--acc);color:#111;border:none;border-radius:10px;padding:12px 22px;font-weight:700;font-size:1rem;cursor:pointer}
.cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(220px,1fr));gap:12px;margin-top:18px}
.card{background:var(--bg2);border:1px solid var(--line);border-radius:14px;padding:16px;cursor:pointer;transition:.15s}
.card:hover{border-color:var(--acc);transform:translateY(-2px)}
.card b{display:block;margin:6px 0 4px}.card small{color:var(--mut)}
.badge{display:inline-block;background:var(--panel);border:1px solid var(--line);border-radius:99px;padding:2px 10px;font-size:.72rem;color:var(--mut);margin:2px}
#top{position:fixed;right:18px;bottom:18px;z-index:60;display:none}
.flash{animation:fl 1.6s ease}
@keyframes fl{0%{box-shadow:0 0 0 3px var(--acc)}100%{box-shadow:none}}
@media (max-width:900px){
 aside{transform:translateX(-100%);transition:.25s;width:270px}
 aside.open{transform:none;box-shadow:0 0 40px rgba(0,0,0,.5)}
 main{margin-left:0}#burger{display:block}
 .progwrap .plabel{display:none}
}
@media print{header,aside,.lesson-foot,.pn,#top{display:none!important}main{margin:0}section.lesson{display:block!important}}
"""

JS = """
var IDS = IDS_TOKEN;
var LABELS = LABELS_TOKEN;
function $(s){return document.querySelector(s)} 
function $all(s){return Array.prototype.slice.call(document.querySelectorAll(s))}
var stored=[];try{stored=JSON.parse(localStorage.getItem('pbi-progress')||'[]')}catch(e){}
function save(){localStorage.setItem('pbi-progress',JSON.stringify(stored))}
function paint(){
 var done={},i;for(i=0;i<stored.length;i++)done[stored[i]]=1;
 $all('.tick').forEach(function(t){t.textContent=done[t.getAttribute('data-tick')]?'✓':''});
 $all('.done-btn').forEach(function(b){var d=done[b.getAttribute('data-id')];b.className='done-btn'+(d?' done':'');b.textContent=d?'✔ Completed — tap to undo':'✔ Mark as complete';});
 var n=stored.filter(function(x){return IDS.indexOf(x)>=0}).length;
 $('#pfill').style.width=Math.round(100*n/IDS.length)+'%';
 $('#ptext').textContent=n+'/'+IDS.length+' sections complete';
}
function go(id){
 if(!document.getElementById(id))id='home';
 $all('.lesson').forEach(function(s){s.classList.toggle('show',s.id===id)});
 $('#home').style.display=(id==='home')?'block':'none';
 $all('aside a').forEach(function(a){a.classList.toggle('active',a.getAttribute('href')==='#'+id)});
 document.querySelector('main').scrollIntoView();window.scrollTo(0,0);
 document.querySelector('aside').classList.remove('open');
}
window.addEventListener('hashchange',function(){go(location.hash.slice(1))});
$all('.done-btn').forEach(function(b){b.addEventListener('click',function(){
 var id=b.getAttribute('data-id');
 if(stored.indexOf(id)>=0)stored=stored.filter(function(x){return x!==id});else stored.push(id);
 save();paint();
})});
$all('pre').forEach(function(p){
 var b=document.createElement('button');b.className='copyb';b.textContent='copy';
 b.addEventListener('click',function(){navigator.clipboard.writeText(p.querySelector('code').innerText);b.textContent='copied!';setTimeout(function(){b.textContent='copy'},1200)});
 p.appendChild(b);
});
// hide answers behind reveal buttons
$all('section.lesson h2, section.lesson h3, section.lesson h4').forEach(function(h){
 if(!/answers|✅ solutions|✅ selected/i.test(h.textContent))return;
 var det=document.createElement('details');det.className='answers';
 det.innerHTML='<summary>'+h.textContent+' — click to reveal (try first!)</summary>';
 var n=h.nextSibling;
 while(n){if(n.nodeType===1&&/^(H1|H2|H3|H4|HR)$/.test(n.tagName)&&!/answers/i.test(n.textContent))break;
   if(n.nodeType===1&&n.tagName==='HR')break;
   var nn=n.nextSibling;det.appendChild(n);n=nn;}
 h.parentNode.replaceChild(det,h);
});
// prev / next footers
IDS.forEach(function(id,ix){
 var s=document.getElementById(id);
 var f=document.createElement('div');f.className='pn';
 var prev=ix>0?IDS[ix-1]:'home',next=ix<IDS.length-1?IDS[ix+1]:null;
 f.innerHTML='<a href="#'+prev+'">← '+(LABELS[prev]||'🏠 Home')+'</a>'+(next?'<a href="#'+next+'">'+(LABELS[next])+' →</a>':'<span></span>');
 s.appendChild(f);
});
$('#search').addEventListener('input',function(){
 var q=this.value.trim().toLowerCase();
 $all('aside li[data-s]').forEach(function(li){
   var matchTitle=li.textContent.toLowerCase().indexOf(q)>=0;
   var matchBody=!q?true:document.getElementById(li.getAttribute('data-s')).textContent.toLowerCase().indexOf(q)>=0;
   li.style.display=(matchTitle||matchBody)?'':'none';
 });
});
$('#search').addEventListener('keydown',function(e){
 if(e.key!=='Enter')return;var q=this.value.trim().toLowerCase();if(!q)return;
 for(var i=0;i<IDS.length;i++){var s=document.getElementById(IDS[i]);
  if(s.textContent.toLowerCase().indexOf(q)>=0){location.hash=IDS[i];s.classList.add('flash');setTimeout(function(){s.classList.remove('flash')},1700);break;}}
});
$('#theme').addEventListener('click',function(){document.body.classList.toggle('lite');});
$('#burger').addEventListener('click',function(){document.querySelector('aside').classList.toggle('open')});
window.addEventListener('scroll',function(){$('#top').style.display=window.scrollY>600?'block':'none'});
$('#top').addEventListener('click',function(){window.scrollTo({top:0,behavior:'smooth'})});
if(localStorage.getItem('pbi-theme')==='lite')document.body.classList.add('lite');
$('#theme').addEventListener('click',function(){localStorage.setItem('pbi-theme',document.body.classList.contains('lite')?'lite':'dark')});
go(location.hash.slice(1)||'home');paint();
"""

HOME = """
<section class="lesson show" id="home">
<div class="hero">
 <h1>Power BI <span>Zero → Expert</span> 👋</h1>
 <p>Your complete self-study academy: 9 modules, hands-on labs with a 1,300-row Indian retail dataset (ShopKart India),
 graded exercises, reveal-answer quizzes, a DAX cheat sheet, 3 portfolio projects and a PL-300 certification plan.
 Progress is saved on this device automatically.</p>
 <button class="cta" onclick="location.hash='roadmap'">Start the roadmap →</button>
 <div style="margin-top:12px"><span class="badge">12 sections</span><span class="badge">~12 weeks</span><span class="badge">30/70 rule</span><span class="badge">offline app</span></div>
</div>
<div class="cards">CARDS_TOKEN</div>
<h2 style="margin-top:2.4rem">How to use this app</h2>
<ul>
<li><strong>Navigate</strong> with the sidebar (☰ on mobile) — lessons unlock in order, but you can jump anywhere.</li>
<li><strong>Mark complete</strong> at the bottom of each section; the yellow bar up top tracks your journey.</li>
<li><strong>Search</strong> anything — "RLS", "CALCULATE", "gateway" — and hit Enter to jump straight to it.</li>
<li><strong>Answers are hidden</strong> behind reveal buttons: always attempt exercises first.</li>
<li>Practice data lives in the <code>datasets/</code> folder next to this app file; open Power BI Desktop → Get Data → Text/CSV.</li>
</ul>
</section>
"""

cards = "".join(
    '<div class="card" onclick="location.hash=\'%s\'"><span style="font-size:1.4rem">%s</span><b>%s</b><small>%s</small></div>'
    % (sid, icon, label, desc)
    for (sid, icon, label, desc) in [
        ("roadmap","🚀","Start Here","12-week plan & setup"),
        ("m1","🏁","Foundations","Power BI tour + first report"),
        ("m2","🧹","Power Query","Clean any messy data"),
        ("m3","⭐","Data Modeling","Star schemas that scale"),
        ("m4","∑","DAX Fundamentals","Measures & KPIs"),
        ("m5","🔥","DAX Mastery","CALCULATE & patterns"),
        ("m6","🎨","Report Design","Dashboards that wow"),
        ("m7","☁️","Service & Security","Publish, refresh, RLS"),
        ("m8","⚡","Performance","Speed & enterprise tools"),
        ("m9","🏆","Capstones","3 portfolio projects"),
        ("cheat","📌","Cheat Sheet","DAX at your fingertips"),
        ("res","🎓","PL-300 & Career","Certification + interviews"),
    ])

ids_js = "[" + ",".join('"%s"' % s for _, s, _, _ in SECTIONS) + "]"
labels_js = "{" + ",".join('"%s":"%s"' % (s, label.replace('"', "'")) for _, s, label, _ in SECTIONS) + ",'home':'🏠 Home'}"

js_final = JS.replace("IDS_TOKEN", ids_js).replace("LABELS_TOKEN", labels_js)
home_final = HOME.replace("CARDS_TOKEN", cards)

doc = """<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Power BI Zero → Expert · Course App</title>
<style>""" + CSS + """</style></head>
<body>
<header>
 <button class="hbtn" id="burger">☰</button>
 <div class="brand"><span class="dot"></span>Power BI Mastery</div>
 <input id="search" placeholder="Search the course… (Enter = jump)">
 <button class="hbtn" id="theme">◐ Theme</button>
 <div class="progwrap"><span class="plabel" id="ptext">0/12 sections complete</span><div class="prog"><i id="pfill"></i></div></div>
</header>
<aside><ul>
 <li class="home-li"><a href="#home"><span class="ni">🏠</span><span class="lbl">Home</span></a></li>""" + nav_items + """
</ul></aside>
<main>
""" + home_final + "\n" + sections_html + """
</main>
<button class="hbtn" id="top">↑ Top</button>
<script>""" + js_final + """</script>
</body></html>"""

with open(OUT, "w", encoding="utf-8") as f:
    f.write(doc)
print("Wrote", OUT, "-", round(os.path.getsize(OUT)/1024), "KB")
