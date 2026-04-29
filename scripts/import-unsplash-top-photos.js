import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const postsDir = path.join(root, 'src/content/posts');

const USERNAME = 'onice';
const TARGET_COUNT = 100;
const PER_PAGE = 30;
const TAGS = ['摄影', 'Unsplash'];

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function titleize(value) {
  return String(value || '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b([a-z])/g, (match) => match.toUpperCase());
}

function normalizeText(value) {
  const text = String(value || '').replace(/\s+/g, ' ').trim();
  if (!text || ['null', 'undefined', 'untitled'].includes(text.toLowerCase())) return '';
  return text;
}

function withPeriod(value) {
  const text = normalizeText(value);
  if (!text) return '';
  return /[.!?。！？]$/.test(text) ? text : `${text}.`;
}

function imageBase(src) {
  const match = String(src || '').match(/https:\/\/images\.unsplash\.com\/photo-[^?]+/);
  return match?.[0] || '';
}

function stableImageUrl(photo) {
  const base = imageBase(photo.urls?.raw);
  if (!base) return '';
  return `${base}?ixlib=rb-4.1.0&auto=format&fit=crop&w=1600&q=80`;
}

function titleFromPhoto(photo) {
  const slug = String(photo.slug || photo.id || '');
  const withoutId = slug.replace(new RegExp(`-${escapeRegExp(photo.id)}$`), '');
  return titleize(withoutId || photo.alt_description || photo.description || photo.id);
}

function locationFromPhoto(photo) {
  const description = normalizeText(photo.description);
  if (description.includes(',')) {
    const [first] = description.split(',');
    const location = normalizeText(first);
    if (location && location.length <= 42) return location;
  }
  return 'Unsplash Archive';
}

function formatDate(date) {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(date);
}

function ymd(date) {
  return date.toISOString().slice(0, 10);
}

function yamlString(value) {
  return JSON.stringify(String(value || ''));
}

function yamlBlockUrl(value) {
  return `>-\n      ${value}`;
}

function existingUnsplashImageBases() {
  const bases = new Set();
  const files = fs.readdirSync(postsDir).filter((file) => /\.mdx?$/.test(file));

  for (const file of files) {
    const raw = fs.readFileSync(path.join(postsDir, file), 'utf8');
    const { data } = matter(raw);
    const gallery = Array.isArray(data.gallery) ? data.gallery : [];
    for (const item of gallery) {
      const base = imageBase(item?.src);
      if (base) bases.add(base);
    }
  }

  return bases;
}

async function fetchJson(url) {
  const response = await fetch(url, {
    headers: {
      Accept: 'application/json',
      'User-Agent': 'joeys-notes-import/1.0',
    },
  });
  if (!response.ok) {
    throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

async function fetchTopPhotos() {
  const photos = [];
  let page = 1;

  while (photos.length < TARGET_COUNT) {
    const url = `https://unsplash.com/napi/users/${USERNAME}/photos?page=${page}&per_page=${PER_PAGE}&order_by=views`;
    const batch = await fetchJson(url);
    if (!Array.isArray(batch) || batch.length === 0) break;
    photos.push(...batch);
    page += 1;
  }

  return photos.slice(0, TARGET_COUNT);
}

function frontmatterFor(photo, rank) {
  const date = new Date(photo.created_at);
  const title = titleFromPhoto(photo);
  const sourceText = normalizeText(photo.description) || normalizeText(photo.alt_description) || title;
  const caption = withPeriod(sourceText);
  const alt = normalizeText(photo.alt_description) || title;
  const location = locationFromPhoto(photo);
  const imageUrl = stableImageUrl(photo);

  return `---
title: ${yamlString(title)}
subtitle: ${yamlString(sourceText)}
author: Joey
date: ${date.toISOString()}
tags:
${TAGS.map((tag) => `  - ${tag}`).join('\n')}
lang: zh
type: photography
gallery:
  - src: ${yamlBlockUrl(imageUrl)}
    alt: ${yamlString(alt)}
    caption: ${yamlString(caption)}
    width: ${Number(photo.width) || 0}
    height: ${Number(photo.height) || 0}
location: ${yamlString(location)}
publishedDate: ${yamlString(formatDate(date))}
draft: false
description: ${yamlString(caption)}
---

<!-- Unsplash source: ${photo.links?.html || `https://unsplash.com/photos/${photo.id}`} -->
<!-- Unsplash views rank at import: #${rank} -->
`;
}

async function main() {
  const existingBases = existingUnsplashImageBases();
  const topPhotos = await fetchTopPhotos();
  const created = [];
  const skipped = [];

  topPhotos.forEach((photo, index) => {
    const imageUrl = stableImageUrl(photo);
    const base = imageBase(imageUrl);
    if (!base) {
      skipped.push({ id: photo.id, reason: 'missing image URL' });
      return;
    }
    if (existingBases.has(base)) {
      skipped.push({ id: photo.id, reason: 'already exists' });
      return;
    }

    const date = new Date(photo.created_at);
    const target = path.join(postsDir, `${ymd(date)}-photography-${photo.id}.md`);
    if (fs.existsSync(target)) {
      skipped.push({ id: photo.id, reason: 'target file exists' });
      return;
    }

    fs.writeFileSync(target, frontmatterFor(photo, index + 1), { encoding: 'utf8', flag: 'wx' });
    created.push(path.relative(root, target));
    existingBases.add(base);
  });

  console.log(JSON.stringify({
    source: `https://unsplash.com/@${USERNAME}/stats?stats=all-time`,
    requested: TARGET_COUNT,
    fetched: topPhotos.length,
    created: created.length,
    skipped,
    files: created,
  }, null, 2));
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
