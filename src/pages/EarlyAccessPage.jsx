import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  ShieldCheck,
  Building2,
  Sparkles,
  ArrowRight,
  Lock,
  Mail,
  User,
  Phone,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  FileText,
  Check,
  AlertCircle,
  HelpCircle
} from 'lucide-react';

// Popular quick-select banks in Nigeria
const POPULAR_BANKS = [
  'Access Bank',
  'GTBank (Guaranty Trust)',
  'Zenith Bank',
  'First Bank of Nigeria',
  'United Bank for Africa (UBA)',
  'Kuda Bank',
  'Moniepoint',
  'OPay',
  'Stanbic IBTC',
  'Fidelity Bank',
  'FCMB',
  'Sterling Bank',
  'Wema Bank / ALAT'
];

export default function EarlyAccessPage() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    bankInterest: 'Yes, I would be interested.',
    bank: '',
    customBank: '',
    ndaAgreed: 'I agree.',
    consentContact: true,
    source: 'Website / Early Access Page'
  });

  const [showFullNda, setShowFullNda] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [responseMsg, setResponseMsg] = useState('');

  // Handle generic input changes
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (submitError) setSubmitError('');
  };

  // Quick select a bank
  const handleBankChipClick = (bankName) => {
    setFormData((prev) => ({
      ...prev,
      bank: bankName,
      customBank: ''
    }));
    if (submitError) setSubmitError('');
  };

  // Submission handler
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError('');

    // Client-side validations matching Google Form requirements
    if (!formData.fullName.trim()) {
      setSubmitError('Please enter your full name.');
      return;
    }

    if (!formData.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setSubmitError('Please provide a valid email address.');
      return;
    }

    const finalBank = formData.customBank.trim() || formData.bank.trim();
    if (!finalBank) {
      setSubmitError('Please indicate which bank you would like to see SAFI integrated into.');
      return;
    }

    if (formData.ndaAgreed !== 'I agree.') {
      setSubmitError('Acceptance of the Non-Disclosure Agreement (NDA) is required to access confidential SAFI preview materials.');
      return;
    }

    if (!formData.consentContact) {
      setSubmitError('Please grant consent to be contacted regarding SAFI updates and product discussions.');
      return;
    }

    setIsSubmitting(true);

    const payload = {
      fullName: formData.fullName.trim(),
      email: formData.email.trim(),
      phone: formData.phone.trim(),
      bankInterest: formData.bankInterest,
      bank: finalBank,
      ndaAgreed: formData.ndaAgreed,
      consentContact: formData.consentContact ? 'Yes' : 'No',
      source: formData.source
    };

    const endpoints = [
      '/api/early-access.php',
      'http://localhost/safi/valeristechltd/api/early-access.php'
    ];

    let success = false;
    let lastError = null;

    for (const endpoint of endpoints) {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(payload)
        });

        const result = await response.json().catch(() => null);

        if (response.ok && result?.success) {
          success = true;
          setResponseMsg(result.message || 'Thank you for expressing interest in SAFI Early Access.');
          break;
        } else if (result?.message) {
          lastError = result.message;
        }
      } catch (err) {
        lastError = err.message || 'Connection error';
      }
    }

    setIsSubmitting(false);

    if (success) {
      setIsSubmitted(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      setSubmitError(lastError || 'Unable to submit your application. Please check your connection and try again.');
    }
  };

  return (
    <div className="ea-page-container">
      {/* Page Header / Breadcrumb Hero */}
      <section className="ea-banner-section">
        <div className="container">
          <div className="ea-breadcrumb-bar">
            <Link to="/" className="ea-bc-link">Home</Link>
            <ChevronRight size={14} className="ea-bc-sep" />
            <Link to="/safi" className="ea-bc-link">SAFI</Link>
            <ChevronRight size={14} className="ea-bc-sep" />
            <span className="ea-bc-current">Early Access Application</span>
          </div>

          <div className="ea-banner-content">
            <div className="ea-cohort-badge">
              <span className="ea-cohort-dot" />
              <span>COHORT 1 ENROLLMENT · LIMITED SPOTS</span>
            </div>
            <h1 className="ea-banner-title">Join SAFI Early Access</h1>
            <p className="ea-banner-subtitle">
              Be among the first to experience embedded financial behaviour infrastructure directly inside your bank.
            </p>
          </div>
        </div>
      </section>

      {/* Main Dual-Column Content */}
      <section className="ea-content-section">
        <div className="container">
          <div className="ea-layout-grid">
            {/* Left Column: Context & Overview */}
            <aside className="ea-info-panel">
              <div className="ea-info-card">
                <div className="ea-card-accent-tag">
                  <Sparkles size={14} className="ea-accent-gold" />
                  <span>PROGRAM OVERVIEW</span>
                </div>

                <h2 className="ea-info-title">
                  Welcome to SAFI Early Access
                </h2>

                <p className="ea-info-p">
                  <strong>SAFI</strong> is a bank embedded financial infrastructure by <strong>Valeris Technology</strong> that helps individuals manage their money through smarter fund allocation, spending controls, and financial insights, all within their existing banking environment.
                </p>

                <p className="ea-info-p-sub">
                  We’re inviting interested individuals to join our Early Access Program and be part of the journey toward a smarter banking experience.
                </p>

                <div className="ea-prompt-callout">
                  <HelpCircle size={16} className="ea-prompt-icon" />
                  <span>To express your interest in SAFI Early Access, please complete the questions on this form.</span>
                </div>

                {/* Key Pillars */}
                <div className="ea-pillars-list">
                  <div className="ea-pillar-item">
                    <div className="ea-pillar-icon">
                      <Building2 size={18} />
                    </div>
                    <div>
                      <h4 className="ea-pillar-h">Native Banking Embedded</h4>
                      <p className="ea-pillar-desc">
                        Works seamlessly within your current bank's infrastructure without opening third-party accounts or manual transfers.
                      </p>
                    </div>
                  </div>

                  <div className="ea-pillar-item">
                    <div className="ea-pillar-icon">
                      <ShieldCheck size={18} />
                    </div>
                    <div>
                      <h4 className="ea-pillar-h">Institutional NDA Protection</h4>
                      <p className="ea-pillar-desc">
                        All preview interactions and architecture demos are governed under mutual confidentiality.
                      </p>
                    </div>
                  </div>

                  <div className="ea-pillar-item">
                    <div className="ea-pillar-icon">
                      <Lock size={18} />
                    </div>
                    <div>
                      <h4 className="ea-pillar-h">Priority Cohort Onboarding</h4>
                      <p className="ea-pillar-desc">
                        Early access members receive direct access to product teams during commercial bank rollout sprints.
                      </p>
                    </div>
                  </div>
                </div>


              </div>
            </aside>

            {/* Right Column: High-Converting Streamlined Form */}
            <main className="ea-form-panel">
              {isSubmitted ? (
                /* Celebration / Success Screen */
                <div className="ea-form-card ea-success-box">
                  <div className="ea-success-icon-wrap">
                    <CheckCircle2 size={60} color="#059669" />
                  </div>
                  <span className="ea-success-badge">APPLICATION RECORDED</span>
                  <h2 className="ea-success-title">You’re on the SAFI Early Access List!</h2>
                  <p className="ea-success-desc">
                    {responseMsg || 'Thank you for expressing your interest in SAFI Early Access. We have reserved your evaluation spot in our upcoming priority cohort.'}
                  </p>

                  <div className="ea-summary-card">
                    <div className="ea-summary-row">
                      <span className="ea-sum-label">Applicant Name</span>
                      <strong className="ea-sum-val">{formData.fullName}</strong>
                    </div>
                    <div className="ea-summary-row">
                      <span className="ea-sum-label">Contact Email</span>
                      <strong className="ea-sum-val">{formData.email}</strong>
                    </div>
                    <div className="ea-summary-row">
                      <span className="ea-sum-label">Requested Bank Integration</span>
                      <strong className="ea-sum-val">{formData.customBank || formData.bank || 'Selected Bank'}</strong>
                    </div>
                    <div className="ea-summary-row">
                      <span className="ea-sum-label">NDA Undertaking</span>
                      <span className="ea-badge-nda">✓ I Agree (Confirmed)</span>
                    </div>
                  </div>

                  <p className="ea-success-foot">
                    Our partnership team will contact you via <strong>{formData.email}</strong> as pilot releases and product demonstrations are scheduled.
                  </p>

                  <div className="ea-success-btn-group">
                    <Link to="/safi" className="ea-btn-primary">
                      Explore SAFI Details
                    </Link>
                    <Link to="/" className="ea-btn-outline">
                      Return to Valeris Home
                    </Link>
                  </div>
                </div>
              ) : (
                /* The Streamlined Form */
                <div className="ea-form-card">
                  <div className="ea-form-header">
                    <h2 className="ea-form-title">Early Access Expression of Interest</h2>
                    <p className="ea-form-subtitle">
                      Please provide your details below. All fields marked with an asterisk (<span className="ea-req">*</span>) are required.
                    </p>
                  </div>

                  {submitError && (
                    <div className="ea-error-alert" role="alert">
                      <AlertCircle size={18} className="ea-error-icon" />
                      <span>{submitError}</span>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} noValidate className="ea-form-body">
                    {/* SECTION 1: Personal Details */}
                    <div className="ea-group-block">
                      <div className="ea-block-header">
                        <span className="ea-num-badge">1</span>
                        <h3 className="ea-block-title">Your Contact Information</h3>
                      </div>

                      {/* Item 1 from Google Form: Name */}
                      <div className="ea-input-field">
                        <label htmlFor="ea-fullName" className="ea-field-label">
                          Name <span className="ea-req">*</span>
                        </label>
                        <div className="ea-field-wrap">
                          <User size={18} className="ea-field-svg" />
                          <input
                            type="text"
                            id="ea-fullName"
                            name="fullName"
                            value={formData.fullName}
                            onChange={handleInputChange}
                            placeholder="Full Name (e.g. Samuel Adeleke)"
                            className="ea-text-input"
                            autoComplete="name"
                            required
                          />
                        </div>
                      </div>

                      <div className="ea-input-grid">
                        {/* Item 2 from Google Form: Email */}
                        <div className="ea-input-field">
                          <label htmlFor="ea-email" className="ea-field-label">
                            Email <span className="ea-req">*</span>
                          </label>
                          <div className="ea-field-wrap">
                            <Mail size={18} className="ea-field-svg" />
                            <input
                              type="email"
                              id="ea-email"
                              name="email"
                              value={formData.email}
                              onChange={handleInputChange}
                              placeholder="alex@example.com"
                              className="ea-text-input"
                              autoComplete="email"
                              required
                            />
                          </div>
                        </div>

                        {/* Optional Phone Number */}
                        <div className="ea-input-field">
                          <label htmlFor="ea-phone" className="ea-field-label">
                            Phone Number <span className="ea-opt-tag">Optional</span>
                          </label>
                          <div className="ea-field-wrap">
                            <Phone size={18} className="ea-field-svg" />
                            <input
                              type="tel"
                              id="ea-phone"
                              name="phone"
                              value={formData.phone}
                              onChange={handleInputChange}
                              placeholder="+234 800 000 0000"
                              className="ea-text-input"
                              autoComplete="tel"
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* SECTION 2: Bank Integration Preferences */}
                    <div className="ea-group-block">
                      <div className="ea-block-header">
                        <span className="ea-num-badge">2</span>
                        <h3 className="ea-block-title">Bank Integration Preferences</h3>
                      </div>

                      {/* Item 5 from Google Form: Would you be interested in having SAFI integrated into your bank’s existing services? */}
                      <div className="ea-input-field">
                        <label className="ea-field-label">
                          Would you be interested in having SAFI integrated into your bank’s existing services? <span className="ea-req">*</span>
                        </label>
                        <div className="ea-radio-options-grid">
                          <button
                            type="button"
                            className={`ea-radio-card ${formData.bankInterest === 'Yes, I would be interested.' ? 'is-selected' : ''}`}
                            onClick={() => setFormData(prev => ({ ...prev, bankInterest: 'Yes, I would be interested.' }))}
                          >
                            <div className="ea-circle-indicator">
                              {formData.bankInterest === 'Yes, I would be interested.' && <Check size={13} />}
                            </div>
                            <div className="ea-card-copy">
                              <strong>Yes, I would be interested.</strong>
                              <span>I want native fund allocation in my banking app</span>
                            </div>
                          </button>

                          <button
                            type="button"
                            className={`ea-radio-card ${formData.bankInterest === 'No, not at this time.' ? 'is-selected' : ''}`}
                            onClick={() => setFormData(prev => ({ ...prev, bankInterest: 'No, not at this time.' }))}
                          >
                            <div className="ea-circle-indicator">
                              {formData.bankInterest === 'No, not at this time.' && <Check size={13} />}
                            </div>
                            <div className="ea-card-copy">
                              <strong>No, not at this time.</strong>
                              <span>Currently evaluating overall product capabilities</span>
                            </div>
                          </button>
                        </div>
                      </div>

                      {/* Item 6 from Google Form: Which bank would you like to see SAFI integrated into? */}
                      <div className="ea-input-field">
                        <label htmlFor="ea-bank-input" className="ea-field-label">
                          Which bank would you like to see SAFI integrated into? <span className="ea-req">*</span>
                        </label>
                        <p className="ea-micro-instruction">
                          Click any bank chip for 1-tap selection, or enter your institution below:
                        </p>

                        {/* Interactive Bank Chips (Zero-Bulk UX) */}
                        <div className="ea-bank-chips-wrap">
                          {POPULAR_BANKS.map((b) => {
                            const isSelected = formData.bank === b && !formData.customBank;
                            return (
                              <button
                                key={b}
                                type="button"
                                className={`ea-chip-btn ${isSelected ? 'is-active' : ''}`}
                                onClick={() => handleBankChipClick(b)}
                              >
                                {isSelected && <Check size={12} className="ea-chip-icon" />}
                                <span>{b}</span>
                              </button>
                            );
                          })}
                        </div>

                        {/* Custom / Specific Bank Input */}
                        <div className="ea-field-wrap" style={{ marginTop: '10px' }}>
                          <Building2 size={18} className="ea-field-svg" />
                          <input
                            type="text"
                            id="ea-bank-input"
                            name="customBank"
                            value={formData.customBank || formData.bank}
                            onChange={(e) => {
                              const val = e.target.value;
                              setFormData(prev => ({
                                ...prev,
                                customBank: val,
                                bank: val
                              }));
                              if (submitError) setSubmitError('');
                            }}
                            placeholder="Selected bank or type custom (e.g. GTBank, Zenith, Providus...)"
                            className="ea-text-input"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    {/* SECTION 3: Non-Disclosure Agreement (NDA) & Consent */}
                    <div className="ea-group-block">
                      <div className="ea-block-header">
                        <span className="ea-num-badge">3</span>
                        <h3 className="ea-block-title">Confidentiality Undertaking & Consent</h3>
                      </div>

                      {/* Item 3 from Google Form: Non-Disclosure Agreement (NDA) */}
                      <div className="ea-nda-wrapper">
                        <div className="ea-nda-top">
                          <div className="ea-nda-badge">
                            <FileText size={16} className="ea-nda-icon-gold" />
                            <h4 className="ea-nda-heading">Non-Disclosure Agreement (NDA) <span className="ea-req">*</span></h4>
                          </div>
                          <button
                            type="button"
                            className="ea-expand-btn"
                            onClick={() => setShowFullNda(!showFullNda)}
                            aria-expanded={showFullNda}
                          >
                            <span>{showFullNda ? 'Hide Full Undertaking' : 'Read Full NDA Terms'}</span>
                            {showFullNda ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
                          </button>
                        </div>

                        <p className="ea-nda-synopsis">
                          SAFI, a product of Valeris Technology (including its architecture, business model, operational mechanisms, and preview demos), is confidential and proprietary. Your acceptance confirms you will evaluate SAFI responsibly without unauthorized disclosure.
                        </p>

                        {/* Verbatim Google Form terms inside collapsible accordion */}
                        {showFullNda && (
                          <div className="ea-nda-drawer">
                            <p>
                              Do you understand and agree that SAFI, a product of Valeris Technology, including its features, functionalities, business model, technical architecture, operational processes, financial control mechanisms, product demonstrations, documentation, and any other related information disclosed to you, is confidential and proprietary to Valeris Technology?
                            </p>
                            <p>
                              By selecting “I Agree,” you acknowledge and agree that you shall not disclose, reproduce, distribute, misuse, or share any confidential information relating to SAFI with unauthorized persons or third parties without prior written authorization from Valeris Technology. You further agree not to use the information for any purpose other than evaluating, discussing, or considering SAFI and its potential adoption or integration.
                            </p>
                            <p>
                              You understand that your acceptance of these terms is intended to constitute a binding confidentiality undertaking, subject to applicable law.
                            </p>
                          </div>
                        )}

                        {/* Interactive Choice: I agree / No */}
                        <div className="ea-nda-radios">
                          <label
                            className={`ea-nda-radio-label ${formData.ndaAgreed === 'I agree.' ? 'is-agreed' : ''}`}
                            onClick={() => setFormData(prev => ({ ...prev, ndaAgreed: 'I agree.' }))}
                          >
                            <input
                              type="radio"
                              name="ndaAgreed"
                              value="I agree."
                              checked={formData.ndaAgreed === 'I agree.'}
                              onChange={handleInputChange}
                              className="ea-hidden-radio"
                            />
                            <div className="ea-circle-indicator">
                              {formData.ndaAgreed === 'I agree.' && <Check size={13} />}
                            </div>
                            <div className="ea-nda-label-content">
                              <strong>I agree.</strong>
                              <span>I understand and accept the confidentiality terms</span>
                            </div>
                          </label>

                          <label
                            className={`ea-nda-radio-label ${formData.ndaAgreed === 'No ,I have not agreed.' ? 'is-declined' : ''}`}
                            onClick={() => setFormData(prev => ({ ...prev, ndaAgreed: 'No ,I have not agreed.' }))}
                          >
                            <input
                              type="radio"
                              name="ndaAgreed"
                              value="No ,I have not agreed."
                              checked={formData.ndaAgreed === 'No ,I have not agreed.'}
                              onChange={handleInputChange}
                              className="ea-hidden-radio"
                            />
                            <div className="ea-circle-indicator">
                              {formData.ndaAgreed === 'No ,I have not agreed.' && <Check size={13} />}
                            </div>
                            <div className="ea-nda-label-content">
                              <strong>No ,I have not agreed.</strong>
                              <span>I do not accept confidentiality terms at this time</span>
                            </div>
                          </label>
                        </div>

                        {formData.ndaAgreed === 'No ,I have not agreed.' && (
                          <div className="ea-nda-warning">
                            Notice: SAFI Early Access includes confidential architecture previews. Acceptance of the Non-Disclosure Agreement is required to receive evaluation materials.
                          </div>
                        )}
                      </div>

                      {/* Item 4 from Google Form: Consent */}
                      <div className="ea-consent-box">
                        <label className="ea-consent-label">
                          <input
                            type="checkbox"
                            name="consentContact"
                            checked={formData.consentContact}
                            onChange={handleInputChange}
                            className="ea-hidden-checkbox"
                            required
                          />
                          <span className="ea-checkbox-facade">
                            {formData.consentContact && <Check size={13} color="#ffffff" />}
                          </span>
                          <span className="ea-consent-statement">
                            I consent to being contacted regarding SAFI, including product demonstrations, discussions, and potential integration opportunities. <span className="ea-req">*</span>
                          </span>
                        </label>
                      </div>
                    </div>

                    {/* SUBMIT BUTTON */}
                    <div className="ea-submit-container">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="ea-submit-cta"
                        id="submit-early-access-form-btn"
                      >
                        {isSubmitting ? (
                          <span className="ea-btn-spinner-wrap">
                            <span className="ea-spinner-icon" />
                            Recording Expression of Interest...
                          </span>
                        ) : (
                          <>
                            <span>Join SAFI Early Access</span>
                            <ArrowRight size={18} className="ea-cta-arrow" />
                          </>
                        )}
                      </button>


                    </div>
                  </form>
                </div>
              )}
            </main>
          </div>
        </div>
      </section>

      {/* Scoped CSS for Early Access Page */}
      <style>{`
        .ea-page-container {
          background-color: #faf8f4;
          min-height: calc(100vh - 80px);
          color: #06241b;
          font-family: var(--font-main);
        }

        /* Banner Section */
        .ea-banner-section {
          background: linear-gradient(180deg, #06241b 0%, #041a13 100%);
          color: #ffffff;
          padding: 42px 0 54px;
          border-bottom: 1px solid rgba(237, 231, 220, 0.1);
        }

        .ea-breadcrumb-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          color: #9cb3a5;
          margin-bottom: 24px;
        }

        .ea-bc-link {
          color: #9cb3a5;
          transition: color 0.2s;
        }

        .ea-bc-link:hover {
          color: #34d399;
        }

        .ea-bc-sep {
          color: #557564;
        }

        .ea-bc-current {
          color: #ffffff;
          font-weight: 600;
        }

        .ea-cohort-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(16, 185, 129, 0.15);
          border: 1px solid rgba(52, 211, 153, 0.3);
          color: #34d399;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          padding: 5px 14px;
          border-radius: 9999px;
          margin-bottom: 14px;
        }

        .ea-cohort-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #34d399;
          box-shadow: 0 0 0 3px rgba(52, 211, 153, 0.25);
          animation: pulse 2s infinite;
        }

        .ea-banner-title {
          font-family: var(--font-serif);
          font-size: clamp(2.2rem, 3.8vw, 3.2rem);
          font-weight: 800;
          color: #ffffff;
          margin-bottom: 12px;
          line-height: 1.15;
          letter-spacing: -0.01em;
        }

        .ea-banner-subtitle {
          font-size: 1.05rem;
          color: #cbd5e1;
          max-width: 680px;
          line-height: 1.6;
          margin: 0;
        }

        /* Content Section */
        .ea-content-section {
          padding: 50px 0 90px;
        }

        .ea-layout-grid {
          display: grid;
          grid-template-columns: 1fr 1.35fr;
          gap: 48px;
          align-items: start;
        }

        @media (max-width: 992px) {
          .ea-layout-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }

        /* Left Info Card */
        .ea-info-card {
          background-color: #ffffff;
          border-radius: 24px;
          padding: 38px 34px;
          border: 1px solid rgba(6, 36, 27, 0.08);
          box-shadow: 0 12px 35px rgba(6, 36, 27, 0.04);
          position: sticky;
          top: 90px;
        }

        .ea-card-accent-tag {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(194, 152, 83, 0.12);
          color: #926b23;
          border: 1px solid rgba(194, 152, 83, 0.25);
          padding: 4px 12px;
          border-radius: 9999px;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.1em;
          margin-bottom: 18px;
        }

        .ea-accent-gold {
          color: #c29853;
        }

        .ea-info-title {
          font-family: var(--font-serif);
          font-size: 1.75rem;
          font-weight: 800;
          color: #06241b;
          margin-bottom: 16px;
          line-height: 1.25;
        }

        .ea-info-p {
          font-size: 0.98rem;
          color: #2c4238;
          line-height: 1.65;
          margin-bottom: 12px;
        }

        .ea-info-p-sub {
          font-size: 0.92rem;
          color: #4b6358;
          line-height: 1.6;
          margin-bottom: 20px;
        }

        .ea-prompt-callout {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #166534;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 0.86rem;
          font-weight: 600;
          line-height: 1.5;
          margin-bottom: 28px;
        }

        .ea-prompt-icon {
          flex-shrink: 0;
          margin-top: 2px;
          color: #059669;
        }

        .ea-pillars-list {
          display: flex;
          flex-direction: column;
          gap: 18px;
          margin-bottom: 28px;
        }

        .ea-pillar-item {
          display: flex;
          gap: 14px;
          align-items: flex-start;
        }

        .ea-pillar-icon {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background-color: #ecfdf5;
          color: #059669;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .ea-pillar-h {
          font-size: 0.92rem;
          font-weight: 700;
          color: #06241b;
          margin-bottom: 2px;
        }

        .ea-pillar-desc {
          font-size: 0.84rem;
          color: #556c60;
          line-height: 1.5;
          margin: 0;
        }

        .ea-meta-tag {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.82rem;
          color: #475569;
          padding-top: 18px;
          border-top: 1px solid #f1ece1;
        }

        .ea-meta-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background-color: #059669;
        }

        /* Right Form Card */
        .ea-form-card {
          background-color: #ffffff;
          border-radius: 24px;
          padding: 42px 38px;
          border: 1px solid rgba(6, 36, 27, 0.08);
          box-shadow: 0 16px 40px rgba(6, 36, 27, 0.05);
        }

        @media (max-width: 640px) {
          .ea-form-card {
            padding: 28px 20px;
            border-radius: 18px;
          }
        }

        .ea-form-header {
          margin-bottom: 26px;
          padding-bottom: 18px;
          border-bottom: 1px solid #f1ece1;
        }

        .ea-form-title {
          font-family: var(--font-serif);
          font-size: 1.7rem;
          font-weight: 800;
          color: #06241b;
          margin-bottom: 6px;
        }

        .ea-form-subtitle {
          font-size: 0.9rem;
          color: #556c60;
          margin: 0;
        }

        .ea-req {
          color: #dc2626;
        }

        .ea-error-alert {
          display: flex;
          align-items: center;
          gap: 10px;
          background-color: #fef2f2;
          border: 1.5px solid #fecaca;
          color: #991b1b;
          padding: 12px 16px;
          border-radius: 12px;
          font-size: 0.88rem;
          font-weight: 600;
          margin-bottom: 22px;
        }

        .ea-error-icon {
          flex-shrink: 0;
        }

        /* Form Structure */
        .ea-form-body {
          display: flex;
          flex-direction: column;
          gap: 30px;
        }

        .ea-group-block {
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .ea-block-header {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 2px;
        }

        .ea-num-badge {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background-color: #06241b;
          color: #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.74rem;
          font-weight: 800;
          flex-shrink: 0;
        }

        .ea-block-title {
          font-size: 1.05rem;
          font-weight: 800;
          color: #06241b;
          margin: 0;
        }

        .ea-input-field {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .ea-field-label {
          font-size: 0.88rem;
          font-weight: 700;
          color: #0e3326;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .ea-opt-tag {
          font-size: 0.72rem;
          font-weight: 600;
          color: #64748b;
          background: #f1f5f9;
          padding: 2px 8px;
          border-radius: 9999px;
        }

        .ea-micro-instruction {
          font-size: 0.8rem;
          color: #64748b;
          margin: 0 0 6px;
        }

        .ea-field-wrap {
          position: relative;
          width: 100%;
        }

        .ea-field-svg {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: #94a3b8;
          pointer-events: none;
        }

        .ea-text-input {
          width: 100%;
          padding: 13px 16px 13px 44px;
          font-size: 0.94rem;
          font-family: var(--font-main);
          border: 1.5px solid #e2ddd4;
          border-radius: 12px;
          background-color: #faf9f6;
          color: #06241b;
          outline: none;
          box-sizing: border-box;
          transition: border-color 0.2s, background-color 0.2s, box-shadow 0.2s;
        }

        .ea-text-input:focus {
          border-color: #059669;
          background-color: #ffffff;
          box-shadow: 0 0 0 3px rgba(5, 150, 105, 0.12);
        }

        .ea-input-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        @media (max-width: 600px) {
          .ea-input-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Radio Options Grid (Question 5) */
        .ea-radio-options-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 12px;
        }

        @media (max-width: 580px) {
          .ea-radio-options-grid {
            grid-template-columns: 1fr;
          }
        }

        .ea-radio-card {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          text-align: left;
          padding: 14px 16px;
          border-radius: 14px;
          border: 1.5px solid #e2ddd4;
          background-color: #faf9f6;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .ea-radio-card:hover {
          background-color: #ffffff;
          border-color: #cbd5e1;
          transform: translateY(-1px);
        }

        .ea-radio-card.is-selected {
          border-color: #059669;
          background-color: #f0fdf4;
          box-shadow: 0 4px 12px rgba(5, 150, 105, 0.08);
        }

        .ea-circle-indicator {
          width: 18px;
          height: 18px;
          border-radius: 50%;
          border: 2px solid #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #ffffff;
          flex-shrink: 0;
          color: #ffffff;
          margin-top: 2px;
          transition: all 0.2s;
        }

        .ea-radio-card.is-selected .ea-circle-indicator,
        .ea-nda-radio-label.is-agreed .ea-circle-indicator {
          border-color: #059669;
          background-color: #059669;
        }

        .ea-nda-radio-label.is-declined .ea-circle-indicator {
          border-color: #dc2626;
          background-color: #dc2626;
        }

        .ea-card-copy {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .ea-card-copy strong {
          font-size: 0.9rem;
          color: #06241b;
        }

        .ea-card-copy span {
          font-size: 0.78rem;
          color: #64748b;
        }

        /* Bank Chips Cloud */
        .ea-bank-chips-wrap {
          display: flex;
          flex-wrap: wrap;
          gap: 7px;
          max-height: 135px;
          overflow-y: auto;
          padding: 6px;
          background: #faf9f6;
          border-radius: 12px;
          border: 1px solid #e8e3d8;
        }

        .ea-chip-btn {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          background-color: #ffffff;
          border: 1.5px solid #e2ddd4;
          color: #2c4238;
          font-size: 0.8rem;
          font-weight: 600;
          padding: 5px 11px;
          border-radius: 9999px;
          cursor: pointer;
          transition: all 0.15s ease;
        }

        .ea-chip-btn:hover {
          border-color: #059669;
          color: #059669;
          background-color: #f0fdf4;
        }

        .ea-chip-btn.is-active {
          background-color: #06241b;
          border-color: #06241b;
          color: #ffffff;
          box-shadow: 0 2px 6px rgba(6, 36, 27, 0.15);
        }

        .ea-chip-icon {
          color: #34d399;
        }

        /* NDA Box */
        .ea-nda-wrapper {
          background-color: #faf9f6;
          border: 1.5px solid #e2ddd4;
          border-radius: 16px;
          padding: 20px;
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .ea-nda-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 10px;
        }

        .ea-nda-badge {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .ea-nda-icon-gold {
          color: #c29853;
        }

        .ea-nda-heading {
          font-size: 0.94rem;
          font-weight: 800;
          color: #06241b;
          margin: 0;
        }

        .ea-expand-btn {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 0.78rem;
          font-weight: 700;
          color: #059669;
          cursor: pointer;
          padding: 4px 8px;
          border-radius: 6px;
          transition: background-color 0.2s;
        }

        .ea-expand-btn:hover {
          background-color: #ecfdf5;
        }

        .ea-nda-synopsis {
          font-size: 0.85rem;
          color: #4b6358;
          line-height: 1.55;
          margin: 0;
        }

        .ea-nda-drawer {
          background: #ffffff;
          border: 1px solid #e8e3d8;
          border-radius: 10px;
          padding: 14px;
          font-size: 0.82rem;
          color: #334155;
          line-height: 1.6;
          max-height: 170px;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .ea-nda-drawer p {
          margin: 0;
        }

        .ea-nda-radios {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        @media (max-width: 540px) {
          .ea-nda-radios {
            grid-template-columns: 1fr;
          }
        }

        .ea-nda-radio-label {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          background: #ffffff;
          border: 1.5px solid #e2ddd4;
          border-radius: 12px;
          padding: 12px 14px;
          cursor: pointer;
          transition: all 0.2s;
        }

        .ea-nda-radio-label:hover {
          border-color: #cbd5e1;
        }

        .ea-nda-radio-label.is-agreed {
          border-color: #059669;
          background-color: #f0fdf4;
        }

        .ea-nda-radio-label.is-declined {
          border-color: #dc2626;
          background-color: #fef2f2;
        }

        .ea-nda-label-content {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .ea-nda-label-content strong {
          font-size: 0.88rem;
          color: #06241b;
        }

        .ea-nda-label-content span {
          font-size: 0.75rem;
          color: #64748b;
        }

        .ea-nda-warning {
          font-size: 0.8rem;
          background-color: #fef2f2;
          color: #991b1b;
          padding: 10px 12px;
          border-radius: 8px;
          border: 1px solid #fecaca;
          line-height: 1.5;
        }

        /* Consent Card */
        .ea-consent-box {
          background-color: #ffffff;
          border: 1.5px solid #e2ddd4;
          border-radius: 14px;
          padding: 14px 16px;
        }

        .ea-consent-label {
          display: flex;
          align-items: flex-start;
          gap: 12px;
          cursor: pointer;
        }

        .ea-hidden-checkbox,
        .ea-hidden-radio {
          position: absolute;
          opacity: 0;
          pointer-events: none;
        }

        .ea-checkbox-facade {
          width: 19px;
          height: 19px;
          border-radius: 5px;
          border: 2px solid #059669;
          background-color: #059669;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          margin-top: 2px;
          transition: all 0.2s;
        }

        .ea-hidden-checkbox:not(:checked) + .ea-checkbox-facade {
          background-color: #ffffff;
          border-color: #cbd5e1;
        }

        .ea-consent-statement {
          font-size: 0.86rem;
          color: #2c4238;
          line-height: 1.5;
        }

        /* Submit Button */
        .ea-submit-container {
          margin-top: 6px;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .ea-submit-cta {
          width: 100%;
          background: linear-gradient(135deg, #06241b 0%, #0a382b 100%);
          color: #ffffff;
          border-radius: 14px;
          padding: 18px 24px;
          font-size: 1.05rem;
          font-weight: 800;
          letter-spacing: 0.01em;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border: none;
          cursor: pointer;
          transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);
          box-shadow: 0 10px 25px rgba(6, 36, 27, 0.22);
        }

        .ea-submit-cta:hover:not(:disabled) {
          background: linear-gradient(135deg, #083427 0%, #0c4636 100%);
          transform: translateY(-2px);
          box-shadow: 0 14px 32px rgba(6, 36, 27, 0.28);
        }

        .ea-submit-cta:disabled {
          opacity: 0.75;
          cursor: not-allowed;
        }

        .ea-cta-arrow {
          transition: transform 0.2s ease;
        }

        .ea-submit-cta:hover .ea-cta-arrow {
          transform: translateX(4px);
        }

        .ea-btn-spinner-wrap {
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }

        .ea-spinner-icon {
          width: 18px;
          height: 18px;
          border: 2.5px solid rgba(255, 255, 255, 0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .ea-trust-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 18px;
          flex-wrap: wrap;
        }

        .ea-trust-point {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 0.75rem;
          font-weight: 600;
          color: #64748b;
        }

        /* Success View */
        .ea-success-box {
          text-align: center;
          padding: 50px 36px;
        }

        .ea-success-icon-wrap {
          margin-bottom: 18px;
        }

        .ea-success-badge {
          display: inline-block;
          font-size: 0.72rem;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #059669;
          background: #ecfdf5;
          border: 1px solid #a7f3d0;
          padding: 4px 12px;
          border-radius: 9999px;
          margin-bottom: 12px;
        }

        .ea-success-title {
          font-family: var(--font-serif);
          font-size: 2rem;
          font-weight: 800;
          color: #06241b;
          margin-bottom: 12px;
        }

        .ea-success-desc {
          font-size: 0.98rem;
          color: #4b6358;
          max-width: 520px;
          margin: 0 auto 26px;
          line-height: 1.6;
        }

        .ea-summary-card {
          background-color: #faf9f6;
          border: 1px solid #ede7dc;
          border-radius: 16px;
          padding: 18px 22px;
          max-width: 460px;
          margin: 0 auto 26px;
          display: flex;
          flex-direction: column;
          gap: 12px;
          text-align: left;
        }

        .ea-summary-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          font-size: 0.86rem;
          padding-bottom: 8px;
          border-bottom: 1px solid #f0ede6;
        }

        .ea-summary-row:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .ea-sum-label {
          color: #64748b;
        }

        .ea-sum-val {
          color: #06241b;
        }

        .ea-badge-nda {
          font-size: 0.76rem;
          font-weight: 700;
          color: #059669;
          background: #ecfdf5;
          padding: 2px 8px;
          border-radius: 6px;
        }

        .ea-success-foot {
          font-size: 0.86rem;
          color: #556c60;
          line-height: 1.6;
          max-width: 500px;
          margin: 0 auto 28px;
        }

        .ea-success-btn-group {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .ea-btn-primary {
          background-color: #06241b;
          color: #ffffff;
          padding: 14px 28px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.92rem;
          transition: background-color 0.2s, transform 0.2s;
        }

        .ea-btn-primary:hover {
          background-color: #0a382b;
          transform: translateY(-2px);
        }

        .ea-btn-outline {
          background-color: #f1f5f9;
          color: #334155;
          padding: 14px 24px;
          border-radius: 12px;
          font-weight: 700;
          font-size: 0.92rem;
          transition: background-color 0.2s;
        }

        .ea-btn-outline:hover {
          background-color: #e2e8f0;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
