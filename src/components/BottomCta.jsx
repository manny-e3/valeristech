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
    <section className="about-bottom-cta section-padding" style={{ backgroundColor: '#041c14', color: '#ffffff', padding: '96px 0', borderTop: '1px solid #064e3b' }}>
      <div className="container" style={{ textAlign: 'center', maxWidth: '780px' }}>
        <span style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.18em', color: '#34d399', textTransform: 'uppercase', display: 'block', marginBottom: '14px' }}>
          PARTNER WITH VALERIS
        </span>
        <h2 className="section-title text-white" style={{ fontSize: 'clamp(2rem, 3.8vw, 3.2rem)', marginBottom: '18px', color: '#ffffff' }}>
          {title}
        </h2>
        <p className="section-subtext" style={{ color: '#cbd5e1', fontSize: '1.08rem', lineHeight: 1.65, margin: '0 auto 36px' }}>
          {subtitle}
        </p>
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to={primaryBtnLink} className="btn-primary" style={{ background: '#10b981', color: '#041c14', fontWeight: 800, padding: '16px 36px', fontSize: '1rem' }}>
            <span>{primaryBtnText}</span>
          </Link>
          <a
            href="mailto:Thevalerisgroup@gmail.com"
            className="btn-outline"
            style={{ borderColor: 'rgba(255, 255, 255, 0.4)', color: '#ffffff', padding: '16px 32px', fontSize: '1rem' }}
          >
            Email Advisory Team
          </a>
        </div>
      </div>
    </section>
  );
}
