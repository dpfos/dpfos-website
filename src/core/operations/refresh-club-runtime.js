import { coreEngine } from "../engine/core-engine.js";

import { createClubContext } from "../contracts/club-context.js";

export async function refreshClubRuntime({
  clubId,
  userId = null,
  organizationId = null,
  teamId = null,
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

  return coreEngine.loadClubRuntime(
    context
  );
}

export default refreshClubRuntime;
