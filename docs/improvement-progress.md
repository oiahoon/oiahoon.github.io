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
- 最近结果：`189 page(s) built in 1.60s`，`content health: 0 errors / 0 warnings`，`offline shell simplified`，`audit: 5 remaining vulnerabilities requiring breaking --force fixes`
- 最近验证日期：2026-06-22
