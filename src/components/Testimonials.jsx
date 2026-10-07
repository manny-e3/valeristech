import React, { useState } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const perspectives = [
  {
    id: 1,
    quote:
      'Valeris Technologies designs infrastructure with an acute awareness of institutional realities. Developing platforms like SAFI demonstrates an uncompromising dedication to solving systemic liquidity, reconciliation, and integration bottlenecks.',
    name: 'Executive Director',
    role: 'Financial Systems & Enterprise Architecture',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    rating: 5,
  },
  {
    id: 2,
    quote:
      'Moving from legacy, fragmented databases to intelligence-driven systems requires more than code — it demands regulatory alignment, governance, and scalable design. Valeris delivers that institutional rigour.',
    name: 'Head of Enterprise Integration',
    role: 'Commercial Banking & FinTech Advisory',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
    rating: 5,
  },
  {
    id: 3,
    quote:
      'Valeris’s systems integration architecture bridges critical market gaps across institutional banking and digital payments, setting a new benchmark for resilient corporate infrastructure in Africa.',
    name: 'Senior Partner',
    role: 'Institutional Investment & Strategic Growth',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    rating: 5,
  },
];

export default function Testimonials() {
  const [index, setIndex] = useState(0);

  const prev = () => {
    setIndex((p) => (p === 0 ? perspectives.length - 1 : p - 1));
  };

  const next = () => {
    setIndex((p) => (p === perspectives.length - 1 ? 0 : p + 1));
  };

  const active = perspectives[index];

  return (
    <section id="perspectives" className="testimonials-section">
      <div className="container">
        <div className="section-header-center">
          <span className="section-tag">Institutional Perspectives</span>
          <h2 className="section-title">Strategic Value for Modern<br />Financial Institutions</h2>
          <p className="section-subtext">
            Architected for governance, compliance awareness, and long-term enterprise adoption.
          </p>
        </div>

        <div className="testimonial-card-wrap">
          <div className="testimonial-card">
            <div className="quote-icon-badge">
              <Quote size={32} />
            </div>

            <div className="stars-row">
              {[...Array(active.rating)].map((_, i) => (
                <Star key={i} size={18} fill="#10b981" color="#10b981" />
              ))}
            </div>

            <blockquote className="testimonial-quote">
              “ {active.quote} ”
            </blockquote>

            <div className="testimonial-footer">
              <div className="testimonial-author-box">
                <img
                  src={active.avatar}
                  alt={active.name}
                  className="author-avatar"
                  loading="lazy"
                />
                <div>
                  <h4 className="author-name">{active.name}</h4>
                  <span className="author-role">{active.role}</span>
                </div>
              </div>

              <div className="testimonial-nav-btns">
                <button
                  type="button"
                  onClick={prev}
                  className="nav-arrow-btn"
                  aria-label="Previous Perspective"
                >
                  <ChevronLeft size={20} />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="nav-arrow-btn"
                  aria-label="Next Perspective"
                >
                  <ChevronRight size={20} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
