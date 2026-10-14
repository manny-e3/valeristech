import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopOnPageChange from './components/ScrollToTopOnPageChange';
import SearchModal from './components/SearchModal';
import OffcanvasMenu from './components/OffcanvasMenu';

// Public Pages
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import SafiPage from './pages/SafiPage';
import ContactPage from './pages/ContactPage';

// Admin Authentication & Pages
import { AdminAuthProvider } from './context/AdminAuthContext';
import AdminProtectedRoute from './components/admin/AdminProtectedRoute';
import AdminLayout from './components/admin/AdminLayout';
import AdminLoginPage from './pages/AdminLoginPage';
import AdminDashboardPage from './pages/AdminDashboardPage';
import AdminEarlyAccessPage from './pages/AdminEarlyAccessPage';
import AdminSettingsPage from './pages/AdminSettingsPage';

/**
 * Main Layout wrapper for corporate site
 */
function MainSiteLayout({ children }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isOffcanvasOpen, setIsOffcanvasOpen] = useState(false);

  return (
    <div className="app-layout">
      {/* Route Scroll-to-Top Handler */}
      <ScrollToTopOnPageChange />

      {/* Global Luxury Header */}
      <Navbar
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenOffcanvas={() => setIsOffcanvasOpen(true)}
      />

      {/* Page Content */}
      {children}

      {/* Global Footer & Conversion Elements */}
      <Footer />
      <ScrollToTop />

      {/* Interactive Overlays */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
      />
      <OffcanvasMenu
        isOpen={isOffcanvasOpen}
        onClose={() => setIsOffcanvasOpen(false)}
      />
    </div>
  );
}

export default function App() {
  return (
    <AdminAuthProvider>
      <Router>
        <Routes>
          {/* =========================================================
              MAIN CORPORATE & SAFI WEBSITE ROUTES
              ========================================================= */}
          <Route 
            path="/" 
            element={
              <MainSiteLayout>
                <Home />
              </MainSiteLayout>
            } 
          />
          <Route 
            path="/about" 
            element={
              <MainSiteLayout>
                <AboutPage />
              </MainSiteLayout>
            } 
          />
          <Route 
            path="/services" 
            element={
              <MainSiteLayout>
                <ServicesPage />
              </MainSiteLayout>
            } 
          />
          <Route 
            path="/safi" 
            element={
              <MainSiteLayout>
                <SafiPage />
              </MainSiteLayout>
            } 
          />
          <Route 
            path="/contact" 
            element={
              <MainSiteLayout>
                <ContactPage />
              </MainSiteLayout>
            } 
          />

          {/* =========================================================
              ADMIN PORTAL: PUBLIC LOGIN ROUTE
              ========================================================= */}
          <Route path="/admin/login" element={<AdminLoginPage />} />

          {/* =========================================================
              ADMIN PORTAL: PROTECTED ROUTES
              ========================================================= */}
          <Route
            path="/admin"
            element={
              <AdminProtectedRoute>
                <AdminLayout pageTitle="Executive Dashboard">
                  <AdminDashboardPage />
                </AdminLayout>
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/dashboard"
            element={
              <AdminProtectedRoute>
                <AdminLayout pageTitle="Executive Dashboard">
                  <AdminDashboardPage />
                </AdminLayout>
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/early-access"
            element={
              <AdminProtectedRoute>
                <AdminLayout pageTitle="Early Access Leads">
                  <AdminEarlyAccessPage embedded={true} />
                </AdminLayout>
              </AdminProtectedRoute>
            }
          />
          <Route
            path="/admin/settings"
            element={
              <AdminProtectedRoute>
                <AdminLayout pageTitle="Settings & Security">
                  <AdminSettingsPage />
                </AdminLayout>
              </AdminProtectedRoute>
            }
          />

          {/* Legacy & Shortcut Redirects */}
          <Route path="/safi/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/home" element={<Navigate to="/" replace />} />
          <Route path="/preview" element={<Navigate to="/" replace />} />
          <Route path="/coming-soon" element={<Navigate to="/" replace />} />

          {/* Default 404 Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AdminAuthProvider>
  );
}
