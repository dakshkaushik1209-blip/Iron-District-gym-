import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { SectionReveal } from '../components/SectionReveal';
import { WhatsAppButton } from '../components/WhatsAppButton';
import { Icon } from '../components/Icon';
import { programs } from '../data/programs';

const CATEGORIES = [
  { id: 'all', label: '[ ALL DISCIPLINES ]' },
  { id: 'strength', label: 'BARBELL // POWER' },
  { id: 'muscle-building', label: 'HYPERTROPHY LAB' },
  { id: 'fat-loss', label: 'METABOLIC' },
  { id: 'personal', label: '1-ON-1 COACHING' },
  { id: 'functional', label: 'STRONGMAN & DURABILITY' },
];

export function Programs() {
  const [activeCategory, setActiveCategory] = useState('all');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.hash) {
      const targetId = location.hash.replace(/^#/, '');
      const targetProgram = programs.find((p) => p.id === targetId);
      if (targetProgram && activeCategory !== 'all' && activeCategory !== targetProgram.category) {
        setActiveCategory('all');
      }
    }
  }, [location.hash, activeCategory]);

  const filteredPrograms =
    activeCategory === 'all'
      ? programs
      : programs.filter((p) => p.category === activeCategory);

  const handleBookTrial = (programId) => {
    navigate(`/?program=${programId}#trial`);
  };

  return (
    <div className="w-full min-h-screen pt-24 pb-20">
      {/* Header & Filter Bar */}
      <section className="w-full border-b border-border bg-surface-lowest">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-10 flex flex-col gap-8">
          {/* Breadcrumb Overview */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-primary font-bold">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
              <span>// CURRICULUM & DISCIPLINES // SECTOR 04</span>
            </div>
            <div className="flex items-center gap-4 font-mono text-xs text-text-muted">
              <span>ENV: <strong className="text-text-heading font-normal">COMPETITION-STYLE STEEL</strong></span>
              <span>|</span>
              <span>CADENCE: <strong className="text-text-heading font-normal">STRUCTURED CYCLES</strong></span>
            </div>
          </div>

          {/* Headline & Description */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-end">
            <div className="lg:col-span-8">
              <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl uppercase tracking-tight text-text-heading leading-none">
                TRAINING <span className="text-primary">PROGRAMS.</span>
              </h1>
            </div>
            <div className="lg:col-span-4 flex flex-col justify-end">
              <p className="font-body text-sm sm:text-base text-text-body leading-relaxed">
                Systematic physical preparation engineered through empirical biomechanics, precision barbell loading, and uncompromising execution standards. No gimmicks. Only progressive mechanical tension.
              </p>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="pt-4 border-t border-border flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2" role="group" aria-label="Program categories">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`px-3 py-1.5 font-mono text-xs uppercase tracking-wider rounded-sm transition-all ${
                    activeCategory === cat.id
                      ? 'bg-primary text-text-inverse font-bold shadow-md'
                      : 'bg-surface-card border border-border text-text-body hover:text-text-heading hover:border-primary'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="hidden xl:flex items-center gap-2 font-mono text-xs text-text-muted">
              <span>FACILITY: <strong className="text-text-heading font-normal">8 LIFTING PLATFORMS</strong></span>
              <span>//</span>
              <span>SECTOR: <strong className="text-primary font-normal">SEC-04</strong></span>
            </div>
          </div>
        </div>
      </section>

      {/* Program Dossiers List */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 flex flex-col gap-12">
        {filteredPrograms.map((program, idx) => {
          const isEven = idx % 2 === 1;

          return (
            <SectionReveal
              key={program.id}
              className="w-full bg-surface-card border border-border rounded-sm overflow-hidden hover:border-primary/50 transition-colors duration-300 scroll-mt-28"
            >
              <article id={program.id} aria-labelledby={`program-dossier-${program.id}`} className="grid grid-cols-1 lg:grid-cols-12 min-h-[520px] scroll-mt-28">
                {/* Image Media Pane */}
                <div
                  className={`lg:col-span-5 relative min-h-[300px] lg:min-h-full overflow-hidden bg-surface-lowest ${
                    isEven ? 'order-1 lg:order-2' : ''
                  }`}
                >
                  <img
                    src={program.image}
                    alt={program.alt}
                    loading="lazy"
                    width="1200"
                    height="800"
                    className="w-full h-full object-cover filter grayscale contrast-125 transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent lg:hidden"></div>

                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-[#0A0A0A]/90 backdrop-blur-md text-primary font-mono text-xs uppercase tracking-widest border border-border font-bold">
                      {program.spec}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 hidden lg:flex items-center gap-2 font-mono text-xs text-text-body bg-[#0A0A0A]/90 px-3 py-1 border border-border">
                    <Icon name="tune" className="text-[14px] text-primary" />
                    <span>CADENCE: {program.intensity}</span>
                  </div>
                </div>

                {/* Content Spec Sheet */}
                <div
                  className={`lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between gap-6 ${
                    isEven ? 'order-2 lg:order-1' : ''
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <span className="font-mono text-xs uppercase tracking-widest text-primary font-bold">
                        // {program.index} // {program.tagline.toUpperCase()}
                      </span>
                      <span className="font-mono text-[11px] text-text-muted uppercase">
                        TIER {program.index} PROTOCOL
                      </span>
                    </div>

                    <h2
                      id={`program-dossier-${program.id}`}
                      className="font-headline text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-text-heading leading-tight mb-4"
                    >
                      {program.title}
                    </h2>

                    <p className="font-body text-sm sm:text-base text-text-body mb-6 leading-relaxed">
                      {program.description}
                    </p>

                    {/* Athlete Profile Callout */}
                    <div className="mb-6 p-4 bg-surface-container border-l-2 border-primary rounded-sm">
                      <span className="font-mono text-xs text-primary uppercase tracking-widest block mb-1 font-bold">
                        TARGET ATHLETE PROFILE
                      </span>
                      <p className="font-body text-xs sm:text-sm text-text-heading">
                        {program.target}
                      </p>
                    </div>

                    {/* Structured Spec Table */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 p-3 bg-surface-lowest border border-border rounded-sm mb-6 font-mono">
                      <div className="p-2 flex flex-col">
                        <span className="text-text-muted text-[10px] uppercase">SESSION LENGTH</span>
                        <span className="font-headline text-lg sm:text-xl text-text-heading font-bold">{program.duration}</span>
                      </div>
                      <div className="p-2 flex flex-col">
                        <span className="text-text-muted text-[10px] uppercase">FREQUENCY</span>
                        <span className="font-headline text-lg sm:text-xl text-text-heading font-bold">{program.frequency}</span>
                      </div>
                      <div className="p-2 flex flex-col">
                        <span className="text-text-muted text-[10px] uppercase">INTENSITY RATING</span>
                        <span className="font-headline text-lg sm:text-xl text-primary font-bold">{program.intensity}</span>
                      </div>
                      <div className="p-2 flex flex-col">
                        <span className="text-text-muted text-[10px] uppercase">EQUIPMENT SPEC</span>
                        <span className="font-headline text-base sm:text-lg text-text-heading font-bold">{program.equipment}</span>
                      </div>
                    </div>

                    {/* Key Movement Vectors */}
                    <div className="flex flex-wrap items-center gap-1.5 mb-6">
                      <span className="font-mono text-xs text-text-muted mr-1 font-bold">MOVEMENTS:</span>
                      {program.movements.map((move, mIdx) => (
                        <span
                          key={mIdx}
                          className="px-2.5 py-1 bg-surface-elevated border border-border text-text-body font-mono text-[11px] uppercase rounded-sm"
                        >
                          {move}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions: Book Free Trial preselecting this program */}
                  <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-border">
                    <button
                      type="button"
                      onClick={() => handleBookTrial(program.id)}
                      className="inline-flex items-center justify-center bg-primary text-text-inverse font-headline text-base uppercase tracking-wider px-6 py-2.5 rounded-sm hover:bg-primary-hover active:scale-[0.98] transition-colors font-bold shadow-md"
                    >
                      Book a Free Trial
                    </button>

                    <WhatsAppButton
                      variant="inline"
                      program={program.title}
                      className="text-xs py-2 px-4"
                    >
                      <Icon name="chat" className="text-base" />
                      <span>Enquire on WhatsApp</span>
                    </WhatsAppButton>
                  </div>
                </div>
              </article>
            </SectionReveal>
          );
        })}
      </section>
    </div>
  );
}
