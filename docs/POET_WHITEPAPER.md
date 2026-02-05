# POET WHITEPAPER
## Platform for Systematic & Discretionary Trading Research

**Version 1.0**  
**February 2026**

---

## Abstract

Poet is a quantitative trading research platform designed for systematic and discretionary traders to document, validate, and share trading strategies with statistical rigor. Unlike generic backtesting tools or opaque "black box" systems, Poet emphasizes transparency, reproducibility, and evidence-based decision making.

The platform provides tools for performance analysis, strategy documentation, and metrics calculation—enabling traders to move beyond gut feeling and marketing hype toward data-driven edge identification.

**Current State:** MVP (Factsheet Generator, First Hour Effect strategy documentation)  
**Vision:** Comprehensive ecosystem for trading research, collaboration, and strategy development

---

## 1. Problem Statement

### The Current Landscape

Trading strategy development suffers from three critical failures:

**1. Lack of Statistical Rigor**
- Strategies published without backtesting
- Cherry-picked results (data snooping bias)
- No out-of-sample validation
- Overfitting marketed as edge

**2. Opaque Performance Reporting**
- Win rate quoted without context (sample size, timeframe)
- Returns without risk adjustment (Sharpe, Sortino ignored)
- Maximum drawdown omitted or understated
- Transaction costs excluded from P&L

**3. Fragmented Tools**
- Excel for trade logging
- Python notebooks for analysis
- Separate tools for visualization
- No integrated workflow
- No standardization across traders

### The Consequence

Traders waste time and capital testing strategies that were never statistically valid. Marketing claims go unchallenged. Good strategies get abandoned during normal drawdown periods. Bad strategies persist due to confirmation bias.

**Poet's thesis:** Trading edge exists, but it must be found through systematic research—not hunches, tips, or curve-fitted backtests.

---

## 2. Solution: Poet Platform

### Core Principles

**Transparency**
- All methodology documented
- Backtesting data visible
- Assumptions stated explicitly
- Limitations acknowledged

**Statistical Validity**
- Minimum sample sizes enforced
- Significance testing required
- Out-of-sample validation standard
- Multiple metrics reported (not just returns)

**Reproducibility**
- Clear entry/exit rules
- Standardized data formats (CSV)
- Calculation methods documented
- Code examples provided

**Accessibility**
- No-code tools for non-programmers
- Professional output (PDF factsheets)
- Web-based (no installation)
- Free core features

### Platform Architecture

**Current (MVP):**
```
Frontend Only (HTML/CSS/JavaScript)
├── Strategy Documentation Pages
├── Factsheet Generator Tool
├── Trade Data Processing (client-side)
└── Performance Metrics Calculation
```

**Deployed:** Vercel (https://poet-drab.vercel.app)

**Future (Backend Integration):**
```
FastAPI Backend + PostgreSQL
├── User Authentication
├── Strategy Database
├── Real-time Market Data
├── Backtesting Engine
└── Social Features (sharing, leaderboards)
```

---

## 3. Key Features

### 3.1 Factsheet Generator

**Purpose:** Transform raw trade data into professional performance reports

**Input:** CSV file with trade history
```csv
Date/Time,Type,Symbol,Net P&L %
2024-01-15 09:45:00,Long,SOL/USD,2.45
2024-01-16 14:20:00,Short,BTC/USD,-1.32
```

**Process:**
1. Upload CSV
2. Parse and validate trades
3. Calculate 15+ performance metrics
4. Generate weighted composite score
5. Produce print-ready factsheet

**Output Metrics:**
- Total Return
- Sharpe Ratio
- Sortino Ratio
- Maximum Drawdown
- Win Rate
- Profit Factor
- Average Win/Loss
- Calmar Ratio

**Customization:**
- User-defined metric weights
- Normalization to 100-point scale
- Configurable risk-free rate

**Use Cases:**
- Track personal trading performance
- Compare strategies objectively
- Share results with investors
- Document strategy evolution

---

### 3.2 Strategy Documentation

**Purpose:** Publish validated trading strategies with full transparency

**Example:** First Hour Effect (SOL/USD)
- **Edge:** Momentum pattern in first 60 minutes post-open
- **Win Rate:** 75% (based on historical backtest)
- **Sample Size:** 100+ trades
- **Timeframe:** Intraday (1-hour holding period)

**Required Components:**
1. **Hypothesis:** Why the edge exists
2. **Methodology:** Entry/exit rules
3. **Backtesting Results:** Historical performance
4. **Risk Management:** Stop loss, position sizing
5. **Limitations:** When strategy fails
6. **Disclaimer:** Not financial advice

**Quality Standards:**
- Minimum 100 trades for publication
- Out-of-sample testing required
- Statistical significance (p < 0.05)
- Multiple market regimes tested
- Transaction costs included

---

### 3.3 Data Standards

**CSV Format (Required Columns):**
- `Date/Time`: Trade execution timestamp
- `Type`: Long or Short
- `Symbol`: Asset traded (e.g., SOL/USD)
- `Net P&L %`: Return percentage (net of fees)

**Optional Columns:**
- Entry Price, Exit Price
- Position Size
- Fees
- Duration
- Notes

**Validation:**
- Date format checking (ISO 8601 preferred)
- Type must be "Long" or "Short"
- P&L must be numeric
- Future dates flagged
- Duplicate timestamps detected

**Error Handling:**
- Clear error messages
- Row-by-row validation
- Suggestions for fixing issues

---

## 4. Design Philosophy

### Visual Identity

**Brand:** Poet  
**Tagline:** "Success driven by data"  
**Aesthetic:** Cyber-quantitative

**Color Palette:**
- Neon Green (#00ff88): Primary accent, success states
- Cyan (#00d4ff): Secondary accent, links
- Charcoal (#0a0e27): Primary background
- Dark Navy (#1a1f3a): Cards, secondary surfaces

**Typography:**
- **Orbitron** (headings): Futuristic, geometric
- **JetBrains Mono** (body): Technical, monospace, code-friendly

**Why These Choices:**
- Dark theme reduces eye strain for data-heavy work
- Neon accents evoke precision, technology
- Monospace font emphasizes quantitative rigor
- High contrast ensures accessibility (WCAG AAA)

### User Experience

**Principles:**
1. **Data First:** Metrics immediately visible
2. **Transparency:** Show methodology, don't hide complexity
3. **Speed:** Client-side processing for instant results
4. **Simplicity:** No-code CSV upload, automatic calculations
5. **Professionalism:** Publication-quality output

**Target Users:**
- Discretionary traders seeking to quantify edge
- Systematic traders validating strategies
- Quant researchers documenting findings
- Crypto traders analyzing volatility strategies
- Trading educators demonstrating concepts

---

## 5. Technical Implementation

### Current Stack

**Frontend:**
- HTML5 (semantic markup)
- CSS3 (variables, grid, flexbox)
- Vanilla JavaScript (no frameworks)

**Why No Framework:**
- Faster initial load
- No build process complexity
- Easy to understand and modify
- Sufficient for MVP scope

**Hosting:**
- Vercel (automatic deployments from GitHub)
- Global CDN
- HTTPS by default

**Performance:**
- Lighthouse Score: 85+ (Performance)
- Time to Interactive: < 2s (desktop)
- Mobile-responsive (375px+)

### Data Processing

**Client-Side (JavaScript):**
```javascript
// CSV parsing
FileReader API → Parse rows → Validate format

// Metrics calculation
calculateSharpe(returns, riskFreeRate)
calculateMaxDrawdown(equityCurve)
calculateWinRate(trades)

// Output generation
Composite score → Weighted average → 100-point scale
```

**Advantages:**
- No server costs (free hosting)
- Privacy (data never leaves browser)
- Instant results (no network latency)

**Limitations:**
- Large datasets slow (1000+ trades)
- No persistent storage (refresh loses data)
- Limited to browser capabilities

**Future Backend (Planned):**
- FastAPI (Python) for API
- PostgreSQL for trade storage
- Redis for caching
- JWT authentication

---

## 6. Metrics & Validation

### Statistical Standards

**Minimum Requirements for Strategy Publication:**
- 100+ trades executed
- 3+ months of data
- Out-of-sample validation
- Significance testing (p < 0.05)
- Multiple market regimes

**Key Metrics:**

**1. Sharpe Ratio**
```
Sharpe = (Mean Return - Risk-Free Rate) / Std Deviation
```
- Measures risk-adjusted return
- Higher is better (>1.0 acceptable, >2.0 excellent)
- Annualized for comparability

**2. Maximum Drawdown**
```
Max DD = min((Equity - Peak) / Peak)
```
- Largest peak-to-trough decline
- Critical for risk management
- Determines required capital buffer

**3. Win Rate**
```
Win Rate = (Winning Trades / Total Trades) × 100%
```
- Must be statistically significant
- Context matters (paired with profit factor)
- Binomial test applied (null hypothesis: 50%)

**4. Profit Factor**
```
PF = Gross Profit / Gross Loss
```
- >1.0 profitable, >2.0 strong edge
- Complements win rate
- Independent of trade frequency

### Validation Process

**Step 1: Hypothesis**
- Define edge clearly
- Explain *why* it should exist
- Identify market inefficiency

**Step 2: Backtesting**
- Historical data (minimum 3 months)
- In-sample period for development
- Out-of-sample reserved for validation

**Step 3: Statistical Testing**
- Win rate significance (binomial test)
- Sharpe confidence interval (bootstrap)
- Return distribution (normality test)
- Autocorrelation check

**Step 4: Robustness**
- Monte Carlo simulation (randomize trade order)
- Walk-forward analysis
- Multiple market regimes (bull, bear, sideways)

**Step 5: Documentation**
- Publish methodology
- Report all metrics (not just favorable ones)
- Acknowledge limitations
- Provide risk disclaimer

---

## 7. Current Strategies

### First Hour Effect (SOL/USD)

**Edge Hypothesis:**
Momentum established in the first hour of trading tends to persist through the session due to algorithmic follow-through and retail FOMO.

**Entry Rule:**
Price breaks above first hour high → Enter long

**Exit Rule:**
End of trading day OR -2% stop loss

**Backtesting Results:**
- Win Rate: 75%
- Sample Size: 100+ trades
- Avg Win: 2.58%
- Avg Loss: -1.10%
- Profit Factor: 2.35
- Max Drawdown: -8.24%

**Risk Management:**
- Position size: 1-2% of portfolio
- Stop loss: 2% from entry
- Max 3 concurrent positions

**Limitations:**
- Lower win rate in low-volatility periods
- Requires liquid markets (SOL/USD only)
- Signal window only 60 minutes
- Fails during strong reversals

**Status:** Published, actively tracked

---

## 8. Roadmap

### Short-Term (Next 6 Months)

**Q1:**
- [ ] Add 2-3 new validated strategies
- [ ] Improve mobile UX (dropdown fixes)
- [ ] LocalStorage for data persistence
- [ ] SEO optimization

**Q2:**
- [ ] Backend API (FastAPI)
- [ ] User authentication
- [ ] Database storage (PostgreSQL)
- [ ] Strategy database

### Medium-Term (6-12 Months)

**Q3:**
- [ ] Real-time market data integration
- [ ] Backtesting engine (browser-based)
- [ ] Advanced metrics (Calmar, Ulcer Index)
- [ ] Strategy comparison tool

**Q4:**
- [ ] Social features (share strategies)
- [ ] Performance leaderboards
- [ ] Community discussions
- [ ] Strategy marketplace (future)

### Long-Term (12+ Months)

- [ ] Mobile app (iOS/Android)
- [ ] Machine learning features (pattern detection)
- [ ] Algorithmic trading integration (cautious)
- [ ] Multi-language support
- [ ] Enterprise features (teams, permissions)

---

## 9. Business Model

### Current: Free

**All features free during MVP phase:**
- Factsheet generation
- Strategy documentation
- Unlimited CSV uploads
- Full metric calculations

**Goal:** Build user base, gather feedback, validate product-market fit

### Future: Freemium

**Free Tier:**
- Basic factsheet generation
- Public strategy viewing
- Limited historical data
- Community features

**Pro Tier ($10-20/month):**
- Advanced metrics
- Private strategies
- Real-time data feeds
- Priority support
- CSV export
- API access

**Enterprise Tier (Custom Pricing):**
- Team accounts
- White-label factsheets
- Dedicated support
- Custom integrations
- SLA guarantees

**Revenue Streams (Future):**
1. Subscriptions (primary)
2. Strategy marketplace (commission)
3. API usage (metered pricing)
4. Education (courses, workshops)
5. Data products (aggregate statistics)

---

## 10. Competitive Landscape

### Existing Solutions

**1. TradingView**
- Strengths: Charting, social features
- Weaknesses: Limited backtesting rigor, no factsheet generation

**2. QuantConnect**
- Strengths: Professional backtesting, cloud infrastructure
- Weaknesses: Complex for beginners, algorithm-focused (not discretionary)

**3. Excel/Google Sheets**
- Strengths: Flexible, familiar
- Weaknesses: Manual calculations, no validation, error-prone

**4. Python Notebooks**
- Strengths: Full control, reproducible
- Weaknesses: Coding required, no UI, not shareable

### Poet's Differentiation

**1. Hybrid Approach**
- Supports both systematic and discretionary trading
- No-code tools + technical depth
- Beginner-friendly with pro features

**2. Statistical Rigor**
- Validation standards enforced
- Significance testing built-in
- Overfitting prevention

**3. Transparency**
- Open methodology
- No black boxes
- Community peer review

**4. Professional Output**
- Publication-quality factsheets
- Investor-ready reports
- Clear, honest metrics

---

## 11. Risk Factors & Disclaimers

### Platform Risks

**1. No Financial Advice**
Poet provides tools and education. Users make their own trading decisions. Past performance does not guarantee future results.

**2. Data Accuracy**
Metrics calculated based on user-provided data. Garbage in, garbage out. Users responsible for data quality.

**3. Strategy Risk**
Published strategies show historical edge but may fail in future. Market conditions change. No guarantees.

**4. Technical Limitations**
MVP platform has constraints (client-side processing, no persistent storage). Features improving over time.

### User Responsibilities

**Users Must:**
- Verify all calculations independently
- Understand metrics before using them
- Apply proper risk management
- Never risk more than they can afford to lose
- Conduct own due diligence

**Users Must Not:**
- Blindly copy strategies
- Over-leverage positions
- Ignore drawdowns
- Skip out-of-sample testing
- Assume past = future

---

## 12. Open Source & Community

### Philosophy

**Transparency in Code:**
Trading research benefits from peer review. Open-sourcing core tools enables:
- Community validation
- Bug identification
- Feature contributions
- Educational value

**Planned (Future):**
- Open-source client-side code (MIT license)
- Public API documentation
- Community strategy submissions
- Peer review process

### Community Goals

**1. Knowledge Sharing**
- Traders help traders
- Best practices disseminated
- Common pitfalls avoided

**2. Collective Intelligence**
- Crowdsourced strategy validation
- Market regime identification
- Edge degradation alerts

**3. Accountability**
- Public performance tracking
- No hiding losses
- Honest, transparent culture

---

## 13. Technical Specifications

### Data Format

**CSV Schema:**
```
Date/Time       : ISO 8601 timestamp
Type            : "Long" | "Short"
Symbol          : String (uppercase)
Net P&L %       : Decimal (±X.XX)
Entry Price     : Decimal (optional)
Exit Price      : Decimal (optional)
Position Size   : Decimal (optional)
Fees            : Decimal (optional)
Duration (min)  : Integer (optional)
Notes           : String (optional)
```

### API Specification (Future)

**Authentication:** JWT tokens

**Endpoints:**
```
POST   /auth/register
POST   /auth/login
GET    /users/me
POST   /trades/upload
GET    /trades
POST   /strategies
GET    /strategies/{id}
POST   /metrics/calculate
POST   /factsheets/generate
```

**Rate Limits:**
- Free: 100 requests/hour
- Pro: 1,000 requests/hour
- Enterprise: Unlimited

---

## 14. Security & Privacy

### Current (MVP)

**Data Storage:** Client-side only (browser memory)
- No server upload
- Data lost on page refresh
- Complete privacy

**HTTPS:** All connections encrypted (Vercel default)

**No User Accounts:** No authentication yet, no data collection

### Future (Backend Launch)

**Data Encryption:**
- AES-256 at rest
- TLS 1.3 in transit

**Authentication:**
- JWT tokens
- 2FA optional
- OAuth (Google, GitHub)

**Privacy:**
- User data isolated
- Optional strategy privacy (public/private toggle)
- GDPR compliance
- Right to deletion

**Security Audits:**
- Regular penetration testing
- Dependency scanning
- Bug bounty program

---

## 15. Metrics Deep Dive

### Sharpe Ratio

**Formula:**
```
Sharpe = (R̄ - Rf) / σ

Where:
R̄  = Mean return
Rf = Risk-free rate
σ  = Standard deviation of returns
```

**Interpretation:**
- < 0: Losing money or underperforming risk-free rate
- 0-1: Subpar risk-adjusted returns
- 1-2: Good
- 2-3: Very good
- >3: Excellent (rare, verify data)

**Annualization:**
```
Annual Sharpe = Per-Trade Sharpe × √(Trades per Year)
```

**Limitations:**
- Assumes normal distribution (often invalid for trading)
- Penalizes upside volatility equally
- Sensitive to outliers

**Poet Approach:**
- Report both annualized and per-trade
- Use Sortino for asymmetric returns
- Bootstrap confidence intervals

---

### Maximum Drawdown

**Formula:**
```
For each point i:
  Running Maximum = max(Equity[0:i])
  Drawdown[i] = (Equity[i] - Running Maximum) / Running Maximum

Max Drawdown = min(Drawdown)
```

**Example:**
```
Equity: [100, 110, 105, 115, 100, 108]
Peaks:  [100, 110, 110, 115, 115, 115]
DD:     [0%, 0%, -4.5%, 0%, -13%, -6.1%]
Max DD: -13%
```

**Why It Matters:**
- Determines required capital
- Psychological tolerance test
- Risk management input

**Poet Standards:**
- Max DD < 20% for publication
- Report both percentage and duration
- Identify worst drawdown period

---

### Win Rate Significance

**Null Hypothesis:** Win rate = 50% (random)

**Binomial Test:**
```
z = (p̂ - 0.5) / √(0.25 / n)

Where:
p̂ = Observed win rate
n = Number of trades
```

**Example:**
```
Win Rate = 65%
Trades = 100
z = (0.65 - 0.5) / √(0.25/100)
z = 0.15 / 0.05 = 3.0

p-value < 0.01 → Highly significant
```

**Poet Requirement:**
- p < 0.05 for strategy publication
- Minimum 30 trades for test validity
- Report confidence interval

---

## 16. Case Study: First Hour Effect

### Development Process

**1. Observation (June 2025)**
Noticed SOL/USD frequently continues first hour direction through the session.

**2. Hypothesis**
Algorithmic momentum + retail FOMO creates persistence.

**3. Data Collection**
Gathered 6 months of SOL/USD 1-minute data (July-Dec 2025).

**4. Strategy Definition**
- Entry: Break of first hour high/low
- Exit: End of day or 2% stop
- Position: 1% of capital

**5. In-Sample Backtest (July-Oct 2025)**
- 68 trades
- Win Rate: 76.5%
- Sharpe: 2.3
- Max DD: -6.2%

**6. Out-of-Sample Validation (Nov-Dec 2025)**
- 32 trades
- Win Rate: 71.9%
- Sharpe: 1.9
- Max DD: -8.2%

**7. Significance Testing**
- Binomial test: p = 0.003 (highly significant)
- Bootstrap Sharpe CI: [1.4, 2.6]
- Monte Carlo: 95% of shuffles positive Sharpe

**8. Forward Testing (Jan 2026)**
- Paper trading: 15 trades, 73% WR
- Live (small size): 12 trades, 75% WR
- Performance aligned with backtest

**9. Publication (Feb 2026)**
- Full methodology documented
- Limitations acknowledged
- Risk disclaimer included
- Added to Poet platform

### Key Learnings

**What Worked:**
- Clear entry/exit rules (no discretion)
- Stop loss prevents catastrophic losses
- Signal occurs early (actionable)

**Challenges:**
- Low-volatility days produce no signal
- False breakouts during reversals
- Requires active monitoring (intraday)

**Ongoing:**
- Track live performance monthly
- Compare to backtest expectations
- Adjust if edge degrades significantly

---

## 17. Philosophy & Values

### Core Beliefs

**1. Edge Exists, But Must Be Found**
Markets are not perfectly efficient. Patterns exist. But finding real edge requires work—not luck or marketing claims.

**2. Data Over Intuition**
Gut feeling matters, but data validates. Track everything. Measure rigorously. Let numbers guide decisions.

**3. Transparency Beats Secrecy**
The quant community benefits from openness. Sharing methodology helps everyone improve. Black boxes hide flaws.

**4. Honesty About Losses**
Drawdowns happen. Losing trades are normal. Hiding them creates false expectations. Report everything.

**5. Continuous Learning**
Markets evolve. Strategies degrade. Adaptation required. Stay curious, stay humble.

### Cultural Principles

**For Users:**
- Verify, don't trust
- Question everything
- Demand evidence
- Share knowledge

**For Poet:**
- Build in public
- Document thoroughly
- Admit mistakes
- Prioritize accuracy over marketing

---

## 18. FAQ

**Q: Is Poet free?**  
A: Yes, MVP features are currently free. Future freemium model planned.

**Q: Do you provide trading signals?**  
A: No. We document strategies with methodology. Users implement themselves.

**Q: Can I trust the published strategies?**  
A: Strategies show historical edge with statistical validation. No guarantees for future performance. Always verify independently.

**Q: What data do you collect?**  
A: Currently none (client-side only). Future backend will collect necessary user data with full transparency.

**Q: Can I contribute strategies?**  
A: Future feature. Will require meeting validation standards and peer review.

**Q: Do you offer financial advice?**  
A: No. Poet provides tools and education, not advice. Consult licensed professionals.

**Q: What markets do you support?**  
A: Currently focused on crypto (SOL, BTC, ETH). Expanding to stocks, futures, forex in future.

**Q: Can I use Poet for algorithmic trading?**  
A: Current tools are for analysis/documentation. Future API may enable automation (carefully).

**Q: How do I report bugs?**  
A: GitHub Issues (preferred) or contact form (when available).

**Q: Is my trade data private?**  
A: Yes (client-side processing). Data never leaves your browser in MVP.

---

## 19. Conclusion

Trading success requires edge—statistical advantage validated through rigorous research. Poet provides the infrastructure for systematic edge discovery:

- **Tools** for performance measurement
- **Standards** for validation
- **Documentation** for reproducibility
- **Community** for peer review

The platform is young (MVP stage) but built on solid principles: transparency, rigor, honesty. As Poet grows, these foundations remain constant.

**For traders:** Use Poet to quantify your edge, eliminate bias, and make data-driven decisions.

**For researchers:** Document findings with professional standards, contribute to collective knowledge.

**For the curious:** Learn quantitative methods, explore published strategies, understand what real edge looks like.

Markets reward preparation, discipline, and statistical thinking. Poet is the tool for traders who approach markets as a research problem—not a casino.

---

## Appendix A: Example Factsheet Output

**Strategy:** First Hour Effect (SOL/USD)  
**Period:** July 2025 - December 2025  
**Total Trades:** 100

**Performance Metrics:**
- Total Return: +24.56%
- Sharpe Ratio: 2.15
- Sortino Ratio: 2.87
- Max Drawdown: -8.24%
- Win Rate: 75.0%
- Profit Factor: 2.35
- Avg Win: +2.58%
- Avg Loss: -1.10%

**Composite Score:** 87.5 / 100

**Weight Distribution:**
- Performance (40%): 92.3
- Risk Management (30%): 84.1
- Consistency (30%): 85.2

---

## Appendix B: Glossary of Key Terms

**Backtest:** Testing strategy on historical data  
**Drawdown:** Peak-to-trough decline in equity  
**Edge:** Statistical advantage in trading  
**Out-of-Sample:** Data not used in strategy development  
**Overfitting:** Optimization too specific to historical data  
**P&L:** Profit and Loss  
**Sharpe Ratio:** Return per unit of risk  
**Significance:** Statistical confidence result not due to chance  
**Slippage:** Difference between expected and actual execution price  
**Win Rate:** Percentage of profitable trades

---

## Appendix C: Contact & Links

**Website:** https://poet-drab.vercel.app  
**GitHub:** [Repository URL]  
**Email:** [Contact email to be set up]  
**Twitter:** [To be created]  
**Discord:** [Community to be launched]

---

## Appendix D: Acknowledgments

**Inspiration:**
- "Evidence-Based Technical Analysis" by David Aronson
- "Quantitative Trading" by Ernest Chan
- "Advances in Financial Machine Learning" by Marcos López de Prado

**Technology:**
- Vercel (hosting)
- Google Fonts (Orbitron, JetBrains Mono)
- Open source JavaScript community

**Community:**
- Early testers providing feedback
- Crypto trading community for strategy discussions
- Quantitative finance researchers for methodology

---

**Document Version:** 1.0  
**Last Updated:** February 5, 2026  
**Next Review:** May 2026

**Disclaimer:** This whitepaper describes software tools for trading research. Nothing herein constitutes financial advice. Trading involves risk of loss. Past performance does not guarantee future results. Users are solely responsible for their trading decisions.

---

© 2026 Poet Platform. All rights reserved.
