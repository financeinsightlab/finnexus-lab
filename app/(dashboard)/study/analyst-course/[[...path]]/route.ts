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

    // 1. Inject "← Study Hub" back button into sidebar brand area
    const backBtn = `<a href="/study" style="display:inline-flex;align-items:center;gap:6px;font-size:12px;font-weight:700;color:#9ca3af;text-decoration:none;padding:6px 10px;border-radius:8px;border:1px solid #2d3748;background:#1a2235;margin-bottom:12px;transition:all 0.2s;white-space:nowrap;" onmouseover="this.style.borderColor='#14b8a6';this.style.color='#14b8a6'" onmouseout="this.style.borderColor='#2d3748';this.style.color='#9ca3af'">← Study Hub</a>`

    if (html.includes('<div class="brand">')) {
      html = html.replace('<div class="brand">', `${backBtn}\n<div class="brand">`)
    }

    // 2. Override the course CSS variables to match site dark theme
    const darkThemeOverride = `
<style id="site-theme-override">
  /* ─── Match Kunwar Analytics dark theme ─── */
  :root {
    --bg: #0b0d13;
    --panel: #111827;
    --panel2: #1a2235;
    --ink: #e2e8f0;
    --muted: #6b7280;
    --line: #1f2d3d;
    --nav: #0d1117;
    --blue: #14b8a6;
    --cyan: #06b6d4;
    --orange: #f59e0b;
    --green: #10b981;
    --red: #f43f5e;
    --shadow: 0 4px 24px rgba(0,0,0,0.5);
  }

  /* Body & app background */
  body { background: var(--bg); color: var(--ink); }

  /* Sidebar */
  .side {
    background: var(--nav);
    border-right: 1px solid var(--line);
  }
  .side .brand { color: white; }
  .side .brand b { background: linear-gradient(135deg, #14b8a6, #0891b2); }
  .workspace { color: #4b5563; }

  /* Nav links */
  .nav a { color: #9ca3af; border-radius: 8px; }
  .nav a:hover, .nav a.active {
    color: white;
    background: #1f2d3d;
  }
  .nav hr { border-color: var(--line); }

  /* Profile */
  .profile {
    background: #111827;
    border-color: var(--line);
  }
  .profile small { color: #6b7280; }

  /* Main area */
  .main { background: var(--bg); padding-top: 20px; }

  /* Cards */
  .card {
    background: var(--panel);
    border-color: var(--line);
    box-shadow: var(--shadow);
  }

  /* Header / topbar */
  .top { border-bottom: 1px solid var(--line); padding-bottom: 16px; margin-bottom: 24px; }
  .crumb { color: #6b7280; }
  .crumb b { color: var(--ink); }
  .search {
    background: #111827;
    border-color: var(--line);
    color: #6b7280;
  }
  .search input { background: transparent; color: var(--ink); }
  .search input::placeholder { color: #4b5563; }
  .iconbtn { background: #111827; border-color: var(--line); color: #9ca3af; }
  .iconbtn:hover { background: #1f2d3d; color: white; }

  /* Hero */
  .hero h1 { color: white; }
  .hero p { color: #9ca3af; }

  /* Buttons */
  .primary {
    background: linear-gradient(135deg, #14b8a6, #0891b2);
    color: white;
    border: none;
    box-shadow: 0 4px 14px rgba(20,184,166,0.3);
  }
  .primary:hover { opacity: 0.9; }
  .secondary {
    background: #1f2d3d;
    border-color: var(--line);
    color: #d1d5db;
  }
  .secondary:hover { background: #2d3f56; color: white; }

  /* Progress bars */
  .bar { background: #1f2937; }
  .bar i { background: linear-gradient(90deg, #14b8a6, #0891b2); }

  /* Stats */
  .stat .n { color: white; }
  .stat-head { color: #9ca3af; }
  .up { color: #10b981; }

  /* Mission card */
  .mission {
    background: linear-gradient(135deg, #0d1f2d, #0f2a3f 50%, #0a2233);
    border: 1px solid rgba(20,184,166,0.2);
  }
  .mission .eyebrow { color: #5eead4; }
  .mission h2 { color: white; }
  .mission p { color: #94a3b8; }
  .mission button { background: #14b8a6; color: #022c22; }

  /* Tables */
  .table th { color: #6b7280; border-color: var(--line); }
  .table td { border-color: var(--line); color: var(--ink); }

  /* Pills */
  .pill { border-radius: 999px; }
  .beginner { background: rgba(16,185,129,0.15); color: #34d399; }
  .intermediate { background: rgba(245,158,11,0.15); color: #fbbf24; }
  .advanced { background: rgba(244,63,94,0.15); color: #fb7185; }
  .pro { background: rgba(139,92,246,0.15); color: #a78bfa; }

  /* Links */
  .link { color: #14b8a6; }
  .link:hover { color: #5eead4; }

  /* Journey steps */
  .step { color: #6b7280; }
  .step:before { background: #1f2937; border-color: #374151; }
  .step:after { background: #1f2937; }
  .step.done:before { background: #14b8a6; border-color: #0d9488; }
  .step.done:after { background: #0d9488; }
  .step.current:before { background: var(--bg); border-color: #14b8a6; }

  /* Skill bars */
  .skill .line b { color: #14b8a6; }

  /* Lesson nav */
  .lesson-nav { background: var(--panel); border-color: var(--line); }
  .module { border-color: var(--line); }
  .module h4 { color: var(--ink); }
  .lesson-item { color: #9ca3af; }
  .lesson-item:hover { background: #1f2d3d; color: white; cursor: pointer; }
  .lesson-item.on { background: rgba(20,184,166,0.15); color: #5eead4; }

  /* Lesson content */
  .lesson { background: var(--panel); }
  .lesson h1 { color: white; }
  .lesson p { color: #94a3b8; }
  .callout {
    border-color: #14b8a6;
    background: rgba(20,184,166,0.08);
    color: #94a3b8;
  }
  .callout b { color: #5eead4; }
  .example {
    background: #0d1117;
    color: #e2e8f0;
    border: 1px solid var(--line);
  }
  .exercise {
    background: rgba(20,184,166,0.06);
    border-color: rgba(20,184,166,0.2);
  }
  .exercise h3 { color: white; }
  .exercise p { color: #94a3b8; }

  /* SQL editor */
  .editor { background: #0d1117; border: 1px solid var(--line); }
  .editor-top { background: #111827; color: #9ca3af; border-bottom: 1px solid var(--line); }
  .editor textarea { background: #0d1117; color: #e2e8f0; caret-color: #14b8a6; }
  .editor-actions { background: #111827; border-top: 1px solid var(--line); }
  .run { background: #14b8a6; color: #022c22; font-weight: 800; }
  .run:hover { background: #0d9488; }
  .result { background: var(--panel); border: 1px solid var(--line); }

  /* Challenges */
  .challenge { border-radius: 8px; }
  .challenge:hover { background: #1f2d3d; cursor: pointer; }
  .challenge.active { background: rgba(20,184,166,0.12); border: 1px solid rgba(20,184,166,0.25); }
  .challenge h4 { color: var(--ink); }
  .challenge p { color: #6b7280; }

  /* Quiz */
  .quiz { background: var(--panel); }
  .quiz .qnum { color: #14b8a6; }
  .quiz h2 { color: white; }
  .answers button {
    background: #1f2937;
    border-color: var(--line);
    color: #d1d5db;
    text-align: left;
  }
  .answers button:hover { border-color: #14b8a6; background: rgba(20,184,166,0.08); color: white; }

  /* Projects */
  .project { background: var(--panel); }
  .project h3 { color: white; }
  .project p { color: #9ca3af; }
  .project-art { background: linear-gradient(135deg, rgba(20,184,166,0.15), rgba(6,182,212,0.08)) !important; }

  /* Tags */
  .tag { background: #1f2937; color: #9ca3af; }

  /* Level cards */
  .level { background: var(--panel); }
  .level .num { color: #14b8a6; }
  .level h3 { color: white; }
  .level p { color: #94a3b8; }
  .level.locked { opacity: 0.4; }

  /* Metrics */
  .metric h3 { color: white; }
  .metric .formula { color: #14b8a6; font-family: ui-monospace, monospace; }
  .metric p { color: #94a3b8; }

  /* Chart */
  .chart { border-color: var(--line); background: none; }
  .chart div { background: linear-gradient(to top, #14b8a6, #0891b2); border-radius: 4px 4px 0 0; }
  .chart label { color: #6b7280; }

  /* Task icons */
  .task-icon { background: rgba(20,184,166,0.15); color: #14b8a6; }

  /* Modal */
  .modal-card { background: #111827; border: 1px solid var(--line); color: var(--ink); }
  .modal-card h2 { color: white; }
  .modal-card p { color: #9ca3af; }
  .form-grid label { color: #9ca3af; }
  .form-grid select, .form-grid input {
    background: #1f2937;
    border-color: var(--line);
    color: white;
  }

  /* Toast */
  .toast { background: #111827; border: 1px solid #14b8a6; color: #5eead4; }

  /* Portfolio empty */
  .empty { color: #4b5563; }

  /* Scrollbar */
  ::-webkit-scrollbar { width: 6px; height: 6px; }
  ::-webkit-scrollbar-track { background: var(--bg); }
  ::-webkit-scrollbar-thumb { background: #2d3f56; border-radius: 3px; }
  ::-webkit-scrollbar-thumb:hover { background: #14b8a6; }
</style>`

    // 3. Inject site font (Inter) to match the website
    const fontLink = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap" rel="stylesheet">`

    if (html.includes('</head>')) {
      html = html.replace('</head>', `${darkThemeOverride}\n${fontLink}\n</head>`)
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
        'Cache-Control': 'no-cache, no-store, must-revalidate',
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
      'Cache-Control': 'public, max-age=3600',
    },
  })
}
