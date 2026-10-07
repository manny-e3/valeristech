import React from 'react';

export default function Logo({ light = false }) {
  // Brand V mark colors:
  // Left arm: Vibrant emerald / mint
  // Right arm: Deep forest emerald
  const leftColor = light ? '#34d399' : '#10b981';
  const rightColor = light ? '#10b981' : '#047857';

  return (
    <div className={`tech-logo ${light ? 'tech-logo-light' : ''}`}>
      <div className="logo-brand-block">
        <div className="logo-wordmark-row">
          <span className="logo-symbol" aria-hidden="true">
            <svg
              viewBox="0 0 24 22"
              fill="none"
              width="22"
              height="20"
              xmlns="http://www.w3.org/2000/svg"
              style={{ display: 'block' }}
            >
              {/* Left Pill (vibrant emerald) */}
              <line
                x1="4.5"
                y1="3"
                x2="10"
                y2="17.5"
                stroke={leftColor}
                strokeWidth="4"
                strokeLinecap="round"
              />
              {/* Right Pill (deep forest emerald) */}
              <line
                x1="18.5"
                y1="3"
                x2="13"
                y2="17.5"
                stroke={rightColor}
                strokeWidth="4"
                strokeLinecap="round"
              />
            </svg>
          </span>
          <span className="logo-rest-text">aleris</span>
        </div>
        <span className="logo-tech-text">TECHNOLOGIES</span>
      </div>
    </div>
  );
}
