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

import { paper6 } from './papers/paper6.mjs';
import { paper7 } from './papers/paper7.mjs';
import { paper8 } from './papers/paper8.mjs';
import { paper9 } from './papers/paper9.mjs';
import { paper10 } from './papers/paper10.mjs';

save('fintech-lending-credit-underwriting-india.mdx', paper6);
save('private-credit-direct-lending-india.mdx', paper7);
save('electric-mobility-battery-chemistry-economics.mdx', paper8);
save('defence-aerospace-indigenisation-india.mdx', paper9);
save('data-centers-ai-infrastructure-india.mdx', paper10);
