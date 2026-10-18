/**
 * 5 Core Training Programs for Iron District Fitness.
 * Single source of truth for program cards, dropdowns, descriptions, and filter tabs.
 * Exactly 2 short sentences per program description in clear, direct English.
 */

export const programs = [
  {
    id: 'strength-training',
    shortId: 'strength',
    slug: 'strength-training',
    category: 'strength-training',
    aliases: ['strength'],
    index: '01',
    title: 'Strength Training',
    tagline: 'Compound Barbell Foundations',
    badge: 'PRIMARY DISCIPLINE // 01',
    spec: 'BARBELL FOUNDATIONS',
    categoryLabel: 'Strength Training',
    intensity: 'RPE 7.5–9.5',
    duration: '75–90 MIN',
    frequency: '3–5X / WK',
    equipment: '8 LIFTING PLATFORMS',
    description:
      'Master fundamental barbell lifts including the squat, bench press, deadlift, and overhead press. Progressive overload cycles build reliable full-body strength and technical confidence.',
    target:
      'Lifters wanting structured linear progression, dependable technique checks, and measurable strength gains.',
    movements: [
      'BARBELL SQUAT',
      'BENCH PRESS',
      'DEADLIFT',
      'OVERHEAD PRESS',
    ],
    image:
      'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=1200&auto=format&fit=crop',
    alt: 'Heavy knurled steel barbell with competition-style plates on a deadlift platform in a dark industrial gym',
    isFeatured: true,
  },
  {
    id: 'muscle-building',
    shortId: 'muscle-building',
    slug: 'muscle-building',
    category: 'muscle-building',
    aliases: ['hypertrophy'],
    index: '02',
    title: 'Muscle Building',
    tagline: 'Hypertrophy Protocols',
    badge: '[02 / HYPERTROPHY]',
    spec: 'TARGETED HYPERTROPHY',
    categoryLabel: 'Muscle Building',
    intensity: 'RPE 8.0–10',
    duration: '60–75 MIN',
    frequency: '4–6X / WK',
    equipment: 'DUMBBELLS & SPECIALTY BARS',
    description:
      'Targeted hypertrophy training using proven dumbbell, cable, and barbell exercises. Structured volume and steady progression help you build lean muscle and balanced symmetry.',
    target:
      'Lifters aiming to gain lean muscle mass through controlled tempo, consistent volume, and balanced recovery.',
    movements: [
      'INCLINE DUMBBELL PRESS',
      'SEATED CABLE ROW',
      'BULGARIAN SPLIT SQUAT',
      'LAT PULLDOWN',
    ],
    image:
      'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?q=80&w=1200&auto=format&fit=crop',
    alt: 'Athlete executing heavy dumbbell rows in dramatic dark warehouse gym lighting',
    isFeatured: false,
  },
  {
    id: 'fat-loss-training',
    shortId: 'fat-loss',
    slug: 'fat-loss-training',
    category: 'fat-loss-training',
    aliases: ['fat-loss'],
    index: '03',
    title: 'Fat-loss Training',
    tagline: 'Metabolic Conditioning',
    badge: '[03 / CONDITIONING]',
    spec: 'ENERGY SYSTEMS',
    categoryLabel: 'Fat-loss Training',
    intensity: 'HIGH WORK CAPACITY',
    duration: '45–60 MIN',
    frequency: '3–4X / WK',
    equipment: 'SLEDS & ROWING MACHINES',
    description:
      'High-energy conditioning combining sled pushes, kettlebells, and cardio intervals. Designed to boost work capacity and burn fat while protecting hard-earned strength.',
    target:
      'Lifters who want to improve cardiovascular stamina, shed body fat, and maintain lean strength.',
    movements: [
      'HEAVY SLED PUSH',
      'SKI MACHINE INTERVALS',
      'FARMER CARRIES',
      'KETTLEBELL SWINGS',
    ],
    image:
      'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?q=80&w=1200&auto=format&fit=crop',
    alt: 'Athlete pushing heavy steel prowler sled on an indoor turf sprint track under mood lighting',
    isFeatured: false,
  },
  {
    id: 'personal-training',
    shortId: 'personal',
    slug: 'personal-training',
    category: 'personal-training',
    aliases: ['personal'],
    index: '04',
    title: 'Personal Training',
    tagline: '1-on-1 Dedicated Coaching',
    badge: '[04 / PERSONAL TRAINING]',
    spec: 'CUSTOM COACHING',
    categoryLabel: 'Personal Training',
    intensity: 'TAILORED TO ATHLETE',
    duration: '60 MIN',
    frequency: 'CUSTOM SCHEDULE',
    equipment: 'DEDICATED PLATFORM',
    description:
      'One-on-one movement analysis and customized workout programming built for your specific body and goals. Work directly with an experienced coach to improve technique and accelerate progress.',
    target:
      'Lifters wanting individualized feedback, safe form adjustments, and tailored training programs.',
    movements: [
      'MOVEMENT SCREENING',
      'TECHNIQUE REFINEMENT',
      'BARBELL SPEED AUDIT',
      'INDIVIDUALIZED SPLIT',
    ],
    image:
      'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?q=80&w=1200&auto=format&fit=crop',
    alt: 'Coach reviewing barbell mechanics and squat depth with an athlete',
    isFeatured: false,
  },
  {
    id: 'functional-fitness',
    shortId: 'functional',
    slug: 'functional-fitness',
    category: 'functional-fitness',
    aliases: ['functional'],
    index: '05',
    title: 'Functional Fitness',
    tagline: 'Functional Conditioning & Durability',
    badge: '[05 / DURABILITY]',
    spec: 'PRACTICAL RESILIENCE',
    categoryLabel: 'Functional Fitness',
    intensity: 'WHOLE-BODY STRENGTH',
    duration: '60–75 MIN',
    frequency: '3–4X / WK',
    equipment: 'ODD OBJECTS / SANDBAGS',
    description:
      'Train with heavy sandbags, farmer carries, sleds, and odd objects. Build practical grip strength, core stability, and durable everyday athleticism.',
    target:
      'Athletes looking for durable core strength, functional carries, and raw utility beyond traditional barbells.',
    movements: [
      'STONE LIFTS',
      'SANDBAG TO SHOULDER',
      'LOG PRESS',
      'FARMER CARRIES',
    ],
    image:
      'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?q=80&w=1200&auto=format&fit=crop',
    alt: 'Athlete lifting heavy stones on concrete floor with chalk in air',
    isFeatured: false,
  },
];

/**
 * Filter tabs generated dynamically from programs data.
 * Exactly matches required tab labels:
 * "All programs", "Strength Training", "Muscle Building", "Fat-loss Training", "Personal Training", "Functional Fitness".
 */
export const programTabs = [
  { id: 'all', slug: 'all', label: 'All programs' },
  ...programs.map((p) => ({
    id: p.slug,
    slug: p.slug,
    label: p.title,
  })),
];
