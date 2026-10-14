import React, { useState } from 'react';
import { useAdminAuth } from '../context/AdminAuthContext';
import {
  ShieldCheck,
  Lock,
  KeyRound,
  CheckCircle2,
  AlertCircle,
  Database,
  Server,
  User,
  Mail,
  Shield,
  Eye,
  EyeOff,
  LogOut,
  Clock,
  HardDrive
} from 'lucide-react';

export default function AdminSettingsPage() {
  const { admin, changePassword, logout } = useAdminAuth();

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedback, setFeedback] = useState(null); // { type: 'success' | 'error', message }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    setFeedback(null);

    if (!currentPassword) {
      setFeedback({ type: 'error', message: 'Please enter your current administrative password.' });
      return;
    }

    if (!newPassword || newPassword.length < 8) {
      setFeedback({ type: 'error', message: 'New password must contain at least 8 characters.' });
      return;
    }

    if (newPassword !== confirmPassword) {
      setFeedback({ type: 'error', message: 'The new password and confirmation password do not match.' });
      return;
    }

    setIsSubmitting(true);

    const res = await changePassword(currentPassword, newPassword);

    if (res.success) {
      setFeedback({
        type: 'success',
        message: 'Administrative password updated successfully. Please note it down for future logins.',
      });
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
    } else {
      setFeedback({
        type: 'error',
        message: res.message || 'Failed to update password. Please check your current password.',
      });
    }

    setIsSubmitting(false);
  };

  return (
    <div className="settings-page-wrapper">
      <div className="settings-header">
        <h1 className="settings-title">System Settings & Security</h1>
        <p className="settings-subtitle">
          Manage administrator credentials, view database health telemetry, and review security policies.
        </p>
      </div>

      <div className="settings-grid">
        {/* Left Column: Admin Profile & Change Password */}
        <div className="settings-col">
          {/* Admin Profile Card */}
          <div className="settings-card">
            <div className="card-header">
              <User size={18} className="header-icon gold" />
              <div className="header-text">
                <h2 className="card-title">Administrator Profile</h2>
                <span className="card-sub">Active session credentials</span>
              </div>
            </div>

            <div className="profile-details-list">
              <div className="detail-row">
                <span className="detail-label">Display Name</span>
                <span className="detail-val highlight">{admin?.name || 'Valeris Administrator'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Username</span>
                <span className="detail-val"><code>{admin?.username || 'admin'}</code></span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Official Email</span>
                <span className="detail-val">{admin?.email || 'admin@valeris.tech'}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Access Level</span>
                <span className="role-pill">
                  <ShieldCheck size={12} />
                  {admin?.role ? admin.role.toUpperCase() : 'SUPER ADMIN'}
                </span>
              </div>
            </div>
          </div>

          {/* Change Password Form */}
          <div className="settings-card">
            <div className="card-header">
              <Lock size={18} className="header-icon green" />
              <div className="header-text">
                <h2 className="card-title">Update Security Password</h2>
                <span className="card-sub">Change your admin portal login key</span>
              </div>
            </div>

            {feedback && (
              <div className={`feedback-alert ${feedback.type}`}>
                {feedback.type === 'success' ? (
                  <CheckCircle2 size={18} className="alert-ico success" />
                ) : (
                  <AlertCircle size={18} className="alert-ico error" />
                )}
                <span>{feedback.message}</span>
              </div>
            )}

            <form onSubmit={handlePasswordSubmit} className="password-form">
              <div className="settings-form-group">
                <label className="form-lbl">Current Password</label>
                <div className="input-box">
                  <KeyRound size={16} className="input-ico" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Enter current password"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    className="settings-input"
                  />
                </div>
              </div>

              <div className="settings-form-group">
                <label className="form-lbl">New Password (min 8 chars)</label>
                <div className="input-box">
                  <Lock size={16} className="input-ico" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Create a strong password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="settings-input"
                  />
                  <button
                    type="button"
                    className="eye-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="settings-form-group">
                <label className="form-lbl">Confirm New Password</label>
                <div className="input-box">
                  <Lock size={16} className="input-ico" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="Re-enter new password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="settings-input"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="update-pwd-btn"
              >
                {isSubmitting ? 'Updating Password...' : 'Save New Password'}
              </button>
            </form>
          </div>
        </div>

        {/* Right Column: Database Telemetry & Security Policies */}
        <div className="settings-col">
          {/* Database Diagnostics */}
          <div className="settings-card">
            <div className="card-header">
              <Database size={18} className="header-icon blue" />
              <div className="header-text">
                <h2 className="card-title">Database Telemetry</h2>
                <span className="card-sub">Infrastructure & schema specifications</span>
              </div>
            </div>

            <div className="telemetry-list">
              <div className="telemetry-item">
                <div className="telemetry-info">
                  <span className="telemetry-key">Primary Database</span>
                  <span className="telemetry-desc">Local MySQL / Hostinger Cloud</span>
                </div>
                <span className="telemetry-badge green">safi_early</span>
              </div>

              <div className="telemetry-item">
                <div className="telemetry-info">
                  <span className="telemetry-key">Production Cloud DB</span>
                  <span className="telemetry-desc">Hostinger Auto-failover configured</span>
                </div>
                <span className="telemetry-badge">u913128959_early</span>
              </div>

              <div className="telemetry-item">
                <div className="telemetry-info">
                  <span className="telemetry-key">Leads Storage Table</span>
                  <span className="telemetry-desc">Waitlist submissions & bank attribution</span>
                </div>
                <span className="telemetry-badge">early_access</span>
              </div>

              <div className="telemetry-item">
                <div className="telemetry-info">
                  <span className="telemetry-key">Admin Users Table</span>
                  <span className="telemetry-desc">Bcrypt hashed role credentials</span>
                </div>
                <span className="telemetry-badge">admin_users</span>
              </div>

              <div className="telemetry-item">
                <div className="telemetry-info">
                  <span className="telemetry-key">Security Protocol</span>
                  <span className="telemetry-desc">PDO Parameterized Queries + CSRF Defense</span>
                </div>
                <span className="telemetry-badge green">ACTIVE</span>
              </div>
            </div>
          </div>

          {/* Session Governance */}
          <div className="settings-card">
            <div className="card-header">
              <Shield size={18} className="header-icon gold" />
              <div className="header-text">
                <h2 className="card-title">Access Governance</h2>
                <span className="card-sub">Session termination and audit controls</span>
              </div>
            </div>

            <p className="governance-notice">
              Active sessions are cryptographically verified with each API call. If you suspect any unauthorized access, click below to invalidate stored authentication tokens immediately.
            </p>

            <button onClick={logout} className="logout-all-btn">
              <LogOut size={16} />
              <span>Terminate Active Session</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        .settings-page-wrapper {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .settings-header {
          margin-bottom: 6px;
        }

        .settings-title {
          font-size: 24px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.02em;
        }

        .settings-subtitle {
          font-size: 13.5px;
          color: #64748b;
          margin-top: 4px;
        }

        .settings-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }

        .settings-col {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .settings-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 24px 28px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
        }

        .card-header {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
          padding-bottom: 14px;
          border-bottom: 1px solid #f1f5f9;
        }

        .header-icon {
          padding: 8px;
          border-radius: 10px;
          flex-shrink: 0;
        }

        .header-icon.gold {
          background: #fef8ee;
          color: #c29853;
        }

        .header-icon.green {
          background: #ecfdf5;
          color: #059669;
        }

        .header-icon.blue {
          background: #eff6ff;
          color: #2563eb;
        }

        .header-text {
          display: flex;
          flex-direction: column;
        }

        .card-title {
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
        }

        .card-sub {
          font-size: 12px;
          color: #64748b;
        }

        /* Profile details */
        .profile-details-list {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        .detail-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 13.5px;
        }

        .detail-label {
          color: #64748b;
        }

        .detail-val {
          font-weight: 600;
          color: #1e293b;
        }

        .detail-val.highlight {
          color: #06241b;
        }

        .detail-val code {
          background: #f1f5f9;
          padding: 2px 8px;
          border-radius: 4px;
          font-family: monospace;
          color: #0f172a;
        }

        .role-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #ecfdf5;
          color: #059669;
          border: 1px solid #a7f3d0;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
        }

        /* Password Form */
        .password-form {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .settings-form-group {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .form-lbl {
          font-size: 12.5px;
          font-weight: 600;
          color: #334155;
        }

        .input-box {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-ico {
          position: absolute;
          left: 12px;
          color: #94a3b8;
          pointer-events: none;
        }

        .settings-input {
          width: 100%;
          padding: 10px 40px 10px 38px;
          border: 1px solid #cbd5e1;
          border-radius: 8px;
          font-size: 13.5px;
          font-family: inherit;
          color: #0f172a;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }

        .settings-input:focus {
          outline: none;
          border-color: #10b981;
          box-shadow: 0 0 0 3px rgba(16, 185, 129, 0.15);
        }

        .eye-toggle {
          position: absolute;
          right: 12px;
          background: none;
          border: none;
          color: #94a3b8;
          cursor: pointer;
        }

        .eye-toggle:hover {
          color: #334155;
        }

        .update-pwd-btn {
          margin-top: 6px;
          background: #06241b;
          color: #ffffff;
          padding: 11px 18px;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .update-pwd-btn:hover:not(:disabled) {
          background: #0a382b;
        }

        .update-pwd-btn:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }

        .feedback-alert {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 14px;
          border-radius: 8px;
          font-size: 13px;
          margin-bottom: 14px;
        }

        .feedback-alert.success {
          background: #ecfdf5;
          color: #065f46;
          border: 1px solid #a7f3d0;
        }

        .feedback-alert.error {
          background: #fef2f2;
          color: #991b1b;
          border: 1px solid #fecaca;
        }

        /* Telemetry */
        .telemetry-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .telemetry-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          background: #f8fafc;
          border: 1px solid #f1f5f9;
          border-radius: 8px;
        }

        .telemetry-info {
          display: flex;
          flex-direction: column;
        }

        .telemetry-key {
          font-size: 13px;
          font-weight: 600;
          color: #1e293b;
        }

        .telemetry-desc {
          font-size: 11.5px;
          color: #64748b;
        }

        .telemetry-badge {
          background: #e2e8f0;
          color: #334155;
          padding: 3px 8px;
          border-radius: 6px;
          font-size: 11.5px;
          font-family: monospace;
          font-weight: 600;
        }

        .telemetry-badge.green {
          background: #ecfdf5;
          color: #059669;
          border: 1px solid #a7f3d0;
        }

        .governance-notice {
          font-size: 13px;
          color: #64748b;
          line-height: 1.6;
          margin-bottom: 18px;
        }

        .logout-all-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: #fef2f2;
          border: 1px solid #fecaca;
          color: #b91c1c;
          padding: 10px 18px;
          border-radius: 8px;
          font-size: 13px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s;
        }

        .logout-all-btn:hover {
          background: #fee2e2;
          border-color: #fca5a5;
        }

        @media (max-width: 900px) {
          .settings-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
