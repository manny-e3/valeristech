import React, { useState } from 'react';
import { Search, X } from 'lucide-react';

export default function SearchModal({ isOpen, onClose }) {
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      alert(`Searching Valeris Technologies for: "${query}"`);
      onClose();
    }
  };

  return (
    <div className="search-modal-backdrop" onClick={onClose}>
      <div className="search-modal-card" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="search-modal-close" onClick={onClose} aria-label="Close search">
          <X size={24} />
        </button>

        <h3 className="search-modal-title">Search Valeris Technologies</h3>
        <p className="search-modal-sub">
          Search SAFI, systems integration, and institutional infrastructure capabilities.
        </p>

        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search e.g. SAFI, integration, API, fintech..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="search-input"
          />
          <button type="submit" className="search-submit-btn">
            <Search size={20} />
            <span>Search</span>
          </button>
        </form>
      </div>
    </div>
  );
}
