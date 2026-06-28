# Contributing to pumperp Docs

Edit `content/docs/**/*.mdx` and open PRs against this repo.

## Workflow

1. Fork / branch
2. Edit MDX with valid frontmatter
3. Update `meta.json` sidebar entries
4. `pnpm check:frontmatter && pnpm build`
5. Open PR

## Frontmatter

```yaml
---
title: Page Title
description: "One line for humans"
llmDescription: "Dense summary for /llms.txt — mechanisms, invariants, names."
---
```

## Product source of truth

Implementation lives in [pumperp](https://github.com/fraserbrown/pumperp). When code changes, update docs in the same release cycle.

Do not document legacy assumptions the codebase has moved past:

- GMX, pooled buckets, `FEE_SPLIT` 70/30 (historical plan / Fission Solana)
- `CLANKER_API_KEY` or `ONEINCH_API_KEY` as required (unused in `backend/src`)
- Jupiter / 1inch as live swap/perp venues

Verify env vars and workers against `pumperp/backend/src` before publishing.
