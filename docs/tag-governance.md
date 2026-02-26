# Tag Governance

## Goal

Keep tags consistent across the blog so filtering and discovery remain clear.

## Rules

- Trim whitespace before saving tags.
- Keep canonical capitalization for English tags.
- Prefer one canonical label for the same concept.
- Use Chinese tags for Chinese-first content unless an English industry term is standard.

## Current Normalization Map

Managed in `scripts/tag-governance.json`.

- `docker` -> `Docker`
- `mac` -> `Mac`
- `elasticsearch` -> `Elasticsearch`
- `kibana` -> `Kibana`
- `logstash` -> `Logstash`

## Validation Workflow

```bash
npm run check:content-health
npm run report:content-health
```

The generated report is stored in `docs/content-health-report.md`.
