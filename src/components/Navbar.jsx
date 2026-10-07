import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu } from 'lucide-react';
import Logo from './Logo';

export default function Navbar({ onOpenSearch, onOpenOffcanvas }) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header-main ${isScrolled ? 'header-sticky' : ''}`}>
      <div className="header-inner">
        {/* Brand Logo */}
        <Link to="/" className="header-brand-badge" aria-label="Valeris Technologies Home">
          <Logo light={false} />
        </Link>

        {/* Desktop Navigation */}
        <nav className="header-nav">
          <ul className="nav-list">
            <li className="nav-item">
              <NavLink
                to="/"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
                end
              >
                Home
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/about"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                About
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/services"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Capabilities
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/safi"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                SAFI
              </NavLink>
            </li>

            <li className="nav-item">
              <NavLink
                to="/contact"
                className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}
              >
                Contact
              </NavLink>
            </li>
          </ul>
        </nav>

        {/* Right Action Buttons */}
        <div className="header-actions">
          <Link to="/contact" className="btn-primary quote-btn">
            Talk to us
          </Link>

          <button
            type="button"
            className="action-circle-btn menu-toggle-btn"
            onClick={onOpenOffcanvas}
            aria-label="Open Menu"
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
