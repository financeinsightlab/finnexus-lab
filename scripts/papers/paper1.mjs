import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const filePath = path.join(__dirname, '..', '..', 'content', 'research', 'india-quick-commerce-2026.mdx');

export const paper1 = fs.readFileSync(filePath, 'utf8');
