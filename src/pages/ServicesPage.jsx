import React from 'react';
import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import Process from '../components/Process';
import { 
  Layers, 
  Code2, 
  Network, 
  Building, 
  Briefcase, 
  CheckCircle,
  ArrowRight,
  MessageSquare
} from 'lucide-react';

export default function ServicesPage() {
  const practiceAreas = [
    {
      num: '01',
      icon: <Layers size={30} />,
      title: 'Technology Consulting',
      desc: 'We help organisations understand technology problems, define practical solutions and make informed decisions about the systems they need. From technology strategy to solution design, we bring structure to complex technology decisions.',
      deliverables: [
        'Technology strategy & roadmap definition',
        'Problem definition & structured solution design',
        'System architecture & decision evaluation',
        'Practical infrastructure recommendations',
      ],
    },
    {
      num: '02',
      icon: <Code2 size={30} />,
      title: 'Software & Digital Solutions',
      desc: 'We design and develop digital products and business applications built around specific organisational needs. Whether developing a new product or improving an existing process, we focus on functionality, usability and long-term value.',
      deliverables: [
        'Custom digital product design & engineering',
        'Bespoke business applications & portals',
        'Process digitisation & user experience design',
        'Maintainable, high-performance codebases',
      ],
    },
    {
      num: '03',
      icon: <Network size={30} />,
      title: 'Systems Integration',
      desc: 'Modern organisations rarely operate on one system. We help connect platforms, applications and workflows so that technology works as a system rather than as isolated tools.',
      deliverables: [
        'Platform & multi-application connectivity',
        'Workflow orchestration & data bridges',
        'Enterprise API gateways & webhook pipelines',
        'End-to-end operational cohesion',
      ],
    },
    {
      num: '04',
      icon: <Building size={30} />,
      title: 'Enterprise Technology',
      desc: 'We design and deploy technology solutions that support the operational needs of growing organisations. Our work can span workflow automation, information systems, document and data environments, process digitisation and other enterprise technology needs.',
      deliverables: [
        'Workflow automation & operations digitisation',
        'Information systems & data environments',
        'Document management & secure collaboration',
        'Enterprise technology modernization',
      ],
    },
    {
      num: '05',
      icon: <Briefcase size={30} />,
      title: 'Business & Technology Advisory',
      desc: 'Good technology decisions require an understanding of the business behind them. We provide practical advisory support across technology planning, digital transformation, operating models, policy and technology-enabled business processes.',
      deliverables: [
        'Technology planning & digital transformation strategy',
        'Operating models & business process alignment',
        'Policy, compliance & governance for digital systems',
        'Technology-enabled commercial optimization',
      ],
    },
  ];

  return (
    <div className="services-page">
      <PageBanner
        title="Capabilities & Practices"
        subtitle="We combine technology, systems thinking and practical business insight to build solutions that work in the real world."
        breadcrumb="Capabilities"
      />

      {/* Intro Section */}
      <section className="services-intro section-padding">
        <div className="container">
          <div className="services-intro-grid">
            <div>
              <span className="section-tag">WHAT WE DO</span>
              <h2 className="section-title">
                We build technology for better financial and business systems.
              </h2>
            </div>
            <div>
              <p className="about-lead-p" style={{ marginBottom: '16px' }}>
                Valeris Technologies designs and deploys digital systems that help organisations solve complex operational and financial challenges.
              </p>
              <p className="about-body-p">
                From financial infrastructure and intelligent products to enterprise systems and technology advisory, we combine technology, systems thinking and practical business insight to build solutions that work in the real world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5 Core Practice Areas Grid */}
      <section className="services-full-list section-padding bg-light">
        <div className="container">
          <div className="section-header-center">
            <span className="section-tag">CORE CAPABILITIES</span>
            <h2 className="section-title">Five Areas of Technical &amp; Advisory Practice</h2>
            <p className="section-subtext" style={{ maxWidth: '680px' }}>
              Valeris works with organisations to design, build and integrate technology around the way their business actually operates.
            </p>
          </div>

          <div className="practice-cards-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
            {practiceAreas.map((p) => (
              <div key={p.num} className="practice-detail-card">
                <div className="practice-card-header">
                  <div className="practice-icon-box">{p.icon}</div>
                  <span className="practice-num">{p.num}</span>
                </div>
                <h3 className="practice-title">{p.title}</h3>
                <p className="practice-desc">{p.desc}</p>
                <div className="practice-deliverables">
                  <span className="deliverables-title">Key Capabilities:</span>
                  <ul>
                    {p.deliverables.map((item, i) => (
                      <li key={i}>
                        <CheckCircle size={14} className="check-icon" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Structured Delivery Methodology */}
      <Process />

      {/* Bottom Consultation CTA */}
      <section className="services-cta-banner section-padding" style={{ backgroundColor: '#041c14', color: '#ffffff' }}>
        <div className="container" style={{ textAlign: 'center', maxWidth: '780px' }}>
          <span style={{ fontSize: '0.85rem', fontWeight: 800, letterSpacing: '0.18em', color: '#34d399', textTransform: 'uppercase', display: 'block', marginBottom: '14px' }}>
            PARTNER WITH VALERIS
          </span>
          <h2 className="section-title text-white" style={{ fontSize: 'clamp(2rem, 3.8vw, 3.2rem)', marginBottom: '18px', color: '#ffffff' }}>
            LET’S BUILD SOMETHING USEFUL.
          </h2>
          <p className="section-subtext" style={{ color: '#cbd5e1', fontSize: '1.08rem', lineHeight: 1.65, margin: '0 auto 36px' }}>
            Have a technology challenge, an idea that needs to become a product, or a system that needs to work better? Tell us what you are trying to solve.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/contact" className="btn-primary" style={{ background: '#10b981', color: '#041c14', fontWeight: 800, padding: '16px 36px', fontSize: '1rem' }}>
              <span>Start a conversation →</span>
            </Link>
            <a
              href="mailto:Thevalerisgroup@gmail.com"
              className="btn-outline"
              style={{ borderColor: 'rgba(255, 255, 255, 0.4)', color: '#ffffff', padding: '16px 32px', fontSize: '1rem' }}
            >
              <MessageSquare size={18} style={{ marginRight: '8px', verticalAlign: 'middle' }} />
              <span>Email Advisory Team</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
