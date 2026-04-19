# GitHub Copilot Instructions

This repository uses layered agent context.

Read first:

```text
docs/agent/index.md
```

Do not load or summarize every file in `docs/agent/` by default. Use the router to select only the relevant context for the current file or task.

Key constraints:

- Preserve the calm, low-saturation visual language.
- Keep articles text-first and readable.
- Keep photography pages locked dark and photo-led.
- Do not add dynamic tag-cloud animation, infinite scroll, CMS behavior, or heavy client-side state.
- Do not add explanatory design copy.
- Do not force visible `未命名作品` for untitled photography.
- Prefer small, focused changes with clear regression coverage.

Validation expectations:

- Run `npm run check:content-health` for content or publishing workflow changes.
- Run `npm run build` for code/UI changes.
- Run `npm run check:security` for dependency or release-sensitive changes.
