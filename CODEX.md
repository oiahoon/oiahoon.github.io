# Codex Project Context

Read first:

```text
docs/agent/index.md
```

This repository uses layered context. Do not read all `docs/agent/*.md` files automatically. Use the router to load only the product, design, engineering, content, QA, or review context relevant to the task.

Codex workflow reminders:

- Start by checking `git status --short`.
- Preserve the current satisfying design state; prefer refinement over broad rewrites.
- Treat photography pages as a separate locked-dark experience.
- Treat article pages as quiet text-first reading surfaces.
- For UI changes, verify desktop, iPad, and iPhone widths.
- For publishing/content changes, verify `npm run check:content-health`.
- For deploy-ready changes, verify `npm run build` and `npm run check:security` when relevant.
