export const ROLES = {
  PUBLIC: "public",
  PREMIUM: "premium",
  CLUB_USER: "club_user",
  CLUB_ADMIN: "club_admin",
  DPF_ADMIN: "dpf_admin",
};

export const ENTITLEMENTS = {
  PREMIUM_KNOWLEDGE: "premium_knowledge",
  PREMIUM_BOOKS: "premium_books",
  CLUB_OS: "club_os",
  PERFORMANCE_LABS: "performance_labs",
};


/* =========================================================
   DEMO SESSION
   Temporary DPF Admin environment for development/testing.
   This is NOT production authentication.
   ========================================================= */

export const demoSession = {
  isAuthenticated: true,

  user: {
    id: "dpf-demo-admin",
    name: "DPF OS Administrator",
    role: ROLES.DPF_ADMIN,
  },

  entitlements: [
    ENTITLEMENTS.PREMIUM_KNOWLEDGE,
    ENTITLEMENTS.PREMIUM_BOOKS,
    ENTITLEMENTS.CLUB_OS,
    ENTITLEMENTS.PERFORMANCE_LABS,
  ],

  clubMemberships: [
    {
      clubId: "club-01",
      role: ROLES.DPF_ADMIN,
    },
    {
      clubId: "club-02",
      role: ROLES.DPF_ADMIN,
    },
    {
      clubId: "club-03",
      role: ROLES.DPF_ADMIN,
    },
  ],
};


/* =========================================================
   ACCESS HELPERS
   ========================================================= */

export function hasRole(session, role) {
  return session?.user?.role === role;
}


export function hasEntitlement(session, entitlement) {
  return session?.entitlements?.includes(entitlement);
}


export function isClubMember(session, clubId) {
  return session?.clubMemberships?.some(
    (membership) => membership.clubId === clubId
  );
}


/* =========================================================
   CLUB OS ACCESS
   ========================================================= */

export function canAccessClubOS(session, clubId = null) {
  if (!session?.isAuthenticated) {
    return false;
  }

  if (hasRole(session, ROLES.DPF_ADMIN)) {
    return true;
  }

  if (!hasEntitlement(session, ENTITLEMENTS.CLUB_OS)) {
    return false;
  }

  if (
    hasRole(session, ROLES.CLUB_ADMIN) ||
    hasRole(session, ROLES.CLUB_USER)
  ) {
    if (!clubId) {
      return true;
    }

    return isClubMember(session, clubId);
  }

  return false;
}