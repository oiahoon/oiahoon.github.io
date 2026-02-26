import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const postsDir = path.join(root, 'src/content/posts');
const rulesPath = path.join(__dirname, 'tag-governance.json');

const args = new Set(process.argv.slice(2));
const SHOULD_WRITE = args.has('--write');

const normalizeRules = JSON.parse(fs.readFileSync(rulesPath, 'utf8')).normalize;

function normalizeTag(tag) {
  const cleaned = String(tag || '').trim();
  const key = cleaned.toLowerCase();
  return normalizeRules[key] || cleaned;
}

function main() {
  const files = fs.readdirSync(postsDir).filter((f) => f.endsWith('.md'));
  const issues = {
    missingDescription: [],
    missingTags: [],
    invalidDates: [],
    tagSuggestions: [],
  };

  for (const file of files) {
    const fullPath = path.join(postsDir, file);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(raw);

    if (!data.description || String(data.description).trim().length === 0) {
      issues.missingDescription.push(file);
    }

    if (!Array.isArray(data.tags) || data.tags.length === 0) {
      issues.missingTags.push(file);
    }

    const date = new Date(data.date);
    if (Number.isNaN(date.getTime())) {
      issues.invalidDates.push(file);
    }

    if (Array.isArray(data.tags)) {
      for (const tag of data.tags) {
        const normalized = normalizeTag(tag);
        if (normalized !== tag) {
          issues.tagSuggestions.push({ file, from: tag, to: normalized });
        }
      }
    }
  }

  const reportLines = [
    '# Content Health Report',
    '',
    `Date: ${new Date().toISOString().slice(0, 10)}`,
    `Scanned Posts: ${files.length}`,
    '',
    '## Summary',
    '',
    `- Missing description: ${issues.missingDescription.length}`,
    `- Missing tags: ${issues.missingTags.length}`,
    `- Invalid dates: ${issues.invalidDates.length}`,
    `- Tag normalization suggestions: ${issues.tagSuggestions.length}`,
    '',
  ];

  if (issues.missingDescription.length > 0) {
    reportLines.push('## Missing Description', '');
    for (const item of issues.missingDescription) reportLines.push(`- ${item}`);
    reportLines.push('');
  }

  if (issues.missingTags.length > 0) {
    reportLines.push('## Missing Tags', '');
    for (const item of issues.missingTags) reportLines.push(`- ${item}`);
    reportLines.push('');
  }

  if (issues.invalidDates.length > 0) {
    reportLines.push('## Invalid Dates', '');
    for (const item of issues.invalidDates) reportLines.push(`- ${item}`);
    reportLines.push('');
  }

  if (issues.tagSuggestions.length > 0) {
    reportLines.push('## Tag Normalization Suggestions', '');
    for (const item of issues.tagSuggestions) {
      reportLines.push(`- ${item.file}: \`${item.from}\` -> \`${item.to}\``);
    }
    reportLines.push('');
  }

  const report = reportLines.join('\n');
  console.log(report);

  if (SHOULD_WRITE) {
    const target = path.join(root, 'docs/content-health-report.md');
    fs.writeFileSync(target, `${report}\n`, 'utf8');
    console.log(`Report written: ${target}`);
  }

  if (issues.invalidDates.length > 0) {
    process.exit(1);
  }
}

main();
