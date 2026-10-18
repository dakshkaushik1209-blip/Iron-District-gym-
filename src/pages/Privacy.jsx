import React from 'react';
import { Link } from 'react-router-dom';
import { SITE_CONFIG } from '../lib/config';

export function Privacy() {
  return (
    <div className="w-full min-h-screen pt-28 pb-20 bg-background text-text-heading">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Ribbon */}
        <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-muted mb-4">
          <span className="text-primary font-bold">// DATA PRIVACY</span>
          <span>//</span>
          <span>PRIVACY POLICY</span>
        </div>

        <h1 className="font-display text-4xl sm:text-6xl uppercase tracking-tight text-text-heading mb-6">
          PRIVACY <span className="text-primary">POLICY.</span>
        </h1>

        <div className="p-4 bg-surface-card border-l-2 border-primary mb-8 font-mono text-xs text-text-body">
          <span className="text-primary font-bold">// NOTICE: DEMO ENVIRONMENT DATA HANDLING</span>
          <p className="mt-1">
            This website processes data submitted through the free trial booking form strictly for demonstrating real full-stack form submission and validation. No personal data is commercialized, tracked, or sold.
          </p>
        </div>

        <div className="space-y-8 font-body text-sm sm:text-base text-text-body leading-relaxed">
          <section className="space-y-3">
            <h2 className="font-headline text-2xl uppercase tracking-wide text-text-heading">
              1. Information We Collect
            </h2>
            <p>
              When a visitor submits a free trial request, the form collects basic contact fields: full name, phone number, selected training program, visit date, and optional notes. An IP hash is generated temporarily for rate-limiting purposes to prevent spam.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-headline text-2xl uppercase tracking-wide text-text-heading">
              2. How Information Is Handled
            </h2>
            <p>
              Submitted data is validated using shared Zod schemas and inserted into a secured Postgres table with Row-Level Security enabled. A notification email is dispatched to the gym owner inbox via Resend.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-headline text-2xl uppercase tracking-wide text-text-heading">
              3. Cookies and Analytics
            </h2>
            <p>
              This website does not use tracking cookies, commercial ad trackers, or third-party pixel monitors. Client preferences such as reduced motion respect the visitor's operating system settings.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="font-headline text-2xl uppercase tracking-wide text-text-heading">
              4. Data Removal Requests
            </h2>
            <p>
              Test submissions in our demonstration database can be purged at any time. For questions regarding data handling or to request a record wipe, contact our project administrator.
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
