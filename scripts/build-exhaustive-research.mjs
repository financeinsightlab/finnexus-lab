import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const researchDir = path.join(__dirname, '..', 'content', 'research');

// Helper to write file and verify word count
function writePaper(filename, content) {
  const filePath = path.join(researchDir, filename);
  fs.writeFileSync(filePath, content.trim(), 'utf8');
  const wordCount = content.trim().split(/\s+/).length;
  console.log(`✅ Written ${filename}: ${wordCount} words`);
}

export { writePaper, researchDir };
