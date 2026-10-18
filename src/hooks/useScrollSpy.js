import { useState, useEffect } from 'react';

/**
 * ScrollSpy hook that detects the current visible section based on scroll position.
 * Accounts for sticky header offset.
 * @param {string[]} sectionIds - Array of section DOM IDs to monitor
 * @param {number} [offset=100] - Header height offset in px
 * @returns {string} - Active section ID
 */
export function useScrollSpy(sectionIds = [], offset = 100) {
  const [activeId, setActiveId] = useState(sectionIds[0] || 'hero');

  useEffect(() => {
    if (typeof window === 'undefined' || !sectionIds.length) return;

    const handleScroll = () => {
      // If user is near top of page, activate the first section (hero/home)
      if (window.scrollY < 150) {
        setActiveId(sectionIds[0]);
        return;
      }

      // If user is near the bottom of document, activate the last section (contact)
      if (
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 80
      ) {
        setActiveId(sectionIds[sectionIds.length - 1]);
        return;
      }

      const scrollPos = window.scrollY + offset;
      let currentSection = sectionIds[0];

      for (let i = 0; i < sectionIds.length; i++) {
        const id = sectionIds[i];
        const element = document.getElementById(id);
        if (element) {
          const top = element.getBoundingClientRect().top + window.scrollY;
          if (scrollPos >= top) {
            currentSection = id;
          }
        }
      }

      setActiveId(currentSection);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [sectionIds, offset]);

  return activeId;
}
