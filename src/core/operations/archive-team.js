import {
  teamRepository,
} from "../repositories/index.js";

export async function archiveTeamOperation({
  id,
  repositories = {},
} = {}) {
  if (!id) {
    throw new Error(
      "Team ID is required."
    );
  }

  const {
    team: teamRepo = teamRepository,
  } = repositories;

  const existingTeam =
    await teamRepo.getById(id);

  if (!existingTeam) {
    throw new Error(
      `Team "${id}" was not found.`
    );
  }

  const archivedTeam = {
    ...existingTeam,
    status: "archived",
  };

  return teamRepo.upsert(
    archivedTeam
  );
}

export default archiveTeamOperation;