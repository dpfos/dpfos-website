import {
  canAccessClubOS,
} from "../access/accessControl.js";

export function resolveClubAccess({
  session,
  clubId,
} = {}) {
  if (!session) {
    return {
      allowed: false,
      clubId: clubId ?? null,
      reason: "SESSION_REQUIRED",
    };
  }

  if (!clubId) {
    return {
      allowed: false,
      clubId: null,
      reason: "CLUB_ID_REQUIRED",
    };
  }

  const allowed =
    canAccessClubOS(
      session,
      clubId
    );

  return {
    allowed,
    clubId,
    reason: allowed
      ? null
      : "CLUB_ACCESS_DENIED",
  };
}

export default resolveClubAccess;