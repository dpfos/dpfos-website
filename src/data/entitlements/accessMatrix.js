/* =========================================================
   DPF OS — ACCESS MATRIX
   ========================================================= */

export const USER_TIERS = {
  STANDARD: "standard",
  PREMIUM: "premium",
  PRO: "pro",
  CLUB: "club",
};

export const ACCESS_LEVELS = {
  PUBLIC: "public",
  PREMIUM: "premium",
  PRO: "pro",
  PURCHASED: "purchased",
  CLUB: "club",
};

export const accessMatrix = {
  standard: {
    publicKnowledge: true,
    publicSearch: true,
    publicResearch: true,

    bookDiscovery: true,
    bookPreview: true,

    premiumKnowledge: false,
    premiumSearch: false,

    proKnowledge: false,
    proSearch: false,

    purchasedBooks: true,
    purchasedVideos: true,

    personalWorkspace: false,
    advancedWorkspace: false,

    clubIntelligence: false,
  },

  premium: {
    publicKnowledge: true,
    publicSearch: true,
    publicResearch: true,

    bookDiscovery: true,
    bookPreview: true,

    premiumKnowledge: true,
    premiumSearch: true,

    proKnowledge: false,
    proSearch: false,

    purchasedBooks: true,
    purchasedVideos: true,

    personalWorkspace: true,
    advancedWorkspace: false,

    clubIntelligence: false,
  },

  pro: {
    publicKnowledge: true,
    publicSearch: true,
    publicResearch: true,

    bookDiscovery: true,
    bookPreview: true,

    premiumKnowledge: true,
    premiumSearch: true,

    proKnowledge: true,
    proSearch: true,

    purchasedBooks: true,
    purchasedVideos: true,

    personalWorkspace: true,
    advancedWorkspace: true,

    clubIntelligence: false,
  },

  club: {
    publicKnowledge: true,
    publicSearch: true,
    publicResearch: true,

    bookDiscovery: true,
    bookPreview: true,

    premiumKnowledge: true,
    premiumSearch: true,

    proKnowledge: true,
    proSearch: true,

    purchasedBooks: true,
    purchasedVideos: true,

    personalWorkspace: true,
    advancedWorkspace: true,

    clubIntelligence: true,
  },
};

export function getAccessMatrix(userTier) {
  return (
    accessMatrix[userTier] ||
    accessMatrix.standard
  );
}

export function canAccessFeature(
  userTier,
  feature
) {
  const matrix = getAccessMatrix(userTier);

  return matrix[feature] === true;
}