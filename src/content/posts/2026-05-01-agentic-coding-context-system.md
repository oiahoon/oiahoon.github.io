---
title: "我是如何设计一套会自维护的 agentic coding 上下文系统的"
subtitle: "让 AI 先读地图，而不是每次重新翻世界"
author: 黄药师
date: 2026-05-01T00:00:00.000Z
tags:
  - Notes
  - agentic coding
  - AI
  - Rust
  - 工程化
lang: zh
draft: false
description: "让 AI 先读地图，而不是每次重新翻世界"
---

最近用 AI 写代码越来越多以后，我发现一个挺现实的问题：现在的模型其实不太缺写代码的能力，很多时候缺的是上下文。

只要上下文给得准，它可以读文件、改代码、跑测试、看报错、继续修，整套动作已经很像一个有耐心的工程师了。但是上下文一乱，它也会很快变成另外一种状态：非常努力，非常自信，也非常容易一本正经地走错路。

尤其是同时维护多个 codebase 的时候，这个问题会被放大。

每个 repo 都有自己的目录习惯、构建命令、测试命令、发布约定、命名偏好。有些东西写在 README 里，有些东西藏在 package scripts 里，有些东西散落在几次 review 和聊天记录里，还有一些东西根本没写过，只是做久了以后自然记住了。

人可以慢慢想起来。agent 不行。它每次进来，基本都是一次冷启动。

一开始我解决这个问题的方式也很朴素：把 README、目录结构、关键文件、测试命令都贴进去，然后补一句「你先看看这个项目」。这个办法当然能用，但是用久了以后就会发现，它很浪费，也不稳定。

今天我记得提醒它新文章默认 `draft: true`，明天可能就忘了。今天我告诉它不要给一个安静的页面加一堆重客户端行为，下次它可能又顺手加了。今天我把整个项目背景都喂进去，它看起来很认真，但这次任务其实只需要改一个小文件。

更麻烦的是，错误上下文比没有上下文更危险。

没有上下文的时候，agent 至少还会去找。错误上下文会让它自信地错。比如某个文档还写着旧的测试命令，某段 prompt 还提到已经删除的目录，某次临时 hack 被总结成了长期约定。它读到了，就会很认真地遵守。

所以我最近想认真做一套 agentic coding 的上下文维护系统。它的目的不是让 AI 读更多，而是让 AI 用更少的 token，更快找到更准的上下文。

这套东西暂时可以叫 `accm`。名字不是重点，能用比会起名重要。

---

## 上下文不是资料库

我现在越来越觉得，agentic coding 的上下文不应该被当成资料库来设计。

资料库追求完整，最好什么都有。工作上下文不是这样。工作上下文追求的是刚好够用，而且要知道什么时候该停。

一个靠谱的工程师接手项目，不会一上来把整个 repo 从头到尾读完。他通常会先搞清楚几个问题：这个项目是什么，任务大概落在哪一层，改完以后怎么证明没有坏，有哪些项目级的坑不能踩。

AI 也应该这样工作。

所以这套系统里最重要的原则其实很简单：

> 先读地图，再读世界。

地图不是世界。地图只告诉你去哪里找东西。

比如我要让 agent 改一篇文章，它不需要默认读取摄影页的 lightbox、service worker、部署配置、所有设计讨论记录。它应该先读一个很薄的 router，然后只加载跟文章相关的上下文。

这件事不复杂，但是非常消耗人。如果每次都靠我提醒，那就还是没有工程化。

## 我想要的结构

这套系统大概会分成几层。

```text
workspace registry
        |
        v
repo scanner
        |
        v
context extractor
        |
        v
context capsules
        |
        v
tool adapters
        |
        v
maintenance loop
```

看起来像一条流水线，但我不想把它做成很重的系统。它更像一个索引员：知道有哪些项目，知道每个项目大概是什么类型，知道做某类任务之前应该先看哪些文件，也知道哪些上下文可能已经过期。

第一层是 workspace registry。它记录我有哪些 repo，它们在哪里，大概是什么类型，彼此之间有没有关系。

比如：

```yaml
repos:
  mossgarden:
    path: ~/work/mossgarden
    entry: docs/agent/index.md
    profile: astro-content-site

  quartzctl:
    path: ~/work/quartzctl
    entry: AGENTS.md
    profile: rust-cli

  paperbridge:
    path: ~/work/paperbridge
    entry: docs/agent/index.md
    profile: markdown-knowledge-base

  lantern-web:
    path: ~/work/lantern-web
    entry: docs/agent/index.md
    profile: nextjs-app
```

这里不要放太多东西。registry 是城市索引，不是城市本身。如果把所有项目的说明揉成一坨超级上下文，那很快又会回到 token 浪费的问题。

第二层是 repo scanner。它不应该无脑扫所有文件，而是先看稳定入口。比如 `README.md`、`AGENTS.md`、`package.json`、`Cargo.toml`、`astro.config.mjs`、`src/content/config.ts`、`.github/workflows/` 这些文件。

这些入口已经能回答很多问题：这是内容站点、Rust CLI、Next.js app，还是一个纯文档仓库。项目类型确定以后，要提取的上下文就不一样。

内容站点要关心 frontmatter、draft、文章和摄影的体验差异、发布前检查。CLI 项目要关心命令入口、参数解析、输出格式、配置文件发现方式。app 要关心路由、数据流、Server/Client boundary、缓存和权限。

同样是 repo，真正有用的上下文完全不同。scanner 的作用不是读更多文件，而是先判断应该读什么文件。

第三层是 extractor。它要做的不是总结 README，而是提取行为边界。

README 很多时候是写给人看的，agent 真正需要的是更直接的工作约定：

- 哪些事情默认不能做
- 哪些目录是生成物
- 哪些文件是公共契约
- 做某类任务应该先读哪些上下文
- 改完以后应该跑什么检查
- 哪些历史坑需要默认避开

这些信息不一定都能自动推断。有些是事实，比如 scripts、schema、目录结构。有些是判断，比如「这个页面要保持安静」「这个 CLI 的 stdout 是兼容性契约」「这个项目不要为了小交互引入重客户端状态」。

我不太相信工具能自动理解所有审美和工程偏好。工具应该把机械部分做好，把需要人判断的部分留出来。

## capsule 要短

我不想让这套系统生成一份巨长的 `PROJECT_CONTEXT.md`。

这种文档看起来很完整，实际很容易变成另一个 token 黑洞。agent 读完以后，未必知道哪些是当前任务需要的，哪些只是历史背景。

我更希望每个 repo 里有一些短小的 capsule。

```text
docs/agent/index.md
docs/agent/engineering.md
docs/agent/content-workflow.md
docs/agent/design-system.md
docs/agent/qa-regression.md
```

`index.md` 是 router。它越薄越好，只负责告诉 agent 做什么任务时读哪些 capsule。

`engineering.md` 讲工程结构和命令。

`content-workflow.md` 讲内容怎么创建、draft 怎么处理、发布前跑什么检查。

`design-system.md` 讲视觉和交互边界。

`qa-regression.md` 讲测试和回归检查。

router 大概可以长这样：

```markdown
# Agent Context Router

Read this file first. Load only the context needed for the current task.

| Task type | Read these files |
|---|---|
| Article content | `content-workflow.md`, `design-system.md` |
| CLI behavior | `engineering.md`, `qa-regression.md` |
| Release checks | `release.md`, `qa-regression.md` |
```

这几行看起来没什么特别，但对 agent 很有用。它把「不要一上来读全世界」这件事变成了默认动作。

## 为什么不用纯 prompt

这套系统不能只靠提示词。

prompt 当然有用，但是 prompt 不适合承担所有事情。它最大的问题是不可检查。

你可以在 prompt 里写「请确认上下文没有过期」。听起来很认真，但是它到底确认了什么？检查了哪些文件？哪些引用不存在？哪些命令变了？如果最后只回一句「看起来没问题」，那和没检查差不多。

而且 prompt 容易漏。每次都靠人提醒 agent「先读 router」「不要展开全部 docs」「检查 capsule 是否过期」，这件事本身就很脆弱。

所以我更倾向于用 Rust 写一组命令。不是因为 Rust 更时髦，而是因为它适合做这种快、稳、容易分发的工程工具。

第一版命令我希望很简单：

```text
accm scan
accm extract
accm generate
accm doctor
accm sync
```

`scan` 识别 repo 类型、入口文件、构建脚本、测试脚本。

`extract` 提取规则、风险点、任务路由和常用命令。

`generate` 生成 `AGENTS.md`、`docs/agent/index.md`，以及不同 AI 工具能读取的适配片段。

`doctor` 检查上下文有没有过期、冲突，或者指向不存在的文件。

`sync` 用来同步团队里的长期记忆。

这里面我最看重的是 `doctor`。它不应该模糊地说「上下文可能需要更新」，而应该给出明确结果。

```text
WARN docs/agent/engineering.md references `npm run test`
     package.json does not define this script.

WARN docs/agent/index.md routes release tasks to `release.md`
     docs/agent/release.md does not exist.

OK   docs/agent/content-workflow.md references `npm run build`
     package.json contains this script.
```

这种输出人能看，agent 也能看。它比一句「请认真检查」靠谱很多。

prompt 在这里仍然有用，但它只是入口，不是系统本体。真正稳定的部分应该是结构化上下文和可执行命令。

## 不挑 AI 工具

我不想把这套系统绑定到某一个 AI 工具上。

Codex、Cursor、Claude Code 的上下文读取方式不一样，习惯也不一样。今天我可能用这个，明天可能用那个。工具会变，但是项目上下文不应该跟着被锁死。

所以中间层要保持稳定：

- workspace registry
- repo profile
- task router
- context capsules
- health report
- memory records

输出层再去适配不同工具。

给 Codex 可以生成 `AGENTS.md`，给 Cursor 可以生成 rules，给 Claude Code 可以生成项目记忆，给通用 CLI agent 可以生成 prompt snippet。

一个很小的 snippet 可能是这样：

```text
Before editing, read the repo context router.
Load only the task-matched capsules.
Do not expand all context files by default.
After meaningful changes, run the checks listed by the router.
```

这段话本身不复杂。真正有价值的是，它背后不是人临时想出来的一段提醒，而是一套被工具生成、检查和维护的上下文。

## 上下文也会腐烂

这套系统里我最在意的其实是维护。

很多项目文档不是没人写，而是写完以后没人维护。agent 上下文也是一样。它第一天可能很准，过几个月以后就开始慢慢腐烂。

`package.json` scripts 变了，router 还在指旧命令。

目录移动了，capsule 还在引用旧路径。

发布流程改了，长期记忆里还是老说法。

更烦的是，团队共享记忆和某个 repo 本地记忆可能会对同一件事说法不一样。

所以 `accm doctor` 要能发现这些问题。它可以定期跑，也可以在重要改动后跑。理想情况下，它能生成一个最小的 fix plan，而不是直接覆盖文档。

```text
accm doctor mossgarden --fix-plan

Suggested changes:
- Remove stale reference to `npm run test`
- Add `npm run check:content-health` to content workflow checks
- Update article task route to include `design-system.md`
```

我不想让它默认全自动修改上下文。上下文是工程资产，应该能 review。工具可以生成 diff，人来确认。这个节奏比较安心。

这里的关键不是自动化多彻底，而是闭环存在。

上下文不能只会生成一次。它要知道自己什么时候可能不再准确，也要知道什么时候该清理过期的错误记忆。

## 长期记忆要能同步

如果这套东西只存在我本地，那价值还是有限。

团队里每个人都有自己的 agent 记忆，最后一定会分叉。A 的 AI 知道某个坑，B 的 AI 不知道。A 本地更新了规则，B 还在用旧规则。最后还是靠人肉传播。

所以长期记忆要能持久化和同步。

但同步的不能是一整段聊天记录。聊天记录太噪了，里面有错误尝试、临时判断、过期方案。它们可以作为原材料，但不能直接变成默认上下文。

我更希望同步的是整理过的短记忆：

```yaml
memories:
  - id: content-draft-default
    scope: repo:mossgarden
    kind: rule
    text: New generated content must default to draft true.
    source: human-reviewed
    updated_at: 2026-05-01

  - id: cli-output-contract
    scope: repo:quartzctl
    kind: risk
    text: CLI stdout format is a compatibility contract. Review changes carefully.
    source: doctor-confirmed
    updated_at: 2026-05-01
```

这种记忆短、明确、有 scope、有来源、有更新时间。它不是永久正确的。相关文件变了，或者时间太久了，就应该重新确认。

长期记忆不是越多越好。该忘的东西要忘掉，不然它迟早会变成新的噪音。

## 跨 codebase 的预判

这套系统还有一个很实际的用途：跨 codebase 的改动预判。

比如我让 agent 改一个 CLI 参数。它不应该只改 `quartzctl`，然后就说完成了。它应该能从 registry 和 memory 里知道，`paperbridge` 里可能有命令文档，`lantern-web` 里可能有调用这个 CLI 的脚本，`mossgarden` 里可能还有一篇介绍用法的文章草稿。

它不一定要自动全改。很多时候，只要能提醒就够了。

```text
This change may affect:
- paperbridge: command reference mentions this flag
- lantern-web: scripts use this command in build tooling

Suggested next context:
- docs/agent/index.md in paperbridge repo
- engineering.md in lantern-web repo
```

这类提醒能省很多时间。

以前 agent 很容易做到局部正确。当前 repo 里的改动没问题，但整个工作流还是坏的。workspace 级别的 registry 至少能让它在动手之前知道，还有哪些地方可能需要看。

## 使用方式应该简单

这套系统如果用起来很麻烦，就没有意义。

我希望最后的使用方式大概是这样：

```text
accm init
accm repo add mossgarden ~/work/mossgarden
accm repo add quartzctl ~/work/quartzctl
accm repo add paperbridge ~/work/paperbridge
accm repo add lantern-web ~/work/lantern-web
accm scan --all
accm generate --all
```

然后就像平时一样用 Codex、Cursor 或 Claude Code。

不需要换一套工作流，也不需要每次打开 AI 工具之前先做一堆仪式。把 codebase 配好以后，该读的入口文件已经在 repo 里，该同步的长期记忆已经有结构化记录，该检查的过期问题可以用 `accm doctor` 看。

这点很重要。agentic coding 本来就是为了节约时间，如果上下文系统本身变成新的负担，那就反过来了。

## 它能带来什么

使用前，agent 经常是这样工作的：

```text
list files
read README
read package.json
read several docs
guess task boundaries
read target files
ask user which checks to run
edit
discover missing context
edit again
```

使用以后，我希望变成这样：

```text
read workspace registry
read repo router
load task-matched capsules
read target files
edit
run listed checks
doctor suggests context updates if needed
```

省下来的不只是 token，还有时间，还有反复解释项目约定的心智成本。

在我自己的工作流里，这套系统的目标是把 token 和时间消耗压到原来的一半左右。这个数字不是通用 benchmark，也不是说所有项目都能稳定省 50%。它更像一个工程目标：如果系统不能明显减少上下文探索和重复沟通，那它就没有做好。

更重要的是，结果会更准。

因为 agent 不再每次都从一堆散乱文件里临时拼认知，而是先拿到一张经过维护的项目地图。

## 小结

这套 agentic coding 上下文系统，对我来说不是为了让 AI 更神奇，而是为了让 AI 少走弯路。

它把多个 codebase 的项目约定、任务路由、长期记忆、风险点和检查命令整理成一套分层上下文。agent 每次开始工作前，先读地图，再进入具体任务。项目变化以后，工具再反过来检查地图是不是该更新。

它不完全依赖提示词。prompt 负责提醒，Rust 命令负责事实检查、结构化输出和可 review 的 diff。

它也不绑定某个 AI 工具。Codex、Cursor、Claude Code 都可以用同一套上下文资产，只是在输出层做适配。

代码生成会越来越便宜，但高质量上下文仍然很贵。贵的不是那些文字，而是文字背后的判断：什么重要，什么不重要，什么时候读，读多少，什么时候该忘掉。

我准备就从这套系统开始，把 agentic coding 的上下文维护认真工程化一次。

先把地图画好，再让 agent 出发。这样比较不容易迷路。
