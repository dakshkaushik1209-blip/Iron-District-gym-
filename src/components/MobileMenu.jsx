import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { SITE_CONFIG, MOTION_CONFIG } from '../lib/config';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { Icon } from './Icon';

export function MobileMenu({
  isOpen,
  onClose,
  navLinks = [],
  activeSection,
  onLinkClick,
  onTrialClick,
}) {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  const menuRef = useRef(null);
  const closeBtnRef = useRef(null);
  const reducedMotion = useReducedMotion();

  // Close on route change
  useEffect(() => {
    if (isOpen) {
      onClose();
    }
  }, [location.pathname]);

  // Lock body scroll and handle Escape key
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button on open
    setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }

      // Focus trap
      if (e.key === 'Tab' && menuRef.current) {
        const focusableElements = menuRef.current.querySelectorAll(
          'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
        );
        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  const menuVariants = {
    closed: {
      opacity: 0,
      y: reducedMotion ? 0 : -20,
      transition: { duration: 0.2, ease: MOTION_CONFIG.ease },
    },
    open: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: MOTION_CONFIG.ease },
    },
  };

  const listVariants = {
    closed: {},
    open: {
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.06,
        delayChildren: reducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    closed: { opacity: 0, x: reducedMotion ? 0 : -16 },
    open: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.25, ease: MOTION_CONFIG.ease },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id="mobile-navigation-menu"
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile Navigation Menu"
          initial="closed"
          animate="open"
          exit="closed"
          variants={menuVariants}
          className="fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-2xl flex flex-col justify-between p-gutter-mobile overflow-y-auto"
        >
          {/* Header */}
          <div className="flex items-center justify-between h-16 border-b border-border/40 pb-2">
            <Link
              to="/"
              onClick={onClose}
              className="flex items-center gap-space-xs text-white"
            >
              <div className="w-3.5 h-3.5 bg-primary"></div>
              <div className="flex flex-col leading-none">
                <span className="font-headline text-headline-sm uppercase tracking-wider font-bold">
                  {SITE_CONFIG.shortName}
                </span>
                <span className="font-mono text-[9px] text-primary tracking-widest">
                  STRENGTH LAB // SEC-04
                </span>
              </div>
            </Link>

            <button
              ref={closeBtnRef}
              onClick={onClose}
              type="button"
              aria-label="Close Navigation Menu"
              className="w-11 h-11 flex items-center justify-center text-white bg-surface-container border border-border hover:border-primary transition-colors focus-visible:outline-primary"
            >
              <Icon name="close" size={24} />
            </button>
          </div>

          {/* Nav Items */}
          <div className="my-auto py-6">
            <span className="font-mono text-xs text-primary uppercase tracking-widest block mb-4">
              // DIRECTORY INDEX
            </span>
            <motion.nav
              variants={listVariants}
              initial="closed"
              animate="open"
              className="flex flex-col gap-4"
            >
              {navLinks.map((link, idx) => {
                const isSectionActive =
                  isHomePage &&
                  (activeSection === link.sectionId ||
                    (link.sectionId === 'hero' && (!activeSection || activeSection === 'hero')));

                const isRouteActive =
                  !isHomePage &&
                  ((location.pathname === '/programs' && link.sectionId === 'programs') ||
                    (location.pathname === '/trainers' && link.sectionId === 'trainers') ||
                    (location.pathname === '/membership' && link.sectionId === 'memberships') ||
                    (location.pathname === '/contact' && link.sectionId === 'contact'));

                const isActive = isSectionActive || isRouteActive;

                return (
                  <motion.div key={link.name} variants={itemVariants}>
                    <Link
                      to={link.href}
                      onClick={(e) => {
                        onClose();
                        if (onLinkClick) onLinkClick(e, link);
                      }}
                      aria-current={isActive ? 'page' : undefined}
                      className={`font-headline text-3xl sm:text-4xl uppercase tracking-tight flex items-center justify-between group transition-colors ${
                        isActive ? 'text-primary font-bold' : 'text-white hover:text-primary'
                      }`}
                    >
                      <span>
                        <span
                          className={`font-mono text-sm mr-3 transition-colors ${
                            isActive ? 'text-primary' : 'text-text-muted group-hover:text-primary'
                          }`}
                        >
                          0{idx + 1}.
                        </span>
                        {link.name}
                      </span>
                      <Icon
                        name="arrow_forward"
                        size={20}
                        className={`${
                          isActive ? 'text-primary' : 'text-border group-hover:text-primary'
                        } group-hover:translate-x-1 transition-all`}
                      />
                    </Link>
                  </motion.div>
                );
              })}
            </motion.nav>
          </div>

          {/* Action & Status */}
          <div className="flex flex-col gap-4 pt-4 border-t border-border/40">
            <Link
              to="/#trial"
              onClick={(e) => {
                onClose();
                if (onTrialClick) onTrialClick(e);
              }}
              className="w-full h-12 bg-primary text-text-inverse font-headline text-lg uppercase font-bold flex items-center justify-center tracking-wider hover:bg-primary-hover active:scale-[0.99] transition-all rounded-sm shadow-md"
            >
              BOOK A FREE TRIAL PASS
            </Link>

            <div className="flex flex-col gap-1 font-mono text-[11px] text-text-muted">
              <div className="flex justify-between">
                <span className="text-primary font-bold">LOC:</span>
                <span className="text-text-body">{SITE_CONFIG.fullAddress}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary font-bold">COMMS:</span>
                <span className="text-text-body">{SITE_CONFIG.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-primary font-bold">ACCESS:</span>
                <span className="text-text-body">24/7 KEYCARD ACCESS</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
