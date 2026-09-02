import {
  createAccessContext,
  isStandard,
  isPremium,
  isPro,
  isClub,

  hasActiveSubscription,

  ownsBook,
  ownsBookBundle,
  hasBookThroughBundle,
  canAccessBook,
  canViewBookPreview,

  canAccessPremium,
  canAccessPro,

  canUsePublicSearch,
  canUsePremiumSearch,
  canUseProSearch,

  canAccessPublicResearch,

  canAccessAdvancedWorkspace,

  canAccessClubIntelligence,
  hasClubMembership,

  canAccessContent,
  classifyResult,

  getEntitlementSummary,
} from "./entitlementEngine";


/* =========================================================
   DPF OS — ENTITLEMENT ENGINE TEST SUITE
   ========================================================= */

function section(title) {
  console.log("\n");
  console.log("==================================================");
  console.log(title);
  console.log("==================================================");
}


function test(label, value) {
  console.log(`${label}:`, value);
}


function inspect(label, value) {
  console.log(`\n${label}`);
  console.log(JSON.stringify(value, null, 2));
}


/* =========================================================
   1. USER CONTEXTS
   ========================================================= */

const standardContext = createAccessContext({
  userId: "test-standard",
  userTier: "standard",
});


const premiumContext = createAccessContext({
  userId: "test-premium",
  userTier: "premium",
});


const proContext = createAccessContext({
  userId: "test-pro",
  userTier: "pro",
});


const clubContext = createAccessContext({
  userId: "test-club",
  userTier: "club",
  clubMembership: {
    clubId: "test-club-001",
    status: "active",
  },
});


/* =========================================================
   2. TIER IDENTIFICATION
   ========================================================= */

section("TIER IDENTIFICATION");

test(
  "STANDARD → isStandard",
  isStandard(standardContext)
);

test(
  "PREMIUM → isPremium",
  isPremium(premiumContext)
);

test(
  "PRO → isPro",
  isPro(proContext)
);

test(
  "CLUB → isClub",
  isClub(clubContext)
);


/* =========================================================
   3. STANDARD ENTITLEMENTS
   ========================================================= */

section("STANDARD ENTITLEMENTS");

inspect(
  "STANDARD SUMMARY",
  getEntitlementSummary(standardContext)
);

test(
  "Public Search",
  canUsePublicSearch(standardContext)
);

test(
  "Premium Search",
  canUsePremiumSearch(standardContext)
);

test(
  "Pro Search",
  canUseProSearch(standardContext)
);

test(
  "Premium Knowledge",
  canAccessPremium(standardContext)
);

test(
  "Pro Knowledge",
  canAccessPro(standardContext)
);

test(
  "Public Research",
  canAccessPublicResearch(standardContext)
);


/* =========================================================
   4. PREMIUM ENTITLEMENTS
   ========================================================= */

section("PREMIUM ENTITLEMENTS");

inspect(
  "PREMIUM SUMMARY",
  getEntitlementSummary(premiumContext)
);

test(
  "Public Search",
  canUsePublicSearch(premiumContext)
);

test(
  "Premium Search",
  canUsePremiumSearch(premiumContext)
);

test(
  "Pro Search",
  canUseProSearch(premiumContext)
);

test(
  "Premium Knowledge",
  canAccessPremium(premiumContext)
);

test(
  "Pro Knowledge",
  canAccessPro(premiumContext)
);

test(
  "Advanced Workspace",
  canAccessAdvancedWorkspace(premiumContext)
);


/* =========================================================
   5. PRO ENTITLEMENTS
   ========================================================= */

section("PRO ENTITLEMENTS");

inspect(
  "PRO SUMMARY",
  getEntitlementSummary(proContext)
);

test(
  "Public Search",
  canUsePublicSearch(proContext)
);

test(
  "Premium Search",
  canUsePremiumSearch(proContext)
);

test(
  "Pro Search",
  canUseProSearch(proContext)
);

test(
  "Premium Knowledge",
  canAccessPremium(proContext)
);

test(
  "Pro Knowledge",
  canAccessPro(proContext)
);

test(
  "Advanced Workspace",
  canAccessAdvancedWorkspace(proContext)
);


/* =========================================================
   6. CLUB ENTITLEMENTS
   ========================================================= */

section("CLUB ENTITLEMENTS");

inspect(
  "CLUB SUMMARY",
  getEntitlementSummary(clubContext)
);

test(
  "Club Intelligence",
  canAccessClubIntelligence(clubContext)
);

test(
  "Club Membership",
  hasClubMembership(clubContext)
);


/* =========================================================
   7. PUBLIC SEARCH CLASSIFICATION
   ========================================================= */

section("SEARCH CLASSIFICATION — PUBLIC");

const publicResult = {
  id: "search-public-001",
  title: "What is Dynamic Positional Football?",
  type: "concept",
  access: "public",
};

inspect(
  "STANDARD USER",
  classifyResult(
    standardContext,
    publicResult
  )
);

inspect(
  "PREMIUM USER",
  classifyResult(
    premiumContext,
    publicResult
  )
);

inspect(
  "PRO USER",
  classifyResult(
    proContext,
    publicResult
  )
);

inspect(
  "CLUB USER",
  classifyResult(
    clubContext,
    publicResult
  )
);


/* =========================================================
   8. PREMIUM SEARCH CLASSIFICATION
   ========================================================= */

section("SEARCH CLASSIFICATION — PREMIUM");

const premiumResult = {
  id: "search-premium-001",
  title: "Advanced Training Methodology",
  type: "knowledge",
  access: "premium",
};

inspect(
  "STANDARD USER",
  classifyResult(
    standardContext,
    premiumResult
  )
);

inspect(
  "PREMIUM USER",
  classifyResult(
    premiumContext,
    premiumResult
  )
);

inspect(
  "PRO USER",
  classifyResult(
    proContext,
    premiumResult
  )
);

inspect(
  "CLUB USER",
  classifyResult(
    clubContext,
    premiumResult
  )
);


/* =========================================================
   9. PRO SEARCH CLASSIFICATION
   ========================================================= */

section("SEARCH CLASSIFICATION — PRO");

const proResult = {
  id: "search-pro-001",
  title: "Advanced Player Development Intelligence",
  type: "knowledge",
  access: "pro",
};

inspect(
  "STANDARD USER",
  classifyResult(
    standardContext,
    proResult
  )
);

inspect(
  "PREMIUM USER",
  classifyResult(
    premiumContext,
    proResult
  )
);

inspect(
  "PRO USER",
  classifyResult(
    proContext,
    proResult
  )
);

inspect(
  "CLUB USER",
  classifyResult(
    clubContext,
    proResult
  )
);


/* =========================================================
   10. CLUB SEARCH CLASSIFICATION
   ========================================================= */

section("SEARCH CLASSIFICATION — CLUB");

const clubResult = {
  id: "search-club-001",
  title: "Club Intelligence System",
  type: "club-intelligence",
  access: "club",
};

inspect(
  "STANDARD USER",
  classifyResult(
    standardContext,
    clubResult
  )
);

inspect(
  "PREMIUM USER",
  classifyResult(
    premiumContext,
    clubResult
  )
);

inspect(
  "PRO USER",
  classifyResult(
    proContext,
    clubResult
  )
);

inspect(
  "CLUB USER",
  classifyResult(
    clubContext,
    clubResult
  )
);


/* =========================================================
   11. PURCHASED BOOK
   ========================================================= */

section("PURCHASED BOOK");

const purchasedBookContext = createAccessContext({
  userId: "test-book-owner",
  userTier: "standard",

  purchases: [
    {
      type: "book",
      productId: "book-06-game-model",
      status: "completed",
    },
  ],
});

test(
  "Own Game Model",
  ownsBook(
    purchasedBookContext,
    "book-06-game-model"
  )
);

test(
  "Can Access Game Model",
  canAccessBook(
    purchasedBookContext,
    "book-06-game-model"
  )
);

test(
  "Own Coaching Manual",
  ownsBook(
    purchasedBookContext,
    "book-07-coaching-manual"
  )
);

test(
  "Can Access Coaching Manual",
  canAccessBook(
    purchasedBookContext,
    "book-07-coaching-manual"
  )
);


/* =========================================================
   12. BOOK PREVIEW
   ========================================================= */

section("BOOK PREVIEW");

test(
  "Standard → Book Preview",
  canViewBookPreview(
    standardContext,
    "book-06-game-model"
  )
);

test(
  "Premium → Book Preview",
  canViewBookPreview(
    premiumContext,
    "book-06-game-model"
  )
);

test(
  "Pro → Book Preview",
  canViewBookPreview(
    proContext,
    "book-06-game-model"
  )
);


/* =========================================================
   13. BOOK BUNDLE
   ========================================================= */

section("BOOK BUNDLE");

const bundleContext = createAccessContext({
  userId: "test-bundle-owner",
  userTier: "standard",

  purchases: [
    {
      type: "book_bundle",
      productId: "bundle-foundation",
      status: "completed",
    },
  ],
});

test(
  "Own Foundation Bundle",
  ownsBookBundle(
    bundleContext,
    "bundle-foundation"
  )
);

test(
  "Game Model Through Bundle",
  hasBookThroughBundle(
    bundleContext,
    "book-06-game-model"
  )
);

test(
  "Game Model Access",
  canAccessBook(
    bundleContext,
    "book-06-game-model"
  )
);


/* =========================================================
   14. SUBSCRIPTION
   ========================================================= */

section("SUBSCRIPTION");

const subscriptionContext = createAccessContext({
  userId: "test-subscription",
  userTier: "premium",

  subscriptions: [
    {
      productId: "subscription-premium-monthly",
      status: "active",
    },
  ],
});

test(
  "Active Premium Subscription",
  hasActiveSubscription(
    subscriptionContext,
    "subscription-premium-monthly"
  )
);

test(
  "Wrong Subscription",
  hasActiveSubscription(
    subscriptionContext,
    "subscription-pro-monthly"
  )
);


/* =========================================================
   15. GENERIC CONTENT ACCESS
   ========================================================= */

section("GENERIC CONTENT ACCESS");

test(
  "Standard → Public",
  canAccessContent(
    standardContext,
    {
      access: "public",
    }
  )
);

test(
  "Standard → Premium",
  canAccessContent(
    standardContext,
    {
      access: "premium",
    }
  )
);

test(
  "Premium → Premium",
  canAccessContent(
    premiumContext,
    {
      access: "premium",
    }
  )
);

test(
  "Premium → Pro",
  canAccessContent(
    premiumContext,
    {
      access: "pro",
    }
  )
);

test(
  "Pro → Pro",
  canAccessContent(
    proContext,
    {
      access: "pro",
    }
  )
);

test(
  "Club → Club",
  canAccessContent(
    clubContext,
    {
      access: "club",
    }
  )
);


/* =========================================================
   16. FINAL SUMMARY
   ========================================================= */

section("FINAL ENTITLEMENT SUMMARIES");

inspect(
  "STANDARD",
  getEntitlementSummary(standardContext)
);

inspect(
  "PREMIUM",
  getEntitlementSummary(premiumContext)
);

inspect(
  "PRO",
  getEntitlementSummary(proContext)
);

inspect(
  "CLUB",
  getEntitlementSummary(clubContext)
);

inspect(
  "STANDARD + PURCHASED BOOK",
  getEntitlementSummary(purchasedBookContext)
);

inspect(
  "STANDARD + FOUNDATION BUNDLE",
  getEntitlementSummary(bundleContext)
);


/* =========================================================
   COMPLETE
   ========================================================= */

section("DPF OS ENTITLEMENT TEST COMPLETE");

console.log(
  "All entitlement scenarios have been executed."
);