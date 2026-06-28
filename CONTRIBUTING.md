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

Do not document GMX or pooled-bucket behavior from the historical plan doc — the live stack uses **Avantis** and **per-token desks**.
