import { DISPLAY_HOURS } from '../data/hours.js';

// Google Maps configuration placeholders (replace with real values when available)
export const MAP_EMBED_URL =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3770.792618991448!2d72.827289!3d19.072847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA0JzIyLjMiTiA3MsKwNDknMzguMiJF!5e0!3m2!1sen!2sin!4v1710000000000!5m2!1sen!2sin';

export const MAP_QUERY = 'Central Market, Sector 4, Demo City';

export const SITE_CONFIG = {
  name: 'Iron District Fitness',
  shortName: 'Iron District',
  tagline: 'BUILT BY DISCIPLINE.',
  sector: 'Sector 04 Strength Lab',
  campus: 'Sector 4 Industrial Campus // 14,000 SQ FT',
  address: '402 Foundry Way, Industrial Area, Sector 4',
  city: 'Demo City (fictional), 000000',
  fullAddress: '402 Foundry Way, Industrial Area, Sector 4, Demo City (fictional), 000000',
  coordinates: {
    label: 'Map location placeholder',
  },
  hours: {
    title: DISPLAY_HOURS.title,
    monSat: DISPLAY_HOURS.monSat,
    sun: DISPLAY_HOURS.sun,
    weekdays: DISPLAY_HOURS.monSat,
    weekends: DISPLAY_HOURS.sun,
    badge: DISPLAY_HOURS.badge,
  },
  phone: '+91 98765 00000 (fictional demo)',
  phoneClean: '+919876500000',
  email: 'hq@irondistrictfitness.com',
  whatsappNumber: import.meta.env?.VITE_WHATSAPP_NUMBER || '',
  siteUrl: import.meta.env?.VITE_SITE_URL || 'https://irondistrictfitness.com',
  isDemo: true,
};

// Motion System Configuration
// Strict constraint: Animate only transform and opacity
export const MOTION_CONFIG = {
  ease: [0.22, 1, 0.36, 1], // Custom snappy industrial cubic bezier
  duration: {
    fast: 0.25,
    normal: 0.45,
    slow: 0.75,
    hero: 1.0,
  },
  stagger: {
    fast: 0.08,
    normal: 0.12,
    slow: 0.2,
  },
  viewport: {
    once: true,
    amount: 0.15,
  },
};

export const TRANSITIONS = {
  fade: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
    transition: { duration: MOTION_CONFIG.duration.normal, ease: MOTION_CONFIG.ease },
  },
  slideUp: {
    initial: { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -24 },
    transition: { duration: MOTION_CONFIG.duration.normal, ease: MOTION_CONFIG.ease },
  },
  page: {
    initial: { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -16 },
    transition: { duration: 0.3, ease: MOTION_CONFIG.ease },
  },
};
