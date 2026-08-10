// FILE: components/podcast/AudioPlayer.tsx
'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { Play, Pause, Download, Gauge, Headphones } from 'lucide-react';

interface AudioPlayerProps {
  src: string;
  title: string;
  episodeNumber: number;
  compact?: boolean;
}

function formatTime(seconds: number): string {
  if (!Number.isFinite(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function AudioPlayer({ src, title, episodeNumber, compact = false }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [rate, setRate] = useState(1);
  const [ready, setReady] = useState(false);

  const toggle = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, []);

  const seek = useCallback((value: number) => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.currentTime = value;
    setCurrent(value);
  }, []);

  const cycleRate = useCallback(() => {
    const rates = [1, 1.25, 1.5, 2];
    const next = rates[(rates.indexOf(rate) + 1) % rates.length];
    setRate(next);
    if (audioRef.current) audioRef.current.playbackRate = next;
  }, [rate]);

  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  const progress = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <div className={`glass-cinema rounded-2xl border border-white/10 ${compact ? 'p-4' : 'p-5 md:p-6'}`}>
      <audio
        ref={audioRef}
        src={src}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onTimeUpdate={(e) => setCurrent(e.currentTarget.currentTime)}
        onLoadedMetadata={(e) => {
          setDuration(e.currentTarget.duration);
          setReady(true);
        }}
        onEnded={() => setPlaying(false)}
      />

      {/* Player top row */}
      <div className="flex items-center gap-4">
        {/* Play / pause */}
        <button
          onClick={toggle}
          aria-label={playing ? 'Pause' : 'Play'}
          className="relative flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full bg-cinema-cyan text-cinema-black flex items-center justify-center shadow-glow-cyan hover:scale-105 active:scale-95 transition-transform cursor-pointer"
        >
          {playing ? (
            <Pause className="w-5 h-5 md:w-6 md:h-6 fill-current" />
          ) : (
            <Play className="w-5 h-5 md:w-6 md:h-6 fill-current ml-0.5" />
          )}
        </button>

        {/* Title + meta */}
        <div className="flex-grow min-w-0">
          <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest font-bold text-cinema-cyan mb-0.5">
            <Headphones className="w-3 h-3" />
            {ready ? (playing ? 'Now playing' : 'Episode preview') : 'Loading preview…'}
          </div>
          <p className="text-sm md:text-base font-semibold text-white truncate">
            EP {String(episodeNumber).padStart(2, '0')} — {title}
          </p>
        </div>

        {/* Speed + download */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={cycleRate}
            aria-label="Playback speed"
            className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white hover:border-cinema-cyan/40 transition-colors cursor-pointer"
          >
            <Gauge className="w-3.5 h-3.5 text-cinema-cyan" />
            {rate}x
          </button>
          <a
            href={src}
            download
            aria-label="Download audio"
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-semibold text-gray-300 hover:text-white hover:border-cinema-cyan/40 transition-colors"
          >
            <Download className="w-3.5 h-3.5 text-cinema-cyan" />
            <span className="hidden sm:inline">MP3</span>
          </a>
        </div>
      </div>

      {/* Progress */}
      <div className="mt-4 flex items-center gap-3">
        <span className="text-[11px] font-mono text-gray-400 w-10 text-right tabular-nums">{formatTime(current)}</span>
        <input
          type="range"
          min={0}
          max={duration || 0}
          step={0.1}
          value={current}
          onChange={(e) => seek(Number(e.target.value))}
          aria-label="Seek"
          className="flex-grow h-1.5 appearance-none rounded-full bg-white/10 accent-cinema-cyan cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3.5 [&::-webkit-slider-thumb]:h-3.5 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cinema-cyan [&::-webkit-slider-thumb]:shadow-glow-cyan"
          style={{ background: `linear-gradient(to right, #06B6D4 ${progress}%, rgba(255,255,255,0.1) ${progress}%)` }}
        />
        <span className="text-[11px] font-mono text-gray-400 w-10 tabular-nums">{formatTime(duration)}</span>
      </div>

      {/* Waveform-style decorative bars */}
      <div className="mt-3 flex items-end gap-[3px] h-6 opacity-60" aria-hidden>
        {Array.from({ length: 48 }).map((_, i) => (
          <span
            key={i}
            className={`flex-1 rounded-t-sm ${playing ? 'bg-cinema-cyan/80' : 'bg-white/20'} ${playing ? 'animate-pulse' : ''}`}
            style={{
              height: `${20 + Math.abs(Math.sin(i * 1.7)) * 80}%`,
              animationDelay: `${i * 40}ms`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
