import React from 'react';
import { Layers, Code2, Network, Building, Briefcase, ArrowRight } from 'lucide-react';

export default function Services() {
  const serviceList = [
    {
      id: 1,
      num: '01',
      icon: <Layers size={28} />,
      title: 'Technology Consulting',
      desc: 'We help organisations understand technology problems, define practical solutions and make informed decisions about the systems they need. From technology strategy to solution design, we bring structure to complex technology decisions.',
      link: '/contact',
    },
    {
      id: 2,
      num: '02',
      icon: <Code2 size={28} />,
      title: 'Software & Digital Solutions',
      desc: 'We design and develop digital products and business applications built around specific organisational needs. Whether developing a new product or improving an existing process, we focus on functionality, usability and long-term value.',
      link: '/contact',
    },
    {
      id: 3,
      num: '03',
      icon: <Network size={28} />,
      title: 'Systems Integration',
      desc: 'Modern organisations rarely operate on one system. We help connect platforms, applications and workflows so that technology works as a system rather than as isolated tools.',
      link: '/contact',
    },
    {
      id: 4,
      num: '04',
      icon: <Building size={28} />,
      title: 'Enterprise Technology',
      desc: 'We design and deploy technology solutions that support the operational needs of growing organisations. Our work can span workflow automation, information systems, document and data environments, process digitisation and other enterprise technology needs.',
      link: '/contact',
    },
    {
      id: 5,
      num: '05',
      icon: <Briefcase size={28} />,
      title: 'Business & Technology Advisory',
      desc: 'Good technology decisions require an understanding of the business behind them. We provide practical advisory support across technology planning, digital transformation, operating models, policy and technology-enabled business processes.',
      link: '/contact',
    },
  ];

  return (
    <section id="capabilities" className="services-section">
      <div className="container">
        <div className="section-header-center">
          <span className="section-tag">WHAT WE DO</span>
          <h2 className="section-title">Core Capabilities &amp; Practices</h2>
          <p className="section-subtext" style={{ maxWidth: '680px' }}>
            We combine technology, systems thinking and practical business insight to build solutions that work in the real world.
          </p>
        </div>

        <div className="services-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))' }}>
          {serviceList.map((srv) => (
            <div key={srv.id} className="service-card">
              <div className="service-icon-wrap">
                {srv.icon}
              </div>
              <h3 className="service-card-title">{srv.title}</h3>
              <p className="service-card-desc" style={{ lineHeight: 1.6 }}>{srv.desc}</p>
              <a href={srv.link} className="service-read-more">
                <span>Start conversation</span>
                <ArrowRight size={16} />
              </a>
            </div>
          ))}
        </div>

        <div className="services-bottom-bar">
          <p>
            Have an operational challenge or system to integrate?{' '}
            <a href="/contact" className="highlight-link">Talk to our team</a>
          </p>
        </div>
      </div>
    </section>
  );
}
