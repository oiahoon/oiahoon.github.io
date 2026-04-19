# QA Regression Context

Read this for testing, browser regression, deployment validation, and release gates.

## Command Gates

For most meaningful changes:

```bash
npm run check:content-health
npm run build
```

For dependency/security-sensitive or release-ready changes:

```bash
npm run check:security
```

For patch hygiene:

```bash
git diff --check
```

## Core Pages

Check touched pages plus relevant smoke pages:

- `/`
- `/articles/`
- A normal article detail page, for example `/posts/issues-on-macos-gem-rmagick/`
- `/tags/`
- A Chinese tag page, for example `/tags/摄影/`
- A tag page with spaces, for example `/tags/Sublime%20Text/`
- `/photography/`
- A photography detail page, for example `/posts/2024-03-14-photography-uingbcmkfbq/`

## Viewports

- Desktop: `1440x900`
- iPad: `768x1024`
- iPhone: `390x844`
- Small phone: `375x667`

## Theme Checks

- Normal pages in light mode.
- Normal pages in dark mode.
- Theme persists across reload and navigation.
- Photography pages remain locked dark.

## UI Checks

- No horizontal overflow.
- Mobile navigation is available.
- Text contrast remains readable.
- Long titles and long inline code wrap or scroll in controlled containers.
- Photography cards have stable heights and no odd blank blocks.
- Photography detail overlays do not obscure the image more than necessary.
- Lightbox open, close, keyboard, swipe, focus, and scroll lock remain functional.

## Online Regression

After deployment, verify at least the touched live URLs under `https://notes.miaowu.org/`.
