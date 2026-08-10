import { createElement } from 'react';

function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/&/g, 'and')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');
}

function makeHeading(level: number) {
  return function Heading({ children, ...props }: any) {
    const text = typeof children === 'string' ? children : '';
    const id = props.id ?? (text ? slugify(text) : undefined);
    return createElement(`h${level}`, { id, className: 'scroll-mt-24', ...props }, children);
  };
}

// Custom MDX components: give headings stable anchor ids for the TOC + smooth scroll
export const mdxComponents = {
  h2: makeHeading(2),
  h3: makeHeading(3),
  h4: makeHeading(4),
};
