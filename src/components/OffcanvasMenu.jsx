import React from 'react';
import { Link } from 'react-router-dom';
import { X, Mail, ShieldCheck, MapPin } from 'lucide-react';
import Logo from './Logo';

export default function OffcanvasMenu({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="offcanvas-backdrop" onClick={onClose}>
      <div className="offcanvas-drawer" onClick={(e) => e.stopPropagation()}>
        <div className="offcanvas-header">
          <Link to="/" onClick={onClose}>
            <Logo light={false} />
          </Link>
          <button type="button" className="offcanvas-close-btn" onClick={onClose} aria-label="Close menu">
            <X size={24} />
          </button>
        </div>

        <div className="offcanvas-body">
          <p className="offcanvas-about-text" style={{ fontSize: '0.92rem', color: '#475569', lineHeight: 1.6, marginBottom: '20px' }}>
            <strong>Valeris Technologies Ltd</strong> · We build technology for better financial and business systems. From financial infrastructure and intelligent products to enterprise systems and technology advisory.
          </p>

          <nav className="offcanvas-nav">
            <ul className="offcanvas-nav-list">
              <li><Link to="/" onClick={onClose}>Home</Link></li>
              <li><Link to="/about" onClick={onClose}>About</Link></li>
              <li><Link to="/services" onClick={onClose}>Capabilities</Link></li>
              <li><Link to="/safi" onClick={onClose}>SAFI</Link></li>
              <li><Link to="/contact" onClick={onClose}>Contact</Link></li>
            </ul>
          </nav>

          <div className="offcanvas-contact-info" style={{ marginTop: '24px' }}>
            <h4 className="offcanvas-section-title">Institutional Record</h4>
            <div className="offcanvas-contact-item">
              <ShieldCheck size={16} className="contact-icon" />
              <span>RC Number: 9571130</span>
            </div>
            <div className="offcanvas-contact-item">
              <Mail size={16} className="contact-icon" />
              <a href="mailto:Thevalerisgroup@gmail.com">Thevalerisgroup@gmail.com</a>
            </div>
            <div className="offcanvas-contact-item">
              <MapPin size={16} className="contact-icon" />
              <span>Lagos, Nigeria</span>
            </div>
          </div>

          <div className="offcanvas-btn-wrap" style={{ marginTop: '24px' }}>
            <Link to="/contact" onClick={onClose} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Talk to us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
