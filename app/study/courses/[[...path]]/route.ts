import fs from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

const COURSES_DIR = path.join(process.cwd(), 'PowerBI-Zero-to-Expert')

const MIME_TYPES: Record<string, string> = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mp3': 'audio/mpeg',
  '.wav': 'audio/wav',
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

  // Serve the main HTML course application if no subpath requested
  if (!pathSegments || pathSegments.length === 0) {
    let htmlPath = path.join(COURSES_DIR, 'PowerBI_Course_App.html')

    // Pick the highest-versioned PowerBI_Course_App_v*.html file.
    // This ignores diagnostic.html and any other stray files — only
    // files matching the pattern PowerBI_Course_App_v<number>.html are considered.
    if (fs.existsSync(COURSES_DIR)) {
      const versionedFiles = fs.readdirSync(COURSES_DIR)
        .filter(f => /^PowerBI_Course_App_v(\d+)\.html$/i.test(f))
        .sort((a, b) => {
          const verA = parseInt(a.match(/(\d+)\.html$/)?.[1] ?? '0', 10)
          const verB = parseInt(b.match(/(\d+)\.html$/)?.[1] ?? '0', 10)
          return verB - verA // highest version first
        })
      if (versionedFiles.length > 0) {
        htmlPath = path.join(COURSES_DIR, versionedFiles[0])
      }
      // else fall back to PowerBI_Course_App.html (already set above)
    }

    if (!fs.existsSync(htmlPath)) {
      return new NextResponse('Course application HTML not found in PowerBI-Zero-to-Expert directory.', { status: 404 })
    }

    let htmlContent = fs.readFileSync(htmlPath, 'utf-8')

    // 1. Inject a styled "← Study Hub" button into the header for easy navigation back to the main site
    const backBtnHtml = `<a href="/study" class="hbtn" style="text-decoration:none;display:inline-flex;align-items:center;gap:6px;font-size:0.85rem;font-weight:700;margin-right:2px;color:var(--ink);background:var(--panel2);border:1px solid var(--line);border-radius:10px;padding:6px 12px;transition:0.2s;white-space:nowrap;" title="Return to Study Hub" onmouseover="this.style.borderColor='var(--acc)'" onmouseout="this.style.borderColor='var(--line)'">← Study Hub</a>`
    
    if (htmlContent.includes('<div class="brand">')) {
      htmlContent = htmlContent.replace('<div class="brand">', `${backBtnHtml}\n <div class="brand">`)
    } else if (htmlContent.includes('<header>')) {
      htmlContent = htmlContent.replace('<header>', `<header>\n ${backBtnHtml}`)
    }

    // 2. Inject custom CSS to make the sidebar collapsible on ALL screen sizes with dynamic layout adjustment
    const customSidebarStyle = `
<style id="custom-responsive-sidebar">
  /* Always display the burger toggle button in the header on all screen sizes */
  header .burger, .hbtn.burger {
    display: inline-flex !important;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    user-select: none;
    z-index: 50;
    margin-right: 2px;
  }
  /* Smooth transition for sidebar and main content layout adjustments */
  aside {
    transition: transform 0.28s cubic-bezier(.2,.7,.3,1), box-shadow 0.28s !important;
  }
  main {
    transition: margin-left 0.28s cubic-bezier(.2,.7,.3,1), width 0.28s cubic-bezier(.2,.7,.3,1) !important;
  }
  /* Desktop / Laptop screens (>900px): allow sidebar closing & dynamic main content adjustment */
  @media (min-width: 901px) {
    aside {
      transform: translateX(0) !important;
      width: 288px !important;
    }
    main {
      margin-left: 288px !important;
    }
    /* When burger button is clicked (navchk checked), slide sidebar out and expand main content */
    .navchk:checked ~ aside,
    body:has(.navchk:checked) aside {
      transform: translateX(-100%) !important;
      box-shadow: none !important;
    }
    .navchk:checked ~ main,
    body:has(.navchk:checked) main {
      margin-left: 0 !important;
    }
  }
  /* Mobile / Tablet screens (<=900px): standard overlay drawer */
  @media (max-width: 900px) {
    aside {
      transform: translateX(-100%) !important;
    }
    .navchk:checked ~ aside,
    body:has(.navchk:checked) aside {
      transform: translateX(0) !important;
      box-shadow: 0 0 50px rgba(0,0,0,.65) !important;
    }
  }
</style>`

    if (htmlContent.includes('</head>')) {
      htmlContent = htmlContent.replace('</head>', `${customSidebarStyle}\n</head>`)
    }

    // 3. Ensure navigating between sections on desktop does NOT reset/override the user's open/closed sidebar preference
    htmlContent = htmlContent.replace(
      'if(_nc)_nc.checked=false;',
      'if(_nc && window.innerWidth <= 900)_nc.checked=false;'
    )

    return new NextResponse(htmlContent, {
      status: 200,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    })
  }

  // Serve static assets (e.g. english_audio/*.mp3, datasets/*.csv, markdown files, etc.)
  const relativePath = pathSegments.join('/')
  const filePath = path.join(COURSES_DIR, relativePath)

  // Security check against directory traversal
  const resolvedPath = path.resolve(filePath)
  if (!resolvedPath.startsWith(path.resolve(COURSES_DIR))) {
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
