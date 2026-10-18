import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { faqs } from '../data/faq';
import { MOTION_CONFIG } from '../lib/config';
import { useReducedMotion } from '../hooks/useReducedMotion';
import { Icon } from './Icon';

export function FAQAccordion() {
  const [openId, setOpenId] = useState('faq-1'); // Open first FAQ by default
  const reducedMotion = useReducedMotion();

  const toggle = (id) => {
    setOpenId((prev) => (prev === id ? null : id));
  };

  return (
    <div className="flex flex-col gap-space-sm">
      {faqs.map((faq) => {
        const isOpen = openId === faq.id;

        return (
          <div
            key={faq.id}
            className={`bg-surface-card border rounded-sm transition-all duration-200 ${
              isOpen ? 'border-primary' : 'border-border'
            }`}
          >
            <button
              type="button"
              id={`faq-trigger-${faq.id}`}
              aria-expanded={isOpen}
              aria-controls={`faq-panel-${faq.id}`}
              onClick={() => toggle(faq.id)}
              className="w-full flex items-center justify-between p-space-md text-left text-text-heading hover:text-primary font-headline text-lg sm:text-xl uppercase tracking-wide select-none transition-colors focus-visible:outline-primary rounded-sm"
            >
              <span>{faq.question}</span>
              <span
                className={`transition-transform duration-200 shrink-0 ml-4 ${
                  isOpen ? 'rotate-180 text-primary' : 'text-text-muted'
                }`}
              >
                <Icon name="expand_more" size={24} />
              </span>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  id={`faq-panel-${faq.id}`}
                  role="region"
                  aria-labelledby={`faq-trigger-${faq.id}`}
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: 'auto',
                    opacity: 1,
                    transition: {
                      height: { duration: reducedMotion ? 0.01 : 0.25, ease: MOTION_CONFIG.ease },
                      opacity: { duration: reducedMotion ? 0.01 : 0.2 },
                    },
                  }}
                  exit={{
                    height: 0,
                    opacity: 0,
                    transition: {
                      height: { duration: reducedMotion ? 0.01 : 0.2, ease: MOTION_CONFIG.ease },
                      opacity: { duration: reducedMotion ? 0.01 : 0.15 },
                    },
                  }}
                  className="overflow-hidden"
                >
                  <div className="px-space-md pb-space-md pt-0 font-body text-xs sm:text-sm text-text-body border-t border-border/80 mt-1 leading-relaxed">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
