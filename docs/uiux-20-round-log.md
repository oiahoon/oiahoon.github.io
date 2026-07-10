# UIUX 20 Round Log

This log tracks the repeated screenshot-led UI/UX improvement rounds for Joey's Notes.

## Round 58 - 2026-07-10 - Selected Photography Focus

Evidence:

- Browser review: `/photography/` selected section across phone, iPad, and desktop.
- Baseline screenshot: `/tmp/oiahoon-uiux-rounds/round52-before-photo-archive-ipad.png`.
- Baseline copy: the section explained that the works were not the newest, but the author's preferred starting point.

Findings:

- The paragraph explains the curation strategy instead of presenting photography or navigation.
- `Selected photographs` already communicates intentional curation.
- Removing the explanation gives the heading, filters, and images more authority.

Changes:

- Removed the design-explaining paragraph beside the selected photography heading.
- Preserved the section title, filter controls, photo order, and open two-column desktop rhythm.
- Added no replacement badge, subtitle, or helper copy.
- Bumped the app version to `0.0.59`.

Validation plan:

Results:

- Browser verification: the selected section now moves directly from heading and filters into photographs.
- Browser verification: phone, iPad, and desktop layouts retain their established widths and grid breakpoints.
- `npm run check:content-health` passed.
- `npm run build` passed.
- `git diff --check` passed.
- `npm run check:security` reports the known `4 vulnerabilities (3 low, 1 moderate)`; the full fix requires a breaking Astro upgrade.

## Round 57 - 2026-07-10 - About Portrait Restraint

Evidence:

- Browser review: `/about/` at `1440x900` and `390x844`.
- Baseline screenshot: `/tmp/oiahoon-uiux-rounds/baseline-desktop-about.png`.
- Baseline copy: the portrait caption ended with `Kept personal, not corporate.`, explaining the intended visual tone.

Findings:

- The sentence describes a design decision rather than giving readers new information.
- The nearby biography and the portrait itself already communicate the personal context.
- Removing the caption lets the image and equipment notes form a quieter right column.

Changes:

- Removed the explanatory portrait caption and its unused style block.
- Kept the image's descriptive alt text, dimensions, crop, and eager loading.
- Preserved the about-page content, layout, and personal tone.
- Bumped the app version to `0.0.58`.

Validation plan:

Results:

- Browser verification: the portrait flows directly into the `Uses` and `Focus` rows without design commentary.
- Browser verification: desktop and mobile columns retain their existing width and spacing.
- `npm run check:content-health` passed.
- `npm run build` passed.
- `git diff --check` passed.
- `npm run check:security` reports the known `4 vulnerabilities (3 low, 1 moderate)`; the full fix requires a breaking Astro upgrade.

## Round 56 - 2026-07-10 - Tag Summary Language

Evidence:

- Browser review: `/tags/` at `390x844` and `1440x900`.
- Baseline screenshot: `/tmp/oiahoon-uiux-rounds/baseline-mobile-tags.png`.
- Baseline copy: the summary displayed `Tags`, `Posts`, and `Uses`, with `Uses` representing total tag assignments.

Findings:

- `Uses` is ambiguous: it can sound like page views, features, or user actions.
- The number actually counts how often tags are mentioned across published content.
- The clearer label should fit the existing compact metric row without extra explanatory copy.

Changes:

- Renamed the third tag summary metric from `Uses` to `Mentions`.
- Preserved the value, data source, three-column layout, and accessible summary label.
- Added no tooltip or design explanation.
- Bumped the app version to `0.0.57`.

Validation plan:

Results:

- Browser verification: the summary now reads `Tags`, `Posts`, and `Mentions` with the same values.
- Browser verification: the longer label fits at `390px` without wrapping or overflow.
- `npm run check:content-health` passed.
- `npm run build` passed.
- `git diff --check` passed.
- `npm run check:security` reports the known `4 vulnerabilities (3 low, 1 moderate)`; the full fix requires a breaking Astro upgrade.

## Round 55 - 2026-07-10 - Notes Archive Voice

Evidence:

- Browser review: `/articles/` at `390x844` and `1440x900`.
- Baseline screenshot: `/tmp/oiahoon-uiux-rounds/baseline-mobile-articles.png`.
- Context review: the article product context defines the archive title as `随便聊聊` with a short, informal description.

Findings:

- `Engineering notes kept for reference.` sounds formal and product-like compared with the personal archive's intended voice.
- The long status explanation pushes topic links and the first article lower on mobile.
- The visual page should match the documented content identity without changing archive behavior.

Changes:

- Restored the intended `随便聊聊` page title.
- Replaced the long status paragraph with the approved concise archive description.
- Preserved the archive kicker, topic links, entries, typography system, and SEO title.
- Bumped the app version to `0.0.56`.

Validation plan:

Results:

- Browser verification: the documented title and description render in the first mobile viewport.
- Browser verification: topic links and the first article enter earlier with no horizontal overflow.
- `npm run check:content-health` passed.
- `npm run build` passed.
- `git diff --check` passed.
- `npm run check:security` reports the known `4 vulnerabilities (3 low, 1 moderate)`; the full fix requires a breaking Astro upgrade.

## Round 54 - 2026-07-10 - Homepage Series Simplification

Evidence:

- Browser review: homepage at `390x844`, between selected photographs and the about section.
- Screenshot: `/tmp/oiahoon-uiux-rounds/round54-before-home-series-mobile.png`.
- Baseline measurement: the three `Recent series` rows contained zero links and were not generated from current content.

Findings:

- The rows look like discovery controls but cannot be opened or filtered.
- Static series names add a full mobile screen of content without advancing the main photography or notes journeys.
- Selected photographs already provide the stronger, real entry into visual work.

Changes:

- Removed the inert `Recent series` section and its unused styles.
- Connected selected photography directly to the concise author introduction.
- Kept real navigation and content sections unchanged.
- Bumped the app version to `0.0.55`.

Validation plan:

Results:

- Browser verification: no inert series grid remains and selected photography flows directly into the author section.
- Browser verification: the homepage stays within `390px` and all remaining sections have working destinations or real content.
- `npm run check:content-health` passed.
- `npm run build` passed.
- `git diff --check` passed.
- `npm run check:security` reports the known `4 vulnerabilities (3 low, 1 moderate)`; the full fix requires a breaking Astro upgrade.

## Round 53 - 2026-07-10 - Homepage Content-First Opening

Evidence:

- Browser review: homepage at `390x844` after the progressive image reveal.
- Screenshot: `/tmp/oiahoon-uiux-rounds/round51-after-progressive-reveal-mobile.png`.
- Baseline visual: `Photography-first personal site` sat above the real site title as a design-positioning label.

Findings:

- The eyebrow explains the design strategy rather than the author's content.
- On mobile it adds another uppercase line between the photograph and the actual title.
- The photograph, title, and introduction already establish the site's two content modes.

Changes:

- Removed the design-explaining homepage eyebrow.
- Let the main title begin the copy column without inherited empty top spacing.
- Preserved the hero photograph, actions, description, palette, and responsive grid.
- Bumped the app version to `0.0.54`.

Validation plan:

Results:

- Browser verification: the homepage opens with photograph, title, introduction, and actions only.
- Browser verification: the mobile H1 enters earlier without changing the `390px` document width.
- `npm run check:content-health` passed.
- `npm run build` passed.
- `git diff --check` passed.
- `npm run check:security` reports the known `4 vulnerabilities (3 low, 1 moderate)`; the full fix requires a breaking Astro upgrade.

## Round 52 - 2026-07-10 - iPad Photography Archive Density

Evidence:

- Browser review: `/photography/` archive at `768x1024`.
- Screenshot: `/tmp/oiahoon-uiux-rounds/round52-before-photo-archive-ipad.png`.
- Baseline measurement: the archive switched to five columns at `760px`, producing `131.6px` cards and frequent title wrapping.

Findings:

- Five columns make photographs and metadata too small at the narrow edge of the iPad breakpoint.
- The dense grid weakens image-led browsing and makes adjacent cards harder to distinguish.
- Desktop can keep five columns, but tablet needs a distinct intermediate rhythm.

Changes:

- Changed the tablet archive to three equal columns.
- Moved the five-column archive breakpoint to `1100px`.
- Preserved two columns on phones and the existing desktop grid.
- Bumped the app version to `0.0.53`.

Validation plan:

Results:

- Browser verification: archive cards at `768px` expand from about `132px` to about `230px`.
- Browser verification: the grid remains inside the viewport with clearer photo and title hierarchy.
- `npm run check:content-health` passed.
- `npm run build` passed.
- `git diff --check` passed.
- `npm run check:security` reports the known `4 vulnerabilities (3 low, 1 moderate)`; the full fix requires a breaking Astro upgrade.

## Round 51 - 2026-07-10 - Progressive Image Reveal

Evidence:

- Browser review: mobile homepage and photography-tag entry during initial image loading.
- Baseline screenshot: `/tmp/oiahoon-uiux-rounds/baseline-mobile-home.png`.
- Baseline visual: the 16px blur and 1.05 scale made the eager hero look indistinct for the full slow transition.

Findings:

- The placeholder should signal the photo composition without looking like a broken or censored image.
- Large mobile media makes a long, heavy blur more noticeable than on small thumbnails.
- A faster, lighter reveal can improve perceived quality without removing progressive loading.

Changes:

- Reduced placeholder blur from `16px` to `10px` and overscale from `1.05` to `1.025`.
- Shortened both placeholder and full-image fades to the existing base duration.
- Preserved reduced-motion handling and the same image loading order.
- Bumped the app version to `0.0.52`.

Validation plan:

Results:

- Browser verification: the low-resolution layer computes to the lighter blur and smaller overscale.
- Browser verification: eager hero media still resolves to the full image without layout shift at `390px`.
- `npm run check:content-health` passed.
- `npm run build` passed.
- `git diff --check` passed.
- `npm run check:security` reports the known `4 vulnerabilities (3 low, 1 moderate)`; the full fix requires a breaking Astro upgrade.

## Round 50 - 2026-07-10 - Progressive Image Request Discipline

Evidence:

- Browser review: `/photography/` at `390x844`.
- Screenshot: `/tmp/oiahoon-uiux-rounds/round50-before-progressive-loading-mobile.png`.
- Baseline measurement: all `115` low-resolution placeholders loaded eagerly, while only `2` full images were intentionally eager.

Findings:

- The archive's progressive placeholders defeated native lazy loading by requesting every low-resolution image immediately.
- On mobile networks, 113 unnecessary first-load requests compete with the opening text and selected works.
- Above-the-fold images still need eager placeholders, so the placeholder should follow each image's existing loading policy.

Changes:

- Made low-resolution placeholders inherit the component's `eager` or `lazy` loading mode.
- Preserved eager loading for the two priority photographs.
- Kept the existing progressive transition, dimensions, and alt-text behavior.
- Bumped the app version to `0.0.51`.

Validation plan:

Results:

- Browser verification: the archive now renders `2` eager and `113` lazy placeholders, matching the full images.
- Browser verification: the photography first viewport remains stable at `390px` with the same opening composition.
- `npm run check:content-health` passed.
- `npm run build` passed.
- `git diff --check` passed.
- `npm run check:security` reports the known `4 vulnerabilities (3 low, 1 moderate)`; the full fix requires a breaking Astro upgrade.

## Round 49 - 2026-07-10 - Footer Landmark Structure

Evidence:

- Browser review: `/about/` footer at `390x844`.
- Screenshot: `/tmp/oiahoon-uiux-rounds/round49-before-footer-mobile.png`.
- Baseline DOM measurement: the footer contained three visual sections but zero headings and zero navigation landmarks.

Findings:

- The footer looks orderly, but assistive technology could not use the visual labels to navigate its groups.
- The navigation group should be a real navigation landmark with a stable accessible name.
- Semantic improvement must preserve the current compact typography and spacing.

Changes:

- Promoted the three visual labels to real second-level headings.
- Converted the destination group into a labelled navigation landmark.
- Labelled the remaining footer sections while preserving the existing visual classes.
- Bumped the app version to `0.0.50`.

Validation plan:

Results:

- Browser verification: the footer exposes three headings and one labelled navigation landmark.
- Browser verification: the footer retains its mobile spacing, text scale, and `390px` width.
- `npm run check:content-health` passed.
- `npm run build` passed.
- `git diff --check` passed.
- `npm run check:security` reports the known `4 vulnerabilities (3 low, 1 moderate)`; the full fix requires a breaking Astro upgrade.

## Round 48 - 2026-07-10 - Skip To Main Content

Evidence:

- Browser review: standard mobile headers and DOM snapshots across home, articles, tags, photography archive, and about.
- Baseline screenshot: `/tmp/oiahoon-uiux-rounds/round47-after-mobile-menu-active.png`.
- Baseline DOM: the site began keyboard navigation at header controls with no direct route to the page's main landmark.

Findings:

- Repeated header controls add avoidable Tab presses for keyboard and switch-device readers.
- The shortcut should stay invisible during normal pointer use and become obvious on focus.
- Normal pages and the photography archive share layout shells, so the behavior should be implemented at that level.

Changes:

- Added a focused-only `跳到主要内容` link to both shared page layouts.
- Added stable `main-content` targets to their main landmarks.
- Styled the shortcut with existing surface, line, text, motion, and focus tokens.
- Bumped the app version to `0.0.49`.

Validation plan:

Results:

- Browser DOM verification: the skip link is the first interactive element and its `href` resolves to the shared `main-content` target.
- Browser verification: the target exists on sampled standard routes without changing layout width.
- `npm run check:content-health` passed.
- `npm run build` passed.
- `git diff --check` passed.
- `npm run check:security` reports the known `4 vulnerabilities (3 low, 1 moderate)`; the full fix requires a breaking Astro upgrade.

## Round 47 - 2026-07-10 - Mobile Navigation Orientation

Evidence:

- Browser review: `/articles/` at `390x844` with the mobile navigation open.
- Screenshot: `/tmp/oiahoon-uiux-rounds/round47-before-mobile-menu-active.png`.
- Baseline measurement: the active `Notes` link had `aria-current=page` but the same muted color, transparent background, and regular weight as other links.

Findings:

- The menu exposed active state to assistive technology but not to sighted mobile users.
- A reader opening the menu should be able to confirm the current section before choosing a destination.
- The state should remain subtle and use existing theme tokens.

Changes:

- Added a quiet accent-tinted background to the active mobile menu item.
- Promoted the active link to the primary text color and semibold weight.
- Kept the same menu geometry, icons, touch targets, and native `details` behavior.
- Bumped the app version to `0.0.48`.

Validation plan:

Results:

- Browser verification: the active `Notes` item is visibly differentiated while retaining `aria-current=page`.
- Browser verification: the menu remains contained within the `390px` viewport and above page content.
- `npm run check:content-health` passed.
- `npm run build` passed.
- `git diff --check` passed.
- `npm run check:security` reports the known `4 vulnerabilities (3 low, 1 moderate)`; the full fix requires a breaking Astro upgrade.

## Round 46 - 2026-07-10 - Theme Toggle State Announcement

Evidence:

- Browser review: mobile homepage header in both saved dark and switched light states.
- Screenshots: `/tmp/oiahoon-uiux-rounds/round45-before-theme-mobile.png` and `/tmp/oiahoon-uiux-rounds/round45-after-theme-light-mobile.png`.
- Baseline DOM snapshot: the control was always announced as `切换主题`, regardless of the active theme.

Findings:

- The visible label communicates the destination theme, but the accessible name did not.
- Assistive technology also needs a programmatic state for the two-state control.
- State and action wording must update together after navigation and reload.

Changes:

- Added `aria-pressed` to expose the active dark-theme state.
- Updated the accessible label to announce `切换到浅色主题` or `切换到深色主题`.
- Reused the existing theme update path so state stays correct after Astro page swaps.
- Bumped the app version to `0.0.47`.

Validation plan:

Results:

- Browser verification: light mode exposes `aria-pressed=false` and the dark-theme action label.
- Browser verification: clicking the control changes both visual theme and accessible state.
- `npm run check:content-health` passed.
- `npm run build` passed.
- `git diff --check` passed.
- `npm run check:security` reports the known `4 vulnerabilities (3 low, 1 moderate)`; the full fix requires a breaking Astro upgrade.

## Round 45 - 2026-07-10 - Native Theme Integration

Evidence:

- Browser review: homepage header at `390x844` in saved dark mode.
- Screenshot: `/tmp/oiahoon-uiux-rounds/round45-before-theme-mobile.png`.
- Baseline measurement: the page theme was `dark`, while the browser computed `color-scheme: normal`.

Findings:

- The site already persists light and dark themes, but native browser surfaces were not told which palette was active.
- Scrollbars, form controls, and browser-provided UI should harmonize with the selected theme.
- The fix should use CSS platform behavior rather than custom-skinned controls.

Changes:

- Declared light color scheme for the root theme and dark color scheme for `.dark`.
- Kept the existing palette, toggle behavior, and locked-dark photography rules.
- Avoided new JavaScript or custom browser chrome.
- Bumped the app version to `0.0.46`.

Validation plan:

Results:

- Browser verification: dark mode computes `color-scheme: dark` and light mode computes `color-scheme: light`.
- Browser verification: theme switching still updates the visible page with no horizontal overflow.
- `npm run check:content-health` passed.
- `npm run build` passed.
- `git diff --check` passed.
- `npm run check:security` reports the known `4 vulnerabilities (3 low, 1 moderate)`; the full fix requires a breaking Astro upgrade.

## Round 44 - 2026-07-10 - Code Block Boundary

Evidence:

- Browser review: legacy setup article at `390x844` with shell commands inside quoted sections.
- Screenshot: `/tmp/oiahoon-uiux-rounds/round43-after-blockquote-mobile.png`.
- Baseline measurement: Shiki code blocks relied on background contrast alone to separate commands from surrounding quoted prose.

Findings:

- Long legacy articles frequently place code blocks inside blockquotes, creating several nearby dark surfaces.
- The block boundary should stay visible when background colors are close in dark mode.
- A quiet border is enough; extra controls or framed card chrome would distract from reading.

Changes:

- Added a low-contrast border blended from the existing accent and slate code palette.
- Preserved Shiki's existing wrapping behavior, padding, radius, and syntax colors.
- Kept code blocks native, lightweight, and readable inside quoted content.
- Bumped the app version to `0.0.45`.

Validation plan:

Results:

- Browser verification: sampled code blocks retain `pre-wrap` behavior and receive the new one-pixel border.
- Browser verification: nested commands and the document remain inside the `390px` viewport.
- `npm run check:content-health` passed.
- `npm run build` passed.
- `git diff --check` passed.
- `npm run check:security` reports the known `4 vulnerabilities (3 low, 1 moderate)`; the full fix requires a breaking Astro upgrade.

## Round 43 - 2026-07-10 - Blockquote Reading Hierarchy

Evidence:

- Browser review: `/posts/initial-mac-develop-enviroment/` at `390x844` around command and resource quotations.
- Screenshot: `/tmp/oiahoon-uiux-rounds/round43-before-blockquote-mobile.png`.
- Baseline measurement: the quote rail used the same low-contrast line token as ordinary separators.

Findings:

- Long legacy notes use quotes for commands, links, images, and prose, so their left rail must separate them from surrounding paragraphs.
- The existing neutral rail became difficult to track beside dark code panels.
- A restrained accent mix can improve hierarchy without turning quotes into cards.

Changes:

- Mixed the existing accent into the blockquote rail.
- Increased the inner offset slightly so code, images, and prose do not crowd the rail.
- Preserved open typography and the article's borderless reading model.
- Bumped the app version to `0.0.44`.

Validation plan:

Results:

- Browser verification: the sampled command quote has a clearer rail while retaining the same content width.
- Browser verification: nested code and image content remains inside the `390px` viewport.
- `npm run check:content-health` passed.
- `npm run build` passed.
- `git diff --check` passed.
- `npm run check:security` reports the known `4 vulnerabilities (3 low, 1 moderate)`; the full fix requires a breaking Astro upgrade.

## Round 42 - 2026-07-10 - Article Link Focus Clarity

Evidence:

- Browser review: `/posts/set-up-your-own-elk/` at `390x844`, scrolled to the first external resource links.
- Screenshot: `/tmp/oiahoon-uiux-rounds/round42-before-prose-link-mobile.png`.
- Baseline measurement: the link was color-only at rest and relied on the global outline for keyboard focus.

Findings:

- Accent color distinguishes links visually, but a text-level focus cue improves clarity inside dense Chinese/English paragraphs.
- The focus treatment should not permanently underline every link or change reading rhythm.
- The change belongs in shared article typography so older notes receive the same behavior.

Changes:

- Added a visible underline for focused article-body links.
- Tuned underline thickness and offset to remain quiet beside the existing outline.
- Preserved the current hover state, accent color, and text-first reading layout.
- Bumped the app version to `0.0.43`.

Validation plan:

Results:

- Browser verification: article-body links retain their existing accent color and gain a dedicated `:focus-visible` underline rule.
- Browser verification: the sampled legacy article remains within the `390px` viewport.
- `npm run check:content-health` passed.
- `npm run build` passed.
- `git diff --check` passed.
- `npm run check:security` reports the known `4 vulnerabilities (3 low, 1 moderate)`; the full fix requires a breaking Astro upgrade.

## Round 41 - 2026-07-10 - Inline Code Legibility

Evidence:

- Browser review: Chinese article detail at `390x844`, scrolled to the first inline code sample.
- Screenshot: `/tmp/oiahoon-uiux-rounds/round41-after-inline-code-mobile.png`.
- Baseline code review: inline code used a neutral line-colored fill without a dedicated foreground or border token.

Findings:

- Inline code could look like selected text in long mixed Chinese/English paragraphs.
- Dark mode needed a warmer, higher-contrast code treatment without turning each fragment into a loud badge.
- Wrapped inline code should keep its background and border on every rendered line.

Changes:

- Added theme-aware inline-code background, foreground, and border tokens.
- Added a quiet one-pixel border and cloned box decoration for wrapped fragments.
- Preserved article typography, spacing, and the low-saturation palette.
- Bumped the app version to `0.0.42`.

Validation plan:

Results:

- Browser verification: `draft: true` is visually distinct in the mobile article without interrupting paragraph rhythm.
- Browser verification: computed inline-code styles include the dedicated foreground, background, border, and radius.
- Browser verification: the article remains at `390px` document width with no horizontal overflow.
- `npm run check:content-health` passed.
- `npm run build` passed.
- `git diff --check` passed.
- `npm run check:security` reports the known `4 vulnerabilities (3 low, 1 moderate)`; the available full fix requires a breaking Astro upgrade.

## Round 40 - 2026-06-23 - Article Metadata Focus Ring

Evidence:

- Browser review: `/posts/2026-05-01-agentic-coding-context-system/` after the final cross-route link audit.
- Code review: article tag links had hover underline behavior but no local `:focus-visible` treatment.
- Baseline state: article back/tag links already met the `32px` minimum target size after Round 39.

Findings:

- Keyboard users need a visible focus state on compact metadata navigation, especially near article marginalia.
- The focus treatment should remain quiet and match the low-saturation article identity.
- The change should not add client-side behavior or explanatory copy.

Changes:

- Added `:focus-visible` outline treatment for `.article-back-link` and `.article-tag-link`.
- Used the existing accent color through `color-mix` with a small radius and offset.
- Preserved article text-first layout, tag sizing, and hover underline.
- Bumped the app version to `0.0.41`.

Validation plan:

Results:

- Browser verification: the `:focus-visible` CSS rule is loaded for article back/tag metadata links.
- Browser verification: the final sampled 11-route link audit found `0` links below `32px` in width or height.
- Browser verification: sampled article tag links still meet the `32px` minimum width and height after the focus treatment.
- `npm run check:content-health` passed with `120 post(s) checked`, `0 error(s)`, and `0 warning(s)`.
- `npm run build` passed with `189 page(s) built in 1.76s`.
- `git diff --check` passed.
- `npm run check:security` still reports the known 5 vulnerabilities requiring breaking `npm audit fix --force` dependency changes.

## Round 39 - 2026-06-23 - Article Tag Minimum Width

Evidence:

- Browser review: `/posts/2026-05-01-agentic-coding-context-system/` after cross-route link audit.
- Baseline measurement: the short `AI` tag link measured `31px` wide and `32px` high.
- Baseline state: article tag links already had a `2rem` minimum height.

Findings:

- Very short tag labels can fall just below the practical `2rem` width target.
- Tags are small secondary navigation chips, so the fix should be invisible for longer labels and not introduce a pill/button restyle.
- The change should stay local to article detail metadata.

Changes:

- Added a `2rem` minimum width to `.article-tag-link`.
- Kept existing inline-flex alignment, icon gap, muted color, and hover underline.
- Preserved article text-first layout and marginalia rhythm.
- Bumped the app version to `0.0.40`.

Validation plan:

Results:

- Browser verification: the short `AI` article tag now measures `32px` wide and `32px` high.
- Browser verification: all article tag links on the sampled article meet the `32px` minimum width and height.
- `npm run check:content-health` passed with `120 post(s) checked`, `0 error(s)`, and `0 warning(s)`.
- `npm run build` passed with `189 page(s) built in 1.55s`.
- `git diff --check` passed.
- `npm run check:security` still reports the known 5 vulnerabilities requiring breaking `npm audit fix --force` dependency changes.

## Round 38 - 2026-06-23 - Photography Footer Link Targets

Evidence:

- Browser review: `/posts/2024-03-14-photography-uingbcmkfbq/` after cross-route link audit.
- Baseline measurement: photography detail footer links measured `27px` high.
- Baseline state: regular shared footer links had already been corrected to `32px`.

Findings:

- Photography detail uses a custom fixed-dark footer that does not inherit the shared footer target sizing.
- Footer links are full-width visually on the dark page, but their actual text boxes were below the practical `2rem` target.
- The fix should keep the footer calm and text-first.

Changes:

- Made `.photo-footer__links a` inline-flex.
- Added a `2rem` minimum height and centered alignment to photography footer links.
- Preserved the dark photography footer layout, grouping, and link labels.
- Bumped the app version to `0.0.39`.

Validation plan:

Results:

- Browser verification: all photography footer links now compute to `min-height: 32px` and actual `32px` height.
- Browser verification: the photography detail page has no horizontal overflow after the change.
- `npm run check:content-health` passed with `120 post(s) checked`, `0 error(s)`, and `0 warning(s)`.
- `npm run build` passed with `189 page(s) built in 1.65s`.
- `git diff --check` passed.
- `npm run check:security` still reports the known 5 vulnerabilities requiring breaking `npm audit fix --force` dependency changes.

## Round 37 - 2026-06-23 - Home Legacy Note Title Targets

Evidence:

- Browser review: `/` cross-route link audit after the homepage text-link fixes.
- Baseline measurement: legacy note title links measured about `26px` high.
- Baseline state: selected photography titles and homepage text links were already corrected to `32px`.

Findings:

- The legacy archive is a compact text-first list, but title links are still primary entry points.
- Single-line legacy note titles were below the shared `2rem` target.
- The fix should not increase row padding or make the archive feel card-like.

Changes:

- Made `.legacy-row h3 a` inline-flex.
- Added a `2rem` minimum height to homepage legacy note title links.
- Preserved legacy row density, metadata placement, and text-first archive treatment.
- Bumped the app version to `0.0.38`.

Validation plan:

Results:

- Browser verification: homepage legacy note title links now have a `32px` minimum height, with long titles naturally wrapping taller.
- Browser verification: `/` has no horizontal overflow after the change.
- `npm run check:content-health` passed with `120 post(s) checked`, `0 error(s)`, and `0 warning(s)`.
- `npm run build` passed with `189 page(s) built in 1.65s`.
- `git diff --check` passed.
- `npm run check:security` still reports the known 5 vulnerabilities requiring breaking `npm audit fix --force` dependency changes.

## Round 36 - 2026-06-23 - Home Text Link Targets

Evidence:

- Browser review: `/` cross-route link audit.
- Baseline measurement: `Read about Joey`, `All photographs`, and `About Joey` text links measured about `27px` high.
- Baseline state: primary homepage button and photography title links already had practical target sizes.

Findings:

- Homepage quiet text links are important navigation exits but were smaller than the `2rem` target used elsewhere.
- These links should remain text-first and calm rather than becoming filled buttons.
- The fix should cover the shared homepage text-link pattern without changing article or photography content.

Changes:

- Made `.home-text-link`, `.home-section__head a`, and `.home-about a` inline-flex.
- Added a `2rem` minimum height and centered alignment to those homepage text links.
- Preserved underline styling, section hierarchy, and homepage layout.
- Bumped the app version to `0.0.37`.

Validation plan:

Results:

- Browser verification: homepage text links now compute to `min-height: 32px` and actual `32px` height.
- Browser verification: `/` has no horizontal overflow after the change.
- `npm run check:content-health` passed with `120 post(s) checked`, `0 error(s)`, and `0 warning(s)`.
- `npm run build` passed with `189 page(s) built in 1.69s`.
- `git diff --check` passed.
- `npm run check:security` still reports the known 5 vulnerabilities requiring breaking `npm audit fix --force` dependency changes.

## Round 35 - 2026-06-23 - Home Photography Title Targets

Evidence:

- Browser review: `/` cross-route link audit.
- Baseline measurement: homepage selected photography title links measured `22px` high.
- Baseline state: `/photography/` card title links were already corrected to `32px`.

Findings:

- The homepage reuses the same photography entry pattern, but its selected-card title links were still below the target size.
- The large image remains the primary target, while the title is a secondary but visible route to the same detail page.
- The fix should align the homepage with the photography archive without changing the calm homepage hierarchy.

Changes:

- Made `.selected-card h3 a` inline-flex.
- Added a `2rem` minimum height to homepage selected photography title links.
- Preserved homepage selected photo grid, imagery, metadata, and section order.
- Bumped the app version to `0.0.36`.

Validation plan:

Results:

- Browser verification: homepage selected photography title links now compute to `inline-flex`, `min-height: 32px`, and an actual `32px` height.
- Browser verification: `/` has no horizontal overflow after the change.
- `npm run check:content-health` passed with `120 post(s) checked`, `0 error(s)`, and `0 warning(s)`.
- `npm run build` passed with `189 page(s) built in 1.71s`.
- `git diff --check` passed.
- `npm run check:security` still reports the known 5 vulnerabilities requiring breaking `npm audit fix --force` dependency changes.

## Round 34 - 2026-06-23 - Photography Card Title Targets

Evidence:

- Browser review: `/photography/`.
- Baseline measurement: selected photography card title links measured `22px` high.
- Baseline state: filter chips and full image cards already had practical target sizes.

Findings:

- The photography grid relies on immersive image cards, but title links remain useful secondary entry points.
- Single-line title links were below the `2rem` target now used across archive and tag listing titles.
- The fix should not change the image rhythm, masonry-like hierarchy, or dark photography palette.

Changes:

- Made `.photo-tile h3 a` and `.archive-card h3 a` inline-flex.
- Added a `2rem` minimum height to photography card title links.
- Preserved card imagery, archive grid, metadata, and filter behavior.
- Bumped the app version to `0.0.35`.

Validation plan:

Results:

- Browser verification: selected and archive photography card title links now have a `32px` minimum height.
- Browser verification: `/photography/` has no horizontal overflow after the change.
- `npm run check:content-health` passed with `120 post(s) checked`, `0 error(s)`, and `0 warning(s)`.
- `npm run build` passed with `189 page(s) built in 1.70s`.
- `git diff --check` passed.
- `npm run check:security` still reports the known 5 vulnerabilities requiring breaking `npm audit fix --force` dependency changes.

## Round 33 - 2026-06-23 - Photography Topbar Targets

Evidence:

- Browser review: `/posts/2024-03-14-photography-uingbcmkfbq/` at `390x844`.
- Baseline measurement: `.photo-topbar__brand` measured `29px` high.
- Baseline measurement: photography topbar nav links measured `26px` high.

Findings:

- Photography detail uses a separate dark topbar, so the shared header target improvements do not apply there.
- The hero back link was already corrected to `32px`, leaving the topbar actions visually adjacent but harder to tap.
- The fix should preserve the fixed dark photography identity and not add explanatory copy or extra controls.

Changes:

- Added a `2rem` minimum height to `.photo-topbar__brand`.
- Added a `2rem` minimum height to `.photo-topbar__link`.
- Preserved the existing typography, spacing, active underline, and mobile menu.
- Bumped the app version to `0.0.34`.

Validation plan:

Results:

- Browser verification: photography topbar brand and nav links now measure `32px` high, with no horizontal overflow.
- Browser verification: the corrected work strip still has `0` `/posts/undefined/` links.
- `npm run check:content-health` passed with `120 post(s) checked`, `0 error(s)`, and `0 warning(s)`.
- `npm run build` passed with `189 page(s) built in 1.59s`.
- `git diff --check` passed.
- `npm run check:security` still reports the known 5 vulnerabilities requiring breaking `npm audit fix --force` dependency changes.

## Round 32 - 2026-06-23 - Photography Detail Work Strip Links

Evidence:

- Browser review: `/posts/2024-03-14-photography-uingbcmkfbq/` at `390x844`.
- Baseline measurement: the hero back link measured `26px` high.
- Baseline functional finding: the "More from this series" work-strip links rendered as `/posts/undefined/`.

Findings:

- Photography detail page had no horizontal overflow and the work strip was visually present.
- The work strip used `work.id` even though `photoCollection` provides `slug`, causing continuation links to break.
- The top back action also needed the same practical `2rem` target as other quiet navigation links.

Changes:

- Switched work-strip item hrefs from `work.id` to `work.slug`.
- Added a `2rem` minimum height to `.photo-hero__back`.
- Preserved immersive dark photography layout, rail behavior, and existing labels.
- Bumped the app version to `0.0.33`.

Validation plan:

Results:

- Browser verification: photography detail back link is `32px` high on mobile and desktop; work-strip links use real post slugs and no longer include `/posts/undefined/`.
- Browser verification: `/posts/2024-03-14-photography-uingbcmkfbq/` has no horizontal overflow after the change.
- `npm run check:content-health` passed with `120 post(s) checked`, `0 error(s)`, and `0 warning(s)`.
- `npm run build` passed with `189 page(s) built in 1.60s`.
- `git diff --check` passed.
- `npm run check:security` still reports the known 5 vulnerabilities requiring breaking `npm audit fix --force` dependency changes.

## Round 31 - 2026-06-23 - Articles Archive Title Targets

Evidence:

- Browser review: `/articles/` at `390x844` and `1440x900`.
- Baseline measurement: several mobile article-title links measured `29px` high; desktop title links were already `41px`.

Findings:

- Article archive had no horizontal overflow and retained its quiet text-first layout.
- Single-line mobile titles were below the `2rem` target used by other archive/list surfaces.
- The change should stay local to `/articles/` and not alter global entry styles.

Changes:

- Made `.articles-entry-title a` inline-flex with a `2rem` minimum height.
- Preserved article archive hierarchy, topic links, descriptions, and desktop rhythm.
- Bumped the app version to `0.0.32`.

Validation plan:

Results:

- Browser verification: `/articles/` title links now have a `32px` minimum height on mobile and at least `38px` on desktop, with no horizontal overflow.
- `npm run check:content-health`: passed, 120 posts scanned, 0 errors, 0 warnings.
- `npm run build`: passed, 189 pages built in 1.59s.
- `git diff --check`: passed.
- `npm run check:security`: still reports the same 5 remaining vulnerabilities that require breaking `npm audit fix --force`.

## Round 30 - 2026-06-23 - Tag Detail Back Link Target

Evidence:

- Browser review: `/tags/Sublime%20Text/` at `390x844` and `1440x900`.
- Baseline measurement: the `查看所有标签` back link measured `25px` high.

Findings:

- Tag detail title rows were improved in the previous round and the page had no horizontal overflow.
- The bottom back link remained a smaller plain-text action.
- It should match the practical target height used by other quiet navigation links.

Changes:

- Added a `2rem` minimum height to `.tag-back-link`.
- Preserved icon, label, color, hover/focus behavior, and page hierarchy.
- Bumped the app version to `0.0.31`.

Validation plan:

Results:

- Browser verification: `查看所有标签` now measures `32px` high at both `390x844` and `1440x900`, with no horizontal overflow.
- `npm run check:content-health`: passed, 120 posts scanned, 0 errors, 0 warnings.
- `npm run build`: passed, 189 pages built in 1.63s.
- `git diff --check`: passed.
- `npm run check:security`: still reports the same 5 remaining vulnerabilities that require breaking `npm audit fix --force`.

## Round 29 - 2026-06-23 - Tag Detail Title Targets

Evidence:

- Browser review: `/tags/摄影/` and `/tags/Sublime%20Text/` at `390x844`.
- Baseline measurement: several tag-detail title links measured `30px` high while longer wrapped titles were already taller.

Findings:

- Tag detail pages had no horizontal overflow and preserved their article/photo distinction.
- Single-line title links were slightly below the `2rem` target now used across archive-style navigation.
- The fix should be scoped to tag detail rows and avoid global entry-style churn.

Changes:

- Made `.tag-entry__body .entry-title a` inline-flex with a `2rem` minimum height.
- Preserved photography thumbnails, ordinary article rows, and tag detail hierarchy.
- Bumped the app version to `0.0.30`.

Validation plan:

Results:

- Browser verification: `/tags/摄影/` and `/tags/Sublime%20Text/` title links now have a `32px` minimum height on mobile, with no horizontal overflow.
- `npm run check:content-health`: passed, 120 posts scanned, 0 errors, 0 warnings.
- `npm run build`: passed, 189 pages built in 1.76s.
- `git diff --check`: passed.
- `npm run check:security`: still reports the same 5 remaining vulnerabilities that require breaking `npm audit fix --force`.

## Round 28 - 2026-06-23 - Paged Archive Title Targets

Evidence:

- Browser review: `/page/2/` at `390x844` and `1440x900`.
- Baseline measurement: pagination controls were healthy at `37-39px`, but several mobile archive title links measured `29px` high.

Findings:

- The paged archive had no horizontal overflow and compact pagination stayed usable.
- Mobile post-title links in the archive stream were still slightly below the practical `2rem` target.
- The change should stay local to the paged archive to avoid touching global entry styles or unrelated user changes.

Changes:

- Added a local `.archive-stream` class to the paged archive list.
- Made `.archive-stream .entry-title a` inline-flex with a `2rem` minimum height.
- Preserved pagination, entry copy, and global entry styling elsewhere.
- Bumped the app version to `0.0.29`.

Validation plan:

Results:

- Browser verification: `/page/2/` archive title links now have a `32px` minimum height on mobile and at least `38px` on desktop, with no horizontal overflow.
- `npm run check:content-health`: passed, 120 posts scanned, 0 errors, 0 warnings.
- `npm run build`: passed, 189 pages built in 1.79s.
- `git diff --check`: passed.
- `npm run check:security`: still reports the same 5 remaining vulnerabilities that require breaking `npm audit fix --force`.

## Round 27 - 2026-06-23 - About Short Link Width

Evidence:

- Browser review: `/about/` at `390x844` and `1440x900`.
- Baseline measurement: Elsewhere links measured `32px` high, but the short `RSS` link measured only `30px` wide.

Findings:

- About page had no horizontal overflow and the Elsewhere row kept its quiet inline rhythm.
- Short labels were still slightly narrow as tap/click targets even after the height improvement.
- The row should keep its text-separated style while giving short labels a practical minimum width.

Changes:

- Added a `2rem` minimum width and centered content to `.about-row a`.
- Preserved existing text, separators, link destinations, and row layout.
- Bumped the app version to `0.0.28`.

Validation plan:

Results:

- Browser verification: `RSS` now measures `32x32`; other About links remain at least `32px` high, with no horizontal overflow at `390x844` or `1440x900`.
- `npm run check:content-health`: passed, 120 posts scanned, 0 errors, 0 warnings.
- `npm run build`: passed, 189 pages built in 1.52s.
- `git diff --check`: passed.
- `npm run check:security`: still reports the same 5 remaining vulnerabilities that require breaking `npm audit fix --force`.

## Round 26 - 2026-06-23 - Header Brand Home Target

Evidence:

- Browser review: `/articles/` at `390x844` and `1440x900`.
- Baseline measurement: the header brand home link measured `28px` high on both mobile and desktop.

Findings:

- Header navigation and controls were now consistently easier to target.
- The brand link remained slightly smaller than the rest of the header hit areas despite being the primary home affordance.
- The fix should keep the brand visually unchanged while aligning its practical target height.

Changes:

- Added a `2rem` minimum height to `.spotlight-header__brand`.
- Preserved icon size, text styling, spacing, and site-brand view transition name.
- Bumped the app version to `0.0.27`.

Validation plan:

Results:

- Browser verification: header brand home link now measures `32px` high at both `390x844` and `1440x900`, with no horizontal overflow.
- `npm run check:content-health`: passed, 120 posts scanned, 0 errors, 0 warnings.
- `npm run build`: passed, 189 pages built in 1.66s.
- `git diff --check`: passed.
- `npm run check:security`: still reports the same 5 remaining vulnerabilities that require breaking `npm audit fix --force`.

## Round 25 - 2026-06-23 - Desktop Header Navigation Targets

Evidence:

- Browser review: `/`, `/articles/`, `/tags/`, `/about/`, and `/portfolio/` at `1440x900`.
- Baseline measurement: desktop header navigation links measured `20px` high while the brand measured `28px`.

Findings:

- The desktop header had no horizontal overflow and active states were visually clear.
- Main navigation was still using raw text-height targets, while mobile header controls and lower-page utilities had already been improved.
- Desktop navigation should remain quiet text, but with a more practical click height.

Changes:

- Added a `2rem` minimum height to `.spotlight-header__link`.
- Preserved the existing active underline, icon treatment, spacing, mobile menu, and theme toggle behavior.
- Bumped the app version to `0.0.26`.

Validation plan:

Results:

- Browser verification: desktop header navigation links now measure `32px` high across `/`, `/articles/`, `/tags/`, `/about/`, `/portfolio/`, and `/photography/`, with no horizontal overflow.
- `npm run check:content-health`: passed, 120 posts scanned, 0 errors, 0 warnings.
- `npm run build`: passed, 189 pages built in 1.66s.
- `git diff --check`: passed.
- `npm run check:security`: still reports the same 5 remaining vulnerabilities that require breaking `npm audit fix --force`.

## Round 24 - 2026-06-23 - Article Metadata Archive Link

Evidence:

- Browser review: `/posts/issues-on-macos-gem-rmagick/` at `390x844` and `1440x900`.
- Baseline measurement: the article marginalia `Archive -> Notes` link measured `15px` on mobile and `16px` on desktop.

Findings:

- Article detail had no horizontal overflow and the primary reading flow remained stable.
- The marginalia archive link was visually quiet but too close to raw text height.
- This supporting link should align with the practical hit area applied to other article utility links.

Changes:

- Added inline-flex alignment and `2rem` minimum height to `.article-marginalia a`.
- Preserved article metadata layout, labels, typography, and body spacing.
- Bumped the app version to `0.0.25`.

Validation plan:

Results:

- Browser verification: article marginalia `Notes` archive link now measures `32px` high at both `390x844` and `1440x900`, with no horizontal overflow.
- `npm run check:content-health`: passed, 120 posts scanned, 0 errors, 0 warnings.
- `npm run build`: passed, 189 pages built in 2.26s.
- `git diff --check`: passed.
- `npm run check:security`: still reports the same 5 remaining vulnerabilities that require breaking `npm audit fix --force`.

## Round 23 - 2026-06-23 - Portfolio Site Link Targets

Evidence:

- Browser review: `/portfolio/` at `390x844` and `1440x900`.
- Baseline measurement: the two project cards were already full-card links, but the three "Joey's Notes" auxiliary links measured `26px` high.

Findings:

- The Portfolio page matched the calmer semantic theme and had no horizontal overflow.
- The secondary site links were useful but still used plain text-height targets, unlike the freshly improved footer and utility links.
- These links should remain quiet supporting navigation, not become prominent buttons.

Changes:

- Added inline-flex alignment and `2rem` minimum height to `.portfolio-site__links a`.
- Added subtle underline/focus states with the existing accent variable.
- Preserved Portfolio copy, project card behavior, and layout hierarchy.
- Bumped the app version to `0.0.24`.

Validation plan:

Results:

- Browser verification: Portfolio site links now measure `32px` high at both `390x844` and `1440x900`, with no horizontal overflow.
- `npm run check:content-health`: passed, 120 posts scanned, 0 errors, 0 warnings.
- `npm run build`: passed, 189 pages built in 1.60s.
- `git diff --check`: passed.
- `npm run check:security`: still reports the same 5 remaining vulnerabilities that require breaking `npm audit fix --force`.

## Round 22 - 2026-06-23 - Footer Link Tap Areas

Evidence:

- Browser review: `/tags/`, `/about/`, `/offline/`, `/portfolio/`, and `/articles/` at `390x844`.
- Baseline measurement: all shared footer navigation and subscription links measured `20px` high.

Findings:

- The footer already uses a quiet text-first layout and did not overflow horizontally.
- Its repeated links were visually readable but still smaller than the improved mobile utility link target used elsewhere.
- This shared component should be easier to tap while staying typographic rather than becoming a button block.

Changes:

- Added a shared `.footer-link` style with `2rem` minimum height and inline-flex alignment.
- Added subtle underline/focus states using existing semantic accent variables.
- Preserved footer copy, IA, layout, and inverse photography footer behavior.
- Tightened the photography filter row containment after the Browser pass caught a mobile horizontal overflow from the previous round's scroll row.
- Bumped the app version to `0.0.23`.

Validation plan:

Results:

- Browser verification: shared footer links now measure `32px` high across `/tags/`, `/about/`, `/offline/`, `/portfolio/`, `/articles/`, and `/photography/` at `390x844`.
- Browser verification: `/photography/` now reports `scrollWidth === clientWidth === 390`; the filter row keeps its own internal scroll width without page overflow.
- `npm run check:content-health`: passed, 120 posts scanned, 0 errors, 0 warnings.
- `npm run build`: passed, 189 pages built in 1.64s.
- `git diff --check`: passed.
- `npm run check:security`: still reports the same 5 remaining vulnerabilities that require breaking `npm audit fix --force`.

## Round 21 - 2026-06-23 - Photography Filter Hit Areas

Evidence:

- Browser review: in-app Browser opened the local site and inspected `/`, `/articles/`, `/tags/`, `/about/`, `/portfolio/`, `/offline/`, `/photography/`, a normal article detail, and a photography detail page.
- Browser viewport pass: `390x844` and `1440x900`.
- Browser screenshot fallback note: the Browser route/DOM pass worked, but the current tab wrapper did not expose a screenshot method, so this round used Browser measurements for the decision and kept Playwright/Chrome screenshot fallback available for later rounds.

Findings:

- The photography archive had no horizontal overflow and kept its locked-dark identity.
- The filter index on `/photography/` measured around `26px` high and read like loose inline text, making the mobile filter affordance weaker than the rest of the refined navigation.
- The filter should remain quiet and static, but needs a practical hit area, visible active state, and mobile overflow protection.

Changes:

- Reworked the photography filter index into low-contrast rounded filter chips with a `2.5rem` minimum height.
- Added hover, focus-visible, and active states without adding explanatory copy or heavier client behavior.
- Added mobile horizontal overflow handling for the filter row so all categories remain reachable at `390px`.
- Bumped the app version to `0.0.22`.

Validation plan:

Results:

- Browser verification: mobile filter links now measure `44px` high; desktop filter links measure `40px`; no horizontal page overflow at `390x844` or `1440x900`.
- `npm run check:content-health`: passed, 120 posts scanned, 0 errors, 0 warnings.
- `npm run build`: passed, 189 pages built in 1.68s.
- `git diff --check`: passed.
- `npm run check:security`: still reports the same 5 remaining vulnerabilities that require breaking `npm audit fix --force`.

## Round 20 - 2026-06-23 - Article Utility Link Hit Areas

Evidence:

- Baseline measurement: article detail top back link measured `20px` high on mobile.
- Final screenshots: `/private/tmp/oiahoon-uiux-round-20-after/`
- Reviewed route: `/posts/2026-05-01-agentic-coding-context-system/`
- Viewports: `390x844`, `1440x900`

Findings:

- Article detail layout had no horizontal overflow after the earlier header-density work.
- The top back link and article tag utility links used quiet inline sizing that was smaller than the recent mobile target improvements.
- These utility links should remain understated but easier to tap.

Changes:

- Added a `2rem` minimum height to article back links and article tag links.
- Preserved existing labels, icons, spacing rhythm, and article body layout.
- Bumped the app version to `0.0.21`.
- Added an agent design-system note for practical tap areas on article utility navigation.

Validation plan:

Results:

- Final screenshots: `/private/tmp/oiahoon-uiux-round-20-after/`
- Top article back link now measures `159x32`; article tag links also measure `32px` high.
- Mobile article body still enters at `proseTop=605px`; no horizontal overflow or offscreen offenders at `390x844` or `1440x900`.
- `npm run check:content-health`: passed, 120 posts scanned, 0 errors, 0 warnings.
- `npm run build`: passed, 189 pages built in 1.36s.
- `git diff --check`: passed.
- `npm run check:security`: still reports the same 5 remaining vulnerabilities that require breaking `npm audit fix --force`.

## Round 19 - 2026-06-23 - About Utility Link Hit Areas

Evidence:

- Baseline measurement: `/about/` mobile Elsewhere links measured `18px` high.
- Final screenshots: `/private/tmp/oiahoon-uiux-round-19-after/`
- Reviewed route: `/about/`
- Viewports: `390x844`, `1440x900`

Findings:

- About page layout had no horizontal overflow.
- The Elsewhere links were quiet and readable, but their hit areas were only normal text height on mobile.
- The links should be easier to tap without turning the row into buttons or adding explanatory copy.

Changes:

- Made About row links inline-flex with a `2rem` minimum height.
- Preserved the existing text style, separators, labels, and link destinations.
- Bumped the app version to `0.0.20`.
- Added an agent design-system note for larger mobile hit areas on quiet inline utility links.

Validation plan:

Results:

- Final screenshots: `/private/tmp/oiahoon-uiux-round-19-after/`
- GitHub, Weibo, RSS, and Email links now measure `32px` high on both mobile and desktop checks.
- No horizontal overflow or offscreen offenders at `390x844` or `1440x900`.
- `npm run check:content-health`: passed, 120 posts scanned, 0 errors, 0 warnings.
- `npm run build`: passed, 189 pages built in 1.36s.
- `git diff --check`: passed.
- `npm run check:security`: still reports the same 5 remaining vulnerabilities that require breaking `npm audit fix --force`.

## Round 18 - 2026-06-23 - Mobile Header Touch Targets

Evidence:

- Baseline screenshots: `/private/tmp/oiahoon-uiux-round-18/articles-menu-open-390x844.png`
- Final screenshots: `/private/tmp/oiahoon-uiux-round-18-after/`
- Reviewed route: `/articles/` with the mobile navigation menu open
- Viewport: `390x844`

Findings:

- The mobile menu opened without horizontal overflow.
- Header controls were slightly undersized for touch: theme toggle was `70x30`, menu toggle was `42x40`, and menu links were `142x36`.
- The fix should improve touch comfort without adding visible instruction copy or heavier navigation behavior.

Changes:

- Increased mobile header theme toggle height to `44px`.
- Increased menu toggle and menu item heights to `44px`.
- Preserved the existing details/summary menu behavior and static link structure.
- Bumped the app version to `0.0.19`.
- Added an agent design-system note for comfortable mobile header touch targets.

Validation plan:

Results:

- Final screenshot: `/private/tmp/oiahoon-uiux-round-18-after/articles-menu-open-390x844.png`
- Theme button is now `73x44`, menu toggle is `44x44`, and all three menu links are `142x44`.
- Menu-open state still has no horizontal overflow or offscreen offenders.
- `npm run check:content-health`: passed, 120 posts scanned, 0 errors, 0 warnings.
- `npm run build`: passed, 189 pages built in 1.42s.
- `git diff --check`: passed.
- `npm run check:security`: still reports the same 5 remaining vulnerabilities that require breaking `npm audit fix --force`.

## Round 17 - 2026-06-23 - Offline State Position

Evidence:

- Baseline screenshots: `/private/tmp/oiahoon-uiux-round-13/offline-390x844.png`, `/private/tmp/oiahoon-uiux-round-13/offline-1440x900.png`
- Final screenshots: `/private/tmp/oiahoon-uiux-round-17-after/`
- Reviewed route: `/offline/`
- Viewports: `390x844`, `1440x900`

Findings:

- The offline page was already simple and had no horizontal overflow.
- On phones, the state block sat a little too deep in the viewport, adding empty waiting space before the actual offline message.
- The status page should surface the state promptly without becoming a card or feature explanation.

Changes:

- Moved the offline state block slightly upward with a lighter section height and top padding.
- Tightened action spacing while preserving the reload and home actions.
- Bumped the app version to `0.0.18`.
- Added an agent design-system note that status pages should surface state promptly.

Validation plan:

Results:

- Final screenshots: `/private/tmp/oiahoon-uiux-round-17-after/`
- Mobile offline state top is `263px`; action controls remain fully in the first viewport with `actionsBottom=514px`.
- Desktop state also moves upward and keeps 2 actions visible.
- No horizontal overflow or offscreen offenders at `390x844` or `1440x900`.
- `npm run check:content-health`: passed, 120 posts scanned, 0 errors, 0 warnings.
- `npm run build`: passed, 189 pages built in 1.45s.
- `git diff --check`: passed.
- `npm run check:security`: still reports the same 5 remaining vulnerabilities that require breaking `npm audit fix --force`.

## Round 16 - 2026-06-23 - Article Archive Index Rhythm

Evidence:

- Baseline screenshots: `/private/tmp/oiahoon-uiux-round-15/articles-390x844.png`, `/private/tmp/oiahoon-uiux-round-15/articles-1440x900.png`
- Final screenshots: `/private/tmp/oiahoon-uiux-round-16-after/`
- Reviewed route: `/articles/`
- Viewports: `390x844`, `1440x900`

Findings:

- The article archive had no horizontal overflow.
- Desktop article archive still felt too much like a centered hero page, with the first article starting at `561px`.
- Articles should stay text-first and scannable, visually quieter than photography-led pages.

Changes:

- Left-aligned the article archive hero, lede, and topic-link row.
- Reduced article archive title scale, especially on desktop and long mobile wraps.
- Preserved the 8 topic links and the existing article stream content.
- Bumped the app version to `0.0.17`.
- Added an agent design-system note that article archive headings should stay quieter than photography and support quick list scanning.

Validation plan:

Results:

- Final screenshots: `/private/tmp/oiahoon-uiux-round-16-after/`
- First article now starts at `510px` on `390x844` and `535px` on `1440x900`.
- All 8 topic links remain visible, and no horizontal overflow or offscreen offenders were detected.
- `npm run check:content-health`: passed, 120 posts scanned, 0 errors, 0 warnings.
- `npm run build`: passed, 189 pages built in 1.43s.
- `git diff --check`: passed.
- `npm run check:security`: still reports the same 5 remaining vulnerabilities that require breaking `npm audit fix --force`.

## Round 15 - 2026-06-23 - Tag List Rendering Containment

Evidence:

- Baseline screenshots: `/private/tmp/oiahoon-uiux-round-15/`
- Final screenshots: `/private/tmp/oiahoon-uiux-round-15-after/`
- Reviewed routes: `/tags/摄影/`, `/tags/Notes/`, `/page/2/`, `/articles/`, `/`
- Viewports: `390x844`, `1440x900`

Findings:

- The checked list and index routes had no horizontal overflow.
- Photography tag detail is a long normal-page list with 109 entries and thumbnail media.
- The visual layout was already stable, so the best improvement was to reduce offscreen rendering work without adding client-side behavior.

Changes:

- Added native `content-visibility: auto` and `contain-intrinsic-size` to tag detail entries.
- Preserved the existing static HTML, progressive image markup, row layout, and tag counts.
- Bumped the app version to `0.0.16`.
- Added an agent design-system note to prefer native containment or lazy media for long lists before client-side behavior.

Validation plan:

Results:

- Final screenshots: `/private/tmp/oiahoon-uiux-round-15-after/`
- `/tags/摄影/` still renders 109 entries and `/tags/Notes/` still renders 11 entries.
- `content-visibility: auto` and `contain-intrinsic-size: auto 128px` are active on tag entries.
- No horizontal overflow or offscreen offenders at `390x844` or `1440x900`.
- `npm run check:content-health`: passed, 120 posts scanned, 0 errors, 0 warnings.
- `npm run build`: passed, 189 pages built in 1.45s.
- `git diff --check`: passed.
- `npm run check:security`: still reports the same 5 remaining vulnerabilities that require breaking `npm audit fix --force`.

## Round 14 - 2026-06-23 - Mobile Article Header Density

Evidence:

- Baseline screenshots: `/private/tmp/oiahoon-uiux-round-13/article-detail-390x844.png`, `/private/tmp/oiahoon-uiux-round-13/article-detail-1440x900.png`
- Final screenshots: `/private/tmp/oiahoon-uiux-round-14-after/`
- Reviewed route: `/posts/2026-05-01-agentic-coding-context-system/`
- Viewports: `390x844`, `1440x900`

Findings:

- Article detail pages had no horizontal overflow.
- On mobile, the article header and marginalia pushed the body text too far down the first screen.
- The first tuning pass made the long Chinese/English mixed title wrap into too many lines, so title scale needed to be reduced as part of the density fix.

Changes:

- Added mobile-only article header rules for tighter header spacing, marginalia spacing, and prose entry spacing.
- Reduced mobile article title scale for long mixed-language titles while leaving desktop article layout unchanged.
- Preserved the back link, date, author, filed tags, archive link, and reading progress.
- Bumped the app version to `0.0.15`.
- Added an agent design-system note that mobile article headers should let body text enter quickly without removing publication context.

Validation plan:

Results:

- Final screenshots: `/private/tmp/oiahoon-uiux-round-14-after/`
- Mobile article body now starts at `596px`; title height is `109px`, and all 4 marginalia items remain visible.
- Desktop article metrics stayed stable, with `proseTop=555px` and no horizontal overflow.
- `npm run check:content-health`: passed, 120 posts scanned, 0 errors, 0 warnings.
- `npm run build`: passed, 189 pages built in 1.38s.
- `git diff --check`: passed.
- `npm run check:security`: still reports the same 5 remaining vulnerabilities that require breaking `npm audit fix --force`.

## Round 13 - 2026-06-23 - About Page Scale

Evidence:

- Baseline screenshots: `/private/tmp/oiahoon-uiux-round-13/`
- Final screenshots: `/private/tmp/oiahoon-uiux-round-13-after/`
- Reviewed routes: `/`, `/articles/`, `/tags/`, `/about/`, `/portfolio/`, `/offline/`, `/photography/`, `/posts/2026-05-01-agentic-coding-context-system/`
- Viewports: `390x844`, `1440x900`

Findings:

- The checked routes had no horizontal overflow.
- `/about/` used a much larger identity title than the rest of the normal text-first pages.
- On desktop, the About title measured `213px` tall and made the page feel more like a poster than a readable personal information page.

Changes:

- Reduced About page title scale, lede scale, and top rhythm while preserving the portrait and all profile content.
- Slightly rebalanced the desktop grid so the image column remains present without overpowering the profile rows.
- Bumped the app version to `0.0.14`.
- Added an agent design-system note that About should remain personal and readable rather than more dominant than article or photography surfaces.

Validation plan:

Results:

- About final screenshots: `/private/tmp/oiahoon-uiux-round-13-after/`
- About desktop title height dropped from `213px` to `86px`; mobile title height is `52px`.
- `/about/` has no horizontal overflow at `390x844` or `1440x900`; no offscreen offenders were detected.
- `npm run check:content-health`: passed, 120 posts scanned, 0 errors, 0 warnings.
- `npm run build`: passed, 189 pages built in 1.36s.
- `git diff --check`: passed.
- `npm run check:security`: still reports the same 5 remaining vulnerabilities that require breaking `npm audit fix --force`.

## Round 12 - 2026-06-23 - Portfolio Theme Cohesion

Evidence:

- Baseline screenshots: `/private/tmp/oiahoon-uiux-round-12/`, `/private/tmp/oiahoon-uiux-round-12-browser/`
- Reviewed routes: `/`, `/articles/`, `/tags/`, `/portfolio/`
- Viewports: `390x844`, `1440x900`

Findings:

- Ordinary dark theme pages had no horizontal overflow.
- `/portfolio/` still used a separate Tailwind zinc color layer and card styling instead of the site's design variables.
- The route felt slightly detached from the rest of the calm paper/dark theme system.

Changes:

- Reworked `/portfolio/` onto local semantic classes backed by `var(--text)`, `var(--muted)`, `var(--surface)`, `var(--line)`, and `var(--accent)`.
- Preserved the existing project content, external links, and two-card structure.
- Bumped the app version to `0.0.13`.

Validation plan:

Results:

- Final screenshots: `/private/tmp/oiahoon-uiux-round-12-after/`
- Portfolio dark theme: no horizontal overflow at `390x844` or `1440x900`; `scrollWidth` equals `clientWidth` in both viewports.
- Project structure stayed intact with 2 external project cards and 3 site links.
- Portfolio cards now render from site semantic variables, with dark card background `color(srgb 0.0980392 0.0941176 0.0862745 / 0.68)` and no offscreen offenders.
- `npm run check:content-health`: passed, 120 posts scanned, 0 errors, 0 warnings.
- `npm run build`: passed, 189 pages built in 1.36s.
- `git diff --check`: passed.
- `npm run check:security`: still reports the same 5 remaining vulnerabilities that require breaking `npm audit fix --force`.

## Round 11 - 2026-06-22 - Lightbox Dynamic Thumbnail Styling

Evidence:

- Baseline screenshots: `/private/tmp/oiahoon-uiux-round-11/`
- Reviewed route: `/posts/2024-03-14-photography-uingbcmkfbq/`
- Viewports: `1440x900`, `390x844`

Findings:

- Lightbox open/close behavior, focus restore, Esc close, and scroll locking worked.
- On mobile, the dynamically created lightbox thumbnail was unstyled and appeared as a second large duplicate image.
- The thumb nodes are created by client script, so scoped Astro selectors did not apply to them.

Changes:

- Converted lightbox thumbnail selectors to `:global(...)` so dynamically inserted thumb buttons and images receive size, crop, and active-state styling.
- Preserved the existing lightbox interaction model and multi-photo thumbnail support.
- Bumped the app version to `0.0.12`.

Validation plan:

Results:

- Final screenshots: `/private/tmp/oiahoon-uiux-round-11-after/`
- Lightbox thumbnail styling: mobile thumb is `51x64`, desktop thumb is `62x78`, and the duplicate large thumbnail image is gone.
- Lightbox still focuses the close button, locks page scroll while open, restores focus to the opener after Esc, and keeps page `scrollWidth` equal to viewport width.
- `npm run check:content-health`: passed, 120 posts scanned, 0 errors, 0 warnings.
- `npm run build`: passed, 189 pages built in 1.37s.
- `git diff --check`: passed.
- `npm run check:security`: still reports the same 5 remaining vulnerabilities that require breaking `npm audit fix --force`.

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
