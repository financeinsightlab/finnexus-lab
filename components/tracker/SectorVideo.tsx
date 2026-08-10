'use client';

// Premium animated cartoon video player — plays the looping MP4 (pan/zoom +
// floating particles) with the cartoon illustration as poster + fallback.

import { useEffect, useRef, useState } from 'react';

export default function SectorVideo({ slug, className = '', priority = false }: { slug: string; className?: string; priority?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const tryPlay = () => { const p = v.play(); if (p !== undefined) p.catch(() => {}); };
    tryPlay();
    const t = setTimeout(tryPlay, 500);
    return () => clearTimeout(t);
  }, []);

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
      autoPlay loop muted playsInline disablePictureInPicture
      preload="auto"
      onError={() => setFailed(true)}
      aria-label={`Animated ${slug} sector video`}
    />
  );
}
