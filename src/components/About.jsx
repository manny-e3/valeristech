import React from 'react';
import { Layers, Compass, Network, Building2, Sparkles, Cpu, ArrowRight } from 'lucide-react';

export default function About() {
  const whyValeris = [
    {
      id: 1,
      icon: <Layers size={26} className="feature-icon" />,
      title: 'We think in systems.',
      desc: 'A digital product does not exist in isolation. It sits within people, processes, technology, data, policies and existing infrastructure. We consider the whole system when we design solutions.',
    },
    {
      id: 2,
      icon: <Compass size={26} className="feature-icon" />,
      title: 'We build with context.',
      desc: 'There is no universal technology solution. We build around the specific environment, objectives and constraints of the organisation we are working with.',
    },
    {
      id: 3,
      icon: <Network size={26} className="feature-icon" />,
      title: 'We bridge technology and business.',
      desc: 'We understand that a technically impressive system is not necessarily a useful one. Our work connects technology decisions to real operational and business outcomes.',
    },
  ];

  const whereWeWork = [
    {
      id: 1,
      title: 'Financial Services',
      desc: 'We develop technology for institutions operating in an increasingly digital financial environment, with a focus on customer experience, financial behaviour, infrastructure and institutional capability.',
    },
    {
      id: 2,
      title: 'Enterprise',
      desc: 'We help organisations modernise processes, connect systems and deploy digital solutions that improve how work gets done.',
    },
    {
      id: 3,
      title: 'Emerging Technology',
      desc: 'We explore and build technology around emerging opportunities where existing systems do not fully solve the problem.',
    },
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        {/* Section Header */}
        <div className="about-header">
          <div className="about-header-text">
            <span className="section-tag">TECHNOLOGY WITH A PURPOSE</span>
            <h2 className="section-title">
              We build beyond the surface.
            </h2>
            <p className="section-subtext" style={{ maxWidth: '780px', marginTop: '12px', fontSize: '1.05rem', color: '#334155', lineHeight: 1.65 }}>
              Technology should do more than digitise an existing process. It should make systems more intelligent, operations more effective and decisions more informed.
            </p>
            <p className="section-subtext" style={{ maxWidth: '780px', marginTop: '6px', fontSize: '0.96rem', color: '#64748b' }}>
              Valeris works with organisations to design, build and integrate technology around the way their business actually operates. Our work spans financial technology, enterprise systems, digital solutions and technology advisory.
            </p>
          </div>
          <div className="about-header-action">
            <a href="#capabilities" className="btn-outline">
              What We Do
            </a>
          </div>
        </div>

        {/* Corporate Record Strip */}
        <div className="corporate-record-bar">
          <div className="record-item">
            <span className="record-label">Company</span>
            <span className="record-val">Valeris Technologies Ltd</span>
          </div>
          <div className="record-item">
            <span className="record-label">Practice Focus</span>
            <span className="record-val">Fintech · Digital Systems · Advisory</span>
          </div>
          <div className="record-item">
            <span className="record-label">Headquarters</span>
            <span className="record-val">Lagos, Nigeria</span>
          </div>
          <div className="record-item">
            <span className="record-label">Proprietary Product</span>
            <span className="record-val">SAFI Financial Infrastructure</span>
          </div>
        </div>

        {/* WHY VALERIS Section */}
        <div style={{ marginTop: '54px' }}>
          <div style={{ marginBottom: '28px' }}>
            <span className="section-tag">WHY VALERIS</span>
            <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--dark-heading)', letterSpacing: '-0.02em' }}>
              Built Around How Business Actually Operates
            </h3>
          </div>

          <div className="about-grid">
            {/* Left Column: 3 System Pillars */}
            <div className="about-features-col">
              {whyValeris.map((item) => (
                <div key={item.id} className="about-feature-item">
                  <div className="feature-icon-box">
                    {item.icon}
                  </div>
                  <div className="feature-info">
                    <h3 className="feature-title">{item.title}</h3>
                    <p className="feature-desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Visual and Institutional Description */}
            <div className="about-media-col">
              <div className="about-images-wrapper">
                <div className="about-img-left">
                  <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=700&q=80"
                    alt="Modern institutional corporate architecture"
                    className="img-rounded-desk"
                    loading="lazy"
                  />
                </div>
                <div className="about-img-right">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=700&q=80"
                    alt="Valeris enterprise technology team"
                    className="img-stylized-portrait"
                    loading="lazy"
                  />
                </div>
              </div>
              <p className="about-bottom-caption">
                "We understand that a technically impressive system is not necessarily a useful one. Our work connects technology decisions to real operational and business outcomes."
              </p>
            </div>
          </div>
        </div>

        {/* WHERE WE WORK Section */}
        <div style={{ marginTop: '64px', paddingTop: '48px', borderTop: '1px solid #e2e8f0' }}>
          <div style={{ textAlign: 'center', marginBottom: '36px' }}>
            <span className="section-tag">WHERE WE WORK</span>
            <h3 style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--dark-heading)' }}>
              Sectors &amp; Operating Environments
            </h3>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            {whereWeWork.map((sec) => (
              <div
                key={sec.id}
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #e2e8f0',
                  borderRadius: '18px',
                  padding: '30px 26px',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                  transition: 'var(--transition)'
                }}
              >
                <div style={{ display: 'inline-block', width: '36px', height: '4px', background: 'var(--primary)', borderRadius: '2px', marginBottom: '14px' }} />
                <h4 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--dark-heading)', marginBottom: '10px' }}>
                  {sec.title}
                </h4>
                <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: 1.6, margin: 0 }}>
                  {sec.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
