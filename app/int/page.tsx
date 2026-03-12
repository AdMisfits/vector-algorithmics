'use client';

import { useState } from 'react';
import Script from 'next/script';

const benefitItems = [
  { icon: 'shield', text: '12 Month Guarantee' },
  { icon: 'globe', text: 'Powering an EU Hedge Fund' },
  { icon: 'flag', text: 'Compatible with U.S. Brokers' },
  { icon: 'layers', text: 'Trades 3 Asset Classes' },
  { icon: 'users', text: '1,000+ Active Clients' },
  { icon: 'star', text: '4.6/5 Trustpilot Rating' },
  { icon: 'trending', text: '5-20% Historic Monthly Returns' },
  { icon: 'clock', text: '5 Year Track Record' },
  { icon: 'zap', text: '24/7 Coverage' },
];

const faqData = [
  {
    q: 'What kind of returns can I expect?',
    a: 'Our algorithms have historically averaged around 50% annually across all strategies. Monthly returns typically range between 5-20%, though performance varies by market conditions. We publish all results transparently, including losses—for example, September saw a -4% drawdown. Past performance does not guarantee future results.',
  },
  {
    q: 'Why license the algorithms instead of just trading them?',
    a: 'Firms like Two Sigma, AQR, and Renaissance Medallion run similar strategies—but they manage billions. Our edge works best in the $100K–$5M account range. Rather than raise a fund, we license the technology directly to individual traders who want institutional-grade automation at a fraction of the cost.',
  },
  {
    q: 'How is my capital protected?',
    a: 'We are a software provider—we never hold, manage, or have access to your capital. Your funds stay in your own account at a U.S. regulated brokerage with FDIC/SIPC insurance. You maintain full control of deposits, withdrawals, and account settings at all times.',
  },
  {
    q: 'How is this better than forex algorithms?',
    a: 'Most forex algorithms operate through offshore brokers with extreme leverage (50:1 to 500:1), exposing traders to catastrophic risk. Our strategies use zero leverage, trade through U.S. regulated brokerages, and focus on liquid U.S. markets—stocks, futures, and crypto—where execution quality and regulatory protections are significantly higher.',
  },
  {
    q: 'What happens if the algorithm stops working in a year?',
    a: 'Our strategies have been developed over a 5-year cycle with continuous refinement. Markets evolve, and so do our algorithms. That said, we back every license with a 12-month satisfaction guarantee. If performance does not meet expectations, you receive a full refund.',
  },
  {
    q: 'Do you trade your own capital using the same algorithm?',
    a: 'Yes. These algorithms were originally developed for proprietary trading. Our team runs the same strategies on our own capital. We eat our own cooking.',
  },
  {
    q: 'How is risk managed?',
    a: 'Every trade includes a defined stop-loss with engineered maximum drawdowns. We use sound position sizing relative to account equity, never employ leverage, and execute through regulated U.S. brokerages. Capital preservation is the foundation—returns follow.',
  },
  {
    q: 'What\'s the minimum to get started?',
    a: 'We require a minimum of $20,000 in liquid capital. This ensures the algorithms can execute proper position sizing and risk management across the strategies you choose.',
  },
  {
    q: 'Do you offer payment plans?',
    a: 'Yes. We partner with Splitit to offer interest-free installment plans. Payments are split across your existing credit card with no additional interest or fees. You\'ll need available credit on your card to qualify.',
  },
  {
    q: 'How liquid is this? Can I withdraw funds?',
    a: 'Completely liquid. Your capital sits in your own brokerage account. You can withdraw funds at any time, pause the algorithms, or adjust your settings. The software simply connects to your U.S. broker to execute trades—you retain full control.',
  },
];

function BenefitIcon({ type }: { type: string }) {
  const icons: Record<string, React.ReactNode> = {
    shield: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>,
    globe: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>,
    flag: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>,
    layers: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/></svg>,
    users: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
    star: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
    trending: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/></svg>,
    clock: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>,
    zap: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>,
  };
  return <>{icons[type]}</>;
}

function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="testimonial-stars">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="star" />
      ))}
    </div>
  );
}

function FAQItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="faq-item">
      <button
        className="faq-question"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        {question}
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <line x1="5" y1="12" x2="19" y2="12" />
        </svg>
      </button>
      <div className={`faq-answer ${open ? 'open' : ''}`}>
        <p>{answer}</p>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <main>
      {/* ===== STICKY NAVBAR ===== */}
      <nav className="navbar">
        <div className="container">
          <a href="/" className="navbar-logo">
            <img src="https://cdn.prod.website-files.com/67af85ea353c5f066fec698e/69091d8328c53ed57a28516d_HV8YTQsibbLd23QLmuXM8YJbUA%20(1)%202.png" alt="Vector Algorithmics" className="navbar-logo-img" />
            <span>Vector Algorithmics</span>
          </a>
          <a href="#book" className="cta-button">Book a Demo Session</a>
        </div>
      </nav>

      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="container">
          <h1>Grow your portfolio in any market.</h1>
          <p>
            Market-neutral strategies that profit from volatility—whether markets rise or fall.
            No leverage. Your capital stays in your own U.S. regulated account.
          </p>
          <div className="hero-proof">
            1,000+ active clients &middot; 4.6/5 Trustpilot &middot; 5-year track record
          </div>
          <a href="#book" className="cta-button">Book a Demo Session</a>
          <p className="cta-micro">Free 30-min call — no obligation</p>
        </div>
      </section>

      {/* ===== BENEFIT ROTATOR ===== */}
      <div className="benefit-rotator-widget">
        <div className="benefit-rotator-wrapper">
          <div className="benefit-rotator">
            {[...benefitItems, ...benefitItems].map((item, i) => (
              <div key={i} className="benefit-item">
                <BenefitIcon type={item.icon} />
                <span>{item.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== FEATURED IN ===== */}
      <section className="featured-in">
        <div className="container">
          <div className="featured-in-label">Featured In</div>
          <div className="featured-logos">
            <img src="/images/logos/business-insider.png" alt="Business Insider" height={24} />
            <img src="/images/logos/usa-today.png" alt="USA Today" height={24} />
            <img src="/images/logos/techbullion.webp" alt="TechBullion" height={24} />
            <img src="/images/logos/gbaf.avif" alt="GBAF" height={24} />
          </div>
        </div>
      </section>

      {/* ===== BEYOND BUY & HOLD ===== */}
      <section className="beyond-section">
        <div className="container">
          <div className="beyond-grid">
            <div className="beyond-content">
              <h2>Beyond Buy &amp; Hold</h2>
              <ul className="beyond-points">
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Market-neutral strategies that don&apos;t depend on bull markets
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Zero leverage — we never amplify risk to chase returns
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Defined risk on every trade with built-in stop losses
                </li>
                <li>
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                  Your capital, your account at FDIC/SIPC insured U.S. regulated brokerage
                </li>
              </ul>
            </div>
            <div className="beyond-chart">
              <img
                src="https://cdn.prod.website-files.com/67af85ea353c5f066fec698e/69352db5d26b124dbf373a01_vector-performance-chart.svg"
                alt="Vector Algorithmics performance chart"
                width={560}
                height={400}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== HOW IT WORKS ===== */}
      <section className="how-it-works">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">How It Works</div>
            <h2 className="section-title">Live in 3 Steps</h2>
          </div>
          <div className="how-steps">
            <div className="how-step">
              <div className="how-step-number">1</div>
              <h3>Book a Demo</h3>
              <p>See live performance data, ask hard questions, and decide if Vector is right for your account size and goals.</p>
              <div className="how-step-connector" aria-hidden="true" />
            </div>
            <div className="how-step">
              <div className="how-step-number">2</div>
              <h3>Connect Your Broker</h3>
              <p>Link your U.S. regulated brokerage account. Your capital never leaves your control—we simply connect the software.</p>
              <div className="how-step-connector" aria-hidden="true" />
            </div>
            <div className="how-step">
              <div className="how-step-number">3</div>
              <h3>Algorithms Trade for You</h3>
              <p>The system executes trades 24/7 with defined risk on every position. Monitor results in real time from your broker.</p>
            </div>
          </div>
          <div className="section-cta">
            <a href="#book" className="cta-button">Book a Demo Session</a>
            <p className="cta-micro">Free 30-min call — no obligation</p>
          </div>
        </div>
      </section>

      {/* ===== STRATEGIES ===== */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">Three Strategies, One Platform</div>
            <h2 className="section-title">Pick Your Edge</h2>
            <p className="section-subtitle">
              Each algorithm is purpose-built for its asset class with distinct entry logic, risk parameters, and market conditions.
            </p>
          </div>
          <div className="strategies-grid">
            {/* Stocks */}
            <div className="strategy-card">
              <div className="strategy-card-header">
                <div className="strategy-asset-label">Mega-Cap Equities</div>
                <h3>Earn 6-8% Monthly on Top Stocks</h3>
                <div className="strategy-tickers">TSLA, NVDA, AAPL, AMZN</div>
              </div>
              <p className="strategy-approach">
                Trend-following + mean-reversion on 1H charts. Captures momentum shifts in the most liquid names on the market.
              </p>
              <div className="strategy-stats">
                <div className="strategy-stat">
                  <span className="strategy-stat-label">Historical Return</span>
                  <span className="strategy-stat-value highlight">6-8% /mo</span>
                </div>
                <div className="strategy-stat">
                  <span className="strategy-stat-label">Max Drawdown</span>
                  <span className="strategy-stat-value">12.13%</span>
                </div>
                <div className="strategy-stat">
                  <span className="strategy-stat-label">Win Rate</span>
                  <span className="strategy-stat-value">82.19%</span>
                </div>
                <div className="strategy-stat">
                  <span className="strategy-stat-label">Trade Frequency</span>
                  <span className="strategy-stat-value">1-3 /mo</span>
                </div>
              </div>
            </div>

            {/* Futures */}
            <div className="strategy-card">
              <div className="strategy-card-header">
                <div className="strategy-asset-label">Nasdaq Composite Index</div>
                <h3>Capture 5-10% Monthly on Futures</h3>
                <div className="strategy-tickers">NDAQ, CL, DJI</div>
              </div>
              <p className="strategy-approach">
                Breakout trading with daily bias alignment. Targets high-probability entries at key intraday levels.
              </p>
              <div className="strategy-stats">
                <div className="strategy-stat">
                  <span className="strategy-stat-label">Historical Return</span>
                  <span className="strategy-stat-value highlight">5-10% /mo</span>
                </div>
                <div className="strategy-stat">
                  <span className="strategy-stat-label">Max Drawdown</span>
                  <span className="strategy-stat-value">15.12%</span>
                </div>
                <div className="strategy-stat">
                  <span className="strategy-stat-label">Win Rate</span>
                  <span className="strategy-stat-value">70.43%</span>
                </div>
                <div className="strategy-stat">
                  <span className="strategy-stat-label">Trade Frequency</span>
                  <span className="strategy-stat-value">15-20 /mo</span>
                </div>
              </div>
            </div>

            {/* Crypto */}
            <div className="strategy-card">
              <div className="strategy-card-header">
                <div className="strategy-asset-label">Large-Cap Cryptocurrencies</div>
                <h3>Target 10-15% Monthly on Crypto</h3>
                <div className="strategy-tickers">BTC, SOL, DOT, ETH</div>
              </div>
              <p className="strategy-approach">
                Trend-following and mean-reversion with volatility filtering. Adapts to crypto&apos;s unique market microstructure.
              </p>
              <div className="strategy-stats">
                <div className="strategy-stat">
                  <span className="strategy-stat-label">Historical Return</span>
                  <span className="strategy-stat-value highlight">10-15% /mo</span>
                </div>
                <div className="strategy-stat">
                  <span className="strategy-stat-label">Max Drawdown</span>
                  <span className="strategy-stat-value">6-10%</span>
                </div>
                <div className="strategy-stat">
                  <span className="strategy-stat-label">Win Rate</span>
                  <span className="strategy-stat-value">50-80%</span>
                </div>
                <div className="strategy-stat">
                  <span className="strategy-stat-label">Trade Frequency</span>
                  <span className="strategy-stat-value">3-4 /mo</span>
                </div>
              </div>
            </div>
          </div>
          <div className="section-cta">
            <a href="#book" className="cta-button">Book a Demo Session</a>
            <p className="cta-micro">See live performance data on the call</p>
          </div>
        </div>
      </section>

      {/* ===== BROKER COMPATIBILITY ===== */}
      <section className="broker-section">
        <div className="container">
          <div className="featured-in-label">Compatible Brokerages</div>
          <div className="broker-logos">
            <img src="/images/brokers/tradovate.png" alt="Tradovate" height={36} />
            <img src="/images/brokers/interactive-brokers.png" alt="Interactive Brokers" height={36} />
            <img src="/images/brokers/tradestation.png" alt="TradeStation" height={36} />
          </div>
        </div>
      </section>

      {/* ===== THE VECTOR DIFFERENCE ===== */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">Why Vector</div>
            <h2 className="section-title">The Vector Difference</h2>
            <p className="section-subtitle">
              What separates institutional-grade automation from everything else on the market.
            </p>
          </div>
          <div className="difference-grid">
            <div className="difference-card">
              <div className="difference-icon">
                <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="difference-title">Zero Leverage</div>
              <p className="difference-desc">
                Returns come from edge, not risk amplification. We never use margin or leverage to inflate performance numbers.
              </p>
            </div>
            <div className="difference-card">
              <div className="difference-icon">
                <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="8" x2="12" y2="12" strokeLinecap="round" strokeLinejoin="round"/><line x1="12" y1="16" x2="12.01" y2="16" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="difference-title">Defined Risk</div>
              <p className="difference-desc">
                Every trade has a stop-loss. Maximum drawdowns are engineered into the system, not left to chance.
              </p>
            </div>
            <div className="difference-card">
              <div className="difference-icon">
                <svg viewBox="0 0 24 24"><rect x="3" y="11" width="18" height="11" rx="2" ry="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M7 11V7a5 5 0 0 1 10 0v4" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="difference-title">U.S. Regulated Brokerages</div>
              <p className="difference-desc">
                Your capital stays in your own account at an FDIC/SIPC insured brokerage. We never hold or manage your funds.
              </p>
            </div>
            <div className="difference-card">
              <div className="difference-icon">
                <svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" strokeLinecap="round" strokeLinejoin="round"/><circle cx="12" cy="12" r="3" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="difference-title">Full Transparency</div>
              <p className="difference-desc">
                We publish losses alongside wins. September was -4%. No cherry-picking, no hiding behind &ldquo;simulated&rdquo; results.
              </p>
            </div>
            <div className="difference-card">
              <div className="difference-icon">
                <svg viewBox="0 0 24 24"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" strokeLinecap="round" strokeLinejoin="round"/><polyline points="14 2 14 8 20 8" strokeLinecap="round" strokeLinejoin="round"/><line x1="16" y1="13" x2="8" y2="13" strokeLinecap="round" strokeLinejoin="round"/><line x1="16" y1="17" x2="8" y2="17" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="difference-title">60/40 Tax Treatment</div>
              <p className="difference-desc">
                Section 1256 futures contracts qualify for blended tax rates—60% long-term, 40% short-term—regardless of holding period.
              </p>
            </div>
            <div className="difference-card">
              <div className="difference-icon">
                <svg viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6" strokeLinecap="round" strokeLinejoin="round"/><polyline points="8 6 2 12 8 18" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </div>
              <div className="difference-title">No Black Boxes</div>
              <p className="difference-desc">
                Visible logic: RSI divergence, VWAP levels, session opens. You can see exactly why every trade was taken.
              </p>
            </div>
          </div>
          <div className="section-cta">
            <a href="#book" className="cta-button">Book a Demo Session</a>
            <p className="cta-micro">Free 30-min call — no obligation</p>
          </div>
        </div>
      </section>

      {/* ===== TRUSTPILOT ===== */}
      <section className="trustpilot-section">
        <div className="container">
          <div className="trustpilot-badge">
            <div className="trustpilot-stars">
              {'★★★★★'}
            </div>
            <div className="trustpilot-text">
              <strong>4.5/5</strong> on Trustpilot &middot; Verified Reviews
            </div>
          </div>
        </div>
      </section>

      {/* ===== TESTIMONIALS ===== */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">Results</div>
            <h2 className="section-title">What Our Clients Say</h2>
          </div>
          <div className="testimonials-grid">
            {/* Featured */}
            <div className="testimonial-card featured">
              <Stars />
              <p>
                &ldquo;7 months later, my cash account has grown from $50k to $124,618.43. I&apos;ve tried
                other services before, but Vector is by far the most transparent and most ethical
                company I&apos;ve worked with. The results speak for themselves.&rdquo;
              </p>
              <div className="testimonial-footer">
                <div className="testimonial-avatar avatar-purple">GS</div>
                <div className="testimonial-author">
                  <strong>Graham Sinclair <span className="verified-badge">Verified</span></strong>
                  <span>July 02, 2025</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <Stars />
              <p>
                &ldquo;64% account growth since I started. The automation takes away all the stress
                of manual trading. I just check in once a day and the algorithms do the rest.&rdquo;
              </p>
              <div className="testimonial-footer">
                <div className="testimonial-avatar avatar-blue">CS</div>
                <div className="testimonial-author">
                  <strong>Connor S. <span className="verified-badge">Verified</span></strong>
                  <span>July 18, 2025</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <Stars />
              <p>
                &ldquo;42-47% returns on the crypto algorithms alone. I was skeptical at first
                but the track record and transparency won me over. Best investment I&apos;ve made.&rdquo;
              </p>
              <div className="testimonial-footer">
                <div className="testimonial-avatar avatar-green">JB</div>
                <div className="testimonial-author">
                  <strong>Jonathan B. <span className="verified-badge">Verified</span></strong>
                  <span>June 21, 2025</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <Stars />
              <p>
                &ldquo;2.5 years in, multiple six figures in returns. The community and the live
                sessions add a layer of support you won&apos;t find anywhere else.&rdquo;
              </p>
              <div className="testimonial-footer">
                <div className="testimonial-avatar avatar-orange">RM</div>
                <div className="testimonial-author">
                  <strong>Ruffalo McCosworth <span className="verified-badge">Verified</span></strong>
                  <span>August 01, 2025</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <Stars />
              <p>
                &ldquo;The focus on 1:1 or 2:1 P/L ratios gives me confidence. Every trade has
                a clear plan and defined risk. This is how institutional trading should be.&rdquo;
              </p>
              <div className="testimonial-footer">
                <div className="testimonial-avatar avatar-teal">J</div>
                <div className="testimonial-author">
                  <strong>Jian <span className="verified-badge">Verified</span></strong>
                  <span>July 25, 2025</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <Stars />
              <p>
                &ldquo;$14K prop firm payout in just 3 weeks using the futures algorithm.
                The consistency is unreal. Already scaling to a bigger account.&rdquo;
              </p>
              <div className="testimonial-footer">
                <div className="testimonial-avatar avatar-pink">ER</div>
                <div className="testimonial-author">
                  <strong>Edgar Reynaga <span className="verified-badge">Verified</span></strong>
                  <span>May 30, 2025</span>
                </div>
              </div>
            </div>

            <div className="testimonial-card">
              <Stars />
              <p>
                &ldquo;Multiple prop firm payouts achieved. The algorithms are consistent
                and the support team is always available. Couldn&apos;t ask for more.&rdquo;
              </p>
              <div className="testimonial-footer">
                <div className="testimonial-avatar avatar-red">B</div>
                <div className="testimonial-author">
                  <strong>Bo <span className="verified-badge">Verified</span></strong>
                  <span>June 15, 2025</span>
                </div>
              </div>
            </div>
          </div>
          <div className="section-cta">
            <a href="#book" className="cta-button">Book a Demo Session</a>
            <p className="cta-micro">Join 1,000+ clients already using Vector</p>
          </div>
        </div>
      </section>

      {/* ===== COMMUNITY ===== */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">Community</div>
            <h2 className="section-title">More Than Software</h2>
          </div>

          <div className="quote-card">
            <div className="quote-text">&ldquo;It&apos;s like joining a fraternity.&rdquo;</div>
            <div className="quote-attribution">— Dr. Chad Clark</div>
          </div>

          <div className="stats-row">
            <div className="stat-item">
              <div className="stat-value">15+</div>
              <div className="stat-label">Live Sessions / Week</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">5</div>
              <div className="stat-label">Days of Premarket Calls</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">1,000+</div>
              <div className="stat-label">Active Members</div>
            </div>
          </div>


          <div className="confidence-callout">
            <div className="confidence-icon">
              <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" strokeLinecap="round" strokeLinejoin="round"/><circle cx="9" cy="7" r="4" strokeLinecap="round" strokeLinejoin="round"/><path d="M23 21v-2a4 4 0 0 0-3-3.87" strokeLinecap="round" strokeLinejoin="round"/><path d="M16 3.13a4 4 0 0 1 0 7.75" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </div>
            <p className="confidence-text">
              <strong>You&apos;re not doing this alone.</strong> Every member gets access to
              live premarket calls, trading sessions, strategy Q&amp;As, and a private community
              of 1,000+ active traders.
            </p>
          </div>
          <div className="section-cta">
            <a href="#book" className="cta-button">Book a Demo Session</a>
            <p className="cta-micro">Get community access when you join</p>
          </div>
        </div>
      </section>

      {/* ===== LEADERSHIP ===== */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">Leadership</div>
            <h2 className="section-title">Built by people who&apos;ve done this before.</h2>
            <p className="section-subtitle">
              Not anonymous founders. Not offshore entities. A team you can verify, building systems we use ourselves.
            </p>
          </div>
          <div className="team-grid">
            <div className="team-card">
              <img className="team-photo" src="/images/team/luc-lising.webp" alt="Luc Lising" width={400} height={400} />
              <div className="team-info">
                <div className="team-name">Luc Lising</div>
                <div className="team-role">Chief Executive Officer</div>
                <p className="team-bio">Former Account Executive at REC Canada. 9+ figures in client investments managed.</p>
                <a href="https://www.linkedin.com/in/luc-lising-a43014164/" className="linkedin-link" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="team-card">
              <img className="team-photo" src="https://cdn.prod.website-files.com/67af85ea353c5f066fec698e/69af2526ff2342f3199df434_image0.jpeg" alt="Maxwell Hines" width={400} height={400} />
              <div className="team-info">
                <div className="team-name">Maxwell Hines</div>
                <div className="team-role">Chief Investment Officer</div>
                <p className="team-bio">Former Fixed Income Portfolio Management at AllianceBernstein. Aspiring Chess GM.</p>
                <a href="https://www.linkedin.com/in/maxhines/" className="linkedin-link" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="team-card">
              <img className="team-photo" src="https://cdn.prod.website-files.com/67af85ea353c5f066fec698e/69af32ed2e06383651e6f92d_Gemini_Generated_Image_k2wxamk2wxamk2wx.webp" alt="Rich Lovatt" width={400} height={400} />
              <div className="team-info">
                <div className="team-name">Rich Lovatt</div>
                <div className="team-role">Chief Operating Officer</div>
                <p className="team-bio">15+ years in sales leadership and operations. Former film and TV actor.</p>
                <a href="https://www.linkedin.com/in/richardjohnlovatt/" className="linkedin-link" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="team-card">
              <img className="team-photo" src="/images/team/jason-silver.webp" alt="Jason Silver" width={400} height={400} />
              <div className="team-info">
                <div className="team-name">Jason Silver</div>
                <div className="team-role">Head of Quantitative Strategy</div>
                <p className="team-bio">30 years active trading. 8 years as proprietary trader at JPMorgan. Former FDNY firefighter.</p>
                <a href="https://www.linkedin.com/in/jason-silver-969b0464/" className="linkedin-link" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
              </div>
            </div>

            <div className="team-card">
              <img className="team-photo" src="/images/team/gareth-wicks.webp" alt="Gareth Wicks" width={400} height={400} />
              <div className="team-info">
                <div className="team-name">Gareth Wicks</div>
                <div className="team-role">Head of Client Success</div>
                <p className="team-bio">Built and operated a live trading mentorship business with 200+ active traders.</p>
                <a href="https://www.linkedin.com/in/gareth-wicks-ab4aa61a2/" className="linkedin-link" target="_blank" rel="noopener noreferrer">
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  LinkedIn
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQ ===== */}
      <section className="faq-section">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">Frequently Asked Questions</h2>
          </div>
          <div className="faq-list">
            {faqData.map((item, i) => (
              <FAQItem key={i} question={item.q} answer={item.a} />
            ))}
          </div>
          <div className="section-cta">
            <a href="#book" className="cta-button">Book a Demo Session</a>
            <p className="cta-micro">Still have questions? Ask them on the call</p>
          </div>
        </div>
      </section>

      {/* ===== GUARANTEE ===== */}
      <section className="guarantee-section">
        <div className="container">
          <div className="section-eyebrow">Our Promise</div>
          <h2>12 Month Performance Guarantee</h2>
          <p>
            Anyone can look good for 30 days. That&apos;s why we give you 12 months to evaluate
            the algorithms in live market conditions. If it doesn&apos;t perform, full refund.
          </p>
        </div>
      </section>

      {/* ===== SMART CAPTURE WIDGET ===== */}
      <section id="book" className="smart-capture-section">
        <div className="container">
          <div className="section-header">
            <div className="section-eyebrow">Get Started</div>
            <h2 className="section-title">Book a Demo Session</h2>
            <p className="section-subtitle">
              Answer two quick questions, then pick a time on the calendar. No pressure, no pitch—just data.
            </p>
          </div>

          <section className="capture-topbar">
            <div className="topbar-badge" id="brandBadge">Smart lead capture</div>
            <div style={{ display: 'contents' }}>
              <div className="step-pill active" id="stepPillForm">Fill out the form</div>
              <div className="step-pill" id="stepPillBooking">Book your event</div>
            </div>
          </section>

          <section className="capture-card">
            <section className="form-panel">
              <div className="panel-header">
                <p className="eyebrow" id="panelEyebrow">Lead screen</p>
                <p className="step-meta" id="stepMeta">Step 1 of 2</p>
                <h3 className="panel-title" id="panelTitle">Book a Demo Session</h3>
                <p className="panel-description" id="panelDescription">
                  One focused call to see exactly how our all-weather approach would treat your capital.
                </p>
              </div>

              <div className="panel-body" id="panelBody"></div>

              <div className="panel-actions">
                <button className="button button-secondary" type="button" id="secondaryAction" hidden>Back</button>
                <button className="button button-primary" type="button" id="primaryAction">Continue</button>
              </div>

              <p className="status-message" id="statusMessage" hidden></p>
            </section>

            <aside className="calendar-panel" id="calendarPanel">
              <div className="calendar-header">
                <div>
                  <p className="calendar-kicker" id="calendarKicker">
                    Times shown in <strong data-user-timezone="">your timezone</strong>
                  </p>
                  <h2 className="calendar-title" id="calendarTitle" style={{ display: 'none' }}>
                    Your booking page
                  </h2>
                </div>
                <p className="calendar-note" id="calendarNote">
                  Please fill out the form before choosing your time slot.
                </p>
              </div>

              <div className="calendar-frame-wrap" id="calendarFrameWrap">
                <div className="calendar-overlay" id="calendarOverlay">
                  <div className="overlay-card">
                    <p className="overlay-title" id="calendarOverlayTitle">
                      Please fill out the form before choosing your time slot.
                    </p>
                    <p className="overlay-copy" id="calendarOverlayCopy"></p>
                  </div>
                </div>

                <div className="calendar-placeholder" id="calendarPlaceholder" hidden>
                  <p id="calendarPlaceholderText">Calendar loading...</p>
                </div>

                <iframe
                  id="bookingFrame"
                  title="Booking Calendar"
                  style={{ minHeight: '600px', width: '100%', border: 'none' }}
                ></iframe>
              </div>
            </aside>
          </section>

          <nav className="sc-legal-links" id="legalLinks"></nav>

          <p className="contact-line" style={{ textAlign: 'center', marginTop: 32 }}>
            Questions? Email us at <a href="mailto:support@vectoralgorithmics.com">support@vectoralgorithmics.com</a>
          </p>
        </div>
      </section>

      <Script src="https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2" strategy="beforeInteractive" />
      <Script src="/smart-capture/config-int.js" strategy="afterInteractive" />
      <Script src="/smart-capture/app.js" strategy="afterInteractive" />

      {/* ===== FOOTER ===== */}
      <footer className="site-footer">
        <div className="container">
          <div className="footer-top">
            <div className="footer-copyright">&copy; Vector Algorithmics. All rights reserved.</div>
            <div className="footer-links">
              <a href="/privacy-policy">Privacy Policy</a>
              <a href="/terms-of-service">Terms of Service</a>
              <a href="/disclaimer">Disclaimer</a>
              <a href="/returns">Returns</a>
              <a href="/eula">EULA</a>
            </div>
            <div className="footer-social">
              <a href="#" aria-label="Facebook" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" aria-label="Instagram" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z"/></svg>
              </a>
              <a href="#" aria-label="YouTube" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
              </a>
              <a href="#" aria-label="Discord" target="_blank" rel="noopener noreferrer">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z"/></svg>
              </a>
            </div>
          </div>

          <div className="footer-payment">
            <img src="/images/payment/visa.png" alt="Visa" />
            <img src="/images/payment/mastercard.png" alt="Mastercard" />
            <img src="/images/payment/amex.png" alt="American Express" />
            <img src="/images/payment/discover.png" alt="Discover" />
            <img src="/images/payment/coinbase.png" alt="Coinbase" />
            <img src="/images/payment/solana.png" alt="Solana" />
            <span className="footer-payment-note">All payments processed securely. *Conditions apply</span>
          </div>

          <div className="footer-disclaimer">
            <p>
              Trading involves substantial risk of loss and is not suitable for all investors. Past performance
              is not indicative of future results. The information provided is for educational purposes only
              and should not be construed as investment advice. Testimonials appearing on this site are
              individual experiences, reflecting real-life experiences of those who have used our products.
              However, they are individual results and results do vary. We do not claim that they are typical
              results that consumers will generally achieve. The testimonials are not necessarily representative
              of all of those who will use our products. Vector Algorithmics is a software provider and does
              not provide investment advice or manage client funds. CFTC Rule 4.41 — Hypothetical or simulated
              performance results have certain limitations. Unlike an actual performance record, simulated
              results do not represent actual trading. This site is not a part of Facebook or Facebook Inc.
              Additionally, this site is not endorsed by Facebook in any way.
            </p>
          </div>
          <div className="footer-address">
            4272 Weston Rd, North York, Toronto, ON M9L 1W9
          </div>
        </div>
      </footer>
    </main>
  );
}
