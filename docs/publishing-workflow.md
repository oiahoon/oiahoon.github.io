# 内容发布流程

**更新日期**：2026-04-19  
**目标**：记录当前手动发布文章和摄影作品的稳定流程，降低漏字段、路径错误和发布回归风险。

## 内容模型

所有内容都存放在：

```text
src/content/posts/
```

内容 schema 定义在：

```text
src/content/config.ts
```

文章和摄影共用同一个 collection：

- 普通文章默认 `type: article`
- 摄影作品使用 `type: photography`
- `draft: true` 表示不发布
- `draft: false` 表示发布

## 发布普通文章

### 1. 创建 Markdown 文件

建议文件名：

```text
YYYY-MM-DD-slug.md
```

示例：

```text
2026-04-19-my-note.md
```

### 2. 填写 frontmatter

推荐模板：

```yaml
---
title: 文章标题
subtitle: 可选副标题
author: Joey
date: 2026-04-19
tags:
  - Notes
lang: zh
draft: false
description: 用一句话概括这篇文章。
---
```

### 3. 编写正文

正文使用 Markdown。建议：

- 标题层级从 `##` 开始，不在正文里重复页面 `h1`。
- 代码块写明语言，例如 ````ruby`。
- 行内代码只用于短变量、命令、字段名。
- 图片使用站内路径或稳定的外部 URL。

### 4. 发布前检查

运行：

```bash
npm run check:content-health
npm run build
```

如果只是改文案，也至少运行：

```bash
npm run check:content-health
```

### 5. 提交和部署

```bash
git add src/content/posts/<file>.md
git commit -m "content: add article title"
git push origin master
```

### 无标题摄影作品注意事项

摄影作品可以不写 `title`，但必须保证页面 fallback 正常：

- 浏览器标题不能出现 `undefined`。
- 列表和详情页不应强制显示“未命名作品”。
- 发布后要打开详情页检查标题栏和分享预览。

## 发布摄影作品

### 1. 准备图片

优先路径：

```text
public/photos/
```

建议：

- 单张图片控制在合理体积，避免页面过重。
- 文件名使用英文、数字、短横线。
- 同一组照片使用相近命名，便于维护。

### 2. 使用脚本同步照片

如果照片在本地准备好，可以使用：

```bash
npm run photos:sync
```

建议先用 dry-run：

```bash
node scripts/sync-photos.js --dry-run
```

脚本能力：

- 复制图片到 `public/photos`
- 超过 5MB 时尝试压缩
- 提取 EXIF
- 生成摄影 Markdown
- 检测重复图片引用

### 3. 手动创建摄影 Markdown

推荐模板：

```yaml
---
author: Joey
date: 2026-04-19
tags:
  - 摄影
type: photography
gallery:
  - src: "/photos/example.jpg"
    alt: 摄影作品
    caption: 可选说明
camera:
  model: "Camera Model"
  lens: "Lens Model"
  settings: "ISO 100, f/2.8, 1/250s"
location: "可选地点"
publishedDate: "April 19, 2026"
draft: false
description: 摄影作品。
---
```

说明：

- 没有标题时可以不写 `title`，页面不会强制显示“未命名作品”。
- `gallery` 第一张会作为封面和详情页首图。
- `tags` 至少保留 `摄影`，其他标签按需添加。
- EXIF 信息应尽量简洁，不需要重复写“相机”等描述词。

### 4. 摄影发布前检查

必须检查：

- 图片路径是否可访问。
- `gallery[0]` 是否存在。
- 图片体积是否过大。
- 手机端详情页是否可用。
- 摄影列表页是否因为新图比例出现奇怪空白。

建议运行：

```bash
npm run check:content-health
npm run build
```

### 5. 提交和部署

```bash
git add public/photos src/content/posts
git commit -m "content: add photography work"
git push origin master
```

## 发布后检查

发布后建议检查：

- 首页是否正常。
- `/articles/` 是否正常。
- `/photography/` 是否正常。
- 新文章或新摄影详情页是否可打开。
- 手机端摄影页是否能打开导航和灯箱。
- 浏览器 console 是否有新增 404。
- 无标题摄影作品是否没有 `undefined` 标题。
- 摄影列表中日期是否没有重复出现。

## 回滚流程

如果发布后发现问题：

```bash
git log --oneline -5
git revert <commit>
git push origin master
```

不要直接删除远端历史，优先使用 `git revert`。

## 后续可优化

- 增加 `npm run new:post`：生成文章模板。
- 增加 `npm run new:photo`：生成摄影模板。
- 让 `photos:sync` 输出更完整的后续操作提示。
- 在内容健康检查中增加摄影专项规则，例如 `gallery[0]` 必填、图片路径存在、摄影标签存在。
