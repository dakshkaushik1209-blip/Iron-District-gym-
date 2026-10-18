import React, { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useReducedMotion } from '../hooks/useReducedMotion';

/**
 * Large decorative wordmark for the footer inspired by Aceternity TextHoverEffect.
 * - Outlined SVG text reading "IRON DISTRICT" in the site's heavy display font.
 * - Base state: dim grey outline (#262626 from Tailwind tokens).
 * - Interactive hover: radial mask follows cursor and reveals the stroke in brand orange (#FF5A1F) to white.
 * - Accessible: aria-hidden="true". On touch devices & reduced motion: static faint orange stroke with no hover effect.
 * - Height: max 220px desktop, 120px mobile.
 */
export function FooterWordmark() {
  const svgRef = useRef(null);
  const [hovered, setHovered] = useState(false);
  const [maskPosition, setMaskPosition] = useState({ cx: '50%', cy: '50%' });
  const [isTouchOrReduced, setIsTouchOrReduced] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const isTouch =
      window.matchMedia('(pointer: coarse)').matches ||
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0;
    setIsTouchOrReduced(Boolean(isTouch || reducedMotion));
  }, [reducedMotion]);

  const updateCursorPosition = (clientX, clientY) => {
    if (!svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    if (rect.width === 0 || rect.height === 0) return;
    const cx = ((clientX - rect.left) / rect.width) * 100;
    const cy = ((clientY - rect.top) / rect.height) * 100;
    setMaskPosition({
      cx: `${Math.max(0, Math.min(100, cx))}%`,
      cy: `${Math.max(0, Math.min(100, cy))}%`,
    });
  };

  const handleMouseEnter = (e) => {
    updateCursorPosition(e.clientX, e.clientY);
    setHovered(true);
  };

  const handleMouseMove = (e) => {
    updateCursorPosition(e.clientX, e.clientY);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  // Fallback for touch devices or users with prefers-reduced-motion
  if (isTouchOrReduced) {
    return (
      <div
        className="w-full flex items-center justify-center overflow-hidden h-[75px] sm:h-[110px] md:h-[160px] lg:h-[200px] max-h-[120px] md:max-h-[220px] select-none pointer-events-none"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 1000 150"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
          className="w-full h-full select-none"
        >
          <text
            x="50%"
            y="52%"
            textAnchor="middle"
            dominantBaseline="middle"
            textLength="940"
            lengthAdjust="spacing"
            fill="none"
            stroke="var(--color-primary)"
            strokeOpacity="0.35"
            strokeWidth="1.75"
            className="font-display uppercase font-extrabold"
            style={{
              fontFamily: "'Barlow Condensed', sans-serif",
              fontWeight: 800,
              textTransform: 'uppercase',
            }}
          >
            IRON DISTRICT
          </text>
        </svg>
      </div>
    );
  }

  return (
    <div
      className="w-full flex items-center justify-center overflow-hidden h-[75px] sm:h-[110px] md:h-[160px] lg:h-[200px] max-h-[120px] md:max-h-[220px] select-none"
      aria-hidden="true"
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1000 150"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        className="w-full h-full select-none cursor-default"
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <defs>
          {/* Brand orange to white gradient - single brand color, no rainbow */}
          <linearGradient
            id="footer-wordmark-gradient"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="var(--color-primary)" />
            <stop offset="100%" stopColor="var(--color-text-heading)" />
          </linearGradient>

          {/* Radial mask tracking cursor position with framer-motion */}
          <motion.radialGradient
            id="footer-wordmark-reveal-mask"
            gradientUnits="userSpaceOnUse"
            cx={maskPosition.cx || '50%'}
            cy={maskPosition.cy || '50%'}
            r={hovered ? '24%' : '0%'}
            initial={{
              cx: '50%',
              cy: '50%',
              r: '0%',
            }}
            animate={{
              cx: maskPosition.cx || '50%',
              cy: maskPosition.cy || '50%',
              r: hovered ? '24%' : '0%',
            }}
            transition={{ duration: hovered ? 0.12 : 0.35, ease: 'easeOut' }}
          >
            <stop offset="0%" stopColor="white" />
            <stop offset="100%" stopColor="black" />
          </motion.radialGradient>

          <mask id="footer-wordmark-mask">
            <rect
              x="0"
              y="0"
              width="100%"
              height="100%"
              fill="url(#footer-wordmark-reveal-mask)"
            />
          </mask>
        </defs>

        {/* Base layer: dim grey outline (#262626 border token) */}
        <text
          x="50%"
          y="52%"
          textAnchor="middle"
          dominantBaseline="middle"
          textLength="940"
          lengthAdjust="spacing"
          fill="none"
          stroke="var(--color-border)"
          strokeWidth="1.75"
          className="font-display uppercase font-extrabold"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 800,
            textTransform: 'uppercase',
          }}
        >
          IRON DISTRICT
        </text>

        {/* Revealed layer: brand orange (#FF5A1F) to white stroke revealed by radial mask */}
        <text
          x="50%"
          y="52%"
          textAnchor="middle"
          dominantBaseline="middle"
          textLength="940"
          lengthAdjust="spacing"
          fill="none"
          stroke="url(#footer-wordmark-gradient)"
          strokeWidth="1.75"
          mask="url(#footer-wordmark-mask)"
          className="font-display uppercase font-extrabold"
          style={{
            fontFamily: "'Barlow Condensed', sans-serif",
            fontWeight: 800,
            textTransform: 'uppercase',
            opacity: hovered ? 1 : 0,
            transition: 'opacity 0.2s ease-out',
          }}
        >
          IRON DISTRICT
        </text>
      </svg>
    </div>
  );
}
