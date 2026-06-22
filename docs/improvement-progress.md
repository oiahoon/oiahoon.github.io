# 改进进度记录

**开始日期**：2026-02-26  
**关联计划**：`docs/project-analysis-and-improvement-plan.md`

## 进度看板

| 阶段 | 状态 | 负责人 | 最近更新 | 备注 |
|---|---|---|---|---|
| Phase 1 文档基线统一 | 已完成 | Codex + Joey | 2026-02-26 | 当前基线统一到 docs 入口 |
| Phase 2 技术债务清理 | 已完成 | Codex + Joey | 2026-02-26 | 已加入 CI 与文档基线校验 |
| Phase 3 UI/UX 第一轮重构 | 已完成 | Codex + Joey | 2026-02-26 | 首页/文章/摄影/详情页统一视觉语言 |
| Phase 4 内容治理与流程增强 | 已完成 | Codex + Joey | 2026-02-26 | `photos:sync` + 标签治理 + 内容体检 |

## 执行日志

### 2026-06-22
- 进行：UIUX 20 轮改进流程启动，Round 1 基于 `/`、`/articles/`、`/photography/`、`/tags/` 的 `1440x900` 与 `390x844` 截图证据。
- 完成：收紧首页移动首屏照片高度与标题节奏，让内容入口更早出现。
- 完成：降低摄影归档桌面首屏标题占用，保留固定深色摄影体验但减少空白。
- 完成：将文章归档移动端高频标签改为更稳定的两列索引。
- 完成：版本号提升到 `0.0.2`，详见 `docs/uiux-20-round-log.md`。
- 验证：`npm run check:content-health`、`npm run build`、`git diff --check` 通过；`npm run check:security` 经非强制修复后仍剩余 5 个需要 breaking `--force` 的依赖漏洞。
- 进行：Round 2 基于 about、文章详情、标签详情、摄影详情截图，定位到文章详情 `390px` 移动宽度横向溢出。
- 完成：文章详情布局子项增加移动安全宽度和长标题/正文自然换行，版本号提升到 `0.0.3`。
- 验证：Round 2 文章详情移动端 `scrollWidth === clientWidth === 390`，`npm run check:content-health`、`npm run build`、`git diff --check` 通过；安全审计仍剩余同一组 breaking `--force` 依赖项。
- 进行：Round 3 基于标签详情截图，定位到 `#摄影` 将 109 个摄影条目纯文字化，弱化了摄影观看路径。
- 完成：标签详情页对摄影条目增加轻量缩略图行，普通文章标签继续保持文本列表，版本号提升到 `0.0.4`。
- 验证：Round 3 `/tags/摄影/` 桌面与移动无横向溢出且 109 行均有紧凑缩略图；`/tags/Sublime%20Text/` 保持 0 缩略图文本列表。`npm run check:content-health`、`npm run build`、`git diff --check` 通过。
- 进行：Round 4 基于移动菜单交互截图，定位到普通首页菜单层级低于 hero photograph，导致菜单项被遮挡。
- 完成：移动菜单 shell 与菜单面板增加明确 z-index，版本号提升到 `0.0.5`。
- 验证：Round 4 首页与摄影页移动菜单三项链接均可见、无横向溢出；摄影页继续隐藏主题切换。`npm run check:content-health`、`npm run build`、`git diff --check` 通过。
- 进行：Round 5 基于摄影详情桌面截图，定位到作品 strip 为缺图作品渲染空白缩略卡。
- 完成：摄影详情作品 strip 仅渲染有图片的作品，并同步显示计数，版本号提升到 `0.0.6`。
- 验证：Round 5 摄影详情 strip 首屏观察卡片均有图片、无空白缩略卡、无横向溢出；`npm run check:content-health`、`npm run build`、`git diff --check` 通过。
- 进行：Round 6 覆盖作品集、离线页、分页归档、文章归档和摄影标签页，定位到离线页仍像功能说明卡片。
- 完成：离线页收敛为安静状态页，移除大图标、功能清单和 30 秒轮询，版本号提升到 `0.0.7`。
- 验证：Round 6 离线页在桌面与 390px 下无横向溢出，旧功能卡、列表和轮询脚本均已移除；`npm run check:content-health`、`npm run build`、`git diff --check` 通过。
- 进行：Round 7 基于 390px 分页归档截图，定位到 20 个页码全部展开导致分页控件过密。
- 完成：分页归档改为首页、当前邻近页、末页和省略号的紧凑窗口，版本号提升到 `0.0.8`。
- 验证：Round 7 `/page/2/` 在桌面与 390px 下无横向溢出，当前页有 `aria-current="page"`；`npm run check:content-health`、`npm run build`、`git diff --check` 通过。
- 进行：Round 8 覆盖 About、Portfolio、Tags、Articles 和 Home，定位到 Tags 移动端 hero/统计区过重，标签列表进入视口偏晚。
- 完成：Tags 移动端压缩标题、引导、统计和列表入口间距，版本号提升到 `0.0.9`。
- 验证：Round 8 Tags 首条标签在 390px 下 `y=314px` 进入视口，42 个标签保留，桌面与移动端无横向溢出；`npm run check:content-health`、`npm run build`、`git diff --check` 通过。
- 进行：Round 9 基于文章归档移动端截图，定位到大标题三行换行导致文章入口偏低。
- 完成：文章归档仅压缩移动端 hero 标题、引导、主题链接和列表入口间距，版本号提升到 `0.0.10`。
- 验证：Round 9 文章首条在 390px 下 `y=562px` 进入视口，主题链接保留，桌面与移动端无横向溢出；`npm run check:content-health`、`npm run build`、`git diff --check` 通过。
- 进行：Round 10 基于摄影详情多视口截图，定位到 active work strip 的 `scrollIntoView` 会在页面加载后把整页滚到 strip 附近。
- 完成：摄影详情横向 rail/strip 居中改为只调整容器 `scrollLeft`，版本号提升到 `0.0.11`。
- 验证：Round 10 摄影详情在桌面、iPad 和 390px 下均以 `scrollY=0` 加载，active strip 横向居中保持 `activeCenterDelta=0`；`npm run check:content-health`、`npm run build`、`git diff --check` 通过。
- 进行：Round 11 基于 lightbox 移动端截图，定位到动态创建的缩略图未命中 Astro scoped CSS，显示成第二张大图。
- 完成：lightbox 动态缩略图样式改为 `:global(...)`，版本号提升到 `0.0.12`。
- 验证：Round 11 手机缩略图恢复为 `51x64`，桌面为 `62x78`，重复大图消失；lightbox 焦点、Esc 关闭、滚动锁和焦点恢复保持正常；`npm run check:content-health`、`npm run build`、`git diff --check` 通过。
- 进行：Round 12 基于普通页面深色主题截图，定位到 Portfolio 仍使用独立 Tailwind zinc 色层，和站点变量体系不一致。
- 完成：Portfolio 页面迁移到本地语义类和站点设计变量，版本号提升到 `0.0.13`。
- 验证：Round 12 Portfolio 深色主题在 390px 与 1440px 下无横向溢出，保留 2 个项目卡与 3 个站点链接；`npm run check:content-health`、`npm run build`、`git diff --check` 通过。
- 进行：Round 13 覆盖首页、文章、标签、About、Portfolio、离线页、摄影页和文章详情，定位到 About 桌面姓名标题过重。
- 完成：收敛 About 标题、引导和桌面网格比例，版本号提升到 `0.0.14`，并补充 About 设计上下文。
- 验证：Round 13 About 桌面标题高度从 `213px` 降到 `86px`，390px 与 1440px 下无横向溢出；`npm run check:content-health`、`npm run build`、`git diff --check` 通过。
- 进行：Round 14 基于文章详情手机截图，定位到标题和元信息块让正文进入偏晚。
- 完成：增加移动端文章头部压缩规则，保留出版上下文但降低标题、header、marginalia 和正文入口间距，版本号提升到 `0.0.15`。
- 验证：Round 14 文章正文在 390px 下从首屏更早进入，`proseTop=596px`，桌面布局保持稳定；`npm run check:content-health`、`npm run build`、`git diff --check` 通过。
- 进行：Round 15 覆盖摄影标签、普通标签、分页归档、文章归档和首页，定位到长标签详情列表可减少离屏渲染成本。
- 完成：标签详情条目增加原生 `content-visibility: auto` 与 `contain-intrinsic-size`，版本号提升到 `0.0.16`，并补充长列表设计上下文。
- 验证：Round 15 `/tags/摄影/` 109 项与 `/tags/Notes/` 11 项保持稳定，390px 与 1440px 下无横向溢出；`npm run check:content-health`、`npm run build`、`git diff --check` 通过。
- 进行：Round 16 基于文章归档桌面与手机截图，定位到 archive hero 仍过于居中和展示化。
- 完成：文章归档 hero、lede 和主题链接改为左对齐，并降低标题比例，版本号提升到 `0.0.17`。
- 验证：Round 16 文章首条在 390px 下提前到 `510px`、桌面提前到 `535px`，8 个主题链接保留；`npm run check:content-health`、`npm run build`、`git diff --check` 通过。
- 进行：Round 17 基于离线页手机和桌面截图，定位到状态块偏深，首屏空等感略重。
- 完成：离线页状态块上移并微调动作间距，版本号提升到 `0.0.18`，保持简洁状态页结构。
- 验证：Round 17 手机状态块顶部为 `263px`，动作按钮底部为 `514px`，390px 与 1440px 下无横向溢出；`npm run check:content-health`、`npm run build`、`git diff --check` 通过。
- 进行：Round 18 基于手机菜单打开态截图，定位到主题按钮、菜单按钮和菜单项触控高度偏小。
- 完成：移动端 header 控件与菜单项高度提升到 44px，版本号提升到 `0.0.19`，不增加额外说明文案。
- 验证：Round 18 菜单打开态无横向溢出，主题按钮 `73x44`、菜单按钮 `44x44`、菜单项 `142x44`；`npm run check:content-health`、`npm run build`、`git diff --check` 通过。

### 2026-02-26
- 完成：建立执行版改进计划，按“文档基线 -> 技术债 -> UI/UX”重排优先级。
- 完成：新增本进度文档，作为改进过程唯一追踪入口。
- 完成：更新 `docs/README.md` 为单一基线入口，明确历史文档与当前状态边界。
- 完成：首页第一轮重构，精简首屏信息架构，强化文章/摄影直达入口。
- 完成：清理首页重复容器与遗留样式，移除外部字体请求，减少首屏阻塞资源。
- 完成：构建验证通过（67 pages / 2.36s）。
- 完成：将同一 UI 语言扩展到文章页与摄影页，统一阅读体验。
- 完成：新增 `scripts/check-doc-baseline.js`，以构建结果校验文档页面基线。
- 完成：新增 GitHub Actions 质量门禁（build + docs baseline check）。
- 完成：增强 `photos:sync`，支持 `--dry-run`、`--force`、重复检测和摘要统计。
- 完成：新增标签治理规则 `docs/tag-governance.md` 与 `scripts/tag-governance.json`。
- 完成：新增内容健康检查脚本并生成报告 `docs/content-health-report.md`。
- 完成：修复依赖安全漏洞（`npm audit` 高危阈值为 0），并将安全审计加入 CI。
- 完成：补齐全部文章 `description` 与标签归一，内容健康检查归零。

## 验证基线

- 验证命令：`npm run build`
- 质量校验命令：`npm run check:docs-baseline`
- 内容治理命令：`npm run check:content-health`
- 安全校验命令：`npm run check:security`
- 最近结果：`189 page(s) built in 1.42s`，`content health: 0 errors / 0 warnings`，`mobile header touch targets at 44px`，`audit: 5 remaining vulnerabilities requiring breaking --force fixes`
- 最近验证日期：2026-06-23
