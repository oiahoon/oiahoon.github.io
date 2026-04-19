# Agent Instructions

Start with the lightweight context router:

```text
docs/agent/index.md
```

Do not load every file in `docs/agent/` by default. Use the router to select only the context needed for the current task.

Default guardrails:

- Preserve the calm, low-saturation blog identity.
- Articles are text-first; photography is immersive and fixed dark.
- Do not add explanatory design copy.
- Do not reintroduce dynamic tag-cloud animation or heavy client-side behavior.
- Run `npm run check:content-health` and `npm run build` after meaningful changes.
- Run `npm run check:security` for dependency or release-sensitive changes.
