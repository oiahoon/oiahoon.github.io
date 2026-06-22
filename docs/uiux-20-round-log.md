# UIUX 20 Round Log

This log tracks the repeated screenshot-led UI/UX improvement rounds for Joey's Notes.

## Round 3 - 2026-06-22 - Photography Tag Discovery

Evidence:

- Baseline screenshots: `/private/tmp/oiahoon-uiux-round-02/tag-cn-1440x900.png`, `/private/tmp/oiahoon-uiux-round-02/tag-spaces-1440x900.png`
- Reviewed routes: `/tags/摄影/`, `/tags/Sublime%20Text/`
- Viewports: `1440x900`, plus follow-up mobile capture planned for `/tags/摄影/`

Findings:

- Sparse article tags worked well as text-first lists.
- The photography-heavy `#摄影` tag showed 109 photography entries as plain text rows, which made a viewing-oriented path feel like an article archive.

Changes:

- Kept the tag detail page as a static list, but added compact thumbnails for photography entries.
- Preserved text-first rows for normal article tags.
- Added mobile wrapping constraints for long mixed-language photo titles.
- Bumped the app version to `0.0.4`.

Validation plan:

Results:

- Final screenshots: `/private/tmp/oiahoon-uiux-round-03-final-check/`
- `/tags/摄影/`: 109 rows, compact thumbnails present, no horizontal overflow at `1440x900` or `390x844`.
- `/tags/Sublime%20Text/`: 2 rows, 0 thumbnails, no horizontal overflow.
- `npm run check:content-health`: passed, 120 posts scanned, 0 errors, 0 warnings.
- `npm run build`: passed, 189 pages built in 1.52s.
- `git diff --check`: passed.
- `npm run check:security`: still reports the same 5 remaining vulnerabilities that require breaking `npm audit fix --force`.

## Round 2 - 2026-06-22 - Article Detail Mobile Width

Evidence:

- Baseline screenshots: `/private/tmp/oiahoon-uiux-round-02/`
- Reviewed routes: `/about/`, `/posts/2026-05-01-agentic-coding-context-system/`, `/tags/Sublime%20Text/`, `/tags/摄影/`, `/posts/2024-03-14-photography-uingbcmkfbq/`
- Viewports: `1440x900`, `390x844`

Findings:

- Article detail mobile had horizontal overflow at `390px`; the long mixed Chinese/English title widened the reading column to `414px`.
- About, tag detail, and photography detail pages stayed within viewport width in this screenshot pass.

Changes:

- Added mobile-safe width constraints to article detail grid children, header, prose, and metadata.
- Added natural wrapping for long article title/subtitle/content text.
- Bumped the app version to `0.0.3`.

Validation plan:

Results:

- Final screenshot: `/private/tmp/oiahoon-uiux-round-02-after/article-detail-mobile-390x844.png`
- Mobile article detail width: `scrollWidth === clientWidth === 390`, with 0 overflow offenders.
- `npm run check:content-health`: passed, 120 posts scanned, 0 errors, 0 warnings.
- `npm run build`: passed, 189 pages built in 1.56s.
- `git diff --check`: passed.
- `npm run check:security`: still reports the same 5 remaining vulnerabilities that require breaking `npm audit fix --force`.

## Round 1 - 2026-06-22 - Mobile Entry Density

Evidence:

- Baseline screenshots: `/private/tmp/oiahoon-uiux-round-01/`
- Reviewed routes: `/`, `/articles/`, `/photography/`, `/tags/`
- Viewports: `1440x900`, `390x844`

Findings:

- Homepage mobile first viewport spent too much height on the hero photograph, delaying the site identity and primary actions.
- Photography desktop first viewport used an oversized title with a large empty right side, so the selected-photo section did not get a visible foothold.
- Article archive mobile topic links looked like loose text fragments instead of a scan-friendly index.
- Tags page was healthy enough for this round: static, readable, and without horizontal overflow.

Changes:

- Reduced homepage mobile hero media height and tightened heading/lede spacing so the content entrance appears earlier.
- Tuned photography desktop title scale and section rhythm to reduce empty intro space while preserving the immersive dark identity.
- Reworked article mobile topic links into a compact two-column index with stable tap rows.
- Bumped the app version to `0.0.2`.

Validation plan:

Results:

- `npm run check:content-health`: passed, 120 posts scanned, 0 errors, 0 warnings.
- `npm run build`: passed, 189 pages built in 1.79s.
- `git diff --check`: passed.
- `npm run check:security`: partially improved after non-forced `npm audit fix`, but still reports 5 vulnerabilities that require `npm audit fix --force` and breaking dependency changes.
- Final screenshots: `/private/tmp/oiahoon-uiux-round-01-final-check/`
- Interaction check: `/photography/?tag=street` filter works at `390x844`, with 15 visible and 100 hidden photo items.
