# Claude Code Project Instructions

Read first:

```text
docs/agent/index.md
```

This project uses layered context. Do not load every file in `docs/agent/` unless the task explicitly needs it. Follow the router in `docs/agent/index.md` to select the smallest relevant context set.

High-level guardrails:

- Preserve the current calm blog identity.
- Articles are text-first; photography is immersive and fixed dark.
- Do not add design-explaining copy or visually loud decoration.
- Do not add dynamic tag-cloud motion, infinite scroll, CMS, or heavy runtime state.
- Keep mobile photography navigation and lightbox behavior usable.

Minimum checks after meaningful changes:

```bash
npm run check:content-health
npm run build
```

For dependency/security-sensitive changes:

```bash
npm run check:security
```
