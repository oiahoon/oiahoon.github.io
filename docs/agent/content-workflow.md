# Content Workflow Context

Read this for publishing articles/photos, frontmatter, draft behavior, content health checks, and scripts.

## Content Model

- Content lives in `src/content/posts/`.
- Schema lives in `src/content/config.ts`.
- Articles and photography share the same collection.
- Normal posts are default or `type: article`.
- Photography posts use `type: photography` and `gallery`.
- `draft: true` excludes content from production pages.

## Creation Commands

```bash
npm run new:post -- "文章标题"
npm run new:photo -- "可选标题"
npm run new:photo
```

Rules:

- Generated files must default to `draft: true`.
- Do not overwrite existing files.
- New photography drafts should include `type: photography`, `tags: [摄影]`, `gallery`, and basic EXIF placeholders.

## Publishing Checks

Before publishing content, run:

```bash
npm run check:content-health
npm run build
```

For release-sensitive changes, also run:

```bash
npm run check:security
```

## Photography Content Rules

- Photography must include a first gallery image for published works.
- Photography should include the `摄影` tag.
- Untitled photography is allowed.
- No visible or metadata fallback may show `undefined`, `null`, or forced `未命名作品`.
- Large local images should be compressed or flagged.

## Related Docs

- `docs/publishing-workflow.md`
- `docs/content-management-guide.md`
- `docs/content-health-report.md`
