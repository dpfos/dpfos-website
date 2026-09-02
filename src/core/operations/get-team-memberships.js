import { coreEngine } from "../engine/core-engine.js";

import { createClubContext } from "../contracts/club-context.js";

export async function getTeamMemberships({
  clubId,
  userId = null,
  organizationId = null,
  teamId,
  seasonId = null,
  role = null,
  permissions = [],
  entitlements = [],
} = {}) {
  const context = createClubContext({
    userId,
    organizationId,
    clubId,
    teamId,
    seasonId,
    role,
    permissions,
    entitlements,
  });

  return coreEngine.getTeamMemberships(
    context
  );
}

export default getTeamMemberships;
