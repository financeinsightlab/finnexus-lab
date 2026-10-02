import React from 'react'

/**
 * Global content layout primitives.
 *
 * Every content surface (research, insights, case studies, courses, lessons,
 * study material, PGDM, placement prep, finance terms, data lab, tool docs,
 * podcasts, CMS pages) composes these instead of hand-rolling max-widths, so
 * presentation stays centralised and future CMS content inherits it
 * automatically.
 *
 *   <ContentPage>
 *     <ContentLayout aside={<Sidebar />}>
 *       <article className="cms-content prose-content">…</article>
 *     </ContentLayout>
 *   </ContentPage>
 *
 * Sizing tokens live in app/globals.css (`--content-page-max`,
 * `--content-sidebar`, `--prose-measure`) and adapt from 320px to 4K.
 */

export type ContentPageWidth = 'default' | 'wide' | 'narrow' | 'reading' | 'full'

const PAGE_WIDTH_CLASS: Record<ContentPageWidth, string> = {
  default: '',
  wide: 'content-page--full',
  narrow: 'content-page--narrow',
  reading: 'content-page--reading',
  full: 'content-page--full',
}

export interface ContentPageProps extends React.HTMLAttributes<HTMLElement> {
  /** `narrow`/`reading` cap the container; `wide` removes the cap. */
  width?: ContentPageWidth
  as?: 'div' | 'section' | 'main' | 'article' | 'header' | 'footer' | 'aside' | 'nav'
  /** Drop the horizontal gutters (for full-bleed media rows). */
  flush?: boolean
}

export function ContentPage({
  width = 'default',
  as = 'div',
  flush = false,
  className = '',
  children,
  ...rest
}: ContentPageProps) {
  const classes = ['content-page', PAGE_WIDTH_CLASS[width], flush ? 'content-page--flush' : '', className]
    .filter(Boolean)
    .join(' ')
  const Tag = as as React.ElementType<React.HTMLAttributes<HTMLElement>>
  return (
    <Tag className={classes} {...rest}>
      {children}
    </Tag>
  )
}

export interface ContentLayoutProps extends React.HTMLAttributes<HTMLElement> {
  /** Sidebar content. Omit for a single-column content column. */
  aside?: React.ReactNode
  /** Which side the sidebar sits on at ≥1024px. Defaults to the right. */
  asidePosition?: 'right' | 'left'
  /** Keep the sidebar in view while the article scrolls (desktop only). */
  asideSticky?: boolean
  asideClassName?: string
  mainClassName?: string
}

export function ContentLayout({
  aside,
  asidePosition = 'right',
  asideSticky = false,
  className = '',
  mainClassName = '',
  asideClassName = '',
  children,
  ...rest
}: ContentLayoutProps) {
  const hasAside = Boolean(aside)
  const classes = [
    'content-layout',
    hasAside ? `content-layout--aside-${asidePosition}` : '',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <div className={classes} {...rest}>
      <div className={`content-main ${mainClassName}`.trim()}>{children}</div>
      {hasAside ? (
        <aside
          className={['content-aside', asideSticky ? 'content-aside--sticky' : '', asideClassName]
            .filter(Boolean)
            .join(' ')}
        >
          {aside}
        </aside>
      ) : null}
    </div>
  )
}

export interface ContentMainProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'div' | 'article' | 'section'
}

export function ContentMain({ as = 'div', className = '', children, ...rest }: ContentMainProps) {
  const Tag = as as React.ElementType<React.HTMLAttributes<HTMLElement>>
  return (
    <Tag className={`content-main ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  )
}

export interface ContentAsideProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'aside' | 'div' | 'nav'
  sticky?: boolean
}

export function ContentAside({ as = 'aside', sticky = false, className = '', children, ...rest }: ContentAsideProps) {
  const Tag = as as React.ElementType<React.HTMLAttributes<HTMLElement>>
  return (
    <Tag className={['content-aside', sticky ? 'content-aside--sticky' : '', className].filter(Boolean).join(' ')} {...rest}>
      {children}
    </Tag>
  )
}

/**
 * Reading column. Children keep a comfortable measure; elements that need more
 * room (tables, figures, charts, code, embeds — or anything with
 * `className="content-wide"`) automatically span the full article width.
 */
export interface ProseProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'div' | 'article' | 'section'
}

export function Prose({ as = 'div', className = '', children, ...rest }: ProseProps) {
  const Tag = as as React.ElementType<React.HTMLAttributes<HTMLElement>>
  return (
    <Tag className={`cms-content prose-content ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  )
}

/** Explicit full-article-width block inside a Prose column. */
export function ContentWide({ className = '', children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`content-wide cms-wide ${className}`.trim()} {...rest}>
      {children}
    </div>
  )
}

/** Edge-to-edge block (breaks out of the page container entirely). */
export function ContentFullBleed({ className = '', children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`content-full-bleed ${className}`.trim()} {...rest}>
      {children}
    </div>
  )
}

/** Horizontal scroll container for wide tables in MDX/CMS content. */
export function TableScroll({ className = '', children, ...rest }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`cms-table-scroll content-wide ${className}`.trim()} {...rest}>
      {children}
    </div>
  )
}

export default ContentPage
