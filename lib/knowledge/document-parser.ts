// lib/knowledge/document-parser.ts — Multi-Format Content Parser

export interface ParsedDocument {
  title: string;
  text: string;
  metadata?: Record<string, unknown>;
}

export function parseTextDocument(filename: string, content: string): ParsedDocument {
  const clean = content.replace(/\0/g, '').trim();
  const title = filename.replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ');

  // For CSV, format as readable rows
  if (filename.endsWith('.csv')) {
    const lines = clean.split(/\r?\n/).filter((l) => l.trim().length > 0);
    const header = lines[0];
    const formatted = lines.slice(0, 100).join('\n');
    return {
      title,
      text: `CSV Document: ${title}\nColumns: ${header}\n\nData Rows:\n${formatted}`,
      metadata: { rowCount: lines.length, isCsv: true },
    };
  }

  // Markdown or plain text
  const firstHeading = clean.match(/^#\s+(.+)$/m);
  const docTitle = firstHeading ? firstHeading[1].trim() : title;

  return {
    title: docTitle,
    text: clean,
    metadata: { filename },
  };
}

