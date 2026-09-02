import {
  teamMembershipRepository,
} from "../repositories/index.js";

import {
  createTeamMembership,
} from "../contracts/team-membership.js";

export async function createTeamMembershipOperation({
  id,
  teamId,
  playerId,
  seasonId,
  role = null,
  status = "active",
  metadata = {},
} = {}) {
  const membership =
    createTeamMembership({
      id,
      teamId,
      playerId,
      seasonId,
      role,
      status,
      metadata,
    });

  return teamMembershipRepository.upsert(
    membership
  );
}

export default createTeamMembershipOperation;