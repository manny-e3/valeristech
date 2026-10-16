import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Check, ArrowLeft, Send } from 'lucide-react';

export default function EmailPreviewPage() {
  const currentYear = new Date().getFullYear();

  return (
    <div style={{ backgroundColor: '#ede7dc', minHeight: '100vh', padding: '40px 16px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Top Banner Control Bar */}
      <div style={{
        maxWidth: '620px',
        margin: '0 auto 20px',
        backgroundColor: '#06241b',
        color: '#ffffff',
        padding: '14px 20px',
        borderRadius: '14px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '12px',
        boxShadow: '0 6px 18px rgba(0,0,0,0.1)'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.88rem' }}>
          <Mail size={16} color="#34d399" />
          <span>Subject: <strong style={{ color: '#ffffff' }}>Thank you for your interest in SAFI!</strong></span>
        </div>
        <Link to="/early-access" style={{ color: '#34d399', fontSize: '0.84rem', fontWeight: 700, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
          <ArrowLeft size={14} /> Back to Form
        </Link>
      </div>

      {/* The Rendered Email Card */}
      <div style={{
        maxWidth: '600px',
        margin: '0 auto',
        backgroundColor: '#ffffff',
        borderRadius: '18px',
        overflow: 'hidden',
        border: '1px solid #e0d8cb',
        boxShadow: '0 15px 40px rgba(6, 36, 27, 0.08)',
        textAlign: 'left'
      }}>
        {/* Luxury Header */}
        <div style={{
          background: 'linear-gradient(135deg, #041c14 0%, #06241b 100%)',
          padding: '38px 40px 32px',
          borderBottom: '3px solid #c29853'
        }}>
          <div style={{ fontSize: '11px', fontWeight: 800, letterSpacing: '2px', textTransform: 'uppercase', color: '#c29853', margin: '0 0 8px' }}>
            Valeris Technologies Ltd
          </div>
          <h1 style={{ fontSize: '28px', fontWeight: 800, color: '#ffffff', margin: 0, letterSpacing: '-0.5px' }}>
            SAFI
          </h1>
          <p style={{ fontSize: '13px', color: '#9cb3a5', margin: '4px 0 0', fontWeight: 400 }}>
            Bank-Embedded Financial Behaviour Infrastructure
          </p>
        </div>

        {/* Content Body */}
        <div style={{ padding: '38px 40px 32px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: '#06241b', margin: '0 0 16px', lineHeight: 1.3 }}>
            Hello Samuel,
          </h2>

          <p style={{ fontSize: '16px', color: '#172a22', fontWeight: 600, lineHeight: 1.6, margin: '0 0 14px' }}>
            Thank you for your interest in SAFI!
          </p>

          <p style={{ fontSize: '15px', color: '#2c4238', lineHeight: 1.7, margin: '0 0 22px' }}>
            We appreciate your interest and look forward to connecting with you. Our team will be reaching out with more updates soon.
          </p>

          {/* Details Card */}
          <div style={{
            backgroundColor: '#faf9f6',
            border: '1.5px solid #ede7dc',
            borderRadius: '14px',
            padding: '20px 22px',
            margin: '22px 0 24px'
          }}>
            <div style={{ fontSize: '12px', fontWeight: 800, textTransform: 'uppercase', letterSpacing: '1px', color: '#059669', margin: '0 0 12px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <span>✓ APPLICATION RECEIVED · COHORT 1</span>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '13px' }}>
              <tbody>
                <tr>
                  <td style={{ padding: '7px 0', color: '#64748b', fontWeight: 500, borderBottom: '1px solid #f1ece1' }}>Preferred Bank Integration:</td>
                  <td style={{ padding: '7px 0', color: '#06241b', fontWeight: 700, textAlign: 'right', borderBottom: '1px solid #f1ece1' }}>GTBank (Guaranty Trust)</td>
                </tr>
                <tr>
                  <td style={{ padding: '7px 0', color: '#64748b', fontWeight: 500, borderBottom: '1px solid #f1ece1' }}>Confidentiality (NDA):</td>
                  <td style={{ padding: '7px 0', textAlign: 'right', borderBottom: '1px solid #f1ece1' }}>
                    <span style={{ backgroundColor: '#ecfdf5', color: '#059669', padding: '2px 8px', borderRadius: '6px', fontSize: '12px', fontWeight: 700 }}>Confirmed</span>
                  </td>
                </tr>
                <tr>
                  <td style={{ padding: '7px 0', color: '#64748b', fontWeight: 500 }}>Status:</td>
                  <td style={{ padding: '7px 0', color: '#059669', fontWeight: 700, textAlign: 'right' }}>Priority Waitlist</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p style={{ fontSize: '14px', color: '#4b6358', lineHeight: 1.6, margin: '0 0 22px' }}>
            As pilot sprints roll out across participating financial institutions, you will receive invitation schedules for product demonstrations and preview deployments.
          </p>

          {/* Requested Sign-Off */}
          <div style={{ marginTop: '28px', paddingTop: '20px', borderTop: '1px solid #f0ede6' }}>
            <div style={{ fontSize: '16px', fontWeight: 800, color: '#06241b', margin: '0 0 3px' }}>
              Team SAFI | Valeris Technologies
            </div>
            <div style={{ fontSize: '13px', color: '#597367', margin: 0 }}>
              Financial Technology · Digital Systems · Advisory
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={{
          backgroundColor: '#041c14',
          padding: '28px 40px',
          textAlign: 'center',
          color: '#7a9686',
          fontSize: '12px',
          lineHeight: 1.6
        }}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '16px', marginBottom: '12px', flexWrap: 'wrap' }}>
            <Link to="/safi" style={{ color: '#34d399', textDecoration: 'none', fontWeight: 600 }}>About SAFI</Link>
            <span style={{ color: '#4b6358' }}>·</span>
            <Link to="/early-access" style={{ color: '#34d399', textDecoration: 'none', fontWeight: 600 }}>Early Access Portal</Link>
            <span style={{ color: '#4b6358' }}>·</span>
            <Link to="/contact" style={{ color: '#34d399', textDecoration: 'none', fontWeight: 600 }}>Contact Us</Link>
          </div>
          <p style={{ margin: 0, color: '#688273' }}>
            &copy; {currentYear} Valeris Technologies Ltd (RC: 9571130). All rights reserved.<br />
            Lagos, Nigeria
          </p>
        </div>
      </div>
    </div>
  );
}
