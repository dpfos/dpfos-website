import {
  teamRepository,
} from "../repositories/index.js";

export async function updateTeamOperation({
  id,
  name,
  category,
  ageGroup,
  status,
  metadata,
} = {}) {
  const existingTeam =
    await teamRepository.getById(id);

  if (!existingTeam) {
    throw new Error(
      `Team "${id}" was not found.`
    );
  }

  const updatedTeam = {
    ...existingTeam,
    ...(name !== undefined && { name }),
    ...(category !== undefined && {
      category,
    }),
    ...(ageGroup !== undefined && {
      ageGroup,
    }),
    ...(status !== undefined && { status }),
    ...(metadata !== undefined && {
      metadata,
    }),
  };

  return teamRepository.upsert(updatedTeam);
}

export default updateTeamOperation;