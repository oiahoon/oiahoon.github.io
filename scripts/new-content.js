import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const postsDir = path.join(root, 'src/content/posts');
const [, , kind, ...titleParts] = process.argv;

function usage() {
  console.error('Usage: npm run new:post -- "文章标题"');
  console.error('   or: npm run new:photo -- "可选标题"');
  process.exit(1);
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function timestamp(date = new Date()) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
}

function slugify(input, fallback) {
  const slug = String(input || '')
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 72);
  return slug || fallback;
}

function uniquePath(baseName) {
  let candidate = path.join(postsDir, `${baseName}.md`);
  let index = 2;
  while (fs.existsSync(candidate)) {
    candidate = path.join(postsDir, `${baseName}-${index}.md`);
    index += 1;
  }
  return candidate;
}

function writeFile(target, content) {
  fs.writeFileSync(target, content, { encoding: 'utf8', flag: 'wx' });
  console.log(`Created ${path.relative(root, target)}`);
}

const title = titleParts.join(' ').trim();
const today = timestamp();

if (kind === 'post') {
  if (!title) usage();
  const slug = slugify(title, `post-${today}`);
  const target = uniquePath(`${today}-${slug}`);
  writeFile(target, `---
title: ${JSON.stringify(title)}
subtitle: ""
author: Joey
date: ${today}T00:00:00.000Z
tags:
  - Notes
lang: zh
draft: true
description: ""
---

在这里开始写作。
`);
} else if (kind === 'photo') {
  const fallbackTitle = title || `摄影作品 ${today}`;
  const slug = slugify(title, `photography-${today}`);
  const target = uniquePath(`${today}-${slug}`);
  writeFile(target, `---
${title ? `title: ${JSON.stringify(title)}\n` : ''}author: Joey
date: ${today}T00:00:00.000Z
tags:
  - 摄影
lang: zh
type: photography
gallery:
  - src: ""
    alt: "摄影作品"
camera:
  model: ""
publishedDate: "${today}"
draft: true
description: ${JSON.stringify(fallbackTitle)}
---

`);
} else {
  usage();
}
