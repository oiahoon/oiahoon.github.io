# Code Review Context

Read this when reviewing agent-generated changes or preparing a final review pass.

## Review Priorities

Find bugs, regressions, missing tests, accessibility issues, and scope creep before commenting on style.

## Checklist

- Scope matches the user's request.
- No unrelated formatting churn.
- No unrelated file rewrites.
- No regression to article readability.
- No regression to photography dark immersive mode.
- No dynamic tag-cloud or continuous costly animation.
- No broken theme persistence.
- No duplicated photography date in visible or accessible output.
- No `undefined` / `null` in title, OG, Twitter, sitemap-facing metadata, or visible headings.
- Draft content remains excluded from production pages.
- New routes and tags use safe URL encoding.
- Mobile navigation remains usable.
- Lightbox focus, scroll lock, and close behavior remain sane.
- Build and content health checks pass.

## Review By Area

- Article UI: also read `articles.md`.
- Photography UI: also read `photography.md`.
- Tags: also read `tags.md`.
- Content publishing: also read `content-workflow.md`.
- Theme/layout/service worker/SEO: also read `engineering.md` and `design-system.md`.

## Output Style

- Findings first, ordered by severity.
- Include file and line references.
- If no findings, say so and mention residual risks or missing test coverage.
