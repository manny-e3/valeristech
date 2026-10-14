import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import {
  ShieldCheck,
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  AlertCircle,
  KeyRound,
  CheckCircle,
  Sparkles,
  ArrowLeft
} from 'lucide-react';

export default function AdminLoginPage() {
  const { login, isAuthenticated } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);

  // If already logged in, redirect to dashboard or attempted URL
  const destination = location.state?.from?.pathname || '/admin/dashboard';

  React.useEffect(() => {
    if (isAuthenticated) {
      navigate(destination, { replace: true });
    }
  }, [isAuthenticated, navigate, destination]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username.trim() || !password) {
      setErrorMessage('Please enter both username and password.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const result = await login(username, password);

    if (result.success) {
      navigate(destination, { replace: true });
    } else {
      setErrorMessage(result.message || 'Invalid username or password.');
      setIsLoading(false);
    }
  };

  const handleFillDemo = () => {
    setUsername('admin');
    setPassword('Admin@valeris2026!');
    setErrorMessage(null);
  };

  return (
    <div className="admin-login-wrapper">
      {/* Background Ambience */}
      <div className="admin-login-glow-1"></div>
      <div className="admin-login-glow-2"></div>

      {/* Return to public site link */}
      <Link to="/safi" className="admin-login-back">
        <ArrowLeft size={16} />
        <span>Return to SAFI Public Site</span>
      </Link>

      <div className="admin-login-card">
        {/* Card Header with Valeris Emblem */}
        <div className="admin-login-header">
          <div className="admin-login-emblem">
            <ShieldCheck size={32} className="emblem-icon" />
          </div>
          <div className="admin-login-branding">
            <span className="brand-primary">VALERIS</span>
            <span className="brand-dot">•</span>
            <span className="brand-product">SAFI</span>
          </div>
          <h1 className="admin-login-title">Executive Admin Portal</h1>
          <p className="admin-login-subtitle">
            Sign in to manage SAFI early access pipeline, analytics, and platform governance.
          </p>
        </div>

        {/* Error Notification */}
        {errorMessage && (
          <div className="admin-login-alert">
            <AlertCircle size={18} className="alert-icon" />
            <span className="alert-text">{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleSubmit} className="admin-login-form">
          <div className="form-group">
            <label htmlFor="admin-username" className="form-label">
              Admin Username or Email
            </label>
            <div className="input-wrapper">
              <User size={18} className="input-icon" />
              <input
                id="admin-username"
                type="text"
                autoComplete="username"
                required
                placeholder="admin or admin@valeris.tech"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="form-input"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="form-group">
            <div className="form-label-row">
              <label htmlFor="admin-password" className="form-label">
                Security Password
              </label>
            </div>
            <div className="input-wrapper">
              <Lock size={18} className="input-icon" />
              <input
                id="admin-password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                placeholder="Enter admin password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="form-input"
                disabled={isLoading}
              />
              <button
                type="button"
                className="password-toggle-btn"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>

          {/* Quick Demo Fill Helper */}
          {/* <div className="demo-credentials-helper">
            <div className="helper-info">
              <KeyRound size={14} className="helper-icon" />
              <span>Default Credentials: <code>admin</code></span>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className="fill-credentials-btn"
            >
              Fill Credentials
            </button>
          </div> */}

          <button
            type="submit"
            disabled={isLoading}
            className="admin-submit-btn"
          >
            {isLoading ? (
              <span className="btn-loading-state">
                <span className="spinner-border"></span>
                Authenticating...
              </span>
            ) : (
              <span className="btn-normal-state">
                <span>Access Management Portal</span>
                <ArrowRight size={18} />
              </span>
            )}
          </button>
        </form>

        {/* Security Assurance Footer */}
        {/* <div className="admin-login-footer">
          <div className="security-item">
            <CheckCircle size={13} className="sec-check" />
            <span>256-bit Encrypted</span>
          </div>
          <div className="security-item">
            <CheckCircle size={13} className="sec-check" />
            <span>Bcrypt Hashed</span>
          </div>
          <div className="security-item">
            <CheckCircle size={13} className="sec-check" />
            <span>Audit Monitored</span>
          </div>
        </div> */}
      </div>

      <div className="admin-copyright">
        &copy; {new Date().getFullYear()} Valeris Technologies Limited. All Rights Reserved. Confidential & Proprietary.
      </div>

      <style>{`
        .admin-login-wrapper {
          min-height: 100vh;
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justifyContent: center;
          background: #03140e;
          background-image: 
            radial-gradient(ellipse at 50% 0%, #0d4232 0%, #06241b 45%, #03140e 100%),
            linear-gradient(rgba(255, 255, 255, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255, 255, 255, 0.02) 1px, transparent 1px);
          background-size: 100% 100%, 40px 40px, 40px 40px;
          position: relative;
          padding: 32px 16px;
          box-sizing: border-box;
          font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
          overflow: hidden;
        }

        .admin-login-glow-1 {
          position: absolute;
          top: -100px;
          left: 50%;
          transform: translateX(-50%);
          width: 600px;
          height: 350px;
          background: radial-gradient(circle, rgba(16, 185, 129, 0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .admin-login-glow-2 {
          position: absolute;
          bottom: -150px;
          right: 15%;
          width: 450px;
          height: 350px;
          background: radial-gradient(circle, rgba(194, 152, 83, 0.12) 0%, transparent 70%);
          pointer-events: none;
        }

        .admin-login-back {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.6);
          font-size: 13px;
          font-weight: 500;
          text-decoration: none;
          margin-bottom: 24px;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 30px;
          transition: all 0.2s ease;
          z-index: 10;
        }

        .admin-login-back:hover {
          color: #ffffff;
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(194, 152, 83, 0.4);
          transform: translateX(-2px);
        }

        .admin-login-card {
          width: 100%;
          max-width: 460px;
          background: rgba(6, 36, 27, 0.75);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(194, 152, 83, 0.25);
          border-radius: 20px;
          padding: 40px 36px;
          box-shadow: 
            0 24px 60px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.05),
            inset 0 1px 0 rgba(255, 255, 255, 0.1);
          z-index: 10;
          box-sizing: border-box;
        }

        .admin-login-header {
          text-align: center;
          margin-bottom: 28px;
        }

        .admin-login-emblem {
          width: 64px;
          height: 64px;
          border-radius: 18px;
          background: linear-gradient(135deg, rgba(194, 152, 83, 0.2) 0%, rgba(16, 185, 129, 0.1) 100%);
          border: 1px solid rgba(194, 152, 83, 0.4);
          display: flex;
          align-items: center;
          justifyContent: center;
          margin: 0 auto 16px auto;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
        }

        .emblem-icon {
          color: #c29853;
        }

        .admin-login-branding {
          display: flex;
          align-items: center;
          justifyContent: center;
          gap: 6px;
          margin-bottom: 8px;
        }

        .brand-primary {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 0.15em;
          color: #ffffff;
        }

        .brand-dot {
          color: #c29853;
        }

        .brand-product {
          font-size: 13px;
          font-weight: 800;
          color: #10b981;
          letter-spacing: 0.1em;
        }

        .admin-login-title {
          font-size: 24px;
          font-weight: 700;
          color: #ffffff;
          margin-bottom: 8px;
          letter-spacing: -0.02em;
        }

        .admin-login-subtitle {
          font-size: 13px;
          color: rgba(255, 255, 255, 0.65);
          line-height: 1.5;
        }

        .admin-login-alert {
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.35);
          border-radius: 10px;
          padding: 12px 14px;
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 22px;
          color: #fca5a5;
          font-size: 13px;
        }

        .admin-login-alert .alert-icon {
          flex-shrink: 0;
          color: #ef4444;
        }

        .admin-login-form {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .form-label {
          font-size: 12.5px;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.85);
          letter-spacing: 0.02em;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 14px;
          color: rgba(255, 255, 255, 0.4);
          pointer-events: none;
        }

        .form-input {
          width: 100%;
          background: rgba(3, 20, 14, 0.6);
          border: 1px solid rgba(255, 255, 255, 0.12);
          border-radius: 10px;
          padding: 13px 42px 13px 44px;
          color: #ffffff;
          font-size: 14px;
          font-family: inherit;
          transition: all 0.2s ease;
          box-sizing: border-box;
        }

        .form-input:focus {
          outline: none;
          border-color: #10b981;
          background: rgba(3, 20, 14, 0.9);
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.2);
        }

        .form-input::placeholder {
          color: rgba(255, 255, 255, 0.25);
        }

        .password-toggle-btn {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          color: rgba(255, 255, 255, 0.45);
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justifyContent: center;
          transition: color 0.2s;
        }

        .password-toggle-btn:hover {
          color: #ffffff;
        }

        .demo-credentials-helper {
          display: flex;
          align-items: center;
          justifyContent: space-between;
          background: rgba(194, 152, 83, 0.08);
          border: 1px dashed rgba(194, 152, 83, 0.3);
          border-radius: 8px;
          padding: 9px 12px;
        }

        .helper-info {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 12px;
          color: #d1b47c;
        }

        .helper-info code {
          background: rgba(0, 0, 0, 0.3);
          padding: 2px 6px;
          border-radius: 4px;
          color: #ffffff;
          font-family: monospace;
          font-size: 11px;
        }

        .fill-credentials-btn {
          font-size: 11.5px;
          font-weight: 700;
          color: #06241b;
          background: #c29853;
          border: none;
          padding: 4px 10px;
          border-radius: 6px;
          cursor: pointer;
          transition: background 0.2s;
        }

        .fill-credentials-btn:hover {
          background: #e2b96f;
        }

        .admin-submit-btn {
          width: 100%;
          background: linear-gradient(135deg, #10b981 0%, #059669 100%);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 10px;
          padding: 14px 20px;
          color: #ffffff;
          font-size: 14.5px;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.25s ease;
          box-shadow: 0 10px 20px rgba(16, 185, 129, 0.25);
          margin-top: 6px;
        }

        .admin-submit-btn:hover:not(:disabled) {
          background: linear-gradient(135deg, #059669 0%, #047857 100%);
          box-shadow: 0 12px 25px rgba(16, 185, 129, 0.35);
          transform: translateY(-1px);
        }

        .admin-submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn-normal-state, .btn-loading-state {
          display: flex;
          align-items: center;
          justifyContent: center;
          gap: 10px;
        }

        .spinner-border {
          width: 16px;
          height: 16px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        .admin-login-footer {
          margin-top: 28px;
          padding-top: 20px;
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          display: flex;
          align-items: center;
          justifyContent: space-around;
        }

        .security-item {
          display: flex;
          align-items: center;
          gap: 5px;
          font-size: 11px;
          color: rgba(255, 255, 255, 0.5);
        }

        .sec-check {
          color: #10b981;
        }

        .admin-copyright {
          margin-top: 24px;
          font-size: 11.5px;
          color: rgba(255, 255, 255, 0.35);
          text-align: center;
          max-width: 440px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        @media (max-width: 480px) {
          .admin-login-card {
            padding: 28px 20px;
          }
          .admin-login-footer {
            flex-direction: column;
            gap: 8px;
            align-items: flex-start;
          }
        }
      `}</style>
    </div>
  );
}
