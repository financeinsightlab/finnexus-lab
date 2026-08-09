'use client';

import Image from 'next/image';
import { useState } from 'react';

// List of currently generated AI images. 
// If an image is not in this list, we skip the Next.js <Image> component entirely
// to prevent server-side 404 optimization errors and fall back gracefully.
const KNOWN_IMAGES = [
  '/card-quick-commerce.png',
  '/card-fintech.png',
  '/card-ev.png',
  '/card-food-delivery.png'
];

interface CardImageBannerProps {
  src: string;
  alt: string;
  icon: string;
  gradientFrom?: string;
  gradientTo?: string;
  overlayOpacity?: string;
  blendMode?: string;
}

export default function CardImageBanner({
  src,
  alt,
  icon,
  gradientFrom = 'from-[#1a1f2e]',
  gradientTo = 'to-[#2d3748]',
  overlayOpacity = 'opacity-50',
  blendMode = ''
}: CardImageBannerProps) {
  const [error, setError] = useState(false);
  const hasImage = KNOWN_IMAGES.includes(src);

  return (
    <div className={`relative h-full w-full overflow-hidden bg-gradient-to-br ${gradientFrom} ${gradientTo} flex items-center justify-center`}>
      {hasImage && !error && (
        <Image 
          src={src} 
          alt={alt}
          fill
          className={`object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 ${blendMode}`}
          onError={() => setError(true)}
          unoptimized // Disable Next.js image optimization API to prevent server errors on missing files
        />
      )}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/${overlayOpacity.split('-')[1] || '50'} to-transparent pointer-events-none`} />
      <div className="absolute text-5xl opacity-20 z-0">{icon}</div>
    </div>
  );
}
