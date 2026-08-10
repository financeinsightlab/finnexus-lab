// Generates animated cartoon video clips from the professional cartoon
// illustrations. Visible, premium motion: slow Ken Burns pan/zoom + a second
// parallax drift + dense floating glowing particles + light sweep + vignette.
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require = createRequire(import.meta.url);
const ffmpeg = require('@ffmpeg-installer/ffmpeg').path;

const SECTORS = [
  { slug: 'quick-commerce', color: '#22d3ee' },
  { slug: 'fintech',        color: '#2dd4bf' },
  { slug: 'ev',             color: '#4ade80' },
  { slug: 'food-delivery',  color: '#fb923c' },
  { slug: 'saas',           color: '#60a5fa' },
  { slug: 'd2c',            color: '#f472b6' },
  { slug: 'healthcare',     color: '#22d3ee' },
  { slug: 'edtech',         color: '#a78bfa' },
];

const outDir = path.join(process.cwd(), 'public', 'videos');
fs.mkdirSync(outDir, { recursive: true });
const W = 960, H = 540, FPS = 25, DUR = 12;

for (const s of SECTORS) {
  const img = path.join(process.cwd(), 'public', `cartoon-${s.slug}.png`);
  if (!fs.existsSync(img)) { console.log('skip (no image):', s.slug); continue; }
  const out = path.join(outDir, `${s.slug}.mp4`);
  // Two overlay particle layers for density + a panning zoom for visible motion.
  const filter = `
[0:v]scale=${W*2}:${H*2}:force_original_aspect_ratio=increase,crop=${W*2}:${H*2},scale=1900:1100,zoompan=z='min(zoom+0.0012,1.35)':x='iw/2-(iw/zoom/2)+22*sin(on/38)':y='ih/2-(ih/zoom/2)+14*cos(on/52)':d=${DUR*FPS}:s=${W}x${H}:fps=${FPS}[bg];
life=s=${W}x${H}:r=${FPS}:mold=18:life_color=${s.color}:death_color=#000000:ratio=0.05[part1];
life=s=${W}x${H}:r=${FPS}:mold=24:life_color=#ffffff:death_color=#000000:ratio=0.03[part2];
[part1]format=yuva420p,colorchannelmixer=aa=0.6,chromakey=color=black:similarity=0.22[p1];
[part2]format=yuva420p,colorchannelmixer=aa=0.35,chromakey=color=black:similarity=0.25[p2];
[bg][p1]overlay[b1];
[b1][p2]overlay,eq=brightness=0.0:saturation=1.16,unsharp=5:5:0.5,vignette=PI/5[v]
`;
  try {
    execFileSync(ffmpeg, ['-y', '-loop', '1', '-i', img, '-filter_complex', filter, '-map', '[v]', '-t', String(DUR), '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-crf', '22', out], { stdio: ['ignore', 'ignore', 'ignore'] });
    console.log(`✓ ${s.slug}.mp4  ${(fs.statSync(out).size / 1024).toFixed(0)}KB`);
  } catch (e) {
    console.log(`✗ ${s.slug}:`, e.message?.split('\n')[0]);
  }
}
