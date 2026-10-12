import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function BottomCta({
  title = "LET’S BUILD SOMETHING USEFUL.",
  subtitle = "Have a technology challenge, an idea that needs to become a product, or a system that needs to work better? Tell us what you are trying to solve.",
  primaryBtnText = "Start a conversation →",
  primaryBtnLink = "/contact",
}) {
  return (
    <section className="about-bottom-cta section-padding" style={{ backgroundColor: '#06241b', color: '#ffffff', padding: '96px 0', borderTop: '1px solid rgba(237, 231, 220, 0.12)' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '780px' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.18em', color: '#c29853', textTransform: 'uppercase', display: 'block', marginBottom: '14px' }}>
          PARTNER WITH VALERIS
        </span>
        <h2 className="section-title text-white" style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 4vw, 3.4rem)', fontWeight: 400, marginBottom: '18px', color: '#ffffff' }}>
          {title}
        </h2>
        <p className="section-subtext" style={{ color: '#cbd5e1', fontSize: '1.08rem', lineHeight: 1.65, margin: '0 auto 36px' }}>
          {subtitle}
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to={primaryBtnLink} className="btn-primary" style={{ background: '#ffffff', color: '#06241b', fontWeight: 700, padding: '16px 36px', fontSize: '1rem', borderRadius: '9999px', boxShadow: '0 8px 24px rgba(0,0,0,0.2)' }}>
            <span>{primaryBtnText}</span>
          </Link>
          <a
            href="mailto:Thevalerisgroup@gmail.com"
            className="btn-outline"
            style={{ borderColor: 'rgba(255, 255, 255, 0.4)', color: '#ffffff', padding: '16px 32px', fontSize: '1rem', borderRadius: '9999px' }}
          >
            Email Advisory Team
          </a>
        </div>
      </div>
    </section>
  );
}
