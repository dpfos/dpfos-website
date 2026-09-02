import {
  teamRepository,
} from "../repositories/index.js";

import {
  createTeam,
} from "../contracts/team.js";

export async function createTeamOperation({
  id,
  clubId,
  name,
  category = null,
  ageGroup = null,
  status = "active",
  metadata = {},
} = {}) {
  const team = createTeam({
    id,
    clubId,
    name,
    category,
    ageGroup,
    status,
    metadata,
  });

  return teamRepository.upsert(team);
}

export default createTeamOperation;