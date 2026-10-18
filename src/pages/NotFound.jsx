import React from 'react';
import { Link } from 'react-router-dom';

export function NotFound() {
  return (
    <div className="w-full min-h-[80vh] flex flex-col items-center justify-center px-4 py-24 text-center">
      <div className="max-w-xl mx-auto flex flex-col items-center gap-6 p-8 bg-surface-card border border-border rounded-sm shadow-2xl">
        <div className="p-3 bg-surface-lowest border border-border inline-flex items-center gap-2 font-mono text-xs text-primary">
          <span className="w-2 h-2 rounded-full bg-status-error animate-ping"></span>
          <span>// STATUS: 404 PLATFORM_NOT_FOUND</span>
        </div>

        <h1 className="font-display text-6xl sm:text-7xl uppercase text-text-heading tracking-tight leading-none">
          SECTOR 04 <span className="text-primary">LOST.</span>
        </h1>

        <p className="font-body text-sm sm:text-base text-text-body max-w-md leading-relaxed">
          The requested coordinate or facility URL does not exist on the Sector 04 platform ledger. Please return to the central operations hub.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-4 border-t border-border w-full">
          <Link
            to="/"
            className="w-full sm:w-auto px-6 py-3 bg-primary text-text-inverse font-headline text-lg uppercase tracking-wider rounded-sm font-bold hover:bg-primary-hover transition-colors"
          >
            Return to Sector 04 Hub
          </Link>
          <Link
            to="/programs"
            className="w-full sm:w-auto px-6 py-3 border border-border text-text-heading hover:border-primary hover:text-primary font-headline text-lg uppercase tracking-wider rounded-sm font-bold transition-colors"
          >
            Explore Programs
          </Link>
        </div>
      </div>
    </div>
  );
}
