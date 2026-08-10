import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const researchDir = path.join(__dirname, '..', 'content', 'research');

import { paper4 } from './papers/paper4.mjs';
import { paper5 } from './papers/paper5.mjs';

fs.writeFileSync(path.join(researchDir, 'renewable-energy-green-hydrogen-india-2026.mdx'), paper4.trim(), 'utf8');
fs.writeFileSync(path.join(researchDir, 'global-macro-rate-cycles-liquidity-2026.mdx'), paper5.trim(), 'utf8');

console.log('Saved paper 4 & 5');
