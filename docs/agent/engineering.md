# Engineering Context

Read this for Astro architecture, important files, scripts, dependencies, and implementation constraints.

## Stack

- Astro static site.
- Tailwind plus Astro component-scoped styles and global CSS.
- Markdown/MDX content collections.
- Font Awesome icon package through a local icon wrapper.
- Vercel/static deployment through git push workflow.

## Important Files

- `src/pages/articles.astro`: article archive.
- `src/pages/photography.astro`: photography list/archive.
- `src/layouts/PostLayout.astro`: normal post layout and photography routing wrapper.
- `src/layouts/PhotographyLayout.astro`: immersive photography detail layout and lightbox behavior.
- `src/layouts/BaseLayout.astro`: SEO, theme bootstrapping, service worker registration.
- `src/components/SpotlightHeader.astro`: normal header and mobile nav.
- `src/components/ProgressiveImage.astro`: progressive image loading.
- `src/components/Icon.astro`: Font Awesome icon wrapper.
- `src/content/config.ts`: content schema.
- `scripts/check-content-health.js`: content validation.
- `scripts/new-content.js`: draft generator.
- `scripts/sync-photos.js`: photo import and EXIF workflow.

## Implementation Rules

- Prefer small, focused changes.
- Avoid broad global CSS edits unless necessary.
- Do not introduce new runtime dependencies without a clear reason.
- Do not add CMS, infinite scroll, or heavy client-side state unless explicitly requested.
- Preserve static-site behavior and simple deployment.
- If touching shared layout/theme code, regression-test normal pages and photography pages.
- Do not overwrite unrelated user changes.

## Common Commands

```bash
npm run dev
npm run build
npm run preview
npm run check:content-health
npm run check:security
npm run new:post -- "文章标题"
npm run new:photo -- "可选标题"
```
