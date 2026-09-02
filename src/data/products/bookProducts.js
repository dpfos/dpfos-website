/* =========================================================
   DPF OS — BOOK PRODUCTS
   Commercial Product Registry
   ========================================================= */

export const BOOK_TIERS = {
  FOUNDATION: "foundation",
  ARCHITECTURE: "architecture",
  FOOTBALL_METHODOLOGY: "football_methodology",
  PROFESSIONAL_SYSTEM: "professional_system",
  ADVANCED_SYSTEM: "advanced_system",
  STRATEGIC_SYSTEM: "strategic_system",
  FLAGSHIP: "flagship",
};

/* =========================================================
   INDIVIDUAL BOOK PRODUCTS
   ========================================================= */

export const bookProducts = [

  /* -------------------------------------------------------
     FOUNDATION
     ------------------------------------------------------- */

  {
    id: "book-01-constitution",
    volume: 1,
    slug: "constitution",
    title: "The DPF Constitution",

    tier: BOOK_TIERS.FOUNDATION,

    price: 29,
    currency: "USD",

    productType: "book",
    accessType: "purchase",

    status: "available",
    fullEditionProtected: true,

    description:
      "The constitutional foundation of the DPF Operating System.",
  },

  {
    id: "book-02-way",
    volume: 2,
    slug: "the-way",
    title: "The DPF Way",

    tier: BOOK_TIERS.FOUNDATION,

    price: 29,
    currency: "USD",

    productType: "book",
    accessType: "purchase",

    status: "available",
    fullEditionProtected: true,

    description:
      "The philosophical and developmental way of DPF.",
  },

  {
    id: "book-03-blueprint",
    volume: 3,
    slug: "blueprint",
    title: "The DPF Blueprint",

    tier: BOOK_TIERS.FOUNDATION,

    price: 39,
    currency: "USD",

    productType: "book",
    accessType: "purchase",

    status: "available",
    fullEditionProtected: true,

    description:
      "The structural blueprint of the DPF Operating System.",
  },

  /* -------------------------------------------------------
     ARCHITECTURE
     ------------------------------------------------------- */

  {
    id: "book-04-architectural-principles",
    volume: 4,
    slug: "architectural-principles",
    title: "DPF Architectural Principles",

    tier: BOOK_TIERS.ARCHITECTURE,

    price: 39,
    currency: "USD",

    productType: "book",
    accessType: "purchase",

    status: "available",
    fullEditionProtected: true,

    description:
      "The architectural principles governing the DPF system.",
  },

  {
    id: "book-05-institutional-framework",
    volume: 5,
    slug: "institutional-framework",
    title: "The DPF Institutional Framework",

    tier: BOOK_TIERS.ARCHITECTURE,

    price: 49,
    currency: "USD",

    productType: "book",
    accessType: "purchase",

    status: "available",
    fullEditionProtected: true,

    description:
      "The institutional architecture for implementing DPF within football organizations.",
  },

  /* -------------------------------------------------------
     FOOTBALL METHODOLOGY
     ------------------------------------------------------- */

  {
    id: "book-06-game-model",
    volume: 6,
    slug: "game-model",
    title: "The DPF Game Model",

    tier: BOOK_TIERS.FOOTBALL_METHODOLOGY,

    price: 69,
    currency: "USD",

    productType: "book",
    accessType: "purchase",

    status: "available",
    fullEditionProtected: true,

    flagship: true,

    description:
      "The DPF Game Model translating the operating philosophy into collective football behavior.",
  },

  {
    id: "book-07-coaching-manual",
    volume: 7,
    slug: "coaching-manual",
    title: "The DPF Coaching Manual",

    tier: BOOK_TIERS.FOOTBALL_METHODOLOGY,

    price: 69,
    currency: "USD",

    productType: "book",
    accessType: "purchase",

    status: "available",
    fullEditionProtected: true,

    flagship: true,

    description:
      "The DPF coaching methodology, training architecture and practical implementation framework.",
  },

  {
    id: "book-08-playbook",
    volume: 8,
    slug: "playbook",
    title: "The DPF Playbook",

    tier: BOOK_TIERS.FOOTBALL_METHODOLOGY,

    price: 59,
    currency: "USD",

    productType: "book",
    accessType: "purchase",

    status: "available",
    fullEditionProtected: true,

    description:
      "The operational football playbook of the DPF Game Model.",
  },

  {
    id: "book-09-role-atlas",
    volume: 9,
    slug: "role-atlas",
    title: "The DPF Role Atlas",

    tier: BOOK_TIERS.FOOTBALL_METHODOLOGY,

    price: 49,
    currency: "USD",

    productType: "book",
    accessType: "purchase",

    status: "available",
    fullEditionProtected: true,

    description:
      "The DPF reference system for football roles and role behaviors.",
  },

  /* -------------------------------------------------------
     PROFESSIONAL SYSTEMS
     ------------------------------------------------------- */

  {
    id: "book-10-coach-operational-toolkit",
    volume: 10,
    slug: "coach-operational-toolkit",
    title: "DPF Coach Operational Toolkit",

    tier: BOOK_TIERS.PROFESSIONAL_SYSTEM,

    price: 59,
    currency: "USD",

    productType: "book",
    accessType: "purchase",

    status: "available",
    fullEditionProtected: true,
  },

  {
    id: "book-11-academy-youth",
    volume: 11,
    slug: "academy-youth",
    title: "DPF Academy & Youth",

    tier: BOOK_TIERS.PROFESSIONAL_SYSTEM,

    price: 59,
    currency: "USD",

    productType: "book",
    accessType: "purchase",

    status: "available",
    fullEditionProtected: true,
  },

  {
    id: "book-12-scouting",
    volume: 12,
    slug: "scouting",
    title: "DPF Scouting",

    tier: BOOK_TIERS.PROFESSIONAL_SYSTEM,

    price: 59,
    currency: "USD",

    productType: "book",
    accessType: "purchase",

    status: "available",
    fullEditionProtected: true,
  },

  {
    id: "book-13-player-development",
    volume: 13,
    slug: "player-development",
    title: "DPF Player Development",

    tier: BOOK_TIERS.PROFESSIONAL_SYSTEM,

    price: 59,
    currency: "USD",

    productType: "book",
    accessType: "purchase",

    status: "available",
    fullEditionProtected: true,
  },

  /* -------------------------------------------------------
     ADVANCED SYSTEMS
     ------------------------------------------------------- */

  {
    id: "book-14-performance-labs",
    volume: 14,
    slug: "performance-labs",
    title: "DPF Performance Labs",

    tier: BOOK_TIERS.ADVANCED_SYSTEM,

    price: 69,
    currency: "USD",

    productType: "book",
    accessType: "purchase",

    status: "available",
    fullEditionProtected: true,
  },

  {
    id: "book-15-kpi-framework",
    volume: 15,
    slug: "kpi-framework",
    title: "DPF KPI Framework",

    tier: BOOK_TIERS.ADVANCED_SYSTEM,

    price: 59,
    currency: "USD",

    productType: "book",
    accessType: "purchase",

    status: "available",
    fullEditionProtected: true,
  },

  {
    id: "book-16-intelligence",
    volume: 16,
    slug: "intelligence",
    title: "DPF Intelligence",

    tier: BOOK_TIERS.ADVANCED_SYSTEM,

    price: 69,
    currency: "USD",

    productType: "book",
    accessType: "purchase",

    status: "available",
    fullEditionProtected: true,
  },

  /* -------------------------------------------------------
     STRATEGIC SYSTEMS
     ------------------------------------------------------- */

  {
    id: "book-17-business-model",
    volume: 17,
    slug: "business-model",
    title: "DPF Business Model",

    tier: BOOK_TIERS.STRATEGIC_SYSTEM,

    price: 59,
    currency: "USD",

    productType: "book",
    accessType: "purchase",

    status: "available",
    fullEditionProtected: true,
  },

  /* -------------------------------------------------------
     FLAGSHIP
     ------------------------------------------------------- */

  {
    id: "book-18-dpf-os",
    volume: 18,
    slug: "dpf-os",
    title: "DPF Operating System",

    tier: BOOK_TIERS.FLAGSHIP,

    price: 99,
    currency: "USD",

    productType: "book",
    accessType: "purchase",

    status: "available",
    fullEditionProtected: true,

    flagship: true,

    description:
      "The master-level reference to the DPF Operating System.",
  },
];

/* =========================================================
   BOOK BUNDLES
   ========================================================= */

export const bookBundles = [

  {
    id: "bundle-dpf-foundations",

    name: "DPF Foundations Collection",

    price: 149,
    currency: "USD",

    type: "book_bundle",

    books: [
      "book-01-constitution",
      "book-02-way",
      "book-03-blueprint",
      "book-04-architectural-principles",
      "book-05-institutional-framework",
    ],

    description:
      "The foundational and architectural layer of the DPF Operating System.",
  },

  {
    id: "bundle-dpf-football-methodology",

    name: "DPF Football Methodology Collection",

    price: 199,
    currency: "USD",

    type: "book_bundle",

    books: [
      "book-06-game-model",
      "book-07-coaching-manual",
      "book-08-playbook",
      "book-09-role-atlas",
    ],

    description:
      "The core DPF football methodology collection.",
  },

  {
    id: "bundle-dpf-professional-development",

    name: "DPF Professional Development Collection",

    price: 189,
    currency: "USD",

    type: "book_bundle",

    books: [
      "book-10-coach-operational-toolkit",
      "book-11-academy-youth",
      "book-12-scouting",
      "book-13-player-development",
    ],

    description:
      "Professional development systems for coaches, academies and football professionals.",
  },

  {
    id: "bundle-dpf-performance-intelligence",

    name: "DPF Performance & Intelligence Collection",

    price: 159,
    currency: "USD",

    type: "book_bundle",

    books: [
      "book-14-performance-labs",
      "book-15-kpi-framework",
      "book-16-intelligence",
    ],

    description:
      "Advanced performance, measurement and football intelligence systems.",
  },

  {
    id: "bundle-dpf-strategic-systems",

    name: "DPF Strategic Systems Collection",

    price: 129,
    currency: "USD",

    type: "book_bundle",

    books: [
      "book-17-business-model",
      "book-18-dpf-os",
    ],

    description:
      "Strategic and master-level DPF operating system knowledge.",
  },

  /* =======================================================
     COMPLETE LIBRARY
     ======================================================= */

  {
    id: "bundle-dpf-complete-library",

    name: "DPF Complete Library",

    price: 799,
    currency: "USD",

    type: "book_bundle",

    books: bookProducts.map((book) => book.id),

    flagship: true,

    description:
      "Complete access to all currently released DPF OS volumes.",

    note:
      "Includes currently released editions only. Future publications are not automatically included.",
  },
];

/* =========================================================
   HELPERS
   ========================================================= */

export function getBookProductById(id) {
  return bookProducts.find(
    (book) => book.id === id
  );
}

export function getBookBySlug(slug) {
  return bookProducts.find(
    (book) => book.slug === slug
  );
}

export function getBookBundleById(id) {
  return bookBundles.find(
    (bundle) => bundle.id === id
  );
}

export function getBooksByTier(tier) {
  return bookProducts.filter(
    (book) => book.tier === tier
  );
}

export function getAvailableBooks() {
  return bookProducts.filter(
    (book) => book.status === "available"
  );
}