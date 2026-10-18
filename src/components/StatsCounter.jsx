import React, { useRef } from 'react';
import { useInView } from 'framer-motion';
import { useCountUp } from '../hooks/useCountUp';
import { useReducedMotion } from '../hooks/useReducedMotion';

export function StatsCounter({ target, suffix = '', label, sublabel, duration = 1600 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const reducedMotion = useReducedMotion();

  const count = useCountUp(target, duration, isInView, reducedMotion);

  return (
    <div ref={ref} className="flex flex-col">
      <div className="font-headline text-3xl sm:text-4xl lg:text-5xl text-text-heading font-extrabold tracking-tight leading-none">
        {count}
        {suffix}
      </div>
      <div className="font-mono text-xs sm:text-sm text-primary uppercase font-bold mt-1">
        {label}
      </div>
      {sublabel && (
        <div className="font-body text-xs text-text-muted mt-0.5 leading-snug">
          {sublabel}
        </div>
      )}
    </div>
  );
}
