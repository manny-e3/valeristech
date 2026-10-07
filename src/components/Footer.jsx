import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer id="contact-footer" className="footer-main" style={{ backgroundColor: '#031710', borderTop: '1px solid #064e3b', padding: '70px 0 30px' }}>
      <div className="container">
        <div className="footer-top-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '40px', marginBottom: '50px' }}>
          {/* Column 1: Brand & Sub-tag */}
          <div className="footer-col footer-col-brand">
            <div className="footer-logo-wrap" style={{ marginBottom: '16px' }}>
              <Link to="/" aria-label="Valeris Technologies">
                <Logo light={true} />
              </Link>
            </div>
            <p style={{ color: '#34d399', fontSize: '0.84rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '8px' }}>
              Financial Technology · Digital Systems · Advisory
            </p>
            <p className="footer-desc" style={{ color: '#94a3b8', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '16px' }}>
              We build technology for better financial and business systems.
            </p>
            <div className="footer-contacts">
              <div className="footer-contact-link" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#cbd5e1', fontSize: '0.88rem' }}>
                <MapPin size={16} color="#10b981" />
                <span>Lagos, Nigeria</span>
              </div>
            </div>
          </div>

          {/* Column 2: Company */}
          <div className="footer-col">
            <h4 className="footer-col-title" style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 800, marginBottom: '18px' }}>Company</h4>
            <ul className="footer-links-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><Link to="/about" style={{ color: '#94a3b8', transition: 'color 0.2s' }}>About</Link></li>
              <li><Link to="/services" style={{ color: '#94a3b8', transition: 'color 0.2s' }}>Capabilities</Link></li>
              <li><Link to="/safi" style={{ color: '#94a3b8', transition: 'color 0.2s' }}>SAFI</Link></li>
              <li><Link to="/contact" style={{ color: '#94a3b8', transition: 'color 0.2s' }}>Contact</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="footer-col">
            <h4 className="footer-col-title" style={{ color: '#ffffff', fontSize: '1rem', fontWeight: 800, marginBottom: '18px' }}>Legal</h4>
            <ul className="footer-links-list" style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <li><span style={{ color: '#94a3b8' }}>Privacy Policy</span></li>
              <li><span style={{ color: '#94a3b8' }}>Terms of Use</span></li>
              <li style={{ color: '#64748b', fontSize: '0.85rem', marginTop: '6px' }}>
                RC Number: <strong style={{ color: '#cbd5e1' }}>9571130</strong>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="footer-bottom-bar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '24px' }}>
          <p className="copyright-text" style={{ color: '#94a3b8', fontSize: '0.88rem', margin: 0 }}>
            © 2026 Valeris Technologies Ltd. All rights reserved.
          </p>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a
              href="https://www.instagram.com/valeristechnologies"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              style={{ color: '#94a3b8', fontSize: '0.85rem' }}
            >
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
