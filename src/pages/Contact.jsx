import React from 'react';
import { SectionReveal } from '../components/SectionReveal';
import { ContactInfo } from '../components/ContactInfo';
import { TrialForm } from '../components/TrialForm';
import { Icon } from '../components/Icon';

export function Contact() {
  return (
    <div className="w-full min-h-screen pt-24 pb-20">
      {/* Header Banner */}
      <section className="w-full border-b border-border bg-surface-lowest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 flex flex-col gap-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-card border border-border rounded-sm">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span className="font-mono text-xs text-text-heading uppercase tracking-widest font-bold">
                // SECTOR 04 COMMUNICATIONS // DIRECT DISPATCH
              </span>
            </div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-surface-elevated rounded-sm font-mono text-xs text-text-muted">
              // PORTFOLIO DEMO BRAND // Coordinates & logs illustrative
            </div>
          </div>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-3xl">
              <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tighter text-text-heading leading-none">
                CONTACT <span className="text-primary">// SEC-04.</span>
              </h1>
              <p className="font-body text-base sm:text-lg text-text-body mt-2 leading-relaxed">
                Connect directly with platform coordinators, secure your complimentary 90-minute trial lift, or locate our physical strength lab in the Industrial Quarter. Zero sales pressure. Built on uncompromising discipline.
              </p>
            </div>

            <div className="flex items-center gap-4 p-3 bg-surface-card border border-border rounded-sm self-start md:self-auto">
              <div className="flex flex-col">
                <span className="font-mono text-[10px] text-text-muted uppercase">FACILITY ACCESS</span>
                <span className="font-headline text-base uppercase text-text-heading font-bold">OPEN FOR TRIAL VISITS</span>
              </div>
              <Icon name="radar" className="text-primary text-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Main Split Section: Booking Terminal + Coordinates */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Left Column: Trial Booking Terminal (7 cols) */}
          <SectionReveal className="lg:col-span-7 flex flex-col gap-6">
            <div className="border border-border bg-surface-card p-6 sm:p-8 rounded-sm">
              <div className="mb-6">
                <span className="font-mono text-xs text-primary uppercase tracking-widest font-bold block mb-1">
                  // DISPATCH SPECIFICATION // SEC-04 REGISTRATION
                </span>
                <h2 className="font-headline text-3xl uppercase text-text-heading">
                  TEST THE PLATFORM. BOOK A FREE TRIAL.
                </h2>
                <p className="font-body text-xs sm:text-sm text-text-body mt-1">
                  Reserve an uninterrupted 90-minute trial session on our competition platforms. Full access to competition-grade barbells and plates, recovery quarters, and an optional 15-minute coach introduction.
                </p>
              </div>

              <TrialForm />
            </div>
          </SectionReveal>

          {/* Right Column: Physical Coordinates & Quick Map (5 cols) */}
          <SectionReveal delay={0.15} className="lg:col-span-5 flex flex-col gap-6">
            <ContactInfo />
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
