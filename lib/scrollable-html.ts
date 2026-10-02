const TABLE_SCROLL_WRAPPER =
  '<div class="horizontal-scroll-region my-6 max-w-full" role="region" aria-label="Scrollable data table; use horizontal scrolling to view all columns" tabindex="0" data-lenis-prevent>';

/** Adds a keyboard-focusable horizontal scroll region only when one is not already present. */
export function wrapUncontainedTables(html: string): string {
  if (!/<table\b/i.test(html)) return html;

  const voidElements = new Set([
    'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta',
    'param', 'source', 'track', 'wbr',
  ]);
  const stack: Array<{ name: string; horizontalScrollable: boolean }> = [];
  const tableWrappers: boolean[] = [];
  const insertions: Array<{ index: number; value: string }> = [];
  const tokens = /<!--[\s\S]*?-->|<![^>]*>|<(?:(?:"[^"]*")|(?:'[^']*')|[^'">])*>/g;
  let rawTextElement: string | null = null;
  let token: RegExpExecArray | null;

  while ((token = tokens.exec(html)) !== null) {
    const tag = token[0];
    if (tag.startsWith('<!--') || tag.startsWith('<!')) continue;

    const closing = /^<\s*\//.test(tag);
    const nameMatch = /^<\s*\/?\s*([a-z][\w:-]*)/i.exec(tag);
    if (!nameMatch) continue;
    const name = nameMatch[1].toLowerCase();

    if (rawTextElement && !(closing && name === rawTextElement)) continue;

    if (name === 'table' && !closing) {
      const alreadyHorizontallyScrollable = stack.some((element) => element.horizontalScrollable);
      const needsWrapper = !alreadyHorizontallyScrollable;
      tableWrappers.push(needsWrapper);
      if (needsWrapper) insertions.push({ index: token.index, value: TABLE_SCROLL_WRAPPER });
    } else if (name === 'table' && closing && tableWrappers.pop()) {
      insertions.push({ index: token.index + tag.length, value: '</div>' });
    }

    if (closing) {
      for (let index = stack.length - 1; index >= 0; index -= 1) {
        if (stack[index].name === name) {
          stack.length = index;
          break;
        }
      }
      if (rawTextElement === name) rawTextElement = null;
      continue;
    }

    const selfClosing = /\/\s*>$/.test(tag) || voidElements.has(name);
    if (selfClosing) continue;

    const classAttribute = /\bclass\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i.exec(tag);
    const styleAttribute = /\bstyle\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+))/i.exec(tag);
    const classNames = (classAttribute?.[1] ?? classAttribute?.[2] ?? classAttribute?.[3] ?? '').split(/\s+/);
    const style = styleAttribute?.[1] ?? styleAttribute?.[2] ?? styleAttribute?.[3] ?? '';
    const horizontalScrollable = classNames.some((className) =>
      ['horizontal-scroll-region', 'overflow-x-auto', 'overflow-x-scroll'].includes(className),
    ) || /overflow(?:-x)?\s*:\s*(?:auto|scroll)/i.test(style);

    stack.push({ name, horizontalScrollable });
    if (['script', 'style', 'textarea', 'title'].includes(name)) rawTextElement = name;
  }

  if (insertions.length === 0) return html;
  let result = '';
  let offset = 0;
  for (const insertion of insertions) {
    result += html.slice(offset, insertion.index) + insertion.value;
    offset = insertion.index;
  }
  return result + html.slice(offset);
}
