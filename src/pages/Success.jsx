import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { SectionReveal } from '../components/SectionReveal';
import { Icon } from '../components/Icon';

export function Success() {
  const location = useLocation();
  const submission = location.state?.submission;
  const reducedMotion = useReducedMotion();

  // If someone directly lands on /success without submitting, redirect to home
  if (!submission) {
    return <Navigate to="/" replace />;
  }

  // Format date as DD/MM/YYYY
  const formatDateString = (dateStr) => {
    if (!dateStr) return 'Scheduled Platform Slot';
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        return `${parts[2]}/${parts[1]}/${parts[0]}`;
      }
      const d = new Date(dateStr + 'T00:00:00');
      const dd = String(d.getDate()).padStart(2, '0');
      const mm = String(d.getMonth() + 1).padStart(2, '0');
      const yyyy = d.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    } catch {
      return dateStr;
    }
  };

  const ticketId = submission.ticketId || 'ID-TR-94820';

  return (
    <div className="w-full min-h-screen pt-20 pb-20 bg-surface-lowest text-text-heading">
      {/* Top Status Banner */}
      <section className="w-full bg-surface-card border-b border-border px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center gap-2 text-primary">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="tracking-widest font-bold">
              // DISPATCH STATUS: 200 OK // TRIAL ACCESS AUTHORIZED
            </span>
          </div>
          <div className="flex items-center gap-4 text-text-muted">
            <span>LEDGER SEC-04 // TICKET #{ticketId}</span>
            <span className="text-border">|</span>
            <span className="text-primary font-bold">TRANSMISSION CONFIRMED</span>
          </div>
        </div>
      </section>

      {/* Main Confirmation Hero */}
      <section className="w-full py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-6">
          {/* Security Clearance Pill with Animated SVG Checkmark */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="bg-primary text-text-inverse px-3 py-1 rounded-sm font-mono text-xs uppercase tracking-wider flex items-center gap-2 font-bold shadow-md">
              {/* Animated SVG Path Checkmark */}
              <svg className="w-4 h-4 text-text-inverse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                <motion.path
                  d="M4 12l5 5L20 6"
                  initial={{ pathLength: reducedMotion ? 1 : 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              </svg>
              <span>Security Clearance Level 01</span>
            </div>
            <span className="font-mono text-xs text-text-muted tracking-wider">
              // TIME CONFIRMED (IST)
            </span>
          </div>

          {/* Giant Display Headline */}
          <div>
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tighter text-text-heading leading-none">
              PLATFORM TRIAL <span className="text-primary">CONFIRMED.</span>
            </h1>
            <p className="font-body text-base sm:text-lg text-text-body max-w-3xl mt-3 leading-relaxed">
              Your 90-minute uninterrupted trial session is confirmed on the Sector 04 schedule. Confirmation details and your pass have been generated below.
            </p>
          </div>
        </div>
      </section>

      {/* Digital Lifter Access Pass Card */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <SectionReveal className="bg-surface-card border border-border rounded-sm p-6 sm:p-10 relative overflow-hidden shadow-2xl">
            {/* Watermark Background Accent */}
            <div className="absolute -right-10 -bottom-16 opacity-5 pointer-events-none select-none">
              <span className="font-display text-[16rem] tracking-tighter uppercase text-text-heading">
                SEC04
              </span>
            </div>

            {/* Pass Header Bar */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 bg-surface-lowest px-4 sm:px-6 py-4 rounded-sm border border-border mb-8">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-sm bg-primary text-text-inverse flex items-center justify-center font-bold">
                  <Icon name="key" className="text-2xl" />
                </div>
                <div className="flex flex-col">
                  <span className="font-headline text-2xl uppercase tracking-wide text-text-heading font-bold">
                    Sector 04 Digital Lifter Pass
                  </span>
                  <span className="font-mono text-xs text-text-muted tracking-widest mt-0.5">
                    VALID FOR PLATFORM ALLOCATION ONLY
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-3 font-mono text-xs">
                <span className="text-text-muted">PASS ID:</span>
                <span className="bg-surface-elevated px-3 py-1 text-primary font-bold tracking-widest border border-border rounded-sm">
                  {ticketId}
                </span>
              </div>
            </div>

            {/* 4 Details Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Col 1: Lifter Profile */}
              <div className="bg-surface-lowest p-5 rounded-sm border border-border flex flex-col justify-between">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
                    // ATHLETE PROFILE
                  </span>
                  <span className="font-headline text-2xl uppercase text-text-heading font-bold">
                    {submission.name}
                  </span>
                  <span className="font-mono text-xs text-primary uppercase">
                    Program: {submission.program}
                  </span>
                </div>
                <div className="mt-4 pt-3 border-t border-border font-mono text-xs text-text-body flex items-center gap-2">
                  <Icon name="perm_phone_msg" className="text-sm text-primary" />
                  <span>{submission.phone}</span>
                </div>
              </div>

              {/* Col 2: Time & Window */}
              <div className="bg-surface-lowest p-5 rounded-sm border border-border flex flex-col justify-between">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
                    // TIME & WINDOW
                  </span>
                  <span className="font-headline text-xl uppercase text-text-heading leading-snug font-bold">
                    {formatDateString(submission.preferred_date)}
                  </span>
                  <span className="font-mono text-xs text-primary font-bold">
                    08:30 – 10:00 (90 MIN)
                  </span>
                </div>
                <div className="mt-4 pt-3 border-t border-border font-mono text-xs text-text-muted flex items-center gap-2">
                  <Icon name="schedule" className="text-sm text-primary" />
                  <span>Platform Gate Closes 08:35</span>
                </div>
              </div>

              {/* Col 3: Platform Allocation */}
              <div className="bg-surface-lowest p-5 rounded-sm border border-border flex flex-col justify-between">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
                    // PLATFORM ALLOCATION
                  </span>
                  <span className="font-headline text-xl uppercase text-text-heading font-bold">
                    Competition Rack #04
                  </span>
                  <span className="font-body text-xs text-text-muted">
                    Precision Steel Plates (demo)
                  </span>
                </div>
                <div className="mt-4 pt-3 border-t border-border font-mono text-xs text-text-body flex items-center gap-2">
                  <Icon name="fitness_center" className="text-sm text-primary" />
                  <span>29mm Power Bar</span>
                </div>
              </div>

              {/* Col 4: Assigned Coach & Locker */}
              <div className="bg-surface-lowest p-5 rounded-sm border border-border flex flex-col justify-between">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-xs text-text-muted uppercase tracking-wider">
                    // ASSIGNED COACH
                  </span>
                  <span className="font-headline text-xl uppercase text-text-heading font-bold">
                    {submission.trainer || 'Marcus Vance'}
                  </span>
                  <span className="font-body text-xs text-primary">
                    Head Strength Coach
                  </span>
                </div>
                <div className="mt-4 pt-3 border-t border-border font-mono text-xs text-text-muted flex items-center gap-2">
                  <Icon name="lock" className="text-sm text-primary" />
                  <span>Day Locker Bay 18 Reserved</span>
                </div>
              </div>
            </div>

            {/* Pass Footer Bar with Inline Stylized SVG Barcode */}
            <div className="mt-8 pt-6 flex flex-col lg:flex-row items-center justify-between gap-6 bg-surface-lowest px-6 py-4 rounded-sm border border-border">
              <div className="flex flex-col gap-1 w-full lg:w-auto text-left">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-primary rounded-full"></span>
                  <span className="font-mono text-xs text-text-heading uppercase font-bold tracking-widest">
                    ENCRYPTED CREDENTIAL MATRIX
                  </span>
                </div>
                <span className="font-body text-xs text-text-muted">
                  Present this digital confirmation pass at the reception desk upon arrival.
                </span>
              </div>

              {/* Stylized Inline SVG Barcode */}
              <div className="flex items-center gap-4 bg-[#0A0A0A] px-4 py-2 border border-border rounded-sm w-full lg:w-auto justify-center">
                <svg
                  className="h-10 w-48 text-text-heading"
                  preserveAspectRatio="none"
                  viewBox="0 0 200 40"
                  aria-hidden="true"
                >
                  <rect fill="currentColor" height="40" width="3" x="0" />
                  <rect fill="currentColor" height="40" width="1" x="5" />
                  <rect fill="currentColor" height="40" width="4" x="8" />
                  <rect fill="currentColor" height="40" width="2" x="15" />
                  <rect fill="currentColor" height="40" width="1" x="19" />
                  <rect fill="currentColor" height="40" width="5" x="23" />
                  <rect fill="currentColor" height="40" width="2" x="31" />
                  <rect fill="currentColor" height="40" width="2" x="35" />
                  <rect fill="currentColor" height="40" width="6" x="40" />
                  <rect fill="currentColor" height="40" width="1" x="49" />
                  <rect fill="currentColor" height="40" width="3" x="53" />
                  <rect fill="currentColor" height="40" width="4" x="59" />
                  <rect fill="currentColor" height="40" width="1" x="66" />
                  <rect fill="currentColor" height="40" width="2" x="70" />
                  <rect fill="currentColor" height="40" width="5" x="75" />
                  <rect fill="currentColor" height="40" width="3" x="83" />
                  <rect fill="currentColor" height="40" width="1" x="89" />
                  <rect fill="currentColor" height="40" width="4" x="93" />
                  <rect fill="currentColor" height="40" width="2" x="100" />
                  <rect fill="currentColor" height="40" width="3" x="105" />
                  <rect fill="currentColor" height="40" width="6" x="111" />
                  <rect fill="currentColor" height="40" width="1" x="120" />
                  <rect fill="currentColor" height="40" width="2" x="124" />
                  <rect fill="currentColor" height="40" width="4" x="129" />
                  <rect fill="currentColor" height="40" width="3" x="136" />
                  <rect fill="currentColor" height="40" width="1" x="142" />
                  <rect fill="currentColor" height="40" width="5" x="146" />
                  <rect fill="currentColor" height="40" width="2" x="154" />
                  <rect fill="currentColor" height="40" width="3" x="159" />
                  <rect fill="currentColor" height="40" width="6" x="165" />
                  <rect fill="currentColor" height="40" width="2" x="174" />
                  <rect fill="currentColor" height="40" width="1" x="179" />
                  <rect fill="currentColor" height="40" width="4" x="183" />
                  <rect fill="currentColor" height="40" width="2" x="190" />
                  <rect fill="currentColor" height="40" width="5" x="195" />
                </svg>
                <div className="flex flex-col font-mono text-[10px] text-text-muted text-right">
                  <span className="text-primary font-bold">AUTH: 04-OK</span>
                  <span>VER: 4.8.2</span>
                </div>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Directives & Action Bar */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-surface-card p-6 sm:p-8 rounded-sm border border-border">
          <div className="lg:col-span-8 flex flex-col gap-3">
            <span className="font-mono text-xs text-primary uppercase font-bold tracking-widest">
              // PRE-ARRIVAL DIRECTIVE
            </span>
            <h2 className="font-headline text-2xl sm:text-3xl uppercase text-text-heading">
              BUILT FOR UNCOMPROMISING LIFTERS. ZERO DISTRACTIONS.
            </h2>
            <p className="font-body text-xs sm:text-sm text-text-body">
              Sector 04 enforces quiet focus. No commercial sales pitches, no crowded queueing, and no compromise on equipment calibration. The floor is climate-controlled at 66°F with medical-grade air filtration and reinforced acoustic rubber under every platform.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2 font-mono text-xs">
              <div className="bg-surface-lowest p-3 rounded-sm border border-border">
                <span className="text-text-muted block text-[10px] uppercase">// SOUNDTRACK</span>
                <span className="text-text-heading uppercase font-bold">Industrial / Heavy</span>
              </div>
              <div className="bg-surface-lowest p-3 rounded-sm border border-border">
                <span className="text-text-muted block text-[10px] uppercase">// CHALK POLICY</span>
                <span className="text-primary uppercase font-bold">Liberal / Encouraged</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 flex flex-col gap-3">
            <Link
              to="/"
              className="w-full py-3.5 bg-primary text-text-inverse hover:bg-primary-hover font-headline text-lg uppercase tracking-wider rounded-sm text-center font-bold transition-all shadow-md"
            >
              Return to Sector 04 Hub
            </Link>
            <p className="font-mono text-[11px] text-text-muted text-center">
              A copy of this digital voucher has been recorded.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
