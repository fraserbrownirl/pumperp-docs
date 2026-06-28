# pumperp-docs

Documentation for [pumperp](https://pumperp.com) — perpetual-backed Clanker tokens on Base.

Hosted at [docs.pumperp.com](https://docs.pumperp.com).

## Features

- Next.js 16 App Router + React 19 + TypeScript strict
- [Fumadocs](https://fumadocs.dev) for MDX content, sidebar, search, TOC
- Tailwind CSS v4 with Base-blue brand tokens
- LLM-friendly UX:
  - Per-page action bar: Copy as Markdown, View Raw, Open in ChatGPT / Claude / Perplexity / Grok
  - Per-section menu on every `##` and `###` heading
  - Raw markdown at `<path>.md`
  - `/llms.txt` page index
  - `/llms-full.txt` full corpus

## Run locally

```bash
cp .env.example .env.local
pnpm install
pnpm dev
```

Open <http://localhost:3000>.

## Adding a page

1. Create `content/docs/<section>/<page>.mdx` with frontmatter (`title`, `description`, `llmDescription`).
2. Add the page to the relevant `meta.json`.
3. Run `pnpm check:frontmatter && pnpm build`.

See [Contributing](/contributing) in the docs site.

## Configuration

| Env var | Purpose |
| --- | --- |
| `NEXT_PUBLIC_DOCS_BASE_URL` | Production URL for LLM prompts and `llms.txt` |
| `NEXT_PUBLIC_GITHUB_REPO_URL` | GitHub blob links for "View on GitHub" |
| `NEXT_PUBLIC_GITHUB_BRANCH` | Branch for source links (default `main`) |

## Related repos

| Repo | Role |
| --- | --- |
| [fraserbrown/pumperp](https://github.com/fraserbrown/pumperp) | App, backend, contracts |
| `pumperp-docs` (this repo) | Documentation site |
