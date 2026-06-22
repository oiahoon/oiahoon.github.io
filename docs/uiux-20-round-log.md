# UIUX 20 Round Log

This log tracks the repeated screenshot-led UI/UX improvement rounds for Joey's Notes.

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
