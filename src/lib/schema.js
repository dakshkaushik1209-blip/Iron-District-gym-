import { z } from 'zod';

export const PROGRAMS = [
  { id: 'strength-training', name: 'Strength Training' },
  { id: 'muscle-building', name: 'Muscle Building' },
  { id: 'fat-loss-training', name: 'Fat-loss Training' },
  { id: 'personal-training', name: 'Personal Training' },
  { id: 'functional-fitness', name: 'Functional Fitness' },
];

export const PROGRAM_IDS = [
  'strength-training',
  'muscle-building',
  'fat-loss-training',
  'personal-training',
  'functional-fitness',
  'strength',
  'hypertrophy',
  'fat-loss',
  'personal',
  'functional',
];

// Helper to format/validate Indian phone numbers while being permissive
export function sanitizePhone(val) {
  if (!val) return '';
  return val.replace(/[\s\-\(\)]/g, '');
}

export function isValidPhone(val) {
  if (!val) return false;
  const clean = sanitizePhone(val);
  // Match Indian numbers: optional +91 or 0, followed by 10 digits starting with 6,7,8,9
  const indianRegex = /^(?:(?:\+91)|0)?[6-9]\d{9}$/;
  // Also allow generic international valid 10-15 digit numbers
  const genericRegex = /^\+?[1-9]\d{9,14}$/;
  return indianRegex.test(clean) || genericRegex.test(clean);
}

// Calculate date limits (today to today + 60 days)
export function getMinMaxDates() {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const max = new Date(today);
  max.setDate(max.getDate() + 60);

  const formatDate = (d) => {
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  return {
    minDate: formatDate(today),
    maxDate: formatDate(max),
  };
}

export const trialFormSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: 'Full name must be at least 2 characters' })
    .max(80, { message: 'Full name must be less than 80 characters' }),
  phone: z
    .string()
    .trim()
    .min(10, { message: 'Phone number is required' })
    .refine((val) => isValidPhone(val), {
      message: 'Enter a valid 10-digit phone number (e.g. 9876543210 or +91 98765 00000)',
    }),
  program: z
    .string()
    .refine((val) => PROGRAM_IDS.includes(val), {
      message: 'Please select a valid training program',
    }),
  preferred_date: z
    .string()
    .min(1, { message: 'Preferred visit date is required' })
    .refine(
      (val) => {
        const { minDate, maxDate } = getMinMaxDates();
        return val >= minDate && val <= maxDate;
      },
      {
        message: 'Visit date must be between today and the next 60 days',
      }
    ),
  plan: z.string().optional().default(''),
  trainer: z.string().optional().default(''),
  notes: z
    .string()
    .max(300, { message: 'Notes must be under 300 characters' })
    .optional()
    .default(''),
  // Honeypot field - must be empty
  hp: z.string().max(0, { message: 'Spam detected' }).optional().default(''),
});
