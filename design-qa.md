# Design QA — Photography Contact Sheet

## Scope

- Reference: `/Users/huangyuyao/.codex/generated_images/01a00e12-9891-7ab3-871d-861225211b93/exec-4376d479-e08f-4c89-a45f-93c12a902847.png`
- Implementation: `http://127.0.0.1:4321/photography/`
- Detail implementation: first work linked from the photography archive
- Reference viewport: 1487 × 1058 pixels
- Primary QA viewport: 1440 × 1024 CSS pixels at device scale factor 1
- Responsive QA viewport: 390 × 844 CSS pixels at device scale factor 1
- Content state: 109 published photography entries, All filter active

## Comparison setup

The reference and implementation have effectively identical aspect ratios, so the reference was compared proportionally without cropping. The final implementation screenshot and reference were also placed side by side in the same Figma board for a full-view comparison. Focused checks covered the site header, title/filter row, year rail, lead-card proportions, grid density, and the first photo detail page.

Figma comparison board: https://www.figma.com/design/gNQwrDbfRWbFV58Si5dzVk

## Final measurements

| Area | Reference intent | Final implementation |
| --- | --- | --- |
| Header | Compact dark navigation; brand around 100 px from the left | 73 px tall; brand x = 99.2 px |
| Archive title | Aligned with the photographic field | Heading x = 116.8 px; lead card x = 116.8 px |
| Lead work | Portrait anchor occupying the first two grid rows | x = 116.8 px, y = 185.8 px, width = 421.0 px, height = 528.4 px |
| Density | Roughly 14–15 images visible in the first desktop viewport | 15 images visible at 1440 × 1024 |
| Horizontal overflow | None | Body width equals viewport on desktop and mobile |
| Detail page | Photograph dominates, title and metadata remain visible | Hero is viewport-constrained; vertical photograph uses `object-fit: contain`; title and metadata are visible |
| Detail neighbors | Compact continuation path | 15 neighboring works plus an All photographs link |

## Interaction and responsive checks

- Category pills update the URL query, hide nonmatching cards, and retain only relevant year links.
- Year navigation scrolls to the first visible work for that year, including while a filter is active.
- Mobile archive reflows to a two-column contact sheet with the lead work spanning both columns.
- Mobile navigation opens within the viewport without horizontal overflow.
- Photo lightbox moves focus to the close control, locks document scrolling, closes with Escape, and restores focus.
- Desktop and mobile detail pages preserve the full composition of portrait photographs.

## Findings and corrections

1. Initial archive rows made the lead card taller than the reference and reduced first-viewport density. The desktop grid row size was reduced to match the contact-sheet rhythm.
2. Initial header and title alignment sat too close to the viewport edge. The inverse header shell was narrowed and the archive heading was aligned with the first photographic column.
3. The detail hero initially cropped portrait works and rendered the full 109-work strip. The hero now contains the image within the viewport and the continuation strip is limited to a 15-work window.
4. Filtered year links initially targeted hidden cards. Year clicks now resolve to the first visible card in the selected year.

## Accepted differences

- The implementation uses the site's real archive rather than the concept image's illustrative photographs.
- The concept's decorative “More photographs below” prompt was not reproduced because all real works continue naturally in the same archive.
- Mobile uses a purpose-built two-column reflow because the reference only defines a desktop composition.

## Final result

passed

## Detail browsing and camera-frame follow-up

### Design grounding

- Hasselblad reference: the 907X & CFV 100C's restrained black body, silver edge, and centered identification treatment.
- Fujifilm reference: X100VI/GFX100RF machined aluminum, tactile controls, sharp edges, and black/silver finishes.
- Implementation deliberately avoids copied logos, a Leica-red accent, and white photo-mat styling. The treatment is an original CSS frame that uses only genuine EXIF maker/model text.

### EXIF coverage

- Audit command: `npm run photos:exif:audit`
- Unsplash photography entries: 109
- Camera model present: 10 (9.2%)
- Lens present: 0
- Exposure settings present: 0
- Historical detail backfill is available through `--backfill-exif`; it requires `UNSPLASH_ACCESS_KEY` and does not invent or overwrite data.

### Detail interaction and responsive QA

- Previous and next are real links; random chooses another work from the full published photography collection.
- Hasselblad detail checked at 1280 × 720, 768 × 1024, and 390 × 844 with no horizontal overflow.
- Neutral portrait detail checked at 768 × 1024 and 390 × 844. The frame sits between navigation and caption without overlap.
- Mobile responsive images were initially clipped to an empty region because a legacy rule gave the inner progressive image the full viewport height. The override was removed; both the low-resolution preview and final responsive image now occupy the frame itself.
- EXIF uses labelled Camera, Lens, and Exposure rows. Missing data is explicitly shown as unavailable.

### Follow-up result

passed

## Frame and title overlap acceptance

### Finding

- At 1280 × 720, the full-width bottom overlay covered 195 px of the camera frame; the title occupied 89 px of the photograph and the model plate intersected the caption region by 24 px.
- The overlap came from the caption/EXIF overlay spanning the same canvas as the centered frame, rather than from the decorative border itself.

### Correction

- Desktop detail pages now use a dedicated left editorial column for date, title, description, attribution, and EXIF, with the framed photograph occupying an independent right-hand stage.
- Tablet frames shift upward to preserve a clear handoff into the caption.
- Short phones (up to 740 px tall) use a smaller ceremonial frame so navigation, image, model plate, and title remain separate.
- The photography detail initializer reruns after Astro client transitions, keeping random navigation and lightbox behavior active after previous/next browsing.

### Verified viewports and states

- 1440 × 900: title/frame, caption/frame, EXIF/frame, and caption/model-plate intersection areas are all 0; horizontal overflow is 0.
- 768 × 1024: all measured intersection areas are 0; horizontal overflow is 0.
- 390 × 844: all measured intersection areas are 0; horizontal overflow is 0.
- 375 × 667 landscape and portrait works: navigation/frame and caption/frame intersection areas are 0; horizontal overflow is 0.
- Previous navigates back to the starting work, next navigates forward, random selects a different work, and EXIF expands without covering the frame.
- Lightbox opens with focus on Close, locks background scrolling, closes with Escape, and releases the scroll lock.

### Acceptance result

passed
