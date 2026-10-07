import React from 'react';
import { ShieldCheck, Cpu, Layers, Landmark } from 'lucide-react';

export default function Stats() {
  const statItems = [
    {
      id: 1,
      icon: <ShieldCheck size={32} />,
      number: '9571130',
      suffix: '',
      label: 'Corporate RC Registration',
    },
    {
      id: 2,
      icon: <Cpu size={32} />,
      number: '1',
      suffix: ' Flagship Platform',
      label: 'SAFI Financial Systems',
    },
    {
      id: 3,
      icon: <Layers size={32} />,
      number: '7',
      suffix: ' Practice Areas',
      label: 'Advisory, Integration & Tech',
    },
    {
      id: 4,
      icon: <Landmark size={32} />,
      number: '100',
      suffix: '%',
      label: 'Institutional Standards',
    },
  ];

  return (
    <section id="stats" className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {statItems.map((st) => (
            <div key={st.id} className="stat-card">
              <div className="stat-icon-wrap">{st.icon}</div>
              <div className="stat-num-box">
                <span className="stat-number" style={{ fontSize: st.number.length > 4 ? '2.4rem' : '3.2rem' }}>
                  {st.number}
                </span>
                <span className="stat-suffix">{st.suffix}</span>
              </div>
              <p className="stat-label">{st.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
