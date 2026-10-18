import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { smoothScrollTo } from '../hooks/useLenis';

export function MobileBottomBar() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleClick = (e) => {
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
    <aside
      aria-label="Mobile trial booking action bar"
      className="md:hidden fixed bottom-0 left-0 right-0 z-30 bg-[#0A0A0A]/95 backdrop-blur-xl border-t border-border px-4 py-2.5 shadow-[0_-4px_20px_rgba(0,0,0,0.8)] pb-safe"
    >
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between font-mono text-[10px] text-text-muted tracking-wider">
          <span className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
            <span className="text-text-body font-semibold">TRIAL VISITS OPEN</span>
          </span>
          <span className="text-primary font-bold">// FREE 90-MIN LIFT</span>
        </div>

        <Link
          to="/contact#trial"
          onClick={handleClick}
          className="w-full h-11 bg-primary active:bg-primary-hover text-text-inverse font-headline text-base uppercase font-bold flex items-center justify-center tracking-wider transition-colors rounded-sm shadow-md"
        >
          BOOK A FREE TRIAL
        </Link>
      </div>
    </aside>
  );
}
