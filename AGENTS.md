# AGENTS.md

Fast briefing for AI agents editing **pumperp-docs**. Full detail lives in `content/docs/`.

## What pumperp is

Base-native **Fission fork**: Clanker v4 token launches → LP fees (USDC) → autonomous engine → Avantis perp desks + buyback & burn (**PUM** + creator tokens). No vaults. Creator upside is deflationary buyback from desk profits, not cash LP fees (though a configurable **creator USDC** leg exists).

## Key invariants

- **Chain:** Base mainnet
- **Launch:** Clanker SDK v4 onchain (protocol wallet) — **no Clanker API key**
- **Swaps:** Uniswap v3/v4 on Base — **no 1inch API key** in production paths
- **Fee split:** Fixed **5% PUM** + user allocates **95%** across DIEM / perp-agent / creator (`TokenRewardSplit`)
- **Perps:** Avantis via `avantis.ts` — USDC collateral, tx-builder API, max ~75× leverage
- **Desks:** Per-token; agent = Venice LLM first, momentum signals fallback
- **Legacy — do not document as live:** GMX, pooled buckets, `FEE_SPLIT` 70/30, `CLANKER_API_KEY`, `ONEINCH_API_KEY`, Fission Jupiter/Pump.fun mechanics except as historical contrast
- **Persistence:** `ProtocolRegistry.sol` onchain; engine queues in memory (`state.ts`)

## Workers (backend)

`fee-claimer`, `desk-manager`, `buyback-engine`, `creator-buyback`, `diem-engine`, `desk-risk`, `profit-checker`, `price-sampler`

## Real secrets (backend)

| Var | Notes |
| --- | --- |
| `PROTOCOL_PRIVATE_KEY` | Required |
| `VENICE_API_KEY` | Optional; desk LLM |
| `PINATA_JWT` | Optional; launch images |
| `NEYNAR_API_KEY` | Optional; Farcaster |

## This repo

Next.js + Fumadocs. Content in `content/docs/`. LLM features: action bar, section menus, `/llms.txt`, `/llms-full.txt`, raw `.md` routes.

When editing: verify against `pumperp/backend/src`, valid frontmatter, `pnpm check:frontmatter`, `pnpm build`.

Env: `NEXT_PUBLIC_DOCS_BASE_URL=https://docs.pumperp.com`

App repo: `fraserbrown/pumperp` (or user's fork)
