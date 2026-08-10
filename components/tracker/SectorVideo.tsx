'use client';

// Animated cartoon sector video player — plays the looping wide MP4 for a sector.
// Uses JS-driven play() on mount for reliable autoplay inside preview iframes
// (the muted `autoplay` attribute can be ignored in embedded contexts).

import { useEffect, useRef, useState } from 'react';

export default function SectorVideo({ slug, className = '', priority = false }: { slug: string; className?: string; priority?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [failed, setFailed] = useState(false);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    // Force play — more reliable than the autoplay attribute in iframes.
    const tryPlay = () => {
      const p = v.play();
      if (p !== undefined) p.then(() => setStarted(true)).catch(() => setStarted(false));
    };
    tryPlay();
    // Retry in case the video isn't ready yet.
    const t = setTimeout(tryPlay, 600);
    return () => clearTimeout(t);
  }, []);

  if (failed) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img src={`/cartoon-${slug}.png`} alt={`${slug} sector`} className={`h-full w-full object-cover ${className}`} />;
  }

  return (
    <div className={`relative h-full w-full ${className}`}>
      <video
        ref={videoRef}
        className="h-full w-full object-cover"
        src={`/videos/${slug}.mp4`}
        poster={`/cartoon-${slug}.png`}
        autoPlay loop muted playsInline disablePictureInPicture
        preload={priority ? 'auto' : 'auto'}
        onError={() => setFailed(true)}
        aria-label={`Animated ${slug} sector video`}
      />
      {/* subtle "LIVE/play" affordance so users know it's animated video */}
      {!started && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/20">
          <span className="flex items-center gap-1.5 rounded-full bg-white/20 backdrop-blur px-3 py-1.5 text-[10px] font-bold uppercase tracking-widest text-white">
            <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse" /> Video
          </span>
        </div>
      )}
    </div>
  );
}
