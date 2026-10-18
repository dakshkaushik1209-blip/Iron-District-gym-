import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { MobileMenu } from './MobileMenu';
import { SITE_CONFIG } from '../lib/config';
import { smoothScrollTo } from '../hooks/useLenis';

const NAV_LINKS = [
  { name: 'Home', href: '/' },
  { name: 'Programs', href: '/programs' },
  { name: 'Trainers', href: '/trainers' },
  { name: 'Membership', href: '/membership' },
  { name: 'Contact', href: '/contact' },
];

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleTrialClick = (e) => {
    const trialElement = document.getElementById('trial');
    if (trialElement) {
      e.preventDefault();
      smoothScrollTo('#trial', -80);
      if (window.location.hash !== '#trial') {
        window.history.pushState(null, '', `${window.location.pathname}#trial`);
      }
    }
  };

  return (
    <>
      {/* Skip to Content Accessibility Link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-primary focus:text-text-inverse focus:font-bold focus:outline-none focus:ring-2 focus:ring-white rounded-sm"
      >
        Skip to content
      </a>

      <header
        className={`fixed top-0 w-full z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0A0A]/95 backdrop-blur-md border-b border-border shadow-xl'
            : 'bg-[#0A0A0A]/40 backdrop-blur-sm border-b border-white/5'
        }`}
      >
        <div className="h-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Identity */}
          <Link
            to="/"
            onClick={() => {
              if (location.pathname === '/') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }
            }}
            className="flex items-center gap-space-sm group"
          >
            <div className="w-4 h-4 bg-primary transition-transform group-hover:scale-110"></div>
            <div className="flex flex-col leading-none">
              <span className="font-headline text-2xl uppercase tracking-wider text-text-heading font-bold">
                {SITE_CONFIG.shortName}
              </span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-text-muted">
                STRENGTH LAB // SEC-04
              </span>
            </div>
          </Link>

          {/* Desktop Navigation with Route-Based Active Highlighting */}
          <nav
            aria-label="Primary Navigation"
            className="hidden md:flex items-center gap-6 lg:gap-8"
          >
            {NAV_LINKS.map((link) => {
              const isActive = location.pathname === link.href;

              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => {
                    if (location.pathname === link.href) {
                      window.scrollTo({ top: 0, behavior: 'smooth' });
                    }
                  }}
                  aria-current={isActive ? 'page' : undefined}
                  className={`font-headline text-lg uppercase tracking-wide transition-colors relative py-1 ${
                    isActive
                      ? 'text-primary font-bold'
                      : 'text-text-body hover:text-text-heading'
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-primary"></span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action CTAs */}
          <div className="flex items-center gap-space-md">
            <Link
              to="/contact#trial"
              onClick={handleTrialClick}
              className="hidden sm:inline-flex items-center justify-center bg-primary text-text-inverse font-headline text-base uppercase tracking-wider px-5 py-2 rounded-sm hover:bg-primary-hover active:scale-[0.98] transition-all font-bold shadow-md"
            >
              Book a Free Trial
            </Link>

            {/* Mobile Menu Hamburger Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
              aria-expanded={isMobileMenuOpen}
              aria-controls="mobile-navigation-menu"
              className="md:hidden w-11 h-11 flex items-center justify-center text-text-heading bg-surface-container border border-border hover:border-primary transition-colors focus-visible:outline-primary rounded-sm"
            >
              <span className="material-symbols-outlined text-2xl">menu</span>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navLinks={NAV_LINKS}
        onTrialClick={handleTrialClick}
      />
    </>
  );
}
