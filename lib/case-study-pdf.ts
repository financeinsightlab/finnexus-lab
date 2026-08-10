// FILE: lib/case-study-pdf.ts
// Generates a clean, consulting-deck-style PDF from a case study's MDX content.
// Uses pdf-lib with built-in Helvetica fonts (no binary assets needed).
import {
  PDFDocument,
  StandardFonts,
  rgb,
  type PDFFont,
  type PDFPage,
} from 'pdf-lib';
import type { CaseStudy } from '@/types';

const PAGE_W = 595.28; // A4 width (pt)
const PAGE_H = 841.89; // A4 height (pt)
const MARGIN = 52;
const CONTENT_W = PAGE_W - MARGIN * 2;
const BOTTOM_FLOOR = 58;

// Brand colors
const NAVY = rgb(0.1, 0.17, 0.24);
const TEAL = rgb(0.05, 0.43, 0.43);
const GRAY = rgb(0.35, 0.38, 0.42);
const LIGHT = rgb(0.55, 0.57, 0.6);
const DARK = rgb(0.16, 0.18, 0.2);

/** Map non-WinAnsi characters (₹, en-dashes, arrows…) to safe ASCII/Latin-1 equivalents. */
function toWinAnsi(text: string): string {
  return text
    .replace(/₹/g, 'Rs.')
    .replace(/[‐‑‒–—−]/g, '-')
    .replace(/[“”]/g, '"')
    .replace(/[‘’]/g, "'")
    .replace(/…/g, '...')
    .replace(/·/g, '.')
    .replace(/→/g, '>')
    .replace(/←/g, '<')
    .replace(/≤/g, '<=')
    .replace(/≥/g, '>=')
    .replace(/×/g, 'x')
    .replace(/÷/g, '/')
    .replace(/±/g, '+/-')
    .replace(/≈/g, '~')
    .replace(/‰/g, '%')
    .replace(/[^\x20-\x7E\u00A0-\u00FF]/g, '?');
}

/** Strip inline markdown: **bold**, *italic*, `code`, [text](url). */
function stripInline(text: string): string {
  return text
    .replace(/\*\*([^*]+)\*\*/g, '$1')
    .replace(/\*([^*]+)\*/g, '$1')
    .replace(/`([^`]+)`/g, '$1')
    .replace(/\[([^\]]+)\]\([^)]*\)/g, '$1')
    .trim();
}

function wrapText(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (font.widthOfTextAtSize(test, size) <= maxWidth) {
      line = test;
    } else {
      if (line) lines.push(line);
      // Hard-break over-long words (URLs etc.)
      let rest = word;
      while (font.widthOfTextAtSize(rest, size) > maxWidth && rest.length > 1) {
        let i = rest.length - 1;
        while (i > 1 && font.widthOfTextAtSize(rest.slice(0, i), size) > maxWidth) i--;
        lines.push(rest.slice(0, i));
        rest = rest.slice(i);
      }
      line = rest;
    }
  }
  if (line) lines.push(line);
  return lines;
}

interface Cursor {
  page: PDFPage;
  y: number;
  pageIndex: number;
}

interface LayoutCtx {
  doc: PDFDocument;
  font: PDFFont;
  bold: PDFFont;
  italic: PDFFont;
  cursor: Cursor;
  pageCount: () => number;
}

function newPage(ctx: LayoutCtx): void {
  const page = ctx.doc.addPage([PAGE_W, PAGE_H]);
  ctx.cursor = { page, y: PAGE_H - MARGIN, pageIndex: ctx.cursor.pageIndex + 1 };
  // Footer
  drawFooter(ctx);
}

function drawFooter(ctx: LayoutCtx): void {
  const { page } = ctx.cursor;
  page.drawText('KUNWAR ANALYTICS', { x: MARGIN, y: 30, size: 7, font: ctx.bold, color: LIGHT });
  page.drawText(`CASE STUDY — Page ${ctx.cursor.pageIndex + 1}`, {
    x: PAGE_W - MARGIN,
    y: 30,
    size: 7,
    font: ctx.font,
    color: LIGHT,
  });
}

function ensureSpace(ctx: LayoutCtx, needed: number): void {
  if (ctx.cursor.y - needed < BOTTOM_FLOOR) {
    newPage(ctx);
  }
}

function drawLine(ctx: LayoutCtx, x: number, width: number, color = LIGHT, thickness = 0.75): void {
  const y = ctx.cursor.y;
  ctx.cursor.page.drawLine({ start: { x, y }, end: { x: x + width, y }, thickness, color });
  ctx.cursor.y = y - 10;
}

function drawParagraph(
  ctx: LayoutCtx,
  text: string,
  opts: {
    size?: number;
    font?: PDFFont;
    color?: ReturnType<typeof rgb>;
    indent?: number;
    lineGap?: number;
    spaceAfter?: number;
  } = {}
): void {
  const { size = 10, indent = 0, lineGap = 5, spaceAfter = 8 } = opts;
  const font = opts.font ?? ctx.font;
  const color = opts.color ?? DARK;
  const maxWidth = CONTENT_W - indent;
  const lines = wrapText(toWinAnsi(text), font, size, maxWidth);
  const lineHeight = size * 1.42 + lineGap;
  ensureSpace(ctx, lines.length * lineHeight + spaceAfter);
  for (const line of lines) {
    ctx.cursor.page.drawText(line, { x: MARGIN + indent, y: ctx.cursor.y, size, font, color });
    ctx.cursor.y -= lineHeight;
  }
  ctx.cursor.y -= spaceAfter;
}

function drawHeading(ctx: LayoutCtx, text: string, level: number): void {
  const size = level === 1 ? 17 : level === 2 ? 13.5 : 11.5;
  const before = level === 1 ? 6 : 14;
  const after = level === 1 ? 10 : 7;
  ensureSpace(ctx, size + before + after + 14);
  ctx.cursor.y -= before;
  // Accent tick for section headings
  if (level >= 2) {
    const y = ctx.cursor.y - size * 0.4;
    ctx.cursor.page.drawRectangle({ x: MARGIN, y, width: 3, height: size * 0.9, color: TEAL });
  }
  ctx.cursor.page.drawText(toWinAnsi(stripInline(text)), {
    x: MARGIN + (level >= 2 ? 10 : 0),
    y: ctx.cursor.y,
    size,
    font: ctx.bold,
    color: NAVY,
  });
  ctx.cursor.y -= size + after;
  if (level === 1) {
    ctx.cursor.y -= 4;
    drawLine(ctx, MARGIN + (0), 46, TEAL, 2);
    ctx.cursor.y -= 6;
  }
}

function drawBullet(ctx: LayoutCtx, text: string, marker: string, depth: number): void {
  const size = 10;
  const indent = 14 + depth * 16;
  const markerWidth = 16;
  const maxWidth = CONTENT_W - indent - markerWidth;
  const lines = wrapText(toWinAnsi(stripInline(text)), ctx.font, size, maxWidth);
  const lineHeight = size * 1.4 + 4;
  ensureSpace(ctx, lines.length * lineHeight + 6);
  const first = lines[0] ?? '';
  ctx.cursor.page.drawText(marker, { x: MARGIN + indent, y: ctx.cursor.y, size, font: ctx.bold, color: TEAL });
  ctx.cursor.page.drawText(first, { x: MARGIN + indent + markerWidth, y: ctx.cursor.y, size, font: ctx.font, color: DARK });
  ctx.cursor.y -= lineHeight;
  for (const line of lines.slice(1)) {
    ctx.cursor.page.drawText(line, { x: MARGIN + indent + markerWidth, y: ctx.cursor.y, size, font: ctx.font, color: DARK });
    ctx.cursor.y -= lineHeight;
  }
  ctx.cursor.y -= 4;
}

function drawBlockquote(ctx: LayoutCtx, text: string): void {
  const size = 9.5;
  const indent = 16;
  const maxWidth = CONTENT_W - indent - 8;
  const lines = wrapText(toWinAnsi(stripInline(text)), ctx.italic, size, maxWidth);
  const lineHeight = size * 1.4 + 4;
  ensureSpace(ctx, lines.length * lineHeight + 8);
  const y0 = ctx.cursor.y;
  ctx.cursor.page.drawRectangle({ x: MARGIN + indent - 8, y: ctx.cursor.y - lineHeight * lines.length + 4, width: 2.5, height: lineHeight * lines.length, color: TEAL });
  for (const line of lines) {
    ctx.cursor.page.drawText(line, { x: MARGIN + indent, y: ctx.cursor.y, size, font: ctx.italic, color: GRAY });
    ctx.cursor.y -= lineHeight;
  }
  ctx.cursor.y -= 4;
  void y0;
}

function drawTableRow(ctx: LayoutCtx, row: string, header: boolean): void {
  const cells = row
    .replace(/^\||\|$/g, '')
    .split('|')
    .map((c) => stripInline(c).trim());
  const size = 8.6;
  const font = header ? ctx.bold : ctx.font;
  const color = header ? NAVY : DARK;
  const full = cells.join('   |   ');
  const lines = wrapText(toWinAnsi(full), font, size, CONTENT_W - 20);
  const lineHeight = size * 1.45 + 3;
  ensureSpace(ctx, lines.length * lineHeight + 6);
  for (const line of lines) {
    ctx.cursor.page.drawText(line, { x: MARGIN + 10, y: ctx.cursor.y, size, font, color });
    ctx.cursor.y -= lineHeight;
  }
  ctx.cursor.y -= 3;
}

const TABLE_SEP_RE = /^[\s|:\-+]+$/;

export async function buildCaseStudyPdf(study: CaseStudy): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  const font = await doc.embedFont(StandardFonts.Helvetica);
  const bold = await doc.embedFont(StandardFonts.HelveticaBold);
  const italic = await doc.embedFont(StandardFonts.HelveticaOblique);

  const firstPage = doc.addPage([PAGE_W, PAGE_H]);
  const ctx: LayoutCtx = { doc, font, bold, italic, cursor: { page: firstPage, y: PAGE_H - MARGIN, pageIndex: 0 }, pageCount: () => doc.getPageCount() };

  // ── Header block ──
  ctx.cursor.page.drawText('KUNWAR ANALYTICS', { x: MARGIN, y: ctx.cursor.y, size: 11, font: bold, color: NAVY });
  ctx.cursor.page.drawText('CASE STUDY', { x: PAGE_W - MARGIN, y: ctx.cursor.y, size: 9, font: bold, color: TEAL });
  ctx.cursor.y -= 22;

  drawParagraph(ctx, study.title, { size: 19, font: bold, color: NAVY, lineGap: 6, spaceAfter: 12 });

  // Meta line
  const metaBits = [
    study.engagementType,
    study.industry ? `Industry: ${study.industry}` : '',
    `Client: ${study.clientType}`,
    study.timeline ? `Timeline: ${study.timeline}` : '',
    `Date: ${new Date(study.date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`,
  ].filter(Boolean);
  drawParagraph(ctx, metaBits.join('   |   '), { size: 9, font: bold, color: TEAL, spaceAfter: 8 });

  drawParagraph(ctx, study.outcome, { size: 10.5, font: italic, color: GRAY, spaceAfter: 14 });

  if (study.frameworks && study.frameworks.length > 0) {
    drawParagraph(ctx, `Frameworks: ${study.frameworks.join(' · ')}`, { size: 9, color: LIGHT, spaceAfter: 6 });
  }
  drawLine(ctx, MARGIN, CONTENT_W, LIGHT, 0.8);
  ctx.cursor.y -= 10;

  // ── Body ──
  const lines = (study.content ?? '').split('\n');
  let listDepth = 0;
  let pendingListGap = 0;
  let tableHeaderPending = false;

  for (const rawLine of lines) {
    const line = rawLine.replace(/\r$/, '');
    const trimmed = line.trim();

    if (!trimmed) {
      ctx.cursor.y -= 6;
      listDepth = 0;
      continue;
    }

    // Horizontal rule
    if (/^---+$/.test(trimmed)) {
      ctx.cursor.y -= 6;
      drawLine(ctx, MARGIN, CONTENT_W, LIGHT, 0.6);
      ctx.cursor.y -= 4;
      continue;
    }

    // Tables
    if (trimmed.startsWith('|')) {
      if (TABLE_SEP_RE.test(trimmed)) {
        tableHeaderPending = true;
        continue;
      }
      drawTableRow(ctx, trimmed, tableHeaderPending);
      tableHeaderPending = false;
      continue;
    }

    // Headings
    const headingMatch = /^(#{1,3})\s+(.*)$/.exec(trimmed);
    if (headingMatch) {
      drawHeading(ctx, headingMatch[2], headingMatch[1].length);
      tableHeaderPending = false;
      continue;
    }

    // Blockquote
    if (trimmed.startsWith('>')) {
      drawBlockquote(ctx, trimmed.replace(/^>\s?/, ''));
      continue;
    }

    // Unordered list
    const ulMatch = /^[-•*]\s+(.*)$/.exec(trimmed);
    if (ulMatch) {
      if (listDepth === 0) pendingListGap = 0;
      listDepth = 1;
      void pendingListGap;
      drawBullet(ctx, ulMatch[1], '•', 0);
      continue;
    }

    // Ordered list
    const olMatch = /^(\d+)[.)]\s+(.*)$/.exec(trimmed);
    if (olMatch) {
      drawBullet(ctx, olMatch[2], `${olMatch[1]}.`, 0);
      continue;
    }

    // Nested list (indented)
    if (/^\s{2,}/.test(line) && /^[-•*]\s+/.test(trimmed)) {
      drawBullet(ctx, trimmed.replace(/^[-•*]\s+/, ''), '–', 1);
      continue;
    }

    // Regular paragraph
    if (pendingListGap > 0) {
      ctx.cursor.y -= pendingListGap;
      pendingListGap = 0;
    }
    drawParagraph(ctx, trimmed, { size: 10, spaceAfter: 8 });
    tableHeaderPending = false;
  }

  // ── Footer block on last page ──
  ctx.cursor.y -= 12;
  if (ctx.cursor.y > BOTTOM_FLOOR + 24) {
    drawLine(ctx, MARGIN, CONTENT_W, LIGHT, 0.6);
    ctx.cursor.y -= 6;
    drawParagraph(ctx, 'Prepared by Kunwar Analytics — kunwaranalytics.in', { size: 8, color: LIGHT, spaceAfter: 0 });
  }

  return doc.save();
}
