const SAFE_MARKDOWN_HTML_TAGS = new Set([
  'a', 'abbr', 'article', 'aside', 'b', 'blockquote', 'br', 'caption', 'cite', 'code',
  'col', 'colgroup', 'dd', 'del', 'details', 'div', 'dl', 'dt', 'em', 'figcaption',
  'figure', 'footer', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'header', 'hr', 'i', 'ins',
  'kbd', 'li', 'main', 'mark', 'nav', 'ol', 'p', 'pre', 'q', 's', 'samp', 'section',
  'small', 'span', 'strong', 'sub', 'summary', 'sup', 'table', 'tbody', 'td', 'tfoot',
  'th', 'thead', 'time', 'tr', 'u', 'ul', 'var',
]);

function isSafeHtmlTagAt(line: string, index: number) {
  const match = /^<\/?([A-Za-z][A-Za-z0-9-]*)(?:\s[^<>]*)?\s*\/?>/.exec(line.slice(index));
  return Boolean(match && SAFE_MARKDOWN_HTML_TAGS.has(match[1].toLowerCase()));
}

function escapeMdxInText(line: string) {
  let escaped = '';
  let inlineCodeLength = 0;

  for (let index = 0; index < line.length;) {
    if (line[index] === '`') {
      let end = index + 1;
      while (line[end] === '`') end += 1;
      const length = end - index;
      if (inlineCodeLength === 0) inlineCodeLength = length;
      else if (inlineCodeLength === length) inlineCodeLength = 0;
      escaped += line.slice(index, end);
      index = end;
      continue;
    }

    if (inlineCodeLength > 0) {
      escaped += line[index];
      index += 1;
      continue;
    }

    if (line[index] === '<') {
      const autolink = /^<(?:https?:\/\/|mailto:)[^\s<>]+>|^<[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}>/i.exec(line.slice(index));
      if (isSafeHtmlTagAt(line, index) || autolink) {
        const token = autolink?.[0] ?? /^<\/?[A-Za-z][A-Za-z0-9-]*(?:\s[^<>]*)?\s*\/?>/.exec(line.slice(index))?.[0];
        if (token) {
          escaped += token;
          index += token.length;
          continue;
        }
      }
      escaped += '&lt;';
      index += 1;
      continue;
    }

    if (line[index] === '{') escaped += '&#123;';
    else if (line[index] === '}') escaped += '&#125;';
    else escaped += line[index];
    index += 1;
  }
  return escaped;
}

/** Keep ordinary Markdown safe for MDX by escaping raw comparison operators,
 * placeholders, and braces while preserving code, URL autolinks, and common
 * semantic HTML tags intentionally used by the checked-in lesson material. */
export function escapeMdxTextSyntax(markdown: string) {
  let fence: { marker: '`' | '~'; length: number } | null = null;

  return markdown.split('\n').map((line) => {
    const fenceMarker = /^ {0,3}(`{3,}|~{3,})/.exec(line)?.[1];
    if (fenceMarker) {
      const marker = fenceMarker[0] as '`' | '~';
      if (!fence) fence = { marker, length: fenceMarker.length };
      else if (marker === fence.marker && fenceMarker.length >= fence.length) fence = null;
      return line;
    }
    return fence ? line : escapeMdxInText(line);
  }).join('\n');
}
