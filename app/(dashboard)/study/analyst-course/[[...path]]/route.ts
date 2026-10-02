import fs from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

const COURSE_DIR = path.join(process.cwd(), 'public', 'analyst-course')

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.csv': 'text/csv; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.pdf': 'application/pdf',
  '.ico': 'image/x-icon',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
}

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ path?: string[] }> }
) {
  const { path: pathSegments } = await context.params

  // ── Serve index.html with site branding injected ──────────────────────────
  if (!pathSegments || pathSegments.length === 0) {
    const htmlPath = path.join(COURSE_DIR, 'index.html')

    if (!fs.existsSync(htmlPath)) {
      return new NextResponse('Analyst Course not found. Run the setup to extract the course files.', { status: 404 })
    }

    let html = fs.readFileSync(htmlPath, 'utf-8')

    // 1. Inject a theme-aware link back to the main study hub.
    const backBtn = `<a href="/study" class="site-course-back">← Study Hub</a>`

    if (html.includes('<div class="brand">')) {
      html = html.replace('<div class="brand">', `${backBtn}\n<div class="brand">`)
    }

    // 2. Bridge the standalone course to the site's theme preference and semantic palette.
    // The raw HTML route does not run the Next app shell, so it reads the same next-themes
    // localStorage key and offers a local toggle that writes back to that shared preference.
    const themeInitScript = `<script id="site-theme-init">(function(){try{var pref=localStorage.getItem('theme')||'system';var dark=pref==='dark'||(pref==='system'&&window.matchMedia&&window.matchMedia('(prefers-color-scheme: dark)').matches);document.documentElement.classList.toggle('dark',dark);}catch(e){}})();</script>`

    const themeStyles = `
<style id="site-theme-override">
  :root {
    color-scheme: light;
    --bg: #f8fafb;
    --panel: #ffffff;
    --panel2: #eef3f6;
    --ink: #17212b;
    --muted: #4c5b66;
    --line: #d8e2e6;
    --nav: #edf3f5;
    --nav-ink: #263740;
    --nav-hover: #dfeaed;
    --blue: #0d6e6e;
    --cyan: #087e8b;
    --orange: #855600;
    --green: #1a5c3a;
    --red: #9b2335;
    --shadow: 0 8px 26px rgba(15, 23, 42, .08);
    --on-brand: #ffffff;
    --bar-bg: #e5ecef;
    --step-bg: #dce5e8;
    --step-done-soft: #d4ebe6;
    --mission-start: #0b5960;
    --mission-mid: #0d6e6e;
    --mission-end: #087e8b;
    --mission-muted: #e5f4f3;
    --highlight-bg: #e6f3f2;
    --highlight-ink: #0b6260;
    --callout-bg: #eef7f6;
    --callout-ink: #334b4b;
    --exercise-bg: #fff6e6;
    --exercise-line: #e7d2a5;
    --code-bg: #111827;
    --code-ink: #e2e8f0;
    --editor-bg: #101827;
    --editor-panel: #1b2638;
    --editor-ink: #dbe7ff;
    --tag-bg: #eef2f5;
    --tag-ink: #455468;
    --answer-bg: #f7fafb;
    --answer-hover: #edf6f5;
    --task-bg: #e7f3f2;
    --task-ink: #0d6e6e;
    --toast-bg: #112f36;
    --toast-ink: #c9ffef;
    --mission-button-bg: #ffffff;
    --mission-button-ink: #0b5960;
    --locked-opacity: .58;
  }

  html.dark {
    color-scheme: dark;
    --bg: #0b1118;
    --panel: #131e2b;
    --panel2: #1b2a37;
    --ink: #e8f0f4;
    --muted: #b1c0c8;
    --line: #30414b;
    --nav: #0d171e;
    --nav-ink: #d8e4e8;
    --nav-hover: #1b3137;
    --blue: #4ec9bd;
    --cyan: #54d4e3;
    --orange: #f6c35b;
    --green: #6bd59b;
    --red: #ff8792;
    --shadow: 0 10px 32px rgba(0, 0, 0, .32);
    --on-brand: #071312;
    --bar-bg: #253640;
    --step-bg: #2c3c45;
    --step-done-soft: #1d4945;
    --mission-start: #0d3941;
    --mission-mid: #104e55;
    --mission-end: #116575;
    --mission-muted: #b8d9dd;
    --highlight-bg: rgba(78, 201, 189, .14);
    --highlight-ink: #a4e7df;
    --callout-bg: rgba(78, 201, 189, .11);
    --callout-ink: #c1d9db;
    --exercise-bg: rgba(245, 158, 11, .09);
    --exercise-line: rgba(245, 190, 85, .34);
    --code-bg: #0d151e;
    --code-ink: #e2e8f0;
    --editor-bg: #0d151e;
    --editor-panel: #16232e;
    --editor-ink: #e3edf6;
    --tag-bg: #24333e;
    --tag-ink: #c1ccd3;
    --answer-bg: #182630;
    --answer-hover: #203943;
    --task-bg: rgba(78, 201, 189, .15);
    --task-ink: #79d9ce;
    --toast-bg: #10282d;
    --toast-ink: #b8f4df;
    --mission-button-bg: #d8fffa;
    --mission-button-ink: #063b3b;
    --locked-opacity: .56;
  }

  body { background: var(--bg); color: var(--ink); }
  .side { background: var(--nav); color: var(--nav-ink); border-right: 1px solid var(--line); }
  .side .brand { color: var(--nav-ink); }
  .side .brand b { background: linear-gradient(135deg, var(--blue), var(--cyan)); }
  .site-course-back { display: inline-flex; align-items: center; gap: 6px; margin: 0 8px 12px; padding: 7px 10px; border: 1px solid var(--line); border-radius: 8px; background: var(--panel); color: var(--nav-ink); text-decoration: none; font-size: 12px; font-weight: 700; white-space: nowrap; transition: border-color .2s, color .2s, background .2s; }
  .site-course-back:hover { border-color: var(--blue); color: var(--blue); background: var(--panel2); }
  .workspace { color: var(--muted); }
  .nav a { color: var(--nav-ink); border-radius: 8px; }
  .nav a:hover, .nav a.active { color: var(--nav-ink); background: var(--nav-hover); }
  .nav hr { border-color: var(--line); }
  .profile { background: var(--panel); border-color: var(--line); color: var(--ink); }
  .profile small { color: var(--muted); }
  .main { background: var(--bg); padding-top: 20px; }
  .card { background: var(--panel); border-color: var(--line); box-shadow: var(--shadow); }
  .top { border-bottom: 1px solid var(--line); padding-bottom: 16px; margin-bottom: 24px; }
  .crumb { color: var(--muted); }
  .crumb b { color: var(--ink); }
  .search { background: var(--panel); border-color: var(--line); color: var(--muted); }
  .search input { background: transparent; color: var(--ink); }
  .search input::placeholder { color: var(--muted); opacity: .82; }
  .iconbtn { background: var(--panel); border-color: var(--line); color: var(--ink); }
  .iconbtn:hover { background: var(--panel2); color: var(--blue); border-color: var(--blue); }
  .hero h1 { color: var(--ink); }
  .hero p { color: var(--muted); }
  .primary { background: linear-gradient(135deg, var(--blue), var(--cyan)); color: var(--on-brand); border: none; box-shadow: 0 4px 14px rgba(13, 110, 110, .22); }
  .primary:hover { opacity: .92; }
  .secondary { background: var(--panel); border-color: var(--line); color: var(--ink); }
  .secondary:hover { background: var(--panel2); color: var(--blue); border-color: var(--blue); }
  .bar { background: var(--bar-bg); }
  .bar i { background: linear-gradient(90deg, var(--blue), var(--cyan)); }
  .stat .n { color: var(--ink); }
  .stat-head { color: var(--muted); }
  .up { color: var(--green); }
  .mission { background: linear-gradient(130deg, var(--mission-start), var(--mission-mid) 58%, var(--mission-end)); color: #fff; border: 1px solid rgba(78, 201, 189, .24); }
  .mission .eyebrow { color: var(--mission-muted); }
  .mission h2 { color: #fff; }
  .mission p { color: var(--mission-muted); }
  .mission button { background: var(--mission-button-bg); color: var(--mission-button-ink); }
  .table th { color: var(--muted); border-color: var(--line); }
  .table td { border-color: var(--line); color: var(--ink); }
  .pill { border-radius: 999px; }
  .beginner { background: color-mix(in srgb, var(--green) 12%, var(--panel)); color: var(--green); }
  .intermediate { background: color-mix(in srgb, var(--orange) 12%, var(--panel)); color: var(--orange); }
  .advanced { background: color-mix(in srgb, var(--red) 10%, var(--panel)); color: var(--red); }
  .pro { background: color-mix(in srgb, var(--cyan) 12%, var(--panel)); color: var(--cyan); }
  .link { color: var(--blue); }
  .link:hover { color: var(--cyan); }
  .step { color: var(--muted); }
  .step:before { background: var(--step-bg); border-color: var(--step-bg); }
  .step:after { background: var(--step-bg); }
  .step.done:before { background: var(--blue); border-color: var(--step-done-soft); }
  .step.done:after { background: var(--blue); }
  .step.current:before { background: var(--bg); border-color: var(--blue); }
  .skill .line b { color: var(--blue); }
  .lesson-nav { background: var(--panel); border-color: var(--line); }
  .module { border-color: var(--line); }
  .module h4 { color: var(--ink); }
  .lesson-item { color: var(--muted); }
  .lesson-item:hover { background: var(--panel2); color: var(--ink); cursor: pointer; }
  .lesson-item.on { background: var(--highlight-bg); color: var(--highlight-ink); }
  .lesson { background: var(--panel); color: var(--ink); }
  .lesson h1 { color: var(--ink); }
  .lesson p { color: var(--muted); }
  .callout { border-color: var(--blue); background: var(--callout-bg); color: var(--callout-ink); }
  .callout b { color: var(--blue); }
  .example { background: var(--code-bg); color: var(--code-ink); border: 1px solid var(--line); }
  .exercise { background: var(--exercise-bg); border-color: var(--exercise-line); }
  .exercise h3 { color: var(--ink); }
  .exercise p { color: var(--muted); }
  .editor { background: var(--editor-bg); border: 1px solid var(--line); }
  .editor-top { background: var(--editor-panel); color: var(--muted); border-bottom: 1px solid var(--line); }
  .editor textarea { background: var(--editor-bg); color: var(--editor-ink); caret-color: var(--cyan); }
  .editor-actions { background: var(--editor-panel); border-top: 1px solid var(--line); }
  .run { background: var(--blue); color: var(--on-brand); font-weight: 800; }
  .run:hover { background: var(--cyan); }
  .result { background: var(--panel); border: 1px solid var(--line); }
  .challenge { border-radius: 8px; }
  .challenge:hover { background: var(--panel2); cursor: pointer; }
  .challenge.active { background: var(--highlight-bg); border: 1px solid color-mix(in srgb, var(--blue) 34%, transparent); }
  .challenge h4 { color: var(--ink); }
  .challenge p { color: var(--muted); }
  .quiz { background: var(--panel); color: var(--ink); }
  .quiz .qnum { color: var(--blue); }
  .quiz h2 { color: var(--ink); }
  .answers button { background: var(--answer-bg); border-color: var(--line); color: var(--ink); text-align: left; }
  .answers button:hover { border-color: var(--blue); background: var(--answer-hover); color: var(--ink); }
  .project { background: var(--panel); }
  .project h3 { color: var(--ink); }
  .project p { color: var(--muted); }
  .project-art { background: linear-gradient(135deg, var(--task-bg), var(--highlight-bg)) !important; }
  .tag { background: var(--tag-bg); color: var(--tag-ink); }
  .level { background: var(--panel); color: var(--ink); }
  .level .num { color: var(--blue); }
  .level h3 { color: var(--ink); }
  .level p { color: var(--muted); }
  .level.locked { opacity: var(--locked-opacity); }
  .metric h3 { color: var(--ink); }
  .metric .formula { color: var(--blue); font-family: ui-monospace, monospace; }
  .metric p { color: var(--muted); }
  .chart { border-color: var(--line); background: repeating-linear-gradient(to bottom, transparent 0, transparent 42px, var(--line) 43px); }
  .chart div { background: linear-gradient(to top, var(--blue), var(--cyan)); border-radius: 4px 4px 0 0; }
  .chart label { color: var(--muted); }
  .task-icon { background: var(--task-bg); color: var(--task-ink); }
  .modal { background: rgba(8, 16, 24, .72); }
  .modal-card { background: var(--panel); border: 1px solid var(--line); color: var(--ink); }
  .modal-card h2 { color: var(--ink); }
  .modal-card p { color: var(--muted); }
  .form-grid label { color: var(--ink); }
  .form-grid select, .form-grid input { background: var(--panel2); border-color: var(--line); color: var(--ink); }
  .form-grid select:focus, .form-grid input:focus, .editor textarea:focus { outline: 2px solid var(--blue); outline-offset: 2px; }
  .toast { background: var(--toast-bg); border: 1px solid var(--blue); color: var(--toast-ink); }
  .empty { color: var(--muted); }
  :where(a, button, input, select, textarea, [tabindex]):focus-visible { outline: 2px solid var(--blue); outline-offset: 3px; }
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: var(--line); border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: var(--blue); }
</style>`

    // 3. Inject site font (Inter) to match the website
    const fontLink = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">`

    if (html.includes('</head>')) {
      html = html.replace('</head>', `${themeInitScript}\n${themeStyles}\n${fontLink}\n</head>`)
    }

    // Keep the existing theme control, but make its action and state screen-reader friendly.
    html = html.replace(
      '<button class="iconbtn" id="theme" title="Theme settings">☼</button>',
      '<button class="iconbtn" id="theme" type="button" title="Switch theme" aria-label="Switch theme" aria-pressed="false">☼</button>'
    )

    const themeController = `<script id="site-theme-controller">(function(){var root=document.documentElement;var button=document.getElementById('theme');var media=window.matchMedia?window.matchMedia('(prefers-color-scheme: dark)'):null;function apply(pref){var dark=pref==='dark'||(pref!=='light'&&!!(media&&media.matches));root.classList.toggle('dark',dark);if(button){button.setAttribute('aria-pressed',String(dark));button.setAttribute('aria-label',dark?'Switch to light theme':'Switch to dark theme');button.title=dark?'Switch to light theme':'Switch to dark theme';button.textContent=dark?'☼':'☾';}}try{apply(localStorage.getItem('theme')||'system');}catch(e){apply('system');}if(button){button.addEventListener('click',function(){var dark=!root.classList.contains('dark');try{localStorage.setItem('theme',dark?'dark':'light');}catch(e){}apply(dark?'dark':'light');});}window.addEventListener('storage',function(event){if(event.key==='theme')apply(event.newValue||'system');});if(media){var onSystemChange=function(){try{var pref=localStorage.getItem('theme');if(!pref||pref==='system')apply('system');}catch(e){apply('system');}};if(media.addEventListener)media.addEventListener('change',onSystemChange);else if(media.addListener)media.addListener(onSystemChange);}})();</script>`
    if (html.includes('</body>')) {
      html = html.replace('</body>', `${themeController}\n</body>`)
    }

    // 4. Fix all asset paths to be relative to this route
    // The JS files are served by this same route handler
    html = html.replace(
      /src="([^"]+\.js)"/g,
      (_, jsFile) => `src="/study/analyst-course/${jsFile}"`
    )

    return new NextResponse(html, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'public, max-age=0, s-maxage=300, stale-while-revalidate=3600',
      },
    })
  }

  // ── Serve static assets (JS files, CSVs, images, etc.) ────────────────────
  const relativePath = pathSegments.join('/')
  const filePath = path.join(COURSE_DIR, relativePath)

  // Security: block directory traversal
  const resolvedPath = path.resolve(filePath)
  if (!resolvedPath.startsWith(path.resolve(COURSE_DIR))) {
    return new NextResponse('Access Denied', { status: 403 })
  }

  if (!fs.existsSync(resolvedPath) || fs.statSync(resolvedPath).isDirectory()) {
    return new NextResponse('File Not Found', { status: 404 })
  }

  const ext = path.extname(resolvedPath).toLowerCase()
  const contentType = MIME_TYPES[ext] || 'application/octet-stream'
  const fileBuffer = fs.readFileSync(resolvedPath)

  return new NextResponse(fileBuffer, {
    status: 200,
    headers: {
      'Content-Type': contentType,
      'Cache-Control': 'public, max-age=3600, s-maxage=3600, stale-while-revalidate=3600',
    },
  })
}
