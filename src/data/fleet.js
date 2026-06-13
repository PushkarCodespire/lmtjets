// Premium private jet imagery — verified Unsplash photo IDs
const EXT_FALCON_SUNSET     = 'https://images.unsplash.com/photo-1540962351504-03099e0a754b?w=1200&q=85'
const EXT_WING_CLOUDS       = 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1200&q=85'
const EXT_LOCAL_SUNSET      = '/hero-bg.png'
const EXT_CESSNA_LANDING    = 'https://images.unsplash.com/photo-1502370994336-ce9bd2cbd7d8?w=1200&q=85'
const EXT_JET_AIR           = 'https://images.unsplash.com/photo-1583917847663-e58c00ce30f4?w=1200&q=85'
const EXT_TARMAC            = 'https://images.unsplash.com/photo-1542296332-2e4473faf563?w=1200&q=85'

const CABIN_GALLERY = [
  'https://images.unsplash.com/photo-1474302770737-173ee21bab63?w=1200&q=85',
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=85',
  EXT_FALCON_SUNSET,
  EXT_WING_CLOUDS,
]

export const fleet = [
  /* ──────────────────────────────────────────────────
     1. BOMBARDIER GLOBAL 6000  — Ultra Long Range Flagship
  ────────────────────────────────────────────────── */
  {
    id: 'global-6000',
    name: 'Bombardier Global 6000',
    category: 'Ultra Long Range',
    tagline: 'Engineered to redefine ultra-long-range travel.',
    storyline: 'A world\nwithout limits.',
    storyDesc: 'The Global 6000 is one of the most accomplished ultra-long-range business jets ever built. With a 6,000 nm range, advanced Vision Flight Deck and a cabin engineered for true productivity and rest, it connects continents with first-class composure.',
    passengers: 13,
    range: 6000,
    speed: 590,        // ~Mach 0.89
    altitude: 51000,
    baggage: 195,
    endurance: 13,
    cabinHeight: 6.2,
    cabinWidth: 8.2,
    cabinLength: 43.3,
    wifi: true,
    lavatory: true,
    catering: true,
    bestFor: 'NY to Tokyo, NY to Dubai nonstop — ultra-long intercontinental missions',
    description: 'Bombardier\'s flagship ultra-long-range jet. 6,000 nm with Vision Flight Deck.',
    image:         EXT_LOCAL_SUNSET,
    heroVideo:     '/global-6000-video.mp4',
    interiorImage: CABIN_GALLERY[0],
    exteriorImage: EXT_LOCAL_SUNSET,
    gallery: CABIN_GALLERY,
    amenities: [
      'High-Speed Ka-band Wi-Fi',
      'Bombardier Vision Flight Deck',
      'Three Living Zones',
      'Private Aft Stateroom',
      'Full Galley & Crew Rest',
      'Enclosed Lavatories',
      'In-Flight Baggage Access',
    ],
  },

  /* ──────────────────────────────────────────────────
     2. BOMBARDIER GLOBAL 5500  — Performance Long-Range
  ────────────────────────────────────────────────── */
  {
    id: 'global-5500',
    name: 'Bombardier Global 5500',
    category: 'Ultra Long Range',
    tagline: 'Speed, range and a class-leading cabin.',
    storyline: 'Long-range,\nelevated.',
    storyDesc: 'The Global 5500 pairs a 5,900 nm range with a Mach 0.90 max speed and the all-new Nuage cabin — making it one of the fastest, most refined performers in its class. Connecting major financial hubs with effortless reach.',
    passengers: 12,
    range: 5900,
    speed: 595,        // ~Mach 0.90
    altitude: 51000,
    baggage: 195,
    endurance: 12,
    cabinHeight: 6.2,
    cabinWidth: 8.2,
    cabinLength: 40.7,
    wifi: true,
    lavatory: true,
    catering: true,
    bestFor: 'NY to Hong Kong, London to Buenos Aires — premium long-haul comfort',
    description: 'Bombardier Global 5500 — Mach 0.90 speed with a 5,900 nm range and the Nuage cabin.',
    image:         EXT_FALCON_SUNSET,
    heroVideo:     '/g280-video.mp4',
    interiorImage: CABIN_GALLERY[1],
    exteriorImage: EXT_FALCON_SUNSET,
    gallery: CABIN_GALLERY,
    amenities: [
      'Nuage Seat — Industry First',
      'Pũr Air Filtration',
      'Ka-band Connectivity',
      'Three Living Zones',
      'Crew Rest Compartment',
      'Forward Galley',
      'Two Enclosed Lavatories',
    ],
  },

  /* ──────────────────────────────────────────────────
     3. GULFSTREAM G550  — The Long-Range Icon
  ────────────────────────────────────────────────── */
  {
    id: 'gulfstream-g550',
    name: 'Gulfstream G550',
    category: 'Ultra Long Range',
    tagline: 'The benchmark for ultra-long-range performance.',
    storyline: 'The world\nwithout layovers.',
    storyDesc: 'The G550 set the standard for ultra-long-range business aviation. With 6,750 nm of range and a quiet, three-zone cabin for up to 18 passengers, it has flown VIPs and heads of state across the globe nonstop for nearly two decades.',
    passengers: 14,
    range: 6750,
    speed: 561,        // ~Mach 0.885 / 488 knots
    altitude: 51000,
    baggage: 226,
    endurance: 13,
    cabinHeight: 6.2,
    cabinWidth: 7.4,
    cabinLength: 43.9,
    wifi: true,
    lavatory: true,
    catering: true,
    bestFor: 'NY to London, NY to Tokyo, LA to Sydney — celebrated heavy jet workhorse',
    description: 'The legendary G550. 6,750 nm range with three living zones and proven reliability.',
    image:         EXT_TARMAC,
    heroVideo:     '/g550-video.mp4',
    interiorImage: CABIN_GALLERY[2],
    exteriorImage: EXT_TARMAC,
    gallery: CABIN_GALLERY,
    amenities: [
      'PlaneView Cockpit',
      'Three Living Zones',
      '14 Panoramic Windows',
      'Forward & Aft Lavatories',
      'Full Galley',
      'Crew Rest Area',
      'Honeywell SwiftBroadband Wi-Fi',
    ],
  },

  /* ──────────────────────────────────────────────────
     4. GULFSTREAM V  — Pioneer of Ultra-Long-Range
  ────────────────────────────────────────────────── */
  {
    id: 'gulfstream-v',
    name: 'Gulfstream V',
    category: 'Ultra Long Range',
    tagline: 'The aircraft that defined a category.',
    storyline: 'The original\nlong-range master.',
    storyDesc: 'Introduced in 1997, the Gulfstream V was the world\'s first ultra-long-range business jet, capable of flying 6,500 nm nonstop. Its proven Rolls-Royce engines, spacious 50-foot cabin and unmatched reliability make it a workhorse of global private aviation.',
    passengers: 14,
    range: 6500,
    speed: 528,        // ~Mach 0.85 / 459 knots
    altitude: 51000,
    baggage: 226,
    endurance: 13,
    cabinHeight: 6.2,
    cabinWidth: 7.4,
    cabinLength: 50.1,
    wifi: true,
    lavatory: true,
    catering: true,
    bestFor: 'Global intercontinental missions, government and VIP delegations',
    description: 'The world\'s first ultra-long-range business jet — 6,500 nm with a 50-foot cabin.',
    image:         EXT_WING_CLOUDS,
    heroVideo:     '/gulfstream-v-video.mp4',
    interiorImage: CABIN_GALLERY[3],
    exteriorImage: EXT_WING_CLOUDS,
    gallery: CABIN_GALLERY,
    amenities: [
      'Rolls-Royce BR710 Engines',
      'Three Cabin Zones',
      '14 Oval Windows',
      'Forward Galley',
      'Two Lavatories',
      'Crew Rest Compartment',
      'High-Speed Wi-Fi',
    ],
  },

  /* ──────────────────────────────────────────────────
     5. GULFSTREAM IV  — Heavy-Jet Legend
  ────────────────────────────────────────────────── */
  {
    id: 'gulfstream-iv',
    name: 'Gulfstream IV',
    category: 'Heavy Jet',
    tagline: 'The legendary heavy jet that defined a generation.',
    storyline: 'A timeless\nstandard.',
    storyDesc: 'With more than three decades of service and 900+ aircraft delivered, the Gulfstream IV remains one of the most respected heavy jets ever built. A 4,200 nm range and a quiet, spacious cabin make it ideal for transcontinental US travel and Atlantic crossings.',
    passengers: 13,
    range: 4200,
    speed: 508,        // ~Mach 0.80 / 450 knots
    altitude: 45000,
    baggage: 169,
    endurance: 9,
    cabinHeight: 6.1,
    cabinWidth: 7.3,
    cabinLength: 45.1,
    wifi: true,
    lavatory: true,
    catering: true,
    bestFor: 'Coast-to-coast US, NY to London — legendary heavy jet',
    description: 'The Gulfstream IV heavy-jet legend. 4,200 nm with a quiet, 45-foot cabin.',
    image:         EXT_FALCON_SUNSET,
    heroVideo:     '/g550-video.mp4',
    interiorImage: CABIN_GALLERY[0],
    exteriorImage: EXT_FALCON_SUNSET,
    gallery: CABIN_GALLERY,
    amenities: [
      'Rolls-Royce Tay Engines',
      'Three Living Zones',
      'Forward Galley',
      'Two Lavatories',
      'In-Flight Entertainment',
      'Satellite Wi-Fi',
      'Crew Rest Option',
    ],
  },

  /* ──────────────────────────────────────────────────
     6. GULFSTREAM G280  — Super-Midsize Performance
  ────────────────────────────────────────────────── */
  {
    id: 'gulfstream-g280',
    name: 'Gulfstream G280',
    category: 'Super Midsize',
    tagline: 'Class-leading range and cabin in the super-midsize segment.',
    storyline: 'Range.\nReimagined.',
    storyDesc: 'The G280 redefined the super-midsize category — flying 3,600 nm nonstop with the longest, tallest cabin in its class. Whisper-quiet Honeywell engines and Gulfstream\'s signature 100% fresh air cabin make every journey effortless.',
    passengers: 10,
    range: 3600,
    speed: 482,        // ~Mach 0.84 / 459 knots
    altitude: 45000,
    baggage: 120,
    endurance: 7,
    cabinHeight: 6.2,
    cabinWidth: 7.1,
    cabinLength: 25.8,
    wifi: true,
    lavatory: true,
    catering: true,
    bestFor: 'NY to London nonstop, LA to Hawaii, transcontinental executive travel',
    description: 'Best-in-class super-midsize. 3,600 nm with the longest cabin in segment.',
    image:         EXT_JET_AIR,
    heroVideo:     '/g280-video.mp4',
    interiorImage: CABIN_GALLERY[1],
    exteriorImage: EXT_JET_AIR,
    gallery: CABIN_GALLERY,
    amenities: [
      '100% Fresh Air Cabin',
      'Honeywell HTF7250G Engines',
      'PlaneView 280 Cockpit',
      'Forward Galley',
      'Enclosed Aft Lavatory',
      'Generous Baggage Hold',
      'High-Speed Wi-Fi',
    ],
  },

  /* ──────────────────────────────────────────────────
     7. GULFSTREAM G200  — Super-Midsize Original
  ────────────────────────────────────────────────── */
  {
    id: 'gulfstream-g200',
    name: 'Gulfstream G200',
    category: 'Super Midsize',
    tagline: 'A robust performer at the heart of executive aviation.',
    storyline: 'Proven\nat every altitude.',
    storyDesc: 'The Gulfstream G200 was the first super-midsize business jet — combining heavy-jet cabin comfort with midsize-jet operating economics. Its 3,400 nm range and stand-up cabin make it a workhorse for transcontinental and short transatlantic missions.',
    passengers: 9,
    range: 3400,
    speed: 528,        // ~Mach 0.80 / 459 knots
    altitude: 45000,
    baggage: 150,
    endurance: 7,
    cabinHeight: 6.3,
    cabinWidth: 7.2,
    cabinLength: 24.3,
    wifi: true,
    lavatory: true,
    catering: true,
    bestFor: 'Coast-to-coast US, mid-range international, executive group travel',
    description: 'The original super-midsize. 3,400 nm with a stand-up cabin and proven reliability.',
    image:         EXT_CESSNA_LANDING,
    heroVideo:     '/gulfstream-v-video.mp4',
    interiorImage: CABIN_GALLERY[2],
    exteriorImage: EXT_CESSNA_LANDING,
    gallery: CABIN_GALLERY,
    amenities: [
      'Pratt & Whitney PW306A Engines',
      'Stand-up Cabin',
      'Forward Galley',
      'Enclosed Aft Lavatory',
      'Baggage Access from Cabin',
      'Cabin Entertainment',
      'Optional Wi-Fi',
    ],
  },
]
