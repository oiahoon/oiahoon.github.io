# Design System Context

Read this for visual design, spacing, theme behavior, icons, animation, and UI consistency.

## Visual Language

- Calm, restrained, low-saturation, paper-like for normal pages.
- Deep, image-led, immersive for photography pages.
- Typography, spacing, rhythm, and image hierarchy matter more than decorative UI.
- Icons should be subtle, small, and supportive. They must not compete with reading.

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

## Icons

- Current icon system uses Font Awesome through the project icon wrapper.
- Icons should be low-contrast and context-supporting.
- Decorative icons must be `aria-hidden` or not contribute to accessible names.
- Do not add large illustrative icon sets unless explicitly requested.
