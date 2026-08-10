'use client';

// Clean static display of the professional sector cartoon artwork.
// (User preference: no animation — just the beautiful illustration, shown
// cleanly with a subtle hover zoom.)

import { useState } from 'react';

export default function SectorVideo({ slug, className = '', priority = false }: { slug: string; className?: string; priority?: boolean }) {
  const [err, setErr] = useState(false);
  const src = err ? `/3d-${slug}.png` : `/cartoon-${slug}.png`;
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={`${slug} sector illustration`} loading={priority ? 'eager' : 'lazy'} onError={() => setErr(true)} className={`h-full w-full object-cover ${className}`} />;
}
