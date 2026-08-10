'use client';

import Image from 'next/image';
import { useState } from 'react';

// Specific AI images generated for sectors
const KNOWN_IMAGES = [
  '/card-quick-commerce.png',
  '/card-fintech.png',
  '/card-ev.png',
  '/card-food-delivery.png'
];

// Fallback images from the study page (premium 3D aesthetic)
const FALLBACK_IMAGES = [
  '/course-analyst-complete.png',
  '/course-placement-prep.png',
  '/course-skill-academy.png'
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

  return (
    <div className={`relative h-full w-full overflow-hidden bg-gradient-to-br ${gradientFrom} ${gradientTo} flex items-center justify-center`}>
      {!error && (
        <Image 
          src={src} 
          alt={alt}
          fill
          className={`object-cover transition-transform duration-700 group-hover:scale-105 opacity-90 ${blendMode}`}
          onError={() => setError(true)}
          unoptimized // Disable Next.js image optimization API to prevent server errors on missing files
        />
      )}
      <div className={`absolute inset-0 bg-gradient-to-t from-black/${overlayOpacity.split('-')[1] || '50'} to-transparent pointer-events-none`} />
      
      {/* Only show icon watermark if image actually failed to load */}
      {error && <div className="absolute text-5xl opacity-20 z-0">{icon}</div>}
    </div>
  );
}
