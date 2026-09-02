/* =========================================================
   DPF OS — ENTITLEMENT ENGINE
   Centralized access & entitlement logic

   Product Architecture:
   - Standard
   - Premium
   - Pro
   - Books
   - Video
   - DPF Club Intelligence
   ========================================================= */

import {
  USER_TIERS,
  getAccessMatrix,
} from "./accessMatrix.js";

import {
  getBookProductById,
  getBookBundleById,
} from "../products/bookProducts.js";

/* =========================================================
   CONSTANTS
   ========================================================= */

export const ENTITLEMENT_STATUS = {
  ACTIVE: "active",
  EXPIRED: "expired",
  CANCELLED: "cancelled",
  COMPLETED: "completed",
  REVOKED: "revoked",
};

export const PURCHASE_TYPES = {
  BOOK: "book",
  BOOK_BUNDLE: "book_bundle",
  VIDEO: "video",
  VIDEO_BUNDLE: "video_bundle",
  PRODUCT: "product",
};

/* =========================================================
   USER ACCESS CONTEXT
   ========================================================= */

/**
 * Creates the normalized access context used
 * throughout the DPF OS application.
 */
export function createAccessContext({
  userId = null,

  userTier = USER_TIERS.STANDARD,

  subscriptions = [],

  purchases = [],

  entitlements = [],

  clubMembership = null,
} = {}) {
  return {
    userId,

    userTier,

    subscriptions: Array.isArray(subscriptions)
      ? subscriptions
      : [],

    purchases: Array.isArray(purchases)
      ? purchases
      : [],

    entitlements: Array.isArray(entitlements)
      ? entitlements
      : [],

    clubMembership,

    matrix: getAccessMatrix(userTier),
  };
}

/* =========================================================
   TIER HELPERS
   ========================================================= */

export function isStandard(context) {
  return (
    context?.userTier === USER_TIERS.STANDARD
  );
}

export function isPremium(context) {
  return (
    context?.userTier === USER_TIERS.PREMIUM
  );
}

export function isPro(context) {
  return (
    context?.userTier === USER_TIERS.PRO
  );
}

export function isClub(context) {
  return (
    context?.userTier === USER_TIERS.CLUB
  );
}

/* =========================================================
   SUBSCRIPTION CHECK
   ========================================================= */

export function hasActiveSubscription(
  context,
  productId
) {
  if (!context) {
    return false;
  }

  return context.subscriptions.some(
    (subscription) =>
      subscription.productId === productId &&
      subscription.status ===
        ENTITLEMENT_STATUS.ACTIVE
  );
}

/* =========================================================
   PURCHASE CHECK
   ========================================================= */

export function hasCompletedPurchase(
  context,
  productId
) {
  if (!context) {
    return false;
  }

  return context.purchases.some(
    (purchase) =>
      purchase.productId === productId &&
      purchase.status ===
        ENTITLEMENT_STATUS.COMPLETED
  );
}

/* =========================================================
   GENERIC ENTITLEMENT CHECK
   ========================================================= */

export function hasEntitlement(
  context,
  entitlementId
) {
  if (!context) {
    return false;
  }

  return context.entitlements.some(
    (entitlement) =>
      entitlement.id === entitlementId &&
      entitlement.status ===
        ENTITLEMENT_STATUS.ACTIVE
  );
}

/* =========================================================
   BOOK PURCHASE
   ========================================================= */

export function ownsBook(
  context,
  bookId
) {
  if (!context) {
    return false;
  }

  return context.purchases.some(
    (purchase) =>
      purchase.type === PURCHASE_TYPES.BOOK &&
      purchase.productId === bookId &&
      purchase.status ===
        ENTITLEMENT_STATUS.COMPLETED
  );
}

/* =========================================================
   BOOK BUNDLE PURCHASE
   ========================================================= */

export function ownsBookBundle(
  context,
  bundleId
) {
  if (!context) {
    return false;
  }

  return context.purchases.some(
    (purchase) =>
      purchase.type ===
        PURCHASE_TYPES.BOOK_BUNDLE &&
      purchase.productId === bundleId &&
      purchase.status ===
        ENTITLEMENT_STATUS.COMPLETED
  );
}

/* =========================================================
   BOOK ACCESS THROUGH BUNDLE
   ========================================================= */

export function hasBookThroughBundle(
  context,
  bookId
) {
  if (!context) {
    return false;
  }

  const purchasedBundles =
    context.purchases.filter(
      (purchase) =>
        purchase.type ===
          PURCHASE_TYPES.BOOK_BUNDLE &&
        purchase.status ===
          ENTITLEMENT_STATUS.COMPLETED
    );

  return purchasedBundles.some(
    (purchase) => {
      const bundle =
        getBookBundleById(
          purchase.productId
        );

      return (
        bundle?.books?.includes(bookId) ===
        true
      );
    }
  );
}

/* =========================================================
   BOOK ACCESS
   ========================================================= */

/**
 * Book access is purchase-based.
 *
 * Premium / Pro subscriptions do NOT automatically
 * unlock full book editions.
 */
export function canAccessBook(
  context,
  bookId
) {
  if (!context || !bookId) {
    return false;
  }

  const book =
    getBookProductById(bookId);

  if (!book) {
    return false;
  }

  if (
    ownsBook(
      context,
      bookId
    )
  ) {
    return true;
  }

  if (
    hasBookThroughBundle(
      context,
      bookId
    )
  ) {
    return true;
  }

  return false;
}

/* =========================================================
   BOOK PREVIEW ACCESS
   ========================================================= */

/**
 * Everyone can discover and preview books.
 * Full editions remain purchase protected.
 */
export function canViewBookPreview(
  context,
  bookId
) {
  if (!context || !bookId) {
    return false;
  }

  const book =
    getBookProductById(bookId);

  if (!book) {
    return false;
  }

  return (
    context.matrix.bookPreview === true
  );
}

/* =========================================================
   PREMIUM ACCESS
   ========================================================= */

export function canAccessPremium(
  context
) {
  if (!context) {
    return false;
  }

  return (
    context.matrix.premiumKnowledge ===
    true
  );
}

/* =========================================================
   PRO ACCESS
   ========================================================= */

export function canAccessPro(
  context
) {
  if (!context) {
    return false;
  }

  return (
    context.matrix.proKnowledge ===
    true
  );
}

/* =========================================================
   SEARCH ACCESS
   ========================================================= */

export function getSearchTier(
  context
) {
  if (!context) {
    return USER_TIERS.STANDARD;
  }

  return context.userTier;
}

export function canUsePublicSearch(
  context
) {
  return (
    context?.matrix.publicSearch ===
    true
  );
}

export function canUsePremiumSearch(
  context
) {
  return (
    context?.matrix.premiumSearch ===
    true
  );
}

export function canUseProSearch(
  context
) {
  return (
    context?.matrix.proSearch ===
    true
  );
}

/* =========================================================
   RESEARCH ACCESS
   ========================================================= */

export function canAccessPublicResearch(
  context
) {
  return (
    context?.matrix.publicResearch ===
    true
  );
}

/* =========================================================
   WORKSPACE ACCESS
   ========================================================= */

export function canAccessPersonalWorkspace(
  context
) {
  return (
    context?.matrix.personalWorkspace ===
    true
  );
}

export function canAccessAdvancedWorkspace(
  context
) {
  return (
    context?.matrix.advancedWorkspace ===
    true
  );
}

/* =========================================================
   CLUB INTELLIGENCE
   ========================================================= */

export function canAccessClubIntelligence(
  context
) {
  if (!context) {
    return false;
  }

  if (
    context.userTier !== USER_TIERS.CLUB
  ) {
    return false;
  }

  return (
    context.matrix.clubIntelligence ===
    true
  );
}

/* =========================================================
   CLUB MEMBERSHIP
   ========================================================= */

export function hasClubMembership(
  context
) {
  return Boolean(
    context?.clubMembership
  );
}

export function getClubMembership(
  context
) {
  return (
    context?.clubMembership || null
  );
}

/* =========================================================
   GENERIC CONTENT ACCESS
   ========================================================= */

/**
 * Determines whether a user can access
 * a searchable/content item.
 *
 * Important:
 * Discoverability and accessibility
 * are separate concepts.
 */
export function canAccessContent(
  context,
  item
) {
  if (!context || !item) {
    return false;
  }

  switch (item.access) {
    case "public":
      return true;

    case "premium":
      return canAccessPremium(
        context
      );

    case "pro":
      return canAccessPro(
        context
      );

    case "club":
      return canAccessClubIntelligence(
        context
      );

    case "purchased":
      return Boolean(
        item.productId &&
          hasCompletedPurchase(
            context,
            item.productId
          )
      );

    default:
      return false;
  }
}

/* =========================================================
   RESULT CLASSIFICATION
   ========================================================= */

/**
 * Used by Search UI.
 *
 * The result can be:
 *
 * - accessible
 * - locked
 * - preview
 * - upgrade
 * - purchase
 */
export function classifyResult(
  context,
  item
) {
  if (!item) {
    return {
      state: "unknown",
      accessible: false,
    };
  }

  if (
    item.access === "public"
  ) {
    return {
      state: "accessible",
      accessible: true,
      accessLevel: "public",
    };
  }

  if (
    canAccessContent(
      context,
      item
    )
  ) {
    return {
      state: "accessible",
      accessible: true,
      accessLevel:
        item.access,
    };
  }

  if (
    item.access === "premium"
  ) {
    return {
      state: "upgrade",
      accessible: false,
      accessLevel: "premium",
      upgradeTo: "premium",
    };
  }

  if (
    item.access === "pro"
  ) {
    return {
      state: "upgrade",
      accessible: false,
      accessLevel: "pro",
      upgradeTo: "pro",
    };
  }

  if (
    item.access === "purchased"
  ) {
    return {
      state: "purchase",
      accessible: false,
      accessLevel: "purchased",
      productId:
        item.productId || null,
    };
  }

  if (
    item.access === "club"
  ) {
    return {
      state: "club",
      accessible: false,
      accessLevel: "club",
    };
  }

  return {
    state: "locked",
    accessible: false,
  };
}

/* =========================================================
   ENTITLEMENT SUMMARY
   ========================================================= */

export function getEntitlementSummary(
  context
) {
  if (!context) {
    return {
      userTier: USER_TIERS.STANDARD,

      premium: false,
      pro: false,
      club: false,

      publicSearch: true,
      premiumSearch: false,
      proSearch: false,

      purchasedBooks: false,
      purchasedVideos: false,

      personalWorkspace: false,
      advancedWorkspace: false,

      subscriptions: [],
      purchases: [],
      entitlements: [],
    };
  }

  return {
    userTier: context.userTier,

    premium:
      canAccessPremium(
        context
      ),

    pro:
      canAccessPro(
        context
      ),

    club:
      canAccessClubIntelligence(
        context
      ),

    publicSearch:
      canUsePublicSearch(
        context
      ),

    premiumSearch:
      canUsePremiumSearch(
        context
      ),

    proSearch:
      canUseProSearch(
        context
      ),

    purchasedBooks:
      context.matrix.purchasedBooks ===
      true,

    purchasedVideos:
      context.matrix.purchasedVideos ===
      true,

    personalWorkspace:
      canAccessPersonalWorkspace(
        context
      ),

    advancedWorkspace:
      canAccessAdvancedWorkspace(
        context
      ),

    subscriptions:
      context.subscriptions,

    purchases:
      context.purchases,

    entitlements:
      context.entitlements,
  };
}