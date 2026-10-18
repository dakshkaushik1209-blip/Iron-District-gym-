import React, { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { MOTION_CONFIG } from '../lib/config';
import { smoothScrollTo } from '../hooks/useLenis';
import { getFacilityStatus } from '../data/hours';
import { Icon } from './Icon';

export function Hero() {
  const reducedMotion = useReducedMotion();
  const { scrollY } = useScroll();
  const [facilityStatus, setFacilityStatus] = useState(() => getFacilityStatus());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setFacilityStatus(getFacilityStatus());
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  // Subtle parallax on background image
  const bgY = useTransform(scrollY, [0, 800], [0, reducedMotion ? 0 : 150]);

  // Orchestrated entrance animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: reducedMotion ? 0 : 0.12,
        delayChildren: reducedMotion ? 0 : 0.1,
      },
    },
  };

  const lineVariants = {
    hidden: { y: reducedMotion ? 0 : '100%', opacity: 0 },
    visible: {
      y: '0%',
      opacity: 1,
      transition: {
        duration: reducedMotion ? 0.01 : 0.7,
        ease: MOTION_CONFIG.ease,
      },
    },
  };

  const fadeVariants = {
    hidden: { opacity: 0, y: reducedMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0.01 : 0.6,
        ease: MOTION_CONFIG.ease,
      },
    },
  };

  return (
    <section
      id="hero"
      aria-label="Iron District Fitness Introduction"
      className="relative w-full pt-24 sm:pt-28 border-b border-border overflow-hidden min-h-[920px] flex flex-col justify-between"
    >
      {/* Background Visual with Subtle Ken Burns / Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={
            reducedMotion
              ? {}
              : {
                  scale: [1.02, 1.08],
                  transition: { duration: 16, repeat: Infinity, repeatType: 'reverse', ease: 'easeInOut' },
                }
          }
          className="w-full h-full min-h-[110%] bg-cover bg-center filter grayscale-[30%] brightness-[38%]"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1920&auto=format&fit=crop')`,
            y: bgY,
          }}
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/70 to-[#0A0A0A]/40"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/15 via-transparent to-transparent"></div>
        <div className="absolute inset-0 bg-grid-pattern opacity-40"></div>
      </div>

      {/* Facility Operational Hours Status Strip */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3 font-mono text-xs">
        <div
          aria-live="polite"
          className="flex items-center gap-2.5 text-text-body font-mono text-xs"
        >
          <span
            className={`inline-block w-2 h-2 rounded-full shrink-0 ${
              facilityStatus.isOpen
                ? reducedMotion
                  ? 'bg-primary'
                  : 'bg-primary animate-pulse'
                : 'bg-text-muted'
            }`}
            aria-hidden="true"
          />
          <span className="text-text-heading font-medium tracking-wide">
            {facilityStatus.text}
          </span>
        </div>
      </div>

      {/* Center Hero Typography & Orchestrated Entrance */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 my-auto"
      >
        {/* Laboratory Tagline Badge */}
        <motion.div variants={fadeVariants} className="inline-flex items-center gap-2 px-3 py-1 bg-surface-card border border-border mb-6">
          <Icon name="bolt" size={14} className="text-primary" />
          <span className="font-mono text-xs text-primary uppercase tracking-widest font-bold">
            Strength Laboratory // Uncompromising Standard
          </span>
        </motion.div>

        {/* Masked Slide-up Headline: "BUILT BY DISCIPLINE." */}
        <div className="mb-6 overflow-hidden">
          <motion.div variants={lineVariants}>
            <h1 className="font-display text-5xl sm:text-7xl lg:text-8xl uppercase text-text-heading tracking-tight leading-[0.92] drop-shadow-2xl">
              BUILT BY <br className="hidden sm:inline" />
              <span className="text-primary underline decoration-primary/40 underline-offset-8">
                DISCIPLINE.
              </span>
            </h1>
          </motion.div>
        </div>

        {/* Supporting Copy */}
        <motion.p
          variants={fadeVariants}
          className="font-body text-base sm:text-lg lg:text-xl text-text-body max-w-2xl mb-8 leading-relaxed"
        >
          Forged in chalk, steel, and relentless consistency. We are an uncompromising strength laboratory engineered for those who treat physical training as a craft.
        </motion.p>

        {/* CTA Button Group */}
        <motion.div variants={fadeVariants} className="flex flex-wrap items-center gap-4">
          <a
            href="#memberships"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo('#memberships', -80);
            }}
            className="inline-flex items-center justify-center bg-primary text-text-inverse font-headline text-lg sm:text-xl uppercase tracking-wider px-8 py-3.5 rounded-sm hover:bg-primary-hover active:scale-[0.99] transition-all font-bold shadow-xl gap-2"
          >
            <span>Explore Memberships</span>
            <Icon name="arrow_forward" size={18} />
          </a>

          <a
            href="#trial"
            onClick={(e) => {
              e.preventDefault();
              smoothScrollTo('#trial', -80);
            }}
            className="inline-flex items-center justify-center border border-border hover:border-primary text-text-heading hover:text-primary font-headline text-lg sm:text-xl uppercase tracking-wider px-8 py-3.5 rounded-sm hover:bg-primary/5 active:scale-[0.99] transition-all font-bold"
          >
            Book a Free Trial
          </a>
        </motion.div>
      </motion.div>

      {/* Bottom Metrics Ribbon */}
      <div className="relative z-10 w-full border-t border-border bg-[#0A0A0A]/90 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-border">
          {/* Feature 1 */}
          <div className="flex items-center gap-3 py-3 md:py-0 md:px-6 first:pl-0">
            <Icon name="key" size={24} className="text-primary shrink-0" />
            <div>
              <div className="font-headline text-lg uppercase leading-none text-text-heading font-bold">
                24/7 keycard access for members
              </div>
            </div>
          </div>

          {/* Feature 2 */}
          <div className="flex items-center gap-3 py-3 md:py-0 md:px-6">
            <Icon name="verified_user" size={24} className="text-primary shrink-0" />
            <div>
              <div className="font-headline text-lg uppercase leading-none text-text-heading font-bold">
                Zero Gimmicks Policy
              </div>
              <div className="font-mono text-xs text-text-muted mt-1">
                Raw work. Measurable progress.
              </div>
            </div>
          </div>

          {/* Feature 3 */}
          <div className="flex items-center gap-3 py-3 md:py-0 md:px-6 last:pr-0">
            <Icon name="fitness_center" size={24} className="text-primary shrink-0" />
            <div>
              <div className="font-headline text-lg uppercase leading-none text-text-heading font-bold">
                Competition-style barbells and plates (demo)
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
