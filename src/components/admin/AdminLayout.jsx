import React, { useState } from 'react';
import { NavLink, Link, useNavigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import {
  LayoutDashboard,
  Users,
  Settings,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Shield,
  Database,
  ChevronRight,
  Sparkles,
  ArrowUpRight,
  Lock,
  UserCheck
} from 'lucide-react';
import Logo from '../Logo';

export default function AdminLayout({ children, pageTitle = 'Executive Portal' }) {
  const { admin, logout } = useAdminAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login', { replace: true });
  };

  const navItems = [
    {
      to: '/admin/dashboard',
      label: 'Dashboard',
      description: 'Analytics & Overview',
      icon: LayoutDashboard,
      aliases: ['/admin', '/admin/dashboard'],
    },
    {
      to: '/admin/early-access',
      label: 'Early Access Leads',
      description: 'Waitlist Registry & CRM',
      icon: Users,
      aliases: ['/admin/early-access'],
    },
    // {
    //   to: '/admin/settings',
    //   label: 'Settings & Security',
    //   description: 'Credentials & Database',
    //   icon: Settings,
    //   aliases: ['/admin/settings'],
    // },
  ];

  const isCurrentActive = (aliases) => {
    return aliases.some(alias => location.pathname === alias || (alias !== '/admin' && location.pathname.startsWith(alias)));
  };

  return (
    <div className="admin-portal-root">
      {/* Sidebar Overlay for Mobile */}
      {isMobileMenuOpen && (
        <div
          className="admin-sidebar-overlay"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Main Admin Sidebar */}
      <aside className={`admin-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="admin-sidebar-header">
          <Link to="/admin/dashboard" className="admin-brand-link">
            <div className="admin-brand-badge">
              <span className="brand-dot"></span>
              <span className="brand-name">VALERIS</span>
            </div>
            <div className="admin-subbrand">
              <span className="safi-tag">SAFI</span>
              <span className="portal-tag">Admin Console</span>
            </div>
          </Link>
          <button
            className="admin-mobile-close"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <X size={20} />
          </button>
        </div>

        {/* Security Badge in Sidebar */}
        {/* <div className="admin-security-pill">
          <Shield size={14} className="sec-icon" />
          <span>Restricted Portal • SSL 256</span>
        </div> */}

        {/* Navigation Items */}
        <nav className="admin-sidebar-nav">
          <div className="nav-group-title">MAIN NAVIGATION</div>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isCurrentActive(item.aliases);
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`admin-nav-item ${active ? 'active' : ''}`}
              >
                <div className="nav-item-icon-wrap">
                  <Icon size={18} />
                </div>
                <div className="nav-item-info">
                  <span className="nav-item-title">{item.label}</span>
                  <span className="nav-item-desc">{item.description}</span>
                </div>
                {active && <span className="nav-active-pip" />}
              </NavLink>
            );
          })}

          <div className="nav-group-title" style={{ marginTop: '24px' }}>PUBLIC APPLICATION</div>
          <Link
            to="/safi"
            target="_blank"
            rel="noreferrer"
            className="admin-nav-item external-link-item"
          >
            <div className="nav-item-icon-wrap public-wrap">
              <Sparkles size={18} />
            </div>
            <div className="nav-item-info">
              <span className="nav-item-title">SAFI Public Page</span>
              <span className="nav-item-desc">Open live landing site</span>
            </div>
            <ArrowUpRight size={16} className="external-arrow" />
          </Link>
        </nav>

        {/* User Profile Card & Sign Out */}
        <div className="admin-sidebar-footer">
          <div className="admin-user-card">
            <div className="user-avatar-initial">
              {admin?.username ? admin.username.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="user-details">
              <span className="user-name">{admin?.name || admin?.username || 'Administrator'}</span>
              <span className="user-role">{admin?.role || 'Super Admin'}</span>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="admin-logout-btn"
            title="Sign out of Admin Session"
          >
            <LogOut size={16} />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="admin-main-container">
        {/* Sticky Topbar */}
        <header className="admin-topbar">
          <div className="topbar-left">
            <button
              className="admin-hamburger"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </button>
            <div className="topbar-breadcrumbs">
              <span className="crumb-root">Valeris Admin</span>
              <ChevronRight size={14} className="crumb-arrow" />
              <span className="crumb-active">{pageTitle}</span>
            </div>
          </div>

          <div className="topbar-right">
            {/* Live Database Status Indicator */}
            <div className="topbar-status-badge" title="Database status: Connected to safi_early">
              <span className="status-indicator-dot"></span>
              <Database size={13} style={{ marginRight: '6px' }} />
              <span className="status-text">DB: <strong>safi_early</strong></span>
            </div>

            {/* Admin Avatar Chip */}
            <div className="topbar-admin-chip">
              <UserCheck size={14} style={{ color: '#10b981' }} />
              <span className="chip-username">{admin?.username || 'admin'}</span>
            </div>
          </div>
        </header>

        {/* Page Content Body */}
        <main className="admin-page-content">
          {children}
        </main>
      </div>

      <style>{`
        .admin-portal-root {
          display: flex;
          min-height: 100vh;
          background-color: #f4f6f8;
          color: #0f172a;
          font-family: 'Plus Jakarta Sans', system-ui, -apple-system, sans-serif;
        }

        /* Sidebar Overlay */
        .admin-sidebar-overlay {
          display: none;
        }

        /* Sidebar */
        .admin-sidebar {
          width: 280px;
          min-width: 280px;
          background: #06241b;
          color: #ffffff;
          display: flex;
          flex-direction: column;
          border-right: 1px solid rgba(255, 255, 255, 0.08);
          position: sticky;
          top: 0;
          height: 100vh;
          z-index: 50;
          transition: transform 0.3s cubic-bezier(0.16, 1, 0.3, 1);
        }

        .admin-sidebar-header {
          padding: 24px 22px 18px 22px;
          display: flex;
          align-items: center;
          justifyContent: space-between;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .admin-brand-link {
          text-decoration: none;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .admin-brand-badge {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .brand-dot {
          width: 9px;
          height: 9px;
          border-radius: 50%;
          background: #c29853;
          box-shadow: 0 0 10px rgba(194, 152, 83, 0.8);
        }

        .brand-name {
          font-size: 17px;
          font-weight: 800;
          letter-spacing: 0.12em;
          color: #ffffff;
        }

        .admin-subbrand {
          display: flex;
          align-items: center;
          gap: 6px;
          padding-left: 17px;
        }

        .safi-tag {
          font-size: 11px;
          font-weight: 700;
          color: #10b981;
          background: rgba(16, 185, 129, 0.15);
          padding: 1px 6px;
          border-radius: 4px;
          letter-spacing: 0.04em;
        }

        .portal-tag {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.5);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          font-weight: 600;
        }

        .admin-mobile-close {
          display: none;
          color: rgba(255, 255, 255, 0.7);
          padding: 6px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
        }

        .admin-security-pill {
          margin: 16px 20px 8px 20px;
          padding: 6px 12px;
          background: rgba(194, 152, 83, 0.08);
          border: 1px solid rgba(194, 152, 83, 0.2);
          border-radius: 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 11px;
          color: #d1b47c;
          font-weight: 500;
        }

        .admin-security-pill .sec-icon {
          color: #c29853;
        }

        /* Navigation */
        .admin-sidebar-nav {
          flex: 1;
          padding: 16px 14px;
          overflow-y: auto;
        }

        .nav-group-title {
          font-size: 10px;
          font-weight: 700;
          color: rgba(255, 255, 255, 0.35);
          letter-spacing: 0.12em;
          padding: 0 12px 8px 12px;
        }

        .admin-nav-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 11px 14px;
          border-radius: 10px;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          margin-bottom: 4px;
          position: relative;
          transition: all 0.2s ease;
        }

        .admin-nav-item:hover {
          background: rgba(255, 255, 255, 0.06);
          color: #ffffff;
        }

        .admin-nav-item.active {
          background: linear-gradient(90deg, rgba(16, 185, 129, 0.15) 0%, rgba(6, 36, 27, 0.5) 100%);
          border-left: 3px solid #10b981;
          color: #ffffff;
        }

        .nav-item-icon-wrap {
          width: 32px;
          height: 32px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justifyContent: center;
          background: rgba(255, 255, 255, 0.05);
          color: rgba(255, 255, 255, 0.8);
          flex-shrink: 0;
          transition: all 0.2s;
        }

        .admin-nav-item.active .nav-item-icon-wrap {
          background: #10b981;
          color: #06241b;
          box-shadow: 0 4px 12px rgba(16, 185, 129, 0.35);
        }

        .nav-item-icon-wrap.public-wrap {
          background: rgba(194, 152, 83, 0.15);
          color: #c29853;
        }

        .nav-item-info {
          display: flex;
          flex-direction: column;
          flex: 1;
        }

        .nav-item-title {
          font-size: 13.5px;
          font-weight: 600;
          color: inherit;
        }

        .nav-item-desc {
          font-size: 11px;
          color: rgba(255, 255, 255, 0.45);
        }

        .nav-active-pip {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #10b981;
          box-shadow: 0 0 8px #10b981;
        }

        .external-arrow {
          color: rgba(255, 255, 255, 0.4);
          transition: transform 0.2s;
        }

        .external-link-item:hover .external-arrow {
          transform: translate(2px, -2px);
          color: #c29853;
        }

        /* Sidebar Footer */
        .admin-sidebar-footer {
          padding: 16px;
          background: rgba(0, 0, 0, 0.2);
          border-top: 1px solid rgba(255, 255, 255, 0.06);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .admin-user-card {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 10px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.03);
        }

        .user-avatar-initial {
          width: 36px;
          height: 36px;
          border-radius: 10px;
          background: linear-gradient(135deg, #c29853 0%, #a67c33 100%);
          color: #06241b;
          font-weight: 800;
          font-size: 15px;
          display: flex;
          align-items: center;
          justifyContent: center;
          box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
        }

        .user-details {
          display: flex;
          flex-direction: column;
          overflow: hidden;
        }

        .user-name {
          font-size: 13px;
          font-weight: 600;
          color: #ffffff;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .user-role {
          font-size: 11px;
          color: #10b981;
          font-weight: 500;
        }

        .admin-logout-btn {
          display: flex;
          align-items: center;
          justifyContent: center;
          gap: 8px;
          width: 100%;
          padding: 9px 12px;
          background: rgba(239, 68, 68, 0.12);
          border: 1px solid rgba(239, 68, 68, 0.25);
          color: #fca5a5;
          border-radius: 8px;
          font-size: 12.5px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .admin-logout-btn:hover {
          background: #ef4444;
          color: #ffffff;
          box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        }

        /* Main Container */
        .admin-main-container {
          flex: 1;
          display: flex;
          flex-direction: column;
          min-width: 0;
          background: #f8fafc;
        }

        /* Topbar */
        .admin-topbar {
          height: 64px;
          background: #ffffff;
          border-bottom: 1px solid #e2e8f0;
          padding: 0 28px;
          display: flex;
          align-items: center;
          justifyContent: space-between;
          position: sticky;
          top: 0;
          z-index: 40;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.02);
        }

        .topbar-left {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .admin-hamburger {
          display: none;
          padding: 6px;
          border-radius: 8px;
          background: #f1f5f9;
          color: #334155;
          cursor: pointer;
        }

        .topbar-breadcrumbs {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 13.5px;
        }

        .crumb-root {
          color: #64748b;
          font-weight: 500;
        }

        .crumb-arrow {
          color: #94a3b8;
        }

        .crumb-active {
          color: #0f172a;
          font-weight: 700;
        }

        .topbar-right {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .topbar-status-badge {
          display: flex;
          align-items: center;
          background: #f0fdf4;
          border: 1px solid #bbf7d0;
          color: #166534;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 12px;
        }

        .status-indicator-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #22c55e;
          margin-right: 6px;
          box-shadow: 0 0 6px #22c55e;
        }

        .topbar-admin-chip {
          display: flex;
          align-items: center;
          gap: 6px;
          background: #f8fafc;
          border: 1px solid #e2e8f0;
          padding: 5px 12px;
          border-radius: 20px;
          font-size: 12px;
          font-weight: 600;
          color: #334155;
        }

        /* Page Content */
        .admin-page-content {
          flex: 1;
          padding: 28px;
          max-width: 1480px;
          width: 100%;
          margin: 0 auto;
          box-sizing: border-box;
        }

        /* Responsive Breakpoints */
        @media (max-width: 991px) {
          .admin-sidebar {
            position: fixed;
            left: 0;
            top: 0;
            bottom: 0;
            transform: translateX(-100%);
            box-shadow: 4px 0 24px rgba(0, 0, 0, 0.4);
          }

          .admin-sidebar.open {
            transform: translateX(0);
          }

          .admin-sidebar-overlay {
            display: block;
            position: fixed;
            inset: 0;
            background: rgba(6, 36, 27, 0.7);
            backdrop-filter: blur(3px);
            z-index: 49;
          }

          .admin-mobile-close {
            display: flex;
          }

          .admin-hamburger {
            display: flex;
          }

          .admin-topbar {
            padding: 0 16px;
          }

          .admin-page-content {
            padding: 18px 14px;
          }

          .topbar-status-badge .status-text {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
