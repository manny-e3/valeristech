import React, { useState } from 'react';
import PageBanner from '../components/PageBanner';
import { Mail, ShieldCheck, MapPin, Send, HelpCircle, CheckCircle2, ChevronDown, Clock, Sparkles, AlertCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    topic: 'General Inquiry',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email) return;

    setIsSubmitting(true);
    setErrorMessage('');

    // If developing locally on Vite dev server (e.g. port 5173), route to local Apache/PHP
    // In production on Hostinger, route directly to /api/contact.php
    const endpoint = (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && window.location.port
      ? 'http://localhost/safi/valeristechltd/public/api/contact.php'
      : '/api/contact.php';

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitted(true);
        setFormData({
          name: '',
          organization: '',
          email: '',
          phone: '',
          topic: 'General Inquiry',
          message: '',
        });
      } else {
        setErrorMessage(result.error || 'Unable to transmit inquiry. Please verify your details or email us directly.');
      }
    } catch (err) {
      // Graceful fallback for local development or connection limits
      setErrorMessage('Could not connect to the mail service. You can also reach us directly at Thevalerisgroup@gmail.com');
    } finally {
      setIsSubmitting(false);
    }
  };

  const faqs = [
    {
      q: 'What does Valeris Technologies Ltd do and what is SAFI?',
      a: 'Valeris Technologies designs and deploys digital systems that help organisations solve complex operational and financial challenges. SAFI is Valeris’ proprietary financial infrastructure product, built to help financial institutions give customers greater control over how they use their money through configurable allocation and spending controls, behavioural intelligence, and greater visibility.',
    },
    {
      q: 'What is Valeris Technologies Ltd’s legal and regulatory standing?',
      a: 'Valeris Technologies Ltd is a legally incorporated Nigerian technology company (RC Number 9571130), operating under formal corporate governance and designed for institutional compliance.',
    },
    {
      q: 'How can financial institutions integrate with SAFI?',
      a: 'SAFI works within existing banking environments to provide configurable allocation and spending controls, behavioural intelligence and greater visibility into financial activity. It is designed to complement existing banking systems, products and channels, not replace them.',
    },
    {
      q: 'How can organizations engage Valeris Technologies for advisory or custom systems?',
      a: 'You can complete the consultation form below or write directly to Thevalerisgroup@gmail.com to discuss Technology Consulting, Software & Digital Solutions, Systems Integration, Enterprise Technology, or Business & Technology Advisory.',
    },
  ];

  return (
    <div className="contact-page">
      <PageBanner
        title="Contact Valeris Technologies"
        subtitle="Discuss a project, request our company overview deck, or explore institutional partnerships."
        breadcrumb="Contact"
      />

      {/* Contact Cards & Form Section */}
      <section className="contact-main-section section-padding">
        <div className="container">
          {/* Top Info Cards */}
          <div className="contact-cards-grid">
            <div className="contact-card">
              <div className="contact-card-icon"><Mail size={28} /></div>
              <h3 className="contact-card-title">Official Communications</h3>
              <p className="contact-card-desc">For inquiries, RFP submissions, and advisory engagements:</p>
              <a href="mailto:Thevalerisgroup@gmail.com" className="contact-card-link">
                Thevalerisgroup@gmail.com
              </a>
            </div>

            <div className="contact-card">
              <div className="contact-card-icon"><ShieldCheck size={28} /></div>
              <h3 className="contact-card-title">Corporate Standing</h3>
              <p className="contact-card-desc">Registered Nigerian Company Limited by Shares:</p>
              <span className="contact-card-text">
                RC Number: <strong>9571130</strong>
              </span>
            </div>

            <div className="contact-card">
              <div className="contact-card-icon"><MapPin size={28} /></div>
              <h3 className="contact-card-title">Corporate Jurisdiction</h3>
              <p className="contact-card-desc">Headquartered and operating within:</p>
              <span className="contact-card-text">
                Federal Republic of Nigeria
              </span>
            </div>
          </div>

          {/* Form & Consultation Grid */}
          <div className="contact-form-grid" style={{ marginTop: '50px' }}>
            <div className="contact-form-col">
              <div className="form-wrapper">

                <h2 className="contact-heading">Discuss a Project With Valeris</h2>
                <p className="contact-subtext">
                  Complete the institutional scope below. Our systems and advisory team reviews all inquiries within one business day.
                </p>

                {submitted ? (
                  <div className="form-success-box" style={{ flexDirection: 'column', alignItems: 'flex-start', gap: '16px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <CheckCircle2 size={32} style={{ flexShrink: 0 }} />
                      <div>
                        <h4 style={{ margin: '0 0 4px', fontWeight: 700 }}>Inquiry Received Successfully</h4>
                        <p style={{ margin: 0, fontSize: '0.92rem' }}>
                          Thank you for contacting Valeris Technologies Ltd. Our institutional advisory team has received your submission and will review it promptly.
                        </p>
                      </div>
                    </div>

                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="institutional-form">
                    {errorMessage && (
                      <div className="form-error-box">
                        <AlertCircle size={20} style={{ flexShrink: 0 }} />
                        <span>{errorMessage}</span>
                      </div>
                    )}

                    <div className="form-row-2">
                      <div className="form-group">
                        <label>Your Name *</label>
                        <input
                          type="text"
                          required
                          placeholder="e.g. Adebayo Okonjo"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Organization / Institution</label>
                        <input
                          type="text"
                          placeholder="e.g. Apex Commercial Bank"
                          value={formData.organization}
                          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-row-2">
                      <div className="form-group">
                        <label>Corporate Email *</label>
                        <input
                          type="email"
                          required
                          placeholder="name@institution.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        />
                      </div>
                      <div className="form-group">
                        <label>Phone Number</label>
                        <input
                          type="tel"
                          placeholder="+234 ..."
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        />
                      </div>
                    </div>

                    <div className="form-group">
                      <label>Engagement Focus</label>
                      <select
                        value={formData.topic}
                        onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
                      >
                        <option value="General Inquiry">General Institutional Inquiry</option>
                        <option value="SAFI Financial Infrastructure">SAFI — Financial Infrastructure Deployment</option>
                        <option value="Technology Consulting">Technology Consulting</option>
                        <option value="Software & Digital Solutions">Software &amp; Digital Solutions</option>
                        <option value="Systems Integration">Systems Integration</option>
                        <option value="Enterprise Technology">Enterprise Technology</option>
                        <option value="Business & Technology Advisory">Business &amp; Technology Advisory</option>
                        <option value="Strategic Partnership">Strategic Partnership &amp; Advisory</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Project Scope or Inquiry Details</label>
                      <textarea
                        rows={4}
                        placeholder="Briefly describe your objectives, architecture requirements, or project timeline..."
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn-primary form-submit-btn"
                      disabled={isSubmitting}
                      style={{ opacity: isSubmitting ? 0.75 : 1, cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                    >
                      {isSubmitting ? (
                        <>
                          <span className="spinner" />
                          <span>Transmitting Inquiry...</span>
                        </>
                      ) : (
                        <>
                          <Send size={18} />
                          <span>Submit Institutional Inquiry</span>
                        </>
                      )}
                    </button>

                    <div className="form-security-note">
                      <ShieldCheck size={14} className="security-icon" />
                      <span>Confidentiality &amp; regulatory non-disclosure guaranteed</span>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Right Column: FAQ Accordion */}
            <div className="contact-faq-col">
              <div className="faq-box">

                <h2 className="contact-heading">Frequently Asked Questions</h2>
                <p className="contact-subtext">
                  Key details on Valeris Technologies’ proprietary systems, legal standing, and deployment processes.
                </p>

                <div className="faq-accordion-list">
                  {faqs.map((faq, idx) => {
                    const isOpen = openFaq === idx;
                    return (
                      <div key={idx} className={`faq-accordion-item ${isOpen ? 'active' : ''}`}>
                        <button
                          type="button"
                          className="faq-accordion-header"
                          onClick={() => setOpenFaq(isOpen ? -1 : idx)}
                          aria-expanded={isOpen}
                        >
                          <span className="faq-q-text">{faq.q}</span>
                          <div className={`faq-chevron-box ${isOpen ? 'open' : ''}`}>
                            <ChevronDown size={16} />
                          </div>
                        </button>
                        {isOpen && (
                          <div className="faq-accordion-body">
                            <p className="faq-a-text">{faq.a}</p>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Direct Executive Contact Card */}
                <div className="contact-quick-card">
                  <div className="quick-card-icon">
                    <Mail size={20} />
                  </div>
                  <div className="quick-card-info">
                    <h4 className="quick-card-title">Direct Executive Correspondence</h4>
                    <p className="quick-card-desc">For confidential RFP briefs or institutional leadership:</p>
                    <a href="mailto:Thevalerisgroup@gmail.com" className="quick-card-link">
                      Thevalerisgroup@gmail.com &rarr;
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
