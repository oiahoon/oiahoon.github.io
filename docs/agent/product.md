# Product Context

Read this for product direction, information architecture, scope decisions, and roadmap tradeoffs.

## Identity

Joey's Notes is a personal static blog with two connected content modes:

- Articles: quiet long-form writing, engineering notes, tool experiments, and informal records.
- Photography: immersive portfolio-like viewing for photos, not article cards with images.

The site should feel calm, deliberate, low-saturation, and readable. It should not become a feature-heavy CMS, a news feed, or an over-animated portfolio.

## Product Principles

- Keep articles and photography as two clear mental models: reading vs viewing.
- Homepage should connect both modes without becoming a duplicated list page.
- Do not add text that explains design decisions to readers.
- Prefer fewer stronger flows over many features.
- Keep manual publishing as the default workflow unless the user explicitly revisits automation.
- Preserve Astro static-site simplicity.

## Current Information Architecture

- `/`: main entry and recent content.
- `/articles/`: article archive and discovery.
- `/photography/`: photography archive and entry into works.
- `/tags/`: static tag discovery.
- `/about/`: site/person context.
- `/posts/[slug]/`: article details or photography details depending on content type.

## Priorities

- Protect the now-satisfying visual and reading experience.
- Reduce publishing mistakes through scripts and content checks.
- Improve only where real use shows friction.
- Treat mobile photography browsing as a first-class scenario.

## Avoid

- CMS adoption without explicit request.
- Apple Notes / Shortcuts publishing integration unless the user asks again.
- Infinite scroll.
- Dynamic tag clouds.
- Explaining the design inside user-facing copy.
