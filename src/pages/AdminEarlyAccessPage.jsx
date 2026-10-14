import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  Users,
  Building2,
  TrendingUp,
  Calendar,
  Search,
  Download,
  RefreshCw,
  Trash2,
  CheckCircle2,
  Clock,
  ExternalLink,
  Copy,
  Check,
  Mail,
  Phone,
  Filter,
  Shield,
  ArrowUpDown,
  AlertCircle,
  FileSpreadsheet
} from 'lucide-react';
import Logo from '../components/Logo';
import * as XLSX from 'xlsx';

export default function AdminEarlyAccessPage({ embedded = false }) {
  const [searchParams] = useSearchParams();
  const querySearch = searchParams.get('search') || '';

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
  const [successMessage, setSuccessMessage] = useState(null);

  // Filters
  const [searchTerm, setSearchTerm] = useState(querySearch);
  const [selectedBank, setSelectedBank] = useState('all');
  const [selectedSource, setSelectedSource] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');

  // Sync if URL query param changes
  useEffect(() => {
    if (querySearch) {
      setSearchTerm(querySearch);
    }
  }, [querySearch]);

  // Interactive selection for campaign copy
  const [selectedIds, setSelectedIds] = useState(new Set());
  const [copiedId, setCopiedId] = useState(null);
  const [copiedEmails, setCopiedEmails] = useState(false);

  // Endpoint candidates (relative for proxy + direct Apache absolute)
  const getEndpoints = useCallback(() => [
    '/api/admin-early-access.php',
    'http://localhost/safi/valeristechltd/api/admin-early-access.php',
    '/api/early-access.php?action=list',
    'http://localhost/safi/valeristechltd/api/early-access.php?action=list'
  ], []);

  const fetchRecords = useCallback(async (isSilent = false) => {
    if (!isSilent) setIsLoading(true);
    setIsRefreshing(true);
    setErrorMessage(null);

    const endpoints = getEndpoints();
    let data = null;
    let lastErr = null;

    for (const url of endpoints) {
      try {
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            'Accept': 'application/json',
          },
        });
        if (res.ok) {
          const json = await res.json();
          if (json && json.success) {
            data = json;
            break;
          }
        }
      } catch (err) {
        lastErr = err;
      }
    }

    if (data && data.success) {
      setRecords(data.records || []);
      if (data.stats) {
        setStats(data.stats);
      }
    } else {
      setErrorMessage(
        lastErr?.message || 'Unable to connect to early access database. Please verify Apache/MySQL is running.'
      );
    }

    setIsLoading(false);
    setIsRefreshing(false);
  }, [getEndpoints]);

  useEffect(() => {
    document.title = 'SAFI Early Access Registry | Valeris Admin';
    fetchRecords();
  }, [fetchRecords]);

  // Flash temporary success notification
  const showNotice = (msg) => {
    setSuccessMessage(msg);
    setTimeout(() => setSuccessMessage(null), 3500);
  };

  // Status toggle handler (pending <-> contacted)
  const handleToggleStatus = async (record) => {
    const nextStatus = record.status === 'contacted' ? 'pending' : 'contacted';
    const endpoints = [
      '/api/admin-early-access.php',
      'http://localhost/safi/valeristechltd/api/admin-early-access.php'
    ];

    try {
      let updated = false;
      for (const url of endpoints) {
        try {
          const res = await fetch(url, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ id: record.id, status: nextStatus }),
          });
          const json = await res.json();
          if (json?.success) {
            updated = true;
            break;
          }
        } catch { }
      }

      if (updated) {
        setRecords((prev) =>
          prev.map((r) => (r.id === record.id ? { ...r, status: nextStatus } : r))
        );
        showNotice(`Record #${record.id} updated to ${nextStatus}.`);
      } else {
        alert('Failed to update status on server.');
      }
    } catch {
      alert('Network error updating status.');
    }
  };

  // Delete lead handler
  const handleDeleteRecord = async (id, name) => {
    if (!window.confirm(`Are you sure you want to delete lead #${id} (${name})? This action cannot be undone.`)) {
      return;
    }

    const endpoints = [
      `/api/admin-early-access.php?id=${id}`,
      `http://localhost/safi/valeristechltd/api/admin-early-access.php?id=${id}`
    ];

    try {
      let deleted = false;
      for (const url of endpoints) {
        try {
          const res = await fetch(url, { method: 'DELETE' });
          const json = await res.json();
          if (json?.success) {
            deleted = true;
            break;
          }
        } catch { }
      }

      if (deleted) {
        setRecords((prev) => prev.filter((r) => r.id !== id));
        setSelectedIds((prev) => {
          const next = new Set(prev);
          next.delete(id);
          return next;
        });
        showNotice(`Lead #${id} deleted.`);
      } else {
        alert('Could not delete lead from database.');
      }
    } catch {
      alert('Network error deleting lead.');
    }
  };

  // Copy email helper
  const handleCopy = (text, id) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Copy all visible emails for email broadcast
  const handleCopyAllEmails = () => {
    const list = filteredRecords.map((r) => r.email).filter(Boolean);
    if (!list.length) return;
    navigator.clipboard.writeText(list.join(', '));
    setCopiedEmails(true);
    showNotice(`Copied ${list.length} email addresses to clipboard.`);
    setTimeout(() => setCopiedEmails(false), 2500);
  };

  // Genuine Microsoft Excel (.xlsx) Export using SheetJS
  const handleExportExcel = (filteredOnly = false) => {
    const list = filteredOnly ? filteredRecords : records;
    if (!list || !list.length) {
      alert('No subscriber records found to export.');
      return;
    }

    try {
      const formatted = list.map((r, i) => ({
        'ID': r.id || (i + 1),
        'Full Name': r.full_name || '',
        'Email Address': r.email || '',
        'Phone Number': r.phone ? String(r.phone) : 'N/A',
        'Commercial Bank': r.bank || 'Not Specified',
        'Referral Source': r.source || 'Direct',
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
      const filename = `safi_subscribers_${filteredOnly ? 'filtered_' : 'all_'}${dateStr}.xlsx`;
      XLSX.writeFile(workbook, filename);
      showNotice(`Exported ${list.length} subscriber records to Excel (.xlsx).`);
    } catch (err) {
      console.error('Excel export error:', err);
      alert('Failed to generate Excel file: ' + err.message);
    }
  };

  // Direct CSV Export in browser (UTF-8 with BOM for Excel compatibility)
  const handleExportCSV = (filteredOnly = false) => {
    const list = filteredOnly ? filteredRecords : records;
    if (!list || !list.length) {
      alert('No subscriber records found to export.');
      return;
    }

    try {
      const formatted = list.map((r, i) => ({
        'ID': r.id || (i + 1),
        'Full Name': r.full_name || '',
        'Email Address': r.email || '',
        'Phone Number': r.phone ? String(r.phone) : 'N/A',
        'Commercial Bank': r.bank || 'Not Specified',
        'Referral Source': r.source || 'Direct',
        'Registration Date': r.created_at ? new Date(r.created_at).toLocaleString('en-GB') : 'Recent'
      }));

      const worksheet = XLSX.utils.json_to_sheet(formatted);
      const csvContent = XLSX.utils.sheet_to_csv(worksheet);

      const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      const dateStr = new Date().toISOString().slice(0, 10);
      link.href = url;
      link.download = `safi_subscribers_${filteredOnly ? 'filtered_' : 'all_'}${dateStr}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
      showNotice(`Exported ${list.length} subscriber records to CSV.`);
    } catch (err) {
      console.error('CSV export error:', err);
      alert('Failed to generate CSV file: ' + err.message);
    }
  };

  // Filtered dataset
  const filteredRecords = useMemo(() => {
    return records.filter((r) => {
      // Search filter
      const q = searchTerm.toLowerCase().trim();
      const matchSearch =
        !q ||
        (r.full_name && r.full_name.toLowerCase().includes(q)) ||
        (r.email && r.email.toLowerCase().includes(q)) ||
        (r.phone && r.phone.toLowerCase().includes(q)) ||
        (r.bank && r.bank.toLowerCase().includes(q));

      // Bank filter
      const matchBank =
        selectedBank === 'all' ||
        (selectedBank === 'Unspecified' ? !r.bank : r.bank === selectedBank);

      // Source filter
      const matchSource =
        selectedSource === 'all' ||
        (selectedSource === 'Direct' ? !r.source : r.source === selectedSource);

      // Status filter
      const matchStatus =
        selectedStatus === 'all' || (r.status || 'pending') === selectedStatus;

      return matchSearch && matchBank && matchSource && matchStatus;
    });
  }, [records, searchTerm, selectedBank, selectedSource, selectedStatus]);

  // Unique bank options for filter dropdown
  const bankOptions = useMemo(() => {
    const set = new Set();
    records.forEach((r) => {
      if (r.bank) set.add(r.bank);
    });
    return Array.from(set).sort();
  }, [records]);

  // Unique source options for filter dropdown
  const sourceOptions = useMemo(() => {
    const set = new Set();
    records.forEach((r) => {
      if (r.source) set.add(r.source);
    });
    return Array.from(set).sort();
  }, [records]);

  // Format date helper
  const formatDate = (dateStr) => {
    if (!dateStr) return 'N/A';
    try {
      const d = new Date(dateStr.replace(' ', 'T'));
      return d.toLocaleDateString('en-GB', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div style={{ backgroundColor: embedded ? 'transparent' : '#faf8f4', minHeight: embedded ? 'auto' : '100vh', paddingBottom: embedded ? '30px' : '90px' }}>
      {/* ---------------------------------------------------------------------
          ADMIN TOP BAR (Omitted when embedded in AdminLayout)
          --------------------------------------------------------------------- */}
      {!embedded && (
        <header
          style={{
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #ede7dc',
            padding: '16px 0',
            position: 'sticky',
            top: 0,
            zIndex: 100,
            boxShadow: '0 2px 10px rgba(6,36,27,0.03)'
          }}
        >
          <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '18px' }}>
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Logo light={false} />
              </Link>
              <div style={{ width: '1px', height: '24px', backgroundColor: '#e2ddd4' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 800, letterSpacing: '0.12em', color: '#c29853', textTransform: 'uppercase' }}>
                  ADMIN CONSOLE
                </span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', backgroundColor: '#ecfdf5', color: '#047857', fontSize: '0.75rem', fontWeight: 700, padding: '3px 10px', borderRadius: '9999px', border: '1px solid #a7f3d0' }}>
                  <span style={{ width: '6px', height: '6px', borderRadius: '50%', backgroundColor: '#10b981' }} />
                  Live Database
                </span>
              </div>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Link
                to="/safi"
                target="_blank"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  color: '#2b453a',
                  textDecoration: 'none',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  border: '1px solid #e2ddd4',
                  backgroundColor: '#ffffff',
                  transition: 'all 0.2s'
                }}
              >
                <span>View SAFI Page</span>
                <ExternalLink size={14} />
              </Link>

              <button
                type="button"
                onClick={() => fetchRecords(false)}
                disabled={isRefreshing}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.86rem',
                  fontWeight: 600,
                  color: '#06241b',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2ddd4',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
              >
                <RefreshCw size={14} className={isRefreshing ? 'spin-icon' : ''} />
                <span>{isRefreshing ? 'Refreshing...' : 'Refresh'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleExportExcel(false)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '7px',
                  fontSize: '0.86rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  backgroundColor: '#107c41',
                  border: 'none',
                  padding: '9px 16px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  boxShadow: '0 4px 12px rgba(16,124,65,0.2)',
                  transition: 'all 0.2s'
                }}
                title="Download all subscriber records in Microsoft Excel (.xls)"
              >
                <FileSpreadsheet size={15} />
                <span>Export to Excel</span>
              </button>

              <button
                type="button"
                onClick={() => handleExportCSV(false)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  color: '#06241b',
                  backgroundColor: '#ffffff',
                  border: '1px solid #e2ddd4',
                  padding: '8px 14px',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  transition: 'all 0.2s'
                }}
                title="Download all subscriber records in CSV format"
              >
                <Download size={14} />
                <span>CSV</span>
              </button>
            </div>
          </div>
        </header>
      )}

      {/* ---------------------------------------------------------------------
          NOTIFICATIONS
          --------------------------------------------------------------------- */}
      <div className={embedded ? "" : "container"} style={{ marginTop: embedded ? '0' : '20px' }}>
        {successMessage && (
          <div style={{ backgroundColor: '#ecfdf5', border: '1px solid #a7f3d0', color: '#065f46', padding: '12px 18px', borderRadius: '12px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '0.9rem', animation: 'fadeIn 0.3s' }}>
            <CheckCircle2 size={18} color="#10b981" />
            <span>{successMessage}</span>
          </div>
        )}

        {errorMessage && (
          <div style={{ backgroundColor: '#fef2f2', border: '1px solid #fecaca', color: '#991b1b', padding: '14px 18px', borderRadius: '12px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', fontSize: '0.9rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <AlertCircle size={18} color="#ef4444" />
              <span>{errorMessage}</span>
            </div>
            <button
              type="button"
              onClick={() => fetchRecords(false)}
              style={{ background: '#ffffff', border: '1px solid #fca5a5', padding: '4px 12px', borderRadius: '6px', fontSize: '0.82rem', cursor: 'pointer', color: '#991b1b', fontWeight: 600 }}
            >
              Retry
            </button>
          </div>
        )}

        {/* ---------------------------------------------------------------------
            HEADER HERO
            --------------------------------------------------------------------- */}
        <div style={{ marginTop: '10px', marginBottom: '28px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '18px' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: '#047857', fontSize: '0.8rem', fontWeight: 800, letterSpacing: '0.12em', textTransform: 'uppercase', marginBottom: '8px' }}>
              <Shield size={14} />
              <span>EXECUTIVE TELEMETRY</span>
            </div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: 'clamp(2.1rem, 3.2vw, 2.8rem)', fontWeight: 800, color: '#06241b', margin: '0 0 8px', letterSpacing: '-0.02em' }}>
              SAFI Early Access Registry
            </h1>
            <p style={{ color: '#4b6358', fontSize: '0.96rem', margin: 0, maxWidth: '640px', lineHeight: 1.5 }}>
              Real-time subscriber records for the SAFI behavioral banking platform. Monitor inbound demand, track bank distributions, and export data directly to Microsoft Excel.
            </p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {/* <button
              type="button"
              onClick={() => fetchRecords(false)}
              disabled={isRefreshing}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.84rem',
                fontWeight: 600,
                color: '#334155',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                padding: '9px 14px',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
              title="Refresh records from database"
            >
              <RefreshCw size={14} className={isRefreshing ? 'spin-icon' : ''} />
              <span>Sync</span>
            </button> */}

            <button
              type="button"
              onClick={() => handleExportExcel(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.88rem',
                fontWeight: 700,
                color: '#ffffff',
                backgroundColor: '#107c41',
                border: 'none',
                padding: '10px 18px',
                borderRadius: '8px',
                cursor: 'pointer',
                boxShadow: '0 4px 14px rgba(16, 124, 65, 0.25)',
                transition: 'all 0.2s',
              }}
              title="Export all subscriber records to Microsoft Excel (.xls)"
            >
              <FileSpreadsheet size={16} />
              <span>Export to Excel</span>
            </button>

            <button
              type="button"
              onClick={() => handleExportCSV(false)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                fontSize: '0.84rem',
                fontWeight: 600,
                color: '#06241b',
                backgroundColor: '#ffffff',
                border: '1px solid #cbd5e1',
                padding: '10px 14px',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
              title="Export all subscriber records to CSV"
            >
              <Download size={14} />
              <span>CSV</span>
            </button>
          </div>
        </div>

        {/* ---------------------------------------------------------------------
            METRIC KPI CARDS
            --------------------------------------------------------------------- */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px', marginBottom: '32px' }}>
          {/* Card 1: Total Leads */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', padding: '24px', border: '1px solid #ede7dc', boxShadow: '0 8px 24px rgba(6,36,27,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#597367', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Total Registrations
              </span>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#ecfdf5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#059669' }}>
                <Users size={20} />
              </div>
            </div>
            <div style={{ fontSize: '2.4rem', fontWeight: 800, color: '#06241b', lineHeight: 1, fontFamily: 'var(--font-main)' }}>
              {isLoading ? '...' : stats.total}
            </div>
            <div style={{ fontSize: '0.82rem', color: '#059669', marginTop: '10px', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 600 }}>
              <span>{stats.today} registered today</span>
            </div>
          </div>

          {/* Card 2: Top Financial Institution */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', padding: '24px', border: '1px solid #ede7dc', boxShadow: '0 8px 24px rgba(6,36,27,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#597367', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Top Institution
              </span>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#fef3c7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#d97706' }}>
                <Building2 size={20} />
              </div>
            </div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#06241b', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {isLoading ? '...' : (stats.top_bank || 'None')}
            </div>
            <div style={{ fontSize: '0.82rem', color: '#78716c', marginTop: '10px', fontWeight: 600 }}>
              {stats.unique_banks} distinct banking institutions represented
            </div>
          </div>

          {/* Card 3: Top Acquisition Source */}
          <div style={{ backgroundColor: '#ffffff', borderRadius: '18px', padding: '24px', border: '1px solid #ede7dc', boxShadow: '0 8px 24px rgba(6,36,27,0.03)' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
              <span style={{ fontSize: '0.84rem', fontWeight: 700, color: '#597367', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Top Referral Channel
              </span>
              <div style={{ width: '40px', height: '40px', borderRadius: '10px', backgroundColor: '#ede9fe', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7c3aed' }}>
                <TrendingUp size={20} />
              </div>
            </div>
            <div style={{ fontSize: '1.45rem', fontWeight: 800, color: '#06241b', lineHeight: 1.2, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {isLoading ? '...' : (stats.top_source || 'Direct')}
            </div>
            <div style={{ fontSize: '0.82rem', color: '#78716c', marginTop: '10px', fontWeight: 600 }}>
              Primary conversion funnel driver
            </div>
          </div>



        </div>

        {/* ---------------------------------------------------------------------
            FILTER & SEARCH TOOLBAR
            --------------------------------------------------------------------- */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '18px 22px',
            border: '1px solid #ede7dc',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '14px'
          }}
        >
          {/* Search Box */}
          <div style={{ position: 'relative', flex: '1 1 280px', maxWidth: '380px' }}>
            <Search
              size={17}
              style={{
                position: 'absolute',
                left: '14px',
                top: '50%',
                transform: 'translateY(-50%)',
                color: '#64748b',
                pointerEvents: 'none'
              }}
            />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name, email, phone, bank..."
              style={{
                width: '100%',
                padding: '11px 14px 11px 40px',
                borderRadius: '10px',
                border: '1.5px solid #e2ddd4',
                fontSize: '0.9rem',
                outline: 'none',
                color: '#06241b',
                backgroundColor: '#faf8f4',
                transition: 'border-color 0.2s'
              }}
            />
          </div>

          {/* Filter Dropdowns */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
            {/* Bank Filter */}
            <select
              value={selectedBank}
              onChange={(e) => setSelectedBank(e.target.value)}
              style={{
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1.5px solid #e2ddd4',
                fontSize: '0.86rem',
                backgroundColor: '#ffffff',
                color: '#06241b',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="all">All Banks ({records.length})</option>
              {bankOptions.map((b) => (
                <option key={b} value={b}>{b}</option>
              ))}
            </select>

            {/* Source Filter */}
            <select
              value={selectedSource}
              onChange={(e) => setSelectedSource(e.target.value)}
              style={{
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1.5px solid #e2ddd4',
                fontSize: '0.86rem',
                backgroundColor: '#ffffff',
                color: '#06241b',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="all">All Referral Sources</option>
              {sourceOptions.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>

            {/* Status Filter */}
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              style={{
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1.5px solid #e2ddd4',
                fontSize: '0.86rem',
                backgroundColor: '#ffffff',
                color: '#06241b',
                fontWeight: 600,
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="all">All Statuses</option>
              <option value="pending">Pending</option>
              <option value="contacted">Contacted</option>
            </select>

            {/* Reset Filters Button */}
            {(searchTerm || selectedBank !== 'all' || selectedSource !== 'all' || selectedStatus !== 'all') && (
              <button
                type="button"
                onClick={() => {
                  setSearchTerm('');
                  setSelectedBank('all');
                  setSelectedSource('all');
                  setSelectedStatus('all');
                }}
                style={{
                  border: 'none',
                  background: '#f1f5f9',
                  color: '#475569',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  fontSize: '0.84rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* ---------------------------------------------------------------------
            LEADS DATA TABLE
            --------------------------------------------------------------------- */}
        <div
          style={{
            backgroundColor: '#ffffff',
            borderRadius: '18px',
            border: '1px solid #ede7dc',
            boxShadow: '0 12px 35px rgba(6,36,27,0.04)',
            overflow: 'hidden'
          }}
        >
          <div style={{ padding: '16px 24px', borderBottom: '1px solid #f1ece1', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px', backgroundColor: '#faf8f4' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontWeight: 800, color: '#06241b', fontSize: '0.98rem' }}>
                Subscriber Records
              </span>
              <span style={{ backgroundColor: '#e2ddd4', color: '#06241b', fontSize: '0.75rem', fontWeight: 800, padding: '2px 8px', borderRadius: '9999px' }}>
                {filteredRecords.length}
              </span>
              {filteredRecords.length !== records.length ? (
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  (filtered from {records.length} total)
                </span>
              ) : (
                <span style={{ fontSize: '0.8rem', color: '#64748b' }}>
                  Showing all {records.length} records
                </span>
              )}
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
              <button
                type="button"
                onClick={() => handleExportExcel(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#107c41',
                  color: '#ffffff',
                  border: 'none',
                  padding: '7px 14px',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  cursor: 'pointer',
                  boxShadow: '0 2px 8px rgba(16,124,65,0.2)',
                  transition: 'all 0.2s',
                }}
                title={`Export ${filteredRecords.length} visible subscriber records directly to Microsoft Excel`}
              >
                <FileSpreadsheet size={14} />
                <span>Export to Excel ({filteredRecords.length})</span>
              </button>

              <button
                type="button"
                onClick={() => handleExportCSV(true)}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  backgroundColor: '#ffffff',
                  color: '#334155',
                  border: '1px solid #cbd5e1',
                  padding: '7px 12px',
                  borderRadius: '8px',
                  fontSize: '0.82rem',
                  fontWeight: 600,
                  cursor: 'pointer'
                }}
                title="Export visible records to CSV"
              >
                <Download size={13} />
                <span>CSV</span>
              </button>
            </div>
          </div>

          <div style={{ overflowX: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '860px' }}>
              <thead>
                <tr style={{ backgroundColor: '#ffffff', borderBottom: '1px solid #ede7dc' }}>
                  <th style={{ padding: '14px 20px', fontSize: '0.78rem', fontWeight: 800, color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase' }}>ID</th>
                  <th style={{ padding: '14px 20px', fontSize: '0.78rem', fontWeight: 800, color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Subscriber</th>
                  <th style={{ padding: '14px 20px', fontSize: '0.78rem', fontWeight: 800, color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Contact</th>
                  <th style={{ padding: '14px 20px', fontSize: '0.78rem', fontWeight: 800, color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Primary Bank</th>
                  <th style={{ padding: '14px 20px', fontSize: '0.78rem', fontWeight: 800, color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Referral Source</th>
                  <th style={{ padding: '14px 20px', fontSize: '0.78rem', fontWeight: 800, color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Registered</th>
                  <th style={{ padding: '14px 20px', fontSize: '0.78rem', fontWeight: 800, color: '#64748b', letterSpacing: '0.08em', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan="7" style={{ padding: '60px 20px', textAlign: 'center', color: '#64748b' }}>
                      <RefreshCw size={24} className="spin-icon" style={{ margin: '0 auto 10px', color: '#047857' }} />
                      <p style={{ margin: 0, fontWeight: 600 }}>Loading early access records...</p>
                    </td>
                  </tr>
                ) : filteredRecords.length === 0 ? (
                  <tr>
                    <td colSpan="7" style={{ padding: '60px 20px', textAlign: 'center' }}>
                      <Users size={36} color="#94a3b8" style={{ margin: '0 auto 12px' }} />
                      <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#06241b', margin: '0 0 6px' }}>
                        No records found
                      </h4>
                      <p style={{ fontSize: '0.88rem', color: '#64748b', margin: 0 }}>
                        {records.length === 0
                          ? 'No one has joined the early access list yet.'
                          : 'Try adjusting your search query or filter settings.'}
                      </p>
                    </td>
                  </tr>
                ) : (
                  filteredRecords.map((item, index) => {
                    const initials = item.full_name
                      ? item.full_name
                        .split(' ')
                        .map((n) => n[0])
                        .slice(0, 2)
                        .join('')
                        .toUpperCase()
                      : '??';

                    return (
                      <tr
                        key={item.id}
                        style={{
                          borderBottom: '1px solid #f3efe6',
                          backgroundColor: index % 2 === 0 ? '#ffffff' : '#faf9f6',
                          transition: 'background-color 0.15s'
                        }}
                      >
                        {/* ID */}
                        <td style={{ padding: '16px 20px', fontSize: '0.84rem', fontWeight: 700, color: '#94a3b8' }}>
                          #{item.id}
                        </td>

                        {/* Subscriber Name */}
                        <td style={{ padding: '16px 20px' }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                            <div
                              style={{
                                width: '38px',
                                height: '38px',
                                borderRadius: '10px',
                                backgroundColor: '#ede7dc',
                                color: '#06241b',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontSize: '0.85rem',
                                fontWeight: 800,
                                flexShrink: 0
                              }}
                            >
                              {initials}
                            </div>
                            <div>
                              <div style={{ fontSize: '0.94rem', fontWeight: 800, color: '#06241b', lineHeight: 1.3 }}>
                                {item.full_name || 'Anonymous Lead'}
                              </div>
                              {item.ip_address && (
                                <span style={{ fontSize: '0.72rem', color: '#94a3b8', fontFamily: 'monospace' }}>
                                  IP: {item.ip_address}
                                </span>
                              )}
                            </div>
                          </div>
                        </td>

                        {/* Contact Info */}
                        <td style={{ padding: '16px 20px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                              <Mail size={13} color="#059669" />
                              <a
                                href={`mailto:${item.email}`}
                                style={{ fontSize: '0.88rem', color: '#047857', textDecoration: 'none', fontWeight: 600 }}
                              >
                                {item.email}
                              </a>
                              <button
                                type="button"
                                onClick={() => handleCopy(item.email, item.id)}
                                title="Copy Email"
                                style={{
                                  border: 'none',
                                  background: 'transparent',
                                  cursor: 'pointer',
                                  padding: '2px',
                                  color: '#94a3b8'
                                }}
                              >
                                {copiedId === item.id ? <Check size={12} color="#059669" /> : <Copy size={12} />}
                              </button>
                            </div>

                            {item.phone && (
                              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                <Phone size={13} color="#64748b" />
                                <a
                                  href={`tel:${item.phone}`}
                                  style={{ fontSize: '0.82rem', color: '#475569', textDecoration: 'none' }}
                                >
                                  {item.phone}
                                </a>
                              </div>
                            )}
                          </div>
                        </td>

                        {/* Primary Bank */}
                        <td style={{ padding: '16px 20px' }}>
                          {item.bank ? (
                            <span
                              style={{
                                display: 'inline-flex',
                                alignItems: 'center',
                                gap: '6px',
                                backgroundColor: '#ecfdf5',
                                border: '1px solid #a7f3d0',
                                color: '#065f46',
                                fontSize: '0.82rem',
                                fontWeight: 700,
                                padding: '4px 10px',
                                borderRadius: '9999px'
                              }}
                            >
                              <Building2 size={12} color="#059669" />
                              <span>{item.bank}</span>
                            </span>
                          ) : (
                            <span style={{ fontSize: '0.82rem', color: '#94a3b8', fontStyle: 'italic' }}>
                              Not Specified
                            </span>
                          )}
                        </td>

                        {/* Referral Source */}
                        <td style={{ padding: '16px 20px' }}>
                          <span
                            style={{
                              display: 'inline-block',
                              backgroundColor: '#f1f5f9',
                              color: '#334155',
                              fontSize: '0.8rem',
                              fontWeight: 600,
                              padding: '3px 9px',
                              borderRadius: '6px'
                            }}
                          >
                            {item.source || 'Direct'}
                          </span>
                        </td>

                        {/* Registered Date */}
                        <td style={{ padding: '16px 20px', fontSize: '0.84rem', color: '#475569', whiteSpace: 'nowrap' }}>
                          {formatDate(item.created_at)}
                        </td>

                        {/* Actions */}
                        <td style={{ padding: '16px 20px', textAlign: 'right' }}>
                          <button
                            type="button"
                            onClick={() => handleDeleteRecord(item.id, item.full_name)}
                            title="Delete Lead"
                            style={{
                              border: 'none',
                              backgroundColor: '#fee2e2',
                              color: '#dc2626',
                              width: '32px',
                              height: '32px',
                              borderRadius: '8px',
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              cursor: 'pointer',
                              transition: 'all 0.2s'
                            }}
                          >
                            <Trash2 size={15} />
                          </button>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <style>{`
        .spin-icon {
          animation: spin 1s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
