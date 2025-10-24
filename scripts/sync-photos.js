import fs from 'fs';
import path from 'path';
import exifr from 'exifr';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const PHOTOS_DIR = path.join(__dirname, '../public/photos');
const POSTS_DIR = path.join(__dirname, '../src/content/posts');

// Ensure directories exist
if (!fs.existsSync(PHOTOS_DIR)) {
  fs.mkdirSync(PHOTOS_DIR, { recursive: true });
}

async function compressImage(inputPath, outputPath) {
  const stats = fs.statSync(inputPath);
  
  if (stats.size <= MAX_FILE_SIZE) {
    console.log(`  ✓ Image already under 5MB (${(stats.size / 1024 / 1024).toFixed(2)}MB)`);
    if (inputPath !== outputPath) {
      fs.copyFileSync(inputPath, outputPath);
    }
    return;
  }

  console.log(`  ⚙️  Compressing from ${(stats.size / 1024 / 1024).toFixed(2)}MB...`);
  
  let quality = 90;
  let compressed = false;
  
  while (quality >= 60 && !compressed) {
    await sharp(inputPath)
      .jpeg({ quality, mozjpeg: true })
      .toFile(outputPath);
    
    const newStats = fs.statSync(outputPath);
    
    if (newStats.size <= MAX_FILE_SIZE) {
      console.log(`  ✓ Compressed to ${(newStats.size / 1024 / 1024).toFixed(2)}MB (quality: ${quality})`);
      compressed = true;
    } else {
      quality -= 10;
    }
  }
  
  if (!compressed) {
    // If still too large, resize
    const metadata = await sharp(inputPath).metadata();
    const newWidth = Math.floor(metadata.width * 0.8);
    
    await sharp(inputPath)
      .resize(newWidth)
      .jpeg({ quality: 85, mozjpeg: true })
      .toFile(outputPath);
    
    const finalStats = fs.statSync(outputPath);
    console.log(`  ✓ Resized and compressed to ${(finalStats.size / 1024 / 1024).toFixed(2)}MB`);
  }
}

async function extractExif(imagePath) {
  try {
    const exif = await exifr.parse(imagePath, {
      pick: ['Make', 'Model', 'LensModel', 'DateTimeOriginal', 'CreateDate', 
             'ISO', 'FNumber', 'ExposureTime', 'FocalLength', 
             'latitude', 'longitude']
    });
    
    return exif;
  } catch (error) {
    console.log(`  ⚠️  No EXIF data found`);
    return null;
  }
}

function formatCamera(exif) {
  if (!exif?.Make && !exif?.Model) return null;
  return `${exif.Make || ''}, ${exif.Model || ''}`.trim().replace(/^,\s*/, '');
}

function formatDate(exif, filePath) {
  // Priority: EXIF date > file creation date
  if (exif?.DateTimeOriginal) {
    return exif.DateTimeOriginal.toISOString().split('T')[0];
  }
  if (exif?.CreateDate) {
    return exif.CreateDate.toISOString().split('T')[0];
  }
  
  // Fallback to file creation time
  const stats = fs.statSync(filePath);
  return stats.birthtime.toISOString().split('T')[0];
}

function generateArticle(photoFilename, exif, date) {
  const photoId = path.basename(photoFilename, path.extname(photoFilename));
  const slug = `photography-${photoId}`;
  const filename = `${date}-${slug}.md`;
  
  let frontmatter = `---
author: Joey
date: ${date}
tags: ["摄影"]
type: photography
gallery:
  - src: "/photos/${photoFilename}"
    alt: "摄影作品"`;

  const camera = formatCamera(exif);
  if (camera) {
    frontmatter += `\ncamera:\n  model: "${camera}"`;
  }
  
  if (exif?.LensModel) {
    frontmatter += `\n  lens: "${exif.LensModel}"`;
  }
  
  if (exif?.ISO || exif?.FNumber || exif?.ExposureTime) {
    const settings = [];
    if (exif.ISO) settings.push(`ISO ${exif.ISO}`);
    if (exif.FNumber) settings.push(`f/${exif.FNumber}`);
    if (exif.ExposureTime) settings.push(`${exif.ExposureTime}s`);
    if (exif.FocalLength) settings.push(`${exif.FocalLength}mm`);
    
    if (settings.length > 0) {
      frontmatter += `\n  settings: "${settings.join(', ')}"`;
    }
  }

  frontmatter += `\ndraft: false\n---\n`;

  return { filename, content: frontmatter };
}

async function processPhoto(photoPath) {
  const filename = path.basename(photoPath);
  const ext = path.extname(filename).toLowerCase();
  
  if (!['.jpg', '.jpeg', '.png'].includes(ext)) {
    console.log(`⏭️  Skipping ${filename} (not an image)`);
    return;
  }
  
  console.log(`\n📸 Processing: ${filename}`);
  
  // 1. Compress and save to public/photos
  const outputPath = path.join(PHOTOS_DIR, filename);
  await compressImage(photoPath, outputPath);
  
  // 2. Extract EXIF
  const exif = await extractExif(outputPath);
  
  // 3. Get date
  const date = formatDate(exif, photoPath);
  console.log(`  📅 Date: ${date}`);
  
  if (exif) {
    const camera = formatCamera(exif);
    if (camera) console.log(`  📷 Camera: ${camera}`);
    if (exif.LensModel) console.log(`  🔍 Lens: ${exif.LensModel}`);
  }
  
  // 4. Generate article
  const { filename: articleFilename, content } = generateArticle(filename, exif, date);
  const articlePath = path.join(POSTS_DIR, articleFilename);
  
  // Check if article already exists
  if (fs.existsSync(articlePath)) {
    console.log(`  ⚠️  Article already exists: ${articleFilename}`);
    return;
  }
  
  fs.writeFileSync(articlePath, content, 'utf8');
  console.log(`  ✅ Created article: ${articleFilename}`);
}

async function main() {
  console.log('🚀 Starting photo sync...\n');
  
  // Check for photos in public/photos
  if (!fs.existsSync(PHOTOS_DIR)) {
    console.log('❌ No photos directory found. Please create public/photos/ and add images.');
    return;
  }
  
  const files = fs.readdirSync(PHOTOS_DIR);
  const imageFiles = files.filter(f => 
    ['.jpg', '.jpeg', '.png'].includes(path.extname(f).toLowerCase())
  );
  
  if (imageFiles.length === 0) {
    console.log('📁 No new photos found in public/photos/');
    return;
  }
  
  console.log(`Found ${imageFiles.length} image(s)\n`);
  
  for (const file of imageFiles) {
    await processPhoto(path.join(PHOTOS_DIR, file));
  }
  
  console.log('\n✨ Photo sync complete!');
  console.log('\n💡 Next steps:');
  console.log('   1. Review generated articles in src/content/posts/');
  console.log('   2. Run: npm run build');
  console.log('   3. Commit and push to deploy');
}

main().catch(console.error);
