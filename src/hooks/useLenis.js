import { useEffect, useRef } from 'react';
import Lenis from 'lenis';
import { useReducedMotion } from './useReducedMotion';

/**
 * Initializes Lenis smooth scrolling with anchor link support and reduced motion handling.
 * @returns {React.MutableRefObject<Lenis | null>}
 */
export function useLenis() {
  const lenisRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // If reduced motion is requested, do not run smooth scrolling
    if (reducedMotion || typeof window === 'undefined') {
      if (lenisRef.current) {
        lenisRef.current.destroy();
        lenisRef.current = null;
      }
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.5,
    });

    lenisRef.current = lenis;

    // Attach to global window for convenience
    window.__lenis = lenis;

    let animationFrameId;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }

    animationFrameId = requestAnimationFrame(raf);

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      lenis.destroy();
      lenisRef.current = null;
      window.__lenis = null;
    };
  }, [reducedMotion]);

  return lenisRef;
}

/**
 * Helper to smoothly scroll to target ID or element with navbar offset
 * @param {string | HTMLElement} target
 * @param {number} [offset=-80]
 */
export function smoothScrollTo(target, offset = -80) {
  if (typeof window === 'undefined') return;

  if (window.__lenis) {
    window.__lenis.scrollTo(target, { offset });
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}
