import React from 'react';
import { Link } from 'react-router-dom';
import PageBanner from '../components/PageBanner';
import Process from '../components/Process';
import BottomCta from '../components/BottomCta';
import { 
  Layers, 
  Compass, 
  Network, 
  Cpu, 
  CheckCircle2, 
  ArrowRight,
  ShieldCheck,
  Building2,
  Sparkles
} from 'lucide-react';

export default function AboutPage() {
  const whyValeris = [
    {
      num: '01',
      icon: <Layers size={28} />,
      title: 'We think in systems.',
      desc: 'A digital product does not exist in isolation. It sits within people, processes, technology, data, policies and existing infrastructure. We consider the whole system when we design solutions.',
    },
    {
      num: '02',
      icon: <Compass size={28} />,
      title: 'We build with context.',
      desc: 'There is no universal technology solution. We build around the specific environment, objectives and constraints of the organisation we are working with.',
    },
    {
      num: '03',
      icon: <Network size={28} />,
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
    <div className="about-page">
      <PageBanner
        title="About Valeris Technologies"
        subtitle="We build technology for better financial and business systems."
        breadcrumb="About"
      />

      {/* Main Corporate Overview / Purpose */}
      <section className="about-page-overview section-padding">
        <div className="container">
          <div className="corporate-record-bar">
            <div className="record-item">
              <span className="record-label">Company</span>
              <span className="record-val">Valeris Technologies Ltd</span>
            </div>
            <div className="record-item">
              <span className="record-label">RC Number</span>
              <span className="record-val">9571130</span>
            </div>
            <div className="record-item">
              <span className="record-label">Practice Focus</span>
              <span className="record-val">Fintech · Digital Systems · Advisory</span>
            </div>
            <div className="record-item">
              <span className="record-label">Headquarters</span>
              <span className="record-val">Lagos, Nigeria</span>
            </div>
          </div>

          <div className="about-grid">
            <div className="about-text-col">
              <span className="section-tag">TECHNOLOGY WITH A PURPOSE</span>
              <h2 className="section-title">
                We build beyond the surface.
              </h2>
              <p className="about-lead-p" style={{ fontSize: '1.2rem', fontWeight: 600, color: 'var(--dark-heading)', marginBottom: '16px', lineHeight: 1.5 }}>
                Technology should do more than digitise an existing process. It should make systems more intelligent, operations more effective and decisions more informed.
              </p>
              <p className="about-body-p" style={{ marginBottom: '18px', lineHeight: 1.7 }}>
                Valeris works with organisations to design, build and integrate technology around the way their business actually operates. Our work spans financial technology, enterprise systems, digital solutions and technology advisory.
              </p>
              <p className="about-body-p" style={{ color: '#475569', lineHeight: 1.7 }}>
                From financial infrastructure and intelligent products to enterprise systems and technology advisory, we combine technology, systems thinking and practical business insight to build solutions that work in the real world.
              </p>
            </div>

            <div className="about-media-col">
              <div className="about-images-wrapper">
                <div className="about-img-left">
                  <img
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=800&q=80"
                    alt="Valeris institutional infrastructure"
                    className="img-rounded-desk"
                  />
                </div>
                <div className="about-img-right">
                  <img
                    src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=800&q=80"
                    alt="Valeris systems engineers"
                    className="img-stylized-portrait"
                  />
                </div>
              </div>
              <div className="about-quote-box">
                <p>
                  "We understand that a technically impressive system is not necessarily a useful one. Our work connects technology decisions to real operational and business outcomes."
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHY VALERIS Section */}
      <section className="about-why section-padding bg-light">
        <div className="container">
          <div className="section-header-center">
            <span className="section-tag">WHY VALERIS</span>
            <h2 className="section-title">The Principles Behind Every Solution We Build</h2>
            <p className="section-subtext" style={{ maxWidth: '680px' }}>
              We build around the specific environment, objectives and constraints of the organisations we work with.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px', marginTop: '40px' }}>
            {whyValeris.map((item) => (
              <div
                key={item.num}
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #ede7dc',
                  borderRadius: '24px',
                  padding: '36px 30px',
                  boxShadow: '0 4px 20px rgba(6,36,27,0.03)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ color: '#06241b', background: '#fbf9f5', border: '1.5px solid #ede7dc', width: '52px', height: '52px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    {item.icon}
                  </div>
                  <span style={{ fontSize: '1.1rem', fontWeight: 700, color: '#c29853', fontFamily: 'var(--font-serif)' }}>
                    {item.num}
                  </span>
                </div>
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', fontWeight: 400, color: 'var(--dark-heading)', margin: 0 }}>
                  {item.title}
                </h3>
                <p style={{ fontSize: '0.95rem', color: '#597367', lineHeight: 1.65, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* WHERE WE WORK Section */}
      <section className="about-sectors section-padding">
        <div className="container">
          <div className="section-header-center">
            <span className="section-tag">WHERE WE WORK</span>
            <h2 className="section-title">Sectors &amp; Operating Environments</h2>
            <p className="section-subtext" style={{ maxWidth: '680px' }}>
              From regulated financial institutions to dynamic enterprises and emerging opportunities.
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '28px', marginTop: '40px' }}>
            {whereWeWork.map((sec) => (
              <div
                key={sec.id}
                style={{
                  background: '#ffffff',
                  border: '1.5px solid #ede7dc',
                  borderRadius: '22px',
                  padding: '34px 28px',
                  boxShadow: '0 4px 18px rgba(6,36,27,0.03)',
                }}
              >
                <div style={{ width: '36px', height: '3px', background: '#c29853', borderRadius: '2px', marginBottom: '16px' }} />
                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.35rem', fontWeight: 400, color: 'var(--dark-heading)', marginBottom: '12px' }}>
                  {sec.title}
                </h3>
                <p style={{ fontSize: '0.94rem', color: '#597367', lineHeight: 1.65, margin: 0 }}>
                  {sec.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OUR TECHNOLOGY / SAFI Spotlight */}
      <section className="about-safi-spotlight section-padding bg-light">
        <div className="container">
          <div style={{
            background: 'linear-gradient(135deg, #06241b 0%, #031811 100%)',
            borderRadius: '28px',
            padding: '54px 44px',
            color: '#ffffff',
            boxShadow: '0 20px 50px rgba(6, 36, 27, 0.25)',
            border: '1px solid #0e3b2d'
          }}>
            <div style={{ maxWidth: '820px' }}>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(194, 152, 83, 0.15)', border: '1px solid rgba(194, 152, 83, 0.3)', padding: '5px 16px', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 700, color: '#c29853', marginBottom: '20px' }}>
                <Sparkles size={14} />
                <span>OUR TECHNOLOGY · BUILT BY VALERIS</span>
              </div>
              <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.2rem, 3.8vw, 3rem)', fontWeight: 400, color: '#ffffff', marginBottom: '18px', lineHeight: 1.2 }}>
                SAFI: Financial behaviour, built into banking.
              </h2>
              <p style={{ fontSize: '1.08rem', color: '#f1f5f9', lineHeight: 1.65, marginBottom: '16px', fontWeight: 400 }}>
                SAFI is Valeris’ proprietary financial infrastructure product, built to help financial institutions give customers greater control over how they use their money.
              </p>
              <p style={{ fontSize: '0.98rem', color: '#cbd5e1', lineHeight: 1.65, marginBottom: '28px' }}>
                SAFI works within existing banking environments to provide configurable allocation and spending controls, behavioural intelligence and greater visibility into financial activity. It is designed to complement existing banking systems, products and channels, not replace them.
              </p>

              <div style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '18px',
                padding: '24px 28px',
                marginBottom: '32px'
              }}>
                <h4 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#34d399', marginBottom: '8px' }}>
                  BUILT BY VALERIS
                </h4>
                <p style={{ fontSize: '0.94rem', color: '#e2e8f0', lineHeight: 1.6, margin: 0 }}>
                  SAFI is our first expression of what we believe financial technology can become. Financial institutions already have the accounts, channels, transaction infrastructure and customer relationships. We build the intelligence and control layers that can make those systems do more.
                </p>
              </div>

              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                <Link to="/safi" className="btn-primary" style={{ background: '#ffffff', color: '#06241b', fontWeight: 700, padding: '15px 32px', borderRadius: '9999px', boxShadow: '0 6px 20px rgba(0,0,0,0.25)' }}>
                  <span>Explore SAFI →</span>
                </Link>
                <Link to="/contact" className="btn-outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#ffffff', padding: '15px 30px', borderRadius: '9999px' }}>
                  <span>Talk to us</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* HOW WE WORK: Methodology */}
      <Process />

      {/* Bottom CTA */}
      <BottomCta />
    </div>
  );
}
