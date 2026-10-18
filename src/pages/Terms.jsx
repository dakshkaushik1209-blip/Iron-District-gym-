import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../lib/config';

export function Terms() {
  return (
    <div className="w-full min-h-screen pt-28 pb-20 bg-background text-text-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Ribbon */}
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-muted mb-4">
          <span className="text-primary font-bold">// LEGAL FRAMEWORK</span>
          <span>//</span>
          <span>TERMS OF SERVICE</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-text-heading mb-6">
          TERMS OF <span className="text-primary">USE.</span>
        </h1>

        <div className="p-4 bg-surface-card border-l-2 border-primary mb-8 font-mono text-xs text-text-body">
          <span className="text-primary font-bold">// NOTICE: PORTFOLIO DEMO BRAND</span>
          <p className="mt-1">
            Iron District Fitness is a fictional showcase gym created for engineering and front-end design demonstration. All memberships, booking forms, and brand representations are illustrative.
          </p>
        </div>

        <div className="space-y-8 font-body text-sm sm:text-base text-text-body leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-headline text-2xl uppercase tracking-wide text-text-heading">
              1. Platform Usage & General Rules
            </h2>
            <p>
              By accessing or using our website, you acknowledge that this is a simulated facility environment. No financial transactions, binding long-term contracts, or legal debts are executed through this portal.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-headline text-2xl uppercase tracking-wide text-text-heading">
              2. Free Trial Booking Policy
            </h2>
            <p>
              Free trial reservations submitted via the online form are demonstration bookings. In a production deployment, a trial slot reserves access to facility platforms and equipment under coach supervision.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-headline text-2xl uppercase tracking-wide text-text-heading">
              3. Safety & Facility Etiquette
            </h2>
            <p>
              In all real-world lifting environments, athletes are expected to adhere to standard safety protocols: utilizing collars on barbells, respecting platform boundaries, and re-racking plates after completion.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-headline text-2xl uppercase tracking-wide text-text-heading">
              4. Contact & Inquiries
            </h2>
            <p>
              For inquiries regarding this portfolio build or code implementation, please contact the developer or review the project documentation.
            </p>
          </section>
        </div>

        <div className="mt-12 pt-8 border-t border-border flex items-center justify-between">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-primary hover:text-primary-hover font-mono text-xs uppercase tracking-wider font-bold"
          >
            ← Return to Homepage
          </Link>
          <span className="font-mono text-xs text-text-muted">
            LAST REVISED: 2026.01
          </span>
        </div>
      </div>
    </div>
  );
}
