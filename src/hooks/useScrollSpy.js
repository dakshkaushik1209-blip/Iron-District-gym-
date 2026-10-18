import { useState, useEffect } from 'react';

/**
 * ScrollSpy hook that detects the current visible section based on scroll position.
 * @param {string[]} sectionIds - Array of section DOM IDs to monitor
 * @param {number} [offset=120] - Header height offset in px
 * @returns {string} - Active section ID
 */
export function useScrollSpy(sectionIds = [], offset = 120) {
  const [activeId, setActiveId] = useState('');

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionIds.length) return;

    const handleScroll = () => {
      const scrollPos = window.scrollY + offset;

      // Find the current section
      let currentSection = '';

      for (let i = 0; i < sectionIds.length; i++) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          const height = element.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            currentSection = id;
            break;
          }
        }
      }

      // If scrolled to near the bottom, select the last section
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 50
      ) {
        currentSection = sectionIds[sectionIds.length - 1];
      }

      if (currentSection) {
        setActiveId(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeId;
}
