import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Hero } from '../components/Hero';
import { About } from '../components/About';
import { ProgramCard } from '../components/ProgramCard';
import { TrainerCard } from '../components/TrainerCard';
import { PricingCard } from '../components/PricingCard';
import { Gallery } from '../components/Gallery';
import { TrialForm } from '../components/TrialForm';
import { ContactInfo } from '../components/ContactInfo';
import { FAQAccordion } from '../components/FAQAccordion';
import { SectionReveal } from '../components/SectionReveal';
import { Icon } from '../components/Icon';
import { programs } from '../data/programs';
import { trainers } from '../data/trainers';
import { plans } from '../data/plans';
import { useScrollSpy } from '../hooks/useScrollSpy';

const HOME_SECTIONS = ['hero', 'about', 'programs', 'trainers', 'memberships', 'facility', 'trial', 'contact', 'faq'];

export function Home() {
  const [selectedProgram, setSelectedProgram] = useState('');
  const [selectedPlan, setSelectedPlan] = useState('');
  const [selectedTrainer, setSelectedTrainer] = useState('');

  // ScrollSpy tracks active section for navbar indicator
  useScrollSpy(HOME_SECTIONS, 100);

  return (
    <div className="flex flex-col w-full">
      {/* 1. Hero Section */}
      <Hero />

      {/* 2. Philosophy & About Section */}
      <About />

      {/* 3. Training Programs Section */}
      <section
        id="programs"
        aria-labelledby="programs-heading"
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-space-xl border-b border-border"
      >
        <SectionReveal className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl">
          <div>
            <div className="font-mono text-xs text-primary uppercase tracking-widest mb-1.5 font-bold">
              // 02. DISCIPLINES
            </div>
            <h2
              id="programs-heading"
              className="font-headline text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-text-heading"
            >
              Engineered for Measurable Progression.
            </h2>
          </div>
          <div className="font-mono text-xs text-text-muted mt-2 md:mt-0">
            STRENGTH // HYPERTROPHY // CONDITIONING
          </div>
        </SectionReveal>

        {/* Asymmetrical Grid: 1 Large Card + 4 Sub-Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {/* Featured Strength Training Card */}
          <SectionReveal className="lg:col-span-2">
            <ProgramCard
              program={programs[0]}
              isFeatured={true}
              onSelectProgram={setSelectedProgram}
            />
          </SectionReveal>

          {/* Sub Cards */}
          {programs.slice(1).map((prog, idx) => (
            <SectionReveal key={prog.id} delay={(idx + 1) * 0.1}>
              <ProgramCard
                program={prog}
                isFeatured={false}
                onSelectProgram={setSelectedProgram}
              />
            </SectionReveal>
          ))}
        </div>

        {/* View All Programs Action */}
        <div className="mt-space-lg flex justify-center">
          <Link
            to="/programs"
            className="inline-flex items-center gap-2 border border-border bg-surface-card hover:border-primary text-text-heading hover:text-primary font-headline text-base uppercase font-bold px-6 py-3 tracking-wider transition-colors rounded-sm shadow-sm"
          >
            <span>View All Programs</span>
            <Icon name="arrow_forward" size={18} />
          </Link>
        </div>
      </section>

      {/* 4. Coaching Faculty / Trainers Section */}
      <section
        id="trainers"
        aria-labelledby="trainers-heading"
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-space-xl border-b border-border"
      >
        <SectionReveal className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg">
          <div>
            <div className="font-mono text-xs text-primary uppercase tracking-widest mb-1.5 font-bold">
              // 03. COACHING STAFF
            </div>
            <h2
              id="trainers-heading"
              className="font-headline text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-text-heading"
            >
              Coached by Experienced Coaches.
            </h2>
          </div>
          <div className="font-mono text-xs text-text-muted">
            * Demo profiles. Fictional coaches.
          </div>
        </SectionReveal>

        {/* 4-Column Trainer Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
          {trainers.slice(0, 4).map((trainer, idx) => (
            <SectionReveal key={trainer.id} delay={idx * 0.08}>
              <TrainerCard
                trainer={trainer}
                onBookSession={setSelectedTrainer}
              />
            </SectionReveal>
          ))}
        </div>

        {/* Meet All Coaches Action */}
        <div className="mt-space-lg flex justify-center">
          <Link
            to="/trainers"
            className="inline-flex items-center gap-2 border border-border bg-surface-card hover:border-primary text-text-heading hover:text-primary font-headline text-base uppercase font-bold px-6 py-3 tracking-wider transition-colors rounded-sm shadow-sm"
          >
            <span>Meet All Coaches</span>
            <Icon name="arrow_forward" size={18} />
          </Link>
        </div>
      </section>

      {/* 5. Memberships Section */}
      <section
        id="memberships"
        aria-labelledby="memberships-heading"
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-space-xl border-b border-border"
      >
        <SectionReveal className="flex flex-col md:flex-row md:items-end justify-between mb-space-lg">
          <div>
            <div className="font-mono text-xs text-primary uppercase tracking-widest mb-1.5 font-bold">
              // 04. COMMITMENT
            </div>
            <h2
              id="memberships-heading"
              className="font-headline text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-text-heading"
            >
              Simple, Transparent, Uncompromising.
            </h2>
          </div>
          <div className="font-mono text-xs text-text-muted mt-2 md:mt-0">
            * All tiers include full facility access
          </div>
        </SectionReveal>

        <div className="font-mono text-xs text-text-muted mb-space-lg">
          * Prices are illustrative demo rates with zero hidden maintenance fees.
        </div>

        {/* 3 Pricing Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter items-stretch">
          {plans.map((plan, idx) => (
            <SectionReveal key={plan.id} delay={idx * 0.1}>
              <PricingCard
                plan={plan}
                onSelectPlan={setSelectedPlan}
              />
            </SectionReveal>
          ))}
        </div>

        {/* Compare All Plans Action */}
        <div className="mt-space-lg flex justify-center">
          <Link
            to="/membership"
            className="inline-flex items-center gap-2 border border-border bg-surface-card hover:border-primary text-text-heading hover:text-primary font-headline text-base uppercase font-bold px-6 py-3 tracking-wider transition-colors rounded-sm shadow-sm"
          >
            <span>Compare All Plans & Full Matrix</span>
            <Icon name="arrow_forward" size={18} />
          </Link>
        </div>
      </section>

      {/* 6. Facilities Gallery Bento Section */}
      <section
        id="facility"
        aria-labelledby="gallery-heading"
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-space-xl border-b border-border"
      >
        <SectionReveal className="flex flex-col md:flex-row md:items-end justify-between mb-space-xl">
          <div>
            <div className="font-mono text-xs text-primary uppercase tracking-widest mb-1.5 font-bold">
              // 05. THE FACILITY
            </div>
            <h2
              id="gallery-heading"
              className="font-headline text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-text-heading"
            >
              Designed for Unbroken Focus.
            </h2>
          </div>
          <div className="font-mono text-xs text-text-muted">
            SECTOR 4 INDUSTRIAL CAMPUS // 14,000 SQ FT
          </div>
        </SectionReveal>

        <Gallery />
      </section>

      {/* 7. Free Trial Booking Section */}
      <section
        id="trial"
        aria-labelledby="trial-heading"
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-space-xl border-b border-border"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-start">
          {/* Left Context Column */}
          <SectionReveal className="lg:col-span-5 flex flex-col justify-center">
            <div className="font-mono text-xs text-primary uppercase tracking-widest mb-1.5 font-bold">
              // 06. INITIATION
            </div>
            <h2
              id="trial-heading"
              className="font-headline text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-text-heading mb-4 leading-tight"
            >
              Test Your Limits. Claim Your First Session.
            </h2>
            <p className="font-body text-sm sm:text-base text-text-body mb-6 leading-relaxed">
              Experience the facility, test our competition equipment, and meet our coaching staff. No sales pressure, no hidden commitments.
            </p>

            {/* Perks Checklist */}
            <div className="flex flex-col gap-4 mb-6">
              <div className="flex items-start gap-3">
                <Icon name="verified" className="text-primary text-xl mt-0.5 shrink-0" />
                <div>
                  <div className="font-headline text-lg uppercase text-text-heading font-bold">
                    Complimentary Equipment Access
                  </div>
                  <div className="font-body text-xs sm:text-sm text-text-body">
                    Full access to platforms, specialty bars, and warm-up areas.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Icon name="lock" className="text-primary text-xl mt-0.5 shrink-0" />
                <div>
                  <div className="font-headline text-lg uppercase text-text-heading font-bold">
                    Dedicated Guest Locker
                  </div>
                  <div className="font-body text-xs sm:text-sm text-text-body">
                    Complimentary day locker, towels, and private recovery facilities.
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Icon name="support_agent" className="text-primary text-xl mt-0.5 shrink-0" />
                <div>
                  <div className="font-headline text-lg uppercase text-text-heading font-bold">
                    15-Minute Coach Debrief
                  </div>
                  <div className="font-body text-xs sm:text-sm text-text-body">
                    Optional technique consultation with one of our staff coaches.
                  </div>
                </div>
              </div>
            </div>

            <div className="p-3 bg-surface-card border border-border font-mono text-xs text-text-muted rounded-sm">
              * Advance booking recommended for reserved platform time.
            </div>
          </SectionReveal>

          {/* Right Column: Live Free Trial Form */}
          <SectionReveal delay={0.15} className="lg:col-span-7">
            <TrialForm
              initialProgram={selectedProgram}
              initialPlan={selectedPlan}
              initialTrainer={selectedTrainer}
            />
          </SectionReveal>
        </div>
      </section>

      {/* 8. Contact & Location Section */}
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-space-xl border-b border-border"
      >
        <ContactInfo />

        {/* Direct Dispatch & Full Contact Terminal Action */}
        <div className="mt-space-lg flex justify-center">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 border border-border bg-surface-card hover:border-primary text-text-heading hover:text-primary font-headline text-base uppercase font-bold px-6 py-3 tracking-wider transition-colors rounded-sm shadow-sm"
          >
            <span>Full Contact & Dispatch Terminal</span>
            <Icon name="arrow_forward" size={18} />
          </Link>
        </div>
      </section>

      {/* 9. Frequently Enquired Questions (FAQ) */}
      <section
        id="faq"
        aria-labelledby="faq-heading"
        className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-space-xl"
      >
        <SectionReveal className="text-center md:text-left mb-8">
          <div className="font-mono text-xs text-primary uppercase tracking-widest mb-1.5 font-bold">
            FAQ
          </div>
          <h2
            id="faq-heading"
            className="font-headline text-3xl sm:text-4xl uppercase tracking-tight text-text-heading"
          >
            Questions, answered.
          </h2>
          <p className="font-body text-sm sm:text-base text-text-body mt-1">
            Everything you need to know about booking a free session, joining, cancelling and pausing.
          </p>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <FAQAccordion />
        </SectionReveal>
      </section>
    </div>
  );
}
