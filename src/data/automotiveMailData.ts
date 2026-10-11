export interface PlanTier {
  id: 'cars' | 'planes' | 'both';
  name: string;
  tagline: string;
  price: number;
  period: string;
  isPopular?: boolean;
  savingsNote?: string;
  includes: {
    heroPoster: string;
    blueprint: string;
    magazineCover: string;
    storyLetter: string;
    polaroids: string;
  };
  details: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  avatar: string;
  quote: string;
  rating: number;
  collectorSince: string;
  favoriteDrop: string;
}

export interface DropItem {
  id: string;
  number: string;
  title: string;
  category: 'car' | 'plane';
  era: string;
  specs: string;
  description: string;
  badge: string;
  heroPosterNote: string;
  blueprintNote: string;
  magazineTitle: string;
  letterSnippet: string;
  polaroidsCount: number;
}

export interface FaqItem {
  question: string;
  answer: string;
  category: string;
}

export const SUBSCRIPTION_PLANS: PlanTier[] = [
  {
    id: 'cars',
    name: 'Cars Only',
    tagline: 'Pure motorsport heritage and legendary road icons',
    price: 459,
    period: '/ month',
    isPopular: false,
    includes: {
      heroPoster: '1× A3 Archival Cotton Hero Poster (300 GSM)',
      blueprint: '1× Technical Schematic Blueprint (White on Midnight Indigo)',
      magazineCover: '1× Vintage Era Editorial Magazine Cover Print',
      storyLetter: '1× Curated Collector’s Historical Story Letter',
      polaroids: '3× High-Gloss Mini Polaroid Archival Snapshots',
    },
    details: [
      'Delivered in rigid protective matte black wax-sealed envelope',
      'Tracked express delivery across all 28 Indian States & UTs',
      'First drop dispatches within 48 hours of subscription',
      'Cancel or pause anytime with zero friction',
    ],
  },
  {
    id: 'both',
    name: 'Both Worlds',
    tagline: 'The ultimate hangar & paddock collector payload',
    price: 759,
    period: '/ month',
    isPopular: true,
    savingsNote: 'Save ₹159 / month vs individual tiers',
    includes: {
      heroPoster: '2× A3 Archival Cotton Hero Posters (1 Car + 1 Aircraft)',
      blueprint: '2× Technical Schematic Blueprints (Precision Schematics)',
      magazineCover: '2× Vintage Editorial Magazine Covers',
      storyLetter: '2× Curated Historical Dossier Letters & Flight Logs',
      polaroids: '6× High-Gloss Mini Polaroid Snapshots',
    },
    details: [
      'Includes exclusive gold foil numbered Certificate of Authenticity',
      'Double the monthly artwork at a ₹159 monthly privilege discount',
      'Priority dispatch queue with tracked India Post & Bluedart express',
      'Eligible for annual member bonus slipcase folder',
    ],
  },
  {
    id: 'planes',
    name: 'Planes Only',
    tagline: 'Supersonic aviation and heroic warbird art',
    price: 459,
    period: '/ month',
    isPopular: false,
    includes: {
      heroPoster: '1× A3 Archival Cotton Hero Poster (300 GSM)',
      blueprint: '1× Technical Schematic Blueprint (Cockpit & Airframe Spec)',
      magazineCover: '1× Vintage Golden Age Aviation Journal Cover',
      storyLetter: '1× Curated Pilot Log & Engineering History Letter',
      polaroids: '3× High-Gloss Mini Polaroid Archival Snapshots',
    },
    details: [
      'Delivered in rigid protective matte black wax-sealed envelope',
      'Tracked express delivery across all 28 Indian States & UTs',
      'First drop dispatches within 48 hours of subscription',
      'Cancel or pause anytime with zero friction',
    ],
  },
];

export const TESTIMONIALS: Testimonial[] = [
  {
    id: 'mumbai',
    name: 'Vikramaditya Singhania',
    role: 'Automotive Journalist & Porsche Enthusiast',
    city: 'Mumbai',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&h=160&fit=crop&crop=faces&q=80',
    quote:
      'The 300 GSM cotton stock feels like an actual museum acquisition. When the black wax-sealed mailer arrived at my home in South Mumbai, holding the 1973 Carrera RS blueprint and vintage polaroids was pure tactile magic. Nothing in India matches this production standard.',
    rating: 5,
    collectorSince: 'Founding Member #041',
    favoriteDrop: '1973 Porsche 911 RS 2.7',
  },
  {
    id: 'bengaluru',
    name: 'Aanya Krishnamurthy',
    role: 'Aerospace Systems Engineer & Collector',
    city: 'Bengaluru',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&h=160&fit=crop&crop=faces&q=80',
    quote:
      'As someone who designs avionics in Bengaluru, I inspect schematics for a living. The Concorde 002 blueprint schematic was mathematically precise, and the pilot log dispatch read like a lost RAF dispatch. Automotive Mail is the highlight of my mailbox every month.',
    rating: 5,
    collectorSince: 'Member #118',
    favoriteDrop: 'Concorde Supersonic 002',
  },
  {
    id: 'delhi',
    name: 'Kabir Oberoi',
    role: 'Architect & Classic Car Restorer',
    city: 'Delhi',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&h=160&fit=crop&crop=faces&q=80',
    quote:
      'I framed the Ferrari 250 GTO hero poster in matte dark walnut for my studio in Chanakyapuri. Guests stop dead in their tracks to examine the print texture and the typography. The ₹759 Both Worlds tier is an absolute steal for this caliber of art.',
    rating: 5,
    collectorSince: 'Member #089',
    favoriteDrop: '1962 Ferrari 250 GTO',
  },
];

export const DROPS_CATALOG: DropItem[] = [
  {
    id: 'drop-01',
    number: 'DROP 01',
    title: '1973 Porsche 911 Carrera RS 2.7',
    category: 'car',
    era: '1973 · Stuttgart, Germany',
    specs: '2,687 cc Flat-Six · 210 PS · 245 km/h · 975 kg',
    description: 'The definitive homologation lightweight with the iconic ducktail spoiler and Fuchs forged alloy wheels.',
    badge: 'CURRENT ACTIVE DROP',
    heroPosterNote: 'A3 Giclée on 300 GSM Hahnemühle German Etching Cotton Paper',
    blueprintNote: 'Orthographic 4-view technical blueprint with factory chassis tolerances',
    magazineTitle: 'Christophorus Edition No. 119 Cover Reproduction',
    letterSnippet: 'The night Norbert Singer tested the ducktail in the wind tunnel...',
    polaroidsCount: 3,
  },
  {
    id: 'drop-02',
    number: 'DROP 02',
    title: 'Supermarine Spitfire Mk IX',
    category: 'plane',
    era: '1942 · Southampton, England',
    specs: 'Rolls-Royce Merlin 66 · 1,705 hp · 408 mph · Elliptical Wing',
    description: 'The legendary elliptical-winged defender that turned the tide of aerial combat over Western Europe.',
    badge: 'CURRENT ACTIVE DROP',
    heroPosterNote: 'A3 Aerial banking angle at sunset with atmospheric grain',
    blueprintNote: 'Full internal airframe, wing spar, and Merlin 66 supercharger cutaway',
    magazineTitle: 'The Aeroplane Gazette · Autumn 1943 Issue',
    letterSnippet: 'Flight Lieutenant dispatch from Biggin Hill morning patrol...',
    polaroidsCount: 3,
  },
  {
    id: 'drop-03',
    number: 'DROP 03',
    title: '1962 Ferrari 250 GTO',
    category: 'car',
    era: '1962 · Maranello, Italy',
    specs: 'Tipo 168/62 3.0L Colombo V12 · 300 hp · 280 km/h · 36 Chassis Built',
    description: 'The Holy Grail of automotive collecting. Aerodynamic sculpture engineered by Giotto Bizzarrini.',
    badge: 'UPCOMING NOVEMBER DROP',
    heroPosterNote: 'High-contrast monochrome trackside portrait under Modena light',
    blueprintNote: 'Dry-sump lubrication and tubular spaceframe chassis topology',
    magazineTitle: 'Scuderia Maranello Paddock Journal · 1962',
    letterSnippet: 'Notes from the Tour de France Automobile victor...',
    polaroidsCount: 3,
  },
  {
    id: 'drop-04',
    number: 'DROP 04',
    title: 'Aérospatiale/BAC Concorde 002',
    category: 'plane',
    era: '1969 · Filton & Toulouse',
    specs: '4× Rolls-Royce/Snecma Olympus 593 · Mach 2.04 · 60,000 ft Cruise',
    description: 'The pinnacle of supersonic passenger travel. The needle-nosed delta icon that conquered the Atlantic.',
    badge: 'UPCOMING NOVEMBER DROP',
    heroPosterNote: 'Full-bleed Mach 2 reheat departure over the Atlantic cloud deck',
    blueprintNote: 'Droop-nose visor hydraulic mechanism & ogival wing chord schematic',
    magazineTitle: 'Flight International Concorde Debut Folio',
    letterSnippet: 'Captain’s first supersonic Atlantic crossing flight log...',
    polaroidsCount: 3,
  },
];

export const FAQ_ITEMS: FaqItem[] = [
  {
    category: 'Subscription',
    question: 'How does the Automotive Mail subscription work?',
    answer:
      'Every month, our curation team selects an iconic historic automobile, legendary aircraft, or both (depending on your tier). We engineer a five-piece physical art package containing a 300 GSM A3 cotton hero poster, an authentic engineering blueprint schematic, a vintage magazine cover print, an archival story letter, and three polaroids. It is packed into our rigid, wax-sealed mailer and shipped straight to your doorstep across India.'
  },
  {
    category: 'Deliverables',
    question: "What is included inside every monthly dispatch?",
    answer:
      'Each standard single-tier box (Cars Only or Planes Only) contains 5 physical collector artifacts: (1) One A3 300 GSM Archival Cotton Hero Poster, (2) One Technical Schematic Blueprint, (3) One Vintage Magazine Cover reproduction, (4) One hand-researched Story Letter with historical dispatch notes, and (5) Three High-Gloss Mini Polaroid snapshots. In the "Both Worlds" tier (₹759/mo), you receive double the payload with items for both the featured car and aircraft, plus an official numbered Certificate of Authenticity.'
  },
  {
    category: 'Collectibility',
    question: 'Are drops limited editions or ever reprinted?',
    answer:
      'Every monthly drop is printed strictly to order based on the active subscriber count for that calendar month. Once a month closes, that specific print edition is retired into our permanent archive and is never reprinted for mass sale. This protects the rarity and collector value of every piece in your portfolio.'
  },
  {
    category: 'Shipping',
    question: 'How does delivery tracking work across India?',
    answer:
      'We deliver to every serviceable PIN code across all 28 states and Union Territories in India via tracked air express (BlueDart, Delhivery, and India Post Speed Post). All dispatches ship in custom rigid non-bend mailers with reinforced corner protection. As soon as your box departs our workshop, you receive real-time SMS and email tracking links.'
  },
  {
    category: 'Gifting & Cancellation',
    question: 'Can I gift a subscription or cancel anytime?',
    answer:
      'Yes, absolutely. During checkout, you can toggle "Gift this Subscription" to input your recipient’s Indian postal address and include a personalized wax-sealed gift note. Furthermore, there are zero lock-ins or contracts—you can pause, skip a month, switch tiers, or cancel anytime with one click directly from your account page.'
  }
];

export const HOW_IT_WORKS_STEPS = [
  {
    step: '01',
    title: 'Pick the Icon',
    subtitle: 'Curated Heritage',
    description: 'Choose your realm: legendary road & track cars (₹459/mo), historic aviation & supersonic wings (₹459/mo), or Both Worlds (₹759/mo).',
    detail: 'From Norbert Singer’s air-cooled Porsches to Rolls-Royce Merlin-powered Spitfires, each subject is vetted by automotive historians.'
  },
  {
    step: '02',
    title: 'Pack the Art',
    subtitle: 'Archival Craft',
    description: 'We reproduce 5 physical artifacts per subject on museum-grade 300 GSM cotton rag paper with pigment inks that resist fading for 100+ years.',
    detail: 'Carefully assembled with archival blueprints, vintage magazine typography, curated letters, and glossy darkroom polaroids.'
  },
  {
    step: '03',
    title: 'Post the Mail',
    subtitle: 'Dispatched to Your Door',
    description: 'Sealed inside a rigid matte black reinforced mailer with custom wax seal and stamped postage, shipped tracked anywhere in India.',
    detail: 'Arrives crisp, unbent, and ready for framing in Mumbai, Delhi, Bengaluru, Pune, Hyderabad, and every town in between.'
  }
];

export const GUARANTEE_POINTS = [
  {
    title: 'Archival Paper',
    description: '300 GSM heavyweight cotton rag stock. Acid-free, tactile, and designed to never yellow or warp over decades.',
    badge: '300 GSM Cotton'
  },
  {
    title: 'Museum-Quality Printing',
    description: 'Ultra-high-definition 12-color pigment giclée reproduction with deep velvety blacks and exact vintage pantone tones.',
    badge: '12-Color Giclée'
  },
  {
    title: 'Damage-Free Delivery',
    description: 'Custom tri-layer rigid crush-proof mailer with corner shields. If India Post or courier ever damages it, we replace it free.',
    badge: '100% Replacement'
  },
  {
    title: 'Cancel Anytime',
    description: 'Zero lock-in contracts or hidden cancellation fees. Pause, skip, upgrade, or cancel with a single click in your dashboard.',
    badge: 'Zero Lock-in'
  }
];
