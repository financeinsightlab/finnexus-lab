// FILE: components/podcast/PodcastCover.tsx
// Deterministic CSS-gradient cover art — no image assets needed, loads instantly.
import { Mic, Users, BarChart3, FileText, Headphones } from 'lucide-react';
import type { PodcastEpisode } from '@/types';

// Cinematic gradient pairs (dark → accent) rotated by slug hash
const GRADIENTS = [
  ['from-[#06B6D4]', 'via-[#0D1B2A]', 'to-[#050507]'],
  ['from-[#7C3AED]', 'via-[#0D1B2A]', 'to-[#050507]'],
  ['from-[#10B981]', 'via-[#0D1B2A]', 'to-[#050507]'],
  ['from-[#F59E0B]', 'via-[#0D1B2A]', 'to-[#050507]'],
  ['from-[#3B82F6]', 'via-[#0D1B2A]', 'to-[#050507]'],
  ['from-[#EC4899]', 'via-[#0D1B2A]', 'to-[#050507]'],
] as const;

function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return Math.abs(h);
}

export function formatIcon(format: PodcastEpisode['format']) {
  switch (format) {
    case 'Solo Analysis':
      return Mic;
    case 'Expert Interview':
      return Users;
    case 'Quarterly Tracker':
      return BarChart3;
    case 'Research Summary':
      return FileText;
    default:
      return Headphones;
  }
}

interface PodcastCoverProps {
  episode: PodcastEpisode;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const SIZE_CLASSES = {
  sm: 'w-16 h-16 rounded-xl',
  md: 'w-24 h-24 rounded-2xl',
  lg: 'w-40 h-40 rounded-2xl',
  xl: 'w-56 h-56 md:w-64 md:h-64 rounded-3xl',
} as const;

const NUM_CLASSES = {
  sm: 'text-xl',
  md: 'text-3xl',
  lg: 'text-5xl',
  xl: 'text-7xl',
} as const;

export default function PodcastCover({ episode, size = 'md', className = '' }: PodcastCoverProps) {
  const [from, via, to] = GRADIENTS[hashString(episode.slug) % GRADIENTS.length];
  const Icon = formatIcon(episode.format);

  return (
    <div
      className={`relative overflow-hidden bg-gradient-to-br ${from} ${via} ${to} ${SIZE_CLASSES[size]} flex-shrink-0 ${className}`}
      aria-hidden
    >
      {/* Glow orb */}
      <div className="absolute -top-6 -right-6 w-1/2 h-1/2 rounded-full bg-white/10 blur-xl" />
      {/* Grid texture */}
      <div className="absolute inset-0 opacity-[0.12] bg-grid" />
      {/* Episode number */}
      <div className={`absolute font-mono font-black text-white/25 ${NUM_CLASSES[size]} right-2 bottom-1 leading-none tracking-tighter`}>
        {String(episode.episodeNumber).padStart(2, '0')}
      </div>
      {/* Format icon */}
      <div className="absolute inset-0 flex items-center justify-center">
        <Icon className={`text-white/80 ${size === 'sm' ? 'w-6 h-6' : size === 'md' ? 'w-9 h-9' : size === 'lg' ? 'w-14 h-14' : 'w-20 h-20'}`} strokeWidth={1.5} />
      </div>
      {/* Bottom accent line */}
      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-gradient-to-r from-white/60 to-transparent" />
    </div>
  );
}
