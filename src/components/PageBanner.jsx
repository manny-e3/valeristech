import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export default function PageBanner({ title, subtitle, breadcrumb }) {
  return (
    <div className="page-banner">
      <div className="page-banner-overlay" />
      <div className="container page-banner-container">
        <h1 className="page-banner-title">{title}</h1>
        {subtitle && <p className="page-banner-subtitle">{subtitle}</p>}
        <div className="page-breadcrumb">
          <Link to="/" className="breadcrumb-link">Home</Link>
          <ChevronRight size={14} className="breadcrumb-separator" />
          <span className="breadcrumb-current">{breadcrumb || title}</span>
        </div>
      </div>
    </div>
  );
}
