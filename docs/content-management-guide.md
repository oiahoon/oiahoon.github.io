# Content Management Guide

**Generated Date:** 2025-10-22  
**Project:** Joey's Notes - Content Management  
**Purpose:** Guide for adding, updating, and deleting articles

## Overview

This guide covers how to manage content in Joey's Notes blog, including creating new articles, updating existing ones, and managing both regular articles and photography posts.

## Content Structure

All content is stored in `/src/content/posts/` as Markdown files with YAML frontmatter.

### File Naming Convention

```
YYYY-MM-DD-article-title.md
```

Examples:
- `2024-01-15-docker-setup-guide.md`
- `2024-02-20-photography-nature.md`

## Creating New Articles

### 1. Regular Article

Create a new `.md` file in `/src/content/posts/`:

```yaml
---
title: "文章标题"
subtitle: "可选的副标题"
author: "Joey"
date: 2024-01-15
tags: ["技术", "教程", "Docker"]
lang: "zh"
description: "文章描述，用于SEO和预览"
draft: false
---

# 文章内容

这里是文章的正文内容，使用Markdown格式。

## 二级标题

- 列表项1
- 列表项2

```code
代码示例
```

![图片描述](/img/example.jpg)
```

### 2. Photography Article

For photography posts, use the `photography` type:

```yaml
---
title: "摄影作品标题"
subtitle: "作品副标题"
author: "Joey"
date: 2024-01-15
tags: ["摄影", "风光", "自然"]
type: "photography"
description: "摄影作品描述"
location: "拍摄地点"
camera:
  model: "相机型号"
  lens: "镜头信息"
  settings: "拍摄参数"
gallery:
  - src: "/img/photo1.jpg"
    alt: "照片描述"
    caption: "照片说明"
  - src: "/img/photo2.jpg"
    alt: "照片描述"
    caption: "照片说明"
draft: false
---

# 摄影心得

这里可以写一些关于拍摄的心得体会...
```

## Field Reference

### Required Fields

| Field | Type | Description |
|-------|------|-------------|
| `title` | string | 文章标题 |
| `author` | string | 作者名称 |
| `date` | date | 发布日期 (YYYY-MM-DD) |
| `tags` | array | 标签数组 |

### Optional Fields

| Field | Type | Description |
|-------|------|-------------|
| `subtitle` | string | 副标题 |
| `lang` | string | 语言 ('zh' 或 'en')，默认 'zh' |
| `description` | string | 文章描述，用于SEO |
| `header_img` | string | 自定义预览图片路径 |
| `draft` | boolean | 是否为草稿，默认 false |

### Photography-Specific Fields

| Field | Type | Description |
|-------|------|-------------|
| `type` | string | 设置为 'photography' |
| `location` | string | 拍摄地点 |
| `camera.model` | string | 相机型号 |
| `camera.lens` | string | 镜头信息 |
| `camera.settings` | string | 拍摄参数 |
| `gallery` | array | 照片数组 |
| `gallery[].src` | string | 图片路径 |
| `gallery[].alt` | string | 图片alt文本 |
| `gallery[].caption` | string | 图片说明 |

## Managing Images

### 1. Adding Images

Place images in the `/public/img/` directory:

```
public/
├── img/
│   ├── 2024/
│   │   ├── 01/
│   │   │   ├── photo1.jpg
│   │   │   └── photo2.jpg
│   │   └── 02/
│   └── uploads/
```

### 2. Image Optimization

- **Format**: Use JPG for photos, PNG for graphics
- **Size**: Optimize images before uploading (recommended max 1920px width)
- **Naming**: Use descriptive names with dates

### 3. Referencing Images

In Markdown content:
```markdown
![图片描述](/img/2024/01/photo1.jpg)
```

In frontmatter:
```yaml
header_img: "/img/2024/01/photo1.jpg"
gallery:
  - src: "/img/2024/01/photo1.jpg"
```

## Updating Articles

### 1. Edit Existing Article

1. Navigate to `/src/content/posts/`
2. Find the article file
3. Edit the content or frontmatter
4. Save the file

### 2. Change Publication Status

To unpublish an article:
```yaml
draft: true
```

To republish:
```yaml
draft: false
```

## Deleting Articles

### 1. Delete Article File

Simply delete the `.md` file from `/src/content/posts/`

### 2. Clean Up Images (Optional)

If the article had unique images, you may want to delete them from `/public/img/`

## Tags Management

### 1. Adding New Tags

Tags are automatically created when used in articles. Simply add them to the `tags` array:

```yaml
tags: ["新标签", "技术", "教程"]
```

### 2. Tag Best Practices

- Use consistent naming (e.g., "摄影" not "Photography")
- Keep tags concise and relevant
- Common tags: "技术", "摄影", "教程", "Docker", "前端", "后端"

## Content Validation

The system automatically validates content using Zod schemas. Common validation errors:

### Invalid Date Format
```yaml
# ❌ Wrong
date: "2024/01/15"

# ✅ Correct
date: 2024-01-15
```

### Invalid Type
```yaml
# ❌ Wrong
type: "photo"

# ✅ Correct
type: "photography"
```

### Missing Required Fields
```yaml
# ❌ Missing title
author: "Joey"
date: 2024-01-15

# ✅ Complete
title: "文章标题"
author: "Joey"
date: 2024-01-15
```

## Development Workflow

### 1. Local Development

```bash
# Start development server
npm run dev

# View at http://localhost:4321
```

### 2. Preview Changes

- Articles are automatically detected and built
- Hot reload shows changes immediately
- Draft articles are visible in development mode

### 3. Content Testing

- Check article displays correctly
- Verify images load properly
- Test responsive design
- Validate links and formatting

## Troubleshooting

### Common Issues

1. **Article not showing**: Check `draft: false` and valid frontmatter
2. **Images not loading**: Verify image paths start with `/`
3. **Build errors**: Check YAML syntax and required fields
4. **Date issues**: Use YYYY-MM-DD format

### Validation Errors

If you see schema validation errors:
1. Check all required fields are present
2. Verify date format
3. Ensure `type` field uses valid values
4. Check array syntax for tags and gallery

## Best Practices

### Content Creation
- Write descriptive titles and descriptions
- Use consistent tagging
- Optimize images before uploading
- Preview content before publishing

### File Organization
- Use consistent file naming
- Organize images by date
- Keep related content together
- Regular cleanup of unused files

### SEO Optimization
- Include meaningful descriptions
- Use relevant tags
- Add alt text for images
- Write engaging titles

---

**Last Updated:** 2025-10-22  
**Version:** 1.0
