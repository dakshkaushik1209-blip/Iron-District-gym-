import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate, useLocation } from 'react-router-dom';
import { smoothScrollTo } from '../hooks/useLenis';
import { Icon } from './Icon';

export function PricingCard({ plan, onSelectPlan, isHighlighted }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleEnquire = (e) => {
    e.preventDefault();
    if (onSelectPlan) {
      onSelectPlan(plan.id);
    }

    if (isHomePage) {
      smoothScrollTo('#trial', -80);
      window.history.pushState(null, '', `/?plan=${plan.id}#trial`);
      window.dispatchEvent(
        new CustomEvent('iron-district-plan-selected', { detail: plan.id })
      );
    } else {
      navigate(`/?plan=${plan.id}#trial`);
    }
  };

  return (
    <article
      id={plan.id}
      aria-labelledby={`pricing-heading-${plan.id}`}
      className={`relative flex flex-col justify-between p-space-lg rounded-sm transition-all duration-300 group hover:-translate-y-1 h-full scroll-mt-28 ${
        plan.isRecommended
          ? 'border-2 border-primary bg-surface-container shadow-2xl z-10'
          : 'border border-border bg-surface-card hover:border-text-muted/60'
      } ${
        isHighlighted
          ? 'ring-2 ring-primary ring-offset-2 ring-offset-[#0A0A0A] shadow-[0_0_25px_rgba(230,57,70,0.35)] !border-primary'
          : ''
      }`}
    >
      {/* Subtle border sweep animation for recommended card (runs once on mount) */}
      {plan.isRecommended && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.6, 0] }}
          transition={{ duration: 1.2, times: [0, 0.5, 1], ease: 'easeOut' }}
          className="absolute -inset-[2px] rounded-sm border-2 border-primary-dim pointer-events-none"
        />
      )}

      {/* Recommended Top Badge */}
      {plan.isRecommended && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-primary text-text-inverse font-mono text-[10px] sm:text-[11px] font-bold uppercase tracking-widest px-3 py-1 rounded-sm whitespace-nowrap shadow-md">
          {plan.badge || 'RECOMMENDED'}
        </div>
      )}

      <div>
        {/* Tier Header */}
        <div className="flex items-center justify-between pb-space-sm border-b border-border/80">
          <span className="font-mono text-xs uppercase tracking-widest text-text-muted">
            {plan.tier}
          </span>
          <div className="flex items-center gap-1.5">
            {plan.savingsBadge && (
              <span className="font-mono text-[10px] px-2 py-0.5 rounded-sm font-bold uppercase bg-primary text-text-inverse">
                {plan.savingsBadge}
              </span>
            )}
            {plan.subtitle && (
              <span
                className={`font-mono text-[11px] px-2 py-0.5 rounded-sm font-semibold uppercase ${
                  plan.isRecommended
                    ? 'bg-primary/20 text-primary'
                    : 'bg-surface-interactive text-text-body'
                }`}
              >
                {plan.subtitle}
              </span>
            )}
          </div>
        </div>

        <h3
          id={`pricing-heading-${plan.id}`}
          className="font-headline text-2xl sm:text-3xl text-text-heading uppercase mt-3 tracking-tight"
        >
          {plan.name}
        </h3>

        {/* Price Display in INR */}
        <div className="my-4 flex items-baseline gap-1.5 overflow-hidden">
          <span className="font-display text-4xl sm:text-5xl text-text-heading font-extrabold leading-none">
            ₹{plan.price.toLocaleString('en-IN')}
          </span>
          <div className="flex flex-col leading-none">
            <span className="font-mono text-xs text-text-body font-bold">/ MONTH</span>
            <span className="font-mono text-[10px] text-text-muted mt-0.5 uppercase">
              {plan.billingDetail}
            </span>
          </div>
        </div>

        <p className="font-body text-xs sm:text-sm text-text-body mb-4">
          {plan.description}
        </p>

        {/* Commitment Status note */}
        <div className="p-2.5 bg-surface-lowest border border-border/60 rounded-sm mb-6 text-left">
          <span className="font-mono text-[10px] text-text-muted block mb-0.5 uppercase tracking-wider">
            // COMMITMENT TERMS:
          </span>
          <span className="font-body text-xs text-text-heading">
            {plan.contractNote}
          </span>
        </div>

        {/* Features Checklist */}
        <ul className="flex flex-col gap-2.5 font-body text-xs sm:text-sm text-text-body mb-6">
          {plan.perks.map((perk, index) => (
            <li
              key={index}
              className={`flex items-start gap-2 ${
                !perk.included ? 'text-text-muted opacity-60' : ''
              }`}
            >
              <Icon
                name={perk.included ? 'check' : 'close'}
                size={16}
                className={`mt-0.5 ${perk.included ? 'text-primary' : 'text-text-muted'}`}
              />
              <span className={perk.highlight ? 'text-text-heading font-semibold' : ''}>
                {perk.text}
              </span>
            </li>
          ))}
        </ul>
      </div>

      {/* Enquire Now CTA */}
      <div className="pt-4 border-t border-border/80">
        <button
          type="button"
          onClick={handleEnquire}
          className={`w-full py-2.5 inline-flex items-center justify-center font-headline text-base uppercase tracking-wider rounded-sm transition-all font-bold focus-visible:outline-primary ${
            plan.isRecommended
              ? 'bg-primary text-text-inverse hover:bg-primary-hover active:scale-[0.99] shadow-md'
              : 'border border-border text-text-heading hover:border-primary hover:text-primary hover:bg-primary/5 active:scale-[0.99]'
          }`}
        >
          Enquire now →
        </button>
      </div>
    </article>
  );
}
