/**
 * Membership pricing plans and feature matrix.
 * Single programmatic source of truth for pricing math and savings calculations.
 */

export const PRICING_RATES = {
  monthly: {
    monthlyRate: 3999,
    months: 1,
    get totalBilled() {
      return this.monthlyRate * this.months;
    },
  },
  quarterly: {
    monthlyRate: 3299,
    months: 3,
    get totalBilled() {
      return this.monthlyRate * this.months;
    },
  },
  annual: {
    monthlyRate: 2749,
    months: 12,
    get totalBilled() {
      return this.monthlyRate * this.months;
    },
  },
};

// Programmatically calculate savings percentage
export const ANNUAL_SAVINGS_PERCENT = Math.round(
  ((PRICING_RATES.monthly.monthlyRate - PRICING_RATES.annual.monthlyRate) /
    PRICING_RATES.monthly.monthlyRate) *
    100
);

export const plans = [
  {
    id: 'monthly',
    tier: 'TIER // 01',
    name: 'Monthly Membership',
    subtitle: 'FLEXIBLE COMMITMENT',
    price: PRICING_RATES.monthly.monthlyRate,
    totalBilled: PRICING_RATES.monthly.totalBilled,
    billingCadence: 'Billed monthly',
    billingDetail: `Billed ₹${PRICING_RATES.monthly.totalBilled.toLocaleString('en-IN')} monthly`,
    description: 'Complete flexibility for serious lifters with zero multi-month contract ties.',
    contractNote: 'Cancel anytime with 14-day notice.',
    badge: null,
    savingsBadge: null,
    isRecommended: false,
    perks: [
      { text: 'Full 24/7 keycard floor access', included: true },
      { text: 'Open access to all lifting platforms', included: true },
      { text: 'Locker room & infrared sauna access', included: true },
    ],
  },
  {
    id: 'quarterly',
    tier: 'TIER // 02',
    name: 'Quarterly Membership',
    subtitle: null,
    price: PRICING_RATES.quarterly.monthlyRate,
    totalBilled: PRICING_RATES.quarterly.totalBilled,
    billingCadence: 'Billed quarterly',
    billingDetail: `Billed ₹${PRICING_RATES.quarterly.totalBilled.toLocaleString('en-IN')} quarterly`,
    description: 'Structured 3-month block for focused strength progression.',
    contractNote: '3-month block. 30-day pause allowance.',
    badge: 'RECOMMENDED',
    savingsBadge: null,
    isRecommended: true,
    perks: [
      { text: 'All Monthly Membership benefits included', included: true, highlight: true },
      { text: '1x Monthly lifting form audit with a coach', included: true },
      { text: '2 Guest passes allocated per month', included: true },
      { text: 'Permanent keycard locker allocation & gear storage', included: true },
      { text: 'Priority platform scheduling during peak hours', included: true },
    ],
  },
  {
    id: 'annual',
    tier: 'TIER // 03',
    name: 'Annual Membership',
    subtitle: 'MAXIMUM VALUE',
    price: PRICING_RATES.annual.monthlyRate,
    totalBilled: PRICING_RATES.annual.totalBilled,
    billingCadence: 'Billed annually',
    billingDetail: `Billed ₹${PRICING_RATES.annual.totalBilled.toLocaleString('en-IN')} annually`,
    description: 'The complete year-round standard for lifters committed to long-term strength.',
    contractNote: '12-month commitment. 60-day travel freeze.',
    badge: null,
    savingsBadge: `SAVE ${ANNUAL_SAVINGS_PERCENT}%`,
    isRecommended: false,
    perks: [
      { text: 'All Quarterly Membership perks included, plus unlimited weekend guest access', included: true, highlight: true },
      { text: '2 Private coaching consultations per quarter', included: true },
      { text: 'Iron District branded apparel and leather lifting belt', included: true },
    ],
  },
];

export const comparisonMatrix = [
  {
    category: '// 01: FACILITY & PLATFORM ACCESS',
    features: [
      {
        name: '24/7 Keycard Access',
        monthly: 'Included',
        quarterly: 'Included',
        annual: 'Included',
      },
      {
        name: 'Competition-Grade Barbells & Steel Platforms',
        monthly: 'Included',
        quarterly: 'Included',
        annual: 'Included',
      },
      {
        name: 'Peak Hour Platform Reservation',
        monthly: '—',
        quarterly: 'Standard Queue',
        annual: 'Guaranteed Priority',
      },
      {
        name: 'Dedicated Keycard Locker & Towel Service',
        monthly: 'Shared Daily',
        quarterly: 'Permanent Locker',
        annual: 'Permanent Locker',
      },
    ],
  },
  {
    category: '// 02: COACHING & ASSESSMENTS',
    features: [
      {
        name: 'Bar-Path Video Velocity Review',
        monthly: '—',
        quarterly: '1x / Month',
        annual: '2x / Month',
      },
      {
        name: '1-on-1 Coach Consultations',
        monthly: '—',
        quarterly: '—',
        annual: '2 Sessions / Qtr',
      },
      {
        name: 'Structured Training Progression Plan',
        monthly: '—',
        quarterly: 'Template Library',
        annual: 'Custom Quarterly Update',
      },
    ],
  },
  {
    category: '// 03: AMENITIES & APPAREL',
    features: [
      {
        name: 'Infrared Sauna & Cold Plunge Quarters',
        monthly: 'Included',
        quarterly: 'Included',
        annual: 'Included',
      },
      {
        name: 'Complimentary Guest Passes',
        monthly: '—',
        quarterly: '2 Passes / Mo',
        annual: 'Unlimited Weekends',
      },
      {
        name: 'Iron District Branded Apparel & Lifting Bundle',
        monthly: '—',
        quarterly: 'Iron District Shaker & Wraps',
        annual: 'Full Kit + Leather Belt',
      },
    ],
  },
];
