import Image, { ImageProps } from 'next/image';

const BLUR_DATA_URL =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==';

interface OptimizedImageProps extends Omit<ImageProps, 'placeholder' | 'blurDataURL'> {
  /** Pass true for images above the fold (hero sections, LCP candidates). Defaults to false. */
  priority?: boolean;
}

/**
 * Thin wrapper around next/image that provides sensible performance defaults:
 *  - Responsive `sizes` attribute for automatic srcset selection
 *  - `loading="lazy"` for below-fold images (overridden by `priority`)
 *  - `placeholder="blur"` with a 1×1 pixel data-URL fallback
 */
export default function OptimizedImage({
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  ...props
}: OptimizedImageProps) {
  return (
    <Image
      sizes={sizes}
      loading={priority ? 'eager' : 'lazy'}
      priority={priority}
      placeholder="blur"
      blurDataURL={BLUR_DATA_URL}
      {...props}
    />
  );
}
