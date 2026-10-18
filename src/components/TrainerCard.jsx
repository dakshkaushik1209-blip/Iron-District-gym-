import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { smoothScrollTo } from '../hooks/useLenis';

export function TrainerCard({ trainer, onBookSession }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleBookSession = (e) => {
    e.preventDefault();
    if (onBookSession) {
      onBookSession(trainer.name);
    }

    if (isHomePage) {
      smoothScrollTo('#trial', -80);
      window.history.pushState(null, '', `/?trainer=${encodeURIComponent(trainer.name)}#trial`);
      window.dispatchEvent(
        new CustomEvent('iron-district-trainer-selected', { detail: trainer.name })
      );
    } else {
      navigate(`/contact?trainer=${encodeURIComponent(trainer.name)}#trial`);
    }
  };

  return (
    <article
      aria-labelledby={`trainer-heading-${trainer.id}`}
      className="border border-border bg-surface-card flex flex-col justify-between group rounded-sm hover:border-primary/50 focus-within:border-primary transition-all duration-300"
    >
      <div>
        {/* Photo Container */}
        <div className="relative h-72 w-full overflow-hidden bg-surface-lowest border-b border-border">
          <img
            src={trainer.image}
            alt={trainer.alt}
            loading="lazy"
            width="600"
            height="600"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 filter grayscale-[20%]"
          />

          {/* Gradient backdrop */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-transparent to-transparent"></div>

          {/* Clear Demo Profile Badge */}
          <div className="absolute top-2 left-2 bg-[#0A0A0A]/90 px-space-xs py-0.5 border border-border font-mono text-[9px] text-text-muted uppercase tracking-widest">
            DEMO PROFILE // FICTIONAL
          </div>
        </div>

        {/* Content details */}
        <div className="p-space-md">
          <h3
            id={`trainer-heading-${trainer.id}`}
            className="font-headline text-2xl uppercase text-text-heading"
          >
            {trainer.name}
          </h3>
          <div className="font-mono text-xs text-text-muted uppercase tracking-wider mb-2">
            {trainer.title}
          </div>
          <p className="font-body text-xs sm:text-sm text-text-body line-clamp-2 mb-3">
            {trainer.bio}
          </p>

          <div className="grid grid-cols-2 gap-2 bg-surface-lowest p-2 rounded-sm text-center font-mono text-xs border border-border">
            <div className="flex flex-col">
              <span className="text-text-muted text-[10px]">TENURE</span>
              <span className="text-text-heading text-xs font-bold">{trainer.tenure}</span>
            </div>
            <div className="flex flex-col border-l border-border">
              <span className="text-text-muted text-[10px]">SPECIALTY</span>
              <span className="text-primary text-xs font-bold truncate px-1">{trainer.metricValue}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Action button */}
      <div className="p-space-md pt-0">
        <button
          type="button"
          onClick={handleBookSession}
          className="w-full py-2.5 inline-flex items-center justify-center border border-border font-headline text-base uppercase text-text-heading hover:border-primary hover:text-primary hover:bg-primary/5 active:scale-[0.99] transition-all rounded-sm font-bold focus-visible:outline-primary"
        >
          Book a session
        </button>
      </div>
    </article>
  );
}
