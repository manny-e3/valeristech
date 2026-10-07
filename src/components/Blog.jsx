import React from 'react';
import { Calendar, Tag, ArrowRight } from 'lucide-react';

export default function Blog() {
  const articles = [
    {
      id: 1,
      title: 'Architecting Intelligent Systems for Modern Financial Infrastructure',
      category: 'Systems Design',
      date: 'June 2026',
      readTime: '5 min read',
      image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 2,
      title: 'Behavioural Data Interpretation in Institutional Decision-Support',
      category: 'Intelligence R&D',
      date: 'May 2026',
      readTime: '7 min read',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=700&q=80',
    },
    {
      id: 3,
      title: 'Overcoming Legacy Bottlenecks in Enterprise Systems Integration',
      category: 'Integration',
      date: 'May 2026',
      readTime: '6 min read',
      image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=700&q=80',
    },
  ];

  return (
    <section id="insights" className="blog-section">
      <div className="container">
        <div className="blog-header-row">
          <div>
            <span className="section-tag">Insights &amp; Research</span>
            <h2 className="section-title">Perspectives on Systems,<br />Data &amp; Financial Platforms</h2>
          </div>
          <div>
            <a href="mailto:Thevalerisgroup@gmail.com?subject=Research%20Briefs%20Inquiry" className="btn-outline">
              Request Research Briefs
            </a>
          </div>
        </div>

        <div className="blog-grid">
          {articles.map((item) => (
            <article key={item.id} className="blog-card">
              <div className="blog-img-box">
                <img
                  src={item.image}
                  alt={item.title}
                  className="blog-img"
                  loading="lazy"
                />
                <span className="blog-tag-badge">{item.category}</span>
              </div>

              <div className="blog-content">
                <div className="blog-meta">
                  <span className="meta-item">
                    <Calendar size={14} />
                    <span>{item.date}</span>
                  </span>
                  <span className="meta-item">
                    <Tag size={14} />
                    <span>{item.readTime}</span>
                  </span>
                </div>

                <h3 className="blog-post-title">
                  <a href="#contact">{item.title}</a>
                </h3>

                <a href="#contact" className="blog-read-link">
                  <span>Explore Topic</span>
                  <ArrowRight size={16} />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
