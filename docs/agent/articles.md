# Articles Context

Read this when changing `/articles/`, article detail pages, article list styles, reading typography, or article discovery.

## Experience Goal

Articles should feel like a quiet paper archive and readable stream, not a card-heavy feed.

## Current Decisions

- The article page title is `随便聊聊`, intentionally less formal than `技术文章`.
- The short description may be: `工程实践、工具折腾和一些不太正式的记录。`
- Article list should stay text-first.
- High-frequency tags are useful only if subtle and not dominant.

## Rules

- Do not rename the page back to `技术文章` unless explicitly requested.
- Do not convert the article archive into a dense card grid.
- Keep title, date, description hierarchy clear.
- Long Chinese titles, English technical terms, and identifiers like `use_case` must wrap naturally.
- Code blocks and inline code must be readable without looking accidentally selected.
- If editing shared `.entry-*` styles, regression-test homepage, tag results, pagination, and article detail pages.

## Pagination

- `/articles/` currently lists all non-photography articles while content volume is acceptable.
- Static pagination exists elsewhere in the project.
- Reassess when non-photography articles exceed about 30 posts.
- Do not use infinite scroll.

## Related Docs

- `docs/articles-product-uiux-review.md`
- `docs/ux-review.md`
- `docs/improvement-backlog.md`
