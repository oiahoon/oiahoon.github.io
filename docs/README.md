# Joey's Notes Documentation

**Project:** Joey's Notes - Modern Astro Blog  
**Status:** Active / Improving  
**Last Updated:** 2026-02-26

## Current Baseline (Source of Truth)

This document is the single baseline entry for current project status. Metrics below are validated from local build output.

### Verified Metrics

| Metric | Current Value | Verified By | Date |
|---|---:|---|---|
| Build Time | 2.43s | `npm run build` | 2026-02-26 |
| Pages Generated | 67 | `npm run build` | 2026-02-26 |
| Build Result | Success | `npm run build` | 2026-02-26 |

### Verification Command

```bash
npm run build
```

## Documentation Map

### Planning & Progress
- **[Project Analysis and Improvement Plan](project-analysis-and-improvement-plan.md)** - execution plan and priorities
- **[Improvement Progress](improvement-progress.md)** - ongoing implementation log and status board

### Historical Records (Archive)
- **[Phase 1 Progress](phase1-progress.md)** - historical migration/setup record (2025-10)
- **[Phase 2 Progress](phase2-progress.md)** - historical implementation record (2025-10)
- **[Phase 3 Progress](phase3-progress.md)** - historical optimization/deployment record (2025-10)

### Feature and Operation Docs
- **[Photography Feature Implementation](photography-feature-implementation.md)**
- **[Content Management Guide](content-management-guide.md)**
- **[Build and Deployment Guide](build-and-deployment-guide.md)**

## Current Improvement Focus

1. **Documentation Baseline Alignment**: remove conflicting numbers and stale status claims.
2. **Technical Debt Reduction**: clean legacy styles and redundant layout structure.
3. **UI/UX Redesign**: modern, minimal, faster-to-read information architecture.
4. **Workflow Hardening**: improve content automation and quality checks.

## Quality Gates

- CI workflow: `.github/workflows/quality-gates.yml`
- Local check:
  - `npm run build`
  - `npm run check:docs-baseline`

## Note on Historical Numbers

Some historical docs contain older numbers such as 48/52 pages and older build timings. Treat those files as historical snapshots, not current status.
