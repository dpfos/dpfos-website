/* =========================================================
   DPF OS — MASTER PRODUCT CATALOG
   Commercial Product Architecture
   ========================================================= */

export const PRODUCT_TYPES = {
  ACCESS: "access",
  BOOK: "book",
  VIDEO: "video",
  CLUB: "club",
};

export const PRODUCT_STATUS = {
  ACTIVE: "active",
  COMING_SOON: "coming_soon",
  FUTURE: "future",
};

/* =========================================================
   PRODUCT IDS
   ========================================================= */

export const PRODUCT_IDS = {
  STANDARD: "dpf-standard",
  PREMIUM: "dpf-premium",
  PRO: "dpf-pro",

  BOOKS: "dpf-books",

  RESEARCH: "dpf-research",

  VIDEO: "dpf-video",

  CLUB_INTELLIGENCE: "dpf-club-intelligence",
};

/* =========================================================
   MASTER PRODUCT CATALOG
   ========================================================= */

export const productCatalog = [

  /* =======================================================
     STANDARD
     ======================================================= */

  {
    id: PRODUCT_IDS.STANDARD,

    name: "DPF Standard",
    shortName: "Standard",

    type: PRODUCT_TYPES.ACCESS,

    status: PRODUCT_STATUS.ACTIVE,

    accessTier: "standard",

    audience: [
      "general",
      "coach",
      "player",
      "analyst",
      "researcher",
      "football_professional",
    ],

    billing: {
      model: "free",
    },

    description:
      "Free access to the public DPF OS knowledge environment.",

    features: [
      "Public Website",
      "Public Knowledge",
      "Public Search",
      "Knowledge Concepts",
      "Book Discovery",
      "Book Previews",
      "Public Research",
      "Public Resources",
    ],
  },


  /* =======================================================
     PREMIUM
     ======================================================= */

  {
    id: PRODUCT_IDS.PREMIUM,

    name: "DPF Premium",
    shortName: "Premium",

    type: PRODUCT_TYPES.ACCESS,

    status: PRODUCT_STATUS.ACTIVE,

    accessTier: "premium",

    audience: [
      "coach",
      "player",
      "analyst",
      "football_professional",
      "learner",
    ],

    billing: {
      model: "subscription",

      monthly: {
        price: 14.99,
        currency: "USD",
      },

      annual: {
        price: 149,
        currency: "USD",
      },
    },

    description:
      "Expanded access to the DPF OS knowledge environment for individual users.",

    features: [
      "Everything in Standard",
      "Premium Knowledge",
      "Premium Search",
      "Advanced Knowledge",
      "Premium Resources",
      "Premium Research",
      "Personal Workspace",
      "Saved Resources",
    ],

    exclusions: [
      "Full Book Editions",
      "Pro-only Knowledge",
      "DPF Club Intelligence",
    ],
  },


  /* =======================================================
     PRO
     ======================================================= */

  {
    id: PRODUCT_IDS.PRO,

    name: "DPF Pro",
    shortName: "Pro",

    type: PRODUCT_TYPES.ACCESS,

    status: PRODUCT_STATUS.ACTIVE,

    accessTier: "pro",

    audience: [
      "coach",
      "technical_director",
      "analyst",
      "performance_staff",
      "scout",
      "academy_staff",
      "football_professional",
    ],

    billing: {
      model: "subscription",

      monthly: {
        price: 29.99,
        currency: "USD",
      },

      annual: {
        price: 299,
        currency: "USD",
      },
    },

    description:
      "Professional DPF OS access for football professionals.",

    features: [
      "Everything in Premium",
      "Professional Search",
      "Professional Knowledge",
      "Advanced Coaching Resources",
      "Advanced Training Resources",
      "Player Development Resources",
      "Academy Resources",
      "Professional Research",
      "Advanced Workspace",
    ],

    exclusions: [
      "Full Book Editions",
      "DPF Club Intelligence",
    ],
  },


  /* =======================================================
     BOOKS
     ======================================================= */

  {
    id: PRODUCT_IDS.BOOKS,

    name: "DPF Books",
    shortName: "Books",

    type: PRODUCT_TYPES.BOOK,

    status: PRODUCT_STATUS.ACTIVE,

    accessTier: "purchased",

    audience: [
      "coach",
      "technical_director",
      "analyst",
      "football_professional",
      "researcher",
      "football_organization",
    ],

    billing: {
      model: "individual_purchase",

      currency: "USD",
    },

    description:
      "Standalone DPF OS books and book collections.",

    features: [
      "Individual Book Purchase",
      "Book Collections",
      "Book Bundles",
      "Protected Full Editions",
      "Lifetime Access to Purchased Edition",
    ],

    exclusions: [
      "Automatic Premium Access",
      "Automatic Pro Access",
      "Future Publications",
    ],
  },


  /* =======================================================
     RESEARCH
     ======================================================= */

  {
    id: PRODUCT_IDS.RESEARCH,

    name: "DPF Research",
    shortName: "Research",

    type: PRODUCT_TYPES.ACCESS,

    status: PRODUCT_STATUS.COMING_SOON,

    accessTier: "research",

    audience: [
      "coach",
      "analyst",
      "researcher",
      "football_professional",
    ],

    billing: {
      model: "future_product",
    },

    description:
      "The DPF research and football intelligence environment.",

    features: [
      "Research Library",
      "Research Projects",
      "Research Findings",
      "Evidence Base",
      "Football Intelligence",
      "Research Updates",
    ],
  },


  /* =======================================================
     VIDEO
     ======================================================= */

  {
    id: PRODUCT_IDS.VIDEO,

    name: "DPF Video",
    shortName: "Video",

    type: PRODUCT_TYPES.VIDEO,

    status: PRODUCT_STATUS.FUTURE,

    accessTier: "purchased",

    audience: [
      "coach",
      "player",
      "analyst",
      "football_professional",
    ],

    billing: {
      model: "individual_or_collection",

      currency: "USD",
    },

    description:
      "Future DPF video products, training series and visual learning resources.",

    features: [
      "Individual Videos",
      "Video Collections",
      "Training Series",
      "Video Library",
    ],

    exclusions: [
      "Automatic Premium Access",
      "Automatic Pro Access",
      "DPF Club Intelligence",
    ],
  },


  /* =======================================================
     DPF CLUB INTELLIGENCE
     ======================================================= */

  {
    id: PRODUCT_IDS.CLUB_INTELLIGENCE,

    name: "DPF Club Intelligence",
    shortName: "Club Intelligence",

    type: PRODUCT_TYPES.CLUB,

    status: PRODUCT_STATUS.FUTURE,

    accessTier: "club",

    audience: [
      "football_club",
      "academy",
      "football_organization",
    ],

    billing: {
      model: "club_bundle",

      currency: "USD",

      seatBased: true,

      pricing: "bundle_based",
    },

    description:
      "The intelligence and operating environment for football organizations.",

    features: [
      "Club Environment",
      "Club Search",
      "User Seats",
      "Roles",
      "Permissions",
      "Teams",
      "Players",
      "Coaching",
      "Training",
      "Performance",
      "Scouting",
      "Academy",
      "Operations",
    ],

    exclusions: [
      "Individual Premium Subscription",
      "Individual Pro Subscription",
    ],
  },
];

/* =========================================================
   HELPERS
   ========================================================= */

export function getProductById(id) {
  return productCatalog.find(
    (product) => product.id === id
  );
}

export function getProductsByType(type) {
  return productCatalog.filter(
    (product) => product.type === type
  );
}

export function getActiveProducts() {
  return productCatalog.filter(
    (product) =>
      product.status === PRODUCT_STATUS.ACTIVE
  );
}

export function getSubscriptionProducts() {
  return productCatalog.filter(
    (product) =>
      product.billing?.model === "subscription"
  );
}