import { ENTITLEMENT_STATUS } from "../../data/entitlements/entitlementEngine.js";
import { createDPFAccessContext } from "../access/accessContext.js";

function normalizeEntitlement(entitlement) {
  if (typeof entitlement === "string") {
    return {
      id: entitlement,
      status: ENTITLEMENT_STATUS.ACTIVE,
    };
  }

  if (!entitlement || typeof entitlement !== "object") {
    return null;
  }

  return {
    ...entitlement,
    id: entitlement.id ?? null,
    status:
      entitlement.status ??
      ENTITLEMENT_STATUS.ACTIVE,
  };
}

export function normalizeEntitlements(
  entitlements = []
) {
  if (!Array.isArray(entitlements)) {
    return [];
  }

  return entitlements
    .map(normalizeEntitlement)
    .filter(
      (entitlement) => entitlement?.id
    );
}

export function resolveClubMemberships(
  session
) {
  if (!Array.isArray(session?.clubMemberships)) {
    return [];
  }

  return session.clubMemberships.filter(
    (membership) =>
      membership &&
      typeof membership === "object" &&
      membership.clubId
  );
}

export function resolveClubMembership(
  session,
  clubId = null
) {
  const memberships =
    resolveClubMemberships(session);

  if (!memberships.length) {
    return null;
  }

  if (clubId) {
    return (
      memberships.find(
        (membership) =>
          membership.clubId === clubId
      ) ?? null
    );
  }

  return memberships[0] ?? null;
}

export function createDPFAccessContextFromSession(
  session,
  { clubId = null } = {}
) {
  const normalizedEntitlements =
    normalizeEntitlements(
      session?.entitlements
    );

  const normalizedSession = {
    ...session,
    entitlements: normalizedEntitlements,
    clubMemberships:
      resolveClubMemberships(session),
  };

  return createDPFAccessContext(
    normalizedSession,
    { clubId }
  );
}

export default createDPFAccessContextFromSession;
