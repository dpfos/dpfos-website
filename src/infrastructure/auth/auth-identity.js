import { createDPFSession } from "./auth-session.js";

export function createAuthenticatedDPFSession(
  authSession,
  identity = null
) {
  const profile = identity?.profile ?? null;

  return createDPFSession(authSession, {
    profile,
    clubMemberships: identity?.clubMemberships ?? [],
    entitlements: identity?.entitlements ?? [],
  });
}

export function createIdentitySnapshot(identity = null) {
  return {
    profile: identity?.profile ?? null,
    clubMemberships: Array.isArray(identity?.clubMemberships)
      ? identity.clubMemberships
      : [],
    entitlements: Array.isArray(identity?.entitlements)
      ? identity.entitlements
      : [],
  };
}

export default createAuthenticatedDPFSession;
