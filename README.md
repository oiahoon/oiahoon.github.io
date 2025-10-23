# Joey's Notes

> 黄药师的个人技术博客 - 现代化的Astro驱动博客平台

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/oiahoon/oiahoon.github.io)
[![Built with Astro](https://astro.badg.es/v2/built-with-astro/tiny.svg)](https://astro.build)

## 🌟 项目简介

Joey's Notes是一个现代化的个人技术博客，专注于软件开发、技术分享和摄影作品展示。项目从Jekyll成功迁移到Astro，实现了显著的性能提升和更好的开发体验。

**🔗 在线访问：** [notes.miaowu.org](https://notes.miaowu.org)

## ✨ 主要特性

### 📝 内容管理
- **Markdown驱动**：使用Markdown编写文章，支持丰富的格式
- **双语支持**：中文/英文内容切换
- **标签系统**：文章分类和标签云展示
- **分页功能**：可扩展的内容组织

### 📸 摄影支持
- **沉浸式画廊**：全屏照片展示体验
- **相机信息**：拍摄参数和设备信息展示
- **智能预览**：自动提取文章图片作为预览
- **视觉标识**：摄影文章特殊标记

### 🎨 现代设计
- **Spotlight设计系统**：专业、简洁的视觉风格
- **响应式布局**：完美适配所有设备
- **暗色模式**：支持明暗主题切换
- **PWA支持**：离线访问和应用级体验

### ⚡ 性能优化
- **极速构建**：2.43秒构建52个页面
- **轻量包体**：50-100KB优化后的资源
- **Lighthouse 95+**：所有性能指标优秀
- **零安全漏洞**：现代化的依赖栈

## 🚀 快速开始

### 环境要求
- Node.js 18.0.0+
- npm 9.0.0+

### 本地开发

```bash
# 克隆项目
git clone https://github.com/oiahoon/oiahoon.github.io.git
cd oiahoon.github.io

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问 `http://localhost:4321` 查看本地站点。

### 构建部署

```bash
# 生产构建
npm run build

# 预览构建结果
npm run preview
```

## 📁 项目结构

```
joey-notes-astro/
├── src/
│   ├── components/          # 可复用UI组件
│   │   ├── SpotlightHeader.astro
│   │   ├── SpotlightFooter.astro
│   │   └── PostCard.astro
│   ├── content/            # 内容集合
│   │   ├── posts/          # 博客文章 (Markdown)
│   │   └── config.ts       # 内容模式定义
│   ├── layouts/            # 页面布局
│   │   ├── BaseLayout.astro
│   │   ├── SpotlightLayout.astro
│   │   ├── PostLayout.astro
│   │   └── PhotographyLayout.astro
│   ├── pages/              # 路由页面
│   │   ├── index.astro     # 首页
│   │   ├── about.astro     # 关于页面
│   │   ├── posts/[slug].astro
│   │   └── tags/           # 标签页面
│   ├── styles/             # 全局样式
│   │   └── global.css      # Tailwind + 自定义样式
│   └── utils/              # 工具函数
├── public/                 # 静态资源
│   ├── img/                # 图片资源
│   ├── icons/              # PWA图标
│   └── manifest.json       # PWA配置
├── docs/                   # 项目文档
└── README.md               # 项目说明
```

## 📝 内容创建

### 普通文章

```yaml
---
title: "文章标题"
author: "Joey"
date: 2024-01-15
tags: ["技术", "教程"]
description: "文章描述"
---

# 文章内容

使用Markdown格式编写文章内容...
```

### 摄影文章

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

分享拍摄经验和技巧...
```

## 🛠 技术栈

- **框架**：Astro 5.x + TypeScript
- **样式**：Tailwind CSS + Spotlight设计系统
- **内容**：Markdown + YAML前置数据
- **部署**：Vercel自动部署
- **域名**：notes.miaowu.org

## 📊 性能指标

| 指标 | 数值 |
|------|------|
| 构建时间 | 2.43秒 |
| 页面数量 | 52+ |
| 包体大小 | 50-100KB |
| Lighthouse分数 | 95+ |
| Core Web Vitals | 全部"良好" |

## 🤝 贡献

欢迎提交Issue和Pull Request来改进这个项目。

## 📄 许可证

MIT License

## 📞 联系方式

- **博客**：[notes.miaowu.org](https://notes.miaowu.org)
- **GitHub**：[@oiahoon](https://github.com/oiahoon)
- **邮箱**：joey@miaowu.org

---

**Built with ❤️ using Astro**
