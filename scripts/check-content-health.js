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
const MAX_LOCAL_IMAGE_BYTES = 2 * 1024 * 1024;

const normalizeRules = JSON.parse(fs.readFileSync(rulesPath, 'utf8')).normalize;

function normalizeTag(tag) {
  const cleaned = String(tag || '').trim();
  const key = cleaned.toLowerCase();
  return normalizeRules[key] || cleaned;
}

function isBlank(value) {
  return value === undefined || value === null || String(value).trim().length === 0;
}

function isBadPlaceholder(value) {
  if (isBlank(value)) return true;
  return ['undefined', 'null', 'untitled', '未命名作品'].includes(String(value).trim().toLowerCase());
}

function parseDate(value) {
  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
}

function isRemoteAsset(src) {
  return /^https?:\/\//i.test(src) || src.startsWith('data:');
}

function localAssetPath(src) {
  const cleanPath = String(src).split('?')[0].split('#')[0];
  if (!cleanPath.startsWith('/')) return null;
  return path.join(root, 'public', cleanPath.replace(/^\/+/, ''));
}

function slugFromFile(file) {
  return file.replace(/\.mdx?$/i, '').toLowerCase();
}

function pushIssue(collection, file, message) {
  collection.push({ file, message });
}

function main() {
  const files = fs.readdirSync(postsDir).filter((f) => /\.mdx?$/.test(f));
  const issues = {
    invalidTitle: [],
    missingDescription: [],
    missingTags: [],
    invalidDates: [],
    futureDates: [],
    duplicateSlugs: [],
    missingPhotographyGallery: [],
    missingPhotographyTag: [],
    missingLocalImages: [],
    oversizedLocalImages: [],
    draftWarnings: [],
    tagSuggestions: [],
  };

  const seenSlugs = new Map();

  for (const file of files) {
    const fullPath = path.join(postsDir, file);
    const raw = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(raw);
    const isDraft = data.draft === true;
    const type = data.type === 'photography' ? 'photography' : 'article';
    const slug = slugFromFile(file);

    if (seenSlugs.has(slug)) {
      pushIssue(issues.duplicateSlugs, file, `duplicates ${seenSlugs.get(slug)}`);
    } else {
      seenSlugs.set(slug, file);
    }

    const date = parseDate(data.date);
    if (!date) {
      pushIssue(issues.invalidDates, file, 'date is missing or invalid');
    } else if (!isDraft && date.getTime() > Date.now() + 24 * 60 * 60 * 1000) {
      pushIssue(issues.futureDates, file, `date is in the future: ${date.toISOString()}`);
    }

    if (!Array.isArray(data.tags) || data.tags.length === 0) {
      if (isDraft) pushIssue(issues.draftWarnings, file, 'draft has no tags yet');
      else pushIssue(issues.missingTags, file, 'non-draft content must have tags');
    }

    if (!isDraft && isBlank(data.description)) {
      pushIssue(issues.missingDescription, file, 'non-draft content must have description');
    }

    if (type === 'article') {
      if (!isDraft && isBadPlaceholder(data.title)) {
        pushIssue(issues.invalidTitle, file, 'published article must have a meaningful title');
      }
    }

    if (type === 'photography') {
      if (!isDraft && Array.isArray(data.tags) && !data.tags.includes('摄影')) {
        pushIssue(issues.missingPhotographyTag, file, 'photography content must include 摄影 tag');
      }

      const gallery = Array.isArray(data.gallery) ? data.gallery : [];
      const firstImage = gallery[0]?.src;
      if (!isDraft && isBlank(firstImage)) {
        pushIssue(issues.missingPhotographyGallery, file, 'published photography content must have gallery[0].src');
      }

      for (const item of gallery) {
        const src = String(item?.src || '').trim();
        if (!src || isRemoteAsset(src)) continue;
        const localPath = localAssetPath(src);
        if (!localPath) continue;
        if (!fs.existsSync(localPath)) {
          pushIssue(issues.missingLocalImages, file, `local image does not exist: ${src}`);
          continue;
        }
        const size = fs.statSync(localPath).size;
        if (size > MAX_LOCAL_IMAGE_BYTES) {
          pushIssue(issues.oversizedLocalImages, file, `local image is ${(size / 1024 / 1024).toFixed(1)}MB: ${src}`);
        }
      }
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

  const errorGroups = [
    ['Invalid titles', issues.invalidTitle],
    ['Missing description', issues.missingDescription],
    ['Missing tags', issues.missingTags],
    ['Invalid dates', issues.invalidDates],
    ['Future dates', issues.futureDates],
    ['Duplicate slugs', issues.duplicateSlugs],
    ['Missing photography gallery', issues.missingPhotographyGallery],
    ['Missing photography tag', issues.missingPhotographyTag],
    ['Missing local images', issues.missingLocalImages],
  ];

  const warningGroups = [
    ['Oversized local images', issues.oversizedLocalImages],
    ['Draft warnings', issues.draftWarnings],
  ];

  const errorCount = errorGroups.reduce((sum, [, items]) => sum + items.length, 0);
  const warningCount = warningGroups.reduce((sum, [, items]) => sum + items.length, 0) + issues.tagSuggestions.length;

  const reportLines = [
    '# Content Health Report',
    '',
    `Date: ${new Date().toISOString().slice(0, 10)}`,
    `Scanned Posts: ${files.length}`,
    '',
    '## Summary',
    '',
    `- Errors: ${errorCount}`,
    `- Warnings: ${warningCount}`,
    `- Invalid titles: ${issues.invalidTitle.length}`,
    `- Missing description: ${issues.missingDescription.length}`,
    `- Missing tags: ${issues.missingTags.length}`,
    `- Invalid dates: ${issues.invalidDates.length}`,
    `- Future dates: ${issues.futureDates.length}`,
    `- Duplicate slugs: ${issues.duplicateSlugs.length}`,
    `- Missing photography gallery: ${issues.missingPhotographyGallery.length}`,
    `- Missing photography tag: ${issues.missingPhotographyTag.length}`,
    `- Missing local images: ${issues.missingLocalImages.length}`,
    `- Oversized local images: ${issues.oversizedLocalImages.length}`,
    `- Draft warnings: ${issues.draftWarnings.length}`,
    `- Tag normalization suggestions: ${issues.tagSuggestions.length}`,
    '',
  ];

  for (const [heading, items] of [...errorGroups, ...warningGroups]) {
    if (items.length === 0) continue;
    reportLines.push(`## ${heading}`, '');
    for (const item of items) reportLines.push(`- ${item.file}: ${item.message}`);
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

  if (errorCount > 0) {
    process.exit(1);
  }
}

main();
