import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { smoothScrollTo } from '../hooks/useLenis';
import { Icon } from './Icon';

export function ProgramCard({ program, isFeatured = false, onSelectProgram }) {
  const navigate = useNavigate();
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  const handleAction = (e) => {
    e.preventDefault();
    if (onSelectProgram) {
      onSelectProgram(program.id);
    }

    if (isHomePage) {
      smoothScrollTo('#trial', -80);
      window.history.pushState(null, '', `/?program=${program.id}#trial`);
      window.dispatchEvent(
        new CustomEvent('iron-district-program-selected', { detail: program.id })
      );
    } else {
      navigate(`/?program=${program.id}#trial`);
    }
  };

  if (isFeatured) {
    return (
      <article
        aria-labelledby={`program-heading-${program.id}`}
        className="lg:col-span-2 relative border border-border bg-surface-card overflow-hidden group flex flex-col justify-between min-h-[420px] rounded-sm transition-colors duration-300 hover:border-primary/60"
      >
        {/* Background Image with Ken Burns / Zoom */}
        <div className="absolute inset-0 z-0 overflow-hidden">
          <img
            src={program.image}
            alt={program.alt}
            loading="lazy"
            width="1200"
            height="800"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale-[35%] brightness-50"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/60 to-transparent"></div>
        </div>

        {/* Top Header Badge */}
        <div className="relative z-10 p-space-lg flex justify-between items-start">
          <span className="px-space-sm py-space-xs bg-primary text-text-inverse font-mono text-xs uppercase font-bold tracking-wider rounded-sm">
            {program.badge}
          </span>
        </div>

        {/* Bottom Content Area */}
        <div className="relative z-10 p-space-lg">
          <h3
            id={`program-heading-${program.id}`}
            className="font-headline text-3xl sm:text-4xl uppercase text-text-heading tracking-tight mb-2 relative inline-block"
          >
            {program.title}
            <span className="block h-[2px] w-0 bg-primary group-hover:w-full transition-all duration-300"></span>
          </h3>
          <p className="font-body text-sm sm:text-base text-text-body max-w-xl mb-4 line-clamp-2">
            {program.description}
          </p>

          <button
            type="button"
            onClick={handleAction}
            className="inline-flex items-center gap-space-xs text-primary font-headline text-lg uppercase tracking-wide group-hover:text-primary-hover transition-colors focus-visible:outline-primary font-bold"
          >
            <span>Book a free trial</span>
            <Icon name="arrow_forward" size={18} className="group-hover:translate-x-1.5 transition-transform" />
          </button>
        </div>
      </article>
    );
  }

  return (
    <article
      aria-labelledby={`program-heading-${program.id}`}
      className="border border-border bg-surface-card flex flex-col justify-between p-space-lg group hover:border-primary/50 transition-colors duration-300 rounded-sm"
    >
      <div>
        <div className="relative h-44 w-full overflow-hidden mb-space-md border border-border bg-surface-lowest">
          <img
            src={program.image}
            alt={program.alt}
            loading="lazy"
            width="600"
            height="400"
            className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105 filter grayscale-[25%]"
          />
          <div className="absolute top-2 left-2 bg-[#0A0A0A]/90 px-space-xs py-0.5 border border-border font-mono text-[10px] text-text-muted uppercase">
            {program.badge}
          </div>
        </div>

        <h3
          id={`program-heading-${program.id}`}
          className="font-headline text-2xl uppercase text-text-heading mb-1.5 relative inline-block"
        >
          {program.title}
          <span className="block h-[2px] w-0 bg-primary group-hover:w-full transition-all duration-300"></span>
        </h3>
        <p className="font-body text-xs sm:text-sm text-text-body line-clamp-2 mb-space-md">
          {program.description}
        </p>
      </div>

      <button
        type="button"
        onClick={handleAction}
        className="inline-flex items-center gap-space-xs text-text-body group-hover:text-primary font-mono text-xs uppercase tracking-wider transition-colors self-start focus-visible:outline-primary font-bold"
      >
        <span>Book a free trial</span>
        <Icon name="arrow_forward" size={14} className="group-hover:translate-x-1 transition-transform" />
      </button>
    </article>
  );
}
