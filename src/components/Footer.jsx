import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../lib/config';
import { FooterWordmark } from './FooterWordmark';
import { smoothScrollTo } from '../hooks/useLenis';

export function Footer() {
  const handleTrialClick = (e) => {
    const trialSection = document.getElementById('trial');
    if (trialSection) {
      e.preventDefault();
      smoothScrollTo('#trial', -80);
      if (window.location.hash !== '#trial') {
        window.history.pushState(null, '', `${window.location.pathname}#trial`);
      }
    }
  };

  return (
    <footer className="w-full bg-[#0A0A0A] border-t border-border mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-space-xl">
        {/* Main Columns Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-gutter mb-space-xl">
          {/* Brand & Address Column (2 cols) */}
          <div className="lg:col-span-2 flex flex-col gap-space-md">
            <div className="flex items-center gap-space-xs">
              <div className="w-4 h-4 bg-primary"></div>
              <span className="font-headline text-2xl uppercase tracking-wider text-text-heading font-bold">
                {SITE_CONFIG.name}
              </span>
            </div>
            <p className="font-body text-sm text-text-body max-w-sm">
              Industrial strength laboratory dedicated to serious lifters, disciplined athletes, and progressive overload.
            </p>
            <div className="flex flex-col gap-1 font-mono text-xs text-text-body">
              <span className="text-text-muted font-bold">LOCATION:</span>
              <span>{SITE_CONFIG.fullAddress}</span>
              <span className="text-text-muted font-bold mt-2">COMMS:</span>
              <span>{SITE_CONFIG.phone}</span>
            </div>
          </div>

          {/* Column 1: Programs */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs text-primary uppercase tracking-widest font-bold">
              // Programs
            </span>
            <ul className="flex flex-col gap-2 font-body text-sm text-text-body">
              <li>
                <Link to="/programs#strength-training" className="hover:text-primary transition-colors">
                  Strength Training
                </Link>
              </li>
              <li>
                <Link to="/programs#muscle-building" className="hover:text-primary transition-colors">
                  Muscle Building
                </Link>
              </li>
              <li>
                <Link to="/programs#fat-loss-training" className="hover:text-primary transition-colors">
                  Fat-loss Training
                </Link>
              </li>
              <li>
                <Link to="/programs#personal-training" className="hover:text-primary transition-colors">
                  Personal Training
                </Link>
              </li>
              <li>
                <Link to="/programs#functional-fitness" className="hover:text-primary transition-colors">
                  Functional Fitness
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2: The Facility */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs text-primary uppercase tracking-widest font-bold">
              // The Facility
            </span>
            <ul className="flex flex-col gap-2 font-body text-sm text-text-body">
              <li>
                <Link to="/#facility" className="hover:text-primary transition-colors">
                  The Facility
                </Link>
              </li>
              <li>
                <Link to="/#about" className="hover:text-primary transition-colors">
                  Our Philosophy
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Memberships */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs text-primary uppercase tracking-widest font-bold">
              // Memberships
            </span>
            <ul className="flex flex-col gap-2 font-body text-sm text-text-body">
              <li>
                <Link to="/membership#monthly" className="hover:text-primary transition-colors">
                  Monthly Membership
                </Link>
              </li>
              <li>
                <Link to="/membership#quarterly" className="hover:text-primary transition-colors">
                  Quarterly Membership
                </Link>
              </li>
              <li>
                <Link to="/membership#annual" className="hover:text-primary transition-colors">
                  Annual Membership
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Socials & Support */}
          <div className="flex flex-col gap-3">
            <span className="font-mono text-xs text-primary uppercase tracking-widest font-bold">
              // Comms & Support
            </span>
            <ul className="flex flex-col gap-2 font-body text-sm text-text-body mb-2">
              <li>
                <Link to="/contact" className="hover:text-primary transition-colors">
                  Contact & Location
                </Link>
              </li>
              <li>
                <Link
                  to="/contact#trial"
                  onClick={handleTrialClick}
                  className="hover:text-primary transition-colors"
                >
                  Free Trial Booking
                </Link>
              </li>
            </ul>
            <div className="flex items-center gap-2">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram profile (demo link)"
                className="w-8 h-8 rounded-sm bg-surface-container border border-border flex items-center justify-center text-text-body hover:text-primary hover:border-primary transition-colors"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" className="fill-current">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook page (demo link)"
                className="w-8 h-8 rounded-sm bg-surface-container border border-border flex items-center justify-center text-text-body hover:text-primary hover:border-primary transition-colors"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" className="fill-current">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube channel (demo link)"
                className="w-8 h-8 rounded-sm bg-surface-container border border-border flex items-center justify-center text-text-body hover:text-primary hover:border-primary transition-colors"
              >
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" className="fill-current">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                </svg>
              </a>
            </div>
          </div>
        </div>

        {/* Large Decorative Wordmark */}
        <div className="mb-space-md">
          <FooterWordmark />
        </div>

        {/* Bottom Disclaimer & Copyright */}
        <div className="pt-6 border-t border-border/80 flex flex-col md:flex-row items-center justify-between gap-4 font-mono text-xs">
          <span className="text-text-muted text-center md:text-left">
            © 2026 Iron District Fitness (portfolio demo brand). Built by Discipline. All rights reserved.
          </span>
          <div className="flex items-center gap-4 text-text-muted">
            <Link to="/terms" className="hover:text-text-heading transition-colors">
              TERMS
            </Link>
            <span className="w-px h-3 bg-border" aria-hidden="true" />
            <Link to="/privacy" className="hover:text-text-heading transition-colors">
              PRIVACY
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
