import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import {
  Sparkles,
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  Sliders,
  Cpu,
  Eye,
  Layers,
  Network,
  Lock,
  TrendingUp,
  Database,
  Terminal,
  Zap,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Users,
  Building2,
  Check,
  Smartphone,
  BarChart3,
  Landmark,
  UserCheck
} from 'lucide-react';

/**
 * Pure code reproduction of the SAFI Brand Mark
 */
export function SafiBrandMark({ light = true, size = 'default' }) {
  const isLarge = size === 'large';
  return (
    <div style={{ display: 'inline-flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: isLarge ? '4px' : '2px' }}>
        <span style={{
          fontFamily: 'var(--font-main)',
          fontWeight: 900,
          fontSize: isLarge ? '2rem' : '1.4rem',
          letterSpacing: '-0.02em',
          color: light ? '#ffffff' : '#041c14',
          lineHeight: 1
        }}>
          S
        </span>
        <span style={{
          fontFamily: 'var(--font-main)',
          fontWeight: 900,
          fontSize: isLarge ? '2rem' : '1.4rem',
          letterSpacing: '-0.02em',
          color: light ? '#ffffff' : '#041c14',
          lineHeight: 1,
          position: 'relative'
        }}>
          A
        </span>
        <span style={{
          fontFamily: 'var(--font-main)',
          fontWeight: 900,
          fontSize: isLarge ? '2rem' : '1.4rem',
          letterSpacing: '-0.02em',
          color: light ? '#ffffff' : '#041c14',
          lineHeight: 1
        }}>
          F
        </span>
        <span style={{
          position: 'relative',
          display: 'inline-block',
          fontFamily: 'var(--font-main)',
          fontWeight: 900,
          fontSize: isLarge ? '2rem' : '1.4rem',
          letterSpacing: '-0.02em',
          color: light ? '#ffffff' : '#041c14',
          lineHeight: 1
        }}>
          I
          <span style={{
            position: 'absolute',
            top: isLarge ? '-4px' : '-3px',
            right: isLarge ? '1px' : '0px',
            width: isLarge ? '7px' : '5px',
            height: isLarge ? '7px' : '5px',
            borderRadius: '50%',
            background: '#10b981',
          }} />
        </span>
      </div>
      <span style={{
        fontSize: isLarge ? '0.72rem' : '0.62rem',
        fontWeight: 600,
        color: light ? '#94a3b8' : '#64748b',
        letterSpacing: '0.04em',
        marginTop: '2px'
      }}>
        by Valeris Technologies
      </span>
    </div>
  );
}

/**
 * Pure code reproduction of the SAFI App Icon Badge (from Slides 01 and 04)
 */
export function SafiAppIcon({ size = 56 }) {
  return (
    <div style={{
      width: `${size}px`,
      height: `${size}px`,
      borderRadius: `${size * 0.28}px`,
      background: 'linear-gradient(145deg, #072e21 0%, #031811 100%)',
      border: '1.5px solid rgba(16, 185, 129, 0.4)',
      boxShadow: '0 12px 28px rgba(0, 0, 0, 0.35)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      flexShrink: 0
    }}>
      <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{
          fontSize: `${size * 0.58}px`,
          fontWeight: 900,
          color: '#ffffff',
          fontFamily: 'var(--font-main)',
          lineHeight: 1,
          letterSpacing: '-0.05em'
        }}>
          S
        </span>
        {/* Vibrant emerald dot at the lower curve */}
        <span style={{
          position: 'absolute',
          bottom: `${size * 0.08}px`,
          left: `-${size * 0.14}px`,
          width: `${size * 0.22}px`,
          height: `${size * 0.22}px`,
          borderRadius: '50%',
          background: '#10b981',
          boxShadow: '0 0 10px rgba(16, 185, 129, 0.8)'
        }} />
      </div>
    </div>
  );
}

export default function SafiPage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [openFaq, setOpenFaq] = useState(0);

  const totalSlides = 5;

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % totalSlides);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + totalSlides) % totalSlides);

  useEffect(() => {
    document.title = 'SAFI | Valeris Technologies Ltd';
    window.scrollTo(0, 0);
  }, []);

  const faqs = [
    {
      q: 'Does deploying SAFI require replacing our existing core banking system?',
      a: 'Not at all. SAFI is specifically designed to complement existing banking systems, products and channels, not replace them. It acts as an intelligence and control layer that sits alongside your core ledger (e.g. Flexcube, Finacle, Temenos) via secure APIs without altering underlying transaction processing rails.',
    },
    {
      q: 'How does SAFI integrate into our customer-facing mobile banking application?',
      a: 'We offer two flexible integration paths: (1) Headless REST APIs and Webhooks, allowing your in-house engineering team to build fully bespoke UI within your existing app, or (2) Ready-to-brand mobile SDK components (Flutter, React Native, iOS, Android) that drop directly into your existing codebase.',
    },
    {
      q: 'How does SAFI handle sensitive customer and transaction data?',
      a: 'SAFI operates under strict bank-grade institutional security. All communications use TLS 1.3, data is encrypted at rest using AES-256, and SAFI never requires access to customer passwords or sensitive card credentials. It operates purely on tokenized transaction telemetry and customer-approved allocation instructions.',
    },
    {
      q: 'Can our institution customize behavioural rules, categorization, and allocation formulas?',
      a: 'Yes. Financial institutions maintain complete administrative control through the SAFI Institutional Console. Risk parameters, allowable spending buckets, allocation formulas, and nudge copy can be configured to align with your brand voice and compliance policies.',
    },
  ];

  return (
    <div className="safi-page">
      <PageBanner
        title="SAFI"
        subtitle="Financial behaviour, built into banking."
        breadcrumb="SAFI"
      />

      {/* =====================================================================
          NATIVE CODE CAROUSEL SHOWCASE (100% Code recreation of the 5 slides)
          ===================================================================== */}
      <section className="section-padding bg-light" style={{ paddingBottom: '70px' }}>
        <div className="container">
          <div className="section-header-center" style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 36px' }}>
            <span className="section-tag">PRODUCT SHOWCASE</span>
            <h2 className="section-title">The Complete SAFI Narrative</h2>
            <p className="section-subtext">
              Step through our interactive presentation on how SAFI integrates financial behaviour into banking.
            </p>
          </div>

          <div className="safi-carousel-wrapper">
            {/* Top Bar of Active Slide */}
            <div className="safi-slide-topbar">
              <SafiBrandMark light={true} size="default" />
              <span className="safi-slide-counter">
                0{currentSlide + 1}/05
              </span>
            </div>

            {/* Slide 01: MEET SAFI. */}
            {currentSlide === 0 && (
              <div className="safi-slide-content">
                <div>
                  <div className="safi-slide-accent-bar" />
                  <h2 className="safi-slide-headline">
                    MEET<br />SAFI.
                  </h2>
                  <p className="safi-slide-lead" style={{ fontSize: '1.35rem', color: '#f8fafc', fontWeight: 600 }}>
                    Financial behaviour, built into banking.
                  </p>
                  <p className="safi-slide-desc" style={{ maxWidth: '480px' }}>
                    SAFI is Valeris’ proprietary financial infrastructure product, built to help financial institutions give customers greater control over how they use their money.
                  </p>
                  <div style={{ display: 'flex', gap: '14px', flexWrap: 'wrap' }}>
                    <Link to="/contact" className="btn-primary" style={{ padding: '14px 28px' }}>
                      Request Briefing
                    </Link>
                    <button type="button" onClick={nextSlide} className="btn-outline" style={{ borderColor: 'rgba(255,255,255,0.3)', color: '#ffffff', padding: '14px 24px' }}>
                      Explore Next Slide →
                    </button>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center' }}>
                  {/* Smartphone Mockup */}
                  <div className="safi-phone-mock">
                    <div className="safi-phone-island" />
                    <div className="safi-phone-screen-bg">
                      <div className="safi-phone-arc" />
                      <div style={{ zIndex: 5, textAlign: 'center' }}>
                        <SafiAppIcon size={84} />
                        <div style={{ marginTop: '16px', fontSize: '0.85rem', color: '#94a3b8', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700 }}>
                          SAFI Active
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 02: BANKING IS EVOLVING. */}
            {currentSlide === 1 && (
              <div className="safi-slide-content">
                <div>
                  <div className="safi-slide-accent-bar" />
                  <h2 className="safi-slide-headline">
                    BANKING<br />IS EVOLVING.
                  </h2>
                  <p className="safi-slide-lead">
                    Customers don’t just need access to their money.
                  </p>
                  <p className="safi-slide-desc" style={{ color: '#cbd5e1', fontSize: '1.1rem', fontWeight: 600 }}>
                    They need better ways to use, organise and control it.
                  </p>
                </div>

                <div>
                  <div className="safi-evolve-list">
                    <div className="safi-evolve-item">
                      <div className="safi-evolve-icon-box">
                        <Users size={22} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                          Higher expectations from their bank.
                        </h4>
                        <p style={{ fontSize: '0.86rem', color: '#94a3b8', margin: '4px 0 0' }}>
                          Today's account holders seek guided financial experiences.
                        </p>
                      </div>
                    </div>

                    <div className="safi-evolve-item">
                      <div className="safi-evolve-icon-box">
                        <BarChart3 size={22} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                          More need for financial discipline.
                        </h4>
                        <p style={{ fontSize: '0.86rem', color: '#94a3b8', margin: '4px 0 0' }}>
                          Proactive tools that assist with allocation and prioritization.
                        </p>
                      </div>
                    </div>

                    <div className="safi-evolve-item">
                      <div className="safi-evolve-icon-box">
                        <ShieldCheck size={22} />
                      </div>
                      <div>
                        <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#ffffff', margin: 0 }}>
                          A growing demand for smarter tools.
                        </h4>
                        <p style={{ fontSize: '0.86rem', color: '#94a3b8', margin: '4px 0 0' }}>
                          Real-time responsiveness rather than monthly PDF statements.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 03: THIS IS SAFI. */}
            {currentSlide === 2 && (
              <div className="safi-slide-content">
                <div>
                  <div className="safi-slide-accent-bar" />
                  <h2 className="safi-slide-headline">
                    THIS IS<br />SAFI.
                  </h2>
                  <p className="safi-slide-lead" style={{ fontSize: '1.25rem' }}>
                    A Financial Behaviour Engine built for the banking environment.
                  </p>

                  <div className="safi-triad-banner">
                    <span>ALLOCATION.</span>
                    <span className="dot">·</span>
                    <span>INTELLIGENCE.</span>
                    <span className="dot">·</span>
                    <span>CONTROL.</span>
                  </div>
                </div>

                <div>
                  <div className="safi-triad-grid">
                    <div className="safi-triad-card">
                      <div style={{ color: '#34d399', marginBottom: '10px' }}><Sliders size={26} /></div>
                      <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 800, marginBottom: '6px' }}>Allocation</h4>
                      <p style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5, margin: 0 }}>
                        Rule-based pockets &amp; automated split-on-deposit ratios.
                      </p>
                    </div>

                    <div className="safi-triad-card">
                      <div style={{ color: '#34d399', marginBottom: '10px' }}><Cpu size={26} /></div>
                      <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 800, marginBottom: '6px' }}>Intelligence</h4>
                      <p style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5, margin: 0 }}>
                        Velocity patterns, predictive cashflow &amp; smart prompts.
                      </p>
                    </div>

                    <div className="safi-triad-card">
                      <div style={{ color: '#34d399', marginBottom: '10px' }}><ShieldCheck size={26} /></div>
                      <h4 style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 800, marginBottom: '6px' }}>Control</h4>
                      <p style={{ color: '#94a3b8', fontSize: '0.82rem', lineHeight: 1.5, margin: 0 }}>
                        Discretionary spending guardrails &amp; goal protection.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 04: BUILT FOR BANKS. */}
            {currentSlide === 3 && (
              <div className="safi-slide-content">
                <div>
                  <div className="safi-slide-accent-bar" />
                  <h2 className="safi-slide-headline">
                    BUILT<br />FOR BANKS.
                  </h2>
                  <p className="safi-slide-lead" style={{ fontSize: '1.25rem', color: '#34d399', fontWeight: 700 }}>
                    Designed around the customer.
                  </p>
                  <p className="safi-slide-desc" style={{ fontSize: '1.05rem', color: '#cbd5e1', maxWidth: '480px' }}>
                    A capability that can sit within existing banking experiences and create more structured financial behaviour.
                  </p>
                </div>

                <div>
                  {/* Flow Diagram from Slide 4 */}
                  <div className="safi-arch-flow">
                    <div className="safi-arch-step">
                      <div className="safi-arch-icon-wrap">
                        <Landmark size={24} color="#34d399" />
                      </div>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>
                        Banking<br />Experience
                      </span>
                    </div>

                    <div className="safi-arch-arrow">→</div>

                    <div className="safi-arch-step">
                      <SafiAppIcon size={52} />
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#34d399' }}>
                        SAFI<br />by Valeris
                      </span>
                    </div>

                    <div className="safi-arch-arrow">→</div>

                    <div className="safi-arch-step">
                      <div className="safi-arch-icon-wrap">
                        <UserCheck size={24} color="#34d399" />
                      </div>
                      <span style={{ fontSize: '0.85rem', fontWeight: 700, color: '#ffffff' }}>
                        Customer<br />Experience
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Slide 05: A DIFFERENT WAY TO EXPERIENCE YOUR MONEY. */}
            {currentSlide === 4 && (
              <div className="safi-slide-content">
                <div>
                  <div className="safi-slide-accent-bar" />
                  <h2 className="safi-slide-headline">
                    A DIFFERENT WAY<br />TO EXPERIENCE<br /><span className="accent">YOUR MONEY.</span>
                  </h2>
                  <p className="safi-slide-lead" style={{ fontSize: '1.2rem', color: '#ffffff', fontWeight: 700 }}>
                    Not just a balance.
                  </p>
                  <p className="safi-slide-desc" style={{ fontSize: '1.05rem', color: '#cbd5e1' }}>
                    A more structured relationship with it.
                  </p>
                </div>

                <div>
                  <div className="safi-compare-container">
                    <div className="safi-compare-box">
                      <span style={{ fontSize: '0.78rem', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                        Traditional Banking
                      </span>
                      <h4 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>
                        Single Static Number
                      </h4>
                      <p style={{ color: '#94a3b8', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
                        Passive balance tracking and retrospective statements without behavioral guidance.
                      </p>
                    </div>

                    <div className="safi-compare-box active">
                      <span style={{ fontSize: '0.78rem', color: '#34d399', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700, display: 'block', marginBottom: '8px' }}>
                        With SAFI Embedded
                      </span>
                      <h4 style={{ color: '#ffffff', fontSize: '1.05rem', fontWeight: 700, marginBottom: '8px' }}>
                        Structured Relationship
                      </h4>
                      <p style={{ color: '#e2e8f0', fontSize: '0.85rem', lineHeight: 1.5, margin: 0 }}>
                        Configured allocations, proactive behavioural nudges, and deep financial clarity.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Controls Bar */}
            <div className="safi-slide-bottombar">
              {/* Carousel Dots */}
              <div className="safi-dots-wrap">
                {Array.from({ length: totalSlides }).map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentSlide(idx)}
                    className={`safi-dot ${currentSlide === idx ? 'active' : ''}`}
                    aria-label={`Go to slide ${idx + 1}`}
                  />
                ))}
              </div>

              {/* Prev / Next Buttons */}
              <div className="safi-carousel-nav-btns">
                <button
                  type="button"
                  onClick={prevSlide}
                  className="safi-nav-btn"
                  aria-label="Previous slide"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={nextSlide}
                  className="safi-nav-btn"
                  aria-label="Next slide"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          DETAILED ARCHITECTURAL PILLARS (Allocation · Intelligence · Control)
          ===================================================================== */}
      <section className="section-padding" style={{ backgroundColor: '#ffffff' }}>
        <div className="container">
          <div className="section-header-center" style={{ maxWidth: '800px', margin: '0 auto 54px', textAlign: 'center' }}>
            <span className="section-tag">CORE ENGINE CAPABILITIES</span>
            <h2 className="section-title">The Three Pillars of the SAFI Engine</h2>
            <p className="section-subtext">
              SAFI works within existing banking environments to provide configurable allocation and spending controls, behavioural intelligence and greater visibility into financial activity.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px' }}>
            {/* Pillar 1: Allocation */}
            <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '24px', padding: '36px 30px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Sliders size={26} />
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.1em' }}>PILLAR 01</span>
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--dark-heading)', marginBottom: '8px' }}>
                  Configurable Allocation
                </h3>
                <p style={{ fontSize: '0.94rem', fontWeight: 700, color: '#1e293b', marginBottom: '12px' }}>
                  Giving bank customers proactive sovereignty over how money is used.
                </p>
                <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6, marginBottom: '20px' }}>
                  Configurable allocation and spending controls allow users to define rule-based sub-wallets, percentage distributions upon salary receipt, and category constraints.
                </p>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
                  <CheckCircle2 size={15} color="var(--primary)" />
                  <span>Automated deposit distribution rules</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
                  <CheckCircle2 size={15} color="var(--primary)" />
                  <span>Category-specific spending ceilings</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
                  <CheckCircle2 size={15} color="var(--primary)" />
                  <span>Goal-directed sub-ledger partitioning</span>
                </li>
              </ul>
            </div>

            {/* Pillar 2: Intelligence */}
            <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '24px', padding: '36px 30px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Cpu size={26} />
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.1em' }}>PILLAR 02</span>
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--dark-heading)', marginBottom: '8px' }}>
                  Behavioural Intelligence
                </h3>
                <p style={{ fontSize: '0.94rem', fontWeight: 700, color: '#1e293b', marginBottom: '12px' }}>
                  Moving beyond static ledgers to responsive, contextual guidance.
                </p>
                <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6, marginBottom: '20px' }}>
                  Dynamic behavioural algorithms interpret inflow and outflow momentum, identifying upcoming recurring liabilities, spending velocity changes, and liquidity signals.
                </p>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
                  <CheckCircle2 size={15} color="var(--primary)" />
                  <span>Velocity tracking &amp; anomaly detection</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
                  <CheckCircle2 size={15} color="var(--primary)" />
                  <span>Proactive contextual nudges &amp; alerts</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
                  <CheckCircle2 size={15} color="var(--primary)" />
                  <span>Actionable decision support in host apps</span>
                </li>
              </ul>
            </div>

            {/* Pillar 3: Control */}
            <div style={{ background: '#ffffff', border: '1.5px solid #e2e8f0', borderRadius: '24px', padding: '36px 30px', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ width: '48px', height: '48px', borderRadius: '14px', background: 'linear-gradient(135deg, #059669 0%, #047857 100%)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ShieldCheck size={26} />
                  </div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.1em' }}>PILLAR 03</span>
                </div>
                <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: 'var(--dark-heading)', marginBottom: '8px' }}>
                  Granular Control
                </h3>
                <p style={{ fontSize: '0.94rem', fontWeight: 700, color: '#1e293b', marginBottom: '12px' }}>
                  Bringing clarity and discipline to everyday financial decisions.
                </p>
                <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.6, marginBottom: '20px' }}>
                  Enriched transaction metadata eliminates cryptic statement descriptions, identifies recurring subscriptions, and enforces customizable guardrails to protect capital.
                </p>
              </div>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '8px', borderTop: '1px solid #f1f5f9', paddingTop: '16px' }}>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
                  <CheckCircle2 size={15} color="var(--primary)" />
                  <span>Enriched brand &amp; merchant metadata</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
                  <CheckCircle2 size={15} color="var(--primary)" />
                  <span>Recurring subscription audit telemetry</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.85rem', color: '#334155' }}>
                  <CheckCircle2 size={15} color="var(--primary)" />
                  <span>User-managed discretionary locks</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          BUILT BY VALERIS MANIFESTO STRIP
          ===================================================================== */}
      <section className="section-padding bg-light">
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, #041c14 0%, #064e3b 100%)',
            borderRadius: '26px',
            padding: '48px 40px',
            color: '#ffffff',
            boxShadow: '0 20px 45px rgba(4, 28, 20, 0.2)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '30px'
          }}>
            <div style={{ maxWidth: '780px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#34d399', fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: '12px' }}>
                <Sparkles size={14} />
                <span>BUILT BY VALERIS</span>
              </div>
              <h3 style={{ fontSize: 'clamp(1.6rem, 2.8vw, 2.2rem)', fontWeight: 800, color: '#ffffff', marginBottom: '16px', lineHeight: 1.3 }}>
                SAFI is our first expression of what we believe financial technology can become.
              </h3>
              <p style={{ fontSize: '1.05rem', color: '#cbd5e1', lineHeight: 1.7, margin: 0 }}>
                Financial institutions already have the accounts, channels, transaction infrastructure and customer relationships. We build the intelligence and control layers that can make those systems do more.
              </p>
            </div>
            <div>
              <Link to="/contact" className="btn-primary" style={{ background: '#10b981', color: '#041c14', fontWeight: 800, padding: '16px 32px' }}>
                Schedule Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>



      {/* =====================================================================
          PRODUCT FAQ
          ===================================================================== */}
      <section className="section-padding bg-light">
        <div className="container" style={{ maxWidth: '820px' }}>
          <div className="section-header-center" style={{ textAlign: 'center', marginBottom: '40px' }}>
            <span className="section-tag">FREQUENTLY ASKED QUESTIONS</span>
            <h2 className="section-title">Institutional Deployment Details</h2>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {faqs.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  style={{
                    background: '#ffffff',
                    border: '1.5px solid #e2e8f0',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    transition: 'var(--transition)'
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                    style={{
                      width: '100%',
                      padding: '20px 24px',
                      background: 'none',
                      border: 'none',
                      textAlign: 'left',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                      gap: '16px'
                    }}
                  >
                    <span style={{ fontSize: '1.02rem', fontWeight: 700, color: 'var(--dark-heading)' }}>
                      {faq.q}
                    </span>
                    <div style={{
                      transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                      transition: 'transform 0.25s ease',
                      color: 'var(--primary)',
                      flexShrink: 0
                    }}>
                      <ChevronDown size={20} />
                    </div>
                  </button>
                  {isOpen && (
                    <div style={{ padding: '0 24px 22px', borderTop: '1px solid #f1f5f9' }}>
                      <p style={{ fontSize: '0.94rem', color: '#475569', lineHeight: 1.65, margin: '14px 0 0' }}>
                        {faq.a}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          BOTTOM CONVERSION CTA
          ===================================================================== */}
      <section className="section-padding" style={{ backgroundColor: '#041c14', color: '#ffffff', textAlign: 'center' }}>
        <div className="container" style={{ maxWidth: '780px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.18em', color: '#34d399', textTransform: 'uppercase', display: 'block', marginBottom: '14px' }}>
            PARTNER WITH VALERIS
          </span>
          <h2 className="section-title text-white" style={{ fontSize: 'clamp(2rem, 3.8vw, 3.2rem)', marginBottom: '18px', color: '#ffffff' }}>
            LET’S BUILD SOMETHING USEFUL.
          </h2>
          <p className="section-subtext" style={{ color: '#cbd5e1', fontSize: '1.08rem', lineHeight: 1.65, margin: '0 auto 36px' }}>
            Ready to bring configurable allocation and behavioural intelligence to your banking customers? Schedule a technical briefing with our systems engineers.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn-primary" style={{ background: '#10b981', color: '#041c14', fontWeight: 800, padding: '16px 36px', fontSize: '1rem' }}>
              <span>Request SAFI Briefing →</span>
            </Link>
            <a
              href="mailto:Thevalerisgroup@gmail.com?subject=SAFI%20Institutional%20Inquiry"
              className="btn-outline"
              style={{ borderColor: 'rgba(255, 255, 255, 0.4)', color: '#ffffff', padding: '16px 32px', fontSize: '1rem' }}
            >
              Email Advisory Team
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
