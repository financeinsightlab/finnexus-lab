import type { ComponentProps } from 'react';

/** Keep long MDX data tables inside the article width while exposing a
 * keyboard-focusable horizontal scroll region on narrow viewports. */
export default function ScrollableMdxTable({ className, style, ...props }: ComponentProps<'table'>) {
  return (
    <div
      className="horizontal-scroll-region my-6 max-w-full"
      role="region"
      aria-label="Scrollable data table; use horizontal scrolling to view all columns"
      tabIndex={0}
      data-lenis-prevent
    >
      <table
        {...props}
        className={className}
        style={{ ...style, width: 'max-content', minWidth: '100%' }}
      />
    </div>
  );
}
