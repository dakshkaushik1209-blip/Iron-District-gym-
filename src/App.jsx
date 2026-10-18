import React, { Suspense, lazy, useEffect, useRef } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { MobileBottomBar } from './components/MobileBottomBar';
import { WhatsAppButton } from './components/WhatsAppButton';
import { useLenis, smoothScrollTo } from './hooks/useLenis';
import { TRANSITIONS } from './lib/config';
import { useReducedMotion } from './hooks/useReducedMotion';

// Lazy-loaded pages for code splitting & high Lighthouse performance
const Home = lazy(() => import('./pages/Home').then(m => ({ default: m.Home })));
const Programs = lazy(() => import('./pages/Programs').then(m => ({ default: m.Programs })));
const Trainers = lazy(() => import('./pages/Trainers').then(m => ({ default: m.Trainers })));
const Membership = lazy(() => import('./pages/Membership').then(m => ({ default: m.Membership })));
const Contact = lazy(() => import('./pages/Contact').then(m => ({ default: m.Contact })));
const Success = lazy(() => import('./pages/Success').then(m => ({ default: m.Success })));
const Terms = lazy(() => import('./pages/Terms').then(m => ({ default: m.Terms })));
const Privacy = lazy(() => import('./pages/Privacy').then(m => ({ default: m.Privacy })));
const NotFound = lazy(() => import('./pages/NotFound').then(m => ({ default: m.NotFound })));

// Scroll to top on route change or scroll to anchor target if hash is present
function ScrollToTop() {
  const { pathname, hash } = useLocation();
  const prevPathname = useRef(pathname);

  useEffect(() => {
    const isNewPage = prevPathname.current !== pathname;
    prevPathname.current = pathname;

    if (isNewPage) {
      if (window.__lenis) {
        window.__lenis.scrollTo(0, { immediate: true });
      }
      window.scrollTo(0, 0);
    }

    if (!hash) {
      if (!isNewPage) {
        if (window.__lenis) {
          window.__lenis.scrollTo(0, { immediate: true });
        }
        window.scrollTo(0, 0);
      }
    } else {
      const targetId = hash.replace(/^#/, '');
      let cancelled = false;

      const tryScroll = (attempts = 0) => {
        if (cancelled) return;
        const element = document.getElementById(targetId);
        if (element) {
          smoothScrollTo(`#${targetId}`, -80);
        } else if (attempts < 30) {
          setTimeout(() => tryScroll(attempts + 1), 50);
        }
      };

      const delay = isNewPage ? 500 : 50;
      const timer = setTimeout(() => tryScroll(0), delay);
      return () => {
        cancelled = true;
        clearTimeout(timer);
      };
    }
  }, [pathname, hash]);

  return null;
}

// Minimalist Industrial Loading Fallback for Suspense
function PageLoader() {
  return (
    <div className="w-full min-h-[70vh] flex flex-col items-center justify-center gap-3">
      <div className="flex items-center gap-2 font-mono text-xs text-primary">
        <span className="w-2.5 h-2.5 bg-primary animate-ping"></span>
        <span className="tracking-widest uppercase">LOADING IRON DISTRICT...</span>
      </div>
    </div>
  );
}

// Route manager with standard page transition
function AnimatedRoutes() {
  const location = useLocation();
  const reducedMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        initial={reducedMotion ? false : TRANSITIONS.page.initial}
        animate={TRANSITIONS.page.animate}
        exit={reducedMotion ? undefined : TRANSITIONS.page.exit}
        transition={reducedMotion ? { duration: 0 } : TRANSITIONS.page.transition}
        className="w-full flex-1 flex flex-col"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/programs" element={<Programs />} />
          <Route path="/trainers" element={<Trainers />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/success" element={<Success />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function MainLayout() {
  // Initialize Lenis smooth scroll
  useLenis();

  return (
    <div className="flex flex-col min-h-screen bg-background text-text-heading antialiased">
      <ScrollToTop />

      {/* Sticky Navbar */}
      <Navbar />

      {/* Main Page Body */}
      <main id="main-content" tabIndex="-1" className="flex-1 w-full outline-none">
        <Suspense fallback={<PageLoader />}>
          <AnimatedRoutes />
        </Suspense>
      </main>

      {/* Industrial Footer */}
      <Footer />

      {/* Mobile-Only Sticky Bottom Booking Bar */}
      <MobileBottomBar />

      {/* Floating WhatsApp Action Button */}
      <WhatsAppButton />
    </div>
  );
}

export function App() {
  return (
    <Router>
      <MainLayout />
    </Router>
  );
}
