# Astro Implementation Guide

**Generated Date:** 2025-10-22  
**Project:** Joey's Notes - Astro Migration Implementation  
**Purpose:** Step-by-step technical guide for Astro migration

## Phase 1: Project Setup & Foundation

### 1.1 Initialize Astro Project

```bash
# Create new Astro project
npm create astro@latest joey-notes-astro
cd joey-notes-astro

# Choose template: "Just the basics"
# TypeScript: Yes
# Install dependencies: Yes
# Initialize git: Yes
```

### 1.2 Install Required Dependencies

```bash
# Core integrations
npm install @astrojs/mdx @astrojs/sitemap @astrojs/rss
npm install @astrojs/tailwind tailwindcss
npm install @astrojs/image sharp

# Utility packages
npm install gray-matter reading-time
npm install @types/node

# Development tools
npm install -D prettier prettier-plugin-astro
```

### 1.3 Configure Astro

```javascript
// astro.config.mjs
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import image from '@astrojs/image';

export default defineConfig({
  site: 'https://notes.miaowu.org',
  integrations: [
    mdx(),
    sitemap(),
    tailwind(),
    image({
      serviceEntryPoint: '@astrojs/image/sharp'
    })
  ],
  markdown: {
    shikiConfig: {
      theme: 'github-dark',
      wrap: true
    }
  },
  vite: {
    optimizeDeps: {
      exclude: ['@astrojs/image/sharp']
    }
  }
});
```

### 1.4 Set Up Content Collections

```typescript
// src/content/config.ts
import { defineCollection, z } from 'astro:content';

const postsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    subtitle: z.string().optional(),
    author: z.string().default('Joey'),
    date: z.date(),
    tags: z.array(z.string()),
    lang: z.enum(['zh', 'en']).default('zh'),
    header_img: z.string().optional(),
    description: z.string().optional(),
    draft: z.boolean().default(false),
  }),
});

export const collections = {
  posts: postsCollection,
};
```

## Phase 2: Content Migration

### 2.1 Create Migration Script

```javascript
// scripts/migrate-content.js
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const JEKYLL_POSTS_DIR = '../_posts';
const ASTRO_POSTS_DIR = './src/content/posts';

function migratePost(filePath) {
  const content = fs.readFileSync(filePath, 'utf8');
  const { data, content: body } = matter(content);
  
  // Convert Jekyll front matter to Astro format
  const astroFrontMatter = {
    title: data.title,
    subtitle: data.subtitle,
    author: data.author || 'Joey',
    date: new Date(data.date),
    tags: data.tags || [],
    lang: data.lang || 'zh',
    header_img: data['header-img'],
    description: data.description,
  };
  
  // Create new file content
  const newContent = matter.stringify(body, astroFrontMatter);
  
  // Generate new filename
  const basename = path.basename(filePath, '.markdown');
  const newPath = path.join(ASTRO_POSTS_DIR, `${basename}.md`);
  
  fs.writeFileSync(newPath, newContent);
  console.log(`Migrated: ${basename}`);
}

// Run migration
const files = fs.readdirSync(JEKYLL_POSTS_DIR);
files.forEach(file => {
  if (file.endsWith('.markdown') || file.endsWith('.md')) {
    migratePost(path.join(JEKYLL_POSTS_DIR, file));
  }
});
```

### 2.2 Migrate Assets

```bash
# Copy images and assets
cp -r ../img ./public/img
cp -r ../uploads ./public/uploads
cp -r ../fonts ./public/fonts

# Update image paths in content (if needed)
# Use find/replace to update relative paths
```

## Phase 3: Layout & Component Development

### 3.1 Base Layout

```astro
---
// src/layouts/BaseLayout.astro
export interface Props {
  title: string;
  description?: string;
  image?: string;
  lang?: 'zh' | 'en';
}

const { title, description, image, lang = 'zh' } = Astro.props;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<!DOCTYPE html>
<html lang={lang}>
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="icon" type="image/x-icon" href="/favicon.ico" />
  <link rel="canonical" href={canonicalURL} />
  
  <title>{title}</title>
  <meta name="description" content={description} />
  
  <!-- Open Graph -->
  <meta property="og:type" content="website" />
  <meta property="og:url" content={canonicalURL} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  {image && <meta property="og:image" content={new URL(image, Astro.site)} />}
  
  <!-- PWA -->
  <link rel="manifest" href="/manifest.json" />
  <meta name="theme-color" content="#000000" />
</head>
<body>
  <slot />
</body>
</html>
```

### 3.2 Blog Layout

```astro
---
// src/layouts/BlogLayout.astro
import BaseLayout from './BaseLayout.astro';
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';

export interface Props {
  title: string;
  description?: string;
  image?: string;
  lang?: 'zh' | 'en';
}

const props = Astro.props;
---

<BaseLayout {...props}>
  <Header />
  <main class="container mx-auto px-4 py-8">
    <slot />
  </main>
  <Footer />
</BaseLayout>
```

### 3.3 Post Layout

```astro
---
// src/layouts/PostLayout.astro
import BlogLayout from './BlogLayout.astro';
import { Image } from '@astrojs/image/components';

export interface Props {
  title: string;
  subtitle?: string;
  author: string;
  date: Date;
  tags: string[];
  header_img?: string;
  description?: string;
  lang: 'zh' | 'en';
}

const { title, subtitle, author, date, tags, header_img, description, lang } = Astro.props;
---

<BlogLayout title={title} description={description} image={header_img} lang={lang}>
  <article class="max-w-4xl mx-auto">
    {header_img && (
      <div class="mb-8">
        <Image 
          src={header_img} 
          alt={title}
          width={800}
          height={400}
          class="w-full h-64 object-cover rounded-lg"
        />
      </div>
    )}
    
    <header class="mb-8">
      <h1 class="text-4xl font-bold mb-2">{title}</h1>
      {subtitle && <p class="text-xl text-gray-600 mb-4">{subtitle}</p>}
      
      <div class="flex items-center gap-4 text-sm text-gray-500">
        <span>By {author}</span>
        <span>{date.toLocaleDateString(lang === 'zh' ? 'zh-CN' : 'en-US')}</span>
      </div>
      
      <div class="flex flex-wrap gap-2 mt-4">
        {tags.map(tag => (
          <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
            {tag}
          </span>
        ))}
      </div>
    </header>
    
    <div class="prose prose-lg max-w-none">
      <slot />
    </div>
  </article>
</BlogLayout>
```

## Phase 4: Core Features Implementation

### 4.1 Blog Post Listing

```astro
---
// src/pages/index.astro
import { getCollection } from 'astro:content';
import BlogLayout from '../layouts/BlogLayout.astro';
import PostCard from '../components/PostCard.astro';

const posts = await getCollection('posts', ({ data }) => {
  return !data.draft;
});

// Sort posts by date (newest first)
const sortedPosts = posts.sort((a, b) => 
  new Date(b.data.date).getTime() - new Date(a.data.date).getTime()
);
---

<BlogLayout title="Joey's Notes | 黄药师的笔记本">
  <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
    {sortedPosts.map(post => (
      <PostCard post={post} />
    ))}
  </div>
</BlogLayout>
```

### 4.2 Dynamic Post Pages

```astro
---
// src/pages/posts/[slug].astro
import { getCollection } from 'astro:content';
import PostLayout from '../../layouts/PostLayout.astro';

export async function getStaticPaths() {
  const posts = await getCollection('posts');
  return posts.map(post => ({
    params: { slug: post.slug },
    props: { post },
  }));
}

const { post } = Astro.props;
const { Content } = await post.render();
---

<PostLayout {...post.data}>
  <Content />
</PostLayout>
```

### 4.3 Tag System

```astro
---
// src/pages/tags/[tag].astro
import { getCollection } from 'astro:content';
import BlogLayout from '../../layouts/BlogLayout.astro';
import PostCard from '../../components/PostCard.astro';

export async function getStaticPaths() {
  const posts = await getCollection('posts');
  const tags = [...new Set(posts.flatMap(post => post.data.tags))];
  
  return tags.map(tag => ({
    params: { tag },
    props: { 
      posts: posts.filter(post => post.data.tags.includes(tag)),
      tag 
    },
  }));
}

const { posts, tag } = Astro.props;
---

<BlogLayout title={`Posts tagged "${tag}"`}>
  <h1 class="text-3xl font-bold mb-8">Posts tagged "{tag}"</h1>
  <div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
    {posts.map(post => (
      <PostCard post={post} />
    ))}
  </div>
</BlogLayout>
```

### 4.4 RSS Feed

```javascript
// src/pages/rss.xml.js
import rss from '@astrojs/rss';
import { getCollection } from 'astro:content';

export async function get(context) {
  const posts = await getCollection('posts');
  
  return rss({
    title: "Joey's Notes",
    description: "积累一些知识和笔记在这里，以供自己和他人参考。",
    site: context.site,
    items: posts.map(post => ({
      title: post.data.title,
      pubDate: post.data.date,
      description: post.data.description,
      link: `/posts/${post.slug}/`,
    })),
  });
}
```

## Phase 5: Advanced Features

### 5.1 Search Functionality

```astro
---
// src/components/Search.astro
---

<div class="search-container">
  <input 
    type="text" 
    id="search-input" 
    placeholder="Search posts..."
    class="w-full px-4 py-2 border rounded-lg"
  />
  <div id="search-results" class="mt-4"></div>
</div>

<script>
  import Fuse from 'fuse.js';
  
  // Load search data
  const response = await fetch('/search-data.json');
  const posts = await response.json();
  
  const fuse = new Fuse(posts, {
    keys: ['title', 'content', 'tags'],
    threshold: 0.3,
  });
  
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  
  searchInput.addEventListener('input', (e) => {
    const query = e.target.value;
    if (query.length < 2) {
      searchResults.innerHTML = '';
      return;
    }
    
    const results = fuse.search(query);
    displayResults(results);
  });
  
  function displayResults(results) {
    const html = results.map(result => `
      <div class="p-4 border rounded mb-2">
        <h3><a href="/posts/${result.item.slug}/">${result.item.title}</a></h3>
        <p class="text-gray-600">${result.item.description}</p>
      </div>
    `).join('');
    
    searchResults.innerHTML = html;
  }
</script>
```

### 5.2 PWA Configuration

```javascript
// public/sw.js
const CACHE_NAME = 'joey-notes-v1';
const urlsToCache = [
  '/',
  '/posts/',
  '/about/',
  '/css/main.css',
  '/js/main.js',
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});
```

```json
// public/manifest.json
{
  "name": "Joey's Notes",
  "short_name": "Joey's Notes",
  "description": "黄药师的笔记本",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#000000",
  "icons": [
    {
      "src": "/icons/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icons/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    }
  ]
}
```

## Phase 6: Deployment & Optimization

### 6.1 Vercel Deployment

```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "framework": "astro",
  "functions": {
    "src/pages/api/*.js": {
      "runtime": "nodejs18.x"
    }
  }
}
```

### 6.2 Performance Optimization

```javascript
// astro.config.mjs - Add compression and optimization
export default defineConfig({
  // ... existing config
  vite: {
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['astro']
          }
        }
      }
    }
  },
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto'
  }
});
```

### 6.3 SEO Enhancements

```astro
---
// src/components/SEO.astro
export interface Props {
  title: string;
  description: string;
  image?: string;
  article?: boolean;
}

const { title, description, image, article = false } = Astro.props;
const canonicalURL = new URL(Astro.url.pathname, Astro.site);
---

<!-- JSON-LD Structured Data -->
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": article ? "BlogPosting" : "WebSite",
  "headline": title,
  "description": description,
  "url": canonicalURL,
  "author": {
    "@type": "Person",
    "name": "Joey Huang"
  }
}
</script>
```

## Testing & Quality Assurance

### Performance Testing
```bash
# Install Lighthouse CI
npm install -g @lhci/cli

# Run performance audit
lhci autorun --upload.target=temporary-public-storage
```

### Cross-browser Testing
- Chrome DevTools
- Firefox Developer Tools
- Safari Web Inspector
- BrowserStack (for comprehensive testing)

## Migration Checklist

- [ ] Astro project initialized
- [ ] Content collections configured
- [ ] All posts migrated
- [ ] Layouts converted
- [ ] Core features implemented
- [ ] SEO optimized
- [ ] PWA features added
- [ ] Performance optimized
- [ ] Cross-browser tested
- [ ] Deployed to production
- [ ] DNS updated
- [ ] Monitoring configured

This implementation guide provides the technical foundation for a successful migration to Astro while maintaining all current functionality and significantly improving performance.
