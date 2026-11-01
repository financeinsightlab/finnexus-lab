// lib/knowledge/citation-validator.ts — Citation Grounding and Hallucination Filter

import type { GroundedCitation } from './types';

export interface ValidatedAnswerResult {
  cleanAnswer: string;
  citations: GroundedCitation[];
  hasHallucinatedCitations: boolean;
}

/**
 * Validates citation indices in the answer against the available context passages.
 * Strips invalid markers and builds verified citation objects.
 */
export function validateCitations(
  rawAnswer: string,
  passages: Array<{ index: number; title: string; url: string; snippet: string; sourceType?: string }>
): ValidatedAnswerResult {
  if (!rawAnswer) {
    return { cleanAnswer: '', citations: [], hasHallucinatedCitations: false };
  }

  const passageMap = new Map<number, { index: number; title: string; url: string; snippet: string; sourceType?: string }>();
  for (const p of passages) {
    passageMap.set(p.index, p);
  }

  const referencedIndices = new Set<number>();
  let hasHallucinated = false;

  // Find all [1], [2], [1, 2], [1][2]
  const markerRegex = /\[(\d+(?:\s*,\s*\d+)*)\]/g;
  let match: RegExpExecArray | null;

  while ((match = markerRegex.exec(rawAnswer)) !== null) {
    const numbers = match[1].split(',').map((s) => parseInt(s.trim(), 10)).filter((n) => !isNaN(n));
    for (const num of numbers) {
      if (passageMap.has(num)) {
        referencedIndices.add(num);
      } else {
        hasHallucinated = true;
      }
    }
  }

  // Clean answer text by replacing hallucinated references
  const cleanedText = rawAnswer.replace(markerRegex, (fullMatch, group1) => {
    const validNums = group1
      .split(',')
      .map((s: string) => parseInt(s.trim(), 10))
      .filter((n: number) => passageMap.has(n));

    if (validNums.length === 0) return '';
    return `[${validNums.join(', ')}]`;
  });

  // Build sorted list of grounded citations
  const citations: GroundedCitation[] = [];
  const sortedIndices = Array.from(referencedIndices).sort((a, b) => a - b);

  for (const idx of sortedIndices) {
    const p = passageMap.get(idx);
    if (p) {
      citations.push({
        index: idx,
        title: p.title,
        url: p.url,
        snippet: p.snippet.slice(0, 240),
        sourceType: (p.sourceType as GroundedCitation['sourceType']) || 'WEBSITE',
        score: 1.0,
      });
    }
  }

  return {
    cleanAnswer: cleanedText.replace(/\s{2,}/g, ' ').trim(),
    citations,
    hasHallucinatedCitations: hasHallucinated,
  };
}

