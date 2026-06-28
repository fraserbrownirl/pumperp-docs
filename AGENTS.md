# AGENTS.md

Fast briefing for AI agents editing **pumperp-docs**. Full detail lives in `content/docs/`.

## What pumperp is

Base-native **Fission fork**: Clanker v4 token launches → LP fees (USDC) → autonomous engine → Avantis perp desks + buyback & burn (**PUM** + creator tokens). No vaults. Creator upside is deflationary buyback from desk profits, not cash LP fees (though a configurable **creator USDC** leg exists).

## Key invariants

- **Chain:** Base mainnet
- **Launch:** Clanker SDK v4, USDC pool, one-step deploy + registry enroll
- **Fee split:** Fixed **5% PUM** + user allocates **95%** across DIEM / perp-agent / creator (`TokenRewardSplit`)
- **Perps:** Avantis via `avantis.ts` — USDC collateral, tx-builder API, max ~75× leverage
- **Desks:** Per-token (not pooled buckets); agent picks market/side at open
- **Legacy:** `FEE_SPLIT` 70/30 and GMX in plan doc v7 are **historical** — do not document as live behavior
- **Persistence:** `ProtocolRegistry.sol` onchain; engine queues in memory (`state.ts`)

## Workers (backend)

`fee-claimer`, `desk-manager`, `buyback-engine`, `creator-buyback`, `diem-engine`, `desk-risk`, `profit-checker`, `price-sampler`

## This repo

Next.js + Fumadocs. Content in `content/docs/`. LLM features: action bar, section menus, `/llms.txt`, `/llms-full.txt`, raw `.md` routes.

When editing: valid frontmatter, `pnpm check:frontmatter`, `pnpm build`.

Env: `NEXT_PUBLIC_DOCS_BASE_URL=https://docs.pumperp.com`

App repo AGENTS: `pumperp/AGENTS.md`
