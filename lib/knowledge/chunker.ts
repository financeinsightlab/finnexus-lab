// lib/knowledge/chunker.ts — Document Chunking for Grounded Knowledge Retrieval

export interface ChunkResult {
  chunkIndex: number;
  title: string;
  content: string;
  approxTokenCount: number;
}

/**
 * Splits document content into semantic chunks respecting Markdown headings and paragraphs.
 */
export function chunkDocument(
  title: string,
  content: string,
  options: { maxChunkLength?: number; overlap?: number } = {}
): ChunkResult[] {
  const maxLen = options.maxChunkLength ?? 800;
  const overlap = options.overlap ?? 100;

  if (!content || !content.trim()) return [];

  // Normalize newlines
  const text = content.replace(/\r\n/g, '\n').trim();

  // Split by headings or double newlines
  const sections = text.split(/(?=\n#{1,4}\s+)/g);
  const chunks: ChunkResult[] = [];
  let chunkIndex = 0;

  for (const section of sections) {
    const trimmedSection = section.trim();
    if (!trimmedSection) continue;

    // Detect section heading
    const headingMatch = trimmedSection.match(/^#{1,4}\s+(.+)$/m);
    const sectionTitle = headingMatch ? `${title} — ${headingMatch[1].trim()}` : title;

    if (trimmedSection.length <= maxLen) {
      chunks.push({
        chunkIndex: chunkIndex++,
        title: sectionTitle,
        content: trimmedSection,
        approxTokenCount: Math.ceil(trimmedSection.length / 4),
      });
    } else {
      // Split section by paragraphs
      const paragraphs = trimmedSection.split(/\n\n+/g);
      let currentBuffer = '';

      for (const p of paragraphs) {
        const pTrimmed = p.trim();
        if (!pTrimmed) continue;

        if ((currentBuffer + '\n\n' + pTrimmed).length <= maxLen) {
          currentBuffer = currentBuffer ? `${currentBuffer}\n\n${pTrimmed}` : pTrimmed;
        } else {
          if (currentBuffer) {
            chunks.push({
              chunkIndex: chunkIndex++,
              title: sectionTitle,
              content: currentBuffer,
              approxTokenCount: Math.ceil(currentBuffer.length / 4),
            });
            // Keep overlap from end of previous buffer
            const overlapPart = currentBuffer.slice(-overlap);
            currentBuffer = `${overlapPart} ${pTrimmed}`;
          } else {
            // Very long single paragraph — slice hard
            for (let i = 0; i < pTrimmed.length; i += maxLen - overlap) {
              const slice = pTrimmed.slice(i, i + maxLen).trim();
              if (slice) {
                chunks.push({
                  chunkIndex: chunkIndex++,
                  title: sectionTitle,
                  content: slice,
                  approxTokenCount: Math.ceil(slice.length / 4),
                });
              }
            }
            currentBuffer = '';
          }
        }
      }

      if (currentBuffer.trim()) {
        chunks.push({
          chunkIndex: chunkIndex++,
          title: sectionTitle,
          content: currentBuffer.trim(),
          approxTokenCount: Math.ceil(currentBuffer.length / 4),
        });
      }
    }
  }

  return chunks;
}

