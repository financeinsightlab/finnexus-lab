import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const researchDir = path.join(__dirname, '..', 'content', 'research');

function save(filename, content) {
  const filePath = path.join(researchDir, filename);
  fs.writeFileSync(filePath, content.trim(), 'utf8');
  const count = content.trim().split(/\s+/).length;
  console.log(`[Generated] ${filename}: ${count} words`);
}

// Paper 1: Quick Commerce
import { paper1 } from './papers/paper1.mjs';
import { paper2 } from './papers/paper2.mjs';
import { paper3 } from './papers/paper3.mjs';
import { paper4 } from './papers/paper4.mjs';
import { paper5 } from './papers/paper5.mjs';

save('india-quick-commerce-2026.mdx', paper1);
save('generative-ai-financial-services-2026.mdx', paper2);
save('india-semiconductor-manufacturing-ecosystem-2026.mdx', paper3);
save('renewable-energy-green-hydrogen-india-2026.mdx', paper4);
save('global-macro-rate-cycles-liquidity-2026.mdx', paper5);
