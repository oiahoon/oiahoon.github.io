# UIUX 20 Round Log

This log tracks the repeated screenshot-led UI/UX improvement rounds for Joey's Notes.

## Round 10 - 2026-06-22 - Photography Detail Load Position

Evidence:

- Baseline screenshots: `/private/tmp/oiahoon-uiux-round-10/`
- Reviewed route: `/posts/2024-03-14-photography-uingbcmkfbq/`
- Viewports: `1440x900`, `768x1024`, `390x844`

Findings:

- Photography detail pages loaded with `window.scrollY` shifted down toward the work strip.
- The active work strip centering used `scrollIntoView`, which centered the horizontal rail item but also moved the whole page vertically.
- On mobile this skipped the natural top of the photography detail and created a large blank dark band before the site bar.

Changes:

- Replaced `scrollIntoView` for photo rails and work strips with a horizontal-only container `scrollLeft` helper.
- Kept active rail centering behavior without changing page scroll position.
- Bumped the app version to `0.0.11`.

Validation plan:

Results:

- Final screenshots: `/private/tmp/oiahoon-uiux-round-10-after/`
- Photography detail now loads at `scrollY=0` on `1440x900`, `768x1024`, and `390x844`.
- Active work strip item remains horizontally centered with `activeCenterDelta=0`; page `scrollWidth` still equals viewport width.
- `npm run check:content-health`: passed, 120 posts scanned, 0 errors, 0 warnings.
- `npm run build`: passed, 189 pages built in 1.74s.
- `git diff --check`: passed.
- `npm run check:security`: still reports the same 5 remaining vulnerabilities that require breaking `npm audit fix --force`.

## Round 9 - 2026-06-22 - Articles Mobile Hero Density

Evidence:

- Baseline screenshots: `/private/tmp/oiahoon-uiux-round-08/articles-390x844.png`, `/private/tmp/oiahoon-uiux-round-08/articles-1440x900.png`
- Reviewed route: `/articles/`
- Viewports: `1440x900`, `390x844`

Findings:

- The article archive is correctly text-first and has no horizontal overflow.
- On mobile, the large English hero title wrapped into multiple lines and pushed topic links and the first article lower than necessary.

Changes:

- Reduced mobile-only article archive top margin, title scale, lede spacing, topic-link gap, and stream entry gap.
- Kept the desktop article archive, text stream, and tag-link structure unchanged.
- Bumped the app version to `0.0.10`.

Validation plan:

Results:

- Final screenshots: `/private/tmp/oiahoon-uiux-round-09-after/`
- Articles archive: first article enters at `y=562px` on `390x844`, topic links remain available, and there is no horizontal overflow at desktop or mobile widths.
- `npm run check:content-health`: passed, 120 posts scanned, 0 errors, 0 warnings.
- `npm run build`: passed, 189 pages built in 1.49s.
- `git diff --check`: passed.
- `npm run check:security`: still reports the same 5 remaining vulnerabilities that require breaking `npm audit fix --force`.

## Round 8 - 2026-06-22 - Tags Mobile Entry Density

Evidence:

- Baseline screenshots: `/private/tmp/oiahoon-uiux-round-08/`
- Reviewed routes: `/about/`, `/portfolio/`, `/tags/`, `/articles/`, `/`
- Viewports: `1440x900`, `390x844`

Findings:

- The checked routes had no horizontal overflow.
- The Tags index mobile hero and summary occupied too much vertical space before the actual tag list.
- Tags should stay static and scannable, with the list entering the viewport earlier on phones.

Changes:

- Reduced Tags index mobile hero top margin, title scale, lede spacing, summary size, and list entry gap.
- Kept desktop two-column tag rhythm and static weighted rows intact.
- Bumped the app version to `0.0.9`.

Validation plan:

Results:

- Final screenshots: `/private/tmp/oiahoon-uiux-round-08-after/`
- Tags index: first tag row enters at `y=314px` on `390x844`, 42 tag rows remain present, and there is no horizontal overflow at desktop or mobile widths.
- `npm run check:content-health`: passed, 120 posts scanned, 0 errors, 0 warnings.
- `npm run build`: passed, 189 pages built in 1.48s.
- `git diff --check`: passed.
- `npm run check:security`: still reports the same 5 remaining vulnerabilities that require breaking `npm audit fix --force`.

## Round 7 - 2026-06-22 - Compact Pagination

Evidence:

- Baseline screenshot: `/private/tmp/oiahoon-uiux-round-06/page-2-390x844.png`
- Reviewed route: `/page/2/`
- Viewport: `390x844`

Findings:

- The paginated archive rendered every page number on mobile, creating a dense cluster of 20 circular controls.
- The page had no overflow, but the control surface was visually heavier than the quiet text archive around it.

Changes:

- Replaced the full page-number list with a compact window: first page, current-neighbor pages, last page, and ellipsis gaps.
- Preserved previous/next links and static direct links for the visible page numbers.
- Bumped the app version to `0.0.8`.

Validation plan:

Results:

- Final screenshots: `/private/tmp/oiahoon-uiux-round-07-after/`
- Pagination at `/page/2/`: renders `上一页 1 2 3 … 20 下一页`, marks page `2` with `aria-current="page"`, and has no horizontal overflow at `1440x900` or `390x844`.
- `npm run check:content-health`: passed, 120 posts scanned, 0 errors, 0 warnings.
- `npm run build`: passed, 189 pages built in 1.48s.
- `git diff --check`: passed.
- `npm run check:security`: still reports the same 5 remaining vulnerabilities that require breaking `npm audit fix --force`.

## Round 6 - 2026-06-22 - Offline State Simplification

Evidence:

- Baseline screenshots: `/private/tmp/oiahoon-uiux-round-06/`
- Reviewed routes: `/portfolio/`, `/offline/`, `/page/2/`, `/articles/`, `/tags/摄影/`
- Viewports: `1440x900`, `390x844`

Findings:

- The checked edge pages had no horizontal overflow.
- The offline page was the weakest fit for the site identity because it used a large feature card, oversized icon, and explanatory feature list.
- The offline shell should behave like a quiet status page, not an onboarding or product feature surface.

Changes:

- Simplified `/offline/` to a centered status, short recovery note, and two direct actions.
- Removed the large icon panel, feature list, and 30-second retry interval.
- Bumped the app version to `0.0.7`.

Validation plan:

Results:

- Final screenshots: `/private/tmp/oiahoon-uiux-round-06-after/`
- Offline page: no horizontal overflow at `1440x900` or `390x844`; no soft panel, feature list, or retry interval remains.
- `npm run check:content-health`: passed, 120 posts scanned, 0 errors, 0 warnings.
- `npm run build`: passed, 189 pages built in 1.60s.
- `git diff --check`: passed.
- `npm run check:security`: still reports the same 5 remaining vulnerabilities that require breaking `npm audit fix --force`.

## Round 5 - 2026-06-22 - Photography Detail Strip Blanks

Evidence:

- Baseline screenshot: `/private/tmp/oiahoon-uiux-round-02/photo-detail-1440x900.png`
- Reviewed route: `/posts/2024-03-14-photography-uingbcmkfbq/`
- Viewport: `1440x900`

Findings:

- The photography detail "Continue browsing photographs" strip rendered blank thumbnail cards for collection items without `image`.
- Blank cards weakened the immersive photography detail experience and looked like unloaded media.

Changes:

- Filtered the work strip to render only collection items with an image.
- Updated the strip active index and total count to match the rendered thumbnail set.
- Bumped the app version to `0.0.6`.

Validation plan:

Results:

- Final screenshot: `/private/tmp/oiahoon-uiux-round-05-after/photo-detail-strip-1440x900.png`
- Work strip: first 8 observed cards all had images, no blank thumbnail cards, no horizontal overflow.
- `npm run check:content-health`: passed, 120 posts scanned, 0 errors, 0 warnings.
- `npm run build`: passed, 189 pages built in 1.60s.
- `git diff --check`: passed.
- `npm run check:security`: still reports the same 5 remaining vulnerabilities that require breaking `npm audit fix --force`.

## Round 4 - 2026-06-22 - Mobile Menu Stacking

Evidence:

- Baseline screenshots: `/private/tmp/oiahoon-uiux-round-04/`
- Reviewed routes: `/`, `/photography/`
- Viewport: `390x844`

Findings:

- Homepage mobile menu opened behind the hero photograph, so only the first menu row was visibly clear.
- Photography archive mobile menu rendered above the dark page correctly and kept the photography page active state.
- Photography pages correctly hide the theme toggle because they are locked dark.

Changes:

- Added an explicit stacking layer to the mobile menu shell and menu panel.
- Bumped the app version to `0.0.5`.

Validation plan:

Results:

- Final screenshots: `/private/tmp/oiahoon-uiux-round-04-after/`
- Homepage and photography mobile menus: all three links visible, menu z-index `50`, no horizontal overflow.
- Photography archive still hides the theme toggle while normal pages keep it.
- `npm run check:content-health`: passed, 120 posts scanned, 0 errors, 0 warnings.
- `npm run build`: passed, 189 pages built in 1.44s.
- `git diff --check`: passed.
- `npm run check:security`: still reports the same 5 remaining vulnerabilities that require breaking `npm audit fix --force`.

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
