import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { SectionReveal } from '../components/SectionReveal';
import { Icon } from '../components/Icon';
import { programs } from '../data/programs';
import { WhatsAppButton } from '../components/WhatsAppButton';

// Format phone number to +91 XXXXX XXXXX
function formatIndianPhone(phoneStr) {
  if (!phoneStr) return '';
  const digits = String(phoneStr).replace(/\D/g, '');
  let tenDigits = digits;
  if (digits.length === 12 && digits.startsWith('91')) {
    tenDigits = digits.slice(2);
  } else if (digits.length > 10) {
    tenDigits = digits.slice(-10);
  }
  if (tenDigits.length === 10) {
    return `+91 ${tenDigits.slice(0, 5)} ${tenDigits.slice(5)}`;
  }
  return phoneStr;
}

// Format date string to "12 Oct 2026"
function formatDisplayDate(dateStr) {
  if (!dateStr) return '';
  try {
    const parts = String(dateStr).split('-');
    if (parts.length === 3) {
      const year = parts[0];
      const monthIdx = parseInt(parts[1], 10) - 1;
      const day = parseInt(parts[2], 10);
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      if (monthIdx >= 0 && monthIdx < 12 && !isNaN(day)) {
        return `${day} ${months[monthIdx]} ${year}`;
      }
    }
    const d = new Date(dateStr);
    if (!isNaN(d.getTime())) {
      const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
      return `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
    }
    return dateStr;
  } catch {
    return dateStr;
  }
}

// Look up program display name from programs.js
function getProgramDisplayName(programVal) {
  if (!programVal) return '';
  const found = programs.find(
    (p) =>
      p.id === programVal ||
      p.slug === programVal ||
      p.shortId === programVal ||
      p.aliases?.includes(programVal) ||
      p.title.toLowerCase() === String(programVal).toLowerCase()
  );
  return found ? found.title : programVal;
}

const PLAN_LABELS = {
  monthly: 'Monthly Membership',
  quarterly: 'Quarterly Membership',
  annual: 'Annual Membership',
};

export function Success() {
  const location = useLocation();
  const submission = location.state?.submission;
  const reducedMotion = useReducedMotion();

  // If user opens /success directly without a submission, redirect to the home page
  if (!submission || !submission.name) {
    return <Navigate to="/" replace />;
  }

  const firstName = submission.name ? submission.name.trim().split(/\s+/)[0] : 'there';
  const formattedPhone = formatIndianPhone(submission.phone);
  const formattedDate = formatDisplayDate(submission.preferred_date);
  const programDisplayName = getProgramDisplayName(submission.program);
  const planDisplayName = submission.plan ? (PLAN_LABELS[submission.plan] || submission.plan) : null;

  // Show the reference ID only if it comes from the saved record returned by the API
  const rawId = submission.referenceId || submission.id || null;
  const referenceId =
    rawId && rawId !== 'ID-TR-94820'
      ? String(rawId).replace(/^ID-TR-/, '').slice(0, 8)
      : null;

  return (
    <div className="w-full min-h-screen pt-20 pb-20 bg-surface-lowest text-text-heading">
      {/* Top Status Strip */}
      <section className="w-full bg-surface-card border-b border-border px-4 sm:px-6 lg:px-8 py-3">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center gap-2 text-primary">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            <span className="tracking-widest font-bold">
              // FREE TRIAL REQUEST RECEIVED
            </span>
          </div>
          {referenceId && (
            <div className="flex items-center gap-2 text-text-muted">
              <span>REFERENCE ID:</span>
              <span className="bg-surface-elevated px-2.5 py-0.5 text-primary font-bold tracking-widest border border-border rounded-sm">
                {referenceId}
              </span>
            </div>
          )}
        </div>
      </section>

      {/* Main Confirmation Hero */}
      <section className="w-full py-10 sm:py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col gap-5">
          {/* Status Badge with Animated SVG Checkmark */}
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-primary text-text-inverse flex items-center justify-center font-bold shadow-md">
              <svg
                className="w-5 h-5 text-text-inverse"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="3"
                aria-hidden="true"
              >
                <motion.path
                  d="M4 12l5 5L20 6"
                  initial={{ pathLength: reducedMotion ? 1 : 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 0.6, ease: 'easeOut' }}
                />
              </svg>
            </div>
            <span className="font-mono text-xs text-primary uppercase font-bold tracking-wider">
              Request Logged
            </span>
          </div>

          {/* Display Headline */}
          <div>
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tighter text-text-heading leading-none">
              Request <span className="text-primary">received</span>
            </h1>
            <p className="font-body text-base sm:text-lg text-text-body max-w-3xl mt-3 leading-relaxed">
              Thanks, {firstName}. We have received your free-trial request. Our team will contact you on WhatsApp or phone to confirm your session time.
            </p>
            <p className="font-mono text-xs text-text-muted mt-2 tracking-wider">
              (Demo site: no real booking is made)
            </p>
          </div>
        </div>
      </section>

      {/* Submitted Information Card */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pb-12">
        <div className="max-w-7xl mx-auto">
          <SectionReveal className="bg-surface-card border border-border rounded-sm p-6 sm:p-10 shadow-xl">
            {/* Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-6 border-b border-border mb-6">
              <div className="flex items-center gap-3">
                <span className="w-2.5 h-2.5 bg-primary rounded-full"></span>
                <h2 className="font-headline text-xl uppercase tracking-wide text-text-heading font-bold">
                  Submitted Request Details
                </h2>
              </div>
              {referenceId && (
                <div className="font-mono text-xs text-text-muted">
                  Reference ID: <span className="text-primary font-bold tracking-wider">{referenceId}</span>
                </div>
              )}
            </div>

            {/* Submitted Data Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Name */}
              <div className="bg-surface-lowest p-5 rounded-sm border border-border flex flex-col justify-between">
                <span className="font-mono text-xs text-text-muted uppercase tracking-wider mb-2">
                  // NAME
                </span>
                <span className="font-headline text-xl uppercase text-text-heading font-bold break-words">
                  {submission.name}
                </span>
              </div>

              {/* Phone */}
              <div className="bg-surface-lowest p-5 rounded-sm border border-border flex flex-col justify-between">
                <span className="font-mono text-xs text-text-muted uppercase tracking-wider mb-2">
                  // PHONE
                </span>
                <span className="font-mono text-lg text-text-heading font-bold">
                  {formattedPhone}
                </span>
              </div>

              {/* Program */}
              <div className="bg-surface-lowest p-5 rounded-sm border border-border flex flex-col justify-between">
                <span className="font-mono text-xs text-text-muted uppercase tracking-wider mb-2">
                  // PROGRAM
                </span>
                <span className="font-headline text-xl uppercase text-primary font-bold">
                  {programDisplayName}
                </span>
              </div>

              {/* Preferred Date */}
              <div className="bg-surface-lowest p-5 rounded-sm border border-border flex flex-col justify-between">
                <span className="font-mono text-xs text-text-muted uppercase tracking-wider mb-2">
                  // PREFERRED DATE
                </span>
                <span className="font-headline text-xl uppercase text-text-heading font-bold">
                  {formattedDate}
                </span>
              </div>

              {/* Plan (if provided) */}
              {planDisplayName && (
                <div className="bg-surface-lowest p-5 rounded-sm border border-border flex flex-col justify-between">
                  <span className="font-mono text-xs text-text-muted uppercase tracking-wider mb-2">
                    // PLAN
                  </span>
                  <span className="font-headline text-lg uppercase text-text-heading font-bold">
                    {planDisplayName}
                  </span>
                </div>
              )}

              {/* Trainer (if provided) */}
              {submission.trainer && (
                <div className="bg-surface-lowest p-5 rounded-sm border border-border flex flex-col justify-between">
                  <span className="font-mono text-xs text-text-muted uppercase tracking-wider mb-2">
                    // TRAINER
                  </span>
                  <span className="font-headline text-lg uppercase text-text-heading font-bold">
                    {submission.trainer}
                  </span>
                </div>
              )}
            </div>

            {/* What Happens Next Section */}
            <div className="mt-8 pt-8 border-t border-border">
              <div className="flex items-center gap-2 mb-6">
                <span className="w-2 h-2 rounded-full bg-primary"></span>
                <h3 className="font-headline text-lg uppercase tracking-wider text-text-heading font-bold">
                  What happens next
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-surface-lowest p-5 rounded-sm border border-border flex flex-col gap-2">
                  <span className="font-mono text-xs text-primary font-bold tracking-wider">01 // STEP 1</span>
                  <p className="font-body text-sm sm:text-base text-text-body">
                    We review your request.
                  </p>
                </div>

                <div className="bg-surface-lowest p-5 rounded-sm border border-border flex flex-col gap-2">
                  <span className="font-mono text-xs text-primary font-bold tracking-wider">02 // STEP 2</span>
                  <p className="font-body text-sm sm:text-base text-text-body">
                    We contact you to confirm the time.
                  </p>
                </div>

                <div className="bg-surface-lowest p-5 rounded-sm border border-border flex flex-col gap-2">
                  <span className="font-mono text-xs text-primary font-bold tracking-wider">03 // STEP 3</span>
                  <p className="font-body text-sm sm:text-base text-text-body">
                    Bring training clothes, a water bottle and photo ID.
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 pt-8 border-t border-border flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
              <Link
                to="/"
                className="inline-flex items-center justify-center gap-2 border border-border bg-surface-lowest hover:border-primary text-text-heading hover:text-primary font-headline text-base uppercase font-bold px-6 py-3.5 tracking-wider transition-colors rounded-sm shadow-sm"
              >
                <Icon name="arrow_back" size={18} />
                <span>Back to home</span>
              </Link>

              <WhatsAppButton
                variant="inline"
                program={programDisplayName}
                className="w-full sm:w-auto"
              />
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
