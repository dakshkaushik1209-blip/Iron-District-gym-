import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SectionReveal } from '../components/SectionReveal';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { Icon } from '../components/Icon';
import { trainers } from '../data/trainers';

const DISCIPLINES = [
  { id: 'all', label: '[ ALL DISCIPLINES ]' },
  { id: 'powerlifting', label: 'POWERLIFTING & SBD' },
  { id: 'weightlifting', label: 'OLYMPIC WEIGHTLIFTING' },
  { id: 'hypertrophy', label: 'HYPERTROPHY & COMPOSITION' },
  { id: 'tactical', label: 'TACTICAL CONDITIONING' },
  { id: 'biomechanics', label: 'REHAB & MOVEMENT MECHANICS' },
];

export function Trainers() {
  const [activeDiscipline, setActiveDiscipline] = useState('all');
  const navigate = useNavigate();

  const filteredTrainers =
    activeDiscipline === 'all'
      ? trainers
      : trainers.filter((t) => t.discipline === activeDiscipline);

  const handleBookSession = (trainerName) => {
    navigate(`/?trainer=${encodeURIComponent(trainerName)}#trial`);
  };

  return (
    <div className="w-full min-h-screen pt-24 pb-20">
      {/* Header & Specialty Selector */}
      <section className="w-full border-b border-border bg-surface-lowest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 flex flex-col gap-6">
          {/* Breadcrumb Ribbon */}
          <div className="flex flex-wrap items-center gap-2 font-mono text-xs uppercase tracking-widest text-text-muted">
            <span className="text-primary font-bold">// COACHING STAFF</span>
            <span>//</span>
            <span>SECTOR 04 STRENGTH LAB</span>
            <div className="flex items-center gap-1.5 px-2.5 py-0.5 bg-surface-card border border-border text-text-body text-[11px] ml-auto sm:ml-0 rounded-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-primary inline-block"></span>
              <span>FACULTY: ACCREDITED COACHING STAFF</span>
            </div>
          </div>

          {/* Headline & Description */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
            <div className="lg:col-span-8 flex flex-col gap-1">
              <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-text-heading leading-none">
                <span className="text-primary">COACHING</span> FACULTY.
              </h1>
              <p className="font-headline text-lg sm:text-xl uppercase tracking-wider text-text-body mt-2">
                NO GENERALISTS. NO COMMISSIONS. UNCOMPROMISING BARBELL ARCHITECTURE.
              </p>
            </div>
            <div className="lg:col-span-4 bg-surface-card p-4 rounded-sm border-l-2 border-primary">
              <p className="font-body text-xs sm:text-sm text-text-body leading-relaxed">
                Every coach at Iron District is an experienced coach and strength specialist. We focus on structured progression, proper lifting mechanics, and member accountability.
              </p>
            </div>
          </div>

          {/* Discipline Filter Buttons */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-border" role="group" aria-label="Trainer specialties">
            {DISCIPLINES.map((disc) => (
              <button
                key={disc.id}
                type="button"
                onClick={() => setActiveDiscipline(disc.id)}
                className={`px-3 py-1.5 font-headline text-sm uppercase tracking-wider rounded-sm transition-colors ${
                  activeDiscipline === disc.id
                    ? 'bg-primary text-text-inverse font-bold shadow-md'
                    : 'bg-surface-card border border-border text-text-body hover:text-text-heading hover:border-primary'
                }`}
              >
                {disc.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Roster Grid */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-gutter">
          {filteredTrainers.map((trainer, idx) => (
            <SectionReveal key={trainer.id} delay={idx * 0.08}>
              <article
                aria-labelledby={`faculty-heading-${trainer.id}`}
                className="bg-surface-card border border-border rounded-sm flex flex-col overflow-hidden group hover:border-primary/50 transition-all duration-300"
              >
                {/* Photo Canvas */}
                <div className="relative w-full h-80 bg-surface-lowest overflow-hidden border-b border-border">
                  <img
                    src={trainer.image}
                    alt={trainer.alt}
                    loading="lazy"
                    width="600"
                    height="600"
                    className="w-full h-full object-cover object-center filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/90 via-[#0A0A0A]/30 to-transparent"></div>

                  {/* Demo Profile Badge */}
                  <div className="absolute top-3 left-3 bg-[#0A0A0A]/90 px-2 py-0.5 rounded-sm border-l-2 border-primary font-mono text-[9px] text-text-muted tracking-widest uppercase">
                    // DEMO PROFILE // FICTIONAL TRAINER
                  </div>

                  <div className="absolute bottom-3 right-3 bg-[#0A0A0A]/90 px-2 py-0.5 rounded-sm font-mono text-primary text-[10px] border border-border">
                    // ID: {trainer.id}
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex flex-col flex-1 gap-4">
                  <div>
                    <h2
                      id={`faculty-heading-${trainer.id}`}
                      className="font-headline text-3xl uppercase text-text-heading tracking-wide"
                    >
                      {trainer.name}
                    </h2>
                    <span className="font-headline text-lg uppercase text-text-body font-semibold">
                      {trainer.title}
                    </span>
                  </div>

                  <p className="font-body text-xs sm:text-sm text-text-body leading-relaxed">
                    {trainer.bio}
                  </p>

                  {/* Coach Specs Row */}
                  <div className="grid grid-cols-2 gap-2 bg-surface-lowest p-3 rounded-sm text-center font-mono text-xs border border-border">
                    <div className="flex flex-col">
                      <span className="text-text-muted text-[10px]">TENURE</span>
                      <span className="text-text-heading text-sm font-bold">{trainer.tenure}</span>
                    </div>
                    <div className="flex flex-col border-l border-border">
                      <span className="text-text-muted text-[10px]">{trainer.metricLabel}</span>
                      <span className="text-primary text-sm font-bold">{trainer.metricValue}</span>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="mt-auto pt-4 border-t border-border flex items-center justify-between gap-3">
                    <button
                      type="button"
                      onClick={() => handleBookSession(trainer.name)}
                      className="flex-1 bg-surface-elevated hover:bg-primary hover:text-text-inverse text-text-heading font-headline text-base uppercase tracking-wider py-2.5 rounded-sm transition-colors font-bold focus-visible:outline-primary"
                    >
                      Book a Session
                    </button>

                    <WhatsAppButton
                      variant="inline"
                      trainer={trainer.name}
                      className="text-xs py-2 px-3 shrink-0"
                    >
                      <Icon name="chat" className="text-base" />
                    </WhatsAppButton>
                  </div>
                </div>
              </article>
            </SectionReveal>
          ))}
        </div>
      </section>
    </div>
  );
}
