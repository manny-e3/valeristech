import React, { useState } from 'react';
import { 
  Search, 
  Compass, 
  Terminal, 
  Network, 
  RefreshCw, 
  CheckCircle2,
  Sparkles
} from 'lucide-react';

export default function Process() {
  const [activeStep, setActiveStep] = useState(null);

  const steps = [
    {
      num: '01',
      shortLabel: 'Understand',
      icon: <Search size={20} />,
      title: 'Understand.',
      lead: 'We start with the problem, not the technology.',
      detail: 'We understand the organisation, its processes, users, systems and constraints before defining a solution.',
      tag: 'Problem Discovery & Constraints',
    },
    {
      num: '02',
      shortLabel: 'Design',
      icon: <Compass size={20} />,
      title: 'Design.',
      lead: 'We translate the problem into a clear technology and operating model.',
      detail: 'The objective is not complexity. It is a solution that makes sense.',
      tag: 'Architecture & Operating Model',
    },
    {
      num: '03',
      shortLabel: 'Build',
      icon: <Terminal size={20} />,
      title: 'Build.',
      lead: 'We develop and configure the technology required to bring the solution to life.',
      detail: 'Engineering performant software and configured systems built for real-world resilience.',
      tag: 'Engineering & Configuration',
    },
    {
      num: '04',
      shortLabel: 'Integrate',
      icon: <Network size={20} />,
      title: 'Integrate.',
      lead: 'Where a solution needs to work with existing systems.',
      detail: 'We design the connections required for it to operate within the wider environment.',
      tag: 'APIs & Systems Connectivity',
    },
    {
      num: '05',
      shortLabel: 'Evolve',
      icon: <RefreshCw size={20} />,
      title: 'Evolve.',
      lead: 'Technology does not end at deployment.',
      detail: 'We support organisations as their needs, systems and operating environments change.',
      tag: 'Continuous Lifecycle Support',
    },
  ];

  return (
    <section id="process" className="process-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header-center" style={{ maxWidth: '780px', margin: '0 auto 48px', textAlign: 'center' }}>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(5, 150, 105, 0.08)', border: '1px solid rgba(16, 185, 129, 0.25)', padding: '5px 16px', borderRadius: '9999px', fontSize: '0.8rem', fontWeight: 800, color: 'var(--primary)', letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '14px' }}>
            <Sparkles size={14} />
            <span>HOW WE WORK</span>
          </div>
          <h2 className="section-title" style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', marginBottom: '16px' }}>
            A Structured, Problem-First Delivery Method
          </h2>
          <p className="section-subtext" style={{ fontSize: '1.05rem', color: '#475569', lineHeight: 1.65, margin: '0 auto' }}>
            From initial discovery to continuous lifecycle evolution, we focus on engineering solutions that work within the reality of your operating environment.
          </p>
        </div>

        {/* 5 Interconnected Process Columns (Milestone + Card) */}
        <div className="process-pipeline-grid">
          {steps.map((item, idx) => {
            const isHovered = activeStep === idx;

            return (
              <div
                key={item.num}
                className={`process-step-col ${isHovered ? 'active' : ''}`}
                onMouseEnter={() => setActiveStep(idx)}
                onMouseLeave={() => setActiveStep(null)}
              >
                {/* Top Timeline Milestone Node */}
                <div className="process-step-node" aria-hidden="true">
                  <div className="process-node-circle">{item.num}</div>
                  <span className="process-node-label">{item.shortLabel}</span>
                </div>

                {/* Step Card */}
                <div className="process-pipeline-card">
                  {/* Subtle Background Watermark */}
                  <span className="process-card-watermark">{item.num}</span>

                  <div className="process-card-main">
                    {/* Header Row: Step Pill & Elevated Icon */}
                    <div className="process-card-header">
                      <span className="process-step-badge">Step {item.num}</span>
                      <div className="process-icon-wrap">{item.icon}</div>
                    </div>

                    {/* Card Title & Structured Copy */}
                    <div className="process-card-body">
                      <h3 className="process-card-title">{item.title}</h3>
                      <p className="process-lead-text">{item.lead}</p>
                      <p className="process-detail-text">{item.detail}</p>
                    </div>
                  </div>

                  {/* Bottom Deliverable / Capability Pill */}
                  <div className="process-card-footer">
                    <div className="process-phase-pill" title={item.tag}>
                      <CheckCircle2 size={14} style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span>{item.tag}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
