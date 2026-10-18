import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { galleryImages } from '../data/gallery';
import { MOTION_CONFIG } from '../lib/config';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { Icon } from './Icon';

export function Gallery() {
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [touchStartX, setTouchStartX] = useState(null);
  const modalRef = useRef(null);
  const closeBtnRef = useRef(null);
  const reducedMotion = useReducedMotion();

  const isLightboxOpen = selectedIdx !== null;
  const currentImage = isLightboxOpen ? galleryImages[selectedIdx] : null;

  // Keyboard navigation & Focus trap
  useEffect(() => {
    if (!isLightboxOpen) return;

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    // Focus close button on open
    setTimeout(() => {
      closeBtnRef.current?.focus();
    }, 50);

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setSelectedIdx(null);
      } else if (e.key === 'ArrowRight') {
        setSelectedIdx((prev) => (prev + 1) % galleryImages.length);
      } else if (e.key === 'ArrowLeft') {
        setSelectedIdx((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
      } else if (e.key === 'Tab' && modalRef.current) {
        // Focus trap
        const focusable = modalRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );
        const first = focusable[0];
        const last = focusable[focusableElementsLength(focusable) - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last?.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first?.focus();
          }
        }
      }
    };

    function focusableElementsLength(elements) {
      return elements.length;
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isLightboxOpen]);

  // Touch swipe support for mobile
  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (diff > 50) {
      // Swiped left -> next
      setSelectedIdx((prev) => (prev + 1) % galleryImages.length);
    } else if (diff < -50) {
      // Swiped right -> prev
      setSelectedIdx((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
    }
    setTouchStartX(null);
  };

  return (
    <>
      {/* Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-gutter grid-flow-dense">
        {galleryImages.map((item, index) => {
          const isSpan2 = item.aspect === 'span-2';
          return (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: reducedMotion ? 0 : 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={MOTION_CONFIG.viewport}
              transition={{
                duration: reducedMotion ? 0.01 : 0.4,
                delay: reducedMotion ? 0 : index * 0.06,
                ease: MOTION_CONFIG.ease,
              }}
              onClick={() => setSelectedIdx(index)}
              className={`relative border border-border bg-surface-card overflow-hidden group cursor-pointer rounded-sm ${
                isSpan2
                  ? 'md:col-span-2 md:row-span-2 min-h-[380px] md:min-h-[460px]'
                  : 'min-h-[220px]'
              }`}
            >
              <img
                src={item.image}
                alt={item.alt}
                loading="lazy"
                width={isSpan2 ? 1200 : 600}
                height={isSpan2 ? 800 : 400}
                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105 filter grayscale-[20%]"
              />

              {/* Gradient Scrim */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent"></div>

              {/* Monospace Badge & Title Overlay */}
              <div className="absolute bottom-0 left-0 p-space-md sm:p-space-lg w-full">
                <div className="font-mono text-[11px] text-primary mb-1 uppercase font-bold">
                  [{item.zone}]
                </div>
                <h3 className="font-headline text-xl sm:text-2xl uppercase text-text-heading">
                  {item.title}
                </h3>
                <p className="font-body text-xs text-text-body mt-0.5 line-clamp-1 max-w-md">
                  {item.description}
                </p>
              </div>

              {/* Expand Hint Icon */}
              <div className="absolute top-3 right-3 w-8 h-8 rounded-sm bg-[#0A0A0A]/80 border border-border flex items-center justify-center text-text-muted group-hover:text-primary group-hover:border-primary transition-colors">
                <Icon name="fullscreen" size={16} />
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Accessible Lightbox Modal */}
      <AnimatePresence>
        {isLightboxOpen && currentImage && (
          <motion.div
            ref={modalRef}
            role="dialog"
            aria-modal="true"
            aria-label="Facility Gallery Lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            className="fixed inset-0 z-50 bg-[#0A0A0A]/95 backdrop-blur-xl flex flex-col justify-between p-4 sm:p-6"
          >
            {/* Top Bar: Controls, Counter & Close */}
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2 font-mono text-xs text-text-muted">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                <span className="text-primary font-bold">[{currentImage.zone}]</span>
                <span className="hidden sm:inline">|</span>
                <span className="hidden sm:inline text-text-heading">{currentImage.title}</span>
              </div>

              <div className="flex items-center gap-4">
                <span className="font-mono text-xs text-text-body">
                  [{String(selectedIdx + 1).padStart(2, '0')} / {String(galleryImages.length).padStart(2, '0')}]
                </span>

                <button
                  ref={closeBtnRef}
                  type="button"
                  onClick={() => setSelectedIdx(null)}
                  aria-label="Close Lightbox"
                  className="w-10 h-10 flex items-center justify-center bg-surface-container border border-border text-text-heading hover:border-primary hover:text-primary transition-colors rounded-sm focus-visible:outline-primary"
                >
                  <Icon name="close" size={20} />
                </button>
              </div>
            </div>

            {/* Main Stage with Image and Nav Arrows */}
            <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
              {/* Prev Button */}
              <button
                type="button"
                onClick={() =>
                  setSelectedIdx(
                    (prev) => (prev - 1 + galleryImages.length) % galleryImages.length
                  )
                }
                aria-label="Previous image"
                className="absolute left-2 sm:left-4 z-10 w-11 h-11 flex items-center justify-center bg-[#0A0A0A]/80 border border-border text-text-heading hover:border-primary hover:text-primary transition-colors rounded-sm focus-visible:outline-primary"
              >
                <Icon name="chevron_left" size={24} />
              </button>

              {/* Main Image with layout fade */}
              <motion.div
                key={currentImage.id}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.25, ease: MOTION_CONFIG.ease }}
                className="max-h-[75vh] max-w-[90vw] flex flex-col items-center"
              >
                <img
                  src={currentImage.image}
                  alt={currentImage.alt}
                  className="max-h-[70vh] w-auto object-contain border border-border shadow-2xl rounded-sm"
                />
              </motion.div>

              {/* Next Button */}
              <button
                type="button"
                onClick={() =>
                  setSelectedIdx((prev) => (prev + 1) % galleryImages.length)
                }
                aria-label="Next image"
                className="absolute right-2 sm:right-4 z-10 w-11 h-11 flex items-center justify-center bg-[#0A0A0A]/80 border border-border text-text-heading hover:border-primary hover:text-primary transition-colors rounded-sm focus-visible:outline-primary"
              >
                <Icon name="chevron_right" size={24} />
              </button>
            </div>

            {/* Bottom Caption */}
            <div className="p-3 bg-surface-card border border-border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 rounded-sm font-mono text-xs">
              <div>
                <span className="text-text-heading font-bold mr-2 uppercase">
                  {currentImage.title}
                </span>
                <span className="text-text-muted">{currentImage.description}</span>
              </div>
              <div className="text-[10px] text-text-muted">
                Swipe left/right or use keyboard arrows ← →
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
