import React, { useState } from 'react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000);
      setEmail('');
    }
  };

  return (
    <div className="newsletter-wrapper">
      <div className="container">
        <div className="newsletter-card">
          <div className="newsletter-content">
            <h2 className="newsletter-title">
              Connect With<br />Valeris Technologies
            </h2>
            <p className="newsletter-desc">
              Request our institutional company overview deck, pilot SAFI, or schedule an exploratory infrastructure review.
            </p>
          </div>

          <div className="newsletter-form-box">
            {submitted ? (
              <div className="newsletter-success">
                ✓ Thank you. Our team will reach out to you shortly.
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="newsletter-form">
                <input
                  type="email"
                  placeholder="Enter Institutional Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="newsletter-input"
                />
                <button type="submit" className="newsletter-btn">
                  Connect With Us
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
