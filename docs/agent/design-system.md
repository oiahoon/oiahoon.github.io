# Design System Context

Read this for visual design, spacing, theme behavior, icons, animation, and UI consistency.

## Visual Language

- Calm, restrained, low-saturation, paper-like for normal pages.
- Deep, image-led, immersive for photography pages.
- Typography, spacing, rhythm, and image hierarchy matter more than decorative UI.
- Icons should be subtle, small, and supportive. They must not compete with reading.
- Non-core utility pages such as Portfolio should use the same semantic theme variables as the rest of the normal site.
- About should feel personal and readable, not more visually dominant than the article archive or photography surfaces.

## Copy Rules

- Do not add explanatory design copy.
- Avoid text like `保持克制的视觉` or `按时间排序，保持信息结构稳定`.
- User-facing text should describe content or navigation, not the design rationale.

## Theme Rules

- Normal content pages support light/dark theme switching.
- Theme selection must persist across navigation and reloads.
- Photography list and detail pages are locked dark.
- Do not create a separate light photography theme unless explicitly requested.
- When editing theme logic, verify both normal pages and locked-dark photography pages.

## Motion Rules

- Prefer gentle transitions and page-load polish.
- Avoid continuous, high-cost, or decorative animations.
- Do not reintroduce Brownian-motion tag clouds, marquee tag rows, or similar CPU-heavy effects.
- Respect reduced-motion expectations when adding motion.

## Layout Rules

- Avoid excessive hero whitespace that pushes primary content too far down.
- Keep pages horizontally centered and professional.
- No horizontal overflow at desktop, iPad, or phone widths.
- Mobile navigation must remain reachable.
- Article detail mobile headers should let body text enter quickly without removing the publication context.
- Screenshot-led UIUX rounds should protect first-viewport content entry, especially mobile homepage and desktop photography archive rhythm.
- Mobile menus must stack above photography and homepage media in both normal and locked-dark pages.
- Long archive and tag lists should use native browser containment or lazy media loading before adding client-side behavior.

## Icons

- Current icon system uses Font Awesome through the project icon wrapper.
- Icons should be low-contrast and context-supporting.
- Decorative icons must be `aria-hidden` or not contribute to accessible names.
- Do not add large illustrative icon sets unless explicitly requested.
