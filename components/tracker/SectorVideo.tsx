'use client';

// Animated cartoon sector video player — plays the looping wide MP4 for a sector.

import { useRef, useState } from 'react';

export default function SectorVideo({ slug, className = '', priority = false }: { slug: string; className?: string; priority?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  if (failed) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={`/cartoon-${slug}.png`} alt={`${slug} sector`} className={`h-full w-full object-cover ${className}`} />;
  }

  return (
    <video
      ref={videoRef}
      className={`h-full w-full object-cover ${className}`}
      src={`/videos/${slug}.mp4`}
      poster={`/cartoon-${slug}.png`}
      autoPlay loop muted playsInline
      preload={priority ? 'auto' : 'metadata'}
      onError={() => setFailed(true)}
      aria-label={`Animated ${slug} sector video`}
    />
  );
}
