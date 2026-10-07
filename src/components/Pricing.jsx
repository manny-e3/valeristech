import React from 'react';
import { Handshake, GitFork, LineChart, FileText } from 'lucide-react';

export default function Pricing() {
  const models = [
    {
      id: 'strategic',
      icon: <Handshake size={28} />,
      title: 'Strategic Partnerships',
      desc: 'Collaborations with commercial banks, fintechs, and enterprises building or modernising core financial infrastructure.',
      points: [
        'Enterprise infrastructure co-design',
        'Integration with SAFI transaction rails',
        'Institutional API & systems alignment',
      ],
      popular: false,
    },
    {
      id: 'collaboration',
      icon: <GitFork size={28} />,
      title: 'Early-Stage Collaboration',
      desc: 'Working alongside forward-looking organizations to pilot, deploy, and co-develop tailored intelligent platforms.',
      points: [
        'SAFI ecosystem pilot deployment',
        'Enterprise middleware integration',
        'Proof-of-value validation sprints',
      ],
      popular: true,
    },
    {
      id: 'advisory',
      icon: <LineChart size={28} />,
      title: 'Advisory & Capital Discussions',
      desc: 'Technical advisory relationships with institutional leaders and conversations with capital partners aligned with infrastructure.',
      points: [
        'Strategic technology advisory',
        'Long-horizon infrastructure growth',
        'Institutional equity & capital alignment',
      ],
      popular: false,
    },
  ];

  return (
    <section id="partnership" className="pricing-section">
      <div className="container">
        <div className="section-header-center">
          <span className="section-tag">Partnership &amp; Growth</span>
          <h2 className="section-title">Open to Building With<br />Institutions &amp; Capital Partners</h2>
          <p className="section-subtext">
            Valeris Technologies Ltd welcomes strategic conversations across four high-impact engagement models.
          </p>
        </div>

        <div className="pricing-grid">
          {models.map((m) => (
            <div key={m.id} className={`pricing-card ${m.popular ? 'pricing-popular' : ''}`}>
              {m.popular && <span className="popular-badge">Core Focus</span>}
              <div className="pricing-card-header">
                <div style={{ color: 'var(--primary)', marginBottom: '14px' }}>{m.icon}</div>
                <h3 className="plan-name">{m.title}</h3>
                <p style={{ fontSize: '0.92rem', color: '#64748b', lineHeight: 1.55, marginBottom: '20px' }}>
                  {m.desc}
                </p>
              </div>

              <ul className="plan-features">
                {m.points.map((pt, i) => (
                  <li key={i} className="feature-item">
                    <span className="feature-check-icon">✓</span>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>

              <div className="plan-btn-wrap">
                <a
                  href="mailto:Thevalerisgroup@gmail.com?subject=Strategic%20Engagement%20Inquiry"
                  className={m.popular ? 'btn-primary plan-btn' : 'btn-outline plan-btn'}
                >
                  Initiate Discussion
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Institutional Disclosure Box */}
        <div className="institutional-notice-box" style={{
          marginTop: '50px',
          padding: '24px 30px',
          backgroundColor: '#ecfdf5',
          borderRadius: '16px',
          borderLeft: '4px solid var(--primary)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '20px',
        }}>
          <div>
            <h4 style={{ color: 'var(--dark-heading)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '4px' }}>
              Request Company Overview Deck
            </h4>
            <p style={{ color: '#4b586e', fontSize: '0.92rem', margin: 0 }}>
              Access our institutional presentation detailing Valeris Technologies Ltd and SAFI.
            </p>
          </div>
          <a
            href="mailto:Thevalerisgroup@gmail.com?subject=Company%20Overview%20Deck%20Request"
            className="btn-primary"
            style={{ padding: '10px 24px', fontSize: '0.9rem' }}
          >
            Request Deck →
          </a>
        </div>
      </div>
    </section>
  );
}
