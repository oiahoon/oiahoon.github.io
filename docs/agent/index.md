# Agent Context Router

**Purpose:** Minimal routing layer for agentic coding tools. Read this file first, then load only the specific context files needed for the task.

Do not read every file in `docs/agent/` by default. Pick the smallest useful set from the routing table below.

## Always Read

- This file.
- The files explicitly matched by the user's task.
- Any source files you intend to edit.

## Task Routing

| Task type | Read these files |
|---|---|
| Product direction, information architecture, roadmap, scope tradeoffs | `product.md` |
| Visual design, spacing, color, icons, motion, theme behavior | `design-system.md` |
| `/articles/`, article list, article detail, reading experience | `articles.md`, `design-system.md` |
| `/photography/`, photography detail, lightbox, photo navigation, mobile photo UX | `photography.md`, `design-system.md` |
| `/tags/`, tag pages, tag weighting, content discovery | `tags.md`, `design-system.md` |
| Theme switching, locked dark pages, SEO/layout/service worker shell | `engineering.md`, `design-system.md`, `qa-regression.md` |
| Publishing articles/photos, frontmatter, content scripts, drafts | `content-workflow.md`, `engineering.md` |
| Astro architecture, key files, dependencies, scripts | `engineering.md` |
| Testing, browser regression, release checks, deployment validation | `qa-regression.md` |
| Code review of proposed or generated changes | `code-review.md`, plus the relevant feature file above |
| Dependency/security changes | `engineering.md`, `qa-regression.md`, `code-review.md` |

## Default Minimal Context

If the task is ambiguous, read only:

- `product.md`
- `engineering.md`

Then decide which additional file is necessary.

## Hard Rules

These rules are short enough to keep in default context:

- Preserve the calm, low-saturation blog identity.
- Articles are text-first; photography is immersive and fixed dark.
- Do not add design-explaining copy.
- Do not reintroduce dynamic tag-cloud animation or continuous high-cost motion.
- Do not add CMS, infinite scroll, or heavy client-side state unless explicitly requested.
- New generated content must default to `draft: true`.
- Run `npm run check:content-health` and `npm run build` after meaningful changes.
- For dependency or release-sensitive changes, also run `npm run check:security`.
