'use client';

// Animated cartoon sector video player — plays the looping wide MP4 for a sector.
// Videos are lazy-loaded and only autoplay when scrolled into view.

import { useRef, useState, useEffect, useCallback } from 'react';

export default function SectorVideo({ slug, className = '', priority = false }: { slug: string; className?: string; priority?: boolean }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [failed, setFailed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  // Only start playing when scrolled into view
  useEffect(() => {
    const el = containerRef.current;
    if (!el || priority) {
      // Priority videos play immediately
      if (priority) setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [priority]);

  // Auto-play when visible
  useEffect(() => {
    if (isVisible && videoRef.current) {
      videoRef.current.play().catch(() => {});
    }
  }, [isVisible]);

  const handleError = useCallback(() => setFailed(true), []);

  if (failed) {
    // eslint-disable-next-line @next/next/no-img-element
    return (
      <div ref={containerRef}>
        <img
          src={`/cartoon-${slug}.png`}
          alt={`${slug} sector`}
          className={`h-full w-full object-cover ${className}`}
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div ref={containerRef}>
      {isVisible ? (
        <video
          ref={videoRef}
          className={`h-full w-full object-cover ${className}`}
          src={`/videos/${slug}.mp4`}
          poster={`/cartoon-${slug}.png`}
          autoPlay loop muted playsInline
          preload={priority ? 'auto' : 'none'}
          onError={handleError}
          aria-label={`Animated ${slug} sector video`}
        />
      ) : (
        // Show poster image until video is needed
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/cartoon-${slug}.png`}
          alt={`${slug} sector`}
          className={`h-full w-full object-cover ${className}`}
          loading="lazy"
        />
      )}
    </div>
  );
}

