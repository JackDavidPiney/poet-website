# Metrics Reference

## Overview
This document provides formulas, calculation methods, and implementation standards for all performance metrics used in Poet. Each metric includes mathematical definition, step-by-step calculation, edge case handling, and code examples.

---

## Core Return Metrics

### Total Return
**Definition:** Cumulative profit or loss across all trades.

**Formula:**
```
Total Return = Σ(P&L_i) for i = 1 to n
```

**Calculation Steps:**
1. Sum all Net P&L % values
2. Round to 2 decimal places

**Example:**
```
Trades: [2.45%, -1.32%, 3.78%, -0.87%]
Total Return = 2.45 + (-1.32) + 3.78 + (-0.87) = 4.04%
```

**Edge Cases:**
- Zero trades → Return 0.00%
- Single trade → Return that trade's P&L

**Display:** `+4.04%` or `-4.04%` (include sign)

---

### Average Return per Trade
**Definition:** Mean return across all trades.

**Formula:**
```
Avg Return = (Σ P&L_i) / n
```

**Calculation Steps:**
1. Sum all P&L values
2. Divide by number of trades
3. Round to 2 decimal places

**Example:**
```
Trades: [2.45%, -1.32%, 3.78%, -0.87%]
Avg Return = 4.04% / 4 = 1.01%
```

**Edge Cases:**
- Zero trades → Return 0.00%
- Use total trade count (wins + losses + breakevens)

**Display:** `1.01%`

---

### Win Rate
**Definition:** Percentage of profitable trades.

**Formula:**
```
Win Rate = (Number of Winning Trades / Total Trades) × 100
```

**Calculation Steps:**
1. Count trades where Net P&L > 0
2. Divide by total trade count
3. Multiply by 100
4. Round to 1 decimal place

**Example:**
```
Trades: [2.45%, -1.32%, 3.78%, -0.87%, 0.00%]
Wins = 2 (2.45%, 3.78%)
Total = 5
Win Rate = (2 / 5) × 100 = 40.0%
```

**Edge Cases:**
- Zero trades → Return 0.0%
- Breakeven trades (0.00%) → Count as neither win nor loss
- Include in denominator, exclude from numerator

**Display:** `40.0%` (always 1 decimal)

---

### Profit Factor
**Definition:** Ratio of gross profits to gross losses.

**Formula:**
```
Profit Factor = Σ(Winning Trades) / |Σ(Losing Trades)|
```

**Calculation Steps:**
1. Sum all positive P&L values (gross profit)
2. Sum absolute value of all negative P&L values (gross loss)
3. Divide gross profit by gross loss
4. Round to 2 decimal places

**Example:**
```
Trades: [2.45%, -1.32%, 3.78%, -0.87%, 1.50%]
Gross Profit = 2.45 + 3.78 + 1.50 = 7.73%
Gross Loss = |-1.32| + |-0.87| = 2.19%
Profit Factor = 7.73 / 2.19 = 3.53
```

**Edge Cases:**
- No losses → Return "∞" or "N/A" (infinite profit factor)
- No wins → Return 0.00
- Zero trades → Return 0.00

**Interpretation:**
- PF < 1.0 → Losing strategy
- PF = 1.0 → Breakeven
- PF > 1.0 → Profitable (higher is better)
- PF > 2.0 → Strong edge
- PF > 3.0 → Exceptional

**Display:** `3.53` (no percentage symbol)

---

## Risk-Adjusted Metrics

### Sharpe Ratio
**Definition:** Return per unit of volatility (risk-adjusted return).

**Formula:**
```
Sharpe Ratio = (Mean Return - Risk-Free Rate) / σ

Where:
- Mean Return = average trade return
- Risk-Free Rate = benchmark return (typically 0% for crypto)
- σ = standard deviation of returns
```

**Calculation Steps:**
1. Calculate mean return across all trades
2. Subtract risk-free rate (default 0% for crypto, 4% annualized for stocks)
3. Calculate standard deviation of returns
4. Divide excess return by standard deviation
5. Round to 2 decimal places

**Example:**
```
Trades: [2.45%, -1.32%, 3.78%, -0.87%, 1.50%]
Mean = (2.45 - 1.32 + 3.78 - 0.87 + 1.50) / 5 = 1.108%
Risk-Free Rate = 0%
σ = STDEV([2.45, -1.32, 3.78, -0.87, 1.50]) = 2.03%
Sharpe = (1.108 - 0) / 2.03 = 0.55
```

**Annualization (if needed):**
```
Annual Sharpe = Per-Trade Sharpe × √n

Where n = number of trades per year
For daily trades: n = 252 (trading days)
For crypto (24/7): n = 365
```

**Edge Cases:**
- σ = 0 (all returns identical) → Return "N/A" or max value
- Fewer than 3 trades → Unreliable, flag as insufficient data
- Negative Sharpe → Indicates losses or excess risk

**Interpretation:**
- Sharpe < 0.0 → Strategy losing money or underperforming risk-free rate
- Sharpe 0.0 - 1.0 → Subpar risk-adjusted return
- Sharpe 1.0 - 2.0 → Good
- Sharpe 2.0 - 3.0 → Very good
- Sharpe > 3.0 → Excellent (rare, verify data)

**Display:** `0.55` (2 decimals, no units)

---

### Sortino Ratio
**Definition:** Return per unit of downside volatility (penalizes only losses).

**Formula:**
```
Sortino Ratio = (Mean Return - Target Return) / Downside Deviation

Downside Deviation = √(Σ(min(0, R_i - Target)²) / n)
```

**Calculation Steps:**
1. Calculate mean return
2. Define target return (typically 0%)
3. Calculate downside deviation (only negative deviations from target)
4. Divide excess return by downside deviation
5. Round to 2 decimal places

**Example:**
```
Trades: [2.45%, -1.32%, 3.78%, -0.87%, 1.50%]
Mean = 1.108%
Target = 0%
Downside deviations: [0, -1.32, 0, -0.87, 0]
Squared: [0, 1.7424, 0, 0.7569, 0]
Downside Dev = √(2.4993 / 5) = 0.707%
Sortino = (1.108 - 0) / 0.707 = 1.57
```

**Edge Cases:**
- No losses → Return "N/A" or max value
- All losses → Return negative value
- Fewer than 3 trades → Flag as insufficient

**Interpretation:**
- Higher is better (same as Sharpe)
- Sortino > Sharpe indicates skewed positive returns
- Typically 1.5x to 2x higher than Sharpe for same strategy

**Display:** `1.57` (2 decimals)

---

### Calmar Ratio
**Definition:** Return per unit of maximum drawdown.

**Formula:**
```
Calmar Ratio = Annualized Return / |Maximum Drawdown|
```

**Calculation Steps:**
1. Calculate annualized return
2. Calculate maximum drawdown (see Drawdown section)
3. Divide annualized return by absolute max drawdown
4. Round to 2 decimal places

**Example:**
```
Total Return = 24.5% (over 6 months)
Annualized = 24.5% × (12 / 6) = 49.0%
Max Drawdown = -8.2%
Calmar = 49.0 / 8.2 = 5.98
```

**Edge Cases:**
- No drawdown (all wins) → Return "N/A"
- Negative returns → Return negative Calmar
- Less than 1 year of data → Still calculate but flag

**Interpretation:**
- Calmar > 3.0 → Good
- Calmar > 5.0 → Excellent
- Lower drawdown or higher return improves Calmar

**Display:** `5.98` (2 decimals)

---

## Drawdown Metrics

### Maximum Drawdown
**Definition:** Largest peak-to-trough decline in equity.

**Formula:**
```
Max Drawdown = min((Equity_i - Peak_i) / Peak_i)

Where:
- Equity_i = cumulative equity at trade i
- Peak_i = highest equity reached before trade i
```

**Calculation Steps:**
1. Create cumulative equity curve (starting at 100%)
2. For each point, track running maximum
3. Calculate drawdown = (Current - Peak) / Peak
4. Return minimum (most negative) drawdown
5. Round to 2 decimal places

**Example:**
```
Trades: [10%, -5%, 8%, -12%, 6%]
Starting Equity = 100%

Trade 1: 110.0%, Peak = 110.0%, DD = 0.00%
Trade 2: 104.5%, Peak = 110.0%, DD = -5.00%
Trade 3: 112.9%, Peak = 112.9%, DD = 0.00%
Trade 4: 99.4%, Peak = 112.9%, DD = -11.93%
Trade 5: 105.3%, Peak = 112.9%, DD = -6.71%

Max Drawdown = -11.93%
```

**Edge Cases:**
- All winning trades → Return 0.00%
- Single trade loss → Return that loss percentage
- Zero trades → Return 0.00%

**Display:** `-11.93%` (always negative or zero)

---

### Average Drawdown
**Definition:** Mean of all drawdown periods.

**Formula:**
```
Avg Drawdown = Σ(Drawdown Periods) / Number of Drawdown Periods
```

**Calculation Steps:**
1. Identify all drawdown periods (peak to recovery)
2. Calculate magnitude of each period
3. Average all magnitudes
4. Round to 2 decimal places

**Example:**
```
Drawdown Periods: [-5.00%, -11.93%, -3.20%]
Avg Drawdown = (-5.00 + -11.93 + -3.20) / 3 = -6.71%
```

**Display:** `-6.71%`

---

### Drawdown Duration
**Definition:** Time spent in drawdown.

**Formula:**
```
DD Duration = Number of trades from peak to new peak
```

**Calculation Steps:**
1. Identify each drawdown period
2. Count trades from peak to recovery
3. Report longest duration

**Example:**
```
Trade 2-4 = 3 trades in drawdown
Trade 7-12 = 6 trades in drawdown

Longest Duration = 6 trades
```

**Display:** `6 trades` or `6 days` (depends on trade frequency)

---

## Win/Loss Metrics

### Average Win
**Definition:** Mean return of winning trades.

**Formula:**
```
Avg Win = Σ(Winning Trades) / Number of Wins
```

**Calculation Steps:**
1. Filter trades where P&L > 0
2. Sum winning returns
3. Divide by number of wins
4. Round to 2 decimal places

**Example:**
```
Wins: [2.45%, 3.78%, 1.50%]
Avg Win = (2.45 + 3.78 + 1.50) / 3 = 2.58%
```

**Edge Cases:**
- No wins → Return 0.00%

**Display:** `2.58%`

---

### Average Loss
**Definition:** Mean return of losing trades.

**Formula:**
```
Avg Loss = Σ(Losing Trades) / Number of Losses
```

**Calculation Steps:**
1. Filter trades where P&L < 0
2. Sum losing returns (keep negative)
3. Divide by number of losses
4. Round to 2 decimal places

**Example:**
```
Losses: [-1.32%, -0.87%]
Avg Loss = (-1.32 + -0.87) / 2 = -1.10%
```

**Edge Cases:**
- No losses → Return 0.00%

**Display:** `-1.10%` (keep negative sign)

---

### Win/Loss Ratio
**Definition:** Ratio of average win to average loss.

**Formula:**
```
Win/Loss Ratio = |Avg Win| / |Avg Loss|
```

**Calculation Steps:**
1. Calculate average win (absolute value)
2. Calculate average loss (absolute value)
3. Divide average win by average loss
4. Round to 2 decimal places

**Example:**
```
Avg Win = 2.58%
Avg Loss = -1.10%
W/L Ratio = 2.58 / 1.10 = 2.35
```

**Edge Cases:**
- No losses → Return "N/A"
- No wins → Return 0.00

**Interpretation:**
- W/L > 1.0 → Wins larger than losses
- W/L = 1.0 → Symmetrical
- W/L < 1.0 → Losses larger than wins (need high win rate)

**Display:** `2.35` (no units)

---

## Trade Count Metrics

### Total Trades
**Formula:**
```
Total Trades = n
```

**Display:** `142 trades`

---

### Winning Trades
**Formula:**
```
Winning Trades = Count where P&L > 0
```

**Display:** `87 trades`

---

### Losing Trades
**Formula:**
```
Losing Trades = Count where P&L < 0
```

**Display:** `55 trades`

---

## Annualization

### Annualizing Returns
**Formula:**
```
Annual Return = Total Return × (365 / Days in Sample)

Or for trade-based:
Annual Return = Avg Return per Trade × Expected Trades per Year
```

**Example:**
```
Total Return = 24.5% over 180 days
Annual = 24.5% × (365 / 180) = 49.7%
```

---

### Annualizing Volatility
**Formula:**
```
Annual σ = Per-Trade σ × √(Trades per Year)
```

**Example:**
```
Per-Trade σ = 2.03%
Trades per Year = 252
Annual σ = 2.03% × √252 = 32.2%
```

**Trading Days per Year:**
- Stocks: 252 days
- Crypto (24/7): 365 days
- Forex: 260 days

---

## Code Examples

### Sharpe Ratio (Python)
```python
import numpy as np

def calculate_sharpe(returns, risk_free_rate=0.0):
    """
    Calculate Sharpe Ratio
    
    Args:
        returns (list): List of trade returns (as decimals, e.g., 0.0245 for 2.45%)
        risk_free_rate (float): Risk-free rate (default 0.0)
    
    Returns:
        float: Sharpe ratio rounded to 2 decimals
    """
    if len(returns) < 3:
        return None  # Insufficient data
    
    mean_return = np.mean(returns)
    std_dev = np.std(returns, ddof=1)  # Sample std deviation
    
    if std_dev == 0:
        return None  # Cannot divide by zero
    
    sharpe = (mean_return - risk_free_rate) / std_dev
    return round(sharpe, 2)

# Example usage
trades = [0.0245, -0.0132, 0.0378, -0.0087, 0.0150]
sharpe_ratio = calculate_sharpe(trades)
print(f"Sharpe Ratio: {sharpe_ratio}")  # Output: 0.55
```

---

### Maximum Drawdown (Python)
```python
def calculate_max_drawdown(returns):
    """
    Calculate maximum drawdown
    
    Args:
        returns (list): List of trade returns (as decimals)
    
    Returns:
        float: Maximum drawdown as percentage (negative value)
    """
    if len(returns) == 0:
        return 0.0
    
    # Create equity curve
    equity = [1.0]  # Start at 100%
    for r in returns:
        equity.append(equity[-1] * (1 + r))
    
    # Calculate drawdown at each point
    max_dd = 0.0
    peak = equity[0]
    
    for value in equity:
        if value > peak:
            peak = value
        dd = (value - peak) / peak
        if dd < max_dd:
            max_dd = dd
    
    return round(max_dd * 100, 2)  # Return as percentage

# Example usage
trades = [0.10, -0.05, 0.08, -0.12, 0.06]
max_dd = calculate_max_drawdown(trades)
print(f"Max Drawdown: {max_dd}%")  # Output: -11.93%
```

---

### Win Rate (JavaScript)
```javascript
function calculateWinRate(trades) {
    /**
     * Calculate win rate percentage
     * 
     * @param {Array} trades - Array of trade objects with pnl property
     * @returns {number} Win rate as percentage (1 decimal)
     */
    if (trades.length === 0) return 0.0;
    
    const wins = trades.filter(t => t.pnl > 0).length;
    const winRate = (wins / trades.length) * 100;
    
    return parseFloat(winRate.toFixed(1));
}

// Example usage
const trades = [
    { pnl: 2.45 },
    { pnl: -1.32 },
    { pnl: 3.78 },
    { pnl: -0.87 },
    { pnl: 0.00 }
];

const wr = calculateWinRate(trades);
console.log(`Win Rate: ${wr}%`); // Output: 40.0%
```

---

## Metric Selection Guide

### For Short-Term Strategies (< 100 trades)
**Focus on:**
- Win Rate
- Profit Factor
- Average Win/Loss
- Max Drawdown

**Avoid:**
- Sharpe Ratio (needs more data)
- Calmar Ratio (insufficient drawdown periods)

---

### For Long-Term Strategies (> 500 trades)
**Focus on:**
- Sharpe Ratio
- Sortino Ratio
- Calmar Ratio
- Average Drawdown
- Trade Count

---

### For High-Frequency (> 1000 trades/year)
**Focus on:**
- Sharpe Ratio (annualized)
- Transaction costs
- Slippage modeling
- Execution quality

---

## Common Calculation Errors

### Error: Incorrect Standard Deviation
**Problem:** Using population std dev instead of sample
**Fix:** Use `ddof=1` in NumPy or `n-1` denominator
```python
# Wrong
std = np.std(returns)

# Correct
std = np.std(returns, ddof=1)
```

---

### Error: Percentage vs Decimal Confusion
**Problem:** Mixing 2.45% (percentage) with 0.0245 (decimal)
**Fix:** Standardize to decimals internally
```python
# Input: 2.45
# Internal: 0.0245
return_decimal = pnl_percent / 100
```

---

### Error: Dividing by Zero
**Problem:** No losing trades → Profit Factor = ∞
**Fix:** Handle edge case explicitly
```python
if gross_loss == 0:
    return float('inf')  # or None, or "N/A"
```

---

### Error: Future Bias in Drawdown
**Problem:** Using future peak in drawdown calculation
**Fix:** Track running maximum only
```python
# Wrong: using global max
dd = (current - max(equity)) / max(equity)

# Correct: using running max
peak = max(peak, current)
dd = (current - peak) / peak
```

---

## Version History

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2024-02-05 | Initial metrics reference |

---

## Related Documents
- `TRADING_DATA_STANDARDS.md` - Input data format
- `STRATEGY_VALIDATION.md` - Statistical significance testing
- `factsheet-generator.js` - Implementation reference
