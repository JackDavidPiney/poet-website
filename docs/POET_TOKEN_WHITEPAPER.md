# $POET Whitepaper

**Version 1.0 — February 2026**

---

## 1. Introduction

Poet builds tools and strategies for quantitative and discretionary traders. The platform exists because most trading tools are either buried behind paywalls, bloated with features nobody asked for, or missing the metrics that actually matter.

$POET is the native token of the Poet platform, launched on Solana. It serves three functions: gating access to premium tools, funding ecosystem growth, and eventually enabling community governance over platform direction.

This document covers the token's design, allocation, utility, and roadmap.

---

## 2. The Problem

Traders operate in an environment where:

- Institutional-grade performance reporting requires expensive software or manual spreadsheet work.
- Most trade journaling tools are generic productivity apps repackaged with a trading skin.
- Strategy research is either paywalled by funds or scattered across low-quality forums.
- There is no unified platform that combines reporting tools, structured trade documentation, and validated strategy research under one roof.

Poet addresses this directly with purpose-built tools: a performance reporting tool for producing metrics that you, allocators and risk managers care about, a structured playbook for documenting and improving trading process, and researched strategies with transparent statistical backing.

---

## 3. Platform Overview

### 3.1 Factsheet Generator (Performance Reports) (Live - In Development)

Upload trade history as CSV. Get a professional performance factsheet with:

- Sharpe, Sortino, Calmar, MAR, and Sterling ratios
- Monthly and annual return tables
- Drawdown analysis (end-of-month and intramonth peak-to-valley)
- VAMI growth curves benchmarked against S&P 500
- Multi-strategy portfolio blending with configurable weights
- PDF export for distribution

This tool replicates the output that hedge funds and CTAs produce for investors — available to any trader with a CSV.

### 3.2 Playbook (Coming Soon - In Development)

A structured workspace for traders to document setups, journal decisions, and build a repeatable process. Features include:

- Setup library with entry triggers, validation/invalidation rules and tags, and target expectations
- Trade logger with screenshot uploads, execution notes, and psychology tracking
- Performance analytics by setup type, market regime, and timeframe
- Review dashboard for pattern recognition across execution history

Inspired by SMB Capital's methodology for systematic improvement of discretionary trading.

### 3.3 Strategy Research

Validated trading strategies with transparent data. Current research:

- **SOLUSDT Mean Reversion** — A reversal pattern in Solana markets.

Additional strategies are in development. All published strategies include backtesting data, statistical validation, and clear risk disclaimers.

---

## 4. Token Overview

| Parameter | Detail |
|---|---|
| Token Name | POET |
| Ticker | $POET |
| Blockchain | Solana |
| Total Supply | 1,000,000,000 (1 Billion) |
| Launch Platform | Jupiter Studio |
| Contract Address | `4jnqfSMWE1opwNT9m98s5QFKyNasypjeoieJsGsdjupx` |

---

## 5. Token Allocation

### 5.1 Distribution Summary

| Allocation | Tokens | % of Total | Status |
|---|---|---|---|
| Liquidity Pool | 500,000,000 | 50.0% | Live on Jupiter |
| Early Adopters & Airdrops | 100,000,000 | 10.0% | Vesting — 6 months |
| Platform Rewards | 100,000,000 | 10.0% | Vesting — 6 months |
| Ecosystem Incentives | 80,000,000 | 8.0% | Vesting — 6 months |
| Staking Rewards | 80,000,000 | 8.0% | Vesting — 6 months |
| Treasury / DAO Reserve | 60,000,000 | 6.0% | Vesting — 6 months |
| Contributors & Bounties | 40,000,000 | 4.0% | Vesting — 6 months |
| Founder | 40,000,000 | 4.0% | Vesting — 6 months + 24mo linear |

### 5.2 Allocation Details

**Liquidity Pool — 500M (50%)**
Deployed to Jupiter at launch. Provides trading liquidity for $POET from day one. This is the circulating supply.

**Early Adopters & Airdrops — 100M (10%)**
The largest vesting allocation. Reserved for retroactive rewards to early platform users, community members, and contributors who supported Poet before there was a token incentive to do so. Also funds future airdrop campaigns to drive adoption. Early adopters are the foundation — this allocation reflects that.

**Platform Rewards — 100M (10%)**
Distributed to active tool users over time. Generating Performance Reports, using Playbook, engaging with strategy research, and contributing to the platform should earn $POET. This is the core usage flywheel: reward engagement, drive adoption, increase platform value.

**Ecosystem Incentives — 80M (8%)**
Flexible allocation for growth: partnerships with other Solana projects, protocol integrations, influencer collaborations, co-marketing campaigns, hackathon prizes, and liquidity mining programs. Deployed as needed based on growth priorities.

**Staking Rewards — 80M (8%)**
Reserved for the staking program (see Section 7). Planned emission over 2–4 years on a declining schedule. Gives holders a reason to lock tokens rather than sell, reducing circulating supply pressure.

**Treasury / DAO Reserve — 60M (6%)**
Locked until governance is live. Controlled by token holders through governance votes. Intended for exchange listings, strategic partnerships, emergency reserves, and initiatives the community prioritizes. Not touched by the founder unilaterally.

**Contributors & Bounties — 40M (4%)**
Compensation for developers, researchers, content creators, and anyone who builds for Poet. Matches the founder allocation intentionally — signaling that builders are valued equally. Distributed via governance proposal.

**Founder — 40M (4%)**
Sole founder allocation. Subject to 24-month linear vesting (self-imposed) after the initial 6-month Jupiter Studio vest completes. Covers development costs and operational expenses. Kept deliberately small relative to community allocations.

### 5.3 Vesting Schedule

The 500M community allocation vests over 6 months through Jupiter Studio. After the vesting period, tokens are distributed according to their designated purpose.

The founder's 40M allocation has an additional 24-month linear vesting applied after the initial 6-month vest, meaning full unlock occurs at approximately 30 months post-launch.

---

## 6. Token Utility — Premium Access Tiers

$POET functions as an access key to premium platform features. Holding tokens in your connected wallet unlocks tiered access. No tokens are burned or spent — simply holding the threshold amount grants access.

### 6.1 Tier Structure

| Tier | Name | Threshold | % of Supply |
|---|---|---|---|
| 1 | **Signal** | 10,000 $POET | 0.001% |
| 2 | **Edge** | 100,000 $POET | 0.01% |
| 3 | **Architect** | 1,000,000 $POET | 0.1% |

### 6.2 Tier Benefits

**Signal (10,000 $POET)**
- Advanced Performance Report metrics beyond the free tier
- Extended backtesting history
- Priority support
- Access to monthly market research reports

**Edge (100,000 $POET)**
- Everything in Signal
- Full strategy library with all published research
- Playbook pro features (advanced analytics, unlimited setups)
- Backtesting tools with custom parameter configuration
- Exclusive strategy research and early access to new analysis

**Architect (1,000,000 $POET)**
- Everything in Edge
- Governance voting rights (when launched)
- Early access to new tools before public release
- Strategy co-development — propose and vote on research priorities
- Direct founder access for feedback and feature requests
- Name listed as platform supporter (opt-in)

### 6.3 Design Rationale

The hold-threshold model was chosen over burn-to-access for three reasons:

1. **Simplicity** — Check wallet balance, grant access. No complex token-spending mechanics to build or maintain.
2. **Flexibility** — Thresholds can be adjusted as the platform matures and market conditions change without requiring smart contract modifications.

---

## 7. Future: Staking

Staking will allow $POET holders to lock tokens for a defined period in exchange for yield from the Staking Rewards pool.

**Proposed parameters:**

- Emission period: 2+ years
- Declining emission schedule (higher rewards early, tapering over time)
- Lock periods: flexible (longer locks earn higher multipliers)
- No slashing — staking is non-custodial

Staking serves two purposes: reducing circulating sell pressure and rewarding long-term holders who believe in the platform's direction. Specific parameters will be finalized before launch and published as an addendum to this document.

---

## 8. Future: Governance

Once the governance framework is live, Architect-tier holders will be able to:

- Vote on Treasury / DAO Reserve spending
- Influence platform roadmap priorities
- Approve or reject partnership proposals

Governance will follow a token-weighted voting model with a minimum quorum requirement to prevent low-participation capture. The specific mechanism (snapshot voting, on-chain, or hybrid) will be determined based on community size and technical requirements at launch.

---

## 9. Roadmap

### Phase 1 — Foundation (Current)
- Factsheet Generator (Performance Reports) live in development
- $POET token launched on Jupiter
- Strategy example launch
- Whitepaper published
- Community building and early adopter identification

### Phase 2 — Expansion
- Playbook tool launch
- Premium tier access implementation (wallet verification)
- Additional strategy research published
- Early adopter airdrop distribution
- Platform rewards program activation

### Phase 3 — Staking & Growth
- Staking program launch
- Ecosystem partnerships on Solana
- Advanced analytics dashboard
- Backend API for factsheet generation
- Contributor bounty program activation

### Phase 4 — Governance & Scale
- Governance framework launch
- Treasury unlocked for community-directed spending
- Real-time data feed integration
- Strategy comparison and portfolio optimization tools
- User accounts and saved portfolios

---

## 10. Risk Factors

- **Market Risk** — Token value is subject to market conditions. $POET is a utility token, not an investment vehicle. Price fluctuation is expected.
- **Development Risk** — Features described in the roadmap are planned but not guaranteed. Timelines may shift based on technical complexity and resource availability.
- **Regulatory Risk** — Cryptocurrency regulation is evolving. Changes in legal frameworks could affect token utility or platform operations.
- **Smart Contract Risk** — While $POET is a standard Solana token, any future staking or governance contracts carry inherent smart contract risk.
- **Adoption Risk** — Platform value depends on user adoption. There is no guarantee that the tools will achieve the user base needed to sustain the ecosystem.

---

## 11. Disclaimer

This document is for informational purposes only. $POET is a utility token that provides access to platform features. It is not a security, investment contract, or financial instrument.

Nothing in this document constitutes financial advice, investment advice, trading advice, or any other form of professional advice. Past performance of any strategy discussed on the Poet platform does not guarantee future results.

Always conduct your own research. Never risk more than you can afford to lose. Consult with qualified financial and legal advisors before making investment decisions.

---

## 12. Links

- **Website:** [https://poet-drab.vercel.app](https://poet-drab.vercel.app)
- **Buy $POET:** [Jupiter](https://jup.ag/tokens/4jnqfSMWE1opwNT9m98s5QFKyNasypjeoieJsGsdjupx)
- **GitHub:** [https://github.com/JackDavidPiney/poet](https://github.com/JackDavidPiney/poet-website)

---

*Last updated: February 13, 2026*