/*
============================================================
DPF OS - ACCESS CONTEXT
============================================================

Canonical application access context.

Responsibilities:
- Convert a DPF session into an entitlement access context.
- Resolve the active club membership.
- Bridge authentication state to the Entitlement Engine.

This module does NOT:
- authenticate users
- persist authentication state
- contain UI logic
============================================================
*/

import {
  USER_TIERS,
} from "../../data/entitlements/accessMatrix.js";

import {
  createAccessContext,
  canAccessPremium as entitlementCanAccessPremium,
} from "../../data/entitlements/entitlementEngine.js";

import {
  demoSession,
  ROLES,
  ENTITLEMENTS,
} from "./accessControl.js";

function resolveUserTier(session) {
  if (!session?.user) {
    return USER_TIERS.STANDARD;
  }

  if (session.user.role === ROLES.DPF_ADMIN) {
    return USER_TIERS.CLUB;
  }

  if (
    session.user.role === ROLES.CLUB_ADMIN ||
    session.user.role === ROLES.CLUB_USER
  ) {
    return USER_TIERS.CLUB;
  }

  const hasPremiumEntitlement =
    Array.isArray(session.entitlements) &&
    session.entitlements.some((entitlement) => {
      if (typeof entitlement === "string") {
        return (
          entitlement ===
          ENTITLEMENTS.PREMIUM_KNOWLEDGE
        );
      }

      return (
        entitlement?.id ===
          ENTITLEMENTS.PREMIUM_KNOWLEDGE &&
        entitlement?.status !== "expired" &&
        entitlement?.status !== "cancelled" &&
        entitlement?.status !== "revoked"
      );
    });

  if (hasPremiumEntitlement) {
    return USER_TIERS.PREMIUM;
  }

  return USER_TIERS.STANDARD;
}

function resolveClubMembership(
  session,
  clubId = null
) {
  const memberships = Array.isArray(
    session?.clubMemberships
  )
    ? session.clubMemberships
    : [];

  if (!memberships.length) {
    return null;
  }

  if (clubId) {
    return (
      memberships.find(
        (membership) =>
          membership?.clubId === clubId
      ) ?? null
    );
  }

  return memberships[0] ?? null;
}

export function createDPFAccessContext(
  session = demoSession,
  { clubId = null } = {}
) {
  return createAccessContext({
    userId:
      session?.user?.id ?? null,

    userTier:
      resolveUserTier(session),

    subscriptions:
      session?.subscriptions ?? [],

    purchases:
      session?.purchases ?? [],

    entitlements:
      session?.entitlements ?? [],

    clubMembership:
      resolveClubMembership(
        session,
        clubId
      ),
  });
}

export const demoAccessContext =
  createDPFAccessContext(
    demoSession
  );

export function canAccessPremium(
  session = demoSession
) {
  const context =
    createDPFAccessContext(session);

  return entitlementCanAccessPremium(
    context
  );
}

export {
  resolveUserTier,
  resolveClubMembership,
};

export default demoAccessContext;
