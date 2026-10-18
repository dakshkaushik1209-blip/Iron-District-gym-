import React from 'react';
import { SectionReveal } from './SectionReveal';
import { StatsCounter } from './StatsCounter';

export function About() {
  return (
    <section
      id="about"
      aria-label="About Iron District Fitness"
      className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-space-xl border-b border-border"
    >
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter items-center">
        {/* Left Column (55% / 7 cols) */}
        <SectionReveal className="lg:col-span-7 relative group">
          <div className="relative overflow-hidden border border-border bg-surface-card rounded-sm">
            <img
              src="https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=1200&auto=format&fit=crop"
              alt="High contrast industrial view of lifting platforms and competition-style weight plates racked in a brutalist gym interior"
              loading="lazy"
              width="1200"
              height="800"
              className="w-full h-[380px] sm:h-[500px] object-cover transition-transform duration-700 group-hover:scale-105 filter grayscale-[20%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent opacity-80"></div>

            {/* Monospace Technical Overlay Tag */}
            <div className="absolute bottom-4 left-4 p-space-sm bg-[#0A0A0A]/90 backdrop-blur-sm border border-border font-mono text-xs rounded-sm">
              <span className="text-primary font-bold">// ARCHITECTURE:</span> 8 LIFTING PLATFORMS // 32mm OAK INLAYS
            </div>
          </div>
        </SectionReveal>

        {/* Right Column (45% / 5 cols) */}
        <SectionReveal delay={0.15} className="lg:col-span-5 flex flex-col justify-center">
          <div className="font-mono text-xs text-primary uppercase tracking-widest mb-2 font-bold">
            // 01. PHILOSOPHY & STANDARD
          </div>
          <h2 className="font-headline text-3xl sm:text-4xl lg:text-5xl uppercase text-text-heading tracking-tight mb-4">
            Heavy Iron. Honest Work. No Shortcuts.
          </h2>
          <p className="font-body text-sm sm:text-base text-text-body mb-6 leading-relaxed">
            Iron District Fitness was founded to strip away the distractions of modern commercial fitness. We don't have juice lounges or rows of television screens. We have 8 lifting platforms, precision cast-iron plates, specialty bars, and a culture centered on personal accountability.
          </p>

          {/* Stats Counters Row */}
          <div className="grid grid-cols-3 gap-2 sm:gap-4 py-4 border-y border-border mb-3">
            <StatsCounter
              target={14}
              suffix="K"
              label="SQ FT"
              sublabel="Total facility"
            />
            <StatsCounter
              target={12}
              suffix=""
              label="STATIONS"
              sublabel="Strength stations (demo)"
            />
            <StatsCounter
              target={100}
              suffix="%"
              label="CAST IRON"
              sublabel="Zero rubber-coated shortcuts"
            />
          </div>

          <div className="font-mono text-[10px] text-text-muted uppercase tracking-wider">
            * Illustrative demo metrics.
          </div>
        </SectionReveal>
      </div>
    </section>
  );
}
