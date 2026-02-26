import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const postsDir = path.join(root, 'src/content/posts');
const rulesPath = path.join(__dirname, 'tag-governance.json');
const normalizeRules = JSON.parse(fs.readFileSync(rulesPath, 'utf8')).normalize;

function normalizeTag(tag) {
  const cleaned = String(tag || '').trim();
  const key = cleaned.toLowerCase();
  return normalizeRules[key] || cleaned;
}

function buildDescription(data) {
  if (typeof data.description === 'string' && data.description.trim()) return data.description;
  if (data.type === 'photography') {
    const location = data.location ? `，拍摄于${data.location}` : '';
    return `${data.title || '摄影作品'}${location}。`;
  }
  if (data.subtitle) return String(data.subtitle).trim().slice(0, 120);
  return `${data.title || '技术文章'}，记录实践经验与思考。`;
}

function main() {
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));
  let fixedDescriptions = 0;
  let fixedTags = 0;

  for (const file of files) {
    const fullPath = path.join(postsDir, file);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const parsed = matter(raw);
    const data = parsed.data;

    const originalDescription = data.description;
    data.description = buildDescription(data);
    if (originalDescription !== data.description) fixedDescriptions += 1;

    if (Array.isArray(data.tags)) {
      const oldTags = JSON.stringify(data.tags);
      data.tags = data.tags.map(normalizeTag);
      if (JSON.stringify(data.tags) !== oldTags) fixedTags += 1;
    }

    const next = matter.stringify(parsed.content, data, { lineWidth: 0 });
    fs.writeFileSync(fullPath, next, 'utf8');
  }

  console.log(`Updated descriptions: ${fixedDescriptions}`);
  console.log(`Normalized tag sets: ${fixedTags}`);
}

main();
