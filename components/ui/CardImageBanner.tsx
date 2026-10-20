'use client';

import Image from 'next/image';
import { useState } from 'react';
import { FALLBACK_VISUAL } from '@/lib/tool-images';

interface CardImageBannerProps {
  src: string;
  alt: string;
  icon?: string;
  gradientFrom?: string;
  gradientTo?: string;
  badge?: string;
  blendMode?: string;
  priority?: boolean;
}

export default function CardImageBanner({
  src,
  alt,
  icon,
  gradientFrom = 'from-slate-900',
  gradientTo = 'to-slate-800',
  badge,
  blendMode = '',
  priority = false
}: CardImageBannerProps) {
  const [imageSrc, setImageSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError && imageSrc !== FALLBACK_VISUAL.src) {
      if (process.env.NODE_ENV === 'development') {
        console.warn(`[CardImageBanner] Visual failed for "${alt}" (${src}), falling back to default branded visual.`);
      }
      setHasError(true);
      setImageSrc(FALLBACK_VISUAL.src);
    }
  };

  return (
    <div className={`relative h-full w-full overflow-hidden bg-gradient-to-br ${gradientFrom} ${gradientTo} flex items-center justify-center select-none`}>
      <Image 
        src={imageSrc} 
        alt={alt || 'Kunwar Analytics financial tool visual'}
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
        className={`object-cover object-center transition-all duration-500 group-hover:scale-105 group-hover:brightness-105 ${blendMode}`}
        onError={handleError}
        unoptimized
      />

      {/* Subtle modern vignette overlay to give depth and ensure typography readability */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-transparent pointer-events-none" />

      {/* Optional Category / Tool Badge */}
      {badge && (
        <div className="absolute top-3 left-3 z-10">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[11px] font-semibold tracking-wide bg-black/60 backdrop-blur-md text-white border border-white/10 shadow-sm">
            {icon && <span className="text-xs" aria-hidden="true">{icon}</span>}
            {badge}
          </span>
        </div>
      )}
    </div>
  );
}
