import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Shield, Sliders, Eye, Sparkles } from 'lucide-react';

export default function Projects() {
  return (
    <section id="platforms" className="projects-section" style={{ backgroundColor: '#faf8f4', padding: '90px 0' }}>
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center" style={{ maxWidth: '800px', margin: '0 auto 54px', textAlign: 'center' }}>
          <span className="section-tag">OUR TECHNOLOGY</span>
          <h2 className="section-title" style={{ fontSize: 'clamp(2.2rem, 3.8vw, 3.2rem)' }}>
            SAFI: Financial behaviour, built into banking.
          </h2>
          <p className="section-subtext" style={{ fontSize: '1.05rem', color: '#597367', lineHeight: 1.65 }}>
            SAFI is Valeris’ proprietary financial infrastructure product, built to help financial institutions give customers greater control over how they use their money.
          </p>
        </div>

        {/* Feature Grid / Spotlight */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          alignItems: 'center',
          background: '#ffffff',
          border: '1.5px solid #ede7dc',
          borderRadius: '28px',
          padding: '48px 40px',
          boxShadow: '0 12px 36px rgba(6, 36, 27, 0.04)',
          marginBottom: '54px'
        }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#faf8f4', border: '1px solid #ede7dc', padding: '5px 16px', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700, color: '#06241b', marginBottom: '16px' }}>
              <Sparkles size={14} color="#c29853" />
              <span>Proprietary Financial Infrastructure</span>
            </div>
            
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.1rem', fontWeight: 400, color: 'var(--dark-heading)', marginBottom: '16px' }}>
              Engineered to complement, not replace.
            </h3>
            
            <p style={{ fontSize: '1.02rem', color: '#2c4238', lineHeight: 1.65, marginBottom: '18px' }}>
              SAFI works within existing banking environments to provide configurable allocation and spending controls, behavioural intelligence and greater visibility into financial activity.
            </p>
            
            <p style={{ fontSize: '0.94rem', color: '#597367', lineHeight: 1.6, marginBottom: '24px' }}>
              It is designed to complement existing banking systems, products and channels, not replace them.
            </p>

            <ul style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '32px' }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: '#06241b', fontWeight: 600 }}>
                <CheckCircle2 size={18} color="#10b981" />
                <span>Configurable allocation &amp; spending controls</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: '#06241b', fontWeight: 600 }}>
                <CheckCircle2 size={18} color="#10b981" />
                <span>Actionable behavioural intelligence in banking</span>
              </li>
              <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.95rem', color: '#06241b', fontWeight: 600 }}>
                <CheckCircle2 size={18} color="#10b981" />
                <span>Deep visibility into day-to-day financial activity</span>
              </li>
            </ul>

            <Link to="/safi" className="btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
              <span>Explore SAFI</span>
              <ArrowRight size={18} />
            </Link>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{
              background: '#06241b',
              borderRadius: '24px',
              padding: '36px 30px',
              color: '#ffffff',
              boxShadow: '0 20px 50px rgba(6, 36, 27, 0.25)',
              maxWidth: '420px',
              width: '100%',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '16px' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 700, letterSpacing: '0.12em', color: '#34d399' }}>INSIDE SAFI</span>
                <span style={{ fontSize: '0.75rem', background: 'rgba(52, 211, 153, 0.15)', color: '#34d399', padding: '3px 10px', borderRadius: '9999px', fontWeight: 600 }}>Live Rail</span>
              </div>
              <p style={{ fontFamily: 'var(--font-serif)', fontSize: '1.28rem', fontWeight: 400, color: '#f8fafc', marginBottom: '16px', lineHeight: 1.4 }}>
                "Your spending has increased this month. Would you like help adjusting your allocation?"
              </p>
              <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: '14px', padding: '16px', marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', color: '#cbd5e1', marginBottom: '6px' }}>
                  <span>Configured Allocation</span>
                  <span style={{ color: '#34d399', fontWeight: 700 }}>42% Savings</span>
                </div>
                <div style={{ width: '100%', height: '8px', background: 'rgba(255,255,255,0.15)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{ width: '42%', height: '100%', background: '#10b981', borderRadius: '4px' }} />
                </div>
              </div>
              <div style={{ fontSize: '0.84rem', color: '#94a3b8', lineHeight: 1.5 }}>
                Embedded directly into host banking mobile apps, core switch endpoints, and digital channels.
              </div>
            </div>
          </div>
        </div>

        {/* BUILT BY VALERIS Card */}
        <div style={{
          background: '#06241b',
          borderRadius: '26px',
          padding: '44px 38px',
          color: '#ffffff',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '24px',
          border: '1px solid #0e3b2d',
          boxShadow: '0 16px 40px rgba(6, 36, 27, 0.2)'
        }}>
          <div style={{ maxWidth: '680px' }}>
            <span style={{ fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.15em', color: '#c29853', display: 'block', marginBottom: '10px' }}>
              BUILT BY VALERIS
            </span>
            <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.85rem', fontWeight: 400, color: '#ffffff', marginBottom: '12px' }}>
              SAFI is our first expression of what we believe financial technology can become.
            </h3>
            <p style={{ fontSize: '0.96rem', color: '#cbd5e1', lineHeight: 1.6, margin: 0 }}>
              Financial institutions already have the accounts, channels, transaction infrastructure and customer relationships. We build the intelligence and control layers that can make those systems do more.
            </p>
          </div>
          <div>
            <Link to="/safi" className="btn-primary" style={{ background: '#ffffff', color: '#06241b', fontWeight: 700, boxShadow: '0 4px 16px rgba(0,0,0,0.2)' }}>
              <span>Explore SAFI →</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
