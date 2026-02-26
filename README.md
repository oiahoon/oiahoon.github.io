# Joey's Notes

> 黄药师的个人技术博客 - 基于Astro构建的现代化博客平台

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/oiahoon/oiahoon.github.io)
[![Built with Astro](https://astro.badg.es/v2/built-with-astro/tiny.svg)](https://astro.build)

## 关于这个项目

Joey's Notes是我的个人技术博客，主要分享软件开发经验、技术心得，偶尔也会放一些摄影作品。这个博客原本是用Jekyll搭建的，后来迁移到了Astro，性能提升了不少，开发体验也好了很多。

**在线地址：** [notes.miaowu.org](https://notes.miaowu.org)

## 主要功能

### 内容管理
- 用Markdown写文章，支持各种格式
- 中英文内容都可以，不过主要还是中文
- 有标签系统，方便分类查找
- 支持分页，文章多了也不怕

### 摄影功能
- 专门为摄影作品设计了全屏展示
- 可以显示拍摄参数和相机信息
- 会自动提取文章里的图片做预览
- 摄影文章有特殊的标记，一眼就能看出来

### 设计和体验
- 用的是Spotlight设计风格，看起来比较专业
- 响应式设计，手机电脑都能正常看
- 支持暗色模式，晚上看不刺眼
- 做成了PWA，可以离线访问

### 性能表现
- 构建超快，当前 67 个页面本地构建约 2-4 秒
- 打包后的文件很小，只有50-100KB
- Lighthouse评分都在95分以上
- 没有安全漏洞，依赖都是最新的

## 摄影作品发布流程

### 自动化工作流

1. **添加照片**
   ```bash
   # 将照片放入 public/photos/ 目录
   cp your-photo.jpg public/photos/
   ```

2. **运行同步脚本**
   ```bash
   npm run photos:sync
   npm run photos:sync -- --dry-run   # 预演，不落盘
   npm run photos:sync -- --force     # 覆盖已存在文章
   ```

   脚本会自动：
   - ✅ 压缩图片到 5MB 以下（如果超过）
   - ✅ 提取 EXIF 数据（相机、镜头、拍摄参数）
   - ✅ 使用照片拍摄时间作为发布日期
   - ✅ 自动生成摄影文章
   - ✅ 如果没有 EXIF，使用文件创建时间

3. **预览和发布**
   ```bash
   npm run build    # 构建预览
   git add .
   git commit -m "feat: add new photography"
   git push         # 推送到 GitHub，Vercel 自动部署
   ```

### 照片要求

- **格式**：JPG, JPEG, PNG
- **大小**：任意（脚本会自动压缩到 5MB 以下）
- **建议**：保留照片 EXIF 数据以获得最佳展示效果

## Environment Variables

To fetch photography metadata from Unsplash, you need to set up an API key:

1. Copy `.env.example` to `.env`
2. Get your Unsplash API key from https://unsplash.com/oauth/applications
3. Add your key to `.env`:
   ```
   UNSPLASH_ACCESS_KEY=your_key_here
   ```

## 本地开发

### 环境准备
需要Node.js 18以上版本，npm 9以上版本。

### 开始开发

```bash
# 下载代码
git clone https://github.com/oiahoon/oiahoon.github.io.git
cd oiahoon.github.io

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

然后打开 `http://localhost:4321` 就能看到本地的网站了。

### 构建和部署

```bash
# 构建生产版本
npm run build

# 本地预览构建结果
npm run preview
```

## 项目结构

```
joey-notes-astro/
├── src/
│   ├── components/          # 组件
│   │   ├── SpotlightHeader.astro
│   │   ├── SpotlightFooter.astro
│   │   └── PostCard.astro
│   ├── content/            # 内容
│   │   ├── posts/          # 文章 (Markdown格式)
│   │   └── config.ts       # 内容结构定义
│   ├── layouts/            # 布局
│   │   ├── BaseLayout.astro
│   │   ├── SpotlightLayout.astro
│   │   ├── PostLayout.astro
│   │   └── PhotographyLayout.astro
│   ├── pages/              # 页面
│   │   ├── index.astro     # 首页
│   │   ├── about.astro     # 关于页面
│   │   ├── posts/[slug].astro
│   │   └── tags/           # 标签页面
│   ├── styles/             # 样式
│   │   └── global.css      # 全局样式
│   └── utils/              # 工具函数
├── public/                 # 静态文件
│   ├── img/                # 图片
│   ├── icons/              # 图标
│   └── manifest.json       # PWA配置
├── docs/                   # 项目文档
└── README.md
```

## 怎么写文章

### 普通文章

在 `src/content/posts/` 目录下创建Markdown文件：

```yaml
---
title: "文章标题"
author: "Joey"
date: 2024-01-15
tags: ["技术", "教程"]
description: "简单描述一下文章内容"
---

# 正文开始

用Markdown格式写就行了...
```

### 摄影文章

摄影文章需要设置type为photography：

```yaml
---
title: "摄影作品标题"
type: "photography"
location: "拍摄地点"
camera:
  model: "相机型号"
  lens: "镜头信息"
  settings: "拍摄参数"
gallery:
  - src: "/img/photo1.jpg"
    caption: "照片说明"
tags: ["摄影", "风光"]
---

# 拍摄心得

可以写一些拍摄时的想法和技巧...
```

## 技术栈

这个博客用了这些技术：

- **Astro 5.x + TypeScript** - 主框架
- **Tailwind CSS** - 样式框架
- **Markdown** - 内容格式
- **Vercel** - 部署平台
- **notes.miaowu.org** - 自定义域名

## 性能数据

| 项目 | 数值 |
|------|------|
| 构建时间 | 约2-4秒（以本地构建为准） |
| 生成页面 | 67个（2026-02-26 基线） |
| 文件大小 | 50-100KB |
| Lighthouse评分 | 95+ |
| Core Web Vitals | 全部良好 |

> 说明：最新基线统一维护在 `docs/README.md`。

## 参与贡献

如果你发现了bug或者有好的建议，欢迎提Issue或者Pull Request。

## 开源协议

MIT License

## 联系我

- **博客**：[notes.miaowu.org](https://notes.miaowu.org)
- **GitHub**：[@oiahoon](https://github.com/oiahoon)
- **邮箱**：joey@miaowu.org

---

用Astro构建，体验真的不错
