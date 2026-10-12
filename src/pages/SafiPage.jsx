import React, { useState, useEffect } from 'react';
import { ArrowRight, CheckCircle2, ChevronDown, ChevronUp, Sparkles, Building2, Shield, Lock, Layers } from 'lucide-react';

export default function SafiPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    source: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [responseMsg, setResponseMsg] = useState('');
  const [showBudgetingModal, setShowBudgetingModal] = useState(false);
  const [showTechAccordion, setShowTechAccordion] = useState(false);

  useEffect(() => {
    document.title = 'SAFI — Financial Behaviour Infrastructure | Valeris Technologies';
    window.scrollTo(0, 0);

    const saved = localStorage.getItem('safi_early_access_joined');
    if (saved) {
      setIsSubmitted(true);
    }
  }, []);

  const scrollToEarlyAccess = (e) => {
    if (e) e.preventDefault();
    const el = document.getElementById('early-access');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
      const firstInput = el.querySelector('input');
      if (firstInput) firstInput.focus();
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (submitError) setSubmitError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.fullName.trim() || !formData.email.trim()) {
      setSubmitError('Please provide your full name and email address.');
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const payload = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      source: formData.source,
    };

    // Candidates: primary relative endpoint or direct Apache URL
    const endpoints = [
      '/api/early-access.php',
      'http://localhost/safi/valeristechltd/api/early-access.php',
    ];

    let lastError = null;
    let success = false;

    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        const data = await res.json().catch(() => null);

        if (res.ok && data?.success) {
          setIsSubmitted(true);
          setResponseMsg(data.message || 'Thank you for joining SAFI Early Access!');
          try {
            localStorage.setItem(
              'safi_early_access_joined',
              JSON.stringify({ ...formData, joinedAt: new Date().toISOString() })
            );
          } catch {
            // Ignore localStorage errors
          }
          success = true;
          break;
        } else if (data && data.message) {
          lastError = data.message;
          break; // Validation or explicit message from server
        } else {
          lastError = `Server responded with status ${res.status}`;
        }
      } catch (err) {
        lastError = err.message || 'Network error';
      }
    }

    if (!success) {
      setSubmitError(lastError || 'Unable to submit at this time. Please check your connection.');
    }

    setIsSubmitting(false);
  };

  return (
    <div className="safi-editorial-page">
      {/* =====================================================================
          1. HERO SECTION (Exact pixel match to design)
          ===================================================================== */}
      <section className="safi-hero-section">
        <div className="container">
          <div className="safi-hero-grid">
            {/* Left: Typography & Primary Action */}
            <div className="safi-hero-content">
              {/* SAFI Brand Wordmark */}
              <div className="safi-hero-brand">
                <div className="safi-logo-mark" aria-label="SAFI">
                  <span className="safi-letter">S</span>
                  <span className="safi-letter">A</span>
                  <span className="safi-letter">F</span>
                  <span className="safi-letter safi-letter-i">
                    I
                    <span className="safi-i-accent" />
                  </span>
                </div>
                <div className="safi-submark-tag">
                  <span>FINANCIAL BEHAVIOUR</span>
                  <span>INFRASTRUCTURE</span>
                </div>
              </div>

              {/* Main Headline in Editorial Serif */}
              <h1 className="safi-hero-headline">
                Same money.<br />
                A more<br />
                intentional<br />
                tomorrow.
              </h1>

              {/* Description Paragraph */}
              <p className="safi-hero-desc">
                SAFI is financial behaviour infrastructure that works within your bank,
                helping you make more intentional decisions with your money, without
                changing how you bank.
              </p>

              {/* CTA & Subtext */}
              <div className="safi-hero-actions">
                <a
                  href="#early-access"
                  onClick={scrollToEarlyAccess}
                  className="safi-btn-hero"
                  id="hero-early-access-btn"
                >
                  <span>Join Early Access</span>
                  <span className="safi-arrow-glyph">→</span>
                </a>
                <span className="safi-hero-subtext">
                  Be part of what’s next.
                </span>
              </div>
            </div>

            {/* Right: Editorial Visual, Gold Accent & Floating Note */}
            <div className="safi-hero-visual">
              {/* SVG Gold Rings and Emerald Disc Overlay */}
              <svg className="safi-hero-gold-loops" viewBox="0 0 500 500" fill="none" aria-hidden="true">
                {/* Dark emerald circular backdrop */}
                <circle cx="340" cy="140" r="66" fill="#093527" />

                {/* Upper delicate gold ellipse */}
                <path
                  d="M260,180 C240,110 320,60 380,85 C440,110 440,190 370,205 C310,215 270,160 290,130"
                  stroke="#c59d5f"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                />

                {/* Secondary inner gold ellipse */}
                <ellipse
                  cx="335"
                  cy="142"
                  rx="68"
                  ry="48"
                  stroke="#d4af37"
                  strokeWidth="1.2"
                  transform="rotate(-26 335 142)"
                  opacity="0.8"
                />

                {/* Lower gold loop swooping down towards sticky note */}
                <path
                  d="M375,230 C425,290 455,370 415,430 C385,460 350,445 375,405 C405,355 450,410 475,460"
                  stroke="#c59d5f"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>

              {/* Sunlit Desk Photography */}
              <div className="safi-hero-img-card">
                <img
                  src="/images/safi/safi-hero-desk.jpg"
                  alt="Work desk with open laptop, coffee mug, and houseplant in morning sun"
                  className="safi-hero-img"
                  loading="eager"
                />
              </div>

              {/* Realistic Torn Paper Sticky Note */}
              <div className="safi-sticky-note hero-note" aria-hidden="true">
                <p className="sticky-note-text">
                  Better<br />
                  habits.<br />
                  Brighter<br />
                  possibilities.<br />
                  <span className="sticky-heart">♡</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. THREE-PILLAR FEATURE STRIP
          ===================================================================== */}
      <section className="safi-pillars-section">
        <div className="container">
          <div className="safi-pillars-grid">
            {/* Pillar 1: More Control */}
            <div className="safi-pillar-item">
              <div className="safi-pillar-icon" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#06241b" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                  <circle cx="15" cy="6" r="2.5" fill="#faf8f4" stroke="#06241b" strokeWidth="2" />
                  <circle cx="8" cy="12" r="2.5" fill="#faf8f4" stroke="#06241b" strokeWidth="2" />
                  <circle cx="16" cy="18" r="2.5" fill="#faf8f4" stroke="#06241b" strokeWidth="2" />
                </svg>
              </div>
              <span className="safi-pillar-label">MORE CONTROL</span>
            </div>

            {/* Pillar 2: Better Decisions */}
            <div className="safi-pillar-item">
              <div className="safi-pillar-icon" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="#06241b">
                  <rect x="5" y="13" width="3.4" height="8" rx="1.7" />
                  <rect x="10.3" y="8" width="3.4" height="13" rx="1.7" />
                  <rect x="15.6" y="3" width="3.4" height="18" rx="1.7" />
                </svg>
              </div>
              <span className="safi-pillar-label">BETTER DECISIONS</span>
            </div>

            {/* Pillar 3: A More Intentional Tomorrow */}
            <div className="safi-pillar-item">
              <div className="safi-pillar-icon" aria-hidden="true">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#06241b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21V11" />
                  <path d="M12 11C12 6.5 8 5 4 6C3.5 10 6.5 13 12 13" />
                  <path d="M12 9C12 4.5 16 3 20 4C20.5 8 17.5 11 12 11" />
                </svg>
              </div>
              <span className="safi-pillar-label">A MORE INTENTIONAL TOMORROW</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. FULL-WIDTH SPLIT CARD (EARLY ACCESS BANNER)
          ===================================================================== */}
      <section className="safi-split-card-section">
        <div className="container">
          <div className="safi-split-container">
            {/* Left Column: Portrait Photography with Handwritten Overlay */}
            <div className="safi-split-photo">
              <img
                src="/images/safi/safi-woman-mug.jpg"
                alt="Young woman holding coffee cup looking thoughtfully with calm confidence"
                className="safi-split-img"
                loading="lazy"
              />

              {/* Overlaid Gold Loops & Handwritten Text */}
              <div className="safi-split-handwritten-overlay">
                <svg className="safi-gold-loop-svg" viewBox="0 0 100 100" fill="none">
                  <ellipse
                    cx="52"
                    cy="48"
                    rx="42"
                    ry="28"
                    stroke="#d4af37"
                    strokeWidth="1.4"
                    transform="rotate(-25 52 48)"
                    opacity="0.85"
                  />
                </svg>
                <p className="handwritten-banner-text">
                  Same<br />
                  money.<br />
                  A more<br />
                  intentional<br />
                  tomorrow.
                </p>
              </div>
            </div>

            {/* Right Column: Dark Emerald Early Access Invitation */}
            <div className="safi-split-content">
              <span className="safi-badge-early">EARLY ACCESS</span>
              <h2 className="safi-split-title">
                Be part of what’s next.
              </h2>
              <p className="safi-split-desc">
                We’re opening early access to SAFI. Join to get updates, participate
                in upcoming opportunities and be among the first to experience a new
                approach to managing your money, built around your goals and real life.
              </p>
              <a
                href="#early-access"
                onClick={scrollToEarlyAccess}
                className="safi-btn-white"
                id="banner-early-access-btn"
              >
                <span>Join Early Access</span>
                <span className="safi-arrow-glyph">→</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. "WHAT IS SAFI?" SECTION
          ===================================================================== */}
      <section className="safi-whatis-section">
        <div className="container">
          <div className="safi-whatis-grid">
            {/* Left: What is SAFI Copy & interactive clarification */}
            <div className="safi-whatis-text">
              <h2 className="safi-editorial-heading">What is SAFI?</h2>
              <div className="safi-accent-bar" />

              <p className="safi-whatis-desc">
                SAFI is a behavioural banking infrastructure that sits within the
                banking experience. It combines intelligence and allocation rules to help
                you manage your money around your goals, habits and everyday life.
              </p>

              <div>
                <button
                  type="button"
                  onClick={() => setShowBudgetingModal(!showBudgetingModal)}
                  className="safi-link-arrow"
                  aria-expanded={showBudgetingModal}
                >
                  <span>Not a budgeting app.</span>
                  <span className="safi-arrow-glyph">→</span>
                </button>

                {showBudgetingModal && (
                  <div className="safi-budgeting-explainer">
                    <p style={{ margin: 0, fontSize: '0.94rem', color: '#2b453a', lineHeight: 1.65 }}>
                      <strong>Why SAFI is different:</strong> Traditional budgeting apps require manual
                      receipt uploads, retroactive categorization, and guilt-driven review. SAFI operates
                      proactively <em>inside</em> the banking rails, guiding daily allocations and enforcing
                      purposeful discipline before money is spent.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Right: Phone on Desk Photo with Handwritten Sticky Note */}
            <div className="safi-whatis-visual">
              <div className="safi-whatis-img-card">
                <img
                  src="/images/safi/safi-phone-desk.jpg"
                  alt="Phone on wooden desk next to notebook and cup in morning light"
                  className="safi-whatis-img"
                  loading="lazy"
                />
              </div>

              {/* Sticky Paper Note */}
              <div className="safi-sticky-note whatis-note" aria-hidden="true">
                <p className="sticky-note-text">
                  Guidance<br />
                  today.<br />
                  More for<br />
                  tomorrow.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. "HOW SAFI WORKS" SECTION
          ===================================================================== */}
      <section className="safi-how-section">
        <div className="container">
          <h2 className="safi-editorial-heading">How SAFI works</h2>
          <div className="safi-accent-bar" />

          <div className="safi-how-grid">
            {/* Step 1 */}
            <div className="safi-how-card">
              <div className="safi-how-icon-circle" aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#06241b" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                  <circle cx="15" cy="6" r="2.5" fill="#ede7dc" stroke="#06241b" strokeWidth="2" />
                  <circle cx="8" cy="12" r="2.5" fill="#ede7dc" stroke="#06241b" strokeWidth="2" />
                  <circle cx="16" cy="18" r="2.5" fill="#ede7dc" stroke="#06241b" strokeWidth="2" />
                </svg>
              </div>
              <h3 className="safi-how-title">
                Understands your spending behaviour
              </h3>
              <p className="safi-how-desc">
                Analyses transactions to identify patterns and priorities.
              </p>
            </div>

            {/* Step 2 */}
            <div className="safi-how-card">
              <div className="safi-how-icon-circle" aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#06241b" strokeWidth="2.1" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="4" y="3" width="16" height="18" rx="2" />
                  <line x1="8" y1="8" x2="16" y2="8" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                  <line x1="8" y1="16" x2="13" y2="16" />
                </svg>
              </div>
              <h3 className="safi-how-title">
                Provides guidance
              </h3>
              <p className="safi-how-desc">
                Helps you make better day-to-day decisions based on your goals.
              </p>
            </div>

            {/* Step 3 */}
            <div className="safi-how-card">
              <div className="safi-how-icon-circle" aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#06241b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <h3 className="safi-how-title">
                Keeps your goals in view
              </h3>
              <p className="safi-how-desc">
                Gives you more control, keeping your bigger goals in sight.
              </p>
            </div>

            {/* Step 4 */}
            <div className="safi-how-card">
              <div className="safi-how-icon-circle" aria-hidden="true">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#06241b" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 21V11" />
                  <path d="M12 11C12 6.5 8 5 4 6C3.5 10 6.5 13 12 13" />
                  <path d="M12 9C12 4.5 16 3 20 4C20.5 8 17.5 11 12 11" />
                </svg>
              </div>
              <h3 className="safi-how-title">
                Works within your bank
              </h3>
              <p className="safi-how-desc">
                Built to integrate with your existing banking experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. "JOIN SAFI EARLY ACCESS" FORM CARD
          ===================================================================== */}
      <section className="safi-form-section" id="early-access">
        <div className="container">
          <div className="safi-form-card">
            <h2 className="safi-form-title">Join SAFI Early Access</h2>
            <div className="safi-accent-bar" />
            <p className="safi-form-desc">
              Fill in your details to receive updates and be part of our early access community.
            </p>

            {isSubmitted ? (
              <div className="safi-success-alert">
                <CheckCircle2 size={44} color="#059669" style={{ margin: '0 auto 14px' }} />
                <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: '#06241b', marginBottom: '8px' }}>
                  You’re on the early access list!
                </h3>
                <p style={{ fontSize: '0.94rem', color: '#2b453a', lineHeight: 1.6, margin: '0 auto 20px', maxWidth: '440px' }}>
                  {responseMsg || "Thank you for joining. We’ve reserved your spot and will share updates as rollouts begin."}
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setIsSubmitted(false);
                    setFormData({ fullName: '', email: '', phone: '', source: '' });
                    setResponseMsg('');
                    try {
                      localStorage.removeItem('safi_early_access_joined');
                    } catch {}
                  }}
                  className="btn-outline"
                  style={{ fontSize: '0.85rem', padding: '8px 20px', borderColor: '#06241b', color: '#06241b' }}
                >
                  Submit another contact
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="safi-form">
                {submitError && (
                  <div style={{
                    backgroundColor: '#fef2f2',
                    border: '1px solid #fecaca',
                    color: '#991b1b',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    fontSize: '0.88rem',
                    marginBottom: '18px',
                    textAlign: 'left'
                  }}>
                    {submitError}
                  </div>
                )}
                <div className="safi-form-group">
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="Full Name"
                    required
                    className="safi-input"
                    autoComplete="name"
                  />
                </div>

                <div className="safi-form-group">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="Email Address"
                    required
                    className="safi-input"
                    autoComplete="email"
                  />
                </div>

                <div className="safi-form-group">
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Phone Number (Optional)"
                    className="safi-input"
                    autoComplete="tel"
                  />
                </div>

                <div className="safi-form-group">
                  <div className="safi-select-wrap">
                    <select
                      name="source"
                      value={formData.source}
                      onChange={handleInputChange}
                      className="safi-select"
                    >
                      <option value="">How did you hear about SAFI?</option>
                      <option value="Social Media">Social Media</option>
                      <option value="Friend / Colleague">Friend or Colleague</option>
                      <option value="Bank Partner">Bank Partner / Financial Institution</option>
                      <option value="News / Article">News, Article or Tech Publication</option>
                      <option value="Search Engine">Search Engine</option>
                      <option value="Other">Other</option>
                    </select>
                    <ChevronDown size={18} className="safi-select-chevron" />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="safi-submit-btn"
                  id="submit-early-access-btn"
                >
                  {isSubmitting ? (
                    <span>Registering...</span>
                  ) : (
                    <>
                      <span>Join Early Access</span>
                      <span className="safi-arrow-glyph">→</span>
                    </>
                  )}
                </button>

                <p className="safi-form-disclaimer">
                  We’ll only use your information to share updates about SAFI and related opportunities.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. INSTITUTIONAL & ENTERPRISE SPECIFICATIONS (Clean Collapsible)
          ===================================================================== */}
      <section style={{ backgroundColor: '#faf8f4', borderTop: '1px solid rgba(6,36,27,0.08)', padding: '36px 0 60px' }}>
        <div className="container" style={{ maxWidth: '820px', textAlign: 'center' }}>
          <button
            type="button"
            onClick={() => setShowTechAccordion(!showTechAccordion)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '10px',
              background: '#ffffff',
              border: '1.5px solid rgba(6,36,27,0.12)',
              borderRadius: '9999px',
              padding: '12px 28px',
              color: '#06241b',
              fontWeight: 700,
              fontSize: '0.92rem',
              cursor: 'pointer',
              transition: 'var(--transition)'
            }}
          >
            <Building2 size={16} color="#059669" />
            <span>Are you a Financial Institution? View Architecture Briefing</span>
            {showTechAccordion ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>

          {showTechAccordion && (
            <div style={{ marginTop: '28px', textAlign: 'left', background: '#ffffff', border: '1px solid #e2ddd4', borderRadius: '20px', padding: '36px', boxShadow: '0 12px 35px rgba(6,36,27,0.06)' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#059669', fontSize: '0.78rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '8px' }}>
                <Sparkles size={14} />
                <span>INSTITUTIONAL INTEGRATION</span>
              </div>
              <h3 style={{ fontSize: '1.45rem', fontWeight: 800, color: '#06241b', marginBottom: '14px' }}>
                How SAFI Integrates with Core Banking Ledger Systems
              </h3>
              <p style={{ fontSize: '0.95rem', color: '#4b6358', lineHeight: 1.65, marginBottom: '22px' }}>
                SAFI acts as an intelligence and behavioural allocation layer alongside your existing core ledger (e.g. Flexcube, Finacle, Temenos) via secure APIs without altering underlying transaction processing rails.
              </p>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
                <div style={{ background: '#faf8f4', padding: '16px', borderRadius: '12px', border: '1px solid #ede7dc' }}>
                  <Shield size={18} color="#059669" style={{ marginBottom: '8px' }} />
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#06241b', margin: '0 0 4px' }}>Bank-Grade Security</h4>
                  <p style={{ fontSize: '0.84rem', color: '#556b61', margin: 0 }}>Operates on tokenized telemetry with TLS 1.3 and AES-256 encryption.</p>
                </div>

                <div style={{ background: '#faf8f4', padding: '16px', borderRadius: '12px', border: '1px solid #ede7dc' }}>
                  <Layers size={18} color="#059669" style={{ marginBottom: '8px' }} />
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#06241b', margin: '0 0 4px' }}>Headless APIs &amp; SDKs</h4>
                  <p style={{ fontSize: '0.84rem', color: '#556b61', margin: 0 }}>Native drop-in mobile SDKs or REST APIs for custom front-end embedding.</p>
                </div>

                <div style={{ background: '#faf8f4', padding: '16px', borderRadius: '12px', border: '1px solid #ede7dc' }}>
                  <Lock size={18} color="#059669" style={{ marginBottom: '8px' }} />
                  <h4 style={{ fontSize: '0.92rem', fontWeight: 800, color: '#06241b', margin: '0 0 4px' }}>Policy Governance</h4>
                  <p style={{ fontSize: '0.84rem', color: '#556b61', margin: 0 }}>Bank administrators configure behavioural parameters, compliance buckets, and copy.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
