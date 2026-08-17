# 内容发布流程

**更新日期**：2026-08-17
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

### 1. 创建草稿

推荐使用模板脚本：

```bash
npm run new:post -- "文章标题"
```

脚本会在 `src/content/posts/` 生成 `draft: true` 的草稿，避免误发布。

如果手动创建，建议文件名：

```text
YYYY-MM-DD-slug.md
```

### 2. 填写 frontmatter

模板脚本会预填基础 frontmatter。手动创建时可参考：

```yaml
---
title: 文章标题
subtitle: 可选副标题
author: Joey
date: 2026-04-19
tags:
  - Notes
lang: zh
draft: true
description: 用一句话概括这篇文章。
---
```

确认发布时再把 `draft` 改为 `false`。

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

## 发布摄影作品

### 1. 将公开作品上传到 Unsplash

摄影作品默认由 Unsplash 托管，仓库不重复保存原图。先在 Unsplash 网页或 App 上传照片，并完成标题、描述、地点和 EXIF 信息。只上传愿意按 Unsplash 授权公开的作品；原始文件仍应保存在自己的照片库或备份中。

首次同步前：

1. 在 Unsplash Developer 页面创建应用并取得 Access Key。
2. 复制 `.env.example` 为 `.env`。
3. 填写 `UNSPLASH_ACCESS_KEY`；如果账号不是 `onice`，同时修改 `UNSPLASH_USERNAME`。

`.env` 已被 Git 忽略，Access Key 不会提交到仓库。

### 2. 手动增量同步

同步不会在 `npm run build`、Git push 或定时任务中自动运行。上传新照片后，由发布者显式执行：

```bash
# 只查看将新增哪些草稿，不写文件
npm run photos:unsplash:sync -- --dry-run

# 创建缺失的摄影草稿
npm run photos:unsplash:sync
```

也可以限制单次创建数量：

```bash
npm run photos:unsplash:sync -- --limit=5
```

脚本通过 Unsplash 官方 API 分页读取账号照片，以原始图片路径去重，只为新增照片生成 `draft: true` 的 Markdown；不会覆盖或删除已有内容。图片 URL 保留 API 返回的 `ixid`，并添加响应式图片需要的格式、宽度和质量参数。正式写入新作品时，脚本还会调用 Unsplash 的下载追踪端点。

### 3. 审阅并发布草稿

同步后打开新生成的 `src/content/posts/*.md`，检查并完善：

- 标题、描述和地点。
- `gallery` 的 alt、caption、宽高。
- `unsplash` 的照片、作者与个人页信息。
- 可选的相机、镜头和曝光信息。

确认无误后再把 `draft: true` 改为 `draft: false`。

如需发布不适合上传 Unsplash 的本地图片，仍可使用 `npm run photos:sync`。它读取 `public/photos/`、压缩大图、提取 EXIF 并生成本地摄影草稿；这是备用流程，不是默认流程。

### 4. 摄影 frontmatter 参考

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
unsplash:
  id: "UnsplashPhotoId"
  photoUrl: "https://unsplash.com/photos/UnsplashPhotoId"
  profileUrl: "https://unsplash.com/@onice"
  photographer: "Joey Huang"
draft: true
description: 摄影作品。
---
```

说明：

- 没有标题时可以不写 `title`，页面不会强制显示“未命名作品”。
- `gallery` 第一张会作为封面和详情页首图。
- `tags` 至少保留 `摄影`，其他标签按需添加。
- EXIF 信息应尽量简洁，不需要重复写“相机”等描述词。
- 确认发布时再把 `draft` 改为 `false`。

### 5. 摄影发布前检查

必须检查：

- Unsplash 图片 URL 是否只有一个 `?`，并包含格式、宽度和质量参数。
- Unsplash 来源和摄影师链接是否完整。
- `gallery[0]` 是否存在。
- 图片体积是否过大。
- 手机端详情页是否可用。
- 摄影列表页是否因为新图比例出现奇怪空白。

建议运行：

```bash
npm run check:content-health
npm run build
```

### 6. 提交和部署

```bash
git add src/content/posts
git commit -m "content: add photography work"
git push origin master
```

## 无标题摄影作品注意事项

摄影作品可以不写 `title`，但必须保证页面 fallback 正常：

- 浏览器标题不能出现 `undefined`。
- 列表和详情页不应强制显示“未命名作品”。
- 发布后要打开详情页检查标题栏和分享预览。

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

## 已有自动化

- `npm run new:post -- "文章标题"`：生成普通文章草稿模板。
- `npm run new:photo -- "可选标题"`：生成摄影作品草稿模板。
- `npm run check:content-health`：检查 title、description、tags、日期、重复 slug、摄影 gallery、摄影标签、本地图片路径等发布风险。
- `npm run photos:unsplash:sync`：从 Unsplash 官方 API 增量生成摄影草稿，仅在手动执行时同步。
- `npm run photos:sync`：从本地照片生成摄影内容的备用流程。

## 后续可优化

- 增加可选的浏览器回归脚本，覆盖文章页、摄影列表页和摄影详情页移动端。
