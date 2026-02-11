# SOLUSDT Mean Reversion Strategy — Research Report

**Poet Quantitative Research**
**Date:** February 2025
**Status:** Active Development — Drawdown Reduction Phase
**Classification:** Hypothetical Backtest Results

---

## 1. Executive Summary

This document presents the complete findings from our backtest of a mean reversion strategy on SOL/USDT Perpetual (Binance), covering 26 August 2020 through 05 March 2025. The strategy exploits first-hour selling pressure by entering long after a red opening candle of 1% or greater magnitude, then exiting on a fixed 12-hour time window.

The results are statistically significant (t = 3.322, p = 0.001) across 301 trades over 4.5 years. The strategy produced a total return of +1,966.5% with a CAGR of +95.3% and a Sharpe ratio of 3.04. However, the maximum drawdown of -33% exceeds our target threshold of 20%. This report documents all findings and establishes the framework for reducing drawdown below 20% while preserving as much of the return profile as possible.

---

## 2. Strategy Specification

**Instrument:** SOL/USDT Perpetual (Binance)
**Timeframe:** 1H Candles (UTC)
**Backtest Period:** 26 Aug 2020 — 05 Mar 2025 (4.5 years, 301 trades)

**Entry Rule:** At UTC 01:00, if the first hourly candle (00:00–01:00 UTC) closes red with a decline >= 1.0% from open to close, enter long at candle close price.

**Exit Rule:** Time-based exit at UTC 12:00 (+12 hours from candle open). No stop loss.

**Position Sizing:** 1–2% of NAV per trade.

**Edge Classification:** Mean reversion following first-hour selling pressure, producing a convex payoff structure with positive skew.

---

## 3. Performance Summary

### 3.1 Return Metrics

| Metric | Value |
|---|---|
| Total Return | +1,966.5% |
| CAGR | +95.3% |
| EV per Trade | +1.18% |
| Starting Capital | $100,000 |
| Ending Capital | $2,066,468 |

### 3.2 Risk Metrics

| Metric | Value |
|---|---|
| Max Drawdown | -33.0% |
| Annualized Volatility | 97.85% |
| Sharpe Ratio | 3.04 |
| Sortino Ratio | 6.28 |
| Calmar Ratio | 2.89 |
| Profit Factor | 1.89 |

### 3.3 Trade Distribution

| Metric | Value |
|---|---|
| Total Trades | 301 |
| Trades per Year | ~67 |
| Win Rate | 58.8% |
| Average Winning Trade | +4.27% |
| Average Losing Trade | -3.23% |
| Best Trade | +60.50% |
| Worst Trade | -15.52% |
| Max Consecutive Losses | 9 |

### 3.4 Higher-Order Statistics

| Metric | Value | Interpretation |
|---|---|---|
| Skewness | +3.39 | Heavy right tail. Winners disproportionately larger than losers. Convex payoff. |
| Kurtosis | +29.48 | Extreme fat tails in both directions. The +60.5% best trade and -15.52% worst trade are illustrative. |

### 3.5 Statistical Significance

| Metric | Value |
|---|---|
| T-Statistic | 3.322 |
| P-Value | 0.001003 |

The probability these results occurred by chance is approximately 1 in 1,000. With 301 trades over 4.5 years, this is not a small-sample artifact.

---

## 4. Why the Edge Exists

The strategy rests on four structural factors.

**Liquidity dynamics and selling pressure dissipation.** The first hour of the UTC day concentrates order flow from Asian session close and European pre-open. When this flow is net-sell and drives a 1%+ decline, the pressure tends to be exhaustible. As the selling wave clears and fresh liquidity enters, price gravitates back toward fair value over the following 12 hours.

**Positive skew from no stop loss.** The absence of a stop loss allows the strategy to participate in the full recovery move when mean reversion works and to ride through temporary adverse moves that would have stopped out a tighter strategy. This produces the observed skewness of +3.39 — winning trades are structurally larger than losers.

**Algorithmic and behavioral amplification.** After a sharp first-hour decline, buy-the-dip algorithms and retail participants enter, providing upward pressure. Simultaneously, short sellers from the opening move begin covering, reinforcing the reversal.

**Time-based exit removes discretion.** The fixed 12-hour holding window eliminates timing risk on the exit. It captures the mean reversion move during the most liquid portion of the day (UTC 01:00 to 12:00 spans Asian afternoon through European morning) without holding through lower-liquidity overnight periods.

---

## 5. Key Risks and Weaknesses

### 5.1 Drawdown Problem (Primary)

The -33% max drawdown is the strategy's biggest weakness and the focus of this document's next phase. A 33% drawdown is unacceptable for most allocators and poses significant psychological risk for discretionary deployment. Our target is to reduce this below 20%.

### 5.2 No Stop Loss

The strategy runs without any stop loss. This is a deliberate design choice that produces the positive skew, but it means any single trade can lose up to the worst observed -15.52% (and potentially more in future). The fat-tailed return distribution (kurtosis +29.48) confirms that extreme outcomes on individual trades are far more common than a normal distribution predicts.

### 5.3 Regime Dependence

Mean reversion is a conditional phenomenon. In sustained downtrends, the first-hour selling pressure may be the start of a continuation move rather than an exhaustible event. The strategy has no regime filter — it trades every qualifying signal regardless of broader market conditions.

### 5.4 Execution Friction

With an EV per trade of +1.18%, transaction costs matter. Binance perpetual taker fees, funding rates during the 12-hour hold, and slippage on entry/exit can erode the edge. This needs to be quantified more precisely before live deployment.

### 5.5 Sample Size

301 trades over 4.5 years is adequate for statistical significance but not enormous. The T-statistic of 3.322 provides confidence, but crypto market structure evolves rapidly and the edge could decay. Continuous out-of-sample validation is required.

---

## 6. Exit Timing Sensitivity — Tested and Rejected

We tested two alternative holding periods against the 12-hour baseline to determine whether exit timing could improve the risk profile. Both variants degraded the strategy.

| Exit Window | Trades | CAGR | Max DD | Sharpe | Sortino | Calmar | Skewness | EV/Trade |
|---|---|---|---|---|---|---|---|---|
| **6 hours** | 306 | +38.9% | -37.5% | 1.13 | 1.78 | 1.04 | +0.49 | +0.58% |
| **12 hours** | 306 | +105.1% | -33.0% | 1.65 | 3.44 | 3.19 | +3.31 | +1.25% |
| **23 hours** | 305 | +135.8% | -70.3% | 1.62 | 2.81 | 1.93 | +0.73 | +1.61% |

The 6-hour exit cuts winning trades short before the mean reversion move completes, dropping EV per trade by more than half to +0.58% and collapsing the positive skew from +3.31 to +0.49. Counterintuitively, the drawdown actually worsens to -37.5% because the lower per-trade edge means the equity curve lacks the upward momentum to recover from losing streaks. The 23-hour exit adds 11 hours of directionless exposure after the reversion move has played out, ballooning the worst trade from -15.5% to -39.3% and more than doubling the max drawdown to -70.3%. Both variants destroy the convex payoff structure that makes the 12-hour version work. The conclusion is that the 12-hour holding period is near-optimal for this specific edge, and drawdown reduction efforts should focus on entry-side filters, stop losses, and position sizing rather than exit timing.

---

## 7. Drawdown Reduction Framework — Target < 20%

This section outlines the specific approaches to test for reducing the max drawdown from -33% to below 20%. Each approach should be backtested independently, then the best-performing combination should be validated.

### 7.1 Approach A: Hard Stop Loss

**Hypothesis:** Adding a stop loss caps single-trade losses, reducing drawdown at the cost of some positive skew.

**Implementation:**
- Test fixed stop losses at 3%, 5%, 7%, and 10% below entry price.
- For each level, measure the impact on total return, Sharpe, Sortino, win rate, and max drawdown.
- Expect the stop to reduce skewness and potentially lower total return, but the trade-off may be favorable if drawdown drops substantially.

**Key question:** Does the worst trade of -15.52% cluster with other large losers that collectively cause the -33% drawdown? If the drawdown is driven by a few extreme trades, a stop at 8-10% might solve the problem with minimal return sacrifice. If the drawdown is driven by many moderate losers compounding, a tighter stop is needed but will degrade win rate more.

### 7.2 Approach B: Volatility Filter

**Hypothesis:** Not all first-hour signals are equal. High-volatility regimes produce larger adverse moves before mean reversion kicks in, contributing disproportionately to drawdown.

**Implementation:**
- Compute a rolling ATR (e.g., 14-period on daily candles) or realized volatility measure.
- Skip trades when ATR or volatility exceeds a threshold (e.g., top quartile of historical readings).
- Alternatively, reduce position size proportionally to volatility.

**Rationale:** In high-volatility environments, the 12-hour window may not be sufficient for full mean reversion, and adverse intraday moves are larger. Filtering out or sizing down these trades should reduce drawdown from tail events.

### 7.3 Approach C: Trend Filter

**Hypothesis:** Mean reversion fails in sustained downtrends. Adding a trend overlay would skip signals that are likely continuation rather than reversion.

**Implementation:**
- Test simple filters: skip long entries when SOL is below its 20-day, 50-day, or 200-day moving average.
- Test momentum-based filters: skip when the trailing 7-day or 14-day return is below a threshold (e.g., -10%).
- Test composite: require price above a moving average AND the entry candle decline to be within a magnitude range (e.g., 1% to 5%, skipping extreme declines > 5% which may signal continuation).

**Rationale:** The -33% drawdown likely coincides with periods where SOL was in a bear trend. Filtering these periods removes the trades where mean reversion is least likely to hold.

### 7.4 Approach D: Dynamic Position Sizing

**Hypothesis:** Instead of filtering trades entirely, reduce exposure during high-risk conditions.

**Implementation:**
- Base position size: 2% of NAV.
- If recent trailing drawdown exceeds -10%, reduce to 1% of NAV.
- If recent trailing drawdown exceeds -15%, reduce to 0.5% of NAV.
- Alternatively, scale position inversely with recent realized volatility.

**Rationale:** This preserves trade count and participation in mean reversion during all conditions, but limits capital at risk when the strategy is already in a losing streak. The max consecutive losses of 9 trades suggests that losing streaks can compound — reducing size during these streaks directly limits drawdown.

### 7.5 Approach E: Entry Threshold Calibration

**Hypothesis:** The 1% minimum decline threshold may be too permissive. Larger first-hour declines may have different continuation vs. reversion profiles.

**Implementation:**
- Test minimum decline thresholds at 1.5%, 2.0%, 2.5%, and 3.0%.
- For each, report trade count, win rate, EV per trade, max drawdown, and total return.
- Also test an upper bound — exclude signals where the first hour drops more than 5% or 8%, as these may be crash events rather than mean-revertable selling.

**Rationale:** Tightening the entry filter reduces trade count but may improve win rate and reduce drawdown if marginal signals (barely -1%) have weaker mean reversion properties. Excluding extreme declines removes crash-day entries that are unlikely to revert within 12 hours.

### 7.6 Approach F: Partial Exit / Scaling Out (Lower Priority)

**Hypothesis:** Scaling out earlier captures partial profits and reduces exposure during the back half of the holding window.

**Implementation:**
- Test exiting 50% of the position at UTC 06:00 (+6 hours) and the remainder at UTC 12:00.
- Test exiting 33% at +4 hours, 33% at +8 hours, 33% at +12 hours.
- Compare the drawdown and Sharpe ratio of scaled exits vs. the single exit.

**Note:** Our exit timing tests (Section 6) showed that a pure 6-hour exit severely degrades the strategy, with EV/trade dropping to +0.58% and drawdown worsening to -37.5%. A blended approach (partial exit at 6h, remainder at 12h) may still offer marginal improvement by locking in some profit early without fully truncating the reversion move. However, this is low priority given the 6-hour results suggest the bulk of the edge materializes in hours 6-12.

### 7.7 Recommended Testing Order

Based on likely impact-to-effort ratio, the recommended testing sequence is:

1. **Trend filter** (Approach C) — likely the single biggest drawdown reducer since the -33% almost certainly coincides with a bear trend.
2. **Hard stop loss** (Approach A) — directly caps tail risk from individual trades.
3. **Entry threshold calibration** (Approach E) — low implementation cost, may improve signal quality.
4. **Dynamic position sizing** (Approach D) — complementary to the above, addresses compounding losses.
5. **Volatility filter** (Approach B) — addresses regime-specific risk.
6. **Partial exit** (Approach F) — deprioritized after exit timing tests showed the edge materializes primarily in the second half of the holding window.

Exit timing modifications have been tested and eliminated (see Section 6). The 12-hour holding period is confirmed as near-optimal.

After individual testing, combine the 2-3 best-performing approaches and validate the combined system on the full sample. Target: max drawdown < 20% with CAGR > 50% and Sharpe > 2.0.

---

## 8. Next Steps

1. **Decompose the -33% drawdown.** Identify the exact date range, number of trades, and individual trade P&Ls that contributed. Determine whether the drawdown is driven by a few extreme losses or accumulated moderate losses. This analysis directly informs which reduction approach will be most effective.

2. **Backtest Approaches C and A first.** Trend filter and stop loss are the most likely to produce meaningful drawdown reduction. Run both independently, measure the Sharpe/drawdown trade-off, then test in combination.

3. **Quantify execution costs.** Before any live deployment, model realistic taker fees (Binance: ~0.04% maker, ~0.06% taker), funding rate exposure over 12 hours, and slippage based on typical SOL perpetual book depth. Deduct from backtest returns.

4. **Build forward-testing framework.** Once the refined strategy (with drawdown < 20%) is selected, run a 3-month paper trading period to validate out-of-sample performance before allocating real capital.

5. **Update the strategy page.** Once the refined parameters are finalized, update `mean_reversion_strategy.html` with the new specification, updated metrics, and the drawdown reduction approach taken.

---

## 9. Disclaimer

This composite performance record and statistics are hypothetical. Past performance does not guarantee future results. The strategy carries full intraday exposure with no stop loss in its current form. Market conditions, liquidity, and exchange mechanics can change at any time. This is educational content and quantitative research, not financial advice. Never risk more than you can afford to lose.

---

*Generated by Poet Quantitative Research — February 2025*
