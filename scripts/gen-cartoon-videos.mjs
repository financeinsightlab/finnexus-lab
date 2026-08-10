// Generates animated cartoon video clips (MP4/h264) from the cartoon illustrations.
// Wide format, cinematic motion (Ken Burns zoom/pan), floating glowing particles.
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
const W = 960, H = 540, FPS = 25, DUR = 10;

for (const s of SECTORS) {
  const img = path.join(process.cwd(), 'public', `cartoon-${s.slug}.png`);
  if (!fs.existsSync(img)) { console.log('skip (no image):', s.slug); continue; }
  const out = path.join(outDir, `${s.slug}.mp4`);
  const filter = `
[0:v]scale=${W*2}:${H*2}:force_original_aspect_ratio=increase,crop=${W*2}:${H*2},scale=1600:900,zoompan=z='min(zoom+0.0010,1.28)':x='iw/2-(iw/zoom/2)+14*sin(on/45)':y='ih/2-(ih/zoom/2)+8*cos(on/60)':d=${DUR*FPS}:s=${W}x${H}:fps=${FPS}[bg];
life=s=${W}x${H}:r=${FPS}:mold=16:life_color=${s.color}:death_color=#000000:ratio=0.03[part];
[part]format=yuva420p,colorchannelmixer=aa=0.55,chromakey=color=black:similarity=0.25[part2];
[bg][part2]overlay,eq=brightness=0.0:saturation=1.12,unsharp=5:5:0.4[v]
`;
  try {
    execFileSync(ffmpeg, ['-y', '-loop', '1', '-i', img, '-filter_complex', filter, '-map', '[v]', '-t', String(DUR), '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-movflags', '+faststart', '-crf', '24', out], { stdio: ['ignore', 'ignore', 'ignore'] });
    console.log(`✓ ${s.slug}.mp4  ${(fs.statSync(out).size / 1024).toFixed(0)}KB`);
  } catch (e) {
    console.log(`✗ ${s.slug}:`, e.message?.split('\n')[0]);
  }
}
