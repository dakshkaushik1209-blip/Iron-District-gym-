import React from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { MOTION_CONFIG } from '../lib/config';

/**
 * Reusable SectionReveal wrapper that animates into view once.
 * Respects prefers-reduced-motion by falling back to a gentle opacity fade.
 */
export function SectionReveal({
  children,
  className = '',
  delay = 0,
  yOffset = 24,
  ...props
}) {
  const reducedMotion = useReducedMotion();

  const variants = {
    hidden: {
      opacity: 0,
      y: reducedMotion ? 0 : yOffset,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: reducedMotion ? 0.01 : MOTION_CONFIG.duration.normal,
        delay: reducedMotion ? 0 : delay,
        ease: MOTION_CONFIG.ease,
      },
    },
  };

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={MOTION_CONFIG.viewport}
      variants={variants}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  );
}
