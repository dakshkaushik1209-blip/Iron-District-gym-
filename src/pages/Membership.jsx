import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SectionReveal } from '../components/SectionReveal';
import { PricingCard } from '../components/PricingCard';
import { FAQAccordion } from '../components/FAQAccordion';
import { Icon } from '../components/Icon';
import { plans, comparisonMatrix } from '../data/plans';

export function Membership() {
  const navigate = useNavigate();
  const location = useLocation();
  const activePlanId = location.hash ? location.hash.replace(/^#/, '') : null;

  const handleSelectPlan = (planId) => {
    navigate(`/contact?plan=${planId}#trial`);
  };

  return (
    <div className="w-full min-h-screen pt-24 pb-20">
      {/* Header & Admissions Overview */}
      <section className="w-full border-b border-border bg-surface-lowest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 flex flex-col gap-6">
          {/* Breadcrumb indicator */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-muted">
            <span className="w-2 h-2 rounded-full bg-primary"></span>
            <span className="text-primary font-bold">// ADMISSIONS & COMMITMENT</span>
            <span>/</span>
            <span>SECTOR 04 STRENGTH LAB</span>
            <span>/</span>
            <span>MEMBERSHIP TIERS</span>
          </div>

          {/* Headline & Subtitle */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-text-heading leading-none">
                MEMBERSHIP <span className="text-primary">TIERS.</span>
              </h1>
              <p className="font-body text-base sm:text-lg text-text-body max-w-2xl mt-2 leading-relaxed">
                Uncompromising barbell architecture with zero long-term entrapment. Choose your periodized commitment level.
              </p>
            </div>
            <div className="font-mono text-xs text-text-muted">
              * All memberships include 24/7 keycard access
            </div>
          </div>

          {/* Notice Banner */}
          <div className="p-3 bg-surface-card border border-border rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <Icon name="terminal" className="text-primary text-xl shrink-0" />
              <span className="font-mono text-xs text-text-body">
                <strong className="text-primary font-bold">// NOTICE: DEMO ENVIRONMENT</strong> // Prices, rates, and commitment terms displayed below are strictly illustrative for portfolio evaluation purposes.
              </span>
            </div>
            <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-surface-lowest rounded-sm border border-border font-mono text-[10px] uppercase text-text-muted">
              <span>DEMO PREVIEW // 3 TIERS AVAILABLE</span>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Cards Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-gutter items-stretch">
          {plans.map((plan, idx) => (
            <SectionReveal key={plan.id} delay={idx * 0.1} className="h-full">
              <PricingCard
                plan={plan}
                onSelectPlan={handleSelectPlan}
                isHighlighted={plan.id === activePlanId}
              />
            </SectionReveal>
          ))}
        </div>
      </section>

      {/* Comprehensive Platform Matrix Table */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-border">
        <SectionReveal className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4 pb-4 border-b border-border">
          <div>
            <span className="font-mono text-xs text-primary uppercase tracking-widest font-bold">
              // SPECIFICATIONS & PRIVILEGES
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl uppercase text-text-heading mt-1">
              PLATFORM MATRIX // COMPREHENSIVE TIER COMPARISON
            </h2>
            <p className="font-body text-sm text-text-body mt-1">
              A clear, granular breakdown of equipment access, recovery quarters, coaching audits, and facility privileges.
            </p>
          </div>
          <div className="font-mono text-xs text-text-muted uppercase">
            COMPETITION-GRADE EQUIPMENT
          </div>
        </SectionReveal>

        <SectionReveal delay={0.1}>
          <div className="w-full overflow-x-auto border border-border rounded-sm bg-surface-card">
            <table className="w-full text-left border-collapse min-w-[700px]">
              <thead>
                <tr className="border-b border-border bg-surface-elevated text-text-heading font-mono text-xs tracking-wider uppercase">
                  <th className="p-4 w-2/5">PRIVILEGE & SPECIFICATION</th>
                  <th className="p-4 text-center w-1/5">
                    MONTHLY<br />
                    <span className="text-text-muted font-normal">(₹3,999/mo)</span>
                  </th>
                  <th className="p-4 text-center w-1/5 bg-primary/10 text-primary font-bold border-x border-border">
                    QUARTERLY<br />
                    <span className="font-normal text-text-heading">(₹3,299/mo)</span>
                  </th>
                  <th className="p-4 text-center w-1/5">
                    ANNUAL<br />
                    <span className="text-text-muted font-normal">(₹2,749/mo)</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-body text-xs sm:text-sm">
                {comparisonMatrix.map((cat, cIdx) => (
                  <React.Fragment key={cIdx}>
                    <tr className="bg-surface-lowest">
                      <td
                        colSpan={4}
                        className="p-2.5 px-4 font-mono text-xs uppercase tracking-widest text-primary font-bold"
                      >
                        {cat.category}
                      </td>
                    </tr>
                    {cat.features.map((feat, fIdx) => (
                      <tr key={fIdx} className="hover:bg-surface-elevated/50 transition-colors">
                        <td className="p-4 text-text-heading font-medium">{feat.name}</td>
                        <td className="p-4 text-center">
                          {feat.monthly === 'Included' ? (
                            <Icon name="check" className="text-primary text-xl mx-auto" />
                          ) : (
                            <span className="font-mono text-xs text-text-muted">{feat.monthly}</span>
                          )}
                        </td>
                        <td className="p-4 text-center bg-primary/5 border-x border-border font-semibold">
                          {feat.quarterly === 'Included' ? (
                            <Icon name="check" className="text-primary text-xl mx-auto" />
                          ) : (
                            <span className="font-mono text-xs text-text-heading">{feat.quarterly}</span>
                          )}
                        </td>
                        <td className="p-4 text-center">
                          {feat.annual === 'Included' ? (
                            <Icon name="check" className="text-primary text-xl mx-auto" />
                          ) : (
                            <span className="font-mono text-xs text-primary font-bold">{feat.annual}</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </SectionReveal>
      </section>

      {/* Admissions Enquiry CTA Band */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionReveal className="bg-surface-card border-2 border-border p-6 sm:p-10 rounded-sm relative overflow-hidden">
          <div className="flex items-center justify-between mb-6 pb-3 border-b border-border">
            <span className="font-mono text-xs text-primary uppercase font-bold tracking-widest">
              // SEC-04 // ADMISSIONS DISPATCH
            </span>
            <span className="font-mono text-[10px] text-text-muted uppercase">
              AUTHENTICATED CHANNEL
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-6 flex flex-col gap-2">
              <h2 className="font-headline text-3xl sm:text-4xl uppercase text-text-heading leading-tight">
                READY TO JOIN THE RANKS? SUBMIT YOUR ADMISSIONS ENQUIRY.
              </h2>
              <p className="font-body text-sm sm:text-base text-text-body mt-2 leading-relaxed">
                Speak directly with our platform director to verify roster capacity, discuss training goals, or book your initial Day 1 trial session.
              </p>
              <div className="mt-4 p-3 bg-surface-lowest rounded-sm border border-border flex items-center gap-3">
                <Icon name="verified_user" className="text-primary text-xl" />
                <span className="font-mono text-xs text-text-body">
                  ACTIVE COMMUNITY OF DEDICATED LIFTERS
                </span>
              </div>
            </div>

            <div className="lg:col-span-6 flex flex-col gap-4">
              <button
                type="button"
                onClick={() => navigate('/contact#trial')}
                className="w-full py-4 bg-primary text-text-inverse hover:bg-primary-hover font-headline text-xl uppercase tracking-wider rounded-sm transition-all font-bold shadow-xl flex items-center justify-center gap-2"
              >
                <span>BOOK A FREE TRIAL SESSION</span>
                <Icon name="arrow_forward" className="text-2xl" />
              </button>

              <p className="font-mono text-xs text-text-muted text-center">
                Full 90-minute platform access // Waiver signed upon arrival
              </p>
            </div>
          </div>
        </SectionReveal>
      </section>

      {/* FAQ Section */}
      <section className="w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <SectionReveal className="mb-8">
          <div className="font-mono text-xs text-primary uppercase tracking-widest mb-1.5 font-bold">
            FAQ
          </div>
          <h2 className="font-headline text-3xl sm:text-4xl uppercase text-text-heading">
            Questions, answered.
          </h2>
          <p className="font-body text-sm text-text-body mt-1">
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
