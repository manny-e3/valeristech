import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useAdminAuth } from '../context/AdminAuthContext';
import {
  Users,
  Building2,
  TrendingUp,
  Download,
  RefreshCw,
  ExternalLink,
  ArrowRight,
  Mail,
  Copy,
  Check,
  CheckCircle2,
  Clock,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  UserCheck,
  Layers,
  BarChart3,
  Calendar,
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';
import * as XLSX from 'xlsx';

export default function AdminDashboardPage() {
  const { admin } = useAdminAuth();

  const [records, setRecords] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    unique_banks: 0,
    top_bank: 'None',
    top_source: 'None',
    banks_breakdown: {},
    sources_breakdown: {},
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [copiedEmails, setCopiedEmails] = useState(false);

  const getEndpoints = useCallback(() => [
    '/api/admin-early-access.php',
    'http://localhost/safi/valeristechltd/api/admin-early-access.php',
    '/api/early-access.php?action=list',
  ], []);

  const loadData = useCallback(async (silent = false) => {
    if (!silent) setIsLoading(true);
    setIsRefreshing(true);
    setErrorMessage(null);

    const endpoints = getEndpoints();
    let data = null;
    let err = null;

    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          headers: { 'Accept': 'application/json' }
        });
        if (res.ok) {
          const json = await res.json();
          if (json && json.success) {
            data = json;
            break;
          }
        }
      } catch (e) {
        err = e;
      }
    }

    if (data && data.success) {
      setRecords(data.records || []);
      if (data.stats) {
        setStats(data.stats);
      }
    } else {
      setErrorMessage(err?.message || 'Failed to load telemetry from server.');
    }

    setIsLoading(false);
    setIsRefreshing(false);
  }, [getEndpoints]);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Copy all emails to clipboard
  const handleCopyAllEmails = () => {
    const emails = records
      .map(r => r.email)
      .filter(Boolean)
      .filter((v, i, a) => a.indexOf(v) === i);

    if (emails.length === 0) return;

    navigator.clipboard.writeText(emails.join(', '));
    setCopiedEmails(true);
    setTimeout(() => setCopiedEmails(false), 2400);
  };

  // Genuine Microsoft Excel (.xlsx) Export using SheetJS
  const handleExportExcel = () => {
    if (!records || !records.length) {
      alert('No subscriber records found to export.');
      return;
    }

    try {
      const formatted = records.map((r, i) => ({
        'ID': r.id || (i + 1),
        'Full Name': r.full_name || '',
        'Email Address': r.email || '',
        'Phone Number': r.phone ? String(r.phone) : 'N/A',
        'Commercial Bank': r.bank || r.bank_name || 'Not Specified',
        'Referral Source': r.source || r.hear_about || 'Direct',
        'Registration Date': r.created_at ? new Date(r.created_at).toLocaleString('en-GB') : 'Recent'
      }));

      const worksheet = XLSX.utils.json_to_sheet(formatted);
      worksheet['!cols'] = [
        { wch: 8 },  // ID
        { wch: 24 }, // Full Name
        { wch: 32 }, // Email Address
        { wch: 20 }, // Phone Number
        { wch: 22 }, // Commercial Bank
        { wch: 20 }, // Referral Source
        { wch: 22 }  // Registration Date
      ];

      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Subscribers');

      const dateStr = new Date().toISOString().slice(0, 10);
      XLSX.writeFile(workbook, `safi_subscribers_all_${dateStr}.xlsx`);
    } catch (err) {
      console.error('Excel export error:', err);
      alert('Failed to generate Excel file: ' + err.message);
    }
  };

  // Direct CSV Export in browser (UTF-8 with BOM for Excel compatibility)
  const handleExportCSV = () => {
    if (!records || !records.length) {
      alert('No subscriber records found to export.');
      return;
    }

    try {
      const formatted = records.map((r, i) => ({
        'ID': r.id || (i + 1),
        'Full Name': r.full_name || '',
        'Email Address': r.email || '',
        'Phone Number': r.phone ? String(r.phone) : 'N/A',
        'Commercial Bank': r.bank || r.bank_name || 'Not Specified',
        'Referral Source': r.source || r.hear_about || 'Direct',
        'Registration Date': r.created_at ? new Date(r.created_at).toLocaleString('en-GB') : 'Recent'
      }));

      const worksheet = XLSX.utils.json_to_sheet(formatted);
      const csvContent = XLSX.utils.sheet_to_csv(worksheet);

      const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const dateStr = new Date().toISOString().slice(0, 10);
      link.href = url;
      link.download = `safi_subscribers_all_${dateStr}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } catch (err) {
      console.error('CSV export error:', err);
      alert('Failed to generate CSV file: ' + err.message);
    }
  };

  // Recent 6 leads
  const recentLeads = records.slice(0, 6);

  // Calculate bank stats sorted by count
  const sortedBanks = Object.entries(stats.banks_breakdown || {})
    .sort(([, a], [, b]) => b - a)
    .slice(0, 6);

  // Calculate source stats sorted by count
  const sortedSources = Object.entries(stats.sources_breakdown || {})
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5);

  const totalSignups = stats.total || 0;

  return (
    <div className="dashboard-content-area">
      {/* Executive Welcome Banner */}


      {/* Error state alert */}
      {errorMessage && (
        <div className="dashboard-alert-banner">
          <AlertCircle size={20} className="alert-icon" />
          <div className="alert-content">
            <strong>Database Connection Alert:</strong> {errorMessage}
          </div>
          <button onClick={() => loadData()} className="alert-retry-btn">
            Retry Connection
          </button>
        </div>
      )}

      {/* KPI Stat Cards Grid */}
      <div className="kpi-grid">
        {/* Card 1: Total Leads */}
        <div className="kpi-card">
          <div className="kpi-card-header">
            <span className="kpi-label">TOTAL WAITLIST SIGNUPS</span>
            <div className="kpi-icon-pill green">
              <Users size={18} />
            </div>
          </div>
          <div className="kpi-number-wrap">
            <div className="kpi-number">{stats.total.toLocaleString()}</div>
            {stats.today > 0 && (
              <span className="kpi-badge-pill green">
                +{stats.today} today
              </span>
            )}
          </div>
          <p className="kpi-footer-note">
            Target benchmark: 1,000 qualified subscribers
          </p>
        </div>

        {/* Card 2: Commercial Banks */}
        <div className="kpi-card">
          <div className="kpi-card-header">
            <span className="kpi-label">COMMERCIAL BANKS</span>
            <div className="kpi-icon-pill gold">
              <Building2 size={18} />
            </div>
          </div>
          <div className="kpi-number-wrap">
            <div className="kpi-number">{stats.unique_banks}</div>
            <span className="kpi-badge-pill gold">
              {stats.top_bank || 'Active'}
            </span>
          </div>
          <p className="kpi-footer-note">
            Leading institution: <strong>{stats.top_bank || 'Pending'}</strong>
          </p>
        </div>

        {/* Card 3: Export & CRM Actions */}
        <div className="kpi-card quick-action-card">
          <div className="kpi-card-header">
            <span className="kpi-label">EXPORT & CRM ACTIONS</span>
            <div className="kpi-icon-pill green">
              <FileSpreadsheet size={18} />
            </div>
          </div>
          <div className="quick-action-body">
            <button
              type="button"
              onClick={handleExportExcel}
              className="export-excel-card-btn"
              title="Download all subscriber records in Microsoft Excel (.xlsx)"
            >
              <FileSpreadsheet size={14} />
              <span>Export to Excel (.xlsx)</span>
            </button>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              <button
                type="button"
                onClick={handleExportCSV}
                className="registry-link-btn"
                title="Download all subscriber records as CSV"
              >
                <Download size={13} />
                <span>Export CSV</span>
              </button>
              <button
                type="button"
                onClick={handleCopyAllEmails}
                className={`registry-link-btn ${copiedEmails ? 'copied' : ''}`}
                title="Copy all emails to clipboard"
              >
                {copiedEmails ? <Check size={13} color="#059669" /> : <Mail size={13} />}
                <span>{copiedEmails ? 'Copied!' : 'Copy Emails'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Analytics Visualizers Row */}
      <div className="analytics-split-row">
        {/* Left: Bank Distribution Progress */}
        <div className="analytics-card">
          <div className="analytics-card-header">
            <div className="card-title-group">
              <h2 className="analytics-title">Commercial Bank Distribution</h2>
              <span className="analytics-sub">Share of subscribers by banking partner</span>
            </div>
            <Link to="/admin/early-access" className="card-header-link">
              Filter by Bank <ChevronRight size={14} />
            </Link>
          </div>

          <div className="bank-progress-list">
            {sortedBanks.length === 0 ? (
              <div className="empty-analytics-placeholder">
                <Building2 size={32} />
                <span>No bank data captured yet.</span>
              </div>
            ) : (
              sortedBanks.map(([bank, count]) => {
                const percentage = totalSignups > 0 ? Math.round((count / totalSignups) * 100) : 0;
                return (
                  <div key={bank} className="bank-bar-row">
                    <div className="bank-info-label">
                      <span className="bank-name">{bank}</span>
                      <span className="bank-count-pill">{count} leads ({percentage}%)</span>
                    </div>
                    <div className="bank-progress-track">
                      <div
                        className="bank-progress-fill"
                        style={{ width: `${Math.max(percentage, 5)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Acquisition Channels Breakdown */}
        <div className="analytics-card">
          <div className="analytics-card-header">
            <div className="card-title-group">
              <h2 className="analytics-title">Acquisition Channels</h2>
              <span className="analytics-sub">Where subscribers discover SAFI</span>
            </div>
            <span className="channel-count-badge">{sortedSources.length} channels</span>
          </div>

          <div className="channels-grid">
            {sortedSources.length === 0 ? (
              <div className="empty-analytics-placeholder">
                <TrendingUp size={32} />
                <span>No attribution channels recorded yet.</span>
              </div>
            ) : (
              sortedSources.map(([source, count]) => {
                const percentage = totalSignups > 0 ? Math.round((count / totalSignups) * 100) : 0;
                return (
                  <div key={source} className="channel-box">
                    <div className="channel-box-top">
                      <span className="channel-name">{source}</span>
                      <span className="channel-pct">{percentage}%</span>
                    </div>
                    <div className="channel-count">{count} signups</div>
                    <div className="channel-mini-bar">
                      <div
                        className="channel-mini-fill"
                        style={{ width: `${Math.max(percentage, 4)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </div>

      {/* Recent Registrations Table Section */}
      <div className="recent-leads-section">
        <div className="recent-leads-header">
          <div className="header-titles">
            <h2 className="section-title">Latest Early Access Registrations</h2>
            <p className="section-subtitle">Real-time incoming waitlist subscribers</p>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={handleExportExcel}
              className="export-excel-card-btn"
              style={{ padding: '8px 14px', fontSize: '12.5px' }}
              title="Export all subscriber records to Microsoft Excel (.xlsx)"
            >
              <FileSpreadsheet size={14} />
              <span>Export to Excel</span>
            </button>
            <button
              type="button"
              onClick={handleExportCSV}
              className="registry-link-btn"
              style={{ padding: '8px 12px', fontSize: '12.5px' }}
              title="Export all subscriber records to CSV"
            >
              <Download size={13} />
              <span>CSV</span>
            </button>
            <Link to="/admin/early-access" className="view-all-leads-btn">
              <span>Open Full CRM Table</span>
              <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        <div className="table-container-card">
          {recentLeads.length === 0 ? (
            <div className="table-empty-notice">
              <Users size={36} />
              <p>No early access registrations registered yet.</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table className="leads-table">
                <thead>
                  <tr>
                    <th>SUBSCRIBER</th>
                    <th>COMMERCIAL BANK</th>
                    <th>ACQUISITION SOURCE</th>
                    <th>REGISTRATION DATE</th>
                    <th style={{ textAlign: 'right' }}>QUICK ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLeads.map((record) => (
                    <tr key={record.id}>
                      <td>
                        <div className="subscriber-cell">
                          <div className="subscriber-avatar">
                            {record.full_name ? record.full_name.charAt(0).toUpperCase() : 'U'}
                          </div>
                          <div className="subscriber-meta">
                            <span className="subscriber-name">{record.full_name}</span>
                            <span className="subscriber-email">{record.email}</span>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="bank-tag-pill">
                          <Building2 size={12} />
                          {record.bank || record.bank_name || 'Standard'}
                        </span>
                      </td>
                      <td>
                        <span className="source-tag-pill">
                          {record.source || record.hear_about || 'Direct'}
                        </span>
                      </td>
                      <td>
                        <div className="date-time-cell">
                          <Calendar size={13} className="date-icon" />
                          <span>{record.created_at ? new Date(record.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent'}</span>
                        </div>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <Link
                          to={`/admin/early-access?search=${encodeURIComponent(record.email)}`}
                          className="table-action-link"
                          title="View lead in full table"
                        >
                          Manage
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      <style>{`
        .dashboard-content-area {
          display: flex;
          flex-direction: column;
          gap: 28px;
        }

        /* Hero Banner */
        .dashboard-hero-banner {
          background: linear-gradient(135deg, #06241b 0%, #0a3a2c 60%, #041a13 100%);
          border: 1px solid rgba(194, 152, 83, 0.25);
          border-radius: 16px;
          padding: 32px 36px;
          display: flex;
          align-items: center;
          justifyContent: space-between;
          color: #ffffff;
          box-shadow: 0 10px 30px rgba(6, 36, 27, 0.12);
          position: relative;
          overflow: hidden;
        }

        .dashboard-hero-banner::after {
          content: '';
          position: absolute;
          right: -40px;
          bottom: -40px;
          width: 200px;
          height: 200px;
          background: radial-gradient(circle, rgba(194, 152, 83, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          pointer-events: none;
        }

        .hero-tag-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(194, 152, 83, 0.15);
          border: 1px solid rgba(194, 152, 83, 0.3);
          color: #d1b47c;
          padding: 4px 12px;
          border-radius: 20px;
          font-size: 11.5px;
          font-weight: 600;
          margin-bottom: 12px;
        }

        .hero-sparkle {
          color: #c29853;
        }

        .hero-greeting {
          font-size: 26px;
          font-weight: 800;
          letter-spacing: -0.02em;
          margin-bottom: 8px;
          color: #ffffff;
        }

        .admin-highlight {
          color: #c29853;
        }

        .hero-desc {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          max-width: 540px;
          line-height: 1.5;
        }

        .hero-action-side {
          display: flex;
          align-items: center;
          gap: 12px;
          flex-shrink: 0;
          z-index: 2;
        }

        .hero-action-btn {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 18px;
          border-radius: 8px;
          font-size: 13.5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
        }

        .refresh-btn {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.18);
          color: #ffffff;
        }

        .refresh-btn:hover:not(:disabled) {
          background: rgba(255, 255, 255, 0.15);
        }

        .export-excel-btn {
          background: #107c41;
          border: 1px solid #148d4b;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(16, 124, 65, 0.25);
        }

        .export-excel-btn:hover {
          background: #148d4b;
          transform: translateY(-1px);
        }

        .export-excel-card-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: #107c41;
          color: #ffffff;
          padding: 9px 12px;
          border-radius: 8px;
          font-size: 12.5px;
          font-weight: 700;
          cursor: pointer;
          text-decoration: none;
          transition: background 0.2s, transform 0.15s;
          box-shadow: 0 2px 8px rgba(16, 124, 65, 0.2);
        }

        .export-excel-card-btn:hover {
          background: #148d4b;
          transform: translateY(-1px);
        }

        .export-btn {
          background: #c29853;
          border: 1px solid #d4a961;
          color: #06241b;
        }

        .export-btn:hover {
          background: #d4a961;
          transform: translateY(-1px);
        }

        .spin-icon {
          animation: spin 1s linear infinite;
        }

        /* Alert Banner */
        .dashboard-alert-banner {
          background: #fef2f2;
          border: 1px solid #fecaca;
          border-radius: 10px;
          padding: 14px 20px;
          display: flex;
          align-items: center;
          gap: 14px;
          color: #991b1b;
          font-size: 13.5px;
        }

        .alert-retry-btn {
          margin-left: auto;
          background: #ef4444;
          color: #ffffff;
          padding: 6px 14px;
          border-radius: 6px;
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
        }

        /* KPI Grid */
        .kpi-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 20px;
        }

        .kpi-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 22px 24px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
          transition: transform 0.2s, box-shadow 0.2s;
        }

        .kpi-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.06);
        }

        .kpi-card-header {
          display: flex;
          align-items: center;
          justifyContent: space-between;
          margin-bottom: 14px;
        }

        .kpi-label {
          font-size: 11px;
          font-weight: 700;
          color: #64748b;
          letter-spacing: 0.08em;
        }

        .kpi-icon-pill {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justifyContent: center;
        }

        .kpi-icon-pill.green {
          background: #ecfdf5;
          color: #059669;
        }

        .kpi-icon-pill.gold {
          background: #fef8ee;
          color: #c29853;
        }

        .kpi-icon-pill.blue {
          background: #eff6ff;
          color: #2563eb;
        }

        .kpi-icon-pill.purple {
          background: #faf5ff;
          color: #9333ea;
        }

        .kpi-number-wrap {
          display: flex;
          align-items: baseline;
          gap: 10px;
          margin-bottom: 8px;
        }

        .kpi-number {
          font-size: 30px;
          font-weight: 800;
          color: #0f172a;
          letter-spacing: -0.02em;
        }

        .text-truncate {
          font-size: 22px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .kpi-badge-pill {
          font-size: 11.5px;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 6px;
        }

        .kpi-badge-pill.green {
          background: #ecfdf5;
          color: #059669;
        }

        .kpi-badge-pill.gold {
          background: #fef8ee;
          color: #c29853;
        }

        .kpi-footer-note {
          font-size: 12px;
          color: #64748b;
          margin-top: auto;
        }

        /* Quick Action Card */
        .quick-action-card .quick-action-body {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-top: 6px;
        }

        .copy-emails-btn {
          display: flex;
          align-items: center;
          justifyContent: center;
          gap: 8px;
          background: #06241b;
          color: #ffffff;
          padding: 9px 12px;
          border-radius: 8px;
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
          transition: background 0.2s;
        }

        .copy-emails-btn:hover {
          background: #0a382b;
        }

        .copy-emails-btn.copied {
          background: #059669;
        }

        .registry-link-btn {
          display: flex;
          align-items: center;
          justifyContent: center;
          gap: 6px;
          background: #f1f5f9;
          color: #334155;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 12px;
          font-weight: 600;
          text-decoration: none;
          transition: background 0.2s;
        }

        .registry-link-btn:hover {
          background: #e2e8f0;
          color: #0f172a;
        }

        /* Analytics Split Row */
        .analytics-split-row {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 20px;
        }

        .analytics-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 24px 28px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
        }

        .analytics-card-header {
          display: flex;
          align-items: center;
          justifyContent: space-between;
          margin-bottom: 22px;
        }

        .analytics-title {
          font-size: 16px;
          font-weight: 700;
          color: #0f172a;
        }

        .analytics-sub {
          font-size: 12.5px;
          color: #64748b;
        }

        .card-header-link {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 12.5px;
          font-weight: 600;
          color: #059669;
          text-decoration: none;
        }

        .card-header-link:hover {
          color: #047857;
        }

        .channel-count-badge {
          background: #f1f5f9;
          color: #475569;
          padding: 4px 10px;
          border-radius: 20px;
          font-size: 11.5px;
          font-weight: 600;
        }

        .bank-progress-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .bank-bar-row {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .bank-info-label {
          display: flex;
          justify-content: space-between;
          font-size: 13px;
        }

        .bank-name {
          font-weight: 600;
          color: #1e293b;
        }

        .bank-count-pill {
          color: #64748b;
          font-weight: 500;
        }

        .bank-progress-track {
          height: 9px;
          background: #f1f5f9;
          border-radius: 6px;
          overflow: hidden;
        }

        .bank-progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #10b981 0%, #059669 100%);
          border-radius: 6px;
          transition: width 0.6s cubic-bezier(0.16, 1, 0.3, 1);
        }

        /* Channels Grid */
        .channels-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 12px;
        }

        .channel-box {
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          border-radius: 10px;
          padding: 12px 16px;
        }

        .channel-box-top {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 4px;
        }

        .channel-name {
          font-size: 13px;
          font-weight: 600;
          color: #1e293b;
        }

        .channel-pct {
          font-size: 12px;
          font-weight: 700;
          color: #c29853;
        }

        .channel-count {
          font-size: 12px;
          color: #64748b;
          margin-bottom: 6px;
        }

        .channel-mini-bar {
          height: 6px;
          background: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
        }

        .channel-mini-fill {
          height: 100%;
          background: #c29853;
          border-radius: 4px;
        }

        /* Recent Registrations Table */
        .recent-leads-section {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 14px;
          padding: 24px 28px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.03);
        }

        .recent-leads-header {
          display: flex;
          align-items: center;
          justifyContent: space-between;
          margin-bottom: 20px;
        }

        .section-title {
          font-size: 17px;
          font-weight: 700;
          color: #0f172a;
        }

        .section-subtitle {
          font-size: 13px;
          color: #64748b;
        }

        .view-all-leads-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          color: #0f172a;
          padding: 8px 14px;
          border-radius: 8px;
          font-size: 12.5px;
          font-weight: 600;
          text-decoration: none;
          transition: all 0.2s;
        }

        .view-all-leads-btn:hover {
          background: #f1f5f9;
          border-color: #cbd5e1;
        }

        .table-container-card {
          overflow-x: auto;
        }

        .leads-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 13.5px;
          text-align: left;
        }

        .leads-table th {
          background: #f8fafc;
          color: #475569;
          font-weight: 700;
          font-size: 11px;
          letter-spacing: 0.06em;
          padding: 12px 16px;
          border-bottom: 1px solid #e2e8f0;
        }

        .leads-table td {
          padding: 14px 16px;
          border-bottom: 1px solid #f1f5f9;
          vertical-align: middle;
        }

        .subscriber-cell {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .subscriber-avatar {
          width: 34px;
          height: 34px;
          border-radius: 8px;
          background: #ecfdf5;
          color: #059669;
          font-weight: 700;
          display: flex;
          align-items: center;
          justifyContent: center;
          font-size: 13px;
        }

        .subscriber-meta {
          display: flex;
          flex-direction: column;
        }

        .subscriber-name {
          font-weight: 600;
          color: #0f172a;
        }

        .subscriber-email {
          font-size: 12px;
          color: #64748b;
        }

        .bank-tag-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 4px 10px;
          border-radius: 6px;
          font-size: 12px;
          font-weight: 600;
          color: #334155;
        }

        .source-tag-pill {
          font-size: 12.5px;
          color: #475569;
        }

        .date-time-cell {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #64748b;
          font-size: 12.5px;
        }

        .date-icon {
          color: #94a3b8;
        }

        .status-chip {
          display: inline-block;
          padding: 3px 10px;
          border-radius: 20px;
          font-size: 11px;
          font-weight: 700;
          text-transform: capitalize;
        }

        .status-chip.pending {
          background: #fef8ee;
          color: #c29853;
          border: 1px solid #fde7c7;
        }

        .status-chip.contacted {
          background: #eff6ff;
          color: #2563eb;
          border: 1px solid #dbeafe;
        }

        .status-chip.onboarded {
          background: #ecfdf5;
          color: #059669;
          border: 1px solid #a7f3d0;
        }

        .table-action-link {
          font-size: 12.5px;
          font-weight: 600;
          color: #059669;
          text-decoration: none;
          padding: 4px 10px;
          border-radius: 6px;
          background: #ecfdf5;
          transition: background 0.2s;
        }

        .table-action-link:hover {
          background: #d1fae5;
        }

        .empty-analytics-placeholder, .table-empty-notice {
          display: flex;
          flex-direction: column;
          align-items: center;
          justifyContent: center;
          padding: 36px 20px;
          color: #94a3b8;
          font-size: 13.5px;
          gap: 10px;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .kpi-grid {
            grid-template-columns: repeat(2, 1fr);
          }
          .analytics-split-row {
            grid-template-columns: 1fr;
          }
        }

        @media (max-width: 768px) {
          .dashboard-hero-banner {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
            padding: 24px 20px;
          }
          .kpi-grid {
            grid-template-columns: 1fr;
          }
          .hero-action-side {
            width: 100%;
          }
          .hero-action-btn {
            flex: 1;
            justify-content: center;
          }
        }
      `}</style>
    </div>
  );
}
