import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAdminAuth } from '../../context/AdminAuthContext';
import { ShieldCheck, Loader2 } from 'lucide-react';

/**
 * Route protector for Valeris Admin Portal
 * Automatically redirects unauthenticated requests to /admin/login
 */
export default function AdminProtectedRoute({ children }) {
  const { isAuthenticated, isLoading } = useAdminAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(ellipse at top, #0b3327 0%, #06241b 60%, #03140e 100%)',
        color: '#ffffff',
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}>
        <div style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '76px',
          height: '76px',
          borderRadius: '20px',
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(194, 152, 83, 0.3)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
          marginBottom: '24px',
        }}>
          <ShieldCheck style={{ width: '38px', height: '38px', color: '#c29853' }} />
          <Loader2 style={{
            position: 'absolute',
            width: '64px',
            height: '64px',
            color: '#10b981',
            opacity: 0.6,
            animation: 'spin 1.4s linear infinite',
          }} />
        </div>
        <h3 style={{
          fontSize: '18px',
          fontWeight: 600,
          letterSpacing: '-0.01em',
          color: '#ffffff',
          marginBottom: '6px',
        }}>
          Valeris Secure Admin
        </h3>
        <p style={{
          fontSize: '13px',
          color: 'rgba(255, 255, 255, 0.6)',
          letterSpacing: '0.02em',
        }}>
          Verifying security credentials...
        </p>
        <style>{`
          @keyframes spin {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  if (!isAuthenticated) {
    // Save attempted route so user gets redirected back after login
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}
