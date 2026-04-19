# Photography Context

Read this when changing `/photography/`, photography detail pages, gallery behavior, lightbox, photo metadata, or mobile photo UX.

## Experience Goal

Photography should feel like an immersive portfolio, not a blog article with a photo attached.

## Theme

- Photography pages are fixed dark.
- Do not add or expose a light photography mode unless explicitly requested.
- Footer and navigation on photography pages should harmonize with the dark photo stage.

## List Page Rules

- Let photos lead; avoid metadata, labels, and boxes competing with images.
- Avoid visible titles for untitled works.
- Avoid showing `未命名作品` as a forced card title.
- Dates should appear once per card and use semantic `<time datetime="...">` where relevant.
- EXIF details should be minimal on the list page; details belong on the detail page.
- Card heights should feel stable on mobile and desktop.

## Detail Page Rules

- Use a full-screen or near full-screen image stage.
- Overlays should be readable but low-interference.
- Back/navigation controls must be available on mobile.
- Previous/next browsing should favor horizontal work strips or thumbnails instead of only two text buttons.
- Same-work multi-photo browsing should support thumbnails and lightbox behavior.
- Untitled photography is valid. Metadata, SEO, and visible UI must never show `undefined`, `null`, or forced `未命名作品`.

## Lightbox Rules

- Focus the close button when the lightbox opens.
- Restore focus to the opener when it closes.
- Lock body/background scrolling while open and release it after close.
- Support Esc and close button.
- Keep swipe/keyboard behavior stable on mobile.
- Avoid controls that obscure the photo more than necessary.

## Mobile Acceptance

Always check iPhone and iPad widths after photography UI changes. Mobile navigation, lightbox close, horizontal strips, and overlays are high-risk areas.

## Related Docs

- `docs/ux-review.md`
- `docs/improvement-backlog.md`
- `docs/photography-feature-implementation.md`
