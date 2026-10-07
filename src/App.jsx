import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';

import TopBar from './components/TopBar';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ScrollToTop from './components/ScrollToTop';
import ScrollToTopOnPageChange from './components/ScrollToTopOnPageChange';
import SearchModal from './components/SearchModal';
import OffcanvasMenu from './components/OffcanvasMenu';

// Pages
import Home from './pages/Home';
import AboutPage from './pages/AboutPage';
import ServicesPage from './pages/ServicesPage';
import SafiPage from './pages/SafiPage';
import ContactPage from './pages/ContactPage';

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

      {/* Global Header */}
      <TopBar />
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
    <Router>
      <Routes>
        {/* Main Website Routes */}
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

        {/* Legacy / Alias Redirects */}
        <Route path="/home" element={<Navigate to="/" replace />} />
        <Route path="/preview" element={<Navigate to="/" replace />} />
        <Route path="/coming-soon" element={<Navigate to="/" replace />} />

        {/* Default 404 Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
