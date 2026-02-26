import fs from 'fs';
import path from 'path';
import exifr from 'exifr';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const PHOTOS_DIR = path.join(__dirname, '../public/photos');
const POSTS_DIR = path.join(__dirname, '../src/content/posts');

const args = new Set(process.argv.slice(2));
const DRY_RUN = args.has('--dry-run');
const FORCE = args.has('--force');

const summary = {
  processed: 0,
  created: 0,
  overwritten: 0,
  skipped: 0,
  failed: 0,
};

function logMode() {
  const mode = [DRY_RUN ? 'dry-run' : null, FORCE ? 'force' : null].filter(Boolean).join(', ');
  if (mode) console.log(`Mode: ${mode}`);
}

function ensureDirectories() {
  if (!fs.existsSync(PHOTOS_DIR) && !DRY_RUN) {
    fs.mkdirSync(PHOTOS_DIR, { recursive: true });
  }
}

function getExistingPhotoRefs() {
  const refs = new Set();
  const files = fs.readdirSync(POSTS_DIR).filter((file) => file.endsWith('.md'));

  for (const file of files) {
    const raw = fs.readFileSync(path.join(POSTS_DIR, file), 'utf8');
    const matches = raw.matchAll(/\/photos\/[^"'\s)]+/g);
    for (const match of matches) refs.add(match[0]);
  }

  return refs;
}

async function compressImage(inputPath, outputPath) {
  const stats = fs.statSync(inputPath);

  if (stats.size <= MAX_FILE_SIZE) {
    console.log(`  ✓ Image already under 5MB (${(stats.size / 1024 / 1024).toFixed(2)}MB)`);
    return;
  }

  console.log(`  ⚙ Compressing from ${(stats.size / 1024 / 1024).toFixed(2)}MB...`);

  if (DRY_RUN) {
    console.log('  • Dry-run: skip actual compression write');
    return;
  }

  let quality = 90;
  let compressed = false;

  while (quality >= 60 && !compressed) {
    await sharp(inputPath).jpeg({ quality, mozjpeg: true }).toFile(outputPath);

    const newStats = fs.statSync(outputPath);
    if (newStats.size <= MAX_FILE_SIZE) {
      console.log(`  ✓ Compressed to ${(newStats.size / 1024 / 1024).toFixed(2)}MB (quality: ${quality})`);
      compressed = true;
    } else {
      quality -= 10;
    }
  }

  if (!compressed) {
    const metadata = await sharp(inputPath).metadata();
    const newWidth = Math.max(800, Math.floor((metadata.width || 1920) * 0.8));

    await sharp(inputPath).resize(newWidth).jpeg({ quality: 85, mozjpeg: true }).toFile(outputPath);
    const finalStats = fs.statSync(outputPath);
    console.log(`  ✓ Resized and compressed to ${(finalStats.size / 1024 / 1024).toFixed(2)}MB`);
  }
}

async function extractExif(imagePath) {
  try {
    return await exifr.parse(imagePath, {
      pick: [
        'Make',
        'Model',
        'LensModel',
        'DateTimeOriginal',
        'CreateDate',
        'ISO',
        'FNumber',
        'ExposureTime',
        'FocalLength',
      ],
    });
  } catch {
    console.log('  ⚠ No EXIF data found');
    return null;
  }
}

function formatCamera(exif) {
  if (!exif?.Make && !exif?.Model) return null;
  return `${exif.Make || ''}, ${exif.Model || ''}`.trim().replace(/^,\s*/, '');
}

function formatDate(exif, filePath) {
  if (exif?.DateTimeOriginal) return exif.DateTimeOriginal.toISOString().split('T')[0];
  if (exif?.CreateDate) return exif.CreateDate.toISOString().split('T')[0];
  return fs.statSync(filePath).birthtime.toISOString().split('T')[0];
}

function generateArticle(photoFilename, exif, date) {
  const photoId = path.basename(photoFilename, path.extname(photoFilename));
  const filename = `${date}-photography-${photoId}.md`;

  const lines = [
    '---',
    'author: Joey',
    `date: ${date}`,
    'tags: ["摄影"]',
    'type: photography',
    'gallery:',
    `  - src: "/photos/${photoFilename}"`,
    '    alt: "摄影作品"',
  ];

  const camera = formatCamera(exif);
  if (camera || exif?.LensModel || exif?.ISO || exif?.FNumber || exif?.ExposureTime || exif?.FocalLength) {
    lines.push('camera:');
    if (camera) lines.push(`  model: "${camera}"`);
    if (exif?.LensModel) lines.push(`  lens: "${exif.LensModel}"`);

    const settings = [];
    if (exif?.ISO) settings.push(`ISO ${exif.ISO}`);
    if (exif?.FNumber) settings.push(`f/${exif.FNumber}`);
    if (exif?.ExposureTime) settings.push(`${exif.ExposureTime}s`);
    if (exif?.FocalLength) settings.push(`${exif.FocalLength}mm`);
    if (settings.length > 0) lines.push(`  settings: "${settings.join(', ')}"`);
  }

  lines.push('draft: false', '---', '');
  return { filename, content: `${lines.join('\n')}` };
}

async function processPhoto(photoPath, existingRefs) {
  const filename = path.basename(photoPath);
  const ext = path.extname(filename).toLowerCase();

  if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
    console.log(`⏭ Skipping ${filename} (not an image)`);
    summary.skipped += 1;
    return;
  }

  summary.processed += 1;
  console.log(`\n📸 Processing: ${filename}`);

  try {
    await compressImage(photoPath, path.join(PHOTOS_DIR, filename));

    const exif = await extractExif(photoPath);
    const date = formatDate(exif, photoPath);
    console.log(`  📅 Date: ${date}`);

    const refPath = `/photos/${filename}`;
    if (existingRefs.has(refPath) && !FORCE) {
      console.log(`  ⚠ Duplicate photo reference exists (${refPath}), use --force to continue`);
      summary.skipped += 1;
      return;
    }

    const { filename: articleFilename, content } = generateArticle(filename, exif, date);
    const articlePath = path.join(POSTS_DIR, articleFilename);
    const exists = fs.existsSync(articlePath);

    if (exists && !FORCE) {
      console.log(`  ⚠ Article exists: ${articleFilename}, use --force to overwrite`);
      summary.skipped += 1;
      return;
    }

    if (DRY_RUN) {
      console.log(`  • Dry-run: ${exists ? 'would overwrite' : 'would create'} ${articleFilename}`);
      summary.created += exists ? 0 : 1;
      summary.overwritten += exists ? 1 : 0;
      return;
    }

    fs.writeFileSync(articlePath, content, 'utf8');
    if (exists) {
      console.log(`  ♻ Overwritten article: ${articleFilename}`);
      summary.overwritten += 1;
    } else {
      console.log(`  ✅ Created article: ${articleFilename}`);
      summary.created += 1;
    }
  } catch (error) {
    console.log(`  ❌ Failed: ${error.message}`);
    summary.failed += 1;
  }
}

function printSummary() {
  console.log('\n✨ Photo sync complete');
  console.log('Summary:');
  console.log(`  processed:   ${summary.processed}`);
  console.log(`  created:     ${summary.created}`);
  console.log(`  overwritten: ${summary.overwritten}`);
  console.log(`  skipped:     ${summary.skipped}`);
  console.log(`  failed:      ${summary.failed}`);

  if (DRY_RUN) {
    console.log('\nDry-run finished. Re-run without --dry-run to apply changes.');
  }
}

async function main() {
  console.log('🚀 Starting photo sync...\n');
  logMode();
  ensureDirectories();

  if (!fs.existsSync(PHOTOS_DIR)) {
    console.log('❌ No photos directory found. Please create public/photos/ and add images.');
    return;
  }

  const imageFiles = fs
    .readdirSync(PHOTOS_DIR)
    .filter((f) => ['.jpg', '.jpeg', '.png'].includes(path.extname(f).toLowerCase()));

  if (imageFiles.length === 0) {
    console.log('📁 No photos found in public/photos/');
    return;
  }

  console.log(`Found ${imageFiles.length} image(s)`);
  const existingRefs = getExistingPhotoRefs();

  for (const file of imageFiles) {
    await processPhoto(path.join(PHOTOS_DIR, file), existingRefs);
  }

  printSummary();
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
