import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArrowRight, MessageSquare, Sparkles, ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 'safi',
    badge: 'FLAGSHIP PRODUCT · BEHAVIOURAL BANKING',
    mobileBadge: 'SAFI · BEHAVIOURAL BANKING',
    title: 'Same money. A more intentional tomorrow.',
    lead: 'SAFI is financial behaviour infrastructure that works within your bank, helping you make more intentional decisions with your money, without changing how you bank.',
    primaryBtn: {
      text: 'Explore SAFI',
      to: '/safi',
      isInternal: true,
    },
    secondaryBtn: {
      text: 'Join Early Access',
      to: '/safi#early-access',
      isInternal: true,
    },
    bgImage: '/images/safi/safi-hero-desk.jpg',
    bgPosition: 'center',
  },
  {
    id: 'valeris',
    badge: 'FINANCIAL TECHNOLOGY · DIGITAL SYSTEMS · ADVISORY',
    mobileBadge: 'FINTECH · DIGITAL SYSTEMS',
    title: 'We build technology for better financial and business systems.',
    lead: 'Valeris Technologies designs and deploys digital systems that help organisations solve complex operational and financial challenges.',
    primaryBtn: {
      text: 'Explore Valeris',
      href: '#about',
      isInternal: false,
    },
    secondaryBtn: {
      text: 'Talk to us',
      to: '/contact',
      isInternal: true,
    },
    bgImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1920&q=85',
    bgPosition: 'center right',
  },
];

export default function Hero() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6500);
    return () => clearInterval(timer);
  }, [isPaused, nextSlide, currentSlide]);

  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 45) {
      nextSlide();
    } else if (distance < -45) {
      prevSlide();
    }
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const active = slides[currentSlide];

  return (
    <section
      id="home"
      className="hero-section"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      aria-label="Valeris Technologies Hero Slider"
    >
      {/* Background layers with smooth crossfade */}
      {slides.map((slide, idx) => (
        <div
          key={slide.id}
          className={`hero-bg-layer ${currentSlide === idx ? 'active' : ''}`}
          style={{
            backgroundImage: `url('${slide.bgImage}')`,
            backgroundPosition: slide.bgPosition || 'center right',
          }}
        />
      ))}

      {/* Gradient Overlay for high-end dark obsidian contrast */}
      <div className="hero-overlay" />

      <div className="container hero-container">
        <div className="hero-content hero-slide-enter" key={currentSlide}>
          <div className="hero-tag-wrap">
            <span className="hero-tag-badge">
              <Sparkles size={13} className="hero-tag-icon" />
              <span className="hero-tag-desktop-text">{active.badge}</span>
              <span className="hero-tag-mobile-text">{active.mobileBadge}</span>
            </span>
          </div>

          <h1 className="hero-title">{active.title}</h1>

          <p className="hero-lead">{active.lead}</p>

          <div className="hero-btn-wrap">
            {active.primaryBtn.isInternal ? (
              <Link to={active.primaryBtn.to} className="btn-primary hero-btn">
                <span>{active.primaryBtn.text}</span>
                <ArrowRight size={18} />
              </Link>
            ) : (
              <a href={active.primaryBtn.href} className="btn-primary hero-btn">
                <span>{active.primaryBtn.text}</span>
                <ArrowRight size={18} />
              </a>
            )}

            <Link
              to={active.secondaryBtn.to}
              className="btn-outline hero-btn-outline"
            >
              <MessageSquare size={18} />
              <span>{active.secondaryBtn.text}</span>
            </Link>
          </div>

          {/* Mobile slide indicator dots and arrows */}
          <div className="hero-mobile-dots" aria-label="Slide indicators">
            <button
              type="button"
              className="hero-arrow-btn prev"
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <ChevronLeft size={16} />
            </button>

            {slides.map((slide, idx) => (
              <button
                key={slide.id}
                type="button"
                className={`mobile-dot ${currentSlide === idx ? 'active' : ''}`}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}

            <button
              type="button"
              className="hero-arrow-btn next"
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Desktop Vertical Pagination */}
        <div className="hero-pagination" aria-label="Slide navigation">
          {slides.map((slide, idx) => (
            <React.Fragment key={slide.id}>
              <button
                type="button"
                className={`pagination-circle ${currentSlide === idx ? 'active' : ''}`}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              >
                0{idx + 1}
              </button>
              {idx < slides.length - 1 && <div className="pagination-line" />}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
